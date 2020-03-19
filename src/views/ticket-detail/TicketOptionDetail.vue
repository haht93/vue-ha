<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="main-contents__wrapper main-contents__wrapper-green">
      <div class="main-contents">
        <div class="ticket-details details-green">
          <ul class="ticket-tagList">
            <li class="ticket-tagList__item">
              <i class="icon-adult"></i>
              <span>大人</span>
            </li>
          </ul>

          <div class="ticket-details__animation">
            <div class="ticket-details__animation-item">

            </div>
          </div>
          <div class="ticket-details__main">
            <p class="ticket-details__main-title">{{ ticket.line_1 }}</p>
            <p class="ticket-details__main-limit">{{ ticket.line_2 }}</p>
            <p class="ticket-details__main-limit">{{ ticket.voucher_name }}</p>
            <p class="ticket-details__main-limit"><span>{{ ticket.price === null ? `割引券` : ticket.price }}</span> {{ ticket.price !== null ? `円相当` : ``}}</p>
            <p class="ticket-details__main-time">あと <span>{{ this.mmss.minutes }}</span>分 <span>{{ this.mmss.seconds }}</span>秒 有効</p>
          </div>
          <ul class="ticket-details__links">
            <li><a class="btn-white" @click="topTicket">乗車券管理に戻る</a></li>
          </ul>
        </div>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import { countdown } from '@/mixins/countdown'
import moment from 'moment-timezone'

export default {
  components: {
    MainLayout
  },
  mixins: [countdown],
  data () {
    return {
      title: '乗車券詳細',
      ticket: {},
      countDown: 60 * 10,
      location: null
    }
  },
  created () {
    this.countDownTimer()
  },
  mounted () {
    if (localStorage.getItem('ticket_detail')) {
      this.ticket = JSON.parse(localStorage.getItem('ticket_detail'))
    }
    this.addTicketHistory()
  },
  destroyed () {
    this.countDown = undefined
  },
  computed: {
    mmss () {
      let date = moment.utc(this.countDown * 1000)
      return {
        minutes: date.format('mm'),
        seconds: date.format('ss')
      }
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
        localStorage.removeItem('ticket_detail')
        this.$router.push({name: 'list-user-tickets'})
      }
    },
    topTicket () {
      this.$router.push({name: 'ticket-index'})
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(pos => {
          console.log(pos)
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
          type: this.ticket.value,
          lat: this.location !== null ? this.roundingToThreeDecimal(this.location.latitude) : '',
          lng: this.location !== null ? this.roundingToThreeDecimal(this.location.longitude) : '',
          price: this.ticket.price,
          voucher_name: this.ticket.line_2 || '',
          route_name: this.ticket.line_1 || ''
        }
        return await this.$store.dispatch('ticket/addTicketUserHistoryAction', params)
      } catch (e) {
      }
    }
  }
}
</script>
