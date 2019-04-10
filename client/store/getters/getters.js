/**
 * 由于后台给的数据并不是直接可以用的  需要处理下
 * 这里统一处理 相当于 computed  周期
 */
export default {
    fullName(state) {
        return `${state.firstName}12312 ${state.lastName}`
    }
}