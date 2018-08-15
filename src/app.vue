<template>
    <div id="app">
        <div id="cover"></div>
        <my-header></my-header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
import MyHeader from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
    components: {
        MyHeader,
        Footer,
        Todo
    }
}
</script>

<!--注明语言，scoped样式旨在该组件使用-->
<style lang="stylus" scoped>
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
</style>
