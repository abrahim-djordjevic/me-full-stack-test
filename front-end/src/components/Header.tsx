import { HeaderProps } from "../types/headerProps";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"

const Header = (props: HeaderProps) => 
{
    const navigate = useNavigate();

    return(
        <div className='header'>
            <h3>Measureable Test Site</h3>
            <div className="header-btn-container">
                <button 
                    className='home btn btn-outline-secondary'
                    onClick={() => navigate("/", {replace:false})}
                >
                    Home
                </button>
                <button 
                    className='admin btn btn-outline-secondary'
                    onClick={() => navigate("/admin", {replace:false})}
                >
                    Admin
                </button>
                <button 
                    className='log-out-button btn btn-outline-secondary'
                    onClick={props.logoutMethod}
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Header;