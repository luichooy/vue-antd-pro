<template>
  <a-card :bordered="false" title="销售额类别占比" class="sale-percent-card">
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
    123
  </a-card>
</template>

<script>
export default {
  name: 'SalePercentCard',
  data () {
    return {
      Radiocondition: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
