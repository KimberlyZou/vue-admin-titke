import { login, logout, getInfo, register, registerEmail } from '@/api/user'
import { uploadExcel } from '@/api/upload'
import { getToken, setToken, removeToken, setUid, getUid, removeUid } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  userClass: '',
  academy: '',
  university: '',
  position: '',
  uid: getUid()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_ACADEMY: (state, academy) => {
    state.academy = academy
  },
  SET_UNIVERSITY: (state, university) => {
    state.university = university
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_USERCLASS: (state, userClass) => {
    state.userClass = userClass
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        setUid(data.uid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, userInfo) {
    const { username, password, email, userClass, academy, university, code } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, email: email, userClass: userClass,
        academy: academy, university: university, code: code }).then(response => {
        // const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log(state)
    return new Promise((resolve, reject) => {
      getInfo(state.token, state.uid).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction, position, academy, university, email, userClass } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_EMAIL', email)
        commit('SET_ACADEMY', academy)
        commit('SET_POSITION', position)
        commit('SET_UNIVERSITY', university)
        commit('SET_USERCLASS', userClass)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  registerEmail({ commit }, email) {
    return new Promise((resolve, reject) => {
      registerEmail({ email: email }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUid()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUid()
      resolve()
    })
  },
  uploadExcel({ commit }, formData) {
    return new Promise((resolve, reject) => {
      uploadExcel(formData).then(response => {
        // const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
