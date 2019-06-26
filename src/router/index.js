import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import routes from './routes'
import { ACCESS_TOKEN } from '@/store/mutation-types'

Vue.use(Router)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', '404'] // no redirect whitelist

export const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

const router = createRouter()

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = Vue.ss.get(ACCESS_TOKEN)
  if (token) {
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
