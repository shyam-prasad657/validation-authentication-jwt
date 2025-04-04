import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './register/register'
import Login from './login/login'
import { AuthProvider } from './context/AuthProvider'
import { Home } from './home'

function App() {

  return (
    <BrowserRouter>
    <main className='App'>
      <Routes>
      <Route path = '/register' element={<Register />} />
      <Route path = '/login' element={<Login />} />
    <AuthProvider>
      <Route path = '/home' element = {<Home />} />
    </AuthProvider>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
