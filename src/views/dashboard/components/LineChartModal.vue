<template>
  <!--申报状态详情-->
  <a-modal
    :visible="visible"
    @cancel="() => $emit('close')"
    :footer="null"
    destroyOnClose
    width="60%"
    title="平台七日单量趋势图"
  >
    <div class="line-chart">
      <h2 class="title">{{ dataSource.platformName }}（{{ type }}）</h2>
      <v-chart :options="options" autoresize/>
    </div>
  </a-modal>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },

      // x 轴数据
      xAxis: {
        type: Array,
        required: true
      },

      dataSource: {
        type: Object,
        required: true
      },

      // 业务类型
      type: String
    },
    computed: {
      source() {
        const { one, two, three, four, five, six, seven } = this.dataSource;
        return [one, two, three, four, five, six, seven];
      },
      options() {
        return {
          color: ['#ff0000', '#27fe51', '#2db7f5'],
          tooltip: {
            trigger: 'axis',
            confine: true,
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
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxis
          },
          yAxis: {},
          series: [
            {
              name: '总单量',
              type: 'line',
              data: this.source
            }
          ]
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
.echarts {
  height: 360px;
}

.line-chart {
  .title {
    font-size: 16px;
    text-align: center;
  }
}
</style>
