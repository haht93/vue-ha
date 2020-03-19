<template>
  <div>
    <div class="ticket-details__main">
      <p class="ticket-details__main-title qrcode-title">{{ this.getTicket.name }}</p>
      <div class="ticket-details__main-qrcode">
        <qrcode :value="this.url" :options="{ width: 120 }"></qrcode>
      </div>
    </div>
    <ul class="ticket-details__cityList">
      <li><i class="icon-city1"></i>富山地鉄 (市内軌道・市内バス)</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getTicket: 'ticket/getTicket'
    })
  },
  data () {
    return {
      url: window.location.origin
    }
  }
}
</script>
