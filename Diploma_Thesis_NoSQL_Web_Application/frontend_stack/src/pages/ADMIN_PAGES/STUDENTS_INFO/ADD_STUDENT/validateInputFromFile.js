import React, { useEffect, useState} from "react"; 
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse'; 
import validator from "validator";

// Icons
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/validateInputFromFile.scss';

const ValidateInputFromFile = (props) => {   

    const navigate = useNavigate();

    // Declare the initial state of the new Students data after parsing csv file
    let [newStudentsData, setNewStudentsData] = useState([]);

    // Declare the initial state of submit button 
    const [submitButton, setSubmitButton] = useState('submit_button loading'); 

    // Declare the state variable that stores the current number of csv file's valid input data 
    // The value if this variable changes when an error be founded in the input data
    let [validRegistrations, setValidRegistrations] = useState({});

    // Determine the state array that will include the input errors
    const [inputErrors, setInputErrors] = useState([]);

    // Catch the input file (json or csv) that contains the input values for the students' registration
    const inputFile = props.file.state;   

    // Determine and initialize the state variable that stores the number of new registrations that the uploaded csv file contains
    let [numberOfRegistrations, setNumberOfRegistrations] = useState(0);
    
    // Check the validation of the uploaded csv file
    useEffect(() => {             
        let validInput = 0;
        // FIRST CHECK : Validation of the PERSONAL INFORMATION of the new student
        const checkPersonalInformation = (newStudent, index) => {
            let valid = true; 
        
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                Last Name
            if (newStudent['Personal_Info.Personal_Information.last_name'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                First Name
            if (newStudent['Personal_Info.Personal_Information.first_name'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΟΝΟΜΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΟΝΟΜΑ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Dot Father Name
            if (newStudent['Personal_Info.Personal_Information.dot_father_name'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Μ. ΟΝΟΜΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Μ. ΟΝΟΜΑ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Father First Name
            if (newStudent['Personal_Info.Personal_Information.father_FirstName'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΤΡΩΝΥΜΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΤΡΩΝΥΜΟ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Father Last Name
            if (newStudent['Personal_Info.Personal_Information.father_LastName'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΠΑΤΡΟΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΠΑΤΡΟΣ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Maiden Name
            if (newStudent['Personal_Info.Personal_Information.maiden_name'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΤΡΙΚΟ ΟΝΟΜΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΤΡΙΚΟ ΟΝΟΜΑ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Mother First Name
            if (newStudent['Personal_Info.Personal_Information.mother_FirstName'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Μ. ΟΝΟΜΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΜΗΤΡΩΝΥΜΟ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Mother Last Name
            if (newStudent['Personal_Info.Personal_Information.mother_LastName'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΠΑΤΡΟΣ είναι υποχρεωτικό !`);
                                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΜΗΤΡΟΣ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Username
            if (newStudent['Personal_Info.Personal_Information.username'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΟΝΟΜΑ ΧΡΗΣΤΗ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΟΝΟΜΑ ΧΡΗΣΤΗ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                Student Identity
            if (newStudent['Personal_Info.Personal_Information.student_identity'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΪΚΗ ΤΑΥΤΟΤΗΤΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΪΚΗ ΤΑΥΤΟΤΗΤΑ είναι υποχρεωτικό!`])); 
                valid = false;
            }
            //                                  Sex
            if (newStudent['Personal_Info.Personal_Information.sex'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΡΟΣΦΩΝΗΣΗ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΡΟΣΦΩΝΗΣΗ είναι υποχρεωτικό!`]));
                valid = false;
            }
    
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                               Spouse Name
            if (newStudent['Personal_Info.Personal_Information.spouse_name'] === "") {             
                newStudent['Personal_Info.Personal_Information.spouse_name'] = "-";
            }
            //                               Profession
            if (newStudent['Personal_Info.Personal_Information.profession'] === "") {             
                newStudent['Personal_Info.Personal_Information.profession'] = "-";
            }
            //                            Mother Profession
            if (newStudent['Personal_Info.Personal_Information.mother_profession'] === "") {             
                newStudent['Personal_Info.Personal_Information.mother_profession'] = "-";
            }
            //                            Father Profession
            if (newStudent['Personal_Info.Personal_Information.father_profession'] === "") {             
                newStudent['Personal_Info.Personal_Information.father_profession'] = "-";
            }
            //                                 Family
            if (newStudent['Personal_Info.Personal_Information.family'] === "") {             
                newStudent['Personal_Info.Personal_Information.family'] = "ΑΓΑΜΟΣ/Η";
            }
            //                              Personal Title
            if (newStudent['Personal_Info.Personal_Information.personal_title'] === "") {             
                newStudent['Personal_Info.Personal_Information.personal_title'] = "-";
            }
            //                                  Website
            if (newStudent['Personal_Info.Personal_Information.website'] === "") {             
                newStudent['Personal_Info.Personal_Information.website'] = "-";
            }
            //                                  Active
            if (newStudent['Personal_Info.Personal_Information.active'] === "") {             
                newStudent['Personal_Info.Personal_Information.active'] = "ΝΑΙ";
            }
            //                                  Military
            if (newStudent['Personal_Info.Personal_Information.active'] === "") {             
                newStudent['Personal_Info.Personal_Information.active'] = "ΟΧΙ";
            }
            //                                  Notations
            if (newStudent['Personal_Info.Personal_Information.notations'] === "") {             
                newStudent['Personal_Info.Personal_Information.notations'] = "-";
            }
            newStudentsData[index] = newStudent;     
            return (valid);
        }
    
        // SECOND CHECK : Validation of the BIRTH INFORMATION of the new student
        const checkBirthInformation = (newStudent, index) => {
            let valid = true; 
    
            let currentDate = new Date();
            let currYear = currentDate.getFullYear();  
        
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                Birth Country
            if (newStudent['Personal_Info.Birth_Details.birth_country'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΧΩΡΑ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΧΩΡΑ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                Birth Location
            if (newStudent['Personal_Info.Birth_Details.birth_location'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                      Birth Prefecture
            if (newStudent['Personal_Info.Birth_Details.birth_prefecture'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΕΡΙΟΧΗ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΕΡΙΟΧΗ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                           Gender
            if (newStudent['Personal_Info.Birth_Details.gender'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΦΥΛΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΦΥΛΟ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                          Birth Date
            if (newStudent['Personal_Info.Birth_Details.birth_date'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό !`);
               setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }             
            var v = newStudent['Personal_Info.Birth_Details.birth_date'].split('-');
            if (Number(v[0]) >= currYear) {
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Στο πεδίο ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ το έτος δεν είναι έγκυρο !`);
               setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ δεν είναι έγκυρο!`]));
                valid = false;
            } 
            newStudentsData[index] = newStudent;    
            return (valid);
        }
    
        // THIRD CHECK : Validation of the INSURANCE INFORMATION of the new student
        const checkInsuranceInformation = (newStudent, index) => {
            let valid = true; 
         
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                                  AMKA
            if (newStudent['Personal_Info.Student_Insurance.AMKA'].length !== 11) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΜΚΑ πρέπει να είναι 11ψήφιο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΜΚΑ πρέπει να είναι 11ψήφιο!`]));
                valid = false;
            }
            //                                  AFM
            if (newStudent['Personal_Info.Student_Insurance.AFM'].length !== 9) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΦΜ πρέπει να είναι 9ψήφιο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΦΜ πρέπει να είναι 9ψήφιο!`]));
                valid = false;
            }
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                                 AMKA
            if (newStudent['Personal_Info.Student_Insurance.AMKA'] === "") {             
                newStudent['Personal_Info.Student_Insurance.AMKA'] = "-";
            }
            //                                 AFM
            if (newStudent['Personal_Info.Student_Insurance.AFM'] === "") {             
                newStudent['Personal_Info.Student_Insurance.AFM'] = "-";
            }
            //                                 DOY
            if (newStudent['Personal_Info.Student_Insurance.DOY'] === "") {             
                newStudent['Personal_Info.Student_Insurance.DOY'] = "-";
            }
            //                             AMKA_country
            if (newStudent['Personal_Info.Student_Insurance.AMKA_country'] === "") {             
                newStudent['Personal_Info.Student_Insurance.AMKA_country'] = "-";
            }
            //                             AFM_country
            if (newStudent['Personal_Info.Student_Insurance.AFM_country'] === "") {             
                newStudent['Personal_Info.Student_Insurance.AFM_country'] = "-";
            }
            newStudentsData[index] = newStudent;    
            return (valid);
        }
    
         // FOURTH CHECK : Validation of the IDENTITY INFORMATION of the new student
         const checkIdentityInformation = (newStudent, index) => {
            let valid = true; 
    
            let currentDate = new Date();
            let currYear = currentDate.getFullYear(); 
            let currMonth = currentDate.getMonth() + 1 ;
            let currDay = currentDate.getDate();
         
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                                 Identity Type
            if (newStudent['Personal_Info.Student_Identity.identity_type'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΥΠΟΣ ΤΑΥΤΟΤΗΤΑΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΥΠΟΣ ΤΑΥΤΟΤΗΤΑΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                                  Citizenship
            if (newStudent['Personal_Info.Student_Identity.citizenship'] === []) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΥΠΗΚΟΟΤΗΤΑ !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΥΠΗΚΟΟΤΗΤΑ!`]));
                valid = false;
            }
            //                                  Nationality
            if (newStudent['Personal_Info.Student_Identity.nationality'] === []) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΕΘΝΙΚΟΤΗΤΑ !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΕΘΝΙΚΟΤΗΤΑ!`]));
                valid = false;
            }
            //                                  Nationality Second
            if (newStudent['Personal_Info.Student_Identity.nationality_second'] === []) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΙΘΑΓΕΝΕΙΑ !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Παρακαλώ συμπληρώστε τουλάχιστον μία ΙΘΑΓΕΝΕΙΑ!`]));
                valid = false;
            }
            //                                    Citizen
            if (newStudent['Personal_Info.Student_Identity.citizen'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΔΗΜΟΤΟΛΟΓΙΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΔΗΜΑΤΟΛΟΓΙΟ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                                Identity Number
            if (newStudent['Personal_Info.Student_Identity.identity_number'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΤΑΥΤΟΤΗΤΑΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΤΑΥΤΟΤΗΤΑΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                                Citizen Number
            if (newStudent['Personal_Info.Student_Identity.citizen_number'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΔΗΜΑΤΟΛΟΓΙΟΥ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΔΗΜΑΤΟΛΟΓΙΟΥ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                               Published Principle
            if (newStudent['Personal_Info.Student_Identity.published_principle'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΚΔ. ΑΡΧΗ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΚΔ. ΑΡΧΗ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                               Publish Date
            if (newStudent['Personal_Info.Student_Identity.publish_date'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }   
            var v = newStudent['Personal_Info.Student_Identity.publish_date'].split('-'); 
            if ((Number(v[0]) > currYear) ||( (Number(v[0]) === currYear) && (Number(v[1])>currMonth) ) || ((Number(v[0]) === currYear) && (Number(v[1]) === currMonth) && (Number(v[2]) > currDay))) {
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ δεν είναι έγκυρο!`]));
                valid = false;
            }
    
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                             Male Record Number
            if (newStudent['Personal_Info.Student_Identity.male_record_num'] === "") {             
                newStudent['Personal_Info.Student_Identity.male_record_num'] = "-";
            }
            //                           Male Record Perfecture
            if (newStudent['Personal_Info.Student_Identity.male_record_perf'] === "") {             
                newStudent['Personal_Info.Student_Identity.male_record_perf'] = "-";
            }
            //                              Male Record Gr
            if (newStudent['Personal_Info.Student_Identity.male_record_gr'] === "") {             
                newStudent['Personal_Info.Student_Identity.male_record_gr'] = "-";
            }
            //                          Male Record Location
            if (newStudent['Personal_Info.Student_Identity.male_record_location'] === "") {             
                newStudent['Personal_Info.Student_Identity.male_record_location'] = "-";
            }
            newStudentsData[index] = newStudent;    
            return (valid);
        }
    
        // FIFTH CHECK : Validation of the ADDRESS INFORMATION of the new student
        const checkAddressInformation = (newStudent, index) => {
            let valid = true; 
          
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                               Telephone
            if (newStudent['Personal_Info.Student_Address.telephone'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΕΠΙΚΟΙΝΩΝΙΑΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΕΠΙΚΟΙΝΩΝΙΑΣ είναι υποχρεωτικό!`]));
                valid = false;
            } 
            if (newStudent['Personal_Info.Student_Address.telephone'].length !== 10) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΕΠΙΚΟΙΝΩΝΙΑΣ δεν έχει έγκυρο αριθμό ψηφίων !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΕΠΙΚΟΙΝΩΝΙΑΣ δεν έχει έγκυρο αριθμό ψηφίων!`]));
                valid = false;
            } 
            //                              Mobile Phone
            if (newStudent['Personal_Info.Student_Address.mobile_phone'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΙΝΗΤΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΙΝΗΤΟ είναι υποχρεωτικό!`]));
                valid = false;
            } 
            if (newStudent['Personal_Info.Student_Address.mobile_phone'].length !== 10) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΙΝΗΤΟ δεν έχει έγκυρο αριθμό ψηφίων !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο KINHTO δεν έχει έγκυρο αριθμό ψηφίων!`]));
                valid = false;
            } 
            //                               Uth Email
            if (newStudent['Personal_Info.Student_Address.uth_email'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΝΕΠΙΣΤΗΜΙΑΚΟ EMAIL είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΝΕΠΙΣΤΗΜΙΑΚΟ EMAIL είναι υποχρεωτικό!`]));
                valid = false;
            } 
            if (!newStudent['Personal_Info.Student_Address.uth_email'].endsWith("@uth.gr")) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΝΕΠΙΣΤΗΜΙΑΚΟ EMAIL δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΑΝΕΠΙΣΤΗΜΙΑΚΟ EMAIL δεν είναι έγκυρο!`]));
                valid = false;
            }  
            if (!validator.isEmail(newStudent['Personal_Info.Student_Address.alternative_email']) || newStudent['Personal_Info.Student_Address.alternative_email'].endsWith("@uth.gr")) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΝΑΛΛΑΚΤΙΚΟ EMAIL δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΝΑΛΛΑΚΤΙΚΟ EMAIL δεν είναι έγκυρο!`]));
                valid = false;
            }  
    
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                             Road
            if (newStudent['Personal_Info.Student_Address.road'] === "") {             
                newStudent['Personal_Info.Student_Address.road'] = "-";
            }
            //                           Road Number
            if (newStudent['Personal_Info.Student_Address.rd_number'] === "") {             
                newStudent['Personal_Info.Student_Address.rd_number'] = "-";
            }
            //                           City
            if (newStudent['Personal_Info.Student_Address.city'] === "") {             
                newStudent['Personal_Info.Student_Address.city'] = "-";
            }
            //                         Location
            if (newStudent['Personal_Info.Student_Address.location'] === "") {             
                newStudent['Personal_Info.Student_Address.location'] = "-";
            }
            //                           Road Number
            if (newStudent['Personal_Info.Student_Address.country'] === "") {             
                newStudent['Personal_Info.Student_Address.country'] = "ΕΛΛΑΔΑ";
            }
            //                          Acting Address
            if (newStudent['Personal_Info.Student_Address.acting_address'] === "") {             
                newStudent['Personal_Info.Student_Address.acting_address'] = "-";
            }
            //                            Postcode
            if (newStudent['Personal_Info.Student_Address.postcode'] === "") {             
                newStudent['Personal_Info.Student_Address.postcode'] = "-";
            }
            //                        Alternative Email
            if (newStudent['Personal_Info.Student_Address.alternative_email'] === "") {             
                newStudent['Personal_Info.Student_Address.alternative_email'] = "-";
            }
            newStudentsData[index] = newStudent;    
            return (valid);
        }  
    
        // SIXTH CHECK : Validation of the THIRD PERSON CONTACT INFORMATION of the new student
        const checkThirdPersonInformation = (newStudent, index) => {
            let valid = true; 
          
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                          Telephone of Person    
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_telephone'].length !== 10) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν έχει έγκυρο αριθμό ψηφίων !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΗΛΕΦΩΝΟ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν έχει έγκυρο αριθμό ψηφίων!`]));
                valid = false;
            } 
            //                         Mobile Phone of Person 
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_mobilephone'].length !== 10) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΙΝΗΤΟ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν έχει έγκυρο αριθμό ψηφίων !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΙΝΗΤΟ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν έχει έγκυρο αριθμό ψηφίων!`]));
                valid = false;
            } 
            //                          Email of Person 
            if (!validator.isEmail(newStudent['Personal_Info.Third_Person_Contact_Details.person_email'])) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο EMAIL ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο EMAIL ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ δεν είναι έγκυρο!`]));
                valid = false;
            }  
    
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                             Contact Type
            if (newStudent['Personal_Info.Third_Person_Contact_Details.contact_type'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.contact_typ'] = "-";
            }
            //                         First Name of Person
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_FirstName'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_FirstName'] = "-";
            }
            //                          Last Name of Person
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_LastName'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_LastName'] = "-";
            }
            //                           Address of Person
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_address'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_address'] = "-";
            }
            //                          Telephone of Person
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_telephone'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_telephone'] = "-";
            }
            //                          Mobile Phone of Person
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_mobilephone'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_mobilephone'] = "-";
            }
            //                            Person  Email
            if (newStudent['Personal_Info.Third_Person_Contact_Details.person_email'] === "") {             
                newStudent['Personal_Info.Third_Person_Contact_Details.person_email'] = "-";
            }     
            newStudentsData[index] = newStudent;      
            return (valid);
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
            return((academicYear));
        } 
        
        // SEVENTH CHECK : Validation of the STUDENSHIP GENERAL INFORMATION of the new student
        const checkGeneralInformation = (newStudent, index) => {
            let valid = true; 
          
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                             Department
            if (newStudent['Studentship_Info.General_Information.department'] !== 'TMHMA ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ KAI ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ' || newStudent['Studentship_Info.General_Information.department'] === '') {             
                newStudent['Studentship_Info.General_Information.department'] = 'TMHMA ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ KAI ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ';
            } 
            //                           Department Number
            if (newStudent['Studentship_Info.General_Information.department_number'] !== '501' || newStudent['Studentship_Info.General_Information.department'] === '') {             
                newStudent['Studentship_Info.General_Information.department_number'] = '501';
            } 
            //                               Course
            if (newStudent['Studentship_Info.General_Information.course'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                            Course Number
            if (newStudent['Studentship_Info.General_Information.course_number'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΠΡΟΓΡΑΜΜΑΤΟΣ ΣΠΟΥΔΩΝ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΠΡΟΓΡΑΜΜΑΤΟΣ ΣΠΟΥΔΩΝ είναι υποχρεωτικό!`]));
                valid = false;
            }
            //                            Academic Email
            if (newStudent['Studentship_Info.General_Information.academic_email'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΟ EMAIL είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΟ EMAIL είναι υποχρεωτικό!`]));
                valid = false;
            }
            if (!newStudent['Studentship_Info.General_Information.academic_email'].endsWith("@uth.gr")) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΟ EMAIL δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΟ EMAIL δεν είναι έγκυρο!`]));
                valid = false;
            }
            //                        Current Academic Semester
            if (newStudent['Studentship_Info.General_Information.current_academic_semester'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΕΧΟΝ ΑΚΑΔΗΜΑΙΚΟ ΕΞΑΜΗΝΟ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΕΧΟΝ ΑΚΑΔΗΜΑΙΚΟ ΕΞΑΜΗΝΟ είναι υποχρεωτικό!`]));
                valid = false;
            }        
            //                        Current Attendance Period
            if (newStudent['Studentship_Info.General_Information.current_attendance_period'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΕΧΟΥΣΑ ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΕΧΟΥΣΑ ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ είναι υποχρεωτικό!`]));
                valid = false;
            }
            const dateNow = new Date();
            const currMonth = dateNow.getMonth() + 1;
            if (currMonth >= 9 && currMonth < 2) {
                newStudent['Studentship_Info.General_Information.current_attendance_period'] = 'ΧΕΙΜΕΡΙΝΗ'
            }
            else if (currMonth >=2 && currMonth < 9) {
                newStudent['Studentship_Info.General_Information.current_attendance_period'] = 'ΕΑΡΙΝΗ'
            }
            //                          Academic Record Number
            if (newStudent['Studentship_Info.General_Information.academic_record_number'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ είναι υποχρεωτικό!`]));
                valid = false;
            }
            let onlyDigits = true;
            if (newStudent['Studentship_Info.General_Information.academic_record_number'].length !== 5) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ πρέπει να είναι 5ψήφιο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ πρέπει να είναι 5ψήφιο!`]));
                valid = false;
            }
            else {
                newStudent['Studentship_Info.General_Information.academic_record_number'].split("").forEach((value) => {
                    if (!value.match(/\d/)) {
                        onlyDigits = false;
                    }
                })
                if (onlyDigits === false) {    
                    setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ πρέπει να αποτελείται αποκλειστικά από ψηφία!`]));
                    valid = false;                 
                }
            }
            let onlyDigits_sec = true;
            //                        General Academic Record Number    
            if (newStudent['Studentship_Info.General_Information.general_academic_record_number'].length !== 7) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να είναι 7ψήφιο !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να είναι 7ψήφιο!`]));
                valid = false;
            }
            else {
                newStudent['Studentship_Info.General_Information.general_academic_record_number'].split("").forEach((value) => {
                    if (!value.match(/\d/)) {
                        onlyDigits_sec = false;
                    }
                })
                if (onlyDigits_sec === false) {
                    //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να αποτελείται αποκλειστικά από ψηφία !`);
                    setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να αποτελείται αποκλειστικά από ψηφία !`]));
                    valid = false;                 
                }
            }
            //                           Academic Identity
            if (newStudent['Studentship_Info.General_Information.academic_identity'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΗ ΤΑΥΤΟΤΗΤΑ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΗ ΤΑΥΤΟΤΗΤΑ είναι υποχρεωτικό !`]));
                valid = false;
            }
            if (newStudent['Studentship_Info.General_Information.academic_identity'] !== newStudent['Personal_Info.Personal_Information.student_identity']) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Η Ακαδημαική Ταυτότητα του φοιτητή θα πρέπει να λαμβάνει μία τιμή !`);                
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΑΚΑΔΗΜΑΙΚΗ ΤΑΥΤΟΤΗΤΑ θα πρέπει να λαμβάνει μία τιμή !`]));
                valid = false;
            }
            //                          Course Program Part
            if (newStudent['Studentship_Info.General_Information.course_program_part'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΑΤΕΥΘΥΝΣΗ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΚΑΤΕΥΘΥΝΣΗ είναι υποχρεωτικό !`]));
                valid = false;
            }
            //                           Education Number
            if (newStudent['Studentship_Info.General_Information.education_number'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΝΙΑΙΟΣ ΑΡΙΘΜΟΣ ΕΚΠΑΙΔΕΥΣΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors,`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΝΙΑΙΟΣ ΑΡΙΘΜΟΣ ΕΚΠΑΙΔΕΥΣΗΣ είναι υποχρεωτικό !`]));
                valid = false;
            }
            if (newStudent['Studentship_Info.General_Information.education_number'] !== newStudent['Studentship_Info.General_Information.general_academic_record_number']) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Τα πεδία ΕΝΙΑΙΟΣ ΑΡΙΘΜΟΣ ΕΚΠΑΙΔΕΥΣΗΣ και ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να ταυτίζονται !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Τα πεδία ΕΝΙΑΙΟΣ ΑΡΙΘΜΟΣ ΕΚΠΑΙΔΕΥΣΗΣ και ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ πρέπει να ταυτίζονται !`]));
                valid = false;
            }   
    
            // *** SET DEFAULT VALUES TO NOT REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                            Student Situation
            if (newStudent['Studentship_Info.General_Information.student_situation'] === '') {             
                newStudent['Studentship_Info.General_Information.student_situation'] = 'Ενεργός/ή';
            }
            //                          Current Academic Year
            if (newStudent['Studentship_Info.General_Information.current_academic_year'] === '') {             
                newStudent['Studentship_Info.General_Information.current_academic_year'] = setAcademicYear();
            } 
            //                         Course Program Subpart
            if (newStudent['Studentship_Info.General_Information.course_program_subpart'] === '') {             
                newStudent['Studentship_Info.General_Information.course_program_subpart'] = "-";
            }  
            //                        Second Course Program Part
            if (newStudent['Studentship_Info.General_Information.second_course_program_part'] === '') {             
                newStudent['Studentship_Info.General_Information.second_course_program_part'] = "-";
            } 
            //                        Second Course Program Subpart
            if (newStudent['Studentship_Info.General_Information.second_course_program_subpart'] === '') {             
                newStudent['Studentship_Info.General_Information.second_course_program_subpart'] = "-";
            }  
            //                            Comment to Student
            if (newStudent['Studentship_Info.General_Information.comment_to_student'] === '') {             
                newStudent['Studentship_Info.General_Information.comment_to_student'] = "-";
            }  
            //                               Total Fees
            if (newStudent['Studentship_Info.General_Information.total_fees'] === '') {             
                newStudent['Studentship_Info.General_Information.total_fees'] = "-";
            }  
             //                             Sub-attendance
             if (newStudent['Studentship_Info.General_Information.sub_attendance'] === '') {             
                newStudent['Studentship_Info.General_Information.sub_attendance'] = "ΟΧΙ";
            }    
            newStudentsData[index] = newStudent;    
            return (valid);
        }
        
        // HEIGHTH CHECK : Validation of the REGISTRATION DETAILS of the new student
        const checkRegistrationDetails = (newStudent, index) => {
            let valid = true; 
            const currDate = new Date();
            const currYear = currDate.getFullYear();
    
            // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
            //                          Year of Registration
            if (newStudent['Studentship_Info.Registration_Details.registration_year'] === '') {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΤΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό !`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΤΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό  !`]));
                valid = false;
            }
            if (Number(newStudent['Studentship_Info.Registration_Details.registration_year']) > currYear) {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΤΟΣ ΕΙΣΑΓΩΓΗΣ δεν είναι έγκυρο !`);
                setInputErrors(inputErrors=> ([...inputErrors,`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΤΟΣ ΕΙΣΑΓΩΓΗΣ δεν είναι έγκυρο  !`]));
                valid = false;
            } 
            //                         Registration Semester 
            if (newStudent['Personal_Info.Registration_Details.registration_semester'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΞΑΜΗΝΟ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό!`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΞΑΜΗΝΟ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό  !`]));
                newStudent['Personal_Info.Registration_Details.registration_semester'] = "1";
                valid = false;
            } 
            //                          Registration  Period
            if (newStudent['Personal_Info.Registration_Details.registration_period'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΕΡΙΟΔΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό!`);
                setInputErrors(inputErrors=> ([...inputErrors,`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΠΕΡΙΟΔΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό  !`]));
                newStudent['Personal_Info.Registration_Details.registration_period'] = "Χειμερινή";
                valid = false;
            } 
            //                          Registration  Way
            if (newStudent['Personal_Info.Registration_Details.registration_way'] === "") {             
                //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΟΠΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό!`);
                setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΤΡΟΠΟΣ ΕΙΣΑΓΩΓΗΣ είναι υποχρεωτικό  !`]));
                newStudent['Personal_Info.Registration_Details.registration_way'] = "ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ";
                valid = false;
            }           
            newStudentsData[index] = newStudent;    
            return (valid);
        }
            // NIGHTH CHECK : Validation of the PROFESSOR ADVISOR DETAILS of the new student
            const checkProfessorAdvisorDetails = (newStudent, index) => {
                let valid = true;   
    
                // *** REQUIRED FIELDS FOR A STUDENT REGISTRATION
                //                          First Name of Professor
                if (newStudent['Studentship_Info.Professor_Advisor_Details.professorAdvisor_FirstName'] === '') {             
                    //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ONOMA ΚΑΘΗΓΗΤΗ είναι υποχρεωτικό !`);                    
                    setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο  ONOMA ΚΑΘΗΓΗΤΗ  είναι υποχρεωτικό  !`]));
                    valid = false;
                }
                //                          Last Name of Professor
                if (newStudent['Studentship_Info.Professor_Advisor_Details.professorAdvisor_LastName'] === '') {             
                    //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΚΑΘΗΓΗΤΗ είναι υποχρεωτικό !`);
                    setInputErrors(inputErrors=> ([...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο ΕΠΩΝΥΜΟ ΚΑΘΗΓΗΤΗ  είναι υποχρεωτικό  !`]));
                    valid = false;
                }  
                //                          Proffessor Advisor Email
                if (newStudent['Studentship_Info.Professor_Advisor_Details.professorAdvisor_Email'] === "") {             
                    //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Email ΚΑΘΗΓΗΤΗ είναι υποχρεωτικό!`);
                    setInputErrors(inputErrors =>([ ...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Email ΚΑΘΗΓΗΤΗ είναι υποχρεωτικό!`])); 
                    valid = false;
                } 
                if (!validator.isEmail(newStudent['Studentship_Info.Professor_Advisor_Details.professorAdvisor_Email']) || !newStudent['Studentship_Info.Professor_Advisor_Details.professorAdvisor_Email'].endsWith("@uth.gr")) {             
                    //console.log(`${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Email ΚΑΘΗΓΗΤΗ δεν είναι έγκυρο!`);
                    setInputErrors(inputErrors => ([ ...inputErrors, `${index+1}η ΕΙΣΑΓΩΓΗ ΦΟΙΤΗΤΗ: Το πεδίο Email ΚΑΘΗΓΗΤΗ δεν είναι έγκυρο!`])); 
                    valid = false;
                }         
                newStudentsData[index] = newStudent;    
                return (valid);
            }         
    
        // Function that check the validity of the uploaded file's input fields
        const validateInputStudent = (newStudent, index, validInput2) => {
            const valid1 = checkPersonalInformation(newStudent, index);
            const valid2 = checkBirthInformation(newStudent, index);
            const valid3 = checkInsuranceInformation(newStudent, index);
            const valid4 = checkIdentityInformation(newStudent, index);
            const valid5 = checkAddressInformation(newStudent, index);
            const valid6 = checkThirdPersonInformation(newStudent, index);
            const valid7 = checkGeneralInformation(newStudent, index);
            const valid8 = checkRegistrationDetails(newStudent, index);
            const valid9 = checkProfessorAdvisorDetails(newStudent, index);
                       
            if (!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid7 || !valid8 || !valid9) {  
                validInput2 = validInput2 - 1;  
            } 
            return(validInput2);
        };  

        // Function that stores the input data for the uploaded csv file and check for the validation of its registrations
        const collectData = (parsedCsvData, validInput_num) => {
            // When collect the data of the csv file, check the validity of them calling the suitable function 
            // for each registration
            let err = validInput_num; 
            if (parsedCsvData.length !== 0) {             
                parsedCsvData.forEach((input, index) => { 
                    const item = JSON.stringify(input);    
                    if (index < (parsedCsvData.length - 1)) { 
                        err = validateInputStudent(JSON.parse(item),index,err);                          
                    }
                })
            }  
            return(err)
        } 
        // Parsing the uploaded csv file to collect the data for the new students' registrations
        if (inputFile) {                        
            Papa.parse(inputFile, {
                header:true,
                complete: results => { 
                    setInputErrors([])
                    // Store the input data for the corressponding csv file using the suitable function
                    validInput = results.data.length - 1; 
                    setNewStudentsData(results.data);
                    const t = collectData(results.data, validInput)  
                    setNumberOfRegistrations(results.data.length - 1); 
                    setValidRegistrations(t);                                       
                },
            });
        }           

    }, [inputFile,validRegistrations, newStudentsData]) 
     
    return (
        <div className="validator_container">           
            {inputErrors.length === 0 ?
            <div className="valid_content">
                <TaskAltIcon className="icon"/>
                <div className="valid_message"> {numberOfRegistrations} από τις {numberOfRegistrations} εγγραφές φοιτητών είναι έγκυρες !</div>
                <div className="final_message">
                    Ολοκληρώστε την εγγραφή των  φοιτητών με την καταχώρηση των στοιχείων τους στην Ηλεκτρονική Γραμματεία του τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών.
                </div>
                <div className='button_container' style={{ marginTop: "2rem" }}>
                    <div className={submitButton}
                        onMouseEnter={() => setSubmitButton('submit_button')}
                        onMouseLeave={() => setSubmitButton('submit_button loading')}
                        onClick={() => navigate(
                            '/uth-ece_admin/add_student/complete_uploading',
                            {state: JSON.parse(JSON.stringify(newStudentsData))} 
                        )}>
                        <SystemUpdateAltIcon className='buttonIcon_valid' />
                        <span className='text'>
                            Καταχώρηση στοιχείων φοιτητών
                        </span>
                        <span className='loading-animate'></span>
                    </div>
                </div>
            </div> : 
            <div className="validator_container">
                <div className="valid_content">
                    <ErrorOutlineIcon className="icon"/>
                    <div className="invalid_message">{validRegistrations} από τις {numberOfRegistrations} εγγραφές φοιτητών είναι έγκυρες !</div>
                    <div className="final_message">
                        Αξιοποιήστε τη λίστα των προειδοποιήσεων που ακολουθεί, προκειμένου να διορθώσετε τα λανθασμένα δεδομένα του csv αρχείου και να μπορέσετε να προχωρήσετε με την καταχώρηση των στοιχείων και την επιτυχή εγγραφή των νέων φοιτητών στην Ηλεκτρονική Γραμματεία του τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών :
                    </div>
                    <div className="error_list">   
                        <span>Προειδοποιήσεις {} για το αρχείο εισόδου {inputFile.name}</span>                     
                        {inputErrors.map((item, index) => {
                            return( 
                                <div key={index} className="error_item">
                                    <WarningIcon className="warning"/>                         
                                    <p>{item}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="final_message">
                        Μετά από την τροποποίηση και τη διόρθωση των δεδομένων του αρχείου εισόδου, κατευθυνθείτε ξανά στο προηγούμενο βήμα για την εισαγωγή του έγκυρου πλέον csv αρχείου : 
                    </div>
                    <div className='button_container_back' style={{ marginTop: "2rem" }}>
                    <div className={submitButton}
                        onMouseEnter={() => setSubmitButton('submit_button')}
                        onMouseLeave={() => setSubmitButton('submit_button loading')}
                        onClick={() => navigate('/uth-ece_admin/add_student/upload_file')}>
                        <ReplyAllIcon className='buttonIcon' />
                        <span className='text'>
                            Πίσω στην εισαγωγή αρχείου
                        </span>
                        <span className='loading-animate'></span>
                    </div>
                </div> 
                </div>                
            </div>
            }
        </div>
    )
}

export default ValidateInputFromFile;