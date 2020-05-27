import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import api from './plugins/api';
import np from 'nprogress';
import 'nprogress/nprogress.css';
import './style/reset.css';
import { optionalChaining } from './lib/utils';

Vue.config.productionTip = false;

Vue.prototype.$$ = optionalChaining;

window.appVersion = process.env.VUE_APP_VERSION;
window.np = np;
window.api = api;

export default new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
