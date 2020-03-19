<template>
  <main-layout :hasBackBtn="true" :title="title">
    <div class="payment">
      <div class="white-area">
        <ul class="card-list">
          <li class="card-master"><img src="@/assets/img/card/card-master.svg" alt=""></li>
          <li class="card-visa"><img src="@/assets/img/card/card-visa.svg" alt=""></li>
        </ul>
      </div>
      <form class="main-contents">
        <div class="payment-form">
          <div class="form-input">
            <span class="form-input__title">カード情報</span>
            <label class="input-right">
              <span class="form-input__frontText">カード番号</span>
              <input type="text" inputmode="numeric" v-model="card.number" v-mask="'#### #### #### ####'" name="" value="" placeholder="0000 0000 0000 0000">
            </label>
            <p class="item-error-tip" v-if="cardNumberError">{{ cardNumberError }}</p>
          </div>
          <div class="form-input">
            <label class="input-right">
              <span class="form-input__frontText">有効期限</span>
              <input type="text" inputmode="numeric" v-model="card.exp" v-mask="'##/##'" name="" value="" placeholder="MM/YY(05/22)">
            </label>
            <p class="item-error-tip" v-if="expError">{{ expError }}</p>
          </div>
        </div>
        <div class="payment-form">
          <div class="form-input">
            <span class="form-input__title">セキュリティーコード</span>
            <label class="input-right">
              <img class="card-code" src="@/assets/img/common/icon-credit.svg" alt="">
              <input type="text" inputmode="numeric" v-mask="'####'" name="" v-model="card.cvc" value="" placeholder="3桁または4桁の数字">
            </label>
            <p class="item-error-tip" v-if="cvcError">{{ cvcError }}</p>
          </div>
        </div>
        <button class="btn-gray" :class="[{'is-disabled': !isDisable}]" :disabled="!isDisable" @click.prevent="submitCredit">購入内容を確認する</button>
      </form>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/common/Main'
import {mask} from 'vue-the-mask'
import { mapActions } from 'vuex'

export default {
  directives: {mask},
  components: {
    MainLayout
  },
  data () {
    return {
      card: {
        cvc: '',
        number: '',
        exp: ''
      },
      cardNumberError: '',
      expError: '',
      cvcError: '',
      title: '決済情報の入力'
    }
  },
  watch: {
    'card.number': function (oldValue, newValue) {
      // eslint-disable-next-line no-undef
      if (_.trim(oldValue) !== _.trim(newValue)) {
        this.cardNumberError = ''
      }
    },
    'card.cvc': function (oldValue, newValue) {
      // eslint-disable-next-line no-undef
      if (_.trim(oldValue) !== _.trim(newValue)) {
        this.cvcError = ''
      }
    },
    'card.exp': function (oldValue, newValue) {
      // eslint-disable-next-line no-undef
      if (_.trim(oldValue) !== _.trim(newValue)) {
        this.expError = ''
      }
    }
  },
  computed: {
    isDisable () {
      return this.card.number !== '' && this.card.exp !== '' && this.card.cvc !== ''
    },
    splitExp () {
      // eslint-disable-next-line no-undef
      let exp = _.split(this.card.exp, '/')
      return {
        month: exp[0],
        year: exp[1]
      }
    }
  },
  methods: {
    ...mapActions({
      storeCardAction: 'payment/storeCardAction'
    }),
    submitCredit () {
      window.Stripe.setPublishableKey('pk_test_knLVs34lKM7pwoIGwbbYBzHD00TdGmRfEs')
      let cardNumber = window.Stripe.card.validateCardNumber(this.card.number)
      let exp = window.Stripe.card.validateExpiry(this.card.exp)
      let cvc = window.Stripe.card.validateCVC(this.card.cvc)
      if (!cardNumber) {
        this.cardNumberError = 'カード番号が無効です。'
      }
      if (!exp) {
        this.expError = 'カードの有効期限が過ぎています。'
      }
      if (!cvc) {
        this.cvcError = 'カードのセキュリティコードに不備があります。'
      }
      if (cardNumber && exp && cvc) {
        let card = {
          number: this.card.number,
          exp_month: this.splitExp.month,
          exp_year: this.splitExp.year,
          cvc: this.card.cvc
        }
        this.storeCardAction(card)
        this.$router.push({name: 'payment-confirm'})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  #card-number, #card-cvc, #card-expiry {
    padding-top: 15px;
    float: left;
    width: 50%;
  }
  .uk-form-controls {
    position: relative;
    display: block;
    width: 100%;
    height: 43px;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #5A7F91;
    line-height: 43px;
    font-size: 13px;
    background-color: #fff;
    .ElementsApp input {
      height: 3.2em !important;
    }
  }
</style>
