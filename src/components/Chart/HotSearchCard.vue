<template>
  <a-card :loading="loading" :bordered="false" title="线上热门搜索" style="height: 100%;">
    <template v-slot:extra>
      <a-dropdown placement="bottomRight">
        <a-icon type="ellipsis" style="cursor: pointer;" />
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">操作一</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">操作二</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
    
    <a-row :gutter="68">
      <a-col :sm="12" style="margin-bottom: 24px;">
        <mini-search-area title="搜索用户数" value="12,321" :trend="{ type: 'up', value: '17.1' }" />
      </a-col>
      <a-col :sm="12" style="margin-bottom: 24px;">
        <mini-search-area title="人均搜索次数" value="2.7" :trend="{ type: 'down', value: '26.2' }" />
      </a-col>
    </a-row>
    
    <a-table
      :dataSource="rows"
      :columns="columns"
      :pagination="pagination"
      @change="handleTableChange"
      rowKey="order"
      size="small"
    >
      <span slot="keyword" slot-scope="keyword">
        <a href="javascript:0;">{{ keyword }}</a>
      </span>
      <span slot="trend" slot-scope="row">
        <Trend :value="row.trend + ''" suffix="%" :type="row.trendType" />
      </span>
    </a-table>
  </a-card>
</template>

<script>
import MiniSearchArea from './MiniSearchArea'
import Trend from '@/components/Trend'
import { tableMixin } from '@/mixins'

const columns = [
  {
    title: '排名',
    dataIndex: 'order'
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    scopedSlots: { customRender: 'keyword' }
  },
  {
    title: '用户数',
    dataIndex: 'userNumber'
  },
  {
    title: '周涨幅',
    scopedSlots: { customRender: 'trend' }
  }
]

export default {
  name: 'HotSearchCard',
  mixins: [tableMixin],
  components: { MiniSearchArea, Trend },
  props: {
    loading: Boolean
  },
  data () {
    return {}
  },
  methods: {
    search () {
      let rows = []
      let i = 1
      while (i <= 50) {
        rows.push({
          order: i,
          keyword: `搜索关键词-${i}`,
          userNumber: Math.ceil(Math.random() * 1000),
          trend: Math.ceil(Math.random() * 100),
          trendType: ['up', 'down'][Math.round(Math.random())]
        })
        i++
      }
      this.rows = rows
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.current = pagination.current
    }
  },
  created () {
    this.columns = columns
    this.pagination = Object.assign({}, this.pagination, {
      pageSize: 5,
      showSizeChanger: false,
      showTotal: null,
      style: { marginBottom: 0 }
    })
    this.search()
  }
}
</script>
