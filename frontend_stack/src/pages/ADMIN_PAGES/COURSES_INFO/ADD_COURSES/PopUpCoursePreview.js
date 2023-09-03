import React, { useState } from "react";

// Icons
import InfoIcon from '@mui/icons-material/Info';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/popUpCoursePreview.scss';

const PopUpCoursePreview = (props) => {
    console.log(props.data)
    // Determine the new course info about the props
    const [newCourseInfo, setNewCourseInfo] = useState(props.data);    

    return(
        <div className="popup_container">
            {props.currPopUpWindow === 'BasicInfo_form' ?
            <div>
                <form name='form' autoComplete='off'>
                    <div className='title_section'>
                        <InfoIcon className='icon' />
                        <h2>Βασικά Στοιχεία Μαθήματος</h2>
                    </div>
                    <div className='content'>
                        <div className='input-box' id='course_name' >
                            <input className='input' type="text" name="course_name" value={newCourseInfo.StudyProgram.course_name} required autoComplete='course_name'
                                onChange={(e) => {
                                    document.getElementById('course_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    document.getElementById('course_name').getElementsByClassName('error')[0].style.display = 'none';
                                    setNewCourseInfo({ ...newCourseInfo, StudyProgram: {course_name: e.target.value}})
                                }} />
                            <span>Τίτλος Μαθήματος</span>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='course_code' >
                            <input className='input' type="text" name="course_code" value={newCourseInfo.StudyProgram.course_code} required autoComplete='course_code'
                                onChange={(e) => {
                                    document.getElementById('course_code').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    document.getElementById('course_code').getElementsByClassName('error')[0].style.display = 'none';
                                    setNewCourseInfo({ ...newCourseInfo, StudyProgram:{course_code : e.target.value}})
                                }} />
                            <span>Κωδικός Μαθήματος</span>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='study_program' >
                            <input className='input' type="text" name="study_program" value={newCourseInfo.StudyProgram.study_program} required autoComplete='study_program'
                                onChange={(e) => {
                                    document.getElementById('study_program').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    setNewCourseInfo({ ...newCourseInfo, StudyProgram : {study_program: e.target.value} })
                                }} />
                            <span>Γνωστικό Αντικείμενο</span>
                            <i></i>
                        </div>
                        <div className='input-box' id='course_label' >
                            <input className='input' type="text" name="course_label" value={newCourseInfo.StudyProgram.course_label} required autoComplete='course_label'
                                onChange={(e) => {
                                    document.getElementById('course_label').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    //setNewCourseInfo({ ...newCourseInfo, StudyProgram: {course_label : [...StudyProgram.course_label, e.target.value]} })
                                }} />
                            <span>Επίπεδο Σπουδών</span>
                            <i></i>
                        </div> 
                        <div className='input-box' id='semester' > 
                        
                                onChange={(e) => {
                                    document.getElementById('semester').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    //setNewCourseInfo({ ...newCourseInfo, StudyProgram: {course_label : [...StudyProgram.course_label, e.target.value]} })
                                }} />
                            <span>Εξάμηνο</span>
                            <i></i>
                        </div> 
                    </div>
                </form>
                 
            </div> : null}
        </div>
    )
}

export default PopUpCoursePreview;