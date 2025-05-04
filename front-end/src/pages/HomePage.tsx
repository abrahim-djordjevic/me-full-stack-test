import React from 'react';
import { useEffect, useState } from 'react';
import { CarbonIntensityRecord } from '../types/carbonIntensityRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faEye, faCaretDown, faCaretUp, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import APIHelper from "../utils/APIHelper";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateChartData, getChartOptions } from '../utils/ChartHelper';
import "../styles/HomePage.css";
import EditRecordModal from '../components/EditRecordModal';
import DeleteRecordModal from '../components/DeleteRecordModal';
import SummaryModal from '../components/SummaryModal';
import useWebSocket from 'react-use-websocket';
import AddRecordButton from '../components/AddRecordButton';
import ExportJSONButton from '../components/ExportJSONButton';
import Login from '../components/Login';
import Header from '../components/Header';

const HomePage = () =>
{
    const [carbonRecords, setCarbonRecords] = useState<CarbonIntensityRecord[]>([]);
    const [chartData, setChartData] = useState<any>();
    const [showChart, setShowChart] = useState<boolean>(true);
    const [showTable, setShowTable] = useState<boolean>(true);
    const [editRow, setEditRow] = useState<CarbonIntensityRecord | null>(null);
    const [deleteRow, setDeleteRow] = useState<CarbonIntensityRecord | null>(null);
    const [summaryRow, setSummaryRow] = useState<CarbonIntensityRecord | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
    const apiHelper = new APIHelper();
    const options = getChartOptions();

    const { sendMessage, lastMessage, readyState,  } = useWebSocket(process.env.REACT_APP_WS_URL ?? "", {
        onMessage: (msg: WebSocketEventMap['message']) => {
                var results = JSON.parse(msg?.data);
                if(results?.reloadTable === true && results?.data != null) {
                    const records: CarbonIntensityRecord[] = results?.data;
                    setCarbonRecords(records);
                } else {
                    console.log(msg?.data);
                }
        },
        onOpen: () => console.log("connection established"),
        onClose: () => console.log("connection closed"),
    })

    const logout = () => {
        window.localStorage.removeItem("token")
        setToken("");
    }
    // need to register chart
    Chart.register(...registerables);

    useEffect(() => {
        window.addEventListener("storage", () => {
            if(window.localStorage.token !== token) {
                setToken(localStorage.token);
            }
        });

        window.addEventListener('beforeunload', (ev) => {
            logout();
        });
    }, [])
    
    useEffect(() => {
        if(token === "" || token === null || token === undefined || token === "undefined") return;
        (async function() {
            const records: CarbonIntensityRecord[] = await apiHelper.getAllCarbonIntensityRecords();
            setCarbonRecords(records);
        })();
    }, [token]);

    useEffect(() => {
        if(carbonRecords.length <= 0) return;
        const data = generateChartData(carbonRecords);
        setChartData(data);
        // reset page if you remove last item on a page
        if(Math.ceil(carbonRecords.length / rowsPerPage) < page) setPage(1)
    }, [carbonRecords]);

    useEffect(() => {
        setPage(1);
    }, [rowsPerPage])

    if(token === "" || token === null || token === undefined || token === "undefined") {
        return(<Login />);
    } else {
        return (
            <div className='home-page'>
                <Header logoutMethod={logout} />
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
                                <Line data={chartData} options={options}/>
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
                                <div className='carbon-records-btn-conatiner'>
                                    <AddRecordButton submitMethod={() => sendMessage("notifyChartReload")}/>
                                    <ExportJSONButton records={carbonRecords} />
                                </div>
                                <table className="carbon-records-table table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Intensity Forecast (g/kWh)</th>
                                            <th>Intensity Actual (g/kWh)</th>
                                            <th>Index</th>
                                            <th>Gas (%)</th>
                                            <th>Coal (%)</th>
                                            <th>Biomass (%)</th>
                                            <th>Nuclear (%)</th>
                                            <th>Hydro (%)</th>
                                            <th>Imports (%)</th>
                                            <th>Wind (%)</th>
                                            <th>Solar (%)</th>
                                            <th>Other (%)</th>
                                            <th>Total</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>Summary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carbonRecords.length > 0 && carbonRecords.slice(rowsPerPage * (page - 1), (rowsPerPage * (page - 1)) + rowsPerPage).map((record:CarbonIntensityRecord, index: number) => 
                                            <tr key={index}>
                                                <td>{record.id}</td>
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
                                                    <button 
                                                        className='btn btn-warning edit-btn'
                                                        onClick={() => setEditRow(record)}
                                                    >
                                                        <FontAwesomeIcon icon={faPencil} />
                                                    </button>     
                                                </td>
                                                <td>
                                                    <button 
                                                        className='btn btn-danger delete-btn'
                                                        onClick={() => setDeleteRow(record)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>     
                                                </td>
                                                <td>
                                                    <button 
                                                        className='btn btn-primary summary-btn'
                                                        onClick={() => setSummaryRow(record)}
                                                    >
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
                    {editRow !== null && <EditRecordModal record={editRow} cancelMethod={() => setEditRow(null)} submitMethod={() => sendMessage("notifyChartReload")}/>}
                    {deleteRow !== null && <DeleteRecordModal record={deleteRow} cancelMethod={() => setDeleteRow(null)} submitMethod={() => sendMessage("notifyChartReload")}/>}
                    {summaryRow !== null && <SummaryModal record={summaryRow} cancelMethod={() => setSummaryRow(null)} submitMethod={null}/>}
                </div>
            </div>
        );
    } 
}

export default HomePage;