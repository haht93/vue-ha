<template>
  <div>
    <div class="ticket-details__main">
      <p class="ticket-details__main-title">{{ this.getTicket.name }}</p>
      <p class="ticket-details__main-limit">有効期限 <span>{{ exp.month }}</span>月<span>{{ exp.day }}</span>日</p>
      <p class="ticket-details__main-time">あと <span>{{ this.hours }}</span>時間 <span>{{ this.minutes }}</span>分 <span>{{ this.seconds }}</span>秒 有効</p>
    </div>
    <ul class="ticket-details__links">
      <li><router-link :to="{name: 'tqrcode', params: { id: this.$route.params.id }}" class="btn-white">QRコードを表示</router-link></li>
      <li v-if="!this.getTicket.value">
        <button @click="routeTicketTop" class="btn-white">オプションチケット選択</button>
      </li>
      <li><a class="btn-white" @click="topTicket">乗車券管理に戻る</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
import { countdown } from '@/mixins/countdown'

export default {
  mixins: [
    countdown
  ],
  computed: {
    ...mapGetters({
      getTicket: 'ticket/getTicket'
    }),
    exp () {
      const date = moment(new Date(this.getTicket.booking_date)).add(this.getTicket.number_of_days - 1, 'days')
      return {
        day: date.format('DD'),
        month: date.format('MM')
      }
    }
  },
  methods: {
    routeTicketTop () {
      let ticketDetail = this.getTicket
      ticketDetail['id_ticket'] = this.$route.params.id
      localStorage.setItem('ticket_detail', JSON.stringify(ticketDetail))
      this.$router.push({name: 'ticket-option-top', params: {id: this.$route.params.id}})
    },
    topTicket () {
      this.$router.push({name: 'ticket-index'})
    }
  }
}
</script>
