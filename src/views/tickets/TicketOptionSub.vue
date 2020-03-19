<template>
  <div>
    <ul v-if="this.item.children.data.length !== 0" class="ticket-optionList" :class="[{'list-2column' : this.item.children.data.length > 6}]">
      <li v-if="item.children.data.length !== 0" v-for="(item, index) in this.item.children.data" :key="`${item.id}-${index}`"><router-link :to="{name: 'ticket-option-sub2', params: { id2: item.id, item }}">{{ item.route_name }}</router-link></li>
      <ticket-option-item v-else :key="`${item.id}-${index}`" :item="item"/>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import TicketOptionItem from '@/components/ticket/TicketOptionItem'

export default {
  name: 'ticket-option-sub',
  components: {
    TicketOptionItem
  },
  data () {
    return {
      item: {children: {data: []}}
    }
  },
  mounted () {
    this.ticketOption({option_id: this.$route.params.id}).then(response => {
      this.item = response.data[0]
      this.updateTicketDetail(response.data[0])
    })
  },
  methods: {
    ...mapActions({
      ticketOption: 'ticket/ticketOption'
    }),
    updateTicketDetail (ticket) {
      if (localStorage.getItem('ticket_detail')) {
        let existing = localStorage.getItem('ticket_detail')
        existing = existing ? JSON.parse(existing) : {}
        existing['price'] = this.item.price
        existing['range'] = this.item.range
        existing['line_1'] = this.item.line_1 || ''
        existing['line_2'] = this.item.line_2 || ''
        existing['route_name'] = this.item.route_name
        existing['voucher_name'] = this.item.voucher_name || ''
        localStorage.setItem('ticket_detail', JSON.stringify(existing))
      }
    }
  }
}

</script>
