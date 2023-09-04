import React, {useState, useEffect} from "react";
import { useNavigate , useParams } from "react-router-dom"; 

// Components
import AdminSidebar from "../../../../../src/pages/ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../components/LOGIN";
import CourseGradingNavbar from "./CourseGradingNavbar";
import CourseGradingContainer from "./CourseGradingContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/FACULTY_INFO/COURSE_GRADING/courseGrading.scss';


const CourseGrading = () => { 
    const {prof_username, course_code} = useParams(); 
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
        <div className="add_student_page">  
            <div className="student_scroll_page">
                <div className="add_student_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CourseGradingNavbar action = 'grading' connectedUser={localStorage.getItem('userIdentity')}/>  
                        <CourseGradingContainer prof={prof_username} course_code = {course_code}/> 
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CourseGrading;