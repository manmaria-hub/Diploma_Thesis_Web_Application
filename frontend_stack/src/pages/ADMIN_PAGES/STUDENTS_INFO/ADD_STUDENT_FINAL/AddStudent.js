import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../components/LOGIN";
import StudentNavbar from "../ADD_STUDENT_FINAL/StudentNavbar";
import AddStudentContainer from "./AddStudentContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT_FINAL/addStudent.scss'


const AddStudent = () => {
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
        <div className="add_student_final_page">  
            <div className="student_scroll_page">
                <div className="add_student_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}  document='student_add'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <StudentNavbar  action = 'add_student' connectedUser={localStorage.getItem('userIdentity')} />       
                        <AddStudentContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default AddStudent;