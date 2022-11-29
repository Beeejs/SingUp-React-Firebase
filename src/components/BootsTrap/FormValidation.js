import React, { useContext, useState } from 'react';
import { FormData } from '../../context/FormContext'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
/* Google icon */
import iconGoogle from '../../img/icon-google.png';
import Question from '../../screens/Question/Question';


function FormExample() {

  const [validated, setValidated] = useState(false);
  const {submitHandler,singInWithGoogle,isRegistrando,setIsRegistrando} = useContext(FormData)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(false);
    }else{
      submitHandler()
    }
    setValidated(true);
  };

  return (
    <>
      {isRegistrando === null ? <Question/> : <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Button className='btn-back' onClick={() => {setIsRegistrando(null)}}><i className="fa-solid fa-arrow-left"></i></Button>
      <h1 className='title'>{isRegistrando ? 'Iniciar sesión' : 'Registrate'}</h1>
      <Form.Group className="mb-5" as={Col} md="12" controlId="validationCustom01">
        <FloatingLabel controlId="email" label="Email address">
          <Form.Control
            required
            type="email"
            placeholder=" "
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-5" as={Col} md="12" controlId="validationCustom02">
        <FloatingLabel controlId="password" label="Password">
          <Form.Control
            required
            type="text"
            placeholder=" "

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-5" controlId="validationCustom03">
        {isRegistrando 
        ? 
          null 
        : 
          <select className='select-container' id='rol'>
            <option value='admin'>Administrador</option>
            <option value='user'>Usuario</option>
          </select>
        }
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <div className='container-button'>
        <Button type="submit">{isRegistrando ? 'Iniciar sesión' : 'Registrarse'}</Button>
        <Button className='btn-google' type="submit" onClick={singInWithGoogle}><img src={iconGoogle} alt='icon-google'/>Sing with Google</Button>
      </div>
      <div className='container-aviso'>
        <p className='aviso-google'>Si ingresas con Google serás permanentemente Usuario!</p>
      </div>
    </Form>}
    </>

    
  );
}

export default FormExample