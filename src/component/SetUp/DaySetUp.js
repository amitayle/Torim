import React, { useCallback } from 'react'
import classes from './DaySetUp.module.css';
import * as action from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';




const DaySetUp = props => {

    const allDaysTimes = useSelector(state => state.admin.setUpTimes)
    const from = allDaysTimes[props.dayNumber].from;
    const to = allDaysTimes[props.dayNumber].to;

    const dispatch = useDispatch()
    const onChangeFrom = useCallback((day, time) =>
        dispatch(action.changeFrom(day, time)), [dispatch]);
    const onChangeTo = useCallback((day, time) =>
        dispatch(action.changeFrom(day, time)), [dispatch]);


    return (
        <div className={classes.Day}>
            <h2>{props.day}</h2>
            <div>  משעה:</div>
            <input
                type='time'
                className={classes.InputTime}
                value={from}
                onChange={(event) => onChangeFrom(props.dayNumber, event.target.value)} />
            <div>  עד שעה:</div>
            <input
                type='time'
                className={classes.InputTime}
                value={to}
                onChange={(event) => onChangeTo(props.dayNumber, event.target.value)} />

        </div>
    );
};

export default DaySetUp;