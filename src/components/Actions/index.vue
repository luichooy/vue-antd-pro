<template>
  <div class="actions-wrapper">
    <template v-if="layoutMode === 'side' || (layoutMode === 'top' && isDesktop)">
      <span
        @click="handleClick({key: 'modifyPassword'})"
        class="action"
        title="修改密码"
        style="font-size: 22px;"
      >
        <a-icon type="logout" />
      </span>
      <span
        @click="handleClick({key: 'logout'})"
        class="action"
        title="注销"
        style="font-size: 22px;"
      >
        <a-icon type="poweroff" />
      </span>
      <span class="action avatar">
        <a-avatar
          size="small"
          :style="`background-color:${defaultColor};color: #fff;`"
        >{{ username.slice(0,1) }}</a-avatar>
      </span>
      <span class="action welcome">欢迎您，{{username}}</span>
    </template>
    <template v-else>
      <a-dropdown :trigger="['click']">
        <a-avatar
          icon="ellipsis"
          size="small"
          class="actions-trigger"
          :style="`background: ${defaultColor}`"
        ></a-avatar>
        <a-menu slot="overlay" @click="handleClick" class="user-menu">
          <a-menu-item class="user">
            <a-avatar
              size="small"
              :style="`background-color:${defaultColor};color: #fff;`"
            >{{ username.slice(0,1) }}
            </a-avatar>
            欢迎您，{{username}}
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="modifyPassword">
            <a href="javascript:;">
              <a-icon type="logout" style="margin-right: 5px;vertical-align: middle" />
              <span style="vertical-align: middle">修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;">
              <a-icon type="poweroff" style="margin-right: 5px;vertical-align: middle" />
              <span style="vertical-align: middle">退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
    <modify-password :visible="modalVisible" @close="modalVisible = false"></modify-password>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { appStoreMixin, deviceMixin } from '@/mixins'
import ModifyPassword from '@/components/ModifyPassword'

export default {
  components: { ModifyPassword },
  mixins: [appStoreMixin, deviceMixin],
  data () {
    return { modalVisible: false }
  },
  computed: {
    ...mapGetters('user', ['username'])
  },
  methods: {
    ...mapActions('user', ['Logout']),
    handleClick ({ key }) {
      const self = this
      if (key === 'modifyPassword') {
        this.modalVisible = true
      } else if (key === 'logout') {
        this.$confirm({
          title: '注销',
          content: `确定要注销当前登录吗？`,
          okText: '注销',
          okType: 'danger',
          onOk () {
            self.Logout().then(() => {
              self.$router.replace('/login')
            })
          },
          onCancel () {
            self.$message.warning('取消操作')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .actions-wrapper {
    overflow: hidden;
    
    .actions-trigger {
      transform: rotate(90deg);
      cursor: pointer;
      color: #fff;
    }
    
    .action {
      display: inline-block;
      height: 100%;
      padding: 0 12px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    
    .avatar,
    .welcome {
      cursor: default;
      user-select: none;
      &:hover {
        background: none;
      }
    }
  }
</style>
