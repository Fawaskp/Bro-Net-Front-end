import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfileCompletion from '../pages/ProfileCompletion/ProfileCompletion'
import NoteFoundPage from '../pages/PageNoteFound'


function AuthRoutes() {
  return (
    <Routes>
        <Route path='/' exact element={<Navigate to={'login'} />} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/complete-profile' element={<ProfileCompletion/>} />
    </Routes>
  )
}

export default AuthRoutes
