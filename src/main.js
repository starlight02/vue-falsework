import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from './api';
// import '@babel/polyfill';
import np from 'nprogress';
import 'nprogress/nprogress.css';
import './style/reset.css';

Vue.config.productionTip = false;

window.np = np;
window.api = api;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
