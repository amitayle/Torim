import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility';

const initialState = {
    appointments: null
};

const appointmentsFetched = (state, action) => {
    return updateObject(state, {appointments: action.appointments});
};

const reducer = (state = initialState, action ) => {
    switch (action.type){
        case actionTypes.APPOINTMENTS_FETCHED: return appointmentsFetched(state, action);
        default: return state;
    };
};

export default reducer;