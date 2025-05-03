import React from "react";
import { ModalProps } from "../types/modalProps";
import { Modal } from "react-bootstrap";
import APIHelper from "../utils/APIHelper";

const DeleteModal = (props: ModalProps) => 
{
    const onDeleteClick = async () => {
        const helper = new APIHelper();
        helper.deleteCarbonIntensityRecord(props.record.id).then(() => {
            if(props.submitMethod !== null) {
                props.submitMethod();
            }
        })
    }

    return(
        <Modal 
            show={props.record !== null}
            size="sm"
            centered={true}
        >
        <Modal.Header>
            <h5>
                Delete
            </h5>
        </Modal.Header>
        <Modal.Body>
            <div>
                Are you sure you want to delete this record?
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button 
                className="btn btn-danger"
                onClick={async () => { await onDeleteClick() }}
            >
                Delete
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

export default DeleteModal;