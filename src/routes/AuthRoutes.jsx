import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ProfileCompletion from '../pages/ProfileCompletion'
import NoteFoundPage from '../pages/NoteFoundPage'


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
