const mutations = {
  SET_BACKGROUND_WHITE: (state, payload) => {
    state.backgroundWhite = payload
  },
  SET_BACKGROUND_GREEN: (state, payload) => {
    state.backgroundGreen = payload
  },
  SET_TOGGLE_SIDEBAR: (state, isToggleSideBar) => {
    state.isToggleSideBar = isToggleSideBar
  },
  SET_FIRST_TAB (state, isFirstTab) {
    state.isFirstTab = isFirstTab
  },
  SET_STEP_PAYMENT (state, step) {
    state.stepPayement = step
  },
  SET_STEP_DEFAULT (state) {
    state.stepPayement = 1
  },
  SET_TITLE: (state, title) => {
    state.title = title
  }
}
export default mutations
