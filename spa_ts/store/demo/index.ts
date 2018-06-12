import {GetterTree, ActionTree, MutationTree, Module} from 'vuex';
import {RootState} from "../rootState";

export interface DemoState {
    history: DemoHistory[];
}

export interface DemoHistory {
    date: Date;
    action: string;
}

const getters = <GetterTree<DemoState, RootState>> {
    getHistory(state): DemoHistory[] {
        return state.history;
    }
};

const actions: ActionTree<DemoState, RootState> = {
    // { commit, state } <- ES2015 binding $store object's commit & state property with Destructuring Assignment
    saveHistory({commit, state}, history:DemoHistory) {
        commit("history", history);
    },
    init({commit}) {
        commit("init");
    }
};

export const mutations: MutationTree<DemoState> = {
    init(state) {
        let history = localStorage.getItem("history");
        if (history) {
            state.history = JSON.parse(history);
        }
    },
    history(state, history:DemoHistory) {
        state.history.push(history);
        localStorage.setItem('history', JSON.stringify(state.history));
    }
};

const initState: DemoState = {
    history: []
};

export const demo: Module<DemoState, RootState> = {
    namespaced: true,
    state: initState,
    getters,
    actions,
    mutations
};