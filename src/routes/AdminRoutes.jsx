import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" exact element={<AdminHome/>}></Route>
        <Route path='*' exact element={<NoteFoundPage/>} />
    </Routes>
  )
}

export default AdminRoutes
