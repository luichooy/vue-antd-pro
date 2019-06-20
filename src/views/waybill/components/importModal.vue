<template>
  <!--导入-->
  <a-modal
    :visible="visible"
    :maskClosable="false"
    @cancel="closeModal(false)"
    destroyOnClose
    title="导入"
  >
    <div slot="footer">
      <a-button @click="closeModal(false)">取消</a-button>
      <a-button
        @click="handleUpload"
        :loading="loading"
        :disabled="fileList.length === 0 || !customsId"
        type="primary"
      >上传</a-button>
    </div>
    <p>
      <a-select
        @change="value => customsId = value"
        style="width: 200px;margin-bottom: 24px;"
        placeholder="请选择电子口岸"
      >
        <a-select-option value="CN002301">重庆电子口岸</a-select-option>
        <a-select-option value="CN057401">宁波国际物流</a-select-option>
      </a-select>
    </p>

    <a-upload
      :fileList="fileList"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
      accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <a-button>
        <a-icon type="upload"/>选择文件
      </a-button>
    </a-upload>
  </a-modal>
</template>

<script>
  import { uploadWaybill } from '@/api/waybill';

  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        publicPath: process.env.BASE_URL,
        fileList: [],
        loading: false,
        customsId: ''
      };
    },
    methods: {
      beforeUpload(file) {
        this.fileList = [file];
        return false;
      },
      handleRemove(file) {
        this.fileList = [];
      },
      async handleUpload() {
        const { fileList, customsId } = this;

        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('customsId', customsId);

        this.loading = true;
        const res = await uploadWaybill(formData);
        this.loading = false;
        if (res.status === 200) {
          this.$nextTick(() => {
            this.$message.success('上传成功');
          });
          this.closeModal(true);
        } else {
          this.$message.error(res.message);
        }
      },
      closeModal(isRefresh) {
        this.fileList = [];
        this.customsId = '';
        this.$emit('close', isRefresh);
      }
    }
  };
</script>

<style lang="scss" scoped>
.download {
  color: rgba(0, 0, 0, 0.65);
  &:hover {
    color: #40a9ff;
  }

  &:focus {
    text-decoration: none;
  }
}
</style>
