import { CarbonIntensityRecord } from "../types/carbonIntensityRecord";

export default class APIHelper 
{
    baseURL: string | undefined;

    public constructor()
    {   
        this.baseURL = process.env.REACT_APP_API_URL;
    }

    public async getAllCarbonIntensityRecords()
    {
        const url = this.baseURL + "/getAllCarbonIntensityRecords";
        const response = await fetch(url);
        const results: CarbonIntensityRecord[] = await response.json();
        return results
    }

    public async getCarbonIntensityRecordById(id: number)
    {
        const url = this.baseURL + "/getCarbonIntensityRecordById";
        const response = await fetch(url);
        const results: CarbonIntensityRecord = await response.json();
        return results
    }
}