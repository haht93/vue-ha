<template>
  <div class="ticket-slick">
    <div class="ticket-slick_item" v-for="(item, index) in this.getListUserTicket" :key="`${item.id}-${index}`">
      <router-link class="ticket_info" :to="{ name: 'ticket-detail-top', params: { id: item.id } }" :key="item.id">
        <div class="ticket ticket-gray manage-ticket">
          <p class="manage-ticket__title">{{ item.name }}<i class="icon-city1"></i><i class="icon-city2"></i></p>
          <p class="manage-ticket__term"> {{ expDay(item).year + '年' + expDay(item).month + '月' + expDay(item).day + '日'}} 23:59まで</p>
          <p class="manage-ticket__issue">発行日時：{{ formatDay(item.created_at).year + '年' + formatDay(item.created_at).month + '月' + formatDay(item.created_at).day + '日'}} 00:00</p>
          <p class="manage-ticket__price">{{ item.price }}<span>円</span></p>
        </div>
      </router-link>
    </div>
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  created () {
    this.getListUserTicketAction()
  },
  methods: {
    ...mapActions({
      getListUserTicketAction: 'ticket/getListUserTicketAction'
    }),
    expDay (day) {
      const time = moment(new Date(day.booking_date)).add(day.number_of_days - 1, 'days')
      return {
        day: time.format('DD'),
        month: time.format('MM'),
        year: time.format('YYYY')
      }
    },
    formatDay (time) {
      return {
        day: moment(new Date(time)).format('DD'),
        month: moment(new Date(time)).format('MM'),
        year: moment(new Date(time)).format('YYYY')
      }
    }
  },
  computed: {
    ...mapGetters({
      getListUserTicket: 'ticket/getListUserTicket'
    })
  }
}
</script>
