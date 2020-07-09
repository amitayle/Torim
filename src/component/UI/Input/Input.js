import React from 'react'
import classes from './Input.module.css';

const Input = props => (
    <>
        <label className={classes.Label}>{props.title}</label>
        <input className={classes.class}
            type={props.type}
            value={props.value}
            onChange={props.changed}
            placeholder={props.placeholder}
            
        />
    </>
);
export default Input;