//"npm start" on terminal to start this application on a local host


//this is a class based component example with state ==========================
import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import ValidationComponent from '../ValidationComponent';
import CharComponent from '../CharComponent';
import classes from './App.css'
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import Aux from '../hoc/Auxiliary'
import AuthContext from '../context/auth-context'


class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
    this.state = {
      input: "",
      persons: [
        { id: 'aawd', name: 'Max', age: 28 },
        { id: 'bfev', name: 'Manu', age: 29 },
        { id: 'cawd', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      boxes: "",
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }
  

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount = () => { //lifecycle hooks
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  componentDidUpdate () {
    console.log('[App.js] componentDidUpdate')
  }
  

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    } );
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

  deletePersonHandler = (personIndex) => {
    
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons];

    //always try to update state in a unmutated version, not doing so can cause problems. Above are 2 examples where state is saved in a new array, first const persons is sliced, creating a new array for the state. second const  is used with the ... spread operator into a new array, either way works.

    persons.splice(personIndex, 1); 
    this.setState({persons: persons})
  }

  deleteLetterHandler = (letterIndex) => {
    const letters = [...this.state.input.split('')];
    console.log(letters)

    letters.splice(letterIndex, 1);
    const updatedText = letters.join('')
    this.setState({input: updatedText})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.doesShow;
    this.setState({
      showPersons: !doesShow
    })
  }

  inputChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      input: event.target.value
    })
  }

  counted = (event) => {
    event.preventDefault();
    const count = this.state.input.length

    this.setState({
      length : count
    })
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render () {
    console.log('[App.js] render')

    console.log(this.state.authenticated)

    
    let persons = null;

    if(this.state.showPersons) {
      persons = 
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
            />

    }

    
    let joined = this.state.input.split('').map((letter, index) => {
        return <CharComponent 
          letter={letter}
          click={() => this.deleteLetterHandler(index)}
          input={this.state.input}
          key={index}
        />
    })
      
    


    return (
      <Aux>
        <form>
          <label>
            Type something:
            <input type="text" value={this.state.input} onChange={this.inputChangeHandler}/>
          </label>
        </form>
        
        <br></br>
        <div>{this.state.input}</div>

        <p>{this.state.input.length ? 'The input length is: ' + this.state.input.length: null}
        </p>

        <div>
        {this.state.input.length ? <ValidationComponent count={this.state.input.length}/> : null}
        </div>

        {joined}

        <br></br>
        <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
        <AuthContext.Provider 
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>

        {this.state.showCockpit ? (
          <Cockpit
          title={this.props.appTitle} 
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}
          />
          ) : null}
        {persons}
        </AuthContext.Provider>
      </Aux>
      
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    );
  }
}
export default withClass(App, classes.App);   

//this is a function based component example  with =============================================

// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';

// const App = props => {
//   const [personsState, setPersonsState] = useState({
//       persons: [
//         { name: 'Max', age: 28 },
//         { name: 'Manu', age: 29 },
//         { name: 'Stephanie', age: 26 }
//       ]
//     });

//     const [otherState, setOtherState] = useState('some other value');// you can have as many useState functions as you want

//     console.log(personsState, otherState)

//   const switchNameHandler = (newName) => {
//     setPersonsState( {
//       persons: [
//         { name: 'Maximo', age: 28 },
//         { name: 'Manu', age: 29 },
//         { name: 'Stephanie', age: 27 }
//       ],
//       otherState: otherState
//     } )
//   }

//   const nameChangedHandler = (event) => {
//     this.setState( {
//       persons: [
//         { name: 'Max', age: 28 },
//         { name: event.target.value, age: 29 },
//         { name: 'Stephanie', age: 26 }
//       ]
//     } )
//   }

//   const makeMeYounger = () => {
//     const newState = this.state.persons.forEach((user) => {
//       const tempUser = user;
//       tempUser.age += 10;
//       return tempUser;
//     });
//     this.setState({
//       newState
//     });
//   }

//   const changeMyName = () => {
//     const changedName = this.state.persons.forEach((username) => {
//       let tempUser = username;
//       username.name = 'error'
//       return tempUser;
//     });
//     this.setState({
//       changedName
//     })
//   }

  
//     return (
//       <div className="App">
//         <h1>Hi, I'm a React App</h1>
//         <p>I'm really working!</p>
//         <button onClick={switchNameHandler}>Switch Name</button>
//         <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
//         <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
//         <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
//       </div>
      
//     );
//     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
//   }

// export default App;

// the goal is to have an application that uses more stateless components than stateful components. WHY? makes app easier to maintain and manager, clear flow of data and clear logic setting

// dont get sphagetti code where everyone is doing their own thing, it gets confusing.
//terms to keep in mind, container, stateful, stateless, smart component,dumb component

//========================================================================
// import React, {Component} from "react"




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

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             firstName: '',
//             lastName: '',
//             age: '',
//             gender: '',
//             destination: '',
//             dietaryRestrictions: {
//               vegan: false,
//               kosher: false,
//               lactose: false
//             }
//         }
//     }
//     handleChange = (event) => {
//         event.target.type === "checkbox" ? this.setState({
//             [event.target.name] : event.target.checked
//         }) : this.setState({
//             [event.target.name] : event.target.value
//         })
//     }
//     handleSubmit = (event) => {
//         alert(
//         `First Name: ${this.state.firstName}\nLast Name: ${this.state.lastName}\nAge: ${this.state.age}\nGender: ${this.state.gender}\nLocation: ${this.state.destination}\nDietary Restrictions: ${this.state.kosher ? '-Kosher' : ''} ${this.state.vegan ? '-Vegetarian' : ''} ${this.state.lactose ? '-Lactose' : ''}
//         `);
//         event.preventDefault();
//     }
    
//     render() {
//         return (
//             <main>
//                 <form>
//                     <input type='text' value={this.state.firstName} placeholder="First Name" name='firstName' onChange={this.handleChange}/><br />
                    
//                     <input type='text' value={this.state.lastName} placeholder="Last Name" name='lastName' onChange={this.handleChange}/><br />
                
//                     <input type='number' value={this.state.age} placeholder="Age" name='age' onChange={this.handleChange}/><br />
                    
//                     {/* Create radio buttons for gender here */}
//                     <br />
//                     <label>
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="Male"
//                         checked={this.state.gender === "Male"}
//                         onChange={this.handleChange}
//                     /> Male
                    
//                     <br />
                    
//                     <input 
//                         type="radio" 
//                         name="gender"
//                         value="Female"
//                         checked={this.state.gender === "Female"}
//                         onChange={this.handleChange}
//                     /> Female
//                     </label>
                    
//                     {/* Create select box for location here */}
//                     <br />
//                     <select value={this.state.destination} name='destination'  onChange={this.handleChange}>
//                            <option value="">-- Please Choose a Destination --</option>
//                          <option value="Langkawi, Thailand">Langkawi, Thailand</option>
//                          <option value="Beijing, China">Beijing, China</option>
//                          <option value="Wellington, New Zealand">Wellington, New Zealand</option>
//                      </select>
                    
//                     {/* Create check boxes for dietary restrictions here */}
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="kosher"
//                         checked={this.state.dietaryRestrictions.kosher}
//                         onChange={this.handleChange}
//                     /> Is kosher?
//                     </label>
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="vegan"
//                         checked={this.state.dietaryRestrictions.vegan}
//                         onChange={this.handleChange}
//                     /> Is vegetarian?
//                     </label>
//                     <br />
//                     <label>
//                     <input 
//                         type="checkbox" 
//                         name="lactose"
//                         checked={this.state.dietaryRestrictions.lactose}
//                         onChange={this.handleChange}
//                     /> Is lactose?
//                     </label>
//                      <br />
                    
//                     <button onClick={this.handleSubmit}>Submit</button>
//                 </form>
//                 <hr />
//                 <h2>Entered information:</h2>
//                 <p>Your name: {this.state.firstName} {this.state.lastName}</p>
//                 <p>Your age: {this.state.age}</p>
//                 <p>Your gender: {this.state.gender}</p>
//                 <p>Your destination: {this.state.destination}</p>
//                 <p>
//                     Your dietary restrictions: 
//                     {/* Dietary restrictions here, comma separated */}
//                     {this.state.kosher?'Kosher':''} {this.state.vegan?'Vegan':''}    {this.state.lactose?'Lactose':''}
//                 </p>
//             </main>
//         )
//     }
// }

// export default App   

//start       