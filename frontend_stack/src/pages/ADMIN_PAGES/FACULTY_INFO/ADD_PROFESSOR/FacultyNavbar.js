import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/FACULTY_INFO/ADD_PROFESSOR/facultyNavbar.scss'; 
import Login from "../../../../components/LOGIN";

const FacultyNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser;
    console.log(actionActive)
    const userRole = localStorage.getItem('user');
    const token = localStorage.getItem('token');
     
    //console.log(JSON.parse(userRole).role )
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    }
    const navigate = useNavigate();
    let [actionAddProfessorActive, setActionAddProfessorActive] = useState(actionActive === 'add_professor' ? 'action active': 'action'); 
    let [actionEditProfessorActive, setActionEditProfessorActive] = useState(actionActive === 'edit_professor' ? 'action active': 'action'); 
    let [actionViewProfessorActive, setActionViewProfessorActive] = useState(actionActive === 'view_professorsList' ? 'action active': 'action'); 
    
   
    const handleClick= (clicked) => { 
        if (clicked === "AddProfessor") { 
            setActionAddProfessorActive("action active");   
            setActionViewProfessorActive("action"); 
            setActionViewProfessorActive("action"); 
            navigate('/uth-ece_admin/add_professor')  
        } 
        if (clicked === "EditProfessor") { 
            setActionAddProfessorActive("action");   
            setActionEditProfessorActive("action active"); 
            setActionViewProfessorActive("action");   
            navigate('/uth-ece_admin/edit_professor')  
        } 
        if (clicked === "ViewProfessors") { 
            setActionAddProfessorActive("action");  
            setActionViewProfessorActive("action active");   
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="faculty_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>ΚΑΘΗΓΗΤΕΣ</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΠΡΟΣΩΠΙΚΟ / ΚΑΘΗΓΗΤΕΣ</div></div>
                
            </div>
            {JSON.parse(userRole).role === 'admin' ?
            <div className="right">
                <div className="faculty_actions"> 
                    <div className={actionAddProfessorActive} onClick={()=>handleClick("AddProfessor")}>Προσθήκη Καθηγητή</div> 
                    <div className={actionEditProfessorActive} onClick={()=>handleClick("EditProfessor")}>Ανανέωση Καθηγητή</div> 
                    <div className={actionViewProfessorActive} onClick={()=>handleClick("ViewProfessors")}>Λίστα Καθηγητών</div> 
                </div>
            </div> : 
            <div className="right">
                <div className="faculty_actions">  
                     <div className={actionViewProfessorActive} onClick={()=>handleClick("ViewProfessors")}>Λίστα Καθηγητών</div> 
                </div>
            </div>}
        </div>
        </>
    )
}

export default FacultyNavbar;