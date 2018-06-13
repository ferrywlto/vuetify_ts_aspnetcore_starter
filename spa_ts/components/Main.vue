<template>
    <v-app>
        <v-navigation-drawer class="primary" v-model="drawer" dark temporary app>
            <v-list>
                <v-list-tile @click="onHelloClicked">
                    <v-list-tile-action>
                        <v-icon>insert_emoticon</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Hello</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="oniPhoneClicked">
                    <v-list-tile-action>
                        <v-icon>phone_iphone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>iPhone</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onAndroidClicked">
                    <v-list-tile-action>
                        <v-icon>android</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Android</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onHistoryClicked">
                    <v-list-tile-action>
                        <v-icon>history</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>History</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="secondary" dark app>
            <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{currentDateTimeString}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- Add any logic on the icon buttons as you like -->
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app>
            <v-layout justify-center align-center px-5>
                <span>Powered by Vue + Vuetify + ASP.NET Core</span>
                <v-spacer></v-spacer>
                <span>Please feel free to customize and build your awesome app from this starter template. <v-icon>favorite</v-icon></span>
                <v-spacer></v-spacer>
                <span><v-icon>build</v-icon> Create by Ferry To &copy{{new Date().getFullYear()}} <v-icon>sentiment_satisfied_alt</v-icon></span>               
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action, Getter, State} from 'vuex-class';

    import {DemoState, DemoHistory} from "../store/demo";

    const demo_namespace: string = 'demo';

    @Component
    export default class Main extends Vue {
        @State(demo_namespace) demoState!: DemoState;
        @Action("init", { namespace: demo_namespace }) initDemo: any;
        @Action("saveHistory", { namespace: demo_namespace }) saveHistory: any;
        
        get iPhone():string {return "iphone"};
        get Android():string {return "android"};
        
        drawer:boolean = false;
        currentDateTimeString:string = this.getDateTimeString();
        
        toggleDrawer() {
            this.drawer = !this.drawer;
        }
        
        oniPhoneClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: this.iPhone
            };
            
            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:this.iPhone })
        }

        onAndroidClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: this.Android
            };

            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:this.Android })
        }
        
        onHistoryClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: "history"
            };

            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:"history" });         
        }
        
        onHelloClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: "hello"
            };

            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:"hello", params: { name: "World", initCount:"1" }});
        }
        
        created(): void {
            console.log("main created");
            this.initDemo("init")
                .then(()=>{
                    console.log("init success");
                })
                .catch((error:Error)=>{
                    console.log(error);
                });
            this.startBackgroundWork();
            /*
            due to vue-router issue, all params must be in type string.
            https://github.com/vuejs/vue-router/pull/2050
             */
            this.$router.push({ name:"hello", params:{ name: "World", initCount: "8"} })
        }
        
        startBackgroundWork() {
            setTimeout(() => {
                this.currentDateTimeString = this.getDateTimeString();
                this.startBackgroundWork();
            }, 1000);
        }
        
        getDateTimeString(): string {
            let date = new Date();
            return "Current Date Time: " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
    }
</script>

<style scoped>

</style>