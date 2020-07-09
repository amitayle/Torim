import React from 'react';

import classes from './Vacancy.module.css';


const Vacancy = props => {
    const attachedClasses = [classes.Vacancy];
    if(props.was){
        attachedClasses.push(classes.Was)
    }
    return(
    <div className={attachedClasses.join(' ')} onClick={props.clicked} >
        {props.time}
    </div>
)};
export default Vacancy;