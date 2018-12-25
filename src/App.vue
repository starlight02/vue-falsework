<template>
    <div id="app">
        <div id="nav">
            <router-link :to="{name:'home'}">Home</router-link>
            |
            <router-link :to="{name:'about'}">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';


    import '../src/style/reset.css';
    import 'nprogress/nprogress.css';

    @Component
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
