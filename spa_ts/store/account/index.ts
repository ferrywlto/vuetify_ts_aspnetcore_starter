import {GetterTree, ActionTree, MutationTree, Module} from 'vuex';
import {RootState} from "../rootState";
export interface UserState {
    login: string;
    password: string;
    token: string;
    viewClaims: Array<string>;
    isLoggedIn: boolean;
    expires: number; // in Unix Epoch Time format, number of seconds from 1970/01/01
}

export interface LoginState {
    Username: string,
    Password: string
}

export interface TokenResult {
    token: string,
    expires: number
}

const urlHost:string = "http://localhost:5004";
const urlLogin:string = `${urlHost}/Jwt/Grant`;
const urlLogout:string  = `${urlHost}/Jwt/Logout`;
const urlRefresh:string = `${urlHost}/Jwt/Refresh`;

const getters = <GetterTree<UserState, RootState>> {
};

const actions: ActionTree<UserState, RootState> = {
    init({commit}) {
        console.log("store:account | action:init");
        commit("init");
    },
    // { commit, state } <- ES2015 binding $store object's commit & state property with Destructuring Assignment
    login({ commit, state }, credentials:LoginState ){
        console.log("store: account | action:login");
        console.log(`POST ${urlLogin}`);


    },
    logout({ commit, state }) {
        console.log("store:account | action:logout");
        console.log(`GET ${urlLogout}`);


    },
    refresh({ commit, state }) {
        console.log("store:account | action:refresh");
        console.log(`GET ${urlRefresh}`);


    }
};

export const mutations: MutationTree<UserState> = {
    init(state) {
        console.log("store:account | mutation:init");
        let token = localStorage.getItem('jwt');
        console.log("tokenFound? "+!!token);

    },
    login(state, payload: TokenResult) {
        console.log(`store:account | mutation:loginSuccess | payload.token = ${payload.token}`);
        state.token = payload.token;
        state.expires = payload.expires;

    },
    logout(state) {
        console.log("store:account | mutation:logoutSuccess");
        state.login = "";
        state.password = "";
        state.token = "";
        state.viewClaims = [];
        state.expires = 0;
        localStorage.removeItem('jwt');
    },
    refresh(state, payload: TokenResult) {
        console.log(`store:account | mutation:refreshTokenSuccess | payload.token = ${payload.token}`);
        state.token = payload.token;
        state.expires = payload.expires;
        localStorage.setItem('jwt', payload.token);
    }
};

const initState: UserState = {
    login: "",
    password: "",
    token: "",
    viewClaims: [],
    expires: 0,
    isLoggedIn: false
};

export const account: Module<UserState, RootState> = {
    namespaced: true,
    state: initState,
    getters,
    actions,
    mutations
};