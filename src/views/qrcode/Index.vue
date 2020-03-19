<template>
  <main-layout :hasBackBtn="true" :title="title">
    <div class="main-contents">
      <div class="session-qrcode">
        <div class="session-qrcode__img">
          <img src="@/assets/img/common/qrcode.png" alt="">
        </div>
        <div class="session-qrcode__bottom">
          <p class="text">会員番号</p>
          <p class="number">022894197411</p>
        </div>
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
  data () {
    return {
      title: 'QRコード'
    }
  }
}
</script>
