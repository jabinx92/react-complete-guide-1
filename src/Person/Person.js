import React from "react"

const person = (props) => {
return (
    <div>
        <p>I'm {props.name} and I  am {props.age} years old!</p>
        <p>{props.children}</p> {/*children refers to any elements between opening and closing component - ie My Hobbies: Racing*/} 
    </div>
)
}

export default person  