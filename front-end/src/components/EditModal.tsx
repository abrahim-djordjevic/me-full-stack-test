import React from "react";
import { ModalProps } from "../types/modalProps";
import { Modal } from "react-bootstrap";

const EditModal = (props: ModalProps) => 
{
    return(
        <Modal 
            show={true}
            size="lg"
            centered={true}
        >
            <Modal.Header>
                Edit
            </Modal.Header>
            <Modal.Body>
                {props.record.id}
            </Modal.Body>
            <Modal.Footer>
                <button 
                    className="btn btn-success"
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