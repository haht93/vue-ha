<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
<div :class="[!this.getTicket.value ? 'main-contents__wrapper-green' : 'main-contents__wrapper-red']">
  <div class="main-contents">
    <div :class="[!this.getTicket.value ? 'details-green' : 'details-red']" class="ticket-details">
      <ul class="ticket-tagList">
        <li class="ticket-tagList__item" v-if="!this.getTicket.type_of_person">
          <i class="icon-adult"></i>
          <span>大人</span>
        </li>
        <li class="ticket-tagList__item" v-else>
          <i class="icon-child"></i>
          <span>子供</span>
        </li>
      </ul>

      <div class="ticket-details__animation">
        <div class="ticket-details__animation-item">
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import TicketQrcode from '@/components/ticket/TicketQrcode'
import {mapGetters} from 'vuex'
import {countdown} from '@/mixins/countdown'
import moment from 'moment-timezone'

export default {
  mixins: [countdown],
  components: {
    MainLayout,
    TicketQrcode
  },
  created () {
    this.$store.dispatch('setBackgroundGreen')
    this.addTicketHistory()
    this.countDownTimer()
  },
  destroyed () {
    this.$store.commit('SET_BACKGROUND_GREEN', false)
    this.countDown = undefined
  },
  data () {
    return {
      title: '乗車券詳細',
      location: null,
      countDown: 60 * 10
    }
  },
  methods: {
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else if (isNaN(this.countDown)) {
      } else {
        this.$router.push({name: 'list-user-tickets'})
      }
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(pos => {
          this.location = pos.coords
          resolve(pos.coords)
        }, err => {
          reject(err)
        })
      })
    },
    roundingToThreeDecimal (value) {
      // eslint-disable-next-line no-undef
      return _.round(value, 3).toFixed(3)
    },
    async addTicketHistory () {
      try {
        try {
          this.location = await this.getLocation()
        } catch (e) {
        }
        let params = {
          date_usage: moment().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'),
          type: this.getTicket.value,
          lat: this.location !== null ? this.roundingToThreeDecimal(this.location.latitude) : '',
          lng: this.location !== null ? this.roundingToThreeDecimal(this.location.longitude) : '',
          price: this.getTicket.price,
          voucher_name: ''
        }
        return await this.$store.dispatch('ticket/addTicketUserHistoryAction', params)
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    ...mapGetters({
      getTicket: 'ticket/getTicket'
    })
  }
}
</script>
