<template>
  <a-modal
    :visible="visible"
    @ok="handleSubmit"
    @cancel="closeModal"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="480"
    title="修改密码"
  >
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="旧密码">
        <a-input
          type="password"
          v-decorator="[
            'password',
            { rules: [ {required: true, message: '请输入旧密码!'} ] }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="新密码">
        <a-input
          type="password"
          v-decorator="[
            'newPassword',
            { rules: [
              {required: true, message: '请输入新密码!'},
              { pattern: /^[a-zA-Z0-9]{8,16}$/g, message: '密码必须为8-16位的字母数字组合' },
              { validator: validateToNextPassword }
            ] }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码">
        <a-input
          type="password"
          v-decorator="[
            'confirm',
            { rules: [
              { required: true, message: '请在此输入密码!' },
              { pattern: /^[a-zA-Z0-9]{8,16}$/g, message: '密码必须为8-16位的字母数字组合' },
              { validator: compareToFirstPassword }
            ] }
          ]"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { modifyPassword } from '@/api/auth'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      confirmDirty: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
    }
  },
  methods: {
    ...mapActions('user', ['Logout']),
    handleSubmit () {
      const { getFieldValue } = this.form
      this.form.validateFields(async (err, form) => {
        if (err) return
        
        this.loading = true
        const params = {}
        params.password = getFieldValue('password')
        params.newPassword = getFieldValue('newPassword')
        const res = await modifyPassword(params)
        this.loading = false
        if (res.status === 200) {
          this.closeModal()
          this.$success({
            title: '修改成功',
            content: '恭喜你，密码修改成功，请重新登录',
            onOk: () => {
              this.Logout().then(() => this.$router.replace('/login'))
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    closeModal () {
      this.form.resetFields()
      this.$emit('close')
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPassword')) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  }
}
</script>
