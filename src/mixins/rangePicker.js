import moment from 'moment'

export default {
  data () {
    return {
      rangeDate: [moment().subtract(6, 'days'), moment()]
    }
  },
  watch: {
    rangeDate: {
      handler: function (momentArr) {
        this.form.startTime = momentArr[0].format('YYYY-MM-DD 00:00:00')
        this.form.endTime = momentArr[1].format('YYYY-MM-DD 23:59:59')
      },
      immediate: true
    }
  },
  methods: {
    handleResetForm () {
      this.form = {}
      this.rangeDate = [moment().subtract(6, 'days'), moment()]
    },
    moment
  }
}
