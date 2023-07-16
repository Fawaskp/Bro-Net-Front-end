import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfileCompletion from '../pages/ProfileCompletion/ProfileCompletion'
import NoteFoundPage from '../pages/PageNoteFound'
import ProfileLayout from '../pages/ProfilePage/ProfileLayout'
import MessagePage from '../pages/Messages/MessageLayout'


function UserRoutes() {
  return (
    <Routes>
        <Route path='/profile' exact element={<ProfileLayout />} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        {/* <Route path='/profile/settings' exact element={<Navigate />} /> */}
        <Route path='/messaging/' element={<MessagePage/>} />
    </Routes>
  )
}

export default UserRoutes
