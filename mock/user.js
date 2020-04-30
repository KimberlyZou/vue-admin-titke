
const tokens = {
  admin: 'admin-token',
  teacher: 'teacher-token',
  student: 'student-token'
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '我是系统管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '系统管理员'
  },
  'teacher-token': {
    roles: ['teacher'],
    introduction: '我是一名老师',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '老师',
    email: '34234@163.com',
    position: '四川',
    academy: '计算机',
    university: '浙江大学'
  },
  'student-token': {
    roles: ['student'],
    introduction: '我是一名学生',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '一名学生',
    email: '34234@163.com',
    academy: '计算机',
    university: '浙江大学',
    userClass: '1801班'

  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { email } = config.body
      const token = tokens[email]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        token: token,
        uid: '1'
      }
    }
  },
  {
    url: '/normalUser/register',
    type: 'post',
    response: config => {
      const body = config.body
      return {
        body
      }
    }
  },
  {
    url: '/user/email',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // get user info
  {
    url: '/user/getInfo\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        role: 'admin',
        user: {
          introduction: '我是一名学生',
          // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: '一名学生',
          email: '34234@163.com',
          academy: '计算机',
          university: '浙江大学',
          userClass: '1801班'
        }
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
