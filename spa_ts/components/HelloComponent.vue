<template>
    <div>
        <div class="greeting">Hello{{getGreeting}}</div>
        <v-btn class="primary" dark @click="decrement">-</v-btn>
        <v-btn class="primary" dark @click="increment">+</v-btn>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class HelloComponent extends Vue {
    @Prop() name!: string;
    @Prop() initCount!: string;

    count:number = 0;

    increment() {
        this.count++;
    }
    
    decrement() {
        if (this.count > 1) {
            this.count--;
        }
    }

    created(): void {
        this.count = parseInt(this.initCount);
    }
    
    get getGreeting(): string {
        return Array(this.count + 1).join(" "+this.name);
    }
}
</script>

<style scoped>

</style>
