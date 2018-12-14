import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';

Vue.use(Router);

let routeList: RouteConfig[] = [];
const context = require.context(`./modules`, true, /routes\.js$/);
context.keys().forEach(r => {
    const {default: route} = context(r);
    routeList = routeList.concat(route);
});

routeList.push({path: '/', redirect: {name: 'home'}});
const router = new Router({
    routes: routeList,
});

export default router;
