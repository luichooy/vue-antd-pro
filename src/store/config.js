export default {
  app: {
    menuTheme: 'dark', // theme for nav menu
    color: '#1890FF', // primary color of ant design
    layout: 'side', // nav menu position: sidemenu or topmenu
    contentWidth: 'fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: true, // sticky header
    fixSiderbar: true, // sticky siderbar
    autoHideHeader: false, //  auto hide header
    colorWeak: false,
    multiTab: false
  },

  user: {
    token: '',
    user: null,
    routes: null
  },

  permission: {
    menus: null
  }
}
