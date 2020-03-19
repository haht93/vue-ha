<template>
  <!-- <transition :name="transitionName" mode="out-in"> -->
      <router-view :key="$route.fullPath"></router-view>
  <!-- </transition> -->
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'fade'
    }
  }
}
</script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
