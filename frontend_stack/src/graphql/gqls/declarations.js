import {gql} from '@apollo/client';

export const ADD_NEW_COURSES_DECLARATION = gql`
    mutation addNewCourseDeclaration($declarationInput : CourseDeclaration_Input!) {
        addNewCourseDeclaration(declarationInput : $declarationInput)  
    }
`;

export const GET_ALL_DECLARATIONS_BY_STUDENT_AEM =gql`
    query findAllDeclarationsByAEM($student_AEM : String!) {
        findAllDeclarationsByAEM(student_AEM : $student_AEM) {
            student_FirstName 
            student_LastName 
            student_AEM 
            student_identity
            student_username 
            student_uthEmail 
            student_academic_semester 
            academic_period 
            academic_year 
            declaration_type 
            declaration_category 
            declaration_activeFromDay 
            declaration_activeFromDate 
            declaration_activeToDay 
            declaration_activeToDate 
            courses_number 
            hours_sum
            ECTS_sum
            studyUnits_sum 
            declaration_state 
            declarated_courses {
                course_name
                course_code
                studyProgram_name 
                studyProgram_num 
                department_name 
                department_code 
                period 
                semester 
                course_type 
                course_category 
                study_part 
                study_subpart 
                study_program 
                specialization_field 
                sub_study_program 
                group 
                study_units 
                ECTS 
                study_hours 
                course_label  
                prerequisites  
            }
        }
    }
`;

export const GET_ALL_DECLARATIONS =gql`
    query {
        getAllDeclarations {
            student_FirstName 
            student_LastName 
            student_AEM 
            student_identity
            student_username 
            student_uthEmail 
            student_academic_semester 
            academic_period 
            academic_year 
            declaration_type 
            declaration_category 
            declaration_activeFromDay 
            declaration_activeFromDate 
            declaration_activeToDay 
            declaration_activeToDate 
            courses_number 
            hours_sum
            ECTS_sum
            studyUnits_sum 
            declaration_state 
            declarated_courses {
                course_name
                course_code
                studyProgram_name 
                studyProgram_num 
                department_name 
                department_code 
                period 
                semester 
                course_type 
                course_category 
                study_part 
                study_subpart 
                study_program 
                specialization_field 
                sub_study_program 
                group 
                study_units 
                ECTS 
                study_hours 
                course_label  
                prerequisites  
            }
        }
    }
`;

export const GET_BASIC_DECLARATION_INFO = gql`
    query ($studentAEM : String !, $period : String!, $academicYear : String!) {
        getBasicForDeclaration (studentAEM : $studentAEM, period : $period, academicYear : $academicYear) {
            dateParts {
                day                
                month
                year
                hour
                minute
                second
                millisecond
            }
            declarated_courses {
                course_name
                course_code 
                studyProgram_name  
                studyProgram_num 
                department_name  
                department_code  
                period 
                semester  
                course_type  
                course_category  
                study_part  
                study_subpart  
                study_program  
                specialization_field  
                sub_study_program  
                group  
                study_units  
                ECTS  
                study_hours  
                course_label  
                prerequisites  
            }
        } 
    }
`;