import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserDetailPage from './pages/UserDetailPage'
import Topbar from './components/Topbar'
import UserForm from './pages/userForm'

function App() {
  return (
    <BrowserRouter>
    <div className='w-screen'>
      <Topbar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/:id' element={<UserDetailPage/>}  />
        <Route path='/:id/userform' element={<UserForm/>}  />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
