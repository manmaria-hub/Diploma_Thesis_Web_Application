import {gql} from '@apollo/client';

export const CREATE_ACADEMIC_CALENDAR = gql`
    mutation createAcademicCalendar($calendarInput : AcademicCalendar_Input!) {
        createAcademicCalendar(calendarInput : $calendarInput) { 
            ... on AcademicCalendar_SimpleOK { 
                code
                simpleOK_message
            }
            ... on AcademicCalendar_Error {
                code
                error_message
            }
        }
    }
`;

export const FIND_COURSES_DECLARATION_DATE = gql`
    query findCoursesDeclarationDate($academicYear : String, $academicSemester : String, $study_level : String) {
        findCoursesDeclarationDate(academicYear : $academicYear, academicSemester : $academicSemester, study_level : $study_level) { 
            courseDeclaration_startDay
            courseDeclaration_startDate
            courseDeclaration_endDay
            courseDeclaration_endDate
        }
    }
`;