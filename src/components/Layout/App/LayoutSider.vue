<template>
  <a-layout-sider
    v-model="collapsed"
    :collapsible="collapsible"
    :trigger="null"
    :width="collapsed ? 80 : 256"
    :class="['layout-sider', fixedSiderbar && 'layout-sider__fixed', menuTheme === 'light' && 'light-theme']"
  >
    <Logo :collapsed="collapsed" />
    
    <Menu :collapsed="collapsed"></Menu>
  </a-layout-sider>
</template>

<script>
import { appStoreMixin } from '@/mixins'
import Logo from '@/components/Logo'
import Menu from '@/components/Menu'

export default {
  name: 'LayoutSider',
  components: { Logo, Menu },
  mixins: [appStoreMixin],
  props: {
    collapsible: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout-sider {
    overflow: auto;
    transition: all 0.3s;
    z-index: 10;
    background: linear-gradient(
        180deg,
        rgba(49, 54, 60, 1) 0%,
        rgba(22, 25, 28, 1) 100%
    );
    
    &.layout-sider__fixed {
      position: fixed;
      left: 0;
      height: 100vh;
    }
    
    &.light-theme {
      background: #fff !important;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    }
  }
</style>
