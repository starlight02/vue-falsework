import Vue from 'vue';
import Component from 'vue-class-component';
import Router, { RouteConfig } from 'vue-router';

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
]);

Vue.use(Router);

let routeList: RouteConfig[] = [];
const context = require.context(`./modules`, true, /routes\.js$/);
context.keys().forEach(r => {
    const {default: routes} = context(r);
    routeList = routeList.concat(routes);
});

routeList.push({path: '/', redirect: {name: 'home'}});
const router = new Router({
    mode: 'history',
    routes: routeList,
});

router.beforeEach((to, from, next) => {
    // np.start();
    next();
});

router.beforeResolve((to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    // np.done();
});

export default router;
