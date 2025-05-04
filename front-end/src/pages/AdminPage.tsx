import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Login from "../components/Login";
import Header from "../components/Header";
import { User } from "../types/user";
import "../styles/AdminPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import APIHelper from "../utils/APIHelper";
import AddUserButton from "../components/AddUserButton";
import EditUserModal from "../components/EditUserModal";
import DeleteUserModal from "../components/DeleteUserModal";

const AdminPage = () => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
    const [users, setUsers] = useState<User[]>([]);
    const [showTable, setShowTable] = useState<boolean>(true);
    const [editRow, setEditRow] = useState<User | null>(null);
    const [deleteRow, setDeleteRow] = useState<User | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const apiHelper = new APIHelper();
    
    useEffect(() => {
        window.addEventListener("storage", () => {
            if(window.localStorage.token !== token) {
                setToken(localStorage.token);
            }
        });

        window.addEventListener('beforeunload', (ev) => {
            logout();
        });
    }, []);

    const { sendMessage, lastMessage, readyState,  } = useWebSocket(process.env.REACT_APP_WS_URL ?? "", {
        onMessage: (msg: WebSocketEventMap['message']) => {
                var results = JSON.parse(msg?.data);
                if(results?.reloadUsers === true && results?.data != null) {
                    const records: User[] = results?.data;
                    setUsers(records);
                } else {
                    console.log(msg?.data);
                }
        },
        onOpen: () => console.log("connection established"),
        onClose: () => console.log("connection closed"),
    })
    
    const logout = () => {
        window.localStorage.removeItem("token")
        setToken("");
    }

        useEffect(() => {
            if(token === "") return;
            (async function() {
                const users: User[] = await apiHelper.getAllUsers();
                setUsers(users);
            })();
        }, [token]);

    useEffect(() => {
        setPage(1);
    }, [rowsPerPage]);

    if(token === "" || token === null) return(<Login />);

    return (
        <div className="admin-page">
            <Header logoutMethod={logout} />
            <div className="admin-page-body">
                <div className="admin-page-table-container">
                    <div 
                        className="table-header"
                        style={{ borderBottom: showTable ? "1px solid gray" : ""}}
                        onClick={() => setShowTable(!showTable)}
                    >
                        <h5>Users</h5>
                        <FontAwesomeIcon icon={showTable ? faCaretUp : faCaretDown} />
                    </div>
                    { showTable &&
                        <div className="table-body">
                            <div className='user-records-btn-conatiner'>
                                <AddUserButton submitMethod={() => sendMessage("notifyUserReload")} />
                            </div>
                            <table className="user-records-table table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Username</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.slice(rowsPerPage * (page - 1), (rowsPerPage * (page - 1)) + rowsPerPage).map((user:User, index: number) => 
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.user}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-warning edit-btn'
                                                    onClick={() => setEditRow(user)}
                                                >
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </button>     
                                            </td>
                                            <td>
                                                <button 
                                                    className='btn btn-danger delete-btn'
                                                    onClick={() => setDeleteRow(user)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>     
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className='table-footer-container btn-container'>
                                        <td 
                                            colSpan={18}
                                        >
                                            <div style={{ 
                                                display:"flex",
                                                float:"right"
                                            }}>
                                                <div style={{ 
                                                    display:"flex",
                                                    alignItems:"center"
                                                }}>
                                                    <div style={{marginRight: "10px"}}>Rows Per Page:</div>
                                                    <select
                                                        defaultValue={10}
                                                        onChange={ (e:any) => setRowsPerPage(e.target.value) }
                                                    >
                                                        <option value={5}>5</option>
                                                        <option value={10}>10</option>
                                                        <option value={25}>25</option>
                                                        <option value={50}>50</option>
                                                    </select>
                                                </div>
                                                <button 
                                                    className='btn btn-secondary-outline prev-btn'
                                                    onClick={() => setPage(page-1)}
                                                    disabled={page <= 1}
                                                >
                                                    <FontAwesomeIcon icon={faCaretLeft} />
                                                </button>
                                                {Array.from(Array(Math.ceil(users.length / rowsPerPage)).keys()).map((i:number) => (
                                                    <button
                                                        className='btn btn-secondary-outline'
                                                        onClick={() => setPage(i+1)}
                                                        style={{ color: page === i+1 ? "red" : ""}}
                                                    >
                                                        {i+1}
                                                    </button>
                                                ))}
                                                <button 
                                                    className='btn btn-secondary-outline next-btn'
                                                    onClick={() => setPage(page+1)}
                                                    disabled={page >= Math.ceil(users.length / rowsPerPage)}
                                                >
                                                    <FontAwesomeIcon icon={faCaretRight} />
                                                </button>
                                            </div> 
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    }
                </div>
                {editRow !== null && <EditUserModal user={editRow} cancelMethod={() => setEditRow(null)} submitMethod={() => sendMessage("notifyUserReload")}/>}
                {deleteRow !== null && <DeleteUserModal user={deleteRow} cancelMethod={() => setDeleteRow(null)} submitMethod={() => sendMessage("notifyUserReload")}/>}
            </div>
        </div>
    )
}

export default AdminPage;