import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Usuarios from '../pages/Usuarios'

const UserRouter = () => {
  return (
    <Routes>
      <Route path='usuarios' element={<Usuarios/>}/>
      <Route index element={<Navigate to='usuarios'/>}/>
      <Route path='*' element={<Navigate to='usuarios'/>}/>
    </Routes>
  )
}

export default UserRouter