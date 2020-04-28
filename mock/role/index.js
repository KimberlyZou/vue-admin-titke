import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    id: 1,
    role: 'teacher',
    username: '李三',
    university: '浙江大学',
    academy: '计算机',
    userClass: '计算机1801',
    email: '234@163.com',
    password: 'quwe1231'
  },
  {
    id: 2,
    username: '张力',
    role: 'student',
    university: '浙江大学',
    academy: '计算机',
    userClass: '计算机1801',
    email: '234da@163.com',
    password: 'qqq1231'
  },
  {
    id: 3,
    username: '刘金',
    role: 'teacher',
    university: '北京大学',
    academy: '计算机',
    userClass: '计算机1901',
    email: '23rda@163.com',
    password: 'qqq1231'
  }
]

export default [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/role/user',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/collegeAdmin/addCollegeAdmin',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/user/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/collegeAdmin/deCollegeAdmin/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
