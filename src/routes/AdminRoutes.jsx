import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'
import UserManageLayout from '../pages/Admin/UserManagement/UserManagePage'
import AdminLayout from '../pages/Admin/AdminLayout'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<AdminLayout/>}>
          <Route index element={<AdminHome/>}></Route>
          <Route path="/users" element={<UserManageLayout/>}></Route>
          <Route path='*' exact element={<NoteFoundPage/>} />
        </Route>
    </Routes>
  )
}

export default AdminRoutes
