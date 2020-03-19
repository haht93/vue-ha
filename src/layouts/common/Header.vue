<template>
  <header class="header">
    <a href="javascript:void(0);" class="back-btn" v-if="hasBackBtn" @click="goBack"><img src="@/assets/img/common/arrow-left.svg" alt="Go Back"></a>
    <h1 class="main-title">{{ title }}</h1>
    <side-bar v-if="hasMenuToggle"/>
  </header>
</template>
<script>
import SideBar from '@/layouts/common/SideBar'
export default {
  name: 'HeaderMain',
  components: {
    SideBar
  },
  props: {
    title: {
      type: String
    },
    hasBackBtn: {
      type: Boolean,
      default: () => false
    },
    hasMenuToggle: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    isBackgroundWhite () {
      return this.$store.state.backgroundWhite
    },
    isBackgroundGreen () {
      return this.$store.state.backgroundGreen
    }
  },
  data () {
    return {
      isToggleSideBar: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
