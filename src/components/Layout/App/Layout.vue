<template>
  <a-layout
    :class="['layout', `layout-${device}`, `layout-menu__${layoutMode}`]"
    :style="{ minHeight: '100vh' }"
  >
    <template v-if="isMobile">
      <a-drawer
        :visible="collapsed"
        :closable="false"
        placement="left"
        @close="() => this.collapsed = false"
        wrapClassName="drawer-sider"
      >
        <layout-sider :collapsed="false" :collapsible="false" @close="() => this.collapsed = false"></layout-sider>
      </a-drawer>
    </template>
    <template v-if="!isMobile && layoutMode === 'side'">
      <layout-sider :collapsed="collapsed"></layout-sider>
    </template>
    
    <a-layout :style="{ paddingLeft: contentLeft }" class="layout-right">
      <layout-header :collapsed="collapsed" @toggle="toggle" :style="{ left: contentLeft }"></layout-header>
      
      <a-layout-content
        :class="['layout-content', layoutMode === 'top' && `layout-content__${contentWidth}`]"
        :style="fixedHeader && {marginTop: '64px'}"
      >
        <div class="layout-content--inner">
          <slot></slot>
        </div>
      </a-layout-content>
      <layout-footer />
      <setting></setting>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutSider from './LayoutSider'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'
import Setting from '@/components/Setting'
import { appStoreMixin, deviceMixin } from '@/mixins'
import { DEVICE_TYPE } from '@/utils/device'

export default {
  name: 'Layout',
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutFooter,
    Setting
  },
  mixins: [appStoreMixin, deviceMixin],
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    contentLeft () {
      return !this.fixedSiderbar || this.isMobile || this.layoutMode === 'top'
        ? 0
        : this.collapsed
          ? '80px'
          : '256px'
    }
  },
  watch: {
    device: {
      immediate: true,
      handler (deviceType) {
        if (deviceType === DEVICE_TYPE.TABLET) {
          this.collapsed = true
        } else if (deviceType === DEVICE_TYPE.MOBILE) {
          this.collapsed = true
          setTimeout(() => {
            this.collapsed = false
          }, 60)
        } else {
          this.collapsed = false
        }
      }
    }
  },
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    .layout-right {
      position: relative;
      box-sizing: border-box;
      transition: all 0.3s;
      
      .layout-content {
        width: 100%;
        padding: 16px 16px 0;
        display: flex;
        
        .layout-content--inner {
          flex: 1 1 auto;
          width: 100%;
          position: relative;
        }
      }
    }
    
    .layout-content__fixed {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    @media screen and (min-width: 1200px) {
      .layout-content__fixed {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  }
</style>
