import createApp from './create-app'

import bus from './util/bus'

const {app, router, store} = createApp()

if(window.__INITIAL__STATE__) {
    store.replaceState(window.__INITIAL__STATE__)
}

bus.$on('auth', () => {
    router.push('/login')
})

router.onReady( () => {
    app.$mount('#root')
})