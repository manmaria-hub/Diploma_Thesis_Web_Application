import React, {useState} from "react";
import moment from "moment/moment";
import validator from "validator";   

// React Icons 
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/firstMultiplestepForm.scss' 
 
const FirstMultistepAddForm =  () => {  
    
    // Declare our initial state for the current step of the registration form
    let currentStep = 'first_step'; 
    // Declare the initial state of the citizenship value
    let [citizenshipState, setCitizenshipState] = useState([]);
    // Declare the initial state of the nationality value
    let [nationalityState, setNationalityState] = useState([]);
    // Declare the initial state of the nationality_second value
    let [nationalitySecondState, setNationalitySecondState] = useState([]);
 
    // Declare our state variables for the Personal Information of the new student
    const [personalInfo, setPersonalInfo] = useState({last_name:"", first_name:"", dot_father_name:"", father_FirstName:"", father_LastName:"", 
                                                      maiden_name :"", mother_FirstName:"", mother_LastName:"", spouse_name:"-", profession:"-",
                                                      mother_profession:"-", father_profession:"-", family:"-", username:"", personal_title:"-", 
                                                      website:"-", student_identity:"", active:"ΝΑΙ", fulfilled_military_obligations:"", sex:"", notations:"-"});

    // Declare our state variables for the Insurance Information of the new student
    // (*There are not required fields for these category of information!)
    const [insuranceInfo, setInsuranceInfo] = useState({AMKA:"-" , AFM:"-" , DOY:"-" , AMKA_country:"-",  AFM_country:"-"});

    // Declare our state variables for the Identity Information of the new student
    const [identityInfo, setIdentityInfo] = useState({identity_type:"", citizenship:[], citizen:"", identity_number:"", citizen_number:"", 
                                                      published_principle:"", publish_date:"", nationality:[], nationality_second:[],
                                                      male_record_num:"-", male_record_perf:"-", male_record_gr:"-", male_record_loc:"-"});

    // Declare our state variables for the Birthday Information of the new student
    const [birthInfo, setBirthInfo] = useState({birth_date:"", gender:"ΑΡΡΕΝ", birth_prefecture:"", birth_country:"", birth_location:""});

    // Declare our state variables for the Address Information of the new student
    const [addressInfo, setAddressInfo] = useState({road:"-", rd_number:"-", city:"-", location:"-", country:"-", acting_address:"-", 
                                                    postcode:"-", telephone:"", mobile_phone:"", uth_email:"", alternative_email:"-"});

    // Declare our state variables for the Third Person Contact Information  
    const [thirdPersonInfo, setThirdPersonInfo] = useState({contact_type:"-", person_FirstName:"-", person_LastName:"-", person_address:"-",
                                                            person_telephone:"-",person_mobilephone:"-", person_email:"-"});
    
    // Fields' array of the personal information
    const personalInfo_array = []; 
    Object.keys(personalInfo).forEach((item) => {        
        personalInfo_array.push(item);
    })

    // Fields' array of the insurance information
    const insuranceInfo_array = []; 
    Object.keys(insuranceInfo).forEach((item) => {        
        insuranceInfo_array.push(item);
    })

    // Fields' array of the identity information
    const identityInfo_array = []; 
    Object.keys(identityInfo).forEach((item) => {        
        identityInfo_array.push(item);
    })
 
    // Fields' array of the Birth information
    const birthInfo_array = []; 
    Object.keys(birthInfo).forEach((item) => {        
        birthInfo_array.push(item);
    }) 

    // Fields' array of the Student Address information
    const addressInfo_array = []; 
    Object.keys(addressInfo).forEach((item) => {        
        addressInfo_array.push(item);
    }) 

    // Fields' array of the Third Person Contact information
    const thirdPersonInfo_array = []; 
    Object.keys(thirdPersonInfo).forEach((item) => {        
        thirdPersonInfo_array.push(item);
    }) 

    //  Collect all the input values for the Personal Information of the new student in the following object
    const input_Personal_Info = {insuranceInfo, personalInfo, birthInfo, identityInfo, addressInfo, thirdPersonInfo};    

    // Reload the valid error messages 
    const determineErrorMessage = (field) => {
        let errorField = document.getElementById(field).getElementsByClassName('error')[0];
        let errorValid = document.getElementById(field).getElementsByClassName('error_field')[0];

        if (errorField) {
            errorField.style.display = "none";
        }
        if (errorValid) {
            errorValid.style.display = "none";
        }
    }

    // Checking the validation of input values for the current form
    const checkValidation_Form = (form_to_check) => { 
        var valid = 'yes';
        console.log(form_to_check)

        // VALIDATION OF THE FIRST FORM
        if (form_to_check === "first_step") {
            (Object.values(personalInfo)).forEach((item ,i)=> {        
                const field = personalInfo_array[i];   
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                if (item==="") {                
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                }       
                else {
                    if (errorField) {
                        errorField.style.display = "none";
                    }
                }  
            })
        }
        // VALIDATION OF THE SECOND FORM
        else if (form_to_check === "second_step") {
            (Object.values(insuranceInfo)).forEach((item, i) => {
                const field = insuranceInfo_array[i];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                // Check the AMKA field                
                if(i===0 && item!=="-") {
                    if(item.length !== 11){
                        if(errorField) {
                            errorField.style.display = "flex";
                            valid = 'no';
                        }
                    }
                    else {
                        if(errorField) {
                            errorField.style.display = "none"; 
                        }
                    }
                }
                // Check the ΑΦΜ field                
                if(i===1 && item!=="-") {
                    if(item.length !== 9){
                        if(errorField) {
                            errorField.style.display = "flex";
                            valid = 'no';
                        }
                    }
                    else {
                        if(errorField) {
                            errorField.style.display = "none"; 
                        }
                    }
                }
            })
        }
        // VALIDATION OF THE THIRD FORM
        else if (form_to_check === "third_step") {  
            (Object.values(birthInfo)).forEach((item ,i)=> {        
                const field = birthInfo_array[i];  
                let currentDate = new Date();
                let currYear = currentDate.getFullYear(); 
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorYearField = document.getElementById(field).getElementsByClassName('error_year')[0];
                if (item==="" || item==="Invalid date") {                
                    if (errorField) { 
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                    if (errorYearField) {
                        errorYearField.style.display = "none";
                        valid = "no";
                    }
                }       
                else {
                    // VALIDATION OF THE BIRTH DATE 
                    if (i===0) {  
                        var v = item.split('-');                        
                        if (Number(v[0]) >= currYear) {                            
                            if (errorField) {            
                                errorField.style.display = 'none';
                                valid = 'no'; 
                            }
                            if (errorYearField) {
                                errorYearField.style.display = "flex";
                                valid = "no";
                            }
                        }
                        else {
                            if (errorField) { 
                                errorField.style.display = "none";
                            }
                            if (errorYearField) {
                                errorYearField.style.display = "none"; 
                            }
                        }

                    }
                    else {
                        if (errorField) {
                            errorField.style.display = "none";
                        }
                        if (errorYearField) {
                            errorYearField.style.display = "none"; 
                        }
                    }
                }   
            })
        }
        // VALIDATION OF THE FOURTH FORM
        else if (form_to_check === 'fourth_step') { 
            // Set the valid input values for the citizenship, nationality and second nationality
            identityInfo.citizenship = citizenshipState;        // CITIZENSHIP
            identityInfo.nationality = nationalityState         // NATIONALITY
            identityInfo.nationality_second = nationalitySecondState;  // SECOND NATIONALITY

            (Object.values(identityInfo)).forEach((item ,i)=> {        
                const field = identityInfo_array[i];  
                let currentDate = new Date();
                let currYear = currentDate.getFullYear(); 
                let currMonth = currentDate.getMonth() + 1 ;
                let currDay = currentDate.getDate();
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorYearField = document.getElementById(field).getElementsByClassName('error_year')[0];
                // Set the error state for this function 

                if ( (item==="") || (item==="Invalid date") || (item.length === 0)) {                
                    if (errorField) {      
                        errorField.style.display = "flex"; 
                        valid = 'no';                    
                    }        
                    if (errorYearField) {
                        errorYearField.style.display = 'none';
                        valid = 'no';
                    }      

                }       
                else { 
                    // VALIDATION OF THE PUBLISHED DATE
                    if (i===6) { 
                        var v = item.split('-');               
                        //console.log(Number(v[1]))  
                        if ((Number(v[0]) > currYear) ||( (Number(v[0]) === currYear) && (Number(v[1])>currMonth) ) || ((Number(v[0]) === currYear) && (Number(v[1]) === currMonth) && (Number(v[2]) > currDay))) { 
                            if (errorField) {                                 
                                errorField.style.display = 'none';
                                valid = 'no'; 
                            }
                            if (errorYearField) {
                                errorYearField.style.display = 'flex';
                                valid = 'no';
                            }    
                        }
                        else {
                            if (errorField) {  
                                errorField.style.display = "none";
                            }
                            if (errorYearField) {
                                errorYearField.style.display = 'none'; 
                            }    
                        }

                    }
                    else {
                        if (errorField) {  
                            errorField.style.display = "none";
                        }
                        if (errorYearField) {
                            errorYearField.style.display = 'none'; 
                        }    
                    }
                }  
            })
        }
        // VALIDATION OF THE FIFTH FORM 
        else if (form_to_check === 'fifth_step') {
            (Object.values(addressInfo)).forEach((item ,i)=> {        
                const field = addressInfo_array[i];  
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorValid= document.getElementById(field).getElementsByClassName('error_field')[0];
                if (item==="") { 
                    console.log(errorField)                                                        
                    if (errorField) {   
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                }  
                else { 
                    if (i===7) {
                        if (item.length !== 10) {
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
                    if (i===8) {
                        if (item.length !== 10) {
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
                    if (i===9) {
                        console.log('here!')
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
                    if (i===10 && item!=="-") {
                        if (!validator.isEmail(item) || item.endsWith("@uth.gr")) {
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
                } 
            })
        }
        // VALIDATION OF THE SIXTH FORM
        else if (form_to_check === 'sixth_step') {
            (Object.values(thirdPersonInfo)).forEach((item ,i)=> {        
                const field = thirdPersonInfo_array[i];  
                var errorField = document.getElementById(field).getElementsByClassName('error')[0]; 
                if (item==="") { 
                    console.log(errorField)                                                        
                    if (errorField) {   
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                }  
                else { 
                    // VALIDATE THELEPHONE NUMBER
                    if (i===4 && item!=="-") { 
                        if (item.length !== 10) {
                            console.log(item)
                            if (errorField) {
                                errorField.style.display = "flex"
                                valid = 'no';
                            } 
                        }
                        else {
                            if (errorField) {
                                errorField.style.display = "none" 
                            } 
                        }
                    }
                    // VALIDATE MOBILE PHONE NUMBER
                    if (i===5 && item !== "-") {
                        if (item.length !== 10) {
                            console.log(item.length)
                            if (errorField) {
                                errorField.style.display = "flex"
                                valid = 'no';
                            } 
                        }
                        else {
                            if (errorField) {
                                errorField.style.display = "none" 
                            } 
                        }
                    }
                    // VALIDATE EMAIL                     
                    if (i===6 && item!=="-") {
                        if (!validator.isEmail(item)) {
                            if (errorField) {
                                errorField.style.display = "flex"
                                valid = 'no';
                            } 
                        }  
                        else {
                            if (errorField) {
                                errorField.style.display = "none" 
                            } 
                        }
                    }                     
                } 
            })

        }
        return(valid);
    }
 
    const removeTags = (indexToRemove,fieldToCheck) => {
        if (fieldToCheck === 'citizenship') {
            setCitizenshipState(citizenshipState.filter((_,index)=> index !== indexToRemove));
        } 
        else if (fieldToCheck === 'nationality') {
            setNationalityState(nationalityState.filter((_,index) => index !== indexToRemove));
        } 
        else if (fieldToCheck === 'nationality_second') {
            setNationalitySecondState(nationalitySecondState.filter((_,index) => index !== indexToRemove));
        }
    }
  
    const addTags = (event, fieldToCheck) => {
        if (event.target.value!=='' && fieldToCheck==='citizenship') {
            var errorFieldCitizenship = document.getElementById('citizenship').getElementsByClassName('error')[0];     
            var errorDuplicateFieldCitizenship = document.getElementById('citizenship').getElementsByClassName('error_duplicate')[0];
            // Check for duplicates
            citizenshipState.forEach((item) => {
                if (item === event.target.value) {                             
                    if (errorFieldCitizenship) {                        
                        errorFieldCitizenship.style.display = 'none';
                    } 
                    if (errorDuplicateFieldCitizenship) {
                        errorDuplicateFieldCitizenship.style.display = 'flex';
                    }
                    event.target.value = '';
                } 
            })
            if ( event.target.value !== '') {
                setCitizenshipState([...citizenshipState, event.target.value]);       
                if (errorFieldCitizenship) {                        
                    errorFieldCitizenship.style.display = 'none';
                }    
                if (errorDuplicateFieldCitizenship) {
                    errorDuplicateFieldCitizenship.style.display = 'none';
                }
                event.target.value='';
            }
        }
        else if (event.target.value!=='' && fieldToCheck==='nationality') {     
            var errorFieldNationality = document.getElementById('nationality').getElementsByClassName('error')[0];     
            var errorDuplicateFieldNationality = document.getElementById('nationality').getElementsByClassName('error_duplicate')[0];      
            // Check for duplicates
            nationalityState.forEach((item) => {
                if (item === event.target.value) {                     
                    if (errorDuplicateFieldNationality) {
                        errorDuplicateFieldNationality.style.display = 'flex';
                    }
                    if (errorFieldNationality) {                        
                        errorFieldNationality.style.display = 'none';
                    } 
                    event.target.value = '';
                } 
            })
            if (event.target.value !== '') {
                setNationalityState([...nationalityState,event.target.value]); 
                if (errorFieldNationality) {                        
                    errorFieldNationality.style.display = 'none';
                } 
                if (errorDuplicateFieldNationality) {
                    errorDuplicateFieldNationality.style.display = 'none';
                }
                event.target.value='';
            }
        }
        else if (event.target.value!=='' && fieldToCheck==='nationality_second') {
            var errorFieldNationalitySec = document.getElementById('nationality_second').getElementsByClassName('error')[0];     
            var errorDuplicateFieldNationalitySec = document.getElementById('nationality_second').getElementsByClassName('error_duplicate')[0];        
            // Check for duplicates
            nationalitySecondState.forEach((item) => {
                if (item === event.target.value) {                      
                    if (errorDuplicateFieldNationalitySec) {
                        errorDuplicateFieldNationalitySec.style.display = 'flex';
                    }
                    if (errorFieldNationalitySec) {                        
                        errorFieldNationalitySec.style.display = 'none';
                    }  
                    event.target.value = '';
                } 
            })
            if (event.target.value !== '') {
                setNationalitySecondState([...nationalitySecondState, event.target.value]); 
                if (errorFieldNationalitySec) {                        
                    errorFieldNationalitySec.style.display = 'none';
                } 
                if (errorDuplicateFieldNationalitySec) {
                    errorDuplicateFieldNationalitySec.style.display = 'none';
                }
                event.target.value='';
            }
        }  
    }


    // Handling the PREVIOUS button 
    const handlePreviousForm = (currStep, prevStep, step) => {
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
        console.log(addressInfo)        
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

    function handleClickNavigate() {
        localStorage.setItem('newStudent', JSON.stringify(input_Personal_Info));
        window.location.href='/uth-ece_admin/add_student/student_info_form'      
    }

    return (
        <div className="personal_info_form">
            <div className="form">
                <div className="form_container">
                    <div className="form_sidebar">
                        <div className="step active" id="first_step">
                            <FolderSharedIcon className="react-icon initial"/>
                            <div className="step_content">
                                <span className="span initial">BHMA 1</span>
                                <b>Προσωπικα Στοιχεια</b>
                            </div>
                        </div>
                        <div className="step" id="second_step" /*onClick={()=> handleNextForm(currentStep, 'second_step')}*/> 
                            <AdminPanelSettingsIcon className="react-icon"></AdminPanelSettingsIcon>
                            <div className="step_content">
                                <span className="span">BHMA 2</span>
                                <b>Ασφαλιστικα Στοιχεια</b>
                            </div>
                        </div>
                        <div className="step" id="third_step" /*onClick={()=> handleNextForm(currentStep, 'third_step')}*/>
                            <CakeIcon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 3</span>
                                <b>Στοιχεια Γεννησης Προσωπου</b>
                            </div>
                        </div>
                        <div className="step" id="fourth_step" /*onClick={()=> handleNextForm(currentStep, 'fourth_step')}*/>
                            <BadgeIcon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 4</span>
                                <b>Ταυτοτητα Προσωπου</b>
                            </div>
                        </div>
                        <div className="step" id="fifth_step" /*onClick={()=> handleNextForm(currentStep, 'fifth_step')}*/>
                            <PersonPinCircleIcon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 5</span>
                                <b>Διευθυνση Προσωπου</b>
                            </div>
                        </div>
                        <div className="step" id="sixth_step" /*onClick={()=> handleNextForm(currentStep, 'sixth_step')}*/>
                            <Diversity3Icon className="react-icon"/>
                            <div className="step_content">
                                <span className="span">BHMA 6</span>
                                <b>Στοιχεια Επαφης Τριτου Προσωπου</b>
                            </div>
                        </div>  
                    </div>

                    <div className="stp first_step">
                        <div className="header">
                            <h1 className="title">Προσωπικά Στοιχεία</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="first_column">
                                <div className="form_item" id="last_name">
                                    <div className="label">
                                        <label>Επώνυμο</label>
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('last_name').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="last_name" onChange={(e)=> { handleInputChange(e.target.value, 'last_name'); setPersonalInfo({...personalInfo, last_name:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="dot_father_name">
                                    <div className="label">
                                        <label>Μ. Όνομα</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('dot_father_name').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="dot_father_name" onChange={(e)=>{ handleInputChange(e.target.value, 'dot_father_name'); setPersonalInfo({...personalInfo, dot_father_name:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item"  id="father_FirstName">
                                    <div className="label">
                                        <label>Πατρώνυμο</label>                                        
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('father_FirstName').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="father_FirstName" onChange={(e)=>{ handleInputChange(e.target.value, 'father_FirstName'); setPersonalInfo({...personalInfo, father_FirstName:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="mother_FirstName">
                                    <div className="label">
                                        <label>Μητρώνυμο</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('mother_FirstName').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="mother_FirstName" onChange={(e)=>{ handleInputChange(e.target.value, 'mother_FirstName'); setPersonalInfo({...personalInfo, mother_FirstName:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="profession">
                                    <div className="label">
                                        <label>Επάγγελμα</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input className='inputItem' type="text" required id="profession" onChange={(e)=> { handleInputChange(e.target.value, 'profession'); setPersonalInfo({...personalInfo, profession:e.target.value})}}></input>
                                    </div>
                                </div>
                                
                                <div className="form_item" id = "website">
                                    <div className="label">
                                        <label htmlFor="website">Ιστότοπος</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input className='inputItem' type="text" required id="website" onChange={(e)=> { handleInputChange(e.target.value, 'website'); setPersonalInfo({...personalInfo, website:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="father_profession">
                                    <div className="label">
                                        <label>Επάγγελμα Πατέρα</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input className='inputItem' type="text" required id="father_profession" onChange={(e)=> { handleInputChange(e.target.value, 'father_profession'); setPersonalInfo({...personalInfo, father_profession:e.target.value})}} ></input>
                                    </div>
                                </div>
                                <div className="form_item" id="active">
                                    <div className="label">
                                        <label>Ενεργός/ή</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <div className="switcher">
                                            <p className="yes sw_active">ΝΑΙ</p>
                                            <label className="switch">
                                                <input type="checkbox"></input>
                                                <span className="slider round" onClick={()=> (personalInfo.active === "ΝΑΙ") ? setPersonalInfo({...personalInfo,active:"ΟΧΙ"}): setPersonalInfo({...personalInfo, active:"ΝΑΙ"})}></span>
                                            </label>
                                            <p className="no">ΟΧΙ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_item" id="sex">
                                    <div className="label">
                                        <label>Προσφώνηση</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('sex').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="sex" onChange={(e)=> { handleInputChange(e.target.value, 'sex'); setPersonalInfo({...personalInfo, sex:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="student_identity">
                                    <div className="label">
                                        <label>Ακαδημαϊκή Ταυτότητα</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('student_identity').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="student_identity" onChange={(e)=> { handleInputChange(e.target.value, 'student_identity'); setPersonalInfo({...personalInfo, student_identity:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="notations">
                                    <div className="label">
                                        <label>Σημειώσεις</label>
                                    </div>
                                    <div className="input_item"> 
                                        <textarea className='inputItem' type="text" required id="notations" onChange={(e)=>{ handleInputChange(e.target.value, 'notations'); setPersonalInfo({...personalInfo,  notations:e.target.value})}}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="second_column">
                                <div className="form_item" id="first_name">
                                    <div className="label">
                                        <label>Όνομα</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('first_name').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input  className='inputItem' type="text" required id="first_name" onChange={(e)=> { handleInputChange(e.target.value, 'first_name'); setPersonalInfo({...personalInfo, first_name:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="maiden_name"> 
                                    <div className="label">
                                        <label>Πατρικό Όνομα</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('maiden_name').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="maiden_name" onChange={(e)=> { handleInputChange(e.target.value, 'maiden_name'); setPersonalInfo({...personalInfo, maiden_name:e.target.value})}}></input>
                                    </div>
                                </div>
                                    <div className="form_item" id="father_LastName">
                                    <div className="label">
                                        <label>Επώνυμο Πατρός</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('father_LastName').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="father_LastName" onChange={(e)=>{handleInputChange(e.target.value, 'father_LastName'); setPersonalInfo({...personalInfo, father_LastName:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="mother_LastName"> 
                                    <div className="label">
                                        <label>Επώνυμο Μητρός</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('mother_LastName').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="mother_LastName" onChange={(e)=>{handleInputChange(e.target.value, 'mother_LastName'); setPersonalInfo({...personalInfo, mother_LastName:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="family">
                                    <div className="label">
                                        <label>Οικογενειακή Κατάσταση</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input className='inputItem' type="text" required id="family" placeholder ="'Αγαμος/η" onChange={(e)=> {handleInputChange(e.target.value, 'family'); setPersonalInfo({...personalInfo, family:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="spouse_name"> 
                                    <div className="label">
                                        <label>Όνομα Συζύγου</label> 
                                    </div>
                                    <div className="input_item"> 
                                    <input className='inputItem' type="text" required id="spouse_name" onChange={(e)=> { handleInputChange(e.target.value, 'spouse_name'); setPersonalInfo({...personalInfo, spouse_name:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="mother_profession">
                                    <div className="label">
                                        <label>Επάγγελμα Μητέρας</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input  className='inputItem' type="text" required id="mother_profession" onChange={(e)=> { handleInputChange(e.target.value, 'mother_profession'); setPersonalInfo({...personalInfo, mother_profession:e.target.value})}}></input>
                                    </div>
                                </div>
                                <div className="form_item" id="username">
                                    <div className="label">
                                        <label>Όνομα Χρήστη</label> 
                                    </div>
                                    <div className="input_item" onChange={() => document.getElementById('username').getElementsByClassName('error')[0].style.display='none'}>
                                        <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                        <input className='inputItem' type="text" required id="username" onChange={(e)=>{handleInputChange(e.target.value, 'username'); setPersonalInfo({...personalInfo, username:e.target.value})}} ></input>
                                    </div>
                                </div>                                
                                <div className="form_item" item="personal_title">
                                    <div className="label">
                                        <label>Τίτλος Προσώπου</label> 
                                    </div>
                                    <div className="input_item"> 
                                        <input className='inputItem' type="text" required id="personal_title" onChange={(e)=>{ handleInputChange(e.target.value, 'personal_title'); setPersonalInfo({...personalInfo, personal_title:e.target.value})}}></input>                            
                                    </div>
                                </div>                                
                                <div className="form_item" id="fulfilled_military_obligations">
                                    <div className="label">
                                        <label>Εκπλ. Στρατιωτική Θητεία</label>
                                    </div>
                                    <div className="input_item"> 
                                        <div className="checkbox-cont">
                                            <div className="box" >
                                                <input type="radio" name="military_oblig" value="ΝΑΙ" onClick={()=> setPersonalInfo({...personalInfo, fulfilled_military_obligations:'ΝΑΙ'})}></input>
                                                <p className="description">ΝΑΙ</p>
                                            </div>                                           
                                            <div className="box">
                                                <input type="radio" name="military_oblig" value="ΟΧΙ" onClick={()=> setPersonalInfo({...personalInfo, fulfilled_military_obligations:'ΟΧΙ'})}></input>
                                                <p className="description">ΟΧΙ</p>
                                            </div> 
                                            <div className="box">
                                                <input type="radio" name="military_oblig" value="ΑΝΕΥ" onClick={()=> setPersonalInfo({...personalInfo, fulfilled_military_obligations:'ΑΝΕΥ'})}></input>
                                                <p className="description">ΑΝΕΥ</p>
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </form>
                        <div className="buttons">
                            <button className="prev_step" type="button" style={{visibility:"hidden"}}>Προηγούμενο</button>
                            <button className="next_step" type="button" onClick={()=> handleNextForm("first_step", "second_step", 1)}>Επόμενο</button>
                        </div>
                    </div>

                    <div className="stp second_step">
                        <div className="header">
                            <h1 className="title">Ασφαλιστικά Στοιχεία</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΑΣΦΑΛΙΣΤΙΚΑ ΣΤΟΙΧΕΙΑ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="AMKA">
                                <div className="label">
                                    <label>ΑΜΚΑ</label> 
                                </div>
                                <div className="input_item">
                                    <p className="error">*Ο ΑΜΚΑ πρέπει να είναι 11ψήφιος αριθμός!</p>
                                    <input className='inputItem' type="text" required id="AMKA"  onChange={(e)=> { handleInputChange(e.target.value, 'AMKA'); setInsuranceInfo({...insuranceInfo, AMKA:e.target.value})}}></input>  
                                </div>
                            </div>
                            <div className="form_item" id="AFM">
                                <div className="label">
                                    <label>ΑΦΜ</label> 
                                </div>
                                <div className="input_item">
                                    <p className="error">*Ο ΑΦΜ πρέπει να είναι 9ψήφιος αριθμός!</p>
                                    <input className='inputItem' type="text" required id="AFM" onChange={(e)=>{ handleInputChange(e.target.value, 'AFM'); setInsuranceInfo({...insuranceInfo, AFM:e.target.value})}}></input>                     
                                </div>        
                            </div>
                            <div className="form_item" id="DOY">
                                <div className="label">
                                    <label htmlFor="DOY">ΔΟΥ</label> 
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="DOY" onChange={(e)=>{ handleInputChange(e.target.value, 'DOY'); setInsuranceInfo({...insuranceInfo, DOY:e.target.value})}}></input>                         
                                </div>
                            </div>
                            <div className="form_item" id="AMKA_country">
                                <div className="label">
                                    <label>Χώρα ΑΜΚΑ</label> 
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="AMKA_country" onChange={(e)=> { handleInputChange(e.target.value, 'AMKA_country'); setInsuranceInfo({...insuranceInfo, AMKA_country:e.target.value})}}></input> 
                                </div>
                            </div>
                            <div className="form_item" id="AFM_country">
                                <div className="label">
                                    <label>Χώρα ΑΦΜ</label> 
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="AFM_country" onChange={(e)=> { handleInputChange(e.target.value, 'AFM_country'); setInsuranceInfo({...insuranceInfo, AFM_country:e.target.value})}}></input>   
                                </div>
                            </div>
                        </form>
                        <div className="buttons">
                        <button className="prev_step" type="button" onClick={()=> handlePreviousForm("second_step", "first_step")}>Πίσω</button>
                            <button className="next_step" type="button"  onClick={()=> handleNextForm("second_step", "third_step")}>Επόμενο</button>
                        </div>
                    </div>

                    <div className="stp third_step">
                        <div className="header">
                            <h1 className="title">Στοιχεία Γέννησης Προσώπου </h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΓΕΝΝΗΣΗΣ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="birth_date">
                                <div className="label">
                                    <label>Ημερομηνία Γέννησης</label> 
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('birth_date').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error_year">*Η Ημερομηνία Γέννησης δεν είναι έγκυρη!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input  className='inputItem' type="date" required id="birth_date" onChange={(e)=> { handleInputChange(e.target.value, 'birth_date'); setBirthInfo({...birthInfo, birth_date:moment(new Date(e.target.value)).format("YYYY-MM-DD")})}}></input>
                                </div>
                            </div>
                            <div className="form_item" id="gender">                             
                                <label>Φύλο</label>  
                                <div className="input_item" onChange={() => document.getElementById('gender').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <div className="switcher">
                                            <p className="men">Άρρεν</p>
                                            <label className="switch">
                                                <input type="checkbox"></input>
                                                <span className="slider round" onClick={()=> (birthInfo.gender === "ΑΡΡΕΝ") ? setBirthInfo({...birthInfo, gender:"ΘΗΛΥ"}): setBirthInfo({...birthInfo, gender:"ΑΡΡΕΝ"})}></span>
                                            </label>
                                            <p className="woman sw_active">Θήλυ</p>
                                    </div> 
                                </div>
                            </div> 
                            <div className="form_item" id="birth_prefecture">                       
                                <div className="label">
                                    <label>Περιοχή Γέννησης</label> 
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('birth_prefecture').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="birth_prefecture" onChange={(e)=> { handleInputChange(e.target.value, 'birth_prefecture'); setBirthInfo({...birthInfo, birth_prefecture:e.target.value})}}></input>
                                </div>
                            </div>                
                            <div className="form_item" id="birth_country">          
                                <div className="label">
                                    <label>Χώρα Γέννησης</label>  
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('birth_country').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input  className='inputItem' type="text" required id="birth_country" placeholder ="π.χ. Ελλάδα" onChange={(e)=>{ handleInputChange(e.target.value, 'birth_country'); setBirthInfo({...birthInfo, birth_country:e.target.value})}}></input> 
                                </div>
                            </div>
                            <div className="form_item" id="birth_location"> 
                                <div className="label">
                                    <label>Τόπος Γέννησης</label>  
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('birth_location').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="birth_location" onChange={(e)=>{ handleInputChange(e.target.value, 'birth_location'); setBirthInfo({...birthInfo, birth_location:e.target.value})}}></input> 
                                </div>
                            </div>  
                        </form>
                        <div className="buttons">
                            <button className="prev_step" type="button" onClick={()=> handlePreviousForm("third_step", "second_step")} >Πίσω</button>
                            <button className="next_step" type="button"  onClick={()=> handleNextForm("third_step", "fourth_step")}>Επόμενο</button>
                        </div>
                    </div>

                    <div className="stp fourth_step">
                        <div className="header">
                            <h1 className="title">Ταυτότητα Προσώπου </h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΤΑΥΤΟΤΗΤΑΣ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="identity_type" > 
                                <div className="label">
                                    <label>Τύπος Ταυτότητας</label> 
                                </div>                                    
                                <div className="input_item"  onChange={() => document.getElementById('identity_type').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <input className='inputItem' type="text" required id="identity_type" placeholder="π.χ  ΑΣΤΥΝΟΜΙΚΗ ΤΑΥΤΟΤΗΤΑ" onChange={(e)=>{ handleInputChange(e.target.value, 'identity_type'); setIdentityInfo({...identityInfo, identity_type:e.target.value})}}></input>  
                                </div>
                            </div>
                            <div className="form_item" id="identity_number"> 
                                <div className="label">
                                    <label>Αριθμός Ταυτότητας</label>  
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('identity_number').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <input className='inputItem' type="text" required id="identity_number" onChange={(e)=>{ handleInputChange(e.target.value, 'identity_number'); setIdentityInfo({...identityInfo, identity_number:e.target.value})}}></input>                         
                                </div>
                            </div>    
                            <div className="form_item" id="published_principle"> 
                                <div className="label">
                                    <label>Εκδ. Αρχή</label> 
                                </div>
                                <div className="input_item" onChange={() => document.getElementById('published_principle').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <input className='inputItem' type="text" required id="published_principle" onChange={(e)=> { handleInputChange(e.target.value, 'published_principle'); setIdentityInfo({...identityInfo, published_principle:e.target.value})}}></input>   
                                </div>                      
                            </div>
                            <div className="form_item" id="publish_date"> 
                                <div className="label">
                                    <label>Ημερομηνία Έκδοσης</label>  
                                </div>
                                <div className="input_item"  onChange={() => document.getElementById('publish_date').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error_year">*Η Ημερομηνία Έκδοσης δεν είναι έγκυρη!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <input className='inputItem' type="date" required id="publish_date" onChange={(e)=> {handleInputChange(e.target.value, 'publish_date');  setIdentityInfo({...identityInfo, publish_date:moment(new Date(e.target.value)).format("YYYY-MM-DD")})}}></input> 
                                </div>
                            </div>
                            <div className="form_item" id="citizenship"> 
                                <div className="label">
                                    <label>Υπηκοότητα</label>  
                                </div>
                                <div className="input_item"  onChange={() => { document.getElementById('citizenship').getElementsByClassName('error_duplicate')[0].style.display='none'; document.getElementById('citizenship').getElementsByClassName('error')[0].style.display='none'}}>
                                    <p className="error_duplicate">*Η συγκεκριμένη Υπηκοότητα έχει ήδη καταχωρηθεί!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <div className="tags_input">
                                        <input  type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Υπηκοότητα" onKeyUp={e => e.key === 'Enter' ? addTags(e,'citizenship') : null}></input>
                                        <ul> 
                                            {citizenshipState.map((tag,index)=> (
                                                <li key={index} className="li">
                                                    <span>{tag}</span>
                                                    <i className="material-icons"
                                                    style={{fontSize:"17px", color:"gray"}} 
                                                    onClick={()=>removeTags(index,'citizenship')}>cancel</i>
                                                </li>
                                            ))}
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="form_item" id="nationality"> 
                                <div className="label">
                                    <label>Εθνικότητα</label>  
                                </div>
                                <div className="input_item"  onChange={() => {document.getElementById('nationality').getElementsByClassName('error_duplicate')[0].style.display='none'; document.getElementById('nationality').getElementsByClassName('error')[0].style.display='none'}}>
                                    <p className="error_duplicate">*Η συγκεκριμένη Εθνικότητα έχει ήδη καταχωρηθεί!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <div className="tags_input">
                                        <input type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Εθνικότητα" onKeyUp={e => e.key === 'Enter' ? addTags(e,'nationality') : null}></input>
                                        <ul>
                                            {nationalityState.map((tag,index)=> (
                                                <li key={index} className="li">
                                                    <span>{tag}</span>
                                                    <i className="material-icons"
                                                    style={{fontSize:"17px", color:"gray"}} 
                                                    onClick={()=>removeTags(index,'nationality')}>cancel</i>
                                                </li>
                                            ))}
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="form_item" id="nationality_second"> 
                                <div className="label">
                                    <label>Ιθαγένεια</label>  
                                </div>     
                                <div className="input_item"  onChange={() => { document.getElementById('nationality_second').getElementsByClassName('error_duplicate')[0].style.display='none'; document.getElementById('nationality_second').getElementsByClassName('error')[0].style.display='none'}}>
                                    <p className="error_duplicate">*Η συγκεκριμένη Ιθαγένεια έχει ήδη καταχωρηθεί!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                    <div className="tags_input">
                                        <input type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Ιθαγένεια" onKeyUp={e => e.key === 'Enter' ? addTags(e, 'nationality_second') : null}></input>
                                        <ul>
                                            {nationalitySecondState.map((tag,index)=> (
                                                <li key={index}>
                                                    <span>{tag}</span>
                                                    <i className="material-icons"
                                                    style={{fontSize:"17px", color:"gray", zIndex:2}} 
                                                    onClick={()=>removeTags(index, 'nationality_second')}>cancel</i>
                                                </li>
                                            ))}
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="form_item" id="citizen"> 
                                <div className="label">
                                    <label>Δημοτολόγιο</label>  
                                </div>
                                <div className="input_item"  onChange={() => document.getElementById('citizen').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input  className='inputItem' type="text" required id="citizen" onChange={(e)=> { handleInputChange(e.target.value, 'citizen'); setIdentityInfo({...identityInfo, citizen:e.target.value})}}></input>   
                                </div>
                            </div>
                            <div className="form_item" id="citizen_number"> 
                                <div className="label">
                                    <label htmlFor="citizen_number">Αριθμός Δημοτολογίου</label>  
                                </div>
                                <div className="input_item"  onChange={() => document.getElementById('citizen_number').getElementsByClassName('error')[0].style.display='none'}>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="citizen_number" onChange={(e)=> { handleInputChange(e.target.value, 'citizen_number'); setIdentityInfo({...identityInfo, citizen_number:e.target.value})}}></input>   
                                </div>
                            </div>
                            <div className="form_item" id="male_record_num"> 
                                <div className="label">
                                    <label>Αρ. Μητρώου Αρρένων</label>  
                                </div>
                                <div className="input_item"> 
                                    <input  className='inputItem' type="text" required id="male_record_num" onChange={(e)=> { handleInputChange(e.target.value, 'male_record_num'); setIdentityInfo({...identityInfo, male_record_num:e.target.value})}}></input>   
                                </div>
                            </div> 
                            <div className="form_item" id="male_record_perf"> 
                                <div className="label">
                                    <label>Νομός Μητρώου Αρρένων</label>  
                                </div>
                                <div className="input_item"> 
                                    <input className='inputItem' type="text" required id="male_record_perf" onChange={(e)=> { handleInputChange(e.target.value, 'male_record_perf'); setIdentityInfo({...identityInfo, male_record_perf:e.target.value})}}></input>
                                </div>
                            </div>   
                            <div className="form_item" id="male_record_gr"> 
                                <div className="label">
                                    <label>Γρ. Μητρώου Αρρένων</label>  
                                </div>
                                <div className="input_item"> 
                                    <input  className='inputItem' type="text" required id="male_record_gr" onChange={(e)=> { handleInputChange(e.target.value, 'male_record_gr'); setIdentityInfo({...identityInfo, male_record_gr:e.target.value})}} ></input>
                                </div>
                            </div>  
                            <div className="form_item" id="male_record_loc">  
                                <div className="label">
                                    <label>Τόπος Μητρώου Αρρένων</label>  
                                </div>
                                <div className="input_item"> 
                                    <input className='inputItem' type="text" required id="male_record_loc" onChange={(e)=> { handleInputChange(e.target.value, 'male_record_loc'); setIdentityInfo({...identityInfo, male_record_loc:e.target.value})}}></input>   
                                </div>
                            </div>
                        </form>
                        <div className="buttons">
                            <button className="prev_step" type="button" onClick={()=> handlePreviousForm("fourth_step", "third_step")}>Πίσω</button>
                            <button className="next_step" type="button"  onClick={()=> handleNextForm("fourth_step", "fifth_step")}>Επόμενο</button>
                        </div>
                    </div>

                    <div className="stp fifth_step">
                        <div className="header">
                            <h1 className="title">Διεύθυνση Προσώπου </h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΔΙΕΥΘΥΝΣΗΣ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="road">  
                                <div className="label">
                                    <label>Οδός Κατοικίας</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="road" onChange={(e)=> { handleInputChange(e.target.value, 'road'); setAddressInfo({...addressInfo, road:e.target.value})}}></input> 
                                </div>                                 
                            </div>
                            <div className="form_item" id="rd_number"> 
                                <div className="label">
                                    <label>Αριθμός</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="rd_number" onChange={(e)=> { handleInputChange(e.target.value, 'rd_number'); setAddressInfo({...addressInfo, rd_number:e.target.value})}}></input>      
                                </div>                       
                            </div>
                            <div className="form_item" id="city"> 
                                <div className="label">
                                    <label>Πόλη</label> 
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="city" onChange={(e)=> { handleInputChange(e.target.value, 'city'); setAddressInfo({...addressInfo, city:e.target.value})}}></input>        
                                </div>                 
                            </div>
                            <div className="form_item" id="location"> 
                                <div className="label">
                                    <label>Περιοχή</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="location" onChange={(e)=> { handleInputChange(e.target.value, 'location'); setAddressInfo({...addressInfo, location:e.target.value})}}></input> 
                                </div>
                            </div>
                            <div className="form_item" id="country"> 
                                <div className="label">
                                    <label>Χώρα</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="country" placeholder="π.χ.  ΕΛΛΑΔΑ" onChange={(e)=> { handleInputChange(e.target.value, 'country'); setAddressInfo({...addressInfo, country:e.target.value})}}></input>  
                                </div>
                            </div>
                            <div className="form_item" id="acting_address"> 
                                <div className="label">
                                    <label>Προσωρινή Κατοικία</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="acting_address" onChange={(e)=> { handleInputChange(e.target.value, 'acting_address'); setAddressInfo({...addressInfo, acting_address:e.target.value})}}></input>  
                                </div> 
                            </div>
                            <div className="form_item" id="postcode"> 
                                <div className="label">
                                    <label>T.K.</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="postcode" onChange={(e)=>{ handleInputChange(e.target.value, 'postcode'); setAddressInfo({...addressInfo, postcode:e.target.value})}}></input>   
                                </div>
                            </div>
                            <div className="form_item" id="telephone"> 
                                <div className="label">
                                    <label>Σταθερό Τηλέφωνο</label>  
                                </div>
                                <div className="input_item" onChange={() => determineErrorMessage('telephone') }>
                                    <p className="error_field">*Το Σταθερό Τηλέφωνο δεν είναι έγκυρο!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="telephone" onChange={(e)=> { handleInputChange(e.target.value, 'telephone'); setAddressInfo({...addressInfo, telephone:e.target.value})}}></input>  
                                </div>
                            </div> 
                            <div className="form_item" id="mobile_phone"> 
                                <div className="label">
                                    <label>Κινητό Τηλέφωνο</label>  
                                </div>
                                <div className="input_item" onChange={() => determineErrorMessage('mobile_phone')} >
                                    <p className="error_field">*Το Κινητό Τηλέφωνο δεν είναι έγκυρο!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="mobile_phone" onChange={(e)=> { handleInputChange(e.target.value, 'mobile_phone'); setAddressInfo({...addressInfo, mobile_phone:e.target.value})}}></input> 
                                </div>
                            </div>  
                            <div className="form_item" id="uth_email"> 
                                <div className="label">
                                    <label>Email</label>                
                                </div>
                                <div className="input_item" onChange={() => determineErrorMessage('uth_email')}>
                                    <p className="error_field">*Το Πανεπιστημιακό Email δεν είναι έγκυρο!</p>
                                    <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                    <input className='inputItem' type="text" required id="uth_email" onChange={(e)=>{ handleInputChange(e.target.value, 'uth_email'); setAddressInfo({...addressInfo, uth_email:e.target.value})}}></input> 
                                </div>
                            </div>   
                            <div className="form_item" id="alternative_email"> 
                                <div className="label">
                                    <label>Εναλλακτικό Email</label>  
                                </div>
                                <div className="input_item" onChange={() => determineErrorMessage('alternative_email')}>
                                    <p className="error_field">*Το Εναλλακτικό Email δεν είναι έγκυρο!</p> 
                                    <input className='inputItem' type="text" required id="alternative_email" onChange={(e)=> { handleInputChange(e.target.value, 'alternative_email'); setAddressInfo({...addressInfo, alternative_email:e.target.value})}}></input>   
                                </div>
                            </div>
                        </form>
                        <div className="buttons">
                            <button className="prev_step" type="button" onClick={()=> handlePreviousForm("fifth_step", "fourth_step")}>Πίσω</button>
                            <button className="next_step" type="button"  onClick={()=> handleNextForm("fifth_step", "sixth_step")}>Επόμενο</button>
                        </div>
                    </div>

                    <div className="stp sixth_step">
                        <div className="header">
                            <h1 className="title">Στοιχεία Επαφής Τρίτου Προσώπου</h1>
                            <p className="exp">Παρακαλώ όπως συμπληρώσετε τα ΣΤΟΙΧΕΙΑ ΕΠΑΦΗΣ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ του φοιτητή</p>
                            <h4 className="exp">*Η φόρμα συμπληρώνεται αποκλειστικά με κεφαλαία γράμματα!</h4>
                        </div>
                        <form>
                            <div className="form_item" id="contact_type"> 
                                <div className="label">
                                    <label>Ιδιότητα Επαφής</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="contact_type"  onChange={(e)=> { handleInputChange(e.target.value, 'contact_type'); setThirdPersonInfo({...thirdPersonInfo, contact_type:e.target.value})}}></input>  
                                </div>
                            </div>
                            <div className="form_item" id ="person_FirstName"> 
                                <div className="label">
                                    <label>Όνομα</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="person_FirstName" onChange={(e)=> { handleInputChange(e.target.value, 'person_FirstName'); setThirdPersonInfo({...thirdPersonInfo, person_FirstName:e.target.value})}}></input>      
                                </div>                       
                            </div> 
                            <div className="form_item" id="person_LastName"> 
                                <div className="label">
                                    <label>Επώνυμο</label> 
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="person_LastName" onChange={(e)=> { handleInputChange(e.target.value, 'person_LastName'); setThirdPersonInfo({...thirdPersonInfo, person_LastName:e.target.value})}}></input>      
                                </div>                   
                            </div>
                            <div className="form_item" id="person_address"> 
                                <div className="label">
                                    <label>Διεύθυνση Επικοινωνίας</label>  
                                </div>
                                <div className="input_item">
                                    <input className='inputItem' type="text" required id="person_address" onChange={(e)=> { handleInputChange(e.target.value, 'person_address'); setThirdPersonInfo({...thirdPersonInfo, person_address:e.target.value})}}></input> 
                                </div>
                            </div>
                            <div className="form_item" id="person_telephone"> 
                                <div className="label">
                                    <label>Σταθερό Τηλέφωνο</label>  
                                </div>
                                <div className="input_item">
                                    <p className="error">*Το Σταθερό Τηλέφωνο δεν είναι έγκυρο!</p>
                                    <input className='inputItem' type="text" required id="person_telephone" onChange={(e)=> { handleInputChange(e.target.value, 'person_telephone'); setThirdPersonInfo({...thirdPersonInfo, person_telephone:e.target.value})}}></input>  
                                </div>
                            </div>
                            <div className="form_item" id="person_mobilephone"> 
                                <div className="label">
                                    <label>Κινητό</label>  
                                </div>
                                <div className="input_item">
                                    <p className="error">*Το Κινητό Τηλέφωνο δεν είναι έγκυρο!</p>
                                    <input className='inputItem' type="text" required id="person_mobilephone" onChange={(e)=> { handleInputChange(e.target.value, 'person_mobilephone'); setThirdPersonInfo({...thirdPersonInfo, person_mobilephone:e.target.value})}}></input>   
                                </div>
                            </div>
                            <div className="form_item" id="person_email"> 
                                <div className="label">                                    
                                    <label>Email Επικοινωνίας</label>  
                                </div>
                                <div className="input_item">
                                    <p className="error">*Το Email Επικοινωνίας δεν είναι έγκυρο!</p> 
                                    <input  className='inputItem' type="text" required id="person_email" onChange={(e)=> { handleInputChange(e.target.value, 'person_email'); setThirdPersonInfo({...thirdPersonInfo, person_email:e.target.value})}}></input>    
                                </div>                             
                            </div> 
                        </form>
                        <div className="buttons">
                            <button className="prev_step" type="button" onClick={()=> handlePreviousForm("sixth_step", "fifth_step")}>Πίσω</button>
                            <button className="next_step" type="button" onClick={() => handleClickNavigate()}>Τέλος</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )     
}

export default FirstMultistepAddForm;