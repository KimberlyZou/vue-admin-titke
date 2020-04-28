import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/vue-element-admin/user/register',
    method: 'post',
    data
  })
}

export function registerEmail(data) {
  return request({
    url: '/vue-element-admin/user/email',
    method: 'post',
    data
  })
}

export function getInfo(token, uid) {
  return request({
    url: '/vue-element-admin/user/getInfo',
    method: 'get',
    params: { token, uid }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
