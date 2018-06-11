import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// import HelloComponent from "../components/HelloComponent.vue"

export default new VueRouter({
    mode: 'history',
    routes: [
        // { path: '/login', name:'login', component: LoginView, props: true},
        // { path: '/hello', name:'hello', component: HelloComponent, props: true }
        // { path: '/menu', name:'menu', component: MenuView }
    ]
});