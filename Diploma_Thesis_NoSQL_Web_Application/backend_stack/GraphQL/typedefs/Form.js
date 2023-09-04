// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Form = gql` 
    type Form_typee {
        _id : ID!
        application_form : String
        form_name : String   
        sending_date : String
        arrangement_date : String
        student_name : String  
        AEM : String
        username : String 
        semester : String
        form_pdf_data : String
        supervisor : String
        supervisor_type : String
        secondMember : String
        secondMember_type : String
        thirdMember : String
        thirdMember_type : String
        greekTitle : String
        englishTitle : String
        father_FirstName : String
        mother_FirstName : String
        email : String
        telephone : String
        mobile : String
        city : String
        road : String
        postcode : String
        formInput : String
        signature : String
        selectedSemester : [String]
        attendance_period : String
        birthLocation : String
        birthDate : String
        citizen : String
        citizenNumber : String
        registration_year : String
        registration_semester : String
        registration_date : String
        generalAEM : String
        grading : [String]
    }

    input FormInput { 
        application_form : String
        form_name : String   
        sending_date : String
        arrangement_date : String
        student_name : String  
        AEM : String
        username : String 
        semester : String
        form_pdf_data : String
        supervisor : String
        supervisor_type : String
        secondMember : String
        secondMember_type : String
        thirdMember : String
        thirdMember_type : String
        greekTitle : String
        englishTitle : String
        father_FirstName : String
        mother_FirstName : String
        email : String
        telephone : String
        mobile : String
        city : String
        road : String
        postcode : String
        formInput : String
        signature : String
        selectedSemester : [String]
        attendance_period : String
        birthLocation : String
        birthDate : String
        citizen : String
        citizenNumber : String
        registration_year : String
        registration_semester : String
        registration_date : String
        generalAEM : String
        grading : [String]
    }   

    type Query {
        getForms : [Form_typee]
        get_ProfessorForms(professorName : String) : [Form_typee]
        getFormsByAEM(AEM_input : String) : [Form_typee]
        findFormByAEM(AEM_input : String, formKind_input : String) : Boolean
        findSpecialTopicForm(AEM_input : String, formKind_input : String, semester : String) : Boolean
    }

    type Mutation {
        addNewStudentForm(formData : FormInput!) : Form_typee 
    }
`
module.exports = Form;