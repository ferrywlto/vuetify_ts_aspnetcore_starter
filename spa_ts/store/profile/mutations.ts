// profile/mutations.ts
import { MutationTree } from 'vuex';
import { ProfileState, User } from './types';

export const mutations: MutationTree<ProfileState> = {
    profileLoaded(state, payload: User) {
        state.error = false;
        // state.user = payload;
        let u: User = {
            firstName: 'first',
            lastName: 'last',
            email: 'email',
            phone: '1234567'
        };
        state.user = u;
    },
    profileError(state) {
        state.error = true;
        state.user = undefined;
    }
};