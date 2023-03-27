import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { obtenerUsuarioPorEmail, obtenerUsuarioPorId, obtenerUsuarioPorNombre, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../services/usuarioServices'

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([])

  const [busqueda, setBusqueda] = useState({
    dato: '',
    tipo: ''
  })

  const [usuario, setUsuario] = useState({
    id: '',
    email: '',
    password: ''
  })

  const [mostrarActualizar, setMostrarActualizar] = useState(false)

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

  const borrarUsuario = async (id) => {
    try {
      await eliminarUsuario(id)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }

  const borrarAccion = (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta operacion no sera reversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarUsuario(id)
        Swal.fire(
          'Borrado!',
          'Tu archivo ha sido borrado.',
          'success'
        )
        agregarUsuarios()
      }
    })
  }

  const handleOnChangeEdit = (e) => {
    const { name, value } = e.target
    setUsuario({ ...usuario, [name]: value })
  }

  const actualizarAccion = (id, email) => {
    usuario.id = id
    usuario.email = email
    setMostrarActualizar(true)
  }

  const actualizarUsuarioClick = async(e) => {
    e.preventDefault()
    try {
      await actualizarUsuario(usuario.id, usuario)
      Swal.fire({
        icon: 'success',
        title: 'Se ha actualizado con exito',
        showConfirmButton: false,
        timer: 4000
      })
      agregarUsuarios()
      setMostrarActualizar(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.request.response}`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }

  const restablecerLista = () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Loading..' })
      Swal.showLoading()
      agregarUsuarios()
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

      {
        mostrarActualizar ?
          <form onSubmit={actualizarUsuarioClick}>
            <h5>Actualizacion</h5>
            <div className="row">
              <div className="mb-3 col-3">
                <label htmlFor="id" className="form-label">id</label>
                <input type="text" className="form-control" id="id" name='id' value={usuario.id} onChange={handleOnChangeEdit} disabled />
              </div>
              <div className="mb-3 col-3">
                <label htmlFor="email" className="form-label">email</label>
                <input type="email" className="form-control" id="email" name='email' value={usuario.email} onChange={handleOnChangeEdit} required />
              </div>
              <div className="mb-3 col-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="password" className="form-control" id="password" name='password' value={usuario.password} onChange={handleOnChangeEdit} />
              </div>
              <div className="mt-4 col-3">
                <button type="submit" className='btn btn-primary m-2'>Actualizar</button>
                <button type='button' className='btn btn-secondary m-2' onClick={() => setMostrarActualizar(false)}>Cancelar</button>
              </div>
              <strong className='text-danger'>Nota: si actualiza el correo del usuario logueado debera iniciar sesión nuevamente.</strong>
            </div>
          </form>
          :
          <form onSubmit={buscarUsuarios}>
            <h5>Busquedas</h5>
            <div className="row">
              <div className="mb-3 col-4">
                <label htmlFor="dato" className="form-label">Busqueda</label>
                <input type="text" className="form-control" id="dato" name='dato' value={busqueda.dato} onChange={handleOnChange} required />
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
      }
      <hr />
      <strong className='text-danger'>Nota: si borra el usuario logueado debera iniciar sesión nuevamente.</strong>
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
                    actualizarAccion(item.id, item.email.value)
                  }}>✍️</button>
                  <button title='Borrar' className='btn btn-danger m-1' type='button' onClick={() => {
                    borrarAccion(item.id)
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