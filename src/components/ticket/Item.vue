<template>
  <li>
    <router-link :event="this.disabledTicket ? '' : 'click'" :to="{name: 'ticket-detail-top' , params: { id: item.id } }" :key="item.id" class="ticket ticket-gray ticket-list__item" :class="[{'ticket-disabled' : this.disabledTicket}]">
      <p class="ticket-list__title">{{ item.name }}</p>
      <p v-if="!exp.value" class="ticket-list__term">有効期限： {{ exp.month2 + '/' + exp.day2 + '-' + exp.month + '/' + exp.day }}</p>
      <p v-else class="ticket-list__term">有効期限： {{ exp.month + '/' + exp.day }}</p>
      <p class="ticket-list__price">{{ item.Amount }}<span>円</span></p>
    </router-link>
  </li>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'Item',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      disabled: process.env.DISABLED_TICKETS
    }
  },
  computed: {
    disabledTicket () {
      if (parseInt(this.disabled) === 1) {
        return !this.isAvailableDate
      }
      return false
    },
    isAvailableDate () {
      let current = moment().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
      let bookingDate = moment(this.item.booking_date).tz('Asia/Tokyo').startOf('day').format('YYYY-MM-DD HH:mm:ss')
      let nextDate = moment(this.item.booking_date).tz('Asia/Tokyo').add(this.item.number_of_days - 1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      return moment(current).isBetween(bookingDate, nextDate, null, '[]')
    },
    exp () {
      const date = moment(new Date(this.item.booking_date)).add(this.item.number_of_days - 1, 'days')
      let to = date.format('YYYY-MM-DD')
      let from = this.item.booking_date
      if (from === to) {
        return {
          day: from.slice(8, 10),
          month: from.slice(5, 7),
          value: true
        }
      }
      return {
        day2: from.slice(8, 10),
        month2: from.slice(5, 7),
        day: to.slice(8, 10),
        month: to.slice(5, 7),
        value: false
      }
    }
  }
}
</script>
