import React from "react";

// CSS Styles 
import '../../styles/components/CARDS/coursesCard.scss'

// Icons 
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; 

const CourseCard = (props) => {    

    // Determine the new course data about the component's arguments
    const newCourseInfo = props.newCourseInfo;

    return (
        <div className="course_card">
            <div className="infocard"> 
                <div className="imageContainer"><div className="iconText">{newCourseInfo.StudyProgram.course_code}</div></div>      
                <div className="textContainer">
                    <h5>{newCourseInfo.StudyProgram.course_name}</h5>
                    <div className="text_muted"> 
                        {newCourseInfo.StudyProgram.course_label.map(item => {
                            return(
                                <div key = {item} className="item_text">{item}</div>
                            )
                        })} 
                    </div>
                    <div className="table_responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><SchoolIcon className="icon"/></td>
                                    <td className="middleText">Γνωστικό Αντικείμενο</td>
                                    <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.study_program}</td>
                                </tr>
                                <tr>
                                    <td><CalendarMonthIcon className="icon"/></td>
                                    <td className="middleText">Εξάμηνο</td>
                                    {newCourseInfo.StudyProgram.period === 'Χειμερινή' ?
                                        !newCourseInfo.StudyProgram.course_label.includes("ΠΡΟΠΤΥΧΙΑΚΟ") ?
                                            <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.semester}</td> :
                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο      {newCourseInfo.StudyProgram.semester} - Εαρινό</td> :
                                            !newCourseInfo.StudyProgram.course_label.includes("ΠΡΟΠΤΥΧΙΑΚΟ") ?
                                            <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.semester}</td> :
                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο     {newCourseInfo.StudyProgram.semester} - Εαρινό</td>}
                                </tr>
                                <tr>
                                    <td><ClassIcon className="icon"/></td>
                                    <td className="middleText">Τύπος Μαθήματος</td>
                                    <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.course_category}</td>
                                </tr>
                                <tr>
                                    <td><ConfirmationNumberIcon className="icon"/></td>
                                    <td className="middleText">Μονάδες ECTS</td>
                                    <td className="rightText" style={{fontWeight:'500'}}>{newCourseInfo.StudyProgram.ECTS}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card_footer">
                        <div className="align_items">
                            <AccountBoxIcon className="avatar"/>
                            <div className="smallText">
                                <div className="name">{newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_FirstName} {newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_LastName} , {newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}</div>
                                <div className="profInfo">Yπεύθυνος Μαθήματος</div>
                            </div>
                        </div>
                    </div>
                </div>                                   
            </div>
        </div>
    )
    
}

export default CourseCard;