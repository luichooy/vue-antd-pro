<template>
  <div>
    <h4 class="rank-list-title">{{ title }}</h4>
    <ul class="rank-list">
      <li v-for="(item, idx) in data" :key="idx" class="rank-item">
        <span :class="['rank-item-order', idx < 3 && 'top']">{{ idx + 1 }}</span>
        <span class="rank-item-label">{{ item.label }}</span>
        <span class="rank-item-number">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankList',
  props: {
    title: {
      type: String,
      default: 'Rank List'
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .rank-list-wrapper {
    .rank-list-title {
      margin-bottom: 7px;
    }
    
    .rank-list {
      margin-top: 25px;
      
      .rank-item {
        display: flex;
        margin-top: 16px;
        
        span {
          line-height: 22px;
        }
        
        .rank-item-order {
          width: 20px;
          height: 20px;
          line-height: 20px;
          margin-right: 16px;
          margin-top: 1.5px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          border-radius: 50%;
          background-color: #fafafa;
          
          &.top {
            background-color: #314659;
            color: #fff;
          }
        }
        
        .rank-item-label {
          flex: 1 1 auto;
          margin-right: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .rank-item-number {
        
        }
      }
    }
  }
</style>
