import {ADD_NEW_PROFESSOR, DELETE_PROFESSOR_BY_ID, GET_CONNECTED_PROFESSOR, GET_ALL_PROFESSORS,
    EXIST_PROFESSOR_BY_UTH_EMAIL ,  EXIST_PROFESSOR_BY_USERNAME, EXIST_PROFESSOR_BY_AMKA,
    EXIST_PROFESSOR_BY_AFM, GET_ALL_PROFESSORS_BY_PROFESSOR_TYPE, UPDATE_PROFESSOR, DELETE_PROFESSOR_BY_USERNAME} from '../gqls/professors';

import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//   
const add_new_professor = (professorInput) => {
    return apolloClient.query({
        query : ADD_NEW_PROFESSOR,
        variables : {professorToSubmit : professorInput},
        fetchPolicy : 'no-cache'
    })
    
} 

const delete_professor_by_id = (professorID) => {
    return apolloClient.query({
        query : DELETE_PROFESSOR_BY_ID,
        variables : {professorID : professorID},
        fetchPolicy : 'no-cache'
    })
    
} 


const delete_professor_by_username = (professorUsername) => {
    return apolloClient.query({
        query : DELETE_PROFESSOR_BY_USERNAME,
        variables : {professorUsername : professorUsername},
        fetchPolicy : 'no-cache'
    })
    
}

const get_connected_professor = (username, email) => {
    return apolloClient.query({
        query : GET_CONNECTED_PROFESSOR,
        variables : {professor_username : username, professor_email : email},
        fetchPolicy : 'no-cache'
    })
}

const get_all_professors = () => {
    return apolloClient.query({
        query : GET_ALL_PROFESSORS,
        fetchPolicy : 'no-cache'
    })
}

const exist_professor_by_username = (usernameInput) => {
    return apolloClient.query({
        variables: {username : usernameInput},
        query : EXIST_PROFESSOR_BY_USERNAME,
        fetchPolicy : 'no-cache'
    })
}

const exist_professor_by_uth_email = (uthEmailInput) => {
    return apolloClient.query({
        variables: {uth_email : uthEmailInput},
        query : EXIST_PROFESSOR_BY_UTH_EMAIL,
        fetchPolicy : 'no-cache'
    })
}

const exist_professor_by_AMKA = (AMKAInput) => {
    return apolloClient.query({
        variables: {AMKA : AMKAInput},
        query : EXIST_PROFESSOR_BY_AMKA,
        fetchPolicy : 'no-cache'
    })
}

const edit_professor = (usernameInput, inputProfessor) => {
    return apolloClient.query({
        variables: {username : usernameInput, editProfessor : inputProfessor},
        query : UPDATE_PROFESSOR,
        fetchPolicy : 'no-cache'
    })
}


const exist_professor_by_AFM = (AFMInput) => {
    return apolloClient.query({
        variables: {AFM : AFMInput},
        query : EXIST_PROFESSOR_BY_AFM,
        fetchPolicy : 'no-cache'
    })
}

const get_all_professors_group_by_professor_type = (AFMInput) => {
    return apolloClient.query({ 
        query : GET_ALL_PROFESSORS_BY_PROFESSOR_TYPE,
        fetchPolicy : 'no-cache'
    })
}



const professorsResolvers = {
    add_new_professor, 
    delete_professor_by_id,
    get_connected_professor,
    get_all_professors, 
    exist_professor_by_AFM, 
    exist_professor_by_AMKA, 
    exist_professor_by_uth_email, 
    exist_professor_by_username,
    get_all_professors_group_by_professor_type,
    edit_professor,
    delete_professor_by_username
}

export default professorsResolvers;
