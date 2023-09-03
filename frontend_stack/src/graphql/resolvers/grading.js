import {ADD_GRADE_INFORMATION , GET_SUCCESSFUL_COURSES_CODES, GET_ALL_DECLARATED_COURSES_FOR_SPECIFIC_EXAM_PERIOD ,
        GET_ALL_DECLARATED_COURSES, GET_STUDENTS_OF_SPECIFIC_COURSE, UPDATE_EXAM_GRADE, UPDATE_PROGRESS_GRADE,
        UPDATE_LABS_GRADE, UPDATE_TASKS_GRADE, SUBMIT_SEMESTER_GRADE, SET_INACTIVE_FOR_SPECIFIC_COURSE, 
        SET_ALL_STUDENTS_INACTIVE_FOR_SPECIFIC_COURSE, GET_SUCCESSFUL_COURSES_NUMBER, GET_SUCCESSFUL_MANDATORY_COURSES_NUMBER, 
        GET_POSTGRADUATE_COURSES_NUMBER, GET_STUDENT_TOTAL_ECTS, GET_STUDENT_DECLARATED_COURSES_OF_SEMESTER} from './../gqls/grading';

import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//    

const get_successful_courses_codes = (inputAEM) => {
    return apolloClient.query({
        query : GET_SUCCESSFUL_COURSES_CODES,
        variables : {AEM_input : inputAEM },
        fetchPolicy : 'no-cache'
    })
}

const get_all_courses_specific_exam_period = (AEM_input, semester_Input, year_Input, examPeriod_Input) => {
    return apolloClient.query({
        query : GET_ALL_DECLARATED_COURSES_FOR_SPECIFIC_EXAM_PERIOD,
        variables : {AEM_input : AEM_input , semester_Input : semester_Input, year_Input : year_Input, examPeriod_Input : examPeriod_Input},
        fetchPolicy : 'no-cache'
    })
}

const get_all_declarated_courses = (AEM_input) => {
    return apolloClient.query({
        query : GET_ALL_DECLARATED_COURSES,
        variables : {AEM_input : AEM_input},
        fetchPolicy : 'no-cache'
    })
}

const get_student_declarated_courses_of_semester = (AEM_input, currentAcademicYear_Input, currentAcademicPeriod_Input) => {
    return apolloClient.query({
        query : GET_STUDENT_DECLARATED_COURSES_OF_SEMESTER,
        variables : {AEM_input : AEM_input, currAcademicPeriod : currentAcademicPeriod_Input, currAcademicYear : currentAcademicYear_Input},
        fetchPolicy : 'no-cache'
    })
}

const get_students_of_specific_course = (courseCode_Input, currentAcademicYear_Input,  currentAcademicPeriod_Input, currentExamPeriod_Input) => {
    return apolloClient.query({
        query : GET_STUDENTS_OF_SPECIFIC_COURSE,
        variables : {courseCode : courseCode_Input, currentAcademicYear : currentAcademicYear_Input, currentAcademicPeriod : currentAcademicPeriod_Input, currentExamPeriod : currentExamPeriod_Input},
        fetchPolicy : 'no-cache'
    })
}

//********************   MUTATIONS   ********************//    

const add_new_grade_information = (coursesGradingInput) => {
    return apolloClient.mutate({
        mutation : ADD_GRADE_INFORMATION,
        variables : {coursesGradingInput : coursesGradingInput },
        fetchPolicy : 'no-cache'
    })
}

const update_exam_grade = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input, ExamGrade_input) => {
    return apolloClient.mutate({
        mutation : UPDATE_EXAM_GRADE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input, exam_grade : ExamGrade_input},
        fetchPolicy : 'no-cache'
    })
}

const update_progress_grade = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input, ProgressGrade_input) => {
    return apolloClient.mutate({
        mutation : UPDATE_PROGRESS_GRADE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input, progress_grade : ProgressGrade_input},
        fetchPolicy : 'no-cache'
    })
}

const update_labs_grade = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input, LabsGrade_input) => {
    return apolloClient.mutate({
        mutation : UPDATE_LABS_GRADE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input, labs_grade : LabsGrade_input},
        fetchPolicy : 'no-cache'
    })
}

const update_tasks_grade = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input, TasksGrade_input) => {
    return apolloClient.mutate({
        mutation : UPDATE_TASKS_GRADE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input, tasks_grade : TasksGrade_input},
        fetchPolicy : 'no-cache'
    })
}

const update_semester_grade = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input, SemesterGrade_input) => {
    return apolloClient.mutate({
        mutation : SUBMIT_SEMESTER_GRADE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input, semester_grade : SemesterGrade_input},
        fetchPolicy : 'no-cache'
    })
}

const set_student_inactive_for_specific_course = (AEM_input, CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input) => {
    return apolloClient.mutate({
        mutation : SET_INACTIVE_FOR_SPECIFIC_COURSE,
        variables : {student_AEM : AEM_input, course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input},
        fetchPolicy : 'no-cache'
    })
}

const set_all_students_inactive_for_specific_course = (CourseCode_input, AcademicYear_input, AcademicPeriod_input, ExamPeriod_input) => {
    return apolloClient.mutate({
        mutation : SET_ALL_STUDENTS_INACTIVE_FOR_SPECIFIC_COURSE,
        variables : {course_code : CourseCode_input, declarated_academic_year : AcademicYear_input, declarated_academic_period : AcademicPeriod_input, declarated_exam_period : ExamPeriod_input},
        fetchPolicy : 'no-cache'
    })
}

const get_successful_courses_number = (AEM_input, prevSemesters_input) => {
    return apolloClient.query({
        query : GET_SUCCESSFUL_COURSES_NUMBER,
        variables : {AEM_input : AEM_input, prevSemesters : prevSemesters_input},
        fetchPolicy : 'no-cache'
    })
}

const get_successful_mandatory_courses_number = (AEM_input, prevSemesters_input) => {
    return apolloClient.query({
        query : GET_SUCCESSFUL_MANDATORY_COURSES_NUMBER,
        variables : {AEM_input : AEM_input, prevSemesters : prevSemesters_input},
        fetchPolicy : 'no-cache'
    })
}

const get_successful_postgraduate_courses_number = (AEM_input) => {
    return apolloClient.query({
        query : GET_POSTGRADUATE_COURSES_NUMBER,
        variables : {AEM_input : AEM_input},
        fetchPolicy : 'no-cache'
    })
}

const get_student_total_ECTS = (AEM_input) => {
    return apolloClient.query({
        query : GET_STUDENT_TOTAL_ECTS,
        variables : {AEM_input : AEM_input},
        fetchPolicy : 'no-cache'
    })
}

const gradingResolvers = {
    add_new_grade_information,
    get_successful_courses_codes,
    get_all_courses_specific_exam_period,
    get_all_declarated_courses,
    get_students_of_specific_course,
    update_exam_grade,
    update_progress_grade,
    update_labs_grade,
    update_tasks_grade,
    update_semester_grade,
    set_student_inactive_for_specific_course,
    set_all_students_inactive_for_specific_course,
    get_successful_courses_number,
    get_successful_mandatory_courses_number,
    get_successful_postgraduate_courses_number, 
    get_student_total_ECTS, 
    get_student_declarated_courses_of_semester
}

export default gradingResolvers;
