import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Registro = () => {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    telefonos: []
  })

  const [telefono, setTelefono] = useState({
    number: 0,
    citycode: 0,
    countrycode: 0,
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    console.log(user)
  }

  const handleOnChangeTelefono = (e) => {
    const { name, value } = e.target
    setTelefono({ ...telefono, [name]: value })
    console.log(telefono)
  }

  const agregarTelefono = () => {
    let arreglo = user.telefonos
    arreglo.push(telefono)
    setUser({...user, telefonos: arreglo})
  }

  const eliminarTelefono = (index) => {
    console.log("eliminar", index)
    let arreglo = user.telefonos
    arreglo.splice(index, 1)
    setUser({...user, telefonos: arreglo})
  }

  const handleOnSubmit = () => {
    setAuth(true)
  }

  return (
    <>
      <div className='container'>
        <h1 className='text-center mt-2'>Registro</h1>
        <hr />
        <form onSubmit={handleOnSubmit}>
          <div className="row">
            <div className="mb-3 col-4">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name='nombre' value={user.nombre} onChange={handleOnChange} required />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={handleOnChange} required />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleOnChange} required />
            </div>
          </div>
          <h5 className='text-center'>Telefonos</h5>
          <div className="row">
            <div className="mb-3 col-3">
              <label htmlFor="number" className="form-label">Numero</label>
              <input type="number" className="form-control" id="number" name='number' value={telefono.number} onChange={handleOnChangeTelefono} required />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="citycode" className="form-label">Codigo ciudad</label>
              <input type="number" className="form-control" id="citycode" name='citycode' value={telefono.citycode} onChange={handleOnChangeTelefono} required />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="countrycode" className="form-label">Codigo pais</label>
              <input type="number" className="form-control" id="countrycode" name='countrycode' value={telefono.countrycode} onChange={handleOnChangeTelefono} required />
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="accion" className="form-label">Accion</label>
              <button className='btn btn-primary d-block w-100' type='button' onClick={agregarTelefono}>Agregar</button>
            </div>
          </div>
          {
            user.telefonos.length > 0 ?
              <>
                <h5 className='text-center'>Numeros agregados</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Numero</th>
                      <th scope="col">Codigo ciudad</th>
                      <th scope="col">Codigo pais</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.telefonos.map((item, index) => {
                        return(<tr key={index}>
                          <th scope="row">{index}</th>
                          <td>{item.number}</td>
                          <td>{item.citycode}</td>
                          <td>{item.countrycode}</td>
                          <td><button className='btn btn-danger' type='button' onClick={() => {
                            eliminarTelefono(index)
                          }}>✖️</button></td>
                        </tr>)
                      })

                    }
                  </tbody>
                </table>
              </>
              :
              null
          }
          <div className="mb-3">
            <Link to='/login'>
              Ya esta registrado, login
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </>
  )
}

export default Registro