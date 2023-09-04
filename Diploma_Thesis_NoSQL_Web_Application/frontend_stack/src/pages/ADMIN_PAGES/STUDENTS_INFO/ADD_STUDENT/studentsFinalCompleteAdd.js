import React from "react";

// Components
import StudentsCompNavbar from "./studentsCompNavbar";
import AdminNavbar from "../../AdminNavbar";
import CompleteAdd from "./multistepCompleteAdd";
 
const AdminStudentsFinalCompleteAddComponent = () => {
    return (
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar/>
                    <CompleteAdd type='final_complete_registration_form' addChoice='ONE_STUDENT'/> 
                </div>   
            </div>         
        </div>
    )
}

export default AdminStudentsFinalCompleteAddComponent;