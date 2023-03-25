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
  actualizarUsuario,
  eliminarUsuario
}