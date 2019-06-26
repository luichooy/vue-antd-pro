<template>
  <div class="system-setting" ref="settingDrawer">
    <a-drawer
      :visible="visible"
      @close="onClose"
      :getContainer="() => $refs.settingDrawer"
      :closable="false"
      width="300"
      placement="right"
    >
      <div class="setting-drawer-content">
        <div class="setting-block">
          <h3 class="block-title">整体风格设置</h3>
          
          <div class="block-content">
            <a-tooltip v-for="theme in menuThemeList" :key="theme.value" :title="theme.name">
              <div class="img-block" @click="changeMenuTheme(theme.value)">
                <img :src="theme.imgSrc" :alt="theme.value">
                <div class="img-block-checked" v-if="menuTheme === theme.value">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        
        <div class="setting-block">
          <h3 class="block-title">主题色</h3>
          
          <div class="block-content color-theme">
            <a-tooltip
              v-for="color in colorList"
              :key="color.value"
              :title="color.name"
              class="color-theme-item"
            >
              <a-tag :color="color.value" @click="changeColorTheme(color.value)">
                <a-icon type="check" v-if="color.value === defaultColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />
        
        <div class="setting-block">
          <h3 class="block-title">导航模式</h3>
          
          <div class="block-content">
            <a-tooltip v-for="layout in layoutModeList" :key="layout.value" :title="layout.name">
              <div class="img-block" @click="changeLayout(layout.value)">
                <img :src="layout.imgSrc" :alt="layout.name">
                <div class="img-block-checked" v-if="layoutMode === layout.value">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          
          <div style="margin-top: 24px;">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions" title="该设定仅 [顶部栏导航] 时有效">
                  <a-select
                    :defaultValue="contentWidth"
                    @change="changeContentWidth"
                    size="small"
                    style="width: 80px;"
                  >
                    <a-select-option value="fixed">固定</a-select-option>
                    <a-select-option value="fluid" v-if="layoutMode !== 'side'">流式</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta title="内容区域宽度" />
              </a-list-item>
              
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="fixedHeader"
                  @change="handleFixedHeader"
                />
                <a-list-item-meta title="固定 Header" />
              </a-list-item>
              
              <a-list-item>
                <a-switch
                  slot="actions"
                  :disabled="!fixedHeader"
                  :defaultChecked="autoHideHeader"
                  @change="handleFixedHeaderHidden"
                  size="small"
                />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{ textDecoration: !fixedHeader ? 'line-through' : 'unset' }"
                  >下滑时隐藏 Header
                  </div>
                </a-list-item-meta>
              </a-list-item>
              
              <a-list-item>
                <a-switch
                  slot="actions"
                  :disabled="(layoutMode === 'top')"
                  :defaultChecked="fixedSiderbar"
                  @change="handleFixSiderbar"
                  size="small"
                />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{ textDecoration: layoutMode === 'top' ? 'line-through' : 'unset' }"
                  >固定侧边菜单
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
        
        <div class="setting-block">
          <h3 class="block-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="colorWeak"
                  @change="changeColorWeak"
                />
                <a-list-item-meta title="色弱模式"></a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
      </div>
      <div v-if="visible || triggerVisible" class="setting-drawer-trigger" @click="toggle">
        <a-icon type="setting" v-if="!visible" />
        <a-icon type="close" v-else />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { appStoreMixin } from '@/mixins'
import {
  menuThemeList,
  colorList,
  layoutModeList,
  updateTheme,
  updateColorWeak
} from './tools'
import config from '@/store/config'
import { throttle } from '@/utils/optimize'

const {
  app: { color, colorWeak }
} = config

export default {
  mixins: [appStoreMixin],
  data () {
    return {
      menuThemeList,
      colorList,
      layoutModeList,
      visible: true,
      triggerVisible: false
    }
  },
  methods: {
    changeMenuTheme (theme) {
      this.set_menuTheme(theme)
    },
    changeColorTheme (color) {
      if (this.color !== color) {
        this.set_color(color)
        updateTheme(color)
      }
    },
    changeLayout (layout) {
      this.set_layout(layout)
    },
    changeContentWidth (type) {
      this.set_contentWidth(type)
    },
    handleFixedHeader (fixed) {
      this.set_fixedHeader(fixed)
    },
    handleFixedHeaderHidden (isHidden) {
      this.set_autoHideHeader(isHidden)
    },
    handleFixSiderbar (fixed) {
      this.set_fixedSiderbar(fixed)
    },
    changeColorWeak (colorWeak) {
      this.set_colorWeak(colorWeak)
      updateColorWeak(colorWeak)
    },
    toggle () {
      this.visible = !this.visible
    },
    onClose () {
      this.visible = false
    },
    handleMousemove (e) {
      const fn = () => {
        const pageX = document.documentElement.offsetWidth
        const currentX = e.x
        
        if (pageX - currentX < 100) {
          this.triggerVisible = true
        } else {
          this.triggerVisible = false
        }
      }
      
      return throttle(fn, 500).call(this)
    }
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.visible = false
    }, 16)
    
    if (this.defaultColor !== color) {
      updateTheme(this.defaultColor)
    }
    if (this.colorWeak !== colorWeak) {
      updateColorWeak(this.colorWeak)
    }
    
    window.addEventListener('mousemove', this.handleMousemove, false)
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.handleMousemove, false)
  }
}
</script>

<style lang="scss" scoped>
  .setting-drawer-content {
    .setting-block {
      margin-bottom: 24px;
      
      .block-content {
        display: flex;
        
        .img-block {
          position: relative;
          margin-right: 16px;
          border-radius: 4px;
          cursor: pointer;
          
          img {
            width: 48px;
          }
          
          .img-block-checked {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            padding-top: 15px;
            padding-left: 24px;
            height: 100%;
            color: #1890ff;
            font-size: 14px;
            font-weight: 700;
          }
        }
        
        &.color-theme {
          height: 20px;
          .color-theme-item {
            width: 20px;
            height: 20px;
            float: left;
            margin-right: 8px;
            padding-left: 0;
            padding-right: 0;
            border-radius: 2px;
            cursor: pointer;
            text-align: center;
            color: #fff;
            font-weight: 700;
            
            i {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  
  .setting-drawer-trigger {
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;
    background: #1890ff;
    cursor: pointer;
    pointer-events: auto;
    
    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
