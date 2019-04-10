<!--单个tab item 组件-->
<script>
    export default {
        name: 'Tab',
        props: {
            index: {
                required: true,
                type: [Number, String]
            },
            label: {
                type: String,
                default: 'tab'
            }
        },
        computed: {
            active() {
                return this.$parent.value === this.index
            }
        },
        mounted() {
            this.$parent.panes.push(this) // 给父组件 添加所有的tabContainers  的内容
        },
        methods: {
            handleClick() {
                this.$parent.onChange(this.index)
            }
        },
        render() {
            const tab = this.$slots.label || <span>{this.label}</span>
            const classNames = {
                tab : true,
                active: this.active
            }
            return (
                <li class={classNames} onClick={this.handleClick}>
                    {tab}
                </li>
            )
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .tab
        list-style none
        line-height 40px
        margin-right 30px
        position relative
        bottom -2px
        cursor pointer
      &.active
        border-bottom 2px solid blue
      &:last-child
        margin-right 0
</style>