import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../../src/styles/pages/STUDENT_PAGES/COURSES_DECLARATION/SUBMIT_DECLARATION/coursesDeclarationNavbar.scss'; 
import Login from "../../../../components/LOGIN";

const CoursesDeclarationNavbar = (props) => {
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
    let [actionUploadDeclarationActive, setActionUploadDeclarationActive] = useState(actionActive === 'submit_declaration' ? 'action active': 'action'); 
    let [actionViewAllDeclarationsActive, setActionViewAllDeclarationsActive] = useState(actionActive === 'view_allDeclarations' ? 'action active': 'action'); 
       
    const handleClick= (clicked) => { 
        if (clicked === "UploadDeclaration") { 
            setActionUploadDeclarationActive("action active");   
            setActionViewAllDeclarationsActive("action"); 
            navigate('/e_secretariat/submit_my_course_declaration')  
        } 
        if (clicked === "ViewAllDeclarations") { 
            setActionUploadDeclarationActive("action");  
            setActionViewAllDeclarationsActive("action active");
            navigate('/e_secretariat/view_my_declarations');
        }  
    } 

    return(
        token === null ? <Login/> :
        <>
        <div className="coursesDeclaration_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Δηλώσεις Μαθημάτων</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΓΡΑΜΜΑΤΕΙΑ / ΔΗΛΩΣΕΙΣ </div></div>
                
            </div>          
            <div className="right">
                <div className="coursesDeclaration_actions"> 
                {JSON.parse(localStorage.getItem('userIdentity')).identity !== 'ΓΡΑΜΜΑΤΕΙΑ' && JSON.parse(localStorage.getItem('userIdentity')).identity !== 'ΚΑΘΗΓΗΤΗΣ' ?
                    <div className={actionUploadDeclarationActive} onClick={()=>handleClick("UploadDeclaration")}>Υποβολή Δήλωσης</div>  : null }                 
                    <div className={actionViewAllDeclarationsActive} onClick={()=>handleClick("ViewAllDeclarations")}>Οι Δηλώσεις μου</div> 
                </div>
            </div> 
        </div>
        </>
    )
}

export default CoursesDeclarationNavbar;