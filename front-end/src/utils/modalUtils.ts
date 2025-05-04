import { CarbonIntensityRecord } from "../types/carbonIntensityRecord";

export function getISOStringWithoutSecsAndMillisecs(date: Date) {
    const dateAndTime = date.toISOString().split('T')
    const time = dateAndTime[1].split(':')
    return dateAndTime[0]+'T'+time[0]+':'+time[1]+'Z'
}

export const validateNumericInput = (value:string) => {
    return /^\d+\.\d+$/.test(value) || /^\d+$/.test(value) || value === "";
}

export const calculateTotal = (record: CarbonIntensityRecord) => {
    return parseFloat((record.gas + record.coal + record.biomass + record.nuclear + 
                        record.hydro + record.imports + record.wind + record.solar + record.other).toFixed(1));
};