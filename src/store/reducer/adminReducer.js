import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility';


const initialState = {
    setUpTimes: {
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
    duration: '30',
    times: []
};

const changeFrom = (state, action) => {
    const updateFrom = updateObject(state.setUpTimes[action.dayNumber], { from: action.time });
    const upt = updateObject(state.setUpTimes, {[action.dayNumber]: updateFrom});
    return updateObject(state, {setUpTimes: upt});
};

const changeTo = (state, action) => {
    const updateTo = updateObject(state.setUpTimes[action.dayNumber], { to: action.time });
    const upt = updateObject(state.setUpTimes,  {[action.dayNumber]: updateTo});
    return updateObject(state, { setUpTimes: upt });
};

const addDuration = (state, action) => {
    return updateObject(state, {duration: action.duration})
};
const addTimes = (state, action) => {
    return updateObject(state, {times: action.times})
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_FROM: return changeFrom(state, action);
        case actionTypes.CHANGE_TO: return changeTo(state, action);
        case actionTypes.ADD_DURATION: return addDuration(state, action);
        case actionTypes.ADD_TIMES: return addTimes(state, action);
        default: return state;
    };
};
export default reducer;