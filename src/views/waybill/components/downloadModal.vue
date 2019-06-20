<template>
  <!--下载模板-->
  <a-modal
    :visible="visible"
    @cancel="() => this.$emit('close')"
    :maskClosable="false"
    :footer="null"
    :bodyStyle="{ marginTop: '-1px', paddingTop: 0, background: '#fff' }"
    :width="528"
    title="下载模板"
  >
    <a-row>
      <a-col v-for="temp in tempList" :key="temp.value" :span="8">
        <div @click="download(temp)" class="template">
          <div class="template-icon">
            <img src="../../../assets/images/excel.png" alt="excel">
          </div>
          <div class="template-title">{{temp.label}}</div>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
  const tempList = [
    {
      value: 'CN002301',
      label: '重庆电子口岸'
    },
    {
      value: 'CN057401',
      label: '宁波国际物流'
    }
  ];
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
        tempList
      };
    },
    methods: {
      download(temp) {
        const a = document.createElement('a');
        a.download = temp.label;
        a.href = `${this.publicPath}template/${temp.value}.xlsx`;
        document.body.appendChild(a);
        a.click();
        this.$emit('close');
        document.body.removeChild(a);
      }
    }
  };
</script>
<style lang="scss" scoped>
.template {
  width: 160px;
  height: 160px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.09);
  }

  .template-icon {
    width: 120px;
    height: 120px;
    line-height: 120px;
    margin: 0 auto;
    text-align: center;

    img {
      width: 81px;
      height: 71px;
    }
  }

  .template-title {
    text-align: center;
    line-height: 24px;
  }
}
</style>
