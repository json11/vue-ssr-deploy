<script>
    import TabContainer from './tab-container.vue'

    export default {
        name: 'Tabs',
        props: {
            value: {  // 通过value  来控制显示哪个tab 选中
                type: [String, Number],
                required: true
            }
        },
        components: {
            TabContainer
        },
        data() {
            return {
                panes : [] // 所有tab 内容
            }
        },
        methods: {
            onChange(index) {
                this.$emit('change', index)
            }
        },
        render() {
            return (
                <div class="tabs">
                    <ul class="tabs-header">
                        {this.$slots.default}
                    </ul>
                    <tab-container panes = {this.panes}></tab-container>
                </div>
            )
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .tabs-header
        display flex
        list-style none
        margin 0
        padding 0
        border-bottom 2px solid #ededed
</style>