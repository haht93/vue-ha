<template>
  <li class="ticket-option__list">
    <a href="javascript:void(0);" @click="clickToTicketDetail">{{ item.line_1 || item.route_name }}</a>
  </li>
</template>
<script>
export default {
  props: {
    item: Object
  },
  computed: {
    inputAmount () {
      // eslint-disable-next-line no-undef
      if (_.isNull(this.item.user_input_price)) {
        if (localStorage.getItem('ticket_detail')) {
          let existing = localStorage.getItem('ticket_detail')

          existing = existing ? JSON.parse(existing) : {}
          existing['price'] = this.item.price
          existing['route_name'] = this.item.route_name
          existing['voucher_name'] = this.item.voucher_name || ''
          existing['line_1'] = this.item.line_1 || ''
          existing['line_2'] = this.item.line_2 || ''
          localStorage.setItem('ticket_detail', JSON.stringify(existing))
          return false
        }
      } else {
        if (localStorage.getItem('ticket_detail')) {
          let existing = localStorage.getItem('ticket_detail')

          existing = existing ? JSON.parse(existing) : {}
          existing['route_name'] = this.item.route_name
          existing['voucher_name'] = this.item.voucher_name || ''
          existing['line_1'] = this.item.line_1 || ''
          existing['line_2'] = this.item.line_2 || ''
          localStorage.setItem('ticket_detail', JSON.stringify(existing))
        }
        return true
      }
    },
    getTicketDetail () {
      if (localStorage.getItem('ticket_detail')) {
        return JSON.parse(localStorage.getItem('ticket_detail'))
      }
    }
  },
  methods: {
    clickToTicketDetail () {
      this.$router.push({name: this.inputAmount ? 'ticket-amount' : 'ticket-option-detail', params: { idRoute: this.item.id, idTicket: this.getTicketDetail.id_ticket }})
    }
  }
}
</script>
<style lang="scss" scoped>
  .ticket-option__list {
    display: block;
    margin: 0 0 10px;
    a {
      position: relative;
      display: block;
      height: 45px;
      padding: 0 10px;
      background-color: #FFFFFF;
      border-radius: 3px;
      box-sizing: border-box;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
      line-height: 45px;
      font-size: 14px;
      font-weight: bold;
      color: #323232;
      span {
        display: inline-block;
        margin: 0 0 0 15px;
        font-weight: bold;
      }
      &:after {
        position: absolute;
        top: 16px;
        right: 8px;
        content: '';
        display: block;
        width: 7px;
        height: 12px;
        background: url('../../assets/icons/arrow-right_gray.svg') no-repeat;
        background-size: contain;
      }
    }
  }
</style>
