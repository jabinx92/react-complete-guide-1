import React from 'react';
import Person from './Person/Person.js';


console.log('text')
const persons = (props) =>

    props.persons.map((person, index) => {
        console.log('this works')
     return <Person 
        click={() => props.clicked(index)}
        name={person.name}
        age={person.age}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}/>
    })


export default persons; 