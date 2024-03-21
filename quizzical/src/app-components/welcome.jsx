import { useState, useEffect } from 'react'

function Welcome(props) {
    if(!props.isStarted){
        return (
            <div className='welcome'>
                <div className='welcome-inside'>
                <h1>Quizzical</h1>
                <p>Five questions await. How many can you nail? Let's find out!</p>
                <button onClick={props.handleClick}>Start quiz</button>
                </div>
            </div>
          )
    }else{
        return(null)
    }
  
}

export default Welcome
