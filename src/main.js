import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import api from './plugins/api';
import np from 'nprogress';
import 'nprogress/nprogress.css';
import './style/reset.css';

Vue.config.productionTip = false;

window.np = np;
window.api = api;

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
