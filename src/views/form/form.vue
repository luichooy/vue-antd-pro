<template>
  <div>
    <a-card title="用户管理" :bordered="false">
      <div class="table-search-wrapper">
        <a-form>
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="登录名" v-bind="formItemLayout">
                <a-input v-model="form.username" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="联系人" v-bind="formItemLayout">
                <a-input v-model="form.contacts" />
              </a-form-item>
            </a-col>
            <template v-if="!formFold">
              <a-col :md="8" :sm="24">
                <a-form-item label="角色" v-bind="formItemLayout">
                  <a-select v-model="form.customsId" :options="roleOptions" allowClear placeholder="请选择"></a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="状态" v-bind="formItemLayout">
                  <a-select
                    v-model="form.declareStatus"
                    allowClear
                    placeholder="请选择"
                  >
                    <a-select-option :value="1">启用</a-select-option>
                    <a-select-option :value="0">禁用</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="业务类型" v-bind="formItemLayout">
                  <a-select v-model="form.impType" placeholder="请选择" default-value="0">
                    <a-select-option value="1210">保税进口</a-select-option>
                    <a-select-option value="9610">直邮进口</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新时间" v-bind="formItemLayout">
                  <a-range-picker
                    v-model="rangeDate"
                    :ranges="{ '今天': [moment(), moment()] }"
                    :disabledDate="currentDate => currentDate > moment()"
                    :allowClear="false"
                    style="width: 100%;"
                  ></a-range-picker>
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
                  <a-icon :type="formFold ? 'down' : 'up'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      
      <div class="operate-wrapper">
        <a-button :disabled="isDisabled" @click="onRePush" class="btn-item" type="primary">手动重推</a-button>
      </div>
      
      <a-table
        :columns="columns"
        :dataSource="rows"
        :rowSelection="rowSelection"
        rowKey="logisticsNo"
        :pagination="pagination"
        :loading="tableLoading"
        @change="handleTableChange"
        :scroll="{ x: true }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ serial + index + 1 }}</span>
        <a
          slot="logisticsNo"
          slot-scope="logisticsNo"
          @click="showModal('logistics', logisticsNo)"
          href="javascript:;"
        >{{ logisticsNo }}</a>
        <span slot="impType" slot-scope="type">{{ type | businessTypeFilter }}</span>
        <a
          slot="declareStatus"
          slot-scope="status, record"
          @click="showModal('status', record.logisticsNo)"
          href="javascript:;"
        >{{ status }}</a>
      </a-table>
    </a-card>
    
    <!--运单详情-->
    <!--<logistics-modal-->
    <!--:visible="logisticsModalVisible"-->
    <!--:id="currentKey"-->
    <!--@close="logisticsModalVisible = false"-->
    <!--/>-->
    
    <!--申请状态详情-->
    <!--<receipt-modal-->
    <!--:visible="receiptModalVisible"-->
    <!--:id="currentKey"-->
    <!--@close="receiptModalVisible = false"-->
    <!--/>-->
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
// import LogisticsModal from './components/LogisticsModal'
// import ReceiptModal from './components/ReceiptModal'
// import { getApplies, getPorts, getDeclare, rePush } from '@/api/waybill'
// import { businessTypeFilter } from './utils'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '登录名',
    dataIndex: 'username',
    scopedSlots: { customRender: 'logisticsNo' },
    align: 'center'
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    align: 'center'
  },
  {
    title: '联系人电话',
    dataIndex: 'contactsMobile',
    align: 'center'
  },
  {
    title: '联系人邮箱',
    dataIndex: 'contactsEmail',
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'declareStatus',
    scopedSlots: { customRender: 'declareStatus' },
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center'
  }
]

export default {
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],
  // components: { LogisticsModal, ReceiptModal },
  // filters: { businessTypeFilter },
  data () {
    return {
      // 查询条件
      form: {},
      // 当前选中行
      selectedRowKeys: [],
      // 申报状态备选项
      declareStrategy: [],
      // 角色下拉框 备选项
      roleOptions: [],
      // 当前操作行的key
      currentKey: '',
      // 运单详情
      logisticsModalVisible: false,
      // 申请状态详情
      receiptModalVisible: false
    }
  },
  computed: {
    rowSelection () {
      const self = this
      return {
        selectedRowKeys: self.selectedRowKeys,
        onChange: (keys, rows) => {
          self.selectedRowKeys = keys
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.pushStatus === 1 || record.uploadStatus === 0
          }
        })
      }
    },
    isDisabled () {
      return this.selectedRowKeys.length === 0
    }
  },
  methods: {
    async search () {
      this.tableLoading = true
      const { current, pageSize } = this.pagination
      const res = await getApplies({
        ...this.form,
        current,
        pageSize
      })
      if (res.status === 200) {
        this.rows = res.data.result
        this.pagination.total = res.data.totalCount
      } else {
        this.$message.error(res.message)
      }
      this.tableLoading = false
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    async onRePush () {
      const res = await rePush({ list: this.selectedRowKeys })
      if (res.status === 200) {
        this.search()
        this.selectedRowKeys = []
        this.$message.success('重推成功')
      } else {
        this.$message.error(res.message)
      }
    },
    async getDeclareOptions () {
      const res = await getDeclare()
      if (res.status === 200) {
        this.declareStrategy = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    async getPortOptions () {
      const res = await getPorts()
      if (res.status === 200) {
        this.portOptions = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    showModal (flag, id) {
      this.currentKey = id
      
      if (flag === 'logistics') {
        this.logisticsModalVisible = true
      } else {
        this.receiptModalVisible = true
      }
    }
  },
  created () {
    this.columns = columns
    this.roleOptions = [
      {
        label: '超级管理员',
        value: 'superAdmin'
      },
      {
        label: '管理员',
        value: 'admin'
      },
      {
        label: '助手A',
        value: 'assistantA'
      },
      {
        label: '助手B',
        value: 'assistantB'
      },
      {
        label: '操作员',
        value: 'operator'
      }
    ]
    
    // this.getDeclareOptions()
    // this.getPortOptions()
    // this.search()
  }
}
</script>
