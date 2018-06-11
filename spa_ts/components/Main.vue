<template>
    <v-app>
        <!--<v-navigation-drawer app></v-navigation-drawer>-->
        <!--<v-toolbar app></v-toolbar>-->
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
        <!--<v-footer app></v-footer>-->
    </v-app>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action, Getter, State} from 'vuex-class';

    import {UserState} from "../store/account";


    const account_namespace: string = 'account';

    @Component
    export default class Main extends Vue {
        @State(account_namespace) userState!: UserState;
        @Action('init', { namespace: account_namespace }) initAuth: any;

        created(): void {
            console.log('created');

            // this.$router.push({ name:'hello', params: {name:'world3', initialEnthusiasm:'8' }})
        }
    }
</script>

<style scoped>

</style>