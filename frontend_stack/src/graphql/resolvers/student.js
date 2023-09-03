import {ADD_STUDENT, ADD_MULTIPLE_STUDENTS, GET_CONNECTED_STUDENT, GET_ALL_STUDENTS_GROUP_BY,  EDIT_STUDENT, UPDATE_STUDENT_ALL_SEMESTER, EXIST_STUDENT_BY_AEM, EXIST_STUDENT_BY_USERNAME, EXIST_STUDENT_BY_UTH_EMAIL, EXIST_STUDENT_BY_STUDENT_IDENTITY, EXIST_STUDENT_BY_AMKA, EXIST_STUDENT_BY_AFM, FIND_STUDENT_BY_USERNAME, GET_ALL_STUDENTS, DELETE_STUDENT_BY_USERNAME} from '../gqls/student';
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the resolvers from backend stack 

//********************   QUERIES   ********************/    
const get_connected_student = (emailInput, usernameInput) => {
    return apolloClient.query({
        variables: {email : emailInput, username : usernameInput},
        query : GET_CONNECTED_STUDENT,
        fetchPolicy : 'no-cache'
    })
}

const find_student_by_username = (usernameInput) => {
    return apolloClient.query({
        variables: {username : usernameInput},
        query : FIND_STUDENT_BY_USERNAME,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_AEM = (AEMInput) => {
    return apolloClient.query({
        variables: {AEM : AEMInput},
        query : EXIST_STUDENT_BY_AEM,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_username = (usernameInput) => {
    return apolloClient.query({
        variables: {username : usernameInput},
        query : EXIST_STUDENT_BY_USERNAME,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_uth_email = (uthEmailInput) => {
    return apolloClient.query({
        variables: {uth_email : uthEmailInput},
        query : EXIST_STUDENT_BY_UTH_EMAIL,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_academic_identity = (academicIdentityInput) => {
    return apolloClient.query({
        variables: {student_identity : academicIdentityInput},
        query : EXIST_STUDENT_BY_STUDENT_IDENTITY,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_AMKA = (AMKAInput) => {
    return apolloClient.query({
        variables: {AMKA : AMKAInput},
        query : EXIST_STUDENT_BY_AMKA,
        fetchPolicy : 'no-cache'
    })
}

const exist_student_by_AFM = (AFMInput) => {
    return apolloClient.query({
        variables: {AFM : AFMInput},
        query : EXIST_STUDENT_BY_AFM,
        fetchPolicy : 'no-cache'
    })
}

const get_all_students = () => {
    return apolloClient.query({ 
        query : GET_ALL_STUDENTS,
        fetchPolicy : 'no-cache'
    })
}

const get_all_students_group_by = () => {
    return apolloClient.query({ 
        query : GET_ALL_STUDENTS_GROUP_BY,
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************/    
const add_student = (studentInput) => {
    return apolloClient.mutate({
        variables: {studentInput},
        mutation: ADD_STUDENT,
        fetchPolicy: 'no-cache'
    })
}

const edit_student = (usernameInput, editStudentInput) => {
    return apolloClient.mutate({
        variables: {username : usernameInput, editStudent : editStudentInput},
        mutation: EDIT_STUDENT,
        fetchPolicy: 'no-cache'
    })
}

const delete_student_by_username = (usernameInput) => {
    return apolloClient.mutate({
        variables: {studentUsername : usernameInput},
        mutation: DELETE_STUDENT_BY_USERNAME,
        fetchPolicy: 'no-cache'
    })
}


const update_all_students = (editSemesters) => {
    return apolloClient.mutate({
        variables: { allStudents : editSemesters},
        mutation: UPDATE_STUDENT_ALL_SEMESTER,
        fetchPolicy: 'no-cache'
    })
}

const add_multiple_students = (studentInput) => {
    console.log(JSON.parse(JSON.stringify(studentInput)), "INSIDE RESOLVER")
    //const array = studentsInputArray[0] 
    return apolloClient.mutate({
        variables: { input: studentInput},
        mutation: ADD_MULTIPLE_STUDENTS,
        fetchPolicy: 'no-cache',
        forceFetch : false
    })
}

const studentResolvers = {
    add_student, 
    add_multiple_students,
    get_connected_student,
    exist_student_by_AEM,
    exist_student_by_username,
    exist_student_by_uth_email,
    exist_student_by_academic_identity,
    exist_student_by_AMKA,
    exist_student_by_AFM,
    find_student_by_username,
    get_all_students,
    edit_student,
    update_all_students,
    get_all_students_group_by, 
    delete_student_by_username
}

export default studentResolvers;