<template>
    <div class="home">
        <img alt="Vue logo" src="../../../assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import HelloWorld from '../../../components/HelloWorld.vue';

    @Component({
        components: {
            HelloWorld,
        },
        methods: {
            getTestData() {
                this.$apis.getTest({userId: 1, id: 2}, {name: 'Tom'}).then((data: any) => {
                    console.log(data);
                }).catch((e: any) => {
                    Promise.reject(e);
                });
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getTestData();
            });
        }
    })
    export default class Home extends Vue {
    }
</script>
