import {CREATE_ACADEMIC_CALENDAR, FIND_COURSES_DECLARATION_DATE} from '../gqls/calendar';
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   MUTATIONS   ********************//    

const create_academic_calendar = (CalendarInput) => {
    return apolloClient.mutate({
        mutation : CREATE_ACADEMIC_CALENDAR,
        variables : {calendarInput : CalendarInput },
        fetchPolicy : 'no-cache'
    })
}  

//********************   QUERIES   ********************//    
 
const find_courses_declaration_date =  (academicYearInput, academicSemesterInput, studyLevelInput) => {
    return apolloClient.query({
        query: FIND_COURSES_DECLARATION_DATE,
        variables : {academicYear : academicYearInput, academicSemester : academicSemesterInput, study_level : studyLevelInput},
        fetchPolicy : 'no-cache'
    })
}

const calendarResolvers = {
    create_academic_calendar, 
    find_courses_declaration_date
}

export default calendarResolvers;
