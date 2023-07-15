import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import HomePage from './pages/HomePage/HomePage'
import NoteFoundPage from './pages/NoteFoundPage'
import Messages from './pages/Messages/MessageLayout'
import MessagePage from './pages/Messages/MessageLayout'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        <Route path='/auth/*' element={<AuthRoutes/>} />
        <Route path='/messaging/' element={<MessagePage/>} />
      </Routes>
    </Router>
  )
}

export default App
