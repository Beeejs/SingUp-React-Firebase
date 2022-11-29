import React, { createContext, useState } from 'react'
/* Credenciales */
import {app} from '../firebase/Credenciales';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore'
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();
export const FormData = createContext()
/* Sweetalert */
const Swal = require('sweetalert2')


const FormContext = ({children}) => {

  const [isRegistrando , setIsRegistrando] = useState(null)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  const registrarUsuario = async (email , password) =>{
    const rol = document.getElementById('rol').value
    //Crear el user con contrasena y email
    await createUserWithEmailAndPassword(auth,email,password)
      .then(userFirebase => {
        //Guardar la data en la base de datos
        const docRef = doc(db,`/users/${userFirebase.user.uid}`)
        setDoc(docRef,{email:email,rol:rol,password:password})
        Toast.fire({
          icon: 'success',
          title: `Signed in successfully ${email}`
        })
      })
      .catch(err =>{
        switch (err.code) {
          case 'auth/wrong-password':
            Toast.fire({
              icon: 'error',
              title: `Contrasena Incorrecta , vuelva a intentarlo!`
            })
            break;
          case 'auth/user-not-found':
            Toast.fire({
              icon: 'error',
              title: `Contrasena o usuarios incorrectos , vuelva a intentarlo!`
            })
            break;
          case 'auth/invalid-email':
            Toast.fire({
              icon: 'error',
              title: `El email es incorrecto! , vuelva a intentarlo`
            })
            break;
          case 'auth/too-many-requests':
            Toast.fire({
              icon: 'error',
              title: `Muchos intentos!`
            })
            break;
        
          default:
            
            if(err.code === undefined){
              return false
            }else{
              Toast.fire({
                icon: 'error',
                title: err.code
              })
            }
            break;
        }
      })
  
  }


  const singInUser =  async (email,password) =>{
    //Loguear el user
    await signInWithEmailAndPassword(auth,email,password)
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: `Signed in successfully ${res.user.email}`
        })
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/wrong-password':
            Toast.fire({
              icon: 'error',
              title: `Contrasena Incorrecta , vuelva a intentarlo!`
            })
            break;
          case 'auth/user-not-found':
            Toast.fire({
              icon: 'error',
              title: `Contrasena o usuarios incorrectos , vuelva a intentarlo!`
            })
            break;
          case 'auth/invalid-email':
            Toast.fire({
              icon: 'error',
              title: `El email es incorrecto! , vuelva a intentarlo`
            })
            break;
          case 'auth/too-many-requests':
            Toast.fire({
              icon: 'error',
              title: `Muchos intentos!`
            })
            break;
        
          default:
            
            if(err.code === undefined){
              return false
            }else{
              Toast.fire({
                icon: 'error',
                title: err.code
              })
            }
            break;
        }
      })
  }


  const singInWithGoogle = () =>{
    signInWithPopup(auth, provider)
      .then(res =>{
        const user = res.user;
        //Guardar la data en la base de datos
        const docRef = doc(db,`/users/${user.uid}`)
        setDoc(docRef,{name:user.displayName,email:user.email,rol:'user',password:'Sing in with Google',picture:user.photoURL}) 

        Toast.fire({
          icon: 'success',
          title: `Signed in successfully ${user.displayName}`
        })
      })
      .catch(err =>{
        switch (err.code) {
          
          case 'auth/wrong-password':
            Toast.fire({
              icon: 'error',
              title: `Contrasena Incorrecta , vuelva a intentarlo!`
            })
            break;
          case 'auth/user-not-found':
            Toast.fire({
              icon: 'error',
              title: `Contrasena o usuarios incorrectos , vuelva a intentarlo!`
            })
            break;
          case 'auth/invalid-email':
            Toast.fire({
              icon: 'error',
              title: `El email es incorrecto! , vuelva a intentarlo`
            })
            break;
          case 'auth/too-many-requests':
            Toast.fire({
              icon: 'error',
              title: `Muchos intentos!`
            })
            break;
        
          default:
            
            if(err.code === undefined || err.code === 'auth/popup-closed-by-user'){
              return false
            }else{
              Toast.fire({
                icon: 'error',
                title: err.code
              })
            }
            break;
        }
      })
  }

  

  const submitHandler = () =>{
    // Obtener la data de los input
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    //Si se esta registrando , registrarlo , sino se loguea con emial y passwornd en loguearse
    if(isRegistrando){
      singInUser(email,password)
    }else{
      registrarUsuario(email,password)
    }
  }


  return (
    <FormData.Provider value={{submitHandler,singInWithGoogle,isRegistrando,setIsRegistrando}}>
      {children}
    </FormData.Provider>
  )
}

export default FormContext