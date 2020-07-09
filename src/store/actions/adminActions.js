import * as actionTypes from './actionTypes';
import firebase from '../../FirebaseInstance';

export const changeFrom = (dayNumber, time) => {
    return {
        type: actionTypes.CHANGE_FROM,
        dayNumber: dayNumber,
        time: time
    };
};

export const changeTo = (dayNumber, time) => {
    return {
        type: actionTypes.CHANGE_TO,
        dayNumber: dayNumber,
        time: time
    };
};

export const addDuration = (duration) => {
    return {
        type: actionTypes.ADD_DURATION,
        duration: duration
    };
};

export const addTimes = (times) => {
    return {
        type: actionTypes.ADD_TIMES,
        times: times
    };
};

export const getAdminTimes = (fromAdmin) => {
    return dispatch => {
        firebase.database()
            .ref('/admin')
            .once('value').then( snap => {
                const times = snap.val()['times'];
                if (fromAdmin) {
                    for (const day in times) {
                        if (day !== '0') {
                            dispatch(changeFrom(day, times[day].from))
                            dispatch(changeTo(day, times[day].to))
                        };
                    };
                };
                dispatch(addDuration(snap.val()['durationOfMeeting']));
                dispatch(addTimes(times));

            }).catch(err => {

            });
    };
};

