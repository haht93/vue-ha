<template>
  <main-layout :hasBackBtn="true" :title="title">
  <div class="main-contents__wrapper">
    <div class="white-area">
      <ul class="purchase-confirm">
        <li>
          <p class="purchase-confirm__title">乗車券タイプ</p>
          <p class="purchase-confirm__text">乗車エリア{{ this.typeOfTicket }}</p>
        </li>
        <li>
          <p class="purchase-confirm__title">乗車日</p>
          <p class="purchase-confirm__text">{{dateFormat.currentDay ? `【本日】` : ``}}{{ dateFormat.month }}月{{ dateFormat.day }}日({{ dateFormat.dayOfWeek }})</p>
        </li>
        <li>
          <p class="purchase-confirm__title">種別</p>
          <p class="purchase-confirm__text">{{ this.typeOfPerson }}</p>
        </li>
        <li>
          <p class="purchase-confirm__title">金額</p>
          <p class="purchase-confirm__text">{{ this.getUserTicket.Amount }}円</p>
        </li>
        <li>
          <p class="purchase-confirm__title">支払い方法</p>
          <p class="purchase-confirm__text">クレジットカード<span class="purchase-confirm__card">
            下四桁{{ this.showFourNumberCard }}
          </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="main-contents" style="height: 0">
      <button class="btn-gray" @click="ticketPaymentCofirm">購入する</button>
    </div>
  </div>
  </main-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import ticket from '@/constants/ticket'
import moment from 'moment-timezone'
import MainLayout from '@/layouts/common/Main'

export default {
  components: {
    MainLayout
  },
  data () {
    return {
      title: '購入内容の確認'
    }
  },
  computed: {
    ...mapGetters({
      filterTicket: 'payment/filterTicket',
      showFourNumberCard: 'payment/showFourNumberCard',
      sumPrice: 'payment/sumPrice',
      getCardInfo: 'payment/getCardInfo',
      getUserTicket: 'payment/getUserTicket'
    }),
    hashNumberCredit () {
      // eslint-disable-next-line no-undef
      if (!_.isEmpty(this.getCardInfo.number)) {
        return (parseInt(this.getCardInfo.number.replace(/\s/g, '')) + parseInt(process.env.KEY_ENCRYPT))
      }
    },
    randomNumber () {
      return Math.floor(1000000000000 + Math.random() * 9999999999999)
    },
    typeOfTicket () {
      return this.getUserTicket.type_of_ticket === 1 ? ticket.VALUE_IN_CITY : ticket.VALUE_OUT_CITY
    },
    typeOfPerson () {
      return this.getUserTicket.type_of_person === 1 ? ticket.TYPE_CHILD : ticket.TYPE_ADULT
    },
    checkCurrentDay () {
      let current = moment().tz('Asia/Tokyo')
      let bookingDate = moment(this.getUserTicket.booking_date).tz('Asia/Tokyo')
      return current.format('DD') === bookingDate.format('DD') &&
          current.format('MM') === bookingDate.format('MM') &&
          current.format('YYYY') === bookingDate.format('YYYY')
    },
    dateFormat () {
      moment.locale('ja')
      let date = moment(this.getUserTicket.booking_date).tz('Asia/Tokyo')
      let dayOfWeek = ['日', '月', '火', '水', '木', '金', '土']
      return {
        day: date.format('DD'),
        month: date.format('MM'),
        dayOfWeek: dayOfWeek[date.day()],
        currentDay: this.checkCurrentDay
      }
    }
  },
  destroyed () {
    this.$store.commit('payment/REMOVE_DATA_PAYMENT')
  },
  methods: {
    paymentToken () {
      return window.btoa(`${this.getUserTicket.OrderID}|${this.hashNumberCredit}|${this.getCardInfo.exp_month}|${this.getCardInfo.exp_year}|${this.getCardInfo.cvc}|${this.getUserTicket.Amount}`)
    },
    async ticketPaymentCofirm () {
      try {
        const response = await this.$store.dispatch('ticket/ticketPaymentAction', {payment_token: this.paymentToken()})
        if (response.success) {
          this.$router.push({name: 'list-user-tickets'})
          this.$store.commit('payment/REMOVE_DATA_PAYMENT')
        }
      } catch (e) {
      }
    }
  }
}
</script>
