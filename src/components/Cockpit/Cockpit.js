import React from 'react'
import classes from './Cockpit.css'

console.log('cockpit.js')
const cockpit = (props) => {

    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red
    }
    if(props.persons.length <= 2) {
      assignedClasses.push(classes.red); //assignedClasses = ['red']
    }

    if(props.persons.length <= 1) {
      assignedClasses.push(classes.bold); //assignedClasses = ['red','bold']
    }
    return (
        <div className={classes.Cockpit}>

        <h1>Hi I am really working!</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;