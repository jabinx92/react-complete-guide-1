import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    } )
  }

  makeMeYounger = () => {
    const newState = this.state.persons.forEach((user) => {
      const tempUser = user;
      tempUser.age += 10;
      return tempUser;
    });
    this.setState({
      newState
    });
  }

  changeMyName = () => {
    const changedName = this.state.persons.forEach((username) => {
      let tempUser = username;
      username.name = 'error'
      return tempUser;
    });
    this.setState({
      changedName
    })
  }

  render () {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>
        <button onClick={() => this.makeMeYounger()}>Make me younger</button>
        <button onClick={() => this.changeMyName()}>Error Button</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;

//break   

//=======================================================================================
import React, {Component} from "react"




/**
 * Challenge: Wire up the partially-finished travel form so that it works!
 * Remember to use the concept of controlled forms
 * https://reactjs.org/docs/forms.html
 * 
 * All information should be populating the text below the form in real-time
 * as you're filling it out
 * 
 * This exercise is adapted from the V School curriculum on vanilla JS forms:
 * https://coursework.vschool.io/travel-form/
 * 
 * All of our challenges and learning resources are open for the public
 * to play around with and learn from at https://coursework.vschool.io
 */

class App extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            destination: '',
            dietaryRestrictions: {
              vegan: false,
              kosher: false,
              lactose: false
            }
        }
    }
    handleChange = (event) => {
        event.target.type === "checkbox" ? this.setState({
            [event.target.name] : event.target.checked
        }) : this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) => {
        alert(
        `First Name: ${this.state.firstName}\nLast Name: ${this.state.lastName}\nAge: ${this.state.age}\nGender: ${this.state.gender}\nLocation: ${this.state.destination}\nDietary Restrictions: ${this.state.kosher ? '-Kosher' : ''} ${this.state.vegan ? '-Vegetarian' : ''} ${this.state.lactose ? '-Lactose' : ''}
        `);
        event.preventDefault();
    }
    
    render() {
        return (
            <main>
                <form>
                    <input type='text' value={this.state.firstName} placeholder="First Name" name='firstName' onChange={this.handleChange}/><br />
                    
                    <input type='text' value={this.state.lastName} placeholder="Last Name" name='lastName' onChange={this.handleChange}/><br />
                
                    <input type='number' value={this.state.age} placeholder="Age" name='age' onChange={this.handleChange}/><br />
                    
                    {/* Create radio buttons for gender here */}
                    <br />
                    <label>
                    <input 
                        type="radio" 
                        name="gender"
                        value="Male"
                        checked={this.state.gender === "Male"}
                        onChange={this.handleChange}
                    /> Male
                    
                    <br />
                    
                    <input 
                        type="radio" 
                        name="gender"
                        value="Female"
                        checked={this.state.gender === "Female"}
                        onChange={this.handleChange}
                    /> Female
                    </label>
                    
                    {/* Create select box for location here */}
                    <br />
                    <select value={this.state.destination} name='destination'  onChange={this.handleChange}>
                           <option value="">-- Please Choose a Destination --</option>
                         <option value="Langkawi, Thailand">Langkawi, Thailand</option>
                         <option value="Beijing, China">Beijing, China</option>
                         <option value="Wellington, New Zealand">Wellington, New Zealand</option>
                     </select>
                    
                    {/* Create check boxes for dietary restrictions here */}
                    <br />
                    <label>
                    <input 
                        type="checkbox" 
                        name="kosher"
                        checked={this.state.dietaryRestrictions.kosher}
                        onChange={this.handleChange}
                    /> Is kosher?
                    </label>
                    <br />
                    <label>
                    <input 
                        type="checkbox" 
                        name="vegan"
                        checked={this.state.dietaryRestrictions.vegan}
                        onChange={this.handleChange}
                    /> Is vegetarian?
                    </label>
                    <br />
                    <label>
                    <input 
                        type="checkbox" 
                        name="lactose"
                        checked={this.state.dietaryRestrictions.lactose}
                        onChange={this.handleChange}
                    /> Is lactose?
                    </label>
                     <br />
                    
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
                <hr />
                <h2>Entered information:</h2>
                <p>Your name: {this.state.firstName} {this.state.lastName}</p>
                <p>Your age: {this.state.age}</p>
                <p>Your gender: {this.state.gender}</p>
                <p>Your destination: {this.state.destination}</p>
                <p>
                    Your dietary restrictions: 
                    {/* Dietary restrictions here, comma separated */}
                    {this.state.kosher?'Kosher':''} {this.state.vegan?'Vegan':''}    {this.state.lactose?'Lactose':''}
                </p>
            </main>
        )
    }
}

export default App // test   