import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Profile from './Profile'
function ProfileSettingsLayout() {

    useEffect(()=>{
        document.title = 'Profile Settings'
    })

  return (
    <>
      <Navbar/>
      <Profile/>
    </>
  )
}

export default ProfileSettingsLayout
