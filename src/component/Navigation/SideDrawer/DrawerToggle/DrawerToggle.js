import React, {  useCallback } from 'react'

import classes from './DrawerToggle.module.css'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const DrawerToggle = props => {

    const sideDrawerOpen = useSelector(state => state.client.drawerOpen);
    const dispatch = useDispatch();
    const drawerToggleClicked = useCallback(() => 
        dispatch(actions.drawerToggleClicked()),[dispatch]);

    let BurgerClasses = [classes.DrawerToggle];
    if(sideDrawerOpen){
        BurgerClasses.push([ classes.Open]);
    };

   return (
        <div className={BurgerClasses.join(' ')} onClick={drawerToggleClicked}>
            <div className={classes.Line}></div>
        </div>
    );
};
export default DrawerToggle;