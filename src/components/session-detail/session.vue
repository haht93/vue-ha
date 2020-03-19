<template>
  <div class="session-detail__info">
    <div class="session-detail__header">
      <p class="session-detail__header-date">{{ new Date().getFullYear() }}年{{ session.happened_date }}</p>
      <p class="session-detail__header-time">{{ session.happened_time }}</p>
      <p class="session-detail__header-type" v-if="!session.is_limit"><span class="no-limit">制限なし</span></p>
      <p class="session-detail__header-type" v-else>
        <span class="seat-available" v-if="session.seat_available !== 0">
          <span>制限あり</span>
          <span>残り{{ session.seat_available }}席</span></span>
        <span class="limit" v-else>満員</span>
      </p>
      <p class="session-detail__header-place">{{ session.room_name }}</p>
      <h2 class="session-detail__header-title">{{ session.description }}<span class="name">{{ session.speaker_name }}</span></h2>
    </div>
    <div class="session-detail__charge">
      <p class="session-detail__charge-title">料金</p>
      <p class="session-detail__charge-money" v-if="session.price !== 0"><span>{{ session.price }}</span>円</p>
      <p class="session-detail__charge-free" v-else>無料</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    session: {
      type: Object,
      required: true
    }
  }
}
</script>
