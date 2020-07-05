import React from 'react'

import BackDrop from '../BackDrop/BackDrop';
import classes from './Modal.module.css';


const modal = props => (
    <>
        <BackDrop show={props.show} clicked={props.closeModal} />
        <div className={classes.Modal}
            style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            {props.children}
        </div>
    </>
);
export default modal;