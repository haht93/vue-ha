import moment from 'moment-timezone'

export const countdown = {
  data () {
    return {
      actualTime: moment().tz('Asia/Tokyo').format('X'),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  watch: {
    actualTime (val, oldVal) {
      this.compute()
    }
  },
  created () {
    this.compute()
    this.addOneSecondToActualTimeEverySecond()
  },
  methods: {
    addOneSecondToActualTimeEverySecond () {
      let component = this
      component.actualTime = moment().tz('Asia/Tokyo').format('X')
      setTimeout(function () {
        component.addOneSecondToActualTimeEverySecond()
      }, 1000)
    },
    getDiffInSeconds () {
      let ticket = this.$store.getters['ticket/getTicket']
      return moment(ticket.booking_date).tz('Asia/Tokyo').add(parseInt(ticket.number_of_days) - 1, 'days').endOf('day').format('X') - this.actualTime
    },
    compute () {
      let duration = moment.duration(this.getDiffInSeconds(), 'seconds')
      let hours = (duration.days() * 24) + duration.hours()
      this.hours = hours >= 0 ? (hours < 10 ? `0${hours}` : hours) : 0
      this.minutes = duration.minutes() >= 0 ? (duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes()) : 0
      this.seconds = duration.seconds() >= 0 ? (duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()) : 0
    }
  }
}
