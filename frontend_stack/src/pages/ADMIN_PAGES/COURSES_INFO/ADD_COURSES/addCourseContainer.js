import React, {useEffect, useState } from "react";    
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";  
import Tooltip from '@mui/material/Tooltip';  
import {Row, Form, Col} from 'react-bootstrap'

// Icons
import InfoIcon from '@mui/icons-material/Info';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WidgetsIcon from '@mui/icons-material/Widgets'; 
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import AnnouncementTwoToneIcon from '@mui/icons-material/AnnouncementTwoTone';
import HttpsTwoToneIcon from '@mui/icons-material/HttpsTwoTone';
import NoEncryptionGmailerrorredTwoToneIcon from '@mui/icons-material/NoEncryptionGmailerrorredTwoTone';
import COURSES from '../../../../../src/Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import UTH_LOGO from '../../../../../src/Icons/uth-logo-background.png';

// GraphQL Resolvers
import SpecializationResolvers from '../../../../graphql/resolvers/courses' 

// CSS Styles
import "react-toastify/dist/ReactToastify.css"
import './../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCourseContainer.scss'; 
 
const AddCourseContainer = (props) => {
 
    // Determine the arguments when we call this component to use it as pop-up window
    const type = props.type; 
    const currPopUpWindow = props.currPopUpWindow;
    const newCourseInfo = props.data;

    // Declare the initial state of submit button 
    const [submitButton, setSubmitButton] = useState('submit_button loading');
  
    const navigate = useNavigate();
 
    // Determine the state value of variable that it is responsible for the appearance of the specialization fields' menu
    const [menuField, setMenuField] = useState('menu_fields');   
    const [currYearSemester, setCurrYearSemester] = useState('');
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semesterSelect, setSemesterSelect] = useState([]);
     
    // Set the state variable that it be used to lock the forms after the user selections
    let [isDisabled, setIsDisabled] = useState(true);
    let [isDisabledUnderGrad, setIsDisabledUnderGrad] = useState(true);
    let [isDisabledPostGrad, setIsDisabledPostGrad] = useState(true);

    // Set the state variable that determines the selected by the user number of course's instructors
    let [numInstructors, setNumInstructors] = useState(newCourseInfo? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS.length :1); 

    // Set the state variable that it be used to lock the postgraduate selection of course label
    let [opacityState, setOpacity] = useState('1');

    // Determine the current academic year
    let currentDate = new Date();
    let currYear = currentDate.getFullYear();
    let currMonth = currentDate.getMonth() + 1;
    let currAcademicYear = '';
    if (currMonth >= 9) {
        currAcademicYear = currYear+'-'+currYear+1;
    }
    else {
        currAcademicYear = currYear-1+'-'+currYear;
    }

    // Determine the state array that will store all the courses names and codes of the previous semesters than the current that can be prerequisites
    let [prerequisitesOptions, setPrerequisitesOptions] = useState([]);
 
    // State variable for forms icons
    let [basicInfoActive, setBasicInfoActive] = useState('mui_icon1');
    let [basicInfoActiveForm, setBasicInfoActiveForm] = useState('mui_icon1Form');
    let [studyProgramActive, setstudyProgramActive] = useState('mui_icon2');
    let [studyProgramActiveForm, setstudyProgramActiveForm] = useState('mui_icon2Form');
    let [courseManagerActive, setCourseManagerActive] = useState('mui_icon3');
    let [courseManagerActiveForm, setCourseManagerActiveForm] = useState('mui_icon3Form');
    let [moreInfoActive, setMoreInfoActive] = useState('mui_icon4');
    let [moreInfoActiveForm, setMoreInfoActiveForm] = useState('mui_icon4Form');
 
    // Determine the state variable that sets the Specialization Field of the new course
    let [specializationField, setSpecializationField] = useState('tab');
    // Determine the state variables of the object that stores the graduate levels data
    let [graduateLevels, setGraduateLevels] = useState({levels:[], loading: false, code:false});
    // Determine the state variables that set the checkboxes checked or not depend on the user selection about the graduation level
    let [undergraduateChecked, setUndergraduateChecked] = useState(newCourseInfo ? newCourseInfo.StudyProgram.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') : false);
    let [postgraduateChecked, setPostgraduateChecked] = useState(newCourseInfo ? newCourseInfo.StudyProgram.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') : false);
    const [erasmusChecked, setErasmusChecked] = useState(newCourseInfo ? newCourseInfo.StudyProgram.course_label.includes('ERASMUS') : false);
    const [equalChecked, setEqualChecked] = useState(newCourseInfo ? newCourseInfo.StudyProgram.course_label.includes('ΙΣΟΤΙΜΙΑΣ') : false);
    // Determine the state variable that keeps the current selected by the user value of the graduate level
    let [gradLevel, setGradLevel] = useState( newCourseInfo ? newCourseInfo.StudyProgram.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') ? 'Προπτυχιακές    Σπουδές':
                                              newCourseInfo.StudyProgram.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') &&  !newCourseInfo.StudyProgram.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') ? 'Μεταπτυχιακές    Σπουδές':
                                             'Κατηγορία Σπουδών': 'Κατηγορία Σπουδών');
    // Determine the state variable for the postgraduate subject of studies
    let [postgraduateSubject, setPostgraduateSubject] = useState("-");
    // Determine the state variables of the object that will store the specialization fields data for the current selected graduate level
    let [field, setField] = useState({fields:[{fieldName:'', fieldCode:''}], loading: false});
    // Determine the state variable of the object that keeps the current selected by the user values of the specialization field name and field code
    let [specField, setSpecField] = useState({nameField:"", codeField:""}) 
    // Determine the state array that will store the course's codes of the same with the inserted course semester
    var [existingCodes, setExistingCodes] = useState([]);
  
    //                 *************  CREATION OF THE NEW COURSE OBJECT   ************* 
    // Initialization of the object that will store the input values of the new course information about the study program
    const studyProgramInfo_Default = {course_name: newCourseInfo ? newCourseInfo.StudyProgram.course_name : "", 
                                    course_code: newCourseInfo ? newCourseInfo.StudyProgram.course_code :"", 
                                    studyProgram_name:newCourseInfo ? newCourseInfo.StudyProgram.studyProgram_name :"ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ", 
                                    studyProgram_num: newCourseInfo ? newCourseInfo.StudyProgram.studyProgram_num : "128", 
                                    department_name: newCourseInfo ? newCourseInfo.StudyProgram.department_name :"ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ",
                                    department_code: newCourseInfo ? newCourseInfo.StudyProgram.department_code :"501", 
                                    period: newCourseInfo ? newCourseInfo.StudyProgram.period : "", 
                                    semester: newCourseInfo ? newCourseInfo.StudyProgram.semester :"", 
                                    course_type: newCourseInfo ? newCourseInfo.StudyProgram.course_type :"", 
                                    course_category: newCourseInfo ? newCourseInfo.StudyProgram.course_category :"-",
                                    study_part: newCourseInfo ? newCourseInfo.StudyProgram.study_part :"", 
                                    study_subpart: newCourseInfo ? newCourseInfo.StudyProgram.study_subpart :"-", 
                                    study_program: newCourseInfo ? newCourseInfo.StudyProgram.study_program :"", 
                                    specialization_field : newCourseInfo ? newCourseInfo.StudyProgram.specialization_field : "-",
                                    sub_study_program: newCourseInfo ? newCourseInfo.StudyProgram.sub_study_program :"-", 
                                    group: newCourseInfo ? newCourseInfo.StudyProgram.group :"", 
                                    study_units:newCourseInfo ? newCourseInfo.StudyProgram.study_units :"4", 
                                    ECTS: newCourseInfo ? newCourseInfo.StudyProgram.ECTS : "6", 
                                    study_hours: newCourseInfo ? newCourseInfo.StudyProgram.study_hours :"4",
                                    course_label: newCourseInfo ? newCourseInfo.StudyProgram.course_label :[], 
                                    prerequisites: newCourseInfo ? newCourseInfo.StudyProgram.prerequisites : []}
    let [studyProgramInfo, setStudyProgramInfo] = useState(studyProgramInfo_Default);
    // Creation of an array that contains the field names for the Course Information that concern the Study Program
    const studyProgramFields = ['CourseName', 'CourseCode', 'StudyProgramName', 'StudyProgramCode', 'DepartmentName', 'DepartmentCode', 'Period', 'Semester', 'CourseType',
                                'Category', 'StudyPart', 'StudySubPart', 'SpecializationField', 'PostGraduateSpecializationField' , 'SubStudyProgram', 'CourseGroup', 'StudyUnits', 'ECTS', 'StudyHours',
                                'CourseLabel', 'Prerequisites'];

    // COURSE DIRECTOR OBJECT : 
    const [COURSE_DIRECTOR, setCOURSEDIRECTOR] = useState({director_FirstName: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_FirstName : "", 
                                                           director_LastName: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_LastName : "", 
                                                           director_Email: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_Email :"", 
                                                           director_ProfessorType: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_DIRECTOR.director_ProfessorType :"-"});
    // COURSE INSTRUCTORS ARRAY OF OBJECTS :
   /* const [COURSE_INSTRUCTOR, setCOURSEINSTRUCTOR] = useState({instructor_FirstName: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS[0].instructor_FirstName :"", 
                                                               instructor_LastName: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS[0].instructor_LastName : "", 
                                                               instructor_Email: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS[0].instructor_Email : "", 
                                                               instructor_director_ProfessorType: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS[0].instructor_director_ProfessorType :"-"});*/
    const [COURSE_INSTRUCTOR, setCOURSEINSTRUCTOR] = useState(newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS : [])    
    // Initialization of the object that will store the input values of the new course information about the course management 
    let [courseManageInfo, setCourseManageInfo] = useState({COURSE_DIRECTOR:COURSE_DIRECTOR,COURSE_INSTRUCTORS: newCourseInfo ? newCourseInfo.CourseManagement.COURSE_INSTRUCTORS :
        [{instructor_FirstName:"", instructor_LastName:"", instructor_Email:"", instructor_director_ProfessorType:""}]});
    
    // Creation of an array that contains the field names for the new course's Manager Information 
    const managerFields = ['manager_FirstName', 'manager_LastName', 'manager_Email', 'manager_Type'];
    
    // Initialization of the object that will store the input values of the new course information that will be completed by the course's Instructor Professor
    // *This object be used only for the correct insertion of the course
    //const SUGGESTED_WRITINGS_type = {writing_name: "", writing_eudoxus: "", writing_link:""}; 
    const fromInstructorInfo = {INITIAL_INFO : {skills : [""], student_responsibilities : [""]}, MAIN_DESCRIPTION : {targets : "", learning_outcomes: "", 
                                                                  student_evaluation : "", class_material:""}, RECOMMENDED_COURSES: [], SUGGESTED_WRITINGS: [], course_site:"",
                                                                  theory_hours : "", lab_hours : "", tutoring_hours : "", bibliography : [], typeOfExam : []};
                                                           
    // Initialization of the object that will store the input values of the new course more information      
    let [moreInfo, setMoreInfo] = useState({students_curr_attendance_num: newCourseInfo ? newCourseInfo.More.students_curr_attendance_num : '0'.toString(), 
                                            course_active: newCourseInfo ? newCourseInfo.More.course_active : false});
                                         
    // Call the suitable query to take the graduate levels and study subjects
    useEffect(() => {  
        // Call the QUERY resolver
        SpecializationResolvers.get_graduate_and_subject_levels()
            .then(result => {                
                setGraduateLevels({loading:true, 
                                   levels:result?.data?.getGraduateAndSubjectLevels?.data, 
                                   code:result?.data?.getGraduateAndSubjectLevels?.code});  
            })
            .catch((error)=> {
                setGraduateLevels(graduateLevels=> ({...graduateLevels, loading:false}));
            })  
    }, [])    
    
    useEffect (() => {
        if (studyProgramInfo.course_type !== '') {
            handleClickInput(studyProgramInfo.course_type, 'CourseType')
        }
    }, [studyProgramInfo.course_type])

    useEffect (() => {
        if (studyProgramInfo.semester !== '') {
            handleClickInput(studyProgramInfo.semester, 'Semester')
        }
    }, [studyProgramInfo.semester])

    useEffect (() => {
        if (studyProgramInfo.group !== '') {
            handleClickInput(studyProgramInfo.group, 'CourseGroup');
        }
    }, [studyProgramInfo.group])

     useEffect (() => {
        if (COURSE_DIRECTOR.director_ProfessorType !== "-") {
            handleClickInput(COURSE_DIRECTOR.director_ProfessorType, 'manager_Type');
        }
    }, [COURSE_DIRECTOR.director_ProfessorType])
        
    useEffect(() => {       
        if (studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') && !studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ')) {
            setGradLevel('Προπτυχιακές    Σπουδές')
            setPostgraduateSubject(postgraduateSubject =>('-'))    
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(true);
            setOpacity('0.4')       
        }
        else if (studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') && !studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ')) {
            setGradLevel('Μεταπτυχιακές   Σπουδές'); 
            setPostgraduateSubject(postgraduateSubject => (postgraduateSubject))
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(false);
            setOpacity('1') 
        }
    }, [studyProgramInfo.course_label])

    // Call the suitable query to take the specific specialization fields of the selected by the user graduate level of studies  
    useEffect(() => { 
         // According the selection of the user set the graduate level code
        let graduateCode = '';
        if (gradLevel === 'Προπτυχιακές    Σπουδές') {
            graduateCode = 'ΠΠΣ';        
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(true); 
            setOpacity('0.4')  
        }
        else if (gradLevel === 'Μεταπτυχιακές   Σπουδές') {
            graduateCode = 'ΠΜΣ'; 
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(false); 
            setOpacity('1')  
        }
        else if (gradLevel === 'Κατηγορία Σπουδών') {
            graduateCode = 'ΠΠΣ';
            setPostgraduateSubject('-')
        }    
         SpecializationResolvers.get_fieldNames_And_fieldCodes_of_StudyCategory(graduateCode, postgraduateSubject)
         .then(result => {
             setField({loading:true, fields:result?.data?.getSpecializationFieldsOfStudyCategory})
         })
         .catch(error => {
             setField(field => ({...field, loading:false}));
         })          
         
    },[gradLevel, postgraduateSubject])
    
    // Function that helps us to determine the suitable code of the current selected specialization field based on its name
    const findCodeField = (specFieldName) => {
        let code = specField.codeField;
        field.fields.forEach((item) => {
            if (item.fieldName === specFieldName) {
                code = item.fieldCode;
            }
        })    
        return code;
    }

    // Function that handles the checkboxes of graduate level
    const manageCourseLabelArray = (value) => {         
        // Unchecked
        if (studyProgramInfo.course_label.includes(value)) { 
            let removeArray = [...studyProgramInfo.course_label];
            removeArray = removeArray.filter(item => item !== value) 
            setStudyProgramInfo({...studyProgramInfo, course_label:removeArray});
            if (value === 'ΠΡΟΠΤΥΧΙΑΚΟ') { setUndergraduateChecked(false); } else if (value === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') { setPostgraduateChecked(false);} else if (value === 'ERASMUS') {setErasmusChecked(false);} else if (value === 'ΙΣΟΤΙΜΙΑΣ') {setEqualChecked(false);}
        }
        // Checked
        else { 
            setStudyProgramInfo({...studyProgramInfo, course_label:[...studyProgramInfo.course_label, value]});   
            if (value === 'ΠΡΟΠΤΥΧΙΑΚΟ') { setUndergraduateChecked(true); } else if (value === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') { setPostgraduateChecked(true);} else if (value === 'ERASMUS') {setErasmusChecked(true)} else if (value === 'ΙΣΟΤΙΜΙΑΣ') {setEqualChecked(true)}
        }
        // Make style changes  
        if (document.getElementById('CourseLabel')) {
            document.getElementById('CourseLabel').getElementsByClassName('error')[0].style.display = 'none'; 
            document.getElementById('CourseLabel').getElementsByClassName('errorCatLab')[0].style.display = 'none';  
        }
        if (document.getElementById('CourseType')) {
            document.getElementById('CourseType').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
        }
        if (document.getElementById('Category')) {
            document.getElementById('Category').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
            document.getElementById('Category').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
        }
    }

     // Function that manages the opening or closing of the input forms cards
    const collapseCard = (cardName) => {
        if (document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display === 'flex') {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display ='none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'flex';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display ='none';
        }
        else {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display = 'flex';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display = 'flex';
        }
    }

    const unCollapsedCard = (cardName) => {
        if (document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display === 'none') {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display = 'flex';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display = 'flex';
        }
    }

    // Function that it been called initially when the user must select the studies' level and the 
    // specialization field
    const setFormState = () => {
        if (isDisabled ) {
            setIsDisabled(false);    // open the input items of the forms
            if (gradLevel === 'Προπτυχιακές    Σπουδές') {
                setIsDisabledPostGrad(true);
                setOpacity('0.4')
                setIsDisabledUnderGrad(true);
            }
            else if (gradLevel === 'Μεταπτυχιακές   Σπουδές') {
                setIsDisabledPostGrad(true);
                setOpacity('1')
                setIsDisabledUnderGrad(false);
            }
        }
        document.getElementById('BASIC_INFO').getElementsByClassName('lock')[0].style.display = 'none';
        document.getElementById('BASIC_INFO').getElementsByClassName('lockOpen')[0].style.display = 'flex';
        document.getElementById('STUDY_PROGRAM').getElementsByClassName('lock')[0].style.display = 'none';
        document.getElementById('STUDY_PROGRAM').getElementsByClassName('lockOpen')[0].style.display = 'flex';
        document.getElementById('COURSE_MANAGEMENT').getElementsByClassName('lock')[0].style.display = 'none';
        document.getElementById('COURSE_MANAGEMENT').getElementsByClassName('lockOpen')[0].style.display = 'flex';
        document.getElementById('MORE_INFO').getElementsByClassName('lock')[0].style.display = 'none';
        document.getElementById('MORE_INFO').getElementsByClassName('lockOpen')[0].style.display = 'flex';
    }
 
    const handleClickInputInstructor = (input, index, field) => {
        var element = '';

        if (field === 'instructor_FirstName') {
            element = 'instructor_FirstName'+index
        }
        else if (field === 'instructor_LastName') {
            element = 'instructor_LastName'+index
        }
        else if (field === 'instructor_Email') {
            element = 'instructor_EmailId'+index
        }
        else if (field === 'instructor_director_ProfessorType') {
            element = 'instructor_TypeId'+index 
        }

         // if the input isn't empty 
         if (input.trim().length !== 0) {  
            if (document.getElementById(element)) {
                document.getElementById(element).getElementsByClassName('labeline')[0].style.color = '#56b3ca';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontWeight = '550';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.height = '27px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.lineHeight = '27px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.zIndex = '2222';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.padding = '0 5px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.transform = 'translate(4px , -14px) scale(0.88)';            
                document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor= 'white';                 
                document.getElementById(element).getElementsByClassName('form_control')[0].style.border = '0.1px solid #5ac0d9';
                document.getElementById(element).getElementsByClassName('form_control')[0].style.outline = '2px solid hsla(184, 56%, 68%, 0.369)' 
                document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor = 'hsla(0, 0%, 97%, 0.97)'     
              
            }         
        }
         // if the input is empty 
         else {                
            if (document.getElementById(element)) {          
                document.getElementById(element).getElementsByClassName('labeline')[0].style.color = '#b7b5b5';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontSize = '16px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontWeight = '500';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor= 'transparent';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.height = '10px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.lineHeight = '1.2';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.zIndex = '2222';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.padding = '4.2px 12px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.transform = 'translate(2px , 5.5px) scale(1)';  
                document.getElementById(element).getElementsByClassName('form_control')[0].style.border = '1px solid #ced4da';
                document.getElementById(element).getElementsByClassName('form_control')[0].style.outline = '0px solid gray'   
            }
        }
    }

    // Handling the click of an input field to set the suitable style 
    const handleClickInput = (input, element) => {    
        // if the input isn't empty 
        if (input.trim().length !== 0) { 
            if (document.getElementById(element)) {
                document.getElementById(element).getElementsByClassName('labeline')[0].style.color = '#56b3ca';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontWeight = '550';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.height = '27px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.lineHeight = '27px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.zIndex = '2222';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.padding = '0 5px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.transform = 'translate(4px , -14px) scale(0.88)';            
                document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor= 'white'; 
                if (element === 'SpecializationField' || element === 'Semester' || element === 'Period' || element === 'CourseType' || element === 'StudyPart' || element === 'Category' || element === 'CourseGroup' || element === 'manager_Type' || element === 'instructor_Type' || element === 'PostGraduateSpecializationField' ) {
                    document.getElementById(element).getElementsByClassName('form_control')[0].style.border = '0.1px solid #5ac0d9';
                    document.getElementById(element).getElementsByClassName('form_control')[0].style.outline = '2px solid hsla(184, 56%, 68%, 0.369)'
                }
                if (element === 'manager_FirstName' || element === 'manager_LastName' || element === 'manager_Email' || element === 'manager_Type' || element === 'instructor_Type' || element === 'instructor_FirstName' || element === 'instructor_LastName' || element === 'instructor_Email' || element === 'instructor_Type' ) {
                    document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor = 'hsla(0, 0%, 97%, 0.97)'
                }   
            }         
        }
        // if the input is empty 
        else {  
            if (document.getElementById(element)) {
                document.getElementById(element).getElementsByClassName('labeline')[0].style.color = '#b7b5b5';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontSize = '16px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.fontWeight = '500';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.backgroundColor= 'transparent';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.height = '10px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.lineHeight = '1.2';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.zIndex = '2222';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.padding = '4.2px 12px';
                document.getElementById(element).getElementsByClassName('labeline')[0].style.transform = 'translate(2px , 5.5px) scale(1)';    
            }
        }
    } 
 

    useEffect (() => {
        
        if (gradLevel === 'Προπτυχιακές    Σπουδές'|| ( studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') && !studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ'))) {
            setSemesterOptions('ΠΡΟΠΤΥΧΙΑΚΟ'); 
        }
        else if (gradLevel === 'Μεταπτυχιακές   Σπουδές'|| ( studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') && !studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ')) ) {
            setSemesterOptions('ΜΕΤΑΠΤΥΧΙΑΚΟ');            
        }    
    }, [gradLevel, studyProgramInfo.course_label])
    
    useEffect (()=> {
        handleClickInput(studyProgramInfo.study_program, 'SpecializationField');
        if (document.getElementById('SpecializationField')) {
            document.getElementById('SpecializationField').getElementsByClassName('error')[0].style.display = 'none';
        }
    }, [studyProgramInfo.study_program])

    useEffect (() => {    
        // Call the appropriate query to determine all the courses of the previous semesters that can be this course's prerequisites
        // 'NOTE' : Prerequisites can have only the undergraduate courses         
        SpecializationResolvers.find_courses_codes_by_previous_semesters(studyProgramInfo.semester)             
            .then(result => { 
                let insideArray = [];
                console.log(result)
                result?.data?.findPreviousSemestersCourses.forEach(item=> {     
                    insideArray.push({value: item.code, label: item.code +"   " + item.name})               
                    //setPrerequisitesOptions(prerequisitesOptions => [...prerequisitesOptions, {value: item.code, label: item.code +"   " + item.name}])
                })
                setPrerequisitesOptions(insideArray)
            })
            .catch(err => {
                console.log(err)
            })

        // Set the study period (Winter or Spring) according to the semester value    
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester % 2 === 0  && studyProgramInfo.semester <= 6) {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Εαρινή', study_part:'ΚΟΡΜΟΣ'}))
            handleClickInput('Εαρινή', 'Period');
            handleClickInput('ΚΟΡΜΟΣ', 'StudyPart');
            setCurrYearSemester('Εαρινό');
        }
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester % 2 === 0  && studyProgramInfo.semester > 6) {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Εαρινή', study_part:'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}))
            handleClickInput('Εαρινή', 'Period');
            handleClickInput('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', 'StudyPart');
            setCurrYearSemester('Εαρινό');
        }
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester % 2 !== 0 && studyProgramInfo.semester <= 6)  {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Χειμερινή', study_part:'ΚΟΡΜΟΣ'}))
            handleClickInput('Χειμερινή', 'Period');
            handleClickInput('ΚΟΡΜΟΣ', 'StudyPart');
            setCurrYearSemester('Χειμερινό');
        } 
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester % 2 !== 0 && studyProgramInfo.semester > 6)  {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Χειμερινή', study_part:'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}))
            handleClickInput('Χειμερινή', 'Period');
            handleClickInput('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', 'StudyPart');
            setCurrYearSemester('Χειμερινό');
        }       
        /*                       ~~~~  ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ  ~~~~                           */
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester === 'Χειμερινό')  {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Χειμερινή', study_part:'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', group:'-'}))
            handleClickInput('Χειμερινή', 'Period');
            handleClickInput('-', 'StudyPart');
            handleClickInput('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', 'CourseGroup');
            setCurrYearSemester('Χειμερινό');
        }
        if ( studyProgramInfo.semester !== "" &&  studyProgramInfo.semester === 'Εαρινό')  {
            setStudyProgramInfo(studyProgramInfo => ({...studyProgramInfo, period:'Εαρινή', study_part:'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', group:'-'}))
            handleClickInput('Εαρινή', 'Period');
            handleClickInput('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', 'StudyPart');
            handleClickInput('-', 'CourseGroup');
            setCurrYearSemester('Εαρινό');
        }

        // Call the suitable query that will help us to format the new course code 
        // With this query, we take all the already inserted courses codes for the current semester,
        // the last two digits of the course code will be formatted according to the existing codes
        SpecializationResolvers.find_courses_codes_by_semester(studyProgramInfo.semester)
                                .then(result => {                                      
                                    setExistingCodes(result?.data?.findbySemesterAllCoursesCodes);   
                                })
                                .catch(err=> {
                                    console.log(err);
                                }) 

    }, [studyProgramInfo.semester])

    useEffect(() => { 
        if (studyProgramInfo.course_type === 'Υποχρεωτικό') {
            setStudyProgramInfo(studyProgramInfo=> ({...studyProgramInfo, course_category:'ΥΠΟΧΡΕΩΤΙΚΟ'}));
            handleClickInput('ΥΠΟΧΡΕΩΤΙΚΟ', 'Category');
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        else if (studyProgramInfo.course_type === 'Επιλογής') { 
            if (studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ')) {
                setStudyProgramInfo(studyProgramInfo=> ({...studyProgramInfo, course_category:'ΕΠΙΛΟΓΗΣ ΜΔΕ'}));
                handleClickInput('ΕΠΙΛΟΓΗΣ ΜΔΕ', 'Category');
            }
            else {
                setStudyProgramInfo(studyProgramInfo=> ({...studyProgramInfo, course_category:'ΕΠΙΛΟΓΗΣ ΠΔΕ'}));
                handleClickInput('ΕΠΙΛΟΓΗΣ ΠΔΕ', 'Category');
            }
        }
    }, [studyProgramInfo.course_type, studyProgramInfo.course_label])
    
    // Before continue with the final insertion of the new course in the database check for the validity of their fields
    const validateCourseInputs = () => { 
        let isValid = true;

        if (props.currPopUpWindow === undefined || (props.currPopUpWindow !== undefined && currPopUpWindow === 'BasicInfo_form')) {
        // CHECK THE VALIDITY OF THE COURSE INFORMATION THAT CONCERNS THE STUDY PROGRAM
        Object.values(studyProgramInfo).forEach((item, index) => {
            //  Take the error fields  
            let errorField = false;
            if (index !== 1)  {
                if (document.getElementById(studyProgramFields[index])) {
                    errorField = document.getElementById(studyProgramFields[index]).getElementsByClassName('error');   
                }
            }
            // Index 19 corresponds to the array of prerequisites that can be empty
            if (index !== 19) {
                // Check for the obligatory fields and print the error messages
                if (item === "" || item.length === 0 ) {
                    // The fields are obligatory
                    if (errorField && errorField[0] !== undefined) {
                        errorField[0].style.display = 'flex';
                        isValid = false;
                    }                            
                }
            }                        
        })
    }

    // CHECK FOR THE COURSE' S NAME VALIDATION
    if (studyProgramInfo.course_name !== '' && checkCourseNameValidation(studyProgramInfo.course_name)) {
        document.getElementById('CourseCode').getElementsByClassName('error')[0].style.display = 'none';
        isValid = false;
    }

    // In the case of a postgraduate course check the validity of course code !
    if ((props.currPopUpWindow === undefined && semesterOptions === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') || (props.currPopUpWindow !== undefined && currPopUpWindow === 'BasicInfo_form' && studyProgramInfo.specialization_field !== '-')) {
        let onlyDigits = true;
        if (studyProgramInfo.course_code !== "") {
                // A . CHECK FOR A DUPLICATE COURSE CODE (using the corressponding function)
            if (checkCourseCodeValidation(studyProgramInfo.course_code)) {                
                if (document.getElementById('CourseCode').getElementsByClassName('errorValid')) {                     
                    document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'none';
                }
                isValid = false;
            }
            
            else if (document.getElementById('CourseCode').getElementsByClassName('errorDuplicate')) {
                if (document.getElementById('CourseCode').getElementsByClassName('errorDuplicate')[0].style.display === 'none') {
                    // B. CHECK FOR A VALID COURSE CODE
                    if ((!studyProgramInfo.course_code.startsWith('ΜΔΕ') && !studyProgramInfo.course_code.startsWith('ΜΕΠΑ') && !studyProgramInfo.course_code.startsWith('ECE') ) || (studyProgramInfo.course_code.startsWith('ECE') && studyProgramInfo.course_code.length !== 7)) {
                        document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                        isValid = false;
                    }
                    else if (studyProgramInfo.course_code.startsWith('ΜΔΕ') && studyProgramInfo.course_code.length !== 6) {
                        document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                        isValid = false;
                    }
                    else if (studyProgramInfo.course_code.startsWith('ΜΕΠΑ') && studyProgramInfo.course_code.length !== 6) {
                        document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                        isValid = false;
                    }
                    else if (studyProgramInfo.course_code.startsWith('ΜΔΕ') && studyProgramInfo.course_code.length === 6) {
                        let checkStr = studyProgramInfo.course_code.substring(3,6); 
                        checkStr.split("").forEach((value) => { 
                            if (!value.match(/\d/)) {
                                onlyDigits = false;
                            }
                        })
                        if (onlyDigits === false) {
                            document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                            isValid = false;
                        }
                    }
                    else if (studyProgramInfo.course_code.startsWith('ΜΕΠΑ') && studyProgramInfo.course_code.length === 6) {
                        let checkStr = studyProgramInfo.course_code.substring(4,6); 
                        checkStr.split("").forEach((value) => { 
                            if (!value.match(/\d/)) {
                                onlyDigits = false;
                            }
                        })
                        if (onlyDigits === false) {
                            document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                            isValid = false;
                        }
                    }
                }
                else if (studyProgramInfo.course_code.startsWith('ECE') && studyProgramInfo.course_code.length === 7) {
                    let checkStr = studyProgramInfo.course_code.substring(3,7); 
                    checkStr.split("").forEach((value) => { 
                        if (!value.match(/\d/)) {
                            onlyDigits = false;
                        }
                    })
                    if (onlyDigits === false) {
                        document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'flex';
                        isValid = false;
                    }
                }
            }
        }
        else {
            document.getElementById('CourseCode').getElementsByClassName('error')[0].style.display = 'flex';
            isValid = false;
        }
        
    }


     
    if (props.currPopUpWindow === undefined || (props.currPopUpWindow !== undefined && currPopUpWindow === 'CourseManagementInfo_form')) {        
            // CHECK THE VALIDITY OF THE COURSE'S MANAGER INFORMATION 
            Object.values(COURSE_DIRECTOR).forEach((item, index) => { 
                //  Take the error fields                 
                let errorField = false;
                if (index !== 3)  {
                    errorField = document.getElementById(managerFields[index]).getElementsByClassName('error');   
                } 
                // Index 3 corresponds to the professor type of the manager professor that isn't mandatory
                if (index !== 3) {
                    // Check for the obligatory fields and print the error messages
                    if (item === "") {
                        // The fields are obligatory
                        if (errorField && errorField[0] !== undefined) {
                            errorField[0].style.display = 'flex';
                            isValid = false;
                        }                            
                    }
                }                         
            })
 
            let errorValidManager = document.getElementById('manager_Email').getElementsByClassName('errorValid')[0];
            // VALIDATION OF THE INPUT EMAIL OF COURSE'S MANAGER
            if (COURSE_DIRECTOR.director_Email !== "" && !COURSE_DIRECTOR.director_Email.endsWith('@uth.gr')) {
                if (!COURSE_DIRECTOR.director_Email.endsWith('@e-ce.uth.gr') && !COURSE_DIRECTOR.director_Email.endsWith('@sch.gr')) {
                    if (errorValidManager) {
                        errorValidManager.style.display = 'flex';
                        isValid = false;
                    }
                }
            } 

            // VALIDATION OF THE INPUT EMAIL OF COURSE'S INSTRUCTORS
            courseManageInfo.COURSE_INSTRUCTORS.forEach((instructor, index) => {
                if (instructor.instructor_Email !== "" && !instructor.instructor_Email.endsWith('@uth.gr')) {
                    if (!instructor.instructor_Email.endsWith('@e-ce.uth.gr') && !instructor.instructor_Email.endsWith('@sch.gr')) {
                        if (document.getElementById('instructor_EmailId'+index).getElementsByClassName('errorValid')[0]) {
                            document.getElementById('instructor_EmailId'+index).getElementsByClassName('errorValid')[0].style.display = 'flex';
                            isValid = false;
                        }
                    }
                }
            } ) 

            // VALIDATION FOR DUPLICATES EMAILS IN INSTRUCTORS' ARRAY
            let duplicateIds = courseManageInfo.COURSE_INSTRUCTORS
                                .map(e => e['instructor_Email'])
                                .map((e, i, final) => final.indexOf(e) !== i && i)
                                .filter(obj=> courseManageInfo.COURSE_INSTRUCTORS[obj])
                                .map(e => courseManageInfo.COURSE_INSTRUCTORS[e]["instructor_Email"]) 
            if (duplicateIds.length > 0 ) { 
                courseManageInfo.COURSE_INSTRUCTORS.forEach((item,index) => {
                    if (duplicateIds.includes(item.instructor_Email)) {                        
                        document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'flex'
                    }
                    else {
                        document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'none'
                    }
                })                
            }
            else if (duplicateIds.length === 0) {
                courseManageInfo.COURSE_INSTRUCTORS.forEach((item,index) => {
                    document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'none'
                })
            }        
    }

    if (props.currPopUpWindow === undefined || (props.currPopUpWindow !== undefined && currPopUpWindow === 'BasicInfo_form')) {
    
        // CHECK SEMESTER - PERIOD - STUDY PART
        // Take the Error Field for Semester - Period
        let errorSemPeriod1 = document.getElementById('Semester').getElementsByClassName('errorSemPer')[0];
        let errorSemPeriod2 = document.getElementById('Period').getElementsByClassName('errorSemPer')[0];
        // Take the Error Field for Semester - Period - Study Part
        let errorThree1 = document.getElementById('Semester').getElementsByClassName('errorThree')[0];
        let errorThree2 = document.getElementById('Period').getElementsByClassName('errorThree')[0]; 
        let errorThree3 = document.getElementById('StudyPart').getElementsByClassName('errorThree')[0];    
         // Take the Error Field for Semester - Study Part
         let errorSemStudy1 = document.getElementById('Semester').getElementsByClassName('errorSemStudy')[0];
         let errorSemStudy2 = document.getElementById('StudyPart').getElementsByClassName('errorSemStudy')[0];   

        if (studyProgramInfo.semester !== "" && studyProgramInfo.period !== "" && studyProgramInfo.study_part !== "") {
            /*                       ~~~~  ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ  ~~~~                           */
            if (gradLevel === 'Προπτυχιακές    Σπουδές') {
                if (studyProgramInfo.semester % 2 === 0 && studyProgramInfo.period !== 'Εαρινή') {
                    if (studyProgramInfo.semester <= 6 && studyProgramInfo.study_part !== 'ΚΟΡΜΟΣ') {
                        if (errorThree1 && errorThree2 && errorThree3 ) {
                            errorThree1.style.display = 'flex';  
                            errorThree2.style.display = 'flex';  
                            errorThree3.style.display = 'flex';         
                            isValid = false;           
                        }
                    }
                    else if (studyProgramInfo.semester > 6 && studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {
                        if (errorThree1 && errorThree2 && errorThree3) {
                            errorThree1.style.display = 'flex';  
                            errorThree2.style.display = 'flex';  
                            errorThree3.style.display = 'flex';         
                            isValid = false;           
                        }
                    }
                    else {
                        if (errorSemPeriod1 && errorSemPeriod2) { 
                            errorSemPeriod1.style.display = 'flex';  
                            errorSemPeriod2.style.display = 'flex';     
                            isValid = false;           
                        }
                    }
                }

                if (studyProgramInfo.semester % 2 !== 0 && studyProgramInfo.period !== 'Χειμερινή') {
                    if (studyProgramInfo.semester <= 6 && studyProgramInfo.study_part !== 'ΚΟΡΜΟΣ') {
                        if (errorThree1 && errorThree2 && errorThree3) {
                            errorThree1.style.display = 'flex';  
                            errorThree2.style.display = 'flex';  
                            errorThree3.style.display = 'flex';         
                            isValid = false;           
                        }
                    }
                    else if (studyProgramInfo.semester > 6 && studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {
                        if (errorThree1 && errorThree2 && errorThree3) {
                            errorThree1.style.display = 'flex';  
                            errorThree2.style.display = 'flex';  
                            errorThree3.style.display = 'flex';         
                            isValid = false;           
                        }
                    }
                    else {
                        if (errorSemPeriod1 && errorSemPeriod2) {
                            errorSemPeriod1.style.display = 'flex';  
                            errorSemPeriod2.style.display = 'flex';     
                            isValid = false;           
                        }
                    }
                }

                if (studyProgramInfo.semester % 2 === 0 && studyProgramInfo.period === 'Εαρινή') {
                    if (studyProgramInfo.semester <= 6 && studyProgramInfo.study_part !== 'ΚΟΡΜΟΣ') {
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';       
                            isValid = false;           
                        }
                    }
                    else if (studyProgramInfo.semester > 6 && studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';       
                            isValid = false;           
                        }
                    }
                }

                if (studyProgramInfo.semester % 2 !== 0 && studyProgramInfo.period === 'Χειμερινή') {    
                    if (studyProgramInfo.semester <= 6 && studyProgramInfo.study_part !== 'ΚΟΡΜΟΣ') {
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';     
                            isValid = false;           
                        }
                    }
                    else if (studyProgramInfo.semester > 6 && studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {   
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';       
                            isValid = false;           
                        }
                    }
                }
            } 

            /*                               ~~~~  ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ  ~~~~                           */ 
            if (gradLevel === 'Μεταπτυχιακές   Σπουδές') {  
                if (studyProgramInfo.semester.includes('Χειμερινό') && studyProgramInfo.period !== 'Χειμερινή') {  
                        
                    if (errorSemPeriod1 && errorSemPeriod2) {
                        errorSemPeriod1.style.display = 'flex';  
                        errorSemPeriod2.style.display = 'flex';     
                        isValid = false;         
                    }
                }

                if (studyProgramInfo.semester.includes('Χειμερινό') && studyProgramInfo.period === 'Χειμερινή') {     
                    if (studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {               
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';     
                            isValid = false;           
                        }
                    }
                }

                if (studyProgramInfo.semester.includes('Εαρινό') && studyProgramInfo.period !== 'Εαρινή') { 
                    if (errorSemPeriod1 && errorSemPeriod2) {
                        errorSemPeriod1.style.display = 'flex';  
                        errorSemPeriod2.style.display = 'flex';     
                        isValid = false;           
                    }
                }

                if (studyProgramInfo.semester.includes('Εαρινό') && studyProgramInfo.period === 'Εαρινή') {
                    if (studyProgramInfo.study_part !== 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ') {               
                        if (errorSemStudy1 && errorSemStudy2) {
                            errorSemStudy1.style.display = 'flex';  
                            errorSemStudy2.style.display = 'flex';     
                            isValid = false;           
                        }
                    }
                }
            }            
        }
    }


    if (props.currPopUpWindow === undefined) {
        // CHECK COURSE TYPE - COURSE CATEGORY - COURSE LABEL
        // Take the Error Field for Course Type - Course Category
        let errorTypeCategory1 = document.getElementById('CourseType').getElementsByClassName('errorTypCat');
        let errorTypeCategory2 = document.getElementById('Category').getElementsByClassName('errorTypCat');
        // Take the Error Field for Semester - Period - Study Part
        let errorCatLab1 = document.getElementById('Category').getElementsByClassName('errorCatLab');
        let errorCatLab2 = document.getElementById('CourseLabel').getElementsByClassName('errorCatLab');  

        if (studyProgramInfo.course_type !== "" && studyProgramInfo.course_category !== "" && studyProgramInfo.course_label.length !== 0) {
            if (studyProgramInfo.course_type === 'Υποχρεωτικό' && studyProgramInfo.course_category !== 'ΥΠΟΧΡΕΩΤΙΚΟ') {
                if (errorTypeCategory1 && errorTypeCategory2) {
                    errorTypeCategory1[0].style.display = 'flex';
                    errorTypeCategory2[0].style.display = 'flex';
                    isValid = 'false';
                }            
            } 
            else if (studyProgramInfo.course_type === 'Επιλογής' && studyProgramInfo.course_category !== 'ΥΠΟΧΡΕΩΤΙΚΟ') {
                if (studyProgramInfo.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ' && !studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ')) {
                    if (errorCatLab1 && errorCatLab2) {
                        errorCatLab1[0].style.display = 'flex';
                        errorCatLab2[0].style.display = 'flex';
                        isValid = 'false';
                    }
                } 
                else if (studyProgramInfo.course_category === 'ΕΠΙΛΟΓΗΣ ΠΔΕ' && !studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ')) {
                    if (errorCatLab1 && errorCatLab2) {
                        errorCatLab1[0].style.display = 'flex';
                        errorCatLab2[0].style.display = 'flex';
                        isValid = 'false';
                    }
                }                 
            }
            else if (studyProgramInfo.course_type === 'Επιλογής' && studyProgramInfo.course_category === 'ΥΠΟΧΡΕΩΤΙΚΟ') {
                if (errorTypeCategory1 && errorTypeCategory2) {
                    errorTypeCategory1[0].style.display = 'flex';
                    errorTypeCategory2[0].style.display = 'flex';
                    isValid = 'false';
                }                  
            }
        }  
    }
        return(isValid);   
    }

    // Function that it appears the notification window afte the control of unvalid input data 
    const notify = () => {
        toast.error('Τα στοιχεία εισαγωγής δεν είναι έγκυρα!', {
            position: "top-right",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "colored",
            });
    }
    
    // Fill the object that stores the data for the course director every time these fields change
    useEffect(()=> {
        setCourseManageInfo(courseManageInfo=>({...courseManageInfo, COURSE_DIRECTOR:COURSE_DIRECTOR}))
    }, [COURSE_DIRECTOR])
 
    // Function that handles the input instructors into the corressponding array
    const handleChangeInstructorForm = (index, field, value) => {
        // Determine the length of the courses' instructors array
        const instrLength = courseManageInfo.COURSE_INSTRUCTORS.length; 
        if (index <= instrLength-1) { 
            if (field === 'instructor_FirstName') { 
                let arr = [...courseManageInfo.COURSE_INSTRUCTORS];
                arr[index].instructor_FirstName = value;
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:arr}) 
            }
            else if (field === 'instructor_LastName') {
                let arr = [...courseManageInfo.COURSE_INSTRUCTORS];
                arr[index].instructor_LastName = value;
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:arr}) 
            }
            else if (field === 'instructor_Email') {
                let arr = [...courseManageInfo.COURSE_INSTRUCTORS];
                arr[index].instructor_Email = value;
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:arr}) 
                let duplicateIds = courseManageInfo.COURSE_INSTRUCTORS
                .map(e => e['instructor_Email'])
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj=> courseManageInfo.COURSE_INSTRUCTORS[obj])
                .map(e => courseManageInfo.COURSE_INSTRUCTORS[e]["instructor_Email"])
                if (duplicateIds.length > 0 ) { 
                    document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'flex'
                }
                else if (duplicateIds.length === 0) {
                    document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'none'
                }                
  
            }
            else if (field === 'instructor_director_ProfessorType') {
                let arr = [...courseManageInfo.COURSE_INSTRUCTORS];
                arr[index].instructor_director_ProfessorType = value;
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:arr}) 
            }
        }
        else { 
            if (field === 'instructor_FirstName') {
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:[...courseManageInfo.COURSE_INSTRUCTORS, {instructor_FirstName:value, instructor_LastName:"", instructor_Email:"", instructor_director_ProfessorType:""}]})
            }
            else if (field === 'instructor_LastName') {
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:[...courseManageInfo.COURSE_INSTRUCTORS, {instructor_FirstName:"", instructor_LastName: value, instructor_Email:"", instructor_director_ProfessorType:""}]})
            }
            else if (field === 'instructor_Email') {
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:[...courseManageInfo.COURSE_INSTRUCTORS, {instructor_FirstName:"", instructor_LastName:"", instructor_Email:value, instructor_director_ProfessorType:""}]})
                courseManageInfo.COURSE_INSTRUCTORS.forEach((item)=> {
                    if (item.instructor_Email === value) {
                        document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'flex'
                    }
                    else { 
                        document.getElementById('instructor_EmailId' + index).getElementsByClassName('error')[0].style.display = 'none'
                    }
                })
            }
            else if (field === 'instructor_director_ProfessorType') {
                setCourseManageInfo({...courseManageInfo, COURSE_INSTRUCTORS:[...courseManageInfo.COURSE_INSTRUCTORS, {instructor_FirstName:"", instructor_LastName:"", instructor_Email:"", instructor_director_ProfessorType:value}]})
            }
        }
    }

    // Function that help us the management of course's instructor data when we have a pop up window
    const instructorManage = (index, newValue, field) => {
        if (field === 'instructor_FirstName') { 
            let arr = [...COURSE_INSTRUCTOR];
            arr[index].instructor_FirstName = newValue;
            setCOURSEINSTRUCTOR(arr);
        }
        if (field === 'instructor_LastName') { 
            let arr = [...COURSE_INSTRUCTOR];
            arr[index].instructor_LastName = newValue;
            setCOURSEINSTRUCTOR(arr);
        }
        if (field === 'instructor_Email') { 
            let arr = [...COURSE_INSTRUCTOR];
            arr[index].instructor_Email = newValue;
            setCOURSEINSTRUCTOR(arr);
        }
        if (field === 'instructor_director_ProfessorType') { 
            let arr = [...COURSE_INSTRUCTOR];
            arr[index].instructor_director_ProfessorType = newValue;
            setCOURSEINSTRUCTOR(arr);
        }
    }
  
    // Function that uses the user input values of this form about the new course and prepares the new course's insertion
    const prepareCousreInsertion = () => {
        // studyProgramInfo.course_code = 'ECE457';        
        let isValidForm = false;
        // Call the suitable function that executes the control of the form's input values, the return value of this function will 
        // determine if we will continue the course insertion process
        isValidForm = validateCourseInputs();

        // If the input data are invalid, inform the user with the appearance of the corressponding notification window 
        if (isValidForm === false) {
            notify()  
        }        
        // After the validation of the input values, collect the data into the suitable objects,
        // create the COURSE CODE and continue with the implementation of the query 
        if (isValidForm === true) {          
            // Create the course document to be inserted
            let courseInputDocument = {StudyProgram : studyProgramInfo, CourseManagement : courseManageInfo, InfoFromInstructor : fromInstructorInfo, More: moreInfo};
                                                                      
            // *** Creating a VALIDATE new course's code (if it is undergraduate subject) 
            
            if (gradLevel === 'Προπτυχιακές    Σπουδές') {
                // A. Determine the course's code prefix
                const codePrefix = "ECE";
                // B. Determine the suitable study year that the current course should be studied
                let codeYear = 0;
                if (studyProgramInfo.semester === '1' || studyProgramInfo.semester === '2') {
                    codeYear = '1';           // First year of studies
                }
                else if (studyProgramInfo.semester === '3' || studyProgramInfo.semester === '4') {
                    codeYear = '2';          // Second year of studies
                }
                else if (studyProgramInfo.semester === '5' || studyProgramInfo.semester === '6') {
                    codeYear = '3';         // Third year of studies
                }
                else if (studyProgramInfo.semester === '7' || studyProgramInfo.semester === '8') {
                    codeYear = '4';         // Fourth year of studies
                }
                else if (studyProgramInfo.semester === '9' || studyProgramInfo.semester === '10') {
                    codeYear = '5';        // Fifth year of studies
                } 

                // C. Determine the last part of the course's code  

                // The last part of the course's code must be an odd number. Starting for number 11, the code will take this or the
                // following odd numbers that there aren't in the database
                let findCodeNumber = true;
                let startCodeNumber = -1;
                if (studyProgramInfo.period === 'Χειμερινή') {
                    startCodeNumber = 11;
                }
                else if (studyProgramInfo.period === 'Εαρινή') {
                    startCodeNumber = 12;
                }
                
                let codeNumber = startCodeNumber;
                let formattedCourseCode = "";
                while (findCodeNumber) {
                    // Format the course's code that we check if there is in the database
                    formattedCourseCode = codePrefix + codeYear + String(startCodeNumber); 
                    // Check for the already existence of this course's code in the database
                    
                    if (existingCodes.length > 0 && existingCodes.indexOf(formattedCourseCode) > -1) {  // the current code exists in the database
                        // update the code number with the next odd number
                        startCodeNumber = startCodeNumber + 2;
                    }
                    else { // This is the final course code, so we can stop the search                    
                        findCodeNumber = false;
                    } 
                    codeNumber = startCodeNumber;
                }
                console.log(existingCodes)
                // D. Create the final course code 
                const finalCourseCode = codePrefix + codeYear + String(codeNumber); 
                // Set the course's code in the object that stores all the info of the new course that we want to add in the database!
                studyProgramInfo.course_code = finalCourseCode;
            }
            let graduationLevelInfo ="";
            if (gradLevel === 'Προπτυχιακές    Σπουδές') {
                graduationLevelInfo = 'ΠΡΟΠΤΥΧΙΑΚΟ';
            }
            else if (gradLevel === 'Μεταπτυχιακές    Σπουδές') {
                graduationLevelInfo = 'ΜΕΤΑΠΤΥΧΙΑΚΟ';
            }
            // After all that we are ready to continue with the course insertion, so navigate the user to the preview page
            navigate('/uth-ece_admin/add_course_preview',  // navigate to this pathname
                    {state: { newCourse: courseInputDocument,
                              graduateLevel : graduationLevelInfo}})

            console.log(courseInputDocument, 'INPUT !!!')

            // In the case that we use this component as pop up window, after all close the pop up window !
            if (props.currPopUpWindow !== undefined) {
                props.setOpenPopup(false);
            }
           
        }
    }

    // Function that check if there is a course with the argument name in the database using the suitable query
    const checkCourseNameValidation = (courseName) => {        
        SpecializationResolvers.find_course_by_name(courseName) 
            .then(result => {                   
                if (result?.data?.findCoursebyCourseName?.code === "C-QueryOK" && result?.data?.findCoursebyCourseName?.course?.StudyProgram?.course_name === courseName) {
                    if (gradLevel === 'Προπτυχιακές    Σπουδές') { 
                        if (!result?.data?.findCoursebyCourseName?.course?.StudyProgram?.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ')) {
                            document.getElementById('CourseName').getElementsByClassName('errorDuplicate')[0].style.display = 'flex'; 
                            document.getElementById('CourseName').getElementsByClassName('form_control')[0].style.borderColor = 'red'; 
                            return(true)
                        }
                    } 
                    else if (gradLevel === 'Μεταπτυχιακές    Σπουδές') {                
                            document.getElementById('CourseName').getElementsByClassName('errorDuplicate')[0].style.display = 'flex'; 
                            document.getElementById('CourseName').getElementsByClassName('form_control')[0].style.borderColor = 'red'; 
                            return(true)
                       
                    }                    
                }
                else {
                    document.getElementById('CourseName').getElementsByClassName('errorDuplicate')[0].style.display = 'none';
                    document.getElementById('CourseName').getElementsByClassName('form_control')[0].style.borderColor = '#5ac0d9'; 
                }
                return (true)
            })
            .catch(error => { 
                return('false');
            })        
            return(false)
    }

    // Function that check if there is a course with the argument code in the database using the suitable query
    const checkCourseCodeValidation = (courseCode) => { 
       
        SpecializationResolvers.find_course_by_code(courseCode) 
            .then(result => {  
                if (result?.data?.findCoursebyCourseCode?.code === "C-QueryOK" && result?.data?.findCoursebyCourseCode?.course?.StudyProgram?.course_code === courseCode) {
                    if (document.getElementById('CourseCode').getElementsByClassName('errorDuplicate')) {document.getElementById('CourseCode').getElementsByClassName('errorDuplicate')[0].style.display = 'flex' }; 
                    if (document.getElementById('CourseCode').getElementsByClassName('form_control')) { document.getElementById('CourseCode').getElementsByClassName('form_control')[0].style.borderColor = 'red' }; 
                    return(true)
                }
                else {
                   if (document.getElementById('CourseCode').getElementsByClassName('errorDuplicate') ) { document.getElementById('CourseCode').getElementsByClassName('errorDuplicate')[0].style.display = 'none' };
                    document.getElementById('CourseCode').getElementsByClassName('form_control')[0].style.borderColor = '#5ac0d9'; 
                }
                return (true)
            })
            .catch(error => { 
                return('false');
            })        
            return(false)
    }
    

    useEffect (() => {
        if (studyProgramInfo.specialization_field !== '') {
            handleClickInput("value", 'PostGraduateSpecializationField')
        }
        let graduateCode = '';
        if (gradLevel === 'Προπτυχιακές    Σπουδές') {
            graduateCode = 'ΠΠΣ';        
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(true); 
            setOpacity('0.4')  
        }
        else if (gradLevel === 'Μεταπτυχιακές   Σπουδές') {
            graduateCode = 'ΠΜΣ'; 
            setIsDisabledPostGrad(true);
            setIsDisabledUnderGrad(false); 
            setOpacity('1')  
        }
        else if (gradLevel === 'Κατηγορία Σπουδών') {
            graduateCode = 'ΠΠΣ';
            setPostgraduateSubject('-')
        }    
        SpecializationResolvers.find_semester_options(graduateCode, studyProgramInfo.specialization_field)
        .then(result => {
            setSemesterSelect(result?.data?.findSemesterOptionsByGraduateSpecializationField)
        })
        .catch(error => {
            setSemesterSelect([]);
        })  
        
    }, [studyProgramInfo.specialization_field, gradLevel])

    const changeState = (input_level) => {
        if (gradLevel !== input_level) {
            studyProgramInfo = studyProgramInfo_Default;   
            
            setMoreInfo({...moreInfo, students_curr_attendance_num:'0'.toString(), course_active:false})
        }
    } 
    const token = localStorage.getItem('token')           
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    return (
        <div> 
        {(type !== 'POP-UP' ) ? 
        <div className="add_courses_submit_main">
            <div className="add_courses_scroll">
                <div className="header">
                    <div className="text_header"><img src={COURSES} alt='' /></div>
                    <div className="title"> Μαθήματα
                        <p>Προπτυχιακά Μαθήματα - Μεταπτυχιακά Μαθήματα - Μαθήματα ERASMUS </p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Το προσωπικό του Πανεπιστημίου διακρίνεται στις εξής κατηγορίες: Διδακτικό Ερευνητικό Προσωπικό (Δ.Ε.Π.), Εργαστηριακό Διδακτικό Προσωπικό (Ε.ΔΙ.Π.), Ειδικό Εκπαιδευτικό Προσωπικό (Ε.Ε.Π), Μη διδάκτορες Βοηθοί και Συνεργαζόμενοι Διδάσκοντες, Διδάσκοντες του Π.Δ. 407/80, Ειδικό Τεχνικό Εργαστηριακό Προσωπικό (Ε.Τ.Ε.Π.) και Διοικητικό Προσωπικό. Παρακαλώ συμπληρώστε κατάλληλα τα στοιχεία στη φόρμα που ακολουθεί. Με την υποβολή των στοιχείων, η Ηλεκτρονική Γραμματεία θα προσθέσει ένα νέο μέλος στο διδακτικό προσωπικό του τμήματος.</div>           
                </div> 
                <div className='root'>
                <h1 className="main_title">Εισαγωγή Νέου Μαθήματος</h1>
                    <div className="addCourse_container">  
                        <div className="addCourse_main">
                            <div className={specializationField}>
                                <div className="menuToggle" id = "menuToggle" onClick={()=>{ specializationField==='tab' ? setSpecializationField('tab active'): setSpecializationField('tab'); setMenuField('menu_fields')}}><span className="span">{gradLevel}</span><p className="p">{specField.codeField}</p></div>
                                <div className="menu_studies">
                                <ul className="graduate levels"> 
                                    {graduateLevels?.levels.length > 0 ?
                                        graduateLevels?.levels.map((level,i)=> { 
                                            return (
                                                level === '-' ? 
                                                <li key={i} onClick={()=>{setGradLevel('Προπτυχιακές    Σπουδές'); 
                                                                        setFormState();
                                                                        setPostgraduateSubject(level);  
                                                                        setUndergraduateChecked(true); 
                                                                        setPostgraduateChecked(false);   
                                                                        changeState('Προπτυχιακές    Σπουδές');
                                                                        !studyProgramInfo.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ') ? setStudyProgramInfo({...studyProgramInfo, specialization_field:'-', course_label:[...studyProgramInfo.course_label, 'ΠΡΟΠΤΥΧΙΑΚΟ']}) : setStudyProgramInfo({...studyProgramInfo, specialization_field:'-'})                                                         
                                                                        //setStudyProgramInfo({...studyProgramInfo, specialization_field:'-', course_label:[...studyProgramInfo.course_label, 'ΠΡΟΠΤΥΧΙΑΚΟ']});                                                           
                                                                        setMenuField('menu_fields active')}}>  
                                                            ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ (ΠΠΣ)
                                                </li> :
                                                <li key={i} onClick={()=> {setGradLevel('Μεταπτυχιακές   Σπουδές');  
                                                                        setFormState();   
                                                                        setPostgraduateSubject(level);                                                                
                                                                        setUndergraduateChecked(false);  
                                                                        setPostgraduateChecked(true);
                                                                        changeState('Μεταπτυχιακές    Σπουδές');
                                                                        !studyProgramInfo.course_label.includes('ΜΕΤΑΠΤΥΧΙΑΚΟ') ? setStudyProgramInfo({...studyProgramInfo, specialization_field:level, course_label:[...studyProgramInfo.course_label, 'ΜΕΤΑΠΤΥΧΙΑΚΟ']}) : setStudyProgramInfo({...studyProgramInfo, specialization_field:level})                                                            
                                                                        //setStudyProgramInfo({...studyProgramInfo, specialization_field:level, course_label:[...studyProgramInfo.course_label, 'ΜΕΤΑΠΤΥΧΙΑΚΟ']});                                                                 
                                                                        setMenuField('menu_fields active')}}>
                                                            ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ (ΠΜΣ)<p>{level}</p>
                                                </li>
                                            )
                                        }) : null}                                  
                                    </ul>    
                                </div>               
                                <ul className="menu">                    
                                    <li><InfoIcon className={basicInfoActive} /></li>
                                    <li><StackedBarChartIcon className={studyProgramActive} /></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li><ManageAccountsIcon className={courseManagerActive}/></li>
                                    <li><WidgetsIcon className={moreInfoActive}/></li>
                                </ul>                                                                   
                            </div>
                            
                                <div className={menuField}>
                                    <ul className="specializations_fields"> 
                                        {field && field?.fields.length > 0 ? 
                                            field?.fields.map((item, i)=> { 
                                                return(                                        
                                                    <li key={i} id={'listItem'+i} onMouseEnter={() => document.getElementById('listItem'+i).getElementsByClassName('code')[0].style.display = 'block'}
                                                                                onMouseLeave={() => document.getElementById('listItem'+i).getElementsByClassName('code')[0].style.display = 'none'}
                                                                                onClick={() => {setSpecField({...specField, nameField:item.fieldName, codeField:item.fieldCode});
                                                                                                setStudyProgramInfo({...studyProgramInfo, study_program:item.fieldName});
                                                                                                setSpecializationField('tab');
                                                                                                setMenuField('menu_fields');
                                                                                                document.getElementById('menuToggle').getElementsByClassName('p')[0].style.display = 'flex';
                                                                                                document.getElementById('menuToggle').getElementsByClassName('span')[0].style.marginTop = '0.5vw'}}>
                                                        <span >
                                                                {item.fieldName}
                                                        </span>
                                                        <h2 className='code' style={{display:'none'}}>{item.fieldCode}</h2>
                                                    </li>
                                                )
                                            }) : null}
                                    </ul>
                                </div>  
                                <div className="beforeMessage"><AnnouncementTwoToneIcon className="messageIcon"/><p> Πριν προχωρήσετε με τη συμπλήρωση της φόρμας, παρακαλώ όπως επιλέξετε την Κατηγορία Σπουδών και το Γνωστικό Αντικείμενο στα οποία θα ανήκει το προς εισαγωγή μάθημα, πατώντας το κουμπί που προηγείται. Σε διαφορετική περίπτωση η φόρμα θα παραμείνει κλειδωμένη!</p></div>
                        </div>
                        {/******* BASIC FORM *******/}                
                        <div className="section_body">
                            <div className="container_fluid">
                                <div className="tab_pane">
                                    <div className="card_basicInfo" id='BASIC_INFO' onMouseEnter={()=>{setBasicInfoActive('mui_icon1 active'); setBasicInfoActiveForm('mui_icon1Form active')}} onMouseLeave={()=>{setBasicInfoActive('mui_icon1'); setBasicInfoActiveForm('mui_icon1Form')}}>
                                        <div className="card_header">
                                            <InfoIcon className={basicInfoActiveForm}/>
                                            <div className="card_title">ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</div>
                                            <div className="card_options">
                                                <HttpsTwoToneIcon className="lock"></HttpsTwoToneIcon>
                                                <NoEncryptionGmailerrorredTwoToneIcon className="lockOpen"></NoEncryptionGmailerrorredTwoToneIcon>
                                                <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('BASIC_INFO')}></ExpandLessIcon>
                                                <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('BASIC_INFO')} />
                                                {/*<CloseIcon className="card_options_remove"></CloseIcon>*/}
                                            </div>
                                        </div>
                                        <div className="card_body"> 
                                                <div className="row_courses">
                                                    {/*COURSE NAME*/}                                                   
                                                    <div className="column" id='CourseName'>
                                                        <div className="form_group">
                                                            <input className='form_control' label='CourseName' value={studyProgramInfo.course_name}  required disabled = {isDisabled} 
                                                                onChange={(e)=>{handleClickInput(e.target.value, 'CourseName'); setStudyProgramInfo({...studyProgramInfo, course_name:e.target.value}) ; 
                                                                checkCourseNameValidation(e.target.value);
                                                                document.getElementById('CourseName').getElementsByClassName('error')[0].style.display = 'none'; }}></input>  
                                                            <div className='labeline'>Τίτλος Μαθήματος</div>                                                                                           
                                                        </div>                                            
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>
                                                        {gradLevel === 'Μεταπτυχιακές    Σπουδές' ? 
                                                        <div className="errorDuplicate">*Υπάρχει ήδη ένα μάθημα του ΠΜΣ με αυτό τον τίτλο!</div>  :     <div className="errorDuplicate">*Υπάρχει ήδη ένα μάθημα του ΠΠΣ με αυτό τον τίτλο!</div>  } 
                                                    </div> 
                                                    {/*SPECIALIZATION FIELD*/}
                                                    <div className="column"  id='SpecializationField'>
                                                            <div className="form_group" id='SpecializationField'> 
                                                                <select className="form_control" label='SpecializationField'  value={studyProgramInfo.study_program} disabled = {isDisabled}
                                                                        onChange={(e)=>{handleClickInput(e.target.value,'SpecializationField'); 
                                                                                        setStudyProgramInfo({...studyProgramInfo, study_program:e.target.value});                                                                             
                                                                                        setSpecField({...specField, nameField:e.target.value, codeField:findCodeField(e.target.value)});
                                                                                        document.getElementById('SpecializationField').getElementsByClassName('error')[0].style.display = 'none';
                                                                                        }}>
                                                                    <option value='' style={{display:'none'}}></option>
                                                                    {field.fields.map(item => {
                                                                        return(<option key={item.fieldName} value={item.fieldName}>{item.fieldName}</option>)
                                                                    })}
                                                                </select>
                                                                <div className='labeline'>Γνωστικό Αντικείμενο</div>                                               
                                                            </div>  
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                                        </div>                                        
                                                    </div>         
                                                    {gradLevel === 'Μεταπτυχιακές   Σπουδές' ? 
                                                    <div className="row_courses">
                                                    {/*COURSE CODE*/}
                                                    <div className="column" id='CourseCode'>                                            
                                                        <div className="form_group"> 
                                                            <Tooltip
                                                                followCursor = {true}
                                                                title="Ένας κωδικός του ΠΜΣ πρέπει να είναι της μορφής ΜΔΕ### ή ΜΕΠΑ## ή ECE#### !"
                                                                arrow                                                                                                        
                                                            >
                                                            <input className='form_control' label='CourseCode' value={studyProgramInfo.course_code}  required disabled = {isDisabled} 
                                                                onChange={(e)=>{handleClickInput(e.target.value, 'CourseCode'); setStudyProgramInfo({...studyProgramInfo, course_code:e.target.value}) ;  
                                                                                checkCourseCodeValidation(e.target.value);
                                                                                document.getElementById('CourseCode').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                                                document.getElementById('CourseCode').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                            </Tooltip> 
                                                            <div className='labeline'>Κωδικός Μαθήματος</div>                                                                                           
                                                        </div>                                            
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div> 
                                                        <div className="errorValid">*Ένας κωδικός του ΠΜΣ πρέπει να είναι της μορφής ΜΔΕ### ή ΜΕΠΑ## ή ECE#### !</div> 
                                                        <div className="errorDuplicate">*Υπάρχει ήδη ένα μάθημα του ΠΜΣ με αυτό τον κωδικό!</div>    
                                                    </div> 
                                                    {/*POSTGRADUATE - SPECIALIZATION FIELD */}
                                                    <div className="column"  id='PostGraduateSpecializationField'>
                                                            <div className="form_group" id='PostGraduateSpecializationField'> 
                                                                <select className="form_control" label='PostGraduateSpecializationField'  value={studyProgramInfo.specialization_field} disabled = {isDisabled}
                                                                        onChange={(e)=>{handleClickInput(e.target.value,'PostGraduateSpecializationField'); 
                                                                                        setStudyProgramInfo({...studyProgramInfo, specialization_field:e.target.value});               
                                                                                        document.getElementById('PostGraduateSpecializationField').getElementsByClassName('error')[0].style.display = 'none';
                                                                                        }}>
                                                                    <option value='' style={{display:'none'}}></option>
                                                                    { graduateLevels?.levels.map(level => {
                                                                        return (
                                                                            level !== '-' ?
                                                                            <option key={level} value={level}>{level}</option> : null
                                                                        )
                                                                    })
                                                                    
                                                                    }
                                                                </select>
                                                                <div className='labeline'>Ειδίκευση Μεταπτυχιακού</div>                                               
                                                            </div>  
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                                        </div>                                        
                                                    </div>
                                                    :null}                              
                                                <div className="row_courses">
                                                    {/*SEMESTER*/}
                                                    <div className="column" id='Semester'>
                                                        <div className="form_group"> 
                                                            <select className="form_control" label='Semester' value={studyProgramInfo.semester} disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value,'Semester'); 
                                                                                    setStudyProgramInfo({...studyProgramInfo, semester:e.target.value});
                                                                                    document.getElementById('Semester').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('StudyPart').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                                    document.getElementById('StudyPart').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                    document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    }}> 
                                                                    <option value='' style={{display:'none'}}></option>  
                                                                    {semesterSelect?.map(item => {
                                                                        return (
                                                                            <option value={gradLevel === 'Προπτυχιακές    Σπουδές' ? item.split(" ")[1] : item}
                                                                                    key={item}>
                                                                                {item}
                                                                            </option>
                                                                        )
                                                                    })}                                     
                                                            </select>
                                                            <div className='labeline'>Εξάμηνο</div>                                               
                                                        </div>    
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>
                                                        <div className="errorSemPer">*Το Εξάμηνο και η Περίοδος δεν συμβαδίζουν!</div> 
                                                        <div className="errorSemStudy">*Το Εξάμηνο και η Κατεύθυνση δεν συμβαδίζουν!</div>  
                                                        <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>                                           
                                                    </div>
                                                    {/*COURSE TYPE*/}
                                                    <div className="column"  id='CourseType'> 
                                                        <div className="form_group"> 
                                                            <select className="form_control" label='CourseType' value={studyProgramInfo.course_type} disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value,'CourseType'); 
                                                                                    setStudyProgramInfo({...studyProgramInfo, course_type:e.target.value});
                                                                                    document.getElementById('CourseType').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Category').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                                    document.getElementById('CourseLabel').getElementsByClassName('errorCatLab')[0].style.display = 'none';   
                                                                                    document.getElementById('CourseType').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                                    document.getElementById('Category').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                                    }}>
                                                                <option value='' style={{display:'none'}}></option> 
                                                                <option value={'Υποχρεωτικό'}>Υποχρεωτικό</option>
                                                                <option value={'Επιλογής'}>Επιλογής</option>
                                                            </select>
                                                            <div className='labeline'>Τύπος Μαθήματος</div>                                               
                                                        </div>    
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>        
                                                        <div className="errorTypCat">*Ο Τύπος με την Κατηγορία δε συμβαδίζουν!</div>                                  
                                                    </div>                                                        
                                                </div>
                                                <div className="row_courses">
                                                    {/*PERIOD*/}
                                                    <div className="column" id='Period'>
                                                        <div className="form_group" > 
                                                            <select className="form_control" label='Period' value={studyProgramInfo.period} disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value,'Period'); 
                                                                                    setStudyProgramInfo({...studyProgramInfo, period:e.target.value});
                                                                                    document.getElementById('Period').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorSemPer')[0].style.display = 'none';}}>
                                                                <option value='' style={{display:'none'}}></option>
                                                                <option value={'Χειμερινή'}>Χειμερινή</option>
                                                                <option value={'Εαρινή'}>Εαρινή</option>
                                                            </select>
                                                            <div className='labeline'>Περίοδος</div>                                               
                                                        </div>                
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>    
                                                        <div className="errorSemPer">*Το Εξάμηνο και η Περίοδος δεν συμβαδίζουν!</div>         
                                                        <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>                        
                                                    </div>
                                                    <div className="column" id='StudyPart'>
                                                        <div className="form_group" > 
                                                            <select className="form_control" label='StudyPart' value={studyProgramInfo.study_part} disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value,'StudyPart'); 
                                                                                    setStudyProgramInfo({...studyProgramInfo, study_part:e.target.value});
                                                                                    document.getElementById('StudyPart').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';                                                                        
                                                                                    document.getElementById('StudyPart').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                    document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                    }}>                                                        
                                                                { ( semesterOptions === 'ΠΡΟΠΤΥΧΙΑΚΟ' ) ?  
                                                            <>                                                                    
                                                                <option value='' style={{display:'none'}}></option>                                                                                                        
                                                                <option value={'ΚΟΡΜΟΣ'}>ΚΟΡΜΟΣ</option>
                                                                <option value={'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>   
                                                            </> : ( semesterOptions === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' ) ?
                                                                    <>
                                                                        <option value='' style={{display:'none'}}></option>
                                                                        <option value='ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option> 
                                                                    </> :  
                                                                    <>
                                                                    <option value='' style={{display:'none'}}></option>                                                                                                        
                                                                    <option value={'ΚΟΡΜΟΣ'}>ΚΟΡΜΟΣ</option>
                                                                    <option value={'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>   
                                                                </>
                                                                }  
                                                            </select>
                                                            <div className='labeline'>Κατεύθυνση</div>                                               
                                                        </div>  
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                                        <div className="errorSemStudy">*Το Εξάμηνο και η Κατεύθυνση δεν συμβαδίζουν!</div>  
                                                        <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>     
                                                    </div>
                                                </div>                                        
                                                <div className="row_courses">
                                                    {/*STUDY UNITS*/}
                                                    <div className="column"  id='StudyUnits'>
                                                            <div className="form_group" id='StudyUnits'>
                                                                <input className='form_control' label='StudyUnits' type="number" value={studyProgramInfo.study_units}  required disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value, 'StudyUnits'); setStudyProgramInfo({...studyProgramInfo, study_units:e.target.value});
                                                                    document.getElementById('StudyUnits').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                                <div className='labeline'>ΔΜ</div>                                               
                                                            </div>     
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                          
                                                    </div> 
                                                    {/*ECTS*/}
                                                    <div className="column"  id='ECTS'>
                                                            <div className="form_group">
                                                                <input className='form_control' label='ECTS' type="number" value={studyProgramInfo.ECTS}  required disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value, 'ECTS'); 
                                                                                    document.getElementById('ECTS').getElementsByClassName('error')[0].style.display = 'none'; 
                                                                                    setStudyProgramInfo({...studyProgramInfo, ECTS:e.target.value})}}></input>  
                                                                <div className='labeline'>ECTS</div>                                               
                                                            </div>  
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                             
                                                    </div>                                        
                                                </div>                               
                                                <div className="row_courses">
                                                    {/*COURSE LABEL*/}                             
                                                    <div className="column" id='CourseLabel' style={{zIndex:'1111'}}>                                            
                                                        <div className="form_group">
                                                            <div className="checkboxes" label='CourseLabel'>
                                                                <label >
                                                                    <input type='checkbox' value='ΠΡΟΠΤΥΧΙΑΚΟ' checked={undergraduateChecked} onChange={() => manageCourseLabelArray('ΠΡΟΠΤΥΧΙΑΚΟ')}  disabled = {isDisabledUnderGrad}></input>
                                                                    <span>ΠΡΟΠΤΥΧΙΑΚΟ</span>
                                                                </label>
                                                                <label style={{opacity: opacityState}}  > 
                                                                    <input type='checkbox' value='ΜΕΤΑΠΤΥΧΙΑΚΟ' checked={postgraduateChecked} onChange={() => manageCourseLabelArray('ΜΕΤΑΠΤΥΧΙΑΚΟ')}   disabled = {isDisabledPostGrad}></input>
                                                                    <span>ΜΕΤΑΠΤΥΧΙΑΚΟ</span>
                                                                </label>
                                                                <label>
                                                                    <input type='checkbox'  value='ERASMUS' checked = {erasmusChecked} onChange={() => manageCourseLabelArray('ERASMUS')} disabled = {isDisabled} ></input>
                                                                    <span>ERASMUS</span>
                                                                </label>
                                                                <label>
                                                                    <input type='checkbox'  value='ΙΣΟΤΙΜΙΑΣ' checked = {equalChecked} onChange={() => manageCourseLabelArray('ΙΣΟΤΙΜΙΑΣ')} disabled = {isDisabled} ></input>
                                                                    <span>ΙΣΟΤΙΜΙΑΣ</span>
                                                                </label>                                                    
                                                            </div>                                                
                                                        </div>
                                                        <div className="error" style={{marginTop:'-2.1rem', paddingLeft:'-4rem', zIndex:'-1'}}>*Το πεδίο είναι υποχρεωτικό!</div>   
                                                        <div className="errorCatLab" style={{marginTop:'-2.1rem', paddingLeft:'-4rem', zIndex:'-1'}}>*Η Κατηγορία Μαθ. με το Είδος Σπουδών δε συμβαδίζουν!</div>    
                                                    </div>                                             
                                                </div>                                 
                                            </div>
                                    </div>
                                </div>
                            </div> 

                        {/******* STUDY PROGRAM FORM *******/}
                        <div className="section_body">
                            <div className="container_fluid">
                                <div className="tab_pane">
                                    <div className="card_studyProgramInfo" id='STUDY_PROGRAM' onMouseEnter={()=>{setstudyProgramActive('mui_icon2 active'); setstudyProgramActiveForm('mui_icon2Form active')}} onMouseLeave={()=>{setstudyProgramActive('mui_icon2'); setstudyProgramActiveForm('mui_icon2Form')}}>
                                        <div className="card_header">
                                            <StackedBarChartIcon className={studyProgramActiveForm}/>
                                            <div className="card_title">ΕΠΙΠΛΕΟΝ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ ΣΤΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ</div>
                                            <div className="card_options">
                                                <HttpsTwoToneIcon className="lock"></HttpsTwoToneIcon>
                                                <NoEncryptionGmailerrorredTwoToneIcon className="lockOpen"></NoEncryptionGmailerrorredTwoToneIcon>                                    
                                                <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('STUDY_PROGRAM')}></ExpandLessIcon>
                                                <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('STUDY_PROGRAM')} /> 
                                            </div>
                                        </div>
                                        <div className="card_body">
                                            <div className="row_courses">
                                                {/*DEPARTMENT NAME*/}
                                                <div className="column"  id='DepartmentName'>
                                                    <div className="form_group">
                                                        <input className='form_control' label='DepartmentName' value={studyProgramInfo.department_name}  required readOnly   disabled = {isDisabled}
                                                                onChange={(e)=>{handleClickInput(e.target.value, 'DepartmentName'); setStudyProgramInfo({...studyProgramInfo, department_name:e.target.value})}}></input>  
                                                        <div className='labeline'>Τμήμα</div>                                               
                                                    </div> 
                                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                                </div> 
                                                    {/*DEPARTMENT CODE*/}
                                                    <div className="column" id='DepartmentCode'>
                                                    <div className="form_group" >
                                                        <input className='form_control' label='DepartmentCode' type='number' value={studyProgramInfo.department_code}  required readOnly   disabled = {isDisabled}
                                                            onChange={(e)=>{handleClickInput(e.target.value, 'DepartmentCode'); setStudyProgramInfo({...studyProgramInfo, department_code:e.target.value})}}></input>  
                                                        <div className='labeline'>Κωδικός Τμήματος</div>                                               
                                                    </div>    
                                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                  
                                                </div> 
                                            </div>
                                            <div className="row_courses">
                                                {/*STUDY PROGRAM NAME*/}
                                                <div className="column" id='StudyProgramName'>
                                                    <div className="form_group">
                                                        <input className='form_control' label='StudyProgramName' value={studyProgramInfo.studyProgram_name} required  disabled = {isDisabled}
                                                                onChange={(e)=>{handleClickInput(e.target.value, 'StudyProgramName'); setStudyProgramInfo({...studyProgramInfo, studyProgram_name:e.target.value})}}></input>  
                                                        <div className='labeline'>Πρόγραμμα Σπουδών</div>                                               
                                                    </div>   
                                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                            
                                                </div> 
                                                    {/*STUDY PROGRAM CODE*/}
                                                    <div className="column"  id='StudyProgramCode'>
                                                    <div className="form_group">
                                                        <input className='form_control' label='StudyProgramCode' type='number' value={studyProgramInfo.studyProgram_num}  required  disabled = {isDisabled}
                                                            onChange={(e)=>{handleClickInput(e.target.value, 'StudyProgramCode'); setStudyProgramInfo({...studyProgramInfo, studyProgram_num:e.target.value})}}></input>  
                                                        <div className='labeline'>Κωδικός Προγράμματος Σπουδών</div>                                               
                                                    </div> 
                                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                     
                                                </div> 
                                            </div>                                       
                                            <div className="row_courses">
                                                {/*TEACHING HOURS*/}
                                                <div className="column"  id='StudyHours'>
                                                    <div className="form_group">
                                                        <input className='form_control' label='StudyHours' type="number" value={studyProgramInfo.study_hours}  required  disabled = {isDisabled}
                                                                onChange={(e)=>{handleClickInput(e.target.value, 'StudyHours'); setStudyProgramInfo({...studyProgramInfo, study_hours:e.target.value})}}></input>  
                                                        <div className='labeline'>Συν. Εβδ. Ωρών Διδασκαλίας</div>                                               
                                                    </div>  
                                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                             
                                                </div>                          
                                                {/*CATEGORY*/}
                                                <div className="column"  id='Category'>
                                                    <div className="form_group"> 
                                                        <select className="form_control" label='Category' value={studyProgramInfo.course_category}   disabled = {isDisabled}
                                                                onChange={(e)=>{handleClickInput(e.target.value,'Category'); 
                                                                                setStudyProgramInfo({...studyProgramInfo, course_category:e.target.value});
                                                                                document.getElementById('CourseLabel').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                                document.getElementById('Category').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                                document.getElementById('CourseType').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                                document.getElementById('Category').getElementsByClassName('errorTypCat')[0].style.display = 'none';}}>
                                                            <option value='' style={{display:'none'}}></option> 
                                                            <option value={'ΥΠΟΧΡΕΩΤΙΚΟ'}>ΥΠΟΧΡΕΩΤΙΚΟ</option>
                                                            <option value={'ΕΠΙΛΟΓΗΣ ΠΔΕ'}>ΕΠΙΛΟΓΗΣ ΠΔΕ</option>
                                                            <option value={'ΕΠΙΛΟΓΗΣ ΜΔΕ'}>ΕΠΙΛΟΓΗΣ ΜΔΕ</option>
                                                        </select>
                                                        <div className='labeline'>Κατηγορία</div>                                               
                                                    </div>               
                                                    <div className="errorTypCat">*Ο Τύπος με την Κατηγορία δε συμβαδίζουν!</div>  
                                                    <div className="errorCatLab">*Η Κατηγορία Μαθ. με το Είδος Σπουδών δε συμβαδίζουν!</div>                        
                                                </div>                                                        
                                            </div>
                                                <div className="row_courses">
                                                    {/*STUDY SUB-PART*/}
                                                    <div className="column" id='StudySubPart' >
                                                        <div className="form_group"> 
                                                            <input className='form_control' label='StudySubPart' value={studyProgramInfo.study_subpart}  required  disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value, 'StudySubPart'); setStudyProgramInfo({...studyProgramInfo, study_subpart:e.target.value})}}></input>  
                                                            <div className='labeline'>Υπο-Κατεύθυνση</div>                                                   
                                                        </div>                                            
                                                    </div>
                                                    {/*STUDY SUB-SPECIALIZATION FIELD*/}
                                                    <div className="column" id='SubStudyProgram'>
                                                        <div className="form_group"> 
                                                            <input className='form_control' label='SubStudyProgram' value={studyProgramInfo.sub_study_program} required  disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value, 'SubStudyProgram'); setStudyProgramInfo({...studyProgramInfo, sub_study_program:e.target.value})}}></input>  
                                                            <div className='labeline'>Υπο-Γνωστικό Αντικείμενο</div>                                               
                                                        </div>  
                                                    </div>
                                                </div>  
                                                <div className="row_courses">
                                                    {/*GROUP*/}
                                                    <div className="column" id='CourseGroup' style={{marginBottom:'1.7rem'}}>
                                                            <div className="form_group"> 
                                                                <select className="form_control" label='CourseGroup' value={studyProgramInfo.group}  disabled = {isDisabled}
                                                                        onChange={(e)=>{handleClickInput(e.target.value,'CourseGroup'); 
                                                                                        setStudyProgramInfo({...studyProgramInfo, group:e.target.value});}}>
                                                                    <option value='' style={{display:'none'}}></option> 
                                                                    <option value={'ΚΟΡΜΟΣ ΠΡΩΤΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΠΡΩΤΟΥ ΕΤΟΥΣ</option>
                                                                    <option value={'ΚΟΡΜΟΣ ΔΕΥΤΕΡΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΔΕΥΤΕΡΟΥ ΕΤΟΥΣ</option>
                                                                    <option value={'ΚΟΡΜΟΣ ΤΡΙΤΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΤΡΙΤΟΥ ΕΤΟΥΣ</option>
                                                                    <option value={'-'}>-</option>
                                                                </select>
                                                                <div className='labeline'>Ομάδα</div>                                               
                                                            </div>                                            
                                                    </div> 
                                                </div>
                                                {gradLevel === 'Προπτυχιακές    Σπουδές' ?
                                                <div className="more">
                                                    <div className="more_message">Παρακαλώ εισάγετε τα <span> ΠΡΟΑΠΑΙΤΟΥΜΕΝΑ </span> μαθήματα :</div>
                                                    <div className="column" id='Prerequisites'>
                                                            <div className="form_group"  style={{marginBottom:'2.5rem'}}> 
                                                                <Select             
                                                                    className='form_control2'                                                                                                                 
                                                                    isMulti
                                                                    name="colors"  
                                                                    options={studyProgramInfo.semester !== '' ? prerequisitesOptions : [{value:"-", label:"Παρακαλώ επιλέξτε πρώτα το Εξάμηνο !", isDisabled: true}]}    
                                                                    placeholder='Προαπαιτούμενα Μαθήματα'      
                                                                    disabled = {isDisabled}    
                                                                    onChange={(e) => setStudyProgramInfo({...studyProgramInfo, prerequisites: (e.map(a => a.value))})}  
                                                                />                                  
                                                            </div>                                            
                                                    </div> 
                                                </div>  : null }                              
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/******* COURSE MANAGEMENT INFO *******/}
                        <div className="section_body">
                            <div className="container_fluid">
                                <div className="tab_pane">
                                    <div className="card_courseManagementInfo" id='COURSE_MANAGEMENT' onMouseEnter={()=>{setCourseManagerActive('mui_icon3 active'); setCourseManagerActiveForm('mui_icon3Form active')}} onMouseLeave={()=>{setCourseManagerActive('mui_icon3'); setCourseManagerActiveForm('mui_icon3Form')}}>
                                        <div className="card_header">
                                            <ManageAccountsIcon className={courseManagerActiveForm}/>
                                            <div className="card_title">ΥΠΕΥΘΥΝΟΣ ΚΑΙ ΔΙΔΑΣΚΩΝ ΜΑΘΗΜΑΤΟΣ</div>
                                            <div className="card_options">
                                                <HttpsTwoToneIcon className="lock"></HttpsTwoToneIcon>
                                                <NoEncryptionGmailerrorredTwoToneIcon className="lockOpen"></NoEncryptionGmailerrorredTwoToneIcon>
                                                <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('COURSE_MANAGEMENT')}></ExpandLessIcon>
                                                <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('COURSE_MANAGEMENT')} /> 
                                            </div>
                                        </div>
                                        <div className="card_body">
                                            {/* COURSE MANAGER */}
                                            <ul className="course_manager_form">
                                                <li>
                                                    <div className="title">ΥΠΕΥΘΥΝΟΣ</div>
                                                    <div className="li_content">
                                                        <div className="row_courses">
                                                            <div className="column" id='manager_FirstName'>
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='manager_FirstName' value={COURSE_DIRECTOR.director_FirstName} required  disabled = {isDisabled}
                                                                            onChange={(e)=>{handleClickInput(e.target.value, 'manager_FirstName'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_FirstName:e.target.value});
                                                                                            document.getElementById('manager_FirstName').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                                    <div className='labeline'>Όνομα Υπεύθυνου</div>                                               
                                                                </div>
                                                                <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                                            </div>
                                                            <div className="column" id='manager_LastName'>
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='manager_LastName' value={COURSE_DIRECTOR.director_LastName}  required  disabled = {isDisabled}
                                                                            onChange={(e)=>{handleClickInput(e.target.value, 'manager_LastName'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_LastName:e.target.value})
                                                                                    document.getElementById('manager_LastName').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                                    <div className='labeline'>Επώνυμο Υπεύθυνου</div>                                               
                                                                </div>
                                                                <div className="error">*Το πεδίο είναι υποχρεωτικό!</div> 
                                                            </div>                                                
                                                        </div>
                                                        <div className="row_courses">
                                                            <div className="column"  id='manager_Email'>
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='manager_Email' value={COURSE_DIRECTOR.director_Email}  required  disabled = {isDisabled}
                                                                            onChange={(e)=>{handleClickInput(e.target.value, 'manager_Email'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_Email:e.target.value})
                                                                                            document.getElementById('manager_Email').getElementsByClassName('error')[0].style.display = 'none';
                                                                                            document.getElementById('manager_Email').getElementsByClassName('errorValid')[0].style.display = 'none'; }}></input>  
                                                                    <div className='labeline'>Email Υπεύθυνου</div>                                               
                                                                </div>
                                                                <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                                                <div className="errorValid">*Το Email δεν είναι έγκυρο!</div>   
                                                            </div>
                                                            <div className="column" id='manager_Type'>
                                                                <div className="form_group" > 
                                                                    <select className="form_control" label='manager_Type' value={COURSE_DIRECTOR.director_ProfessorType}  disabled = {isDisabled}
                                                                            onChange={(e)=>{handleClickInput(e.target.value,'manager_Type'); 
                                                                                            setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_ProfessorType:e.target.value});}}>
                                                                        <option value='' style={{display:'none'}}></option> 
                                                                        <option value={'ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        <option value={'ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        <option value={'ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        <option value={'ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        <option value={'Ε.ΔΙ.Π'}>Ε.ΔΙ.Π</option>
                                                                        <option value={'Δ.Ε.Π'}>Δ.Ε.Π.</option>
                                                                        <option value={'Ε.Ε.Π.'}>Ε.Ε.Π.</option>
                                                                        <option value={'ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80'}>ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80</option>
                                                                        <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ</option>
                                                                        <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ</option>
                                                                        <option value={'ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ'}>ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ</option>
                                                                        <option value={'ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ'}>ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ</option>
                                                                        <option value={'ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        <option value={'ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                    </select>
                                                                    <div className='labeline'>Τίτλος Υπεύθυνου</div>                                               
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            {/* SET THE COURSE'S INSTRUCTORS NUMBER */}
                                            <div className="numberOfInstructors">
                                                <h3>Παρακαλώ εισάγετε τον  <p> αριθμό των Διδασκόντων</p>:</h3>
                                                <input className='form_control' label='instructor_number'type="number" placeholder="1" min="1"  disabled = {isDisabled} 
                                                                                onChange={(e)=>setNumInstructors(Number(e.target.value))}></input>   
                                            </div>
                                            {/* COURSE INSTRUCTORS */}
                                            {[...Array(numInstructors)].map((value, index) => (  
                                            <ul className="course_manager_form" key={index}>  
                                                <li>                                    
                                                    <div className="li_content" style={{marginLeft:'-3%', marginTop:'2rem'}}>
                                                        <div className="row_courses">
                                                            <div className="column"  id={'instructor_FirstName'+index} >
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='instructor_FirstName'  value={courseManageInfo.COURSE_INSTRUCTORS[index]?.instructor_FirstName || ""}   disabled = {isDisabled}
                                                                            onChange={(e)=>{handleClickInputInstructor(e.target.value, index, 'instructor_FirstName'); setCOURSEINSTRUCTOR({...COURSE_INSTRUCTOR, instructor_FirstName:e.target.value});  handleChangeInstructorForm(index, 'instructor_FirstName', e.target.value)}}></input>  
                                                                    <div className='labeline'>Όνομα Διδάσκοντα</div>                                               
                                                                </div>
                                                            </div>
                                                            <div className="column" id={'instructor_LastName'+index}>
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='instructor_LastName' value={courseManageInfo.COURSE_INSTRUCTORS[index]?.instructor_LastName || ""} disabled = {isDisabled}
                                                                        onChange={(e)=>{ handleClickInputInstructor(e.target.value, index, 'instructor_LastName'); setCOURSEINSTRUCTOR({...COURSE_INSTRUCTOR, instructor_LastName:e.target.value});  handleChangeInstructorForm(index, 'instructor_LastName', e.target.value)}}></input>  
                                                                    <div className='labeline'>Επώνυμο Διδάσκοντα</div>                                               
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row_courses">
                                                            <div className="column" id={'instructor_EmailId'+index}>
                                                                <div className="form_group"> 
                                                                    <input className='form_control' label='instructor_Email' value={courseManageInfo.COURSE_INSTRUCTORS[index]?.instructor_Email || ""}   disabled = {isDisabled}
                                                                            onChange={(e)=>{ handleClickInputInstructor(e.target.value, index, 'instructor_Email');  setCOURSEINSTRUCTOR({...COURSE_INSTRUCTOR, instructor_Email:e.target.value});  handleChangeInstructorForm(index, 'instructor_Email', e.target.value);
                                                                                            document.getElementById('instructor_EmailId'+index).getElementsByClassName('errorValid')[0].style.display = 'none';}}></input>  
                                                                    <div className='labeline'>Email Διδάσκοντα</div>                                               
                                                                </div>
                                                                <div className="errorValid">*Το Email δεν είναι έγκυρο!</div>
                                                                <div className="error">*Υπάρχει ήδη διδάσκων με το συγκεκριμένο Email !</div>  
                                                            </div>
                                                            <div className="column"  id={'instructor_TypeId'+index}>
                                                                <div className="form_group"> 
                                                                    <select className="form_control" label='instructor_Type' value= {courseManageInfo.COURSE_INSTRUCTORS[index]?.instructor_director_ProfessorType || ""}  disabled = {isDisabled}   
                                                                                onChange={(e)=>{ handleClickInputInstructor(e.target.value, index ,'instructor_director_ProfessorType'); 
                                                                                setCOURSEINSTRUCTOR({...COURSE_INSTRUCTOR, instructor_director_ProfessorType:e.target.value});  handleChangeInstructorForm(index, 'instructor_director_ProfessorType', e.target.value);
                                                                                }}>
                                                                            <option value='' style={{display:'none'}}></option> 
                                                                            <option value={'ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                            <option value={'ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                            <option value={'ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                            <option value={'ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                            <option value={'Ε.ΔΙ.Π'}>Ε.ΔΙ.Π</option>
                                                                            <option value={'Δ.Ε.Π'}>Δ.Ε.Π.</option>
                                                                            <option value={'Ε.Ε.Π.'}>Ε.Ε.Π.</option>
                                                                            <option value={'ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80'}>ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80</option>
                                                                            <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ</option>
                                                                            <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ</option>
                                                                            <option value={'ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ'}>ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ</option>
                                                                            <option value={'ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ'}>ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ</option>
                                                                            <option value={'ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                            <option value={'ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                                        </select>
                                                                    <div className='labeline'>Τίτλος Διδάσκοντα</div>                                               
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index === 0 ? 
                                                        <div className="row_btn">                                               
                                                            <div className="removeInstructor">     
                                                                <div className="text">Ο Υπεύθυνος και ο Διδάσκων του Μαθήματος θα ταυτίζονται!</div>
                                                                <button className="btn_remove"                                                            
                                                                    onClick={() => {handleChangeInstructorForm(0, 'instructor_FirstName', COURSE_DIRECTOR.director_FirstName); 
                                                                                    handleChangeInstructorForm(0, 'instructor_LastName', COURSE_DIRECTOR.director_LastName);
                                                                                    handleChangeInstructorForm(0, 'instructor_Email', COURSE_DIRECTOR.director_Email); 
                                                                                    handleChangeInstructorForm(0, 'instructor_director_ProfessorType', COURSE_DIRECTOR.director_ProfessorType);
                                                                                    handleClickInputInstructor( COURSE_DIRECTOR.director_FirstName, 0, 'instructor_FirstName');
                                                                                    handleClickInputInstructor( COURSE_DIRECTOR.director_LastName, 0, 'instructor_LastName');
                                                                                    handleClickInputInstructor( COURSE_DIRECTOR.director_Email, 0, 'instructor_Email');                                       
                                                                                    handleClickInputInstructor( COURSE_DIRECTOR.director_ProfessorType, 0, 'instructor_director_ProfessorType');
                                                                    }}
                                                                ><PersonRemoveAlt1Icon/></button>  
                                                            </div>
                                                        </div> : <div style={{paddingBottom:'0.5rem'}}></div>}
                                                    </div>
                                                    <div className="title_instructor">ΔΙΔΑΣΚΩΝ {index + 1}</div>
                                                </li>
                                            </ul> 
                                            ))}  
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        {/******* MORE INFO *******/}
                        <div className="section_body">
                            <div className="container_fluid">
                                <div className="tab_pane">
                                    <div className="card_moreInfo" id='MORE_INFO' onMouseEnter={()=>{setMoreInfoActive('mui_icon4 active'); setMoreInfoActiveForm('mui_icon4Form active')}} onMouseLeave={()=>{setMoreInfoActive('mui_icon4'); setMoreInfoActiveForm('mui_icon4Form')}}>
                                        <div className="card_header">
                                            <WidgetsIcon className={moreInfoActiveForm}/>
                                            <div className="card_title">ΕΠΙΠΛΕΟΝ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</div>
                                            <div className="card_options">
                                                <HttpsTwoToneIcon className="lock"></HttpsTwoToneIcon>
                                                <NoEncryptionGmailerrorredTwoToneIcon className="lockOpen"></NoEncryptionGmailerrorredTwoToneIcon>
                                                <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('MORE_INFO')}></ExpandLessIcon>
                                                <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('MORE_INFO')} /> 
                                            </div>
                                        </div>
                                        <div className="card_body">    
                                                <div className="row_courses" style={{width:'80%'}}>
                                                    {/*STUDENTS ATTENDANCE NUMBER*/}
                                                    <div className="column" id='StudentsCurrAttendanceNum'>
                                                            <div className="form_group">
                                                                <input className='form_control' label='StudentsCurrAttendanceNum' type="number" min="0" value={moreInfo.students_curr_attendance_num}   disabled = {isDisabled}
                                                                    onChange={(e)=>{handleClickInput(e.target.value, 'StudentsCurrAttendanceNum'); setMoreInfo({...moreInfo, students_curr_attendance_num:(parseInt(e.target.value,10)).toString()})}}></input>  
                                                                <div className='labeline'>Αρ. Εγγεγραμμένων Φοιτητών</div>                                               
                                                            </div>                                            
                                                    </div> 
                                                </div>
                                                <div className="row_courses" style={{width:'80%'}}>
                                                    {/*COURSE ACTIVE*/}
                                                    <div className="column"  id='CourseActive'>
                                                            <div className="courseActive">
                                                                <div className='labeline' style={{color:moreInfo.course_active === false ? 'rgb(123, 122, 122)' :'#2e9eb0'}}>Το μάθημα θα διδάσκεται το {currYearSemester} εξάμηνο του τρέχοντος ακαδημαϊκού έτους {currAcademicYear}: </div>                                               
                                                                <div className="above_checkbox"> 
                                                                    <input className='checkbox' label='CourseActive' type="checkbox" checked={moreInfo.course_active} style={{background:moreInfo.course_active === false ? '#e6e6e6' :'#2e9eb0'}}  disabled = {isDisabled}
                                                                        onChange = {(e)=>{document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color === 'rgb(123, 122, 122)' ? document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color = '#2e9eb0' : document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color = 'rgb(123, 122, 122)' ; 
                                                                                        document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background === 'rgb(230, 230, 230)' ? document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background = '#2e9eb0' : document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background = '#e6e6e6';
                                                                                        setMoreInfo({...moreInfo, course_active:!moreInfo.course_active})}}></input>                                                         
                                                                </div>
                                                            </div>                                            
                                                    </div> 
                                                </div>
                                            </div>                                                    
                                        
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={300}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />                
                        <button className="learn_more" onClick={()=> prepareCousreInsertion()}>             
                            <span className="circle" aria-hidden='true'>                
                                    <TaskAltIcon className="check"/>    
                                <span className="button_text">ΕΙΣΑΓΩΓΗ</span>
                            </span>
                        </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div> : 
        <div className="add_courses_submit_main">
        <div className="add_courses_scroll">
        <div className="root">
        <div className="addCourse_container">    
        {currPopUpWindow === 'BasicInfo_form' ?
            <div className="section_body" style={{paddingTop:'2rem', margin:'0 2px', width:'100%', alignItems:'center', justifyContent:'center', backgroundSize:'100% 100%', padding:'2rem 2px'}}>
                <div className="container_fluid">
                    <div className="tab_pane">
                        <div className="card_basicInfo" id='BASIC_INFO' onMouseEnter={()=>{setBasicInfoActive('mui_icon1 active'); setBasicInfoActiveForm('mui_icon1Form active')}} onMouseLeave={()=>{setBasicInfoActive('mui_icon1'); setBasicInfoActiveForm('mui_icon1Form')}}>
                            <div className="card_header">
                                <InfoIcon className={basicInfoActiveForm}/>
                                <div className="card_title">ΒΑΣΙΚΑ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</div>                                 
                            </div>                          
                            <div className="card_body">                           
                                    <div className="row_courses">
                                        {/*COURSE NAME*/}
                                        <div className="column" id='CourseName'>
                                            <div className="form_group">
                                                <input className='form_control' label='CourseName' value={studyProgramInfo.course_name}  required    
                                                       onChange={(e)=>{handleClickInput(e.target.value, 'CourseName'); 
                                                                       checkCourseNameValidation(e.target.value)
                                                                       setStudyProgramInfo({...studyProgramInfo, course_name:e.target.value}) ; 
                                                       document.getElementById('CourseName').getElementsByClassName('error')[0].style.display = 'none'; }}></input>  
                                                <div className='labeline'>Τίτλος Μαθήματος</div>                                                                                           
                                            </div>                                            
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>    
                                            {gradLevel === 'Μεταπτυχιακές    Σπουδές' ? 
                                            <div className="errorDuplicate">*Υπάρχει ήδη ένα μάθημα του ΠΜΣ με αυτό τον τίτλο!</div> : <div className="errorDuplicate">*Υπάρχει ήδη ένα μάθημα του ΠΠΣ με αυτό τον τίτλο!</div>  } 
                                        </div> 
                                         {/*SPECIALIZATION FIELD*/}
                                         <div className="column"  id='SpecializationField'>
                                                <div className="form_group" id='SpecializationField'> 
                                                <input className='form_control' label='SpecializationField' value={studyProgramInfo.study_program}  required    
                                                       onChange={(e)=>{handleClickInput(e.target.value, 'SpecializationField'); 
                                                       setStudyProgramInfo({...studyProgramInfo, study_program:e.target.value});                                                                                                                                                         
                                                       setSpecField({...specField, nameField:e.target.value, codeField:findCodeField(e.target.value)});
                                                       document.getElementById('SpecializationField').getElementsByClassName('error')[0].style.display = 'none';
                                                       }}></input>   
                                                    <div className='labeline'>Γνωστικό Αντικείμενο</div>                                               
                                                </div>  
                                                <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                            </div>                                        
                                        </div>  
                                        {studyProgramInfo.course_code.startsWith('ΜΔΕ') || studyProgramInfo.course_code.length === 7 ? 
                                        <div className="row_courses">
                                        {/*COURSE CODE*/}
                                        <div className="column" id='CourseCode'>                                            
                                            <div className="form_group"> 
                                                <Tooltip
                                                    followCursor = {true}
                                                    title="O κωδικός του ΠΜΣ δεν μπορεί να τροποποιηθεί !"
                                                    arrow                                                                                                        
                                                >
                                                <input className='form_control' label='CourseCode' value={studyProgramInfo.course_code}  required  readOnly
                                                       onChange={(e)=>{handleClickInput(e.target.value, 'CourseCode'); setStudyProgramInfo({...studyProgramInfo, course_code:e.target.value}) ; 
                                                       checkCourseCodeValidation(e.target.value);
                                                       document.getElementById('CourseCode').getElementsByClassName('error')[0].style.display = 'none'; }}></input>  
                                                </Tooltip> 
                                                <div className='labeline'>Κωδικός Μαθήματος</div>                                                                                           
                                            </div>                                            
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>    
                                            <div className="errorDuplicate">*!Υπάρχει ήδη ένα μάθημα του ΠΜΣ με αυτό τον κωδικό !</div>    
                                        </div> 
                                         {/*POSTGRADUATE - SPECIALIZATION FIELD */}
                                         <div className="column"  id='PostGraduateSpecializationField'>
                                                <div className="form_group" id='PostGraduateSpecializationField'> 
                                                    <select className="form_control" label='PostGraduateSpecializationField'  value={studyProgramInfo.specialization_field} 
                                                            onChange={(e)=>{handleClickInput(e.target.value,'PostGraduateSpecializationField'); 
                                                                            setStudyProgramInfo({...studyProgramInfo, specialization_field:e.target.value});               
                                                                            document.getElementById('PostGraduateSpecializationField').getElementsByClassName('error')[0].style.display = 'none';
                                                                            }}>
                                                        <option value='' style={{display:'none'}}></option>
                                                        { graduateLevels?.levels.map(level => {
                                                            return (
                                                                level !== '-' ?
                                                                <option key={level} value={level}>{level}</option> : null
                                                            )
                                                        })
                                                        
                                                        }
                                                    </select>
                                                    <div className='labeline'>Ειδίκευση Μεταπτυχιακού</div>                                               
                                                </div>  
                                                <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                            </div>                                        
                                        </div>
                                        :null}                                                        
                                    <div className="row_courses">
                                        {/*SEMESTER*/}
                                        <div className="column" id='Semester'>
                                            <div className="form_group"> 
                                                    <input className='form_control' label='Semester' value={studyProgramInfo.semester}  required    
                                                                                                 onChange={(e)=>{handleClickInput(e.target.value,'Semester'); 
                                                                                                 setStudyProgramInfo({...studyProgramInfo, semester:e.target.value});
                                                                                                 document.getElementById('Semester').getElementsByClassName('error')[0].style.display = 'none';
                                                                                                 document.getElementById('Period').getElementsByClassName('error')[0].style.display = 'none';
                                                                                                 document.getElementById('StudyPart').getElementsByClassName('error')[0].style.display = 'none';
                                                                                                 document.getElementById('Semester').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                                                 document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                                 document.getElementById('Semester').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                                 document.getElementById('Period').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                                                 document.getElementById('StudyPart').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                                                 document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                                                 document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';}}></input>  
                                            
                                                <div className='labeline'>Εξάμηνο</div>                                               
                                            </div>    
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>
                                            <div className="errorSemPer">*Το Εξάμηνο και η Περίοδος δεν συμβαδίζουν!</div> 
                                            <div className="errorSemStudy">*Το Εξάμηνο και η Κατεύθυνση δεν συμβαδίζουν!</div>  
                                            <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>                                           
                                        </div>
                                        {/*COURSE TYPE*/}
                                        <div className="column"  id='CourseType'>
                                            <div className="form_group"> 
                                                <select className="form_control" label='CourseType' value={studyProgramInfo.course_type} 
                                                        style = {{border:'0.1px solid #5ac0d9', outline:'2px solid hsla(184, 56%, 68%, 0.369)'}}                                             
                                                        onChange={(e)=>{handleClickInput(e.target.value,'CourseType'); 
                                                                        setStudyProgramInfo({...studyProgramInfo, course_type:e.target.value});
                                                                        document.getElementById('CourseType').getElementsByClassName('error')[0].style.display = 'none';
                                                                        document.getElementById('Category').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                        document.getElementById('CourseLabel').getElementsByClassName('errorCatLab')[0].style.display = 'none';   
                                                                        document.getElementById('CourseType').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                        document.getElementById('Category').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                        }}>
                                                    <option value='' style={{display:'none'}}></option> 
                                                    <option value={'Υποχρεωτικό'}>Υποχρεωτικό</option>
                                                    <option value={'Επιλογής'}>Επιλογής</option>
                                                </select>
                                                <div className='labeline'>Τύπος Μαθήματος</div>                                               
                                            </div>    
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>        
                                            <div className="errorTypCat">*Ο Τύπος με την Κατηγορία δε συμβαδίζουν!</div>                                  
                                        </div>                                                        
                                    </div>
                                    <div className="row_courses">
                                        {/*PERIOD*/}
                                        <div className="column" id='Period'>
                                            <div className="form_group" > 
                                                <select className="form_control" label='Period' value={studyProgramInfo.period} 
                                                        onChange={(e)=>{handleClickInput(e.target.value,'Period'); 
                                                                        setStudyProgramInfo({...studyProgramInfo, period:e.target.value});
                                                                        document.getElementById('Period').getElementsByClassName('error')[0].style.display = 'none';
                                                                        document.getElementById('Period').getElementsByClassName('errorSemPer')[0].style.display = 'none';
                                                                        document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                        document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                        document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                        document.getElementById('Semester').getElementsByClassName('errorSemPer')[0].style.display = 'none';}}>
                                                    <option value='' style={{display:'none'}}></option>
                                                    <option value={'Χειμερινή'}>Χειμερινή</option>
                                                    <option value={'Εαρινή'}>Εαρινή</option>
                                                </select>
                                                <div className='labeline'>Περίοδος</div>                                               
                                            </div>                
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>    
                                            <div className="errorSemPer">*Το Εξάμηνο και η Περίοδος δεν συμβαδίζουν!</div>         
                                            <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>                        
                                        </div>
                                        <div className="column" id='StudyPart'>
                                            <div className="form_group" >                                            
                                                <select className="form_control" label='StudyPart' value={studyProgramInfo.study_part} 
                                                        onChange={(e)=>{handleClickInput(e.target.value,'StudyPart'); 
                                                                        setStudyProgramInfo({...studyProgramInfo, study_part:e.target.value});
                                                                        document.getElementById('StudyPart').getElementsByClassName('error')[0].style.display = 'none';
                                                                        document.getElementById('StudyPart').getElementsByClassName('errorThree')[0].style.display = 'none';                                                                        
                                                                        document.getElementById('StudyPart').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                        document.getElementById('Semester').getElementsByClassName('errorSemStudy')[0].style.display = 'none';
                                                                        document.getElementById('Semester').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                        document.getElementById('Period').getElementsByClassName('errorThree')[0].style.display = 'none';
                                                                        }}>      
                                                    { ( semesterOptions === 'ΠΡΟΠΤΥΧΙΑΚΟ' ) ?  
                                                <>                                                                    
                                                    <option value='' style={{display:'none'}}></option>                                                                                                        
                                                    <option value={'ΚΟΡΜΟΣ'}>ΚΟΡΜΟΣ</option>
                                                    <option value={'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>   
                                                </> : ( semesterOptions === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' ) ?
                                                        <>
                                                            <option value='' style={{display:'none'}}></option>
                                                            <option value='ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option> 
                                                        </> :  
                                                        <>
                                                         <option value='' style={{display:'none'}}></option>                                                                                                        
                                                        <option value={'ΚΟΡΜΟΣ'}>ΚΟΡΜΟΣ</option>
                                                        <option value={'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>   
                                                    </>
                                                    }
                                                </select> 
                                                <div className='labeline'>Κατεύθυνση</div>                                               
                                            </div>  
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                            <div className="errorSemStudy">*Το Εξάμηνο και η Κατεύθυνση δεν συμβαδίζουν!</div>  
                                            <div className="errorThree">*Το Εξάμηνο, η Περίοδος και η Κατεύθυνση δεν συμβαδίζουν!</div>     
                                        </div>
                                    </div>                                        
                                    <div className="row_courses">
                                         {/*STUDY UNITS*/}
                                        <div className="column"  id='StudyUnits'>
                                                <div className="form_group" id='StudyUnits'>
                                                    <input className='form_control' label='StudyUnits' type="number" value={studyProgramInfo.study_units}  required
                                                        onChange={(e)=>{handleClickInput(e.target.value, 'StudyUnits'); setStudyProgramInfo({...studyProgramInfo, study_units:e.target.value});
                                                        document.getElementById('StudyUnits').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                    <div className='labeline'>ΔΜ</div>                                               
                                                </div>     
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                          
                                        </div> 
                                         {/*ECTS*/}
                                        <div className="column"  id='ECTS'>
                                                <div className="form_group">
                                                    <input className='form_control' label='ECTS' type="number" value={studyProgramInfo.ECTS}  required
                                                        onChange={(e)=>{handleClickInput(e.target.value, 'ECTS'); 
                                                                        document.getElementById('ECTS').getElementsByClassName('error')[0].style.display = 'none'; 
                                                                        setStudyProgramInfo({...studyProgramInfo, ECTS:e.target.value})}}></input>  
                                                    <div className='labeline'>ECTS</div>                                               
                                                </div>  
                                            <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                             
                                        </div>                                        
                                    </div>                               
                                    <div className="row_courses">
                                         {/*COURSE LABEL*/}                             
                                        <div className="column" id='CourseLabel' style={{zIndex:'1111'}}>                                            
                                            <div className="form_group">
                                                <div className="checkboxes" label='CourseLabel'  style={{gap:'0.5rem'}}>
                                                    <label>
                                                        <input type='checkbox' value='ΠΡΟΠΤΥΧΙΑΚΟ' checked={undergraduateChecked} onChange={() => manageCourseLabelArray('ΠΡΟΠΤΥΧΙΑΚΟ')}></input>
                                                        <span>ΠΡΟΠΤΥΧΙΑΚΟ</span>
                                                    </label>
                                                    <label style={{opacity: opacityState}}> 
                                                        <input type='checkbox' value='ΜΕΤΑΠΤΥΧΙΑΚΟ' checked={postgraduateChecked} onChange={() => manageCourseLabelArray('ΜΕΤΑΠΤΥΧΙΑΚΟ')}  disabled = {isDisabledPostGrad}></input>
                                                        <span>ΜΕΤΑΠΤΥΧΙΑΚΟ</span>
                                                    </label>
                                                    <label>
                                                        <input type='checkbox'  value='ERASMUS' checked={erasmusChecked} onChange={() => manageCourseLabelArray('ERASMUS')} ></input>
                                                        <span>ERASMUS</span>
                                                    </label>   
                                                    <label>
                                                        <input type='checkbox'  value='ΙΣΟΤΙΜΙΑΣ' checked = {equalChecked} onChange={() => manageCourseLabelArray('ΙΣΟΤΙΜΙΑΣ')} ></input>
                                                        <span>ΙΣΟΤΙΜΙΑΣ</span>
                                                    </label>                                                    
                                                </div>                                                
                                            </div>
                                            <div className="error" style={{marginTop:'-2.1rem', paddingLeft:'-4rem', zIndex:'-1'}}>*Το πεδίο είναι υποχρεωτικό!</div>   
                                            <div className="errorCatLab" style={{marginTop:'-2.1rem', paddingLeft:'-4rem', zIndex:'-1'}}>*Η Κατηγορία Μαθ. με το Είδος Σπουδών δε συμβαδίζουν!</div>    
                                        </div>                                             
                                    </div>                                 
                                </div>
                                <div className='button_container' style={{ marginTop: "2rem" }}>
                                <div className={submitButton} 
                                    onMouseEnter={() => setSubmitButton('submit_button')}
                                    onMouseLeave={() => setSubmitButton('submit_button loading')}
                                    onClick={()=>prepareCousreInsertion()}>
                                    <SystemUpdateAltIcon className='buttonIcon' />
                                    <span className='text'>
                                        Υποβολή των ανανεωμένων στοιχείων !
                                    </span>
                                    <span className='loading-animate'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : currPopUpWindow === 'StudyProgramInfo_form' ?         
            <div className="section_body"  style={{paddingTop:'2rem', margin:'0 5px'}}>
            <div className="container_fluid">
                <div className="tab_pane">
                    <div className="card_studyProgramInfo" id='STUDY_PROGRAM' onMouseEnter={()=>{setstudyProgramActive('mui_icon2 active'); setstudyProgramActiveForm('mui_icon2Form active')}} onMouseLeave={()=>{setstudyProgramActive('mui_icon2'); setstudyProgramActiveForm('mui_icon2Form')}}>
                        <div className="card_header">
                            <StackedBarChartIcon className={studyProgramActiveForm}/>
                            <div className="card_title">ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ ΣΤΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ</div>
                             
                        </div>
                        <div className="card_body">
                            <div className="row_courses">
                                {/*DEPARTMENT NAME*/}
                                <div className="column"  id='DepartmentName'>
                                    <div className="form_group">
                                        <input className='form_control' label='DepartmentName' value={studyProgramInfo.department_name}  required readOnly
                                                onChange={(e)=>{handleClickInput(e.target.value, 'DepartmentName'); setStudyProgramInfo({...studyProgramInfo, department_name:e.target.value})}}></input>  
                                        <div className='labeline'>Τμήμα</div>                                               
                                    </div> 
                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                              
                                </div> 
                                    {/*DEPARTMENT CODE*/}
                                    <div className="column" id='DepartmentCode'>
                                    <div className="form_group" >
                                        <input className='form_control' label='DepartmentCode' type='number' value={studyProgramInfo.department_code}  required readOnly
                                            onChange={(e)=>{handleClickInput(e.target.value, 'DepartmentCode'); setStudyProgramInfo({...studyProgramInfo, department_code:e.target.value})}}></input>  
                                        <div className='labeline'>Κωδικός Τμήματος</div>                                               
                                    </div>    
                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                  
                                </div> 
                            </div>
                            <div className="row_courses">
                                {/*STUDY PROGRAM NAME*/}
                                <div className="column" id='StudyProgramName'>
                                    <div className="form_group">
                                        <input className='form_control' label='StudyProgramName' value={studyProgramInfo.studyProgram_name} required
                                                onChange={(e)=>{handleClickInput(e.target.value, 'StudyProgramName'); setStudyProgramInfo({...studyProgramInfo, studyProgram_name:e.target.value})}}></input>  
                                        <div className='labeline'>Πρόγραμμα Σπουδών</div>                                               
                                    </div>   
                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                            
                                </div> 
                                    {/*STUDY PROGRAM CODE*/}
                                    <div className="column"  id='StudyProgramCode'>
                                    <div className="form_group">
                                        <input className='form_control' label='StudyProgramCode' type='number' value={studyProgramInfo.studyProgram_num}  required
                                            onChange={(e)=>{handleClickInput(e.target.value, 'StudyProgramCode'); setStudyProgramInfo({...studyProgramInfo, studyProgram_num:e.target.value})}}></input>  
                                        <div className='labeline'>Κωδικός Πρ. Σπουδών</div>                                               
                                    </div> 
                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                     
                                </div> 
                            </div>                                       
                            <div className="row_courses">
                                {/*TEACHING HOURS*/}
                                <div className="column"  id='StudyHours'>
                                    <div className="form_group">
                                        <input className='form_control' label='StudyHours' type="number" value={studyProgramInfo.study_hours}  required
                                                onChange={(e)=>{handleClickInput(e.target.value, 'StudyHours'); setStudyProgramInfo({...studyProgramInfo, study_hours:e.target.value})}}></input>  
                                        <div className='labeline'>Συν. Εβδ. Ωρών Διδασκαλίας</div>                                               
                                    </div>  
                                    <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>                                             
                                </div>                          
                                {/*CATEGORY*/}
                                <div className="column"  id='Category'>
                                    <div className="form_group"> 
                                        <select className="form_control" label='Category' value={studyProgramInfo.course_category} 
                                                onChange={(e)=>{handleClickInput(e.target.value,'Category'); 
                                                                setStudyProgramInfo({...studyProgramInfo, course_category:e.target.value});
                                                                document.getElementById('CourseLabel').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                document.getElementById('Category').getElementsByClassName('errorCatLab')[0].style.display = 'none'; 
                                                                document.getElementById('CourseType').getElementsByClassName('errorTypCat')[0].style.display = 'none'; 
                                                                document.getElementById('Category').getElementsByClassName('errorTypCat')[0].style.display = 'none';}}>
                                            <option value='' style={{display:'none'}}></option> 
                                            <option value={'ΥΠΟΧΡΕΩΤΙΚΟ'}>ΥΠΟΧΡΕΩΤΙΚΟ</option>
                                            <option value={'ΕΠΙΛΟΓΗΣ ΠΔΕ'}>ΕΠΙΛΟΓΗΣ ΠΔΕ</option>
                                            <option value={'ΕΠΙΛΟΓΗΣ ΜΔΕ'}>ΕΠΙΛΟΓΗΣ ΜΔΕ</option>
                                        </select>
                                        <div className='labeline'>Κατηγορία</div>                                               
                                    </div>               
                                    <div className="errorTypCat">*Ο Τύπος με την Κατηγορία δε συμβαδίζουν!</div>  
                                    <div className="errorCatLab">*Η Κατηγορία Μαθ. με το Είδος Σπουδών δε συμβαδίζουν!</div>                        
                                </div>                                                        
                            </div>
                                <div className="row_courses">
                                    {/*STUDY SUB-PART*/}
                                    <div className="column" id='StudySubPart' >
                                        <div className="form_group"> 
                                            <input className='form_control' label='StudySubPart' value={studyProgramInfo.study_subpart}  required
                                                    onChange={(e)=>{handleClickInput(e.target.value, 'StudySubPart'); setStudyProgramInfo({...studyProgramInfo, study_subpart:e.target.value})}}></input>  
                                            <div className='labeline'>Υπο-Κατεύθυνση</div>                                                   
                                        </div>                                            
                                    </div>
                                    {/*STUDY SUB-SPECIALIZATION FIELD*/}
                                    <div className="column" id='SubStudyProgram'>
                                        <div className="form_group"> 
                                            <input className='form_control' label='SubStudyProgram' value={studyProgramInfo.sub_study_program} required 
                                                    onChange={(e)=>{handleClickInput(e.target.value, 'SubStudyProgram'); setStudyProgramInfo({...studyProgramInfo, sub_study_program:e.target.value})}}></input>  
                                            <div className='labeline'>Υπο-Γνωστικό Αντικείμενο</div>                                               
                                        </div>  
                                    </div>
                                </div>  
                                <div className="row_courses">
                                    {/*GROUP*/}
                                    <div className="column" id='CourseGroup'  style={{marginBottom:'1.7rem'}}>
                                            <div className="form_group" > 
                                                <select className="form_control" label='CourseGroup' value={studyProgramInfo.group} 
                                                        style = {{border:'0.1px solid #5ac0d9', outline:'2px solid hsla(184, 56%, 68%, 0.369)'}}
                                                        onChange={(e)=>{handleClickInput(e.target.value,'CourseGroup'); 
                                                                        setStudyProgramInfo({...studyProgramInfo, group:e.target.value});}}>
                                                    <option value='' style={{display:'none'}}></option> 
                                                    <option value={'ΚΟΡΜΟΣ ΠΡΩΤΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΠΡΩΤΟΥ ΕΤΟΥΣ</option>
                                                    <option value={'ΚΟΡΜΟΣ ΔΕΥΤΕΡΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΔΕΥΤΕΡΟΥ ΕΤΟΥΣ</option>
                                                    <option value={'ΚΟΡΜΟΣ ΤΡΙΤΟΥ ΕΤΟΥΣ'}>ΚΟΡΜΟΣ ΤΡΙΤΟΥ ΕΤΟΥΣ</option>
                                                    <option value={'-'}>-</option>
                                                </select>
                                                <div className='labeline'>Ομάδα</div>                                               
                                            </div>                                            
                                    </div> 
                                </div>
                                {gradLevel === 'Προπτυχιακές    Σπουδές' ?
                                <div className="more">
                                    <div className="more_message">Παρακαλώ εισάγετε τα <span> ΠΡΟΑΠΑΙΤΟΥΜΕΝΑ </span> μαθήματα :</div>
                                    <div className="column" id='Prerequisites'>
                                            <div className="form_group"  style={{marginBottom:'2.5rem'}}> 
                                                <Select                                                        
                                                    onInputChange={{backgroundColor:'red'}}
                                                    className='form_control2'                                                                                                                 
                                                    isMulti
                                                    name="colors" 
                                                    options={studyProgramInfo.semester !== '' ? prerequisitesOptions : [{value:"-", label:"Παρακαλώ επιλέξτε πρώτα το Εξάμηνο !", isDisabled: true}]}       
                                                    placeholder='Προαπαιτούμενα Μαθήματα'
                                                    onChange={(e) => setStudyProgramInfo({...studyProgramInfo, prerequisites: (e.map(a => a.value))})}                                                        
                                                />                                  
                                            </div>                                            
                                    </div> 
                                </div>  : null}                               
                            </div>
                            <div className='button_container' style={{ marginTop: "2rem" }}>
                                <div className={submitButton} 
                                    onMouseEnter={() => setSubmitButton('submit_button')}
                                    onMouseLeave={() => setSubmitButton('submit_button loading')}>
                                    <SystemUpdateAltIcon className='buttonIcon' />
                                    <span className='text'>
                                        Υποβολή των ανανεωμένων στοιχείων !
                                    </span>
                                    <span className='loading-animate'></span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div> : currPopUpWindow === 'CourseManagementInfo_form' ?  
        <div className="section_body"  style={{paddingTop:'2rem', margin:'0 5px'}}>
             <div className="container_fluid">
                 <div className="tab_pane">
                     <div className="card_courseManagementInfo" id='COURSE_MANAGEMENT' onMouseEnter={()=>{setCourseManagerActive('mui_icon3 active'); setCourseManagerActiveForm('mui_icon3Form active')}} onMouseLeave={()=>{setCourseManagerActive('mui_icon3'); setCourseManagerActiveForm('mui_icon3Form')}}>
                         <div className="card_header">
                             <ManageAccountsIcon className={courseManagerActiveForm}/>
                             <div className="card_title">ΥΠΕΥΘΥΝΟΣ ΚΑΙ ΔΙΔΑΣΚΩΝ ΜΑΘΗΜΑΤΟΣ</div>                              
                         </div>
                         <div className="card_body">
                             {/* COURSE MANAGER */}
                             <ul className="course_manager_form">
                                 <li>
                                     <div className="title">ΥΠΕΥΘΥΝΟΣ</div>
                                     <div className="li_content">
                                         <div className="row_courses">
                                             <div className="column" id='manager_FirstName'>
                                                 <div className="form_group"> 
                                                     <input className='form_control' label='manager_FirstName' value={COURSE_DIRECTOR.director_FirstName} required
                                                             onChange={(e)=>{handleClickInput(e.target.value, 'manager_FirstName'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_FirstName:e.target.value});
                                                                             document.getElementById('manager_FirstName').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                     <div className='labeline'>Όνομα Υπεύθυνου</div>                                               
                                                 </div>
                                                 <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                             </div>
                                             <div className="column" id='manager_LastName'>
                                                 <div className="form_group"> 
                                                     <input className='form_control' label='manager_LastName' value={COURSE_DIRECTOR.director_LastName}  required
                                                             onChange={(e)=>{handleClickInput(e.target.value, 'manager_LastName'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_LastName:e.target.value})
                                                                       document.getElementById('manager_LastName').getElementsByClassName('error')[0].style.display = 'none';}}></input>  
                                                     <div className='labeline'>Επώνυμο Υπεύθυνου</div>                                               
                                                 </div>
                                                 <div className="error">*Το πεδίο είναι υποχρεωτικό!</div> 
                                             </div>                                                
                                         </div>
                                         <div className="row_courses">
                                             <div className="column"  id='manager_Email'>
                                                 <div className="form_group"> 
                                                     <input className='form_control' label='manager_Email' value={COURSE_DIRECTOR.director_Email}  required
                                                             onChange={(e)=>{handleClickInput(e.target.value, 'manager_Email'); setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_Email:e.target.value})
                                                                             document.getElementById('manager_Email').getElementsByClassName('error')[0].style.display = 'none';
                                                                             document.getElementById('manager_Email').getElementsByClassName('errorValid')[0].style.display = 'none'; }}></input>  
                                                     <div className='labeline'>Email Υπεύθυνου</div>                                               
                                                 </div>
                                                 <div className="error">*Το πεδίο είναι υποχρεωτικό!</div>   
                                                 <div className="errorValid">*Το Email δεν είναι έγκυρο!</div>   
                                             </div>
                                             <div className="column" id='manager_Type'>
                                                 <div className="form_group" > 
                                                     <select className="form_control" label='manager_Type' value={COURSE_DIRECTOR.director_ProfessorType} 
                                                             style = {{border:'0.1px solid #5ac0d9', outline:'2px solid hsla(184, 56%, 68%, 0.369)'}}
                                                             onChange={(e)=>{handleClickInput(e.target.value,'manager_Type'); 
                                                                             setCOURSEDIRECTOR({...COURSE_DIRECTOR, director_ProfessorType:e.target.value});}}>
                                                         <option value='' style={{display:'none'}}></option> 
                                                         <option value={'ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                        <option value={'ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                        <option value={'ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                        <option value={'ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                        <option value={'Ε.ΔΙ.Π'}>Ε.ΔΙ.Π</option>
                                                        <option value={'Δ.Ε.Π'}>Δ.Ε.Π.</option>
                                                        <option value={'Ε.Ε.Π.'}>Ε.Ε.Π.</option>
                                                        <option value={'ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80'}>ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80</option>
                                                        <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ</option>
                                                        <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ</option>
                                                        <option value={'ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ'}>ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ</option>
                                                        <option value={'ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ'}>ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ</option>
                                                        <option value={'ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                        <option value={'ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                     </select>
                                                     <div className='labeline'>Τίτλος Υπεύθυνου</div>                                               
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </li>
                             </ul>
                             {/* COURSE INSTRUCTORS */}
                             {[...Array(courseManageInfo.COURSE_INSTRUCTORS.length)].map((value, index) => ( 
                             <ul className="course_manager_form" style={{marginTop :'-1.5rem'}} key={index}>
                                 <li>                             
                                     <div className="li_content" style={{marginLeft:'-3%', marginTop:'2rem'}}>
                                         <div className="row_courses">
                                             <div className="column"  id={'instructor_FirstName'+index}>
                                                 <div className="form_group">  
                                                     <input className='form_control' label='instructor_FirstName'  value={COURSE_INSTRUCTOR[index]?.instructor_FirstName || ""}  
                                                             onChange={(e)=>{handleClickInputInstructor(e.target.value, index, 'instructor_FirstName'); instructorManage(index, e.target.value,'instructor_FirstName')}}></input>  
                                                     <div className='labeline'>Όνομα Διδάσκοντα</div>                                               
                                                 </div>
                                             </div>
                                             <div className="column" id={'instructor_LastName'+index}>
                                                 <div className="form_group"> 
                                                     <input className='form_control' label='instructor_LastName' value={COURSE_INSTRUCTOR[index]?.instructor_LastName || ""}  
                                                             onChange={(e)=>{handleClickInputInstructor(e.target.value, index,  'instructor_LastName');  instructorManage(index, e.target.value,'instructor_LastName')}}></input>  
                                                     <div className='labeline'>Επώνυμο Διδάσκοντα</div>                                               
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="row_courses">
                                             <div className="column" id={'instructor_EmailId'+ index}>
                                                 <div className="form_group"> 
                                                     <input className='form_control' label='instructor_Email' value={COURSE_INSTRUCTOR[index]?.instructor_Email || ""} 
                                                             onChange={(e)=>{ handleClickInputInstructor( e.target.value, index, 'instructor_Email'); instructorManage(index, e.target.value,'instructor_Email') 
                                                             setCOURSEINSTRUCTOR({COURSE_INSTRUCTOR: COURSE_INSTRUCTOR.map((val, idx) => index === idx ? {instructor_FirstName:val.instructor_FirstName, instructor_LastName: val.instructor_LastName, instructor_Email: e.target.value, instructor_director_ProfessorType : val.instructor_director_ProfessorType} :  val)});
                                                                             document.getElementById('instructor_EmailId'+ index).getElementsByClassName('errorValid')[0].style.display = 'none';}}></input>  
                                                     <div className='labeline'>Email Διδάσκοντα</div>                                               
                                                 </div>
                                                 <div className="errorValid">*Το Email δεν είναι έγκυρο!</div>  
                                                 <div className="error">*Υπάρχει ήδη διδάσκων με το συγκεκριμένο Email !</div> 
                                             </div>
                                             <div className="column"  id={'instructor_TypeId'+index}>
                                                 <div className="form_group"> 
                                                     <select className="form_control" label='instructor_Type' value={COURSE_INSTRUCTOR[index]?.instructor_director_ProfessorType || ""} 
                                                                {...handleClickInputInstructor(courseManageInfo.COURSE_INSTRUCTORS[index].instructor_director_ProfessorType, index, 'instructor_director_ProfessorType')}
                                                                onChange={(e)=>{handleClickInputInstructor(e.target.value, index, 'instructor_director_ProfessorType') ; instructorManage(index, e.target.value,'instructor_director_ProfessorType')   }}>
                                                             <option value='' style={{display:'none'}}></option> 
                                                             <option value={'ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                            <option value={'ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΝΑΠΛΗΡΩΤΗΣ/ΤΡΙΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                            <option value={'ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΕΠΙΚΟΥΡΟΣ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                            <option value={'ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΟΜΟΤΙΜΟΣ/Η ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                            <option value={'Ε.ΔΙ.Π'}>Ε.ΔΙ.Π</option>
                                                            <option value={'Δ.Ε.Π'}>Δ.Ε.Π.</option>
                                                            <option value={'Ε.Ε.Π.'}>Ε.Ε.Π.</option>
                                                            <option value={'ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80'}>ΣΥΜΒΑΣΙΟΥΧΟΣ ΠΔ 407/80</option>
                                                            <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ</option>
                                                            <option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΣ/Η ΔΙΔΑΣΚΩΝ/ΟΥΣΑ ΜΕΤΑΠΤΥΧΙΑΚΟΥ</option>
                                                            <option value={'ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ'}>ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ</option>
                                                            <option value={'ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ'}>ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ</option>
                                                            <option value={'ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΑΦΥΠΗΡΕΤΗΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                            <option value={'ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ'}>ΔΙΑΤΕΛΕΣΑΣ/ΣΑΣΑ ΚΑΘΗΓΗΤΗΣ/ΤΡΙΑ</option>
                                                         </select>
                                                     <div className='labeline'>Τίτλος Διδάσκοντα</div>                                               
                                                 </div>
                                             </div>
                                         </div>
                                         {index === 0 ?
                                         <div className="row_btn">                                            
                                             <div className="removeInstructor">     
                                                 <div className="text">Ο Υπεύθυνος και ο Διδάσκων του Μαθήματος θα ταυτίζονται!</div>
                                                 <button className="btn_remove"                                                            
                                                     onClick={() => {   
                                                        instructorManage(0, COURSE_DIRECTOR.director_FirstName,'instructor_FirstName')
                                                        instructorManage(0, COURSE_DIRECTOR.director_LastName,'instructor_LastName')
                                                        instructorManage(0, COURSE_DIRECTOR.director_Email,'instructor_Email')
                                                        instructorManage(0, COURSE_DIRECTOR.director_ProfessorType,'instructor_director_ProfessorType') }}
                                                 ><PersonRemoveAlt1Icon/></button>  
                                             </div>
                                         </div> : null}
                                     </div>
                                     <div className="title_instructor">ΔΙΔΑΣΚΩΝ {index+1}</div>
                                 </li>
                             </ul> ))}
                         </div>
                         <div className='button_container' style={{ marginTop: "2rem" }}>
                            <div className={submitButton} 
                                onMouseEnter={() => setSubmitButton('submit_button')}
                                onMouseLeave={() => setSubmitButton('submit_button loading')}
                                onClick={()=>prepareCousreInsertion()}>
                                <SystemUpdateAltIcon className='buttonIcon' />
                                <span className='text'>
                                    Υποβολή των ανανεωμένων στοιχείων !
                                </span>
                                <span className='loading-animate'></span>
                            </div>
                        </div>
                     </div>                     
                 </div>
             </div> 
         </div> : currPopUpWindow === 'MoreInfo_form' ?   
         <div className="section_body"  style={{paddingTop:'2rem', margin:'0 5px'}}>
         <div className="container_fluid">
             <div className="tab_pane">
                 <div className="card_moreInfo" id='MORE_INFO' onMouseEnter={()=>{setMoreInfoActive('mui_icon4 active'); setMoreInfoActiveForm('mui_icon4Form active')}} onMouseLeave={()=>{setMoreInfoActive('mui_icon4'); setMoreInfoActiveForm('mui_icon4Form')}}>
                     <div className="card_header">
                         <WidgetsIcon className={moreInfoActiveForm}/>
                         <div className="card_title">ΕΠΙΠΛΕΟΝ ΣΤΟΙΧΕΙΑ ΜΑΘΗΜΑΤΟΣ</div> 
                     </div>
                     <div className="card_body">    
                             <div className="row_courses">
                                  {/*STUDENTS ATTENDANCE NUMBER*/}
                                 <div className="column" id='StudentsCurrAttendanceNum'>
                                         <div className="form_group">
                                             <input className='form_control' label='StudentsCurrAttendanceNum' type="number" min="0" value={moreInfo.students_curr_attendance_num}  
                                                 onChange={(e)=>{handleClickInput(e.target.value, 'StudentsCurrAttendanceNum'); setMoreInfo({...moreInfo, students_curr_attendance_num:(e.target.value).toString()})}}></input>  
                                             <div className='labeline'>Αρ. Εγγεγραμμένων Φοιτητών</div>                                               
                                         </div>                                            
                                 </div> 
                             </div>
                             <div className="row_courses">
                                  {/*COURSE ACTIVE*/}
                                 <div className="column"  id='CourseActive'>
                                         <div className="courseActive">
                                             <div className='labeline' style={{color: newCourseInfo.More.course_active ? '#2e9eb0' :'rgb(123, 122, 122)' }}>Το μάθημα θα διδάσκεται το {currYearSemester} εξάμηνο του τρέχοντος ακαδημαϊκού έτους {currAcademicYear}: </div>                                               
                                             <div className="above_checkbox"> 
                                                 <input className='checkbox' label='CourseActive' type="checkbox" checked={moreInfo.course_active} style={{background:newCourseInfo.More.course_active ? '#2e9eb0': '#e6e6e6'}} 
                                                     onChange = {(e)=>{document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color === 'rgb(123, 122, 122)' ? document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color = '#2e9eb0' : document.getElementById('CourseActive').getElementsByClassName('labeline')[0].style.color = 'rgb(123, 122, 122)' ; 
                                                                     document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background === 'rgb(230, 230, 230)' ? document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background = '#2e9eb0' : document.getElementById('CourseActive').getElementsByClassName('checkbox')[0].style.background = '#e6e6e6';
                                                                     setMoreInfo({...moreInfo, course_active:!moreInfo.course_active})}}></input>                                                         
                                             </div>
                                         </div>                                            
                                 </div> 
                             </div>
                         </div>                                                    
                         <div className='button_container' style={{ marginTop: "2rem" }}>
                            <div className={submitButton} 
                                onMouseEnter={() => setSubmitButton('submit_button')}
                                onMouseLeave={() => setSubmitButton('submit_button loading')}
                                onClick={()=>prepareCousreInsertion()}>
                                <SystemUpdateAltIcon className='buttonIcon' />
                                <span className='text'>
                                    Υποβολή των ανανεωμένων στοιχείων !
                                </span>
                                <span className='loading-animate'></span>
                            </div>
                        </div>
                 </div>
             </div>
         </div> 
         </div>        
        : null }           
        </div> 
        </div> </div> </div>
        } 
              
    </div>
    ) 
}

export default AddCourseContainer;