import express from 'express';
import sqlite3 from 'sqlite3';
import router from "./routes/router";
import fs from "fs";
import databaseUtils from "./utils/databaseUtils";
import csvtojson from "csvtojson";

const app = express();
var utils = new databaseUtils();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let db = null;
const exists = fs.existsSync("./database/database.db");
// create db if needed
if(exists)
{
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

app.use('/', router);
app.listen(3500, () => {
    console.log(`Server is running on http://localhost:3500`);
});
