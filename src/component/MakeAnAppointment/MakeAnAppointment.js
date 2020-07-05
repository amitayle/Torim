import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import firebase from '../../FirebaseInstance';
import classes from './MakeAnAppointment.module.css';
import Button from '../UI/Button/Button';
import { withRouter } from 'react-router';

const MakeAnAppointment = props => {

    const appointmentDate = useSelector(state => state.client.date);
    const appointmentTime = useSelector(state => state.client.time);
    const appointmentMili = useSelector(state => state.client.miliseconds);
    const spinner = useSelector(state => state.client.spinner);
    const errorMessage = useSelector(state => state.client.errMessage);
    const bookedSuccessful = useSelector(state => state.client.bookedSuccessful);

    const dispatch = useDispatch();
    const onBook = useCallback((date, time, miliseconds) =>
        dispatch(action.appointmentBooked(date, time, miliseconds)), [dispatch]);

    const user = firebase.auth().currentUser;
    const booked = () => {
        if (user) {
            onBook(appointmentDate, appointmentTime, appointmentMili);
        } else {
            props.history.push('/auth');
        };
    };

    let content =
        <div className={classes.MakeAnAppointment}>
            <h2> אנחנו קובעים לך תור</h2>
            <div className={classes.Details}>
                <div>ב: <strong> {appointmentDate}</strong> </div>
                <div>לשעה: <strong>{appointmentTime}</strong></div>
            </div>
            <Button 
            clicked={booked} 
            >{user ? 'אישור' : 'התחברות'}</Button>
            <button onClick={props.canceled} className={classes.BtnCancel}>ביטול</button>
        </div>
    if (spinner) {
        content = <Spinner />
    }
    if (errorMessage) {
        content =
            <div>{errorMessage}</div>
    }
    if (bookedSuccessful) {
        content =
            <div className={classes.Success}>התור נקבע.. ניפגש!</div>
    }


    return (
        <>
            {content}
        </>
    );
};
export default withRouter(MakeAnAppointment);