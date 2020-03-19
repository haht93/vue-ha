<template>
  <div style="height: 100%;">
    <header-main :title="title" :hasBackBtn="hasBackBtn" :hasMenuToggle="hasMenuToggle"/>
    <div class="main-contents__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import HeaderMain from '@/layouts/common/Header'
export default {
  name: 'MainLayout',
  components: {
    HeaderMain
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
    toggleSideBar () {
      this.$store.commit('SET_TOGGLE_SIDEBAR', !this.isToggleSideBar)
    },
    updateCloseSideBar () {
      this.$store.commit('SET_TOGGLE_SIDEBAR', !this.isToggleSideBar)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
