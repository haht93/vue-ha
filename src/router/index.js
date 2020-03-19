import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import routes from './routes'
import Nprogress from 'nprogress'

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  Nprogress.start()
  let loggedIn = store.getters['auth/token']
  let checkPayment = store.getters['payment/checkDataPayment']
  if (store.state.isToggleSideBar) {
    store.commit('SET_TOGGLE_SIDEBAR', false)
    store.commit('SET_BACKGROUND_WHITE', false)
    next()
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({path: '/login'})
    } else {
      next()
    }
    if (to.matched.some(record => record.meta.requiresPayment)) {
      if (checkPayment) {
        next({
          name: 'home'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (loggedIn) {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // store.dispatch('disableLoading')
  Nprogress.done()
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
