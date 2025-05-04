import React, { useEffect, useState } from "react";
import { RecordModalProps } from "../types/recordModalProps";
import { Modal } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { generatePieChartData, getChartOptions } from "../utils/ChartHelper";
import "../styles/SummaryModal.css"

const SummaryModal = (props: RecordModalProps) => 
{
    const [data, setData] = useState<any>(null);
    const options = getChartOptions();

    useEffect(() => {
        setData(generatePieChartData(props.record))
    }, []);

    return(
        <Modal
            show={props.record !== null}
            size="lg"
            centered={true}
        >
        <Modal.Header>
            <h5>
                {`Summary for record: ${props.record.id}`}
            </h5>
        </Modal.Header>
        <Modal.Body>
            <div className="modal-body-container summary-modal-body">
                <div className="chart-title">
                    <h5>Fuel Mix</h5>
                </div>
                <div className="pie-chart-container">
                    {data != null && <Pie data={data} options={options} />}
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
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

export default SummaryModal;