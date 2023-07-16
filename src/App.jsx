import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import HomePage from './pages/HomePage/HomePage'
import NoteFoundPage from './pages/PageNoteFound'
import UserRoutes from './routes/UserRoutes'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        <Route path='/auth/*' element={<AuthRoutes/>} />
        <Route path='/user/*' element={<UserRoutes/>} />
      </Routes>
    </Router>
  )
}

export default App
