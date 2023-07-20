import React, { useEffect } from 'react';
import NavBar from '../../components/Navbar';
import Profile from './Profile';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';

function ProfileLayout() {
  useEffect(()=>{
    document.title = "Your Profile"
  })

  return (
    <>
     <NavBar/> 
      <Profile/>
      <div className='container mx-auto mb-3' >
        <div className='flex flex-row justify-around' > 
          <EducationSection/>
          <ExperienceSection/>
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;