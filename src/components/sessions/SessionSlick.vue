<template>
  <div class="session-slick">
    <div class="session-slick__item" v-for="(item, index) in this.getListOfUser" :key="`${item.id}-${index}`">
      <router-link class="session-ticket" :to="{ name: 'session-detail', params: { id: item.id } }" :key="item.id">
        <p class="session-ticket__title">{{ item.description }}</p>
        <span class="session-ticket__name">{{ item.speaker_name }}</span>
        <span class="session-ticket__date">{{ item.happened_date }}&nbsp;&nbsp;{{ item.happened_time }}&nbsp;&nbsp;{{ item.room_name }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import Item from './Item'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Item
  },
  created () {
    this.getListOfUsers()
  },
  computed: {
    ...mapGetters({
      getListOfUser: 'all-sessions/getListOfUser'
    })
  },
  methods: {
    ...mapActions({
      getListOfUsers: 'all-sessions/getListOfUsersAction'
    })
  }
}
</script>
