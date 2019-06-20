import Vue from 'vue'
import { MENUS } from '../mutation-types'

const permission = {
  namespaced: true,
  state: {
    access: [],
    menus: []
  },

  mutations: {
    SET_MENUS (state, menus) {
      Vue.ss.set(MENUS, menus)
      state.menus = menus
    }
  }
}

export default permission
