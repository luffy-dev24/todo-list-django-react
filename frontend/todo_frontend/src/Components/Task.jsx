import axios from "axios"
import "../Css/Task.css"
import { useNavigate } from "react-router-dom"


function Task(props){
    
    return (
        <div className="task-box">
            <p onClick={()=>props.onupdate(props.pk)}>{props.title}</p>
            <button onClick={()=>props.ondelete(props.pk)}>Delete</button>
        </div>
    )
}
export default Task