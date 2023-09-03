import React from "react";

// Components
import AdminNavbar from '../../AdminNavbar';
import StudentsCompNavbar from './studentsCompNavbar'; 
import MultisteAddSecondFormContainer from "./multistepAddSecondFormContainer";

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/addStudentsUploadFile.scss';

const AddStudentsValidateInfoFile = () => { 

    return(
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar activeSelection='ADD_STUDENT'/>
                    <MultisteAddSecondFormContainer addChoice = 'MANY_STUDENTS' dataInput/>   
                </div>   
            </div>         
        </div>
    )
}

export default AddStudentsValidateInfoFile;