import { useContext } from "react";
import { mycontext } from "../App";
import { useNavigate } from "react-router-dom";
import "../Css/LogoutUser.css"
import { useEffect } from "react";

function LogoutUser(){
    let [isLoggedIn, setLogin] = useContext(mycontext)
    let navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLogin(false);
        navigate("/login");
    }
    const cancellogout = ()=>{
            navigate("/view");
    }

    useEffect(()=>{
        if(isLoggedIn === false){
            navigate("/login")
        }

    },[isLoggedIn])
    return  (
        <div className="logout-container">
            <div className="logout-card">
                <h2>Logout</h2>
                <p>Are you sure you want to logout?</p>
                <div className="logout-buttons">
                    <button className="btn-logout" onClick={logout}>Logout</button>
                    <button className="btn-cancel" onClick={cancellogout}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default LogoutUser