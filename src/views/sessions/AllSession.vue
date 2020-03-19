<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
    <input type="radio" name="session" value=""  id="session-reservation" @click="toggleAccordion(true)" :checked="this.isFirstTab">
    <input type="radio" name="session" value=""  id="session-entry" @click="toggleAccordion(false)" :checked="!this.isFirstTab">
    <div class="session-label">
      <label for="session-reservation" class="session-reservation__label">予約済み</label>
      <label for="session-entry" class="session-entry__label">登録済み</label>
    </div>
    <div class="main-contents">
      <div class="session-list reservation-list" v-if="this.isFirstTab">
        <item v-for="(user, index) in this.getListOfUserBook" :item="user" :key="`${user.id}-${index}`"/>
      </div>
      <div class="session-list entry-list" v-else>
        <item v-for="(user, index) in this.getListOfUserRegister" :item="user" :key="`${user.id}-${index}`" />
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Item from '@/components/sessions/Item'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    MainLayout,
    Item
  },
  data () {
    return {
      title: '予約・登録済みセッション一覧',
      hasMenuToggle: true
    }
  },
  mounted () {
    this.getListOfUsersAction(this.filterSession)
  },
  methods: {
    toggleAccordion: function (isFirstTab) {
      this.$store.commit('SET_FIRST_TAB', isFirstTab)
      const filter = this.filterSession
      this.getListOfUsersAction(filter)
    },
    ...mapActions('all-sessions', [
      'getListOfUsersAction'
    ])
  },
  computed: {
    ...mapGetters({
      getListOfUserRegister: 'all-sessions/getListOfUserRegister',
      getListOfUserBook: 'all-sessions/getListOfUserBook'
    }),
    filterSession () {
      return this.$store.state.isFirstTab ? 'book' : 'register'
    },
    isFirstTab () {
      return this.$store.state.isFirstTab
    }
  },
  destroyed () {
    this.$store.commit('all-sessions/RESET_LIST_SESSION')
  }
}
</script>
