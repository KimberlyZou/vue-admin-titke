import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Uid = 'Uid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUid() {
  return Cookies.get(Uid)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUid(uid) {
  return Cookies.set(Uid, uid)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUid() {
  return Cookies.remove(Uid)
}
