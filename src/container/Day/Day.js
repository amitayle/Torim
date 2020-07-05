import React, { useState, useEffect, useCallback } from 'react'
import classes from './Day.module.css';

import MakeAnAppointment from '../../component/MakeAnAppointment/MakeAnAppointment';
import Vacancy from '../../component/Vacancy/Vacancy';
import Modal from '../../component/UI/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/actions/index';
import { timeSeparator } from '../../utility';
import Spinner from '../../component/UI/Spinner/Spinner';
import firebase from '../../FirebaseInstance';



const Day = props => {

    const namesOfTheDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const [vacancyList, setVacancyList] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const timesOfDay = useSelector(state => state.client.adminTimes);
    const durationOfMeeting = useSelector(state => state.client.durationOfMeeting);
    const bookedSuccessful = useSelector(state => state.client.bookedSuccessful);
    const dayName = namesOfTheDays[props.date.getDay()];

    const dispatch = useDispatch();
    const onVacancySelected = useCallback((date, time, miliseconds) =>
        dispatch(action.vacancySelected(date, time, miliseconds)), [dispatch]);

    const toggleModal = () => setShowModal(prev => !prev);

    const getTimesList = useCallback(() => {
        const timesList = [];
        const day = timesOfDay[props.date.getDay() + 1];
        if (day) {
            const minutes = day.minutesInDay;
            const numbeOfAppointments = Math.floor(minutes / durationOfMeeting); // TODO:add option for admin to choose floor / ceil
            const openingTime = timeSeparator(day.from);
            const dayTime = new Date();
            dayTime.setHours(openingTime[0], openingTime[1]);

            for (let a = 0; a < numbeOfAppointments; a++) {
                const milisecondToAdd = (dayTime.getMinutes() + (durationOfMeeting * a) * 60000);
                const dayMili = dayTime.getTime()
                const appointmentTime = new Date(dayMili + milisecondToAdd);
                const strHour = appointmentTime.getHours().toString();
                const strMinuets = appointmentTime.getMinutes().toString();
                const hour = strHour.length === 1 ? '0' + strHour : strHour
                const minutes = strMinuets.length === 1 ? '0' + strMinuets : strMinuets
                const time = [hour, minutes].join(':');
                timesList.push(time)
            };
            return timesList;
        };
    }, [props.date, durationOfMeeting, timesOfDay]);

    const dateFormater = useCallback(() => {
        const d = props.date;
        const day = d.getDate().toString();
        const month = (d.getMonth() + 1).toString();
        const year = d.getFullYear().toString().substr(-2);

        return [day, month, year].join('/');
    }, [props.date]);

    const filterBookedTimes = useCallback(() => {
        const bookedTimes = [];
        const date = dateFormater();
        firebase.database()
            .ref('/client/bookedAppointment')
            .orderByChild('date')
            .equalTo(date)
            .once('value')
            .then(snap => {
                if (snap.exists()) {
                    for (const key in snap.val()) {
                        bookedTimes.push(snap.val()[key]['time']);
                    };
                };
                const timesList = getTimesList();
                const vList = timesList.filter(t => {
                    return !bookedTimes.includes(t);
                });
                setVacancyList(vList);
            });
    }, [dateFormater, getTimesList]);

    const vacancyClicked = (time) => {
        const sTime = timeSeparator(time)
        const miliseconds = props.date.setHours(sTime[0], sTime[1]);
        onVacancySelected(dateFormater(), time, miliseconds);
        toggleModal();
    };

    let listOfDay = <Spinner />
    if (vacancyList !== null) {
        listOfDay = vacancyList.filter(time => {
            const nowTime = new Date().getTime()
            const t = timeSeparator(time)
            const timeIsPast = props.date.setHours(t[0], t[1]) < nowTime
            if (timeIsPast) {
                return false
            }
            return true
        }).map(time => (
            <Vacancy
                key={time}
                time={time}
                clicked={() => vacancyClicked(time)} />
        ));
        if (listOfDay.length === 0) {
            listOfDay = <h2>לצערינו אין תורים פנוים </h2>
        };
    };

    useEffect(() => {
        filterBookedTimes();
    }, [filterBookedTimes, bookedSuccessful]);

    return (
        <div className={classes.Day}>
            <Modal
                show={showModal}
                closeModal={toggleModal}>
                <MakeAnAppointment
                    canceled={toggleModal} />
            </Modal>
            <h3> {dayName}</h3>
            <h3> {dateFormater()} </h3>
            <div className={classes.List}>
                {listOfDay}
            </div>
        </div>

    );
};
export default Day;