import Layout from '@/layouts/Layout'
import store from '@/store/index'

export default [
  {
    path: '/',
    name: 'element',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login'),
        meta: {
          guest: true
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/register/Register'),
        meta: {
          guest: true
        }
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/my-page/MyPage'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'search-session',
        name: 'search-session',
        component: () => import('@/views/sessions/SearchSession.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'top-sessions',
        name: 'top-sessions',
        component: () => import('@/views/sessions/TopSession.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'qrcode',
        name: 'qrcode',
        component: () => import('@/views/qrcode/Index'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'list-session',
        name: 'list-session',
        component: () => import('@/views/sessions/AllSession'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'session-detail/:id',
        name: 'session-detail',
        component: () => import('@/views/session-detail/SessionDetail'),
        props: true,
        beforeEnter (routeTo, routeFrom, next) {
          store.dispatch('session/sesstionDetailAction', routeTo.params.id).then(response => {
            routeTo.params.data = response.data
            next()
          }, error => {
            console.log(error)
          }).catch(error => {
            console.log(error)
          })
        },
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'ticket-detail/:id',
        name: 'ticket-detail',
        component: () => import('@/views/ticket-detail/TicketDetail'),
        props: true,
        beforeEnter (routeTo, routeFrom, next) {
          store.dispatch('ticket/ticketDetailAction', routeTo.params.id).then(response => {
            routeTo.params.data = response.data
            next()
          }, () => {
          }).catch(() => {
          })
        },
        children: [
          {
            path: '',
            name: 'ticket-detail-top',
            component: () => import('@/views/ticket-detail/TicketDetailTop.vue')
          },
          {
            path: 'tqrcode',
            name: 'tqrcode',
            component: () => import('@/components/ticket/TicketQrcode.vue')
          }
          // other nested routes
        ],
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'ticket-amount/:idRoute',
        name: 'ticket-amount',
        component: () => import('@/views/tickets/TicketInputAmount.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'ticket-route',
        name: 'ticket-route',
        component: () => import('@/views/tickets/TicketOptionRoute.vue'),
        props: true,
        redirect: 'ticket-option-top',
        children: [
          {
            path: '',
            name: 'ticket-option-top',
            component: () => import('@/views/tickets/TicketOptionTop.vue'),
            props: true
          },
          {
            path: 'sub/:id',
            name: 'ticket-option-sub',
            component: () => import('@/views/tickets/TicketOptionSub.vue'),
            props: true
          },
          {
            path: ':id/:id2',
            name: 'ticket-option-sub2',
            component: () => import('@/views/tickets/TicketOptionSub2.vue'),
            props: true
          }
        ],
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'ticket-option-detail/:idTicket',
        name: 'ticket-option-detail',
        component: () => import('@/views/ticket-detail/TicketOptionDetail.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'policy',
        name: 'policy',
        component: () => import('@/views/policy/policy')
      },
      {
        path: 'ticket-index',
        name: 'ticket-index',
        component: () => import('@/views/tickets/Index.vue')
      },
      {
        path: 'ticket-manage',
        name: 'ticket-manage',
        component: () => import('@/views/tickets/TicketManage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('@/views/payment/CreditCard.vue'),
        meta: {
          requiresAuth: true,
          requiresPayment: true
        }
      },
      {
        path: 'payment-confirm',
        name: 'payment-confirm',
        component: () => import('@/views/payment/PaymentConfirm.vue'),
        meta: {
          requiresAuth: true,
          requiresPayment: true
        }
      },
      {
        path: 'ticket-qrcode',
        name: 'ticket-qrcode',
        component: () => import('@/views/ticket-detail/TicketQRCode.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'list-user-tickets',
        name: 'list-user-tickets',
        component: () => import('@/views/tickets/ListUserTicket.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]
