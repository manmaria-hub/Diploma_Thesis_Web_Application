import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../../../../src/pages/ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../components/LOGIN";
import ProfessorCoursesNavbar from "./ProfessorCoursesNavbar";
import ProfessorCoursesContainer from "./ProfessorCoursesContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/FACULTY_INFO/COURSES_PROFESSOR/professorCourses.scss';


const CoursesDeclaration = () => { 
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
        <div className="professor_courses_page">  
            <div className="professor_courses_scroll_page">
                <div className="professor_courses_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='my_courses'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <ProfessorCoursesNavbar action = 'my_courses' connectedUser={localStorage.getItem('userIdentity')}/>  
                        <ProfessorCoursesContainer/> 
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CoursesDeclaration;