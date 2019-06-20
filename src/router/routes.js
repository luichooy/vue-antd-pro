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
      // {
      //   path: 'form',
      //   name: 'waybill',
      //   meta: {
      //     title: '申报管理',
      //     icon: 'project'
      //   },
      //   component: ViewLayout,
      //   children: [
      //     {
      //       path: 'upload',
      //       name: 'waybill_upload',
      //       meta: {
      //         title: '运单上传管理'
      //       },
      //       component: () => import('@/views/waybill/upload')
      //     },
      //     {
      //       path: 'apply',
      //       name: 'waybill_apply',
      //       meta: {
      //         title: '运单申报管理'
      //       },
      //       component: () => import('@/views/waybill/apply')
      //     }
      //   ]
      // },
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
            name: 'statistic_analysis',
            meta: {
              title: '分析页'
            },
            component: () =>
              import(
                /* webpackChunkName: "analysis" */ '@/views/dashboard/analysis'
              )
          },
          {
            path: 'monitor',
            name: 'statistic_monitor',
            meta: {
              title: '监控页'
            },
            component: () =>
              import(
                /* webpackChunkName: "monitor" */ '@/views/dashboard/monitor'
              )
          }
        ]
      }
    ]
  }
]

const routes = [...otherRoutes, ...appRoutes]

export default routes
