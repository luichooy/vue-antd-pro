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
        <a-button @click="onCreate" class="btn-item" type="primary">新增</a-button>
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
        
        <span slot="role" slot-scope="roleId">{{ roleId | roleFilter(roleOptions) }}</span>
        
        <span slot="status" slot-scope="status">{{ status === 1 ? '启用' : '禁用' }}</span>
        
        <span slot="updateTime" slot-scope="updateTime">
          {{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm:ss') }}
        </span>
        
        <div slot="actions" slot-scope="record">
          <a @click="onEdit(record)" href="javascript:0;">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)" href="javascript:0;">删除</a>
        </div>
      
      </a-table>
    </a-card>
    
    <!--新增/修改用户-->
    <account-modal :visible="visible" :account="currentAccount" @close="onModalClose" />
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import AccountModal from './components/AccountModal'
import { getUsers, deleteAccount, getRoles } from '@/api/form'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' },
    width: 50,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '用户编号',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '登录名',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    align: 'center'
  },
  {
    title: '联系人邮箱',
    dataIndex: 'contactsEmail',
    align: 'center'
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 200,
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    scopedSlots: { customRender: 'role' },
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
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'actions' },
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]

export default {
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],
  components: { AccountModal },
  filters: {
    roleFilter (roleId, roleOptions) {
      let role = null
      roleOptions.forEach(item => {
        if (item.value === roleId) {
          role = item
        }
      })
      return role.label
    }
  },
  data () {
    return {
      // 查询条件
      form: {},
      // 当前选中行
      selectedRowKeys: [],
      
      // 角色下拉框 备选项
      roleOptions: [],
      
      visible: false,
      currentAccount: null
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
            disabled: record.status === 1
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
      const res = await getUsers({
        ...this.form,
        current,
        pageSize
      })
      this.rows = res
      this.pagination.total = res.length
      this.tableLoading = false
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    onCreate () {
      this.visible = true
    },
    onEdit (row) {
      this.currentAccount = row
      this.visible = true
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除选该用户吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteAccount(id)
          self.$message.success('删除成功')
          self.search()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    async queryRoles () {
      const res = await getRoles()
      this.roleOptions = res
    },
    onModalClose (isRefresh) {
      // 如果子组件要求父组件刷新
      if (isRefresh) {
        this.search()
      }
      // 关闭 modal时清空currentAccount，防止 新增/修改 混乱
      this.currentAccount = null
      this.visible = false
    }
  },
  created () {
    this.columns = columns
    this.queryRoles()
    this.search()
  }
}
</script>
