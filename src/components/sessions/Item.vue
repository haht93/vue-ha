<template>
  <div class="session-list__item">
      <router-link class="session-ticket" :to="{ name: 'session-detail', params: { id: item.id } }" :key="item.id">
          <p class="session-ticket__title">{{ item.description }}</p>
          <!-- <span class="session-ticket__member">{{ item.description }}</span> -->
          <span class="session-ticket__name">{{ item.speaker_name }}</span>
          <span class="session-ticket__date">{{ item.happened_date }}&nbsp;&nbsp;{{ item.happened_time }}&nbsp;&nbsp;{{ item.room_name }}</span>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object
    }
  }
}
</script>
