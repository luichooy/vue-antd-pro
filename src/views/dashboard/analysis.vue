<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="statistic-wrapper">
    <a-row :gutter="16">
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="总销售额" total="¥126,560">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="up" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down"></Trend>
          </div>
          <template v-slot:footer>
            <span>日销售额</span>
            <span class="footer-number">￥12,423</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="访问量" total="8,846">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="up" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down"></Trend>
          </div>
          <template v-slot:footer>
            <span>日访问量</span>
            <span class="footer-number">1,234</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="支付笔数" total="6,560">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="down" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="up"></Trend>
          </div>
          <template v-slot:footer>
            <span>转化率</span>
            <span class="footer-number">60%</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="运营活动效果" total="78%">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="down" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="up"></Trend>
          </div>
          <template v-slot:footer>
            <Trend label="周同比" value="12" type="up" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down"></Trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>
  
  </div>
</template>

<script>
import ChartCard from '@/components/Chart/ChartCard'
import Trend from '@/components/Trend'

export default {
  components: { ChartCard, Trend },
  data () {
    return {}
  },
  
  methods: {}
}
</script>

<style lang="scss" scoped>
  .statistic-wrapper {
    
    .footer-number {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
