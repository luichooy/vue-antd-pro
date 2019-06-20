<script>
  import T from 'ant-design-vue/es/table/Table';
  
  export default {
    name: 'YtoTable',
    props: Object.assign({}, T.props, {
      asyncQuery: {
        type: Function,
        require: true
      },
      pagination: {
        type: Object,
        default: () => ({
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          hideOnSinglePage: true,
          showTotal(total, range) {
            return `共${total}条`;
          }
        })
      }
    }),
    data() {
      return {
        localLoading: false
      };
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
      
      }
    },
    render() {
      const props = { ...this.props };
      props.loading = this.localLoading;
      
      return (
        <a-table
          { ...{ props, scopedSlots: { ...this.$scopedSlots } } }
          onChange={ this.handleTableChange }
        >
          { this.$slots.default }
        </a-table>
      );
    }
  };
</script>
