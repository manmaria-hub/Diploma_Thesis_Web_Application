import React, {useState} from "react";
import { Link } from "react-router-dom";  
import SwiperCore, {EffectCoverflow, Pagination, Autoplay} from 'swiper';
 
// Components 
import PageLoader from "../../../../components/LOADERS/loader";
// GraphQL
import Courses from '../../../../graphql/resolvers/courses';

// Icons
import UthLogo from '../../../../Icons/COURSES/uth-logo-removebg.png';
import ComputerScience from '../../../../Icons/COURSES/ComputerScience.jpg'; 
import user from '../../../../Icons/login-user.png'

import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';   
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import {RiQrCodeLine} from 'react-icons/ri';
import {MdAccountBalanceWallet, MdCategory, MdGroupWork, MdFolderSpecial} from 'react-icons/md';
import {VscUngroupByRefType} from 'react-icons/vsc'; 
import ReportIcon from '@mui/icons-material/Report';
import RecommendIcon from '@mui/icons-material/Recommend';
import {TbSubtask} from 'react-icons/tb';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import {FaUserShield, FaCalendarAlt} from 'react-icons/fa';
import { BsSubtract } from "react-icons/bs"; 

import {TbCalendarTime} from 'react-icons/tb';
import {FaUsers, FaBookReader} from 'react-icons/fa';
import {HiDesktopComputer} from 'react-icons/hi'
import {GiNotebook} from 'react-icons/gi';

// GraphQL Resolvers
import programResolvers from "../../../../graphql/resolvers/program";

// CSS Styles
import '../../../../styles/pages/FOR_ALL_PAGES/COURSES_INFO/COURSE_PROFILE/courseProfileContainer.scss';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/autoplay/package.json"; 

const CourseProfileContainer = (props) => {
    // Taking course's code from arguments
    const courseCode = props.courseCode; 

    // Call swipper
    SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

    // Set the state variable that keeps the current course's data
    let [course, setCourse] = useState();
    // Set the state variable that will store the code of the course's specialization field
    let [specFieldCode, setSpecFieldCode] = useState(''); 
    // Set the variable that keeps the course's name 
    let [courseName, setCourseName] = useState('');
    // Set the state array that keeps one course's labels (UNDERGRADUATE, POSTGRADUATE, ERASMUS) 
    let [courseLabel, setCourseLabel] = useState([]);
    
    // Setting Variables for the undergraduate courses program
    let [programInfo, setProgramInfo] = useState([]);
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');

    // Determine the current Academic Year and the current academic semester
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)

    let currAcademicYear = '';    // initialiaze current academic year variabe
    
    // Find the current ACADEMIC YEAR
    if (currMonth > 9 && currMonth <= 12) {
        currAcademicYear = currYear + '-' + currYear+1;        
        //acadYears = [ Number(currYear + 1) + '-' + Number(currYear + 2), currAcademicYear]
        if (academicYear === '') {
            setAcademicYear(currAcademicYear);
        }        
    }
    else {
        currAcademicYear = currYear-1 + '-' + currYear;
        //acadYears = [currYear + '-' + Number(currYear + 1), currAcademicYear]
        if (academicYear === '') {
            setAcademicYear(currAcademicYear);
        } 
    }  

    // Find the current ACADEMIC SEMESTER
    if (currMonth >=9 && currMonth <= 2) {  
        if (academicSemester === '') {
            setAcademicSemester('Χειμερινή');
        }        
    } 
    else {
        if (academicSemester === '') {
            setAcademicSemester('Εαρινή');
        } 
    }
    // Get the undergraduate courses group by Semester
    if (programInfo && programInfo.length === 0) {
        console.log(academicSemester) 
        console.log(academicYear) 
        let graduate_level="";     
        
        if (courseCode.length === 6 && !courseCode.startsWith("ΜΔΕ")) {graduate_level = 'ΠΡΟΠΤΥΧΙΑΚΟ'} else {graduate_level = 'ΜΕΤΑΠΤΥΧΙΑΚΟ'}
        console.log(graduate_level, 'grad')
        programResolvers.find_program("ΩΡΟΛΟΓΙΟ", graduate_level, academicSemester, academicYear, "ΠΡΟΣΩΡΙΝΟ")
            .then(result => {
                console.log(result)
                setProgramInfo(result?.data?.findProgram.main_program);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
        }

    console.log(programInfo)

    // Call the suitable Query to take the course data from the database
    if (course === undefined) {
        Courses.find_course_by_code(courseCode)
            .then(result => { 
                setCourse(result?.data?.findCoursebyCourseCode?.course)
            })
            .catch(err=> {
                throw err;
            })
    }  
    
    // Call the suitable query to take the specialization field code of the course according to the name of the field
    if (specFieldCode === '') {
        Courses.get_specialization_field_code(course?.StudyProgram?.study_program)
            .then(result => { 
                setSpecFieldCode(result?.data?.getSpecializationFieldCode)
            })
            .catch(err => {
                throw err;
            })
    } 
    // Function that finds the name of the prerequisites and recommended courses passing as arguments to the GraphQL queries 
    // the codes of the corressponding arrays that stores the information
    const find_course  = (courseCode) => {
        Courses.find_course_by_code(courseCode)
            .then(result => {
                setCourseName(result?.data?.findCoursebyCourseCode?.course.StudyProgram.course_name) 
                setCourseLabel(result?.data?.findCoursebyCourseCode?.StudyProgram?.courseLabel);
                return(result?.data?.findCoursebyCourseCode?.course.StudyProgram.course_name)
            })
            .catch(err => {
                throw err; 
            })
    } 
 
    return (
        <div>
            {course === undefined ?
            <PageLoader/> :
            <div className = 'main'>
                <div className="content">
                    <div className="row">
                        <div className="column" style={{flex : '1.3'}}>
                            <div className="box">
                                <h2>{course.StudyProgram.course_code}</h2>
                                <img src={ComputerScience} alt='specializationField_image'></img>
                                <div className="box-body">
                                    <h3 className="box_title">{course?.StudyProgram?.course_name}</h3>
                                    <div className="course_label" style={{marginTop:'0.5rem'}}> 
                                        {course?.StudyProgram?.course_label.map(label => {
                                            return(
                                                <div key={label} className="label">{label}</div>                                                
                                            )
                                        })}
                                    </div> 
                                        <div className="row_items">
                                            <div className="item"  style={{marginBottom:'-2rem'}}>
                                                <TbCalendarTime className="item_icon"/>
                                                <p className="title_item" style={{paddingRight:'0.2rem'}}>Συν. Εβδ. Ωρών Διδασκαλίας :  </p>
                                                <p className="content_item"> {course?.StudyProgram?.study_hours} ώρες</p>   
                                            </div>                              
                                           {/* <p className="lt-sp">|</p>   */  }                                                                 
                                            <div className="item" style={{marginBottom:'-2rem'}}>
                                                <FaUsers className="item_icon"/>
                                                <p className="title_item" style={{paddingRight:'0.2rem'}}>Αρ. Εγγεγραμμένων Φοιτητών : </p>
                                                <p className="content_item"> {course?.More?.students_curr_attendance_num} φοιτητές</p>                                
                                            </div>
                                            {course?.InfoFromInstructor?.theory_hours !== "" ?    
                                            <div>
                                               {/* <p className="lt-sp">|</p>   */  }                                                               
                                                <div className="item" style={{marginBottom:'-2rem'}} >
                                                    <FaBookReader className="item_icon"/>
                                                    <p className="title_item" style={{paddingRight:'0.2rem'}}>Ώρες Διαλέξεων : </p>
                                                    <p className="content_item"> {course?.More?.students_curr_attendance_num} ώρες</p>                                
                                                </div> 
                                            </div> : null }
                                            {course?.InfoFromInstructor?.lab_hours !== "" ?    
                                            <div>
                                                {/* <p className="lt-sp">|</p>   */  }    
                                                <div className="item"  style={{marginBottom:'-2rem'}}>
                                                    <HiDesktopComputer className="item_icon"/>
                                                    <p className="title_item" style={{paddingRight:'0.2rem'}}>Ώρες Εργαστηρίου : </p>
                                                    <p className="content_item"> {course?.More?.students_curr_attendance_num} ώρες</p>                                
                                                </div>
                                            </div> : null }
                                            {course?.InfoFromInstructor?.theory_hours !== "" ?    
                                            <div>
                                               {/* <p className="lt-sp">|</p>   */  }      
                                                <div className="item" style={{marginBottom:'-2rem'}}>        
                                                    <GiNotebook className="item_icon"/>                                    
                                                    <p className="title_item" style={{paddingRight:'0.2rem'}}>Ώρες φροντιστηρίου : </p>
                                                    <p className="content_item"> {course?.More?.students_curr_attendance_num} ώρες</p>                                
                                                </div>       
                                            </div> : null }           
                                    </div>
                                    <div className="wrapper">
                                        <div className="center_line"></div>
                                        <div className="cont second_row"> 
                                            <div className="circle_icon"><div className="text" style={{fontSize:'17.5px'}}>Προαπαιτούμενα Μαθήματα</div></div>        
                                            <div className="arrow"></div>  
                                            <section>  {course?.StudyProgram?.prerequisites.length > 0 ?                                                                                           
                                                <div className="details"> 
                                                    <ul>
                                                        {course?.StudyProgram?.prerequisites.map((item,index) => {
                                                            find_course(item)
                                                            return(
                                                                <li key={index} >
                                                                    <ReportIcon className="point_pre" style={{marginRight:"0.1rem"}}/>
                                                                    <div  className="course"><h4><a href={courseLabel?.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') ? `/uth-ece/studies/postgraduate/courses/${item}` : `/uth-ece/studies/undergraduate/courses/${item}`} style={{textDecoration:'none', fontSize:'14.5px', color:'#129aaf'}}>{item}</a></h4><p>{courseName}</p></div>
                                                                </li>
                                                            )
                                                        })}  
                                                    </ul>     
                                                </div>  : 
                                                 <div className="details_pre"> <ReportIcon className="icon_pre"/><p style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"', fontSize:'13px'}}>Το μάθημα δε διαθέτει προαπαιτούμενα μαθήματα !</p></div>}
                                            </section>                                                                                            
                                        </div>
                                        
                                        <div className="cont first_row">
                                            <section>  {course?.InfoFromInstructor?.RECOMMENDED_COURSES.length > 0 ?                                              
                                                <div className="details">
                                                     <ul>  
                                                    {course?.InfoFromInstructor?.RECOMMENDED_COURSES.map((item,index) => {
                                                            find_course(item)
                                                            return(
                                                                <li key={index}>
                                                                    <RecommendIcon className="point_rec" style={{marginRight:"0.1rem"}}/>
                                                                    <div className="course"><h4><Link to={courseLabel?.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') ? `/uth-ece/studies/postgraduate/courses/${item}` : `/uth-ece/studies/undergraduate/courses/${item}`}>{item}</Link></h4><p style={{textOverflow:'ellipsis'}}>{courseName}</p></div>
                                                                </li>
                                                            )
                                                        })} 
                                                    </ul>
                                                </div> : 
                                                <div className="details_rec"> <RecommendIcon className="icon_rec"/><p style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"', fontSize:'13px'}}>Ο Υπεύθυνος και οι Διδάσκοντες του Μαθήματος δεν έχουν ορίσει κάποιο συνιστώμενο μάθημα !</p></div>}
                                            </section>  
                                            <div className="arrow"></div>      
                                            <div className="circle_icon"><div className="text" style={{fontSize:'17.5px'}}>Συνιστώμενα Μαθήματα</div></div>                                              
                                        </div> 
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div className="column" style={{ flex:'1.1'}}>
                                <div className="box">
                                    <div className="course_details"> 
                                         <img className="uthLogo" src={UthLogo} alt='UthLogo'></img> 
                                         <div className="isActive">
                                            {course?.More?.course_active === true ?
                                            <div className="isActive_container"  style={{color:'rgb(13, 182, 13)'}}>Ενεργό Μάθημα<ToggleOnIcon className="isActive_icon"/></div> : 
                                            <div className="isActive_container" style={{color:'red'}}>Μη Ενεργό Μάθημα<ToggleOffIcon className="isActive_icon"/></div>}                                           
                                         </div>
                                         <div className="table_responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><RiQrCodeLine className="icon"/></td>
                                                        <td className="middleText">Κωδικός Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_code} </td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.studyProgram_name}>
                                                        <td><SchoolIcon className="icon"/></td>
                                                        <td className="middleText">Πρόγραμμα Σπουδών</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.studyProgram_name} ({course.StudyProgram.studyProgram_num})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.study_program}>
                                                        <td><AutoAwesomeMosaicIcon className="icon"/></td>
                                                        <td className="middleText">Γνωστικό Αντικείμενο</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_program} ({specFieldCode})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.semester}>
                                                        <td><CalendarMonthIcon className="icon"/></td>
                                                        <td className="middleText">Εξάμηνο</td>
                                                        {course.StudyProgram.period === 'Χειμερινή' ?
                                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο     {course.StudyProgram.semester} - Χειμερινό</td> :
                                                            <td className="rightText" style={{fontWeight:'500'}}>Εξάμηνο     {course.StudyProgram.semester} - Εαρινό</td>}
                                                    </tr>
                                                    <tr key= {course.StudyProgram.course_type}>
                                                        <td><ClassIcon className="icon"/></td>
                                                        <td className="middleText">Τύπος Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_type}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.course_category}>
                                                        <td><MdCategory className="icon"/></td>
                                                        <td className="middleText">Κατηγορία</td>
                                                        <td className="rightText" style={{fontWeight : '500'}}>{course?.StudyProgram?.course_category}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.ECTS}>
                                                        <td><ConfirmationNumberIcon className="icon"/></td>
                                                        <td className="middleText">Μονάδες ECTS</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.ECTS}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.study_units}>
                                                        <td><MdAccountBalanceWallet className="icon"/></td>
                                                        <td className="middleText">ΔΜ</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_units}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.category}>
                                                        <td><VscUngroupByRefType className="icon"/></td>
                                                        <td className="middleText">Κατεύθυνση</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_part}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.group}>
                                                        <td><MdGroupWork className="icon"/></td>
                                                        <td className="middleText">Ομάδα</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.group}</td>
                                                    </tr>
                                                     <tr key='field'>
                                                        <td><MdFolderSpecial className="icon"/></td>
                                                        <td className="middleText">Τομέας</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>-</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram}>
                                                        <td><TbSubtask className="icon"/></td>
                                                        <td className="middleText">Υπό-Κατεύθυνση</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_subpart}</td>
                                                    </tr>
                                                    <tr key={course?.More?.course_active}>
                                                        <td><BsSubtract className="icon"/></td>
                                                        <td className="middleText">Υπό-Γνωστικό Αντικείμενο</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.sub_study_program}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                
                                </div> 
                        </div>
                    </div> 
                    {programInfo === null || programInfo?.filter(item=> item.course_code === courseCode).length===0 ?
                    <div className="row">                      
                    <div className="column" style={{flex:'2.3'}}>
                            <div className="box"> 
                                <div className="staff_box"> 
                                    <div className="staff">
                                        <div className="staff_thumb">
                                            <FaUserShield className="image_staff"/>
                                        </div>
                                        <div className="staff_name">
                                            <h5>{course?.CourseManagement?.COURSE_DIRECTOR?.director_LastName} {course?.CourseManagement?.COURSE_DIRECTOR?.director_FirstName}</h5>
                                            <span className="text_fade">Υπεύθυνος Μαθήματος</span>
                                        </div>                                    
                                    </div> 
                                    <div className="border"></div>
                                    <div className="staff_info">
                                        <div className="staff_item">
                                            <div className="info_kind">
                                                <WorkIcon className="fa_item"/>
                                            </div>
                                            <div className="item_text">{course?.CourseManagement?.COURSE_DIRECTOR?.director_ProfessorType}</div>
                                        </div>
                                        <div className="staff_item">
                                            <div className="info_kind">
                                                <MailIcon className="fa_item"/>
                                            </div>
                                            <div className="item_text"><a href="https://webmail.uth.gr/login.php">{course?.CourseManagement?.COURSE_DIRECTOR?.director_Email}</a></div>
                                        </div>
                                    </div>

                                    <div className="instructors_area">
                                        <div className="widget">
                                            <h4 className="instr_title">Διδάσκοντες</h4>
                                            <div className="instr_carousel">
                                                 <div className="swiper">
                                                    <div className="swiper_wrapper"> {/*
                                                        <Swiper
                                                            loop = {true} 
                                                            autoplay={{
                                                                delay: 1300,
                                                                disableOnInteraction: false,
                                                              }} 
                                                            effect={"coverflow"}
                                                            grabCursor ={true}
                                                            slidesPerView={"auto"}
                                                            coverflowEffect={{
                                                                rotate: 0,
                                                                stretch: 0,
                                                                depth: 300,
                                                                modifier: 1,
                                                                slideShadows: false,
                                                              }} 
                                                            pagination={true}
                                                            className="mySwiper">
                                                        {course?.CourseManagement?.COURSE_INSTRUCTORS.map((item,index)=> {
                                                            return(
                                                                <SwiperSlide key={index}>
                                                                    <img src={user} alt="" style={{width:'80%'}}></img>
                                                                    <p>{item.instructor_FirstName}</p>
                                                                </SwiperSlide>
                                                            )
                                                        })}
                                                    </Swiper>      */}
                                                    <ul className="team">
                                                        {course?.CourseManagement?.COURSE_INSTRUCTORS.map((item,index)=> {
                                                            return(
                                                                 
                                                                <li class="member co-funder" key={index}>
                                                                    <div class="thumb">
                                                                        <img src={user} alt=""/>
                                                                    </div>
                                                                    <div class="description">
                                                                        <h3>{item.instructor_LastName} {item.instructor_FirstName}</h3>
                                                                        
                                                                        <div className="cont">
                                                                            <div className="prof_type">
                                                                                <WorkIcon style={{verticalAlign:'middle',fontSize:'20px', color:'#2f313a'}}/><p>{item.instructor_director_ProfessorType}</p>
                                                                            </div>
                                                                            <div className="prof_type">
                                                                                <MailIcon style={{verticalAlign:'middle',fontSize:'20px', color:'#2f313a'}}/>
                                                                                <a href="https://webmail.uth.gr/login.php">{item.instructor_Email}</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>   
                                                                )
                                                        })}
                                                        </ul>                                                   
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                    </div> 
                    </div>
                        :
                    <div className="row">                      
                    <div className="column" style={{flex:'1.3'}}>
                            <div className="box"> 
                                <div className="staff_box"> 
                                    <div className="staff">
                                        <div className="staff_thumb_icon">
                                            <FaCalendarAlt style={{fontSize:'50px', marginRight:'15px', color : '#17a2b8'}} className="image_staff"/>
                                        </div>
                                        <div className="staff_name">
                                            <h5>{academicSemester === "Εαρινή" ? 'Πρόγραμμα Εαρινού Εξαμήνου Ακαδημαϊκού Έτους '+ academicYear : 'Πρόγραμμα Εαρινού Εξαμήνου Ακαδημαϊκού Έτους '+ academicYear }</h5>
                                            <span className="text_fade">Σύμφωνα με το Ακαδημαϊκό Ημερολόγιο</span>
                                        </div>                                    
                                    </div> 
                                    <div className="border"></div>
                                    <div className="box">
                                    <div className="course_details" style={{marginTop:'2rem', marginBottom:'2rem'}}> 
                                    <div className="table_responsive">
                                            <table className="table">                                                  
                                                <tbody>
                                                    <tr>
                                                        <td>Ημέρα</td>
                                                        <td className="middleText">Ώρες</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>Αίθουσα</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>Τύπος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>Διδάσκων</td>
                                                    </tr>
                                                {programInfo?.filter(item=> item.course_code === courseCode).map((item, index) => {
                                                    return(
                                                        <tr>
                                                        <td>{item.day}</td>
                                                        <td className="middleText">{item.fromHour + ':00 έως ' + item.toHour + ':00' }</td>
                                                        <td className="rightText" style={{fontWeight:'500',}}>{item.Hall[0].label ?  item.Hall[0].label : 'Αίθουσα ' + item.Hall[0].value}</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{item.type}</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{item.instructor[0].value}</td>
                                                    </tr>
                                                    )                                                           
                                                }) }            
                                                </tbody>
                                            </table>
                                        </div>
                                        </div></div> 
                                </div>                                
                            </div>
                        </div>
                        <div className="column" style={{flex:'1.1'}}>
                            <div className="box"> 
                                <div className="staff_box"> 
                                    <div className="staff">
                                        <div className="staff_thumb">
                                            <FaUserShield className="image_staff"/>
                                        </div>
                                        <div className="staff_name">
                                            <h5>{course?.CourseManagement?.COURSE_DIRECTOR?.director_LastName} {course?.CourseManagement?.COURSE_DIRECTOR?.director_FirstName}</h5>
                                            <span className="text_fade">Υπεύθυνος Μαθήματος</span>
                                        </div>                                    
                                    </div> 
                                    <div className="border"></div>
                                    <div className="staff_info">
                                        <div className="staff_item">
                                            <div className="info_kind">
                                                <WorkIcon className="fa_item"/>
                                            </div>
                                            <div className="item_text">{course?.CourseManagement?.COURSE_DIRECTOR?.director_ProfessorType}</div>
                                        </div>
                                        <div className="staff_item">
                                            <div className="info_kind">
                                                <MailIcon className="fa_item"/>
                                            </div>
                                            <div className="item_text"><a href="https://webmail.uth.gr/login.php">{course?.CourseManagement?.COURSE_DIRECTOR?.director_Email}</a></div>
                                        </div>
                                    </div>

                                    <div className="instructors_area">
                                        <div className="widget">
                                            <h4 className="instr_title">Διδάσκοντες</h4>
                                            <div className="instr_carousel">
                                                 <div className="swiper">
                                                    <div className="swiper_wrapper"> {/*
                                                        <Swiper
                                                            loop = {true} 
                                                            autoplay={{
                                                                delay: 1300,
                                                                disableOnInteraction: false,
                                                              }} 
                                                            effect={"coverflow"}
                                                            grabCursor ={true}
                                                            slidesPerView={"auto"}
                                                            coverflowEffect={{
                                                                rotate: 0,
                                                                stretch: 0,
                                                                depth: 300,
                                                                modifier: 1,
                                                                slideShadows: false,
                                                              }} 
                                                            pagination={true}
                                                            className="mySwiper">
                                                        {course?.CourseManagement?.COURSE_INSTRUCTORS.map((item,index)=> {
                                                            return(
                                                                <SwiperSlide key={index}>
                                                                    <img src={user} alt="" style={{width:'80%'}}></img>
                                                                    <p>{item.instructor_FirstName}</p>
                                                                </SwiperSlide>
                                                            )
                                                        })}
                                                    </Swiper>      */}
                                                    <ul className="team">
                                                        {course?.CourseManagement?.COURSE_INSTRUCTORS.map((item,index)=> {
                                                            return(
                                                                 
                                                                <li class="member co-funder" key={index}>
                                                                    <div class="thumb">
                                                                        <img src={user} alt=""/>
                                                                    </div>
                                                                    <div class="description">
                                                                        <h3>{item.instructor_LastName} {item.instructor_FirstName}</h3>
                                                                        
                                                                        <div className="cont">
                                                                            <div className="prof_type">
                                                                                <WorkIcon style={{verticalAlign:'middle',fontSize:'20px', color:'#2f313a'}}/><p>{item.instructor_director_ProfessorType}</p>
                                                                            </div>
                                                                            <div className="prof_type">
                                                                                <MailIcon style={{verticalAlign:'middle',fontSize:'20px', color:'#2f313a'}}/>
                                                                                <a href="https://webmail.uth.gr/login.php">{item.instructor_Email}</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>   
                                                                )
                                                        })}
                                                        </ul>                                                   
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>}
                        
                </div>
            </div> 
            }
        </div>
    )
}

export default CourseProfileContainer;