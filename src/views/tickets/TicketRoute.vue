<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="ticket-route">
      <h2 class="h2-title">
        朝日町
      </h2>
      <div class="ticket-option">
        <ticket-option-item />
        <ticket-option-item />
        <ticket-option-item />
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import TicketOptionItem from '@/components/ticket/TicketOptionItem'
export default {
  components: {
    MainLayout,
    TicketOptionItem
  },
  data () {
    return {
      title: 'オプションチケット路線選択'
    }
  }
}
</script>
<style lang="scss" scoped>
  .ticket-route {
    .h2-title {
      font-size: 13px;
    }
    .ticket-option {
      margin: 0 0 20px;
    }
  }
</style>
