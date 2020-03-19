import { listSessionApi, sessionDetailApi, sessionRegisterApi, sessionBookApi } from '@/api/session'
import { getCookie, saveCookie } from '@/utils/cookie'

const getDefaultState = () => {
  return {
    listSession: [],
    totalCount: 0,
    lastPage: getCookie('last_page') || 0,
    presentations: [],
    session: {},
    fetching: false,
    data: {
      listSession: [],
      pagination: {}
    }
  }
}

const state = getDefaultState()

const getters = {
  getListSession: (state) => {
    if (state.listSession.length !== 0) {
      // eslint-disable-next-line no-undef
      return _.orderBy(state.listSession, ['id'], 'asc')
    }
    return []
  },
  getListSessionSearch: (state) => {
    if (state.data.listSession.length !== 0) {
      // eslint-disable-next-line no-undef
      return _.orderBy(state.data.listSession, ['id'], 'asc')
    }
    return []
  },
  takeListSession: (state) => {
    if (state.data.listSession.length !== 0) {
      // eslint-disable-next-line no-undef
      return _.take(_.orderBy(state.data.listSession, ['id'], 'asc'), 4)
    }
    return []
  },
  getLastPage: (state) => {
    return state.lastPage
  },
  getSession: (state) => {
    return state.session
  },
  getPresentations: (state) => {
    if (state.presentations) {
      return state.presentations
    }
    return []
  },
  getSessionById: state => id => {
    return state.listSession.find(element => {
      return element.id === id
    })
  }
}

const mutations = {
  SET_LIST_SESSION: (state, payload) => {
    if (payload.data.length !== 0) {
      state.listSession = state.listSession.concat(payload.data)
      state.totalCount += payload.data.length
    }
  },
  SET_LAST_PAGE: (state, payload) => {
    saveCookie(payload, 'last_page')
    state.lastPage = payload
  },
  RESET_LIST_SESSION: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PRESENTATIONS: (state, payload) => {
    state.presentations = payload
  },
  SET_SESSION: (state, payload) => {
    let sessionClone = Object.assign(state.session, payload)
    delete sessionClone.presentations
    state.session = sessionClone
  },
  REQUEST_LIST (state) {
    state.fetching = true
  },
  CLEAR_LIST (state) {
    state.data = {
      data: [],
      pagination: {}
    }
  },
  GET_LIST_SUCCESS (state, action) {
    state.fetching = false
    state.data = action
  }
}

const actions = {
  listSessionAction ({commit}, {params, reset = false}) {
    return new Promise((resolve, reject) => {
      listSessionApi(params).then(response => {
        if (reset) {
          commit('RESET_LIST_SESSION')
        }
        commit('SET_LAST_PAGE', response.data.last_page)
        commit('SET_LIST_SESSION', response.data)
        resolve(response.data)
      },
      error => {
        reject(error)
      }).catch(error => {
        reject(error)
      })
    })
  },
  async getListSessionAction ({commit, state}, data) {
    data.page = data.page || 1
    data.per_page = data.per_page || 10
    data.keyword = data.keyword || ''
    commit('REQUEST_LIST')
    try {
      setTimeout(async () => {
        const response = await listSessionApi(data)
        let listSession = []
        if (response.data.current_page === 1) {
          listSession = response.data.data
        } else {
          listSession = [...state.data.listSession, ...response.data.data]
        }
        commit('GET_LIST_SUCCESS', {
          listSession: listSession,
          pagination: {
            last_page: response.data.last_page,
            total: response.data.total,
            current_page: response.data.current_page,
            per_page: response.data.per_page
          }
        })
        return response
      }, 500)
    } catch (e) {
    }
  },
  sesstionDetailAction ({commit, getters, state}, params) {
    return new Promise((resolve, reject) => {
      sessionDetailApi(params).then(response => {
        const data = response.data
        commit('SET_SESSION', data)
        commit('SET_PRESENTATIONS', data.presentations.data)
        resolve(response)
      }, error => {
        reject(error)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sessionRegisterAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      sessionRegisterApi(params).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      }).catch(error => {
        reject(error)
      })
    })
  },
  bookSessionAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      sessionBookApi(params).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
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
