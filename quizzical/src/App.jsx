import { useState, useEffect } from 'react'
import Welcome from './app-components/welcome'
import Active from './app-components/active'

function App() {
  const [started, setStarted] = useState(false)
  const [answered, setAnswered] = useState(false)

  function toggleStarted(){
    setStarted(prevStarted => !prevStarted)
    console.log(started)
  }
  function toggleAnswered(){
    setAnswered(prevAnswered => !prevAnswered)
    console.log(answered)
  }
  function toggle(){
    toggleAnswered()
    toggleStarted()
  }
  return (
    <>
      <Welcome isStarted={started} handleClick={toggleStarted}/>
      <Active isAnswered={answered} handleClick={toggleAnswered} isStarted={started} />
    </>
  )
}

export default App
