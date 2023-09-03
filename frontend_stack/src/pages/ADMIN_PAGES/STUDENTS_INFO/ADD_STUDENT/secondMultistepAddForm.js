import React, {useEffect, useState} from "react"; 
import validator from "validator";

// Icons
import BadgeIcon from '@mui/icons-material/Badge';
import InputIcon from '@mui/icons-material/Input';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/secondMultiplestepForm.scss' 
 
const SecondMultistepAddForm =  () => { 
 
    // Declare our initial state for the current step of the registration form
    let currentStep = 'first_step'; 
    
    // Declare our initial state for the registration semester field
    const [registrationSemester, setRegistrationSemester] = useState(1);

    // Initialize the 'year' value with the current year
    const year = new Date().getFullYear();
    
    // Declare our default value for the input field 'course part'
    const [coursePartValue, setCoursePartValue] = useState('First_part');
    // Declare our default value for the input field 'education number'
    const [educationNumber, setEducationNumber] = useState('');


    // Declare our state variables for the Identity Information of the new student
    const [generalInfo, setGeneralInfo] = useState({department:"ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", 
                                                    department_number:"501", course:"", course_number:"", academic_email:"",
                                                    student_situation:"", current_academic_year:"-", current_academic_semester:"",
                                                    current_attendance_period:"", academic_record_number:"", general_academic_record_number:"", 
                                                    academic_identity:"", course_program_part:"ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ", course_program_subpart:"", education_number:"", 
                                                    second_course_program_part:"-", second_course_program_subpart:"-", comment_to_student:"-", 
                                                    total_fees:"-", sub_attendance:"ΝΑΙ"});

    // Declare our state variables for the Registration Information of the new student
    const [registrationInfo, setRegistrationInfo] = useState({registration_year: new Date().getFullYear(), registration_semester: '1', registration_period:"", registration_way:"ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ"});
                                                   
    // Declare our state variables for the Professor Advisor Information of the new student
    const [professorAdvisorInfo, setProfessorAdvisorInfo] = useState({professorAdvisor_FirstName:"", professorAdvisor_LastName:"", professorAdvisor_Email:""})
    
    // Declare the input values for the Personal Information of the new student from the previous completed form
    const personalInfo = JSON.parse(localStorage.getItem('newStudent'));

    //  Collect all the input values for the studenship details of the new student in the following object
    const input_Studenship_info = { personalInfo, generalInfo, registrationInfo, professorAdvisorInfo};

    // Determine the valid academic identity from previous inputs
    const academicIdentity = personalInfo.personalInfo.student_identity; 
    generalInfo.academic_identity = academicIdentity;

    // Fields' array of the general study information
    const generalInfo_array = []; 
    Object.keys(generalInfo).forEach((item) => {        
        generalInfo_array.push(item);
    })

    // Fields' array of the registration details
    const registrationInfo_array = []; 
    Object.keys(registrationInfo).forEach((item) => {        
        registrationInfo_array.push(item);
    })

    // Fields' array of the professor advisor details
    const professorAdvisorInfo_array = []; 
    Object.keys(professorAdvisorInfo).forEach((item) => {        
        professorAdvisorInfo_array.push(item);
    })

     // Checking the validation of input values for the current form
     const checkValidation_Form = (form_to_check) => { 
        var valid = 'yes'; 

        // VALIDATION OF THE FIRST FORM
        if (form_to_check === "first_step") {
            (Object.values(generalInfo)).forEach((item ,i)=> {        
                const field = generalInfo_array[i];   
                var errorInput = document.getElementById(field).getElementsByClassName('errorInput')[0];
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorSimilarity = document.getElementById(field).getElementsByClassName('errorSimilarity')[0];
                if (item==="") {                
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                }       
                else { 
                    // VALIDATE THE ACADEMIC EMAIL
                    if (i === 4) {
                        if (!item.endsWith("@uth.gr")) {
                            if (errorField) {
                                errorField.style.display = "none"
                                valid = 'no';
                            }
                            if (errorValid) {
                                errorValid.style.display = "flex";
                                valid = "no";
                            }
                        }
                    } 
                    // VALIDATE THE CURRENT ACADEMIC PERIOD
                    if (i === 8) {
                        const dateNow = new Date();
                        const currMonth = dateNow.getMonth() + 1;
                        if (currMonth >= 9 && currMonth < 2) {
                            if (item !== 'ΧΕΙΜΕΡΙΝΗ') {
                                if (errorValid) {
                                    errorValid.style.display = 'flex'; 
                                    valid = 'no';
                                }
                                if (errorField) {
                                    errorField.style.display = 'none';
                                    valid = 'no';
                                }
                            }
                        }
                        else if (currMonth >=2 && currMonth < 9) {
                            if (item !== 'ΕΑΡΙΝΗ') {
                                if (errorValid) {
                                    errorValid.style.display = 'flex';
                                    valid = 'no';
                                }
                                if (errorField) {
                                    errorField.style.display = 'none';
                                    valid = 'no';
                                }
                            }
                        }
                    }
                    // VALIDATE THE ACADEMIC RECORD NUMBER
                    if (i === 9)  { 
                        let onlyDigits = true;
                        if (item.length !== 5) {                                  
                            if (errorField) {
                                errorField.style.display = "none"
                                valid = 'no';
                            }
                            if (errorValid) {
                                errorValid.style.display = "flex";
                                valid = "no";
                            }
                        }
                        else {
                            item.split("").forEach((value) => {
                                if (!value.match(/\d/)) {
                                    onlyDigits = false;
                                }
                            })
                            if (onlyDigits === false) {
                                if (errorInput) {
                                    errorInput.style.display = "flex"
                                    valid = 'no';
                                } 
                            }
                        }
                    }           
                    // VALIDATE THE GENERAL ACADEMIC RECORD NUMBER
                    if (i === 10)  { 
                        let onlyDigits = true;
                        if (item.length !== 7) {                                  
                            if (errorField) {
                                document.getElementById('education_number').getElementsByClassName('error')[0].style.display = 'none';
                                errorField.style.display = "none"
                                valid = 'no';
                            }
                            if (errorValid) {
                                document.getElementById('education_number').getElementsByClassName('errorValid')[0].style.display = 'flex';
                                errorValid.style.display = "flex";
                                valid = "no";
                            }
                        }
                        else {
                            item.split("").forEach((value) => {
                                if (!value.match(/\d/)) {
                                    onlyDigits = false;
                                }
                            })
                            if (onlyDigits === false) {
                                if (errorInput) {
                                    document.getElementById('education_number').getElementsByClassName('errorInput')[0].style.display = 'flex'
                                    errorInput.style.display = "flex"
                                    valid = 'no';
                                } 
                            }
                        }
                    } 
                    // VALIDATE THE EDUCATION NUMBER   
                    if (i===14) {
                        if (item !== generalInfo.general_academic_record_number) {
                            if (errorSimilarity) {
                                errorSimilarity.style.display = 'flex';
                                valid = 'no';
                            }
                            if (errorField) {
                                errorField.style.display = 'none';
                            }
                            if (errorValid) {
                                errorValid.style.display = 'none';
                            }
                            if (errorInput) {
                                errorInput.style.display = 'none';
                            }
                        }
                    }          
                    if (errorField) {
                        errorField.style.display = "none";
                    }
                }  
            })
        }
        else if (form_to_check === 'second_step') {
            (Object.values(registrationInfo)).forEach((item ,i)=> {        
                const field = registrationInfo_array[i];  
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0]; 
                if (item==="") {   
                    console.log('item')             
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                } 
                else {
                    // VALIDATE REGISTRATION SEMESTER
                    if (i===1) {
                        console.log(item)
                        let onlyDigits = true;                        
                        item.split("").forEach((value) => {
                            if (!value.match(/\d/)) {
                                onlyDigits = false;
                            }
                        })
                        if (onlyDigits === false) {
                            errorValid.style.display = 'flex';
                            valid = 'no';
                        }
                    } 
                    else {
                        if (errorField) {
                            errorField.style.display = 'none'; 
                        }
                    }
                }
            })    
        }
        else if (form_to_check === 'third_step') {
            (Object.values(professorAdvisorInfo)).forEach((item ,i)=> {        
                const field = professorAdvisorInfo_array[i];  
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0]; 
                if (item==="") {   
                    console.log('item')             
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                } 
                else {
                    // VALIDATE PROFESSOR ADVISOR EMAIL
                    if (i===2) {                        
                        if (!validator.isEmail(item) || !item.endsWith("@uth.gr")) {
                            if (errorField) {
                                errorField.style.display = "none"
                                valid = 'no';
                            }
                            if (errorValid) {
                                errorValid.style.display = "flex";
                                valid = "no";
                            }
                        }
                    } 
                    else {
                        if (errorField) {
                            errorField.style.display = 'none'; 
                        }
                    }
                }
            })    
        }
        return (valid)
    }

    // Handling the PREVIOUS button 
    const handlePreviousForm = (currStep, prevStep) => {
        // FORM
        document.getElementsByClassName(currStep)[0].style.display = "none";
        document.getElementsByClassName(prevStep)[0].style.display = "flex"; 
        // STEP        
        document.getElementById(currStep).getElementsByClassName("span")[0].style.color = 'white';
        document.getElementById(currStep).getElementsByClassName("span")[0].style.fontWeight = '500';

        document.getElementById(prevStep).getElementsByClassName("span")[0].style.color = '#2bb9c3';
        document.getElementById(prevStep).getElementsByClassName("span")[0].style.fontWeight = '700';

        // ICON STEP
        document.getElementById(currStep).getElementsByClassName("react-icon")[0].style.backgroundColor = "transparent";
        document.getElementById(prevStep).getElementsByClassName("react-icon")[0].style.backgroundColor = "#29bdc8b6"; 

        currentStep = prevStep;
        
    }

    // Handling the NEXT button 
    const handleNextForm = (currStep, nextStep) => {
        // First of all check the validation of the input values of the current form
        const validation = checkValidation_Form(currStep);
        if (validation === 'yes') {
            console.log('ok!')       
            //FORM
            document.getElementsByClassName(currStep)[0].style.display = "none";
            document.getElementsByClassName(nextStep)[0].style.display = "flex";

            // STEP 
            document.getElementById(currStep).getElementsByClassName("span")[0].style.color = 'white';
            document.getElementById(currStep).getElementsByClassName("span")[0].style.fontWeight = '500';

            document.getElementById(nextStep).getElementsByClassName("span")[0].style.color = '#2bb9c3';
            document.getElementById(nextStep).getElementsByClassName("span")[0].style.fontWeight = '700';

            // ICON STEP
            //document.getElementById(currStep).getElementsByClassName("react-icon")[0].style.backgroundColor = "transparent";
            document.getElementById(nextStep).getElementsByClassName("react-icon")[0].style.backgroundColor = "#29bdc8b6";

            currentStep = nextStep;
                        
        }    
    }     

    // Handle input changes
    const handleInputChange = (inputValue, element) => { 
        if (inputValue.trim().length !== 0) {
            document.getElementById(element).getElementsByClassName('inputItem')[0].style.backgroundColor = 'hsl(220,91%, 95%)';
        }
        else {
            document.getElementById(element).getElementsByClassName('inputItem')[0].style.backgroundColor = 'white';        
        }
    } 

    // Determine the current academic year 
    const setAcademicYear = () => {
        let currentDate = new Date();
        let currYear = currentDate.getFullYear();
        let currMonth = currentDate.getMonth() + 1;
        let academicYear;

        if (currMonth <= 9) {
            academicYear = currYear - 1;
        }
        else {
            academicYear = currYear;
        } 
        generalInfo.current_academic_year = academicYear;
        return(academicYear);

    }
 
    // Determine the course part according to selected current academic semester
    useEffect(() => {
        if (generalInfo.current_academic_semester >= 7) {
            setCoursePartValue('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ');   
            setGeneralInfo(generalInfo=>({...generalInfo, course_program_part:'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ'}))
            handleInputChange('ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ', 'course_program_part');       
        }
        else {
            setCoursePartValue('ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ');
            setGeneralInfo(generalInfo=>({...generalInfo, course_program_part:'ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ'}))
            handleInputChange('ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ', 'course_program_part');  
        }          
    }, [generalInfo.current_academic_semester]);

    // Determine the Education Number according to input general academic record number
    // The two numbers must be the same!
    useEffect(() => { 
        setGeneralInfo(generalInfo => ({...generalInfo, education_number: generalInfo.general_academic_record_number}))
        handleInputChange(generalInfo.general_academic_record_number, 'education_number');
        setEducationNumber(generalInfo.general_academic_record_number)
    }, [generalInfo.general_academic_record_number])


    const handleClickNavigate = () => {
        localStorage.setItem('newStudent',JSON.stringify(input_Studenship_info))
        window.location.href = "/uth-ece_admin/add_student/complete_add"
    }

    return(
        <div className="studenship_info_form">
            <div className="form">
                <div className="form_container">
                    <div className="form_sidebar">
                        <div className="step active" id='first_step'>
                            <BadgeIcon className="react-icon initial"/>
                            <div className="step_content">
                                <span className="span initial">BHMA 1</span>
                                <b>Γενικα Στοιχεια</b>
                            </div>
                        </div>
                        <div className="step" id='second_step'>
                            <InputIcon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 2</span>
                                <b>Στοιχεια Εισαγωγης</b>
                            </div>
                        </div>
                        <div className="step" id='third_step'>
                            <SupervisorAccountIcon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 3</span>
                                <b>Στοιχεια Συμβουλου Καθηγητη</b>
                            </div>
                        </div>
                    </div>

                    <div className="stp first_step">
                        <div className="header">
                            <h1 className="title">Γενικά Στοιχεία</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΓΕΝΙΚΑ ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ του νέου φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="first_column">
                                <div className="form_item" id="department">
                                    <div className="label">
                                        <label>Τμήμα</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('department').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" required id="department" value='ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ' style={{backgroundColor:'hsl(205, 67%, 93%)'}} onChange={(e)=> setGeneralInfo({...generalInfo, department:e.target.value})}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="course">
                                    <div className="label">
                                        <label>Πρόγραμμα Σπουδών</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('course').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className="inputItem" required id="course" onChange={(e)=>  { handleInputChange(e.target.value, 'course') ; setGeneralInfo({...generalInfo, course:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="academic_record_number">
                                    <div className="label">
                                        <label>Αριθμός Μητρώου</label>
                                    </div>
                                    <div className="input_item" onChange={() => { document.getElementById('academic_record_number').getElementsByClassName('errorValid')[0].style.display='none'; document.getElementById('academic_record_number').getElementsByClassName('error')[0].style.display='none'; document.getElementById('academic_record_number').getElementsByClassName('errorInput')[0].style.display = 'none'}}>
                                        <p className="errorInput">*Ο ΑΕΜ αποτελείται αποκλειστικά από ψηφία!</p>
                                        <p className="errorValid">*Ο ΑΕΜ πρέπει να είναι 5ψήφιος!</p>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className = 'inputItem' required id="academic_record_number" onChange={(e)=> {handleInputChange(e.target.value, 'academic_record_number'); setGeneralInfo({...generalInfo, academic_record_number:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="current_academic_year">
                                    <div className="label">
                                        <label>Τρέχον Ακαδημαϊκό Έτος</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('current_academic_year').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className = 'inputItem'  required id="current_academic_year" style={{backgroundColor:"hsl(205, 67%, 93%)"}}  value={setAcademicYear()} onChange={(e)=> setGeneralInfo({...generalInfo, current_academic_year:e.target.value})}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="academic_email">
                                    <div className="label">
                                        <label>Ακαδημαϊκό Email</label>
                                    </div>
                                    <div className="input_item" onChange={() => { document.getElementById('academic_email').getElementsByClassName('errorValid')[0].style.display='none'; document.getElementById('academic_email').getElementsByClassName('error')[0].style.display='none'}}>
                                        <p className="errorValid">*Το πεδίο δεν είναι έγκυρο!</p>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className = 'inputItem'  required id="academic_email" onChange={(e)=>{ handleInputChange(e.target.value, 'academic_email'); setGeneralInfo({...generalInfo, academic_email:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="academic_identity">
                                    <div className="label">
                                        <label>Ακαδημαϊκή Ταυτότητα</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('academic_identity').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className = 'inputItem' required id="academic_identity" value={academicIdentity} style={{backgroundColor:"hsl(220,91%, 95%)"}} ></input>
                                    </div>
                                </div>
                                <div className="form_item" id="course_program_part">
                                    <div className="label">
                                        <label>Κατεύθυνση</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('course_program_part').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                        <select className="inputItem" value={coursePartValue} onChange={(e)=> {handleInputChange(e.target.value, 'course_program_part'); setCoursePartValue(e.target.value); setGeneralInfo({...generalInfo, course_program_part:e.target.value})}}>                                             
                                            <option value="ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ" style={{backgroundColor:'white'}}>ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ</option>
                                            <option value="ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ" style={{backgroundColor:'white'}}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>
                                        </select> 
                                        {/*<input type="text" required id="course_program_part" onChange={(e)=> setGeneralInfo({...generalInfo, course_program_part:e.target.value})}></input>*/}
                                    </div>
                                </div>
                                <div className="form_item" id="student_situation">
                                    <div className="label">
                                        <label>Κατάσταση Φοιτητή</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('student_situation').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>  
                                        <div className="checkbox-cont">
                                            <div className="box" >
                                                <input type="radio" name='student_situation' value="Ενεργός" onChange={()=> setGeneralInfo({...generalInfo, student_situation:'Ενεργός'})}></input>
                                                <p className="description">Ενεργός</p>
                                            </div>                                           
                                            <div className="box">
                                                <input type="radio"  name='student_situation' value="Μη Ενεργός" onChange={()=> setGeneralInfo({...generalInfo, student_situation:'Μη Ενεργός'})}></input>
                                                <p className="description">Μη Ενεργός</p>
                                            </div>                         
                                        </div>  
                                    </div>
                                </div>
                                <div className="form_item" id="second_course_program_part">
                                    <div className="label">
                                        <label>Δεύτερη Κατεύθυνση</label>
                                    </div>
                                    <div className="input_item">                                         
                                        <input type="text" className="inputItem" required id="second_course_program_part" onChange={(e)=> { handleInputChange(e.target.value, 'second_course_program_part'); setGeneralInfo({...generalInfo, second_course_program_part:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="comment_to_student">
                                    <div className="label">
                                        <label>Σχόλιο προς φοιτητή</label>
                                    </div>
                                    <div className="input_item"> 
                                        <textarea type="text" className="inputItem" id="comment_to_student" onChange={(e)=> { handleInputChange(e.target.value, 'comment_to_student'); setGeneralInfo({...generalInfo, comment_to_student:e.target.value})}}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="second_column">                                
                                <div className="form_item" id="department_number">
                                    <div className="label">
                                        <label>Αριθμός Τμήματος</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('department_number').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" required id="department_number" value='501' style={{backgroundColor:"hsl(205, 67%, 93%)"}} onChange={(e)=> setGeneralInfo({...generalInfo, department_number:e.target.value})}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="course_number">
                                    <div className="label">
                                        <label>Αριθμός Προγράμματος Σπουδών</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('course_number').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className='inputItem' required id="course_number" onChange={(e)=>{ handleInputChange(e.target.value, 'course_number'); setGeneralInfo({...generalInfo, course_number:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="general_academic_record_number">
                                    <div className="label">
                                        <label>Αριθμός Γενικού Μητρώου</label>
                                    </div>
                                    <div className="input_item" onChange={() => { document.getElementById('general_academic_record_number').getElementsByClassName('errorValid')[0].style.display='none'; 
                                                                                  document.getElementById('general_academic_record_number').getElementsByClassName('error')[0].style.display='none'; 
                                                                                  document.getElementById('general_academic_record_number').getElementsByClassName('errorInput')[0].style.display = 'none';
                                                                                  document.getElementById('education_number').getElementsByClassName('errorValid')[0].style.display='none'; 
                                                                                  document.getElementById('education_number').getElementsByClassName('errorSimilarity')[0].style.display='none'; 
                                                                                  document.getElementById('education_number').getElementsByClassName('error')[0].style.display='none'; 
                                                                                  document.getElementById('education_number').getElementsByClassName('errorInput')[0].style.display = 'none'}}>
                                        <p className="errorInput">*Ο ΑΓΜ αποτελείται αποκλειστικά από ψηφία!</p>
                                        <p className="errorValid">*Ο ΑΓΜ πρέπει να είναι 7ψήφιος!</p>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className="inputItem" required id="general_academic_record_number" onChange={(e)=> { handleInputChange(e.target.value, 'general_academic_record_number'); setGeneralInfo({...generalInfo, general_academic_record_number:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="current_academic_semester">
                                    <div className="label">
                                        <label>Τρέχον Ακαδημαϊκό Εξάμηνο</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('current_academic_semester').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className="inputItem" required id="current_academic_semester" onChange={(e)=> { handleInputChange(e.target.value, 'current_academic_semester'); setGeneralInfo({...generalInfo, current_academic_semester:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="current_attendance_period">
                                    <div className="label">
                                        <label>Τρέχουσα Περίοδος Φοίτησης</label>
                                    </div>
                                    <div className="input_item" onChange={() => { document.getElementById('current_attendance_period').getElementsByClassName('errorValid')[0].style.display='none'; document.getElementById('current_attendance_period').getElementsByClassName('error')[0].style.display='none'}}> 
                                        <p className="errorValid">*Το πεδίο δεν είναι έγκυρο!</p> 
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                        <div className="checkbox-cont">
                                            <div className="box" >
                                                <input type="radio"  name='attendance_period' value='winter' onChange={()=> setGeneralInfo({...generalInfo, current_attendance_period:' ΧΕΙΜΕΡΙΝΗ'})}></input>
                                                <p className="description">Χειμερινή</p>
                                            </div>                                           
                                            <div className="box">
                                                <input type="radio" name='attendance_period' value='spring' onChange={()=> setGeneralInfo({...generalInfo, current_attendance_period:'ΕΑΡΙΝΗ'})}></input>
                                                <p className="description">Εαρινή</p>
                                            </div>      
                                        </div>  
                                    </div>                                    
                                </div>
                                <div className="form_item" id="education_number">
                                    <div className="label">
                                        <label>Ενιαίος Αρ. Εκπαίδευσης</label>
                                    </div>
                                    <div className="input_item" onChange={() => { document.getElementById('education_number').getElementsByClassName('errorSimilarity')[0].style.display='none'; document.getElementById('education_number').getElementsByClassName('errorValid')[0].style.display='none'; document.getElementById('education_number').getElementsByClassName('error')[0].style.display='none'; document.getElementById('education_number').getElementsByClassName('errorInput')[0].style.display = 'none'}}>
                                        <p className="errorInput">*Ο Ε.Α.Ε αποτελείται αποκλειστικά από ψηφία!</p>
                                        <p className="errorValid">*Ο Ε.Α.Ε πρέπει να είναι 7ψήφιος!</p>
                                        <p className="errorSimilarity">*Τα Ε.Α.Ε και ΑΓΜ πρέπει να ταυτίζονται!</p>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className="inputItem" required id="education_number" value={educationNumber} onChange={(e)=> { handleInputChange(e.target.value, 'education_number'); setEducationNumber(e.target.value); setGeneralInfo({...generalInfo, education_number:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="course_program_subpart">
                                    <div className="label">
                                        <label>Υποκατεύθυνση</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('course_program_subpart').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input type="text" className="inputItem" required id="course_program_subpart"  onChange={(e)=> {handleInputChange(e.target.value,'course_program_subpart'); setGeneralInfo({...generalInfo, course_program_subpart:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="sub_attendance">
                                    <div className="label">
                                        <label>Μερικής Φοίτησης</label>
                                    </div>
                                    <div className="input_item"> 
                                        <div className="switcher">
                                            <p className="yes sw_active">ΝΑΙ</p>
                                            <label className="switch">
                                                <input type="checkbox"></input>
                                                <span className="slider round" onClick={()=> (generalInfo.sub_attendance === "ΝΑΙ") ? setGeneralInfo({...generalInfo,sub_attendance:"ΟΧΙ"}): setGeneralInfo({...generalInfo, active:"ΝΑΙ"})}></span>
                                            </label>
                                            <p className="no">ΟΧΙ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_item" id="second_course_program_subpart">
                                    <div className="label">
                                        <label>Δεύτερη Υποκατεύθυνση</label>
                                    </div>
                                    <div className="input_item">
                                        <input type="text" className="inputItem" id="second_course_program_subpart" onChange={(e)=>{ handleInputChange(e.target.value, 'second_course_program_subpart'); setGeneralInfo({...generalInfo, second_course_program_subpart:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="total_fees">
                                    <div className="label">
                                        <label>Σύνολο Διδάκτρων</label>
                                    </div>
                                    <div className="input_item"> 
                                        <input type="text" className="inputItem" id="total_fees" onChange={(e)=> { handleInputChange(e.target.value, 'total_fees'); setGeneralInfo({...generalInfo, total_fees:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="prev_step" type="button" style={{visibility:"hidden"}}>Προηγούμενο</button>
                                    <button className="next_step" type="button" style={{marginTop:'1.5rem'}} onClick={() => handleNextForm('first_step', 'second_step') }>Επόμενο</button>
                                </div>
                            </div>
                        </form>
                    </div>
                

                    <div className="stp second_step">
                        <div className="header">
                            <h1 className="title">Στοιχεία Εισαγωγής</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΕΙΣΑΓΩΓΗΣ του νέου φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="registration_year">
                                <div className="label">
                                    <label>Έτος Εισαγωγής</label>
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('registration_year').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                    <select onChange={(e)=> console.log(e.target.value)} style={{backgroundColor:'hsl(205, 67%, 93%)'}}>
                                        {Array.from(new Array(30), (v,i) => 
                                        <option key={i} value={year-i} style={{backgroundColor:'white'}}>{year-i}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="form_item" id="registration_semester">
                                <div className="label">
                                    <label>Εξάμηνο Εισαγωγής</label>
                                </div>
                                <div className="input_item" onChange={()=> { document.getElementById('registration_semester').getElementsByClassName('errorValid')[0].style.display='none'; document.getElementById('registration_semester').getElementsByClassName('error')[0].style.display = 'none'}}> 
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <p className="errorValid">*Το πεδίο συμπληρώνεται μόνο με ψηφία!</p> 
                                    <input type="text" className="inputItem" id="registration_semester" style={{backgroundColor:'hsl(205, 67%, 93%)'}} value={registrationSemester} onChange={(e)=> { handleInputChange(e.target.value, 'registration_semester'); setRegistrationSemester(e.target.value); setRegistrationInfo({...registrationInfo, registration_semester:e.target.value})}}></input>
                                </div>
                            </div>
                            <div className="form_item" id="registration_period">
                                <div className="label">
                                    <label>Περίοδος Εισαγωγής</label>
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('registration_period').getElementsByClassName('error')[0].style.display='none'}> 
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                    <div className="checkbox-cont">
                                        <div className="box" >
                                            <input type="radio" name='registration_period' value='winter' onClick={()=> setRegistrationInfo({...registrationInfo, registration_period:'Χειμερινή'})}></input>
                                            <p className="description">Χειμερινή</p>
                                        </div>                                           
                                        <div className="box">
                                            <input type="radio"  name='registration_period' value='spring' onClick={()=> setRegistrationInfo({...registrationInfo, registration_period:'Εαρινή'})}></input>
                                            <p className="description">Εαρινή</p>
                                        </div>      
                                    </div>  
                                </div>                                    
                            </div>
                            <div className="form_item" id="registration_way"  onChange={() => document.getElementById('registration_way').getElementsByClassName('error')[0].style.display='none'}>
                                <div className="label">
                                    <label>Τρόπος Εισαγωγής</label>
                                </div>
                                <div className="input_item"> 
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                    <input type="text" className="inputItem" id="registration_way" style={{backgroundColor:'hsl(205, 67%, 93%)'}} defaultValue='ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ' onChange={(e)=> { handleInputChange(e.target.value, 'registration_way'); setRegistrationInfo({...registrationInfo, registration_way:e.target.value})}}></input>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="prev_step" type="button" onClick={() => handlePreviousForm('second_step', 'first_step')}>Προηγούμενο</button>
                                <button className="next_step" type="button" onClick={() => handleNextForm('second_step', 'third_step') }>Επόμενο</button>
                            </div>
                        </form>
                    </div>

                    <div className="stp third_step">
                        <div className="header">
                            <h1 className="title">Στοιχεία Σύμβουλου Καθηγητή</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΣΥΜΒΟΥΛΟΥ ΚΑΘΗΓΗΤΗ του νέου φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="professorAdvisor_FirstName">
                                <div className="label">
                                    <label>Όνομα Καθηγητή</label>
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('professorAdvisor_FirstName').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>                                      
                                    <input type="text" className="inputItem" id="professorAdvisor_FirstName" onChange={(e)=> { handleInputChange(e.target.value, 'professorAdvisor_FirstName'); setProfessorAdvisorInfo({...professorAdvisorInfo, professorAdvisor_FirstName:e.target.value})}}></input>
                                </div>
                            </div>
                            <div className="form_item" id="professorAdvisor_LastName">
                                <div className="label">
                                    <label>Επώνυμο Καθηγητή</label>
                                </div>
                                <div className="input_item" onChange={()=> document.getElementById('professorAdvisor_LastName').getElementsByClassName('error')[0].style.display='none'}> 
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                    <input type="text" className="inputItem" id="professorAdvisor_LastName" onChange={(e)=> { handleInputChange(e.target.value, 'professorAdvisor_LastName'); setProfessorAdvisorInfo({...professorAdvisorInfo, professorAdvisor_LastName:e.target.value})}}></input>
                                </div>
                            </div> 
                            <div className="form_item" id="professorAdvisor_Email"  onChange={() => { document.getElementById('professorAdvisor_Email').getElementsByClassName('errorValid')[0].style.display = 'none'; document.getElementById('professorAdvisor_Email').getElementsByClassName('error')[0].style.display='none'}}>
                                <div className="label">
                                    <label>Email Καθηγητή</label>
                                </div>
                                <div className="input_item"> 
                                    <p className="errorValid">*Το πεδίο δεν είναι έγκυρο!</p> 
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                    <input type="text" className="inputItem" id="professorAdvisor_Email" onChange={(e)=> { handleInputChange(e.target.value, 'professorAdvisor_Email'); setProfessorAdvisorInfo({...professorAdvisorInfo, professorAdvisor_Email:e.target.value})}}></input>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="prev_step" type="button" onClick={() => handlePreviousForm('third_step', 'second_step')}>Προηγούμενο</button>
                                <button className="next_step" type="button" onClick={() => handleClickNavigate()}>Τέλος</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SecondMultistepAddForm;