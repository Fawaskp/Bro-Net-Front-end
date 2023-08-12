import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import HomePage from './pages/HomePage/HomePage'
import NoteFoundPage from './pages/PageNoteFound'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import UserViewPage from './pages/UserViewPage/UserViewPage'
import WriteArticle from './pages/HomePage/ArticlePosting/WriteArticle'
function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/:username' exact element={<UserViewPage />} />
          <Route path='/post/new/' exact element={<WriteArticle/>} />
          <Route path='*' exact element={<NoteFoundPage />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/user/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </Router>
  )
}

export default App
