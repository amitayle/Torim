import * as actionTypes from './actionTypes';
import firebase from '../../FirebaseInstance';



export const dateSelected = (date) => {
    return {
        type: actionTypes.DATE_SELECTED,
        date: date
    };
};

export const vacancySelected = (date, time, miliseconds) => {
    return {
        type: actionTypes.VACANCY_SELECTED,
        date: date,
        time: time,
        miliseconds: miliseconds
    };
};

export const appointmentBooked = (date, time, miliseconds) => {
    return dispatch => {
        dispatch(startBooking())
        const user = firebase.auth().currentUser;
        const appointment = {
            userId: user.uid,
            name: user.displayName,
            time: time,
            date: date,
            miliseconds: miliseconds
        }
        firebase.database().ref(`client/bookedAppointment/`).push(appointment)
            .then(res => {
                dispatch(bookedSuccessful())
            }).catch(err => {
                console.log(err.message); //todo: hendel err
                dispatch(bookedFail(err.message));
            });
    };
};

export const startBooking = () => {
    return {
        type: actionTypes.START_BOOKING
    };
};

export const bookedSuccessful = () => {
    return {
        type: actionTypes.BOOKED_SUCCESSFUL
    };
};

export const bookedFail = (errMessage) => {
    return {
        type: actionTypes.BOOKED_FAIL,
        errorMessage: errMessage
    };
};

// export const getAdminTimes = (times) => {
//     return {
//         type: actionTypes.GET_ADMIN_TIMES,
//         times: times
//     };
// };

export const getDuration = (duration) => {
    return {
        type: actionTypes.GET_DURATION,
        duration: duration
    };
};

export const drawerToggleClicked = () => {
    return {
        type: actionTypes.DRAWER_TOGGLE_CKLICED
    }
}