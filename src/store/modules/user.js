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
  SET_UID: (state, uid) => {
    state.uid = uid
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
        if (!response.token) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_TOKEN', response.token)
        commit('SET_UID', response.uid)
        console.log('token' + response.token)
        console.log('uid' + response.uid)
        setToken(response.token)
        setUid(response.uid)
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
        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }
        console.log(1111111111111)
        const role = response.role
        const user = response.user
        console.log(role)
        // const data = response.user
        // roles must be a non-empty array
        response.roles = [role]
        console.log(response)
        console.log(22222)
        if (!role) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', response.roles)
        commit('SET_NAME', user.userName)
        if (user.email) {
          commit('SET_EMAIL', user.email)
        }
        commit('SET_ACADEMY', user.academy)
        if (user.position) {
          commit('SET_POSITION', user.position)
        }
        if (user.university) {
          commit('SET_UNIVERSITY', user.university)
        }
        if (user.userClass) {
          commit('SET_USERCLASS', user.userClass)
        }
        resolve(response)
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
