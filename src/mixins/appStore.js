import { mapState, mapActions } from 'vuex'

const appStore = {
  computed: {
    ...mapState('app', {
      device: state => state.device,
      menuTheme: state => state.menuTheme,
      defaultColor: state => state.color,
      layoutMode: state => state.layout,
      contentWidth: state => state.contentWidth,
      fixedHeader: state => state.fixedHeader,
      fixedSiderbar: state => state.fixedSiderbar,
      autoHideHeader: state => state.autoHideHeader,
      colorWeak: state => state.colorWeak
    })
  },
  methods: {
    ...mapActions('app', [
      'set_menuTheme',
      'set_color',
      'set_layout',
      'set_contentWidth',
      'set_fixedHeader',
      'set_fixedSiderbar',
      'set_autoHideHeader',
      'set_colorWeak'
    ])
  }
}

export default appStore
