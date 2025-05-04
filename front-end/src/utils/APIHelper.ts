import { CarbonIntensityRecord } from "../types/carbonIntensityRecord";
import { User } from "../types/user";

export default class APIHelper 
{
    baseURL: string | undefined;

    public constructor()
    {   
        this.baseURL = process.env.REACT_APP_API_URL;
    }

    public async getAllCarbonIntensityRecords()
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/getAllCarbonIntensityRecords";
        const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: CarbonIntensityRecord[] = await response.json();
        return results
    }

    public async getCarbonIntensityRecordById(id: number)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/getCarbonIntensityRecordById";
        const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: CarbonIntensityRecord = await response.json();
        return results
    }

    public async deleteCarbonIntensityRecord(id: number)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/deleteCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"id":id})
        });
        return response.status === 200;
    }

    public async updateCarbonIntensityRecord(record: CarbonIntensityRecord)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/updateCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }

    public async addCarbonIntensityRecord(record: CarbonIntensityRecord)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/addCarbonIntensityRecord";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }

    public async login(username: string, password: string)
    {
        const url = this.baseURL + "/login";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"user":username, "password":password})
        });
        const results = await response.json();
        return results.token;
    }

    public async getAllUsers()
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/admin/getAllUsers";
        const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: User[] = await response.json();
        return results
    }

    public async addUser(record: User)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/admin/addUser";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }

    public async updateUser(record: User)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/admin/updateUser";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(record)
        });
        return response.status === 200;
    }

    public async deleteUser(id: number)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/admin/deleteUser";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"id":id})
        });
        return response.status === 200;
    }

}