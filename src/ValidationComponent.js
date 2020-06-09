import React from 'react'

const ValidationComponent = (prop) => {
    return (
    <div>{prop.count > 5 ? 'Text long enough.' : 'Text too short'}</div>
    )
}

export default ValidationComponent