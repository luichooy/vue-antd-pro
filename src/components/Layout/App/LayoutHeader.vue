<template>
  <a-layout-header
    v-if="!hideHeader"
    :class="[
      'layout-header',
      fixedHeader && 'layout-header__fixed',
      layoutMode === 'side' ? 'layout-header__light' : `layout-header__${menuTheme}`
    ]"
  >
    <div class="header-left">
      <a-icon v-if="showTrigger" :type="triggerIconType" @click="$emit('toggle')" class="trigger" />
      <Logo v-if="layoutMode === 'top' && !isMobile" />
      
      <Menu v-if="showMenu" mode="horizontal"></Menu>
    </div>
    <div class="header-right">
      <Actions />
    </div>
  </a-layout-header>
</template>

<script>
import { appStoreMixin, deviceMixin } from '@/mixins'
import Logo from '@/components/Logo'
import Menu from '@/components/Menu'
import Actions from '@/components/Actions'

export default {
  name: 'LayoutHeader',
  components: { Logo, Menu, Actions },
  mixins: [appStoreMixin, deviceMixin],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hideHeader: false
    }
  },
  computed: {
    showTrigger () {
      return (
        this.layoutMode === 'side' ||
        (this.layoutMode === 'top' && this.isMobile)
      )
    },
    triggerIconType () {
      const flag = this.isMobile ? !this.collapsed : this.collapsed
      return flag ? 'menu-unfold' : 'menu-fold'
    },
    showMenu () {
      return this.layoutMode === 'top' && !this.isMobile
    }
  },
  methods: {
    handleScroll () {
      if (this.autoHideHeader) {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        if (scrollTop > 100) {
          this.hideHeader = true
        } else {
          this.hideHeader = false
        }
      } else {
        this.hideHeader = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
  }
}
</script>
<style lang="scss" scoped>
  .layout-header {
    padding: 0 16px 0 0;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s;
    z-index: 100;
    
    &.layout-header__dark {
      background: linear-gradient(180deg, #31363c 0%, #16191c 100%);
      color: #fff;
      
      .trigger {
        color: #fff;
      }
    }
    
    &.layout-header__light {
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
    
    &.layout-header__fixed {
      position: fixed;
      right: 0;
      top: 0;
    }
    
    .header-left {
      display: flex;
    }
    
    .trigger {
      line-height: 70px;
      padding: 0 24px;
      font-size: 20px;
      cursor: pointer;
      color: #333;
      transition: color 0.3s;
      
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
</style>
