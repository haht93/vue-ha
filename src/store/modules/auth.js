import { loginApi, registerApi, logoutApi } from '@/api/auth'
import { getCookie, saveCookie, removeCookie } from '@/utils/cookie'
import { resetRouter } from '@/router/index'
const state = {
  token: getCookie() || ''
}

const getters = {
  token: state => state.token
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  RESET_TOKEN: (state) => {
    state.token = null
    localStorage.clear()
  }
}

const actions = {
  loginAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      loginApi(params).then(response => {
        commit('SET_TOKEN', response.data.access_token)
        saveCookie(response.data.access_token)
        resolve(response)
      },
      error => {
        reject(error.response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  registerAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      registerApi(params).then(response => {
        saveCookie(response.data.access_token)
        commit('SET_TOKEN', response.data.access_token)
        resolve(response)
      },
      error => {
        reject(error)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  logoutAction ({commit}) {
    return new Promise((resolve, reject) => {
      logoutApi().then(response => {
        removeCookie()
        commit('RESET_TOKEN')
        resetRouter()
        resolve(response)
      },
      error => {
        reject(error)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', null)
      removeCookie()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
