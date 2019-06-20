import Vue from 'vue'
import store from './index'
import config from './config'
import {
  SYSTEM_MENU_THEME,
  SYSTEM_COLOR,
  SYSTEM_LAYOUT,
  SYSTEM_CONTENT_WIDTH,
  SYSTEM_FIXED_HEADER,
  SYSTEM_FIXED_SIDERBAR,
  SYSTEM_AUTOHIDE_HEADER,
  SYSTEM_COLORWEAK,
  ACCESS_TOKEN,
  USER,
  MENUS
} from './mutation-types'

const { app, user, permission } = config

export default function initStore () {
  store.commit(
    'app/SET_MENUTHEME',
    Vue.ls.get(SYSTEM_MENU_THEME, app.menuTheme)
  )
  store.commit('app/SET_COLOR', Vue.ls.get(SYSTEM_COLOR, app.color))
  store.commit('app/SET_LAYOUT', Vue.ls.get(SYSTEM_LAYOUT, app.layout))
  store.commit(
    'app/SET_CONTENTWIDTH',
    Vue.ls.get(SYSTEM_CONTENT_WIDTH, app.contentWidth)
  )
  store.commit(
    'app/SET_FIXEDHEADER',
    Vue.ls.get(SYSTEM_FIXED_HEADER, app.fixedHeader)
  )
  store.commit(
    'app/SET_FIXEDSIDERBAR',
    Vue.ls.get(SYSTEM_FIXED_SIDERBAR, app.fixSiderbar)
  )
  store.commit(
    'app/SET_AUTOHIDENHEADER',
    Vue.ls.get(SYSTEM_AUTOHIDE_HEADER, app.autoHideHeader)
  )
  store.commit(
    'app/SET_COLORWEAK',
    Vue.ls.get(SYSTEM_COLORWEAK, app.colorWeak)
  )

  store.commit('user/SET_TOKEN', Vue.ss.get(ACCESS_TOKEN, user.token))
  store.commit('user/SET_USER', Vue.ss.get(USER, user.user))

  store.commit('permission/SET_MENUS', Vue.ss.get(MENUS, permission.menus))

  // store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true));
  //
  // store.commit('TOGGLE_MULTI_TAB', Vue.ls.get(DEFAULT_MULTI_TAB, config.multiTab));

  // last step
}
