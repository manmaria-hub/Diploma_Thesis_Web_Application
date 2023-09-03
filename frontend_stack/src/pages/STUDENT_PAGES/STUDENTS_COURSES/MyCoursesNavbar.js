import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/STUDENT_COURSES/myCoursesNavbar.scss'; 
import Login from "../../../components/LOGIN";

const MyCoursesNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser;  
    const token = localStorage.getItem('token');
      
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    }
    const navigate = useNavigate();
    let [actionMySelectActive, setMySelectActive] = useState(actionActive === 'my_courses' ? 'action active': 'action'); 
    
    // Get user from local Storage
    const user = JSON.parse(localStorage.getItem('user'));
   
    const handleClick= (clicked) => { 
        if (clicked === "MyCourses") { 
            setMySelectActive("action active");   
            navigate('/uth-ece/studies/my_courses/'+ user.username)  
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="studentCourses_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Τα μαθήματά μου</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΜΑΘΗΜΑΤΑ </div></div>
                
            </div> 
            <div className="right">
                <div className="studentCourses_actions"> 
                    <div className={actionMySelectActive} onClick={()=>handleClick("UploadDeclaration")}>Τα μαθήματά μου</div>  
                </div>
            </div>
        </div>
        </>
    )
}

export default MyCoursesNavbar;