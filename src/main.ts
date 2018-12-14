import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
// import '@babel/polyfill';
import apis from './apis';

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
    console.error(vm);
    console.error(err);
};

Vue.prototype.$apis = apis;


new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
