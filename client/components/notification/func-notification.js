/**
 *   组件属性增强
 */
import Notification from './notification.vue'

export default {
    extends: Notification,
    data() {
        return {
            verticalOffset: 0,
            autoClose: 3000,
            height: 0,
            visible: false
        }
    },
    computed: {
        style() {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    mounted() {
        /// 组件刚吊起 就设置延时时间 自动销毁
        this.createTimer()
    },
    methods: {
        createTimer() {
            if(this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer() {
            if(this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter() {
            this.height= this.$el.offsetHeight
        }
    },
    beforeDestory() {
        this.clearTimer()
    }
}