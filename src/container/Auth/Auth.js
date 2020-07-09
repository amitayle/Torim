import React, { useState, useCallback } from 'react'

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../component/UI/Input/Input';
import { Redirect } from 'react-router';
import Button from '../../component/UI/Button/Button';


const Auth = props => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const uid = useSelector(state => state.auth.userId);
    const switchSignMode = () => setIsSignUp(!isSignUp);

    const dispatch = useDispatch();
    const onAuth = useCallback((isSignUp, name, email, password) =>
        dispatch(actions.auth(isSignUp, name, email, password)), [dispatch]);

    const authHendler = (event) => {
        event.preventDefault();
        onAuth(isSignUp, name, email, password);
    };

    const form =
        <div className={classes.Form}>
            {isSignUp ? null :
                <Input
                    type={'text'}
                    title={'שם מלא'}
                    placeholder={'הכניסי את שמך'}
                    value={name}
                    changed={(event) => setName(event.target.value)} />}

            <Input
                type={'email'}
                title={'דואר אלקטרוני'}
                placeholder={'כתובת האימייל שלך'}
                value={email}
                changed={(event) => setEmail(event.target.value)} />

            <Input
                type={showPassword ? 'text' : 'password'}
                title={'סיסמא'}
                placeholder='הכניסי סיסמא'
                value={password}
                changed={(event) => setPassword(event.target.value)} />
            <div>
                <input
                    className={classes.CheckBox}
                    type={'checkbox'}
                    defaultChecked={showPassword}
                    changed={() => setShowPassword(!showPassword)} />
                להציג את הסיסמא
            </div>
        </div>


    let redirect = null;
    if (uid) {
        redirect = <Redirect to='/' />
    };

    const log = 'התחברות';
    const up = 'הרשמה';

    return (
        <div className={classes.Auth}>
            {redirect}
            <h1>{isSignUp ? log : up}</h1>
            <form onSubmit={authHendler}>
                {form}
                <Button>{isSignUp ? log : up}</Button>
                <div className={classes.SwitchMode}>
                    {isSignUp ? 'אם אין לך חשבון' : 'כבר יש לך חשבון'}?
                    <span onClick={switchSignMode}>לחצי כאן</span>
                </div>
            </form>
        </div>
    );
};
export default Auth;