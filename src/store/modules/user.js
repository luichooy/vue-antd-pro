import Vue from 'vue'
import { login as userLogin, logout as userLogout } from '@/api/auth'
import { ACCESS_TOKEN, USER } from '@/store/mutation-types'

const user = {
  namespaced: true,
  state: {
    token: '',
    user: null
  },
  getters: {
    username (state) {
      return (state.user && state.user.username) || ''
    }
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
      Vue.ss.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
      state.token = token
    },
    SET_USER: (state, user) => {
      Vue.ss.set(USER, user)
      state.user = user
    }
  },
  
  actions: {
    // 登录
    Login ({ commit, dispatch }, userInfo) {
      return new Promise(async (resolve, reject) => {
        const res = await userLogin(userInfo)
        if (res.status === 200) {
          commit('SET_TOKEN', res.data.token)
          commit('SET_USER', res.data.user)
          commit('permission/SET_MENUS', res.data.menus, {
            root: true
          })
          resolve(res)
        } else {
          reject(res)
        }
      })
    },
    Logout ({ commit, state }) {
      return new Promise(async resolve => {
        await userLogout()
        commit('SET_TOKEN', '')
        Vue.ss.remove(ACCESS_TOKEN)
        resolve()
      })
    }
  }
}

export default user
