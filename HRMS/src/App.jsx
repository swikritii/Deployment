import { useState } from 'react'

import './App.css'
import{Routes,Route} from "react-router-dom"
import LoginForm from "./pages/login";
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Employee from './pages/Employee'
import ProtectedRoute from './component/utils/protectedRoute'

import Unauthorized from './component/utils/unauthorize';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path="/Unauthorize" element={<Unauthorized/>}/>
        <Route path='home' element={
          <ProtectedRoute><Home/></ProtectedRoute>}>
        <Route path='employee' element={
          <ProtectedRoute allowedRoles={["hr","manager","admin"]}>
          <Employee/></ProtectedRoute>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
       

        </Route>
      </Routes>
    </>
  )
}

export default App
