<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="main-contents">
      <router-link :to="{name: 'ticket-manage'}" class="ticket ticket-links">
        乗車券購入
      </router-link>
      <router-link :to="{name: 'list-user-tickets'}" class="ticket ticket-links">
        購入済み乗車券一覧
      </router-link>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Dropdown from '@/components/ticket/Dropdown'

export default {
  components: {
    MainLayout,
    Dropdown
  },
  data () {
    return {
      title: '乗車券管理TOP'
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-select .is-error {
    border: 1px solid #ed4014;
  }
  .error-text {
    color: #ed4014;
  }
</style>
