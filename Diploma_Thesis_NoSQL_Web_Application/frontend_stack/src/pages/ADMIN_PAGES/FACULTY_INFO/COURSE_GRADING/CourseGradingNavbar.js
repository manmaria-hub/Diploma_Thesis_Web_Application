import React, {useState} from "react";
import { useLocation } from "react-router-dom"; 

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/FACULTY_INFO/COURSE_GRADING/courseGradingNavbar.scss'; 
import Login from "../../../../components/LOGIN";

const CourseGradingNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser;  
    const token = localStorage.getItem('token');
      
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    } 
    let [courseGradingActive, setCourseGradingActive] = useState(actionActive === 'grading' ? 'action active': 'action'); 
        
    const handleClick= (clicked) => { 
        if (clicked === "CourseGrading") { 
            setCourseGradingActive("action active");                
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="coursesGrading_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Καταχώρηση Βαθμολογίας</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΒΑΘΜΟΛΟΓΙΑ </div></div>
                
            </div> 
            <div className="right">
                <div className="coursesGrading_actions"> 
                    <div className={courseGradingActive} onClick={()=>handleClick("UploadDeclaration")}>Βαθμολογία Μαθήματος</div>  
                </div>
            </div>
        </div>
        </>
    )
}

export default CourseGradingNavbar;