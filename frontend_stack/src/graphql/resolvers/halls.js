import {ADD_NEW_HALL, GET_ALL_HALLS, FIND_HALL_BY_CODE, GET_AMPHITHEATRES_NAMES, GET_HALL_CODES, GET_STUDY_AND_LAB_HALLS, GET_ALL_EMPTY_PROFESSOR_OFFICES, UPDATE_PROFESSOR_OFFICE_OWNER} from '../gqls/halls';
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//    

const add_new_hall = (HallInput) => {
    return apolloClient.query({
        query : ADD_NEW_HALL,
        variables : {hallInput : HallInput },
        fetchPolicy : 'no-cache'
    })
}

const find_hall_by_code = (HallCode) => {
    return apolloClient.query({
        query: FIND_HALL_BY_CODE,
        variables : {hallCode : HallCode},
        fetchPolicy : 'no-cache'
    })
}

const get_all_empty_professor_offices = (HallCode) => {
    return apolloClient.query({
        query: GET_ALL_EMPTY_PROFESSOR_OFFICES, 
        fetchPolicy : 'no-cache'
    })
}

const get_all_halls = () => {
    return apolloClient.query({
        query: GET_ALL_HALLS, 
        fetchPolicy : 'no-cache'
    })
}

const get_amphitheatres_names = () => {
    return apolloClient.query({
        query: GET_AMPHITHEATRES_NAMES,
        fetchPolicy: 'no-cache'
    })
}

const get_all_hall_codes = () => {
    return apolloClient.query({
        query: GET_HALL_CODES,
        fetchPolicy: 'no-cache'
    })
}

const get_study_and_lab_halls = () => {
    return apolloClient.query({
        query: GET_STUDY_AND_LAB_HALLS,
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************//    

const update_professor_owner_office = (hallCode, professorName, professorEmail) => {
    return apolloClient.mutate({
        mutation : UPDATE_PROFESSOR_OFFICE_OWNER,
        variables : {hallCode : hallCode, professor_name : professorName, professor_email : professorEmail },
        fetchPolicy : 'no-cache'
    })
}

const hallsResolvers = {
     add_new_hall,
     find_hall_by_code,
     get_amphitheatres_names,
     get_all_hall_codes,
     get_study_and_lab_halls,
     get_all_empty_professor_offices,
     update_professor_owner_office,
     get_all_halls
}

export default hallsResolvers;
