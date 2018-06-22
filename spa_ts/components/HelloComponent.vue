<!-- This component demostrates simple interactivity of Vuetify component and routes, you can modify the url in the browser window to see the effect.  -->
<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-jumbotron :gradient="gradient" dark>
                    <v-container fill-height>
                        <v-layout align-center>
                            <v-flex text-xs-center>
                                <h3 class="display-3">Hello{{getGreeting}}</h3>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-jumbotron>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                        name="nameInput"
                        label="Your Name?"
                        single-line
                        solo
                        v-model="helloName"
                        @change="onNameInput($event)"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-layout>
                    <v-flex xs6>
                        <v-btn block class="primary" dark @click="increment">+</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn block class="primary" dark @click="decrement">-</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class HelloComponent extends Vue {
    @Prop() name!: string;
    /*
    https://github.com/vuejs/vue-router/pull/2050
    TODO: change initCount back to number when vue-router has fix
     */
    @Prop() initCount!: string;

    count:number = 0;
    helloName:string = "";
    gradient:string = "to top, #00D9A8, #4D4D4D";
    
    increment() {
        this.count++;
    }
    
    decrement() {
        if (this.count > 1) {
            this.count--;
        }
    }

    onNameInput(e:any): void {
        console.log(e);
    }
    
    created(): void {
        this.count = parseInt(this.initCount);
        this.helloName = this.name;
    }
    
    get getGreeting(): string {
        return Array(this.count + 1).join(" "+this.helloName);
    }
}
</script>

<style scoped>

</style>
