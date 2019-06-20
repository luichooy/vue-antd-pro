export default {
  data () {
    return {
      // 控制查询条件折叠
      formFold: true
    }
  },
  methods: {
    toggleFold () {
      this.formFold = !this.formFold
    }
  }
}
