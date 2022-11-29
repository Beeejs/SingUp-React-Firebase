import React, { useEffect, useState } from 'react'
/* Styles */
import './Home.css'
/* Components */
import AdminView from '../../components/AdminView/AdminView.jsx'
import UserView from '../../components/UserView/UserView.jsx'
import { app } from '../../firebase/Credenciales'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
const db = getFirestore(app)

const Home = ({user}) => {
  const [userRol, setUserRol] = useState(null)
  
  useEffect(() =>{
    (async() =>{
      const allUsersFirebase = []
      const querySnapshot = await getDocs(collection(db,'users'))
      querySnapshot.forEach((doc) => {
        allUsersFirebase.push({id: doc.id, ...doc.data()});
      });
      const filterUsers = allUsersFirebase.filter(res => res.id === user.uid)
      setUserRol(filterUsers[0].rol)
    })()
  },[user]) 

  return (
    <div id='container-screen'>
      {userRol === null 
        ? 
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
          <span className="visually">Loading...</span>
        </div> 
        : 
          (userRol === 'admin' ? <AdminView/> : <UserView/>)
      }
    </div>
  )
}

export default Home