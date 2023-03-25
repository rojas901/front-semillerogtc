import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/usuarios/v1/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('Authorization')
  }
})

export default axiosInstance