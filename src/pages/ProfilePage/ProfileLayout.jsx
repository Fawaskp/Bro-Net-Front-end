import React, { useEffect } from 'react';
import NavBar from '../../components/Navbar';
import Profile from './Profile';

function ProfileLayout() {
  useEffect(()=>{
    document.title = "Your Profile"
  })

  return (
    <>
     <NavBar/>
     <Profile/>
    </>
  );
}

export default ProfileLayout;