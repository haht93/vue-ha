import { getRequest, postRequest } from '@/utils/request'

export const listTicketApi = () => {
  return getRequest(`ticket/list`)
}

export const bookTicketApi = (params) => {
  return postRequest(`ticket/book`, params)
}
export const getListOfUserTicketApi = () => {
  return getRequest(`ticket/list-of-user`)
}

export const ticketDetailApi = (params) => {
  return getRequest(`ticket/detail/${params}`)
}

export const addTicketUserHistory = (params) => {
  return postRequest(`ticket/add-user-history-ticket`, params)
}

export const ticketOptionApi = (params) => {
  return getRequest(`ticket/data-option`, params)
}

export const ticketPaymentApi = (params) => {
  return postRequest(`ticket/payment`, params)
}
