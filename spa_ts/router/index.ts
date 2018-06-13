import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import HelloComponent from "../components/HelloComponent.vue"
import iPhoneComponent  from "../components/iPhoneComponent.vue"
import AndroidComponent from "../components/AndroidComponent.vue"
import HistoryComponent from "../components/HistoryComponent.vue"

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' }, //fall-back route. when no route match.
        { path:"/hello/:name/:initCount", name:"hello", component: HelloComponent, props: true},
        { path:"/history/:count", name:"history", component: HistoryComponent, props: true},
        { path:"/iphone", name:"iphone", component: iPhoneComponent},
        { path:"/android", name:"android", component: AndroidComponent}
    ]
});