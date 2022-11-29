import React, { useState } from 'react'
/* Styles */
import './AdminView.css'
/* Img */
import userImg from '../../img/boy-dynamic-gradient.png'
/* Components */
import UserTemplate from './UserTemplate.jsx'
/* firebase */
import { app } from '../../firebase/Credenciales'
import { getAuth, signOut } from 'firebase/auth'
import { getDocs, getFirestore, collection } from 'firebase/firestore' 
const auth = getAuth(app)
const db = getFirestore(app)

const AdminView = () => {
  const user = auth.currentUser
  const [allUsers, setAllUsers] = useState([])
  const containerScreen = document.getElementById('container-screen')

  const getAllUsers = async() =>{
    const users = []
    getDocs(collection(db,'users'))
      .then(res =>{
        res.forEach(doc =>{
          users.push({id:doc.id, ...doc.data()})
        })
        setAllUsers(users)
      })

    containerScreen.classList.add('active-btn-container')
  }

  return (
    <section>
      <div className='data-container'>
        <img src={userImg} alt="pic-user"/>
        <div className='data'>
          <h2>{user.displayName ? user.displayName : null}</h2>
          <h2>{user.email}</h2>
          <button onClick={allUsers.length ? () => {
              setAllUsers([]) 
              containerScreen.classList.remove('active-btn-container')} : getAllUsers} className='btn-sing-out more-users'>{allUsers.length ? <i className="fa-solid fa-user-minus"></i> : <i className="fa-solid fa-user-plus"></i>}</button>
        </div>
          { 
            allUsers.length
            ?
            <div className='container-allusers'>
              { 
                allUsers.length 
                ?
                  allUsers.map(data =>{
                    return <UserTemplate key={data.id} user={data}/>
                  })
                :
                  <div className="text-center">
                    <div className="spinner-border" role="status"></div>
                    <span className="visually">Loading...</span>
                  </div> 
              }
            </div>
            :
              null
          }
        <button onClick={() => signOut(auth)} className='btn-sing-out'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
      </div>
    </section>
  )
}

export default AdminView