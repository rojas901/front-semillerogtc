import axiosInstance from "./axiosConfig"

const loginService = (data) => {
  return axiosInstance.post('login', data)
}

const registroService = (data) => {
  return axiosInstance.post('registrarse', data)
}

export {
  loginService,
  registroService
}