<template>
  <main-layout :title="title">
    <div class="main-contents">
      <div class="register-form">
        <div class="register-form__menber">
          <div class="form-input">
<!--            <span class="form-input__title">学会員番号</span>
            <label>
              <input type="text"  v-model="user.member_id" name="member_id" value="" placeholder="例：10101010" readonly onfocus="this.removeAttribute('readonly');">
            </label>
            <span class="form-input__caution">※学会員ではない方は未入力のまま、ご登録ください。</span>-->
          </div>
          <div class="form-input">
            <span class="form-input__title required">氏名</span>
            <label>
              <input type="text" v-model="user.name" name="name" value="" placeholder="例：田中太郎">
            </label>
          </div>
          <div class="form-input">
            <span class="form-input__title required">メールアドレス</span>
            <label>
              <input type="text" v-model="user.email" name="email" value="" placeholder="例：maas.toyama@gmail.com" readonly onfocus="this.removeAttribute('readonly');">
            </label>
            <p class="item-error-tip" v-if="errorsResponse.email">{{ errorsResponse.email[0] }}</p>
          </div>
          <div class="form-input">
            <span class="form-input__title required">パスワード</span>
            <label>
              <input type="password" v-model="user.password" name="password" value="" placeholder="半角英数字8文字以上で入力してください" readonly onfocus="this.removeAttribute('readonly');">
            </label>
            <p class="item-error-tip" v-if="errorsResponse.password">{{ errorsResponse.password[0] }}</p>
          </div>
<!--          <div class="terms-checkbox">
            <input type="checkbox" v-model="isChecked" :checked="isChecked ? 'checked': ''" name="policy" value="" id="terms-checkbox">
            <label for="terms-checkbox"></label>
            <router-link :to="{name: 'policy'}">利用規約</router-link>
          </div>-->
          <button @click="register" :class="[{'is-disabled' : !disableRegister}]" :disabled="!disableRegister" type="button" name="button" class="btn-gray register-btn">登録する</button>
        </div>
        <hr>
        <p class="p-text">※会員の方は下記よりログインしてください。</p>
        <router-link :to="{name: 'login'}" class="btn-white login-btn">ログイン</router-link>
      </div>
    </div>
    <transition name="fade">
      <div class="modal" id="register-modal" v-if="modalshow">
        <div class="modal-bg"></div>
        <div class="modal-contents">
          <p>登録が完了しました。</p>
        </div>
      </div>
    </transition>
  </main-layout>
</template>
<script>
import MainLayout from '@/layouts/common/Main'
import { mapActions } from 'vuex'
import CODE from '@/constants/code'

export default {
  components: {
    MainLayout
  },
  data () {
    return {
      title: '新規会員登録',
      errorsResponse: [],
      user: {
        name: '',
        email: '',
        password: ''
      },
      modalshow: false
    }
  },
  computed: {
    disableRegister () {
      return this.user.email !== '' && this.user.name !== '' && this.user.password !== ''
    }
  },
  mounted () {
    if (localStorage.name) {
      this.user.name = localStorage.name
    }
    if (localStorage.email) {
      this.user.email = localStorage.email
    }
    if (localStorage.password) {
      this.user.password = localStorage.password
    }
  },
  watch: {

    'user.name' (newName) {
      localStorage.name = newName
    },
    'user.email' (newValue, oldValue) {
      if (newValue.trim() !== oldValue.trim()) {
        this.errorsResponse.email = []
      }
      localStorage.email = newValue
    },
    'user.password' (newValue, oldValue) {
      if (newValue.trim() !== oldValue.trim()) {
        this.errorsResponse.password = []
      }
      localStorage.password = newValue
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'login') {
      let keysToRemove = ['name', 'email', 'password']
      for (let key of keysToRemove) {
        localStorage.removeItem(key)
      }
      next()
    } else {
      next()
    }
  },
  methods: {
    ...mapActions({
      registerAction: 'auth/registerAction'
    }),
    async register () {
      try {
        const response = await this.registerAction(this.user)
        if (response.status === CODE.OK) {
          this.errorsResponse = []
          let keysToRemove = ['name', 'email', 'login_id', 'password']
          for (let key of keysToRemove) {
            localStorage.removeItem(key)
          }
          this.modalshow = true
          setTimeout(() => this.$router.push('/home'), 2000)
        }
      } catch (error) {
        const { name, email, password } = error.response.data.errors
        this.errorsResponse = { name, email, password }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .register-form {
    &__choice {
      display: flex;
      margin: 0 0 25px;
      justify-content: center;
      .label-radio:not(:last-child) {
        margin-right: 10px;
      }
    }
    .terms-checkbox {
      text-align: center;
      input {
        display: none;
      }
      label {
        display: inline-block;
        width: 19px;
        height: 19px;
        margin: 0 2px 0 0;
        border-radius: 3px;
        box-sizing: border-box;
        background: url('../../assets/img/common/icon-checked.svg') no-repeat center center $white;
        background-size: 9px 7px;
        border: solid 1px $dark-gray;
        vertical-align: middle;
      }
      input:checked + label {
        background-color: $dark-gray;
      }
      a {
        font-size: 13px;
        color: $p-black;
        line-height: 19px;
      }
    }
    .register-btn {
      margin: 25px 0 35px;
    }
  }
</style>
