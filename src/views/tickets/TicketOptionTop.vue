<template>
<div>
     <h2 class="h2-title">無料オプション</h2>
  <ul class="ticket-optionList">
      <li v-for="(item, index) in this.ticketTop" :key="`${item.id}-${index}`" v-if="item.children.data.length !== 0" >
        <router-link :to="{name: 'ticket-option-sub', params: { id: item.id, item }}">{{ item.route_name }}</router-link>
      </li>
    <ticket-option-item v-else :key="`${item.id}-${index}`" :item="item"/>
  </ul>
     <h2 class="h2-title">優待券</h2>
   <ul class="ticket-optionList">
       <ticket-option-item v-for="(item, index) in this.ticketBottom" :key="`${item.id}-${index}`" :item="item"/>
    </ul>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import TicketOptionSub from './TicketOptionSub'
import TicketOptionItem from '@/components/ticket/TicketOptionItem'

export default {
  components: {
    TicketOptionSub,
    TicketOptionItem
  },
  mounted () {
    this.ticketOption()
  },
  computed: {
    ...mapGetters({
      getTicketOption: 'ticket/getTicketOption'
    }),
    ticketTop () {
      // eslint-disable-next-line no-undef
      return _.filter(this.getTicketOption, function (ticket) {
        return ticket.option === 0
      })
    },
    ticketBottom () {
      // eslint-disable-next-line no-undef
      return _.filter(this.getTicketOption, function (ticket) {
        return ticket.option === 1
      })
    },
    inputAmount () {
      console.log(this.item)
      // eslint-disable-next-line no-undef
      return !_.isNull(this.item.user_input_price)
    },
    getTicketDetail () {
      if (localStorage.getItem('ticket_detail')) {
        return JSON.parse(localStorage.getItem('ticket_detail'))
      }
    }
  },
  methods: {
    ...mapActions({
      ticketOption: 'ticket/ticketOption'
    })
  }
}

</script>
