import {ADD_NEW_STUDENT_FORM, GET_FORMS, FIND_FORM_BY_STUDENT_AEM, FIND_SPECIAL_TOPIC_FORM_BY_STUDENT_AEM, GET_FORMS_BY_STUDENT_AEM, GET_PROFESSOR_FORMS} from '../gqls/forms';

import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//   
const get_forms = () => {
    return apolloClient.query({
        query : GET_FORMS,
        fetchPolicy : 'no-cache'
    })
} 

const get_forms_by_student_AEM = (student_AEM) => {
    return apolloClient.query({
        query : GET_FORMS_BY_STUDENT_AEM,
        variables : {AEM_input : student_AEM},
        fetchPolicy : 'no-cache'
    })
} 

const find_form_by_student_AEM = (student_AEM, formKind) => {
    return apolloClient.query({
        query : FIND_FORM_BY_STUDENT_AEM,
        variables : {AEM_input : student_AEM, formKind_input : formKind},
        fetchPolicy : 'no-cache'
    })
} 

const find_special_topic_form_by_student_AEM = (student_AEM, formKind, semester_input) => {
    return apolloClient.query({
        query : FIND_SPECIAL_TOPIC_FORM_BY_STUDENT_AEM,
        variables : {AEM_input : student_AEM, formKind_input : formKind, semester : semester_input},
        fetchPolicy : 'no-cache'
    })
}

const get_Professor_forms = (professorNameInput) => {
    return apolloClient.query({
        query : GET_PROFESSOR_FORMS,
        variables : {professorName : professorNameInput},
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************//    

const add_new_student_form = (FormInput) => {
    return apolloClient.mutate({
        mutation : ADD_NEW_STUDENT_FORM,
        variables : {formData : FormInput },
        fetchPolicy : 'no-cache'
    })
}

const formsResolvers = {
    get_forms,
    get_forms_by_student_AEM,
    add_new_student_form,
    find_form_by_student_AEM, 
    find_special_topic_form_by_student_AEM,
    get_Professor_forms
}

export default formsResolvers;
