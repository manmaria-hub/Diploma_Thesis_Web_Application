import React, {useState} from "react";

// CSS Styles
import "../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/studentsNavbar.scss";

const StudentsCompNavbar = (props) => {

    let [actionListActive, setActionListActive] = useState('action');
    let [actionProfilActive, setActionProfilActive] = useState('action');
    let [actionAddActive, setActionAddActive] = useState('action');

    if (props.activeSelection === 'ADD_STUDENT') {
        actionAddActive = 'action active';
    }
    
    const handleClick= (clicked) => {
        if (clicked === "List") {
            setActionListActive("action active");
            setActionProfilActive("action");
            setActionAddActive("action");
        }
        else if (clicked === "Profil") {
            setActionListActive("action");
            setActionProfilActive("action active");
            setActionAddActive("action");
        }
        else if (clicked === "Add") {
            setActionListActive("action");
            setActionProfilActive("action");
            setActionAddActive("action active");
        }
    }
                                                                              
    return(
        <div className="students_navbar">
            <div className="left">
                <div className="Title">Φοιτητές</div>
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/  ΦΟΙΤΗΤΕΣ</div></div>
                
            </div>
            <div className="right">
                <div className="students_actions">
                    <div className={actionListActive} onClick={()=>handleClick("List")}>Λίστα Φοιτητών</div>
                    <div className={actionProfilActive} onClick={()=>handleClick("Profil")}>Προφίλ Φοιτητή</div>
                    <div className={actionAddActive} onClick={()=>handleClick("Add")}>Εισαγωγή Νέου Φοιτητή</div>
                </div>
            </div>
        </div>
    )
}

export default StudentsCompNavbar;