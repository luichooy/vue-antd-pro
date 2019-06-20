<template>
  <div class="rank-list-wrapper">
    <h4 class="rank-list__header">{{ title }}</h4>
    <a-row>
      <a-col :span="6">
        <span style="margin-left: 24px">城市</span>
      </a-col>
      <a-col class="text-center" :span="10">单量/平均申报时间（秒）</a-col>
      <a-col class="text-center" :span="8">单量占比</a-col>
    </a-row>
    <div class="rank-list">
      <a-row class="rank-list__item" v-for="(item, index) in list" :key="item.code">
        <a-col :span="6">
          <span :class="[index < 3 ? 'active' : null, 'index']">{{ index + 1 }}</span>
          <span class="name">{{ item.name }}</span>
        </a-col>
        <a-col class="text-center" :span="10">{{ item.totalDeclareCount }} / {{ item.averageTime }}</a-col>
        <a-col class="text-center" :span="8">
          <a-progress :percent="Number(item.rate)"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
.rank-list-wrapper {
  padding: 0 32px 0 0;

  .rank-list__header {
    margin-bottom: 24px;
  }

  .rank-list {
    .rank-list__item {
      margin-top: 16px;

      .index {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 24px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        background-color: #f5f5f5;

        &.active {
          background-color: #314659;
          color: #fff;
        }
      }

      .name {
        display: inline-block;
      }
    }
  }
}
</style>
