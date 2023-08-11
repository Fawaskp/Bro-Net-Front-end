import React, { useEffect } from 'react'
import PersonalSection from './PersonalSection'
import BrocampSection from './BrocampSection'
import SocialMediaSection from './SocialMediaSection/SocialMediaSection'

function ProfileSettingsLayout() {

  useEffect(() => {
    document.title = 'Profile Settings'
  },[])

  return (
    <>
      <PersonalSection />
      <SocialMediaSection/>
      {/* <BrocampSection /> */}Admin Login
    </>
  )
}

export default ProfileSettingsLayout
