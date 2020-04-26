import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routeList = [];
const context = require.context('../modules', true, /routes\.js$/);
context.keys().forEach(r => {
    const { default: routes } = context(r);
    routeList = routeList.concat(routes);
});
routeList.push({ path: '/', redirect: { name: 'home' } });


const router = new Router({
    mode: 'history',
    routes: routeList
});

router.beforeEach((to, from, next) => {
    window.np.start();
    next();
});

router.afterEach(() => {
    window.np.done();
});

export default router;
