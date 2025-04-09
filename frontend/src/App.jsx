import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './register/register'
import Login from './login/login'
import { AuthProvider } from './context/AuthProvider'
import Layout from './pages/layout'
import RequireAuth from './requireAuth'
import Home from './pages/home'
import Admin from './pages/admin'
import View from './pages/view'
import Unauthorize from './pages/unauthorize'
import { useAuth } from './hooks/useAuth'

function App() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <BrowserRouter>
    <AuthProvider>
    <main className='App'>
      <Routes>
      <Route path = '/' element={<Layout />}>
      {/* public routes */}
      <Route path = '/register' element={<Register />} />
      <Route path = '/login' element={<Login />} />
      <Route path = '/unauthorize' element={<Unauthorize />} />

      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles = {['admin']}/>}>
      <Route path = '/admin' element = {<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles = {['admin', 'create', 'viewer']} />}>
      <Route path = '/home' element = {<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles = {['viewer']} />}>
      <Route path = '/view' element = {<View />} />
      </Route>
      
      </Route>
      </Routes>
    </main>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
