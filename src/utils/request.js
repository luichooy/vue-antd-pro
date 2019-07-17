import Vue from 'vue'
import store from '@/store/index'
import router from '@/router'
import axios from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import notification from 'ant-design-vue/es/notification'

// api 配置

let timer = null

const onError = error => {
  if (error.response) {
    const status = error.response.status
    const message = error.response.statusText
    const token = Vue.ss.get(ACCESS_TOKEN)
    
    if (status === 403) {
      notification.error({ message: '禁止访问', description: message })
    }
    
    if (status === 404) {
      notification.error({ message: '未知资源', description: message })
    }
    
    if (status === 500) {
      notification.error({
        message: '服务器错误',
        description: message
      })
    }
    
    if (status === 401 && !timer) {
      timer = setTimeout(() => {
        notification.error({
          message: '未授权',
          description: '授权失败，请重新登录'
        })
        if (token) {
          store.dispatch('user/Logout').then(() => router.replace('/login'))
        }
        timer = null
      }, 500)
    }
  }
  return Promise.reject(error)
}

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [
    function (data, headers) {
      const token = Vue.ss.get(ACCESS_TOKEN)
      if (token) {
        headers[ACCESS_TOKEN] = 'Bearer ' + token
      }
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data
      } else {
        return JSON.stringify(data)
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
    if (process.env.NODE_ENV === 'development') {
      const { method } = config
      if (['post', 'put', 'patch'].includes(method)) {
        console.log(config.data)
      }
    }
    
    return config
  },
  error => {
    notification.error({
      message: '请求失败',
      description: '发送请求失败，请检查您的网络'
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(res => {
  console.log(res)
  const jsonPattern = /application\/json/gi;
  if (jsonPattern.test(res.headers['content-type'])) {
    return res.data;
  } else {
    return res;
  }
}, onError)

export default request
