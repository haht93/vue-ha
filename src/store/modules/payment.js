import store from '../index'

const getDefaultState = () => {
  return {
    cardInfo: localStorage.getItem('card_info') ? JSON.parse(localStorage.getItem('card_info')) : {},
    ticketInfo: localStorage.getItem('ticket_info') ? JSON.parse(localStorage.getItem('ticket_info')) : {},
    userTicket: localStorage.getItem('user_ticket') ? JSON.parse(localStorage.getItem('user_ticket')) : {}
  }
}

const state = getDefaultState()

const getters = {
  getCardInfo (state) {
    return state.cardInfo
  },
  checkDataPayment (state) {
    // eslint-disable-next-line no-undef
    return _.isEmpty(state.cardInfo) && _.isEmpty(state.ticketInfo) && _.isEmpty(state.userTicket)
  },
  getUserTicket (state) {
    return state.userTicket
  },
  filterTicket (state) {
    let local = state.ticketInfo.local
    let type = state.ticketInfo.type
    let listTicket = store.getters['ticket/getListTicket']
    // eslint-disable-next-line no-undef
    return _.filter(listTicket, function (ticket) {
      return ticket.value === parseInt(local) && ticket.type_of_person === parseInt(type)
    })
  },
  sumPrice (state, getters) {
    console.log(getters.filterTicket)
    return state.ticketInfo.num_day * (getters.filterTicket.length !== 0 ? getters.filterTicket[0].price : state.ticketInfo.price)
  },
  showFourNumberCard (state) {
    // eslint-disable-next-line no-undef
    if (!_.isEmpty(state.cardInfo.number)) {
      // eslint-disable-next-line no-undef
      return _.join(_.takeRight(state.cardInfo.number, 4), '')
    }
    return ''
  }
}

const mutations = {
  SET_CARD: (state, card) => {
    state.cardInfo = card
  },
  SET_TICKET: (state, ticket) => {
    state.ticketInfo = ticket
  },
  SET_USER_TICKET: (state, userTicket) => {
    state.userTicket = userTicket
  },
  REMOVE_DATA_PAYMENT: (state) => {
    localStorage.removeItem('card_info')
    localStorage.removeItem('ticket_info')
    localStorage.removeItem('user_ticket')
    state.cardInfo = {}
    state.userTicket = {}
    state.ticketInfo = {}
  }
}

const actions = {
  storeCardAction ({commit}, params) {
    return new Promise(resolve => {
      localStorage.setItem('card_info', JSON.stringify(params))
      commit('SET_CARD', params)
      resolve()
    })
  },
  storeTicketAction ({commit}, params) {
    return new Promise(resolve => {
      localStorage.setItem('ticket_info', JSON.stringify(params))
      commit('SET_TICKET', params)
      resolve()
    })
  },
  storeUserTicketAction ({commit}, params) {
    return new Promise(resolve => {
      localStorage.setItem('user_ticket', JSON.stringify(params))
      commit('SET_USER_TICKET', params)
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
