import React, { useContext } from 'react'
import { FormData } from '../../context/FormContext'
/* Styles */
import './Question.css'

const Question = () => {
  const {setIsRegistrando} = useContext(FormData)
  
  return (
    <>
      <div className='container-question'>
        <h2 className='title'>Ya tienes una cuenta?</h2>
        <div className='container-desition'>
          <button onClick={() => setIsRegistrando(true)}>si</button>
          <button onClick={() => setIsRegistrando(false)}>no</button>
        </div>
      </div>
    </>
  )
}

export default Question