import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Css/RegisterUser.css"

function RegisterUser(){
    let usernameRef = useRef();
    let emailRef = useRef();
    let passswordRef = useRef();
    let navigate = useNavigate()



    let register = ()=>{
        let inputData ={
            "username":usernameRef.current.value,
            "email":emailRef.current.value,
            "password":passswordRef.current.value,
        }
        let post_url = "http://127.0.0.1:8000/accounts/register/";
        axios.post(post_url,inputData).then((resp)=>{
            console.log(resp);
            if(resp.status === 201){
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="container">
            <div className="form">
                <h2>Create Account</h2>

                <label>
                    Username
                    <input ref={usernameRef} type="text" placeholder="Enter username" />
                </label>

                <label>
                    Email
                    <input ref={emailRef} type="email" placeholder="Enter email" />
                </label>

                <label>
                    Password
                    <input ref={passswordRef} type="password" placeholder="Enter password" />
                </label>

                <button onClick={register}>Register</button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
export default RegisterUser;