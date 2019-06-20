<template>
  <div>
    <a-card title="单量趋势分析" :bordered="false">
      <div class="table-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="企业客户名称">
                <a-input v-model="form.ebpName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="业务类型">
                <a-select :value="form.impType" @select="handleSelect">
                  <a-select-option value>全部</a-select-option>
                  <a-select-option value="1210I">进口1210</a-select-option>
                  <a-select-option value="9610I">进口9610</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="!formFold">
              <a-col :md="8" :sm="24">
                <a-form-item label="7天截至日期">
                  <a-date-picker
                    v-model="endDate"
                    :disabledDate="currentDate => currentDate > moment().add(-1, 'days')"
                    :allowClear="false"
                    style="width: 100%;"
                  ></a-date-picker>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="formFold && 8 || 24" :sm="24">
              <span
                class="search-buttons"
                :style="!formFold && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" icon="search" @click="handleSearch">查询</a-button>
                <a-button icon="sync" @click="handleResetForm" style="margin-left: 8px">重置</a-button>
                <a @click="toggleFold" style="margin-left: 8px">
                  {{ formFold ? '展开' : '收起' }}
                  <a-icon :type="formFold ? 'down' : 'up'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        :columns="columns"
        :dataSource="rows"
        rowKey="id"
        :pagination="pagination"
        :loading="tableLoading"
        @change="handleTableChange"
        :scroll="{ x: 1500 }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span
          slot="chain"
          slot-scope="chain"
          :class="['chain', chain < 0 ? 'is-decline' : '']"
        >{{ chain }}%</span>
        <span slot="action" slot-scope="text, record">
          <a @click="showChartModal(record)" href="javascript:0;">查看趋势图</a>
        </span>
      </a-table>
    </a-card>

    <line-chart-modal
      :visible="modalVisible"
      :xAxis="xAxis"
      :dataSource="chartDataSource"
      :type="this.form.impType | businessTypeFilter"
      @close="modalVisible = false"
    />
  </div>
</template>

<script>
  import moment from 'moment'
  import { queryFormMixin, tableMixin } from '@/mixins'
  import LineChartModal from './components/LineChartModal'

  const columns = [
    {
      title: '#',
      scopedSlots: { customRender: 'serial' },
      align: 'center'
    },
    {
      title: '企业客户名称',
      dataIndex: 'ebpName',
      align: 'center'
    },
    {
      title: '日期',
      children: [
        {
          title: '',
          dataIndex: 'one',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'two',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'three',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'four',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'five',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'six',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'seven',
          align: 'center'
        }
      ]
    },
    {
      title: '七日订单量',
      dataIndex: 'orderTotal',
      align: 'center'
    },
    {
      title: '七日环比',
      dataIndex: 'chain',
      scopedSlots: { customRender: 'chain' },
      align: 'center'
    },
    {
      title: '图表',
      scopedSlots: { customRender: 'action' },
      align: 'center',
      width: 120,
      fixed: 'right'
    }
  ]

  export default {
    mixins: [queryFormMixin, tableMixin],
    components: { LineChartModal },
    data() {
      return {
        // 查询条件
        form: {},
        // 保存日期选择的 moment 对象
        endDate: moment().add(-1, 'days'),

        // 趋势图 modal
        modalVisible: false,
        xAxis: [],
        chartDataSource: {}
      }
    },
    watch: {
      endDate: {
        handler: function(date) {
          this.form.date = date.format('YYYY-MM-DD')
        },
        immediate: true
      }
    },
    methods: {
      async search() {
        this.tableLoading = true
        const { current, pageSize } = this.pagination
        const res = await getEbusiness({
          ...this.form,
          current,
          pageSize
        })
        if (res.status === 200) {
          this.generateColumn(this.form.date)
          this.rows = res.data.result
          this.pagination.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
        this.tableLoading = false
      },
      handleSearch() {
        this.pagination.current = 1
        this.search()
      },
      handleSelect(value) {
        if (value !== this.form.impType) {
          this.form.impType = value
          this.handleSearch()
        }
      },
      showChartModal(row) {
        this.chartDataSource = row
        this.modalVisible = true
      },
      handleResetForm() {
        this.form = {}
        this.endDate = moment().add(-1, 'days')
      },
      generateColumn(dateStr) {
        const date = this.columns[2].children
        this.xAxis = []
        let day = ''
        for (let i = 6; i >= 0; i--) {
          let j = 6 - i

          day = moment(dateStr)
            .subtract(i, 'days')
            .format('YYYY/MM/DD')
          date[j].title = day
          this.xAxis.push(day)
        }
      },
      moment
    },
    created() {
      this.columns = columns
      this.search()
    }
  }
</script>

<style lang="scss" scoped>
.chain {
  color: #1e7e34;
  &.is-decline {
    color: red;
  }
}
</style>
