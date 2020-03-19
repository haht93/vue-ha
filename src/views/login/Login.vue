<template>
  <main-layout :title="title">
    <div class="main-contents">
      <div class="login-form">
        <ValidationObserver ref="form" v-slot="{ validate }">
          <div class="login-form__menber-no">
            <ValidationProvider rules="required" name="login_id" v-slot="{ errors }">
              <div class="form-input">
                <span class="form-input__title">メールアドレス</span>
                <label>
                  <input v-model="login_id" :class="{ 'item-error': errors[0] }" type="text" name="login_id" placeholder="例：maas.toyama@gmail.com">
                </label>
              </div>
            </ValidationProvider>
            <div class="form-input">
              <ValidationProvider rules="required|min:8" name="password" v-slot="{ errors }">
                <span class="form-input__title">パスワード</span>
                <label>
                  <input @keyup.enter="login" v-model="password" type="password" name="password" value="" placeholder="パスワード">
                </label>
              </ValidationProvider>
            </div>
            <p class="item-error-tip" v-if="errorsResponse.length">{{ errorsResponse }}</p>
            <p class="item-error-tip" v-if="errorsResponse.password">{{ errorsResponse.password[0] }}</p>
            <button class="btn-gray login-btn" :class="[{'is-disabled' : !disabledLogin}]" @click="login" :disabled="!disabledLogin">ログインする</button>
          </div>
        </ValidationObserver>
        <hr>
        <p class="p-text">※本サービスを利用するには新規会員登録が必要になります。 会員登録がお済みでない方は、こちらから会員登録をお願いいたします。</p>
        <router-link :to="{name: 'register'}" class="btn-white register-btn">新規会員登録</router-link>
      </div>
    </div>
  </main-layout>
</template>
<script>
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import MainLayout from '@/layouts/common/Main'
import CODE from '@/constants/code'

import { mapActions } from 'vuex'

export default {
  components: {
    MainLayout,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      title: 'ログイン',
      loading: false,
      isChecked: true,
      login_id: '',
      password: '',
      errorsResponse: []
    }
  },
  computed: {
    disabledLogin () {
      return this.login_id !== '' && this.password !== '' && [...this.password].length >= 8
    }
  },
  watch: {
    login_id (newValue, oldValue) {
      if (newValue.trim() !== oldValue.trim()) {
        this.errorsResponse = false
      }
    },
    password (newValue, oldValue) {
      if (newValue.trim() !== oldValue.trim()) {
        this.errorsResponse = false
      }
    }
  },
  methods: {
    ...mapActions({
      loginAction: 'auth/loginAction'
    }),
    async login () {
      try {
        let params = {
          login_id: this.login_id,
          password: this.password
        }
        const result = await this.$refs.form.validate()
        if (result) {
          const response = await this.loginAction(params)
          if (response.status === CODE.OK) {
            this.errorsResponse = []
            this.$router.push('home')
          }
        }
      } catch (error) {
        if (error.status === CODE.UNPROCESSABLE_ENTITY) {
          this.errorsResponse = error.data.errors
        }
        if (error.status === CODE.BAD_REQUEST) {
          this.errorsResponse = error.data.message
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .password_text {
    min-height: 36px;
  }

  .login-form {
    .login-btn {
      margin: 25px 0 50px;
    }
    .password-reset {
      display: block;
      margin: 0 0 20px;
      font-size: 12px;
      color: $p-black;
      text-align: center;
      text-decoration: underline;
    }
  }
</style>
