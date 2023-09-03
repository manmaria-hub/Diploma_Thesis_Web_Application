import {gql} from '@apollo/client';

export const ADD_GRADE_INFORMATION = gql`
    mutation addGradeInformation($coursesGradingInput : CoursesGrading_Input!) {
        addGradeInformation(coursesGradingInput : $coursesGradingInput)  
    }
`;
 

export const GET_SUCCESSFUL_COURSES_CODES = gql`
    query ($AEM_input : String!) {
        getSuccessfulCoursesCodes(AEM_input : $AEM_input)
    }
`;


export const GET_ALL_DECLARATED_COURSES_FOR_SPECIFIC_EXAM_PERIOD = gql`
    query ($AEM_input : String!, $semester_Input : String!, $year_Input : String!, $examPeriod_Input : String!) {
        getAllCoursesOfStudentForSpecificExamPeriod(AEM_input : $AEM_input, semester_Input: $semester_Input, year_Input: $year_Input, examPeriod_Input : $examPeriod_Input)   
    }
`;

export const GET_ALL_DECLARATED_COURSES = gql`
    query ($AEM_input : String!) {
        getAllDeclaratedCourses(AEM_input : $AEM_input) {
            course_name
            course_code 
            course_type 
            course_category 
            course_studyProgram 
            study_units 
            ECTS 
            declarated_semester 
            declarated_academicYear 
            declarated_period 
            semester_grade  
            progress_grade 
            exam_grade 
            lab_grade 
            tasks_grade 
            result 
            exam_period 
            active 
        }
    }
`;

export const GET_STUDENT_DECLARATED_COURSES_OF_SEMESTER = gql`
    query getStudentsSemesterCourses($AEM_input : String, $currAcademicPeriod : String, $currAcademicYear : String ) {
        getStudentsSemesterCourses(AEM_input : $AEM_input, currAcademicPeriod : $currAcademicPeriod, currAcademicYear: $currAcademicYear) {
            course_name
            course_code
            course_type 
            course_category 
            course_studyProgram 
            study_units 
            ECTS 
            declarated_semester 
            declarated_academicYear 
            declarated_period 
            semester_grade 
            progress_grade 
            exam_grade 
            lab_grade 
            tasks_grade 
            result 
            exam_period 
            active  
        }
    }
`;

export const GET_STUDENTS_OF_SPECIFIC_COURSE = gql`
    query ($courseCode : String!, $currentAcademicYear : String!, $currentAcademicPeriod : String!, $currentExamPeriod : String!) {
        getStudentoFSpecificCourse(courseCode : $courseCode, currentAcademicYear : $currentAcademicYear, currentAcademicPeriod : $currentAcademicPeriod, currentExamPeriod : $currentExamPeriod) {
            student_FirstName
            student_LastName
            student_AEM
            student_identity
            student_username
            student_uthEmail
            current_student_semester
            student_title
            gender
            grade_average
            total_ECTS
            total_units
            declarated_courses {
                course_name
                course_code 
                course_type 
                course_category 
                course_studyProgram 
                study_units 
                ECTS 
                declarated_semester 
                declarated_academicYear 
                declarated_period 
                semester_grade  
                progress_grade 
                exam_grade 
                lab_grade 
                tasks_grade 
                result 
                exam_period 
                active 
            }
        }  
    }
`;

export const UPDATE_EXAM_GRADE = gql`
    mutation updateDeclaratedCoursesExamGrade($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!, $exam_grade : Float!) {
        updateDeclaratedCoursesExamGrade(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period, exam_grade: $exam_grade) 
    }
`;

export const UPDATE_PROGRESS_GRADE = gql`
    mutation updateDeclaratedCoursesProgressGrade($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!, $progress_grade : Float!) {
        updateDeclaratedCoursesProgressGrade(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period, progress_grade: $progress_grade) 
    }
`;

export const UPDATE_LABS_GRADE = gql`
    mutation updateDeclaratedCoursesLabsGrade($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!, $labs_grade : Float!) {
        updateDeclaratedCoursesLabsGrade(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period, labs_grade: $labs_grade) 
    }
`;

export const UPDATE_TASKS_GRADE = gql`
    mutation updateDeclaratedCoursesTasksGrade($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!, $tasks_grade : Float!) {
        updateDeclaratedCoursesTasksGrade(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period, tasks_grade: $tasks_grade) 
    }
`;

export const SUBMIT_SEMESTER_GRADE = gql`
    mutation submitDeclaratedCoursesSemesterGrade($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!, $semester_grade : Float!) {
        submitDeclaratedCoursesSemesterGrade(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period, semester_grade: $semester_grade) 
    }
`;

export const SET_INACTIVE_FOR_SPECIFIC_COURSE = gql`
    mutation setInactiveForSpecificCourse($student_AEM : String!, $course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!) {
        setInactiveForSpecificCourse(student_AEM : $student_AEM, course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period) 
    }
`;

export const SET_ALL_STUDENTS_INACTIVE_FOR_SPECIFIC_COURSE = gql`
    mutation setAllInactiveForSpecificCourse($course_code : String!,$declarated_academic_year : String!, $declarated_academic_period : String!, $declarated_exam_period : String!) {
        setAllInactiveForSpecificCourse(course_code : $course_code , declarated_academic_year: $declarated_academic_year, declarated_academic_period: $declarated_academic_period, declarated_exam_period: $declarated_exam_period) 
    }
`;

export const GET_SUCCESSFUL_COURSES_NUMBER = gql`
    query getSuccessfulCoursesNumber($AEM_input : String!, $prevSemesters : [String!]) {
        getSuccessfulCoursesNumber(AEM_input : $AEM_input, prevSemesters : $prevSemesters)  
    }
`;

export const GET_SUCCESSFUL_MANDATORY_COURSES_NUMBER = gql`
    query getSuccessful_MandatoryCoursesNumber($AEM_input : String!, $prevSemesters : [String!]) {
        getSuccessful_MandatoryCoursesNumber(AEM_input : $AEM_input, prevSemesters : $prevSemesters)  
    }
`;

export const GET_POSTGRADUATE_COURSES_NUMBER = gql`
    query getPostGraduate_CoursesNumber($AEM_input : String!) {
        getPostGraduate_CoursesNumber(AEM_input : $AEM_input)  
    }
`;


export const GET_STUDENT_TOTAL_ECTS = gql`
    query getStudent_TotalECTS($AEM_input : String!) {
        getStudent_TotalECTS(AEM_input : $AEM_input)  
    }
`;