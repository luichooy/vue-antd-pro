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
            <mini-area />
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
          <mini-bar />
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
          <mini-progress :percent="70" :height="8"></mini-progress>
          <template v-slot:footer>
            <Trend label="周同比" value="12" type="up" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down"></Trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>
    
    <a-card
      :loading="loading"
      :bordered="false"
      :bodyStyle="{ padding: 0 }"
    >
      <a-tabs v-model="activeTab" size="large" :tabBarStyle="{paddingLeft: '16px', marginBottom: '24px'}">
        <template v-slot:tabBarExtraContent>
          <div class="tab-extra-wrapper">
            <div class="tab-extra-actions">
              <a v-for="item in dateList" :key="item.key" @click="selectDate(item)">{{ item.label }}</a>
            </div>
            <a-range-picker
              v-model="rangeDate"
              style="width: 256px;"
            ></a-range-picker>
          </div>
        </template>
        <a-tab-pane tab="销售额" key="sale" :loading="loading">sale</a-tab-pane>
        <a-tab-pane tab="访问量" key="pv" :loading="loading">pv</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
// import moment from 'moment'
import ChartCard from '@/components/Chart/ChartCard'
import Trend from '@/components/Trend'
import MiniBar from '@/components/Chart/MiniBar'
import MiniArea from '@/components/Chart/MiniArea'
import MiniProgress from '@/components/Chart/MiniProgress'
import { getCurrent } from '@/utils/time'

const dateList = [
  {
    key: 'today',
    value: getCurrent('day'),
    label: '今日'
  },
  {
    key: 'week',
    value: getCurrent('week'),
    label: '本周'
  },
  {
    key: 'month',
    value: getCurrent('month'),
    label: '本月'
  },
  {
    key: 'year',
    value: getCurrent('year'),
    label: '本年'
  }
]

console.log(dateList)

export default {
  components: { ChartCard, Trend, MiniBar, MiniArea, MiniProgress },
  data () {
    return {
      loading: false,
      rangeDate: [],
      dateList,
      activeTab: 'sale'
    }
  },
  
  methods: {
    selectDate (item) {
      console.log(item)
      this.rangeDate = item.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistic-wrapper {
    
    .footer-number {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.85);
    }
    
    .tab-extra-wrapper {
      line-height: 55px;
      padding-right: 24px;
      
      .tab-extra-actions {
        display: inline-block;
        margin-right: 24px;
        
        a {
          color: rgba(0, 0, 0, .65);
        }
        
        a + a {
          margin-left: 24px;
        }
      }
    }
  }
</style>
