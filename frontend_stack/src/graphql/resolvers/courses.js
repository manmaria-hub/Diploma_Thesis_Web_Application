import { ADD_SPECIALIZATION_FIELD, GET_GRADUATE_AND_SUBJECT_LEVELS , GET_SPECIALIZATION_FIELDNAMES_AND_FIELDCODES_OF_STUDY_CATEGORY,
         FIND_COURSES_CODES_BY_SEMESTER, ADD_NEW_COURSE, FIND_SEMESTER_OPTIONS, FIND_COURSE_BY_CODE, FIND_COURSE_BY_NAME, GET_COURSES_BY_SPECIFIC_SEMESTER,
         FIND_COURSES_BY_PREVIOUS_SEMESTERS, GET_SPECIALIZATION_FIELD_CODE, GET_ACTIVE_COURSES_BY_SPECIFIC_PERIOD, GET_POSTGRADUATE_COURSES, GROUP_POST_COURSES_BY_SPECIALIZATION_FIELD,
         GET_COURSES_BY_INSTRUCTOR_EMAIL, GROUP_COURSES_BY_STUDY_PROGRAM, GROUP_COURSES_BY_SEMESTER, GROUP_COURSES_BY_COURSE_TYPE, GROUP_POST_COURSES_BY_STUDY_PROGRAM,
         GET_COURSES_CONTAINING_CODE_CHARS, GET_COURSES_BY_CRITERIA, GROUP_POST_COURSES_BY_COURSE_TYPE, GROUP_POST_COURSES_BY_SEMESTER} from "../gqls/courses";
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//    
const add_specialization_field = () => {
    return apolloClient.query({
        query: ADD_SPECIALIZATION_FIELD,
        fetchPolicy: 'no-cache'
    })
}

const get_graduate_and_subject_levels = () => {
    return apolloClient.query({
        query: GET_GRADUATE_AND_SUBJECT_LEVELS,
        fetchPolicy: 'no-cache'
    })
}

const get_fieldNames_And_fieldCodes_of_StudyCategory = (studyCategoryInput, postgraduateStudySubjectInput) => {
    return apolloClient.query({
        query: GET_SPECIALIZATION_FIELDNAMES_AND_FIELDCODES_OF_STUDY_CATEGORY,
        variables : {studyCategory : studyCategoryInput, postgraduateStudySubject: postgraduateStudySubjectInput},
        fetchPolicy : 'no-cache'
    })
}

const find_course_by_code = (courseCodeInput) => {
    return apolloClient.query({
        query : FIND_COURSE_BY_CODE,
        variables : {courseCode: courseCodeInput},
        fetchPolicy : 'no-cache'
    })
}

const find_course_by_name = (courseNameInput) => {
    return apolloClient.query({
        query : FIND_COURSE_BY_NAME,
        variables : {courseName: courseNameInput},
        fetchPolicy : 'no-cache'
    })
}

const find_courses_codes_by_semester = (semesterInput) => {
    return apolloClient.query({
        query: FIND_COURSES_CODES_BY_SEMESTER,
        variables : {semester : semesterInput},
        fetchPolicy : 'no-cache'
    })
}

const find_courses_codes_by_previous_semesters = (semesterInput) => {
    return apolloClient.query({
        query: FIND_COURSES_BY_PREVIOUS_SEMESTERS,
        variables : {semester: semesterInput},
        fetchPolicy: 'no-cache'
    })
}

const find_semester_options = (gradLevelInput, studySubjectInput) => {
    return apolloClient.query({
        query: FIND_SEMESTER_OPTIONS,
        variables : {gradLevel : gradLevelInput, studyField : studySubjectInput}, 
        fetchPolicy: 'no-cache'
    })
}

const get_specialization_field_code = (specFieldNameInput) => {
    return apolloClient.query({
        query : GET_SPECIALIZATION_FIELD_CODE,
        variables : {specFieldName : specFieldNameInput},
        fetchPolicy : 'no-cache'
    })
}

const get_active_courses_by_specific_period = (periodInput) => {
    return apolloClient.query({
        query : GET_ACTIVE_COURSES_BY_SPECIFIC_PERIOD, 
        variables : {period: periodInput},
        fetchPolicy : 'no-cache'
    })
}

const get_postgraduate_courses = (periodInput) => {
    return apolloClient.query({
        query : GET_POSTGRADUATE_COURSES,
        variables : {period : periodInput},
        fetchPolicy : 'no-cache'
    })
}

const get_courses_by_specific_semester = (semesterInput) => {
    return apolloClient.query({
        query : GET_COURSES_BY_SPECIFIC_SEMESTER,
        variables : {semester : semesterInput},
        fetchPolicy : 'no-cache'
    })
}


const get_courses_by_instructor_email = (instructorEmailInput) => {
    return apolloClient.query({
        query : GET_COURSES_BY_INSTRUCTOR_EMAIL,
        variables : {instructor_email : instructorEmailInput},
        fetchPolicy : 'no-cache'
    })
}

const group_courses_by_study_program = () => {
    return apolloClient.query({
        query : GROUP_COURSES_BY_STUDY_PROGRAM,
        fetchPolicy : 'no-cache'
    })
}

const group_courses_by_semester = () => {
    return apolloClient.query({
        query : GROUP_COURSES_BY_SEMESTER,
        fetchPolicy : 'no-cache'
    })
}

const group_courses_by_course_type = () => {
    return apolloClient.query({
        query : GROUP_COURSES_BY_COURSE_TYPE,
        fetchPolicy : 'no-cache'
    })
}

const group_post_courses_by_study_program = () => {
    return apolloClient.query({
        query : GROUP_POST_COURSES_BY_STUDY_PROGRAM,
        fetchPolicy : 'no-cache'
    })
}

const group_post_courses_by_semester = () => {
    return apolloClient.query({
        query : GROUP_POST_COURSES_BY_SEMESTER,
        fetchPolicy : 'no-cache'
    })
}

const group_post_courses_by_course_type = () => {
    return apolloClient.query({
        query : GROUP_POST_COURSES_BY_COURSE_TYPE,
        fetchPolicy : 'no-cache'
    })
}

const group_post_courses_by_specialization_field = () => {
    return apolloClient.query({
        query : GROUP_POST_COURSES_BY_SPECIALIZATION_FIELD,
        fetchPolicy : 'no-cache'
    })
}

const get_courses_containing_course_codes = (courseCode_input) => {
    return apolloClient.query({
        query : GET_COURSES_CONTAINING_CODE_CHARS,
        variables : {courseCode : courseCode_input},
        fetchPolicy : 'no-cache'
    })
}

const get_courses_by_criteria = (courseLabel, studyProgram, semester, courseCategory) => {
    return apolloClient.query({
        query : GET_COURSES_BY_CRITERIA,
        variables : {course_label_criteria : courseLabel, spec_field_criteria : studyProgram, semester_criteria : semester, course_type_criteria : courseCategory},
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************//    
const add_course = (courseInput) => {
    return apolloClient.mutate({
        mutation: ADD_NEW_COURSE,
        variables : {courseInput},
        fetchPolicy: 'no-cache'
    })
}

const coursesResolvers = {
    add_specialization_field,
    get_graduate_and_subject_levels,
    get_fieldNames_And_fieldCodes_of_StudyCategory,
    find_courses_codes_by_semester,
    find_courses_codes_by_previous_semesters, 
    add_course,
    find_course_by_code,
    find_course_by_name,
    find_semester_options,
    get_specialization_field_code, 
    get_active_courses_by_specific_period,
    get_postgraduate_courses,
    get_courses_by_specific_semester,
    get_courses_by_instructor_email,
    group_courses_by_study_program, 
    group_courses_by_semester,
    group_courses_by_course_type,
    get_courses_containing_course_codes,
    get_courses_by_criteria,
    group_post_courses_by_course_type,
    group_post_courses_by_semester,
    group_post_courses_by_study_program,
    group_post_courses_by_specialization_field
}

export default coursesResolvers;
