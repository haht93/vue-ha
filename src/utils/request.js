import axios from 'axios'
import store from '@/store'
import Nprogress from 'nprogress'

const axiosRequest = axios.create({
  baseURL: process.env.VUE_APP_MAAS_API,
  headers: {
    'Accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 15000
})

axiosRequest.interceptors.request.use(
  config => {
    Nprogress.start()
    let token = store.getters['auth/token']
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    Nprogress.done()
    return Promise.reject(error)
  }
)

axiosRequest.interceptors.response.use(
  response => {
    Nprogress.done()
    return response
  },
  error => {
    const status = error.response.status
    switch (status) {
      case 401:
        store.dispatch('auth/resetToken').then(response => {
          console.log(response)
          location.reload()
        })
        // store.dispatch('auth/logoutAction')
        break
      case 500:
        break
      default:
        break
    }

    Nprogress.done()
    return Promise.reject(error)
  }
)

export const getRequest = (url, params) => {
  return axiosRequest({
    method: 'get',
    url: `${url}`,
    params: params
  })
}

export const postRequest = (url, params) => {
  return axiosRequest({
    method: 'post',
    url: `${url}`,
    data: params
  })
}
export default axiosRequest
