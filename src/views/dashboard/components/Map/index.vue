<template>
  <a-card :loading="loading" :bordered="false" title="城市口岸统计分析" style="margin-top: 16px;">
    <a-row>
      <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
        <v-chart :options="options" autoresize style="height: 420px;"/>
      </a-col>
      <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
        <!--只显示前10名-->
        <rank-list title="城市排行榜" :list="dataset.slice(0,10)"/>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts.vue';
  import RankList from './RankList';
  import { dashboardMixin } from '@/mixins';
  import { getByCity } from '@/api/statistic';

  ECharts.registerMap('china', require('./china.json'));

  const convertData = data => {
    return data.map(item => ({
      code: item.code,
      name: item.name,
      value: [item.longitude, item.latitude, item.totalDeclareCount],
      count: item.totalDeclareCount
    }));
  };

  export default {
    mixins: [dashboardMixin],
    components: { RankList },
    data() {
      return {
        dataset: []
      };
    },
    computed: {
      options() {
        return {
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.name}</br>当日单量：${params.data.count}`;
            },
            padding: [10, 10, 6, 10],
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            extraCssText: 'box-shadow: rgb(174, 174, 174) 0px 0px 10px;',
            textStyle: {
              color: 'rgb(87, 87, 87)'
            }
          },
          legend: {
            orient: 'vertical',
            top: 'top',
            left: 'center',
            data: ['城市单量'],
            textStyle: {
              color: '#000'
            }
          },
          visualMap: {
            pieces: [
              { min: 1500 },
              { min: 900, max: 1500 },
              { min: 600, max: 900 },
              { min: 300, max: 600 },
              { min: 100, max: 300 },
              { max: 100 }
            ],
            color: ['#d94e5d', '#eac736', '#50a3ba'],
            textStyle: {
              color: '#000'
            }
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#E7E9F0',
                borderColor: '#fff'
              },
              emphasis: {
                areaColor: '#E7E9F0'
              }
            }
          },
          series: [
            {
              name: '城市单量',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(this.dataset),
              symbolSize: 12,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#4C7CFF'
                },
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                }
              }
            }
          ]
        };
      }
    },
    methods: {
      async queryData() {
        this.loading = true;
        const res = await getByCity(this.query);
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

<style lang="scss" scoped>
.statistic-map {
  height: 520px;
}
</style>
