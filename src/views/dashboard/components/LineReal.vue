<template>
  <a-card :loading="loading" :bordered="false">
    <!--单量实时情况-->
    <span slot="title">
      单量实时情况
      <a-tooltip placement="bottomLeft" :overlayStyle="{width: '850px'}" title="可通过鼠标滚轮和拖拽查看更细粒度数据">
        <a-icon type="info-circle-o"/>
      </a-tooltip>
    </span>
    <div class="chart-wrapper">
      <v-chart :options="options" autoresize style="height: 220px;"/>
    </div>
  </a-card>
</template>

<script>
  import { dashboardMixin } from '@/mixins';
  import { getByHour } from '@/api/statistic';

  export default {
    mixins: [dashboardMixin],
    data() {
      return {
        dataset: []
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
            bottom: '3%',
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
              color: '#333'
            },
            data: [
              '00:00',
              '01:00',
              '02:00',
              '03:00',
              '04:00',
              '05:00',
              '06:00',
              '07:00',
              '08:00',
              '09:00',
              '10:00',
              '11:00',
              '12:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
              '18:00',
              '19:00',
              '20:00',
              '21:00',
              '22:00',
              '23:00'
            ]
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
          dataZoom: {
            type: 'inside',
            startValue: 9,
            endValue: 19
          },
          series: [
            {
              name: '总单量',
              type: 'line',
              dimensions: ['time', 'totalDeclareCount']
            },
            {
              name: '揽收量',
              type: 'line',
              dimensions: ['time', 'totalCollectedCount']
            },
            {
              name: '签收量',
              type: 'line',
              dimensions: ['time', 'totalSignedCout']
            }
          ],
          dataset: {
            source: this.dataset
          }
        };
      }
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByHour(this.query);
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
