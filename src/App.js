import { useState } from 'react';
import './App.css';

/* Screens */
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import FormContext from './context/FormContext';
/* Credenciales */
import { app } from './firebase/Credenciales';
import {getAuth , onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(app)


function App() {

  const [user , setUser] = useState(null)

  //Si hay user o no
  onAuthStateChanged(auth, (user) =>{
    user ? setUser(user) : setUser(null);
  })

  return (
   <>
    <FormContext>
      <section className='app-container'>
        {user ? <Home user={user}/> : <Login/>}
      </section>
    </FormContext>
   </>
  );
}

export default App;
