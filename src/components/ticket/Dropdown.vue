<template>
  <div class="col">
    <label class="label-text">乗車エリア</label>
    <div class="dropdown">
      <div class="dropdown__header" @click="toggleDropdown($event)">
        <span>市内</span>
        <div class="icon-arrow">
          <i class="fas fa-angle-down header-icon" v-bind:class="{ 'rotate': isToggleDropdown }"></i>
        </div>
      </div>

      <div class="dropdown__content">
        <ul>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum dolor sit</li>
          <li>Lorem ipsum dolor</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isToggleDropdown: false
    }
  },
  methods: {
    toggleDropdown (event) {
      this.isToggleDropdown = !this.isToggleDropdown
      event.currentTarget.classList.toggle('is-active')
      console.log(this.isToggleDropdown)
    }
  }
}
</script>
