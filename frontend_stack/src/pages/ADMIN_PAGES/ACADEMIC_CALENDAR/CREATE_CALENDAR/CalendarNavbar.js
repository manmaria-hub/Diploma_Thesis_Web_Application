import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/calendarNavbar.scss';

const ProgramNavbar = (props) => {
    // Taking arguments that will determine the current list item
    const actionActive = props.action; 

    const navigate = useNavigate();
    
    let [actionCreateCalendarActive, setActionCreateCalendarActive] = useState(actionActive === 'create_calendar' ? 'action active': 'action');

   
    const handleClick= (clicked) => { 
        if (clicked === "CreateCalendar") { 
            setActionCreateCalendarActive("action active");
            navigate('/uth-ece_admin/create_calendar')
        }
    }

    return(
        <div className="calendar_navbar">
            <div className="left">
                <div className="Title">Ακαδημαϊκό Ημερολόγιο</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΑΚΑΔΗΜΑΪΚΟ ΗΜΕΡΟΛΟΓΙΟ</div></div>
                
            </div>
            <div className="right">
                <div className="calendar_actions"> 
                    <div className={actionCreateCalendarActive} onClick={()=>handleClick("CreateCalendar")}>Δημιουργία Ημερολογίου</div>
                </div>
            </div>
        </div>
    )
}

export default ProgramNavbar;