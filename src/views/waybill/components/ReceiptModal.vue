<template>
  <!--申报状态详情-->
  <a-modal
    :visible="visible"
    @cancel="() => $emit('close')"
    :footer="null"
    destroyOnClose
    centered
    width="60%"
    title="查看申报状态记录"
  >
    <a-table
      :columns="columns"
      :dataSource="rows"
      rowKey="createTime"
      :pagination="false"
      :loading="loading"
    ></a-table>
  </a-modal>
</template>

<script>
  import { getReceipts } from '@/api/waybill';

  const columns = [
    {
      title: '申报状态',
      dataIndex: 'returnStatus',
      align: 'center'
    },
    {
      title: '接收信息',
      dataIndex: 'returnInfo',
      align: 'center'
    },
    {
      title: '接收时间',
      dataIndex: 'returnTime',
      align: 'center'
    }
  ];

  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: true,
        columns,
        rows: null
      };
    },
    watch: {
      visible(value) {
        if (value && this.id) {
          this.getData();
        }
      }
    },
    methods: {
      async getData() {
        const res = await getReceipts(this.id);
        if (res.status === 200) {
          this.rows = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
