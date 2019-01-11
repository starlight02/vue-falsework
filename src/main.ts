import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
// import '@babel/polyfill';
import apis, { Apis } from './apis';
import np from 'nprogress';
import 'nprogress/nprogress.css';
// import Socket from '@/lib/Socket';

declare global {
    interface Window {
        np: typeof np;
        api: Apis;
    }
}

const Mock = require('mockjs');
const data = Mock.mock('', {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [
        {
            'id|+1': 1,
        },
    ],
});

// const socket = new Socket();

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
    console.error(vm);
    console.error(err);
};

window.np = np;
window.api = apis;

Vue.prototype.$api = apis;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
