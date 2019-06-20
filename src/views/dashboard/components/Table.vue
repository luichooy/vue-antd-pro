<template>
  <a-row :gutter="12">
    <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false" title="单量分布">
        <a-table
          :columns="countColumn"
          :dataSource="rows"
          :pagination="false"
          row-key="id"
          size="small"
          :scroll="{ y: 227 }"
        >
          <span slot="percent" slot-scope="percent">
            <div class="percent-rate">{{ percent }}%</div>
            <div class="percent-progress">
              <a-progress :percent="percent" :showInfo="false"/>
            </div>
          </span>
        </a-table>
      </a-card>
    </a-col>
    <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false" title="回执成功率">
        <a-table
          :columns="rateColumn"
          :dataSource="rows"
          :pagination="false"
          row-key="id"
          size="small"
          :scroll="{ y: 227 }"
        >
          <span slot="percent" slot-scope="percent">
            <div class="percent-rate">{{ percent }}%</div>
            <div class="percent-progress">
              <a-progress :percent="percent" :showInfo="false"/>
            </div>
          </span>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import { dashboardMixin } from '@/mixins';
  import { getByCustoms } from '@/api/statistic';
  import { countColumn, rateColumn } from '../config';

  export default {
    mixins: [dashboardMixin],
    data() {
      return {
        countColumn,
        rateColumn,
        rows: null
      };
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByCustoms(this.query);
        if (res.status === 200) {
          this.rows = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
.percent-progress {
  width: 50%;
  margin: 0 auto;
}
</style>
