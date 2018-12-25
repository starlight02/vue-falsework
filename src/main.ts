import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
// import '@babel/polyfill';
import apis from './apis';

// const Mock = require('mockjs');
// const data = Mock.mock('sdfsa', {
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [
//         {
//             'id|+1': 1,
//         },
//     ],
// });

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
    console.error(vm);
    console.error(err);
};

Vue.prototype.$apis = apis;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
