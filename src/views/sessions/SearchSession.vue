<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true">
    <div class="main-contents">
      <label class="search-input">
        <input v-model="searchForm.search" @keyup.enter="searchListSession" type="text" name="search" value="" placeholder="セッション・論文に含まれる用語で検索">
        <button @click.prevent="searchListSession"></button>
      </label>
      <h2 class="h2-title">セッション一覧</h2>
      <div class="session-list">
        <item v-for="(item, index) in this.getListSessionSearch" :item="item" :key="`${item.id}-${index}`"/>
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
      title: 'セッション一覧',
      searchForm: {
        search: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getListSession: 'session/getListSession',
      getLastPage: 'session/getLastPage',
      getListSessionSearch: 'session/getListSessionSearch'
    }),
    hasMore () {
      return this.$store.state.session.data.pagination.current_page < this.$store.state.session.data.pagination.last_page &&
        this.$store.state.session.data.pagination.per_page < this.$store.state.session.data.pagination.total
    },
    fetching () {
      return this.$store.state.session.fetching
    }
  },
  created () {
    this.updateListSession()
  },
  mounted () {
    // eslint-disable-next-line no-undef
    window.onscroll = _.throttle(() => {
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrolleTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = window.innerHeight
      if (scrollHeight - scrolleTop - windowHeight <= 100) {
        if (this.hasMore && !this.fetching) {
          this.updateListSession({
            page: this.$store.state.session.data.pagination.current_page + 1
          })
        }
      }
    }, 400)
  },
  destroyed () {
    window.onscroll = null
  },
  methods: {
    ...mapActions({
      getListSessionAction: 'session/getListSessionAction'
    }),
    async updateListSession (params = {}) {
      await this.getListSessionAction({...params})
    },
    searchListSession () {
      this.updateListSession({
        keyword: this.searchForm.search
      })
    }
  }
}
</script>
