import React from 'react';

import classes from './Vacancy.module.css';


const Vacancy = props => (
    <div className={classes.Vacancy} onClick={props.clicked} >
        {props.time}
    </div>
)
export default Vacancy;