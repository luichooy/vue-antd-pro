<template>
  <div class="statistic-wrapper">
    <a-card :bordered="false">123</a-card>
    <!-- <div style="text-align: right">
      <a-date-picker v-model="date" :disabledDate="currentDate => currentDate > moment()"></a-date-picker>
    </div>

    <overview :query="query"></overview>

    <a-row :gutter="12">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
        <line-real :query="query"></line-real>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" style="margin-top: 16px;">
        <recent-seven-days :query="query"></recent-seven-days>
      </a-col>
    </a-row>

    <Map :query="query"></Map>

    <Pie :query="query"></Pie>

    <Table :query="query"></Table>-->
  </div>
</template>

<script>
import moment from 'moment'
// import Overview from './components/Overview';
// import LineReal from './components/LineReal';
// import RecentSevenDays from './components/RecentSevenDays';
// import Map from './components/Map/';
// import Pie from './components/Pie';
// import Table from './components/Table';

export default {
  components: {
    // Overview,
    // LineReal,
    // RecentSevenDays,
    // Map,
    // Pie,
    // Table
  },
  data () {
    return {
      date: moment()
    }
  },
  computed: {
    query () {
      return { date: this.date.format('YYYY-MM-DD') }
    }
  },
  methods: { moment }
}
</script>

<style lang="scss" scoped>
  .statistic-wrapper {
    .total {
      line-height: 38px;
      height: 38px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      color: #000;
      font-size: 30px;
    }
  }
</style>
