import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

// CSS Styles
import '../../../../../src/styles/pages/DEPARTMENT/BUILDING/departmentNavbar.scss'

const DepartmentNavbar = (props) => {
    // Taking arguments that will determine the current list item
    const actionActive = props.action; 

    const navigate = useNavigate();
    
    let [actionAddHallActive, setActionAddHallActive] = useState(actionActive === 'add_hall' ? 'action active': 'action');

   
    const handleClick= (clicked) => { 
        if (clicked === "AddHall") {  
            setActionAddHallActive("action active");
            navigate('/uth-ece_admin/add_hall')
        }
    }

    return(        
        <div className="hall_navbar">
            <div className="left">
                <div className="Title">Νέο Κτίριο Τμήματος</div> 
 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΤΜΗΜΑ / ΝΕΟ ΚΤΙΡΙΟ ΤΜΗΜΑΤΟΣ ΗΜΜΥ</div></div>
                
            </div>
            <div className="right">
                <div className="students_actions">                     
                    <div className={actionAddHallActive} onClick={()=>handleClick("AddHall")}>Εισαγωγή Αίθουσας</div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentNavbar;