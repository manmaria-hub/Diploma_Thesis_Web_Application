/*import React from "react";

// Components 
import AdminNavbar from "../../AdminNavbar";
import CoursesCompNavbar from "./coursesCompNavbar";
import AddCourseContainer from "./addCourseContainer";

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCourse.scss';

const AddCourse = () => {
       
    return(
        <div className="course_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">                    
                    <AdminNavbar/>
                    <CoursesCompNavbar action = 'add_course' studies = 'all'/>
                    <AddCourseContainer/>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;
*/
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../../src/components/LOGIN";
import CoursesNavbar from "../../../FOR_ALL_PAGES/CoursesNavbar";
import AddCourseContainer from "../ADD_COURSES/addCourseContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCourse.scss'


const AddCourse = () => { 
    const [rightSideBar, setRightSideBar] = useState(true);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	  }

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
        <div className="add_course_page">  
            <div className="add_course_scroll_page">
                <div className="add_course_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document = 'add_course'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesNavbar  action = 'add_course' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <AddCourseContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default AddCourse;