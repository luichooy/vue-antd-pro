<template>
  <!--运单详情-->
  <a-modal
    :visible="visible"
    @cancel="() => $emit('close')"
    :footer="null"
    destroyOnClose
    centered
    :width="940"
    title="运单详情"
  >
    <template v-if="form">
      <a-skeleton :loading="loading" active>
        <detail-list title="基本信息">
          <detail-list-item term="订单编号">{{ form.orderNo | noDataFilter }}</detail-list-item>
          <detail-list-item term="运单编号">{{ form.logisticsNo | noDataFilter }}</detail-list-item>
          <detail-list-item term="提运单号">{{ form.billNo | noDataFilter }}</detail-list-item>
          <detail-list-item term="物流企业代码">{{ form.logisticsCode | noDataFilter }}</detail-list-item>
          <detail-list-item term="物流企业名称">{{ form.logisticsName | noDataFilter }}</detail-list-item>
          <detail-list-item term="电商平台名称">{{ form.ebpName | noDataFilter }}</detail-list-item>
          <detail-list-item term="电商平台代码">{{ form.ebpCode | noDataFilter }}</detail-list-item>
        </detail-list>
      </a-skeleton>

      <a-divider/>

      <a-skeleton :loading="loading" active>
        <detail-list title="货物信息">
          <detail-list :col="1">
            <detail-list-item term="主要货物信息">{{ form.goodsInfo | noDataFilter }}</detail-list-item>
          </detail-list>

          <detail-list-item term="件数">{{ form.packNo | noDataFilter }}</detail-list-item>
          <detail-list-item term="毛重">{{ form.weight | noDataFilter }}</detail-list-item>
          <detail-list-item term="运费">{{ form.freight | noDataFilter }}</detail-list-item>
          <detail-list-item term="保价费">{{ form.insuredFee | noDataFilter }}</detail-list-item>
          <detail-list-item term="币制">{{ form.currency | currencyFilter | noDataFilter }}</detail-list-item>
        </detail-list>
      </a-skeleton>

      <a-divider/>

      <a-skeleton :loading="loading" active :paragraph="{rows: 2}">
        <detail-list title="收货人信息" :col="2">
          <detail-list-item term="收货人姓名">{{ form.consignee | noDataFilter }}</detail-list-item>
          <detail-list-item term="收货人电话">{{ form.consigneeTelephone | noDataFilter }}</detail-list-item>
          <detail-list :col="1">
            <detail-list-item term="收货人地址">{{ form.consigneeAddress | noDataFilter }}</detail-list-item>
          </detail-list>
        </detail-list>
      </a-skeleton>

      <a-divider/>

      <a-skeleton :loading="loading" active :paragraph="{rows: 2}">
        <detail-list title="其它信息" :col="2">
          <detail-list-item term="申报类型">{{ form.appType | applyTypeFilter | noDataFilter }}</detail-list-item>
          <detail-list-item term="申报状态">{{ form.declareStatus | noDataFilter }}</detail-list-item>
          <detail-list-item term="业务时间">{{ form.appTime | noDataFilter }}</detail-list-item>
          <detail-list-item term="最后修改时间">{{ form.updateTime | noDataFilter }}</detail-list-item>
          <detail-list-item term="备注">{{ form.note }}</detail-list-item>
        </detail-list>
      </a-skeleton>
    </template>
  </a-modal>
</template>

<script>
  import { getApply } from '@/api/waybill';
  import DetailList from '@/components/DetailList/DetailList';
  import { currencyFilter, applyTypeFilter } from '@/views/waybill/utils';

  const DetailListItem = DetailList.Item;
  export default {
    name: 'LogisticsModal',
    components: { DetailList, DetailListItem },
    filters: { currencyFilter, applyTypeFilter },
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
        loading: false,
        form: null
      };
    },
    watch: {
      visible(val) {
        if (val) this.getData();
      }
    },
    methods: {
      async getData() {
        this.loading = true;
        const res = await getApply(this.id);
        if (res.status === 200) {
          this.form = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
.logistics-info {
  display: table;
  margin-bottom: 16px;

  .label {
    display: table-cell;
    width: 100px;
    text-align: right;
  }

  .value {
    display: table-cell;
  }
}
</style>
