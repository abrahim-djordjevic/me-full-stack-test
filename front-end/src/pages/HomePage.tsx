import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { CarbonIntensityRecord } from '../types/carbonIntensityRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faEye, faCaretDown, faCaretUp, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
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
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

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
                        style={{ borderBottom: showChart ? "1px solid gray" : ""}}
                        onClick={() => setShowChart(!showChart)}
                        >
                        <h5>Carbon Intensity Chart</h5>
                        <FontAwesomeIcon icon={showChart ? faCaretUp : faCaretDown} />
                    </div>
                    {chartData !== undefined && showChart &&
                        <div className='chart-body'>
                            <Line data={chartData}/>
                        </div>
                    }
                </div>
                <div className='home-page-table-container'>
                    <div 
                        className='table-header'
                        style={{ borderBottom: showTable ? "1px solid gray" : ""}}
                        onClick={() => setShowTable(!showTable)}
                    >
                        <h5>Carbon Intensity Table</h5>
                        <FontAwesomeIcon icon={showTable ? faCaretUp : faCaretDown} />
                    </div>
                    { showTable &&
                        <div className='table-body'>
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
                                    {carbonRecords.slice(rowsPerPage * (page - 1), (rowsPerPage * (page - 1)) + rowsPerPage).map((record:CarbonIntensityRecord, index: number) => 
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
                                <tfoot>
                                    <tr className='table-footer-container btn-container'>
                                        <td 
                                            colSpan={18}
                                        >
                                            <div style={{ 
                                                display:"flex",
                                                float:"right"
                                            }}>
                                                <div style={{ 
                                                    display:"flex",
                                                    alignItems:"center"
                                                }}>
                                                    <div style={{marginRight: "10px"}}>Rows Per Page:</div>
                                                    <select
                                                        defaultValue={10}
                                                        onChange={ (e:any) => setRowsPerPage(e.target.value) }
                                                    >
                                                        <option value={5}>5</option>
                                                        <option value={10}>10</option>
                                                        <option value={25}>25</option>
                                                        <option value={50}>50</option>
                                                    </select>
                                                </div>
                                                <button 
                                                    className='btn btn-secondary-outline prev-btn'
                                                    onClick={() => setPage(page-1)}
                                                    disabled={page <= 1}
                                                >
                                                    <FontAwesomeIcon icon={faCaretLeft} />
                                                </button>
                                                {Array.from(Array(Math.ceil(carbonRecords.length / rowsPerPage)).keys()).map((i:number) => (
                                                    <button
                                                        className='btn btn-secondary-outline'
                                                        onClick={() => setPage(i+1)}
                                                        style={{ color: page === i+1 ? "red" : ""}}
                                                    >
                                                        {i+1}
                                                    </button>
                                                ))}
                                                <button 
                                                    className='btn btn-secondary-outline next-btn'
                                                    onClick={() => setPage(page+1)}
                                                    disabled={page >= Math.ceil(carbonRecords.length / rowsPerPage)}
                                                >
                                                    <FontAwesomeIcon icon={faCaretRight} />
                                                </button>
                                            </div> 
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;