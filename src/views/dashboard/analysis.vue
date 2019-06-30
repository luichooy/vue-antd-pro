<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="statistic-wrapper">
    <a-row :gutter="16">
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="总销售额" total="¥126,560" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle"/>
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="up" suffix="%" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down" suffix="%"></Trend>
          </div>
          <template v-slot:footer>
            <span>日销售额</span>
            <span class="footer-number">￥12,423</span>
          </template>
        </chart-card>
      </a-col>

      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="访问量" total="8,846" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle"/>
            </a-tooltip>
          </template>
          <div>
            <mini-area color="#975FE4"/>
          </div>
          <template v-slot:footer>
            <span>日访问量</span>
            <span class="footer-number">1,234</span>
          </template>
        </chart-card>
      </a-col>

      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="支付笔数" total="6,560" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle"/>
            </a-tooltip>
          </template>
          <mini-bar/>
          <template v-slot:footer>
            <span>转化率</span>
            <span class="footer-number">60%</span>
          </template>
        </chart-card>
      </a-col>

      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="运营活动效果" total="78%" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle"/>
            </a-tooltip>
          </template>
          <mini-progress :percent="70" :height="8"></mini-progress>
          <template v-slot:footer>
            <Trend label="周同比" value="12" type="up" suffix="%" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down" suffix="%"></Trend>
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
        <a-tab-pane tab="销售额" key="sale" :loading="loading">
          <a-row>
            <a-col :xl="16" :lg="12" :sm="24">
              <div class="bar-wrapper">
                <bar title="销售趋势"/>
              </div>
            </a-col>
            <a-col :xl="8" :lg="12" :sm="24">
              <div class="rank-list-wrapper">
                <rank-list :data="rankListData" title="门店销售额排名"></rank-list>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="访问量" key="pv" :loading="loading">
          <a-row>
            <a-col :xl="16" :lg="12" :sm="24">
              <div class="bar-wrapper">
                <bar title="访问量趋势"/>
              </div>
            </a-col>
            <a-col :xl="8" :lg="12" :sm="24">
              <div class="rank-list-wrapper">
                <rank-list :data="rankListData" title="门店访问量排名"></rank-list>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-row type="flex" :gutter="16" style="margin-top: 16px;">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <hot-search-card :loading="loading"/>
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <sale-percent-card :loading="loading"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChartCard from '@/components/Chart/ChartCard'
import Trend from '@/components/Trend'
import MiniBar from '@/components/Chart/MiniBar'
import MiniArea from '@/components/Chart/MiniArea'
import MiniProgress from '@/components/Chart/MiniProgress'
import Bar from '@/components/Chart/Bar'
import RankList from '@/components/Chart/RankList'
import HotSearchCard from '@/components/Chart/HotSearchCard'
import SalePercentCard from '@/components/Chart/SalePercentCard'
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

const rankListData = []
for (let i = 0; i < 7; i++) {
  rankListData.push({
    label: `工专路 ${i} 号店`,
    value: Math.ceil(Math.random() * 10000)
  })
}

export default {
  components: { ChartCard, Trend, MiniBar, MiniArea, MiniProgress, Bar, RankList, HotSearchCard, SalePercentCard },
  data () {
    return {
      loading: false,
      rangeDate: [],
      dateList,
      activeTab: 'sale',
      rankListData
    }
  },

  methods: {
    selectDate (item) {
      console.log(item)
      this.rangeDate = item.value
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
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

    .bar-wrapper {
      padding: 0 0 32px 32px;
    }

    .rank-list-wrapper {
      padding: 0 32px 32px 72px;
    }

    .sale-percent-card ::v-deep .ant-card-head {
      position: relative;
      .radio-condition {
        position: absolute;
        right: 54px;
        bottom: 12px;
      }
    }
  }
</style>
