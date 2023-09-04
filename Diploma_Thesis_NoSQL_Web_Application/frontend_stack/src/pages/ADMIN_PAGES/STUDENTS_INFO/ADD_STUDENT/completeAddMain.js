import React, {useState} from "react";

// Images
import newFemaleStudent from '../../../../Icons/female-student.png';
import newMaleStudent from '../../../../Icons/male-student.png';
import ECEUTH from '../../../../Icons/uth-logo-background.png';

// React Icons 
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import InputIcon from '@mui/icons-material/Input';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

// Components
import PopUpForms from "./popUpForms"; 
import PopUp from '../../../../components/POPUP/popUp';

// GraphQL Resolvers
import studentResolvers from '../../../../graphql/resolvers/student';

// CSS styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/completeAddMain.scss';

const CompleteAddMainPage = ( props ) => {
    // Collect the information for the new student from the local storage
    const newStudentInfo = JSON.parse(localStorage.getItem('newStudent'));
    const student_firstName = newStudentInfo.personalInfo.personalInfo.first_name;    // Student first name
    const student_lastName = newStudentInfo.personalInfo.personalInfo.last_name;      // Student last name
    const student_academicIdentity = newStudentInfo.generalInfo.academic_identity;    // Student academic identity
    const student_recordNumber = newStudentInfo.generalInfo.academic_record_number;   // Student academic record number (AEM)
    const student_username = newStudentInfo.personalInfo.personalInfo.username;       // Student username
    const student_department = newStudentInfo.generalInfo.department;                 // Student department
    const student_departmentNumber = newStudentInfo.generalInfo.department_number;    // Student department number
    const student_course = newStudentInfo.generalInfo.course;                         // Student course
    const student_courseNumber = newStudentInfo.generalInfo.course_number;            // Student course number
    const student_situation = newStudentInfo.generalInfo.student_situation;           // Student situation
    const student_gender = newStudentInfo.personalInfo.birthInfo.gender;
    
    // Determine the state values for the pop-up windows
    const [openPopup, setOpenPopup] = useState(false);

    // Initialize the state value for the current pop-up window
    const [popUpWindow, setPopUpWindow] = useState("");

    // Call the suitable resolver to add a new student
    const addNewStudent = () => {

        // Personal Details
        const Personal_Information = newStudentInfo.personalInfo.personalInfo;
        const Birth_Details = newStudentInfo.personalInfo.birthInfo;
        const Student_Address = newStudentInfo.personalInfo.addressInfo;
        const Student_Identity = newStudentInfo.personalInfo.identityInfo;
        const Student_Insurance = newStudentInfo.personalInfo.insuranceInfo;
        const Third_Person_Contact_Details = newStudentInfo.personalInfo.thirdPersonInfo;
        const Personal_Info = {Personal_Information, Birth_Details, Student_Insurance, Student_Identity, Student_Address, Third_Person_Contact_Details};

        // Studenship Details
        const General_Information = newStudentInfo.generalInfo;
        const Registration_Details = newStudentInfo.registrationInfo;
        const Professor_Advisor_Details = newStudentInfo.professorAdvisorInfo;
        const Studentship_Info = {General_Information, Registration_Details, Professor_Advisor_Details}; 

        // NEW STUDENT OBJECT
        const studentInput = { Personal_Info, Studentship_Info };

        // Call the suitable mutation for adding new student 

        studentResolvers.add_student(Object(studentInput))
            .then(data => {   
                if ((Object.values(data)[0].addStudent.code) === 'S-0K') {                   
                    window.location.href = "/uth-ece_admin/add_student/complete_add_final";
                }
            })
            .catch(error=> console.log(error))              
    }
    
    return (
        props.type === 'complete_registration_form' ? 
        <div className="complete_add_main"> 
            <div className="complete_message">
                    Ένας νέος φοιτητής με<p>ΣΤΟΙΧΕΙΑ ΠΡΟΦΙΛ</p> που
                    φαίνονται στην καρτέλα που ακολουθεί πρόκειται να καταχωρηθεί στη Γραμματεία του Τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας :
            </div>
            <div className="profileCard">
                <div className="wrapper">
                    <div className="left">
                        <div className="first_part">
                            {student_gender === 'ΘΗΛΥ' ?  <img  src={newFemaleStudent} alt='student' style={{backgroundColor:'white', border:'1px solid gray', padding:'0.5rem 0.5rem', }} width='120'/> :  <img  src={newMaleStudent} alt='student' style={{backgroundColor:'white', border:'1px solid gray', padding:'0.5rem 0.5rem', }} width='120'/> }                           
                            <h4>{student_lastName} {student_firstName}</h4>
                            <p>Φοιτήτρια</p>
                        </div>                                
                    </div>
                    <div className="right">
                        <div className="info">
                            <img  className='logo' src ={ECEUTH} alt="logo" width='50%'></img>
                            <h3>Προφίλ Φοιτητή</h3>     
                            <div className="info_data">
                                <div className="data">
                                    <h4>Ακαδημαϊκή Ταυτότητα</h4>
                                    <p>{student_academicIdentity}</p>
                                </div>
                                <div className="data">
                                    <h4>Αριθμός Μητρώου</h4>
                                    <p>{student_recordNumber}</p>
                                </div>
                                <div className="data">
                                    <h4>Όνομα Χρήστη</h4>
                                    <p>{student_username}</p>
                                </div>
                                <div className="data">
                                    <h4>Τμήμα</h4>
                                    <p>{student_departmentNumber} {student_department}</p>
                                </div>
                                <div className="data">
                                    <h4>Πρόγραμμα Σπουδών</h4>
                                    <p>{student_courseNumber} {student_course}</p>
                                </div>
                                <div className="data">
                                    <h4>Κατάσταση Φοιτητή</h4>
                                    <p>{student_situation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div className="checkForms">
                <div className="check_message">
                    Πριν τη τελική καταχώρηση του νέου φοιτητή στο τμήμα επιβεβαιώστε τα στοιχεία εγγραφής του :
                </div>
                <div className="table_section">
                    <table>
                        <thead>                            
                            <tr>
                                <th>Νο</th>                                
                                <th>Σύμβολο</th>
                                <th>Περιγραφή Στοιχείων</th>
                                <th>Κατηγορία Στοιχείων</th>  
                                <th>Προεπισκόπιση</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>                                
                                <td><FolderSharedIcon/></td>
                                <td>Προσωπικά Στοιχεία</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>   
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('PesonalInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>2</td>                                
                                <td><AdminPanelSettingsIcon/></td>
                                <td>Ασφαλιστικά Στοιχεία</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('InsuranceInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>3</td>                                
                                <td><CakeIcon/></td>
                                <td>Στοιχεία Γέννησης Προσώπου</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('BirthInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>4</td>                                
                                <td><BadgeIcon/></td>
                                <td>Ταυτότητα Προσώπου</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('IdentityInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>5</td>                                
                                <td><PersonPinCircleIcon/></td>
                                <td>Διεύθυνση Προσώπου</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('AddressInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>6</td>                                
                                <td><Diversity3Icon/></td>
                                <td>Στοιχεία Επαφής Τρίτου Προσώπου</td>
                                <td>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('ThirdPersonInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>7</td>                                
                                <td><BadgeIcon/></td>
                                <td>Γενικά Στοιχεία</td>
                                <td>ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('GeneralInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>8</td>                                
                                <td><InputIcon/></td>
                                <td>Στοιχεία Εισαγωγής</td>
                                <td>ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('RegistrationInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                            <tr>
                                <td>9</td>                                
                                <td><SupervisorAccountIcon/></td>
                                <td>Στοιχεία Σύμβουλου Καθηγητή</td>
                                <td>ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ</td>    
                                <td><EditNoteIcon className="icon" onClick={() => {setPopUpWindow('ProfessorAdvisorInfo_form'); setOpenPopup(true)}}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> 
            <button className="learn_more" onClick={() => addNewStudent() }> 
                <span className="circle" aria-hidden='true'>
                    <div className="border">                 
                        <TaskAltIcon className="check"/>   
                    </div>                     
                    <span className="button_text">ΕΙΣΑΓΩΓΗ</span>
                </span>
            </button>
            <PopUp 
                title = {student_lastName + "  " + student_firstName}
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
            >
                <PopUpForms type='registration' 
                            openPopup = {openPopup}
                            setOpenPopup = {setOpenPopup} 
                            currPopUpWindow = {popUpWindow}/>
            </PopUp>
        </div> :  
        <div className="complete_add_main"> 
            <div className="done_component">  
                <TaskAltIcon className="done_icon"/>
            </div> 
            <div className="complete_message">
                    Ο φοιτητής με ΣΤΟΙΧΕΙΑ ΠΡΟΦΙΛ που
                    φαίνονται στην καρτέλα που ακολουθεί καταχωρήθηκε<p>με επιτυχία </p> στη Γραμματεία του Τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας :
            </div>
            <div className="profileCard" style={{marginBottom:'5rem'}}>
                <div className="wrapper">
                    <div className="left">
                        <div className="first_part">
                            {student_gender === 'ΘΗΛΥ' ?  <img  src={newFemaleStudent} alt='student' style={{backgroundColor:'white', border:'1px solid gray', padding:'0.5rem 0.5rem', }} width='120'/> :  <img  src={newMaleStudent} alt='student' style={{backgroundColor:'white', border:'1px solid gray', padding:'0.5rem 0.5rem', }} width='120'/> }                           
                            <h4>{student_lastName} {student_firstName}</h4>
                            <p>Φοιτήτρια</p>
                        </div>                                
                    </div>
                    <div className="right">
                        <div className="info">
                            <img  className='logo' src ={ECEUTH} alt="logo" width='50%'></img>
                            <h3>Προφίλ Φοιτητή</h3>     
                            <div className="info_data">
                                <div className="data">
                                    <h4>Ακαδημαϊκή Ταυτότητα</h4>
                                    <p>{student_academicIdentity}</p>
                                </div>
                                <div className="data">
                                    <h4>Αριθμός Μητρώου</h4>
                                    <p>{student_recordNumber}</p>
                                </div>
                                <div className="data">
                                    <h4>Όνομα Χρήστη</h4>
                                    <p>{student_username}</p>
                                </div>
                                <div className="data">
                                    <h4>Τμήμα</h4>
                                    <p>{student_departmentNumber} {student_department}</p>
                                </div>
                                <div className="data">
                                    <h4>Πρόγραμμα Σπουδών</h4>
                                    <p>{student_courseNumber} {student_course}</p>
                                </div>
                                <div className="data">
                                    <h4>Κατάσταση Φοιτητή</h4>
                                    <p style={{color:'hsl(128, 85%, 56%)', fontWeight:'700', fontSize:'18px', letterSpacing:'2px'}}>{student_situation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CompleteAddMainPage;