 import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { AddModalProps } from "../types/addModalProps";
import "../styles/Modal.css"
import moment from "moment";
import { calculateTotal, getISOStringWithoutSecsAndMillisecs, validateNumericInput} from "../utils/modalUtils";
import { CarbonIntensityRecord } from "../types/carbonIntensityRecord";
import APIHelper from "../utils/APIHelper";


const AddRecordButton = (props: AddModalProps) => 
{
    const emptyRecord: CarbonIntensityRecord = {
        id:0,
        from:"",
        to:"",
        intensity_forecast:0,
        intensity_actual:0,
        index:"low",
        gas:0,
        coal:0,
        biomass:0,
        nuclear:0,
        hydro:0,
        imports:0,
        wind:0,
        solar:0,
        other:0,
        total:0
    };
    const [showModal, setShowModal] = useState<boolean>(false);
    const [record, setRecord] = useState<CarbonIntensityRecord>(emptyRecord);

    // reset record on modal close if it has been updated
    useEffect(() => {
        if(!showModal && record !== emptyRecord) {
            setRecord(emptyRecord);
        }
    }, [showModal])

    const helper = new APIHelper()

    const onSubmitClick = async () => {
        if(record === emptyRecord || record.from === "" || record.to === "") return;

        record.total = calculateTotal(record);
        record.from = getISOStringWithoutSecsAndMillisecs(new Date(record.from));
        record.to = getISOStringWithoutSecsAndMillisecs(new Date(record.to));

        helper.addCarbonIntensityRecord(record).then(() => {
            if(props.submitMethod !== null) {
                props.submitMethod();
                setShowModal(false);
            }
        })
    }
 
    if(showModal) 
    {
        return(
            <Modal 
                show={record !== null}
                size="lg"
                centered={true}
            >
                <Modal.Header>
                    <h5>
                        Add Record
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body-container">
                        <div className="left-col">
                            <div className="from form-group">
                                <label className="form-text">From</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => record.from = e.target.value} 
                                    defaultValue={moment(record.from).format("YYYY-MM-DDTHH:mm")}
                                    type="datetime-local" 
                                />
                            </div>
                            <div className="forecast form-group">
                                <label className="form-text">Intensity Forecast</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.intensity_forecast = +e.target.value
                                        } else {
                                            alert("Non numeric value in Intensity Forecast input");
                                            e.target.value = record.intensity_forecast;
                                        }
                                    }} 
                                    defaultValue={record.intensity_forecast}
                                    type="number" 
                                />
                            </div>
                            <div className="index form-group">
                                <label className="form-text">Index</label>
                                <select 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => record.index = e.target.value}
                                    defaultValue={record.index}
                                >
                                    <option value={"low"}>low</option>
                                    <option value={"moderate"}>moderate</option>
                                    <option value={"high"}>high</option>
                                </select>
                            </div>
                            <div className="coal form-group">
                                <label className="form-text">Coal</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.coal = +e.target.value
                                        } else {
                                            alert("Non numeric value in Coal input");
                                            e.target.value = record.coal;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.coal}
                                />
                            </div>
                            <div className="nuclear form-group">
                                <label className="form-text">Nuclear</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.nuclear = +e.target.value
                                        } else {
                                            alert("Non numeric value in Nuclear input");
                                            e.target.value = record.nuclear;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.nuclear}
                                />
                            </div>
                            <div className="imports form-group">
                                <label className="form-text">Imports</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.imports = +e.target.value
                                        } else {
                                            alert("Non numeric value in Imports input");
                                            e.target.value = record.imports;
                                        }
                                    }} 
                                    type="number" 
                                    defaultValue={record.imports}
                                />
                            </div>
                            <div className="solar form-group">
                                <label className="form-text">Solar
                                </label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.solar = +e.target.value
                                        } else {
                                            alert("Non numeric value in Solar input");
                                            e.target.value = record.solar;
                                        }
                                    }} 
                                    type="number" 
                                    defaultValue={record.solar}
                                />
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="to form-group">
                                <label className="form-text">To</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => record.to = e.target.value} 
                                    type="datetime-local" 
                                    defaultValue={moment(record.to).format("YYYY-MM-DDTHH:mm")}
                                />
                            </div>
                            <div className="actual form-group">
                                <label className="form-text">Intensity Actual</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.intensity_actual = +e.target.value
                                        } else {
                                            alert("Non numeric value in Intensity Actual input");
                                            e.target.value = record.intensity_actual;
                                        }
                                    }} 
                                    type="number" 
                                    defaultValue={record.intensity_actual}
                                />
                            </div>
                            <div className="gas form-group">
                                <label className="form-text">Gas</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.gas = +e.target.value
                                        } else {
                                            alert("Non numeric value in Gas input");
                                            e.target.value = record.gas;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.gas}
                                />
                            </div>
                            <div className="biomass form-group">
                                <label className="form-text">Biomass</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.biomass = +e.target.value
                                        } else {
                                            alert("Non numeric value in Biomass input");
                                            e.target.value = record.biomass;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.biomass}
                                />
                            </div>
                            <div className="hydro form-group">
                                <label className="form-text">Hydro</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.hydro = +e.target.value
                                        } else {
                                            alert("Non numeric value in Hydro input");
                                            e.target.value = record.hydro;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.biomass}
                                />
                            </div>
                            <div className="wind form-group">
                                <label className="form-text">Wind</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.wind = +e.target.value
                                        } else {
                                            alert("Non numeric value in Wind input");
                                            e.target.value = record.wind;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.wind}
                                />
                            </div>
                            <div className="other form-group">
                                <label className="form-text">Other</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        if(validateNumericInput(e.target.value)){
                                            record.other = +e.target.value
                                        } else {
                                            alert("Non numeric value in Other input");
                                            e.target.value = record.other;
                                        }
                                    }} 
                                    type="number"
                                    defaultValue={record.other}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-success"
                        onClick={async () => { await onSubmitClick() }}
                    >
                        Submit
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
        >
            <FontAwesomeIcon icon={faPlusCircle} /> Add Record
        </button>
    );
}

export default AddRecordButton;