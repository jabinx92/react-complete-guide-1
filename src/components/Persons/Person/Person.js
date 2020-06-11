import React from "react";
import classes from './Person.css';


console.log('person.js')
const person = (props) => {
    return (
        // <div className="Person" style={style}>
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p> {/*children refers to any elements between opening and closing component - ie My Hobbies: Racing*/} 
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person