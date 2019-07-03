<template>
  <a-row :gutter="8" type="flex" :style="{ width: '138px', margin: '8px 0' }">
    <a-col :span="12">
      <number-info
        :title="data.name"
        subTitle="转化率"
        :gap="2"
        :total="`${data.cvr * 100}%`"
        :theme="currentKey !== data.name ? 'light' : undefined"
      />
    </a-col>
    <a-col :span="12" :style="{ paddingTop: 36 }">456</a-col>
  </a-row>
</template>

<script>
import NumberInfo from './NumberInfo'

export default {
  name: 'CustomTab',
  components: { NumberInfo },
  props: {
    data: {
      type: Object,
      required: true
    },
    currentKey: String
  }
}
</script>

<style lang="scss" scoped>

</style>
