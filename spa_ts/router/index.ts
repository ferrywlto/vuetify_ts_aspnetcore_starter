import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import HelloComponent from "../components/HelloComponent.vue"

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' }, //fall-back route. when no route match.
        { path:"/:name/:initCount", name:"hello", component: HelloComponent, props: true}
        // { path: '/hello/:name/:initialEnthusiasm', component: HelloComponent, props: true }
        // { path: '/menu', name:'menu', component: MenuView }
    ]
});