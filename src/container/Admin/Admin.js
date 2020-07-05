import React, { useState, useEffect } from 'react';
import DaySetUp from '../../component/SetUp/DaySetUp';
import classes from './Admin.module.css';
import axios from '../../Axios';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import { updateObject, timeSeparator } from '../../utility';
import Modal from '../../component/UI/Modal/Modal';
import firebase from '../../FirebaseInstance';



const Admin = props => {


    const [durationOfMeeting, setDurtionOfMeeting] = useState('30');
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
    const appointmentTimes = ['15','30', '45', '60', '90', '120'];
    const optionsTime = appointmentTimes.map(time => (
        <option key={time} value={time} >{time}</option>
    ));
    const setUpAllDays = dayNames.map((day, index) => (
        <DaySetUp key={day} day={day} dayNumber={index + 1} />
    ));


    const getAllMinutes = (from, to) => {
        const a = new Date();
        const b = new Date();

        a.setHours(from[0], from[1]);
        b.setHours(to[0], to[1]);

        return Math.floor((b - a) / 60000);
    };

    const onSetUp = (event) => {
        event.preventDefault()
        let times = props.times
        for (const day in times) {
            const from = timeSeparator(times[day].from);
            const to = timeSeparator(times[day].to);
            const minutes = getAllMinutes(from, to);
            const updatedDay = updateObject(times[day], { minutesInDay: minutes });
            const updatedTimes = updateObject(times, { [day]: updatedDay });
            times = updatedTimes;
        };
        props.addDuration(durationOfMeeting);

        //todo: move to action
        Promise.all([
            firebase.database().ref('/admin/times').set(times),
            firebase.database().ref('/admin/durationOfMeeting').set(durationOfMeeting)
        ]).then(([times, duration]) => {
            toggleModal();
        }).catch(err =>{
            console.log(err.message);
            
        });
    };


    useEffect(() => {
        //todo: move to action
        axios.get('/admin/times.json')
            .then(response => {
                for (const day in response.data) {
                    if (day !== '0') {
                        props.onChangeFrom(day, response.data[day].from)
                        props.onChangeTo(day, response.data[day].to)
                    }
                }
            }).catch(err => {
                console.log(err.message);//todo: error hendel
            });

        axios.get('/admin/durationOfMeeting.json')
            .then(response => {
                setDurtionOfMeeting(response.data)
                props.addDuration(response.data)
            });
    }, []);



    return (
        <div className={classes.Picker}>
            <Modal
                show={showModal}
                closeModal={toggleModal}>
                <h2>marchaba</h2>
                <button onClick={toggleModal}>ok</button> </Modal>
            <h1>מילוי תורים</h1>

            <form onSubmit={onSetUp} >
                <h3>אורך פגישה:</h3>
                <select
                    value={durationOfMeeting}
                    onChange={(event) => setDurtionOfMeeting(event.target.value)}>
                    {optionsTime}
                </select>
                <div className={classes.Days}>
                    {setUpAllDays}
                </div>
                <br />
                <button >OK</button>
            </form>

        </div>
    );

};

const mapStateToProps = state => {
    return {
        times: state.admin.times,
        duration: state.admin.duration,
        uid: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeFrom: (day, time) => dispatch(action.changeFrom(day, time)),
        onChangeTo: (day, time) => dispatch(action.changeTo(day, time)),
        addDuration: (duration) => dispatch(action.addDuration(duration))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
