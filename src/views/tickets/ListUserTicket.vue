<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="main-contents">
      <ul class="ticket-list">
        <item :item="item" v-for="(item, index) in this.getListUserTicket" :key="`${item.id}-${index}`"/>
      </ul>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Item from '@/components/ticket/Item'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    MainLayout,
    Item
  },
  data () {
    return {
      title: '購入済み乗車券一覧'
    }
  },
  created () {
    this.getListUserTicketAction()
  },
  methods: {
    ...mapActions({
      getListUserTicketAction: 'ticket/getListUserTicketAction'
    })
  },
  computed: {
    ...mapGetters({
      getListUserTicket: 'ticket/getListUserTicket'
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
