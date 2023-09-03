import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 

// Components
import AdminSidebar from "../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../src/components/LOGIN";
import ProfessorListNavbar from "../PROFESSOR_INFO/ProfessorListNavbar";
import ProfessorProfileContainer from "./ProfessorProfileContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT_FINAL/addStudent.scss'

const ProfessorProfile = () => {
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

   
    return(
        <>
        {token !== 'null' ?
        <div className="professor_profile_page">  
            <div className="professor_profile_scroll_page">
                <div className="professor_profile_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <ProfessorListNavbar action = 'professor_profile' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <ProfessorProfileContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default ProfessorProfile;