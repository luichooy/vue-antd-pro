import Vue from 'vue'
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  Radio,
  Layout,
  List,
  LocaleProvider,
  message,
  Menu,
  Modal,
  notification,
  Pagination,
  Popover,
  Row,
  Select,
  Spin,
  Table,
  Transfer,
  TimePicker,
  Tooltip,
  Upload,
  Drawer,
  Skeleton,
  Progress,
  Tag,
  Switch,
  Tabs
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

/* v1.1.3+ registration methods */
Vue.use(Avatar)
Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Radio.Group)
Vue.use(Layout)
Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Transfer)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Skeleton)
Vue.use(Progress)
Vue.use(Tag)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(Tabs.TabPane)
