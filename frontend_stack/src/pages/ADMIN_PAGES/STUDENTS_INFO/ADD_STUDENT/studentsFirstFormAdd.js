import React from "react";

// Components
import StudentsCompNavbar from "./studentsCompNavbar";
import AdminNavbar from "../../AdminNavbar";
import AddFirstFormContainer from "./multistepAddFirstFormContainer";

// CSS Styles
import "../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/studentsAdd.scss";

const AdminStudentsAddFirstFormComponent = () => {
    return (
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar/>
                    <AddFirstFormContainer addChoice='ONE_STUDENT'/> 
                </div>   
            </div>         
        </div>
    )
}

export default AdminStudentsAddFirstFormComponent;