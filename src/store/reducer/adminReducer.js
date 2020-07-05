import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility';


const initialState = {
    times: {
        1: {
            from: '',
            to: ''
        },
        2: {
            from: '',
            to: ''
        },
        3: {
            from: '',
            to: ''
        },
        4: {
            from: '',
            to: ''
        },
        5: {
            from: '',
            to: ''
        },
        6: {
            from: '',
            to: ''
        }
    },
    duration: ''
};

const changeFrom = (state, action) => {
    const updateFrom = updateObject(state.times[action.dayNumber], { from: action.time });
    const upt = updateObject(state.times, {[action.dayNumber]: updateFrom});
    return updateObject(state, {times: upt});
};

const changeTo = (state, action) => {
    const updateTo = updateObject(state.times[action.dayNumber], { to: action.time });
    const upt = updateObject(state.times,  {[action.dayNumber]: updateTo});
    return updateObject(state, { times: upt });
};

const addDuration = (state, action) => {
    return updateObject(state, {duration: action.duration})
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_FROM: return changeFrom(state, action);
        case actionTypes.CHANGE_TO: return changeTo(state, action);
        case actionTypes.ADD_DURATION: return addDuration(state, action);
        default: return state;
    };
};
export default reducer;