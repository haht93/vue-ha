import { getRequest, postRequest } from '@/utils/request'

export const listSessionApi = (params) => {
  return getRequest(`session/list`, params)
}

export const sessionDetailApi = (params) => {
  return getRequest(`session/detail/${params}`)
}

export const getListOfUserApi = (params) => {
  return getRequest(`session/list-of-user?filter=${params}`)
}

export const sessionRegisterApi = (params) => {
  return postRequest(`session/register`, params)
}

export const sessionBookApi = (params) => {
  return postRequest(`session/book`, params)
}
