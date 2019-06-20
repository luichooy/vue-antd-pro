<script>
  import { mapState } from 'vuex';
  import { appStoreMixin, deviceMixin } from '@/mixins';
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
    data() {
      return {
        selectedKeys: [],
        openKeys: [],
        cacheOpenKeys: []
      };
    },
    computed: {
      ...mapState('permission', ['menus']),
      rootSubmenuKeys() {
        return this.menus.map(menu => menu.path);
      },
      isSide() {
        return (
          this.layoutMode === 'side' ||
          (this.layoutMode === 'top' && this.isMobile)
        );
      }
    },
    watch: {
      collapsed(val) {
        if (val) {
          this.cacheOpenKeys = [].concat(this.openKeys);
          this.openKeys = [];
        } else {
          this.openKeys = this.cacheOpenKeys;
        }
      },
      $route(val) {
        this.updateMenu();
      }
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => this.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      handleMenuClick({ item, key, keyPath }) {
        this.selectedKeys = [keyPath[keyPath.length - 1]];
        this.$router.push(key);
        this.$emit('close');
      },
      updateMenu() {
        // fullPath : '/waybill/upload'
        let openKeys = [];
        const { fullPath } = this.$route;
        const keyPath = fullPath.split('/');
        keyPath.shift();
        this.selectedKeys = [fullPath];

        this.mode === 'inline' && (openKeys = ['/' + keyPath.shift()]);

        this.collapsed
          ? (this.cacheOpenKeys = openKeys)
          : (this.openKeys = openKeys);
      }
    },
    created() {
      this.updateMenu();
    },
    render() {
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
      } = this;

      const menuWrapClass = [
        'yto-menu',
        isSide && 'yto-menu__side',
        `yto-menu__${menuTheme}`
      ];

      const menuProps = {
        mode,
        openKeys,
        selectedKeys,
        theme: menuTheme,
        defaultSelectedKeys: [$route.path]
      };

      const menuEvent = {
        click: handleMenuClick,
        openChange: onOpenChange
      };

      // 递归生成菜单
      function generateMenu(menus) {
        if (menus) {
          return menus.map(menu => {
            if (menu.children.length) {
              return (
                <a-sub-menu key={menu.path}>
                  <span slot="title">
                    <a-icon type={menu.icon} />
                    <span>{menu.title}</span>
                  </span>
                  {generateMenu(menu.children)}
                </a-sub-menu>
              );
            } else {
              return <a-menu-item key={menu.path}>{menu.title}</a-menu-item>;
            }
          });
        }
      }

      return (
        <div class={menuWrapClass}>
          <a-menu props={menuProps} on={menuEvent}>
            {generateMenu(menus)}
          </a-menu>
        </div>
      );
    }
  };
</script>
<style lang="scss" scoped>
.yto-menu {
  &.yto-menu__side {
    border-top: 1px solid #3d4348;
    &.yto-menu__light {
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
