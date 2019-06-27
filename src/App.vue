<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
// eslint-disable-next-line
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { deviceEnquire } from '@/utils/device'

export default {
  name: 'app',
  data () {
    return {
      zh_CN
    }
  },
  mounted () {
    deviceEnquire(deviceType =>
      this.$store.commit('app/SET_DEVICE', deviceType)
    )
  }
}
</script>
