
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import AdminSidebar from "../../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../components/LOGIN";
import CoursesNavbar from "../../CoursesNavbar";
import CourseProfileContainer from "./CourseProfileContainer";

// CSS Styles
import '../../../../../src/styles/pages/FOR_ALL_PAGES/COURSES_INFO/COURSE_PROFILE/courseProfile.scss'


const CourseProfile = () => { 
    const [rightSideBar, setRightSideBar] = useState(true);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    // Check the user connection
    let token = localStorage.getItem('token') 
    // Taking the parameters about study level and course's code from the Route Path of the page
    const {studies_level, course_code} = useParams(); 

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
        <div className="course_profile_page">  
            <div className="course_profile_scroll_page">
                <div className="course_profile_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesNavbar action ='course_profile' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <CourseProfileContainer connectedUser={localStorage.getItem('userIdentity')} courseCode = {course_code}/>               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CourseProfile;