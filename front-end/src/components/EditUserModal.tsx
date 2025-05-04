import { Modal } from "react-bootstrap";
import { UserModalProps } from "../types/userModalProps";
import APIHelper from "../utils/APIHelper";
import "../styles/Modal.css"

const EditUserModal = (props: UserModalProps) => 
{
    const helper = new APIHelper();

    const onSubmitClick = async () => {
        helper.updateUser(props.user).then(() => {
            if(props.submitMethod !== null) {
                props.submitMethod();
                props.cancelMethod();
            }
        })
    };
    
    return(
        <Modal 
            show={props.user !== null}
            size="sm"
            centered={true}
        >
            <Modal.Header>
                <h5>
                    Edit User
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-container">
                    <div className="from form-group">
                        <label className="form-text">Username</label>
                        <input 
                            className="form-control form-control-sm" 
                            onChange={(e:any) => props.user.user = e.target.value} 
                            defaultValue={props.user.user}
                            type="text" 
                        />
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

export default EditUserModal;