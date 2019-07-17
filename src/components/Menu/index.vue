<script>
import { mapState } from 'vuex'
import { appStoreMixin, deviceMixin } from '@/mixins'
import { generateOpenKeys } from '@/utils'

export default {
  mixins: [appStoreMixin, deviceMixin],
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedKeys: [],
      openKeys: [],
      cacheOpenKeys: []
    }
  },
  computed: {
    ...mapState('permission', ['menus']),
    isSide () {
      return (
        this.layoutMode === 'side' ||
        (this.layoutMode === 'top' && this.isMobile)
      )
    }
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cacheOpenKeys = [].concat(this.openKeys)
        this.openKeys = []
      } else {
        this.openKeys = this.cacheOpenKeys
      }
    },
    $route (val) {
      this.updateMenu()
    }
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys[openKeys.length - 1]
      const keyPath = latestOpenKey ? latestOpenKey.split('/') : []
      keyPath.shift()
      this.openKeys = generateOpenKeys(keyPath)
    },
    handleMenuClick ({ item, key, keyPath }) {
      this.selectedKeys = [keyPath[0]]
      this.$router.push(key)
      this.$emit('close')
    },
    updateMenu () {
      // fullPath : '/customs/export/query'
      let openKeys = []
      const { fullPath } = this.$route
      const keyPath = fullPath.split('/')
      keyPath.shift()
      keyPath.pop()
      this.selectedKeys = [fullPath]
      
      if (this.mode === 'inline') {
        openKeys = generateOpenKeys(keyPath)
      }
      
      this.collapsed
        ? (this.cacheOpenKeys = openKeys)
        : (this.openKeys = openKeys)
    }
  },
  created () {
    this.updateMenu()
  },
  render () {
    const {
      isSide,
      menuTheme,
      mode,
      openKeys,
      selectedKeys,
      $route,
      menus,
      handleMenuClick,
      onOpenChange
    } = this
    
    const menuWrapClass = [
      'lu-menu',
      isSide && 'lu-menu__side',
      `lu-menu__${menuTheme}`
    ]
    
    const menuProps = {
      mode,
      openKeys,
      selectedKeys,
      theme: menuTheme,
      defaultSelectedKeys: [$route.path]
    }
    
    const menuEvent = {
      click: handleMenuClick,
      openChange: onOpenChange
    }
    
    // 递归生成菜单
    function generateMenu (menus) {
      if (menus) {
        return menus.map(menu => {
          if (menu.children && menu.children.length) {
            return (
              <a-sub-menu key={ menu.path }>
                <span slot="title">
                  { menu.icon && <a-icon type={ menu.icon } /> }
                  <span>{ menu.title }</span>
                </span>
                { generateMenu(menu.children) }
              </a-sub-menu>
            )
          } else {
            return (
              <a-menu-item key={ menu.path }>
                { menu.icon && <a-icon type={ menu.icon } /> }
                <span>{ menu.title }</span>
              </a-menu-item>
            )
          }
        })
      }
    }
    
    return (
      <div class={ menuWrapClass }>
        <a-menu props={ menuProps } on={ menuEvent }>
          { generateMenu(menus) }
        </a-menu>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
  .lu-menu {
    &.lu-menu__side {
      border-top: 1px solid #3d4348;
      &.lu-menu__light {
        border-top-color: rgba(61, 67, 72, 0.1);
      }
    }
  }
  
  .ant-menu {
    background: transparent;
    
    &.ant-menu-horizontal {
      height: 65px;
      line-height: 65px;
    }
    
    .ant-menu-inline.ant-menu-sub {
      background: rgba(37, 37, 37, 1);
      box-shadow: none;
    }
  }
</style>
