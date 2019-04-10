import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Meta from 'vue-meta'

import App from './app.vue'

import createRouter from './config/router'
import createStore from './store/store'
import notification from './components/notification/index'
import Tabs from './components/tabs/index'


import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(notification)
Vue.use(Tabs)


/// 导出一个函数 确保每次调用 都不一样 排除缓存 造成的影响
export default () => {
    const router = new createRouter()
    const store= new createStore()


    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return  {app, router, store}
}