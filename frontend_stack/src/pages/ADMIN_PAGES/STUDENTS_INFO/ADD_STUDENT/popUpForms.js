import React, { useEffect, useState } from 'react';
import moment from 'moment';
import validator from 'validator';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/popUpForms.scss';

// Icons
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import InputIcon from '@mui/icons-material/Input';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const PopUpForms = (props) => {

    const setOpenPopup = props.setOpenPopup;
    const currPopUpWindow = props.currPopUpWindow;

    // Declare the initial state of submit button 
    const [submitButton, setSubmitButton] = useState('submit_button loading');

    // Initialize the 'year' value with the current year
    const year = new Date().getFullYear();
    
    // Collect all the input values for the personal and studenship information of the new student from the local storage 
    // to update them if it necessary 
    const studentInfo = JSON.parse(localStorage.getItem('newStudent'));
     
    //                                ~~~~  ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΤΗ  ~~~~                                             //                     

    // Declare our state variables for the Personal Information of the new student taking them for the local storage
    const [storePersonalInfo, setStorePersonalInfo] = useState({
        last_name: studentInfo?.personalInfo?.personalInfo?.last_name,
        first_name: studentInfo?.personalInfo?.personalInfo?.first_name,
        dot_father_name: studentInfo?.personalInfo?.personalInfo?.dot_father_name,
        father_FirstName: studentInfo?.personalInfo?.personalInfo?.father_FirstName,
        father_LastName: studentInfo?.personalInfo?.personalInfo?.father_LastName,
        maiden_name: studentInfo?.personalInfo?.personalInfo?.maiden_name,
        mother_FirstName: studentInfo?.personalInfo?.personalInfo?.mother_FirstName,
        mother_LastName: studentInfo?.personalInfo?.personalInfo?.mother_LastName,
        spouse_name: studentInfo?.personalInfo?.personalInfo?.spouse_name,
        profession: studentInfo?.personalInfo?.personalInfo?.profession,
        mother_profession: studentInfo?.personalInfo?.personalInfo?.mother_profession,
        father_profession: studentInfo?.personalInfo?.personalInfo?.father_profession,
        family: studentInfo?.personalInfo?.personalInfo?.family,
        username: studentInfo?.personalInfo?.personalInfo?.username,
        personal_title: studentInfo?.personalInfo?.personalInfo?.personal_title,
        website: studentInfo?.personalInfo?.personalInfo?.website,
        student_identity: studentInfo?.personalInfo?.personalInfo?.student_identity,
        active: studentInfo?.personalInfo?.personalInfo?.active,
        fulfilled_military_obligations: studentInfo?.personalInfo?.personalInfo?.fulfilled_military_obligations,
        sex: studentInfo?.personalInfo?.personalInfo?.sex,
        notations: studentInfo?.personalInfo?.personalInfo?.notations
    });

    // Fields' array of the personal information
    const personalInfo_array = [];
    Object.keys(storePersonalInfo).forEach((item) => {
        personalInfo_array.push(item);
    })

    // PERSONAL INFORMATION UPDATES
    // Update the personal details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedPersonalInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('first_step');
        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, personalInfo: storePersonalInfo };
            let updatedStudentPersonalInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentPersonalInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                                ~~~~  ΑΣΦΑΛΙΣΤΙΚΑ ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΤΗ  ~~~~                                             //                     

    // Declare our state variables for the Insurance Information of the new student taking them for the local storage
    const [storeInsuranceInfo, setstoreInsuranceInfo] = useState({
        AMKA: studentInfo?.personalInfo?.insuranceInfo?.AMKA,
        AFM: studentInfo?.personalInfo?.insuranceInfo?.AFM,
        DOY: studentInfo?.personalInfo?.insuranceInfo?.DOY,
        AMKA_country: studentInfo?.personalInfo?.insuranceInfo?.AMKA_country,
        AFM_country: studentInfo?.personalInfo?.insuranceInfo?.AFM_country
    })

    // Fields' array of the insurance information
    const insuranceInfo_array = [];
    Object.keys(storeInsuranceInfo).forEach((item) => {
        insuranceInfo_array.push(item);
    })

    // INSURANCE INFORMATION UPDATES
    // Update the insurance details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedInsuranceInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('second_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, insuranceInfo: storeInsuranceInfo };
            let updatedStudentInsuranceInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentInsuranceInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                                           ~~~~  ΣΤΟΙΧΕΙΑ ΓΕΝΝΗΣΗΣ ΦΟΙΤΗΤΗ  ~~~~                               //                     

    // Declare our state variables for the Birth Information of the new student taking them for the local storage
    const [storeBirthInfo, setStoreBirthInfo] = useState({
        birth_date: studentInfo?.personalInfo?.birthInfo?.birth_date,
        gender: studentInfo?.personalInfo?.birthInfo?.gender,
        birth_prefecture: studentInfo?.personalInfo?.birthInfo?.birth_prefecture,
        birth_country: studentInfo?.personalInfo?.birthInfo?.birth_country,
        birth_location: studentInfo?.personalInfo?.birthInfo?.birth_location
    });

    // Fields' array of the birth information
    const birthInfo_array = [];
    Object.keys(storeBirthInfo).forEach((item) => {
        birthInfo_array.push(item);
    })

    // BIRTH INFORMATION UPDATES
    // Update the birth details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedBirthInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('third_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, insuranceInfo: storeBirthInfo };
            let updatedStudentBirthInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentBirthInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                                           ~~~~  ΤΑΥΤΟΤΗΤΑ ΦΟΙΤΗΤΗ  ~~~~                                            //                     

    // Declare our state variables for the Identity Information of the new student taking them for the local storage
    const [storeIdentityInfo, setStoreIdentityInfo] = useState({
        identity_type: studentInfo?.personalInfo?.identityInfo?.identity_type,
        citizenship: studentInfo?.personalInfo?.identityInfo?.citizenship,
        citizen: studentInfo?.personalInfo?.identityInfo?.citizen,
        identity_number: studentInfo?.personalInfo?.identityInfo?.identity_number,
        citizen_number: studentInfo?.personalInfo?.identityInfo?.citizen_number,
        published_principle: studentInfo?.personalInfo?.identityInfo?.published_principle,
        publish_date: studentInfo?.personalInfo?.identityInfo?.publish_date,
        nationality: studentInfo?.personalInfo?.identityInfo?.nationality,
        nationality_second: studentInfo?.personalInfo?.identityInfo?.nationality_second,
        male_record_num: studentInfo?.personalInfo?.identityInfo?.male_record_num,
        male_record_perf: studentInfo?.personalInfo?.identityInfo?.male_record_perf,
        male_record_gr: studentInfo?.personalInfo?.identityInfo?.male_record_gr,
        male_record_loc: studentInfo?.personalInfo?.identityInfo?.male_record_loc
    });

    // Fields' array of the identity information
    const identityInfo_array = [];
    Object.keys(storeIdentityInfo).forEach((item) => {
        identityInfo_array.push(item);
    })


    // Declare the initial state of the citizenship value
    let [citizenshipState, setCitizenshipState] = useState(storeIdentityInfo.citizenship);
    // Declare the initial state of the nationality value
    let [nationalityState, setNationalityState] = useState(storeIdentityInfo.nationality);
    // Declare the initial state of the nationality_second value
    let [nationalitySecondState, setNationalitySecondState] = useState(storeIdentityInfo.nationality_second);

    // IDENTITY INFORMATION UPDATES
    // Update the identity details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedIdentityInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('fourth_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, identityInfo: storeIdentityInfo };
            let updatedStudentIdentityInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentIdentityInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                                           ~~~~  ΔΙΕΥΘΥΝΣΗ ΦΟΙΤΗΤΗ  ~~~~                                            //                     

    // Declare our state variables for the Address Information of the new student taking them for the local storage
    const [storeAddressInfo, setStoreAddressInfo] = useState({
        road: studentInfo?.personalInfo?.addressInfo?.road,
        rd_number: studentInfo?.personalInfo?.addressInfo?.rd_number,
        city: studentInfo?.personalInfo?.addressInfo?.city,
        location: studentInfo?.personalInfo?.addressInfo?.location,
        country: studentInfo?.personalInfo?.addressInfo?.country,
        acting_address: studentInfo?.personalInfo?.addressInfo?.acting_address,
        postcode: studentInfo?.personalInfo?.addressInfo?.postcode,
        telephone: studentInfo?.personalInfo?.addressInfo?.telephone,
        mobile_phone: studentInfo?.personalInfo?.addressInfo?.mobile_phone,
        uth_email: studentInfo?.personalInfo?.addressInfo?.uth_email,
        alternative_email: studentInfo?.personalInfo?.addressInfo?.alternative_email
    });

    // Fields' array of the address information
    const addressInfo_array = [];
    Object.keys(storeAddressInfo).forEach((item) => {
        addressInfo_array.push(item);
    })

    // ADDRESS INFORMATION UPDATES
    // Update the address details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedAddressInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('fifth_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, addressInfo: storeAddressInfo };
            let updatedStudentAddressInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentAddressInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                            ~~~~  ΣΤΟΙΧΕΙΑ ΕΠΑΦΗΣ ΤΡΙΤΟΥ ΠΡΟΣΩΠΟΥ  ~~~~                                     //                     

    // Declare our state variables for the Third Person Contact Information of the new student taking them for the local storage
    const [storeThirdPersonInfo, setStoreThirdPersonInfo] = useState({
        contact_type: studentInfo?.personalInfo?.thirdPersonInfo?.contact_type,
        person_FirstName: studentInfo?.personalInfo?.thirdPersonInfo?.person_FirstName,
        person_LastName: studentInfo?.personalInfo?.thirdPersonInfo?.person_LastName,
        person_address: studentInfo?.personalInfo?.thirdPersonInfo?.person_address,
        person_telephone: studentInfo?.personalInfo?.thirdPersonInfo?.person_telephone,
        person_mobilephone: studentInfo?.personalInfo?.thirdPersonInfo?.person_mobilephone,
        person_email: studentInfo?.personalInfo?.thirdPersonInfo?.person_email
    });

    // Fields' array of the third person contact information
    const thirdPersonInfo_array = [];
    Object.keys(storeThirdPersonInfo).forEach((item) => {
        thirdPersonInfo_array.push(item);
    })

    // THIRD PERSON CONTACT INFORMATION UPDATES
    // Update the third person contact details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedThirdPersonInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('sixth_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let student = studentInfo.personalInfo;
            let updatedStudent = { ...student, thirdPersonInfo: storeThirdPersonInfo };
            let updatedStudentThirdPersonInfo = { ...studentInfo, personalInfo: updatedStudent };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentThirdPersonInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                            ~~~~  ΓΕΝΙΚΑ ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ  ~~~~                                     //                     

    // Declare our state variables for the General Studenship Information of the new student taking them for the local storage
    const [storeGeneralInfo, setStoreGeneralInfo] = useState({
        department: studentInfo?.generalInfo?.department,
        department_number: studentInfo?.generalInfo?.department_number,
        course: studentInfo?.generalInfo?.course,
        course_number: studentInfo?.generalInfo?.course_number,
        academic_email: studentInfo?.generalInfo?.academic_email,
        student_situation: studentInfo?.generalInfo?.student_situation,
        current_academic_year: studentInfo?.generalInfo?.current_academic_year,
        current_academic_semester: studentInfo?.generalInfo?.current_academic_semester,
        current_attendance_period: studentInfo?.generalInfo?.current_attendance_period,
        academic_record_number: studentInfo?.generalInfo?.academic_record_number,
        general_academic_record_number: studentInfo?.generalInfo?.general_academic_record_number,
        academic_identity: studentInfo?.generalInfo?.academic_identity,
        course_program_part: studentInfo?.generalInfo?.course_program_part,
        course_program_subpart: studentInfo?.generalInfo?.course_program_subpart,
        education_number: studentInfo?.generalInfo?.education_number,
        second_course_program_part: studentInfo?.generalInfo?.second_course_program_part,
        second_course_program_subpart: studentInfo?.generalInfo?.second_course_program_subpart,
        comment_to_student: studentInfo?.generalInfo?.comment_to_student,
        total_fees: studentInfo?.generalInfo?.total_fees,
        sub_attendance: studentInfo?.generalInfo?.sub_attendance
    });
     
    // Fields' array of the general studenship information
    const generalInfo_array = [];
    Object.keys(storeGeneralInfo).forEach((item) => {
        generalInfo_array.push(item);
    })

    // GENERAL STUDENSHIP INFORMATION UPDATES
    // Update the general studenship details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedGeneralInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('seventh_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {
            let updatedStudentGeneralInfo = { ...studentInfo, generalInfo: storeGeneralInfo };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentGeneralInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

    //                                           ~~~~  ΣΤΟΙΧΕΙΑ ΕΙΣΑΓΩΓΗΣ ΦΟΙΤΗΤΗ  ~~~~                               //                     

    // Declare our state variables for the Registration Information of the new student taking them for the local storage
    const [storeRegistrationInfo, setStoreRegistrationInfo] = useState({registration_year : studentInfo?.registrationInfo?.registration_year, 
                                                                        registration_semester : studentInfo?.registrationInfo?.registration_semester, 
                                                                        registration_period : studentInfo?.registrationInfo?.registration_period, 
                                                                        registration_way : studentInfo?.registrationInfo?.registration_way});

    // Fields' array of the registration information
    const registrationInfo_array = [];
    Object.keys(storeRegistrationInfo).forEach((item) => {
        registrationInfo_array.push(item);
    })

    // REGISTRATION INFORMATION UPDATES
    // Update the registration details of the new student before the final insertion in the database 
    // every time the user changes the input values through the pop-up window
    const submitUpdatedRegistrationInfo = () => {

        // Before the final submission, check the validity of the updated input values
        const valid = checkValidation_Form('heighth_step');

        // Continue with the submission, only if the updated input values are valid
        if (valid === 'yes') {      
            let updatedStudentRegistrationInfo = { ...studentInfo, registrationInfo: storeRegistrationInfo };

            // Change the values in the local storage before the final insertion in the database
            localStorage.setItem('newStudent', JSON.stringify(updatedStudentRegistrationInfo))
            setOpenPopup(false);  // Close the Pop-Up window
        }
    }

//                                      ~~~~  ΣΤΟΙΧΕΙΑ ΣΥΜΒΟΥΛΟΥ ΚΑΘΗΓΗΤΗ ΦΟΙΤΗΤΗ  ~~~~                               //                     

// Declare our state variables for the Professor Advisor Information of the new student taking them for the local storage
const [storeProfessorAdvisorInfo, setStoreProfessorAdvisorInfo] = useState({professorAdvisor_FirstName : studentInfo?.professorAdvisorInfo?.professorAdvisor_FirstName, 
                                                                            professorAdvisor_LastName : studentInfo?.professorAdvisorInfo?.professorAdvisor_LastName, 
                                                                            professorAdvisor_Email : studentInfo?.professorAdvisorInfo?.professorAdvisor_Email});

// Fields' array of the professor advisor information
const professorAdvisorInfo_array = [];
Object.keys(storeProfessorAdvisorInfo).forEach((item) => {
    professorAdvisorInfo_array.push(item);
})

// PROFESSOR ADVISOR INFORMATION UPDATES
// Update the professor advisor details of the new student before the final insertion in the database 
// every time the user changes the input values through the pop-up window
const submitUpdatedProfessorAdvisorInfo = () => {

    // Before the final submission, check the validity of the updated input values
    const valid = checkValidation_Form('ninth_step');

    // Continue with the submission, only if the updated input values are valid
    if (valid === 'yes') {      
        let updatedStudentProfessorAdvisorInfo = { ...studentInfo, professorAdvisorInfo: storeProfessorAdvisorInfo };

        // Change the values in the local storage before the final insertion in the database
        localStorage.setItem('newStudent', JSON.stringify(updatedStudentProfessorAdvisorInfo))
        setOpenPopup(false);  // Close the Pop-Up window
    }
}

// FINAL STEPS OF THE NEW STUDENT INSERTION IN THE DATABASE OF THE DEPARTMENT

// A . Collect the updated input values into two category groups

// PERSONAL INFORMATION OF THE NEW STUDENT 
const personalInformation = {storePersonalInfo, storeInsuranceInfo, storeBirthInfo, storeIdentityInfo, storeAddressInfo, storeThirdPersonInfo};
// STUDENSHIP INFORMATION OF THE NEW STUDENT
const studenshipInformation = {storeGeneralInfo, storeRegistrationInfo, storeProfessorAdvisorInfo}; 

// B. Create the final object that contains all the details-information for the registration of the new student
const newStudentInfo = {personalInformation, studenshipInformation};
console.log(newStudentInfo);

    // Checking the validation of input values for the current form
    const checkValidation_Form = (form_to_check) => {
        var valid = 'yes'; 

        // VALIDATION OF THE FIRST FORM
        if (form_to_check === "first_step") {
            (Object.values(storePersonalInfo)).forEach((item, i) => {
                const field = personalInfo_array[i];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                if (item === "") {
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
            (Object.values(storeInsuranceInfo)).forEach((item, i) => {
                const field = insuranceInfo_array[i];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                // Check the AMKA field                
                if (i === 0 && item !== "") {
                    if (item.length !== 11) {
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
                }
                // Check the ΑΦΜ field                
                if (i === 1 && item !== "") {
                    if (item.length !== 9) {
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
                }
            })
        }
        // VALIDATION OF THE THIRD FORM
        else if (form_to_check === "third_step") {
            (Object.values(storeBirthInfo)).forEach((item, i) => {
                const field = birthInfo_array[i];
                let currentDate = new Date();
                let currYear = currentDate.getFullYear();
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorYearField = document.getElementById(field).getElementsByClassName('error_year')[0];
                if (item === "" || item === "Invalid date") {
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
                    if (i === 0) {
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
            storeIdentityInfo.citizenship = citizenshipState;        // CITIZENSHIP
            storeIdentityInfo.nationality = nationalityState         // NATIONALITY
            storeIdentityInfo.nationality_second = nationalitySecondState;  // SECOND NATIONALITY

            (Object.values(storeIdentityInfo)).forEach((item, i) => {
                const field = identityInfo_array[i];
                let currentDate = new Date();
                let currYear = currentDate.getFullYear();
                let currMonth = currentDate.getMonth() + 1;
                let currDay = currentDate.getDate();
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorYearField = document.getElementById(field).getElementsByClassName('error_year')[0];
                // Set the error state for this function 

                if ((item === "") || (item === "Invalid date") || (item.length === 0)) {
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
                    if (i === 6) {
                        var v = item.split('-'); 

                        if ((Number(v[0]) > currYear) || ((Number(v[0]) === currYear) && (Number(v[1]) > currMonth)) || ((Number(v[0]) === currYear) && (Number(v[1]) === currMonth) && (Number(v[2]) > currDay))) {
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
            (Object.values(storeAddressInfo)).forEach((item, i) => {
                const field = addressInfo_array[i];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorValid = document.getElementById(field).getElementsByClassName('error_field')[0];
                if (item === "") {
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';
                    }
                }
                else {
                    if (i === 7) {
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
                    if (i === 8) {
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
                    if (i === 9) {
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
                    if (i === 10 && item !== "-") { 
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
            (Object.values(storeThirdPersonInfo)).forEach((item, i) => {
                const field = thirdPersonInfo_array[i];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                if (item === "") { 
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';
                    }
                }
                else {
                    // VALIDATE THELEPHONE NUMBER
                    if (i === 4 && item !== "") {
                        if (item.length !== 10) { 
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
                    if (i === 5 && item !== "") {
                        if (item.length !== 10) { 
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
                    if (i === 6 && item !== "") {
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
        // VALIDATION OF THE SEVENTH FORM
        if (form_to_check === "seventh_step") {
            (Object.values(storeGeneralInfo)).forEach((item, i) => {
                const field = generalInfo_array[i];
                var errorInput = document.getElementById(field).getElementsByClassName('errorInput')[0];
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0];
                var errorSimilarity = document.getElementById(field).getElementsByClassName('errorSimilarity')[0];
                if (item === "") {
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
                        else if (currMonth >= 2 && currMonth < 9) {
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
                    if (i === 9) {
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
                    if (i === 10) {
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
                    if (i === 14) {
                        if (item !== storeGeneralInfo.general_academic_record_number) {
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
        else if (form_to_check === 'heighth_step') {
            (Object.values(storeRegistrationInfo)).forEach((item ,i)=> {        
                const field = registrationInfo_array[i];  
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0]; 
                if (item==="") {    
                    if (errorField) {
                        errorField.style.display = "flex";
                        valid = 'no';                    
                    }                
                } 
                else {
                    // VALIDATE REGISTRATION SEMESTER
                    if (i===1) { 
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
        else if (form_to_check === 'ninth_step') {
            (Object.values(storeProfessorAdvisorInfo)).forEach((item ,i)=> {        
                const field = professorAdvisorInfo_array[i];  
                var errorValid = document.getElementById(field).getElementsByClassName('errorValid')[0];
                var errorField = document.getElementById(field).getElementsByClassName('error')[0]; 
                if (item==="") {               
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

    const removeTags = (indexToRemove, fieldToCheck) => {
        if (fieldToCheck === 'citizenship') {
            setCitizenshipState(citizenshipState.filter((_, index) => index !== indexToRemove));
        }
        else if (fieldToCheck === 'nationality') {
            setNationalityState(nationalityState.filter((_, index) => index !== indexToRemove));
        }
        else if (fieldToCheck === 'nationality_second') {
            setNationalitySecondState(nationalitySecondState.filter((_, index) => index !== indexToRemove));
        }
    }

    const addTags = (event, fieldToCheck) => {
        if (event.target.value !== '' && fieldToCheck === 'citizenship') {
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
            if (event.target.value !== '') {
                setCitizenshipState([...citizenshipState, event.target.value]);
                if (errorFieldCitizenship) {
                    errorFieldCitizenship.style.display = 'none';
                }
                if (errorDuplicateFieldCitizenship) {
                    errorDuplicateFieldCitizenship.style.display = 'none';
                }
                event.target.value = '';
            }
        }
        else if (event.target.value !== '' && fieldToCheck === 'nationality') {
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
                setNationalityState([...nationalityState, event.target.value]);
                if (errorFieldNationality) {
                    errorFieldNationality.style.display = 'none';
                }
                if (errorDuplicateFieldNationality) {
                    errorDuplicateFieldNationality.style.display = 'none';
                }
                event.target.value = '';
            }
        }
        else if (event.target.value !== '' && fieldToCheck === 'nationality_second') {
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
                event.target.value = '';
            }
        }
    }

    // Determine the course part according to selected current academic semester
    useEffect(() => {
        if (storeGeneralInfo.current_academic_semester >= 7) { 
            setStoreGeneralInfo(storeGeneralInfo => ({ ...storeGeneralInfo, course_program_part: 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ' }))
        }
        else { 
            setStoreGeneralInfo(storeGeneralInfo => ({ ...storeGeneralInfo, course_program_part: 'ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ' }))
        }
    }, [storeGeneralInfo.current_academic_semester]);

    // Determine the Education Number according to input general academic record number
    // The two numbers must be the same!
    useEffect(() => {
        setStoreGeneralInfo(storeGeneralInfo => ({ ...storeGeneralInfo, education_number: storeGeneralInfo.general_academic_record_number }))        
    }, [storeGeneralInfo.general_academic_record_number])

    return (
        <div className='popup_container'>
            {/* FIRST FORM : PERSONAL INFO */}
            {currPopUpWindow === 'PesonalInfo_form' ?
                <div>
                    <form name='form1' autoComplete='off'>
                        <div className='title_section'>
                            <FolderSharedIcon className='icon' />
                            <h2>Προσωπικά Στοιχεία</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='last_name' >
                                <input className='input' type="text" name="last_name" value={storePersonalInfo.last_name} required autoComplete='last_name'
                                    onChange={(e) => {
                                        document.getElementById('last_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('last_name').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, last_name: e.target.value })
                                    }} />
                                <span>Επώνυμο</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="first_name">
                                <input className='input' type="text" name="student_first_name" value={storePersonalInfo.first_name} required autoComplete='student_first_name'
                                    onChange={(e) => {
                                        document.getElementById('first_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('first_name').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, first_name: e.target.value })
                                    }} />
                                <span>Όνομα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="dot_father_name">
                                <input className='input' type="text" name="dot_father_name" value={storePersonalInfo.dot_father_name} required autoComplete='dot_father_name'
                                    onChange={(e) => {
                                        document.getElementById('dot_father_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('dot_father_name').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, dot_father_name: e.target.value })
                                    }} />
                                <span>Μ. Όνομα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="maiden_name">
                                <input className='input' type="text" name="maiden_name" value={storePersonalInfo.maiden_name} required autoComplete='maiden_name'
                                    onChange={(e) => {
                                        document.getElementById('maiden_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('maiden_name').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, maiden_name: e.target.value })
                                    }} />
                                <span>Πατρικό Όνομα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="father_FirstName">
                                <input className='input' type="text" name="father_FirstName" value={storePersonalInfo.father_FirstName} required autoComplete='father_FirstName'
                                    onChange={(e) => {
                                        document.getElementById('father_FirstName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('father_FirstName').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, father_FirstName: e.target.value })
                                    }} />
                                <span>Πατρώνυμο</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="father_LastName">
                                <input className='input' type="text" name="father_LastName" value={storePersonalInfo.father_LastName} required autoComplete='father_LastName'
                                    onChange={(e) => {
                                        document.getElementById('father_LastName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('father_LastName').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, father_LastName: e.target.value })
                                    }} />
                                <span>Επώνυμο Πατρός</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="mother_FirstName" >
                                <input className='input' type="text" name="mother_FirstName" value={storePersonalInfo.mother_FirstName} required autoComplete='mother_FirstName'
                                    onChange={(e) => {
                                        document.getElementById('mother_FirstName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('mother_FirstName').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, mother_FirstName: e.target.value })
                                    }} />
                                <span>Μητρώνυμο</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="mother_LastName" >
                                <input className='input' type="text" name="mother_LastName" value={storePersonalInfo.mother_LastName} required autoComplete='mother_LastName'
                                    onChange={(e) => {
                                        document.getElementById('mother_LastName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('mother_LastName').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, mother_LastName: e.target.value })
                                    }} />
                                <span>Επώνυμο Μητρός</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="profession">
                                <input className='input' type="text" name="profession" value={storePersonalInfo.profession} required autoComplete='profession'
                                    onChange={(e) => {
                                        document.getElementById('profession').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('profession').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, profession: e.target.value })
                                    }} />
                                <span>Επάγγελμα</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="family" >
                                <input className='input' type="text" name="family" value={storePersonalInfo.family} required autoComplete='family'
                                    onChange={(e) => {
                                        document.getElementById('family').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('family').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, family: e.target.value })
                                    }} />
                                <span>Οικογενειακή Κατάσταση</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="website" >
                                <input className='input' type="text" name="website" value={storePersonalInfo.website} required autoComplete='website'
                                    onChange={(e) => {
                                        document.getElementById('website').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('website').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, website: e.target.value })
                                    }} />
                                <span>Ιστότοπος</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="spouse_name">
                                <input className='input' type="text" name="spouse_name" value={storePersonalInfo.spouse_name} required autoComplete='spouse_name'
                                    onChange={(e) => {
                                        document.getElementById('spouse_name').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('spouse_name').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, spouse_name: e.target.value })
                                    }} />
                                <span>Όνομα Συζύγου</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="father_profession" >
                                <input className='input' type="text" name="father_profession" value={storePersonalInfo.father_profession} required autoComplete='father_profession'
                                    onChange={(e) => {
                                        document.getElementById('father_profession').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('father_profession').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, father_profession: e.target.value })
                                    }} />
                                <span>Επάγγελμα Πατέρα</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="mother_profession">
                                <input className='input' type="text" name="mother_profession" value={storePersonalInfo.mother_profession} required autoComplete='mother_profession'
                                    onChange={(e) => {
                                        document.getElementById('mother_profession').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('mother_profession').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, mother_profession: e.target.value })
                                    }} />
                                <span>Επάγγελμα Μητέρας</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="sex" >
                                <input className='input' type="text" name="sex" value={storePersonalInfo.sex} required autoComplete='sex'
                                    onChange={(e) => {
                                        document.getElementById('sex').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('sex').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, sex: e.target.value })
                                    }} />
                                <span>Προσφώνηση</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="username">
                                <input className='input' type="text" name="student_username" value={storePersonalInfo.username} required autoComplete='student_username'
                                    onChange={(e) => {
                                        document.getElementById('username').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('username').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, username: e.target.value })
                                    }} />
                                <span>Όνομα Χρήστη</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="student_identity">
                                <input className='input' type="text" name="student_identity" value={storePersonalInfo.student_identity} required autoComplete='student_identity'
                                    onChange={(e) => {
                                        document.getElementById('student_identity').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('student_identity').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, student_identity: e.target.value })
                                    }} />
                                <span>Ακαδημαϊκή Ταυτότητα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="personal_title">
                                <input className='input' type="text" name="personal_title" value={storePersonalInfo.personal_title} required autoComplete='personal_title'
                                    onChange={(e) => {
                                        document.getElementById('personal_title').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('personal_title').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, personal_title: e.target.value })
                                    }} />
                                <span>Τίτλος Προσώπου</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="notations" >
                                <input className='input' type="text" name="notations" value={storePersonalInfo.notations} required autoComplete='notations'
                                    onChange={(e) => {
                                        document.getElementById('notations').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('notations').getElementsByClassName('error')[0].style.display = 'none';
                                        setStorePersonalInfo({ ...storePersonalInfo, notations: e.target.value })
                                    }} />
                                <span>Σημειώσεις</span>
                                <i></i>
                            </div>
                            <div className='input-box' id="fulfilled_military_obligations">
                                <div className='checkBoxes'>
                                    <p className='title'>Εκπλ. Στρατιωτική Θητεία</p>
                                    <div className="checkbox-cont">
                                        <div className="box" id="military1">
                                            {storePersonalInfo.fulfilled_military_obligations === 'ΝΑΙ' ?
                                                <input type="radio" className='input' name="military_oblig" value="ΝΑΙ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('military1').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΝΑΙ' })
                                                    }} ></input> :
                                                <input type="radio" className='input' name="military_oblig" value="ΝΑΙ"
                                                    onClick={() => {
                                                        document.getElementById('military1').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΝΑΙ' })
                                                    }}></input>}
                                            <p className="description">ΝΑΙ</p>
                                        </div>
                                        <div className="box" id="military2">
                                            {storePersonalInfo.fulfilled_military_obligations === 'ΟΧΙ' ?
                                                <input type="radio" className='input' name="military_oblig" value="ΟΧΙ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('military2').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΟΧΙ' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="military_oblig" value="ΟΧΙ"
                                                    onClick={() => {
                                                        document.getElementById('military2').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΟΧΙ' })
                                                    }}></input>}
                                            <p className="description">ΟΧΙ</p>
                                        </div>
                                        <div className="box" id="military3">
                                            {storePersonalInfo.fulfilled_military_obligations === 'ΑΝΕΥ' ?
                                                <input type="radio" className='input' name="military_oblig" value="ΑΝΕΥ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('military3').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΑΝΕΥ' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="military_oblig" value="ΑΝΕΥ"
                                                    onClick={() => {
                                                        document.getElementById('military3').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('fulfilled_military_obligations').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, fulfilled_military_obligations: 'ΑΝΕΥ' })
                                                    }}></input>}
                                            <p className="description">ΑΝΕΥ</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="error" style={{ paddingTop: '3.1rem', position: 'absolute' }}>*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="active">
                                <div className='checkBoxes'>
                                    <p className='title'>Ενεργός/ή</p>
                                    <div className="checkbox-cont">
                                        <div className="box" id='active1'>
                                            {storePersonalInfo.active === 'ΝΑΙ' ?
                                                <input type="radio" className='input' name="active" value="ΝΑΙ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('active1').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('active').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, active: 'ΝΑΙ' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="active" value="ΝΑΙ"
                                                    onClick={() => {
                                                        document.getElementById('active1').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('active').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, active: 'ΝΑΙ' })
                                                    }}></input>}
                                            <p className="description">ΝΑΙ</p>
                                        </div>
                                        <div className="box" id='active2'>
                                            {storePersonalInfo.active === 'ΟΧΙ' ?
                                                <input type="radio" className='input' name="active" value="ΟΧΙ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('active2').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('active').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, active: 'ΟΧΙ' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="active" value="ΟΧΙ"
                                                    onClick={() => {
                                                        document.getElementById('active2').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('active').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStorePersonalInfo({ ...storePersonalInfo, active: 'ΟΧΙ' })
                                                    }}></input>}
                                            <p className="description">ΟΧΙ</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="error" style={{ paddingTop: '3.1rem', position: 'absolute' }}>*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container'>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedPersonalInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}

            {currPopUpWindow === 'InsuranceInfo_form' ?
                <div>
                    <form name='form' autoComplete='off'>
                        <div className='title_section'>
                            <AdminPanelSettingsIcon className='icon' />
                            <h2>Ασφαλιστικά Στοιχεία</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='AMKA' >
                                <input className='input' type="text" name="AMKA" value={storeInsuranceInfo.AMKA} required autoComplete='AMKA'
                                    onChange={(e) => {
                                        document.getElementById('AMKA').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('AMKA').getElementsByClassName('error')[0].style.display = 'none';
                                        setstoreInsuranceInfo({ ...storeInsuranceInfo, AMKA: e.target.value })
                                    }} />
                                <span>ΑΜΚΑ</span>
                                <p className="error">*Ο ΑΜΚΑ πρέπει να είναι 11ψήφιος αριθμός!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='AFM' >
                                <input className='input' type="text" name="AFM" value={storeInsuranceInfo.AFM} required autoComplete='AFM'
                                    onChange={(e) => {
                                        document.getElementById('AFM').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('AFM').getElementsByClassName('error')[0].style.display = 'none';
                                        setstoreInsuranceInfo({ ...storeInsuranceInfo, AFM: e.target.value })
                                    }} />
                                <span>ΑΦΜ</span>
                                <p className="error">*Ο ΑΦΜ πρέπει να είναι 9ψήφιος αριθμός!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='DOY' >
                                <input className='input' type="text" name="DOY" value={storeInsuranceInfo.DOY} required autoComplete='last_name'
                                    onChange={(e) => {
                                        document.getElementById('DOY').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setstoreInsuranceInfo({ ...storeInsuranceInfo, DOY: e.target.value })
                                    }} />
                                <span>ΔΟΥ</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='AMKA_country' >
                                <input className='input' type="text" name="AMKA_country" value={storeInsuranceInfo.AMKA_country} required autoComplete='AMKA_country'
                                    onChange={(e) => {
                                        document.getElementById('AMKA_country').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setstoreInsuranceInfo({ ...storeInsuranceInfo, AMKA_country: e.target.value })
                                    }} />
                                <span>Χώρα ΑΜΚΑ</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='AFM_country' >
                                <input className='input' type="text" name="AFM_country" value={storeInsuranceInfo.AFM_country} required autoComplete='AFM_country'
                                    onChange={(e) => {
                                        document.getElementById('AFM_country').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setstoreInsuranceInfo({ ...storeInsuranceInfo, AFM_country: e.target.value })
                                    }} />
                                <span>Χώρα ΑΦΜ</span>
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container'>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedInsuranceInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}

            {currPopUpWindow === "BirthInfo_form" ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <CakeIcon className='icon' />
                            <h2>Στοιχεία Γέννησης Προσώπου</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id="birth_date" >
                                <input className='input' type="date" name="birth_date" defaultValue={storeBirthInfo.birth_date} required autoComplete='birth_date'
                                    onChange={(e) => {
                                        document.getElementById('birth_date').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('birth_date').getElementsByClassName('error')[0].style.display = 'none';
                                        setStoreBirthInfo({ ...storeBirthInfo, birth_date: moment(new Date(e.target.value)).format("YYYY-MM-DD") })
                                    }} />
                                <span>Ημερομηνία Γέννησης</span>
                                <p className="error_year">*Η Ημερομηνία Γέννησης δεν είναι έγκυρη!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                        </div>
                        <div className='input-box' id="gender">
                            <div className='checkBoxes'>
                                <p className='title'>Φύλο</p>
                                <div className="checkbox-cont">
                                    <div className="box" id='male'>
                                        {storeBirthInfo.gender === 'ΑΡΡΕΝ' ?
                                            <input type="radio" className='input' name="gender" value="ΑΡΡΕΝ" defaultChecked
                                                onClick={() => {
                                                    document.getElementById('male').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                    document.getElementById('gender').getElementsByClassName('error')[0].style.display = 'none';
                                                    setStoreBirthInfo({ ...storeBirthInfo, gender: 'ΑΡΡΕΝ' })
                                                }}></input> :
                                            <input type="radio" className='input' name="gender" value="ΑΡΡΕΝ"
                                                onClick={() => {
                                                    document.getElementById('male').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                    document.getElementById('gender').getElementsByClassName('error')[0].style.display = 'none';
                                                    setStoreBirthInfo({ ...storeBirthInfo, gender: 'ΑΡΡΕΝ' })
                                                }}></input>}
                                        <p className="description">ΑΡΡΕΝ</p>
                                    </div>
                                    <div className="box" id='female'>
                                        {storeBirthInfo.gender === 'ΘΗΛΥ' ?
                                            <input type="radio" className='input' name="gender" value="ΘΗΛΥ" defaultChecked
                                                onClick={() => {
                                                    document.getElementById('female').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                    document.getElementById('gender').getElementsByClassName('error')[0].style.display = 'none';
                                                    setStoreBirthInfo({ ...storeBirthInfo, gender: 'ΘΗΛΥ' })
                                                }}></input> :
                                            <input type="radio" className='input' name="gender" value="ΘΗΛΥ"
                                                onClick={() => {
                                                    document.getElementById('female').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                    document.getElementById('gender').getElementsByClassName('error')[0].style.display = 'none';
                                                    setStoreBirthInfo({ ...storeBirthInfo, gender: 'ΘΗΛΥ' })
                                                }}></input>}
                                        <p className="description">ΘΗΛΥ</p>
                                    </div>
                                </div>
                            </div>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='birth_prefecture' >
                            <input className='input' type="text" name="birth_prefecture" value={storeBirthInfo.birth_prefecture} required autoComplete='birth_prefecture'
                                onChange={(e) => {
                                    document.getElementById('birth_prefecture').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    setStoreBirthInfo({ ...storeBirthInfo, birth_prefecture: e.target.value })
                                }} />
                            <span>Περιοχή Γέννησης</span>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='birth_country' >
                            <input className='input' type="text" name="birth_country" value={storeBirthInfo.birth_country} required autoComplete='birth_country'
                                onChange={(e) => {
                                    document.getElementById('birth_country').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    setStoreBirthInfo({ ...storeBirthInfo, birth_country: e.target.value })
                                }} />
                            <span>Χώρα Γέννησης</span>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='birth_location' >
                            <input className='input' type="text" name="birth_location" value={storeBirthInfo.birth_location} required autoComplete='birth_location'
                                onChange={(e) => {
                                    document.getElementById('birth_location').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                    setStoreBirthInfo({ ...storeBirthInfo, birth_location: e.target.value })
                                }} />
                            <span>Τόπος Γέννησης</span>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            <i></i>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedBirthInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}

            {currPopUpWindow === 'IdentityInfo_form' ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <BadgeIcon className='icon' />
                            <h2>Ταυτότητα Προσώπου</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='identity_type' >
                                <input className='input' type="text" name="identity_type" value={storeIdentityInfo.identity_type} required autoComplete='identity_type'
                                    onChange={(e) => {
                                        document.getElementById('identity_type').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, identity_type: e.target.value })
                                    }} />
                                <span>Τύπος Ταυτότητας</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='identity_number' >
                                <input className='input' type="text" name="identity_number" value={storeIdentityInfo.identity_number} required autoComplete='identity_number'
                                    onChange={(e) => {
                                        document.getElementById('identity_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, identity_number: e.target.value })
                                    }} />
                                <span>Αριθμός Ταυτότητας</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='published_principle' >
                                <input className='input' type="text" name="published_principle" value={storeIdentityInfo.published_principle} required autoComplete='published_principle'
                                    onChange={(e) => {
                                        document.getElementById('published_principle').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, published_principle: e.target.value })
                                    }} />
                                <span>Εκδ. Αρχή</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='publish_date' >
                                <input className='input' type="date" name="publish_date" value={storeIdentityInfo.publish_date} required autoComplete='publish_date'
                                    onChange={(e) => {
                                        document.getElementById('publish_date').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, publish_date: e.target.value })
                                    }} />
                                <span>Ημερομηνία Έκδοσης</span>
                                <p className="error_year">*Η Ημερομηνία Έκδοσης δεν είναι έγκυρη!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='citizenship' onChange={() => { document.getElementById('citizenship').getElementsByClassName('error_duplicate')[0].style.display = 'none'; document.getElementById('citizenship').getElementsByClassName('error')[0].style.display = 'none' }}>
                                <div className="tags_input">
                                    <div className='category'>Υπηκοότητα</div>
                                    <input type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Υπηκοότητα" onKeyUp={e => e.key === 'Enter' ? addTags(e, 'citizenship') : null}></input>
                                    <i></i>
                                    <ul>
                                        {citizenshipState.map((tag, index) => (
                                            !(storeIdentityInfo.citizenship).includes(tag) ?
                                                <li key={index} className="li">
                                                    <div style={{ color: 'rgb(16, 159, 154)' }}>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'citizenship')}>cancel</div>
                                                </li> :
                                                <li key={index} className="li">
                                                    <div>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'citizenship')}>cancel</div>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="error_duplicate">*Η συγκεκριμένη Υπηκοότητα έχει ήδη καταχωρηθεί!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            </div>
                            <div className='input-box' id='nationality' onChange={() => { document.getElementById('nationality').getElementsByClassName('error_duplicate')[0].style.display = 'none'; document.getElementById('nationality').getElementsByClassName('error')[0].style.display = 'none' }}>
                                <div className="tags_input">
                                    <div className='category'>Εθνικότητα</div>
                                    <input type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Εθνικότητα" onKeyUp={e => e.key === 'Enter' ? addTags(e, 'nationality') : null}></input>
                                    <i></i>
                                    <ul>
                                        {nationalityState.map((tag, index) => (
                                            !(storeIdentityInfo.nationality).includes(tag) ?
                                                <li key={index} className="li">
                                                    <div style={{ color: 'rgb(16, 159, 154)' }}>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'nationality')}>cancel</div>
                                                </li> :
                                                <li key={index} className="li">
                                                    <div>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'nationality')}>cancel</div>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="error_duplicate">*Η συγκεκριμένη Εθνικότητα έχει ήδη καταχωρηθεί!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            </div>
                            <div className='input-box' id='nationality_second' onChange={() => { document.getElementById('nationality_second').getElementsByClassName('error_duplicate')[0].style.display = 'none'; document.getElementById('nationality_second').getElementsByClassName('error')[0].style.display = 'none' }}>
                                <div className="tags_input">
                                    <div className='category'>Ιθαγένεια</div>
                                    <input type="text" placeholder="Πιέστε το Enter για να προσθέσετε νέα Εθνικότητα" onKeyUp={e => e.key === 'Enter' ? addTags(e, 'nationality_second') : null}></input>
                                    <i></i>
                                    <ul>
                                        {nationalitySecondState.map((tag, index) => (
                                            !(storeIdentityInfo.nationality_second).includes(tag) ?
                                                <li key={index} className="li">
                                                    <div style={{ color: 'rgb(16, 159, 154)' }}>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'nationality_second')}>cancel</div>
                                                </li> :
                                                <li key={index} className="li">
                                                    <div>{tag}</div>
                                                    <div className="material-icons"
                                                        style={{ fontSize: "17px", color: "gray" }}
                                                        onClick={() => removeTags(index, 'nationality_second')}>cancel</div>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="error_duplicate">*Η συγκεκριμένη Ιθαγένεια έχει ήδη καταχωρηθεί!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                            </div>
                            <div className='input-box' id='citizen' >
                                <input className='input' type="text" name="citizen" value={storeIdentityInfo.citizen} required autoComplete='citizen'
                                    onChange={(e) => {
                                        document.getElementById('citizen').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, citizen: e.target.value })
                                    }} />
                                <span>Δημοτολόγιο</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='citizen_number' >
                                <input className='input' type="text" name="citizen_number" value={storeIdentityInfo.citizen_number} required autoComplete='citizen_number'
                                    onChange={(e) => {
                                        document.getElementById('citizen_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, citizen_number: e.target.value })
                                    }} />
                                <span>Αριθμός Δημοτολογίου</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='male_record_num' >
                                <input className='input' type="text" name="male_record_num" value={storeIdentityInfo.male_record_num} required autoComplete='male_record_num'
                                    onChange={(e) => {
                                        document.getElementById('male_record_num').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, male_record_num: e.target.value })
                                    }} />
                                <span>Αρ. Μητρώου Αρρένων</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='male_record_perf' >
                                <input className='input' type="text" name="male_record_perf" value={storeIdentityInfo.male_record_perf} required autoComplete='male_record_perf'
                                    onChange={(e) => {
                                        document.getElementById('male_record_perf').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, male_record_perf: e.target.value })
                                    }} />
                                <span>Νομός Μητρώου Αρρένων</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='male_record_gr' >
                                <input className='input' type="text" name="male_record_gr" value={storeIdentityInfo.male_record_gr} required autoComplete='male_record_gr'
                                    onChange={(e) => {
                                        document.getElementById('male_record_gr').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, male_record_gr: e.target.value })
                                    }} />
                                <span>Γρ. Μητρώου Αρρένων</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='male_record_loc' >
                                <input className='input' type="text" name="male_record_loc" value={storeIdentityInfo.male_record_perf} required autoComplete='male_record_loc'
                                    onChange={(e) => {
                                        document.getElementById('male_record_loc').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreIdentityInfo({ ...storeIdentityInfo, male_record_loc: e.target.value })
                                    }} />
                                <span>Τόπος Μητρώου Αρρένων</span>
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedIdentityInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}
            {currPopUpWindow === 'AddressInfo_form' ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <PersonPinCircleIcon className='icon' />
                            <h2>Διεύθυνση Προσώπου </h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='road' >
                                <input className='input' type="text" name="road" value={storeAddressInfo.road} required autoComplete='road'
                                    onChange={(e) => {
                                        document.getElementById('road').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, road: e.target.value })
                                    }} />
                                <span>Οδός Κατοικίας</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='rd_number' >
                                <input className='input' type="text" name="rd_number" value={storeAddressInfo.rd_number} required autoComplete='rd_number'
                                    onChange={(e) => {
                                        document.getElementById('rd_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, rd_number: e.target.value })
                                    }} />
                                <span>Αριθμός</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='city' >
                                <input className='input' type="text" name="city" value={storeAddressInfo.city} required autoComplete='city'
                                    onChange={(e) => {
                                        document.getElementById('city').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, city: e.target.value })
                                    }} />
                                <span>Πόλη</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='location' >
                                <input className='input' type="text" name="location" value={storeAddressInfo.location} required autoComplete='location'
                                    onChange={(e) => {
                                        document.getElementById('location').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, location: e.target.value })
                                    }} />
                                <span>Περιοχή</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='country' >
                                <input className='input' type="text" name="country" value={storeAddressInfo.country} required autoComplete='country'
                                    onChange={(e) => {
                                        document.getElementById('country').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, country: e.target.value })
                                    }} />
                                <span>Χώρα</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='acting_address' >
                                <input className='input' type="text" name="acting_address" value={storeAddressInfo.acting_address} required autoComplete='acting_address'
                                    onChange={(e) => {
                                        document.getElementById('acting_address').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, acting_address: e.target.value })
                                    }} />
                                <span>Προσωρινή Κατοικία</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='postcode' >
                                <input className='input' type="text" name="postcode" value={storeAddressInfo.postcode} required autoComplete='postcode'
                                    onChange={(e) => {
                                        document.getElementById('postcode').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreAddressInfo({ ...storeAddressInfo, postcode: e.target.value })
                                    }} />
                                <span>T.K.</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='telephone' >
                                <input className='input' type="text" name="telephone" value={storeAddressInfo.telephone} required autoComplete='telephone'
                                    onChange={(e) => {
                                        document.getElementById('telephone').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('telephone').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('telephone').getElementsByClassName('error_field')[0].style.display = 'none';
                                        setStoreAddressInfo({ ...storeAddressInfo, telephone: e.target.value })
                                    }} />
                                <span>Σταθερό Τηλέφωνο</span>
                                <p className="error_field">*Το Σταθερό Τηλέφωνο δεν είναι έγκυρο!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='mobile_phone' >
                                <input className='input' type="text" name="mobile_phone" value={storeAddressInfo.mobile_phone} required autoComplete='mobile_phone'
                                    onChange={(e) => {
                                        document.getElementById('mobile_phone').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('mobile_phone').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('mobile_phone').getElementsByClassName('error_field')[0].style.display = 'none';
                                        setStoreAddressInfo({ ...storeAddressInfo, mobile_phone: e.target.value })
                                    }} />
                                <span>Κινητό Τηλέφωνο</span>
                                <p className="error_field">*Το Κινητό Τηλέφωνο δεν είναι έγκυρο!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='uth_email' >
                                <input className='input' type="text" name="uth_email" value={storeAddressInfo.uth_email} required autoComplete='uth_email'
                                    onChange={(e) => {
                                        document.getElementById('uth_email').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('uth_email').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('uth_email').getElementsByClassName('error_field')[0].style.display = 'none';
                                        setStoreAddressInfo({ ...storeAddressInfo, uth_email: e.target.value })
                                    }} />
                                <span>Email</span>
                                <p className="error_field">*Το Πανεπιστημιακό Email δεν είναι έγκυρο!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='alternative_email' >
                                <input className='input' type="text" name="alternative_email" value={storeAddressInfo.alternative_email} required autoComplete='alternative_email'
                                    onChange={(e) => {
                                        document.getElementById('alternative_email').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('alternative_email').getElementsByClassName('error_field')[0].style.display = 'none';
                                        setStoreAddressInfo({ ...storeAddressInfo, alternative_email: e.target.value })
                                    }} />
                                <span>Εναλλακτικό Email</span>
                                <p className="error_field">*Το Εναλλακτικό Email δεν είναι έγκυρο!</p>
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedAddressInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}
            {currPopUpWindow === 'ThirdPersonInfo_form' ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <Diversity3Icon className='icon' />
                            <h2>Στοιχεία Επαφής Τρίτου Προσώπου</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='contact_type' >
                                <input className='input' type="text" name="contact_type" value={storeThirdPersonInfo.contact_type} required autoComplete='contact_type'
                                    onChange={(e) => {
                                        document.getElementById('contact_type').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStorePersonalInfo({ ...storeThirdPersonInfo, contact_type: e.target.value })
                                    }} />
                                <span>Ιδιότητα Επαφής</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_FirstName' >
                                <input className='input' type="text" name="person_FirstName" value={storeThirdPersonInfo.person_FirstName} required autoComplete='person_FirstName'
                                    onChange={(e) => {
                                        document.getElementById('person_FirstName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_FirstName: e.target.value })
                                    }} />
                                <span>Όνομα</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_LastName' >
                                <input className='input' type="text" name="person_LastName" value={storeThirdPersonInfo.person_LastName} required autoComplete='person_LastName'
                                    onChange={(e) => {
                                        document.getElementById('person_LastName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_LastName: e.target.value })
                                    }} />
                                <span>Επώνυμο</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_address' >
                                <input className='input' type="text" name="person_address" value={storeThirdPersonInfo.person_address} required autoComplete='person_address'
                                    onChange={(e) => {
                                        document.getElementById('person_address').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_address: e.target.value })
                                    }} />
                                <span>Διεύθυνση Επικοινωνίας</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_telephone' >
                                <input className='input' type="text" name="person_telephone" value={storeThirdPersonInfo.person_telephone} required autoComplete='person_telephone'
                                    onChange={(e) => {
                                        document.getElementById('person_telephone').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_telephone: e.target.value })
                                    }} />
                                <span>Σταθερό Τηλέφωνο</span>
                                <p className="error">*Το Σταθερό Τηλέφωνο δεν είναι έγκυρο!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_mobilephone' >
                                <input className='input' type="text" name="person_mobilephone" value={storeThirdPersonInfo.person_mobilephone} required autoComplete='person_mobilephone'
                                    onChange={(e) => {
                                        document.getElementById('person_mobilephone').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_mobilephone: e.target.value })
                                    }} />
                                <span>Κινητό</span>
                                <p className="error">*Το Κινητό Τηλέφωνο δεν είναι έγκυρο!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='person_email' >
                                <input className='input' type="text" name="person_email" value={storeThirdPersonInfo.person_email} required autoComplete='person_email'
                                    onChange={(e) => {
                                        document.getElementById('person_email').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreThirdPersonInfo({ ...storeThirdPersonInfo, person_email: String(e.target.value) })
                                    }} />
                                <span>Email Επικοινωνίας</span>
                                <p className="error">*Το Email Επικοινωνίας δεν είναι έγκυρο!</p>
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedThirdPersonInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}

            {currPopUpWindow === 'GeneralInfo_form' ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <BadgeIcon className='icon'/>
                            <h2>Γενικά Στοιχεία</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='department' >
                                <input className='input' type="text" name="department" style={{color:'rgb(16, 159, 154)'}} value={storeGeneralInfo.department} required autoComplete='department'></input>
                                <span>Τμήμα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='department_number' >
                                <input className='input' type="text" name="department_number" style={{color:'rgb(16, 159, 154)'}} value={storeGeneralInfo.department_number} required autoComplete='department_number'
                                    onChange={(e) => {
                                        document.getElementById('department_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('department_number').getElementsByClassName('error')[0].style.display = 'none'; 
                                    }} />
                                <span>Αριθμός Τμήματος</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='course' >
                                <input className='input' type="text" name="course"  value={storeGeneralInfo.course} required autoComplete='course'
                                    onChange={(e) => {
                                        document.getElementById('course').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('course').getElementsByClassName('error')[0].style.display = 'none';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, course: e.target.value })
                                    }} />
                                <span>Πρόγραμμα Σπουδών</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='course_number' >
                                <input className='input' type="text" name="course_number" value={storeGeneralInfo.course_number} required autoComplete='course_number'
                                    onChange={(e) => {
                                        document.getElementById('course_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('course_number').getElementsByClassName('error')[0].style.display = 'none';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, course_number: e.target.value })
                                    }} />
                                <span>Αριθμός Προγράμματος Σπουδών</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='academic_record_number' >
                                <input className='input' type="text" name="academic_record_number" value={storeGeneralInfo.academic_record_number} required autoComplete='academic_record_number'
                                    onChange={(e) => {
                                        document.getElementById('academic_record_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('academic_record_number').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('academic_record_number').getElementsByClassName('errorValid')[0].style.display = 'none';
                                        document.getElementById('academic_record_number').getElementsByClassName('errorInput')[0].style.display = 'none';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, academic_record_number: e.target.value })
                                    }} />
                                <span>Αριθμός Μητρώου</span>
                                <p className="errorInput">*Ο ΑΕΜ αποτελείται αποκλειστικά από ψηφία!</p>
                                <p className="errorValid">*Ο ΑΕΜ πρέπει να είναι 5ψήφιος!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='current_academic_year' >
                                <input className='input' type="text" name="current_academic_year" value={storeGeneralInfo.current_academic_year} required autoComplete='current_academic_year'
                                    onChange={(e) => {
                                        document.getElementById('current_academic_year').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('current_academic_year').getElementsByClassName('error')[0].style.display = 'none';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, current_academic_year: e.target.value })
                                    }} />
                                <span>Τρέχον Ακαδημαϊκό Έτος</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='academic_email' >
                                <input className='input' type="text" name="academic_email" value={storeGeneralInfo.academic_email} required autoComplete='academic_email'
                                    onChange={(e) => {
                                        document.getElementById('academic_email').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('academic_email').getElementsByClassName('error')[0].style.display = 'none';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, academic_email: e.target.value })
                                    }} />
                                <span>Ακαδημαϊκό Email</span>
                                <p className="errorValid">*Το πεδίο δεν είναι έγκυρο!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='academic_identity' >
                                <input className='input' type="text" name="academic_identity" value={storeGeneralInfo.academic_identity} style={{color:'rgb(16, 159, 154)'}} required autoComplete='academic_identity'
                                    onChange={(e) => { document.getElementById('academic_identity').getElementsByClassName('error')[0].style.display = 'none' }} />
                                <span>Ακαδημαϊκή Ταυτότητα</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='course_program_part' >
                                <select className="input" value={storeGeneralInfo.course_program_part} onChange={(e) => { document.getElementById('course_program_part').getElementsByClassName('error')[0].style.display = 'none'; setStoreGeneralInfo({ ...storeGeneralInfo, course_program_part: e.target.value }) }}>
                                    <option value="ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ" style={{ backgroundColor: 'white' }}>ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ</option>
                                    <option value="ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ" style={{ backgroundColor: 'white' }}>ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ</option>
                                </select>
                                <span>Κατεύθυνση</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="student_situation">
                                <div className='checkBoxes'>
                                    <p className='title'>Κατάσταση Φοιτητή</p>
                                    <div className="checkbox-cont">
                                        <div className="box" id="active">
                                            {storeGeneralInfo.student_situation === 'Ενεργός' ?
                                                <input type="radio" className='input' name="student_state" value="Ενεργός" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('active').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('student_situation').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, student_situation: 'Ενεργός' })
                                                    }} ></input> :
                                                <input type="radio" className='input' name="student_state" value="Ενεργός"
                                                    onClick={() => {
                                                        document.getElementById('active').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('student_situation').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, student_situation: 'Ενεργός' })
                                                    }}></input>}
                                            <p className="description">Ενεργός</p>
                                        </div>
                                        <div className="box" id="no-active">
                                            {storeGeneralInfo.student_situation === 'Μη Ενεργός' ?
                                                <input type="radio" className='input' name="student_state" value="Μη Ενεργός" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('no-active').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('student_situation').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, student_situation: 'Μη Ενεργός' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="student_state" value="Μη Ενεργός"
                                                    onClick={() => {
                                                        document.getElementById('no-active').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('student_situation').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, student_situation: 'Μη Ενεργός' })
                                                    }}></input>}
                                            <p className="description"> Μη </p><p className="description"> Ενεργός </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="error" style={{ paddingTop: '3.1rem', position: 'absolute' }}>*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='second_course_program_part' >
                                <input className='input' type="text" name="second_course_program_part" value={storeGeneralInfo.second_course_program_part} required autoComplete='second_course_program_part'
                                    onChange={(e) => {
                                        document.getElementById('second_course_program_part').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, second_course_program_part: e.target.value })
                                    }} />
                                <span>Δεύτερη Κατεύθυνση</span>
                                <i></i>
                            </div>
                            <div className='input-box' id='comment_to_student' >
                                <textarea className='input' type="text" name="comment_to_student" value={storeGeneralInfo.comment_to_student} required autoComplete='comment_to_student'
                                    onChange={(e) => {
                                        document.getElementById('comment_to_student').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, comment_to_student: e.target.value })
                                    }} />
                                <span>Σχόλιο προς φοιτητή</span>
                                <i></i>
                            </div>   
                            <div className='input-box' id='general_academic_record_number' >
                                <input className='input' type="text" name="general_academic_record_number" value={storeGeneralInfo.general_academic_record_number} required autoComplete='general_academic_record_number'
                                    onChange={(e) => {
                                        document.getElementById('general_academic_record_number').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('general_academic_record_number').getElementsByClassName('errorValid')[0].style.display = 'none';
                                        document.getElementById('general_academic_record_number').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('general_academic_record_number').getElementsByClassName('errorInput')[0].style.display = 'none';
                                        document.getElementById('education_number').getElementsByClassName('errorValid')[0].style.display = 'none';
                                        document.getElementById('education_number').getElementsByClassName('errorSimilarity')[0].style.display = 'none';
                                        document.getElementById('education_number').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('education_number').getElementsByClassName('errorInput')[0].style.display = 'none'
                                        setStoreGeneralInfo({ ...storeGeneralInfo, general_academic_record_number: e.target.value })
                                    }} />
                                <span>Αριθμός Γενικού Μητρώου</span>
                                <p className="errorInput">*Ο ΑΓΜ αποτελείται αποκλειστικά από ψηφία!</p>
                                <p className="errorValid">*Ο ΑΓΜ πρέπει να είναι 7ψήφιος!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='current_academic_semester' >
                                <input className='input' type="text" name="current_academic_semester" value={storeGeneralInfo.current_academic_semester} required autoComplete='current_academic_semester'
                                    onChange={(e) => { 
                                        document.getElementById('current_academic_semester').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        document.getElementById('current_academic_semester').getElementsByClassName('error')[0].style.display = 'none'; 
                                        setStoreGeneralInfo({ ...storeGeneralInfo, current_academic_semester: e.target.value })
                                    }} />
                                <span>Τρέχον Ακαδημαϊκό Εξάμηνο</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id="current_attendance_period">
                                <div className='checkBoxes'>
                                    <p className='title'>Τρέχουσα Περίοδος Φοίτησης</p>
                                    <div className="checkbox-cont">
                                        <div className="box" id="winter">
                                            {storeGeneralInfo.current_attendance_period === 'ΧΕΙΜΕΡΙΝΗ' ?
                                                <input type="radio" className='input' name="academic_period" value="ΧΕΙΜΕΡΙΝΗ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('winter').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, student_situation: 'ΧΕΙΜΕΡΙΝΗ' })
                                                    }} ></input> :
                                                <input type="radio" className='input' name="academic_period" value="ΧΕΙΜΕΡΙΝΗ"
                                                    onClick={() => {
                                                        document.getElementById('winter').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, current_attendance_period: 'ΧΕΙΜΕΡΙΝΗ' })
                                                    }}></input>}
                                            <p className="description">Χειμερινή</p>
                                        </div>
                                        <div className="box" id="spring">
                                            {storeGeneralInfo.current_attendance_period === 'ΕΑΡΙΝΗ' ?
                                                <input type="radio" className='input' name="academic_period" value="ΕΑΡΙΝΗ" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('spring').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, current_attendance_period: 'ΕΑΡΙΝΗ' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="academic_period" value="ΕΑΡΙΝΗ"
                                                    onClick={() => {
                                                        document.getElementById('spring').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        document.getElementById('current_attendance_period').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                        setStoreGeneralInfo({ ...storeGeneralInfo, current_attendance_period: 'ΕΑΡΙΝΗ' })
                                                    }}></input>}
                                            <p className="description">Εαρινή</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="errorValid" style={{ paddingTop: '3.1rem', position: 'absolute' }}>*Το πεδίο δεν είναι έγκυρο!</p> 
                                <p className="error" style={{ paddingTop: '3.1rem', position: 'absolute' }}>*Το πεδίο είναι υποχρεωτικό!</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='education_number' >
                                <input className='input' type="text" name="education_number" value={storeGeneralInfo.education_number} required autoComplete='academic_identity'
                                    onChange={(e) => { document.getElementById('academic_identity').getElementsByClassName('error')[0].style.display = 'none'
                                                       setStoreGeneralInfo({...storeGeneralInfo, education_number:e.target.value})}} />
                                <span>Ενιαίος Αρ. Εκπαίδευσης</span>
                                <p className="errorInput">*Ο Ε.Α.Ε αποτελείται αποκλειστικά από ψηφία!</p>
                                <p className="errorValid">*Ο Ε.Α.Ε πρέπει να είναι 7ψήφιος!</p>
                                <p className="errorSimilarity">*Τα Ε.Α.Ε και ΑΓΜ πρέπει να ταυτίζονται!</p>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='course_program_subpart' >
                                <input className='input' type="text" name="course_program_subpart" value={storeGeneralInfo.course_program_subpart} required autoComplete='course_program_subpart'
                                    onChange={(e) => { 
                                        document.getElementById('course_program_subpart').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('course_program_subpart').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)';
                                        setStoreGeneralInfo({ ...storeGeneralInfo, course_program_subpart: e.target.value })
                                    }} />
                                <span>Υποκατεύθυνση</span>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='sub_attendance' >
                                <div className='checkBoxes'>
                                    <p className='title'>Μερικής Φοίτησης</p>
                                    <div className="checkbox-cont">
                                            <div className="box" id="yes">
                                                {storeGeneralInfo.sub_attendance === 'ΝΑΙ' ?
                                                    <input type="radio" className='input' name="sub_attendance" value="ΝΑΙ" defaultChecked
                                                        onClick={() => {
                                                            document.getElementById('yes').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                            document.getElementById('sub_attendance').getElementsByClassName('error')[0].style.display = 'none';
                                                            setStoreGeneralInfo({ ...storeGeneralInfo, sub_attendance: 'ΝΑΙ' })
                                                        }} ></input> :
                                                    <input type="radio" className='input' name="sub_attendance" value="ΝΑΙ"
                                                        onClick={() => {
                                                            document.getElementById('yes').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                            document.getElementById('sub_attendance').getElementsByClassName('error')[0].style.display = 'none';
                                                            setStoreGeneralInfo({ ...storeGeneralInfo, sub_attendance: 'ΝΑΙ' })
                                                        }}></input>}
                                                <p className="description">ΝΑΙ</p>
                                            </div>
                                            <div className="box" id="no">
                                                {storeGeneralInfo.sub_attendance === 'ΟΧΙ' ?
                                                    <input type="radio" className='input' name="sub_attendance" value="ΟΧΙ" defaultChecked
                                                        onClick={() => {
                                                            document.getElementById('no').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                            document.getElementById('sub_attendance').getElementsByClassName('error')[0].style.display = 'none';
                                                            setStoreGeneralInfo({ ...storeGeneralInfo, sub_attendance: 'ΟΧΙ' })
                                                        }}></input> :
                                                    <input type="radio" className='input' name="sub_attendance" value="ΟΧΙ"
                                                        onClick={() => {
                                                            document.getElementById('no').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                            document.getElementById('sub_attendance').getElementsByClassName('error')[0].style.display = 'none';
                                                            setStoreGeneralInfo({ ...storeGeneralInfo, sub_attendance: 'ΟΧΙ' })
                                                        }}></input>}
                                                <p className="description">ΟΧΙ</p>
                                            </div>
                                        </div>  
                                    </div>
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                                <i></i>
                            </div>
                            <div className='input-box' id='second_course_program_subpart' >
                                <input className='input' type="text" name="second_course_program_subpart" value={storeGeneralInfo.second_course_program_subpart} required autoComplete='second_course_program_subpart'
                                    onChange={(e) => {
                                        document.getElementById('second_course_program_subpart').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                        setStoreGeneralInfo({ ...storeGeneralInfo, second_course_program_subpart: e.target.value })
                                    }} />
                                <span>Δεύτερη Υποκατεύθυνση</span>                               
                                <i></i>
                            </div>
                            <div className='input-box' id='total_fees' >
                                <input className='input' type="text" name="total_fees" value={storeGeneralInfo.total_fees} required autoComplete='total_fees'
                                    onChange={(e) => {
                                        document.getElementById('total_fees').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                        setStoreGeneralInfo({ ...storeGeneralInfo, total_fees: e.target.value })
                                    }} />
                                <span>Σύνολο Διδάκτρων</span>                               
                                <i></i>
                            </div>
                        </div>                        
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedGeneralInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null}

                {currPopUpWindow === 'RegistrationInfo_form' ?
                <div>
                    <form name='form' autoComplete='off' >
                        <div className='title_section'>
                            <InputIcon className='icon' />
                            <h2 style={{paddingRight:'150px'}}>Στοιχεία Εισαγωγής</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='registration_year' style = {{width:'85%'}} >
                                <select value={storeRegistrationInfo.registration_year} onChange={(e)=> {document.getElementById('registration_year').getElementsByClassName('error')[0].style.display = 'none'; setStoreRegistrationInfo({...storeRegistrationInfo, registration_year:e.target.value})}}>
                                    {Array.from(new Array(30), (v,i) => {
                                        return ( 
                                            <option key={i} value={year-i} style={{backgroundColor:'white'}}>{year-i}</option> 
                                        )}
                                    )}
                                </select>
                                <span>Έτος Εισαγωγής</span>              
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p>                  
                                <i></i>
                            </div>
                        </div>
                        <div className='input-box' id='registration_semester' style = {{width:'85%'}} >
                            <input className='input' type="text" name="registration_semester" value={storeRegistrationInfo.registration_semester} required autoComplete='registration_semester'
                                onChange={(e) => {
                                    document.getElementById('registration_semester').getElementsByClassName('errorValid')[0].style.display = 'none';
                                    document.getElementById('registration_semester').getElementsByClassName('error')[0].style.display = 'none';
                                    document.getElementById('registration_semester').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                    setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_semester: e.target.value })
                                }} />
                            <span>Εξάμηνο Εισαγωγής</span>  
                            <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                            <p className="errorValid">*Το πεδίο συμπληρώνεται μόνο με ψηφία!</p>                              
                            <i></i>
                        </div>
                        <div className='input-box' id='registration_period' style={{width:"85%"}} >
                            <div className='checkBoxes'>
                                <p className='title'>Περίοδος Εισαγωγής</p>
                                <div className="checkbox-cont">
                                        <div className="box" id="winter">
                                            {storeRegistrationInfo.registration_period === 'Χειμερινή' ?
                                                <input type="radio" className='input' name="registration_period" value="Χειμερινή" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('winter').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('registration_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_period: 'Χειμερινή' })
                                                    }} ></input> :
                                                <input type="radio" className='input' name="registration_period" value="Χειμερινή"
                                                    onClick={() => {
                                                        document.getElementById('winter').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('registration_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_period: 'Χειμερινή' })
                                                    }}></input>}
                                            <p className="description">Χειμερινή</p>
                                        </div>
                                        <div className="box" id="spring">
                                            {storeRegistrationInfo.registration_period === 'Εαρινή' ?
                                                <input type="radio" className='input' name="registration_period" value="Εαρινή" defaultChecked
                                                    onClick={() => {
                                                        document.getElementById('spring').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('registration_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_period: 'Εαρινή' })
                                                    }}></input> :
                                                <input type="radio" className='input' name="sub_attendance" value="Εαρινή"
                                                    onClick={() => {
                                                        document.getElementById('spring').getElementsByClassName('input')[0].style.accentColor = 'rgb(16, 159, 154)';
                                                        document.getElementById('registration_period').getElementsByClassName('error')[0].style.display = 'none';
                                                        setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_period: 'Εαρινή' })
                                                    }}></input>}
                                            <p className="description">Εαρινή</p>
                                        </div>
                                    </div>  
                                </div>
                            <p className="error">*Το πεδίο είναι υποχρεωτικό</p>
                            <i></i>
                        </div>
                        <div className='input-box' id='registration_way' style = {{width:'85%'}} >
                            <input className='input' type="text" name="registration_way" value={storeRegistrationInfo.registration_way} required autoComplete='registration_way'
                                onChange={(e) => { 
                                    document.getElementById('registration_way').getElementsByClassName('error')[0].style.display = 'none';
                                    document.getElementById('registration_way').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                    setStoreRegistrationInfo({ ...storeRegistrationInfo, registration_way: e.target.value })
                                }} />
                            <span>Τρόπος Εισαγωγής</span>  
                            <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                            <i></i>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedRegistrationInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null }

                {currPopUpWindow === 'ProfessorAdvisorInfo_form' ?
                <div>
                    <form name='form' autoComplete='off'>
                        <div className='title_section'>
                            <SupervisorAccountIcon className='icon' />
                            <h2>Στοιχεία Σύμβουλου Καθηγητή</h2>
                        </div>
                        <div className='content'>
                            <div className='input-box' id='professorAdvisor_FirstName' style = {{width:'55%'}} >
                                <input className='input' type="text" name="professorAdvisor_FirstName" value={storeProfessorAdvisorInfo.professorAdvisor_FirstName} required autoComplete='professorAdvisor_FirstName'
                                    onChange={(e) => { 
                                        document.getElementById('professorAdvisor_FirstName').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('professorAdvisor_FirstName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                        setStoreProfessorAdvisorInfo({ ...storeProfessorAdvisorInfo, professorAdvisor_FirstName: e.target.value })
                                    }} />
                                <span>Όνομα Καθηγητή</span>  
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                <i></i>
                            </div>
                            <div className='input-box' id='professorAdvisor_LastName' style = {{width:'55%'}} >
                                <input className='input' type="text" name="professorAdvisor_LastName" value={storeProfessorAdvisorInfo.professorAdvisor_LastName} required autoComplete='professorAdvisor_LastName'
                                    onChange={(e) => { 
                                        document.getElementById('professorAdvisor_LastName').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('professorAdvisor_LastName').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                        setStoreProfessorAdvisorInfo({ ...storeProfessorAdvisorInfo, professorAdvisor_LastName: e.target.value })
                                    }} />
                                <span>Επώνυμο Καθηγητή</span>  
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                <i></i>
                            </div>
                            <div className='input-box' id='professorAdvisor_Email' style = {{width:'55%'}} >
                                <input className='input' type="text" name="professorAdvisor_Email" value={storeProfessorAdvisorInfo.professorAdvisor_Email} required autoComplete='professorAdvisor_Email'
                                    onChange={(e) => { 
                                        document.getElementById('professorAdvisor_Email').getElementsByClassName('error')[0].style.display = 'none';
                                        document.getElementById('professorAdvisor_Email').getElementsByClassName('input')[0].style.color = 'rgb(16, 159, 154)'; 
                                        setStoreProfessorAdvisorInfo({ ...storeProfessorAdvisorInfo, professorAdvisor_Email: String(e.target.value) })
                                    }} />
                                <span>Email Καθηγητή</span>  
                                <p className="error">*Το πεδίο είναι υποχρεωτικό</p> 
                                <i></i>
                            </div>
                        </div>
                    </form>
                    <div className='button_container' style={{ marginTop: "2rem" }}>
                        <div className={submitButton}
                            onMouseEnter={() => setSubmitButton('submit_button')}
                            onMouseLeave={() => setSubmitButton('submit_button loading')}
                            onClick={() => submitUpdatedProfessorAdvisorInfo()}>
                            <SystemUpdateAltIcon className='buttonIcon' />
                            <span className='text'>
                                Υποβολή των ανανεωμένων στοιχείων !
                            </span>
                            <span className='loading-animate'></span>
                        </div>
                    </div>
                </div> : null }
        </div>
    )
}

export default PopUpForms;