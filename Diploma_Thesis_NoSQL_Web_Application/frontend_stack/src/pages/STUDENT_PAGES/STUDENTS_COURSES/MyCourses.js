import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../components/LOGIN";
import MyCoursesNavbar from "./MyCoursesNavbar";
import MyCoursesContainer from "./MyCoursesContainer";

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/STUDENT_COURSES/myCourses.scss';


const StudentCourses = () => { 
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
        <div className="student_courses_page">  
            <div className="student_courses_scroll_page">
                <div className="student_courses_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='my_courses'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <MyCoursesNavbar action = 'my_courses' connectedUser={localStorage.getItem('userIdentity')}/>  
                        <MyCoursesContainer/> 
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default StudentCourses;