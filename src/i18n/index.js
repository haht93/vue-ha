import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ja from 'vee-validate/dist/locale/ja'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja',
  messages: {
    ja: {
      fields: {
        login_id: 'Email',
        password: 'Password'
      },
      validation: ja.messages
    }
  }
})

export { i18n }
