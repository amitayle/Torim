import React, { useCallback } from 'react';
import BackDrop from '../../UI/BackDrop/BackDrop';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';

const SideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    const dispatch = useDispatch();
    const drawerToggleClicked = useCallback(() =>
        dispatch(actions.drawerToggleClicked()), [dispatch]);

    return (
        <>
            <BackDrop show={props.show} clicked={drawerToggleClicked}/>
            <div className={attachedClasses.join(' ')}>
                <nav onClick={drawerToggleClicked}>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}
export default SideDrawer;