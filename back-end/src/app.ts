import express from 'express';
import sqlite3 from 'sqlite3';
import router from "./routes/router";
import fs from "fs";
import databaseUtils from "./utils/databaseUtils";
import {specs} from "./swagger/swagger.ts";
import * as swaggerUi from "swagger-ui-express";
import csvtojson from "csvtojson";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT!;

const app = express();
var utils = new databaseUtils();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let db = null;
let exists = fs.existsSync("./database/database.db");
const count = await utils.checkIfTableExists();
// create db if needed
if(exists)
{
    if(!count)
    {
        await utils.addInitialData();
    }
    console.log("database file exists");
    await utils.getAllCarbonIntensityRecords()
}
else
{
    console.log("creating database");
    db = new sqlite3.Database("./database/database.db",
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
                (data) => {
                });
    await utils.initialiseDatabase();
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
