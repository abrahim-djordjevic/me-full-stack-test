import React from "react";
import { ModalProps } from "../types/modalProps";
import { Modal } from "react-bootstrap";
import "../styles/EditModal.css"

const EditModal = (props: ModalProps) => 
{
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
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.from = e.target.value} type="datetime-local" />
                        </div>
                        <div className="forecast form-group">
                            <label className="form-text">Intensity Forecast</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.intensity_forecast = e.target.value} type="number" />
                        </div>
                        <div className="index form-group">
                            <label className="form-text">Index</label>
                            <select className="form-control form-control-sm" onChange={(e:any) => props.record.index = e.target.value}>
                                <option value={"low"}>low</option>
                                <option value={"moderate"}>moderate</option>
                                <option value={"high"}>high</option>
                            </select>
                        </div>
                        <div className="coal form-group">
                            <label className="form-text">Coal</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.coal = e.target.value} type="number" />
                        </div>
                        <div className="nuclear form-group">
                            <label className="form-text">Nuclear</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.nuclear = e.target.value} type="number" />
                        </div>
                        <div className="imports form-group">
                            <label className="form-text">Imports</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.imports = e.target.value} type="number" />
                        </div>
                        <div className="solar form-group">
                            <label className="form-text">Solar</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.solar = e.target.value} type="number" />
                        </div>
                    </div>
                    <div className="right-col">
                        <div className="to form-group">
                            <label className="form-text">To</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.to = e.target.value} type="datetime-local" />
                        </div>
                        <div className="actual form-group">
                            <label className="form-text">Intensity Actual</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.intensity_actual = e.target.value} type="number" />
                        </div>
                        <div className="gas form-group">
                            <label className="form-text">Gas</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.gas = e.target.value} type="number" />
                        </div>
                        <div className="biomass form-group">
                            <label className="form-text">Biomass</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.from = e.target.value} type="number" />
                        </div>
                        <div className="hydro form-group">
                            <label className="form-text">Hydro</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.hydro = e.target.value} type="number" />
                        </div>
                        <div className="wind form-group">
                            <label className="form-text">Wind</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.wind = e.target.value} type="number" />
                        </div>
                        <div className="other form-group">
                            <label className="form-text">Other</label>
                            <input className="form-control form-control-sm" onChange={(e:any) => props.record.other = e.target.value} type="number" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    className="btn btn-success"
                    onClick={() => console.log(props.record)}
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

export default EditModal;