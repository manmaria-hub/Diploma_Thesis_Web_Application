import React from "react";

// Components
import AdminNavbar from '../../AdminNavbar';
import StudentsCompNavbar from './studentsCompNavbar';  
import MultistepCompleteAdd from './multistepCompleteAdd';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/addStudentsUploadFile.scss';


const AddStudentsCompleteUploading = () => {
    return(
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar activeSelection='ADD_STUDENT'/> 
                    <MultistepCompleteAdd addChoice = 'MANY_STUDENTS' type='complete_registration_form'/>  
                </div>   
            </div>         
        </div>
    )
}

export default AddStudentsCompleteUploading;