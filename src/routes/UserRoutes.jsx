import React from 'react'
import {Routes, Route} from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import ProfileLayout from '../pages/ProfilePage/ProfileLayout'
import MessagePage from '../pages/Messages/MessageLayout'
import ProfileSettingsLayout from '../pages/ProfileSettings/ProfileSettingsLayout'


function UserRoutes() {
  return (
    <Routes>
        <Route path='/profile' exact element={<ProfileLayout />} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        <Route path='/profile/settings' element={<ProfileSettingsLayout />} />
        <Route path='/messaging/' element={<MessagePage/>} />
    </Routes>
  )
}

export default UserRoutes
