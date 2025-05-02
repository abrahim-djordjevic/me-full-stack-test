import express from 'express';
import databaseUtils from "../utils/databaseUtils";
import CarbonIntensityRecord from "../types/carbonIntensityRecord";

var utils = new databaseUtils();
const router = express.Router();

/**
 * @swagger
 * /api/getAllCarbonIntensityRecords:
 *  get:
 *    description: used to request all carbon intensity records
 *    responses:
 *      '200':
 *        description: retrieved all records
 */
router.get("/getAllCarbonIntensityRecords", async (req, res) =>
{
    try
    {
        const records = await utils.getAllCarbonIntensityRecords();
        res.status(200).json(records);
    }
    catch (error)
    {
        res.status(500).json("500: Internal Server Error");
    }
});

/**
 * @swagger
 * /api/getCarbonIntensityRecordById:
 *  get:
 *    description: used to request a carbon intensity record by id
 *    parameters:
 *    - in: query
 *      name: id
 *      schema:
 *          type: integer
 *          minimum: 1
 *      description: The Record ID
 *    responses:
 *      '200':
 *        description: retrieved record
 */
router.get("/getCarbonIntensityRecordById", async (req, res) =>
{
    try
    {
        const id:number = req.query.id;
        if(id === null || id === undefined || id === 0)
        {
            res.status(400).json("400: Bad Request");
        }
        else
        {
            const record = await utils.getCarbonIntensityRecordById(id);
            res.status(200).json(record);
        }
    }
    catch (error)
    {
        res.status(500).json("500: Internal Server Error");
    }
});

/**
 * @swagger
 * /api/addCarbonIntensityRecord:
 *  post:
 *    description: used to insert a carbon intensity record
 *    consumes:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      from:
 *                          type: string
 *                      to:
 *                          type: string
 *                      intensity_forecast:
 *                          type: number
 *                      intensity_actual:
 *                          type: number
 *                      index:
 *                          type: string
 *                      gas:
 *                          type: number
 *                      coal:
 *                          type: number
 *                      biomass:
 *                          type: number
 *                      nuclear:
 *                          type: number
 *                      hydro:
 *                          type: number
 *                      imports:
 *                          type: number
 *                      wind:
 *                          type: number
 *                      solar:
 *                          type: number
 *                      other:
 *                          type: number
 *                      total:
 *                          type: number

 *    responses:
 *      '200':
 *        description: inserted record
 */
router.post("/addCarbonIntensityRecord", async (req, res) =>
{
    try
    {
        const record: CarbonIntensityRecord =
        {
            id:0,
            from: req.body.from,
            to: req.body.to,
            intensity_forecast: req.body.intensity_forecast,
            intensity_actual: req.body.intensity_actual,
            index: req.body.index,
            gas: req.body.gas,
            coal: req.body.coal,
            biomass: req.body.biomass,
            nuclear: req.body.nuclear,
            hydro: req.body.hydro,
            imports: req.body.imports,
            wind: req.body.wind,
            solar: req.body.solar,
            other: req.body.other,
            total:req.body.total
        }

        if(record === null || record === undefined)
        {
            res.status(400).json("400: Bad Request");
        }
        else
        {
            await utils.insertCarbonIntensityRecord(record)
            res.status(200).json("inserted record");
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json("500: Internal Server Error");
    }
});

/**
 * @swagger
 * /api/updateCarbonIntensityRecord:
 *  post:
 *    description: used to update a carbon intensity record
 *    consumes:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                      from:
 *                          type: string
 *                      to:
 *                          type: string
 *                      intensity_forecast:
 *                          type: number
 *                      intensity_actual:
 *                          type: number
 *                      index:
 *                          type: string
 *                      gas:
 *                          type: number
 *                      coal:
 *                          type: number
 *                      biomass:
 *                          type: number
 *                      nuclear:
 *                          type: number
 *                      hydro:
 *                          type: number
 *                      imports:
 *                          type: number
 *                      wind:
 *                          type: number
 *                      solar:
 *                          type: number
 *                      other:
 *                          type: number
 *                      total:
 *                          type: number
 *
 *    responses:
 *      '200':
 *        description: updated record
 */
router.post("/updateCarbonIntensityRecord", async (req, res) =>
{
    try
    {
        const record: CarbonIntensityRecord =
        {
            id:req.body.id,
            from: req.body.from,
            to: req.body.to,
            intensity_forecast: req.body.intensity_forecast,
            intensity_actual: req.body.intensity_actual,
            index: req.body.index,
            gas: req.body.gas,
            coal: req.body.coal,
            biomass: req.body.biomass,
            nuclear: req.body.nuclear,
            hydro: req.body.hydro,
            imports: req.body.imports,
            wind: req.body.wind,
            solar: req.body.solar,
            other: req.body.other,
            total:req.body.total
        }

        if(record === null || record === undefined)
        {
            res.status(400).json("400: Bad Request");
        }
        else
        {
            await utils.updateCarbonIntensityRecord(record)
            res.status(200).json("updated record");
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json("500: Internal Server Error");
    }
});

/**
 * @swagger
 * /api/deleteCarbonIntensityRecord:
 *  post:
 *    description: used to delete a carbon intensity record
 *    consumes:
 *    - application/json
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *
 *    responses:
 *      '200':
 *        description: deleted record
 */
router.post("/deleteCarbonIntensityRecord", async (req, res) =>
{
    try
    {


        if(req.body.id === null || req.body.id === undefined)
        {
            res.status(400).json("400: Bad Request");
        }
        else
        {
            await utils.deleteCarbonIntensityRecordById(req.body.id);
            res.status(200).json("deleted record");
        }
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json("500: Internal Server Error");
    }
});

module.exports = router;
