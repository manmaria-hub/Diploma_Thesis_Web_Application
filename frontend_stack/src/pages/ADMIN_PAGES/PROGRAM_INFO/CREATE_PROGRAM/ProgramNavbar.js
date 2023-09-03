import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/PROGRAM_INFO/CREATE_PROGRAM/programNavbar.scss'; 

const ProgramNavbar = (props) => {
    // Taking arguments that will determine the current list item
    const actionActive = props.action; 

    const navigate = useNavigate();
    
    let [actionCreateProgramActive, setActionCreateProgramActive] = useState(actionActive === 'create_program' ? 'action active': 'action');

   
    const handleClick= (clicked) => { 
        if (clicked === "CreateProgram") { 
            setActionCreateProgramActive("action active");
            navigate('/uth-ece_admin/create_program')
        }
    }

    return(
        <div className="program_navbar">
            <div className="left">
                <div className="Title">Πρόγραμμα</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΠΡΟΓΡΑΜΜΑ</div></div>
                
            </div>
            <div className="right">
                <div className="program_actions"> 
                    <div className={actionCreateProgramActive} onClick={()=>handleClick("CreateProgram")}>Δημιουργία Προγράμματος</div>
                </div>
            </div>
        </div>
    )
}

export default ProgramNavbar;