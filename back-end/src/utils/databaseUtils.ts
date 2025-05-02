import Database from 'better-sqlite3';
import fs from 'fs';

type StringMap<T = string> = { [key: string]: T };

export default class databaseUtils {
    public constructor()
    {
        this.db = new Database('./database/database.db', { verbose: console.log });
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
        const filePath = "./database/data.csv";
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
        const json = this.CSVToJSON(fileContent).filter(x => x !== undefined);
        for(let i = 0; i < json.length; i++)
        {
            var query = `INSERT INTO CarbonIntensityRecords ("id", "from", "to", "intensity_forecast", "intensity_actual", "index", "gas", "coal", "biomass", "nuclear", "hydro", "imports", "wind",` +
                        `"solar", "other", "total")`+
                        `VALUES(NULL, '${json[i]['from']}', '${json[i]['to']}', ${json[i]['intensity_forecast']}, ${json[i]['intensity_actual']}, '${json[i]['index']}',` +
                        `${json[i]['gas']}, ${json[i]['coal']}, ${json[i]['biomass']}, ${json[i]['nuclear']}, ${json[i]['hydro']}, ${json[i]['imports']}, ${json[i]['wind']},` +
                        `${json[i]['solar']}, ${json[i]['other']}, ${json[i]['total']});`
            await this.db.prepare(query).run();
        }

    }

    public async getAllCarbonIntensityRecords()
    {
        var query = "SELECT * FROM CarbonIntensityRecords";
        const results = await this.db.prepare(query).all();
    }

    public async initialiseDatabase()
    {
        var query = 'CREATE TABLE "CarbonIntensityRecords" (' +
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

	await this.addInitialData();

    }
};
