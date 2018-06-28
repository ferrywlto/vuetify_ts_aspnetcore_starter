<template>
    <v-container fluid fill-height align-top>
        <v-layout row align-top>
            <v-flex>
                <v-jumbotron>
                    How many $ will I get form your donation via PayPal?<br>
                    PayPal has a fee for each transaction made.<br>
                    Enter the value you want to sponsor and see the value you actually need to donate:<br>
                    Target Amount (HKD): <v-text-field @change="onTargetChanged" :value="this.targetAmount" mask="#####" prefix="$"></v-text-field><br>
                    Actual Amount Required: ${{this.actualAmount}}
                </v-jumbotron>
            </v-flex>        
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class DonateView extends Vue {
        @Prop() amount!:string;
        
        readonly cost_percent:number = 0.039;
        readonly cost_fixed:number = 2.35;
        
        targetAmount:number = 0;
        actualAmount:string = "";
        
        created() {
            console.log("prop:"+this.amount);
            this.targetAmount = parseInt(this.amount);
            this.actualAmount = this.getActualAmount();
        }
        
        getActualAmount(): string {
            return ((this.targetAmount + this.cost_fixed)/(1-this.cost_percent)).toFixed(2);
        }
        
        onTargetChanged(e:any) {
            this.targetAmount = parseInt(e);
            this.actualAmount = this.getActualAmount();
        }
    }
</script>

<style scoped>

</style>