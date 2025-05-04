import Database from 'better-sqlite3';
import fs from 'fs';
import {CarbonIntensityRecord} from "../types/carbonIntensityRecord"
import { createHash } from 'crypto';
import dotenv from "dotenv";

type StringMap<T = string> = { [key: string]: T };

export default class databaseUtils {
    db: any;
    
    public constructor()
    {
        this.db = new Database('./database/database.db');
        dotenv.config();
    }

    private CSVToJSON(data: string, delimiter = ",")
    {
        const titles: string[] = data.slice(0, data.indexOf("\r")).split(delimiter);
        return data
        .slice(data.indexOf("\r") + 1)
        .split("\r")
        .map((v) => {
            const values = v.split(delimiter);
            if(values[0] == undefined || values[0] === "\n") return;
            return titles.reduce(
                (obj, title, index) => ((obj[title] = values[index].replace("\n", "")), obj),
                                 {} as StringMap
            );
        });
    };

    public async addInitialData()
    {

        const count = await this.getCarbonIntensityRecordsCount();
        if(count > 0) return;

        const filePath = "./database/data.csv";
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
        const json = this.CSVToJSON(fileContent).filter(x => x !== undefined);
        for(let i = 0; i < json.length; i++)
        {
            var query = `INSERT INTO CarbonIntensityRecords ("id", "from", "to", "intensity_forecast", "intensity_actual", "index", "gas", "coal", "biomass", "nuclear", "hydro", "imports", "wind",` +
                        `"solar", "other", "total")`+
                        `VALUES(NULL, '${json[i]['from']}', '${json[i]['to']}', ${json[i]['intensity_forecast']}, ${json[i]['intensity_actual']}, '${json[i]['index']}',` +
                        `${json[i]['gas']}, ${json[i]['coal']}, ${json[i]['biomass']}, ${json[i]['nuclear']}, ${json[i]['hydro']}, ${json[i]['imports']}, ${json[i]['wind']},` +
                        `${json[i]['solar']}, ${json[i]['other']}, ${json[i]['total']})`
            await this.db.prepare(query).run();
        }

    }

    public async checkIfTableExists()
    {
        var query = `SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='CarbonIntensityRecords'`;
        var count = (await this.db.prepare(query).all())[0].count;
        return count > 0;
    }

    public async getCarbonIntensityRecordsCount()
    {
        var query = "SELECT count(*) as count FROM CarbonIntensityRecords";
        const results = await this.db.prepare(query).all()[0].count;
        return results;
    }

    public async getAllCarbonIntensityRecords()
    {
        var query = "SELECT * FROM CarbonIntensityRecords";
        const results = await this.db.prepare(query).all();
        return results;
    }

    public async getCarbonIntensityRecordById(id: number)
    {
        var query = `SELECT * FROM CarbonIntensityRecords WHERE id = ${id}`;
        const result = await this.db.prepare(query).all();
        return result;
    }

    public async deleteCarbonIntensityRecordById(id: number)
    {
        var query = `DELETE FROM CarbonIntensityRecords WHERE id = ${id}`;
        const results = await this.db.prepare(query).run();
    }

    public async insertCarbonIntensityRecord(record: CarbonIntensityRecord)
    {

        var query = `INSERT INTO CarbonIntensityRecords ("id", "from", "to", "intensity_forecast", "intensity_actual", "index", "gas", "coal", "biomass", "nuclear", "hydro", "imports", "wind",` +
                    `"solar", "other", "total")`+
                    `VALUES(NULL, '${record.from}', '${record.to}', ${record.intensity_forecast}, ${record.intensity_actual}, '${record.index}',` +
                    `${record.gas}, ${record.coal}, ${record.biomass}, ${record.nuclear}, ${record.hydro}, ${record.imports}, ${record.wind},` +
                    `${record.solar}, ${record.other}, ${record.total});`
        await this.db.prepare(query).run();
    }

    public async updateCarbonIntensityRecord(record: CarbonIntensityRecord)
    {
        var query = `update CarbonIntensityRecords ` +
                    `SET 'id'=${record.id}, 'from'='${record.from}', 'to'='${record.to}', 'intensity_forecast'=${record.intensity_forecast}, 'intensity_actual'=${record.intensity_actual}, ` +
                    `'index'='${record.index}', 'gas'=${record.gas}, 'coal'=${record.coal}, 'biomass'=${record.biomass}, 'nuclear'=${record.nuclear}, 'hydro'=${record.hydro}, ` +
                    `'imports'=${record.imports}, 'wind'=${record.wind}, 'solar'=${record.solar}, 'other'=${record.other}, 'total'=${record.total} ` +
                    `WHERE id = ${record.id}`;
        await this.db.prepare(query).run();
    }

    public async initialiseDatabase()
    {
        var query = 'CREATE TABLE IF NOT EXISTS "CarbonIntensityRecords" (' +
            '"id"	INTEGER,' +
            '"from"	TEXT,' +
            '"to"	TEXT,' +
            '"intensity_forecast"	NUMERIC,' +
            '"intensity_actual"	NUMERIC,' +
            '"index"	TEXT,' +
            '"gas"	NUMERIC,' +
            '"coal"	NUMERIC,' +
            '"biomass"	NUMERIC,' +
            '"nuclear"	NUMERIC,' +
            '"hydro"	NUMERIC,' +
            '"imports"	NUMERIC,' +
            '"wind"	NUMERIC,' +
            '"solar"	NUMERIC,' +
            '"other"	NUMERIC,' +
            '"total"	NUMERIC,' +
            'PRIMARY KEY("id" AUTOINCREMENT)' +
            ');';
        await this.db.prepare(query).run();

        const recordCount = await this.getCarbonIntensityRecordsCount();
        if(recordCount === 0) { await this.addInitialData(); }

        await this.intialiseUserTable();
    }

    public async intialiseUserTable() {
        var query = 'CREATE TABLE IF NOT EXISTS "Users" (' +
        '"id"	INTEGER,' +
        '"user"	TEXT,' +
        '"password"	TEXT,' +
        'PRIMARY KEY("id" AUTOINCREMENT)' +
        ');';

        await this.db.prepare(query).run();

        await this.insertUser("user", "try");
    }

    public async insertUser(username: string, password: string) {
        const hashedPassword: string = createHash('sha256').update(password).digest("base64");
        var query = `INSERT INTO Users ('id', 'user', 'password') VALUES(NULL, '${username}', '${hashedPassword}');`;
        await this.db.prepare(query).run();
    }

    public async checkUser(username: string, password: string) {
        const hashedPassword: string = createHash('sha256').update(password).digest("base64");
        var query = `SELECT * FROM Users WHERE user = '${username}' AND password = '${hashedPassword}';`;
        const users:any[] = await this.db.prepare(query).all();
        return users.length > 0;
    }
};
