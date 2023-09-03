// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const CoursesGrading = gql`
    type declarated_courses_type {
        course_name: String
        course_code: String
        course_type : String
        course_category : String
        course_studyProgram : String
        study_units : Int
        ECTS : Int
        declarated_semester : String
        declarated_academicYear : String
        declarated_period : String
        semester_grade : Float
        progress_grade : Float
        exam_grade : Float
        lab_grade : Float
        tasks_grade : Float
        result : String
        exam_period : String
        active : Boolean 
    }    

    type CoursesGrading_type {
        student_FirstName : String 
        student_LastName : String
        student_AEM : String
        student_identity : String
        student_username : String
        student_uthEmail : String
        current_student_semester : String
        student_title : String
        gender : String
        grade_average : Float
        total_ECTS : Int
        total_units : Int
        declarated_courses : [declarated_courses_type]
    }

    type specific_CoursesGrading_type {
        student_FirstName : String 
        student_LastName : String
        student_AEM : String
        student_identity : String
        student_username : String
        student_uthEmail : String
        current_student_semester : String
        student_title : String
        gender : String
        grade_average : Float
        total_ECTS : Int
        total_units : Int
        declarated_courses : declarated_courses_type
    }
    
    input declarated_courses_Input {
        course_name: String
        course_code: String
        course_type : String
        course_category : String
        course_studyProgram : String
        study_units : Int
        ECTS : Int
        declarated_semester : String
        declarated_academicYear : String
        declarated_period : String
        semester_grade : Float
        progress_grade : Float
        exam_grade : Float
        lab_grade : Float
        tasks_grade : Float
        result : String
        exam_period : String
        active : Boolean 
    } 

    input CoursesGrading_Input {
        student_FirstName : String 
        student_LastName : String
        student_AEM : String
        student_identity : String
        student_username : String
        student_uthEmail : String
        current_student_semester : String
        student_title : String
        gender : String
        grade_average : Float
        total_ECTS : Int
        total_units : Int
        declarated_courses : [declarated_courses_Input]
    }

    type grading_type {
        _id : [String]
        courses : [CoursesGrading_type]
    }

    type Query {
        getAllDeclaratedCourses(AEM_input : String) : [declarated_courses_type]
        getAllCoursesOfStudentForSpecificExamPeriod(AEM_input : String, semester_Input : String, year_Input : String, examPeriod_Input : String) : [String]
        getSuccessfulCoursesCodes(AEM_input : String) : [String]
        getStudentoFSpecificCourse(courseCode : String, currentAcademicYear : String, currentAcademicPeriod : String, currentExamPeriod : String) : [specific_CoursesGrading_type]
        getSuccessfulCoursesNumber(AEM_input : String, prevSemesters : [String]) : Int 
        getSuccessful_MandatoryCoursesNumber(AEM_input : String, prevSemesters : [String]) : Int 
        getPostGraduate_CoursesNumber(AEM_input : String) : Int
        getStudent_TotalECTS(AEM_input : String) : Int
        getStudentsSemesterCourses(AEM_input : String, currAcademicPeriod : String, currAcademicYear : String) : [declarated_courses_type]
        getAllGradingsByPeriod : [grading_type]
    } 

    type Mutation {
        addGradeInformation(coursesGradingInput : CoursesGrading_Input) : String
        updateDeclaratedCoursesExamGrade(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String, exam_grade : Float) : String
        updateDeclaratedCoursesProgressGrade(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String, progress_grade : Float) : String
        updateDeclaratedCoursesLabsGrade(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String, labs_grade : Float) : String
        updateDeclaratedCoursesTasksGrade(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String, tasks_grade : Float) : String
        submitDeclaratedCoursesSemesterGrade(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String, semester_grade : Float) : String
        setInactiveForSpecificCourse(student_AEM : String, course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String ) : String
        setAllInactiveForSpecificCourse(course_code : String, declarated_academic_year : String, declarated_academic_period : String, declarated_exam_period : String ) : String
    }
`;

module.exports = CoursesGrading;

