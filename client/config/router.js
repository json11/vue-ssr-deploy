import Router from 'vue-router';

import routes from './routes';

export default () => {
    return new Router({
        routes,
        mode: 'history',
        // base: '/base/',
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
        scrollBehavior(to, from, savePosition) {
            // console.log(to, from, savePosition);
            if(savePosition) {
                return savePosition
            } else {
                return {x: 0, y: 0}
            }
        },
        // parseQuery(query) { // query 字符串
        //
        // },
        // stringifyQuery(obj) { // query 对象
        //
        // },
        fallback: true, // 如果不支持 history  自动切换成hash
    })
}