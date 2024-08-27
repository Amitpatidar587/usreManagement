import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserDetailPage from './pages/UserDetailPage'
import Topbar from './components/Topbar'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Topbar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/:id' element={<UserDetailPage/>}  />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
