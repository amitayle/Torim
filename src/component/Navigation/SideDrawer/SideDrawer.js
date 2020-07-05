import React from 'react';
import BackDrop from '../../UI/BackDrop/BackDrop';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Burger from './DrawerToggle/DrawerToggle'

const sideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
            <BackDrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                {/* <div className={classes.Logo}>
                    <Logo />
                </div> */}
                <nav onClick={props.closed}>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}
export default sideDrawer;