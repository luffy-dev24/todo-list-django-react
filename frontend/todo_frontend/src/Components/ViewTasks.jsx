import { useContext, useEffect,useState } from "react";
import axios from "axios"
import Task from "./Task";
import "../Css/ViewTasks.css"
import { mycontext } from "../App";
import { useNavigate } from "react-router-dom";
import UpdateTask from "./UpdateTask";
useNavigate
useContext

function ViewTasks(){
    let [isLoggedIn, setLogin] = useContext(mycontext)
    let [data,setData] = useState([])
    let [updatedata,setUpdate] = useState([])
    let navigate = useNavigate()

    //-- refresh token function ----
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

    //---------------------------------

    //fetching data function 
    const getdatafromAPI = async () => {
        const get_url = "http://127.0.0.1:8000/tasks/addtask/";

        try {
            const resp = await axios.get(get_url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            });

            setData(resp.data);
            console.log(data)

        } catch (err) {
            if (err.response?.status === 401) {

                const newAccessToken = await RefreshTokenFunction();

                if (newAccessToken) {
                    const retryResp = await axios.get(get_url, {
                        headers: {
                        Authorization: "Bearer " + newAccessToken,
                        },
                    });

                    setData(retryResp.data);
                }
            }
        }
    };
    //---------------------
    useEffect(()=>{
        if(isLoggedIn === false){
            navigate("/login")
        }
        getdatafromAPI();
    },[isLoggedIn])

    let delete_task = async (pk) => {
        let access_token = localStorage.getItem("accessToken")
        console.log("pk is. :", pk);
        let delete_url = "http://127.0.0.1:8000/tasks/update/"+pk+"/";
        
        try {
            const resp = await axios.delete(delete_url,{
                headers:{ "Authorization": "Bearer " + access_token }
            });
            console.log(resp);
            setData(prevData => prevData.filter(task => task.id !== pk));
            navigate("/view")
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
                const newAccessToken = await RefreshTokenFunction();
                if (newAccessToken) {
                    await axios.delete(delete_url, {
                        headers: { "Authorization": "Bearer " + newAccessToken },
                    });
                    setData(prevData => prevData.filter(task => task.id !== pk));
                    navigate("/view")
                }
            }
        }
    };

    let update_task =(pk)=>{
        navigate("/update/"+pk)

    }

    return (
        <div className="box">
            <h1>Tasks</h1>
            <br />
            {data.length > 0 && (
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                    💡 Click on a task title to update it.
                </p>
            )}
            {
                data.length > 0 ? (
                    data.map((d, idx) => (
                        <Task
                            key={d.id}
                            title={d.title}
                            pk={d.id}
                            ondelete={delete_task}
                            onupdate={update_task}
                        />
                    ))
                ) : (
                    <h2>No task added yet</h2>
                )
            }
        </div>
    );
}
export default ViewTasks