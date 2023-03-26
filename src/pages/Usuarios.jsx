import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { obtenerUsuarioPorEmail, obtenerUsuarioPorId, obtenerUsuarioPorNombre, obtenerUsuarios } from '../services/usuarioServices'

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([])

  const [busqueda, setBusqueda] = useState({
    dato: '',
    tipo: ''
  })

  const agregarUsuarios = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Loading..' })
      Swal.showLoading()
      const res = await obtenerUsuarios()
      setUsuarios(res.data)
      Swal.close()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      })
    }
  }

  const handleOnChange = (e) => {

    const { name, value } = e.target
    setBusqueda({ ...busqueda, [name]: value })
    console.log(busqueda)
  }

  const buscarUsuarios = async (e) => {
    e.preventDefault()
    Swal.fire({ allowOutsideClick: false, text: 'Loading..' })
    Swal.showLoading()
    try {
      if (busqueda.tipo === 'id') {
        const res1 = await obtenerUsuarioPorId(busqueda.dato)
        setUsuarios([res1.data])
      } else if (busqueda.tipo === 'email') {
        const res2 = await obtenerUsuarioPorEmail(busqueda.dato)
        setUsuarios([res2.data])
      } else {
        const res3 = await obtenerUsuarioPorNombre(busqueda.dato)
        setUsuarios([res3.data])
      }
      Swal.close()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }

  const restablecerLista = async() => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Loading..' })
      Swal.showLoading()
      await agregarUsuarios()
      Swal.close()
      busqueda.dato = ''
      busqueda.tipo = ''
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      });
    }    
  }

  useEffect(() => {
    agregarUsuarios()
  }, [])

  return (
    <div className='container'>
      <h1 className='text-center mt-2'>Usuarios</h1>
      <hr />
      <form onSubmit={buscarUsuarios}>
        <div className="row">
          <div className="mb-3 col-4">
            <label htmlFor="dato" className="form-label">Busqueda</label>
            <input type="dato" className="form-control" id="dato" name='dato' value={busqueda.dato} onChange={handleOnChange} required />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="Tipo" className="form-label">Tipo</label>
            <select
              className="form-select" id="inputGroupSelect01"
              name='tipo'
              onChange={handleOnChange}
              value={busqueda.tipo}
              required
            >
              <option value=''>--Seleccione--</option>
              <option value='id'>id</option>
              <option value='email'>email</option>
              <option value='nombre'>nombre</option>
            </select>
          </div>
          <div className="col-4 mt-4">
            <button type="submit" className="btn btn-primary m-2">Buscar</button>
            <button type="button" className="btn btn-primary m-2" onClick={restablecerLista}>Restablecer</button>
          </div>
        </div>
      </form>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Telefonos</th>
            <th scope="col">Ultimo acceso</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map((item) => {
              return (<tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.email.value}</td>
                <td>
                  {item.telefonos.map((item, index) => {
                    return (
                      <div key={index}>{`*${item.telefono.countrycode} ${item.telefono.citycode}  ${item.telefono.number}`}</div>
                    )
                  })}
                </td>
                <td>{new Date(item.lastAccess).toLocaleString()}</td>
                <td>
                  <button title='Actualizar' className='btn btn-primary' type='button' onClick={() => {
                    console.log(usuarios)
                  }}>✍️</button>
                  <button title='Borrar' className='btn btn-danger m-1' type='button' onClick={() => {
                    console.log('borrar')
                  }}>✖️</button>
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios