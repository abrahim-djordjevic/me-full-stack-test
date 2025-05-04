import { useEffect, useState } from "react";
import { AddModalProps } from "../types/addModalProps";
import { User } from "../types/user";
import APIHelper from "../utils/APIHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import "../styles/Modal.css"

const AddUserButton = (props: AddModalProps) => {
    const emptyUser: User = {
        id:0,
        user:"",
        password:""
    }
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<User>(emptyUser);

    // reset user on modal close if it has been updated
    useEffect(() => {
        if(!showModal && user !== emptyUser) {
            setUser(emptyUser);
        }
    }, [showModal])

    const helper = new APIHelper()

    const onSubmitClick = async () => {
        if(user === emptyUser) return;
    
        helper.addUser(user).then(() => {
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
                show={user !== null}
                size="lg"
                centered={true}
            >
                <Modal.Header>
                    <h5>
                        Add User
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body-container">
                        <div className="left-col">
                            <div className="from form-group">
                                <label className="form-text">Username</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => user.user = e.target.value} 
                                    type="text" 
                                />
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="from form-group">
                                <label className="form-text">Password</label>
                                <input 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => user.password = e.target.value} 
                                    type="password" 
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
            <FontAwesomeIcon icon={faPlusCircle} /> Add User
        </button>
    );
}

export default AddUserButton;