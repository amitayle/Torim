import React, { useEffect, useCallback } from 'react'
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Logout = props =>{

    const dispatch = useDispatch();
    const onLogout = useCallback(() =>
        dispatch(actions.logOut()), [dispatch]);

    useEffect(() => {
        onLogout();

    }, [onLogout]);

    return(
        <Redirect to='/'/>
    );
};
export default Logout;