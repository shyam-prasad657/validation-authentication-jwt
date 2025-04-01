import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './register/register'
import SignUp from './signup/signup'

function App() {

  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
      <Route path = '/register' element={<Register />} />
      <Route path = '/signup' element={<SignUp />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
