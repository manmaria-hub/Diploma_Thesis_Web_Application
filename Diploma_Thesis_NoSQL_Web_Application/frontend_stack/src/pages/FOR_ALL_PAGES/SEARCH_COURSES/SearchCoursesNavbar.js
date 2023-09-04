import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// Components
import Login from "../../../components/LOGIN";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/SEARCH_COURSES/searchCoursesNavbar.scss';  

const SearchCoursesNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser;  
    const token = localStorage.getItem('token');
      
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    }
    const navigate = useNavigate();
    let [actionSearchCoursesActive, setActionSearchCoursesActive] = useState(actionActive === 'search_courses' ? 'action active': 'action');      
   
    const handleClick= (clicked) => { 
        if (clicked === "SearchCourses") { 
            setActionSearchCoursesActive("action active");   
            navigate('/uth-ece/search_courses')  
        }  
    }

    return(
        token === null ? <Login/> :
        <>
        <div className="search_courses_navbar">
            <div className="left">
                <div className="Title" style={{letterSpacing:'0.5px'}}>Μαθήματα</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΜΑΘΗΜΑΤΑ </div></div>
                
            </div> 
            <div className="right">
                <div className="faculty_actions">  
                    <div className={actionSearchCoursesActive} onClick={()=>handleClick("SearchCourses")}>Αναζήτηση Μαθημάτων</div>  
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchCoursesNavbar;