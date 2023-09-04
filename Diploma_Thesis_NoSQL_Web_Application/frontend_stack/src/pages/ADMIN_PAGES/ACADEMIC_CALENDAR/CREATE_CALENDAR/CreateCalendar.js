import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../../src/components/LOGIN";
import CalendarNavbar from "../../../ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/CalendarNavbar";
import CalendarContainer from "./CalendarContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/createCalendar.scss';


const CreateCalendar = () => {
    let connectedUser = {identity : '', data : null}; 
    const [rightSideBar, setRightSideBar] = useState(true);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    // Check the user connection
    let token = localStorage.getItem('token') 

    // Control the left sidebar state
    useEffect(()=> {
        if (rightSideBar === true) {
            setLeftSide('left-wrapper');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper');        // left side open
        }
        else if (rightSideBar === false) {
            setLeftSide('left-wrapper close');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper open');   // left side close
        }
    }, [rightSideBar])

    const navigate = useNavigate()
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

   
    return(
        <>
        {token !== 'null' ?
        <div className="create_calendar_page">  
            <div className="create_calendar_scroll_page">
                <div className="create_calendar_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='create_calendar'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CalendarNavbar  action = 'create_calendar' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <CalendarContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CreateCalendar;