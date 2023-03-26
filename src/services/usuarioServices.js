import axiosInstance from "./axiosConfig"

const obtenerUsuarios = () => {
  return axiosInstance.get('')
}

const obtenerUsuarioPorId = (id) => {
  return axiosInstance.get(`id/${id}`)
}

const obtenerUsuarioPorEmail = (email) => {
  return axiosInstance.get(`email/${email}`)
}

const obtenerUsuarioPorNombre = (nombre) => {
  return axiosInstance.get(`nombre/${nombre}`)
}

const actualizarUsuario = (id, data) => {
  return axiosInstance.patch(`${id}`, data)
}

const eliminarUsuario = (id) => {
  return axiosInstance.delete(`${id}`)
}

export {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorNombre,
  actualizarUsuario,
  eliminarUsuario
}