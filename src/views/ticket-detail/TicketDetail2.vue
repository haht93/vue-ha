<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
    <div class="main-contents__wrapper main-contents__wrapper-red">
      <div class="main-contents">
        <div class="ticket-details details-red">
          <ul class="ticket-tagList">
            <li class="ticket-tagList__item">
              <i class="icon-child"></i>
              <span>子供</span>
            </li>
            <li class="ticket-tagList__item">
              <i class="icon-day1"></i>
              <span>1日券</span>
            </li>
          </ul>

          <div class="ticket-details__animation">
            <div class="ticket-details__animation-item">
            </div>
          </div>
          <div class="ticket-details__main">
            <p class="ticket-details__main-title">市外</p>
            <p class="ticket-details__main-limit">有効期限 <span>8</span>月<span>30</span>日</p>
            <p class="ticket-details__main-time">あと <span>12</span>時間 <span>10</span>分 <span>11</span>秒 有効</p>
          </div>
          <ul class="ticket-details__cityList">
            <li><i class="icon-city1"></i>富山地鉄 (市内軌道・市内バス)</li>
            <li><i class="icon-city3"></i>あいの風富山鉄道(高山線・城端線・氷見線)</li>
          </ul>
          <ul class="ticket-details__links">
            <li><router-link :to="{name: 'ticket-qrcode'}" class="btn-white">QRコードを表示</router-link></li>
            <li><router-link :to="{name: 'ticket-route'}" class="btn-white">オプションチケット選択</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import { mapGetters } from 'vuex'

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
      title: '乗車券詳細'
    }
  },
  computed: {
    ...mapGetters({
      getTicket: 'ticket/getTicket'
    })
  }
}
</script>
