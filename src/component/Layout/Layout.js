import React from 'react'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import { useSelector } from 'react-redux';

const Layout = props => {

    const sideDrawerOpen = useSelector(state => state.client.drawerOpen);

    return (
        <div className={classes.Layout}>
            <Toolbar/>
            <SideDrawer show={sideDrawerOpen} />
            <main className={classes.Main}>
                {props.children}
            </main>
        </div>
    )
}
export default Layout;