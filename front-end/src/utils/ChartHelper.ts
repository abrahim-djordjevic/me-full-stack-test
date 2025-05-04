import { Tooltip } from "chart.js";
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
            }
        ],
    };
    return data;
}

export const generatePieChartData = (record:CarbonIntensityRecord) => {
    const labels = [
        'Gas',
        'Coal',
        'Biomass',
        'Nuclear',
        'Hydro',
        'Imports',
        'Wind',
        'Solar',
        'Other'
    ]

    const data = {
        labels: labels,
        datasets: [{
            label: `Percentage of total fuel mix `,
            data: [record.gas, record.coal, record.biomass, record.nuclear, record.hydro, record.imports, record.wind, record.solar, record.other],
            backgroundColor: [
                'rgb(211, 211, 211)',
                'rgb(0, 0, 0)',
                'rgb(3, 87, 45)',
                'rgb(0, 240, 60)',
                'rgb(84, 157, 241)',
                'rgb(255, 100, 0)',
                'rgb(200, 228, 77)',
                'rgb(216, 130, 17)',
                'rgb(161, 33, 33)',
            ],
            hoverOffset:4
        }],
    }

    return data;
}

export const getChartOptions = () => {
    return {
        responsive: true,
        maintainAspectRatio: false
    }
};