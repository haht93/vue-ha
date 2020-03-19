<template>
  <main-layout :hasBackBtn="true" :title="title" :hasMenuToggle="true" >
    <div class="main-contents__wrapper">
      <div class="main-contents">
        <h2 class="h2-title">{{ this.getTicketDetail.route_name }}</h2>
        <div class="input-price mb-30">
          <p class="input-price_text">金額を入力してください</p>
          <div class="input-price_item">
            <span class="input-price_item-front">1回券</span>
            <label>
              <input type="text" inputmode="numeric" @keyup.enter="confirmPrice" name="" value="" v-model="price">
            </label>
          </div>
        </div>
        <p class="item-error-tip mb-30" v-if="errorsResponse.length">{{ errorsResponse }}</p>
        <button class="btn-gray" :class="[{ 'is-disabled': !this.price }]" :diabled="!this.price" @click.prevent="confirmPrice">金額を確定する</button>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import {mapActions} from 'vuex'

export default {
  components: {
    MainLayout
  },
  data () {
    return {
      title: 'オプションチケット金額入力',
      price: null,
      min: 0,
      max: 0,
      item: {},
      errorsResponse: []
    }
  },
  mounted () {
    this.ticketOption({option_id: this.$route.params.idRoute}).then(response => {
      this.item = response.data[0]
    })
  },
  computed: {
    rangeUserInput () {
      // eslint-disable-next-line no-undef
      let splitPrice = _.split(this.item.user_input_price, '-')
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.min = parseInt(splitPrice[0])
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.max = parseInt(splitPrice[1])
      return parseInt(this.price) >= parseInt(splitPrice[0]) && parseInt(this.price) <= parseInt(splitPrice[1])
    },
    checkNumberEven () {
      if (this.item.range !== 0) {
        return this.price % this.item.range === 0
      }
      return this.price % 1 === 0
    },
    validate () {
      return this.rangeUserInput && this.checkNumberEven
    },
    getTicketDetail () {
      if (localStorage.getItem('ticket_detail')) {
        return JSON.parse(localStorage.getItem('ticket_detail'))
      }
    }
  },
  watch: {
    'price' (newValue, oldValue) {
      // eslint-disable-next-line no-undef
      if (_.trim(newValue) !== _.trim(oldValue)) {
        this.errorsResponse = []
      }
    }
  },
  methods: {
    ...mapActions({
      ticketOption: 'ticket/ticketOption'
    }),
    confirmPrice () {
      if (!this.validate) {
        if (!this.rangeUserInput) {
          this.errorsResponse = `${this.min}円～${this.max}円の間の金額を入力してください。`
        }
        if (!this.checkNumberEven) {
          this.errorsResponse = `${this.item.range}円刻みで入力してください。`
        }
      } else {
        this.errorsResponse = []
        if (localStorage.getItem('ticket_detail')) {
          let existing = localStorage.getItem('ticket_detail')

          existing = existing ? JSON.parse(existing) : {}
          existing['price'] = this.price
          localStorage.setItem('ticket_detail', JSON.stringify(existing))
        }
        this.$router.push({name: 'ticket-option-detail', params: { idRoute: this.item.id, idTicket: this.getTicketDetail.id_ticket }})
      }
    }
  }
}
</script>
