import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// Components 
import AdminNavbar from "../../AdminNavbar";
import CoursesCompNavbar from "./coursesCompNavbar";
import PopUp from '../../../../components/POPUP/popUp';
import AddCourseContainer from "./addCourseContainer";
import SubmitButton from "../../../../components/BUTTON/SubmitButton";
import CourseCard from "../../../../components/CARDS/CourseCard";
import AdminSidebar from "../../AdminSidebar";
import CoursesNavbar from "../../../FOR_ALL_PAGES/CoursesNavbar";

// Icons 
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; 

import InfoIcon from '@mui/icons-material/Info';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WidgetsIcon from '@mui/icons-material/Widgets'; 
import EditNoteIcon from '@mui/icons-material/EditNote';  

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCoursePreview.scss';
import Login from "../../../../components/LOGIN";

const AddCoursePreview = () => {  
    // Using useLocation() to take the parameters for the new course from the previous page
    const location = useLocation();
    // Initialize the variable that help us with the page navigation
    const navigate = useNavigate();

    // Store in the following variables the new course information from the state
    const newCourseInfo = location?.state?.newCourse;
    const graduateLevel = location?.state?.graduateLevel;
 
    // Determine the state values for the pop-up windows
    const [openPopup, setOpenPopup] = useState(false);

    // Initialize the state value for the current pop-up window
    const [popUpWindow, setPopUpWindow] = useState("");

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
  
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    return (
        <>
        {token !== 'null' ?
        <div className="add_course_page">  
            <div className="add_course_scroll_page">
                <div className="add_course_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesNavbar  action = 'add_course' connectedUser={localStorage.getItem('userIdentity')}/> 
                    
                    <div className="main">
                        <div className ='first_component'>
                            <div className="text_message">
                                Ένα νέο <p>{graduateLevel}</p> μάθημα με κωδικό μαθήματος <p>{newCourseInfo.StudyProgram.course_code}</p> πρόκειται να καταχωρηθεί
                                στην Ηλεκτρονική Γραμματεία του Τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας : 
                            </div> {/*
                            <div className="course_card">
                                <div className="infocard"> 
                                    <div className="imageContainer"><div className="iconText">{newCourseInfo.StudyProgram.course_code}</div></div>      
                                    <div className="textContainer">
                                        <h5>{newCourseInfo.StudyProgram.course_name}</h5>
                                        <div className="text_muted"> 
                                            {newCourseInfo.StudyProgram.course_label.map(item => {
                                                return(
                                                    <div key = {item} className="item_text">{item}</div>
                                                )
                                            })} 
                                        </div>
                                        <div className="table_responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><SchoolIcon className="icon"/></td>
                                                        <td className="middleText">Γνωστικό Αντικείμενο</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.study_program}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><CalendarMonthIcon className="icon"/></td>
                                                        <td className="middleText">Εξάμηνο</td>
                                                        {newCourseInfo.StudyProgram.period === 'Χειμερινή' ?
                                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο     {newCourseInfo.StudyProgram.semester} - Χειμερινό</td> :
                                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο     {newCourseInfo.StudyProgram.semester} - Εαρινό</td>}
                                                    </tr>
                                                    <tr>
                                                        <td><ClassIcon className="icon"/></td>
                                                        <td className="middleText">Τύπος Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.course_category}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><ConfirmationNumberIcon className="icon"/></td>
                                                        <td className="middleText">Μονάδες ECTS</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.ECTS}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card_footer">
                                            <div className="align_items">
                                                <AccountBoxIcon className="avatar"/>
                                                <div className="smallText">
                                                    <div className="name">{newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_FirstName} {newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_LastName} , {newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}</div>
                                                    <div className="profInfo">Yπεύθυνος Μαθήματος</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                   
                                </div>
                                        </div>*/}
                            <CourseCard newCourseInfo = {newCourseInfo}/>
                        </div>

                        <div className="checkForms">
                            <div className="check_message">
                                Πριν τη τελική καταχώρηση του νέου μαθήματος στο τμήμα επιβεβαιώστε τα στοιχεία εγγραφής του :
                            </div>
                            <div className="table_section">
                                <table>
                                    <thead>                            
                                        <tr>
                                            <th>Νο</th>                                
                                            <th>Σύμβολο</th> 
                                            <th>Κατηγορία Στοιχείων</th>  
                                            <th>Προεπισκόπιση</th>
                                        </tr>                            
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>                                
                                            <td><InfoIcon/></td> 
                                            <td>ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</td>   
                                            <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('BasicInfo_form'); setOpenPopup(true)}}/></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>                                
                                            <td><StackedBarChartIcon/></td> 
                                            <td>ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ ΣΤΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ</td>   
                                            <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('StudyProgramInfo_form'); setOpenPopup(true)}}/></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>                                
                                            <td><ManageAccountsIcon/></td> 
                                            <td>ΥΠΕΥΘΥΝΟΙ ΚΑΙ ΔΙΔΑΣΚΟΝΤΕΣ ΜΑΘΗΜΑΤΟΣ</td>    
                                            <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('CourseManagementInfo_form'); setOpenPopup(true)}}/></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>                                
                                            <td><WidgetsIcon/></td> 
                                            <td>ΕΠΙΠΛΕΟΝ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</td>    
                                            <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('MoreInfo_form'); setOpenPopup(true)}}/></td>
                                        </tr>                                 
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                        <PopUp 
                            title = {newCourseInfo.StudyProgram.course_code  + "  " + newCourseInfo.StudyProgram.course_name}
                            openPopup = {openPopup}
                            setOpenPopup = {setOpenPopup}
                        >
                        <AddCourseContainer type='POP-UP' 
                                    openPopup = {openPopup}
                                    setOpenPopup = {setOpenPopup} 
                                    currPopUpWindow = {popUpWindow}
                                    data =  {newCourseInfo}/>
                    </PopUp>

                    {/* SUBMIT BUTTON*/}
                    {console.log('after update ', newCourseInfo)}
                    <div className="buttonSubmit" onClick={()=>(setTimeout(() => {navigate('/uth-ece_admin/add_course_completed',
                                                                           {state:{newCourse: newCourseInfo}})}, 1000))}
                    ><SubmitButton button='submitButton'/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    : <Login/>
    }
    </>
    )
}

export default AddCoursePreview;