import express from "express";
import expressWs from "express-ws";
import databaseUtils from "../utils/databaseUtils";

const wsRouter = express.Router() as expressWs.Router;
var utils = new databaseUtils();
var connections:any[] = [];

wsRouter.ws("/", (ws, req) => 
{
    // this is needed to push updates to all clients
    connections.push(ws);

    ws.on('message', async (msg: String) => {
        if(msg == "notifyChartReload") 
        {
            const records = await utils.getAllCarbonIntensityRecords();
            connections.forEach((connection) => {
                connection.send(JSON.stringify({reloadTable: true, data: records}));
            })
        }
        else if(msg == "notifyUserReload")
        {
            const records = await utils.getUsers();
            connections.forEach((connection) => {
                connection.send(JSON.stringify({reloadUsers: true, data: records}));
            })
        }
        else
        {
            ws.send(JSON.stringify({"message":msg}));
        }
    });

    ws.on('close', () => {
        connections = connections.filter(x => x != ws);
    })
});

export default wsRouter;