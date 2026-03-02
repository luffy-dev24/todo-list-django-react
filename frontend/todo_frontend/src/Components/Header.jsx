import { Link } from "react-router-dom";
import "../css/Header.css";
import { useContext } from "react";
import { mycontext } from "../App";

function Header(){
    let [isloggedin] = useContext(mycontext)
    return (
        <div className="header">
            <div className="rigth-side">
                <p>ToDo</p>
            </div>
            <div className="left-side">
                <ul>
                    <li><Link to="/add">Add</Link></li>
                    <li><Link to="/view">View</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}
export default Header;