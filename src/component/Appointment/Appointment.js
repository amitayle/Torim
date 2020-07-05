import React from 'react';
import classes from './Appointment.module.css';
import Button from '../UI/Button/Button';

const appointment = props => {

    const attachedClasses = [classes.Appointment];
    if(props.was > 0){
        attachedClasses.push( classes.Was)
    };
    
    return(
        <div className={attachedClasses.join(' ')}>
            {props.admin ? (<h3>{props.name} הזמינה תור</h3>) : <h3> הזמנת תור</h3>}
            <div className={classes.Details}>
                <div><strong>בתאריך:</strong> {props.date}</div>
                <div><strong>לשעה:</strong> {props.time}</div>
                <Button clicked={props.delete} disabled={props.was > 0}>ביטול תור</Button>
            </div>
        </div>
    );
};
export default appointment;