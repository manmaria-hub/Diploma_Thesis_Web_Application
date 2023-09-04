import {gql} from '@apollo/client';

export const ADD_NEW_STUDENT_FORM =gql`
    mutation addNewStudentForm($formData : FormInput!) {
        addNewStudentForm(formData : $formData) {
            application_form
            form_name
            student_name
            sending_date 
            arrangement_date  
            AEM 
            username  
            semester 
            form_pdf_data 
            supervisor 
            supervisor_type 
            secondMember
            secondMember_type 
            thirdMember 
            thirdMember_type 
            greekTitle 
            englishTitle 
            father_FirstName 
            mother_FirstName 
            email 
            telephone 
            mobile 
            city
            road 
            postcode 
            formInput 
            signature  
            selectedSemester
            attendance_period  
            birthLocation  
            birthDate 
            citizen  
            citizenNumber  
            registration_year  
            registration_semester  
            registration_date 
            generalAEM 
            grading   
        }            
    }
`;

export const GET_FORMS = gql`
    query {
        getForms {
            application_form
            form_name
            student_name
            sending_date 
            arrangement_date  
            AEM 
            username  
            semester 
            form_pdf_data   
            supervisor 
            supervisor_type 
            secondMember 
            secondMember_type 
            thirdMember 
            thirdMember_type 
            greekTitle 
            englishTitle  
            father_FirstName 
            mother_FirstName 
            email 
            telephone 
            mobile 
            city
            road 
            postcode 
            formInput 
            signature  
            selectedSemester
            attendance_period  
            birthLocation  
            birthDate 
            citizen  
            citizenNumber  
            registration_year  
            registration_semester  
            registration_date 
            generalAEM 
            grading     
        }
    }
`;

export const GET_PROFESSOR_FORMS = gql`
    query get_ProfessorForms($professorName : String!){
        get_ProfessorForms(professorName : $professorName){
            application_form
            form_name
            student_name
            sending_date 
            arrangement_date  
            AEM 
            username  
            semester 
            form_pdf_data   
            supervisor 
            supervisor_type 
            secondMember 
            secondMember_type 
            thirdMember 
            thirdMember_type 
            greekTitle 
            englishTitle  
            father_FirstName 
            mother_FirstName 
            email 
            telephone 
            mobile 
            city
            road 
            postcode 
            formInput 
            signature  
            selectedSemester
            attendance_period  
            birthLocation  
            birthDate 
            citizen  
            citizenNumber  
            registration_year  
            registration_semester  
            registration_date 
            generalAEM 
            grading     
        }
    }
`;


export const GET_FORMS_BY_STUDENT_AEM = gql`
    query getFormsByAEM($AEM_input : String!){
        getFormsByAEM( AEM_input : $AEM_input) {
            application_form
            form_name
            student_name
            sending_date 
            arrangement_date  
            AEM 
            username  
            semester 
            form_pdf_data   
            supervisor 
            supervisor_type 
            secondMember 
            secondMember_type 
            thirdMember 
            thirdMember_type 
            greekTitle 
            englishTitle
            father_FirstName 
            mother_FirstName 
            email 
            telephone 
            mobile 
            city
            road 
            postcode 
            formInput 
            signature  
            selectedSemester
            attendance_period  
            birthLocation  
            birthDate 
            citizen  
            citizenNumber  
            registration_year  
            registration_semester  
            registration_date 
            generalAEM 
            grading          
        }
    }
`;

export const FIND_FORM_BY_STUDENT_AEM = gql`
    query findFormByAEM($AEM_input : String!, $formKind_input : String!) {
        findFormByAEM(AEM_input : $AEM_input, formKind_input : $formKind_input)  
    }
`;

export const FIND_SPECIAL_TOPIC_FORM_BY_STUDENT_AEM = gql`
    query findSpecialTopicForm($AEM_input : String!, $formKind_input : String!, $semester : String!) {
        findSpecialTopicForm(AEM_input : $AEM_input, formKind_input : $formKind_input, semester : $semester)  
    }
`;