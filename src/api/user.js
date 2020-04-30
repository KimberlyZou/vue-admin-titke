import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/normalUser/register',
    method: 'post',
    data
  })
}

export function registerEmail(data) {
  return request({
    url: '/user/email',
    method: 'post',
    data
  })
}

export function getInfo(token, uid) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token, uid }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
