<template>
  <div class="detail-list__item">
    <h4 class="detail-list__item-title">{{ presentation.title }}</h4>
    <p class="detail-list__item-menber">{{ presentation.speaker_name }}</p>
    <p class="detail-list__item-content">{{ presentation.content  || presentation.title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    presentation: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      let content = this.presentation.title ? this.presentation.title.slice(0, 30) + '...' : this.presentation.title
      if (this.presentation.content) {
        if (this.presentation.content.length > 20) {
          content = this.presentation.content.slice(0, 20)
        } else {
          content = this.presentation.content
        }
      }
      return content
    }
  }
}
</script>
