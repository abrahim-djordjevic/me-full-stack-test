import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { ExportModalProps } from "../types/exportModalProps";
import moment from "moment";

const ExportJSONButton = (props: ExportModalProps) => {
    const[showModal, setShowModal] = useState<boolean>(false);
    const[from, setFrom] = useState<Date>();
    const[to, setTo] = useState<Date>();
    const getMinFromDate = () => props.records?.length > 0 ? new Date(props.records.reduce((a, b) => {return new Date(a.from) < new Date(b.from) ? a : b;}).from): new Date();
    const getMaxToDate = () => props.records?.length > 0 ? new Date(props.records.reduce((a, b) => {return new Date(a.to) > new Date(b.to) ? a : b;}).to) : new Date();
    const getFilteredRecords = () => from != undefined && to != undefined ? props.records.filter(x => new Date(x.from) >= from && new Date(x.to) <= to) : props.records;

    useEffect(() => {
        setFrom(getMinFromDate());
        setTo(getMaxToDate());
    }, [props.records])

    if(showModal) {
        return(
            <Modal
            show={props.records !== null}
            size="lg"
            centered={true}
            >
                <ModalHeader>
                    <h5>
                        Export Records
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-body-container">
                        <div className="left-col">
                            <div className="from form-group">
                                <label className="form-text">From</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => setFrom(new Date(e.target.value))} 
                                    defaultValue={moment(from).format("YYYY-MM-DDTHH:mm")}
                                    type="datetime-local" 
                                />
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="to form-group">
                                <label className="form-text">To</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => setTo(new Date(e.target.value))} 
                                    type="datetime-local" 
                                    defaultValue={moment(to).format("YYYY-MM-DDTHH:mm")}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-success"
                    >
                        <a
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getFilteredRecords()))}`}
                            download="carbonRecords.json"
                            style={{
                                textDecoration:"none",
                                color:"white"
                            }}
                        >
                            <FontAwesomeIcon icon={faDownload} /> Export JSON
                        </a>
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        );
    }

    return(
        <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
        >
            <FontAwesomeIcon icon={faDownload} /> Export JSON
        </button>
    );
}

export default ExportJSONButton;