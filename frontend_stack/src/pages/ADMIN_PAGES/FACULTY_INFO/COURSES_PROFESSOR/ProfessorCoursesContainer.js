import React , {useState} from 'react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import {Avatar} from '@mui/material';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Icons
import BACK_ICON from '../../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import UTH_LOGO from '../../../../Icons/uth-logo-background.png'; 
import {GiBookshelf} from 'react-icons/gi';
import {FaHandPointer, FaEye, FaUserEdit} from 'react-icons/fa'; 

// GraphQL Resolvers
import CoursesResolvers from '../../../../../src/graphql/resolvers/courses';

// Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/FACULTY_INFO/COURSES_PROFESSOR/professorCoursesContainer.scss';

const ProfessorCoursesContainer = () => {
    // State Variable that will store the professor's courses
    let [professorCourses, setProfessorCourses] = useState([]);
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');

    // Get the connected professor information
    const connectedProfessor = JSON.parse(localStorage.getItem('userIdentity')); 
    if (professorCourses.length === 0 && connectedProfessor !== null) {
        CoursesResolvers.get_courses_by_instructor_email(connectedProfessor?.data?.ACADEMIC_INFO?.academic_email)
            .then(result=> {
                //console.log(result?.data?.getCoursesByInstructorEmail);
                setProfessorCourses(result?.data?.getCoursesByInstructorEmail)
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    const Item = styled(Paper)(({ theme }) => ({ 
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const ActiveSwitch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16, 
          },
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: 'red',
              opacity: 1,
              border: 0,
            }
            },
          '&:before': { 
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      }));

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
            setAcademicSemester('Χειμερινό');
        }        
    } 
    else {
        if (academicSemester === '') {
            setAcademicSemester('Εαρινό');
        } 
    } 

    const navigate = useNavigate();

    // Function that determines the suitable page to navigate after the user selection
    const navigateToSuitablePage = (codePage, courseCode) => {
        if (codePage === 'grading') {
            navigate('/uth-ece/' + connectedProfessor?.data?.ACADEMIC_INFO?.username + '/' + courseCode + '/grading');
        }
    }

    return ( 
        <div className="professor_courses_main">
            <div className="scroll">
                <div className="header"> 
                    <div className="text_header"><img src={BACK_ICON} alt='' /></div>
                    <div className="title"> Τα μαθήματά μου
                        <p style={{padding:'0px 15px'}}>Προπτυχιακά Μαθήματα - Μεταπτυχιακά Μαθήματα</p> 
                    </div>
                    <div className="header_area_professor_courses">  
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Στη σελίδα που ακολουθεί μπορείτε να δείτε τα μαθήματα για τα οποία είστε Υπεύθυνος Καθηγητής/τρια ή διδάσκετε το τρέχον ακαδημαϊκό έτος και εξάμηνο. Η επιλογή του εκάστοτε μαθήματος σας παρέχει <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τη δυνατότητα επεξεργασίας αυτού</strong> όσον αφορά είτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τη σελίδα προφίλ του</strong> είτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>την καταχώρηση βαθμολογίας για τους φοιτητές που το παρακολουθούν</strong>. Επιλέξετε το κατάλληλο εικονίδιο προκειμένου να επεξεργαστείτε, όπως επιθυμείτε, το μάθημα που σας αφορά.</div>           
                </div>
                <div className='professor_courses_container'>
                    <div className='declaration_object'>
                        <div className='page_title'>
                            <Box className='professor_courses_box'>
                                <Box className='first_box'>
                                    <Avatar className='avatar_title'>
                                        <GiBookshelf className='courses_icon'/>  
                                    </Avatar>
                                    <Box className='box_container'>
                                        <div className='typography_title'>my-Μαθήματα</div>
                                        <div className='typography_content'><FaHandPointer style={{verticalAlign :'middle',  display:'inline-flex', color:'#17a3b895', rotate:'90deg', marginTop:'3px', marginRight:'5px'}}/><strong style={{marginRight:'5px', verticalAlign:'middle', marginTop:'3px'}}>{connectedProfessor?.data?.ACADEMIC_INFO?.username}</strong>  διαχειρίζεσαι <strong style={{marginRight:'5px',marginLeft:'5px', verticalAlign:'middle', marginTop:'3px', color:'#17a2b8'}}>{professorCourses?.length}</strong> μαθήματα</div>
                                    </Box>
                                </Box>
                                <Paper className='paper' elevation={3}>
                                    <div className='paper_container'>
                                        <Box className="first_paper">
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', margin: '0px 0px 4px', lineHeight: '1.235'}}>Ακαδημαϊκό Έτος</div>
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', margin: '0px', lineHeight: '1.334', color:'#1c94b2'}}>{academicYear}</div>
                                        </Box>
                                        <Divider className='divider'/>
                                        <Box className='second_paper'>
                                        <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgba(125, 120, 123, 0.786)', margin: '0px 0px 4px', lineHeight: '1.235'}}>Τρέχον Εξάμηνο</div>
                                            <div style={{fontSize:'15px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.334', color:'#ffae18fc'}}>{academicSemester}</div>
                                        </Box>
                                    </div>
                                </Paper>
                            </Box>
                        </div>
                        <div className='main_content'>
                            <Box sx={{ width: '100%', marginBottom:'5rem', marginTop:'2rem', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:'auto' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
                                    {professorCourses?.map((course, itemIndex) => {
                                        return(
                                            <Grid className='inGridElement' item xs={4} key={itemIndex}>
                                                <Item className='item'>
                                                    <Box className='item_first'>
                                                        <Box className='item_content_1' style={{display:'flex', alignItems:'center'}}>
                                                            <Avatar className='item_avatar'
                                                            /*style={{
                                                                position: 'relative', display: 'flex', flexDirection:'row', alignItems: 'center',  
                                                                justifyContent: 'center', flexShrink: '0' , fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"' ,
                                                                lineHeight: '1' , borderRadius: '50%' , overflow: 'hidden' , userSelect: 'none', fontSize: '15px', fontWeight: 'bold',
                                                                backgroundColor: '#1c94b2', color: 'rgb(255, 255, 255)', width: '50px', height: '50px', boxShadow: 'rgba(34, 51, 84, 0.1) 0px 0.113rem 0.5rem, rgba(34, 51, 84, 0.5) 0px 0.126rem 0.225rem'
                                                            }}*/
                                                            >{course.StudyProgram.course_label.indexOf('ΠΡΟΠΤΥΧΙΑΚΟ')> -1 ? 'ΠΠΣ' : 'ΠΜΣ'}</Avatar>
                                                            <Box style={{marginLeft:'13px'}}>
                                                                <div style={{display:'inline-flex', margin:'0px', fontSize:'14px', fontWeight:'700', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(34, 51, 84)', lineHeight: '1.334', transition:'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', marginLeft:'0rem', marginRight:'auto', textOverflow:'ellipsis', textAlign:'left'}}>{course?.StudyProgram?.course_name}</div>
                                                                <div style={{fontSize:'15px', display:'flex', fontWeight:'500', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.57', color:'rgba(34, 51, 84, 0.7)', marginLeft:'0rem', marginRight:'auto'}}>{course?.StudyProgram?.course_code}</div>
                                                            </Box>
                                                        </Box>
                                                        <Box className='item_content_2'>
                                                            <FormGroup> 
                                                            <FormControlLabel
                                                                control={<ActiveSwitch checked={course?.More?.course_active} readOnly />} 
                                                            />
                                                            </FormGroup>
                                                        </Box>
                                                    </Box>
                                                    <Divider style={{margin:'22.5px 0px 0px', marginRight:'20px', border:'0', height:'1px', backgroundColor:'rgba(34, 51, 84, 0.5)', }}></Divider>
                                                    <Box className='item_second'>
                                                        <OverlayTrigger
                                                            key='course_profile'
                                                            placement='top'									
                                                            overlay={
                                                                <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} id={`tooltip-right`}>
                                                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}><strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>Προφίλ Μαθήματος</strong></div>
                                                                </Tooltip>
                                                            }
                                                            ><IconButton className='icon_button'><FaEye/></IconButton></OverlayTrigger>
                                                            
                                                            <OverlayTrigger
                                                            key='course_grade_system'
                                                            placement='top'									
                                                            overlay={
                                                                <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'-4px'}} id={`tooltip-right`}>
                                                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}><strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex'}}>Κατάσταση Βαθμολογίας</strong></div>
                                                                </Tooltip>
                                                            }
                                                            ><IconButton onClick={()=> navigateToSuitablePage('grading', course?.StudyProgram?.course_code)} className='icon_button'><FaUserEdit/></IconButton></OverlayTrigger>
                                                    </Box>
                                                    <Divider style={{margin:'10.5px 0px 0px', marginRight:'20px', border:'0', height:'1px', backgroundColor:'rgba(34, 51, 84, 0.5)', }}></Divider>
                                                    <div className='item_third'>
                                                        <Box className='inStyle'>
                                                            <div style={{display:'inline-flex', margin:'0px', fontSize:'15px', fontWeight:'400', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgba(34, 51, 84, 0.7)', lineHeight: '1.57', transition:'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', textAlign:'center'}}>Εξάμηνο</div>
                                                            <div style={{fontSize:'15px', display:'flex', fontWeight:'600', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.57', color:'#045b56c2', alignItems:'center', textAlign:'center', justifyContent:'center'}}>{course?.StudyProgram?.course_label.indexOf('ΠΡΟΠΤΥΧΙΑΚΟ') > -1 ? course?.StudyProgram?.semester : course?.StudyProgram?.semester.split(' ')[1]}</div>
                                                        </Box>
                                                        <Box className='inStyle'>
                                                            <div style={{display:'inline-flex', margin:'0px', fontSize:'15px', fontWeight:'400', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgba(34, 51, 84, 0.7)', lineHeight: '1.57', transition:'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', textAlign:'center'}}>Εγγ. Φοιτητές</div>
                                                            <div style={{fontSize:'15px', display:'flex', fontWeight:'600', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.57', color:'#045b56c2', alignItems:'center', textAlign:'center', justifyContent:'center'}}>{course?.More?.students_curr_attendance_num}</div>
                                                        </Box>
                                                        <Box className='inStyle'>
                                                            <div style={{display:'inline-flex', margin:'0px', fontSize:'15px', fontWeight:'400', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgba(34, 51, 84, 0.7)', lineHeight: '1.57', transition:'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', textAlign:'center'}}>Τύπος</div>
                                                            <div style={{fontSize:'15px', display:'flex', fontWeight:'600', letterSpacing:'0.5px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',  margin: '0px', lineHeight: '1.57', color:'#045b56c2', alignItems:'center', textAlign:'center', justifyContent:'center'}}>{course?.StudyProgram?.course_type}</div>
                                                        </Box>
                                                    </div>
                                                </Item>
                                            </Grid>
                                        )
                                    })}   
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessorCoursesContainer;