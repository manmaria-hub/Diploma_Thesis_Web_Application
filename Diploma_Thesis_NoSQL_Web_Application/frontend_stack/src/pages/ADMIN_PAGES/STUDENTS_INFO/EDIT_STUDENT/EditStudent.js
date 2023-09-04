import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../../src/components/LOGIN";
import StudentNavbar from "../ADD_STUDENT_FINAL/StudentNavbar";
import EditStudentContainer from "./EditStudentContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/STUDENTS/EDIT_STUDENT/editStudent.scss'


const EditStudent = () => {
    let connectedUser = {identity : '', data : null}; 
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
        <div className="edit_student_final_page">  
            <div className="student_scroll_page">
                <div className="edit_student_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}  document='students_list'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <StudentNavbar  action = 'edit_student' connectedUser={localStorage.getItem('userIdentity')} />       
                        <EditStudentContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default EditStudent;