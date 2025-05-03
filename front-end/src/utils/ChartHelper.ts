import { CarbonIntensityRecord } from "../types/carbonIntensityRecord"

export const generateChartData = (records:CarbonIntensityRecord[]) => 
{
    const labels = records.map((x => x.from))
    const data = {
        labels: labels,
        datasets: [
            {
                label:"Intensity Forecast",
                data: records.map((x => x.intensity_forecast)),
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            },
            {
                label:"Intensity Actual",
                data: records.map((x => x.intensity_actual)),
                fill: false,
                borderColor: 'red',
                tension: 0.1
            },
            {
                label:"Gas",
                data: records.map((x => x.gas)),
                fill: false,
                borderColor: 'yellow',
                tension: 0.1
            },
            {
                label:"Coal",
                data: records.map((x => x.coal)),
                fill: false,
                borderColor: 'black',
                tension: 0.1
            },
            {
                label:"BioMass",
                data: records.map((x => x.biomass)),
                fill: false,
                borderColor: 'green',
                tension: 0.1
            },
            {
                label:"Nuclear",
                data: records.map((x => x.nuclear)),
                fill: false,
                borderColor: 'lime',
                tension: 0.1
            },
            {
                label:"Hydro",
                data: records.map((x => x.hydro)),
                fill: false,
                borderColor: 'cyan',
                tension: 0.1
            },
            {
                label:"Imports",
                data: records.map((x => x.imports)),
                fill: false,
                borderColor: 'purple',
                tension: 0.1
            },
            {
                label:"wind",
                data: records.map((x => x.wind)),
                fill: false,
                borderColor: 'grey',
                tension: 0.1
            },
            {
                label:"Solar",
                data: records.map((x => x.solar)),
                fill: false,
                borderColor: 'orange',
                tension: 0.1
            },
            {
                label:"Other",
                data: records.map((x => x.other)),
                fill: false,
                borderColor: 'pink',
                tension: 0.1
            },
            {
                label:"total",
                data: records.map((x => x.total)),
                fill: false,
                borderColor: 'grey',
                tension: 0.1
            },
        ]
    };
    return data;
}