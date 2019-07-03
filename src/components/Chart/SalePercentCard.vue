<template>
  <a-card :loading="loading" :bordered="false" title="销售额类别占比" class="sale-percent-card" style="height: 100%;">
    <template v-slot:extra>
      <div class="radio-condition">
        <a-radio-group v-model="Radiocondition">
          <a-radio-button value="all">全部渠道</a-radio-button>
          <a-radio-button value="online">线上</a-radio-button>
          <a-radio-button value="offline">门店</a-radio-button>
        </a-radio-group>
      </div>
      <a-dropdown placement="bottomRight">
        <a-icon type="ellipsis" style="cursor: pointer;" />
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
      
      <pie
        :data="data"
        :height="248"
        :lineWidth="4"
        hasLegend
        :total="() => (data.reduce((acc,item) => (acc += item.y), 0))"
        subTitle="销售额"
      />
    </div>
  </a-card>
</template>

<script>
import Pie from '@/components/Chart/Pie'

const sourceData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 }
]

export default {
  name: 'SalePercentCard',
  components: { Pie },
  props: {
    loading: Boolean
  },
  data () {
    return {
      Radiocondition: '',
      data: sourceData
    }
  },
  computed: {
    total () {
      return this.data.reduce((total, item) => (total += item.count), 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sale-percent-card {
    .chart-title {
      margin: 8px 0 32px 0;
    }
  }
</style>
