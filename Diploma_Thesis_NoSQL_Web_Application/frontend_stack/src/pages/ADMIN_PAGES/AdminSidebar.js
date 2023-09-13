import React , {useState} from "react";
import Divider from '@mui/material/Divider'; 
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';  
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';  
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';  
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'; 

// Icons 
import UTH_LOGO from '../../../src/Icons/transparentLogo.jpg'
import { HiMenuAlt1 } from "react-icons/hi";
import {FaBlackTie, FaUserCircle, FaCalendarAlt, FaUsers, FaGraduationCap, FaPowerOff, FaUser, FaSchool} from "react-icons/fa";  
import {MdEmail} from 'react-icons/md';
import {GiDiploma} from 'react-icons/gi';
import {RiFilePaper2Fill} from 'react-icons/ri';
import {HiClipboardDocumentList} from 'react-icons/hi2'; 
import {SiGoogleclassroom} from 'react-icons/si';

// Components
import Login from '../../components/LOGIN';
 
// CSS Styles
import '../../../src/styles/pages/ADMIN_PAGES/adminSidebar.scss';
import { Button } from "@mui/material";

// Auth
import { useAuthDispatch } from "../../context/auth";


const AdminSidebar = (props) => { 
    const connectedUser = localStorage.getItem('userIdentity')
    console.log(connectedUser, 'CONNECTED')
    // Declare the useful values
    const dispatch = useAuthDispatch(); 
 
    // Tab Selections
    const [universitySelection, setUniveritySelection] = useState(true);    // University Selection
    const [adminSelection, setAdminSelection] = useState(false);            // Admin Selection
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);   
    const [bottomNavigationOpen, setBottomNavigationOpen] = useState('bottomNavigation');
    
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');
    // Setting the state variable that will store the current academic exam period
    let [academicExamPeriod, setAcademicExamPeriod] = useState(''); 

    // Determine the current Academic Year and the current academic semester
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year) 

     // Find the current ACADEMIC SEMESTER
     if (currMonth >=9 && currMonth <= 2) {  
        if (academicSemester === '') {
            setAcademicSemester('Χειμερινού');
        }                
    } 
    else {
        if (academicSemester === '') {
            setAcademicSemester('Εαρινού');
        } 
    } 

    // Find the current ACADEMIC EXAM PERIOD
    if (currMonth>=8 && currMonth <= 10) {  
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Σεπτεμβρίου');
        }                
    } 
    else if (currMonth >=11 && currMonth <= 2){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιανουαρίου');
        } 
    } 
    else if (currMonth >=3 && currMonth <= 7){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιουνίου');
        } 
    } 

    const theme = useTheme(); 

    // Tabs Handling
    const [value, setValue] = React.useState(0); 

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
	
	const handleChangeIndex = (index) => {
		setValue(index);
	};

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        
        return (
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
          >
            {value === index && <Box style={{overflowY:'hidden'}}>{children}</Box>}
          </Typography>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    function a11yProps(index) {
        return {
            id: `action-tab-${index}`,
            'aria-controls': `action-tabpanel-${index}`,
        };
    }

    const navigate = useNavigate();
     
    // Function that handles the left sidebar opening
    const openSideBar = (isLeftSideBarOpen) => {
        if (isLeftSideBarOpen === true) {
            setIsSideBarOpen(true);
            setBottomNavigationOpen('bottomNavigation');
            document.getElementById('admin').getElementsByClassName('sidebar_container')[0].style.height = 'calc(100% - 57px)';
            props.onShow();
        }
        else if (isLeftSideBarOpen === false) {
            setIsSideBarOpen(false);
            setBottomNavigationOpen('bottomNavigationClose');
            document.getElementById('admin').getElementsByClassName('sidebar_container')[0].style.height = 'calc(100% - 145px)';
            props.onNotShow();
        }
    }

    // Take from the local storage the userIdentity and the user info
    const userInfo_username = JSON.parse(localStorage?.getItem('user'))?.username;
    const userIdentity = localStorage?.getItem('userIdentity'); 
   
    // Get the token from local storage
    const token = localStorage.getItem('token'); 
      
    return (
        <>
    {token !== null ?
        <div className="admin" id='admin'>
                <div className="admin_container"> 
                    <div className="sidebar">  
                        <div className="sidebar_container" >
                            <div className='left_sidebar'>
                                <div className='logo_details_left'>
                                    <img className='sidebar_plus' alt='LOGO' src={UTH_LOGO}></img>  
                                </div>  
                                <div className='menu_icons'>
                                    <HiMenuAlt1 className='menu_container_icon' onClick={()=> {isSideBarOpen === true ? openSideBar(false) : openSideBar(true)}}/>
                                </div>
                            </div> 
                            {connectedUser && JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ' ?
                            <div className='right_sidebar'>
                                <div className='logo_details_right'>                    
                                    <span className='logo_name'><span>ECE</span>UTH</span>
                                </div>
                                <Box className='box_container'>
                                    <Tabs
                                        className='tab_container'
                                        value={value}
                                        onChange={handleChange}  
                                        TabIndicatorProps={{
                                            style: {
                                            backgroundColor: "rgba(255,255,255)",
                                            height:'1px',
                                            width:"50%",
                                            color:"rgba(255,255,255)"                                    
                                            } 
                                        }}
                                        aria-label="secondary tabs example" 
                                    >
                                        <Tab aria-selected={universitySelection} className='tab' value={0} label="Πανεπιστήμιο" onClick={()=>{setAdminSelection(!adminSelection); setUniveritySelection(!universitySelection)}} {...a11yProps(0)}/>
                                        <Tab aria-selected={adminSelection} className='tab' value={1}  label="Γραμματεία" onClick={()=>{setAdminSelection(!adminSelection); setUniveritySelection(!universitySelection)}} {...a11yProps(1)} />  
                                    </Tabs>
                                </Box>
                                <Divider style={{backgroundColor:'white', width:'100%', display:'block', marginLeft:'auto', marginRight:'0rem'}}></Divider> 
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >  
                                <TabPanel value={value} index={0} dir={theme.direction} className="tab_content">                                    
                                    <Accordion>
                                     <Accordion.Item eventKey="0">
                                            <Accordion.Header ><FaUserCircle className="icon"/><span>Προφίλ</span></Accordion.Header>
                                            <Accordion.Body >
                                                <ul> 
                                                    <li id='user_profile' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('user_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('dashBoard').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Σελίδα Προφίλ 
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='dashBoard' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/uth-ece_admin/dashboard');
                                                                   document.getElementById('user_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('dashBoard').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        DashBoard
                                                        <div className="active_bullet" style={{display: props.document === 'dashboard' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><FaBlackTie className="icon"/><span>Καθηγητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='professors_list' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/professor_list');
                                                                    document.getElementById('professors_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('professor_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Λίστα Καθηγητών
                                                        <div className="active_bullet" style={{display: props.document === 'professors_list' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='professor_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{document.getElementById('professors_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('professor_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Προφίλ Καθηγητή
                                                        <div className="active_bullet" style={{display: props.document === 'professor_profile' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ' || JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ' ) ?
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header><FaUsers className="icon"/><span>Φοιτητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='students_list' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/students_list');
                                                                    document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Λίστα Φοιτητών
                                                        <div className="active_bullet" style={{display: props.document === 'student_list' ? 'inline-flex' : 'null'}} ></div>
                                                    </li>
                                                    <li id='student_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Προφίλ Φοιτητή
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>: null}                                        
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header><FaGraduationCap style={{fontSize:'19.5px'}} className="icon"/><span>Μαθήματα</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?
                                                <ul>                                             
                                                    <li id='my_courses' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/studies/my_student_courses/' + JSON.parse(localStorage.getItem('user')).username)
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        my-Μαθήματα
                                                        <div className="active_bullet"  style={{display: props.document === 'my_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses')
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet"  style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet"  style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>                                              
                                                    : connectedUser && (JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ') ?
                                                <ul>
                                                    <li id='my_courses' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{  navigate('/uth-ece/studies/my_prof_courses/' + JSON.parse(localStorage.getItem('user')).username );
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        my-Μαθήματα
                                                        <div className="active_bullet" style={{display : props.document === 'my_courses' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses');
								    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet" style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet" style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>  
                                                : connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ') ?
                                                <ul>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet"  style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet"  style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>  :  null }
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>  
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header><FaCalendarAlt style={{fontSize:'17.5px'}} className="icon"/><span>Πρόγραμμα</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='hourUndergraduateProgram'  style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        Ωρολόγιο ΠΠΣ {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='hourPostgraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Ωρολόγιο ΠΜΣ {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='hourUndergraduateProgram'  style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        Ωρολόγιο Ισοτιμίας {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='examUndergraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Πρόγραμμα Εξεταστικής ΠΠΣ {academicExamPeriod}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='examPostgraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';}}>
                                                        Πρόγραμμα Εξεταστικής ΠΜΣ {academicExamPeriod}
                                                        <div className="active_bullet" ></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>                                          
                                        <Accordion.Item eventKey="5">                                        
                                            <Accordion.Header><GiDiploma style={{fontSize:'20px'}} className="icon"/><span>Βαθμολογία</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' || JSON.parse(connectedUser).identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?
                                                    <li id='my_grades' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('my_grades').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('grades_list').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        my-Καρτέλα
                                                        <div className="active_bullet"></div>
                                                    </li> : null}
                                                    <li id='grades_list'   style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.58px'}}  
                                                        onClick={()=>{document.getElementById('my_grades').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('grades_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Ανά Εξεταστική Περίοδο
                                                        <div className="active_bullet"></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item> 
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header><RiFilePaper2Fill style={{fontSize:'19.5px'}} className="icon"/><span>Δηλώσεις</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ?  
                                                <ul>                                                                                                 
                                                    <li id='new_declaration' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{navigate('/e_secretariat/submit_my_course_declaration');
                                                                    document.getElementById('new_declaration').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Νέα Δήλωση
                                                        <div className="active_bullet" style={{display: props.document === 'new_declaration' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                    <li id='my_declarations'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/e_secretariat/view_my_declarations')
                                                                    document.getElementById('new_declaration').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Δηλώσεις
                                                        <div className="active_bullet" style={{display: props.document === 'my_declarations' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul>    : 
                                                connectedUser && JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ'  ?   
                                                <ul>          
                                                <li id='my_declarations'  style={{marginLeft: '-0.6px'}}
                                                    onClick={()=>{ navigate('/e_secretariat/view_my_declarations') 
                                                                document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                    my-Δηλώσεις
                                                    <div className="active_bullet" style={{display: props.document === 'my_declarations' ? 'inline-flex' : 'none'}}></div>
                                                </li> 
                                            </ul>   :
                                             connectedUser && JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ'  ? null : null}     

                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item> 
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header><HiClipboardDocumentList style={{fontSize:'20px'}} className="icon"/><span>Έντυπα</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ||  JSON.parse(connectedUser).identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?  
                                                <ul>                                                    
                                                    <li id='new_document' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/submit_form');
                                                                    document.getElementById('new_document').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Νέο Έντυπο
                                                        <div className="active_bullet" style={{display: props.document === 'new_document' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='my_documents'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/form/undergraduate/my_forms');
                                                                    document.getElementById('new_document').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Έντυπα
                                                        <div className="active_bullet" style={{display: props.document === 'my_documents' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul> :   connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ' ||  JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ' ) ?  
                                                  <ul>  
                                                    <li id='my_documents'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/form/undergraduate/my_forms'); 
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Έντυπα
                                                        <div className="active_bullet" style={{display: props.document === 'my_documents' ? 'inline-flex' : 'none'}}></div>
                                                    </li>     
                                                  </ul> : null}                       
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>    
                                        <Accordion.Item eventKey="8">
                                            <Accordion.Header><SiGoogleclassroom style={{fontSize:'20px'}} className="icon"/><span>Αίθουσες</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>                                                    
                                                    <li id='hall_list' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('hall_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hall_search').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Λίστα Αιθουσών
                                                        <div className="active_bullet" style={{display: props.document === 'hall_list' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='hall_search' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hall_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hall_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Αναζήτηση Αίθουσας
                                                        <div className="active_bullet" style={{display: props.document === 'hall_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>                                       
                                    </Accordion>                                     
                                </TabPanel>                                
                                <TabPanel value={value} index={1} dir={theme.direction} className="tab_content">
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header><FaBlackTie className="icon"/><span>Καθηγητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='professor_add' style={{fontSize:'12.5px', marginLeft:'-1.5px'}} 
                                                        onClick={()=>{navigate('/uth-ece_admin/add_professor');
                                                                    document.getElementById('professor_add').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('professor_edit').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Εισαγωγή Καθηγητή
                                                        <div className="active_bullet" style={{display:props.document === 'professor_add' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='professor_edit' style={{fontSize:'12.5px',  marginLeft:'-1.5px'}}
                                                        onClick={()=>{ navigate('/uth-ece_admin/edit_professor');
                                                                     document.getElementById('professor_add').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('professor_edit').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Ανανέωση Προφίλ    
                                                        <div className="active_bullet" style={{display:props.document === 'professor_edit' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><FaUsers className="icon"/><span>Φοιτητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='student_add' style={{fontSize:'12.5px', marginLeft:'-1.5px'}} 
                                                        onClick={()=>{ navigate('/uth-ece_admin/add_student');
                                                                    document.getElementById('student_add').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('student_edit').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Εισαγωγή Φοιτητή
                                                        <div className="active_bullet" style={{display:props.document === 'student_add' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='student_edit' style={{fontSize:'12.5px', marginLeft:'-1.5px'}} 
                                                        onClick={()=>{ navigate('/uth-ece_admin/edit_student');
                                                                    document.getElementById('student_add').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('student_edit').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Ανανέωση Προφίλ
                                                        <div className="active_bullet" style={{display:props.document === 'student_edit' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header><FaGraduationCap style={{fontSize:'19.5px'}} className="icon"/><span>Ακαδημαϊκά Στοιχεία</span></Accordion.Header>

                                            <Accordion.Body>
                                                <ul>
                                                    <li id='my_courses' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}
                                                            onClick={()=>{ navigate('/uth-ece_admin/add_course');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        Εισαγωγή Μαθήματος
                                                        <div className="active_bullet" style={{display: props.document === 'add_course' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}} 

                                                        onClick={()=>{navigate('/uth-ece_admin/create_calendar');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Δημιουργία Ακαδ. Ημερολογίου

                                                        <div className="active_bullet" style={{display: props.document === 'create_calendar' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}} 
                                                        onClick={()=>{navigate('/uth-ece_admin/create_program');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Δημιουργία Προγραμμάτων                                                     
                                                        <div className="active_bullet" style={{display: props.document === 'create_program' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header><FaSchool style={{fontSize:'19.5px'}} className="icon"/><span>Τμήμα</span></Accordion.Header>

                                            <Accordion.Body>
                                                <ul>
                                                    <li id='department' style={{lineHeight:'17px', fontSize:'12.5px', marginLeft:'-1.5px', marginBottom:'0.8rem'}}
                                                            onClick={()=>{ navigate('/uth-ece_admin/add_hall');
                                                                   document.getElementById('department').getElementsByClassName('active_bullet')[0].style.display='inline-flex'; 
                                                                   }}>
                                                        Εισαγωγή Αίθουσας
                                                        <div className="active_bullet" style={{display:props.document === 'add_hall' ? 'inline-flex' : 'null'}}></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>                                        
                                    </Accordion>                                     
                                </TabPanel>    
                                </SwipeableViews>                                       
                            </div>                             
                            :
                            <div className='right_sidebar'>
                                <div className='logo_details_right'>                    
                                    <span className='logo_name'><span>ECE</span>UTH</span>
                                </div>
                                <Box className='box_container'>
                                    <Tabs
                                        className='tab_container'
                                        value={value}
                                        onChange={null}  
                                        TabIndicatorProps={{
                                            style: {
                                            backgroundColor: "rgba(255,255,255)",
                                            height:'1px',
                                            width:"50%",
                                            color:"rgba(255,255,255)"                                    
                                            } 
                                        }}
                                        aria-label="secondary tabs example" 
                                    >
                                        <Tab aria-selected={universitySelection} className='tab' value={0} label="Πανεπιστήμιο" onClick={()=>{setUniveritySelection(true)}} {...a11yProps(0)}/>
                                        <Tab aria-selected={adminSelection} className='tab' value={1} style={{opacity:'0'}}  label="Γραμματεία" {...a11yProps(1)} />  
                                    </Tabs>
                                </Box>
                                <Divider style={{backgroundColor:'white', width:'100%', display:'block', marginLeft:'auto', marginRight:'0rem'}}></Divider> 
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >  
                                  <TabPanel value={value} index={0} dir={theme.direction} className="tab_content">                                    
                                    <Accordion>
                                     <Accordion.Item eventKey="0">
                                            <Accordion.Header ><FaUserCircle className="icon"/><span>Προφίλ</span></Accordion.Header>
                                            <Accordion.Body >
                                                <ul> 
                                                    <li id='user_profile' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('user_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('dashBoard').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Σελίδα Προφίλ 
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='dashBoard' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/uth-ece_admin/dashboard');
                                                                    document.getElementById('user_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('dashBoard').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        DashBoard
                                                        <div className="active_bullet" style={{display: props.document === 'dashboard' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><FaBlackTie className="icon"/><span>Καθηγητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='professors_list' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/professor_list');
                                                                    document.getElementById('professors_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('professor_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Λίστα Καθηγητών
                                                        <div className="active_bullet" style={{display: props.document === 'professors_list' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='professor_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{document.getElementById('professors_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('professor_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Προφίλ Καθηγητή
                                                        <div className="active_bullet" style={{display: props.document === 'professor_profile' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ' || JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ' ) ?
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header><FaUsers className="icon"/><span>Φοιτητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='students_list' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/students_list');
                                                                    document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Λίστα Φοιτητών
                                                        <div className="active_bullet" style={{display: props.document === 'student_list' ? 'inline-flex' : 'null'}} ></div>
                                                    </li>
                                                    <li id='student_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Προφίλ Φοιτητή
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>: null}                                        
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header><FaGraduationCap style={{fontSize:'19.5px'}} className="icon"/><span>Μαθήματα</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?
                                                <ul>                                             
                                                    <li id='my_courses' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/studies/my_student_courses/' + JSON.parse(localStorage.getItem('user')).username)
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        my-Μαθήματα
                                                        <div className="active_bullet"  style={{display: props.document === 'my_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses')
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet"  style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet"  style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>                                              
                                                    : connectedUser && (JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ') ?
                                                <ul>
                                                    <li id='my_courses' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{  navigate('/uth-ece/studies/my_prof_courses/' + JSON.parse(localStorage.getItem('user')).username );
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        my-Μαθήματα
                                                        <div className="active_bullet" style={{display : props.document === 'my_courses' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses');
								    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet" style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet" style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>  
                                                : connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ') ?
                                                <ul>
                                                    <li id='courses_search' style={{lineHeight:'17px', marginBottom:'0.7rem', marginTop:'0.2rem',  marginLeft:'-0.7px'}}  
                                                        onClick={()=>{navigate('/uth-ece/search_courses');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Αναζήτηση Μαθημάτων
                                                        <div className="active_bullet"  style={{display: props.document === 'courses_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='courses_list'style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/undergraduate_courses_list');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet"  style={{display: props.document === 'under_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='course_profile' style={{marginLeft: '-1px'}}
                                                        onClick={()=>{ navigate('/uth-ece/postgraduate_courses_list');
                                                                    document.getElementById('courses_search').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet" style={{display: props.document === 'post_courses' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                </ul>  :  null }
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>  
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header><FaCalendarAlt style={{fontSize:'17.5px'}} className="icon"/><span>Πρόγραμμα</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='hourUndergraduateProgram'  style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        Ωρολόγιο ΠΠΣ {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='hourPostgraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Ωρολόγιο ΠΜΣ {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='hourUndergraduateProgram'  style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        Ωρολόγιο Ισοτιμίας {academicSemester}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='examUndergraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Πρόγραμμα Εξεταστικής ΠΠΣ {academicExamPeriod}
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='examPostgraduateProgram' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hourUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hourPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('examUndergraduateProgram').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('examPostgraduateProgram').getElementsByClassName('active_bullet')[0].style.display='none';}}>
                                                        Πρόγραμμα Εξεταστικής ΠΜΣ {academicExamPeriod}
                                                        <div className="active_bullet" ></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>   
                                        {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' || JSON.parse(connectedUser).identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?                                       
                                        <Accordion.Item eventKey="5">                                        
                                            <Accordion.Header><GiDiploma style={{fontSize:'20px'}} className="icon"/><span>Βαθμολογία</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>                                                
                                                    <li id='my_grades' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('my_grades').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('grades_list').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        my-Καρτέλα
                                                        <div className="active_bullet"></div>
                                                    </li> 
                                                    <li id='grades_list'   style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.58px'}}  
                                                        onClick={()=>{document.getElementById('my_grades').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('grades_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Ανά Εξεταστική Περίοδο
                                                        <div className="active_bullet"></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item> : null}
                                        {connectedUser && JSON.parse(connectedUser).identity !== 'ΚΑΘΗΓΗΤΗΣ' ?  
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header><RiFilePaper2Fill style={{fontSize:'19.5px'}} className="icon"/><span>Δηλώσεις</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ?  
                                                <ul>                                                                                                 
                                                    <li id='new_declaration' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{navigate('/e_secretariat/submit_my_course_declaration');
                                                                    document.getElementById('new_declaration').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Νέα Δήλωση
                                                        <div className="active_bullet" style={{display: props.document === 'new_declaration' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                    <li id='my_declarations'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/e_secretariat/view_my_declarations')
                                                                    document.getElementById('new_declaration').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Δηλώσεις
                                                        <div className="active_bullet" style={{display: props.document === 'my_declarations' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul>    : 
                                                connectedUser && JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ'  ?   
                                                <ul>          
                                                <li id='my_declarations'  style={{marginLeft: '-0.6px'}}
                                                    onClick={()=>{ navigate('/e_secretariat/view_my_declarations') 
                                                                document.getElementById('my_declarations').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                    my-Δηλώσεις
                                                    <div className="active_bullet" style={{display: props.document === 'my_declarations' ? 'inline-flex' : 'none'}}></div>
                                                </li> 
                                            </ul>   :
                                             connectedUser && JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ'  ? null : null}     

                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item> : null}

                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header><HiClipboardDocumentList style={{fontSize:'20px'}} className="icon"/><span>Έντυπα</span></Accordion.Header>
                                            <Accordion.Body>
                                            {connectedUser && (JSON.parse(connectedUser).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ||  JSON.parse(connectedUser).identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') ?  
                                                <ul>                                                    
                                                    <li id='new_document' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/submit_form');
                                                                    document.getElementById('new_document').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Νέο Έντυπο
                                                        <div className="active_bullet" style={{display: props.document === 'new_document' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='my_documents'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/form/undergraduate/my_forms');
                                                                    document.getElementById('new_document').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Έντυπα
                                                        <div className="active_bullet" style={{display: props.document === 'my_documents' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul> :   connectedUser && (JSON.parse(connectedUser).identity === 'ΓΡΑΜΜΑΤΕΙΑ' ||  JSON.parse(connectedUser).identity === 'ΚΑΘΗΓΗΤΗΣ' ) ?  
                                                  <ul>  
                                                    <li id='my_documents'  style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{ navigate('/form/undergraduate/my_forms'); 
                                                                    document.getElementById('my_documents').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        my-Έντυπα
                                                        <div className="active_bullet" style={{display: props.document === 'my_documents' ? 'inline-flex' : 'none'}}></div>
                                                    </li>     
                                                  </ul> : null}                       
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>    
                                        <Accordion.Item eventKey="8">
                                            <Accordion.Header><SiGoogleclassroom style={{fontSize:'20px'}} className="icon"/><span>Αίθουσες</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>                                                    
                                                    <li id='hall_list' style={{marginLeft: '-0.6px'}}
                                                        onClick={()=>{document.getElementById('hall_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('hall_search').getElementsByClassName('active_bullet')[0].style.display='none'; 
                                                                    }}>
                                                        Λίστα Αιθουσών
                                                        <div className="active_bullet" style={{display: props.document === 'hall_list' ? 'inline-flex' : 'none'}}></div>
                                                    </li>
                                                    <li id='hall_search' style={{lineHeight:'17px', marginBottom:'0.8rem', marginLeft:'-0.7px'}}  
                                                        onClick={()=>{document.getElementById('hall_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('hall_search').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Αναζήτηση Αίθουσας
                                                        <div className="active_bullet" style={{display: props.document === 'hall_search' ? 'inline-flex' : 'none'}}></div>
                                                    </li> 
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>                                       
                                    </Accordion>                                     
                                </TabPanel>                              
                                <TabPanel value={value} index={1} dir={theme.direction} className="tab_content" style={{opacity:'0'}}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header><FaBlackTie className="icon"/><span>Καθηγητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='professor_add' style={{fontSize:'12.5px', marginLeft: '-1.5px'}} 
                                                        onClick={()=>{navigate('/uth-ece_admin/add_professor');
                                                                    document.getElementById('professor_add').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('professor_edit').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Εισαγωγή Καθηγητή
                                                        <div className="active_bullet" style={{display:props.document === 'professor_add' ? 'inline-flex' : 'null'}}></div>
                                                    </li>
                                                    <li id='professor_edit' style={{fontSize:'12.5px', marginLeft: '-1.5px'}}
                                                        onClick={()=>{document.getElementById('professor_add').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('professor_edit').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Ανανέωση Προφίλ    
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header><FaUsers className="icon"/><span>Φοιτητές</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='students_list' 
                                                        onClick={()=>{document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Λίστα Φοιτητών
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='student_profile'
                                                        onClick={()=>{document.getElementById('students_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('student_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Προφίλ Φοιτητή
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header><FaGraduationCap style={{fontSize:'19.5px'}} className="icon"/><span>Μαθήματα</span></Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li id='my_courses' 
                                                        onClick={()=>{document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    }}>
                                                        my-Μαθήματα
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='courses_list'
                                                        onClick={()=>{document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='inline-flex';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='none'}}>
                                                        Μαθήματα ΠΠΣ
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                    <li id='course_profile'
                                                        onClick={()=>{document.getElementById('my_courses').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('courses_list').getElementsByClassName('active_bullet')[0].style.display='none';
                                                                    document.getElementById('course_profile').getElementsByClassName('active_bullet')[0].style.display='inline-flex'}}>
                                                        Μαθήματα ΠΜΣ
                                                        <div className="active_bullet"></div>
                                                    </li>
                                                </ul>                                                
                                            </Accordion.Body>                                                                                     
                                        </Accordion.Item>                                        
                                    </Accordion>                                     
                                </TabPanel>    
                                </SwipeableViews>           
                            </div>  
                              }                         
                        </div>                                   
                    </div>                
                </div>    
                <Box className={bottomNavigationOpen}>
                    <div className="buttons_bottom_navigation">
                    <OverlayTrigger
						key='buttons_bottom_navigation'
						placement='top'									
						overlay={
							<Tooltip style={{marginLeft:'1px', marginBottom:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Ακαδημαϊκό Email</strong></div>                                
							</Tooltip>
						}
					><Button className="EmailButton" onClick={()=> {window.open("https://webmail.uth.gr/login.php")}}>
                            <MdEmail className="emailIcon"/>
                        </Button></OverlayTrigger>
                        <OverlayTrigger
						key='emailIcon'
						placement='top'									
						overlay={
							<Tooltip style={{marginLeft:'1px', marginBottom:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Αποσύνδεση</strong></div>                                
							</Tooltip>
						}
					><Button className="PowerOffButton" onClick={()=> {dispatch({type:'LOGOUT'}); navigate("/login", {state : {alert:false}})}}>
                            <FaPowerOff  className="powerOffIcon"/>
                        </Button></OverlayTrigger>
                        <OverlayTrigger
						key='powerOffIcon'
						placement='top'									
						overlay={
							<Tooltip style={{marginLeft:'1px', marginBottom:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Χρήστη</strong></div>                                
							</Tooltip>
						}
					><Button className="ProfileButton">
                            <FaUser className="profileIcon"/>
                        </Button></OverlayTrigger>
                    </div>
                </Box>                                                  
            </div>
        : <Login></Login> }
        </>       
    )

}

export default AdminSidebar;
