<template>
  <div class="mini-search-area">
    <div class="search-header">
      <span class="header-title">{{ title }}</span>
      <a-tooltip placement="top" title="指标说明">
        <a-icon type="info-circle" class="ml-2" />
      </a-tooltip>
    </div>
    <div class="search-content">
      <span class="value">{{ value }}</span>
      <Trend :value="trend.value" :type="trend.type" />
    </div>
    <div class="search-chart">
      <mini-area line />
    </div>
  </div>
</template>

<script>
import Trend from '@/components/Trend'
import MiniArea from './MiniArea'

export default {
  name: 'MiniSearchArea',
  components: { Trend, MiniArea },
  props: {
    title: String,
    value: String,
    trend: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .mini-search-area {
    .search-header {
      height: 22px;
      line-height: 22px;
      color: rgba(0, 0, 0, .45);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .search-content {
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      .value {
        height: 32px;
        line-height: 32px;
        margin-right: 32px;
        color: rgba(0, 0, 0, .85);
        font-size: 24px;
      }
    }
  }
</style>
