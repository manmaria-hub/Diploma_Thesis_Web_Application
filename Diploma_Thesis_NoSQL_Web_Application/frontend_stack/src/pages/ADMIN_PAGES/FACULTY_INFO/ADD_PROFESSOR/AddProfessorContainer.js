import React , {useState, useEffect} from "react";  

import {Form , Col, Row} from 'react-bootstrap';
import { Stepper, Step, StepLabel, StepContent, Button, Paper} from "@material-ui/core"; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';   
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";
import validator from "validator";

// GraphQL resolvers
import hallsResolvers from "../../../../graphql/resolvers/halls";
import professorsResolvers from "../../../../graphql/resolvers/professors";

// Icons 
import PROFESSORS from '../../../../Icons/PROFESSORS/faculty.png';
import UTH_LOGO from '../../../../../src/Icons/uth-logo-background.png';
import {FcOk} from 'react-icons/fc';
import {IoMdInformationCircleOutline} from 'react-icons/io';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/FACULTY_INFO/ADD_PROFESSOR/addProfessorContainer.scss' 

const AddProfessorContainer = () => {
	
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	  }

	const [professorInfo,setProfessorInfo] = useState({
		PERSONAL_INFO:{first_name:"", last_name : "", father_FirstName :'' , father_LastName:'', mother_FirstName:"", mother_LastName:"", maiden_name:"", family:"", gender:'Άρρεν', active:false},
		ACADEMIC_INFO : {departmentName:'ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ', category : '', professor_type:'', position:'', office :'', office_hours :'', office_email : '', office_telephone : '', specialization : '', diploma: '', doctorat:'', website : '', CV : '', scholar :'', academic_email : '', username : '' },
		INSURANCE_INFO : {AMKA:'', AMKA_country:'', AFM:'', AFM_country:'', DOY:'', nationality:'', identity_number : '', identity_type : ''},
		COMMUNICATION_DETAILS : {telephone: '', mobile : '', alternative_email : '', city:'', road:'', number:'', region:'', postcode:''}
	})
	let backUpProfessor = {PERSONAL_INFO:{first_name:"", last_name : "", father_FirstName :'' , father_LastName:'', mother_FirstName:"", mother_LastName:"", maiden_name:"", family:"", gender:'Άρρεν', active:false},
	ACADEMIC_INFO : {departmentName:'ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ', category : '', professor_type:'', position:'', office :'', office_hours :'', office_email : '', office_telephone : '', specialization : '', diploma: '', doctorat:'', website : '', CV : '', scholar :'', academic_email : '', username : '' },
	INSURANCE_INFO : {AMKA:'', AMKA_country:'', AFM:'', AFM_country:'', DOY:'', nationality:'', identity_number : '', identity_type : ''},
	COMMUNICATION_DETAILS : {telephone: '', mobile : '', alternative_email : '', city:'', road:'', number:'', region:'', postcode:''}};

	let [emptyProfessorsOffices, setEmptyProfessorsOffices] = useState([]);

	// State Variable that determines the existence of professor by username (student's usernames must be uniques)
	const [existProfessorByUsername, setExistProfessorByUsername] = useState(false);
	// State Variable that determines the existence of student by uth_email (student's university emails must be uniques)
	const [existProfessorByUthEmail, setExistProfessorByUthEmail] = useState(false); 
	// State Variable that determines the existence of student by AMKA (student's AMKAs must be uniques)
	const [existProfessorByAMKA, setExistProfessorByAMKA] = useState(false);
	// State Variable that determines the existence of student by AFM (student's AFMs must be uniques)
	const [existProfessorByAFM, setExistProfessorByAFM] = useState(false);

	// Store the last registration to continue to deletion if the user want it
	let [lastRegistration, setLastRegistration] = useState();

	// State variable that handles the next button click (FIRST FORM)
	const [firstFormButton, setFirstFormButton] = useState({button1:false, button2:false, button3:false, button4:false});
	
	// Call the suitable resolver to get all empty professor offices
	if (emptyProfessorsOffices === [] || emptyProfessorsOffices.length===0) {
		hallsResolvers.get_all_empty_professor_offices()
			.then(result=> { 
				setEmptyProfessorsOffices(result?.data?.getAllEmptyProfessorsOffices)
			})
			.catch(err=> {
				console.log(err)
			})
	}
 
	const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '90.7%',
		},
		button: {
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

// Checking if the professor's username input already exist in database
useEffect(() => {
	professorsResolvers.exist_professor_by_username(professorInfo?.ACADEMIC_INFO?.username)
		.then(result=> { 
			result?.data?.existBy_ProfessorUsername === true ? setExistProfessorByUsername(true) : setExistProfessorByUsername(false); 
		})
		.catch(error=> {
			throw error;
		})
}, [professorInfo?.ACADEMIC_INFO?.username])

// Checking if the professor's uth_email input already exist in database
useEffect(() => {
	professorsResolvers.exist_professor_by_uth_email(professorInfo?.ACADEMIC_INFO?.academic_email)
		.then(result=> { 
			result?.data?.existBy_ProfessorUthEmail === true ? setExistProfessorByUthEmail(true) : setExistProfessorByUthEmail(false); 
		})
		.catch(error=> {
			throw error;
		})
}, [professorInfo?.ACADEMIC_INFO?.academic_email]) 

// Checking if the professor's AMKA input already exist in database
useEffect(() => {
	professorsResolvers.exist_professor_by_AMKA(professorInfo?.INSURANCE_INFO?.AMKA)
		.then(result=> { 
			result?.data?.existBy_ProfessorAMKA === true ? setExistProfessorByAMKA(true) : setExistProfessorByAMKA(false); 
		})
		.catch(error=> {
			throw error;
		})
}, [professorInfo?.INSURANCE_INFO?.AMKA])

// Checking if the professor's AFM input already exist in database
useEffect(() => {
	professorsResolvers.exist_professor_by_AFM(professorInfo?.INSURANCE_INFO?.AFM)
		.then(result=> { 
			result?.data?.existBy_ProfessorAFM === true ? setExistProfessorByAFM(true) : setExistProfessorByAFM(false); 
		})
		.catch(error=> {
			throw error;
		})
}, [professorInfo?.INSURANCE_INFO?.AFM])

const checkFirstStep = () => {
	let isValid = true; 
	if (professorInfo.PERSONAL_INFO.first_name === '' || professorInfo.PERSONAL_INFO.first_name === undefined) { 
		isValid = false;
	}
	if (professorInfo.PERSONAL_INFO.last_name === '' || professorInfo.PERSONAL_INFO.last_name === undefined) { 
		isValid = false;
	}
	if (professorInfo.PERSONAL_INFO.father_FirstName === '' || professorInfo.PERSONAL_INFO.father_FirstName === undefined) {		 
		isValid = false;
	}
	if (professorInfo.PERSONAL_INFO.mother_FirstName === '' || professorInfo.PERSONAL_INFO.mother_FirstName === undefined) { 
		isValid = false;
	}
	if (professorInfo.PERSONAL_INFO.gender === '' || professorInfo.PERSONAL_INFO.gender === undefined) { 
		document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'flex';
		isValid = false;
	}	
	return (isValid)
}

const checkSecondStep = () => {
	let isValid = true; 
	if (professorInfo.ACADEMIC_INFO.username === '' || professorInfo.ACADEMIC_INFO.username === undefined || existProfessorByUsername === true ) { 
		isValid = false; 
	}
	if (professorInfo.ACADEMIC_INFO.professor_type === '' || professorInfo.ACADEMIC_INFO.professor_type === undefined) {
		document.getElementById('professorType').getElementsByClassName('errorValue')[0].style.display = 'flex';
		document.getElementById('professorType').getElementsByClassName('form-select')[0].style.border = '1px solid red';		 
		isValid = false; 
	}
	if (professorInfo.ACADEMIC_INFO.academic_email === '' || professorInfo.ACADEMIC_INFO.academic_email === undefined || !validator.isEmail(professorInfo.ACADEMIC_INFO.academic_email) || existProfessorByUthEmail === true  || !professorInfo.ACADEMIC_INFO.academic_email.startsWith(professorInfo.ACADEMIC_INFO.username)) { 
		isValid = false; 
	} 
	if (professorInfo.ACADEMIC_INFO.specialization === '' || professorInfo.ACADEMIC_INFO.specialization === undefined) { 
		isValid = false; 
	}
	if (professorInfo.ACADEMIC_INFO.doctorat === '' || professorInfo.ACADEMIC_INFO.doctorat === undefined) { 
		isValid = false; 
	} 	
	if (professorInfo.ACADEMIC_INFO.office_telephone === '' || professorInfo.ACADEMIC_INFO.office_telephone.length !==  10 || professorInfo.ACADEMIC_INFO.office_telephone === undefined || !validator.isNumeric(professorInfo.ACADEMIC_INFO.office_telephone))  { 
		isValid = false; 
	} 
	if (professorInfo.ACADEMIC_INFO.office_email === '' || professorInfo.ACADEMIC_INFO.office_email === undefined || !validator.isEmail(professorInfo.ACADEMIC_INFO.office_email))  { 
		isValid = false; 
	}  
	if (professorInfo.ACADEMIC_INFO.category === '' || professorInfo.ACADEMIC_INFO.category === undefined) {
		document.getElementById('category').getElementsByClassName('errorValue')[0].style.display = 'flex';
		document.getElementById('category').getElementsByClassName('form-select')[0].style.border = '1px solid red';
		isValid = false; 
	}

	if (!validator.isEmail(professorInfo.ACADEMIC_INFO.office_email)) {
		isValid = false; 
	}
	return (isValid)
}

const checkThirdStep = () => {
	let isValid = true; 
	if (professorInfo.INSURANCE_INFO.AMKA === '' || professorInfo.INSURANCE_INFO.AMKA === undefined || !validator.isNumeric(professorInfo.INSURANCE_INFO.AMKA) || professorInfo.INSURANCE_INFO.AMKA.length !== 11 ) { 			
		    isValid = false;			
	} 
	if (professorInfo.INSURANCE_INFO.AFM === '' || professorInfo.INSURANCE_INFO.AFM === undefined || !validator.isNumeric(professorInfo.INSURANCE_INFO.AFM) || professorInfo.INSURANCE_INFO.AFM.length !== 9 ) {
		isValid = false;	
	}  	
	return (isValid)
}


const checkFourthStep = () => {
	let isValid = true; 
	if (professorInfo.COMMUNICATION_DETAILS.telephone === '' || professorInfo.COMMUNICATION_DETAILS.telephone === undefined || professorInfo.COMMUNICATION_DETAILS.telephone.length !== 10 || !validator.isNumeric(professorInfo.COMMUNICATION_DETAILS.telephone)) {
		isValid = false;	
	} 
	if (professorInfo.COMMUNICATION_DETAILS.mobile === '' || professorInfo.COMMUNICATION_DETAILS.mobile === undefined || professorInfo.COMMUNICATION_DETAILS.mobile.length !== 10 || !validator.isNumeric(professorInfo.COMMUNICATION_DETAILS.mobile)) {
		isValid = false;	
	}  	
	return (isValid)
}

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		let isOK=true;
		if (activeStep === 0 ) {
			setFirstFormButton({...firstFormButton, button1:true});
			isOK = checkFirstStep();
		}
		if (activeStep === 1 ) {
			setFirstFormButton({...firstFormButton, button2:true});
			isOK = checkSecondStep();
		}
		if (activeStep === 2) {
			setFirstFormButton({...firstFormButton, button3 : true});
			isOK = checkThirdStep();
		}
		if (activeStep === 3 ) {
			setFirstFormButton({...firstFormButton, button4 : true})
			isOK = checkFourthStep();
			if (isOK === true) {prepareInsertion()}
		}
		
		if (isOK === true) {
			console.log(activeStep)
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	function getSteps() {
		return [<b style={{ color: '#17a2c8', marginLeft:'1rem', marginBottom:'2rem', fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' }}>
			Προσωπικά Στοιχεία</b>,
			<b style={{ color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' }}>
			Ακαδημαϊκά Στοιχεία</b>,
			<b style={{color: '#17a2c8', marginLeft:'1rem' , fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' }}>
			Ασφαλιστικά Στοιχεία - Ταυτότητα</b>,
			<b style={{color: '#17a2c8', marginLeft:'1rem', fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' }}>
			Στοιχεία Επικοινωνίας</b>, ];
	} 

	const prepareInsertion = () => {	
		console.log(professorInfo) ;
		// First create the new professor
		if (professorInfo.PERSONAL_INFO.first_name !== '') {
		professorsResolvers.add_new_professor(professorInfo)
			.then(result => {
				console.log(result)
				setLastRegistration(result?.data?.addNewProfessor)
				setProfessorInfo(backUpProfessor)
			})
			.catch(err=> {
				console.log(err)
			})
		// Next, update the office information
		hallsResolvers.update_professor_owner_office(professorInfo.ACADEMIC_INFO.office, professorInfo.PERSONAL_INFO.last_name + ' ' + professorInfo.PERSONAL_INFO.first_name, professorInfo.ACADEMIC_INFO.academic_email)
			.then(result => {
				return(result)
			})
			.catch(err=> {
				console.log(err)
			})
		}
	}

	const deleteProfessor = () => {
		console.log(lastRegistration);
		// Delete Last Professor By its Id
		professorsResolvers.delete_professor_by_id(lastRegistration._id)
		.then(result => {
			console.log(result)
		})
		.catch(err=> {
			console.log(err)
		})
		// MAKE OFFICE EMPTY
	    hallsResolvers.update_professor_owner_office(lastRegistration.ACADEMIC_INFO.office,  '', '')
			.then(result => {
				return(result)
			})
			.catch(err=> {
				console.log(err)
			})

		handleReset()
		
	}
	console.log(existProfessorByUsername)

		const getStepContent = (step) =>{	
			switch (step) {
				case 0:
					return (
						<Form style= {{marginTop:'2rem'}}>
							<Row className="mb-3" id='first_name'>
								<Form.Group as={Col} >
								<OverlayTrigger
									key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
											<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
										</Tooltip>
									}
								><Form.Label>Όνομα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>														
								<Form.Control required isInvalid={firstFormButton.button1 === true && (professorInfo.PERSONAL_INFO.first_name === '' || professorInfo.PERSONAL_INFO.first_name === undefined) ? true : false}
									type="text" placeholder="Όνομα" className="control" value={professorInfo.PERSONAL_INFO.first_name}
									onChange={(e)=>{setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO, first_name:e.target.value.trimStart()}});
									}	}
								/> 
									<Form.Control.Feedback type="invalid">
										*Το πεδίο είναι υποχρεωτικό!
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group as={Col}  id='last_name'>
								<OverlayTrigger
									key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
											<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
										</Tooltip>
									}
								><Form.Label>Επώνυμο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
								<Form.Control required isInvalid={firstFormButton.button1 === true && (professorInfo.PERSONAL_INFO.last_name === '' || professorInfo.PERSONAL_INFO.last_name === undefined) ? true : false}
								    type="text" placeholder="Επώνυμο"  value={professorInfo.PERSONAL_INFO.last_name}
									onChange={(e)=>{setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,last_name:e.target.value.trimStart()}});}}/>
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
											<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
										</Tooltip>
									}
								><Form.Label>Πατρώνυμο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
								<Form.Control required isInvalid={firstFormButton.button1 === true && (professorInfo.PERSONAL_INFO.father_FirstName === '' || professorInfo.PERSONAL_INFO.father_FirstName === undefined) ? true : false}
								    type="text" placeholder="Πατρώνυμο"  value={professorInfo.PERSONAL_INFO.father_FirstName}
									onChange={(e)=>{setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,father_FirstName:e.target.value.trimStart()}})
									}}/>
									<Form.Control.Feedback type="invalid">
										*Το πεδίο είναι υποχρεωτικό!
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group as={Col}  id='father_LastName'>
								<Form.Label>Επώνυμο Πατρός</Form.Label>
								<Form.Control type="text" placeholder="Επώνυμο Πατρός"  value={professorInfo.PERSONAL_INFO.father_LastName}
								onChange={(e)=>setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,father_LastName:e.target.value.trimStart()}})}/> 
								</Form.Group>
							</Row>

							<Row className="mb-3">
								<Form.Group as={Col} id='mother_FirstName'>								
								<OverlayTrigger
									key='right'
									placement='right'									
									overlay={
										<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
											<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
										</Tooltip>
									}
								><Form.Label>Μητρώνυμο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
								<Form.Control required isInvalid={firstFormButton.button1 === true && (professorInfo.PERSONAL_INFO.mother_FirstName === '' || professorInfo.PERSONAL_INFO.mother_FirstName === undefined) ? true : false}
									type="text" placeholder="Μητρώνυμο"  value={professorInfo.PERSONAL_INFO.mother_FirstName}
									onChange={(e)=>{setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,mother_FirstName:e.target.value.trimStart()}})}}/>
									<Form.Control.Feedback type="invalid">
										*Το πεδίο είναι υποχρεωτικό!
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group as={Col}  id='mother_LastName'>
								<Form.Label>Επώνυμο Μητρός</Form.Label>
								<Form.Control type="text" placeholder="Επώνυμο Μητρός"  value={professorInfo.PERSONAL_INFO.mother_LastName}
								onChange={(e)=>setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,mother_LastName:e.target.value}})}/>
								</Form.Group>
							</Row>

							<Row className="mb-3">
								<Form.Group as={Col}   id='maiden_name'>
								<Form.Label>Πατρικό Όνομα</Form.Label>
								<Form.Control type="text" placeholder="Πατρικό Όνομα"  value={professorInfo.PERSONAL_INFO.maiden_name}
								onChange={(e)=>setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,maiden_name:e.target.value}})}/>
								</Form.Group>

								<Form.Group as={Col} id='family'>
								<Form.Label>Οικογενειακή Κατάσταση</Form.Label>
								<Form.Control type="text" placeholder="Οικογενειακή Κατάσταση"  value={professorInfo.PERSONAL_INFO.family}
								onChange={(e)=>setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,family:e.target.value}})}/> 
								</Form.Group>
							</Row>

							<Row className="mb-3">
							<Form.Group as={Col} id="gender">
								<Form.Label>Φύλο</Form.Label>
								{ professorInfo.PERSONAL_INFO.gender === 'Άρρεν' ?
									<div className="mb-3">									
										<Form.Check										
											inline
											label="Άρρεν"
											name="group1"
											type='radio'
											checked
											id='male'
											onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Άρρεν'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
										/>
										<Form.Check
											inline
											label="Θήλυ"
											name="group1"
											type='radio'
											id='female'
											onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Θήλυ'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
										/>   										       
									</div> : professorInfo.PERSONAL_INFO.gender === 'Θήλυ' ?
									<div className="mb-3">									
									<Form.Check
										inline
										label="Άρρεν"
										name="group1"
										type='radio' 
										id='male'
										onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Άρρεν'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
									/>
									<Form.Check
										inline
										label="Θήλυ"
										name="group1"
										type='radio'
										id='female'
										checked
										onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Θήλυ'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
									/>   										       
								</div> : 
								<div className="mb-3">									
								<Form.Check
									inline
									label="Άρρεν"
									name="group1"
									type='radio' 
									id='male'
									onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Άρρεν'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
								/>
								<Form.Check
									inline
									label="Θήλυ"
									name="group1"
									type='radio'
									id='female' 
									onChange={()=>{setProfessorInfo({...professorInfo,PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,gender:'Θήλυ'}}); document.getElementById('gender').getElementsByClassName('errorValue')[0].style.display = 'none';}}
								/>   										       
							</div>}
									<div className="errorValue">*Το πεδίο είναι υποχρεωτικό!</div>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Κατάσταση</Form.Label> 
									<Form.Check // prettier-ignore
										type="switch"  
										id="custom-switch"
										label={professorInfo.PERSONAL_INFO.active ? 'ΕΝΕΡΓΟΣ' : 'ΜΗ ΕΝΕΡΓΟΣ'}
										onClick={()=>setProfessorInfo({...professorInfo, PERSONAL_INFO:{...professorInfo.PERSONAL_INFO,active: !professorInfo.PERSONAL_INFO.active}})}
									/>
									</Form.Group>
								</Row> 
							</Form>
					);
           
		case 1:
			
		return (
			<Form style= {{marginTop:'2rem'}}>
				<Row className="mb-3" id='department'>
					<Form.Group as={Col} >
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Τμήμα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
					<Form.Control required isInvalid={firstFormButton.button2 === true && (professorInfo.ACADEMIC_INFO.departmentName === '' || professorInfo.ACADEMIC_INFO.departmentName === undefined) ? true : false}
						type="text" placeholder="Τμήμα" className="control" value={professorInfo.ACADEMIC_INFO.departmentName} readOnly
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO, departmentName:e.target.value.trimStart()}})}}/> 
					    <Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col}  id='category'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Κατηγορία<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>		
					<Form.Select 
					            value={professorInfo.ACADEMIC_INFO.category} style={{color : '#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
								onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO : {...professorInfo.ACADEMIC_INFO , category:e.target.value}});
								document.getElementById('category').getElementsByClassName('form-select')[0].style.border = '1px solid #c6c6c6';
								document.getElementById('category').getElementsByClassName('errorValue')[0].style.display = 'none';}}>
							<option value='' style={{display:'none'}}></option> 
							<option value={'ΔΕΠ ΠΘ'}>ΔΙΔΑΚΤΙΚΟ ΚΑΙ ΕΡΕΥΝΗΤΙΚΟ ΠΡΟΣΩΠΙΚΟ ΠΘ (ΔΕΠ ΠΘ)</option>
							<option value={'ΕΔΙΠ ΠΘ'}>ΕΡΓΑΣΤΗΡΙΑΚΟ ΚΑΙ ΔΙΔΑΚΤΙΚΟ ΠΡΟΣΩΠΙΚΟ ΠΘ (ΕΔΙΠ ΠΘ)</option>
							<option value={'ΕΕΠ ΠΘ'}> ΕΙΔΙΚΟ ΚΑΙ ΕΚΠΑΙΔΕΥΤΙΚΟ ΠΡΟΣΩΠΙΚΟ ΠΘ (ΕΕΠ ΠΘ)</option>
							<option value={'ΣΥΜΒΑΣΙΟΥΧΟΙ ΠΔ 407/80'}>ΣΥΜΒΑΣΙΟΥΧΟΙ ΠΔ 407/80</option>
							<option value={'ΣΥΝΕΡΓΑΖΟΜΕΝΟΙ ΔΙΔΑΣΚΟΝΤΕΣ'}>ΣΥΝΕΡΓΑΖΟΜΕΝΟΙ ΔΙΔΑΣΚΟΝΤΕΣ</option>  
							<option value={'ΑΚΑΔΗΜΑΪΚΟΙ ΥΠΟΤΡΟΦΟΙ'}>ΑΚΑΔΗΜΑΪΚΟΣ/Η ΥΠΟΤΡΟΦΟΣ</option>
							<option value={'ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ'}>ΑΚΑΔΗΜΑΪΚΗ ΔΙΔΑΚΤΙΚΗ ΕΜΠΕΙΡΙΑ</option> 
						</Form.Select>
						<div className="errorValue">*Το πεδίο είναι υποχρεωτικό!</div>
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col} id='professorType'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Βαθμίδα<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Select value={professorInfo.ACADEMIC_INFO.professor_type} style={{color : '#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
								onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO : {...professorInfo.ACADEMIC_INFO , professor_type:e.target.value}});
								document.getElementById('professorType').getElementsByClassName('errorValue')[0].style.display = 'none'; document.getElementById('professorType').getElementsByClassName('form-select')[0].style.border = '1px solid #c6c6c6';}}>
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
						</Form.Select>
						<div className="errorValue">*Το πεδίο είναι υποχρεωτικό!</div>
					</Form.Group>

					<Form.Group as={Col}  id='position'>
					<Form.Label>Θέση</Form.Label>
					<Form.Control type="text" placeholder="Θέση"  value={professorInfo.ACADEMIC_INFO.position}
					onChange={(e)=>setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,position:e.target.value}})}/> 
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col}  id='username'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>username<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Control required isInvalid={((firstFormButton.button2 === true && (professorInfo?.ACADEMIC_INFO?.username === '' || professorInfo?.ACADEMIC_INFO?.username === undefined || (professorInfo?.ACADEMIC_INFO?.username !== '' && professorInfo?.ACADEMIC_INFO?.username !== undefined && existProfessorByUsername === true))) || (professorInfo?.ACADEMIC_INFO?.username !== '' && professorInfo?.ACADEMIC_INFO?.username !== undefined && existProfessorByUsername === true)) ? true : false}
						type="text" placeholder="username"  value={professorInfo.ACADEMIC_INFO.username}
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,username: validator.trim(e.target.value)}})}}/>
						<Form.Control.Feedback type="invalid">
							{existProfessorByUsername === true ? '*Το συγκεκριμένο username υπάρχει ήδη!' : '*Το πεδίο είναι υποχρεωτικό!'}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col}  id='academic_email'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Πανεπιστημιακό email<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Control required isInvalid={((firstFormButton.button2 === true && (professorInfo?.ACADEMIC_INFO?.academic_email === '' || professorInfo?.ACADEMIC_INFO?.academic_email === undefined || (professorInfo?.ACADEMIC_INFO?.academic_email !== '' && professorInfo?.ACADEMIC_INFO?.academic_email !== undefined && !validator.isEmail(professorInfo?.ACADEMIC_INFO?.academic_email)) || !professorInfo?.ACADEMIC_INFO?.academic_email.endsWith('@uth.gr'))) || (professorInfo?.ACADEMIC_INFO?.academic_email !== '' && professorInfo?.ACADEMIC_INFO?.academic_email !== undefined && existProfessorByUthEmail === true)) ? true : false}
						type="text" placeholder="Πανεπιστημιακό email"  value={professorInfo.ACADEMIC_INFO.academic_email}
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,academic_email:validator.trim(e.target.value)}});
					}}/>
					    <Form.Control.Feedback type="invalid">
							{existProfessorByUthEmail === true ? '*Το συγκεκριμένο Πανεπιστημιακό email υπάρχει ήδη!' : '*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο!'}
						</Form.Control.Feedback>
					</Form.Group>
					
				</Row>

				<Row className="mb-3" id='specialization'>
					<Form.Group as={Col} >
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Γνωστικό Αντικείμενο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Control required isInvalid={(firstFormButton.button2 === true && (professorInfo?.ACADEMIC_INFO?.specialization === '' || professorInfo?.ACADEMIC_INFO?.specialization === undefined)) ? true : false}
						type="text" placeholder="Γνωστικό Αντικείμενο" className="control" value={professorInfo.ACADEMIC_INFO.specialization} 
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO, specialization:e.target.value}})}}/> 
					    <Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col}  id='diploma'>
					<Form.Label>Δίπλωμα</Form.Label>
					<Form.Control type="text" placeholder="Δίπλωμα"  value={professorInfo.ACADEMIC_INFO.diploma} 
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,diploma:e.target.value}});
						}}/> 
					</Form.Group>
				</Row>

				<Row className="mb-3" id='doctorat'>
					<Form.Group as={Col} >
					
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Διδακτορικό<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Control required isInvalid={(firstFormButton.button2 === true && (professorInfo?.ACADEMIC_INFO?.doctorat === '' || professorInfo?.ACADEMIC_INFO?.doctorat === undefined)) ? true : false}
						type="text" placeholder="Διδακτορικό" className="control" value={professorInfo.ACADEMIC_INFO.doctorat} 
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO, doctorat:e.target.value}}) }}/> 
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό!
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col}  id='website'>
					<Form.Label>Website</Form.Label>
					<Form.Control type="text" placeholder="Website (URL)"  value={professorInfo.ACADEMIC_INFO.website} 
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,website:e.target.value}});
						}}/> 
					</Form.Group>
				</Row>

				<Row className="mb-3" id='CV'>
					<Form.Group as={Col} >
					<Form.Label>Βιογραφικό</Form.Label> 
					<Form.Control type="text" 
						placeholder="Βιογραφικό (URL)" className="control" 
						onChange={(e)=>setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO, CV:e.target.value}})} 
					/>  
					</Form.Group>

					<Form.Group as={Col}  id='GoogleScholar'>
					<Form.Label>Google Scholar</Form.Label>
					<Form.Control id="basic-url" placeholder="Google Scholar (URL)"  value={professorInfo.ACADEMIC_INFO.scholar} 
						onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,scholar:e.target.value}});
						}}/> 
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}  id='office'>					
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό!</strong></div>
							</Tooltip>
						}
					><Form.Label>Γραφείο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Select value={professorInfo.ACADEMIC_INFO.office} placeholder="Γραφείο" style={{color : '#606060', fontSize:'14px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
								onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO : {...professorInfo.ACADEMIC_INFO , office:e.target.value}})}}>
									<option style={{display:'none'}}></option>
							 {emptyProfessorsOffices.map((item,index)=> {
								return(
								<option key={index} style={{color : '#606060', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}
								 				value={item.Hall_code}>{item.Hall_type + ' ' + item.Hall_code}</option>
								)
							 })}
					</Form.Select> 
					</Form.Group>

					<Form.Group as={Col} id='officeHours'>
					<Form.Label>Ώρες Γραφείου</Form.Label>
					<Form.Control as="textarea" placeholder="Ώρες Γραφείου" style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}}  value={professorInfo.PERSONAL_INFO.office_hours}
					onChange={(e)=>setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,office_hours:e.target.value}})}/> 
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col} id='officeTelephone'>
					<OverlayTrigger
						key='right'
						placement='right'									
						overlay={
							<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								<div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>υποχρεωτικό και πρέπει να είναι έγκυρο (10 ψηφία)!</strong></div>
							</Tooltip>
						}
					><Form.Label>Τηλέφωνο Γραφείου<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>	
					<Form.Control isInvalid = {firstFormButton.button2 === true && (professorInfo?.ACADEMIC_INFO?.office_telephone === '' || professorInfo?.ACADEMIC_INFO?.office_telephone === undefined || !validator.isNumeric(professorInfo?.ACADEMIC_INFO?.office_telephone) || (professorInfo?.ACADEMIC_INFO?.office_telephone !== undefined && professorInfo?.ACADEMIC_INFO?.office_telephone !== '' && professorInfo?.ACADEMIC_INFO?.office_telephone.length !== 10)) ? true : false} 
					type="text" placeholder="Τηλέφωνο Γραφείου"  value={professorInfo.ACADEMIC_INFO.office_telephone}
					onChange={(e)=>{setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,office_telephone:validator.trim(e.target.value)}});
									}}/> 					
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό και πρέπει να είναι έγκυρο (10 ψηφία)!
						</Form.Control.Feedback>
					</Form.Group>
					
					<Form.Group as={Col} id='officeEmail'>
					<Form.Label>Email Γραφείου</Form.Label>
					<Form.Control isInvalid = {firstFormButton.button2 === true && !validator.isEmail(professorInfo.ACADEMIC_INFO.office_email)}
					type="text" placeholder="Email Γραφείου"  value={professorInfo.ACADEMIC_INFO.office_email}
					onChange={(e)=>{
						setProfessorInfo({...professorInfo, ACADEMIC_INFO:{...professorInfo.ACADEMIC_INFO,office_email:validator.trim(e.target.value)}});
						}}/> 
					<Form.Control.Feedback type="invalid">
						*Το πεδίο πρέπει να είναι έγκυρο!
					</Form.Control.Feedback>	 
					</Form.Group>
				</Row>			
				</Form>
		); 
		case 2:
			return (
				<Form style= {{marginTop:'2rem'}}>
					<Row className="mb-3" id='AMKA'>
						<Form.Group as={Col} >
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι <strong>11ψήφιο</strong>!
								</Tooltip>
							}
						><Form.Label>ΑΜΚΑ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control  required isInvalid={((firstFormButton.button3 === true && (professorInfo?.INSURANCE_INFO?.AMKA === '' || professorInfo?.INSURANCE_INFO?.AMKA === undefined || !validator.isNumeric(professorInfo?.INSURANCE_INFO?.AMKA) || (professorInfo?.INSURANCE_INFO?.AMKA !== undefined && professorInfo?.INSURANCE_INFO?.AMKA.length !== 11) )) || (professorInfo?.INSURANCE_INFO?.AMKA !== '' && professorInfo?.INSURANCE_INFO?.AMKA !== undefined && existProfessorByAMKA === true)) ? true : false} 
							type="text" placeholder="ΑΜΚΑ" className="control" value={professorInfo.INSURANCE_INFO.AMKA}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO, AMKA:validator.trim(e.target.value)}}) }	}						/>  
							<Form.Control.Feedback type="invalid">
								{existProfessorByAMKA === true ? 
							      'Το συγκεκριμένο ΑΜΚΑ υπάρχει ήδη!'
							    : '*Το πεδίο είναι υποχρεωτικό! (11 ψηφία)'}
						</Form.Control.Feedback>
						</Form.Group>


						<Form.Group as={Col}  id='AMKA_country'>
						<Form.Label>Χώρα ΑΜΚΑ</Form.Label>
						<Form.Control type="text" placeholder="Χώρα ΑΜΚΑ"  value={professorInfo.INSURANCE_INFO.AMKA_country}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO,AMKA_country:e.target.value}})}}/> 
						</Form.Group>
					</Row>

					<Row className="mb-3" id='AFM'>
						<Form.Group as={Col} >
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι <strong>9ψήφιο</strong>!
								</Tooltip>
							}
						><Form.Label>ΑΦΜ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control required isInvalid={((firstFormButton.button3 === true && (professorInfo?.INSURANCE_INFO?.AFM === '' || professorInfo?.INSURANCE_INFO?.AFM === undefined || !validator.isNumeric(professorInfo?.INSURANCE_INFO?.AFM) || (professorInfo?.INSURANCE_INFO?.AFM !== undefined && professorInfo?.INSURANCE_INFO?.AFM.length !== 9) )) || (professorInfo?.INSURANCE_INFO?.AFM !== '' && professorInfo?.INSURANCE_INFO?.AFM !== undefined && existProfessorByAFM === true)) ? true : false} 
							type="text" placeholder="ΑΦΜ" className="control" value={professorInfo.INSURANCE_INFO.AFM}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO, AFM:validator.trim(e.target.value)}}) }	}

						/>  
						<Form.Control.Feedback type="invalid">
								{existProfessorByAFM === true ? 
							      'Το συγκεκριμένο ΑΦΜ υπάρχει ήδη!'
							    : '*Το πεδίο είναι υποχρεωτικό! (9 ψηφία)'}
						</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col}  id='AFM_country'>
						<Form.Label>Χώρα ΑΦΜ</Form.Label>
						<Form.Control type="text" placeholder="Χώρα ΑΦΜ"  value={professorInfo.INSURANCE_INFO.AFM_country}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO,AFM_country:e.target.value}})}}/> 
						</Form.Group>
					</Row>

					<Row className="mb-3" id='identity_number'>
						<Form.Group as={Col} >
						<Form.Label>Αριθμός Ταυτότητας</Form.Label> 
						<Form.Control 
							type="text" placeholder="Αριθμός Ταυτότητας" className="control" value={professorInfo.INSURANCE_INFO.identity_number}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO, identity_number:e.target.value}}) }	}

						/>  
						</Form.Group>

						<Form.Group as={Col}  id='identity_type'>
						<Form.Label>Τύπος Ταυτότητας</Form.Label>
						<Form.Control type="text" placeholder="Τύπος Ταυτότητας"  value={professorInfo.INSURANCE_INFO.identity_type}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO,identity_type:e.target.value}})}}/> 
						</Form.Group>
					</Row>

					<Row className="mb-3" id='DOY'>
						<Form.Group as={Col} >
						<Form.Label>ΔΟΥ</Form.Label> 
						<Form.Control 
							type="text" placeholder="ΔΟΥ" className="control" value={professorInfo.INSURANCE_INFO.DOY}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO, DOY:e.target.value}}) }	}

						/>  
						</Form.Group>

						<Form.Group as={Col}  id='nationality'>
						<Form.Label>Υπηκοότητα</Form.Label>
						<Form.Control type="text" placeholder="Υπηκοότητα"  value={professorInfo.INSURANCE_INFO.nationality}
							onChange={(e)=>{setProfessorInfo({...professorInfo, INSURANCE_INFO:{...professorInfo.INSURANCE_INFO,nationality:e.target.value}})}}/> 
						</Form.Group>
					</Row>		
					</Form>
			);
			case 3:
			return (
				<Form style= {{marginTop:'2rem'}}>
					<Row className="mb-3" id='com_telephone'>
						<Form.Group as={Col} >
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
								     Το πεδίο θα πρέπει να αποτελείται από <strong>10 ψηφία !</strong>  
								</Tooltip>
							}
							><Form.Label>Τηλέφωνο<IoMdInformationCircleOutline style={{marginLeft:'3px', display:'inline-flex', fontSize:'16px', color:'#606060', position:'relative', verticalAlign:'middle'}}></IoMdInformationCircleOutline></Form.Label></OverlayTrigger> 															
						<Form.Control isInvalid = {firstFormButton.button4 === true && (professorInfo?.COMMUNICATION_DETAILS?.telephone === '' || professorInfo?.COMMUNICATION_DETAILS?.telephone === undefined || !validator.isNumeric(professorInfo?.COMMUNICATION_DETAILS?.telephone) || (professorInfo?.COMMUNICATION_DETAILS?.telephone !== undefined && professorInfo?.COMMUNICATION_DETAILS?.telephone !== '' && professorInfo?.COMMUNICATION_DETAILS?.telephone.length !== 10)) ? true : false} 
							type="text" placeholder="Τηλέφωνο" className="control" value={professorInfo.COMMUNICATION_DETAILS.telephone}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS, telephone:validator.trim(e.target.value)}})}}/>   
							<Form.Control.Feedback type="invalid">
								*Το πεδίο πρέπει να αποτελείται αποκλειστικά από 10ψηφία!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col}  id='com_mobile'>
						<OverlayTrigger
							key='right'
							placement='right'									
							overlay={
								<Tooltip style={{marginLeft:'10px'}} id={`tooltip-right`}>
									Το πεδίο είναι <strong>υποχρεωτικό</strong> και πρέπει να είναι <strong>10ψήφιο</strong>!
								</Tooltip>
							}
						><Form.Label>Κινητό Τηλέφωνο<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>
						<Form.Control isInvalid = {firstFormButton.button4 === true && (professorInfo?.COMMUNICATION_DETAILS?.mobile === '' || professorInfo?.COMMUNICATION_DETAILS?.mobile === undefined || !validator.isNumeric(professorInfo?.COMMUNICATION_DETAILS?.mobile) || (professorInfo?.COMMUNICATION_DETAILS?.mobile !== undefined && professorInfo?.COMMUNICATION_DETAILS?.mobile !== '' && professorInfo?.COMMUNICATION_DETAILS?.mobile.length !== 10)) ? true : false} 
						    type="text" placeholder="Κινητό Τηλέφωνο"  value={professorInfo.COMMUNICATION_DETAILS.mobile}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS,mobile:validator.trim(e.target.value)}})}}/> 
						<Form.Control.Feedback type="invalid">
							*Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται αποκλειστικά από 10ψηφία!
						</Form.Control.Feedback>
						</Form.Group>

					</Row> 
					<Row className="mb-3" id='city'>
						<Form.Group as={Col} >
						<Form.Label>Πόλη</Form.Label> 
						<Form.Control 
							type="text" placeholder="Πόλη" className="control" value={professorInfo.COMMUNICATION_DETAILS.city}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS, city:e.target.value}}) }	}

						/>  
						</Form.Group>

						<Form.Group as={Col}  id='region'>
						<Form.Label>Περιοχή</Form.Label>
						<Form.Control type="text" placeholder="Περιοχή"  value={professorInfo.COMMUNICATION_DETAILS.region}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS,region:e.target.value}})}}/> 
						</Form.Group>
					</Row>

					<Row className="mb-3" id='road'>
						<Form.Group as={Col} >
						<Form.Label>Οδός</Form.Label> 
						<Form.Control 
							type="text" placeholder="Οδός" className="control" value={professorInfo.COMMUNICATION_DETAILS.road}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS, road:e.target.value}}) }	}

						/>  
						</Form.Group>

						<Form.Group as={Col}  id='number'>
						<Form.Label>Αριθμός</Form.Label>
						<Form.Control type="text" placeholder="Αριθμός"  value={professorInfo.COMMUNICATION_DETAILS.number}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS,number:e.target.value}})}}/> 
						</Form.Group>
					</Row>

					<Row className="mb-3" id='postcode'>
						<Form.Group as={Col} >
						<Form.Label>Ταχυδρομικός Κώδικας</Form.Label> 
						<Form.Control 
							type="text" placeholder="Ταχυδρομικός Κώδικας" className="control" value={professorInfo.COMMUNICATION_DETAILS.postcode}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS, postcode:e.target.value}}) }	}

						/>  
						</Form.Group>

						<Form.Group as={Col}  id='alternativeEmail'>
						<Form.Label>Εναλλακτικό Email</Form.Label>
						<Form.Control type="text" placeholder="Εναλλακτικό Email"  value={professorInfo.COMMUNICATION_DETAILS.alternative_email}
							onChange={(e)=>{setProfessorInfo({...professorInfo, COMMUNICATION_DETAILS:{...professorInfo.COMMUNICATION_DETAILS,alternative_email:e.target.value}})}}/> 
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
                    <div className="text_header"><img src={PROFESSORS} alt='' /></div>
                    <div className="title"> Διδακτικό Προσωπικό 
                        <p>Καθηγητές - Μέλη ΕΔΙΠ - Συμβασιούχοι - Συνεργαζόμενοι Διδάσκοντες </p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Το προσωπικό του Πανεπιστημίου διακρίνεται στις εξής κατηγορίες: Διδακτικό Ερευνητικό Προσωπικό (Δ.Ε.Π.), Εργαστηριακό Διδακτικό Προσωπικό (Ε.ΔΙ.Π.), Ειδικό Εκπαιδευτικό Προσωπικό (Ε.Ε.Π), Μη διδάκτορες Βοηθοί και Συνεργαζόμενοι Διδάσκοντες, Διδάσκοντες του Π.Δ. 407/80, Ειδικό Τεχνικό Εργαστηριακό Προσωπικό (Ε.Τ.Ε.Π.) και Διοικητικό Προσωπικό. Παρακαλώ συμπληρώστε κατάλληλα τα στοιχεία στη φόρμα που ακολουθεί. Με την υποβολή των στοιχείων, η Ηλεκτρονική Γραμματεία θα προσθέσει ένα νέο μέλος στο διδακτικό προσωπικό του τμήματος.</div>           
                </div> 
                <div className='root'>
				<h1 className="main_title">Εισαγωγή Νέου Διδάσκοντα</h1>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => (
						<Step key={index}>
							<StepLabel >{label}</StepLabel>
							<StepContent>
								{getStepContent(index,professorInfo)} 
								<div className={classes.actionsContainer}>
									<div style={{marginTop:'-0.005rem'}}>
										<Button
											disabled={activeStep === 0}
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
											{activeStep === steps.length - 1 ?
											'Finish': 'Next'}
											
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length && (
				<>				
					<Paper square elevation={0} className={classes.resetContainer}>
					 
							<div className="submitted" style={{display:'flex', gap:'2rem',alignItems:'center', justifyContent:'center'}}> 
							<FcOk style={{fontSize:'75px', verticalAlign:'middle'}}/>
							 <div className="registration_text" style={{fontSize: '1.5rem', fontWeight:'700', letterSpacing:'2px', color : 'black',
											fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}}>Επιτυχής Καταχώρηση Διδάσκοντα !</div>
							 </div>
  
					</Paper>
					<button 
					onClick={() => {setProfessorInfo(backUpProfessor); handleReset()}}
					style={{fontSize: '1.2rem', fontWeight:'700', letterSpacing:'2px', color : 'black', border:'0px solid white',
								   fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}} className={classes.button}>
						ΝΕΑ ΕΓΓΡΑΦΗ
					</button>
					<button
					 onClick={()=> deleteProfessor()}
					 style={{fontSize: '1.2rem', fontWeight:'700', letterSpacing:'2px', color : 'black', border:'0px solid white',
								   fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'}} className={classes.button}>
						ΑΚΥΡΩΣΗ ΤΕΛΕΥΤΑΙΑΣ ΕΓΓΡΑΦΗΣ
					</button>
					</>
				)}
				</div> 
            </div>
        </div>       	  
	);
}

 
export default AddProfessorContainer;