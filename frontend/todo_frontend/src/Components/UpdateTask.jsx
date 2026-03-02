import { useContext, useEffect, useRef, useState } from "react";
import { mycontext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import axios, { Axios } from "axios";
useRef
Axios
useParams


function UpdateTask(props){
    let  {pk} = useParams()
    const [isLoggedIn, setLogin] = useContext(mycontext);
    let [data,setData] = useState([])
    const title = useRef();
    const navigate = useNavigate();

    //----refresh token logic
    const RefreshTokenFunction = async () => {
        try {
            const refresh_token = localStorage.getItem("refreshToken");

            const response = await axios.post(
            "http://127.0.0.1:8000/accounts/token/refresh/",
            { refresh: refresh_token }
            );

            localStorage.setItem("accessToken", response.data.access);
            return response.data.access;

        } catch (err) {
            localStorage.clear();
            navigate("/login");
            return null;
        }
    };
    //-----------

    let update = async (pk)=>{
        let put_url = "http://127.0.0.1:8000/tasks/update/"+pk+"/";
        let access_token = localStorage.getItem("accessToken");
        let inputdata = {
            "title": title.current.value
        }
        try{
            let resp = await axios.put(put_url,inputdata,{headers:{
                "Authorization":"Bearer "+ access_token
            }})
            navigate("/view")
        }catch (err){
            if(err.response?.status === 401){
                let new_access_token = await RefreshTokenFunction();
                if(new_access_token){
                    let resp = await axios.put(put_url,inputdata,{headers:{
                        "Authorization":"Bearer "+ access_token
                    }})
                    navigate("/view")
                }else{
                    navigate("/login")
                }

            }

        }
        
    }

    const GetEmployeeDataFromApi = async () => {
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/tasks/update/"+pk+"/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            title.current.value = res.data.title;
            setData(res.data);

        } catch (err) {
            console.error("Failed to fetch task", err);
        }
    };

    useEffect(()=>{
        if(isLoggedIn === false){
            navigate("/login")
        }
        GetEmployeeDataFromApi()
    },[])


    return (
        <div>
            <div className="addtask-box">
                <label>
                    Title:
                    <input type="text" ref={title} />
                    <br />
                    <button onClick={()=>update(pk)}>Update</button>
                    <button onClick={()=>{navigate("/view")}}>Cancel</button>
                </label>
            </div>
        </div>
    );
}
export default UpdateTask;