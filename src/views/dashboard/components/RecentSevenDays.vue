<template>
  <a-card :loading="loading" :bordered="false" title="七日单量统计">
    <v-chart :options="options" autoresize style="height: 220px;"/>
  </a-card>
</template>

<script>
  import { dashboardMixin } from '@/mixins';
  import { getByWeek } from '@/api/statistic';

  export default {
    mixins: [dashboardMixin],
    data() {
      return {
        loading: false,
        dataset: null
      };
    },
    computed: {
      options() {
        return {
          color: ['#FF5518', '#2FC25B', '#1890FF'],
          tooltip: {
            trigger: 'axis',
            padding: [10, 10, 6, 10],
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            extraCssText: 'box-shadow: rgb(174, 174, 174) 0px 0px 10px;',
            textStyle: {
              color: 'rgb(87, 87, 87)'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            top: 40,
            containLabel: true
          },
          legend: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#D9D9D9'
              }
            },
            axisLabel: {
              color: '#333',
              rotate: 30
            }
          },
          yAxis: {
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
              lineStyle: {
                color: '#E8E8E8'
              }
            }
          },
          dataset: {
            source: this.dataset
          },
          series: [
            {
              name: '总单量',
              type: 'line',
              areaStyle: {
                color: '#e8f4ff'
              },
              smooth: true,
              dimensions: ['date', 'totalDeclareCount']
            },
            {
              name: '揽收量',
              type: 'line',
              areaStyle: {
                color: '#e8f4ff'
              },
              smooth: true,
              dimensions: ['date', 'totalCollectedCount']
            },
            {
              name: '签收量',
              type: 'line',
              areaStyle: {
                color: '#e8f4ff'
              },
              smooth: true,
              dimensions: ['date', 'totalSignedCout']
            }
          ]
        };
      }
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByWeek(this.query);
        if (res.status === 200) {
          this.dataset = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.loading = false;
      }
    }
  };
</script>
