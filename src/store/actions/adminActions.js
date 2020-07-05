import * as actionTypes from './actionTypes';

export const changeFrom = (dayNumber, time) => {
    return{
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
    return{
        type: actionTypes.ADD_DURATION,
        duration: duration
    };
};