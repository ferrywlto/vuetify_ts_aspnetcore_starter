<!-- This component shows how to use client-side persistence storage, history stored will persist even browser has been closed -->
<template>
    <v-container fluid fill-height>
        <v-layout pa-5>
            <v-flex xs12>
                <v-data-table
                        :headers="headers"
                        :items="history"
                        hide-actions
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.date }}</td>
                        <td class="text-xs-right">{{ props.item.action }}</td>
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Action, Getter, State} from 'vuex-class';
import {DemoState, DemoHistory} from "../store/demo";

const demo_namespace: string = 'demo';
@Component
export default class HistoryComponent extends Vue {
    @Getter("getHistory", { namespace: demo_namespace }) getHistory!:DemoHistory[];
    @Prop({default: 10}) count!:number;
    
    headers = [{
        text: 'Timestamp',
        align: 'left',
        sortable: true,
        value: 'date'
    },{
        text: 'Action',
        align: 'left',
        sortable: false,
        value: 'action'
    }];
    history!: DemoHistory[];
    
    created() {
        this.history = this.getHistory.slice(0, this.count);
    }
}
</script>

<style scoped>

</style>