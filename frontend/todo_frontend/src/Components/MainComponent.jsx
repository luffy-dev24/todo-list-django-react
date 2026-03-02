import ViewTasks from "./ViewTasks";
import AddTask from "./AddTask";
import {Route , Routes} from "react-router-dom"
import RegisterUser from "./RegisterUser";
import UpdateTask from "./UpdateTask";
import LoginUser from "./LoginUser";
import LogoutUser from "./LogoutUser";
import {  useContext, useState } from "react";
import { mycontext } from "../App";




function MainComponent(){
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginUser/>}></Route>
                <Route path="/register" element={<RegisterUser/>}></Route>
                <Route path="/view" element={<ViewTasks/>}></Route>
                <Route path="/add" element={<AddTask/>}></Route>
                <Route path="/update/:pk" element={<UpdateTask/>}></Route>
                <Route path="/logout" element={<LogoutUser/>}></Route>
            </Routes>
        </div>
    )
}
export default MainComponent;