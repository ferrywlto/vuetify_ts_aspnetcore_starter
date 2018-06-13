<template>
    <v-container fluid fill-height>
        <v-layout pa-5>
            <v-flex xs12>
                <v-data-table
                        :headers="headers"
                        :items="carparkVacancies"
                        :loading="isLoading"
                        class="elevation-1"
                >
                    <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item._id }}</td>
                        <td class="text-xs-left"><v-icon>{{selectIcon(props.item.closed) }}</v-icon></td>
                        <td class="text-xs-left">{{ parseDate(props.item.lastUploadDate) }}</td>
                        <td class="text-xs-left">{{ checkValue(props.item.privateCar) }}</td>
                        <td class="text-xs-left">{{ checkValue(props.item.motorcycle) }}</td>
                        <td class="text-xs-left">{{ checkValue(props.item.HGV) }}</td>
                        <td class="text-xs-left">{{ checkValue(props.item.LGV) }}</td>
                        <td class="text-xs-left">{{ checkValue(props.item.coach) }}</td>
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
import axios from "axios";
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class AndroidComponent extends Vue {
    //This component shows how to call external services
    //Real-time carpark vacancies in Kowloon East
    //https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkVacanciesWorld

    headers = [{
        text: "Id",
        align: "left",
        sortable: false,
        value: "_id"
    },{
        text: "Closed",
        align: "left",
        sortable: false,
        value: "closed"
    },{
        text: "Last Update",
        align: "left",
        sortable: false,
        value: "lastUploadDate"
    },{
        text: "Private Car",
        align: "left",
        sortable: true,
        value: "privateCarVacancy"
    },{
        text: "Motorcycle",
        align: "left",
        sortable: true,
        value: "motorcycleVacancy"
    },{
        text: "HGV",
        align: "left",
        sortable: true,
        value: "hgvVacancy"
    },{
        text: "LGV",
        align: "left",
        sortable: true,
        value: "lgvVacancy"
    },{
        text: "Coach",
        align: "left",
        sortable: true,
        value: "coachVacancy"
    }];
    
    carparkVacancies:any = [];
    isLoading:boolean = true;
    
    selectIcon(value:string): string {
        let bool = value === "true";
        if (bool)
            return "check";
        else
            return "close";
    }
    
    parseDate(value:string): string {
        let d:Date = new Date(value);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
    
    checkValue(value:any): number {
        if (value)
            return value.vacancy;
        else 
            return 0;
    }
    created() {
        axios.get("https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkVacancies")
            .then((response)=>{
                console.log(response.data);
                this.carparkVacancies = response.data.results;
                this.isLoading = false;
            })
            .catch((error)=>{
                console.log("error occurred when trying to load url: "+error);
                this.isLoading = false;
            });
    }
}
</script>

<style scoped>

</style>