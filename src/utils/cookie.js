import Cookies from 'js-cookie'

export function getCookie (key = 'token-access') {
  return Cookies.get(key)
}

export function saveCookie (value, key = 'token-access') {
  return Cookies.set(key, value)
}

export function removeCookie (key = 'token-access') {
  return Cookies.remove(key)
}
