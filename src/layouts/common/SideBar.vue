<template>
  <div class="nav-wrapper">
    <input type="checkbox" id="nav-checkbox">
    <label for="nav-checkbox" class="menu-open"><img src="@/assets/img/common/menu-open.svg" alt=""></label>
    <label for="nav-checkbox" class="menu-close-bg"></label>
    <div class="nav-contents">
      <div class="nav-header">
        <h2 class="nav-header__title">Menu</h2>
        <label for="nav-checkbox" class="nav-header__close"><img src="@/assets/img/common/menu-close.svg" alt=""></label>
      </div>
      <div class="nav-body">
        <router-link :to="{name: 'home'}" class="my-page"><i class="icon-mypage"></i>マイページ</router-link>
        <div class="nav-links__wrapper">
          <h3 class="nav-links__title">乗車券</h3>
          <ul class="nav-links__gray">
            <li><router-link :to="{name: 'ticket-manage'}" :class="[currentPage.includes('ticket-manage') ? 'menu-active menu-item-session menu-link' : '']">
              <i class="icon-money"></i><span>乗車券購入</span></router-link></li>
            <li><router-link :to="{name: 'list-user-tickets'}" :class="[currentPage.includes('list-user-tickets') ? 'menu-active menu-item-session menu-link' : '']">
              <i class="icon-ticket"></i><span>購入済み乗車券</span></router-link></li>
          </ul>
        </div>
         <div class="nav-links__wrapper">
          <h3 class="nav-links__title">セッション</h3>
          <ul class="nav-links__blue">
            <li><router-link :to="{name: 'search-session'}" :class="[currentPage.includes('search-session') ? 'menu-active menu-item-session menu-link' : '']">
              <i class="icon-lists"></i><span>セッション一覧</span></router-link>
            </li>
            <li><router-link :to="{name: 'list-session'}" :class="[currentPage.includes('list-session') ? 'menu-active menu-item-session menu-link' : '']">
              <i class="icon-lists_done"></i><span>予約済みセッション</span></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-footer">
        <a href="javascript:void(0)" @click.stop="logout" class="logout-btn">ログアウト<i class="icon-logout"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentPage () {
      return this.$route.path
    }
  },
  methods: {
    async logout () {
      try {
        const response = await this.$store.dispatch('auth/logoutAction')
        if (response.data.success) {
          this.$router.push({name: 'login'})
        }
      } catch (error) {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
