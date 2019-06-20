export default {
  data () {
    return {
      // 表头数据
      columns: null,
      // 行数据
      rows: null,
      // table loading
      tableLoading: false,
      // table 分页
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal (total, range) {
          return `共${total}条`
        }
      }
    }
  },
  computed: {
    serial () {
      const {
        pagination: { current, pageSize }
      } = this
      return (current - 1) * pageSize
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.search()
    }
  }
}
