<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="main-contents">
      <h2 class="h2-title">予約・登録済みセッション</h2>
      <session-slick />
      <div class="btn-session__wrapper mb-30">
        <router-link :to="{name: 'list-session'}" class="btn-session">予約・登録済みセッション一覧</router-link>
      </div>

      <h2 class="h2-title">セッション一覧</h2>
      <div class="session-list">
        <item :item="item" v-for="(item, index) in this.takeListSession" :key="`${item.id}-${index}`"/>
      </div>
      <div class="btn-session__wrapper">
        <router-link :to="{name: 'search-session'}" class="btn-session text-gray">一覧ページへ</router-link>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Item from '@/components/sessions/Item'
import SessionSlick from '@/components/sessions/SessionSlick'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    MainLayout,
    Item,
    SessionSlick
  },
  data () {
    return {
      title: 'セッション管理',
      isChecked: true,
      hasMenuToggle: true
    }
  },
  created () {
    this.getListSessionAction({
      keyword: ''
    })
  },
  methods: {
    ...mapActions({
      getListSessionAction: 'session/getListSessionAction'
    })
  },
  computed: {
    ...mapGetters({
      getListSession: 'session/getListSession',
      takeListSession: 'session/takeListSession'
    })
  }
}
</script>
