<template>
  <a-card :bordered="false" title="销售额类别占比" class="sale-percent-card" style="height: 100%;">
    <template v-slot:extra>
      <div class="radio-condition">
        <a-radio-group v-model="Radiocondition">
          <a-radio-button value="all">全部渠道</a-radio-button>
          <a-radio-button value="online">线上</a-radio-button>
          <a-radio-button value="offline">门店</a-radio-button>
        </a-radio-group>
      </div>
      <a-dropdown placement="bottomRight">
        <a-icon type="ellipsis" style="cursor: pointer;"/>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">操作一</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">操作二</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>

    <div>
      <h4 class="chart-title">销售额</h4>

      <div class="chart-content">
        <div class="chart-pie">
          <v-chart :data="data" :height="248" :scale="scale" :forceFit="true" padding="auto">
            <v-tooltip :showTitle="false" dataKey="category*percent"/>
            <v-axis/>
            <v-pie position="percent" color="category" :vStyle="pieStyle"/>
            <v-coord type="theta" :radius="1" :innerRadius="0.75"/>
          </v-chart>
          <div class="pie-total">
            <p class="title">销售额</p>
            <p class="value">￥{{ total }}</p>
          </div>
        </div>
        <ul class="chart-legend">
          <li v-for="(item, idx) in data" :key="idx" @click="legendClick(item)" class="lengend-item">
            <span :style="{ background: item.color }" class="legend-dot"></span>
            <span>{{ item.category }}</span>
            <a-divider type="vertical"/>
            <span class="legend-percent">{{(item.percent * 100).toFixed(2) + '%' }}</span>
            <span class="lengend-count">{{ `￥${item.count}` }}</span>
          </li>
        </ul>
      </div>
    </div>
  </a-card>
</template>

<script>
import { View } from '@antv/data-set';

const scale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const sourceData = [
  { category: '家用电器', count: 4544 },
  { category: '食用酒水', count: 3321 },
  { category: '个护健康', count: 3113 },
  { category: '服饰箱包', count: 2341 },
  { category: '母婴产品', count: 1231 },
  { category: '其他', count: 1231 }
]

const dv = new View()
dv.source(sourceData)

dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'category',
  as: 'percent'
})

export default {
  name: 'SalePercentCard',
  data () {
    return {
      Radiocondition: '',
      data: null,
      scale,
      height: 400,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 4
      }
    }
  },
  computed: {
    total () {
      return this.data.reduce((total, item) => (total += item.count), 0)
    }
  },
  methods: {
    legendClick(row){
      console.log(row)
      const newData = sourceData.filter(item => {
        return item.category !== row.category
      })
      console.log(newData)
      dv.changeData(newData)
      //      this.data = dv.data
    }
  },
  created () {
    this.data = dv.rows
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .sale-percent-card {
    .chart-title {
      margin: 8px 0 32px 0;
    }

    .chart-content {
      position: relative;

      .chart-pie {
        position: relative;
        width: calc(100% - 240px);
        font-size: 25px;

        .pie-total {
          position: absolute;
          top: 50%;
          left: 50%;
          max-height: 62px;
          transform: translate(-50%, -50%);
          text-align: center;

          .title {
            height: 22px;
            line-height: 22px;
            margin-bottom: 8px;
            color: rgba(0, 0, 0, .45);
            font-weight: 400;
            font-size: 14px;
          }
        }
      }

      .chart-legend {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        margin: 0 20px;
        min-width: 200px;

        .lengend-item {
          height: 22px;
          line-height: 22px;
          margin-bottom: 16px;
          cursor: pointer;

          .legend-dot {
            display: inline-block;
            position: relative;
            top: -1px;
            width: 8px;
            height: 8px;
            margin-right: 8px;
            border-radius: 100%;
          }

          .legend-percent {
            color: rgba(0, 0, 0, .45);
          }

          .lengend-count {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
</style>
