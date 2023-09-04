import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../../pages/ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../pages/ADMIN_PAGES/AdminNavbar";
import Login from "../../../components/LOGIN";
import CoursesNavbar from "../CoursesNavbar";
import PostGraduateCoursesContainer from "./PostGraduateCoursesContainer";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/COURSES_INFO/POSTGRADUATE_COURSES_LIST/postCoursesList.scss';


const PostCoursesList = () => { 
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
        <div className="post_courses_list_page">  
            <div className="post_courses_list_scroll_page">
                <div className="post_courses_list_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='post_courses'/>         
                        
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesNavbar action ='courses_list' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <PostGraduateCoursesContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default PostCoursesList;