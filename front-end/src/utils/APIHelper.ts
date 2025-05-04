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

    public async deleteCarbonIntensityRecord(id: number)
    {
        const url = this.baseURL + "/deleteCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"id":id})
        });
        return response.status === 200;
    }

    public async updateCarbonIntensityRecords(record: CarbonIntensityRecord)
    {
        const url = this.baseURL + "/updateCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }

    public async addCarbonIntensityRecords(record: CarbonIntensityRecord)
    {
        const url = this.baseURL + "/addCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }
}