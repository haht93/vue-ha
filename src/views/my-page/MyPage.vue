<template>
  <main-layout :title="title" :hasMenuToggle="true">
    <div class="main-contents">
      <router-link :to="{name: 'ticket-index'}" class="ticket ticket-gray mypage-ticket">
        <span class="mypage-ticket__icon icon-ticket"></span>
        乗車券管理
      </router-link>
       <router-link :to="{name: 'top-sessions'}" class="ticket ticket-blue mypage-ticket">
        <span class="mypage-ticket__icon icon-lists"></span>
        セッション管理
      </router-link>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'

export default {
  components: {
    MainLayout
  },
  data () {
    return {
      title: 'マイページ'
    }
  }
}
</script>
