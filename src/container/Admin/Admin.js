import React, { useState, useEffect, useCallback } from 'react';
import DaySetUp from '../../component/SetUp/DaySetUp';
import classes from './Admin.module.css';
import {  useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
import { updateObject, timeSeparator } from '../../utility';
import Modal from '../../component/UI/Modal/Modal';
import firebase from '../../FirebaseInstance';
import Button from '../../component/UI/Button/Button';


const Admin = props => {


    const [durationOfMeeting, setDurtionOfMeeting] = useState('30');
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const appointmentTimes = ['15', '30', '45', '60', '90', '120'];
    const optionsTime = appointmentTimes.map(time => (
        <option key={time} value={time} >{time}</option>
    ));

    const dispatch = useDispatch();
    const getAdminTimes = useCallback(() =>
        dispatch(action.getAdminTimes(true)), [dispatch]);
    const addDuration = useCallback((duration) =>
        dispatch(action.addDuration(duration)), [dispatch]);
    const times = useSelector(state => state.admin.setUpTimes);
    const duration = useSelector(state => state.admin.duration);

    const setUpAllDays = dayNames.map((day, index) => (
        <DaySetUp key={day} day={day} dayNumber={index + 1} />
    ));

    //get the minutes from the opening time to close time
    const getAllMinutes = (from, to) => {
        const a = new Date();
        const b = new Date();

        a.setHours(from[0], from[1]);
        b.setHours(to[0], to[1]);

        return Math.floor((b - a) / 60000);
    };

    const onSetUp = (event) => {
        event.preventDefault()
        let Ntimes = times
        console.log(times);

        for (const day in times) {
            const from = timeSeparator(times[day].from);
            const to = timeSeparator(times[day].to);
            const minutes = getAllMinutes(from, to);
            const updatedDay = updateObject(times[day], { minutesInDay: minutes });
            const updatedTimes = updateObject(Ntimes, { [day]: updatedDay });
            Ntimes = updatedTimes;
        };
        addDuration(durationOfMeeting);

        //todo: move to action
        Promise.all([
            firebase.database().ref('/admin/times').set(Ntimes),
            firebase.database().ref('/admin/durationOfMeeting').set(durationOfMeeting)
        ]).then(([times, duration]) => {
            toggleModal();
        }).catch(err => {
            console.log(err.message);

        });
    };


    useEffect(() => {
        getAdminTimes()
    }, [getAdminTimes]);


    return (
        <div className={classes.Picker}>
            <Modal
                show={showModal}
                closeModal={toggleModal}>
                <h2>זמני העבודה עודכנו</h2>
                <Button clicked={toggleModal}>אישור</Button>
            </Modal>
            <h1> הזנת שעות עבודה</h1>
            <form onSubmit={onSetUp} >
                <label>אורך פגישה:</label>
                <select
                    value={duration}
                    onChange={(event) => setDurtionOfMeeting(event.target.value)}>
                    {optionsTime}
                </select>
                <div className={classes.Days}>
                    {setUpAllDays}
                </div>
                <br />
                <button >עידכון </button>
            </form>
        </div>
    );

};


export default Admin;
