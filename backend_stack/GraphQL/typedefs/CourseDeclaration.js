// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const CourseDeclaration = gql`
    type Course_Info_type {
        course_name: String
        course_code: String
        studyProgram_name : String
        studyProgram_num : String
        department_name : String
        department_code : String
        period : String
        semester : String
        course_type : String
        course_category : String
        study_part : String
        study_subpart : String
        study_program : String
        specialization_field : String
        sub_study_program : String
        group : String
        study_units : String
        ECTS : String
        study_hours : String
        course_label : [String]
        prerequisites : [String]
    }

    type CourseDeclaration_type {
        student_FirstName : String
        student_LastName : String
        student_AEM : String
        student_identity: String
        student_username : String
        student_uthEmail : String
        student_academic_semester : String
        academic_period : String
        academic_year : String
        declaration_type : String
        declaration_category : String
        declaration_activeFromDay : String
        declaration_activeFromDate : String
        declaration_activeToDay : String
        declaration_activeToDate : String
        courses_number: Int
        hours_sum: Int
        ECTS_sum: Int
        studyUnits_sum: Int
        declaration_state: String 
        declarated_courses : [Course_Info_type] 
    }

    input Course_Info_Input {
        course_name: String
        course_code: String
        studyProgram_name : String
        studyProgram_num : String
        department_name : String
        department_code : String
        period : String
        semester : String
        course_type : String
        course_category : String
        study_part : String
        study_subpart : String
        study_program : String
        specialization_field : String
        sub_study_program : String
        group : String
        study_units : String
        ECTS : String
        study_hours : String
        course_label : [String]
        prerequisites : [String]
    }

    input CourseDeclaration_Input {
        student_FirstName : String
        student_LastName : String
        student_AEM : String
        student_identity: String
        student_username : String
        student_uthEmail : String
        student_academic_semester : String
        academic_period : String
        academic_year : String
        declaration_type : String
        declaration_category : String
        declaration_activeFromDay : String
        declaration_activeFromDate : String
        declaration_activeToDay : String
        declaration_activeToDate : String
        courses_number: Int
        hours_sum: Int
        ECTS_sum: Int
        studyUnits_sum: Int
        declaration_state: String 
        declarated_courses : [Course_Info_Input] 
    }

    type dateparts {
        year : Int
        month : Int
        day : Int
        hour : Int 
        minute : Int
        second : Int
        millisecond : Int
    }

    type BasicInfo_Declaration {
        dateParts : dateparts      
        declarated_courses : [Course_Info_type]  
    }

    type Query {
        getBasicForDeclaration(studentAEM : String, period : String, academicYear : String) : BasicInfo_Declaration
        findAllDeclarationsByAEM(student_AEM : String) : [CourseDeclaration_type]
        getAllDeclarations : [CourseDeclaration_type]
    }

    type Mutation {
        addNewCourseDeclaration(declarationInput : CourseDeclaration_Input) : String
    }
`;

module.exports = CourseDeclaration;

