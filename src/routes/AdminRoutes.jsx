import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'
import UserManageLayout from '../pages/Admin/UserManagement/UserManagePage'
import AdminLayout from '../pages/Admin/AdminLayout'
import SkillPage from '../pages/Admin/Skills/SkillPage'
import SocialMediaPage from '../pages/Admin/SocialMedia/SocialMediaPage'
import BadgesPage from '../pages/Admin/Badges/BadgesPage'
import PrivateRoutes from '../protected-routes/PrivateRoutes'
import { AdminLogin } from '../pages/Admin/AdminLogin/AdminLogin'

function AdminRoutes() {
  return (
    <Routes>
      <Route path='*' exact element={<NoteFoundPage />} />
      <Route path='/login' element={<AdminLogin />} />
      <Route element={<PrivateRoutes role={'su'} route={'/admin/login'} />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHome />}></Route>
          <Route path="/users" element={<UserManageLayout />}></Route>
          <Route path="/skills" element={<SkillPage />}></Route>
          <Route path="/social-media" element={<SocialMediaPage />}></Route>
          <Route path="/badges" element={<BadgesPage />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default AdminRoutes
