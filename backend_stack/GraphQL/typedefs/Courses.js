// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Courses = gql`
    type StudyProgram_type { 
        course_name: String
        course_code: String
        studyProgram_name : String
        studyProgram_num : String
        department_name : String
        department_code : String
        period : String
        semester : String
        course_type : String
        course_category : String
        study_part : String
        study_subpart : String
        study_program : String
        specialization_field: String
        sub_study_program : String
        group : String
        study_units : String
        ECTS : String
        study_hours : String
        course_label : [String]
        prerequisites : [String]
    }

    type COURSE_DIRECTOR_type {
        director_FirstName : String
        director_LastName : String
        director_Email : String
        director_ProfessorType : String
    }

    type COURSE_INSTRUCTORS_type {
        instructor_FirstName : String
        instructor_LastName : String
        instructor_Email : String
        instructor_director_ProfessorType : String
    }

    type CourseManagement_type {
        COURSE_DIRECTOR : COURSE_DIRECTOR_type,
        COURSE_INSTRUCTORS : [COURSE_INSTRUCTORS_type]
    }

    type INITIAL_INFO_type {
        skills : [String]
        student_responsibilities : [String]
    }

    type MAIN_DESCRIPTION_type {
        targets : String
        learning_outcomes : String
        student_evaluation : String
        class_material : String
    }

    type SUGGESTED_WRITINGS_type {
        writing_name : String
        writing_eudoxus : String
        writing_link  : String
    }

    type InfoFromInstructor_type {
        INITIAL_INFO : INITIAL_INFO_type
        MAIN_DESCRIPTION : MAIN_DESCRIPTION_type
        RECOMMENDED_COURSES : [String]
        SUGGESTED_WRITINGS : [SUGGESTED_WRITINGS_type]   
        course_site : String     
        theory_hours: String
        lab_hours : String
        tutoring_hours : String
        bibliography : [String]
        typeOfExam : [String]
    }

    type More_type {
        students_curr_attendance_num : String
        course_active : Boolean
    }

    type Course {
        _id : ID!
        StudyProgram :  StudyProgram_type
        CourseManagement : CourseManagement_type
        InfoFromInstructor : InfoFromInstructor_type
        More : More_type        
    }

    input StudyProgramInput { 
        course_name: String
        course_code: String
        studyProgram_name : String
        studyProgram_num : String
        department_name : String
        department_code : String
        period : String
        semester : String
        course_type : String
        course_category : String
        study_part : String
        study_subpart : String
        study_program : String
        specialization_field : String
        sub_study_program : String
        group : String
        study_units : String
        ECTS : String
        study_hours : String
        course_label : [String]
        prerequisites : [String]
    }

    input COURSE_DIRECTOR_INPUT {
        director_FirstName : String
        director_LastName : String
        director_Email : String
        director_ProfessorType : String
    }

    input COURSE_INSTRUCTORS_INPUT {
        instructor_FirstName : String
        instructor_LastName : String
        instructor_Email : String
        instructor_director_ProfessorType : String
    }

    input CourseManagementInput {
        COURSE_DIRECTOR : COURSE_DIRECTOR_INPUT
        COURSE_INSTRUCTORS : [COURSE_INSTRUCTORS_INPUT]
    }

    input INITIAL_INFO_INPUT {
        skills : [String]
        student_responsibilities : [String]
    }

    input MAIN_DESCRIPTION_INPUT {
        targets : String
        learning_outcomes : String
        student_evaluation : String
        class_material : String
    }

    input SUGGESTED_WRITINGS_INPUT {
        writing_name : String
        writing_eudoxus : String
        writing_link  : String
    }

    input InfoFromInstructorInput {
        INITIAL_INFO : INITIAL_INFO_INPUT
        MAIN_DESCRIPTION : MAIN_DESCRIPTION_INPUT
        RECOMMENDED_COURSES : [String]
        SUGGESTED_WRITINGS : [SUGGESTED_WRITINGS_INPUT]   
        course_site : String 
        theory_hours: String
        lab_hours : String
        tutoring_hours : String
        bibliography : [String]    
        typeOfExam : [String]
    }
    
    input MoreInput {
        students_curr_attendance_num : String
        course_active : Boolean
    }

    input CourseInput {
        StudyProgram :  StudyProgramInput
        CourseManagement : CourseManagementInput
        InfoFromInstructor : InfoFromInstructorInput
        More : MoreInput        
    }

    type Course_OK {
        course : Course
        code : String
        OK_message : String
    }

    type Course_SimpleOK { 
        code : String
        simpleOK_message : String
    }

    type Course_Error { 
        code : String
        error_message : String
    }

    type CourseCode {
        code : String
    }

    type BasicCourseInfo {
        name : String
        code : String
    }

    type PostGraduateCourses {
        _id : String
        courses : [Course]
    }

    type StudyProgram_type {
        StudyProgram : StudyProgram_type
    }

    type BasicInfo_Course_id {
        semester : String
        category : String
    }
    type BasicInfo_Course {
        _id : BasicInfo_Course_id
        courses : [StudyProgram_type]
    }

    type Study_Program_Group_type {
        _id : String
        course : [Course]
    }

    type Semester_Group_type {
        _id : String
        courses_by_semester : [Course]
    }
  
    union CourseState = Course_SimpleOK | Course_OK | Course_Error

    type Query {
        findPreviousSemestersCourses(semester : String) : [BasicCourseInfo]
        findCoursebyCourseCode(courseCode : String) : CourseState
        findCoursebyCourseName(courseName : String) : CourseState                
        findbySemesterAllCoursesCodes(semester : String) : [String]
        findCoursebyCode(code : String) : Course_OK
        getAllActiveCoursesOfSpecificPeriod(period : [String]) : [Course]
        getPostGraduateCourses( period: String ) : [PostGraduateCourses] 
        getCoursesOfSpecificSemester(semester : [String]) : [BasicInfo_Course]
        getCoursesByInstructorEmail(instructor_email : String) : [Course]
        groupCoursesByStudyProgram : [Study_Program_Group_type]
        groupCoursesBySemester : [Semester_Group_type]
        groupPostCoursesByStudyProgram : [Study_Program_Group_type]
        groupPostCoursesBySemester : [Semester_Group_type]
        groupCourseByCourseType : [Study_Program_Group_type]
        groupPostCourseByCourseType : [Study_Program_Group_type]
        groupPostCourseBySpecializationField : [Study_Program_Group_type]
        getCoursesContainingCodeChars(courseCode : String) : [Course]
        getCoursesByCriteria(course_label_criteria : [String], spec_field_criteria : [String], semester_criteria : [String], course_type_criteria : [String]) : [Course]
    }
    type Mutation {
        addCourse(courseInput : CourseInput) : CourseState
    }

`
module.exports = Courses;