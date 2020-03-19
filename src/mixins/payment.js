import moment from 'moment-timezone'
import md5 from 'md5'

export const payment = {
  methods: {
    getYYYYMMDDHHMMSS () {
      return moment(new Date()).tz('Asia/Tokyo').format('YYYYMMDDHHmmss')
    },
    passwordMd5 (params) {
      const shopId = process.env.SHOP_ID
      const password = process.env.PASSWORD
      const orderId = params.OrderID
      const amount = params.Amount
      return md5(`${shopId}|${orderId}|${amount}||${password}|${params.DateTime}`)
    },
    payment (params) {
      this.ticketSession = {
        shopId: process.env.SHOP_ID,
        orderId: params.OrderID,
        amount: params.Amount,
        dateTime: params.DateTime,
        shopPassString: this.passwordMd5(params),
        retUrl: `${process.env.RET_URL}?redirect_url=${document.location.href}`,
        cancelUrl: document.location.href,
        enc: 'utf-8',
        useCredit: 1,
        jobCd: 'CAPTURE'
      }
      this.$nextTick(() => this.$refs.myForm.submit())
    }
  }
}
