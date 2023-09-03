import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../../../../src/pages/ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../../src/components/LOGIN";
import CoursesDeclarationNavbar from "../SUBMIT_DECLARATION/CoursesDeclarationNavbar";
import CoursesDeclarationContainer from "./CoursesDeclarationContainer";

// GraphQL Resolvers
import StudentResolvers from '../../../../../src/graphql/resolvers/student';

// CSS Styles
import '../../../../../src/styles/pages/STUDENT_PAGES/COURSES_DECLARATION/SUBMIT_DECLARATION/coursesDeclaration.scss';


const CoursesDeclaration = () => {
    let connectedUser = {identity : '', data : null}; 
    const [rightSideBar, setRightSideBar] = useState(true);
    const [isStudent, setIsStudent] = useState(null);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    // Check the user connection
    let token = localStorage.getItem('token') 
    let userIdentity = JSON.parse(localStorage.getItem('user')); 

    // Get the student info from the database
    if (isStudent === null && token !== null) {
        console.log(userIdentity)
        StudentResolvers.find_student_by_username(userIdentity?.username)
            .then(result => {  
                console.log(result)
                setIsStudent(result?.data?.findStudent);              
            })            
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
 
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

    // Determine the current Academic Year and the current academic semester
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)
   
    const currDates = {month : currMonth, year : currYear}
    console.log(currDates)
    return(
        <>
        {token !== 'null' ?
        <div className="courses_declaration_page">  
            <div className="courses_declaration_scroll_page">
                <div className="courses_declaration_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='new_declaration'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesDeclarationNavbar action = 'submit_declaration' connectedUser={localStorage.getItem('userIdentity')}/>       
                        {isStudent !== null ? <CoursesDeclarationContainer connectedUser={isStudent}  currDates={currDates}/>  : null }              
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CoursesDeclaration;