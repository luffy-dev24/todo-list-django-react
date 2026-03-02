import { useEffect, useRef } from "react";
import "../css/AddTask.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { mycontext } from "../App";



function AddTask() {
  const [isLoggedIn, setLogin] = useContext(mycontext);
  const title = useRef();
  const navigate = useNavigate();

  // refresh token function
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

  // add task
  const postdata = async () => {
    const post_url = "http://127.0.0.1:8000/tasks/addtask/";
    const inputdata = { title: title.current.value };

    try {
      await axios.post(post_url, inputdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      navigate("/view");

    } catch (err) {
      if (err.response?.status === 401) {
        const new_access_token = await RefreshTokenFunction();

        if (new_access_token) {
          await axios.post(post_url, inputdata, {
            headers: {
              Authorization: "Bearer " + new_access_token,
            },
          });
          navigate("/view");
        }
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="addtask-box">
      <label>
        Title:
        <input type="text" ref={title} />
        <br />
        <button onClick={postdata}>Add</button>
      </label>
    </div>
  );
}

export default AddTask;