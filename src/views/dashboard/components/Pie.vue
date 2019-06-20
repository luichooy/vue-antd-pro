<template>
  <a-row :gutter="12">
    <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false" title="保税进口业务">
        <v-chart :options="boundOptions" autoresize style="height: 240px;"/>
      </a-card>
    </a-col>
    <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
      <a-card :loading="loading" :bordered="false" title="直邮进口业务">
        <v-chart :options="mailOptions" autoresize style="height: 240px;"/>
      </a-card>
    </a-col>
    <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
      <eb-pie :query="query"></eb-pie>
    </a-col>
  </a-row>
</template>

<script>
  import cloneDeep from 'lodash.clonedeep';
  import { dashboardMixin } from '@/mixins';
  import { getByImptype } from '@/api/statistic';
  import { pieOptions } from '../config';
  import EbPie from './EbPie';
  
  export default {
    mixins: [dashboardMixin],
    components: { EbPie },
    data() {
      return {
        bound: [],
        mail: []
      };
    },
    computed: {
      boundOptions() {
        const options = cloneDeep(pieOptions);
        options.dataset.source = this.bound;
        return options;
      },
      mailOptions() {
        const options = cloneDeep(pieOptions);
        options.dataset.source = this.mail;
        return options;
      }
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByImptype(this.query);
        if (res.status === 200) {
          this.bound = res.data.bound;
          this.mail = res.data.mail;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>
