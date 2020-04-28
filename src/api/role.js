import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}

export function getUserRole() {
  return request({
    url: '/vue-element-admin/role/user',
    method: 'get'
  })
}

export function deleteUserRole(id) {
  return request({
    url: `/vue-element-admin/collegeAdmin/deCollegeAdmin/${id}`,
    method: 'delete'
  })
}

export function deleteStudentRole(id) {
  return request({
    url: `/vue-element-admin/normalAdmin/deNormalAdmin/${id}`,
    method: 'delete'
  })
}

export function deleteAdminRole(id) {
  return request({
    url: `/vue-element-admin/sysAdmin/deSysAdmin/${id}`,
    method: 'delete'
  })
}

export function updateUserRole(id, data) {
  return request({
    url: `/vue-element-admin/role/user/${id}`,
    method: 'put',
    data
  })
}

export function addUserRole(data) {
  return request({
    url: '/vue-element-admin/collegeAdmin/CollegeAdmin',
    method: 'post',
    data
  })
}

