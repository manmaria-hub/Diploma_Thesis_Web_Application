import {ADD_NEW_COURSES_DECLARATION, GET_BASIC_DECLARATION_INFO, GET_ALL_DECLARATIONS_BY_STUDENT_AEM, GET_ALL_DECLARATIONS} from '../gqls/declarations';

import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//    

const get_course_declaration_basic_info = (AEMInput, periodInput, academicYearInput) => {
    return apolloClient.query({
        query : GET_BASIC_DECLARATION_INFO,
        variables : {studentAEM : AEMInput, period : periodInput, academicYear : academicYearInput},
        fetchPolicy : 'no-cache'
    })
}

const find_all_declarations_by_student_AEM = (student_AEM_input) => {
    return apolloClient.query({
        query : GET_ALL_DECLARATIONS_BY_STUDENT_AEM,
        variables : {student_AEM : student_AEM_input},
        fetchPolicy : 'no-cache'
    })
}

const get_all_declarations = () => {
    return apolloClient.query({
        query : GET_ALL_DECLARATIONS, 
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************//    

const add_new_course_declaration = (declarationInput) => {
    return apolloClient.mutate({
        mutation : ADD_NEW_COURSES_DECLARATION,
        variables : {declarationInput : declarationInput },
        fetchPolicy : 'no-cache'
    })
}

const declarationResolvers = {
    add_new_course_declaration,
    get_course_declaration_basic_info,
    find_all_declarations_by_student_AEM,
    get_all_declarations
}

export default declarationResolvers;
