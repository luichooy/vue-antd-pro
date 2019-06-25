<template>
  <div :class="['logo-wrapper', `logo-${menuTheme}`, collapsed && 'is-collapsed']">
    <!-- 可根据不同的theme使用不同logo图片 -->
    <img
      v-if="menuTheme === 'dark'"
      class="logo"
      src="../../assets/images/logo.png"
      alt="logo"
    >
    <img
      v-if="menuTheme === 'light'"
      class="logo"
      src="../../assets/images/logo.png"
      alt="logo"
    >
    <span v-if="layoutMode === 'top' && !isTablat" class="title">VUE-ANTD-PRO</span>
    <span v-if="layoutMode === 'side' && !collapsed" class="title">VUE-ANTD-PRO</span>
  </div>
</template>
<script>
import { appStoreMixin, deviceMixin } from '@/mixins'

export default {
  name: 'Logo',
  mixins: [appStoreMixin, deviceMixin],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .logo-wrapper {
    height: 64px;
    line-height: 64px;
    padding: 0 24px;
    box-sizing: border-box;
    text-align: left;
    overflow: hidden;
    user-select: none;
    transition: all 0.3s;
    
    &.is-collapsed {
      padding: 0;
      text-align: center;
    }
    
    &.logo-light {
      .title {
        color: rgba(0, 0, 0, 0.65);
      }
    }
    
    .logo {
      display: inline-block;
      vertical-align: middle;
      width: 45px;
    }
    
    .title {
      display: inline-block;
      vertical-align: middle;
      margin-left: 12px;
      margin-right: 16px;
      font-size: 18px;
      font-weight: bolder;
      font-family: "Ink Free";
      color: #fff;
    }
  }
</style>
