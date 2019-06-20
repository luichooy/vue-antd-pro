<template>
  <div>
    <a-card :bordered="false" title="运单上传管理">
      <div class="table-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="运单编号">
                <a-input v-model="form.logisticsNo"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="订单编号">
                <a-input v-model="form.orderNo"/>
              </a-form-item>
            </a-col>
            <template v-if="!formFold">
              <a-col :md="8" :sm="24">
                <a-form-item label="上传状态">
                  <a-select placeholder="请选择" v-model="form.uploadStatus" allowClear>
                    <a-select-option value="1">成功</a-select-option>
                    <a-select-option value="0">失败</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="推送状态">
                  <a-select placeholder="请选择" v-model="form.pushStatus" allowClear>
                    <a-select-option value="0">未推送</a-select-option>
                    <a-select-option value="1">已推送</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
                  <a-range-picker
                    :allowClear="false"
                    :disabledDate="currentDate => currentDate > moment()"
                    :ranges="{ '今天': [moment(), moment()] }"
                    style="width: 100%;"
                    v-model="rangeDate"
                  ></a-range-picker>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="formFold && 8 || 24" :sm="24">
              <span
                :style="!formFold && { float: 'right', overflow: 'hidden' } || {} "
                class="search-buttons"
              >
                <a-button @click="handleSearch" icon="search" type="primary">查询</a-button>
                <a-button @click="handleResetForm" icon="sync" style="margin-left: 8px">重置</a-button>
                <a @click="toggleFold" style="margin-left: 8px">
                  {{ formFold ? '展开' : '收起' }}
                  <a-icon :type="formFold ? 'down' : 'up'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="operate-wrapper">
        <a-button
          :disabled="isDisabled"
          @click="handlePush"
          class="btn-item"
          icon="notification"
          type="primary"
        >推送海关</a-button>
        <a-button @click="importModalVisible = true" class="btn-item" icon="cloud-upload">导入</a-button>
        <a-button @click="downloadModalVisible = true" class="btn-item" icon="cloud-download">下载模板</a-button>
      </div>

      <a-table
        :columns="columns"
        :dataSource="rows"
        :loading="tableLoading"
        :pagination="pagination"
        :rowSelection="rowSelection"
        @change="handleTableChange"
        rowKey="id"
        :scroll="{ x: 1500 }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="uploadStatus" slot-scope="status">{{ status | uploadStatusFilter }}</span>
        <span slot="pushStatus" slot-scope="status">{{ status | pushStatusFilter }}</span>
        <span slot="actions" slot-scope="row, record">
          <a-button
            :disabled="record.uploadStatus === 1 && record.pushStatus === 1"
            @click="handleDelete(record.id)"
            type="danger"
          >删除</a-button>
        </span>
      </a-table>
    </a-card>

    <!--导入-->
    <import-modal :visible="importModalVisible" @close="handleUploadClose"/>

    <!-- 下载模板 -->
    <download-modal :visible="downloadModalVisible" @close="downloadModalVisible = false"/>
  </div>
</template>

<script>
  import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins';
  import importModal from './components/importModal';
  import downloadModal from './components/downloadModal';
  import {
    businessTypeFilter,
    uploadStatusFilter,
    pushStatusFilter
  } from './utils';
  import { getUploads, pushCustoms, deleteUpload } from '@/api/waybill';

  const columns = [
    {
      title: '#',
      scopedSlots: { customRender: 'serial' },
      align: 'center',
      width: 50,
      fixed: 'left'
    },
    {
      title: '运单编号',
      dataIndex: 'logisticsNo',
      width: 120,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '公服平台',
      dataIndex: 'channelName',
      align: 'center'
    },
    {
      title: '上传状态',
      dataIndex: 'uploadStatus',
      scopedSlots: { customRender: 'uploadStatus' },
      align: 'center'
    },
    {
      title: '推送状态',
      dataIndex: 'pushStatus',
      scopedSlots: { customRender: 'pushStatus' },
      align: 'center'
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'center',
      width: 300
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' },
      width: 100,
      align: 'center',
      fixed: 'right'
    }
  ];

  export default {
    mixins: [queryFormMixin, tableMixin, rangePickerMixin],
    components: { importModal, downloadModal },
    filters: { businessTypeFilter, uploadStatusFilter, pushStatusFilter },
    data() {
      return {
        // 查询条件
        form: {},
        // 控制导入modal的显示
        importModalVisible: false,
        // 控制下载模板modal的显示
        downloadModalVisible: false,
        // 当前选中行
        selectedRowKeys: []
      };
    },
    computed: {
      rowSelection() {
        const self = this;
        return {
          selectedRowKeys: self.selectedRowKeys,
          onChange: (keys, rows) => {
            self.selectedRowKeys = keys;
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.pushStatus === 1 || record.uploadStatus === 0
            }
          })
        };
      },
      isDisabled() {
        return this.selectedRowKeys.length === 0;
      }
    },
    methods: {
      async search() {
        this.tableLoading = true;
        const { current, pageSize } = this.pagination;
        let res = await getUploads({
          ...this.form,
          current,
          pageSize
        });
        if (res.status === 200) {
          this.rows = res.data.result;
          this.pagination.total = res.data.totalCount;
        } else {
          this.$message.error(res.message);
        }

        this.tableLoading = false;
      },
      handleSearch() {
        this.pagination.current = 1;
        this.search();
      },
      handleDelete(id) {
        const self = this;
        this.$confirm({
          title: '删除',
          content: `确定要删除当前数据吗？`,
          okText: '删除',
          okType: 'danger',
          async onOk() {
            const res = await deleteUpload([id]);
            if (res.status === 200) {
              self.$message.success('删除成功');
              self.search();
            } else {
              self.$message.error(res.message);
            }
          },
          onCancel() {
            self.$message.warning('取消删除');
          }
        });
      },
      async handlePush() {
        const res = await pushCustoms(this.selectedRowKeys);
        if (res.status === 200) {
          this.$message.success('推送成功');
          this.search();
          this.selectedRowKeys = [];
        } else {
          this.$message.error(res.message);
        }
      },
      handleUploadClose(isRefresh) {
        this.importModalVisible = false;
        if (isRefresh) this.search();
      }
    },
    created() {
      this.columns = columns;
      this.search();
    }
  };
</script>
