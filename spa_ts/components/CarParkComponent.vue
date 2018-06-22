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
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left"><v-icon @click="openUrl(parseCoordLink(props.item.coord))">place</v-icon></td>
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
import * as _ from "lodash"
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class CarParkComponent extends Vue {
    //This component shows how to call external services and the use of Vuetify data-table
    //Real-time carpark vacancies in Kowloon East
    //https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkVacanciesWorld

    headers = [{
        text: "Id",
        align: "left",
        sortable: false,
        value: "id"
    },{
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
    },{
        text: "Location",
        align: "left",
        sortable: false,
        value: "loc"
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
    
    carparkVacancies:Array<any> = [];
    isLoading:boolean = true;
    
    selectIcon(value:string): string {
        let bool = value === "true";
        if (bool)
            return "check";
        else
            return "close";
    }
    
    openUrl(url:string): void {
        window.open(url, "_blank");
    }
    
    parseCoordLink(value:Array<number>): string {
        return "http://maps.google.com/maps?q="+value[1]+","+value[0];
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
                let transformed1:any = _.keyBy(response.data.results, function (item:any) {
                    return item._id;
                });
                
                axios.get("https://sps-opendata.pilotsmartke.gov.hk/rest/getCarparkInfos?lang=zh_TW&fullload=true")
                    .then((response)=>{
                        let transformed2:any = _.keyBy(response.data.results, function (item:any) {
                            return item._id;
                        });
                        for(let i in transformed1){
                            transformed1[i].name = transformed2[i].name;
                            transformed1[i].coord = transformed2[i].coordinates;
                            this.carparkVacancies.push(transformed1[i]);
                        }
                        console.log("carparkVacancies:", this.carparkVacancies);
                        this.isLoading = false;
                    })
                    .catch((error)=>{
                        this.isLoading = false;
                    });
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