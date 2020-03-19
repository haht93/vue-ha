<template>
  <div>
    <ul class="ticket-optionList">
      <ticket-option-item v-for="(item, index) in this.item.children.data" :key="`${item.id}-${index}`" :item="item"/>
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
    this.ticketOption({option_id: this.$route.params.id2}).then(response => {
      this.item = response.data[0]
    })
  },
  methods: {
    ...mapActions({
      ticketOption: 'ticket/ticketOption'
    })
  }
}

</script>
