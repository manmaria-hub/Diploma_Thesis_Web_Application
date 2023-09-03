import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// Components
import Login from "../../../../src/components/LOGIN";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/PROFESSOR_INFO/professorListNavbar.scss';  

const ProfessorListNavbar = (props) => {
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
    let [actionProfessorListActive, setActionProfessorListActive] = useState(actionActive === 'professor_list' ? 'action active': 'action'); 
    let [actionProfessorProfileActive, setActionProfessorProfileActive] = useState(actionActive === 'professor_profile' ? 'action active': 'action'); 
    let [actionProfessorEditActive, setProfessorEditActive] = useState(actionActive === 'professor_edit' ? 'action active': 'action')
   
    const handleClick= (clicked) => { 
        if (clicked === "ProfessorList") { 
            setActionProfessorListActive("action active");   
            setActionProfessorProfileActive("action"); 
            setProfessorEditActive('action');
            navigate('/uth-ece_admin/add_course')  
        } 
        if (clicked === "ProfessorProfile") { 
            setActionProfessorListActive("action");   
            setActionProfessorProfileActive("action active"); 
            setProfessorEditActive('action');
        }  
        if (clicked === "ProfessorEdit") { 
            setActionProfessorListActive("action");   
            setActionProfessorProfileActive("action"); 
            setProfessorEditActive('action active');
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="professor_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Διδακτικό Προσωπικό</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΤΜΗΜΑ / ΚΑΘΗΓΗΤΕΣ </div></div>
                
            </div>
            {JSON.parse(userRole).role === 'admin' ?
            <div className="right">
                <div className="faculty_actions"> 
                    <div className={actionProfessorListActive} onClick={()=>handleClick("CoursesList")}>Λίστα Καθηγητών</div> 
                    <div className={actionProfessorProfileActive} onClick={()=>handleClick("CourseProfile")}>Προφίλ Καθηγητή</div>  
                </div>
            </div> : 
            <div className="right">
                <div className="faculty_actions">  
                    <div className={actionProfessorListActive} onClick={()=>handleClick("CoursesList")}>Λίστα Καθηγητών</div> 
                    <div className={actionProfessorProfileActive} onClick={()=>handleClick("CourseProfile")}>Προφίλ Καθηγητή</div> 
                </div>
            </div>}
        </div>
        </>
    )
}

export default ProfessorListNavbar;