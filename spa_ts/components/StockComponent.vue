<template>
    <v-container fluid fill-height grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-select :items="symbols" @change="onCompanyChange" auto single-line hide-details autocomplete
                                  label="Company" prepend-icon="business" return-object
                                  item-text="name" item-value="symbol">
                        </v-select>
                    </v-flex>
                    <v-flex xs6>
                        <v-select :items="range" @change="onRangeChange" auto single-line hide-details
                                  label="Range" prepend-icon="calendar_today" return-object
                                  item-text="text" item-value="value">
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-progress-linear :intermediate="isLoading" :active="isLoading" height="3"></v-progress-linear>
            </v-flex>
            <v-flex xs12 fill-height>
                <canvas ref="canvas" style="position: relative;"></canvas>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import {Chart, ChartData, ChartOptions} from "chart.js"
import axios from "axios";
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class StockComponent extends Vue {

    readonly IEX_API_Prefix:string = "https://api.iextrading.com/1.0";
    //give up on retrieving the whole list, rendering 10000 elements in Vuetify select list will cause browser freeze
    readonly EP_Symbols:string = this.IEX_API_Prefix + "/ref-data/symbols";
    readonly EP_Price:string =  this.IEX_API_Prefix + "/stock/market/batch";
    
    symbols:Array<any> = 
        [{
            "symbol": "AMZN",
            "name": "Amazon.com Inc."
        }, {
            "symbol": "MSFT",
            "name": "Microsoft Corporation"
        }, {
            "symbol": "GOOG",
            "name": "Alphabet Inc."
        }, {
            "symbol": "AAPL",
            "name": "Apple Inc."
        }, {
            "symbol": "FB",
            "name": "Facebook Inc."
        }, {
            "symbol": "ORCL",
            "name": "Oracle Corporation"
        }, {
            "symbol": "HSBC",
            "name": "HSBC Holdings plc."
        }, {
            "symbol": "INTC",
            "name": "Intel Corporation"
        }, {
            "symbol": "AMD",
            "name": "Advanced Micro Devices Inc."
        }];
    range:Array<any> = [{text: "1 Month", value: "1m" }, {text: "3 Months", value: "3m"}, {text: "6 Months", value: "6m"}];

    isLoading:boolean = false;
    companyCode:string = "";
    companyName:string = "";
    periodCode:string = "";
    periodName:string = "";
    chart!:Chart;
    
    rand() : number {
        return Math.floor(Math.random()*255);
    }

    onRangeChange(e:any):void {
        this.periodName = e.text;
        this.periodCode = e.value;
        if (this.periodCode !== "" && this.companyCode !== "") 
            this.plot();
    }
    
    onCompanyChange(e:any):void {
        this.companyName = e.name;
        this.companyCode = e.symbol.toLocaleLowerCase();
        if (this.periodCode !== "" && this.companyCode !== "")
            this.plot();
    }
    
    plot():void {
        this.isLoading = true;
        axios.get(`${this.EP_Price}?symbols=${this.companyCode}&types=chart&range=${this.periodCode}`)
            .then((response)=>{
                console.log(response);
                let resultSet = response.data[this.companyCode.toLocaleUpperCase()].chart;
                let dates = resultSet.map((item:any)=>{return item.date});
                let prices = resultSet.map((item:any)=>{return item.close});
                let colors = new Array(prices.length);
                let borderColors = new Array(prices.length);
                for (let i = 0; i < colors.length; i++) {
                    let r = this.rand();
                    let g = this.rand();
                    let b = this.rand();
                    let c = `rgba(${r},${g},${b}`;
                    colors[i] = `${c}, 0.25)`;
                    borderColors[i] = `${c})`;
                }
                console.log(colors);
                console.log(prices);
                let canvas: any = this.$refs.canvas;
                
                //clear the chart instance before create a new one
                if (this.chart != null)
                    this.chart.destroy();
                
                this.chart = new Chart(
                    canvas.getContext("2d"), {
                        type: "bar",
                        data: {
                            labels: dates,
                            datasets: [{
                                label:"price",
                                data:prices,
                                backgroundColor:colors,
                                borderColor: borderColors,
                                borderWidth:1
                            }]
                        },
                        options: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: `${this.periodName} stock price of ${this.companyName}`
                            }
                        }
                    }
                );
                
                this.isLoading = false;
            })
            .catch((error)=>{
                console.log(error);
                this.isLoading = false;
            });
    }
}
</script>

<style scoped>

</style>