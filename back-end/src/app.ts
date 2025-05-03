import express from 'express';
import expressWs from 'express-ws';
import sqlite3 from 'sqlite3';
import router from "./routes/router";
import cors from 'cors';
import databaseUtils from "./utils/databaseUtils";
import {specs} from "./swagger/swagger.ts";
import * as swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT!;

const app = expressWs(express()).app;
var utils = new databaseUtils();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    allowedHeaders: "Origin, X-Requested-With, Access-Control-Max-Age, Content-Type, Accept, x-cron-token, x-path",
    methods: "GET, POST, OPTIONS, DELETE, PUT",
    credentials: true
  }));

let db = null;
// create db if needed
db = new sqlite3.Database("./database/database.db",
                          sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
                          () => {});
await utils.initialiseDatabase();
//mountRouter();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', (await import('./routes/wsRouter.ts')).default);
app.use('/api', router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
