import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let routeList: any[] = [];
const context = require.context(`./modules`, true, /routes\.js$/);
context.keys().forEach(r => {
    const {default: route} = context(r);
    routeList = routeList.concat(route);
});

const router = new Router({
    routes: routeList,
});

export default router;
