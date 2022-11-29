import React from 'react'
/* firebase */
import { app } from '../../firebase/Credenciales'
import { getAuth } from 'firebase/auth'
const auth = getAuth(app)

const UserTemplate = ({user}) => { 
  const userActive = auth.currentUser

  return (
    <div className='container-data-user'>
        <p>{userActive.email === user.email ? user.email + ' (You)' : user.email + ` (${user.rol})`}</p>
    </div>
  )
}

export default UserTemplate