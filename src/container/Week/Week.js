import React, { useEffect, useState } from 'react';
import classes from './Week.module.css';

import Day from '../Day/Day';
import {useSelector } from 'react-redux';

const Week = props => {

    const [size, setSize] = useState();
    const selectedDate = useSelector(state => state.client.selectedDate);
    
    const getWeek = () => {
            if (selectedDate === null) {
                props.history.push('/');
                return [];
            };
            if (window.innerWidth < 768 ){
                return [selectedDate]
            }
            const first = selectedDate.getDate() - selectedDate.getDay();
            const last = first + 6;
            const days = [];

            for (let day = first; day < last; day++) {
                days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
            }
            return days;
    };

    //pupulate the week 
    const fullWeek = getWeek().map(date => (
        <Day
            key={date}
            date={date}
        />
    ));

    useEffect(() => { }, [size]);
    useEffect(() => {
        window.onresize = event => (setSize(window.innerWidth));
    }, []);

    return (
        <div className={classes.Week}>
            {fullWeek}
        </div>
    );
};
export default Week;