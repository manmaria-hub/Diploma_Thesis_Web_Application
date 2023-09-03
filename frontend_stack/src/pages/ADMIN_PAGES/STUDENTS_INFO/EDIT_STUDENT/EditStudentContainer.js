import React , {useEffect, useMemo, useState} from 'react';   
import { useLocation } from 'react-router-dom';
import { Avatar, Divider, SpeedDial, SpeedDialIcon, SpeedDialAction} from '@mui/material'; 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';  
import Box from '@mui/material/Box';
import {Form , Col, Row} from 'react-bootstrap';
import { Stepper, Step, StepLabel, StepContent, Button, Paper} from "@material-ui/core"; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";
import Radio from '@mui/material/Radio';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';   
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'; 
import InputGroup from 'react-bootstrap/InputGroup';
import IconButton from '@mui/material/IconButton'; 
import validator from 'validator';  
import Select from "react-select";

// Icons 
import STUDENTS from '../../../../../src/Icons/STUDENTS/students.jpeg';
import UTH_LOGO from '../../../../../src/Icons/uth-logo-background.png'; 
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {FaUserGraduate, FaEdit} from 'react-icons/fa';
import { FcSearch } from 'react-icons/fc';
import {IoMdInformationCircleOutline} from 'react-icons/io';
import {FcOk, FcHighPriority} from 'react-icons/fc';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'; 
import EditIcon from '@mui/icons-material/Edit';


// GraphQL Resolvers
import professorsResolvers from '../../../../graphql/resolvers/professors';
import studentResolvers from '../../../../graphql/resolvers/student';

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/STUDENTS/EDIT_STUDENT/editStudentContainer.scss';  


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
		{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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


const EditStudentContainer = (props) => { 

	const location= useLocation();
	let editUsername = location?.state?.editUsername; 
	
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	  }

    // State Variable for the student that we want to edit 
	let [editStudent, setEditStudent] = useState({username : editUsername, state : editUsername });
	// State Variable for the professor info data tha we want to edit 
	let [editStudentData, setEditStudentData] = useState(null);
	// State Variable for query elastic search database's students by usernames
	let [allStudents, setAllStudents] = useState([]);
	let [studentsArray, setStudentsArray] = useState([]);

	// Speed Dial
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


	// State Variable for the new student's data
	let [studentInfo_PersonalInfo, setStudentInfo_PersonalInfo] = useState({		
		Student_Insurance : { AMKA_number :'', AFM_number:'', DOY_number:'', AMKA_country:'Ελλάδα', AFM_country:'Ελλάδα'},
		Personal_Information : {last_name : '', first_name : '', dot_father_name:'', father_FirstName:'', father_LastName:'', maiden_name:'', mother_FirstName:'', mother_LastName:'', spouse_name:'', profession:'', mother_profession:'', father_profession:'', family:'', username:'', personal_title:'', website:'', student_identity:'', active: true, fulfilled_military_obligations:'',  gender:'', sex:'', notations:''},
		Birth_Details : {birth_date: '', gender:'', birth_prefecture:'', birth_country:'Ελλάδα', birth_location:''},
		Student_Identity : {identity_type: '', citizenship:[], citizen:'', identity_number:'', citizen_number:'', published_principle:'', publish_date:'', nationality:[], nationality_second:[], male_record_num:'', male_record_perf:'', male_record_gr:'', male_record_loc:'', male_record_country:'Ελλάδα'},
		Student_Address : {road:'', rd_number:'', city:'', location:'', country:'Ελλάδα', acting_address:'', postcode:'', telephone:'', mobile_phone:'', uth_email:'', alternative_email:''},
		Third_Person_Contact_Details : {contact_type : '', person_FirstName:'', person_LastName:'', person_address:'', person_telephone:'', person_mobilephone:'', person_email:''}
	});
	let [studentInfo_StudentshipInfo, setStudentInfo_StudentshipInfo] = useState({ 
		General_Information: {department:'TMHMA ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ KAI ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ', department_number:'501', course:'ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ', course_number:'128', academic_email:'', student_situation:true, current_academic_year:'', current_academic_semester:'', current_attendance_period:'', academic_record_number:'', general_academic_record_number:'', academic_identity:'', course_program_part:'', course_program_subpart:'', education_number:'', second_course_program_part:'', second_course_program_subpart:'', comment_to_student:'', total_fees:'', sub_attendance:false},
		Registration_Details : {registration_year:'', registration_semester: '', registration_period:'', registration_way:'ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ'},
		Professor_Advisor_Details : {professorAdvisor_FirstName:'', professorAdvisor_LastName:'', professorAdvisor_Email:''},
		Grade_State : {totalNumber_successCourses : 0, totalNumber_failedCourses:0, totalNumber_succesCompulsoryCourses : 0, totalNumber_failedCompulsoryCourses : 0, totalNumber_succesElectiveCourses : 0, totalNumber_failedElectiveCourses : 0,  ECTS_total:0 , ECTS_compulsoryCourses:0, ECTS_electiveCourses: 0, units_compulsoryCourses:0, units_electiveCourses:0, units_total :0, grade_average:0}
	}) 

	// Default State Variable for the new student's data
	let studentInfo_PersonalInfo_default = useMemo(() => ({	
		Student_Insurance : { AMKA_number :'', AFM_number:'', DOY_number:'', AMKA_country:'Ελλάδα', AFM_country:'Ελλάδα'},
		Personal_Information : {last_name : '', first_name : '', dot_father_name:'', father_FirstName:'', father_LastName:'', maiden_name:'', mother_FirstName:'', mother_LastName:'', spouse_name:'', profession:'', mother_profession:'', father_profession:'', family:'', username:'', personal_title:'', website:'', student_identity:'', active: false, fulfilled_military_obligations:'',  gender:'', sex:'', notations:''},
		Birth_Details : {birth_date: '', gender:'', birth_prefecture:'', birth_country:'Ελλάδα', birth_location:''},
		Student_Identity : {identity_type: '', citizenship:[], citizen:'', identity_number:'', citizen_number:'', published_principle:'', publish_date:'', nationality:[], nationality_second:[], male_record_num:'', male_record_perf:'', male_record_gr:'', male_record_loc:'', male_record_country:'Ελλάδα'},
		Student_Address : {road:'', rd_number:'', city:'', location:'', country:'Ελλάδα', acting_address:'', postcode:'', telephone:'', mobile_phone:'', uth_email:'', alternative_email:''},
		Third_Person_Contact_Details : {contact_type : '', person_FirstName:'', person_LastName:'', person_address:'', person_telephone:'', person_mobilephone:'', person_email:''}
	}), []);
	let studentInfo_StudentshipInfo_default =  useMemo(() => ({	
		General_Information: {department:'TMHMA ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ KAI ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ', department_number:'501', course:'ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ', course_number:'128', academic_email:'', student_situation:true, current_academic_year:'', current_academic_semester:'', current_attendance_period:'', academic_record_number:'', general_academic_record_number:'', academic_identity:'', course_program_part:'', course_program_subpart:'', education_number:'', second_course_program_part:'', second_course_program_subpart:'', comment_to_student:'', total_fees:'', sub_attendance:false},
		Registration_Details : {registration_year:'', registration_semester: '', registration_period:'', registration_way:'ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ'},
		Professor_Advisor_Details : {professorAdvisor_FirstName:'', professorAdvisor_LastName:'', professorAdvisor_Email:''},
		Grade_State : {totalNumber_successCourses :0, totalNumber_failedCourses:0, totalNumber_succesCompulsoryCourses : 0, totalNumber_failedCompulsoryCourses : 0, totalNumber_succesElectiveCourses : 0, totalNumber_failedElectiveCourses : 0, ECTS_total:0 , ECTS_compulsoryCourses:0, ECTS_electiveCourses: 0, units_total :0,  units_compulsoryCourses:0, units_electiveCourses:0, grade_average: 0}
	}), []);
	
	// State Variable for newAdd button hovering
	const [isHovering, setIsHovering] = useState(false);

	// State Variable that determines the state of success adding action
	let [isAdding, setIsAdding] = useState(false); 
 
	// Variable that keeps the current date value 
	let currentDate = new Date();

	// State variable that handles the next button click (FIRST FORM)
	const [firstFormButton, setFirstFormButton] = useState({button1:false, button2:false, button3:false, button4:false, button5:false, button6:false})
	const [isValidFirstForm, setIsValidFirstForm] = useState({form1:'unvalid', form2:'unvalid', form3:'unvalid', form4:'unvalid', form5:'unvalid', form6:'unvalid'});

	// State variable that handles the next button click (SECOND FORM)
	const [secondFormButton, setSecondFormButton] = useState({button1:false, button2:false, button3:false, button4:false})
	const [isValidSecondForm, setIsValidSecondForm] = useState({form1:'unvalid', form2:'unvalid', form3:'unvalid', form4: 'unvalid'});

	// State variable that keeps all the database's professors
	const [allProfessors, setAllProfessors] = useState([]);

	// Collect all the database's professors using the corresponding resolver
	if (allProfessors.length === 0) {
		professorsResolvers.get_all_professors()
			.then(result => {
				let profArray = [];
				result?.data?.getAllProfessors.forEach(prof => {
					profArray.push({prof_first: prof.PERSONAL_INFO.first_name, prof_last: prof.PERSONAL_INFO.last_name, prof_email:prof.ACADEMIC_INFO.academic_email});
				})				 
				setAllProfessors(profArray)
			})
			.catch(err=> {
				throw err;
			})
	}
     
	// State Variable that determines the state of complete button
	const [readyToComplete, setReadyToComplete] = useState(false);

	// State Variable that determines the existence of student by AEM (student's AEMs must be uniques)
	const [existStudentByAEM, setExistStudentByAEM] = useState(false);
	// State Variable that determines the existence of student by username (student's usernames must be uniques)
	const [existStudentByUsername, setExistStudentByUsername] = useState(false);
	// State Variable that determines the existence of student by uth_email (student's university emails must be uniques)
	const [existStudentByUthEmail, setExistStudentByUthEmail] = useState(false);
	// State Variable that determines the existence of student by Student Identity (student's identities must be uniques)
	const [existStudentByStudentIdentity, setExistStudentByStudentIdentity] = useState(false);
	// State Variable that determines the existence of student by AMKA (student's AMKAs must be uniques)
	const [existStudentByAMKA, setExistStudentByAMKA] = useState(false);
	// State Variable that determines the existence of student by AFM (student's AFMs must be uniques)
	const [existStudentByAFM, setExistStudentByAFM] = useState(false);

	const theme = useTheme(); 

    // Tabs Handling
    const [value, setValue] = React.useState(0); 

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
	
	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '90.7%',
		},
		button : {
			marginTop: '5rem',
			marginRight: '5rem',
		},
		actionsContainer: {
			marginBottom: '3rem',
		},
		resetContainer: {
			padding: '2rem',
		},

	}),
);

useEffect(() => {
	if (editStudentData?.Personal_Info?.Personal_Information?.username !== null && editStudentData?.Personal_Info?.Personal_Information?.username !== undefined) {
		setStudentInfo_PersonalInfo(studentInfo_PersonalInfo => ({
			...studentInfo_PersonalInfo, 
		Student_Insurance : { AMKA_number : editStudentData?.Personal_Info?.Student_Insurance?.AMKA_number, 
							  AFM_number: editStudentData?.Personal_Info?.Student_Insurance?.AFM_number, 
							  DOY_number: editStudentData?.Personal_Info?.Student_Insurance?.DOY_number,
							  AMKA_country: editStudentData?.Personal_Info?.Student_Insurance?.AMKA_country,  
							  AFM_country: editStudentData?.Personal_Info?.Student_Insurance?.AFM_country},
		Personal_Information : {last_name : editStudentData?.Personal_Info?.Personal_Information?.last_name, 
			                    first_name : editStudentData?.Personal_Info?.Personal_Information?.first_name, 
								dot_father_name: editStudentData?.Personal_Info?.Personal_Information?.dot_father_name, 
								father_FirstName: editStudentData?.Personal_Info?.Personal_Information?.father_FirstName, 
								father_LastName: editStudentData?.Personal_Info?.Personal_Information?.father_LastName, 
								maiden_name: editStudentData?.Personal_Info?.Personal_Information?.maiden_name, 
								mother_FirstName: editStudentData?.Personal_Info?.Personal_Information?.mother_FirstName, 
								mother_LastName: editStudentData?.Personal_Info?.Personal_Information?.mother_LastName, 
								spouse_name: editStudentData?.Personal_Info?.Personal_Information?.spouse_name, 
								profession: editStudentData?.Personal_Info?.Personal_Information?.profession, 
								mother_profession: editStudentData?.Personal_Info?.Personal_Information?.mother_profession, 
								father_profession: editStudentData?.Personal_Info?.Personal_Information?.father_profession, 
								family: editStudentData?.Personal_Info?.Personal_Information?.family, 
								username: editStudentData?.Personal_Info?.Personal_Information?.username, 
								personal_title: editStudentData?.Personal_Info?.Personal_Information?.personal_title, 
								website: editStudentData?.Personal_Info?.Personal_Information?.website, 
								student_identity: editStudentData?.Personal_Info?.Personal_Information?.student_identity, 
								active: editStudentData?.Personal_Info?.Personal_Information?.active, 
								fulfilled_military_obligations: editStudentData?.Personal_Info?.Personal_Information?.fulfilled_military_obligations,  
								gender: editStudentData?.Personal_Info?.Personal_Information?.gender, 
								sex: editStudentData?.Personal_Info?.Personal_Information?.sex, 
								notations: editStudentData?.Personal_Info?.Personal_Information?.notations},
		Birth_Details : {birth_date: editStudentData?.Personal_Info?.Birth_Details?.birth_date,
			             gender: editStudentData?.Personal_Info?.Birth_Details?.gender,
						 birth_prefecture: editStudentData?.Personal_Info?.Birth_Details?.birth_prefecture, 
						 birth_country: editStudentData?.Personal_Info?.Birth_Details?.birth_country, 
						 birth_location: editStudentData?.Personal_Info?.Birth_Details?.birth_location},
		Student_Identity : {identity_type: editStudentData?.Personal_Info?.Student_Identity?.identity_type, 
			                citizenship: editStudentData?.Personal_Info?.Student_Identity?.citizenship, 
							citizen: editStudentData?.Personal_Info?.Student_Identity?.citizen, 
							identity_number: editStudentData?.Personal_Info?.Student_Identity?.identity_number, 
							citizen_number: editStudentData?.Personal_Info?.Student_Identity?.citizen_number, 
							published_principle: editStudentData?.Personal_Info?.Student_Identity?.published_principle, 
							publish_date: editStudentData?.Personal_Info?.Student_Identity?.publish_date, 
							nationality: editStudentData?.Personal_Info?.Student_Identity?.nationality, 
							nationality_second: editStudentData?.Personal_Info?.Student_Identity?.nationality_second, 
							male_record_num: editStudentData?.Personal_Info?.Student_Identity?.male_record_num, 
							male_record_perf: editStudentData?.Personal_Info?.Student_Identity?.male_record_perf, 
							male_record_gr: editStudentData?.Personal_Info?.Student_Identity?.male_record_gr, 
							male_record_loc: editStudentData?.Personal_Info?.Student_Identity?.male_record_loc, 
							male_record_country:editStudentData?.Personal_Info?.Student_Identity?.male_record_country},
		Student_Address : {road: editStudentData?.Personal_Info?.Student_Address?.road, 
			               rd_number: editStudentData?.Personal_Info?.Student_Address?.rd_number, 
						   city: editStudentData?.Personal_Info?.Student_Address?.city, 
						   location: editStudentData?.Personal_Info?.Student_Address?.location, 
						   country: editStudentData?.Personal_Info?.Student_Address?.country, 
						   acting_address: editStudentData?.Personal_Info?.Student_Address?.acting_address, 
						   postcode: editStudentData?.Personal_Info?.Student_Address?.postcode, 
						   telephone: editStudentData?.Personal_Info?.Student_Address?.telephone, 
						   mobile_phone: editStudentData?.Personal_Info?.Student_Address?.mobile_phone, 
						   uth_email: editStudentData?.Personal_Info?.Student_Address?.uth_email, 
						   alternative_email: editStudentData?.Personal_Info?.Student_Address?.alternative_email},
		Third_Person_Contact_Details : {contact_type : editStudentData?.Personal_Info?.Third_Person_Contact_Details?.contact_type, 
			                            person_FirstName: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_FirstName, 
										person_LastName: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_LastName, 
										person_address: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_address, 
										person_telephone: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_telephone, 
										person_mobilephone: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_mobilephone, 
										person_email: editStudentData?.Personal_Info?.Third_Person_Contact_Details?.person_email}
		}))	 
		setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({
			...studentInfo_StudentshipInfo,
			General_Information: {department: editStudentData?.Studentship_Info?.General_Information?.department, 
								department_number: editStudentData?.Studentship_Info?.General_Information?.department_number, 
								course: editStudentData?.Studentship_Info?.General_Information?.course, 
								course_number: editStudentData?.Studentship_Info?.General_Information?.course_number, 
								academic_email: editStudentData?.Studentship_Info?.General_Information?.academic_email, 
								student_situation: editStudentData?.Studentship_Info?.General_Information?.student_situation, 
								current_academic_year: editStudentData?.Studentship_Info?.General_Information?.current_academic_year, 
								current_academic_semester: editStudentData?.Studentship_Info?.General_Information?.current_academic_semester, 
								current_attendance_period: editStudentData?.Studentship_Info?.General_Information?.current_attendance_period, 
								academic_record_number: editStudentData?.Studentship_Info?.General_Information?.academic_record_number, 
								general_academic_record_number: editStudentData?.Studentship_Info?.General_Information?.general_academic_record_number, 
								academic_identity: editStudentData?.Studentship_Info?.General_Information?.academic_identity, 
								course_program_part: editStudentData?.Studentship_Info?.General_Information?.course_program_part, 
								course_program_subpart: editStudentData?.Studentship_Info?.General_Information?.course_program_subpart, 
								education_number: editStudentData?.Studentship_Info?.General_Information?.education_number, 
								second_course_program_part: editStudentData?.Studentship_Info?.General_Information?.second_course_program_part, 
								second_course_program_subpart: editStudentData?.Studentship_Info?.General_Information?.second_course_program_subpart, 
								comment_to_student: editStudentData?.Studentship_Info?.General_Information?.comment_to_student, 
								total_fees: editStudentData?.Studentship_Info?.General_Information?.total_fees, 
								sub_attendance: editStudentData?.Studentship_Info?.General_Information?.sub_attendance},
			Registration_Details : {registration_year: editStudentData?.Studentship_Info?.Registration_Details?.registration_year, 
									registration_semester: editStudentData?.Studentship_Info?.Registration_Details?.registration_semester, 
									registration_period: editStudentData?.Studentship_Info?.Registration_Details?.registration_period, 
									registration_way: editStudentData?.Studentship_Info?.Registration_Details?.registration_way},
			Professor_Advisor_Details : {professorAdvisor_FirstName: editStudentData?.Studentship_Info?.Professor_Advisor_Details?.professorAdvisor_FirstName, 
										professorAdvisor_LastName: editStudentData?.Studentship_Info?.Professor_Advisor_Details?.professorAdvisor_LastName, 
										professorAdvisor_Email: editStudentData?.Studentship_Info?.Professor_Advisor_Details?.professorAdvisor_Email},
			Grade_State : {totalNumber_successCourses : editStudentData?.Studentship_Info?.Grade_State?.totalNumber_successCourses, 
						totalNumber_failedCourses: editStudentData?.Studentship_Info?.Grade_State?.totalNumber_failedCourses, 
						totalNumber_succesCompulsoryCourses : editStudentData?.Studentship_Info?.Grade_State?.totalNumber_succesCompulsoryCourses, 
						totalNumber_failedCompulsoryCourses : editStudentData?.Studentship_Info?.Grade_State?.totalNumber_failedCompulsoryCourses,  
						totalNumber_succesElectiveCourses : editStudentData?.Studentship_Info?.Grade_State?.totalNumber_succesElectiveCourses, 
						totalNumber_failedElectiveCourses : editStudentData?.Studentship_Info?.Grade_State?.totalNumber_failedElectiveCourses,  
						ECTS_total: editStudentData?.Studentship_Info?.Grade_State?.ECTS_total,  
						ECTS_compulsoryCourses: editStudentData?.Studentship_Info?.Grade_State?.ECTS_compulsoryCourses, 
						ECTS_electiveCourses: editStudentData?.Studentship_Info?.Grade_State?.ECTS_electiveCourses,  
						units_compulsoryCourses: editStudentData?.Studentship_Info?.Grade_State?.units_compulsoryCourses, 
						units_electiveCourses: editStudentData?.Studentship_Info?.Grade_State?.units_electiveCourses, 
						units_total : editStudentData?.Studentship_Info?.Grade_State?.units_total,
						grade_average: editStudentData?.Studentship_Info?.Grade_State?.grade_average}
			
		}))
	}

}, [editStudentData, editStudent.username])

// Alert for Speed Dial
const [openAlertSubmit, setOpenAlertSubmit] = React.useState(false); 
 
const handleCloseAlertSubmit = (event, reason) => {
	if (reason === 'clickaway') {
		return;
	}
	setOpenAlertSubmit(false);
}; 

let [academicYear , setAcademicYear] = useState('') 
if (academicYear === '') {
	const current_date = new Date();
	const currYear = current_date.getFullYear();
	const currMonth = current_date.getMonth() + 1;
	if (currMonth > 9 && currMonth < 2) { 
		setAcademicYear(currYear);
	}
	else { 
		setAcademicYear(currYear - 1);
	} 

}		

const changeSemester = () => { 
	if (studentsArray.length > 0) {
		studentsArray.forEach(student => {
			let newSemester = Number(student?.Studentship_Info?.General_Information?.current_academic_semester) < 10 ? String(Number(student?.Studentship_Info?.General_Information?.current_academic_semester) + 1) : student?.Studentship_Info?.General_Information?.current_academic_semester;
			student.Studentship_Info.General_Information.current_academic_semester = newSemester;
			let newPeriod = student?.Studentship_Info?.General_Information?.current_attendance_period === 'Χειμερινή' ? 'Εαρινή' : 'Χειμερινή';
			
			student.Studentship_Info.General_Information.current_attendance_period = newPeriod; 
			student.Studentship_Info.General_Information.current_academic_year = Number(academicYear);
		}) 
		studentResolvers.update_all_students(studentsArray)
			.then(result => {
				console.log(result);
				setAllStudents([]);
				setOpenAlertSubmit(true);    
			})
			.catch(err => {
				console.log(err)
			})
	}
} 

	useEffect(() => {
		if (editStudent.state !== undefined) {
			if (studentsArray.length > 0) {
				studentsArray.forEach((student) => {
					if (student.Personal_Info.Personal_Information.username === editStudent.username) {
						setEditStudentData(student);
					}
				})			
			}
		} 
	}, [editStudent.state, studentsArray]) 

	// Setting actions for speed dial
	const actions = [ 
		{ icon: <FaEdit onClick={() => changeSemester()} style={{color:'gray', fontSize:'20px'}} />, name: 'Ανανέωση Εξαμήνου'} 
	];

	const classes = useStyles();
	// First Form : Personal Information
	const [activeStepFirstForm, setActiveStepFirstForm] = React.useState(0);	
	const steps = getSteps(); 

	// Second Form : Studenship Information
	const [activeStepSecondForm, setActiveStepSecondForm] = React.useState(0);	
	const steps_second = getStepsSecond(); 

	// Handling NEXT button for the first form
	const handleNext = () => {
		let isOK=true;
		if (activeStepFirstForm === 0 ) {
			setFirstFormButton({...firstFormButton, button1:true});
			// Check gender
			if (studentInfo_PersonalInfo?.Personal_Information?.gender === '' ||  studentInfo_PersonalInfo?.Personal_Information?.gender === undefined) {
				document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display='block'
				isValidFirstForm.form1 = 'no'
			} 
			isValidFirstForm.form1 === 'unvalid' || isValidFirstForm.form1 === 'no' ? isOK = false : isOK = true;
		
		}
		if (activeStepFirstForm === 1 ) {
			setFirstFormButton({...firstFormButton, button2:true});			 
			isValidFirstForm.form2 === 'unvalid' || isValidFirstForm.form2 === 'no' ? isOK = false : isOK = true;
		}
		if (activeStepFirstForm === 2 ) {
			setFirstFormButton({...firstFormButton, button3:true});
			isValidFirstForm.form3 === 'unvalid' || isValidFirstForm.form3 === 'no' ? isOK = false : isOK = true;			 
		}
		if (activeStepFirstForm === 3 ) {
			setFirstFormButton({...firstFormButton, button4:true}); 
			if (studentInfo_PersonalInfo?.Student_Identity?.citizenship.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.citizenship === undefined) {
		    	document.getElementById('citizenship').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid red'
				document.getElementById('citizenship').getElementsByClassName('errorValue')[0].style.display = 'block'
			}
			isValidFirstForm.form4 === 'unvalid' || isValidFirstForm.form4  === 'no' ? isOK = false : isOK = true;			 
		}
		if (activeStepFirstForm === 4 ) {
			setFirstFormButton({...firstFormButton, button5:true});
			isValidFirstForm.form5 === 'unvalid' || isValidFirstForm.form5  === 'no' ? isOK = false : isOK = true;			 
		}
		if (activeStepFirstForm === 5 ) {
			setFirstFormButton({...firstFormButton, button6:true});
			isValidFirstForm.form6 === 'unvalid' || isValidFirstForm.form6  === 'no' ? isOK = false : isOK = true;	 
		}
		
		if (isOK === true) {   
			setActiveStepFirstForm((prevActiveStep) => prevActiveStep + 1);
		}
	};

	// Handling NEXT button for the second form
	const handleNextSecond = () => {
		let isOK_second = true;
		if (activeStepSecondForm === 0 ) {
			setSecondFormButton({...secondFormButton, button1:true}); 
			if ((studentInfo_StudentshipInfo?.General_Information?.course_program_part === '' || studentInfo_StudentshipInfo?.General_Information?.course_program_part === undefined) && document.getElementById('course_program_part')) {
				document.getElementById('course_program_part').getElementsByClassName('errorValue')[0].style.display = 'block';
				document.getElementById('course_program_part').getElementsByClassName('form-select')[0].style.border = '1px solid red';
			}
			isValidSecondForm.form1 === 'unvalid' || isValidSecondForm.form1 === 'no' ? isOK_second = false : isOK_second = true;
		
		}
		if (activeStepSecondForm === 1 ) {
			setSecondFormButton({...secondFormButton, button2:true}); 
			if ((studentInfo_StudentshipInfo?.Registration_Details?.registration_period === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_period === undefined) && document.getElementById('registration_period')) {
				document.getElementById('registration_period').getElementsByClassName('errorValue')[0].style.display = 'block';
				document.getElementById('registration_period').getElementsByClassName('form-select')[0].style.border = '1px solid red';
			}
			isValidSecondForm.form2 === 'unvalid' || isValidSecondForm.form2 === 'no' ? isOK_second = false : isOK_second = true;
		}
		if (activeStepSecondForm === 2 ) {
			setSecondFormButton({...secondFormButton, button3:true});
			if ((studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName === undefined) && document.getElementById('professorAdvisor_FirstName')) {
				document.getElementById('professorAdvisor_FirstName').getElementsByClassName('errorValue')[0].style.display = 'block';
				document.getElementById('professorAdvisor_FirstName').getElementsByClassName('form-select')[0].style.border = '1px solid red';
			}
			if ((studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName === undefined) && document.getElementById('professorAdvisor_LastName')) {
				document.getElementById('professorAdvisor_LastName').getElementsByClassName('errorValue')[0].style.display = 'block';
				document.getElementById('professorAdvisor_LastName').getElementsByClassName('form-select')[0].style.border = '1px solid red';
			}
			if ((studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email === undefined) && document.getElementById('professorAdvisor_Email')) {
				document.getElementById('professorAdvisor_Email').getElementsByClassName('errorValue')[0].style.display = 'block';
				document.getElementById('professorAdvisor_Email').getElementsByClassName('form-select')[0].style.border = '1px solid red';
			}
			isValidSecondForm.form3 === 'unvalid' || isValidSecondForm.form3 === 'no' ? isOK_second = false : isOK_second = true;			 
		} 
		if (activeStepSecondForm === 3 ) {
			setSecondFormButton({...secondFormButton, button4:true});  
			isValidSecondForm.form4 === 'unvalid' || isValidSecondForm.form4 === 'no' ? isOK_second = false : isOK_second = true;		
		}		
		if (isOK_second === true) {  
			setActiveStepSecondForm((prevActiveSecondStep) => prevActiveSecondStep + 1);
		}
	};

	// Handling BACK button for the first form
	const handleBack = () => {
		setActiveStepFirstForm((prevActiveStep) => prevActiveStep - 1);
	};
	// Handling BACK button for the second form
	const handleBackSecond = () => {
		setActiveStepSecondForm((prevActiveSecondStep) => prevActiveSecondStep - 1);
	};
 
	// Handling the NEW REGISTRATION Button
	const handleReset = () => {
		setActiveStepFirstForm(0);
		setActiveStepSecondForm(0);
		setStudentInfo_PersonalInfo(studentInfo_PersonalInfo_default);
		setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo_default);
		setIsAdding(false);
		setReadyToComplete(false);
	};
	
	// First Form's Steps
	function getSteps() {		 
		return [<b style={activeStepFirstForm === 0 ? {display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Προσωπικά Στοιχεία</b>,
			<b style={activeStepFirstForm === 1 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Ασφαλιστικά Στοιχεία</b>,
			<b style={activeStepFirstForm === 2 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Στοιχεία Γέννησης Προσώπου</b>,
			<b style={activeStepFirstForm === 3 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Ταυτότητα Προσώπου</b>,
			<b style={activeStepFirstForm === 4 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Διεύθυνση Προσώπου</b>,
			<b style={activeStepFirstForm === 5 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Στοιχεία Επαφής Τρίτου Προσώπου</b>];
	}

	// Second Form's Steps
	function getStepsSecond() {		 
		return [<b style={activeStepSecondForm === 0 ? {display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Γενικά Στοιχεία</b>,
			<b style={activeStepSecondForm === 1 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Στοιχεία εισαγωγής</b>,
			<b style={activeStepSecondForm === 2 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Στοιχεία Σύμβουλου Καθηγητή</b>,
			<b style={activeStepSecondForm === 3 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Αρχική Κατάσταση Βαθμολογίας</b>];
	}


	// Handling military obgigations
	const [selectedMilitary, setSelectedMilitary] = React.useState('');

	const handleChangeMilitary = (event) => {
		setSelectedMilitary(event.target.value);
		setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, fulfilled_military_obligations:event.target.value}}) 
	};

	const controlPropsMilitary = (item) => ({
		checked: selectedMilitary === item,
		onChange: handleChangeMilitary,
		value: item,
		name: 'fulfilled-military-obligations',
		inputProps: { 'aria-label': item },
	});

	// Handling gender choices
	const [selectedGender, setSelectedGender] = React.useState('Αρρεν');

	const handleChangeGender = (event) => {
		setSelectedGender(event.target.value);
		setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, gender:event.target.value}}) 
		if (document.getElementById('gender')) {document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}
		setIsValidFirstForm({...isValidFirstForm, form1:'yes'})
		setIsValidFirstForm({...isValidFirstForm, form3:'yes'})
	};

	const controlPropsGender = (item) => ({  
		checked: selectedGender === item,
		onChange: handleChangeGender,
		value: item,
		name: 'gender',
		inputProps: { 'aria-label': item },
	});

	// Handling family choices
	const [selectedFamily, setSelectedFamily] = React.useState('Άγαμος/η');

	const handleChangeFamily = (event) => {
		setSelectedFamily(event.target.value);
		setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, family:event.target.value}}) 
		setIsValidFirstForm({...isValidFirstForm, form1:'yes'})
	};

	const controlPropsFamily = (item) => ({
		checked: selectedFamily === item,
		onChange: handleChangeFamily,
		value: item,
		name: 'family',
		inputProps: { 'aria-label': item },
	});
 
	// Handling Personal Information Changes
	useEffect(()=> {	
		let currDate = new Date();
		if (activeStepFirstForm === 0)	{ 
			if (studentInfo_PersonalInfo?.Personal_Information?.first_name === '' || studentInfo_PersonalInfo?.Personal_Information?.last_name === '' || studentInfo_PersonalInfo?.Personal_Information?.dot_father_name === '' ||
				studentInfo_PersonalInfo?.Personal_Information?.maiden_name === '' || studentInfo_PersonalInfo?.Personal_Information?.father_FirstName === '' || studentInfo_PersonalInfo?.Personal_Information?.mother_FirstName === '' ||
				studentInfo_PersonalInfo?.Personal_Information?.gender === '' || studentInfo_PersonalInfo?.Personal_Information?.username === '' || studentInfo_PersonalInfo?.Personal_Information?.student_identity === '' ||
				(studentInfo_PersonalInfo?.Personal_Information?.username !== '' && studentInfo_PersonalInfo?.Personal_Information?.username !== undefined && existStudentByUsername === true) ||  studentInfo_PersonalInfo?.Personal_Information?.username === undefined ||
				(studentInfo_PersonalInfo?.Personal_Information?.student_identity !== '' && studentInfo_PersonalInfo?.Personal_Information?.student_identity !== undefined && existStudentByStudentIdentity === true) || studentInfo_PersonalInfo?.Personal_Information?.student_identity === undefined ||
				studentInfo_PersonalInfo?.Personal_Information?.active === '') {
				setIsValidFirstForm(isValidFirstForm=> ({...isValidFirstForm, form1:'no'}))			
			}
			else if  (studentInfo_PersonalInfo?.Personal_Information?.first_name !== '' && studentInfo_PersonalInfo?.Personal_Information?.last_name !== '' && studentInfo_PersonalInfo?.Personal_Information?.dot_father_name !== '' &&
				studentInfo_PersonalInfo?.Personal_Information?.maiden_name !== '' && studentInfo_PersonalInfo?.Personal_Information?.mother_FirstName !== '' && studentInfo_PersonalInfo?.Personal_Information?.father_FirstName !== '' && 
				studentInfo_PersonalInfo?.Personal_Information?.gender !== '' && studentInfo_PersonalInfo?.Personal_Information?.username !== '' && existStudentByUsername === false && studentInfo_PersonalInfo?.Personal_Information?.student_identity !== '' && 
				existStudentByStudentIdentity === false && studentInfo_PersonalInfo?.Personal_Information?.active !== '') {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form1:'yes'}))
			}
		}
		else if (activeStepFirstForm === 1) { 
			if (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_country === '' || studentInfo_PersonalInfo?.Student_Insurance?.AMKA_country === undefined) {
				setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AMKA_country:'Ελλάδα'}}); 
			}	
			if (studentInfo_PersonalInfo?.Student_Insurance?.AFM_country === '' || studentInfo_PersonalInfo?.Student_Insurance?.AFM_country ===  undefined) { 
				setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AFM_country:'Ελλάδα'}});
			}
			if (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number === '' || studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number === undefined || 
			    studentInfo_PersonalInfo?.Student_Insurance?.AFM_number === '' || studentInfo_PersonalInfo?.Student_Insurance?.AFM_number === undefined ||
				(studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== '' && studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== undefined && existStudentByAMKA === true) ||
				(studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== '' && studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== undefined && existStudentByAFM === true) ||
				studentInfo_PersonalInfo?.Student_Insurance?.AFM_number.length !== 9 || studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number.length !== 11 ||
				!validator.isNumeric(studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number) || !validator.isNumeric(studentInfo_PersonalInfo?.Student_Insurance?.AFM_number)) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form2:'no'}))			
			}
			else if  (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== '' && studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== '' &&
						existStudentByAFM === false && existStudentByAMKA === false) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form2:'yes'}))
			}
		}
		else if (activeStepFirstForm === 2) {
			if (studentInfo_PersonalInfo?.Birth_Details?.birth_date === undefined) {
				setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_date:''}})
			} 
			if (studentInfo_PersonalInfo?.Birth_Details?.birth_country === undefined) {
				setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_country:'Ελλάδα'}})
			} 
			if (studentInfo_PersonalInfo?.Birth_Details?.birth_date === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_date === undefined ||
				new Date(studentInfo_PersonalInfo?.Birth_Details?.birth_date) > currDate ||
			    studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture === undefined ||
				studentInfo_PersonalInfo?.Birth_Details?.birth_country === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_country === undefined ||
				studentInfo_PersonalInfo?.Birth_Details?.birth_location === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_location === undefined) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form3:'no'}))
			}
			else if (studentInfo_PersonalInfo?.Birth_Details?.birth_date !== '' && studentInfo_PersonalInfo?.Birth_Details?.birth_date !== undefined &&
			    studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture !== '' && studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture !== undefined &&
				studentInfo_PersonalInfo?.Birth_Details?.birth_country !== '' && studentInfo_PersonalInfo?.Birth_Details?.birth_country !== undefined &&
				studentInfo_PersonalInfo?.Birth_Details?.birth_location !== '' && studentInfo_PersonalInfo?.Birth_Details?.birth_location !== undefined) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form3:'yes'}))
			}
		} 
		else if (activeStepFirstForm === 3) {
			if (studentInfo_PersonalInfo?.Student_Identity?.publish_date === undefined) {
				setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, publish_date:''}})
			} 
			if (studentInfo_PersonalInfo?.Student_Identity?.identity_type === '' || studentInfo_PersonalInfo?.Student_Identity?.identity_type === undefined ||
			    studentInfo_PersonalInfo?.Student_Identity?.identity_number === '' || studentInfo_PersonalInfo?.Student_Identity?.identity_number === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.published_principle === '' || studentInfo_PersonalInfo?.Student_Identity?.published_principle === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.publish_date === '' || studentInfo_PersonalInfo?.Student_Identity?.publish_date === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.citizen === '' || studentInfo_PersonalInfo?.Student_Identity?.citizen === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.citizen_number === '' || studentInfo_PersonalInfo?.Student_Identity?.citizen_number === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.citizenship.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.citizenship === undefined ||
				studentInfo_PersonalInfo?.Student_Identity?.nationality.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.nationality === undefined || 
				studentInfo_PersonalInfo?.Student_Identity?.nationality_second.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.nationality_second === undefined) {
					setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form4:'no'}))
			}
			else if (studentInfo_PersonalInfo?.Student_Identity?.identity_type !== '' && studentInfo_PersonalInfo?.Student_Identity?.identity_type !== undefined &&
					studentInfo_PersonalInfo?.Student_Identity?.identity_number !== '' && studentInfo_PersonalInfo?.Student_Identity?.identity_number !== undefined &&
					studentInfo_PersonalInfo?.Student_Identity?.published_principle !== '' && studentInfo_PersonalInfo?.Student_Identity?.published_principle !== undefined &&
					studentInfo_PersonalInfo?.Student_Identity?.publish_date !== '' && studentInfo_PersonalInfo?.Student_Identity?.publish_date !== undefined &&
					studentInfo_PersonalInfo?.Student_Identity?.citizen !== '' && studentInfo_PersonalInfo?.Student_Identity?.citizen !== undefined &&	
					studentInfo_PersonalInfo?.Student_Identity?.citizen !== '' && studentInfo_PersonalInfo?.Student_Identity?.citizen !== undefined &&				
					studentInfo_PersonalInfo?.Student_Identity?.citizenship.length !== 0 && studentInfo_PersonalInfo?.Student_Identity?.citizenship !== undefined && 
					studentInfo_PersonalInfo?.Student_Identity?.nationality.length !== 0 && studentInfo_PersonalInfo?.Student_Identity?.nationality !== undefined && 
					studentInfo_PersonalInfo?.Student_Identity?.nationality_second.length !== 0 && studentInfo_PersonalInfo?.Student_Identity?.nationality_second !== undefined) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form4:'yes'}))
			}
		} 
		else if (activeStepFirstForm === 4) {
			if (studentInfo_PersonalInfo?.Student_Address?.telephone === '' || studentInfo_PersonalInfo?.Student_Address?.telephone === undefined ||
				studentInfo_PersonalInfo?.Student_Address?.mobile_phone === '' || studentInfo_PersonalInfo?.Student_Address?.mobile_phone === undefined ||
				studentInfo_PersonalInfo?.Student_Address?.uth_email === '' || studentInfo_PersonalInfo?.Student_Address?.uth_email === undefined || 
				studentInfo_PersonalInfo?.Student_Address?.alternative_email === '' || studentInfo_PersonalInfo?.Student_Address?.alternative_email === undefined ||
				(studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.uth_email)) || !studentInfo_PersonalInfo?.Student_Address?.uth_email.endsWith("@uth.gr") ||
				(studentInfo_PersonalInfo?.Student_Address?.telephone !== '' && studentInfo_PersonalInfo?.Student_Address?.telephone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.telephone)) || (studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== '' && studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.mobile_phone)) ||
				(studentInfo_PersonalInfo?.Student_Address?.alternative_email !== '' && studentInfo_PersonalInfo?.Student_Address?.alternative_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.alternative_email)) || studentInfo_PersonalInfo?.Student_Address?.alternative_email.endsWith('@uth.gr') ||
				(studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined && existStudentByUthEmail === true) ||
				studentInfo_PersonalInfo?.Student_Address?.telephone.length !== 10 || studentInfo_PersonalInfo?.Student_Address?.mobile_phone.length !== 10) {
					setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form5:'no'}));
			}
			else if (studentInfo_PersonalInfo?.Student_Address?.telephone !== '' && studentInfo_PersonalInfo?.Student_Address?.telephone !== undefined &&
				studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== '' && studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== undefined &&
				studentInfo_PersonalInfo?.Student_Address?.telephone.length === 10 && studentInfo_PersonalInfo?.Student_Address?.mobile_phone.length === 10 && 
				studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined &&  existStudentByUthEmail === false &&
				studentInfo_PersonalInfo?.Student_Address?.alternative_email !== '' && studentInfo_PersonalInfo?.Student_Address?.alternative_email !== undefined &&
				validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.uth_email) && studentInfo_PersonalInfo?.Student_Address?.uth_email.endsWith("@uth.gr") && 
				validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.alternative_email) && validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.telephone) &&
				validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.mobile_phone) && !studentInfo_PersonalInfo?.Student_Address?.alternative_email.endsWith('@uth.gr')) {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form5:'yes'}));
			}
		}
		else if (activeStepFirstForm === 5) {
			if ((studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone.length !== 10) || (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone!== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone)) ||
			    (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone.length !== 10) || (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone!== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone)) ||
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email))) {
					setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form6:'no'}));
			}
			else if ((studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone.length === 10 && validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone)) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone!== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone.length === 10 && validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone)) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email!== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email !== undefined && validator.isEmail(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email))) {
					setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form6:'yes'}));
			}
			else if (((studentInfo_PersonalInfo?.Third_Person_Contact_Details?.contact_type === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.contact_type === undefined) && 
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_FirstName === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_FirstName === undefined) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_LastName === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_LastName === undefined) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_address === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_address === undefined) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email === undefined) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone === undefined) &&
				(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone === '' || studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone === undefined) )) {
					setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form6:'yes'}));
			}
			else {
				setIsValidFirstForm(isValidFirstForm => ({...isValidFirstForm, form6:'yes'}));
			}
		}
	}, [studentInfo_PersonalInfo, activeStepFirstForm, existStudentByUsername, existStudentByUthEmail, existStudentByStudentIdentity, existStudentByAFM, existStudentByAMKA])

	useEffect(() => {
		let currDate_secondForm = new Date();
		let currYear_secondForm = currDate_secondForm.getFullYear();
		if (activeStepSecondForm === 0) {
			if (studentInfo_StudentshipInfo?.General_Information?.department === '' || studentInfo_StudentshipInfo?.General_Information?.department === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.department_number === '' || studentInfo_StudentshipInfo?.General_Information?.department_number === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.course === '' || studentInfo_StudentshipInfo?.General_Information?.course === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.course_number === '' || studentInfo_StudentshipInfo?.General_Information?.course_number === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === '' || studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.current_academic_year === '' || studentInfo_StudentshipInfo?.General_Information?.current_academic_year === undefined ||
				studentInfo_StudentshipInfo?.General_Information?.current_academic_semester === '' || studentInfo_StudentshipInfo?.General_Information?.current_academic_semester === undefined ||
				(studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === 'Εαρινή' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester % 2 !== 0) ||
				(studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === 'Χειμερινή' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester % 2 === 0) ||
				studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number === '' || studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number === undefined || 
				studentInfo_StudentshipInfo?.General_Information?.academic_record_number === '' || studentInfo_StudentshipInfo?.General_Information?.academic_record_number === undefined || 
				studentInfo_StudentshipInfo?.General_Information?.academic_email === '' || studentInfo_StudentshipInfo?.General_Information?.academic_email === undefined ||
				!validator.isEmail(studentInfo_StudentshipInfo?.General_Information?.academic_email) || !studentInfo_StudentshipInfo?.General_Information?.academic_email.endsWith("@uth.gr") ||
				(studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== undefined && existStudentByAEM === true) ||
				studentInfo_StudentshipInfo?.General_Information?.course_program_part === '' || studentInfo_StudentshipInfo?.General_Information?.course_program_part === undefined) {
					setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form1:'no'}))
			}
			else if (studentInfo_StudentshipInfo?.General_Information?.department !== '' && studentInfo_StudentshipInfo?.General_Information?.department !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.department_number !== '' && studentInfo_StudentshipInfo?.General_Information?.department_number !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.course !== '' && studentInfo_StudentshipInfo?.General_Information?.course !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.course_number !== '' && studentInfo_StudentshipInfo?.General_Information?.course_number !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.current_attendance_period !== '' && studentInfo_StudentshipInfo?.General_Information?.current_attendance_period !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.current_academic_year !== '' && studentInfo_StudentshipInfo?.General_Information?.current_academic_year !== undefined &&
					studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== '' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== undefined && 
					studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== undefined && 
					validator.isNumeric(studentInfo_StudentshipInfo?.General_Information?.academic_record_number) && validator.isNumeric(studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number) &&
					studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== undefined &&					
					studentInfo_StudentshipInfo?.General_Information?.academic_email !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_email !== undefined && existStudentByAEM === false &&
					validator.isEmail(studentInfo_StudentshipInfo?.General_Information?.academic_email) && studentInfo_StudentshipInfo?.General_Information?.academic_email.endsWith('@uth.gr') &&					
					studentInfo_StudentshipInfo?.General_Information?.course_program_part !== '' && studentInfo_StudentshipInfo?.General_Information?.course_program_part !== undefined) {
						setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form1:'yes'}))
			}
		}
		else if (activeStepSecondForm === 1) {
			if (studentInfo_StudentshipInfo?.Registration_Details?.registration_year === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_year === undefined ||
			    studentInfo_StudentshipInfo?.Registration_Details?.registration_year > currYear_secondForm || !validator.isNumeric(studentInfo_StudentshipInfo?.Registration_Details?.registration_year) ||
				studentInfo_StudentshipInfo?.Registration_Details?.registration_period === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_period === undefined ||
				studentInfo_StudentshipInfo?.Registration_Details?.registration_semester === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_semester === undefined ||
				studentInfo_StudentshipInfo?.Registration_Details?.registration_way === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_way === undefined) {
					setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form2:'no'}));
			}
			else if (studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== undefined &&
					studentInfo_StudentshipInfo?.Registration_Details?.registration_year < currYear_secondForm && validator.isNumeric(studentInfo_StudentshipInfo?.Registration_Details?.registration_year) &&
					studentInfo_StudentshipInfo?.Registration_Details?.registration_period !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_period !== undefined &&
					studentInfo_StudentshipInfo?.Registration_Details?.registration_semester !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_semester !== undefined &&
					studentInfo_StudentshipInfo?.Registration_Details?.registration_way !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_way !== undefined) {
						setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form2:'yes'}));
			}
		}
		else if (activeStepSecondForm === 2) {
			if (studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName === undefined ||
				studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName === undefined ||
				studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email === '' || studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email === undefined ||
				!validator.isEmail(studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email)) {
					setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form3:'no'}));
			}
			else if (studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== undefined &&
					studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== undefined &&
					studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== undefined &&
					validator.isEmail(studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email)) {
						setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form3:'yes'}));
			}
		}
		else if (activeStepSecondForm === 3) {
			if (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === '') {
				setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo?.Grade_State, totalNumber_successCourses:0}))
			}
			if (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === '') {
				setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo?.Grade_State, totalNumber_failedCourses:0}))
			}
			if (studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === '') {
				setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo?.Grade_State, ECTS_total:0}))
			}
			if (studentInfo_StudentshipInfo?.Grade_State?.units_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_total === '') {
				setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo?.Grade_State, units_total:0}))
			}
			if (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses > 47 ||
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses < 0 || 
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses === '' ||  studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses > 28 ||
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses > 19 ||
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses < 0 || 
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses < 0 || 
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_total < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.units_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_total === '' || studentInfo_StudentshipInfo?.Grade_State?.units_total < 0 ||
				studentInfo_StudentshipInfo?.Grade_State?.grade_average === undefined || studentInfo_StudentshipInfo?.Grade_State?.grade_average === '' || studentInfo_StudentshipInfo?.Grade_State?.grade_average < 0 || studentInfo_StudentshipInfo?.Grade_State?.grade_average > 10) {
					setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form4 :'no'}));
			}
			else if (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses >= 0 && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses <= 47 &&
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses >= 0 && 
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses >= 0 && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses <= 28 &&
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses >= 0 && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses <= 19 &&
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses >= 0 && 
				studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses >= 0 &&
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses >= 0 &&
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses >= 0 && 
				studentInfo_StudentshipInfo?.Grade_State?.ECTS_total !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_total !== '' && studentInfo_StudentshipInfo?.Grade_State?.ECTS_total >= 0 &&
				studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses >= 0 &&
				studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses !== '' && studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses >=  0 &&
				studentInfo_StudentshipInfo?.Grade_State?.units_total !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_total !== '' && studentInfo_StudentshipInfo?.Grade_State?.units_total >= 0 &&
				studentInfo_StudentshipInfo?.Grade_State?.grade_average !== undefined && studentInfo_StudentshipInfo?.Grade_State?.grade_average !== '' && studentInfo_StudentshipInfo?.Grade_State?.grade_average >= 0 && studentInfo_StudentshipInfo?.Grade_State?.grade_average <= 10) {
					setIsValidSecondForm(isValidSecondForm => ({...isValidSecondForm, form4 :'yes'}));
			}
		}
	}, [studentInfo_StudentshipInfo, activeStepSecondForm, existStudentByAEM])
    
	// Handling gender changes
	useEffect(()=> {
		if (studentInfo_PersonalInfo?.Personal_Information?.gender !== '') {
			if (studentInfo_PersonalInfo?.Personal_Information?.gender === 'Άρρεν') {
				setStudentInfo_PersonalInfo(studentInfo_PersonalInfo => ({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, sex:'Κος'}, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, gender:'Άρρεν'}}))
			}
			else if (studentInfo_PersonalInfo?.Personal_Information?.gender === 'Θήλυ') {
				setStudentInfo_PersonalInfo(studentInfo_PersonalInfo => ({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, sex:'Κα'}, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, gender:'Θήλυ'}}))
			} 
		}
	}, [studentInfo_PersonalInfo?.Personal_Information?.gender])

	// Handling citizenship changes
	useEffect(() => {
		if (activeStepFirstForm === 3 && (studentInfo_PersonalInfo?.Student_Identity?.citizenship.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.citizenship === undefined)) {
			if (firstFormButton.button4 === true  && document.getElementById('citizenship')) {
				document.getElementById('citizenship').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid red';
	        	document.getElementById('citizenship').getElementsByClassName('errorValue')[0].style.display = 'block';
			}
		}
	}, [studentInfo_PersonalInfo?.Student_Identity?.citizenship, activeStepFirstForm, firstFormButton.button4])

	// Handling nationality changes
	useEffect(() => {
		if (activeStepFirstForm === 3 && (studentInfo_PersonalInfo?.Student_Identity?.nationality.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.nationality === undefined)) {
			if (firstFormButton.button4 === true && document.getElementById('nationality')) {
				document.getElementById('nationality').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid red';
	       		document.getElementById('nationality').getElementsByClassName('errorValue')[0].style.display = 'block';
			}
		}
	}, [studentInfo_PersonalInfo?.Student_Identity?.nationality, activeStepFirstForm, firstFormButton.button4])

	// Handling nationality second changes
	useEffect(() => {
		if (activeStepFirstForm === 3 && (studentInfo_PersonalInfo?.Student_Identity?.nationality_second.length === 0 || studentInfo_PersonalInfo?.Student_Identity?.nationality_second === undefined)) {
			if (firstFormButton.button4 === true && document.getElementById('nationality_second')) {
				document.getElementById('nationality_second').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid red';
	       		document.getElementById('nationality_second').getElementsByClassName('errorValue')[0].style.display = 'block';
			}
		}
	}, [studentInfo_PersonalInfo?.Student_Identity?.nationality_second, activeStepFirstForm, firstFormButton.button4])
 		
	// Determining the current academic period and current academic year
/*	useEffect(() => {
		let currPeriod = ''; let currAcademicYear = '';
		const current_date = new Date();
		const currYear = current_date.getFullYear();
		const currMonth = current_date.getMonth() + 1;
		if (currMonth > 9 && currMonth < 2) {
			currPeriod = 'Χειμερινή'; 
			currAcademicYear = currYear;
		}
		else {
			currPeriod = 'Εαρινή';
			currAcademicYear = currYear - 1;
		} 
		// Current Academic Period
	if (studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === '' || studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === undefined || studentInfo_StudentshipInfo?.General_Information?.current_attendance_period !== currPeriod) {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=>({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, current_attendance_period:currPeriod}}))
		}
		// Current Academic Year
		if (studentInfo_StudentshipInfo?.General_Information?.current_academic_year === '' || studentInfo_StudentshipInfo?.General_Information?.current_academic_year === undefined || studentInfo_StudentshipInfo?.General_Information?.current_academic_year !== currAcademicYear) {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, current_academic_year:currAcademicYear}}))
		}
	}, [studentInfo_StudentshipInfo.General_Information.current_academic_semester, studentInfo_StudentshipInfo.General_Information.current_attendance_period, studentInfo_StudentshipInfo.General_Information.current_academic_year])*/

	// Handling the general academic number
	useEffect(() => {
		if (studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== undefined && validator.isNumeric(studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number)) {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, education_number:studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number}}))
		}
		else {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, education_number:''}}))
		}
	}, [studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number])	

	// Handling the academic identity field
	useEffect(() => {
		if (studentInfo_PersonalInfo?.Personal_Information?.student_identity !== '' && studentInfo_PersonalInfo?.Personal_Information?.student_identity !== undefined) {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_identity:studentInfo_PersonalInfo?.Personal_Information?.student_identity}}))
		}
		else {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=> ({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_identity:''}}))
		}
	}, [studentInfo_PersonalInfo?.Personal_Information?.student_identity])	

	// Handling the academic email of student
	useEffect(() => {
		if (studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined && studentInfo_PersonalInfo?.Student_Address?.uth_email.endsWith('uth.gr') && validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.uth_email)) {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=>({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_email:studentInfo_PersonalInfo?.Student_Address?.uth_email}}))
		}
		else {
			setStudentInfo_StudentshipInfo(studentInfo_StudentshipInfo=>({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_email:''}}))
		}
	}, [studentInfo_PersonalInfo?.Student_Address?.uth_email])
	
	// Function that controls the information of the Professor Advisor
	const selectProfessor = (value, item) => { 
		setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Professor_Advisor_Details:{...studentInfo_StudentshipInfo.Professor_Advisor_Details, professorAdvisor_FirstName:value.split(',')[0], professorAdvisor_LastName:value.split(',')[1], professorAdvisor_Email:value.split(',')[2]}})
		document.getElementById(item).getElementsByClassName('errorValue')[0].style.display = 'none';
		document.getElementById(item).getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6';
	}

	// Handling the professor advisor changes
	useEffect(() => {
		if (studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== undefined && document.getElementById('professorAdvisor_FirstName')) {
			document.getElementById('professorAdvisor_FirstName').getElementsByClassName('errorValue')[0].style.display = 'none';
			document.getElementById('professorAdvisor_FirstName').getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6';
		}
	}, [studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName])

	useEffect(() => {
		if (studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== undefined && document.getElementById('professorAdvisor_LastName')) {
			document.getElementById('professorAdvisor_LastName').getElementsByClassName('errorValue')[0].style.display = 'none';
			document.getElementById('professorAdvisor_LastName').getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6';
		}
	}, [studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName])

	useEffect(() => {
		if (studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== undefined && document.getElementById('professorAdvisor_Email')) {
			document.getElementById('professorAdvisor_Email').getElementsByClassName('errorValue')[0].style.display = 'none';
			document.getElementById('professorAdvisor_Email').getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6';
		}
	}, [studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email])

	// Checking if the student's username input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_username(studentInfo_PersonalInfo?.Personal_Information?.username)
			.then(result=> { 
				result?.data?.existStudentByUsername === true && studentInfo_PersonalInfo.Personal_Information.username !== editStudentData?.Personal_Info?.Personal_Information?.username ? setExistStudentByUsername(true) : setExistStudentByUsername(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_PersonalInfo?.Personal_Information?.username, editStudentData?.Personal_Info?.Personal_Information?.username])

	// Checking if the student's AEM input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_AEM(studentInfo_StudentshipInfo?.General_Information?.academic_record_number)
			.then(result=> { 
				result?.data?.existStudentByAEM === true && studentInfo_StudentshipInfo.General_Information.academic_record_number !== editStudentData?.Studentship_Info?.General_Information?.academic_record_number  ? setExistStudentByAEM(true) : setExistStudentByAEM(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_StudentshipInfo?.General_Information?.academic_record_number, editStudentData?.Studentship_Info?.General_Information?.academic_record_number])

	// Checking if the student's uth_email input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_uth_email(studentInfo_PersonalInfo?.Student_Address?.uth_email)
			.then(result=> { 
				result?.data?.existStudentByUthEmail === true && studentInfo_PersonalInfo.Student_Address.uth_email !== editStudentData?.Personal_Info?.Student_Address?.uth_email  ? setExistStudentByUthEmail(true) : setExistStudentByUthEmail(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_PersonalInfo?.Student_Address?.uth_email, editStudentData?.Personal_Info?.Student_Address?.uth_email])

	// Checking if the student's identity input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_academic_identity(studentInfo_PersonalInfo?.Personal_Information?.student_identity)
			.then(result=> { 
				result?.data?.existStudentBystudentIdentity === true && studentInfo_PersonalInfo.Personal_Information.student_identity !== editStudentData?.Personal_Info?.Personal_Information?.student_identity  ? setExistStudentByStudentIdentity(true) : setExistStudentByStudentIdentity(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_PersonalInfo?.Personal_Information?.student_identity, editStudentData?.Personal_Info?.Personal_Information?.student_identity])

	// Checking if the student's AMKA input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_AMKA(studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number)
			.then(result=> { 
				result?.data?.existStudentByAMKA === true && studentInfo_PersonalInfo.Student_Insurance.AMKA_number !== editStudentData?.Personal_Info?.Student_Insurance?.AMKA_number  ? setExistStudentByAMKA(true) : setExistStudentByAMKA(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number, editStudentData?.Personal_Info?.Student_Insurance?.AMKA_number])

	// Checking if the student's AFM input already exist in database
	useEffect(() => {
		studentResolvers.exist_student_by_AFM(studentInfo_PersonalInfo?.Student_Insurance?.AFM_number)
			.then(result=> { 
				result?.data?.existStudentByAFM === true && studentInfo_PersonalInfo.Student_Insurance.AFM_number !== editStudentData?.Personal_Info?.Student_Insurance?.AFM_number  ? setExistStudentByAFM(true) : setExistStudentByAFM(false); 
			})
			.catch(error=> {
				throw error;
			})
	}, [studentInfo_PersonalInfo?.Student_Insurance?.AFM_number, editStudentData?.Personal_Info?.Student_Insurance?.AFM_number])
 	 
 
	const editStudent_mutation = () => {
		let studentEditInput = {Personal_Info : studentInfo_PersonalInfo, Studentship_Info: studentInfo_StudentshipInfo}
		studentResolvers.edit_student(editStudent.username, studentEditInput)
				.then(result=> {  
					console.log(result)
					setIsAdding(true)
				})
				.catch(err=> {
					console.log(err)
					throw err;
				})
	}
	 
    if (allStudents.length === 0) {
		studentResolvers.get_all_students()
			.then(result  => {
				let studentsArray = [];
				result?.data?.getAllStudents.forEach((student) => 
					studentsArray.push({"value": student, "label" : student?.Personal_Info?.Personal_Information?.username})
				)  
				setStudentsArray(result?.data?.getAllStudents)
				setAllStudents(studentsArray)
			})
			.catch(error => {
				console.log(error);
				throw error;
			}) 
	}  
	const getStepContent = (step) => {	 
		switch (step) {
			case 0:
				return (
					<Form style= {{marginTop:'2rem'}}>
						<Row className="mb-3">
							<Form.Group as={Col} id='first_name'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Όνομα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
									<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.first_name === '' ? true : false}
										type="text" placeholder="Όνομα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.first_name}										
										onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, first_name: e.target.value.trimStart()}}); 														
									}}
								/>  
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} id='last_name'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Επώνυμο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
								<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.last_name === '' ? true : false} 
									type="text" placeholder="Επώνυμο" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.last_name}
									onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, last_name: e.target.value.trimStart()}}); 
									}}
								/>  
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='dot_father_name'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Μ. Όνομα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
								<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.dot_father_name === '' ? true : false} 
									type="text" placeholder="Μ. Όνομα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.dot_father_name}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, dot_father_name: e.target.value.trimStart()}})
									}
								/> 
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} id='maiden_name'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Πατρικό Όνομα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
								<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.maiden_name === '' ? true : false} 
									type="text" placeholder="Πατρικό Όνομα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.maiden_name}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, maiden_name: e.target.value.trimStart()}})
									}
								/> 
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='father_FirstName'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Πατρώνυμο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
								<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.father_FirstName === '' ? true : false} 
									type="text" placeholder="Πατρώνυμο" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.father_FirstName}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, father_FirstName: e.target.value.trimStart()}})
									}
								/> 
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} id='father_LastName'>
								<Form.Label>Επώνυμο Πατρός</Form.Label> 
								<Form.Control 
									type="text" placeholder="Επώνυμο Πατρός" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.father_LastName}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, father_LastName: e.target.value.trimStart()}})
									}
								/> 								
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='mother_FirstName'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Όνομα Μητρός<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 
								<Form.Control required isInvalid={firstFormButton.button1 === true && studentInfo_PersonalInfo?.Personal_Information?.mother_FirstName === '' ? true : false} 
									type="text" placeholder="Όνομα Μητρός" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.mother_FirstName}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, mother_FirstName: e.target.value.trimStart()}})
									}
								/> 
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} id='mother_LastName'>
								<Form.Label>Επώνυμο Μητρός</Form.Label> 
								<Form.Control 
									type="text" placeholder="Επώνυμο Μητρός" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.mother_LastName}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, mother_LastName: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='family'>
								<Form.Label>Οικογενειακή Κατάσταση</Form.Label>  
								<div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsFamily('Άγαμος/η')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.family === 'Άγαμος/η'}	
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										value : 'Άγαμος/η'
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Άγαμος/η</div></div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsFamily('Έγγαμος/η')}								
										checked = {studentInfo_PersonalInfo?.Personal_Information?.family === 'Έγγαμος/η'}			 
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										value : 'Έγγαμος/η'
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Έγγαμος/η</div></div>
								</div>
							</Form.Group>
							<Form.Group as={Col} id='spouse_name'>
								<Form.Label>Όνομα Συζύγου</Form.Label> 
								<Form.Control 
									type="text" placeholder="Όνομα Συζύγου" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.spouse_name}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, spouse_name: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='profession'>
								<Form.Label>Επάγγελμα</Form.Label> 
								<Form.Control 
									type="text" placeholder="Επάγγελμα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.profession}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, profession: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
							<Form.Group as={Col} id='website'>
								<Form.Label>Ιστότοπος</Form.Label> 
								<Form.Control 
									type="text" placeholder="Ιστότοπος" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.website}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, website: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='father_profession'>
								<Form.Label>Επάγγελμα Πατέρα</Form.Label> 
								<Form.Control 
									type="text" placeholder="Επάγγελμα Πατέρα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.father_profession}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, father_profession: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
							<Form.Group as={Col} id='mother_profession'>
								<Form.Label>Επάγγελμα Μητέρας</Form.Label> 
								<Form.Control 
									type="text" placeholder="Επάγγελμα Μητέρας" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.mother_profession}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, mother_profession: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='gender'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Φύλο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 									 
								    <div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsGender('Άρρεν')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.gender === 'Άρρεν'}	 
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Άρρεν</div></div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsGender('Θήλυ')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.gender === 'Θήλυ'}	  
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Θήλυ</div></div>
									</div>
									<div style={{marginLeft:'none'}} className="errorValue">*Το πεδίο είναι υποχρεωτικό!</div>    
							</Form.Group>
							<Form.Group as={Col} id='sex'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο συμπληρώνεται <strong>αυτόματα</strong> με την επιλογή του πεδίου <strong>Φύλο</strong>!
										</Tooltip>
									}
									><Form.Label>Προσφώνηση<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 									
								<Form.Control readOnly
									type="text" placeholder="Προσφώνηση" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.sex}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, sex: e.target.value.trimStart()}})
									}
								/>  
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='username'>
								<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Όνομα Χρήστη<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 
								<Form.Control required isInvalid={((firstFormButton.button1 === true && (studentInfo_PersonalInfo?.Personal_Information?.username === '' || studentInfo_PersonalInfo?.Personal_Information?.username === undefined || (studentInfo_PersonalInfo?.Personal_Information?.username !== '' && studentInfo_PersonalInfo?.Personal_Information?.username !== undefined && existStudentByUsername === true))) || (studentInfo_PersonalInfo?.Personal_Information?.username !== '' && studentInfo_PersonalInfo?.Personal_Information?.username !== undefined && existStudentByUsername === true)) ? true : false} 
									type="text" placeholder="Όνομα Χρήστη" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.username}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, username: validator.trim(e.target.value)}})
									}
								/>
								<Form.Control.Feedback type="invalid"> 
									{existStudentByUsername === true ? '*Το συγκεκριμένο Όνομα Χρήστη υπάρχει ήδη!' : '*Το πεδίο είναι υποχρεωτικό!'}
								</Form.Control.Feedback>
							</Form.Group>
						    <Form.Group as={Col} controlId="active">
									<Form.Label>Κατάσταση</Form.Label> 
										<Form.Check  
											type="switch"  
											id="custom-switch"
											checked={studentInfo_PersonalInfo?.Personal_Information?.active}
											label={studentInfo_PersonalInfo?.Personal_Information?.active ? 'ΕΝΕΡΓΟΣ' : 'ΜΗ ΕΝΕΡΓΟΣ'}
											onChange={()=>setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, active:!studentInfo_PersonalInfo.Personal_Information.active}})}
										/> 
							</Form.Group>							
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='student_identity'>
							<OverlayTrigger
								    key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										 Το πεδίο είναι <strong>υποχρεωτικό</strong>!
										</Tooltip>
									}
									><Form.Label>Ακαδημαϊκή Ταυτότητα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 
								<Form.Control required isInvalid={((firstFormButton.button1 === true && (studentInfo_PersonalInfo?.Personal_Information?.student_identity === '' || studentInfo_PersonalInfo?.Personal_Information?.student_identity === undefined)) || (studentInfo_PersonalInfo?.Personal_Information?.student_identity !== '' && studentInfo_PersonalInfo?.Personal_Information?.student_identity !== undefined && existStudentByStudentIdentity === true)) ? true : false} 
									type="text" placeholder="Ακαδημαϊκή Ταυτότητα" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.student_identity}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, student_identity: validator.trim(e.target.value)}})
									}
								/>
								<Form.Control.Feedback type="invalid">
									{existStudentByStudentIdentity === true ? '*Η συγκεκριμένη Ακαδημαϊκή Ταυτότητα υπάρχει ήδη!' :'*Το πεδίο είναι υποχρεωτικό!'}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} id='personal_title'>
								<Form.Label>Τίτλος Προσώπου</Form.Label> 
								<Form.Control 
									type="text" placeholder="Τίτλος Προσώπου" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.personal_title}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, personal_title: e.target.value.trimStart()}})
									}
								/> 
							</Form.Group>							
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} id='fulfilled_military_obligations'>
								<Form.Label>Εκπλ. Στρατιωτική Θητεία</Form.Label>
								<div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsMilitary('yes')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.fulfilled_military_obligations === 'yes'}	
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										value:'yes'
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Ναι</div></div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsMilitary('no')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.fulfilled_military_obligations === 'no'}	
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										value:'no'
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Όχι</div></div>
									<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
									<Radio
										{...controlPropsMilitary('without')}
										checked = {studentInfo_PersonalInfo?.Personal_Information?.fulfilled_military_obligations === 'without'}	
										sx={{
										color: '#17a2b8',
										'&.Mui-checked': {
											color: '#17a2b8',
										},
										value:'without'
										}} 
									/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Άνευ</div></div>
								</div>     
							</Form.Group>
							<Form.Group as={Col} id='notations'>
								<Form.Label>Σημειώσεις</Form.Label> 
								<Form.Control 
									as="textarea" placeholder="Σημειώσεις" className="control" value={studentInfo_PersonalInfo?.Personal_Information?.notations}
									onChange={(e) => setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Personal_Information:{...studentInfo_PersonalInfo.Personal_Information, notations: e.target.value.trimStart()}})
									}
								/> 
							</Form.Group>							
						</Row>

					</Form>
				);
	case 1:	
		return (
			<Form style= {{marginTop:'2rem'}}>
				<Row className="mb-3">
					<Form.Group as={Col} id='AMKA'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι <strong>11ψήφιο</strong>!
								</Tooltip>
							}
							><Form.Label>AMKA<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
							<Form.Control required isInvalid={((firstFormButton.button2 === true && (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number === '' || studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number === undefined || !validator.isNumeric(studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number) || (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== undefined && studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number.length !== 11))) || (studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== '' && studentInfo_PersonalInfo?.Student_Insurance?.AMKA_number !== undefined && existStudentByAMKA === true)) ? true : false} 
								type="text" placeholder="AMKA" className="control" value={studentInfo_PersonalInfo.Student_Insurance?.AMKA_number}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AMKA_number: validator.trim(e.target.value)}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							{ existStudentByAMKA === true ? 
							 'Το συγκεκριμένο ΑΜΚΑ υπάρχει ήδη!'
							 : '*Το πεδίο είναι υποχρεωτικό! (11 ψηφία)'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='AFM'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι <strong>9ψήφιο</strong>!
								</Tooltip>
							}
							><Form.Label>ΑΦΜ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control required isInvalid={((firstFormButton.button2 === true && (studentInfo_PersonalInfo?.Student_Insurance?.AFM_number === '' || studentInfo_PersonalInfo?.Student_Insurance?.AFM_number === undefined || !validator.isNumeric(studentInfo_PersonalInfo?.Student_Insurance?.AFM_number) || (studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== undefined && studentInfo_PersonalInfo?.Student_Insurance?.AFM_number.length !== 9) )) || (studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== '' && studentInfo_PersonalInfo?.Student_Insurance?.AFM_number !== undefined && existStudentByAFM === true)) ? true : false} 
							type="text" placeholder="ΑΦΜ" className="control" value={studentInfo_PersonalInfo?.Student_Insurance?.AFM_number}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AFM_number: validator.trim(e.target.value)}}); 
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							{existStudentByAFM === true ? 
							 'Το συγκεκριμένο ΑΦΜ υπάρχει ήδη!'
							 : '*Το πεδίο είναι υποχρεωτικό! (9 ψηφία)'}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='AMKA_country'>
						<Form.Label>Χώρα AMKA</Form.Label>
							<Form.Control  
								type="text" className="control" value={studentInfo_PersonalInfo?.Student_Insurance?.AMKA_country}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AMKA_country: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='AFM_country'>
						<Form.Label>Χώρα ΑΦΜ</Form.Label>
						<Form.Control  
							type="text" className="control" value={studentInfo_PersonalInfo?.Student_Insurance?.AFM_country}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, AFM_country: e.target.value.trimStart()}}); 
							}}
						/>   
					</Form.Group>
				</Row>
				<Row className="mb-3">
				<Form.Group as={Col} id='DOY'>
						<Form.Label>ΔΟΥ</Form.Label>
						<Form.Control  
							type="text" placeholder='ΔΟΥ' className="control" value={studentInfo_PersonalInfo?.Student_Insurance?.DOY_number}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Insurance:{...studentInfo_PersonalInfo.Student_Insurance, DOY_number: e.target.value.trimStart()}}); 
							}}
						/>  
					</Form.Group>
					<Form.Group as={Col} id='DOY_second'> 
					</Form.Group>
				</Row>
			</Form>
		);  
	case 2:	
		return (
			<Form style= {{marginTop:'2rem'}}>
				<Row className="mb-3">
					<Form.Group as={Col} id='birth_date'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Ημερομηνία Γέννησης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
							<Form.Control required isInvalid={((firstFormButton.button3 === true && (studentInfo_PersonalInfo?.Birth_Details?.birth_date === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_date === undefined || new Date(studentInfo_PersonalInfo?.Birth_Details?.birth_date) > currentDate )) || new Date(studentInfo_PersonalInfo?.Birth_Details?.birth_date) > currentDate) ? true : false} 
								style={{backgroundImage:'none'}} type="date" placeholder="Ημερομηνία Γέννησης" className="control" value={studentInfo_PersonalInfo.Birth_Details?.birth_date}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_date: e.target.value.trimStart()}}); 												
							}}
						/> 
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='birth_gender'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι συμπληρώνεται αυτόματα με την επιλογή του πεδίου <strong>Φύλο</strong> από την πρώτη φόρμα!
								</Tooltip>
							}
							><Form.Label>Φύλο<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 									
							<div>
							<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
							<Radio 
								value="Άρρεν"						 
								checked = {studentInfo_PersonalInfo.Birth_Details?.gender === 'Άρρεν'}
								//{...controlPropsGender('Άρρεν')}
								sx={{
								color: '#17a2b8',
								'&.Mui-checked': {
									color: '#17a2b8',
								},
								}} 
							/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Άρρεν</div></div>
							<div style={{display:'inline-flex', alignItems:'center', verticalAlign:'middle'}}>
							<Radio
								value="Θήλυ"	
								checked = {studentInfo_PersonalInfo.Birth_Details?.gender === 'Θήλυ'} 
								sx={{
								color: '#17a2b8',
								'&.Mui-checked': {
									color: '#17a2b8',
								},
								}} 
							/><div style={{display:'inline-flex', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', color:'#606060', letterSpacing:'0.5px'}}>Θήλυ</div></div>
							</div>
							<div style={{marginLeft:'none'}} className="errorValue">*Το πεδίο είναι υποχρεωτικό!</div>    
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='birth_prefecture'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Περιοχή Γέννησης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
							<Form.Control  required isInvalid={firstFormButton.button3 === true && (studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture === undefined) ? true : false} 
								type="text" placeholder='Περιοχή Γέννησης' className="control" value={studentInfo_PersonalInfo?.Birth_Details?.birth_prefecture}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_prefecture: e.target.value.trimStart()}}); 												
							}}
						/>   
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='birth_country'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Χώρα Γέννησης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control required isInvalid={firstFormButton.button3 === true && (studentInfo_PersonalInfo?.Birth_Details?.birth_country === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_country === undefined) ? true : false} 
							type="text" className="control" value={studentInfo_PersonalInfo?.Birth_Details?.birth_country}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_country: e.target.value.trimStart()}}); 
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback> 
					</Form.Group>
				</Row>
				<Row className="mb-3">
				<Form.Group as={Col} id='birth_location'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								Το πεδίο είναι <strong>υποχρεωτικό</strong>!
							</Tooltip>
						}
						><Form.Label>Τόπος Γέννησης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control required isInvalid={firstFormButton.button3 === true && (studentInfo_PersonalInfo?.Birth_Details?.birth_location === '' || studentInfo_PersonalInfo?.Birth_Details?.birth_location === undefined) ? true : false} 
							type="text" placeholder='Τόπος Γέννησης' className="control" value={studentInfo_PersonalInfo?.Birth_Details?.birth_location}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Birth_Details:{...studentInfo_PersonalInfo.Birth_Details, birth_location: e.target.value.trimStart()}}); 
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback> 
					</Form.Group>
					<Form.Group as={Col} id='birth_location_second'> 
					</Form.Group>
				</Row>
			</Form>
		);
		case 3:	
		return (
			<Form style= {{marginTop:'2rem'}}>
				<Row className="mb-3">
					<Form.Group as={Col} id='identity_type'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Τύπος ταυτότητας<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
							<Form.Control required isInvalid={firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.identity_type === '' || studentInfo_PersonalInfo?.Student_Identity?.identity_type === undefined ) ? true : false} 
								type="text" placeholder="Τύπος ταυτότητας" className="control" value={studentInfo_PersonalInfo.Student_Identity?.identity_type}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, identity_type: e.target.value.trimStart()}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='identity_number'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Αριθμός Ταυτότητας<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control required isInvalid={firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.identity_number === '' || studentInfo_PersonalInfo?.Student_Identity?.identity_number === undefined ) ? true : false} 
							type="text" placeholder="Αριθμός Ταυτότητας" className="control" value={studentInfo_PersonalInfo?.Student_Identity?.identity_number}
							onChange={(e) => { setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, identity_number: e.target.value.trimStart()}}); 
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='published_principle'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Εκδ. Αρχή<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 								
							<Form.Control required isInvalid={firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.published_principle === '' || studentInfo_PersonalInfo?.Student_Identity?.published_principle === undefined ) ? true : false} 
								type="text" placeholder="πχ Α.Τ ΚΑΛΛΙΘΕΑΣ" className="control" value={studentInfo_PersonalInfo.Student_Identity?.published_principle}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, published_principle: e.target.value.trimStart()}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='publish_date'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Ημερομηνία Έκδοσης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
							<Form.Control required isInvalid={((firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.publish_date === '' || studentInfo_PersonalInfo?.Student_Identity?.publish_date === undefined || new Date(studentInfo_PersonalInfo?.Student_Identity?.publish_date) > currentDate )) || new Date(studentInfo_PersonalInfo?.Student_Identity?.publish_date) > currentDate) ? true : false} 
								style={{backgroundImage:'none'}} type="date" placeholder="Ημερομηνία Γέννησης" className="control" value={studentInfo_PersonalInfo.Student_Identity?.publish_date}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, publish_date: e.target.value.trimStart()}}); 												
							}}
						/> 
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='citizen'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Δημοτολόγιο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger> 								
							<Form.Control required isInvalid={firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.citizen === '' || studentInfo_PersonalInfo?.Student_Identity?.citizen === undefined ) ? true : false} 
								type="text" placeholder="Δημοτολόγιο" className="control" value={studentInfo_PersonalInfo.Student_Identity?.citizen}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, citizen: e.target.value.trimStart()}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='citizen_number'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Αριθμός Δηματολογίου<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
							<Form.Control required isInvalid={firstFormButton.button4 === true && (studentInfo_PersonalInfo?.Student_Identity?.citizen_number === '' || studentInfo_PersonalInfo?.Student_Identity?.citizen_number === undefined) ? true : false} 
								type="text" placeholder="Αριθμός Δηματολογίου" className="control" value={studentInfo_PersonalInfo.Student_Identity?.citizen_number}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, citizen_number: e.target.value.trimStart()}}); 												
							}}
						/> 
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='male_record_num'>
						    <Form.Label>Αρ. Μητρώου Αρρένων</Form.Label>								
							<Form.Control 
								type="text" placeholder="Αρ. Μητρώου Αρρένων" className="control" value={studentInfo_PersonalInfo.Student_Identity?.male_record_num}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, male_record_num: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='male_record_gr'>
						    <Form.Label>Γρ. Μητρώου Αρρένων</Form.Label>	
							<Form.Control 
								type="text" placeholder="Γρ. Μητρώου Αρρένων" className="control" value={studentInfo_PersonalInfo.Student_Identity?.male_record_gr}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, male_record_gr: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='male_record_loc'>
						    <Form.Label>Τόπος Μητρώου Αρρένων</Form.Label>								
							<Form.Control 
								type="text" placeholder="Τόπος Μητρώου Αρρένων" className="control" value={studentInfo_PersonalInfo.Student_Identity?.male_record_loc}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, male_record_loc: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='male_record_perf'>
						    <Form.Label>Νομός Μητρώου Αρρένων</Form.Label>	
							<Form.Control 
								type="text" placeholder="Νομός Μητρώου Αρρένων" className="control" value={studentInfo_PersonalInfo.Student_Identity?.male_record_perf}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, male_record_perf: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} id='male_record_country'>
						    <Form.Label>Χώρα Μητρώου Αρρένων</Form.Label>	
							<Form.Control 
								type="text" placeholder="Χώρα Μητρώου Αρρένων" className="control" value={studentInfo_PersonalInfo.Student_Identity?.male_record_country}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, male_record_country: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				<Form.Group as={Col} id='nationality_second'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Ιθαγένεια<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
							<Autocomplete 
									multiple
									id="tags-filled"
									onChange={(e, value)=> {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, nationality_second:value}}); document.getElementById('nationality_second').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid #dee2e6'; document.getElementById('nationality_second').getElementsByClassName('errorValue')[0].style.display = 'none'}}
									options={[]}
									freeSolo
									value={studentInfo_PersonalInfo?.Student_Identity?.nationality_second}
									renderTags={(value, getTagProps) =>
									value.map((option, index) => (
										<Chip variant="outlined" label={option} {...getTagProps({ index })} />
									))
									}
									renderInput={(params) => (
									<TextField 							         
										{...params}									 
										variant="filled"  
										placeholder="Πατήστε enter για να προσθέσετε Ιθαγένεια"  			
									/>
								)}
							/>   
							<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό (απαιτείται τουλάχιστον μία Ιθαγένεια)!</div>
					</Form.Group> 
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='citizenship'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Υπηκοότητα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
							<Autocomplete 
								multiple
								id="tags-filled"
								onChange={(e, value)=> {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, citizenship:value}}); document.getElementById('citizenship').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid #dee2e6'; document.getElementById('citizenship').getElementsByClassName('errorValue')[0].style.display = 'none'}}
								options={[]}
								freeSolo
								value={studentInfo_PersonalInfo?.Student_Identity?.citizenship}
								renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip variant="outlined" label={option} {...getTagProps({ index })} />
								))
								}
								renderInput={(params) => (
								<TextField 							         
									{...params}									 
									variant="filled"  
									placeholder="Πατήστε enter για να προσθέσετε Υπηκοότητα"  			
								/>
							)}
						/>   
						<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό (απαιτείται τουλάχιστον μία Υπηκοότητα)!</div>
					</Form.Group>
					<Form.Group as={Col} id='nationality'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong>!
								</Tooltip>
							}
							><Form.Label>Εθνικότητα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
							<Autocomplete 
									multiple
									id="tags-filled"
									onChange={(e, value)=> {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Identity:{...studentInfo_PersonalInfo.Student_Identity, nationality:value}}); document.getElementById('nationality').getElementsByClassName('MuiFilledInput-root')[0].style.border = '1px solid #dee2e6'; document.getElementById('nationality').getElementsByClassName('errorValue')[0].style.display = 'none'}}
									options={[]}
									freeSolo
									value={studentInfo_PersonalInfo?.Student_Identity?.nationality}
									renderTags={(value, getTagProps) =>
									value.map((option, index) => (
										<Chip variant="outlined" label={option} {...getTagProps({ index })} />
									))
									}
									renderInput={(params) => (
									<TextField 							         
										{...params}									 
										variant="filled"  
										placeholder="Πατήστε enter για να προσθέσετε Εθνικότητα"  			
									/>
								)}
							/>   
							<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό (απαιτείται τουλάχιστον μία Εθνικότητα)!</div>
					</Form.Group>
				</Row>				
			</Form>
		);
		case 4:	
		return(
			<Form>
				<Row className="mb-3">
					<Form.Group as={Col} id='road'>
						    <Form.Label>Οδός Κατοικίας</Form.Label>								
							<Form.Control 
								type="text" placeholder="Οδός Κατοικίας" className="control" value={studentInfo_PersonalInfo.Student_Address?.road}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, road: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='rd_number'>
						    <Form.Label>Αριθμός</Form.Label>	
							<Form.Control 
								type="number" min={0} placeholder="Αριθμός" className="control" value={studentInfo_PersonalInfo.Student_Address?.rd_number}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, rd_number: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='city'>
						    <Form.Label>Πόλη</Form.Label>								
							<Form.Control 
								type="text" placeholder="Πόλη" className="control" value={studentInfo_PersonalInfo.Student_Address?.city}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, city: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='location'>
						    <Form.Label>Περιοχή</Form.Label>	
							<Form.Control 
								type="text" placeholder="Περιοχή" className="control" value={studentInfo_PersonalInfo.Student_Address?.location}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, location: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='country'>
						    <Form.Label>Χώρα</Form.Label>								
							<Form.Control 
								type="text" placeholder="Χώρα" className="control" value={studentInfo_PersonalInfo.Student_Address?.country}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, country: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='acting_address'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Χώρα <strong>προσωρινής</strong> κατοικίας!
								</Tooltip>
							}
							><Form.Label>Προσ. Κατοικία<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 									
							<Form.Control 
								type="text" placeholder="Προσ. Κατοικία" className="control" value={studentInfo_PersonalInfo.Student_Address?.acting_address}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, acting_address: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='postcode'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Ταχυδρομικός Κώδικας
								</Tooltip>
							}
							><Form.Label>Τ.Κ.<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 															
							<Form.Control 
								type="text" placeholder="Τ.Κ." className="control" value={studentInfo_PersonalInfo.Student_Address?.postcode}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, postcode: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='postcode_second'>						    
					</Form.Group>
				</Row>	
				<Row className="mb-3">
					<Form.Group as={Col} id='telephone'>
					    <OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px', display:'inline-flex'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό !</strong><div style={{display:'block'}}>(10 ψηφία)</div>
								</Tooltip>
							}
							><Form.Label>Τηλέφωνο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
							 <InputGroup>
								<InputGroup.Text id="basic-addon1">+30</InputGroup.Text>
								<Form.Control
									required
									isInvalid = {firstFormButton.button5 === true && (studentInfo_PersonalInfo?.Student_Address?.telephone === '' || studentInfo_PersonalInfo?.Student_Address?.telephone === undefined || !validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.telephone) || (studentInfo_PersonalInfo?.Student_Address?.telephone !== undefined && studentInfo_PersonalInfo?.Student_Address?.telephone !== '' && studentInfo_PersonalInfo?.Student_Address?.telephone.length !== 10)) ? true : false} 
									placeholder="Τηλέφωνο"
									aria-label="Τηλέφωνο"
									aria-describedby="basic-addon1"
									value={studentInfo_PersonalInfo?.Student_Address?.telephone}
									onChange={(e)=>{setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, telephone: validator.trim(e.target.value)}})}}
								/>
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
								</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col}  id='mobile_phone'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό !</strong><div style={{display:'block'}}>(10 ψηφία)</div>
								</Tooltip>
							}
							><Form.Label>Κινητό Τηλέφωνο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
							 <InputGroup>
								<InputGroup.Text id="basic-addon1">+30</InputGroup.Text>
								<Form.Control
									required 
									isInvalid = {firstFormButton.button5 === true && (studentInfo_PersonalInfo?.Student_Address?.mobile_phone === '' || studentInfo_PersonalInfo?.Student_Address?.mobile_phone === undefined || !validator.isNumeric(studentInfo_PersonalInfo?.Student_Address?.mobile_phone) || (studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== undefined && studentInfo_PersonalInfo?.Student_Address?.mobile_phone !== '' && studentInfo_PersonalInfo?.Student_Address?.mobile_phone.length !== 10)) ? true : false} 
									placeholder="Κινητό Τηλέφωνο"
									aria-label="Κινητό Τηλέφωνο"
									aria-describedby="basic-addon1"
									value={studentInfo_PersonalInfo?.Student_Address?.mobile_phone}
									onChange={(e)=>{setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, mobile_phone: validator.trim(e.target.value)}})}}
								/>
								<Form.Control.Feedback type="invalid">
									*Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
								</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</Row>	
				<Row className="mb-3">
					<Form.Group as={Col} id='uth_email'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> (...@uth.gr)!
								</Tooltip>
							}
							><Form.Label>Πανεπιστημιακό email<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>						
							<Form.Control required isInvalid={((firstFormButton.button5 === true && (studentInfo_PersonalInfo?.Student_Address?.uth_email === '' || studentInfo_PersonalInfo?.Student_Address?.uth_email === undefined || (studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.uth_email)) || !studentInfo_PersonalInfo?.Student_Address?.uth_email.endsWith('@uth.gr'))) || (studentInfo_PersonalInfo?.Student_Address?.uth_email !== '' && studentInfo_PersonalInfo?.Student_Address?.uth_email !== undefined && existStudentByUthEmail === true)) ? true : false}
								autoComplete='off' type="text" placeholder="Πανεπιστημιακό email" className="control" value={studentInfo_PersonalInfo.Student_Address?.uth_email}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, uth_email: validator.trim(e.target.value)}}); 												
							}}
						/>   
						<Form.Control.Feedback type="invalid">
							{existStudentByUthEmail === true ? '*Το συγκεκριμένο Πανεπιστημιακό email υπάρχει ήδη!' : '*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='alternative_email'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									<strong>Ενναλλακτική</strong> Διεύθυνση Ηλ.Ταχυδρομείου
								</Tooltip>
							}
							><Form.Label>Ενναλλακτικό email<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 															
							<Form.Control required isInvalid={firstFormButton.button5 === true && ((studentInfo_PersonalInfo?.Student_Address?.alternative_email !== '' && studentInfo_PersonalInfo?.Student_Address?.alternative_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Student_Address?.alternative_email)) || studentInfo_PersonalInfo?.Student_Address?.alternative_email.endsWith('@uth.gr')) ? true : false}
								autoComplete='off' type="text" placeholder="Ενναλλακτικό email" className="control" value={studentInfo_PersonalInfo.Student_Address?.alternative_email}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Student_Address:{...studentInfo_PersonalInfo.Student_Address, alternative_email: validator.trim(e.target.value)}}); 												
							}}
						/>   
						<Form.Control.Feedback type="invalid">
							*Το πεδίο πρέπει να είναι έγκυρο!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>		
			</Form>
		);
		case 5:	
		return(
			<Form>
				<Row className="mb-3">
					<Form.Group as={Col} id='person_FirstName'>
						    <Form.Label>Όνομα</Form.Label>								
							<Form.Control 
								type="text" placeholder="Όνομα" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_FirstName}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_FirstName: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='person_LastName'>
						    <Form.Label>Επώνυμο</Form.Label>	
							<Form.Control 
								type="text" placeholder="Επώνυμο" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_LastName}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_LastName: e.target.value.trimStart()}}); 												
							}}
						/>  
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='person_telephone'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Αποτελούμενο αποκλειστικά από<strong> 10 ψηφία</strong>!
								</Tooltip>
							}
							><Form.Label>Σταθερό τηλ.<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 																					
							<Form.Control required isInvalid = {firstFormButton.button6 === true && ((studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone)) || (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_telephone.length !== 10))}
								type="text" placeholder="Σταθερό τηλ."  className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_telephone}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_telephone: validator.trim(e.target.value)}}); 												
							}}
						/>   
						<Form.Control.Feedback type="invalid">
							*Το πεδίο πρέπει να αποτελείται αποκλειστικά από 10 ψηφία!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} id='person_mobilephone'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Αποτελούμενο αποκλειστικά από<strong> 10 ψηφία</strong>!
								</Tooltip>
							}
							><Form.Label>Κινητό<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 																					
							<Form.Control required isInvalid = {firstFormButton.button6 === true && ((studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== undefined && !validator.isNumeric(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone)) || (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone !== undefined && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_mobilephone.length !== 10))}
								type="text" placeholder="Κινητό" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_mobilephone}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_mobilephone: validator.trim(e.target.value)}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο πρέπει να αποτελείται αποκλειστικά από 10 ψηφία!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='contact_type'>
						    <Form.Label>Ιδιότητα Επαφής</Form.Label>								
							<Form.Control 
								type="text" placeholder="Ιδιότητα Επαφής" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.contact_type}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, contact_type: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='person_email'>
						    <Form.Label>Email επικοινωνίας</Form.Label>	
							<Form.Control required isInvalid = {firstFormButton.button6 === true && (studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email !== '' && studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email !== undefined && !validator.isEmail(studentInfo_PersonalInfo?.Third_Person_Contact_Details?.person_email))}
								type="text" placeholder="Email επικοινωνίας" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_email}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_email: validator.trim(e.target.value)}}); 												
							}}
						/>  
						<Form.Control.Feedback type="invalid">
							*Το πεδίο πρέπει να είναι έγκυρο!
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} id='person_address'>
						    <Form.Label>Διεύθυνση επικοινωνίας</Form.Label>								
							<Form.Control 
								type="text" placeholder="Διεύθυνση επικοινωνίας" className="control" value={studentInfo_PersonalInfo.Third_Person_Contact_Details?.person_address}								
								onChange={(e) => {setStudentInfo_PersonalInfo({...studentInfo_PersonalInfo, Third_Person_Contact_Details:{...studentInfo_PersonalInfo.Third_Person_Contact_Details, person_address: e.target.value.trimStart()}}); 												
							}}
						/>   
					</Form.Group>
					<Form.Group as={Col} id='person_address_second'> 
					</Form.Group>
				</Row>				
			</Form>			
		); 
		default:
			return 'Unknown step';
	}	
}	

const getStepContentSecond = (stepSecondForm) => {	 
	switch (stepSecondForm) {
		case 0:
			return (
				<Form>
					<Row className="mb-3">
						<Form.Group as={Col} id='department'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Τμήμα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.department === '' || studentInfo_StudentshipInfo?.General_Information?.department === undefined) ? true : false}
									type="text" placeholder="Τμήμα" className="control" value={studentInfo_StudentshipInfo.General_Information?.department}	readOnly	
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='department_number'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
								><Form.Label>Αριθμός Τμήματος<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
									<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.department_number === '' || studentInfo_StudentshipInfo?.General_Information?.department_number === undefined) ? true : false}
										type="text" placeholder="Τμήμα" className="control" value={studentInfo_StudentshipInfo.General_Information?.department_number}	readOnly
									/>
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='course'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Πρόγραμμα Σπουδών<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.course === '' || studentInfo_StudentshipInfo?.General_Information?.course === undefined) ? true : false}
									type="text" placeholder="Πρόγραμμα Σπουδών" className="control" value={studentInfo_StudentshipInfo.General_Information?.course}	readOnly	
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='course_number'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
								><Form.Label>Αριθμός Προγράμματος Σπουδών<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
									<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.course_number === '' || studentInfo_StudentshipInfo?.General_Information?.course_number === undefined) ? true : false}
										type="text" placeholder="Αριθμός Προγράμματος Σπουδών" className="control" value={studentInfo_StudentshipInfo.General_Information?.course_number} readOnly
									/>
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='academic_record_number'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>! (αποκλειστικά ψηφία)
									</Tooltip>
								}
							><Form.Label>Αριθμός Μητρώου<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={((secondFormButton.button1 === true && ((studentInfo_StudentshipInfo?.General_Information?.academic_record_number === '' || studentInfo_StudentshipInfo?.General_Information?.academic_record_number === undefined) || (studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== undefined && !validator.isNumeric(studentInfo_StudentshipInfo?.General_Information?.academic_record_number)))) || (studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_record_number !== undefined && existStudentByAEM === true)) ? true : false}
									type="text" placeholder="Αριθμός Μητρώου" className="control" value={studentInfo_StudentshipInfo.General_Information?.academic_record_number}	
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_record_number: validator.trim(e.target.value)}}); 												
								}}
							    />
							<Form.Control.Feedback type="invalid">
								{existStudentByAEM === true ? '*Ο συγκεκριμένος Αριθμός Μητρώου υπάρχει ήδη!' : '*Το πεδίο είναι υποχρεωτικό!'}
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='current_academic_semester'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Τρέχον Ακαδημαϊκό Εξάμηνο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && ((studentInfo_StudentshipInfo?.General_Information?.current_academic_semester === '' || studentInfo_StudentshipInfo?.General_Information?.current_academic_semester === undefined) ||
								    (studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== '' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== undefined && studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === 'Εαρινή' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester%2 !== 0) ||
									(studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== '' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== undefined && studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === 'Χειμερινή' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester%2 === 0) || 
									(studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== '' && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester !== undefined && studentInfo_StudentshipInfo?.General_Information?.current_academic_semester < 1)) ? true : false}
									style={{backgroundImage:'none'}}
									type="number" min={1} placeholder="Τρέχον Ακαδημαϊκό Εξάμηνο" className="control" value={studentInfo_StudentshipInfo.General_Information?.current_academic_semester}	
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, current_academic_semester: e.target.value.trimStart()}}); 												
								}}
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι συμβατό με την περίοδο φοιτησής! 
							</Form.Control.Feedback>
						</Form.Group>
					</Row>  
					<Row className="mb-3">						
						<Form.Group as={Col} id='current_attendance_period'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Τρέχουσα Περίοδος Φοίτησης<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === '' || studentInfo_StudentshipInfo?.General_Information?.current_attendance_period === undefined) ? true : false}
									type="text" min={1} placeholder="Τρέχουσα Περίοδος Φοίτησης" className="control" value={studentInfo_StudentshipInfo.General_Information?.current_attendance_period} readOnly />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό! 
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} id='current_academic_year'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Τρέχον Ακαδημαϊκό Έτος<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && (studentInfo_StudentshipInfo?.General_Information?.current_academic_year === '' || studentInfo_StudentshipInfo?.General_Information?.current_academic_year === undefined) ? true : false}
									type="number" min={1} placeholder="Τρέχον Ακαδημαϊκό Έτος" className="control" value={studentInfo_StudentshipInfo.General_Information?.current_academic_year} readOnly />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό! 
							</Form.Control.Feedback>
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='general_academic_record_number'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>! (αποκλειστικά ψηφία)
									</Tooltip>
								}
							><Form.Label>Αριθμός Γενικού Μητρώου<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && ((studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number === '' || studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number === undefined) || (studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== '' && studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number !== undefined && !validator.isNumeric(studentInfo_StudentshipInfo?.General_Information?.general_academic_record_number))) ? true : false}
									type="text" placeholder="Αριθμός Γενικού Μητρώου" className="control" value={studentInfo_StudentshipInfo.General_Information?.general_academic_record_number}	
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, general_academic_record_number: validator.trim(e.target.value)}}); 												
								}}
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='education_number'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										<strong>Ενιαίος Αρ. Εκπάιδευσης</strong>(Το πεδίο συμπληρώνεται αυτόματα με τη συμπλήρωση του πεδίου Αριθμός Γενικού Μητρώου)
									</Tooltip>
								}
							><Form.Label>E.A.E<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 																					
								<Form.Control  
									type="text" placeholder="E.A.E" className="control" value={studentInfo_StudentshipInfo.General_Information?.education_number} readOnly
							    />  
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='academic_email'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο! 
									</Tooltip>
								}
							><Form.Label>Ακαδημαϊκό email<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button1 === true && ((studentInfo_StudentshipInfo?.General_Information?.academic_email === '' || studentInfo_StudentshipInfo?.General_Information?.academic_email === undefined) || (studentInfo_StudentshipInfo?.General_Information?.academic_email !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_email !== undefined && !validator.isEmail(studentInfo_StudentshipInfo?.General_Information?.academic_email)) || (studentInfo_StudentshipInfo?.General_Information?.academic_email !== '' && studentInfo_StudentshipInfo?.General_Information?.academic_email !== undefined && !studentInfo_StudentshipInfo?.General_Information?.academic_email.endsWith('@uth.gr'))) ? true : false}
									type="text" placeholder="Ακαδημαϊκό email" className="control" value={studentInfo_StudentshipInfo.General_Information?.academic_email}	
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_email: validator.trim(e.target.value)}}); 												
								}}
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} controlId="student_situation">
							<Form.Label>Κατάσταση Φοιτητή</Form.Label> 
								<Form.Check  
									type="switch"  
									id="custom-switch"
									checked={studentInfo_StudentshipInfo?.General_Information?.student_situation}
									label={studentInfo_StudentshipInfo?.General_Information?.student_situation ? 'ΕΝΕΡΓΟΣ' : 'ΜΗ ΕΝΕΡΓΟΣ'}
									onChange={()=>setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, student_situation:!studentInfo_StudentshipInfo.General_Information.student_situation}})}
								/> 
					</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='academic_identity'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι υποχρεωτικό και συμπληρώνεται <strong>αυτόματα</strong> με τη συμπλήρωση του αντίστοιχου πεδίου στα Προσωπικά Στοιχεία
									</Tooltip>
								}
							><Form.Label>Ακαδημαϊκή Ταυτότητα<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 																					
								<Form.Control  
									type="text" placeholder="Ακαδημαϊκή Ταυτότητα" className="control" value={studentInfo_StudentshipInfo.General_Information?.academic_identity}	
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, academic_identity: validator.trim(e.target.value)}}); 												
								}}
							    /> 
						</Form.Group>
						<Form.Group as={Col} controlId="sub_attendance">
							<Form.Label>Μερικής Φοίτησης</Form.Label> 
								<Form.Check  
									type="switch"  
									id="custom-switch"
									checked={studentInfo_StudentshipInfo?.General_Information?.sub_attendance}
									label={studentInfo_StudentshipInfo?.General_Information?.sub_attendance ? 'ΝΑΙ' : 'ΟΧΙ'}									
									onChange={()=>setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, sub_attendance:!studentInfo_StudentshipInfo.General_Information.sub_attendance}})}
								/> 							
					</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='course_program_part'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Κατεύθυνση<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Select aria-label="Default select example" value={studentInfo_StudentshipInfo?.General_Information?.course_program_part} onChange={(e)=> {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo?.General_Information, course_program_part:e.target.value}}); document.getElementById('course_program_part').getElementsByClassName('errorValue')[0].style.display = 'none'; document.getElementById('course_program_part').getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6'; }}>
									<option style={{display:'none'}}>Επιλέξτε Κατεύθυνση</option>
									<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ (ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)">ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ (ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)</option>
									<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ (ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)">ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ (ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)</option> 
									<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}value="ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ">ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ</option> 
								</Form.Select> 
								<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό!</div>
						</Form.Group>
						<Form.Group as={Col} id='course_program_subpart'>
						    <Form.Label>Υπο-Κατεύθυνση</Form.Label>								
							<Form.Control 
								type="text" placeholder="Υπο-Κατεύθυνση" className="control" value={studentInfo_StudentshipInfo?.General_Information?.course_program_subpart}								
								onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, course_program_subpart: e.target.value.trimStart()}}); 												
								}}
							/>   
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='second_course_program_part'>
						    <Form.Label>Δεύτερη Κατεύθυνση</Form.Label>								
							<Form.Control 
								type="text" placeholder="Δεύτερη Κατεύθυνση" className="control" value={studentInfo_StudentshipInfo?.General_Information?.second_course_program_part}								
								onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, second_course_program_part: e.target.value.trimStart()}}); 												
								}}
							/>   
						</Form.Group>
						<Form.Group as={Col} id='second_course_program_subpart'>
						    <Form.Label>Δεύτερη Υποκατεύθυνση</Form.Label>								
							<Form.Control 
								type="text" placeholder="Δεύτερη Υποκατεύθυνση" className="control" value={studentInfo_StudentshipInfo?.General_Information?.second_course_program_subpart}								
								onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, second_course_program_subpart: e.target.value.trimStart()}}); 												
								}}
							/>   
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='total_fees'>
						    <Form.Label>Σύνολο Διδάκτρων</Form.Label>								
							<Form.Control 
								type="text" placeholder="Σύνολο Διδάκτρων" className="control" value={studentInfo_StudentshipInfo?.General_Information?.total_fees}								
								onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, total_fees: e.target.value.trimStart()}}); 												
								}}
							/>   
						</Form.Group>
						<Form.Group as={Col} id='comment_to_student'>
						    <Form.Label>Σχόλιο προς φοιτητή</Form.Label>								
							<Form.Control 
								as="textarea" placeholder="Σχόλιο προς φοιτητή" className="control" value={studentInfo_StudentshipInfo?.General_Information?.comment_to_student}
								onChange={(e) => setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, General_Information:{...studentInfo_StudentshipInfo.General_Information, comment_to_student: e.target.value.trimStart()}})
								}
							/>   
						</Form.Group>
					</Row> 
				</Form>			
			);
		case 1:
			return (
				<Form>
					<Row className="mb-3">
						<Form.Group as={Col} id='registration_yeminar'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> (συμπληρώνεται μόνο με ψηφία)!
									</Tooltip>
								}
							><Form.Label>Έτος Εισαγωγής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button2 === true && (studentInfo_StudentshipInfo?.Registration_Details?.registration_year === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_year === undefined || (studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== undefined  && studentInfo_StudentshipInfo?.Registration_Details?.registration_year > currentDate.getFullYear()) || (studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== '' && studentInfo_StudentshipInfo?.Registration_Details?.registration_year !== undefined  && !validator.isNumeric(studentInfo_StudentshipInfo?.Registration_Details?.registration_year))) ? true : false}
								    style={{backgroundImage:'none'}} type="number" min={1960} placeholder="Έτος Εισαγωγής" className="control" value={studentInfo_StudentshipInfo.Registration_Details?.registration_year}	
									onChange={(e) => setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Registration_Details:{...studentInfo_StudentshipInfo.Registration_Details, registration_year: e.target.value}})}	
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='registration_semester'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Εξάμηνο Εισαγωγής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button2 === true && (studentInfo_StudentshipInfo?.Registration_Details?.registration_semester === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_semester === undefined) ? true : false}
									style={{backgroundImage:'none'}} type="number" min={1} placeholder="Εξάμηνο Εισαγωγής" className="control" value={studentInfo_StudentshipInfo.Registration_Details?.registration_semester}	
									onChange={(e) => setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Registration_Details:{...studentInfo_StudentshipInfo.Registration_Details, registration_semester: e.target.value}})}	
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback> 
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='registration_period'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Περίοδος Εισαγωγής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Select aria-label="Default select example" value={studentInfo_StudentshipInfo?.Registration_Details?.registration_period} onChange={(e)=> {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Registration_Details:{...studentInfo_StudentshipInfo?.Registration_Details, registration_period:e.target.value}}); document.getElementById('registration_period').getElementsByClassName('errorValue')[0].style.display = 'none'; document.getElementById('registration_period').getElementsByClassName('form-select')[0].style.border = '1px solid #dee2e6'; }}>
									<option style={{display:'none'}}>Επιλέξτε Περίοδο Εισαγωγής</option>
									<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="Χειμερινή">Χειμερινή</option>
									<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="Εαρινή">Εαρινή</option>  
								</Form.Select> 
								<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό!</div>
						</Form.Group>
						<Form.Group as={Col} id='registration_way'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Τρόπος Εισαγωγής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Control required isInvalid={secondFormButton.button2 === true && (studentInfo_StudentshipInfo?.Registration_Details?.registration_way === '' || studentInfo_StudentshipInfo?.Registration_Details?.registration_way === undefined) ? true : false}
									type="text" min={1} placeholder="Τρόπος Εισαγωγής" className="control" value={studentInfo_StudentshipInfo.Registration_Details?.registration_way}	
									onChange={(e) => setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Registration_Details:{...studentInfo_StudentshipInfo.Registration_Details, registration_way: e.target.value}})}	
							    />
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό!
							</Form.Control.Feedback> 
						</Form.Group>
					</Row> 
				</Form>
			);	
		case 2:
			return (
				<Form>
					<Row className="mb-3">
						<Form.Group as={Col} id='professorAdvisor_FirstName'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Όνομα Καθηγητή<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Select aria-label="professorAdvisor_FirstName" value={studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName} onChange={(e)=> selectProfessor(e.target.value, 'professorAdvisor_FirstName')}>
									<option style={{display:'none'}}>{studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName !== undefined ? studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_FirstName : 'Επιλέξτε Όνομα Καθηγητή'}</option>
									{allProfessors.map((prof, index) => {
										return (
											<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} key={index} value={[prof.prof_first, prof.prof_last, prof.prof_email]}>{prof.prof_first + ' ' + prof.prof_last}</option>
										)
									})} 
								</Form.Select> 
								<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό!</div>
						</Form.Group>
						<Form.Group as={Col} id='professorAdvisor_LastName'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Επώνυμο Καθηγητή<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Select aria-label="professorAdvisor_LastName" value={studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName} onChange={(e)=> selectProfessor(e.target.value, 'professorAdvisor_LastName')}>
									<option style={{display:'none'}}>{studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName !== undefined ? studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_LastName : 'Επιλέξτε Επώνυμο Καθηγητή'}</option>
									{allProfessors.map((prof, index) => {
										return (
											<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} key={index} value={[prof.prof_first, prof.prof_last, prof.prof_email]}>{prof.prof_last + ' ' + prof.prof_first}</option>
										)
									})} 
								</Form.Select> 
								<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό!</div>
						</Form.Group>
					</Row> 
					<Row className="mb-3">
						<Form.Group as={Col} id='professorAdvisor_Email'>								
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong>!
									</Tooltip>
								}
							><Form.Label>Email Καθηγητή<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>							
								<Form.Select aria-label="professorAdvisor_Email" value={studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email} onChange={(e) => selectProfessor(e.target.value, 'professorAdvisor_Email')}>
									<option style={{display:'none'}}>{studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== '' && studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email !== undefined ? studentInfo_StudentshipInfo?.Professor_Advisor_Details?.professorAdvisor_Email : 'Επιλέξτε Email Καθηγητή'}</option>
									{allProfessors.map((prof, index) => {
										return (
											<option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} key={index} value={[prof.prof_first, prof.prof_last, prof.prof_email]}>{prof.prof_email}</option>
										)
									})} 
								</Form.Select> 
								<div className='errorValue'>*Το πεδίο είναι υποχρεωτικό!</div>
						</Form.Group>
						<Form.Group as={Col} id='professorAdvisor_LastName_second'>							 
						</Form.Group>
					</Row> 
				</Form>
			);	
		case 3 : 	
			return ( 
				<Form>
					<Row className="mb-3">
						<Form.Group as={Col} id='totalNumber_succesCompulsoryCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 28)!
									</Tooltip>
								}
							><Form.Label>Περασμένα Υποχρεωτικά Μαθήματα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses > 28)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesCompulsoryCourses > 28)))}
									style={{backgroundImage:'none'}} min={0} max={28} type="number" placeholder="Περασμένα Υποχρεωτικά Μαθήματα" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_succesCompulsoryCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_succesCompulsoryCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 28)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='totalNumber_succesElectiveCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 19)!
									</Tooltip>
								}
							><Form.Label>Περασμένα Μαθήματα Επιλογής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses > 19)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_succesElectiveCourses > 19)))}
									style={{backgroundImage:'none'}} min={0} max={19} type="number" placeholder="Περασμένα Μαθήματα Επιλογής" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_succesElectiveCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_succesElectiveCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 19)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='totalNumber_failedCompulsoryCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Μη Περασμένα Υποχρεωτικά Μαθήματα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses < 0 )))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Μη Περασμένα Υποχρεωτικά Μαθήματα" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_failedCompulsoryCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_failedCompulsoryCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='totalNumber_failedElectiveCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Μη Περασμένα Μαθήματα Επιλογής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCompulsoryCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses < 0)))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Μη Περασμένα Μαθήματα Επιλογής" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_failedElectiveCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_failedElectiveCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='totalNumber_successCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 47)!
									</Tooltip>
								}
							><Form.Label>Σύνολο Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedElectiveCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses < 0 || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_successCourses > 47 )))}
									style={{backgroundImage:'none'}} min={0} max={28} type="number" placeholder="Σύνολο Περασμένων Μαθημάτων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_successCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_successCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 47)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='totalNumber_failedCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Σύνολο Μη Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === undefined|| studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.totalNumber_failedCourses < 0)))}
									style={{backgroundImage:'none'}} min={0} max={28} type="number" placeholder="Μη Περασμένα Μαθήματα Επιλογής" className="control" value={studentInfo_StudentshipInfo.Grade_State?.totalNumber_failedCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, totalNumber_failedCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='ECTS_compulsoryCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>ECTS Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_compulsoryCourses < 0 )))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="ECTS Περασμένων Μαθημάτων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.ECTS_compulsoryCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, ECTS_compulsoryCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='ECTS_electiveCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>ECTS Μη Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_electiveCourses < 0)))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="ECTS Μη Περασμένων Μαθημάτων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.ECTS_electiveCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, ECTS_electiveCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='units_compulsoryCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Δ.Μ Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.units_compulsoryCourses < 0 )))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Δ.Μ Περασμένων Μαθημάτων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.units_compulsoryCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, units_compulsoryCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='units_electiveCourses'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Δ.Μ Μη Περασμένων Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses === '' || studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses !== '' && (studentInfo_StudentshipInfo?.Grade_State?.units_electiveCourses < 0)))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Δ.Μ Μη Περασμένων Μαθημάτων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.units_electiveCourses}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, units_electiveCourses: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='ECTS_total'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Σύνολο ECTS Μονάδων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.ECTS_total === '' || studentInfo_StudentshipInfo?.Grade_State?.ECTS_total < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.ECTS_total !== undefined && studentInfo_StudentshipInfo?.Grade_State?.ECTS_total !== '' && (studentInfo_StudentshipInfo?.Grade_State?.ECTS_total < 0 )))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Σύνολο ECTS Μονάδων" className="control" value={studentInfo_StudentshipInfo.Grade_State?.ECTS_total}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, ECTS_total: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='units_total'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
									</Tooltip>
								}
							><Form.Label>Σύνολο Δ.Μ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.units_total === undefined || studentInfo_StudentshipInfo?.Grade_State?.units_total === '' || studentInfo_StudentshipInfo?.Grade_State?.units_total < 0)) || (studentInfo_StudentshipInfo?.Grade_State?.units_total !== undefined && studentInfo_StudentshipInfo?.Grade_State?.units_total !== '' && (studentInfo_StudentshipInfo?.Grade_State?.units_total < 0)))}
									style={{backgroundImage:'none'}} min={0} type="number" placeholder="Σύνολο Δ.Μ" className="control" value={studentInfo_StudentshipInfo?.Grade_State?.units_total}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, units_total: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0)!
							</Form.Control.Feedback>  
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} id='grade_average'>
							<OverlayTrigger
								key='right'
								placement='right'									
								overlay={
									<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
										Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 10)!
									</Tooltip>
								}
							><Form.Label>Μέσος Όρος Μαθημάτων<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>															
								<Form.Control required isInvalid ={((secondFormButton.button4 === true && (studentInfo_StudentshipInfo?.Grade_State?.grade_average === undefined || studentInfo_StudentshipInfo?.Grade_State?.grade_average === '' || studentInfo_StudentshipInfo?.Grade_State?.grade_average < 0 || studentInfo_StudentshipInfo?.Grade_State?.grade_average > 10)) || (studentInfo_StudentshipInfo?.Grade_State?.grade_average !== undefined && studentInfo_StudentshipInfo?.Grade_State?.grade_average !== '' && (studentInfo_StudentshipInfo?.Grade_State?.grade_average < 0  || studentInfo_StudentshipInfo?.Grade_State?.grade_average)))}
									style={{backgroundImage:'none'}} min={0} max={10} type="number" placeholder="Μέσος Όρος Μαθημάτων" className="control" value={Number(studentInfo_StudentshipInfo.Grade_State?.grade_average)}								
									onChange={(e) => {setStudentInfo_StudentshipInfo({...studentInfo_StudentshipInfo, Grade_State:{...studentInfo_StudentshipInfo.Grade_State, grade_average: e.target.value.trimStart()}}); 												
								}}
							/>  
							<Form.Control.Feedback type="invalid">
								*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (μεγαλύτερο ή ίσο από 0 και μικρότερο ή ίσο από 10)!
							</Form.Control.Feedback>  
						</Form.Group>
						<Form.Group as={Col} id='grade_average_second'> 
							<Form.Label style={{display:'none'}}>Σύνολο Δ.Μ</Form.Label>		 
						</Form.Group>
					</Row>
				</Form>
			);
		default:
			return 'Unknown step'; 
		}
} 
    return (
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={STUDENTS} alt='' /></div>
                    <div className="title"> Φοιτητές 
                        <p>Προπτυχιακοί Φοιτητές - Μεταπτυχιακοί Φοιτητές - Ισοτιμίας </p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text" style={{fontWeight:'600'}}>Με τη φόρμα που ακολουθεί μπορείτε να επεξεργαστείτε τα στοιχεία του φοιτητή (Προπτυχιακού ή Μεταπτυχιακού Προγράμματος Σπουδών) που επιθυμείτε. Παρακαλώ συμπληρώστε κατάλληλα τα ανανεωμένα στοιχεία στη φόρμα που ακολουθεί. Με την υποβολή των στοιχείων, η Ηλεκτρονική Γραμματεία θα ανανεώσει τα καταχωρημένα στη Βάση Δεδομένων στοιχεία του συγκεκριμένου φοιτητή του τμήματος.</div>           
                </div> 
                <div className='root'>
				    <h1 className="main_title">Επεξεργασία Προφίλ Φοιτητή</h1>
                </div>
				<Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1, marginTop:'-3rem', marginBottom:'5rem' }}>
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

                {editStudent.state === undefined || editStudent.state === null ?
				<div style={{marginBottom:'4rem', marginTop:'-3.5rem'}}>
				<div className="search_text" style={{marginBottom:'2rem', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', fontSize:'16px', fontWeight : '500', color : '#6a6a6a'}}>Παρακαλώ επιλέξτε τον φοιτητή τα στοιχεία του οποίου επιθυμείτε να επεξεργαστείτε, εισάγοντας το <strong style={{color:'#17a2b8', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>username</strong> του στην παρακάτω μπάρα αναζήτησης !</div>
				<div className='form-item_search_courses' style={{marginBottom:'1rem', display:'flex', gap:'10px'}} id='password'>  
					<FcSearch className='react-icon'/> 
					<Select
						 defaultValue={editStudent?.username}
						 isMulti={false}  
						 options={allStudents} 
						 onChange={(e) => {setEditStudent({...editStudent, username:e.label}) ; setEditStudentData(e.value)}}
						 className="basic-multi-select"
						 classNamePrefix="select"
					/>
				</div>
				</div>
				: null}

                <div className='form_container'>
				<Box
					sx={{
						bgcolor: 'background.paper',
						width: 500,
						position: 'relative',
						minHeight: 200, 
					}}
					>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="action tabs example"
						>
						<Tab icon = {<BsFillPersonLinesFill/>} value={0} label="ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ" {...a11yProps(0)} />
						<Tab icon={<FaUserGraduate/>} value={1} label="ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ" {...a11yProps(1)} /> 
						</Tabs>
					</AppBar>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<Stepper activeStep={activeStepFirstForm} orientation="vertical"> 
								{steps.map((label, index) => (
									<Step key={index} style={{display:index === 6 ? 'none' : 'block'}}>
										<StepLabel>{label}</StepLabel> 
										<StepContent>
											{getStepContent(index)} 
											<div className={classes.actionsContainer}>
												<div style={{marginTop:'-0.005rem'}}>
													<Button
														disabled={activeStepFirstForm === 0}
														onClick={handleBack}
														className={classes.button}
														style={{marginRight:'1rem'}} 										
													>
														Back
													</Button>
													<Button															 
														variant="contained"
														color="primary"
														onClick={handleNext}
														className={classes.button}											
														
													>
														{activeStepFirstForm === steps.length - 1 ?
														'Finish': 'Next'}														
													</Button>
												</div>
											</div>
										</StepContent>
									</Step>
								))}
							</Stepper>
							{activeStepFirstForm === steps.length && isAdding === false && (
								<Button 
									onClick={handleBack}
									className={classes.button}
									style={{marginLeft:'4rem', marginTop:'-0.3rem', marginBottom:'3rem', color:'#17a2b8'}} 										
								>
									Countercheck
								</Button>
							)}
							{activeStepFirstForm === steps.length && activeStepSecondForm === steps_second.length && isAdding === false &&(
								<Button	
								style={{backgroundColor:'#17a2b8', color:'white', marginTop:'-3.25rem', marginLeft:'-2.5rem'}}
								variant="contained"								 
								onClick={() => editStudent_mutation()}
								className={classes.button}	
							>
								READY 													
							</Button>
							)}							
							{isAdding === true && (												 
							<>				 
								<Paper style={{backgroundColor:'transparent'}} square elevation={0} className={classes.resetContainer}>							
									<div className="submitted" style={{display:'flex', gap:'2rem', alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}> 
									<FcOk style={{fontSize:'75px', verticalAlign:'middle', position:'inline'}}/>
									<div className="registration_text" style={{fontSize: '1.5rem', fontWeight:'700', letterSpacing:'2px', color : 'hsl(197, 96%, 18%)', textAlign:'center',
													fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}}>Επιτυχής Καταχώρηση Φοιτητή !</div>
									</div>
								</Paper>
							<button 
									onClick={() => {setAllStudents([]); handleReset();}}
									onMouseEnter={()=>setIsHovering(true)}
									onMouseLeave={()=>setIsHovering(false)}
									style={{fontSize: '1.4rem', fontWeight:'600', letterSpacing:'2px', color : isHovering ? '#17a2b8':'#f09f09', display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:'auto', marginTop:'-1rem' , border:'0px solid transparent',
											textTransform:'none', textShadow:'1px 1px 1px gray', backgroundColor:'transparent',
										    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}} className={classes.button}>
								Νέα Επεξεργασία
							</button>
							</> )}	
						{isAdding === false && (
						<IconButton color="red" aria-label="add an alarm" onClick={()=>setValue(1)}>
							<SkipNextIcon/>
						</IconButton> )}
						</TabPanel>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<Stepper  activeStep={activeStepSecondForm} orientation="vertical">
								{steps_second.map((label, index) => (
									<Step key={index}>
										<StepLabel>{label}</StepLabel>
										<StepContent>
											{getStepContentSecond(index)} 
											<div className={classes.actionsContainer}>
												<div style={{marginTop:'-0.005rem'}}>
													<Button
														disabled={activeStepSecondForm === 0}
														onClick={handleBackSecond}
														className={classes.button}
														style={{marginRight:'1rem'}} 										
													>
														Back
													</Button> 
													<Button			 						     
														variant="contained"
														color="primary"
														onClick={handleNextSecond}
														className={classes.button}											
														
													>
														{activeStepSecondForm === steps_second.length - 1 ?
														'Finish': 'Next'}
														
													</Button>  
												</div>
											</div>
										</StepContent>
									</Step>
								))}
							</Stepper>
							{activeStepSecondForm === steps_second.length && isAdding === false && (
								<Button 
									onClick={handleBackSecond}
									className={classes.button}
									style={{marginLeft:'4rem', marginTop:'-0.3rem', marginBottom:'3rem', color:'#17a2b8'}} 										
								>
									Countercheck
								</Button>
						   )}
						   {activeStepSecondForm === steps_second.length && activeStepFirstForm === steps.length && isAdding === false &&  (
								<Button	
								style={{backgroundColor:'#17a2b8', color:'white', marginTop:'-3.25rem', marginLeft:'-2.5rem'}}
								variant="contained"								 
								onClick={() => editStudent_mutation()}
								className={classes.button}
							>
								READY 													
							</Button>
							)}		
						   {isAdding === true && (												 
							<>				 
								<Paper style={{backgroundColor:'transparent'}} square elevation={0} className={classes.resetContainer}>							
									<div className="submitted" style={{display:'flex', gap:'2rem', alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}> 
									<FcOk style={{fontSize:'75px', verticalAlign:'middle', position:'inline'}}/>
									<div className="registration_text" style={{fontSize: '1.5rem', fontWeight:'700', letterSpacing:'2px', color : 'hsl(197, 96%, 18%)', textAlign:'center',
													fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}}>Επιτυχής Επεξεργασία Φοιτητή !</div>
									</div>
								</Paper>
							<button 
									onClick={() => {setAllStudents([]);  handleReset()}}
									onMouseEnter={()=>setIsHovering(true)}
									onMouseLeave={()=>setIsHovering(false)}
									style={{fontSize: '1.4rem', fontWeight:'600', letterSpacing:'2px', color : isHovering ? '#17a2b8':'#f09f09', display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:'auto', marginTop:'-1rem' , border:'0px solid transparent',
											textTransform:'none', textShadow:'1px 1px 1px gray', backgroundColor:'transparent',
										    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}} className={classes.button}>
								Νέα Επεξεργασία
							</button>
							</> )}
							 
							{isAdding === false && (
							<IconButton color="red" style={{marginLeft:'25px', marginRight:'auto'}} aria-label="add an alarm" onClick={()=>setValue(0)}>
								<SkipPreviousIcon/>
							</IconButton> )}
						</TabPanel>		 
					</SwipeableViews>									  
					</Box>
					<Snackbar open={openAlertSubmit} autoHideDuration={6000} onClose={handleCloseAlertSubmit}>
						<Alert onClose={handleCloseAlertSubmit} severity="success" sx={{ width: '50%', fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
							<div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";'}}>Η ανανέωση εξαμήνου, περιόδου και ακαδημαϊκού έτους για όλους τους φοιτητές του τμήματος πραγματοποιήθηκε με επιτυχία !</div>
						</Alert>
					</Snackbar>
                </div>				 	
            </div> 
        </div>
    )
}

export default EditStudentContainer;