<template>
    <div class="home">
        <img alt="Vue logo" src="../../../assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Provide, Vue } from 'vue-property-decorator';

    import HelloWorld from '../../../components/HelloWorld.vue';

    @Component({
        components: {
            HelloWorld,
        },
        beforeRouteEnter(to, from, next: any) {
            next((vm: Home) => {
                vm.getTestData();
            });
        },
    })
    export default class Home extends Vue {
        //data
        @Provide() private message: string = '';

        //computed
        get message1() {
            return '';
        }

        //prop
        @Prop({type: [String, Number], default: 'ni hao'}) private message3!: string | number;

        //methods
        getTestData(): void {
            this.$apis.getTest({userId: 1, id: 2}, {name: 'Tom'})
            .then((data: object) => {
                console.log(data);
            })
            .catch((e: any) => {
                Promise.reject(e);
            });
        }

        mounted() {
            console.log(this.message);
        }
    }
</script>
