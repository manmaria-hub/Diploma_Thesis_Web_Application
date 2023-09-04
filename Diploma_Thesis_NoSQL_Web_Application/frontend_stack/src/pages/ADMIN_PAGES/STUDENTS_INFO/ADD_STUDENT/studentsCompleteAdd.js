import React from "react";

// Components
import StudentsCompNavbar from "./studentsCompNavbar";
import AdminNavbar from "../../AdminNavbar";
import CompleteAdd from "./multistepCompleteAdd";

// CSS Styles
import "../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/studentsAdd.scss";

const AdminStudentsCompleteAddComponent = () => {
    return (
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar/>
                    <CompleteAdd type='complete_registration_form' addChoice ='ONE_STUDENT'/> 
                </div>   
            </div>         
        </div>
    )
}

export default AdminStudentsCompleteAddComponent;