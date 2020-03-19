<template>
  <main-layout :hasBackBtn="true" :title="this.getTitle" :hasMenuToggle="true" >
    <div class="main-contents" v-show="this.$store.state.stepPayement === 1">
      <div class="ticket-manage__select">
        <div class="form-select">
          <span class="select-text">乗車エリア</span>
          <label>
            <select class="" name="local" v-model="ticket.local">
              <option value="1">富山市内</option>
              <option value="0" v-if="setTypeUser">富山県内共通</option>
            </select>
          </label>
        </div>
        <div class="form-select">
          <span class="select-text">有効期限</span>
          <label :class="[{ 'is-error' : validateInputDate }]">
            <select class="num-day" name="num_day" v-model="ticket.num_day">
              <option value="1">1日</option>
              <option value="2" :class="[{ 'hide_li' : this.disableOutCity}]">2日</option>
              <option value="3" :class="[{ 'hide_li' : this.disableOutCity}]">3日</option>
            </select>
          </label>
        </div>
        <div class="form-select">
          <span class="select-text">乗車日</span>
          <label :class="[{ 'is-error' : validateInputDate }]">
            <select class="time" name="time" v-model="ticket.time">
              <option value="4">11月29日</option>
              <option value="3">11月30日</option>
              <option value="2">12月01日</option>
              <option value="1" :class="[{ 'hide_li' : this.disableOutCity}]">12月02日</option>
            </select>
          </label>
        </div>
        <div class="form-select">
          <span class="select-text">種別</span>
          <label>
            <select class="" name="type" v-model="ticket.type">
              <option value="0">大人</option>
              <option value="1">子供</option>
            </select>
          </label>
        </div>
      </div>
      <div class="ticket-manage__price">
        <p class="ticket-manage__price-title">料金</p>
        <p class="ticket-manage__price-price">{{ amountTicket }}<span>円</span></p>
      </div>
      <p class="item-error-tip mb-30" v-if="errorsResponse.length">{{ errorsResponse }}</p>
      <button @click="bookingTicket" class="btn-gray" :disabled="this.disabledBooking" :class="[{'is-disabled': this.disabledBooking}]">決済情報の入力に進む</button>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import Dropdown from '@/components/ticket/Dropdown'
import { mapActions, mapGetters } from 'vuex'
import {payment} from '@/mixins/payment'
import {priceTickets} from '@/constants/price'

export default {
  mixins: [payment],
  components: {
    MainLayout,
    Dropdown
  },
  data () {
    return {
      ticketSession: {},
      urlPayment: process.env.URL_PAYMENT,
      ticket: {
        local: 1,
        num_day: '1',
        time: 4,
        type: 0,
        price: ''
      },
      errorsResponse: [],
      timeError: false,
      disabledBooking: false
    }
  },
  watch: {
    'ticket.local': function () {
      if (this.disableOutCity) {
        this.ticket.num_day = '1'
        this.ticket.time = 4
      }
    }
  },
  computed: {
    ...mapGetters({
      getListTicket: 'ticket/getListTicket',
      getTitle: 'getTitle'
    }),
    amountTicket () {
      let local = this.ticket.local
      // eslint-disable-next-line no-undef
      return _.nth(_.find(priceTickets, ['type', parseInt(local)]).price, parseInt(this.ticket.num_day) - 1)
    },
    validateInputDate () {
      return this.ticket.num_day > this.ticket.time
    },
    isDisable () {
      return this.card.number !== '' && this.card.exp !== '' && this.card.cvc !== ''
    },
    disableOutCity () {
      return parseInt(this.ticket.local) === 0
    },
    randomNumber () {
      return Math.floor(1000000000000 + Math.random() * 9999999999999)
    },
    bookingDate () {
      let dateBooking = ['2019-12-02', '2019-12-01', '2019-11-30', '2019-11-29']
      let time = parseInt(this.ticket.time)
      if (time >= 1 && time <= 4) {
        // eslint-disable-next-line no-undef
        return _.nth(dateBooking, time - 1)
      }
    },
    filterTicket () {
      let local = this.ticket.local
      let type = this.ticket.type
      // eslint-disable-next-line no-undef
      return _.filter(this.getListTicket, function (ticket) {
        return ticket.value === parseInt(local) && ticket.type_of_person === parseInt(type)
      })
    },
    setTypeUser () {
      for (let i = 0; i < this.getListTicket.length; i++) {
        if (this.getListTicket[i].value === 0) {
          return true
        }
      }
      return false
    }
  },

  mounted () {
    this.getListTicketAction({
      params: {
        keyword: ''
      },
      reset: true
    })
    localStorage.removeItem('ticket_detail')
  },
  methods: {
    ...mapActions({
      getListTicketAction: 'ticket/getListTicketAction',
      bookingTicketAction: 'ticket/bookingTicketAction',
      storeTicketAction: 'payment/storeTicketAction',
      storeUserTicketAction: 'payment/storeUserTicketAction'
    }),
    async bookingTicket () {
      this.disabledBooking = true
      try {
        let params = {
          ticket_id: this.filterTicket[0].id,
          booking_date: this.bookingDate,
          type_of_ticket: this.filterTicket[0].value,
          number_of_days: this.ticket.num_day,
          OrderID: `bt${this.randomNumber}`,
          DateTime: this.getYYYYMMDDHHMMSS(),
          Amount: this.amountTicket
        }
        if (this.validateInputDate) {
          this.disabledBooking = false
          this.errorsResponse = `有効期限が期限オーバーです。`
        } else {
          this.errorsResponse = []
          const response = await this.bookingTicketAction(params)
          if (response.success) {
            this.disabledBooking = false
            await this.storeTicketAction(params)
            await this.storeUserTicketAction(params)
            this.$router.push({name: 'payment'})
          }
        }
      } catch (e) {
        this.disabledBooking = false
        if (e.response.status === 400) {
          this.errorsResponse = e.response.data.message
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
      .form-select .is-error {
        border: 1px solid #ed4014;
      }
  .error-text {
    color: #ed4014;
  }
</style>
