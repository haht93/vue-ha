import {
  addTicketUserHistory,
  bookTicketApi,
  getListOfUserTicketApi,
  listTicketApi,
  ticketDetailApi,
  ticketPaymentApi,
  ticketOptionApi
} from '@/api/ticket'

const getDefaultState = () => {
  return {
    listTicket: [],
    listUserTicket: [],
    ticket: {},
    ticketOption: {}
  }
}

const state = getDefaultState()

const getters = {
  getListTicket: (state) => {
    if (state.listTicket.length !== 0) {
      return state.listTicket
    }
    return []
  },
  getListUserTicket: (state) => {
    if (state.listUserTicket.length !== 0) {
      return state.listUserTicket
    }
    return []
  },
  getTicket: (state) => {
    return state.ticket
  },
  getTicketById: state => id => {
    return state.listUserTicket.find(element => {
      return element.id === id
    })
  },
  getTicketOption: (state) => {
    return state.ticketOption
  }
}

const mutations = {
  SET_LIST_TICKET (state, payload) {
    state.listTicket = payload
  },
  SET_LIST_USER_TICKET (state, payload) {
    state.listUserTicket = payload
  },
  SET_TICKET: (state, payload) => {
    state.ticket = Object.assign(state.ticket, payload)
  },
  SET_TICKET_OPTION: (state, payload) => {
    state.ticketOption = payload
  }
}

const actions = {
  async getListTicketAction ({commit, state}, params) {
    try {
      const response = await listTicketApi(params)
      commit('SET_LIST_TICKET', response.data.data)
    } catch (e) {
    }
  },
  bookingTicketAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      bookTicketApi(params).then(response => {
        resolve(response.data)
      }, error => {
        reject(error)
      })
    })
  },
  async getListUserTicketAction ({commit}) {
    try {
      const response = await getListOfUserTicketApi()
      commit('SET_LIST_USER_TICKET', response.data)
    } catch (e) {
    }
  },
  ticketDetailAction ({commit, getters, state}, params) {
    return new Promise((resolve, reject) => {
      ticketDetailApi(params).then(response => {
        const data = response.data
        commit('SET_TICKET', data)
        resolve(response)
      }, error => {
        reject(error)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addTicketUserHistoryAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      addTicketUserHistory(params).then(response => {
        resolve(response.data)
      }, error => {
        reject(error.response)
      })
    })
  },

  ticketOption ({commit}, params) {
    return new Promise((resolve, reject) => {
      ticketOptionApi(params).then(response => {
        const data = response.data.data
        commit('SET_TICKET_OPTION', data)
        resolve(response.data)
      }, error => {
        reject(error.response)
      })
    })
  },

  ticketPaymentAction ({commit}, params) {
    return new Promise((resolve, reject) => {
      ticketPaymentApi(params).then(response => {
        resolve(response.data)
      }, error => {
        reject(error.response)
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
