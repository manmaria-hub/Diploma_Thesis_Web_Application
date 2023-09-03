import React from "react";

// Components
import AdminNavbar from '../../AdminNavbar';
import StudentsCompNavbar from './studentsCompNavbar';
import MultisteAddFirstFormContainer from '../ADD_STUDENT/multistepAddFirstFormContainer'; 
// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/addStudentsUploadFile.scss';

const AddStudentsUploadFile = () => { 

    return(
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar activeSelection='ADD_STUDENT'/>
                    <MultisteAddFirstFormContainer addChoice = 'MANY_STUDENTS'/>   
                </div>   
            </div>         
        </div>
    )
}

export default AddStudentsUploadFile;