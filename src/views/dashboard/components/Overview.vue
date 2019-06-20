<template>
  <a-row :gutter="12" class="overview-list">
    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false">
        <div class="overview-item">
          <img class="icon" src="../../../assets/images/total.svg" alt="总单量">
          <p class="num">{{ overview.totalDeclareCount || 0 }}</p>
          <p class="label">当日总单量</p>
        </div>
      </a-card>
    </a-col>
    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false">
        <div class="overview-item">
          <img class="icon" src="../../../assets/images/receive.svg" alt="总单量">
          <p class="num">{{ overview.totalCollectedCount || 0 }}</p>
          <p class="label">当日已揽收量</p>
        </div>
      </a-card>
    </a-col>
    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false">
        <div class="overview-item">
          <img class="icon" src="../../../assets/images/sign.svg" alt="总单量">
          <p class="num">{{ overview.totalSignedCout || 0 }}</p>
          <p class="label">当日用户已签收</p>
        </div>
      </a-card>
    </a-col>
    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false">
        <div class="overview-item">
          <img class="icon" src="../../../assets/images/receipt.svg" alt="总单量">
          <p class="num">{{ overview.receiptSuccess || 0 }}%</p>
          <p class="label">当日回执成功率</p>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import { dashboardMixin } from '@/mixins';
  import { getOverview } from '@/api/statistic';

  export default {
    mixins: [dashboardMixin],
    data() {
      return {
        overview: {}
      };
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getOverview(this.query);
        if (res.status === 200) {
          this.overview = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
.overview-list {
  .overview-item {
    .icon {
      display: block;
      margin: 0 auto;
      user-select: none;
    }

    .num {
      font-size: 50px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
    }

    .label {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
    }
  }
}
</style>
