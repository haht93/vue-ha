<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
    <div class="main-contents">
      <div class="ticket-details details-green">
        <ul class="ticket-tagList qrcode-tagList">
          <li class="ticket-tagList__item">
            <i class="icon-adult"></i>
            <span>大人</span>
          </li>
        </ul>
        <h2 class="qrcode-top_title">市内</h2>
        <div class="ticket-details__animation">
          <div class="ticket-details__animation-item">

          </div>
        </div>
        <div class="ticket-details__main">
          <p class="ticket-details__main-title qrcode-title">市内</p>
          <div class="ticket-details__main-qrcode">
            <qrcode :value="this.url" :options="{ width: 120 }"></qrcode>
          </div>
        </div>
        <ul class="ticket-details__cityList">
          <li><i class="icon-city1"></i>富山地鉄 (市内軌道・市内バス)</li>
        </ul>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'

export default {
  components: {
    MainLayout
  },
  created () {
    this.$store.dispatch('setBackgroundGreen')
  },
  destroyed () {
    this.$store.commit('SET_BACKGROUND_GREEN', false)
  },
  data () {
    return {
      title: '乗車券詳細',
      url: window.location.origin
    }
  }
}
</script>
