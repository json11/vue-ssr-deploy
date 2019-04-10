import Vuex from 'vuex';

import defaultState from './state/state';

import getters from './getters/getters';

import mutations from './mutations/mutations';

import actions from './actions/actions';

const  isDev = process.env.NODE_ENV === 'development'

export default () => {
    const store= new Vuex.Store({
        strict: isDev, // 这个属性  修改数据源 必须要 用mutations  否则报错  正式环境  不要使用这个属性
        state: defaultState,
        mutations,
        getters,
        actions,
        plugins: [ // 插件会按顺序执行
            (store) => {
                console.log('my vuex plugins',store)
            }
        ],
        modules: {
            a: {
                namespaced: true,
                state: {text:1},
                mutations: {
                    updateText(state, text) {
                        // console.log('state.a', state);

                        state.text = text;
                    }
                },
                getters: {  /// 如果模块下的getterrs  想要取全局的state
                    textPlus(state, getters, rootState) {
                        console.log('state.a', state.text + 1);
                        // return state.text + rootState.count;
                        return state.text + rootState.b.text;
                    }
                },
                actions: {
                    add({state, commit, rootState}) {
                        // commit('updateText', rootState.count);  // 调用的当前命名空间下的方法
                        commit('updateCount',{num: 5}, {root: true} )
                    }
                }
            },
            b: {
                state: {text:2},
                actions: {
                    testAction({commit}) {
                        commit('a/updateText', 'test1 text', {root: true})
                    }
                }
            }
        }
    });

    // return store;

    if (module.hot) {
        module.hot.accept([
            './state/state.js',
            './mutations/mutations.js',
            './getters/getters.js',
            './actions/actions.js'
        ], () => {
            const newState = require('./state/state.js').default
            const newMutations = require('./mutations/mutations.js').default
            const newGetters = require('./getters/getters.js').default
            const newActions = require('./actions/actions.js').default


            /**
             *  只有以下几个模块具有热重载的功能
             */
            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                actions: newActions,
                getters: newGetters
            })
        })
    }


    return store
}