import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NoteFoundPage from '../pages/PageNoteFound'
import ProfileLayout from '../pages/ProfilePage/ProfileLayout'
import MessagePage from '../pages/Messages/MessageLayout'
import ProfileSettingsLayout from '../pages/ProfileSettings/ProfileSettingsLayout'
import PrivateRoutes from '../protected-routes/PrivateRoutes'
import UserLayout from '../pages/UserLayout'
import AllProjects from '../pages/ProfilePage/Project/AllProjects'
import AllSkills from '../pages/ProfilePage/Skill/AllSkills'
import SearchPage from '../pages/SearchPage/SearchPage'
import AdvicesPage from '../pages/ProfilePage/Advice/AdvicesPage'


function UserRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NoteFoundPage />} />
      <Route element={<PrivateRoutes role={'user'} route={'/auth/login'} />}>
        <Route path='/' element={<UserLayout />}>
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/profile' element={<ProfileLayout />} />
          <Route path='/profile/advices' element={<AdvicesPage />} />
          <Route path='/profile/settings' element={<ProfileSettingsLayout />} />
          <Route path='/profile/projects' element={<AllProjects />} />
          <Route path='/profile/skills' element={<AllSkills />} />
          <Route path='/messaging/:username' element={<MessagePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default UserRoutes
