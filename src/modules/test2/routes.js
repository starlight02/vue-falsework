const about = () => import(/* webpackChunkName: "about" */ '../../views/About.vue');

export default [
    {
        path: '/about',
        name: 'about',
        component: about,
    },
];
