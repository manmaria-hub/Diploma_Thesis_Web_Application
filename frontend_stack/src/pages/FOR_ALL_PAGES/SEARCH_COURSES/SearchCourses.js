import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../components/LOGIN";
import SearchCoursesNavbar from "./SearchCoursesNavbar";
import SearchCoursesContainer from "./SearchCoursesContainer";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/SEARCH_COURSES/searchCourses.scss';


const SearchCourses = () => { 
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
        <div className="search_courses_page">  
            <div className="search_courses_scroll_page">
                <div className="search_courses_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='courses_search'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <SearchCoursesNavbar  action = 'search_courses' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <SearchCoursesContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default SearchCourses;