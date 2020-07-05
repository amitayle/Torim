import React from 'react'
import classes from './AreYouSure.module.css';
import Button from '../UI/Button/Button';

const areYouSure = props => (
    <div className={classes.AreYouSure}>
        <h2>?האם לבטל את התור</h2>
        <div><strong>בתאריך:</strong> {props.date}</div>
        <div><strong>בשעה:</strong> {props.time}</div>
        <Button clicked={props.cancel}>לא</Button>
        <Button clicked={props.ok}>כן</Button>
    </div>
);
export default areYouSure;