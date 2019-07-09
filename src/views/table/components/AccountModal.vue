<template>
  <!--新增/修改用户模态框-->
  <a-modal
    :visible="visible"
    @ok="onSubmit"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="480"
    :title="account ? '编辑用户' : '新增用户'"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="登录名">
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入登录名!' }
              ]
            }
          ]"
          :disabled="!!account"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="联系人">
        <a-input
          v-decorator="[
            'contacts',
            {
              initialValue: account && account.contacts,
              rules: [ {required: true, message: '请输入联系人!'} ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="联系人邮箱">
        <a-input
          v-decorator="[
              'contactsEmail',
              {
                initialValue: account && account.contactsEmail,
                rules: [
                  {required: true, message: '请输入联系人邮箱!'},
                  {type: 'email', message: '邮箱格式错误！'}
                ]
              }
            ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="地址">
        <a-textarea
          v-decorator="[
            'address',
            {
              initialValue: account && account.address,
              rules: [ {required: true, message: '请输入地址!'} ]
            }
          ]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="角色">
        <a-select
          v-decorator="[
            'roleId',
            {
              initialValue: account && account.roleId,
              rules: [ {required: true, message: '请选择角色!'} ]
            }
          ]"
          :options="roleOptions"
        ></a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="状态">
        <a-select
          v-decorator="[
              'status',
              {
                initialValue: account && account.status,
                rules: [ {required: true, message: '请选择状态!'} ]
              }
            ]"
        >
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="0">禁用</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { createAccount, modifyAccount, getRoles } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
  components: { ATextarea },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    account: Object
  },
  data () {
    return {
      form: this.$form.createForm(this),
      roleOptions: [],
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
    }
  },
  methods: {
    async handleCreateAccount (params) {
      await createAccount(params)
      this.loading = false
      this.$message.success('创建用户成功')
      this.closeModal(true)
    },
    async handleModifyAccount (params) {
      await modifyAccount(params)
      this.loading = false
      this.$message.success('编辑成功')
      this.closeModal(true)
    },
    onSubmit () {
      this.form.validateFields((err, values) => {
        if (err) return
        
        this.loading = true
        const params = { ...this.account, ...values }
        if (params.id) {
          this.handleModifyAccount(params)
        } else {
          this.handleCreateAccount(params)
        }
      })
    },
    async queryRoles () {
      const res = await getRoles()
      this.roleOptions = res
    },
    closeModal (isRefresh) {
      this.form.resetFields()
      this.$emit('close', isRefresh)
    }
  },
  created () {
    this.queryRoles()
  }
}
</script>
