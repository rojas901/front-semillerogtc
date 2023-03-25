import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { loginService } from '../services/authServices'

const Login = ({setAuth}) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
    console.log(user)
  }

  const handleOnSubmit = async(e) => {
    try {
      e.preventDefault()
      await loginService(user)
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido al sistema de gestion de usuarios',
        showConfirmButton: false,
        timer: 4000
      })
      setUser({
        email: "",
        password: ""
      })
      setAuth(true)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }

  return (
    <>
      <div className='container w-50'>
      <h1 className='text-center mt-2'>Login</h1>
      <hr />
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleOnChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div>
          <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleOnChange} required/>
          </div>          
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
      </div>      
    </>
  )
}

export default Login