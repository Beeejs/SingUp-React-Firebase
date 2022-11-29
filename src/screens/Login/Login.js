import React , {useContext} from 'react'
/* Styles */
import './Login.css'
/* Components */
import { FormData } from '../../context/FormContext'
import Question from '../Question/Question'
import FormExample from '../../components/BootsTrap/FormValidation'

const Login = () => {

  const {isRegistrando} = useContext(FormData)
  return (
    <>
      <section className='container-login'>
        {isRegistrando === null ? <Question/> : <FormExample/>}
      </section>
    </>
  )
}

export default Login