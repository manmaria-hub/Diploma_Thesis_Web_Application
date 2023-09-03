import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT_FINAL/studentNavbar.scss'; 
import Login from "../../../../components/LOGIN";

const FacultyNavbar = (props) => {
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
    let [actionAddStudentActive, setActionAddStudentActive] = useState(actionActive === 'add_student' ? 'action active': 'action'); 
    let [actionEditStudentActive, setActionEditStudentActive] = useState(actionActive === 'edit_student' ? 'action active': 'action'); 
    let [actionViewStudentsActive, setActionViewStudentsActive] = useState(actionActive === 'student_list' ? 'action active': 'action'); 
    
   
    const handleClick= (clicked) => { 
        if (clicked === "AddStudent") { 
            setActionAddStudentActive("action active");  
            setActionEditStudentActive("action"); 
            setActionViewStudentsActive("action"); 
            navigate('/uth-ece_admin/add_student')  
        } 
        if (clicked === "EditStudent") { 
            setActionAddStudentActive("action");   
            setActionEditStudentActive("action active");
            setActionViewStudentsActive("action"); 
            navigate('/uth-ece_admin/edit_student')  
        } 
        if (clicked === "ViewStudents") { 
            setActionAddStudentActive("action");   
            setActionEditStudentActive("action");              
            setActionViewStudentsActive("action active");  
            navigate('/uth-ece/students_list')   
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="student_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Φοιτητές</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΦΟΙΤΗΤΕΣ </div></div>
                
            </div>
            {JSON.parse(userRole).role === 'admin' ?
            <div className="right">
                <div className="faculty_actions"> 
                    <div className={actionAddStudentActive} onClick={()=>handleClick("AddStudent")}>Προσθήκη Φοιτητή</div> 
                    <div className={actionEditStudentActive} onClick={()=>handleClick("EditStudent")}>Ανανέωση Φοιτητή</div> 
                    <div className={actionViewStudentsActive} onClick={()=>handleClick("ViewStudents")}>Λίστα Φοιτητών</div> 
                </div>
            </div> : 
            <div className="right">
                <div className="faculty_actions">  
                     <div className={actionViewStudentsActive} onClick={()=>handleClick("ViewStudents")}>Λίστα Φοιτητών</div> 
                </div>
            </div>}
        </div>
        </>
    )
}

export default FacultyNavbar;