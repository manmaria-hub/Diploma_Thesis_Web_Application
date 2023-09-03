import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {Stack, Chip, Box, Avatar, Typography} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import Table from 'react-bootstrap/Table';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; 

// Icons 
import COURSES from '../../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import UTH_LOGO from '../../../../Icons/uth-logo-background.png';
import UTH_ICON from '../../../../Icons/transparentLogo.jpg';
import {MdDoNotDisturbOn, MdLibraryBooks} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';
import {FcGraduationCap, FcSearch} from 'react-icons/fc';
import {FaUserGraduate, FaCalendarAlt, FaUser, FaUserCog} from 'react-icons/fa'; 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {BsFillArrowRightCircleFill, BsFillEyeFill} from'react-icons/bs';
// Components
import Login from '../../../../../src/components/LOGIN';

// GraphQL Resolvers
import CoursesResolvers from "../../../../graphql/resolvers/courses";
import programResolvers from "../../../../graphql/resolvers/program";
// CSS Styles
import '../../../../../src/styles/pages/FOR_ALL_PAGES/COURSES_INFO/COURSES_LIST/undergraduateCoursesListContainer.scss'
import { ContactsOutlined } from "@ant-design/icons";

const UndergraduateCoursesListContainer = () => {

    // Setting Variables for the undergraduate courses group by study program
    let [coursesByStudyProgram, setCoursesByStudyProgram] = useState([]);
    // Setting Variables for the undergraduate courses group by semester
    let [coursesBySemester, setCoursesBySemester] = useState([]);
    // Setting Variables for the undergraduate courses group by course type
    let [coursesByCourseType, setCoursesByCourseType] = useState([]);

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

    const navigate = useNavigate();
    
    // Get the token from the local storage to check active authentication
    const token = localStorage.getItem('token');

    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        width:'100%',
        maxWidth:'100%',
        backgroundColor : 'white',
        [`& .${treeItemClasses.content}`]: {
            color: '#6a6a6a', 
            fontSize : 'var(--tree-view-bg-fontSize)', 
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor : 'white',
            '&.Mui-expanded': { 
            fontWeight: theme.typography.fontWeightRegular,
            backgroundColor : '#9e9e9e31', 
            },
            '&:hover': {
            backgroundColor: 'rgba(23, 163, 184, 0.144)', 
            },/*
            '&.Mui-focused' : {
                backgroundColor : 'rgba(23, 163, 184, 0.144)'
            }, 
            '&.Mui-selected' : {
                backgroundColor : 'rgba(23, 163, 184, 0.144)',
                fontSize : '20px'
            }, */
            '&.Mui-focused, &.Mui-selected.Mui-focused': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: 'var(--tree-view-color)',
                fontWeight: 'var(--tree-view-fontWeight)',
                letterSpacing:'2px',
                fontSize : 'var(--tree-view-fontSize)' 
            },
            [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',     
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
            },
        },
    }));

    
    function StyledTreeItem(props) {
        const theme = useTheme();
        const {  
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        fontWeight,
        fontSize,
        labelText,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
        } = props;
    
        const styleProps = {
        '--tree-view-fontWeight': props.fontWeight,
        '--tree-view-': props.fontSize,
        '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
        '--tree-view-bg-color':
            theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
        };
         
        return (
        <StyledTreeItemRoot
            label={
            <Box
                sx={{                
                display: 'grid',
                gridTemplateColumns:'0.1fr 2fr',
                alignItems: 'center', 
                justifyContent:'center',
                marginLeft:'auto',
                marginRight:'auto',
                p: 0.5,
                pr: 0,
                }}
            >
                {fontSize === '18px' ? 
                <Box component={LabelIcon} style={{fontSize:'30px'}} color="inherit" sx={{ mr: 1 }} />
                : 
                <Box component={LabelIcon} style={{fontSize:'17px'}} color="inherit" sx={{ mr: 1 }} />}
                <div style={{display:'flex', alignItems:'center', verticalAlign:'middle'}}>
                    <Typography variant="body2" sx={{padding: fontSize === '18px' ?  '12px 5px' : '5px 1px',  fontWeight: fontWeight, marginLeft:'-2px', fontSize: fontSize, flexGrow: 1 }}>
                    {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                    {labelInfo  === 'false' ? 
                        <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                            <Chip style={{width:'100%',overflow:'visible', display:'grid', gridTemplateColumns:'0fr 1fr', fontSize:'19px', whiteSpace:'nowrap', maxWidth:'100px', textOverflow:'ellipsis', backgroundColor:'rgba(217, 12, 12, 0.2)', color:'rgb(217, 12,12)',}} avatar={<Avatar style={{backgroundColor:'rgba(217, 12, 12, 0.255)', height:'17px', width:'17px'}}><MdDoNotDisturbOn style={{fontSize:'25px', color:'rgb(217, 12, 12)'}}/></Avatar>} label="Μη Ενεργό" />
                        </Stack> 
                        : labelInfo  === 'true' ?
                        <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                            <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'115px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(14, 202, 33, 0.289)', color:'rgb(15, 170, 33)'}} avatar={<Avatar style={{backgroundColor:'rgba(14, 202, 33, 0.289)', height:'17px', width:'17px'}}><TiTick style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="Ενεργό" />
                        </Stack>
                        : null}
                    </Typography>
                </div>
            </Box>
            }
            style={styleProps}
            {...other}
        />
        );
    }
    
    StyledTreeItem.propTypes = { 
        bgColor: PropTypes.string,
        bgColorForDarkMode: PropTypes.string,
        color: PropTypes.string,
        colorForDarkMode: PropTypes.string,
        labelIcon: PropTypes.elementType.isRequired,
        labelInfo: PropTypes.string,
        fontWeight: PropTypes.string,
        fontSize: PropTypes.string,
        labelText: PropTypes.string.isRequired,
    }; 

    // Get the undergraduate courses group by Study Program
    if (coursesByStudyProgram.length === 0) {
        CoursesResolvers.group_courses_by_study_program()
            .then(result => {
                setCoursesByStudyProgram(result?.data?.groupCoursesByStudyProgram);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    // Get the undergraduate courses group by Semester
    if (coursesBySemester.length === 0) {
        CoursesResolvers.group_courses_by_semester()
            .then(result => {
                setCoursesBySemester(result?.data?.groupCoursesBySemester);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    // Get the undergraduate courses group by course type
    if (coursesByCourseType.length === 0) {
        CoursesResolvers.group_courses_by_course_type()
            .then(result => {
                setCoursesByCourseType(result?.data?.groupCourseByCourseType);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    // Get the undergraduate courses group by Semester
    if (programInfo && programInfo.length === 0) {
        console.log(academicSemester) 
        console.log(academicYear) 
        programResolvers.find_program("ΩΡΟΛΟΓΙΟ", "ΠΡΟΠΤΥΧΙΑΚΟ", academicSemester, academicYear, "ΠΡΟΣΩΡΙΝΟ")
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

    // Function that creates the string of study program 
    const formatStudyProgramName = (studyProgram) => {
        let name = '';
        if (studyProgram === 'ΕΝΕΡΓΕΙΑΣ') {
            name = 'Ενέργειας (Ε)';
        }
        else if (studyProgram === 'ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΥΠΟΛΟΓΙΣΤΩΝ') {
            name = 'Υλικού και Αρχιτεκτονικής Υπολογιστών (ΥΑ)';
        }
        else if (studyProgram === 'ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ') {
            name = 'Εφαρμογών και Θεμελειώσεων της Επιστήμης των Υπολογιστών (ΕΘ)';
        }
        else if (studyProgram === 'ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ') {
            name = 'Τεχνολογιών Λογισμικού και Πληροφοριακών Συστημάτων (ΛΠ)';
        }
        else if (studyProgram === 'ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ') {
            name = 'Σημάτων, Τηλεπικοινωνιών και Δικτύων (ΣΤ)';
        }
        else if (studyProgram === 'ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ') {
            name = 'Ανεξάρτητα Γνωστικού Τομέα, Τμήματος ή Πανεπιστημίου Θεσσαλίας (ΑΤ)';
        }
        else {
            name = studyProgram;
        }
        return name;        
    } 
    console.log(coursesByCourseType)

    // Find the prerequistics info 
    const findCourseBasicInfo = (courseCode, groupCategory) => {
        let returnedObject;
        if (groupCategory === 'study_program') {
            coursesByStudyProgram.forEach((studyProgram) => {
                studyProgram.course.forEach((course) => {
                    if (course?.StudyProgram?.course_code === courseCode) {
                        returnedObject = {courseCode : course?.StudyProgram?.course_code, courseName : course?.StudyProgram?.course_name}
                    }
                })
            })
        }
        else if (groupCategory === 'semester') {
            coursesBySemester.forEach((studyProgram) => {
                studyProgram.courses_by_semester.forEach((course) => {
                    if (course?.StudyProgram?.course_code === courseCode) {
                        returnedObject = {courseCode : course?.StudyProgram?.course_code, courseName : course?.StudyProgram?.course_name}
                    }
                })
            })
        }
        else if (groupCategory === 'course_type') {
            coursesByCourseType.forEach((studyProgram) => {
                studyProgram.course.forEach((course) => {
                    if (course?.StudyProgram?.course_code === courseCode) {
                        returnedObject = {courseCode : course?.StudyProgram?.course_code, courseName : course?.StudyProgram?.course_name}
                    }
                })
            })
        }
        
        return (returnedObject);
    }

    console.log(programInfo?.filter(item=> item.course_code === "ECE212")[0])

    return(
        <> 
        {token !== null ?
            <div className="courses_list_main">
                <div className="scroll">
                    <div className="header">
                        <div className="text_header"><img src={COURSES} alt='' /></div>
                        <div className="title"> Μαθήματα ΠΠΣ
                            <p>Κατάλογος Μαθημάτων Προγράμματος Προπτυχιακών Σπουδών</p>
                        </div>
                        <div className="header_area"> 
                            <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                        </div>
                    </div>
                    <div className="forms_container"> 
                        <div className="text">Τα προσφερόμενα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', marginLeft:'1px', marginRight:'4px', color:'#17a2b8'}}>μαθήματα του Προγράμματος Προπτυχιακών Σπουδών</strong>, στα πέντε έτη σπουδών, ανά γνωστικό τομέα, εξάμηνο και τύπο δίδονται παρακάτω. Επιπλέον για κάθε μάθημα σημειώνεται οι ώρες διδασκαλίας, οι μονάδες ECTS τους και οι Διδακτικές τους Μονάδες και γνωστοποιούνται προς ενημέρωσής σας ο Υπεύθυνος Καθηγητής του μαθήματος καθώς και ο/οι διδάσκων/διδάσκοντες αυτού. Διευκρινίζεται ότι με τα εικονίδια: </div>   
                        <ListGroup style={{marginTop:'1rem'}}>
                            <ListGroup.Item style={{border:'0px solid white'}}>
                                <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                    <Chip style={{width:'100%',overflow:'visible', display:'grid', gridTemplateColumns:'0fr 1fr', whiteSpace:'nowrap', maxWidth:'105px', textOverflow:'ellipsis', backgroundColor:'rgba(217, 12, 12, 0.2)', color:'rgb(217, 12,12)',}} avatar={<Avatar style={{backgroundColor:'rgba(217, 12, 12, 0.255)', height:'17px', width:'17px'}}><MdDoNotDisturbOn style={{fontSize:'25px', color:'rgb(217, 12, 12)'}}/></Avatar>} label="Μη Ενεργό" /> <strong className="chip_text">σημειώνονται όσα μαθήματα δεν προσφέρονται κατά το τρέχον ακαδημαϊκό έτος</strong>
                                </Stack>
                            </ListGroup.Item>
                            <ListGroup.Item style={{border:'0px solid white'}}>
                                <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                    <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(14, 202, 33, 0.289)', color:'rgb(15, 170, 33)'}} avatar={<Avatar style={{backgroundColor:'rgba(14, 202, 33, 0.289)', height:'17px', width:'17px'}}><TiTick style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="Ενεργό" /> <strong className="chip_text">σημειώνονται όσα μαθήματα προσφέρονται και διδάσκονται κατά το τρέχον ακαδημαϊκό έτος</strong>
                                </Stack>
                            </ListGroup.Item> 
                            <ListGroup.Item style={{border:'0px solid white'}}>
                                <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                    <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#17a2b8', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΠΣ" /> <strong className="chip_text">	παρουσιάζονται τα μαθήματα του Προγράμματος Προπτυχιακών Σπουδών, υποχρεωτικά ή επιλογής</strong>
                                </Stack>
                            </ListGroup.Item> 
                            <ListGroup.Item style={{border:'0px solid white'}}>
                                <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                    <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#f09f09', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΜΣ" /> <strong className="chip_text">	παρουσιάζονται τα μαθήματα του Προγράμματος Μεταπτυχιακών Σπουδών, η δήλωση των οποίων απαιτεί άδεια του διδάσκοντος</strong>
                                </Stack>
                            </ListGroup.Item>
                            <ListGroup.Item style={{border:'0px solid white'}}>
                                <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                    <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'#17a3b82b', color:'#17a2b8'}} avatar={<Avatar style={{backgroundColor:'#17a3b82b', height:'17px', width:'17px'}}><FaUserGraduate style={{fontSize:'15px', color:'#17a2b8'}}/></Avatar>} label="ERASMUS" /> <strong className="chip_text">	εμφανίζονται τα μαθήματα που προσφέρονται σε φοιτητές Erasmus και ενδεχομένως η διδασκαλία τους να γίνει στην Αγγλική γλώσσα</strong>
                                </Stack>
                            </ListGroup.Item> 
                        </ListGroup>                                                    
                    </div> 
                    <div className='root'>
                        <h1 className="main_title">Μαθήματα Προπτυχιακών Σπουδών</h1>
                        <div className="navigateToSearch">
                            <Button className="search" onClick={() => navigate('/uth-ece/search_courses')}><FcSearch style={{marginRight:'1rem', fontSize:'20px', verticalAlign:'middle'}}/>ΑΝΑΖΗΤΗΣΗ ΜΑΘΗΜΑΤΩΝ</Button>
                        </div>
                         
                            <Tabs
                                defaultActiveKey="profile"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="home" title="Ανά Γνωστικό Τομέα">
                                    {coursesByStudyProgram.map((studyProgram, index)=> {
                                        return(
                                        <TreeView
                                            key={index}
                                            aria-label="gmail"
                                            defaultExpanded={[]}
                                            defaultCollapseIcon={<ArrowDropDownIcon/>}
                                            defaultExpandIcon={<ArrowRightIcon />}
                                            defaultEndIcon={<div style={{ width: 24 }} />}
                                            sx={{ flexGrow: 1, maxWidth: 'inherit', overflowY: 'auto' }}
                                            >                                      
                                            <StyledTreeItem nodeId={String(index)} labelText={formatStudyProgramName(studyProgram._id)} fontWeight ='700' fontSize='18px' color="#17a2b8" labelIcon={FcGraduationCap}>
                                                {studyProgram.course.map((courseIn, indexIn) => {  
                                                    console.log(courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >=0)     
                                                    return(
                                                <StyledTreeItem 
                                                    key = {indexIn} 
                                                    nodeId={courseIn.StudyProgram.course_code}      
                                                    labelText={courseIn.StudyProgram.course_name+ ' (' + courseIn.StudyProgram.course_code + ') '}
                                                    labelIcon={MdLibraryBooks}
                                                    labelInfo={courseIn.More.course_active === true ? 'true' : 'false'}                              
                                                    color="#f09f09"
                                                    bgColor="rgba(23, 163, 184, 0.144)"
                                                    colorForDarkMode="#B8E7FB"
                                                    bgColorForDarkMode="#071318">
                                                        <Table striped bordered hover
                                                            style={{marginTop:'1rem', boxShadow:'1px 1px 12px #caecf16b'}}>
                                                            <thead style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                <tr>
                                                                <th colSpan={2} style={{alignItems:'center', backgroundColor:'#74d1df18', textAlign:'left'}}>
                                                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'left', textAlign:'left', marginTop:'-0.7rem', marginBottom:'-1rem'}}>
                                                                        <img style={{width:'80px', height:'65px', marginLeft:'0rem'}} src={UTH_ICON} alt=''></img>
                                                                        <div style={{display : 'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', padding:'16px', fontSize:'17px', color:'#17a3b8e3', justifyContent:'right', letterSpacing:'1px'}}>{'ΠΛΗΡΟΦΟΡΙΕΣ ΜΑΘΗΜΑΤΟΣ ΠΠΣ' + ' ' + courseIn.StudyProgram.course_code}
                                                                        <div style={{display:'flex', marginTop:'0.5rem', gap:'5px', justifyContent:'right', marginLeft:'auto', marginRight:'0rem'}}>
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#17a2b8', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΠΣ" /> 
                                                                            </Stack>
                                                                            : null}
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΜΕΤΑΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#f09f09', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΜΣ" /> 
                                                                            </Stack>
                                                                            : null }
                                                                            { courseIn.StudyProgram.course_label.indexOf("ERASMUS") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'#17a3b82b', color:'#17a2b8'}} avatar={<Avatar style={{backgroundColor:'#17a3b82b', height:'17px', width:'17px'}}><FaUserGraduate style={{fontSize:'15px', color:'#17a2b8'}}/></Avatar>} label="ERASMUS" />
                                                                            </Stack>
                                                                            : null}
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </th> 
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left', borderLeft:'5px solid #17a2b8', fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', letterSpacing:'1px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Τίτλος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn.StudyProgram.course_name}<div className="strong_code" >{courseIn.StudyProgram.course_code}
                                                                    
                                                                    <OverlayTrigger
                                                                        key='right'
                                                                        placement='top'	
                                                                        style={{display:'inline-flex', gap:'0rem'}}								
                                                                        overlay={
                                                                            <Tooltip style={{marginLeft:'0rem', display:'inline-flex'}} id={`tooltip-top`}>
                                                                                <div style={{display:'inline-flex', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Μαθήματος</strong></div>
                                                                            </Tooltip>
                                                                        }
                                                                    ><IconButton onClick={()=> navigate('/uth-ece/studies/undergraduate/courses/'+courseIn.StudyProgram.course_code)} className="iconButton"><BsFillEyeFill style={{display : 'inline', fontSize:'15px'}}/></IconButton></OverlayTrigger></div>
                                                                </td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Γνωστικό Αντικείμενο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{formatStudyProgramName(courseIn?.StudyProgram.study_program)}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξάμηνο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram.period === 'Χειμερινή' ? 'Εξάμηνο ' + courseIn?.StudyProgram.semester + ' , Χειμερινό' :  'Εξάμηνο ' + courseIn?.StudyProgram.semester  + ' , Εαρινό' }</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Είδος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.course_type}</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Συν. Εβδ. Ωρών Διδασκαλίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_hours}</td>
                                                                </tr>
                                                                { courseIn?.InfoFromInstructor?.theory_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr> }

                                                                { courseIn?.InfoFromInstructor?.lab_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr> }
 
                                                                { courseIn?.InfoFromInstructor?.tutoring_hours?.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr> }

                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Μονάδες ECTS</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.ECTS}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδακτικές Μονάδες</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_units}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Σελίδα Μαθήματος</td>
                                                                <td className="eclass" onClick={() => window.open('https://eclass.uth.gr/')}>{'https://courses.e-ce.uth.gr/' + courseIn?.StudyProgram.course_code + '/'}</td> 
                                                                </tr> 
                                                                {courseIn?.StudyProgram?.prerequisites.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code' onClick={()=>navigate('/uth-ece/studies/undergraduate/courses/'+ findCourseBasicInfo(preCourse, 'study_program').courseCode)}>{findCourseBasicInfo(preCourse, 'study_program').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'study_program').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })} 
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display :'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code'>{findCourseBasicInfo(preCourse , 'study_program').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'study_program').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })}                                                                     
                                                                </td> 
                                                                </tr>}                                                                
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Υπεύθυνος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <div className="professor_info"> 
                                                                        <Avatar style={{backgroundColor:"#17a3b858"}}><FaUserCog style={{fontSize:'26px', color:'#17a2b8'}}/></Avatar>                                                              
                                                                        <div style={{display:'inline-block', verticalAlign:'middle', alignItems:'center'}}>
                                                                            <h6 className='admin_professor'>{courseIn.CourseManagement.COURSE_DIRECTOR.director_LastName + ' ' + courseIn.CourseManagement.COURSE_DIRECTOR.director_FirstName}</h6>
                                                                            <span className="proffessor_type">{courseIn.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}</span> 
                                                                            <div className="email">Email : <p className="email_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{courseIn?.CourseManagement?.COURSE_DIRECTOR.director_Email}</p> </div>
                                                                        </div>
                                                                    </div>
                                                                </td> 
                                                                </tr>
                                                                {courseIn.CourseManagement.COURSE_INSTRUCTORS.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {courseIn.CourseManagement.COURSE_INSTRUCTORS.map((instructor, instructor_index) => {
                                                                        return(
                                                                        <ListGroup.Item key={instructor_index} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{instructor.instructor_LastName + ' ' + instructor.instructor_FirstName + ' , '}<p className="instructor_type">{instructor.instructor_director_ProfessorType}</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{instructor.instructor_Email}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display:'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                        <ListGroup.Item style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>ΤΣΟΜΠΑΝΟΠΟΥΛΟΥ ΠΑΝΑΓΙΩΤΑ , <p className="instructor_type">ΑΝΑΠΛΗΡΩΤΡΙΑ ΚΑΘΗΓΗΤΡΙΑ</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info">yota@uth.gr</p></div>
                                                                            </div>
                                                                            </ListGroup.Item>     
                                                                    </ListGroup>
                                                                </td> 
                                                                </tr>
                                                                }
                                                                {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).length>0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Πρόγραμμα Μαθήματος ({academicSemester} περίοδος ακαδημαϊκού έτους {academicYear})</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).map((program, programIndex) => {
                                                                        return(
                                                                        <ListGroup.Item key={programIndex} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaCalendarAlt style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{program.day}<p className="instructor_type">{'   '+ program.fromHour +':00 - ' + program.toHour + ':00' }</p></h6> 
                                                                                <div className="instr_email">{program.type}<p className="emailInstr_info">{program.Hall[0].label ? 'Αίθουσα : ' + program.Hall[0].label : 'Αίθουσα : ' + program.Hall[0].value}</p></div>
                                                                                <div className="instr_email">{'Διδάσκων'}<p className="emailInstr_info">{program.instructor[0].value}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> :  null}
                                                            </tbody>
                                                        </Table>                                                
                                                </StyledTreeItem>    
                                                    )
                                                })} 
                                            </StyledTreeItem> 
                                        </TreeView>
                                        )
                                })}
                                </Tab>
                                <Tab eventKey="profile" title="Ανά Εξάμηνο">
                                {coursesBySemester.map((studyProgram, index)=> {
                                        return(
                                        <TreeView
                                            key={index}
                                            aria-label="gmail"
                                            defaultExpanded={[]}
                                            defaultCollapseIcon={<ArrowDropDownIcon/>}
                                            defaultExpandIcon={<ArrowRightIcon />}
                                            defaultEndIcon={<div style={{ width: 24 }} />}
                                            sx={{ flexGrow: 1, maxWidth: 'inherit', overflowY: 'auto' }}
                                            >                                      
                                            <StyledTreeItem nodeId={String(index)} labelText={formatStudyProgramName('Εξάμηνο ' + studyProgram._id + 'ο')} fontWeight ='700' fontSize='18px' color="#17a2b8" labelIcon={FcGraduationCap}>
                                                {studyProgram.courses_by_semester.map((courseIn, indexIn) => {  
                                                    console.log(courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >=0)     
                                                    return(
                                                <StyledTreeItem 
                                                    key = {indexIn} 
                                                    nodeId={courseIn.StudyProgram.course_code}      
                                                    labelText={courseIn.StudyProgram.course_name+ ' (' + courseIn.StudyProgram.course_code + ') '}
                                                    labelIcon={MdLibraryBooks}
                                                    labelInfo={courseIn.More.course_active === true ? 'true' : 'false'}                              
                                                    color="#f09f09"
                                                    bgColor="rgba(23, 163, 184, 0.144)"
                                                    colorForDarkMode="#B8E7FB"
                                                    bgColorForDarkMode="#071318">
                                                        <Table striped bordered hover
                                                            style={{marginTop:'1rem', boxShadow:'1px 1px 12px #caecf16b'}}>
                                                            <thead style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                <tr>
                                                                <th colSpan={2} style={{alignItems:'center',  backgroundColor:'#74d1df18',  textAlign:'left'}}>
                                                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'left', textAlign:'left', marginTop:'-0.7rem', marginBottom:'-1rem'}}>
                                                                        <img style={{width:'80px', height:'65px', marginLeft:'0rem'}} src={UTH_ICON} alt=''></img>
                                                                        <div style={{display : 'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', padding:'16px', fontSize:'17px', color:'#17a3b8e3', justifyContent:'right', letterSpacing:'1px'}}>{'ΠΛΗΡΟΦΟΡΙΕΣ ΜΑΘΗΜΑΤΟΣ ΠΠΣ' + ' ' + courseIn.StudyProgram.course_code}
                                                                        <div style={{display:'flex', marginTop:'0.5rem', gap:'5px', justifyContent:'right', marginLeft:'auto', marginRight:'0rem'}}>
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#17a2b8', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΠΣ" /> 
                                                                            </Stack>
                                                                            : null}
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΜΕΤΑΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#f09f09', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΜΣ" /> 
                                                                            </Stack>
                                                                            : null }
                                                                            { courseIn.StudyProgram.course_label.indexOf("ERASMUS") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'#17a3b82b', color:'#17a2b8'}} avatar={<Avatar style={{backgroundColor:'#17a3b82b', height:'17px', width:'17px'}}><FaUserGraduate style={{fontSize:'15px', color:'#17a2b8'}}/></Avatar>} label="ERASMUS" />
                                                                            </Stack>
                                                                            : null}
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </th> 
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left', borderLeft:'5px solid #17a2b8', fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', letterSpacing:'1px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Τίτλος Μαθήματος</td>
                                                                <td style={{textAlign:'left',fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn.StudyProgram.course_name}<div className="strong_code" >{courseIn.StudyProgram.course_code}
                                                                    
                                                                    <OverlayTrigger
                                                                        key='right'
                                                                        placement='top'	
                                                                        style={{display:'inline-flex',justifyContent:'right', gap:'0rem'}}								
                                                                        overlay={
                                                                            <Tooltip style={{marginLeft:'0rem', display:'inline-flex'}} id={`tooltip-top`}>
                                                                                <div style={{display:'inline-flex', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Μαθήματος</strong></div>
                                                                            </Tooltip>
                                                                        }
                                                                    ><IconButton onClick={()=> navigate('/uth-ece/studies/undergraduate/courses/'+courseIn.StudyProgram.course_code)} className="iconButton"><BsFillEyeFill style={{display : 'inline-flex', marginLeft:'auto', marginRight:'0rem', fontSize:'15px'}}/></IconButton></OverlayTrigger></div>
                                                                </td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Γνωστικό Αντικείμενο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{formatStudyProgramName(courseIn?.StudyProgram.study_program)}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξάμηνο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram.period === 'Χειμερινή' ? 'Εξάμηνο ' + courseIn?.StudyProgram.semester + ' , Χειμερινό' :  'Εξάμηνο ' + courseIn?.StudyProgram.semester  + ' , Εαρινό' }</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Είδος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.course_type}</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Συν. Εβδ. Ωρών Διδασκαλίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_hours}</td>
                                                                </tr>
                                                                { courseIn?.InfoFromInstructor?.theory_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr> }

                                                                { courseIn?.InfoFromInstructor?.lab_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr> }
 
                                                                { courseIn?.InfoFromInstructor?.tutoring_hours?.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr> }

                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Μονάδες ECTS</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.ECTS}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδακτικές Μονάδες</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_units}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Σελίδα Μαθήματος</td>
                                                                <td className="eclass" onClick={() => window.open('https://eclass.uth.gr/')}>{'https://courses.e-ce.uth.gr/' + courseIn?.StudyProgram.course_code + '/'}</td> 
                                                                </tr> 
                                                                {courseIn?.StudyProgram?.prerequisites.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code' onClick={()=>navigate('/uth-ece/studies/undergraduate/courses/'+ findCourseBasicInfo(preCourse, 'semester').courseCode)}>{findCourseBasicInfo(preCourse, 'semester').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'semester').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })} 
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display :'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code'>{findCourseBasicInfo(preCourse, 'semester').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'semester').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })} 
                                                                </td> 
                                                                </tr>}
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Υπεύθυνος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <div className="professor_info"> 
                                                                        <Avatar style={{backgroundColor:"#17a3b858"}}><FaUserCog style={{fontSize:'26px', color:'#17a2b8'}}/></Avatar>                                                              
                                                                        <div style={{display:'inline-block', verticalAlign:'middle', alignItems:'center'}}>
                                                                            <h6 className='admin_professor'>{courseIn.CourseManagement.COURSE_DIRECTOR.director_LastName + ' ' + courseIn.CourseManagement.COURSE_DIRECTOR.director_FirstName}</h6>
                                                                            <span className="proffessor_type">{courseIn.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}</span> 
                                                                            <div className="email">Email : <p className="email_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{courseIn?.CourseManagement?.COURSE_DIRECTOR.director_Email}</p> </div>
                                                                        </div>
                                                                    </div>
                                                                </td> 
                                                                </tr>
                                                                {courseIn.CourseManagement.COURSE_INSTRUCTORS.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {courseIn.CourseManagement.COURSE_INSTRUCTORS.map((instructor, instructor_index) => {
                                                                        return(
                                                                        <ListGroup.Item key={instructor_index} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{instructor.instructor_LastName + ' ' + instructor.instructor_FirstName + ' , '}<p className="instructor_type">{instructor.instructor_director_ProfessorType}</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{instructor.instructor_Email}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display:'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                        <ListGroup.Item style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>ΤΣΟΜΠΑΝΟΠΟΥΛΟΥ ΠΑΝΑΓΙΩΤΑ , <p className="instructor_type">ΑΝΑΠΛΗΡΩΤΡΙΑ ΚΑΘΗΓΗΤΡΙΑ</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info">yota@uth.gr</p></div>
                                                                            </div>
                                                                            </ListGroup.Item>     
                                                                    </ListGroup>
                                                                </td> 
                                                                </tr>
                                                                }
                                                                {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).length>0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Πρόγραμμα Μαθήματος ({academicSemester} περίοδος ακαδημαϊκού έτους {academicYear})</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).map((program, programIndex) => {
                                                                        return(
                                                                        <ListGroup.Item key={programIndex} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaCalendarAlt style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{program.day}<p className="instructor_type">{'   '+ program.fromHour +':00 - ' + program.toHour + ':00' }</p></h6> 
                                                                                <div className="instr_email">{program.type}<p className="emailInstr_info">{program.Hall[0].label ? 'Αίθουσα : ' + program.Hall[0].label : 'Αίθουσα : ' + program.Hall[0].value}</p></div>
                                                                                <div className="instr_email">{'Διδάσκων'}<p className="emailInstr_info">{program.instructor[0].value}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> :  null}
                                                            </tbody>
                                                        </Table>                                                
                                                </StyledTreeItem>    
                                                    )
                                                })} 
                                            </StyledTreeItem> 
                                        </TreeView>
                                        )
                                })}
                                </Tab>
                                <Tab eventKey="longer-tab" title="Ανά Υποχρεωτικά/Επιλογής">
                                {coursesByCourseType.map((studyProgram, index)=> {
                                        return(
                                        <TreeView
                                            key={index}
                                            aria-label="gmail"
                                            defaultExpanded={[]}
                                            defaultCollapseIcon={<ArrowDropDownIcon/>}
                                            defaultExpandIcon={<ArrowRightIcon />}
                                            defaultEndIcon={<div style={{ width: 24 }} />}
                                            sx={{ flexGrow: 1, maxWidth: 'inherit', overflowY: 'auto' }}
                                            >                                      
                                            <StyledTreeItem nodeId={String(index)} labelText={studyProgram._id === 'Υποχρεωτικό' ? 'Υποχρεωτικά Μαθήματα' : 'Μαθήματα Επιλογής'} fontWeight ='700' fontSize='18px' color="#17a2b8" labelIcon={FcGraduationCap}>
                                                {studyProgram.course.map((courseIn, indexIn) => {  
                                                    console.log(courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >=0)     
                                                    return(
                                                <StyledTreeItem 
                                                    key = {indexIn} 
                                                    nodeId={courseIn.StudyProgram.course_code}      
                                                    labelText={courseIn.StudyProgram.course_name+ ' (' + courseIn.StudyProgram.course_code + ') '}
                                                    labelIcon={MdLibraryBooks}
                                                    labelInfo={courseIn.More.course_active === true ? 'true' : 'false'}                              
                                                    color="#f09f09"
                                                    bgColor="rgba(23, 163, 184, 0.144)"
                                                    colorForDarkMode="#B8E7FB"
                                                    bgColorForDarkMode="#071318">
                                                        <Table striped bordered hover
                                                            style={{marginTop:'1rem', boxShadow:'1px 1px 12px #caecf16b'}}>
                                                            <thead style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                <tr>
                                                                <th colSpan={2} style={{alignItems:'center',  backgroundColor:'#74d1df18',  textAlign:'left'}}>
                                                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'left', textAlign:'left', marginTop:'-0.7rem', marginBottom:'-1rem'}}>
                                                                        <img style={{width:'80px', height:'65px', marginLeft:'0rem'}} src={UTH_ICON} alt=''></img>
                                                                        <div style={{display : 'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', padding:'16px', fontSize:'17px', color:'#17a3b8e3', justifyContent:'right', letterSpacing:'1px'}}>{'ΠΛΗΡΟΦΟΡΙΕΣ ΜΑΘΗΜΑΤΟΣ ΠΠΣ' + ' ' + courseIn.StudyProgram.course_code}
                                                                        <div style={{display:'flex', marginTop:'0.5rem', gap:'5px', justifyContent:'right', marginLeft:'auto', marginRight:'0rem'}}>
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΠΡΟΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#17a2b8', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΠΣ" /> 
                                                                            </Stack>
                                                                            : null}
                                                                            {courseIn.StudyProgram.course_label.indexOf("ΜΕΤΑΠΤΥΧΙΑΚΟ") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'rgba(128, 128, 128, 0.23)', color:'#f09f09', letterSpacing:'1px'}} avatar={<Avatar style={{backgroundColor:'rgba(128, 128, 128, 0.23)', height:'17px', width:'17px'}}><FcGraduationCap style={{fontSize:'25px', color:'rgb(15, 170, 33)'}}/></Avatar>} label="ΠΜΣ" /> 
                                                                            </Stack>
                                                                            : null }
                                                                            { courseIn.StudyProgram.course_label.indexOf("ERASMUS") >= 0 ?
                                                                            <Stack style={{verticalAlign:'middle', alignItems:'center'}} direction="row" spacing={1}>
                                                                                <Chip  style={{width:'100%', display:'grid', gridTemplateColumns:'0fr 1fr', maxWidth:'105px', alignItems:'center', justifyContent:'space-around',  whiteSpace:'nowrap', overflow:'visible', textOverflow:'ellipsis', backgroundColor:'#17a3b82b', color:'#17a2b8'}} avatar={<Avatar style={{backgroundColor:'#17a3b82b', height:'17px', width:'17px'}}><FaUserGraduate style={{fontSize:'15px', color:'#17a2b8'}}/></Avatar>} label="ERASMUS" />
                                                                            </Stack>
                                                                            : null}
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </th> 
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left', borderLeft:'5px solid #17a2b8', fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', letterSpacing:'1px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Τίτλος Μαθήματος</td>
                                                                <td style={{textAlign:'left',fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn.StudyProgram.course_name}<div className="strong_code" >{courseIn.StudyProgram.course_code}
                                                                    
                                                                    <OverlayTrigger
                                                                        key='right'
                                                                        placement='top'	
                                                                        style={{display:'inline-flex',justifyContent:'right', gap:'0rem'}}								
                                                                        overlay={
                                                                            <Tooltip style={{marginLeft:'0rem', display:'inline-flex'}} id={`tooltip-top`}>
                                                                                <div style={{display:'inline-flex', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Μαθήματος</strong></div>
                                                                            </Tooltip>
                                                                        }
                                                                    ><IconButton onClick={()=> navigate('/uth-ece/studies/undergraduate/courses/'+courseIn.StudyProgram.course_code)} className="iconButton"><BsFillEyeFill style={{display : 'inline-flex', marginLeft:'auto', marginRight:'0rem', fontSize:'15px'}}/></IconButton></OverlayTrigger></div>
                                                                </td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Γνωστικό Αντικείμενο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{formatStudyProgramName(courseIn?.StudyProgram.study_program)}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξάμηνο</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram.period === 'Χειμερινή' ? 'Εξάμηνο ' + courseIn?.StudyProgram.semester + ' , Χειμερινό' :  'Εξάμηνο ' + courseIn?.StudyProgram.semester  + ' , Εαρινό' }</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Είδος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.course_type}</td> 
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Συν. Εβδ. Ωρών Διδασκαλίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_hours}</td>
                                                                </tr>
                                                                { courseIn?.InfoFromInstructor?.theory_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Θεωρίας</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.theory_hours}</td> 
                                                                </tr> }

                                                                { courseIn?.InfoFromInstructor?.lab_hours.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Εργαστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.lab_hours}</td> 
                                                                </tr> }
 
                                                                { courseIn?.InfoFromInstructor?.tutoring_hours?.trim().length !== 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr>
                                                                : <tr style={{backgroundColor:'white', display : 'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Ώρες Φροντιστηρίου</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.InfoFromInstructor?.tutoring_hours}</td> 
                                                                </tr> }

                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Μονάδες ECTS</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.ECTS}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδακτικές Μονάδες</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{courseIn?.StudyProgram?.study_units}</td>
                                                                </tr>
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f091c', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Σελίδα Μαθήματος</td>
                                                                <td className="eclass" onClick={() => window.open('https://eclass.uth.gr/')}>{'https://courses.e-ce.uth.gr/' + courseIn?.StudyProgram.course_code + '/'}</td> 
                                                                </tr> 
                                                                {courseIn?.StudyProgram?.prerequisites.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code' onClick={()=>navigate('/uth-ece/studies/undergraduate/courses/'+ findCourseBasicInfo(preCourse, 'course_type').courseCode)}>{findCourseBasicInfo(preCourse, 'course_type').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'course_type').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })} 
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display :'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Προπαιτούμενα Μαθήματα</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    {courseIn?.StudyProgram.prerequisites.map((preCourse) => {
                                                                        return (
                                                                            <ListGroup> 
                                                                                <ListGroup.Item style={{display:'grid', padding:'2px 2px', backgroundColor:'transparent', verticalAlign:'middle', border:'0px solid gray', gridTemplateColumns:'0fr 0fr 2fr', columnGap:'6px',alignItems:'center'}}>
                                                                                    <BsFillArrowRightCircleFill style={{fontSize:'12px',marginBottom:'-0.15rem', verticalAlign:'middle', color:'red'}}/> <h6 className='course_code'>{findCourseBasicInfo(preCourse, 'course_type').courseCode}</h6><p className="course_name">{findCourseBasicInfo(preCourse, 'course_type').courseName}</p>                                                                   
                                                                                </ListGroup.Item>   
                                                                            </ListGroup>                                                                            
                                                                        )
                                                                    })} 
                                                                </td> 
                                                                </tr>}
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Υπεύθυνος Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <div className="professor_info"> 
                                                                        <Avatar style={{backgroundColor:"#17a3b858"}}><FaUserCog style={{fontSize:'26px', color:'#17a2b8'}}/></Avatar>                                                              
                                                                        <div style={{display:'inline-block', verticalAlign:'middle', alignItems:'center'}}>
                                                                            <h6 className='admin_professor'>{courseIn.CourseManagement.COURSE_DIRECTOR.director_LastName + ' ' + courseIn.CourseManagement.COURSE_DIRECTOR.director_FirstName}</h6>
                                                                            <span className="proffessor_type">{courseIn.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}</span> 
                                                                            <div className="email">Email : <p className="email_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{courseIn?.CourseManagement?.COURSE_DIRECTOR.director_Email}</p> </div>
                                                                        </div>
                                                                    </div>
                                                                </td> 
                                                                </tr>
                                                                {courseIn.CourseManagement.COURSE_INSTRUCTORS.length > 0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {courseIn.CourseManagement.COURSE_INSTRUCTORS.map((instructor, instructor_index) => {
                                                                        return(
                                                                        <ListGroup.Item key={instructor_index} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{instructor.instructor_LastName + ' ' + instructor.instructor_FirstName + ' , '}<p className="instructor_type">{instructor.instructor_director_ProfessorType}</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info" onClick={() => window.open('https://webmail.uth.gr/login.php?horde_logout_token=jleQcpbI77ElNjfnORmYL7U&logout_reason=4')}>{instructor.instructor_Email}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> : 
                                                                <tr style={{backgroundColor:'white', display:'none'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Διδάσκοντες Μαθήματος</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                        <ListGroup.Item style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaUser style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>ΤΣΟΜΠΑΝΟΠΟΥΛΟΥ ΠΑΝΑΓΙΩΤΑ , <p className="instructor_type">ΑΝΑΠΛΗΡΩΤΡΙΑ ΚΑΘΗΓΗΤΡΙΑ</p></h6> 
                                                                                <div className="instr_email">Email : <p className="emailInstr_info">yota@uth.gr</p></div>
                                                                            </div>
                                                                            </ListGroup.Item>     
                                                                    </ListGroup>
                                                                </td> 
                                                                </tr>
                                                                }
                                                                {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).length>0 ?
                                                                <tr style={{backgroundColor:'white'}}>
                                                                <td style={{textAlign:'left',borderLeft:'5px solid #17a2b8',  fontWeight:'700', backgroundColor:'#f09f0910', color:'#f09f09', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Πρόγραμμα Μαθήματος ({academicSemester} περίοδος ακαδημαϊκού έτους {academicYear})</td>
                                                                <td style={{textAlign:'left', fontWeight:'500', color:'#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
                                                                    <ListGroup> 
                                                                       {programInfo?.filter(item=> item.course_code === courseIn?.StudyProgram.course_code).map((program, programIndex) => {
                                                                        return(
                                                                        <ListGroup.Item key={programIndex} style={{display:'grid', backgroundColor:'transparent', border:'0px solid white', borderBottom:'1px solid #17a3b82c', gridTemplateColumns:'0fr 2fr', columnGap:'8px',alignItems:'center'}}>
                                                                            <FaCalendarAlt style={{fontSize:'20px', color:'#b3b3b3'}}/>
                                                                            <div>
                                                                                <h6 className='instructor_professor'>{program.day}<p className="instructor_type">{'   '+ program.fromHour +':00 - ' + program.toHour + ':00' }</p></h6> 
                                                                                <div className="instr_email">{program.type}<p className="emailInstr_info">{program.Hall[0].label ? 'Αίθουσα : ' + program.Hall[0].label : 'Αίθουσα : ' + program.Hall[0].value}</p></div>
                                                                                <div className="instr_email">{'Διδάσκων'}<p className="emailInstr_info">{program.instructor[0].value}</p></div>
                                                                            </div>
                                                                        </ListGroup.Item>
                                                                        )                                                              
                                                                       })}                                                                           
                                                                    </ListGroup>  
                                                                </td> 
                                                                </tr> :  null}
                                                            </tbody>
                                                        </Table>                                                
                                                </StyledTreeItem>    
                                                    )
                                                })} 
                                            </StyledTreeItem> 
                                        </TreeView>
                                        )
                                })}
                                </Tab> 
                            </Tabs>      
                    </div>
                </div>
            </div>
        : <Login></Login> }
        </>
        
    )
}

export default UndergraduateCoursesListContainer;