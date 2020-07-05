import * as actionTypes from './actionTypes';
import firebase from '../../FirebaseInstance';

export const fetchAppointment = (uid) => {
    return dispatch => {
        if (uid === 'admin') {
            dispatch(fetchAppointmentForAdmin());
        } else {
            firebase.database()
                .ref('/client/bookedAppointment')
                .orderByChild('userId')
                .equalTo(uid)
                .once('value').then(snap => {
                    const appointmetList = [];
                    if (snap.val() !== null) {
                        snap.forEach(child => {
                            appointmetList.push({
                                date: child.val()['date'],
                                time: child.val()['time'],
                                miliseconds: child.val()['miliseconds'],
                                key: child.key
                            });
                        });
                    };
                    dispatch(appointmentsFetched(appointmetList));
                });
        };
    };
};

export const appointmentsFetched = (appointments) => {
    return {
        type: actionTypes.APPOINTMENTS_FETCHED,
        appointments: appointments
    }
};

export const deleteAppointment = (key, uid) => {
    return dispatch => {
        firebase.database()
            .ref('/client/bookedAppointment')
            .child(key)
            .remove().then(
                dispatch(fetchAppointment(uid))
            );
    };
};

export const fetchAppointmentForAdmin = () => {
    return dispatch => {
        firebase.database()
            .ref('/client/bookedAppointment')
            .once('value').then(snap => {
                const appointmetList = [];
                if (snap.val() !== null) {
                    snap.forEach(child => {
                        appointmetList.push({
                            date: child.val()['date'],
                            time: child.val()['time'],
                            miliseconds: child.val()['miliseconds'],
                            name: child.val()['name'],
                            key: child.key
                        });
                    });
                };
                dispatch(appointmentsFetched(appointmetList));
            });
    };
};