import Vue from 'vue'

Vue.filter('date', function (value, fullDate = false) {
  let dateFormat = new Date(value.replace(/-/g, '/'))
  const date = dateFormat.getDate()
  const month = dateFormat.getMonth()
  const year = dateFormat.getFullYear()
  if (!fullDate) return `${month + 1}月${date}日`
  else return `${year}年${month + 1}月${date}日`
})

Vue.filter('time', function (value) {
  if (value) {
    const date = new Date(value.replace(/-/g, '/'))
    let hours = date.getHours()
    const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return hours + ':' + min
  }
})
