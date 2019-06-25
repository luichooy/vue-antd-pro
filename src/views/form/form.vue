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
        <a-button @click="onRePush" class="btn-item" type="primary">新增</a-button>
        <a-button :disabled="isDisabled" @click="onDelete" class="btn-item" type="danger">删除</a-button>
      </div>
      
      <a-table
        :columns="columns"
        :dataSource="rows"
        :rowSelection="rowSelection"
        rowKey="id"
        :pagination="pagination"
        :loading="tableLoading"
        @change="handleTableChange"
        :scroll="{ x: 1500 }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ serial + index + 1 }}</span>
        
        <span slot="contacts" slot-scope="record">{{  `${record.contactsFirstName} ${record.contactsLastName}` }}</span>
        
        <span slot="address" slot-scope="record">
          {{ record.address }}
        </span>
        
        <span slot="status" slot-scope="status">{{ status === 1 ? '启用' : '禁用' }}</span>
  
        <span slot="updateTime" slot-scope="updateTime">{{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
      
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
import { getUsers } from '@/api/form'
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
    title: '用户编号',
    dataIndex: 'id',
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
    scopedSlots: { customRender: 'contacts' },
    align: 'center'
  },
  {
    title: '联系人邮箱',
    dataIndex: 'contactsEmail',
    align: 'center'
  },
  {
    title: '地址',
    scopedSlots: { customRender: 'address' },
    width: 200,
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime' },
    width: 160,
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
      this.rows = await getUsers({
        ...this.form,
        current,
        pageSize
      })
      this.tableLoading = false
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    async onDelete () {
      const res = await rePush({ list: this.selectedRowKeys })
      if (res.status === 200) {
        this.search()
        this.selectedRowKeys = []
        this.$message.success('重推成功')
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
    this.search()
  }
}
</script>
