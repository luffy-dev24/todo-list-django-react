import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "../App";
import "../css/LoginUser.css";

function LoginUser() {
    let [isLoggedIn, setLogin] = useContext(mycontext);
    let navigate = useNavigate();
    let usernameREF = useRef();
    let passwordREF = useRef();

    let login = () => {
        let credentials = {
            "username": usernameREF.current.value,
            "password": passwordREF.current.value
        };
        let login_post_url = "http://127.0.0.1:8000/accounts/login/";
        axios.post(login_post_url, credentials).then((resp) => {
            console.log(resp);
            setLogin(true);
            localStorage.setItem("accessToken", resp.data.access);
            localStorage.setItem("refreshToken", resp.data.refresh);
            navigate("/view");
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome Back</h2>

                <label>
                    Username
                    <input ref={usernameREF} type="text" placeholder="Enter username" />
                </label>

                <label>
                    Password
                    <input ref={passwordREF} type="password" placeholder="Enter password" />
                </label>

                <button onClick={login}>Login</button>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
}

export default LoginUser;