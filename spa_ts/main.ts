import 'babel-polyfill'
import Vue from "vue";

Vue.config.devtools = true;

import vueRouter from "./router/index"
import vuexStore from "./store/index"

import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"
Vue.use(Vuetify);

import Main from "./components/Main.vue"
let v = new Vue({
    el: "#app",
    router: vueRouter,
    store: vuexStore,
    render: h => h(Main)
});