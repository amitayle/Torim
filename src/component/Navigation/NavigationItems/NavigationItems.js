import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import { useSelector } from 'react-redux';



const NavigationItems = props => {

    const uid = useSelector(state => state.auth.userId);
    const isAdmin = useSelector(state => state.auth.isAdmin);

    let items = (
        <>
            <NavigationItem link={'/'} exact >קביעת תור</NavigationItem>
            <NavigationItem link={'/auth'}>התחברות/הרשמה</NavigationItem>
        </>
    );

    if (uid) {
        items = (
            <>
                <NavigationItem link={'/'} exact >קביעת תור</NavigationItem>
                <NavigationItem link={'/myAppointment'}>תורים שנקבעו</NavigationItem>
                <NavigationItem link={'/logout'}>להתנתק</NavigationItem>
            </>
        );
    }
    if (isAdmin) {
        items = (
            <>
                <NavigationItem link={'/'} exact >לוח תורים</NavigationItem>
                <NavigationItem link={'/admin'} >קביעת זמני עבודה</NavigationItem>
                <NavigationItem link={'/myAppointment'} >תורים שהוזמנו</NavigationItem>
                <NavigationItem link={'/logout'}>להתנתק</NavigationItem>
            </>
        );
    }

    return (
        <ul className={classes.NavigationItems}>
            {items}
        </ul>
    );
};
export default NavigationItems;