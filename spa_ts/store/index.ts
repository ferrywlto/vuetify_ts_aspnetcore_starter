import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './rootState'
import Vue from "vue";
import { profile } from './profile'
import { account } from './account'
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    strict: true,
    //default state of type RootState
    state: {
        version: ''
    },
    modules: { profile, account }
};

export default new Vuex.Store<RootState>(store);