import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';


const initialState = {
    selectedDate: null,
    date: '',
    time: '',
    miliseconds: '',
    // adminTimes: [],
    durationOfMeeting: 0,
    spinner: false,
    errMessage: null,
    bookedSuccessful: false,
    drawerOpen: false
};

const dateSelected = (state, action) => {
    return updateObject(state, { selectedDate: action.date });
};

const vacancySelected = (state, action) => {
    return updateObject(state, {
        date: action.date,
        time: action.time,
        miliseconds: action.miliseconds,
        bookedSuccessful: false,
        errMessage: null
    });
};

// const getAdminTimes = (state, action) => {
//     return updateObject(state, { adminTimes: action.times });
// };

const getDuration = (state, action) => {
    return updateObject(state, { durationOfMeeting: action.duration });
};

const startBooking = (state, action) => {
    return updateObject(state, {
        spinner: true,
        errMessage: null
    });
};

const bookedSuccessful = (state, action) => {
    return updateObject(state, {
        spinner: false,
        errMessage: null,
        bookedSuccessful: true
    });
};

const bookedFail = (state, action) => {
    return updateObject(state, {
        spinner: false,
        errMessage: action.errorMessage,
        bookedSuccessful: false
    })
};

const drawerToggleClicked = (state, action) => {
    return updateObject(state, {
        drawerOpen: !state.drawerOpen
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DATE_SELECTED: return dateSelected(state, action);
        case actionTypes.VACANCY_SELECTED: return vacancySelected(state, action);
        // case actionTypes.GET_ADMIN_TIMES: return getAdminTimes(state, action);
        case actionTypes.GET_DURATION: return getDuration(state, action);
        case actionTypes.START_BOOKING: return startBooking(state, action);
        case actionTypes.BOOKED_SUCCESSFUL: return bookedSuccessful(state, action);
        case actionTypes.BOOKED_FAIL: return bookedFail(state, action);
        case actionTypes.DRAWER_TOGGLE_CKLICED: return drawerToggleClicked(state, action);
        default: return state;
    }
}
export default reducer;