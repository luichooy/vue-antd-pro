import Vue from 'vue'
import Storage from 'vue-ls'

/*
 *  同时使用 loal 和 session
 *  https://github.com/RobinCK/vue-ls/issues/83
 * */

const SessionStorage = {
  install (Vue, options = {}) {
    const _options = Object.assign({}, options, {
      storage: options.storage || 'session',
      name: options.name || 'ss'
    })

    Storage.install(Vue, _options)
  }
}

Vue.use(Storage, { namespace: 'VAPRO__' })
Vue.use(SessionStorage, { namespace: 'VAPRO__' })
