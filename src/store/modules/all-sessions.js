import { getListOfUserApi } from '@/api/session'

const state = {
  listOfUser: [],
  listOfUserBook: [],
  listOfUserRegister: []
}

const getters = {
  getListOfUserBook: (state) => {
    if (state.listOfUserBook.length !== 0) {
      return state.listOfUserBook
    }

    return []
  },
  getListOfUserRegister: (state) => {
    if (state.listOfUserRegister.length !== 0) {
      return state.listOfUserRegister
    }

    return []
  },
  getListOfUser: (state) => {
    if (state.listOfUser.length !== 0) {
      // eslint-disable-next-line no-undef
      return _.orderBy(state.listOfUser, ['id'], 'asc')
    }

    return []
  }
}

const mutations = {
  SET_LIST_USER_BOOK (state, payload) {
    state.listOfUserBook = payload
  },
  SET_LIST_USER_REGISTER (state, payload) {
    state.listOfUserRegister = payload
  },
  SET_LIST_USER (state, payload) {
    state.listOfUser = payload
  },
  RESET_LIST_SESSION (state) {
    state.listOfUser = []
    state.listOfUserBook = []
    state.listOfUserRegister = []
  }
}

const actions = {
  async getListOfUsersAction ({ commit, state }, params) {
    try {
      if (params === 'book') {
        if (state.listOfUserBook.length !== 0) {
          commit('SET_LIST_USER_BOOK', state.listOfUserBook)
        } else {
          const response = await getListOfUserApi(params)
          commit('SET_LIST_USER_BOOK', response.data.data)
        }
      } else if (params === 'register') {
        if (state.listOfUserRegister.length !== 0) {
          commit('SET_LIST_USER_REGISTER', state.listOfUserRegister)
        } else {
          const response = await getListOfUserApi(params)
          commit('SET_LIST_USER_REGISTER', response.data.data)
        }
      } else {
        const response = await getListOfUserApi(params)
        commit('SET_LIST_USER', response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
