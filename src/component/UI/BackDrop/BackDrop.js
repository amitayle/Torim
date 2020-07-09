import React from 'react'
import classes from './BackDrop.module.css';


const backDrop = props => {

    let classssss = classes.B
    if(props.show){
        classssss = classes.BackDrop
    }
    return(
    <div className={classssss} onClick={props.clicked}></div> 
)}
export default backDrop;