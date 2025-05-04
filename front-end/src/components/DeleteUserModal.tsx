import { UserModalProps } from "../types/userModalProps";
import { Modal } from "react-bootstrap";
import APIHelper from "../utils/APIHelper";

const DeleteUserModal = (props: UserModalProps) => 
{
    const helper = new APIHelper();
    const onDeleteClick = async () => {
        helper.deleteUser(props.user.id).then(() => {
            if(props.submitMethod !== null) {
                props.submitMethod();
                props.cancelMethod();
            }
        })
    }

    return(
        <Modal 
            show={props.user !== null}
            size="sm"
            centered={true}
        >
            <Modal.Header>
                <h5>
                    Delete User
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Are you sure you want to delete this user?
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

export default DeleteUserModal;