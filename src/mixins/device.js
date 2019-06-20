import { mapState } from 'vuex'
import { DEVICE_TYPE } from '@/utils/device'

export default {
  computed: {
    ...mapState('app', ['device']),
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablat () {
      return this.device === DEVICE_TYPE.TABLET
    },
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    }
  }
}
