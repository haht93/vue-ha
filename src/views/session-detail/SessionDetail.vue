<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
    <div class="session-detail">
      <session :session="this.getSession"/>
      <div class="session-detail__body">
        <h3 class="session-detail__body-title">発表論文リスト</h3>
        <div class="detail-list" v-if="this.getPresentations.length">
          <presentation v-for="presentation in this.getPresentations" :key="presentation.id"
                        :presentation="presentation"/>
        </div>
      </div>
      <p class="item-error-tip" v-if="errorsResponse.length">{{ errorsResponse }}</p>
      <div class="session-detail__footer">
        <button class="btn-white active" v-if="this.isRegistered || this.successResponse">登録済み</button>
        <button class="btn-white" v-else @click="handleRegister">登録する</button>
        <button class="btn-gray" :class="[{'is-disabled': this.disabledBooking}]" @click="bookingSession" :disabled="this.disabledBooking">予約する</button>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Session from '@/components/session-detail/session'
import Presentation from '@/components/session-detail/presentation'
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment-timezone'
import md5 from 'md5'

export default {
  components: {
    MainLayout,
    Session,
    Presentation
  },
  data () {
    return {
      title: `セッション詳細`,
      loading: false,
      errorsResponse: [],
      successResponse: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'top-sessions') {
      this.getListOfUsers()

      this.listSessionAction({
        params: {
          keyword: ''
        },
        reset: true
      })
    }
    next()
  },
  computed: {
    ...mapGetters({
      getSession: 'session/getSession',
      getPresentations: 'session/getPresentations'
    }),
    isRegistered () {
      return this.getSession.is_register
    },
    disabledBooking () {
      return this.getSession.seat_available === 0 || this.getSession.is_payment || this.getSession.price !== 0
    },
    randomNumber () {
      return Math.floor(1000000000000 + Math.random() * 9999999999999)
    }
  },
  mounted () {
    this.$store.dispatch('setBackgroundWhite')
  },
  methods: {
    ...mapActions({
      getListOfUsers: 'all-sessions/getListOfUsersAction',
      listSessionAction: 'session/listSessionAction',
      bookSessionAction: 'session/bookSessionAction'
    }),
    async handleRegister () {
      try {
        const response = await this.$store.dispatch('session/sessionRegisterAction', {session_id: this.getSession.id})
        if (response.data.success) {
          this.successResponse = true
          this.$store.commit('SET_FIRST_TAB', false)
          this.$router.push({name: 'list-session'})
        }
      } catch (e) {
        this.errorsResponse = e.response.data.message
      }
    },
    getYYYYMMDDHHMMSS () {
      return moment(new Date()).tz('Asia/Tokyo').format('YYYYMMDDHHmmss')
    },
    passwordMd5 (params) {
      const shopId = process.env.SHOP_ID
      const password = process.env.PASSWORD
      const orderId = params.OrderID
      const amount = this.getSession.price
      return md5(`${shopId}|${orderId}|${amount}||${password}|${params.DateTime}`)
    },
    async bookingSession () {
      try {
        const params = {
          session_id: this.getSession.id,
          OrderID: `bs${this.randomNumber}`,
          DateTime: this.getYYYYMMDDHHMMSS(),
          Amount: this.getSession.price
        }
        const response = await this.bookSessionAction(params)
        if (response.data.success) {
          if (this.getSession.price === 0) {
            document.location.reload()
            this.$store.commit('SET_FIRST_TAB', true)
            this.$router.push({name: 'list-session'})
          }
        }
      } catch (e) {
        if (e.response.status === 400) {
          this.errorsResponse = e.response.data.message
        }
      }
    }
  }
}
</script>
