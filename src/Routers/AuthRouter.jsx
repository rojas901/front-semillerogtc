import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'

const AuthRouter = ({setAuth}) => {
  return (
    <Routes>
      <Route path='login' element={<Login setAuth={setAuth}/>}/>
      <Route index element={<Navigate to='login'/>}/>
      <Route path='registro' element={<Registro/>}/>
      <Route path='*' element={<Navigate to='login'/>}/>
    </Routes>
  )
}

export default AuthRouter