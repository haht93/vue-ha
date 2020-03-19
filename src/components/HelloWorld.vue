<template>
  <div>
    <p>{{ msg }}</p>
    <div id="app1">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
