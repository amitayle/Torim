import React, { useState, useEffect, useCallback } from 'react'


import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import classes from './Month.module.css';
import { useDispatch } from 'react-redux';
import * as action from '../../store/actions/index';
import firebase from '../../FirebaseInstance';


const Month = props => {

    const [dateSelected, setDateSelected] = useState(new Date());


    const dispatch = useDispatch();
    const onSelectDate = useCallback((date) =>
        dispatch(action.dateSelected(date)), [dispatch]);
    const getAdminTimes = useCallback((times) =>
        dispatch(action.getAdminTimes(times)), [dispatch]);
    const GetDurationOfMeeting = useCallback((duration) =>
        dispatch(action.getDuration(duration)), [dispatch]);




    useEffect(() => {
        getAdminTimes(false);
        //get from firebase
        firebase.database()
            .ref('/admin/durationOfMeeting')
            .once('value').then(snap => {
                GetDurationOfMeeting(snap.val())
            });
    }, [getAdminTimes, GetDurationOfMeeting]);

    const dayClicked = (date) => {
        setDateSelected(date);
        onSelectDate(date);
        props.history.push('/week');
    };


    return (

        <Calendar className={classes.Month}
            onClickDay={dayClicked}
            tileClassName={({ activeStartDate, date, view }) =>
                date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() ? classes.Today : classes.Day}
            tileDisabled={({ activeStartDate, date, view }) =>
                date.getDay() === 6 && view === 'month'}
            value={dateSelected}
            calendarType="Hebrew"
            minDate={new Date()}
            minDetail={'year'}
            next2Label={null}
            prev2Label={null}
        />
    );
};
export default Month;