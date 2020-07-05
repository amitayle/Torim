import React, { useCallback } from 'react'
import classes from './DaySetUp.module.css';
import * as action from '../../store/actions/index';
import { connect, useDispatch, useSelector } from 'react-redux';




const DaySetUp = props => {

    const from = allDaysTimes[props.dayNumber].from;
    const to = allDaysTimes[props.dayNumber].to;

    const dispatch = useDispatch()
    const onChangeFrom = useCallback((day, time) =>
        dispatch(action.changeFrom(day, time)), [dispatch]);
    const onChangeTo = useCallback((day, time) =>
        dispatch(action.changeFrom(day, time)), []);

        const allDaysTimes = useSelector(state => state.admin.times);

    return (
        <div className={classes.Day}>
            <h2>{props.day}</h2>
            <h3>  משעה:</h3>
            <input
                type='time'
                className={classes.InputTime}
                value={from}
                onChange={(event) => onChangeFrom(props.dayNumber, event.target.value)} />
            <h3>  עד שעה:</h3>
            <input
                type='time'
                className={classes.InputTime}
                value={to}
                onChange={(event) => onChangeTo(props.dayNumber, event.target.value)} />

        </div>
    );
};

export default DaySetUp;