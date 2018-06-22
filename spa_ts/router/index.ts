import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import HelloComponent from "../components/HelloComponent.vue"
import StockComponent  from "../components/StockComponent.vue"
import CarParkComponent from "../components/CarParkComponent.vue"
import HistoryComponent from "../components/HistoryComponent.vue"

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' }, //fall-back route. when no route match.
        { path:"/hello/:name/:initCount", name:"hello", component: HelloComponent, props: true},
        { path:"/history/:count", name:"history", component: HistoryComponent, props: true},
        { path:"/stock", name:"stock", component: StockComponent},
        { path:"/carpark", name:"carpark", component: CarParkComponent}
    ]
});