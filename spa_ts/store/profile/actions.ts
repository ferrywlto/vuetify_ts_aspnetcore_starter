// profile/actions.ts
import { ActionTree } from 'vuex';

import { ProfileState, User } from './types';
import { RootState } from '../rootState';


export const actions: ActionTree<ProfileState, RootState> = {
    fetchData({ commit }): any {
        // commit('profileLoaded');

    }
};