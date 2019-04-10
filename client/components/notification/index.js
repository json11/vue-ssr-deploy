/**
 *  封装组件对外暴露的入口
 */
import notify from './function'
import Notification from './notification.vue'

export default (Vue) => {
    Vue.component(Notification.name, Notification)

    Vue.prototype.$notify = notify
}