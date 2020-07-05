import React, { Suspense, useEffect, useCallback } from 'react';
import './App.css';

import Layout from './component/Layout/Layout';

import Month from './container/Month/Month';
import Admin from './container/Admin/Admin';
import Auth from './container/Auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import firebase from './FirebaseInstance';
import * as actions from './store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Week from './container/Week/Week';
import Logaout from './container/Auth/Logout/Logout';
import Spinner from './component/UI/Spinner/Spinner';


const MyAppointment = React.lazy(() => import('./container/MyApointment/MyAppointment'));

function App() {

  const isAdmin = useSelector(state => state.auth.isAdmin);
  const uid = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();
  const onAuthSuccess = useCallback((uid) =>
    dispatch(actions.authSuccess(uid)), [dispatch]);
  const onLogOut = useCallback(() =>
    dispatch(actions.logOut()), [dispatch]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onAuthSuccess(user.uid);
      } else {
        onLogOut();
      }
    });
  }, [onAuthSuccess, onLogOut])


  let routes = (
    <Switch>
      <Route path='/' exact component={Month} />
      <Route path='/week' render={(props) => <Week {...props} />} />
      <Route path='/auth' component={Auth} />
      <Redirect to='/' />
    </Switch>
  );

  if (uid) {
    routes = (
      <Switch>
        <Route path='/' exact component={Month} />
        <Route path='/week' component={Week} />
        <Route path='/auth' component={Auth} />
        <Route path='/logout' component={Logaout} />
        <Route path='/myAppointment' render={(props) => <MyAppointment {...props} />} />
        <Redirect to='/' />
      </Switch>
    );
  };

  if (isAdmin) {
    routes = (
      <Switch>
        <Route path='/' exact component={Month} />
        <Route path='/week' component={Week} />
        <Route path='/admin' component={Admin} />
        <Route path='/auth' component={Auth} />
        <Route path='/logout' component={Logaout} />
        <Route path='/myAppointment' render={(props) => <MyAppointment {...props} />} />
        <Redirect to='/' />
      </Switch>
    );
  };


  let layout = <Spinner />
  if (isAdmin !== null) {
    layout =
      <Layout>
        <Suspense fallback={<h1>loading..</h1>}>
          {routes}
          <div className='logo_lucky_luke'></div>
        </Suspense>
      </Layout>
  }

  return (
    <div className="App">
      {layout}
    </div>
  );
}

export default (App);
