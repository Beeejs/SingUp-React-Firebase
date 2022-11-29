import React from 'react'
/* Styles */
import './UserView.css'
/* Img */
import userImg from '../../img/boy-dynamic-gradient.png'
/* firebase */
import { app } from '../../firebase/Credenciales'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(app)

const UserView = () => {

  const user = auth.currentUser;//user active

  return (
    <section>
      <div className='data-container'>
        <img src={user.photoURL ? user.photoURL : userImg} alt="pic-user"/>
        <div className='data'>
          <h2>{user.displayName ? user.displayName : null}</h2>
          <h2>{user.email}</h2>
        </div>
        <button onClick={() => signOut(auth)} className='btn-sing-out'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>  
      </div>
    </section>
  )
}

export default UserView