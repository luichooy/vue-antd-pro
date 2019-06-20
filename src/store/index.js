import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

export { default as initStore } from './initStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
