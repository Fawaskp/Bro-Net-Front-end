import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'
import HomePage from './pages/HomePage'
import NoteFoundPage from './pages/NoteFoundPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='*' exact element={<NoteFoundPage/>} />
        <Route path='/auth/*' element={<AuthRoutes/>} />
      </Routes>
    </Router>
  )
}

export default App
