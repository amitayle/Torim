import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '.././../component/UI/Spinner/Spinner';
import Appointment from '../../component/Appointment/Appointment';
import Modal from '../../component/UI/Modal/Modal';
import AreYouSure from '../../component/AreYouSure/AreYouSure';
import firebase from '../../FirebaseInstance';
import classes from './MyAppointment.module.css';

const MyAppointment = props => {

    const appointments = useSelector(state => state.appointments.appointments);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const [selectedAppt, setSelectedAppt] = useState({});
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const onFetchAppointments = useCallback((uid) =>
    dispatch(actions.fetchAppointment(uid)), [dispatch]);
    const onDeleteAppointment = useCallback((key, uid) => {
        dispatch(actions.deleteAppointment(key, uid))
    }, [dispatch]);
    
    const toggleModal = () => { setShowModal(!showModal) };

    let uid = useSelector(state => state.auth.userId);
    if (isAdmin) {
        uid = 'admin';
    };
    
    const deleteAppointment = (key) => {
        onDeleteAppointment(key, uid);
        toggleModal()
    };

    let displayAppointments = <Spinner />;
    if (appointments !== null) {
        appointments.sort((a, b) => b.miliseconds - a.miliseconds);
        const todayMiliseconds = new Date().getTime();
        displayAppointments = appointments.map(appt => (
            <Appointment
                key={appt['key']}
                name={appt['name']}
                delete={() => areYouSure(appt['key'], appt['date'], appt['time'])}
                date={appt['date']}
                time={appt['time']}
                admin={isAdmin}
                was={todayMiliseconds - appt.miliseconds}
            />
        ));

    };

    const areYouSure = (key, date, time) => {
        setSelectedAppt({
            key: key,
            date: date,
            time: time
        });
        toggleModal();
    };

    useEffect(() => {
        onFetchAppointments(uid);

    }, [uid, onFetchAppointments]);

    return (
        <div className={classes.MyAppointments}>
            <Modal
                show={showModal}
                closeModal={toggleModal}>
                <AreYouSure
                    date={selectedAppt.date}
                    time={selectedAppt.time}
                    ok={() => deleteAppointment(selectedAppt.key)}
                    cancel={toggleModal} />
            </Modal>
            {displayAppointments}
        </div>
    );
};
export default MyAppointment;