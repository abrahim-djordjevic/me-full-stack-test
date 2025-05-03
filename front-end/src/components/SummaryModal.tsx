import React from "react";
import { ModalProps } from "../types/modalProps";
import { Modal } from "react-bootstrap";

const SummaryModal = (props: ModalProps) => 
{
    return(
        <Modal
            show={props.record !== null}
            size="xl"
            centered={true}
        >
        <Modal.Header>
            <h5>
                Summary
            </h5>
        </Modal.Header>
        <Modal.Body>
            {props.record.id}
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