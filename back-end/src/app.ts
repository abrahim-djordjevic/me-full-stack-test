import express from 'express';
//import session from 'express-session';
//import cors from 'cors';
import sqlite3 from 'sqlite3';
import router from "./routes/router";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let db = null;
const exists = fs.existsSync("../database/database.db");
// create db if needed
if(exists)
{
    console.log("database file exists");
}
else
{
    console.log("creating database");
    db = new sqlite3.Database("./database/database.db",
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
                (err) => {
                    console.log(err)
                });
}

app.use('/', router);
app.listen(3500, () => {
    console.log(`Server is running on http://localhost:3500`);
});
