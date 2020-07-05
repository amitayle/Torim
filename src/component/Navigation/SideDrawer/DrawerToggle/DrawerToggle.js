import React, { useState } from 'react'

import classes from './DrawerToggle.module.css'

const DrawerToggle = props => {
    const [sideDrawerShow, setSideSrawerShow] = useState(false);
    const toggleSideDrawer = () => { 
        setSideSrawerShow(!sideDrawerShow) 
         props.clicked()
};

    let BurgerClasses = [classes.DrawerToggle];
    if(sideDrawerShow){
        BurgerClasses.push([ classes.Open]);
    }

   return (
        <div className={BurgerClasses.join(' ')} onClick={toggleSideDrawer}>
            <div className={classes.Line}></div>
        </div>
    )
};
export default DrawerToggle;