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

// class App extends React.Component {
//     constructor () {
//         super()
//         this.state = {
//             firstName: '',
//             lastName: '',
//             age: '',
//             gender: '',
//             destination: 'Langkawi, Thailand',
//             isKosher: false,
//             isVegetarian: false,
//             isLactose: false
//         }
//     }
    
//     handleChange = (event) => {
//         event.target.type === "checkbox" ? this.setState({
//             [event.target.name] : event.target.checked
//             }) :
//         this.setState({ 
//             [event.target.name] : event.target.value
//         })
//     }
    
//     handleSubmit = (event) => {
//         alert(
//         `First Name: ${this.state.firstName}\nLast Name: ${this.state.lastName}\nAge: ${this.state.age}\nGender: ${this.state.gender}\nLocation: ${this.state.destination}\nDietary Restrictions: ${this.state.isKosher ? 'Kosher' : ''}, ${this.state.isVegetarian ? 'Vegetarian' : ''}, ${this.state.isLactose ? 'Lactose' : ''}
//         `);
//         event.preventDefault();
//     }
    
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                 <label>
//                     <input 
//                         type='text'
//                         value={this.state.firstName} 
//                         name='firstName' 
//                         placeholder="First Name" 
//                         onChange={this.handleChange} 
//                     />
//                     <br />
//                     <input 
//                         type='text'
//                         value={this.state.lastName} 
//                         name="lastName" 
//                         placeholder="Last Name" 
//                         onChange={this.handleChange} 
//                     />
//                     <br />
//                     <input 
//                         type='number'
//                         value={this.state.age} 
//                         name='age' 
//                         placeholder="Age" 
//                         onChange={this.handleChange} 
//                     />
//                     <br />
//                     <label>
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="male"
//                         checked={this.state.gender === "male"}
//                         onChange={this.handleChange}
//                     /> Male
//                     </label>
//                     <br />
//                     <label>
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="female"
//                         checked={this.state.gender === "female"}
//                         onChange={this.handleChange}
//                     /> Female
//                     </label>
//                     <br />
//                     <select name='destination'  onChange={this.handleChange}>
//                         <option value="Langkawi, Thailand">Langkawi, Thailand</option>
//                         <option value="Beijing, China">Beijing, China</option>
//                         <option value="Wellington, New Zealand">Wellington, New Zealand</option>
//                     </select>
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="isKosher"
//                         checked={this.state.isKosher}
//                         onChange={this.handleChange}
//                     /> Is kosher?
//                     </label>
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="isVegetarian"
//                         checked={this.state.isVegetarian}
//                         onChange={this.handleChange}
//                     /> Is vegetarian?
//                     </label>
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="isLactose"
//                         checked={this.state.isLactose}
//                         onChange={this.handleChange}
//                     /> Is lactose?
//                     </label>
//                      <br />
//                     </label>
//                     <input type="submit" value="Submit" />

//                     <h1>{this.state.firstName} {this.state.lastName} {this.state.age ? this.state.age: null}</h1>
//                 </form>
//             </div>
//         )
//     }
// }

// export default App
//start