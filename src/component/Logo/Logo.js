import React from 'react'

import LuckyLogo from '../../Assets/nails.jpeg';
import classes from './Logo.module.css';

const logo = props => (
    <div
        className={classes.Logo}
        style={{height: props.height }}>
        <img src={LuckyLogo} alt='lucky gel'/>
    </div>
);
export default logo;