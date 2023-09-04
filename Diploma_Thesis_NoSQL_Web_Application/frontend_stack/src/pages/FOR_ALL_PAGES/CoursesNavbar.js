import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// Components
import Login from "../../components/LOGIN";

// CSS Styles
import '../../../src/styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT_FINAL/studentNavbar.scss';  

const CoursesNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser; 
    const userRole = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    }
    const navigate = useNavigate();
    let [actionCourseProfileActive, setActionCourseProfileActive] = useState(actionActive === 'course_profile' ? 'action active': 'action'); 
    let [actionAddCourseActive, setActionAddCourseActive] = useState(actionActive === 'add_course' ? 'action active': 'action'); 
    let [actionCourseListActive, setActionCourseListActive] = useState(actionActive === 'courses_list' ? 'action active': 'action');
    
   
    const handleClick= (clicked) => { 
        if (clicked === "AddCourse") { 
            setActionAddCourseActive("action active");   
            setActionCourseProfileActive("action"); 
            setActionCourseListActive('action');
            navigate('/uth-ece_admin/add_course')  
        } 
        if (clicked === "CourseProfile") { 
            setActionAddCourseActive("action");   
            setActionCourseProfileActive("action active"); 
            setActionCourseListActive('action');
        }  
        if (clicked === "CoursesList") { 
            setActionAddCourseActive("action");   
            setActionCourseProfileActive("action"); 
            setActionCourseListActive('action active');
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="student_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Μαθήματα</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΜΑΘΗΜΑΤΑ </div></div>
                
            </div>
            {JSON.parse(userRole).role === 'admin' ?
            <div className="right">
                <div className="faculty_actions"> 
                    <div className={actionCourseListActive} onClick={()=>handleClick("CoursesList")}>Λίστα Μαθημάτων</div> 
                    <div className={actionCourseProfileActive} onClick={()=>handleClick("CourseProfile")}>Προφίλ Μαθήματος</div> 
                    <div className={actionAddCourseActive} onClick={()=>handleClick("AddCourse")}>Προσθήκη Νέου Μαθήματος</div> 
                </div>
            </div> : 
            <div className="right">
                <div className="faculty_actions">  
                    <div className={actionCourseListActive} onClick={()=>handleClick("CoursesList")}>Λίστα Μαθημάτων</div> 
                    <div className={actionCourseProfileActive} onClick={()=>handleClick("CourseProfile")}>Προφίλ Μαθήματος</div> 
                </div>
            </div>}
        </div>
        </>
    )
}

export default CoursesNavbar;