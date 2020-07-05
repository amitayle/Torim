import React, { useState } from 'react'

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const Layout = props => {


    const [sideDrawerShow, setSideSrawerShow] = useState(false);
    const toggleSideDrawer = () => { setSideSrawerShow(!sideDrawerShow) };

    return (
        <div className={classes.Layout}>
            <Toolbar DrawerToggleClicked={toggleSideDrawer} />
            <SideDrawer show={sideDrawerShow} closed={toggleSideDrawer} />
            <main className={classes.Main}>
                {props.children}
            </main>
        </div>
    )
}
export default Layout;