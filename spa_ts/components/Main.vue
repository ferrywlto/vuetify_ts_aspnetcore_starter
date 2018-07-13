<!-- This is the UI entry point of the app -->
<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" temporary app>
            <v-list>
                <v-list-tile @click="onHelloClicked">
                    <v-list-tile-action>
                        <v-icon>insert_emoticon</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Hello</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onStockClicked">
                    <v-list-tile-action>
                        <v-icon>bar_chart</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Stock Price</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="onCarParkClicked">
                    <v-list-tile-action>
                        <v-icon>directions_car</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Car Park</v-list-tile-title>
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
                <v-list-tile @click="onDonateClicked">
                    <v-list-tile-action>
                        <v-icon>money</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Donation Calculator</v-list-tile-title>
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
        <!-- Only content in this tag will change when navigate between routes -->
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
                <span><v-icon>build</v-icon> Created by <a href="https://github.com/ferrywlto" target="_blank">Ferry To</a> &copy{{new Date().getFullYear()}} <v-icon>sentiment_satisfied_alt</v-icon></span>               
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
        
        get StockViewName():string {return "stock"};
        get CarParkViewName():string {return "carpark"};
        
        drawer:boolean = false;
        currentDateTimeString:string = this.getDateTimeString();
        
        toggleDrawer() {
            this.drawer = !this.drawer;
        }

        onStockClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: this.StockViewName
            };
            
            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:this.StockViewName })
        }

        onCarParkClicked() {
            let history:DemoHistory = {
                date: new Date(),
                action: this.CarParkViewName
            };

            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ name:this.CarParkViewName })
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
            this.$router.push({ path:"/history/100" });         
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

        onDonateClicked(){
            let history:DemoHistory = {
                date: new Date(),
                action: "donate"
            };

            this.saveHistory(history)
                .then(()=>{
                    console.log("save history succeed");
                })
                .catch((error:Error)=>{
                    console.log("save history failed: "+error);
                });
            this.$router.push({ path:"/donate/1" });
        }
        
        mounted(): void {
            console.log("main created");
            this.initDemo("init")
                .then(()=>{
                    console.log("init success");
                })
                .catch((error:Error)=>{
                    console.log(error);
                });
            this.startBackgroundWork();
        }
        
        //Demo how to make something that keeps running
        startBackgroundWork() {
            setInterval(() => {
                this.currentDateTimeString = this.getDateTimeString();
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