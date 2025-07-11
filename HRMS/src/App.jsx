import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{Routes,Route} from "react-router-dom"
import LoginForm from "./pages/login";
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Employee from './pages/Employee'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='home' element={<Home/>}>
        <Route path='employee' element={<Employee/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
       

        </Route>
      </Routes>
    </>
  )
}

export default App
