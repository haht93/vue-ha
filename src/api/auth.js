import { postRequest } from '@/utils/request'

export const loginApi = (params) => {
  return postRequest(`login`, params)
}

export const registerApi = (params) => {
  return postRequest(`register`, params)
}

export const logoutApi = () => {
  return postRequest(`logout`)
}
