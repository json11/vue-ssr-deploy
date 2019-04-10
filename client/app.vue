<template>
  <div id="app">
    <div id="cover"></div>
    <div id="loading" v-show="loading">
      <loading></loading>
    </div>
    <Header></Header>

    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <button @click="notify">click me</button>
    <!--<notification content="test notify"/>-->
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'
  import loading from './components/loading/loading.vue'

  import {mapState} from 'vuex'

  export default {
      metaInfo: {
        title: 'json\'s todo app'
      },
    components: {
      Header,
      Footer,
      Todo,
        loading
    },
      computed: {
          ...mapState(['loading'])
      },
      mounted() {

      },
      methods: {
          notify() {
              this.$notify({
                  content: 'test $notify111',
                  btn: 'close'
              })
          }
      }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>


