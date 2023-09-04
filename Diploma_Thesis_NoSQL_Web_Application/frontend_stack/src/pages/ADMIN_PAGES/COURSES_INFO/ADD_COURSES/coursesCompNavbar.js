import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/coursesNavbar.scss'

const CoursesCompNavbar = (props) => {
    // Taking arguments that will determine the current list item
    const actionActive = props.action;
    const studiesLevel = props.studies;

    const navigate = useNavigate();

    let [actionListActive, setActionListActive] = useState('action');
    let [actionProfilActive, setActionProfilActive] = useState(actionActive === 'course_profile' ? 'action active' : 'action');

    let [actionAddCourseActive, setActionAddCourseActive] = useState(actionActive === 'add_course' ? 'action active': 'action');

   
    const handleClick= (clicked) => {
        if (clicked === "List") {
            setActionListActive("action active");
            setActionProfilActive("action"); 
            setActionAddCourseActive("action");
        }
        else if (clicked === "Profil") {
            setActionListActive("action");
            setActionProfilActive("action active"); 
            setActionAddCourseActive("action");
        } 
        else if (clicked === "AddCourse") {
            setActionListActive("action");
            setActionProfilActive("action"); 
            setActionAddCourseActive("action active");
            navigate('/uth-ece_admin/add_course')
        }
    }

    return(
        <div className="courses_navbar">
            <div className="left">
                <div className="Title">Μαθήματα</div> 
                {studiesLevel === 'undergraduate' ?
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path" style={{wordSpacing:'2px'}}>/ ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ / ΜΑΘΗΜΑΤΑ</div></div>
                :
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΣΠΟΥΔΕΣ / ΜΑΘΗΜΑΤΑ</div></div>}
                
            </div>
            <div className="right">
                <div className="courses_actions">
                    <div className={actionListActive} onClick={()=>handleClick("List")}>Λίστα Μαθημάτων</div>
                    <div className={actionProfilActive} onClick={()=>handleClick("Profil")}>Πληροφορίες Μαθήματος</div> 
                    <div className={actionAddCourseActive} onClick={()=>handleClick("AddCourse")}>Εισαγωγή Μαθήματος</div>
                </div>
            </div>
        </div>
    )
}

export default CoursesCompNavbar;