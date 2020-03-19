<template>
  <main-layout :hasBackBtn="true" :title="title">
    <div class="main-contents">
      <router-view></router-view>
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
      title: 'オプションチケット路線選択'
    }
  }
}
</script>
