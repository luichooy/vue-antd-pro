import { AppLayout, ViewLayout } from '@/components/Layout'

const otherRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/auth/login')
  },
  {
    path: '/error',
    name: 'error',
    redirect: '404',
    component: ViewLayout,
    children: [
      {
        path: '404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "404" */ '@/views/error/404')
      }
    ]
  }
]

export const appRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard/analysis',
    component: AppLayout,
    children: [
      {
        path: 'table',
        name: 'table',
        meta: {
          title: '表格页',
          icon: 'table'
        },
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/table')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        },
        component: ViewLayout,
        children: [
          {
            path: 'analysis',
            name: 'dashboard_analysis',
            meta: {
              title: '分析页'
            },
            component: () => import(/* webpackChunkName: "analysis" */ '@/views/dashboard/analysis')
          },
          {
            path: 'monitor',
            name: 'dashboard_monitor',
            meta: {
              title: '监控页'
            },
            component: () => import(/* webpackChunkName: "monitor" */ '@/views/dashboard/monitor')
          }
        ]
      }
    ]
  }
]

const routes = [...otherRoutes, ...appRoutes]

export default routes
