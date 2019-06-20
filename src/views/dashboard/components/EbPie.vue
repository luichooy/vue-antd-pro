<template>
  <a-card :loading="loading" :bordered="false" title="企业客户单量统计">
    <v-chart :options="businessOptions" autoresize style="height: 240px;"/>
  </a-card>
</template>

<script>
  import { dashboardMixin } from '@/mixins';
  import { getByBusiness } from '@/api/statistic';
  import cloneDeep from 'lodash.clonedeep';
  import { pieOptions } from '../config';

  export default {
    mixins: [dashboardMixin],
    data() {
      return {
        business: []
      };
    },
    computed: {
      businessOptions() {
        const options = cloneDeep(pieOptions);
        options.dataset.source = this.business;
        return options;
      }
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByBusiness(this.query);
        if (res.status === 200) {
          this.business = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
.eb-pie {
  height: 220px;
}
</style>
