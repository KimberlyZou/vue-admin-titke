import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export function getUserRole() {
  return request({
    url: '/role/user',
    method: 'get'
  })
}

export function deleteUserRole(id) {
  return request({
    url: `/collegeAdmin/deCollegeAdmin/${id}`,
    method: 'delete'
  })
}

export function deleteStudentRole(id) {
  return request({
    url: `/normalAdmin/deNormalAdmin/${id}`,
    method: 'delete'
  })
}

export function deleteAdminRole(id) {
  return request({
    url: `/sysAdmin/deSysAdmin/${id}`,
    method: 'delete'
  })
}

export function updateUserRole(id, data) {
  return request({
    url: `/role/user/${id}`,
    method: 'put',
    data
  })
}

export function addUserRole(data) {
  return request({
    url: '/collegeAdmin/CollegeAdmin',
    method: 'post',
    data
  })
}

