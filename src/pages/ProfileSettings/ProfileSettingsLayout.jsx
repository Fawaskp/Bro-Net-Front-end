import React, { useEffect } from 'react'
import PersonalSection from './PersonalSection'
import BrocampSection from './BrocampSection'
function ProfileSettingsLayout() {

  useEffect(() => {
    document.title = 'Profile Settings'
  })

  return (
    <>
      <PersonalSection />
      {/* <BrocampSection /> */}
    </>
  )
}

export default ProfileSettingsLayout
