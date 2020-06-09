import React from 'react'

const style = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black'
}

const CharComponent = (prop) => {

    return (
        <div style={style} onClick={prop.click} onChange={prop.change}>
            {console.log(prop.input)}
            {prop.letter}
        </div>
    )
}

export default CharComponent