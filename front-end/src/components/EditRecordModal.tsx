import React from "react";
import { RecordModalProps } from "../types/recordModalProps";
import { Modal } from "react-bootstrap";
import "../styles/Modal.css"
import APIHelper from "../utils/APIHelper";
import moment from "moment";
import { calculateTotal, getISOStringWithoutSecsAndMillisecs, validateNumericInput} from "../utils/modalUtils";


const EditRecordModal = (props: RecordModalProps) => 
{
    const helper = new APIHelper();

    const onSubmitClick = async () => {

        props.record.total = calculateTotal(props.record);
        props.record.from = getISOStringWithoutSecsAndMillisecs(new Date(props.record.from));
        props.record.to = getISOStringWithoutSecsAndMillisecs(new Date(props.record.to));

        helper.updateCarbonIntensityRecord(props.record).then(() => {
            if(props.submitMethod !== null) {
                props.submitMethod();
                props.cancelMethod();
            }
        })
    };

    return(
        <Modal 
            show={props.record !== null}
            size="lg"
            centered={true}
        >
            <Modal.Header>
                <h5>
                    Edit
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-container">
                    <div className="left-col">
                        <div className="from form-group">
                            <label className="form-text">From</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => props.record.from = e.target.value} 
                                defaultValue={moment(props.record.from).format("YYYY-MM-DDTHH:mm")}
                                type="datetime-local" 
                            />
                        </div>
                        <div className="forecast form-group">
                            <label className="form-text">Intensity Forecast</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.intensity_forecast = +e.target.value
                                    } else {
                                        alert("Non numeric value in Intensity Forecast input");
                                        e.target.value = props.record.intensity_forecast;
                                    }
                                }} 
                                defaultValue={props.record.intensity_forecast}
                                type="number" 
                            />
                        </div>
                        <div className="index form-group">
                            <label className="form-text">Index</label>
                            <select 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => props.record.index = e.target.value}
                                defaultValue={props.record.index}
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
                                        props.record.coal = +e.target.value
                                    } else {
                                        alert("Non numeric value in Coal input");
                                        e.target.value = props.record.coal;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.coal}
                            />
                        </div>
                        <div className="nuclear form-group">
                            <label className="form-text">Nuclear</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.nuclear = +e.target.value
                                    } else {
                                        alert("Non numeric value in Nuclear input");
                                        e.target.value = props.record.nuclear;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.nuclear}
                            />
                        </div>
                        <div className="imports form-group">
                            <label className="form-text">Imports</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.imports = +e.target.value
                                    } else {
                                        alert("Non numeric value in Imports input");
                                        e.target.value = props.record.imports;
                                    }
                                }} 
                                type="number" 
                                defaultValue={props.record.imports}
                            />
                        </div>
                        <div className="solar form-group">
                            <label className="form-text">Solar
                            </label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.solar = +e.target.value
                                    } else {
                                        alert("Non numeric value in Solar input");
                                        e.target.value = props.record.solar;
                                    }
                                }} 
                                type="number" 
                                defaultValue={props.record.solar}
                            />
                        </div>
                    </div>
                    <div className="right-col">
                        <div className="to form-group">
                            <label className="form-text">To</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => props.record.to = e.target.value} 
                                type="datetime-local" 
                                defaultValue={moment(props.record.from).format("YYYY-MM-DDTHH:mm")}
                            />
                        </div>
                        <div className="actual form-group">
                            <label className="form-text">Intensity Actual</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.intensity_actual = +e.target.value
                                    } else {
                                        alert("Non numeric value in Intensity Actual input");
                                        e.target.value = props.record.intensity_actual;
                                    }
                                }} 
                                type="number" 
                                defaultValue={props.record.intensity_actual}
                            />
                        </div>
                        <div className="gas form-group">
                            <label className="form-text">Gas</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.gas = +e.target.value
                                    } else {
                                        alert("Non numeric value in Gas input");
                                        e.target.value = props.record.gas;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.gas}
                            />
                        </div>
                        <div className="biomass form-group">
                            <label className="form-text">Biomass</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.biomass = +e.target.value
                                    } else {
                                        alert("Non numeric value in Biomass input");
                                        e.target.value = props.record.biomass;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.biomass}
                            />
                        </div>
                        <div className="hydro form-group">
                            <label className="form-text">Hydro</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.hydro = +e.target.value
                                    } else {
                                        alert("Non numeric value in Hydro input");
                                        e.target.value = props.record.hydro;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.biomass}
                            />
                        </div>
                        <div className="wind form-group">
                            <label className="form-text">Wind</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.wind = +e.target.value
                                    } else {
                                        alert("Non numeric value in Wind input");
                                        e.target.value = props.record.wind;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.wind}
                            />
                        </div>
                        <div className="other form-group">
                            <label className="form-text">Other</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    if(validateNumericInput(e.target.value)){
                                        props.record.other = +e.target.value
                                    } else {
                                        alert("Non numeric value in Other input");
                                        e.target.value = props.record.other;
                                    }
                                }} 
                                type="number"
                                defaultValue={props.record.other}
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
                    onClick={props.cancelMethod}
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditRecordModal;