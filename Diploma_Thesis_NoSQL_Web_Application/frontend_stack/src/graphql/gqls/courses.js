import {gql} from '@apollo/client';

export const ADD_SPECIALIZATION_FIELD = gql`
    query {
        insertSpecializationFields {
            ... on SpecializationFields_OK {
                code
                OK_message
            }
            ... on SpecializationFields_error {
                code
                error_message
            }
        }
    }
`;

export const GET_GRADUATE_AND_SUBJECT_LEVELS = gql`
    query {
        getGraduateAndSubjectLevels {
            ... on SpecializationFields_QueryOK {
                data
                code
                QueryOK_message
            }
            ... on SpecializationFields_QueryError {
                code
                QueryError_message
            }
        }
    }
`;

export const GET_SPECIALIZATION_FIELDNAMES_AND_FIELDCODES_OF_STUDY_CATEGORY = gql`
    query($studyCategory:String, $postgraduateStudySubject:String) {
        getSpecializationFieldsOfStudyCategory(studyCategory: $studyCategory, postgraduateStudySubject: $postgraduateStudySubject) {
            fieldName
            fieldCode
        }
    }
`;

export const FIND_COURSE_BY_CODE = gql`
    query ($courseCode : String) {
        findCoursebyCourseCode(courseCode: $courseCode) {
            ... on Course_OK {
                course {
                    StudyProgram {
                        course_name
                        course_code
                        studyProgram_name 
                        studyProgram_num 
                        department_name 
                        department_code 
                        period 
                        semester 
                        course_type 
                        course_category 
                        study_part 
                        study_subpart 
                        study_program 
                        specialization_field
                        sub_study_program 
                        group 
                        study_units 
                        ECTS 
                        study_hours
                        course_label
                        prerequisites 
                    } 
                    CourseManagement {
                        COURSE_DIRECTOR {
                            director_FirstName 
                            director_LastName 
                            director_Email
                            director_ProfessorType 
                        }
                        COURSE_INSTRUCTORS 
                            {
                                instructor_FirstName 
                                instructor_LastName 
                                instructor_Email 
                                instructor_director_ProfessorType 
                            }
                        
                    }
                    InfoFromInstructor{
                        INITIAL_INFO {
                            skills
                            student_responsibilities
                        }
                        MAIN_DESCRIPTION {
                            targets
                            learning_outcomes
                            student_evaluation
                            class_material
                        }
                        RECOMMENDED_COURSES
                        SUGGESTED_WRITINGS {
                            writing_name 
                            writing_eudoxus 
                            writing_link  
                        }
                        course_site
                        theory_hours
                        lab_hours
                        tutoring_hours
                        bibliography  
                        typeOfExam                      
                    }
                    More {
                        students_curr_attendance_num
                        course_active
                    }
                }
                code
                OK_message
            }
            ... on Course_Error {
                code 
                error_message
            }
        }
    }
`;

export const FIND_COURSE_BY_NAME = gql`
    query ($courseName : String) {
        findCoursebyCourseName(courseName: $courseName) {
            ... on Course_OK {
                course {
                    StudyProgram {
                        course_name
                        course_code
                        course_label
                    } 
                    More {
                        course_active
                    }
                }
                code
                OK_message
            }
            ... on Course_Error {
                code 
                error_message
            }
        }
    }
`;

export const FIND_COURSES_CODES_BY_SEMESTER = gql`
    query($semester:String) {
        findbySemesterAllCoursesCodes(semester:$semester)
    }
`;

export const FIND_COURSES_BY_PREVIOUS_SEMESTERS = gql`
    query($semester : String) {
        findPreviousSemestersCourses(semester: $semester) {
            name
            code
        }
    }
`;

export const ADD_NEW_COURSE = gql`
    mutation addCourse($courseInput : CourseInput!) {
        addCourse(courseInput : $courseInput) { 
            ... on Course_OK { 
                code
                OK_message
            }
            ... on Course_Error {
                code
                error_message
            }
        }
    }
`;

export const FIND_SEMESTER_OPTIONS = gql`
    query ($gradLevel: String, $studyField : String) {
        findSemesterOptionsByGraduateSpecializationField(gradLevel : $gradLevel, studyField : $studyField)
    }
`;

export const GET_SPECIALIZATION_FIELD_CODE = gql`
    query ($specFieldName : String) {
        getSpecializationFieldCode(specFieldName : $specFieldName)
    }
`;

export const GET_ACTIVE_COURSES_BY_SPECIFIC_PERIOD = gql`
    query ($period : [String]) {
        getAllActiveCoursesOfSpecificPeriod(period : $period) {
            StudyProgram {
                course_name
                course_code 
                semester  
                specialization_field   
                study_hours
                course_label 
            }  
            CourseManagement { 
                COURSE_INSTRUCTORS 
                {
                    instructor_FirstName 
                    instructor_LastName   
                }                
            }
            InfoFromInstructor{    
                theory_hours
                lab_hours
                tutoring_hours     
                typeOfExam                       
            } 
            More {
                students_curr_attendance_num
            }
        }
    }
`;

export const GET_POSTGRADUATE_COURSES = gql`
    query ($period : String) {
        getPostGraduateCourses(period:$period) {
            _id
            courses {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography       
                    typeOfExam                         
                }
                More {
                    students_curr_attendance_num
                    course_active
                }                
            }
        }
    }
`;

export const GET_COURSES_BY_SPECIFIC_SEMESTER = gql`
    query ($semester : [String]) {
        getCoursesOfSpecificSemester(semester : $semester) {
            _id {
                semester
                category
            }
            courses {
                StudyProgram {
                    course_name
                    course_code
                
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
            }
        }
    }
`;

export const GET_COURSES_BY_INSTRUCTOR_EMAIL = gql`
    query ($instructor_email : String!) {
        getCoursesByInstructorEmail (instructor_email : $instructor_email) {
            StudyProgram {
                course_name
                course_code
                studyProgram_name 
                studyProgram_num 
                department_name 
                department_code 
                period 
                semester 
                course_type 
                course_category 
                study_part 
                study_subpart 
                study_program 
                specialization_field
                sub_study_program 
                group 
                study_units 
                ECTS 
                study_hours
                course_label
                prerequisites 
            } 
            CourseManagement {
                COURSE_DIRECTOR {
                    director_FirstName 
                    director_LastName 
                    director_Email
                    director_ProfessorType 
                }
                COURSE_INSTRUCTORS 
                    {
                        instructor_FirstName 
                        instructor_LastName 
                        instructor_Email 
                        instructor_director_ProfessorType 
                    }
                
            }
            InfoFromInstructor{
                INITIAL_INFO {
                    skills
                    student_responsibilities
                }
                MAIN_DESCRIPTION {
                    targets
                    learning_outcomes
                    student_evaluation
                    class_material
                }
                RECOMMENDED_COURSES
                SUGGESTED_WRITINGS {
                    writing_name 
                    writing_eudoxus 
                    writing_link  
                }
                course_site
                theory_hours
                lab_hours
                tutoring_hours
                bibliography  
                typeOfExam                      
            }
            More {
                students_curr_attendance_num
                course_active
            } 
        }
    }
`;

export const GROUP_COURSES_BY_STUDY_PROGRAM = gql`
    query  {
        groupCoursesByStudyProgram{
            _id
            course {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GROUP_POST_COURSES_BY_STUDY_PROGRAM = gql`
    query  {
        groupPostCoursesByStudyProgram{
            _id
            course {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GROUP_COURSES_BY_SEMESTER = gql`
    query  {
        groupCoursesBySemester{
            _id
            courses_by_semester {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;


export const GROUP_POST_COURSES_BY_SEMESTER = gql`
    query  {
        groupPostCoursesBySemester{
            _id
            courses_by_semester {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GROUP_COURSES_BY_COURSE_TYPE = gql`
    query  {
        groupCourseByCourseType{
            _id
            course {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GROUP_POST_COURSES_BY_COURSE_TYPE = gql`
    query  {
        groupPostCourseByCourseType{
            _id
            course {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GROUP_POST_COURSES_BY_SPECIALIZATION_FIELD = gql`
    query  {
        groupPostCourseBySpecializationField{
            _id
            course {
                StudyProgram {
                    course_name
                    course_code
                    studyProgram_name 
                    studyProgram_num 
                    department_name 
                    department_code 
                    period 
                    semester 
                    course_type 
                    course_category 
                    study_part 
                    study_subpart 
                    study_program 
                    specialization_field
                    sub_study_program 
                    group 
                    study_units 
                    ECTS 
                    study_hours
                    course_label
                    prerequisites 
                } 
                CourseManagement {
                    COURSE_DIRECTOR {
                        director_FirstName 
                        director_LastName 
                        director_Email
                        director_ProfessorType 
                    }
                    COURSE_INSTRUCTORS 
                        {
                            instructor_FirstName 
                            instructor_LastName 
                            instructor_Email 
                            instructor_director_ProfessorType 
                        }
                    
                }
                InfoFromInstructor{
                    INITIAL_INFO {
                        skills
                        student_responsibilities
                    }
                    MAIN_DESCRIPTION {
                        targets
                        learning_outcomes
                        student_evaluation
                        class_material
                    }
                    RECOMMENDED_COURSES
                    SUGGESTED_WRITINGS {
                        writing_name 
                        writing_eudoxus 
                        writing_link  
                    }
                    course_site
                    theory_hours
                    lab_hours
                    tutoring_hours
                    bibliography  
                    typeOfExam                      
                }
                More {
                    students_curr_attendance_num
                    course_active
                }
            }
        }
    }
`;

export const GET_COURSES_CONTAINING_CODE_CHARS = gql`
    query getCoursesContainingCodeChars($courseCode : String) {
        getCoursesContainingCodeChars(courseCode : $courseCode) {
            _id 
            StudyProgram {
                course_name
                course_code
                studyProgram_name 
                studyProgram_num 
                department_name 
                department_code 
                period 
                semester 
                course_type 
                course_category 
                study_part 
                study_subpart 
                study_program 
                specialization_field
                sub_study_program 
                group 
                study_units 
                ECTS 
                study_hours
                course_label
                prerequisites 
            } 
            CourseManagement {
                COURSE_DIRECTOR {
                    director_FirstName 
                    director_LastName 
                    director_Email
                    director_ProfessorType 
                }
                COURSE_INSTRUCTORS 
                    {
                        instructor_FirstName 
                        instructor_LastName 
                        instructor_Email 
                        instructor_director_ProfessorType 
                    }
                
            }
            InfoFromInstructor{
                INITIAL_INFO {
                    skills
                    student_responsibilities
                }
                MAIN_DESCRIPTION {
                    targets
                    learning_outcomes
                    student_evaluation
                    class_material
                }
                RECOMMENDED_COURSES
                SUGGESTED_WRITINGS {
                    writing_name 
                    writing_eudoxus 
                    writing_link  
                }
                course_site
                theory_hours
                lab_hours
                tutoring_hours
                bibliography  
                typeOfExam                      
            }
            More {
                students_curr_attendance_num
                course_active
            }
            
        }
    }
`; 
export const GET_COURSES_BY_CRITERIA = gql`
    query getCoursesByCriteria($course_label_criteria : [String], $spec_field_criteria : [String], $semester_criteria : [String], $course_type_criteria : [String]) {
        getCoursesByCriteria(course_label_criteria : $course_label_criteria, spec_field_criteria: $spec_field_criteria, semester_criteria : $semester_criteria, course_type_criteria : $course_type_criteria ) {
            _id 
            StudyProgram {
                course_name
                course_code
                studyProgram_name 
                studyProgram_num 
                department_name 
                department_code 
                period 
                semester 
                course_type 
                course_category 
                study_part 
                study_subpart 
                study_program 
                specialization_field
                sub_study_program 
                group 
                study_units 
                ECTS 
                study_hours
                course_label
                prerequisites 
            } 
            CourseManagement {
                COURSE_DIRECTOR {
                    director_FirstName 
                    director_LastName 
                    director_Email
                    director_ProfessorType 
                }
                COURSE_INSTRUCTORS 
                    {
                        instructor_FirstName 
                        instructor_LastName 
                        instructor_Email 
                        instructor_director_ProfessorType 
                    }
                
            }
            InfoFromInstructor{
                INITIAL_INFO {
                    skills
                    student_responsibilities
                }
                MAIN_DESCRIPTION {
                    targets
                    learning_outcomes
                    student_evaluation
                    class_material
                }
                RECOMMENDED_COURSES
                SUGGESTED_WRITINGS {
                    writing_name 
                    writing_eudoxus 
                    writing_link  
                }
                course_site
                theory_hours
                lab_hours
                tutoring_hours
                bibliography  
                typeOfExam                      
            }
            More {
                students_curr_attendance_num
                course_active
            }
            
        }
    }
`; 