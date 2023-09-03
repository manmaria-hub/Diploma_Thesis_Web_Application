import React , {useEffect, useState} from 'react';
import { Paper, Box, Avatar, Divider, SpeedDial, SpeedDialIcon, SpeedDialAction} from '@mui/material'; 
import CircularProgress from '@mui/joy/CircularProgress';  
import Table from 'react-bootstrap/Table';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Form} from 'react-bootstrap';
import { OverlayTrigger, Tooltip , Accordion} from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as XLSX from 'xlsx';

// Icons 
import GRADING_ICON from '../../../../Icons/PROFESSORS/grading_courses.png';
import UTH_LOGO from '../../../../Icons/uth-logo-background.png'; 
import { MdEditDocument, MdOutlineThumbUpAlt, MdOutlineThumbDownAlt, MdEditNote} from 'react-icons/md';
import { FaUsers , FaGraduationCap , FaUserGraduate} from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import {BiExport} from 'react-icons/bi';
import {RiDeleteBin6Fill} from 'react-icons/ri'; 
import {TiTick} from 'react-icons/ti';
import {RxCross2} from 'react-icons/rx'; 
import {ImUpload, ImFolderUpload} from 'react-icons/im'; 

// GraphQL Resolvers
import CoursesResolvers from '../../../../graphql/resolvers/courses';
import GradingResolvers from '../../../../graphql/resolvers/grading';

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/FACULTY_INFO/COURSE_GRADING/courseGradingContainer.scss';  

const CourseGradingContainer = (props) => {
    // Determining the course code from the props
    const course_code = props.course_code;
    
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');
     // Setting the state variable that will store the current academic exam period
     let [academicExamPeriod, setAcademicExamPeriod] = useState('');
    // Setting the state variable that will store the course's information
    let [courseInfo, setCourseInfo] = useState(null);
    // Setting the state variable that will store the registered to the course students for the current semester
    let [registeredStudents, setRegisteredStudents] = useState([])
    // Setting the state variable that will store the statistics for the courses
    let [coursesStatistics, setCoursesStatistics] = useState({success : 0 , fail : 0})

    // Setting the state variable that will store the student information for excel file
    let [excelData, setExcelData] = useState([]);
    
    // Speed Dial
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Determine the current Academic Year and the current academic semester
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)

    let currAcademicYear = '';    // initialiaze current academic year variabe

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} elevation={6} ref={ref} variant="filled" {...props} />;
    });

     
    const [openAlertSubmit, setOpenAlertSubmit] = React.useState(false);
    const [openAlertSubmitOne, setOpenAlertSubmitOne] = React.useState(false);
    
    const handleCloseAlertSubmitOne = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenAlertSubmitOne(false);
    }; 
      
    const handleCloseAlertSubmit = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenAlertSubmit(false);
    }; 
    
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
            setAcademicSemester('Χειμερινό');
        }                
    } 
    else {
        if (academicSemester === '') {
            setAcademicSemester('Εαρινό');
        } 
    } 

    // Find the current ACADEMIC EXAM PERIOD
    if (currMonth>=9 && currMonth <= 10) {  
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Σεπτεμβρίου');
        }                
    } 
    else if (currMonth >=11 && currMonth <= 2){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιανουαρίου');
        } 
    } 
    else if (currMonth >=3 && currMonth <= 8){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιουνίου');
        } 
    } 

    // Get the course Information using the course code
    if (courseInfo === null) {
        CoursesResolvers.find_course_by_code(course_code)
            .then(result => { 
                setCourseInfo(result?.data?.findCoursebyCourseCode?.course);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
 
    // Setting actions for speed dial
    const actions = [
        { icon: <BiExport onClick={() => exportDataToExcelFile()} style={{color:'green', fontSize:'20px'}} />, name: 'Εξαγωγή δεδομένων' },
        { icon: <ImFolderUpload onClick={() => submitAllSemesterGrades()} style={{color:'gray', fontSize:'20px'}} />, name: 'Καταχώρηση όλων στη Γραμματεία'},
        { icon: <RiDeleteBin6Fill onClick={() => setAllStudentsInactive()}  style={{color:'red', fontSize:'18px'}}/>, name: 'Διαγραφή Όλων' } 
    ];

    // Function that creates the styles of sliders
    const PrettoSlider = styled(Slider)({
        color:  'green', 
        height: 5,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 16,
          width: 16,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 11,
          background: 'unset', 
          width: 37,
          height: 37,
          padding: '10px',
          borderRadius: '50% 50% 50% 0',
          backgroundColor: 'gray',
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      });

    // Getting the information of all the registered to this specific course students for this exam period
    if (registeredStudents !== undefined && registeredStudents?.length === 0) {
        if (academicSemester !== '' && academicYear !== '' && academicExamPeriod !== '') {
            GradingResolvers.get_students_of_specific_course(course_code, academicYear, academicSemester, academicExamPeriod)
                .then(result => {  
                    setRegisteredStudents(result?.data?.getStudentoFSpecificCourse); 
                })
                .catch(err=> {
                    console.log(err);
                    throw err;
                })
        }
    }

    // Update the courses statistics depend on the results state of registered students
    useEffect(() => {
        let successNumber = 0;
        let failNumber = 0;
        if (registeredStudents.length > 0) {
            registeredStudents.forEach((student) => {
                if (student.declarated_courses.result === 'Επιτυχία' && student.declarated_courses.active === true) {
                    successNumber = successNumber + 1;
                }
                else if (student.declarated_courses.result === 'Αποτυχία' && student.declarated_courses.active === true) {
                    failNumber = failNumber + 1;
                }
            })
            setCoursesStatistics({...coursesStatistics, success : successNumber, fail : failNumber})
        }
        else {
            setCoursesStatistics({...coursesStatistics, success : 0, fail : 0})
        }
       
    }, [registeredStudents])

    // Update the excel data array every time the array of registered students changes
    useEffect(() => {
        if (registeredStudents.length > 0) {
            let updatedExcelData = [];
            registeredStudents.forEach((student, index) => {
                if (student.declarated_courses.active === true ) {
                    updatedExcelData.push({id : index + 1, AEM : student.student_AEM, Όνοματεπώνυμο : student.student_FirstName + ' ' + student.student_LastName,
                                        Συνθηματικό : student.student_username, Email : student.student_uthEmail, Τυπικό_Εξάμηνο_Σπουδών : student.current_student_semester + 'o Εξάμηνο',
                                        Ακαδημαικό_Έτος: student.declarated_courses.declarated_academicYear, Περίοδος : student.declarated_courses.declarated_period, 
                                        Δηλωμένο_Εξάμηνο : student.declarated_courses.declarated_semester, Εξεταστική_Περίοδος : student.declarated_courses.exam_period ,
                                        Μάθημα : student.declarated_courses.course_name +' (' + student.declarated_courses.course_code + ')', 
                                        Κατηγορία : student.declarated_courses.course_type + ' (' + student.declarated_courses.course_category + ')', 
                                        Πρόγραμμα_Σπουδών : student.declarated_courses.course_studyProgram,
                                        Βαθμός_Εξαμήνου: student.declarated_courses.semester_grade, Βαθμός_Τελικής_Εξέτασης: student.declarated_courses.exam_grade,
                                        Βαθμός_Εργαστηρίου: student.declarated_courses.lab_grade, Βαθμός_Προόδων: student.declarated_courses.progress_grade,
                                        Βαθμός_Εργασιών: student.declarated_courses.tasks_grade, ECTS : student.declarated_courses.ECTS, ΔΜ : student.declarated_courses.study_units,
                                        Αποτέλεσμα : student.declarated_courses.result})
                }
            })
            setExcelData(updatedExcelData)
        }
    }, [registeredStudents])

    console.log(excelData)
  
    // Function that updates the exam grade value
    const updateExamGrade = (student_AEM , updated_exam_grade) => { 
        // Update local State Variable
        setRegisteredStudents( 
            registeredStudents.map((student) =>
                student.student_AEM === student_AEM
                    ? {
                          ...student,
                          declarated_courses: {...student.declarated_courses, exam_grade: updated_exam_grade}
                      }
                    : { ...student }
                )
            ); 

        // Update database corressponding document 
        GradingResolvers.update_exam_grade(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, updated_exam_grade)
            .then(result => {
                console.log(result);                
            }) 
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
    
    

    // Function that updates the progress grade value
    const updateProgressGrade = (student_AEM , updated_progress_grade) => { 
        // Update local State Variable
        setRegisteredStudents( 
            registeredStudents.map((student) =>
                student.student_AEM === student_AEM
                    ? {
                          ...student,
                          declarated_courses: {...student.declarated_courses, progress_grade: updated_progress_grade}
                      }
                    : { ...student }
                )
            ); 
        
        // Update database corressponding document 
        GradingResolvers.update_progress_grade(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, updated_progress_grade)
            .then(result => {
                console.log(result);                
            }) 
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
    
    // Function that updates the lab grade value
    const updateLabsGrade = (student_AEM , updated_labs_grade) => { 
       // Update local State Variable 
       setRegisteredStudents( 
        registeredStudents.map((student) =>
            student.student_AEM === student_AEM
                ? {
                      ...student,
                      declarated_courses: {...student.declarated_courses, lab_grade: updated_labs_grade}
                  }
                : { ...student }
            )
        ); 
    
        // Update database corressponding document 
        GradingResolvers.update_labs_grade(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, updated_labs_grade)
            .then(result => {
                console.log(result);                
            }) 
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
     
    // Function that updates the tasks grade value
    const updateTasksGrade = (student_AEM , updated_tasks_grade) => {  
        // Update local State Variable
        setRegisteredStudents( 
            registeredStudents.map((student) =>
                student.student_AEM === student_AEM
                    ? {
                          ...student,
                          declarated_courses: {...student.declarated_courses, tasks_grade:updated_tasks_grade} 
                      }
                    : { ...student }
            )
        );

        // Update database corressponding document 
        GradingResolvers.update_tasks_grade(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, updated_tasks_grade)
            .then(result => {
                //console.log(result);                
            }) 
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
 
    // Function that updates the semester grade value (without submit the updated value in the corressponding database)
    const updateSemesterGrade = (student_AEM , updated_semester_grade) => { 
        // Update local State Variable
        if (Number(updated_semester_grade) >= 5) {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: Number(updated_semester_grade), result : 'Επιτυχία'}
                        }
                        : { ...student }
                )
            );
        }
        else if (Number(updated_semester_grade) < 5) {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: Number(updated_semester_grade), result : 'Αποτυχία'}
                        }
                        : { ...student }
                )
            );
        }
        else if (Number(updated_semester_grade) === '') {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: 0, result : ''}
                        }
                        : { ...student }
                )
            );
        }

    }

    // Function that updates the semester grade value and submit it in the corressponding database
    const submitFinalSemesterGrade = (student_AEM , final_semester_grade) => {  
        if (Number(final_semester_grade) >= 5) {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: Number(final_semester_grade), result : 'Επιτυχία'}
                        }
                        : { ...student }
                )
            );
        }
        else if (Number(final_semester_grade) < 5) {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: Number(final_semester_grade), result : 'Αποτυχία'}
                        }
                        : { ...student }
                )
            );
        }
        else if (Number(final_semester_grade) === '') {
            // Update local State Variable
            setRegisteredStudents( 
                registeredStudents.map((student) =>
                    student.student_AEM === student_AEM
                        ? {
                            ...student,
                            declarated_courses: {...student.declarated_courses, semester_grade: 0, result : ''}
                        }
                        : { ...student }
                )
            );
        }

        // Update database corressponding document 
        GradingResolvers.update_semester_grade(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, Number(final_semester_grade))
            .then(result => {
                console.log(result);     
                setOpenAlertSubmitOne(true);           
            }) 
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }

    // Function to export data to Excel file
    const exportDataToExcelFile = () => {
        console.log('data')
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, 'Αποτελέσματα');
        XLSX.writeFile(wb, 'Αποτελέσματα.xlsx');
    }

    // Function to set inactive for the specific course the specific by his AEM student
    const setStudentByAEMInactive = (student_AEM) => {

        // Update local State Variable
        setRegisteredStudents( 
            registeredStudents.map((student) =>
                student.student_AEM === student_AEM
                    ? {
                          ...student,
                          declarated_courses: {...student.declarated_courses, active:false} 
                      }
                    : { ...student }
            )
        );

        GradingResolvers.set_student_inactive_for_specific_course(student_AEM, course_code, academicYear, academicSemester, academicExamPeriod)
            .then(result => {
                console.log(result);
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }

    // Function to set inactive for the specific course all the database's students
    const setAllStudentsInactive = () => {

        // Update local State Variable
        setRegisteredStudents( 
            registeredStudents.map((student) => ({ 
                    ...student,
                    declarated_courses: {...student.declarated_courses, active:false} 
                })
            )
        );

        GradingResolvers.set_all_students_inactive_for_specific_course(course_code, academicYear, academicSemester, academicExamPeriod)
            .then(result => {
                console.log(result);
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }

    // Function to submit the semester grades for all the students
    const submitAllSemesterGrades = () => {

        registeredStudents.forEach(student => {
            if (student.declarated_courses.active === true) {
                // Update database corressponding document 
                GradingResolvers.update_semester_grade(student.student_AEM, course_code, academicYear, academicSemester, academicExamPeriod, Number(student.declarated_courses.semester_grade))
                .then(result => {
                    console.log(result);
                    setOpenAlertSubmit(true);                
                }) 
                .catch(err=> {
                    console.log(err);
                    throw err;
                })
            }
        })
    }
   
     
    return (
        <div className="courses_grading_main">
            <div className="scroll">
                <div className="header"> 
                    <div className="text_header"><img src={GRADING_ICON} alt='' /></div>
                    <div className="title"> {course_code + ' - Βαθμολογία'}
                        <p style={{padding:'0px 15px'}}>{academicSemester === 'Εαρινό' ? 'Καταχώρηση Βαθμολογίας Εαρινού Εξαμήνου ' + academicYear : 'Καταχώρηση Βαθμολογίας Χειμερινού Εξαμήνου ' + academicYear}</p> 
                    </div>
                    <div className="header_area_professor_courses">  
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Στη σελίδα που ακολουθεί μπορείτε να δείτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>την κατάσταση βαθμολογίας του μαθήματος {' ' + courseInfo?.StudyProgram?.course_name + ' (' + course_code + ') '}</strong> για το οποίο είστε Υπεύθυνος Καθηγητής/τρια ή διδάσκετε το τρέχον ακαδημαϊκό έτος και εξάμηνο. Καταχωρήστε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τη βαθμολογία των εγγεγραμμένων στο μάθημά σας φοιτητών</strong> και εφόσον είστε έτοιμοι επιλέξτε το κατάλληλο button για <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>ολοκλήρωση της διαδικασίας</strong> και <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τελική υποβολή της βαθμολογίας του εκάστοτε φοιτητή στην Ηλεκτρονική Γραμματεία του Τμήματος</strong>. Στο τέλος του εξαμήνου διαγράψτε όλους τους φοιτητές που έχουν επιτύχει και έχουν ολοκληρώσει με το μάθημά σας και περιμένετε μέχρι την εγγραφή των νέων φοιτητών.</div>           
                </div>
                <div className='course_grading_container'>
                    <div className='declaration_object'>
                        <div className='page_title'>
                            <Box className='course_grading_box'>
                                <Box className='first_box'>
                                    <Avatar className='avatar_title'>
                                        <FaGraduationCap className='courses_icon'/>  
                                    </Avatar>
                                    <Box className='box_container'>
                                        <div className='typography_title'>{courseInfo?.StudyProgram?.course_name + ' (' + courseInfo?.StudyProgram?.course_code + ') '}</div>
                                        <div className='typography_content'>Ακαδημαϊκό Έτος : <strong style={{verticalAlign:'middle', marginTop:'3px', marginLeft:'5px', marginRight:'5px'}}>{academicYear}</strong> - Εξάμηνο  : <strong style={{verticalAlign:'middle', marginTop:'0px', marginLeft:'5px', marginRight:'5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{academicSemester}</strong></div>
                                        <div className='typography_content'><MdEditDocument style={{verticalAlign :'middle',  display:'inline-flex', color:'#17a3b895',  marginTop:'3px', fontSize:'18px', marginRight:'5px'}}/><strong style={{marginRight:'5px', verticalAlign:'middle', marginTop:'3px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξεταστική Περίοδος</strong> <strong style={{marginRight:'5px',marginLeft:'2px', verticalAlign:'middle', marginTop:'3px', color:'#17a2b8', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> {academicExamPeriod}</strong></div>
                                    </Box>
                                </Box>
                                <Paper className='paper' elevation={3}>
                                    <div className='paper_container'>
                                        <Box className="first_paper">
                                            <FaUsers style={{fontSize:'45px'}}/>
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', margin: '0px 0px 4px', lineHeight: '1.235'}}>{excelData?.length}</div>
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', margin: '0px', lineHeight: '1.334', color:'#1c94b2'}}>Εγγεγραμμένοι Φοιτητές</div>
                                        </Box>
                                        <Divider className='divider'/>
                                        <Box className='second_paper'>
                                            <CircularProgress size="lg" determinate value={Number(coursesStatistics.success) === 0 && Number(excelData.length)=== 0  ? 0 : (Number(coursesStatistics.success)/Number(excelData.length))*100}>
                                                {coursesStatistics.success + ' / ' + excelData.length}
                                            </CircularProgress>{/*
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgba(125, 120, 123, 0.786)', margin: '0px 0px 4px', lineHeight: '1.235'}}>Τρέχον Εξάμηνο</div>
    <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.334', color:'#ffae18fc'}}>{academicSemester}</div>*/}
                                        </Box>
                                    </div>
                                </Paper>
                            </Box>                            
                        </div>
                        <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1, marginBottom:'2rem' }}>
                            <SpeedDial
                                ariaLabel="SpeedDial controlled open example"
                                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                direction='left'
                                open={open}
                            >
                                {actions.map((action) => (
                                <SpeedDialAction
                                style={{backgroundColor:'red'}}  
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={handleClose}
                                />
                                ))}
                            </SpeedDial>
                        </Box>
                        <div className='main_content'>
                            <Paper className='main_paper'>
                                <Box className='main_box'>
                                    <Box className='box_container'>
                                        <FaUserGraduate style={{ fontSize:'3rem', marginLeft:'5px', color:'gray', opacity:'0.7'}}/>
                                        <div className='text_input'>
                                            <h4>Εγγεγραμμένοι Φοιτητές</h4>
                                            <div className='typography_content'>Το συγκεκριμένο μάθημα παρακολουθούν <strong style={{verticalAlign:'middle', marginTop:'3px', marginLeft:'3px', color:'#ffae18', marginRight:'3px'}}>{excelData?.length}</strong> φοιτητές</div>
                                        </div>                                       
                                    </Box>
                                    <Box className='statistics'>
                                        <Box className='success'><MdOutlineThumbUpAlt style={{ fontSize:'27px', color:'rgba(16, 195, 34, 1)', marginRight:'7px', verticalAlign:'middle'}}/>{coursesStatistics.success}</Box>
                                        <Box className='fail'><MdOutlineThumbDownAlt style={{ fontSize:'27px', color:'red', marginRight:'7px', verticalAlign:'middle'}}/>{coursesStatistics.fail}</Box>
                                    </Box>                                    
                                </Box>
                                <hr className='divider_table' style={{margin:'0px', height:'1px', background:'rgba(34, 74, 84, 0.262)'}}></hr>
                                <Table className='students_table'>
                                    <table className='table_container'>
                                        <thead className='thead_group'>
                                            <tr className='thead_tr'>
                                                <th className='thead_th'></th>
                                                <th className='thead_th'>AEM</th>
                                                <th className='thead_th'>ΟΝΟΜΑΤΕΠΩΝΥΜΟ</th>
                                                <th className='thead_th'>ΠΛΗΡΟΦΟΡΙΕΣ</th>
                                                <th className='thead_th'>ΒΑΘΜΟΛΟΓΙΑ</th>
                                                <th className='thead_th'>ΑΠΟΤΕΛΕΣΜΑ</th>                                                
                                                <th className='thead_th'>ΕΝΕΡΓΕΙΕΣ</th>
                                            </tr>
                                        </thead>
                                        {registeredStudents?.map((currStudent, index) => {                                            
                                            return (
                                                currStudent?.declarated_courses?.active === true ?
                                                <tbody className='tbody_group' key={index}>
                                                <tr className='tbody_tr'>
                                                    <td className='state'>
                                                        <Box className='state_box'>
                                                           {currStudent?.declarated_courses?.result === "" ?
                                                                <MdEditNote className='state_icon'/>  :
                                                             currStudent?.declarated_courses?.result === "Επιτυχία" ?
                                                                <TiTick className='success_state_icon'/> :
                                                             currStudent?.declarated_courses?.result === "Αποτυχία" ?
                                                                <RxCross2 className='fail_state_icon'/> : null 
                                                            }                                                                                                                  
                                                        </Box>
                                                    </td>
                                                    <td className='AEM'>{currStudent?.student_AEM}</td>
                                                    <td className='name'>
                                                        <Box className='name_box'>
                                                            <Avatar className='avatar_box' style={{backgroundColor : currStudent?.gender === 'Θήλυ' ? 'rgb(242, 108, 219)' : '#1392a5'}}>{currStudent?.student_FirstName.split("")[0]+currStudent?.student_LastName.split("")[0]}</Avatar>
                                                            <Box className='text_box'>
                                                                <a href='#' className='href'>{currStudent?.student_FirstName + ' ' + currStudent?.student_LastName}</a>
                                                                <div className='subtext'>{currStudent?.student_title}</div>
                                                            </Box>
                                                        </Box>
                                                    </td>
                                                    <td className='information'>
                                                        <div className='info_text'><b style={{fontWeight:'600'}}>{currStudent?.student_username}</b><br></br><div style={{fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'gray'}}>{currStudent?.current_student_semester + 'ο Εξάμηνο Σπουδών'}</div><br></br><div style={{fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'gray', fontWeight:'500', marginTop:'-1.25rem'}}>{currStudent?.student_uthEmail}</div></div>
                                                    </td>
                                                    <td className='grading_cont'>                                                
                                                    <Accordion defaultActiveKey={['']} className='grading'>
                                                        <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            <Box className='grading_box'> 
                                                                <div style={{display:'block'}}>
                                                                    <Typography style={{fontSize:'14px', marginLeft:'-6px', fontWeight:'600', color:'rgba(34, 51, 84, 0.8)', letterSpacing:'1px', marginBottom:'-2px'}} gutterBottom>Βαθμολογία Εξαμήνου 
                                                                    <OverlayTrigger 
                                                                        key='semester_grade'
                                                                        placement='right'									
                                                                        overlay={
                                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία εξαμήνου</strong> του φοιτητή είτε σύροντας τον κατάλληλο βαθμό στην μπάρα, είτε συμπληρώνοντάς τον στο διπλανό κοτί εισαγωγής ! <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px', color:'red'}}>Προσοχή ο βαθμός θα πρέπει να είναι μεγαλύτερος ή ίσος του 0 και μικρότερος ή ίσος του 10 !</div></div>
                                                                            </Tooltip>
                                                                    }
                                                                    ><div style={{color:'red', display:'inline-flex'}}>*</div></OverlayTrigger></Typography>
                                                                    <PrettoSlider                                                                        
                                                                        style={{width:'300px', marginLeft:'-3px', color : currStudent?.declarated_courses?.semester_grade >= 5 ? 'green' : 'red'}}
                                                                        className='slider'
                                                                        valueLabelDisplay="auto"
                                                                        aria-label="pretto slider"
                                                                        defaultValue={currStudent?.declarated_courses?.semester_grade}
                                                                        onChangeCommitted={(e,value)=>updateSemesterGrade(currStudent?.student_AEM, value)}                                                                         
                                                                        max={10}
                                                                        min={0}
                                                                        step={0.001}
                                                                    /> 
                                                                </div>
                                                                <Form.Control 
                                                                    value={currStudent?.declarated_courses?.semester_grade}
                                                                    onChange={(e) => updateSemesterGrade(currStudent?.student_AEM, e.target.value)}
                                                                    className='input'
                                                                    type="number" 
                                                                    aria-label="Disabled input example" 
                                                                />                                                        
                                                            </Box>
                                                        </Accordion.Header> 
                                                        <Accordion.Body>
                                                        <Box className='grading_box'> 
                                                            <div style={{display:'block'}}>
                                                                <Typography style={{fontSize:'14px', marginLeft:'-6px', fontWeight:'600', color:'rgba(34, 51, 84, 0.8)', letterSpacing:'1px', marginBottom:'-2px'}} gutterBottom>Βαθμολογία Τελικής Εξέτασης 
                                                                <OverlayTrigger 
                                                                    key='final_exam_grade'
                                                                    placement='right'									
                                                                    overlay={
                                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία Τελικής Εξέτασης</strong> του φοιτητή είτε σύροντας τον κατάλληλο βαθμό στην μπάρα, είτε συμπληρώνοντάς τον στο διπλανό κοτί εισαγωγής ! <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px', color:'red'}}>Προσοχή ο βαθμός θα πρέπει να είναι μεγαλύτερος ή ίσος του 0 και μικρότερος ή ίσος του 10 !</div></div>
                                                                        </Tooltip>
                                                                }
                                                                ><div style={{color:'red', display:'inline-flex'}}>*</div></OverlayTrigger></Typography>
                                                                <PrettoSlider
                                                                    style={{width:'300px', marginLeft:'-3px', color : currStudent?.declarated_courses?.exam_grade >= 5 ? 'green' : 'red'}}
                                                                    className='slider'
                                                                    valueLabelDisplay="auto"
                                                                    aria-label="pretto slider"
                                                                    defaultValue={currStudent?.declarated_courses?.exam_grade}  
                                                                    onChangeCommitted={(e, value) => updateExamGrade(currStudent?.student_AEM, value)}
                                                                    max={10}
                                                                    min={0}
                                                                    step={0.001}
                                                                /> 
                                                            </div>
                                                            <Form.Control 
                                                                value={currStudent?.declarated_courses?.exam_grade}
                                                                onChange={(e) => updateExamGrade(currStudent?.student_AEM, Number(e.target.value))}
                                                                className='input'
                                                                type="number" 
                                                                aria-label="Disabled input example" 
                                                            />                                                        
                                                        </Box>
                                                        <Box className='grading_box'> 
                                                            <div style={{display:'block'}}>
                                                                <Typography style={{fontSize:'14px', marginLeft:'-6px', fontWeight:'600', color:'rgba(34, 51, 84, 0.8)', letterSpacing:'1px', marginBottom:'-2px'}} gutterBottom>Βαθμολογία Προόδων 
                                                                <OverlayTrigger 
                                                                    key='progress_grade'
                                                                    placement='right'									
                                                                    overlay={
                                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία Προόδων</strong> του φοιτητή είτε σύροντας τον κατάλληλο βαθμό στην μπάρα, είτε συμπληρώνοντάς τον στο διπλανό κοτί εισαγωγής ! <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px', color:'red'}}>Προσοχή ο βαθμός θα πρέπει να είναι μεγαλύτερος ή ίσος του 0 και μικρότερος ή ίσος του 10 !</div></div>
                                                                        </Tooltip>
                                                                }
                                                                ><div style={{color:'red', display:'inline-flex'}}>*</div></OverlayTrigger></Typography>
                                                                <PrettoSlider
                                                                    style={{width:'300px', marginLeft:'-3px', color : currStudent?.declarated_courses?.progress_grade >= 5 ? 'green' : 'red'}}
                                                                    className='slider'
                                                                    valueLabelDisplay="auto"
                                                                    aria-label="pretto slider"
                                                                    defaultValue={currStudent?.declarated_courses?.progress_grade}
                                                                    onChangeCommitted={(e, value) => updateProgressGrade(currStudent?.student_AEM, value)}
                                                                    max={10}
                                                                    min={0}
                                                                    step={0.001}
                                                                /> 
                                                            </div>
                                                            <Form.Control
                                                                value={currStudent?.declarated_courses?.progress_grade}
                                                                onChange={(e) => updateProgressGrade(currStudent?.student_AEM, Number(e.target.value))} 
                                                                className='input'
                                                                type="number" 
                                                                aria-label="Disabled input example" 
                                                            />                                                        
                                                        </Box>
                                                        <Box className='grading_box'> 
                                                            <div style={{display:'block'}}>
                                                                <Typography style={{fontSize:'14px', marginLeft:'-6px', fontWeight:'600', color:'rgba(34, 51, 84, 0.8)', letterSpacing:'1px', marginBottom:'-2px'}} gutterBottom>Βαθμολογία Εργαστηρίου 
                                                                <OverlayTrigger 
                                                                    key='lab_grade'
                                                                    placement='right'									
                                                                    overlay={
                                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία Εργαστηρίου</strong> του φοιτητή είτε σύροντας τον κατάλληλο βαθμό στην μπάρα, είτε συμπληρώνοντάς τον στο διπλανό κοτί εισαγωγής ! <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px', color:'red'}}>Προσοχή ο βαθμός θα πρέπει να είναι μεγαλύτερος ή ίσος του 0 και μικρότερος ή ίσος του 10 !</div></div>
                                                                        </Tooltip>
                                                                }
                                                                ><div style={{color:'red', display:'inline-flex'}}>*</div></OverlayTrigger></Typography>
                                                                <PrettoSlider
                                                                    style={{width:'300px', marginLeft:'-3px', color : currStudent?.declarated_courses?.lab_grade >= 5 ? 'green' : 'red'}}
                                                                    className='slider'
                                                                    valueLabelDisplay="auto"
                                                                    aria-label="pretto slider"
                                                                    defaultValue={currStudent?.declarated_courses?.lab_grade}
                                                                    onChangeCommitted={(e, value) => updateLabsGrade(currStudent?.student_AEM, value)} 
                                                                    max={10}
                                                                    min={0}
                                                                    step={0.001}
                                                                /> 
                                                            </div>
                                                            <Form.Control 
                                                                value={currStudent?.declarated_courses?.lab_grade}
                                                                onChange={(e) => updateLabsGrade(currStudent?.student_AEM, Number(e.target.value))}
                                                                className='input'
                                                                type="number" 
                                                                aria-label="Disabled input example" 
                                                            />                                                        
                                                        </Box>
                                                        <Box className='grading_box'> 
                                                            <div style={{display:'block'}}>
                                                                <Typography style={{fontSize:'14px', marginLeft:'-6px', fontWeight:'600', color:'rgba(34, 51, 84, 0.8)', letterSpacing:'1px', marginBottom:'-2px'}} gutterBottom>Βαθμολογία Εργασιών Μαθήματος 
                                                                <OverlayTrigger 
                                                                    key='tasks_grade'
                                                                    placement='right'									
                                                                    overlay={
                                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία των Εργασιών του Μαθήματος</strong> του φοιτητή είτε σύροντας τον κατάλληλο βαθμό στην μπάρα, είτε συμπληρώνοντάς τον στο διπλανό κοτί εισαγωγής ! <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px', color:'red'}}>Προσοχή ο βαθμός θα πρέπει να είναι μεγαλύτερος ή ίσος του 0 και μικρότερος ή ίσος του 10 !</div></div>
                                                                        </Tooltip>
                                                                }
                                                                ><div style={{color:'red', display:'inline-flex'}}>*</div></OverlayTrigger></Typography>
                                                                <PrettoSlider
                                                                    style={{width:'300px', marginLeft:'-3px', color : currStudent?.declarated_courses?.tasks_grade >= 5 ? 'green' : 'red'}}
                                                                    className='slider'
                                                                    valueLabelDisplay="auto"
                                                                    aria-label="pretto slider"
                                                                    defaultValue={currStudent?.declarated_courses?.tasks_grade}
                                                                    onChangeCommitted={(e, value) => updateTasksGrade(currStudent?.student_AEM, value)}
                                                                    max={10}
                                                                    min={0}
                                                                    step={0.001}
                                                                /> 
                                                            </div>
                                                            <Form.Control 
                                                                value={currStudent?.declarated_courses?.tasks_grade}
                                                                onChange={(e) => updateTasksGrade(currStudent?.student_AEM, Number(e.target.value))}
                                                                className='input'
                                                                type="number" 
                                                                aria-label="Disabled input example" 
                                                            />                                                        
                                                        </Box>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    </Accordion>
                                                    </td>
                                                    <td className='result'>
                                                        <Typography className='result_typograpy'>
                                                            {currStudent?.declarated_courses?.result === "" ?
                                                                <span className='proccess'>Σε Επεξεργασία</span> :
                                                             currStudent?.declarated_courses?.result === "Επιτυχία" ?
                                                                <span className='success'>Επιτυχία</span> :
                                                             currStudent?.declarated_courses?.result === "Αποτυχία" ?
                                                                <span className='fail'>Αποτυχία</span> : null 
                                                            } 
                                                        </Typography>
                                                    </td>
                                                    <td className='actions'>
                                                        <div style={{display:'flex', flexDirection:'row', gap:'7px'}}>
                                                            <OverlayTrigger  
                                                                key='upload'
                                                                placement='top'									
                                                                overlay={
                                                                    <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'0rem', marginBottom:'1rem'}} id={`tooltip-right`}>
                                                                    <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Καταχωρήστε τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>βαθμολογία του φοιτητή στην Ηλεκτρονική Γραμματεία !</strong></div>
                                                                    </Tooltip>
                                                            }
                                                            ><div><IconButton className='upload_image'
                                                                onClick={()=>submitFinalSemesterGrade(currStudent?.student_AEM, currStudent?.declarated_courses.semester_grade)}
                                                            ><ImUpload></ImUpload></IconButton></div></OverlayTrigger>
                                                            <OverlayTrigger  
                                                                key='delete'
                                                                placement='top'									
                                                                overlay={
                                                                    <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'0rem', marginBottom:'1rem'}} id={`tooltip-right`}>
                                                                    <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}><strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>Διαγράψτε το συγκεκριμένο φοιτητή από την κατάσταση βαθμολογίας του μαθήματος !</strong></div>
                                                                    </Tooltip>
                                                            }
                                                            ><div><IconButton className='upload_image' 
                                                                
                                                            style={{color:'red'}}><RiDeleteBin6Fill onClick={() => setStudentByAEMInactive(currStudent?.student_AEM)}></RiDeleteBin6Fill></IconButton></div></OverlayTrigger>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody> : null 
                                            )  
                                        })}                                       
                                    </table>
                                </Table>
                            </Paper>
                            <Snackbar open={openAlertSubmit} autoHideDuration={6000} onClose={handleCloseAlertSubmit}>
                                <Alert onClose={handleCloseAlertSubmit} severity="success" sx={{ width: '50%', fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                 <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'}}>Οι βαθμοί εξαμήνου όλων των φοιτητών καταχωρήθηκαν με επιτυχία στην Ηλεκτρονική Γραμματεία !</div>
                                </Alert>
                            </Snackbar>
                            <Snackbar open={openAlertSubmitOne} autoHideDuration={6000} onClose={handleCloseAlertSubmitOne}>
                                <Alert onClose={handleCloseAlertSubmitOne} severity="success" sx={{ width: '50%', fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                 <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'}}>Ο βαθμος εξαμήνου του φοιτητή καταχωρήθηκε με επιτυχία στην Ηλεκτρονική Γραμματεία !</div>
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseGradingContainer;