import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import ProfileLayout from '../pages/ProfilePage/ProfileLayout'
import MessagePage from '../pages/Messages/MessageLayout'
import ProfileSettingsLayout from '../pages/ProfileSettings/ProfileSettingsLayout'
import PrivateRoutes from '../protected-routes/PrivateRoutes'
import UserLayout from '../pages/UserLayout'


function UserRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NoteFoundPage />} />
      <Route element={<PrivateRoutes role={'user'} route={'/auth/login'} />}>
        <Route path='/' element={<UserLayout />}>
          <Route path='/profile' element={<ProfileLayout />} />
          <Route path='/profile/settings' element={<ProfileSettingsLayout />} />
          <Route path='/messaging/' element={<MessagePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default UserRoutes
