<template>
  <a-card :loading="loading" :bordered="false" :bodyStyle="{padding: '20px 24px 8px'}">
    <div class="chart-card">
      <div class="chart-card-header">
        <div class="meta">
          <div class="meta-label">{{ title }}</div>
          <div class="meta-total">{{ total }}</div>
        </div>
        <span class="chart-card-action">
        <slot name="action"></slot>
      </span>
      </div>
      <div class="chart-card-content">
        <div class="chart-card-content-inner">
          <slot></slot>
        </div>
      </div>
      <div class="chart-card-footer">
        <div class="chart-card-footer-inner">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: {
    title: {
      type: String,
      default: 'Chart-Card'
    },
    total: {
      type: String,
      default: ''
    },
    loading: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .chart-card {
    
    .chart-card-header {
      position: relative;
      overflow: hidden;
      
      .meta {
        float: left;
        
        .meta-label {
          height: 22px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
        }
        
        .meta-total {
          margin-top: 4px;
          line-height: 38px;
          height: 38px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
        }
      }
      
      .chart-card-action {
        position: absolute;
        top: 4px;
        right: 0;
        line-height: 1;
        cursor: pointer;
      }
    }
    
    .chart-card-content {
      position: relative;
      margin-bottom: 12px;
      height: 46px;
      
      .chart-card-content-inner {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
      }
    }
    
    .chart-card-footer {
      margin-top: 8px;
      padding-top: 9px;
      border-top: 1px solid rgb(232, 232, 232);
      
      .chart-card-footer-inner {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
