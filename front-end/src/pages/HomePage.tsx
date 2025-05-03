import React from 'react';
import { useEffect, useState } from 'react';
import { CarbonIntensityRecord } from '../types/carbonIntensityRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import APIHelper from "../utils/APIHelper";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateChartData } from '../utils/ChartHelper';
import "../styles/HomePage.css";

function HomePage()
{
    const [carbonRecords, setCarbonRecords] = useState<CarbonIntensityRecord[]>([]);
    const [chartData, setChartData] = useState<any>();
    const [showChart, setShowChart] = useState<boolean>(true);
    const [showTable, setShowTable] = useState<boolean>(true);

    const apiHelper = new APIHelper();
    // need to register chart
    Chart.register(...registerables);
    
    useEffect(() => {
        (async function() {
            const records: CarbonIntensityRecord[] = await apiHelper.getAllCarbonIntensityRecords();
            setCarbonRecords(records);
        })();
    }, []);

    useEffect(() => {
        if(carbonRecords.length <= 0) return;
        const data = generateChartData(carbonRecords);
        setChartData(data);
    }, [carbonRecords]);

    return (
        <div className='home-page'>
            <div className='home-page-header'>
                <h3>Measureable Test Site</h3>
            </div>
            <div className='home-page-body'>
                <div className='home-page-chart-container'>
                    <div 
                        className='chart-header'
                        style={{
                            borderBottom: showChart ? "1px solid black" : "",
                        }}
                        onClick={() => setShowChart(!showChart)}
                        >
                        <h5>Carbon Intensity Chart</h5>
                    </div>
                    {chartData !== undefined && showChart &&
                        <div className='chart-body'>
                            <Line data={chartData}/>
                        </div>
                    }
                </div>
                <div className='home-page-table-container'>
                    <table className="carbon-records-table table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Intensity Forecast</th>
                                <th>Intensity Actual</th>
                                <th>Index</th>
                                <th>Gas</th>
                                <th>Coal</th>
                                <th>BioMass</th>
                                <th>Nuclear</th>
                                <th>Hydro</th>
                                <th>Imports</th>
                                <th>Wind</th>
                                <th>Solar</th>
                                <th>Other</th>
                                <th>Total</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carbonRecords.map((record:CarbonIntensityRecord, index: number) => 
                                <tr key={index}>
                                    <td>{record.from}</td>
                                    <td>{record.to}</td>
                                    <td>{record.intensity_forecast}</td>
                                    <td>{record.intensity_actual}</td>
                                    <td>{record.index}</td>
                                    <td>{record.gas}</td>
                                    <td>{record.coal}</td>
                                    <td>{record.biomass}</td>
                                    <td>{record.nuclear}</td>
                                    <td>{record.hydro}</td>
                                    <td>{record.imports}</td>
                                    <td>{record.wind}</td>
                                    <td>{record.solar}</td>
                                    <td>{record.other}</td>
                                    <td>{record.total}</td>
                                    <td>
                                        <button className='btn btn-warning edit-btn'>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>     
                                    </td>
                                    <td>
                                        <button className='btn btn-danger delete-btn'>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>     
                                    </td>
                                    <td>
                                        <button className='btn btn-primary summary-btn'>
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>     
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomePage;