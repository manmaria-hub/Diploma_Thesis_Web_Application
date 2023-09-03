import {gql} from '@apollo/client';

export const GET_CONNECTED_STUDENT = gql`
    query ($email : String, $username : String) {
        getConnectedStudent(email : $email, username : $username) {
            ... on Student_OK {
                code
                OKmessage
                student {
                    _id
                    Personal_Info {
                        Personal_Information {
                            last_name 
                            first_name  
                            dot_father_name 
                            father_FirstName 
                            father_LastName 
                            maiden_name 
                            mother_FirstName 
                            mother_LastName 
                            spouse_name 
                            profession 
                            mother_profession 
                            father_profession 
                            family 
                            username 
                            personal_title 
                            website 
                            student_identity 
                            active 
                            fulfilled_military_obligations 
                            sex 
                            notations 
                        }
                        Student_Address {
                            road 
                            rd_number
                            city
                            location
                            country
                            acting_address
                            postcode
                            telephone
                            mobile_phone
                        }
                        Birth_Details {
                            gender
                            birth_location
                            birth_date
                        } 
                        Student_Identity {
                            citizen
                            citizen_number
                        }                   
                    } 
                    Studentship_Info {
                        General_Information {
                            department
                            department_number
                            course
                            course_number
                            academic_email
                            student_situation
                            current_academic_year
                            current_academic_semester
                            current_attendance_period
                            academic_record_number
                            general_academic_record_number
                            academic_identity
                            course_program_part
                            course_program_subpart
                            education_number
                            second_course_program_part
                            second_course_program_subpart
                            comment_to_student
                            total_fees
                            sub_attendance
                        }
                        Registration_Details {
                            registration_year
                            registration_semester
                            registration_period
                            registration_way
                        }
                    }
                }
            }
        }
    }
`;

export const FIND_STUDENT_BY_USERNAME = gql` 
    query findStudent($username : String!) {
        findStudent(username : $username) {
            Personal_Info {
                Personal_Information {
                    last_name 
                    first_name  
                    dot_father_name 
                    username                      
                    student_identity 
                    father_FirstName
                    gender
                    active   
                } 
                Student_Address{
                    uth_email
                    telephone
                    mobile_phone
                }         
            } 
            Studentship_Info {
                General_Information {
                    department
                    department_number
                    course
                    course_number
                    academic_email
                    student_situation
                    current_academic_year
                    current_academic_semester
                    current_attendance_period
                    academic_record_number
                    general_academic_record_number
                    academic_identity
                    course_program_part 
                    education_number 
                } 
                Grade_State {
                    totalNumber_successCourses 
                    totalNumber_failedCourses 
                    totalNumber_succesCompulsoryCourses 
                    totalNumber_failedCompulsoryCourses 
                    totalNumber_succesElectiveCourses 
                    totalNumber_failedElectiveCourses 
                    ECTS_compulsoryCourses 
                    ECTS_electiveCourses 
                    units_compulsoryCourses 
                    units_electiveCourses 
                    ECTS_total
                    units_total
                    grade_average
                }
            }
        }
    }
`;

export const GET_ALL_STUDENTS = gql` 
    query {
        getAllStudents {
            Personal_Info {
                Personal_Information {
                    last_name 
                    first_name  
                    dot_father_name 
                    father_FirstName 
                    father_LastName 
                    maiden_name 
                    mother_FirstName 
                    mother_LastName 
                    spouse_name 
                    profession 
                    mother_profession 
                    father_profession 
                    family 
                    username 
                    personal_title 
                    website 
                    student_identity 
                    active 
                    fulfilled_military_obligations 
                    gender
                    sex 
                    notations   
                } 
                Student_Address {
                    road
                    rd_number 
                    city 
                    location 
                    country 
                    acting_address 
                    postcode 
                    telephone 
                    mobile_phone 
                    uth_email 
                    alternative_email 
                }
                Birth_Details {
                    gender
                    birth_location
                    birth_date
                    birth_prefecture 
                    birth_country
                }    
                Student_Identity {
                    identity_type
                    citizenship
                    citizen 
                    identity_number 
                    citizen_number
                    published_principle 
                    publish_date
                    nationality 
                    nationality_second 
                    male_record_num 
                    male_record_perf
                    male_record_gr
                    male_record_loc
                    male_record_country
                } 
                Student_Insurance {
                    AMKA_number 
                    AFM_number 
                    DOY_number 
                    AMKA_country 
                    AFM_country 
                }
                Third_Person_Contact_Details {
                    contact_type
                    person_FirstName
                    person_LastName
                    person_address
                    person_telephone
                    person_mobilephone
                    person_email
                }                 
            } 
            Studentship_Info {
                General_Information {
                    department
                    department_number
                    course
                    course_number
                    academic_email
                    student_situation
                    current_academic_year
                    current_academic_semester
                    current_attendance_period
                    academic_record_number
                    general_academic_record_number
                    academic_identity
                    course_program_part
                    course_program_subpart
                    education_number
                    second_course_program_part
                    second_course_program_subpart
                    comment_to_student
                    total_fees
                    sub_attendance
                } 
                Registration_Details {
                    registration_year
                    registration_semester
                    registration_period
                    registration_way
                }            
                Professor_Advisor_Details {
                    professorAdvisor_FirstName
                    professorAdvisor_LastName
                    professorAdvisor_Email
                }
                Grade_State {
                    totalNumber_successCourses 
                    totalNumber_failedCourses 
                    totalNumber_succesCompulsoryCourses 
                    totalNumber_failedCompulsoryCourses 
                    totalNumber_succesElectiveCourses 
                    totalNumber_failedElectiveCourses 
                    ECTS_compulsoryCourses 
                    ECTS_electiveCourses 
                    units_compulsoryCourses 
                    units_electiveCourses 
                    ECTS_total
                    units_total
                    grade_average
                }
            }
        }
    }
`;

export const ADD_STUDENT = gql`
    mutation addStudent($studentInput : StudentInput!) {
        addStudent(studentInput : $studentInput) {
            ... on Student_OK {
                code 
                OKmessage
                student : student {
                    Personal_Info {
                        Birth_Details {
                          birth_country
                        }
                      }
                }
            }
            ... on Student_Error {
                code
                errormessage
            }
        }
    }
`;

export const EDIT_STUDENT = gql`
    mutation updateStudentByUsername($username : String!, $editStudent : StudentInput!) {
        updateStudentByUsername(username : $username, editStudent : $editStudent) {
            Personal_Info {
                Personal_Information {
                    last_name 
                    first_name  
                    dot_father_name 
                    father_FirstName 
                    father_LastName 
                    maiden_name 
                    mother_FirstName 
                    mother_LastName 
                    spouse_name 
                    profession 
                    mother_profession 
                    father_profession 
                    family 
                    username 
                    personal_title 
                    website 
                    student_identity 
                    active 
                    fulfilled_military_obligations 
                    gender
                    sex 
                    notations   
                } 
                Student_Address {
                    road
                    rd_number 
                    city 
                    location 
                    country 
                    acting_address 
                    postcode 
                    telephone 
                    mobile_phone 
                    uth_email 
                    alternative_email 
                }
                Birth_Details {
                    gender
                    birth_location
                    birth_date
                    birth_prefecture 
                    birth_country
                }    
                Student_Identity {
                    identity_type
                    citizenship
                    citizen 
                    identity_number 
                    citizen_number
                    published_principle 
                    publish_date
                    nationality 
                    nationality_second 
                    male_record_num 
                    male_record_perf
                    male_record_gr
                    male_record_loc
                    male_record_country
                } 
                Student_Insurance {
                    AMKA_number 
                    AFM_number 
                    DOY_number 
                    AMKA_country 
                    AFM_country 
                }
                Third_Person_Contact_Details {
                    contact_type
                    person_FirstName
                    person_LastName
                    person_address
                    person_telephone
                    person_mobilephone
                    person_email
                }                 
            } 
            Studentship_Info {
                General_Information {
                    department
                    department_number
                    course
                    course_number
                    academic_email
                    student_situation
                    current_academic_year
                    current_academic_semester
                    current_attendance_period
                    academic_record_number
                    general_academic_record_number
                    academic_identity
                    course_program_part
                    course_program_subpart
                    education_number
                    second_course_program_part
                    second_course_program_subpart
                    comment_to_student
                    total_fees
                    sub_attendance
                } 
                Registration_Details {
                    registration_year
                    registration_semester
                    registration_period
                    registration_way
                }            
                Professor_Advisor_Details {
                    professorAdvisor_FirstName
                    professorAdvisor_LastName
                    professorAdvisor_Email
                }
                Grade_State {
                    totalNumber_successCourses 
                    totalNumber_failedCourses 
                    totalNumber_succesCompulsoryCourses 
                    totalNumber_failedCompulsoryCourses 
                    totalNumber_succesElectiveCourses 
                    totalNumber_failedElectiveCourses 
                    ECTS_compulsoryCourses 
                    ECTS_electiveCourses 
                    units_compulsoryCourses 
                    units_electiveCourses 
                    ECTS_total
                    units_total
                    grade_average
                }
            }
        }
    }
`;

export const ADD_MULTIPLE_STUDENTS = gql`
    mutation addMultipleStudents($input : [StudentInput]) {
        addMultipleStudents(input : $input) {     
            ... on MultipleStudentsOK{
                code
                OK_MultipleMessage
            }
            ... on StudentError {
                code
                errormessage
            }
        }
    }
`;

export const EXIST_STUDENT_BY_AEM = gql`
    query($AEM: String!) {
        existStudentByAEM(AEM: $AEM)  
    }
`;

export const EXIST_STUDENT_BY_UTH_EMAIL = gql`
    query($uth_email: String!) {
        existStudentByUthEmail(uth_email: $uth_email)  
    }
`;

export const EXIST_STUDENT_BY_USERNAME = gql`
    query($username: String!) {
        existStudentByUsername(username: $username)  
    }
`;

export const EXIST_STUDENT_BY_STUDENT_IDENTITY = gql`
    query($student_identity: String!) {
        existStudentBystudentIdentity(student_identity: $student_identity)  
    }
`;

export const EXIST_STUDENT_BY_AMKA = gql`
    query($AMKA: String!) {
        existStudentByAMKA(AMKA: $AMKA)  
    }
`;

export const EXIST_STUDENT_BY_AFM = gql`
    query($AFM: String!) {
        existStudentByAFM(AFM: $AFM)  
    }
`; 

export const UPDATE_STUDENT_ALL_SEMESTER = gql`
    mutation updateSemesterForAll ($allStudents : [StudentInput!]) {
        updateSemesterForAll(allStudents : $allStudents)
    }
`; 

export const DELETE_STUDENT_BY_USERNAME = gql`
    mutation deleteStudentByUsername ($studentUsername : String!) {
        deleteStudentByUsername(studentUsername : $studentUsername)
    }
`;

export const GET_ALL_STUDENTS_GROUP_BY = gql`
    query {
        getAllStudentsByGroup {
            _id
            students {
                _id
                Personal_Info {
                    Personal_Information {
                        last_name 
                        first_name  
                        dot_father_name 
                        father_FirstName 
                        father_LastName 
                        maiden_name 
                        mother_FirstName 
                        mother_LastName 
                        spouse_name 
                        profession 
                        mother_profession 
                        father_profession 
                        family 
                        username 
                        personal_title 
                        website 
                        student_identity 
                        active 
                        fulfilled_military_obligations 
                        gender
                        sex 
                        notations   
                    } 
                    Student_Address {
                        road
                        rd_number 
                        city 
                        location 
                        country 
                        acting_address 
                        postcode 
                        telephone 
                        mobile_phone 
                        uth_email 
                        alternative_email 
                    }
                    Birth_Details {
                        gender
                        birth_location
                        birth_date
                        birth_prefecture 
                        birth_country
                    }    
                    Student_Identity {
                        identity_type
                        citizenship
                        citizen 
                        identity_number 
                        citizen_number
                        published_principle 
                        publish_date
                        nationality 
                        nationality_second 
                        male_record_num 
                        male_record_perf
                        male_record_gr
                        male_record_loc
                        male_record_country
                    } 
                    Student_Insurance {
                        AMKA_number 
                        AFM_number 
                        DOY_number 
                        AMKA_country 
                        AFM_country 
                    }
                    Third_Person_Contact_Details {
                        contact_type
                        person_FirstName
                        person_LastName
                        person_address
                        person_telephone
                        person_mobilephone
                        person_email
                    }                 
                } 
                Studentship_Info {
                    General_Information {
                        department
                        department_number
                        course
                        course_number
                        academic_email
                        student_situation
                        current_academic_year
                        current_academic_semester
                        current_attendance_period
                        academic_record_number
                        general_academic_record_number
                        academic_identity
                        course_program_part
                        course_program_subpart
                        education_number
                        second_course_program_part
                        second_course_program_subpart
                        comment_to_student
                        total_fees
                        sub_attendance
                    } 
                    Registration_Details {
                        registration_year
                        registration_semester
                        registration_period
                        registration_way
                    }            
                    Professor_Advisor_Details {
                        professorAdvisor_FirstName
                        professorAdvisor_LastName
                        professorAdvisor_Email
                    }
                    Grade_State {
                        totalNumber_successCourses 
                        totalNumber_failedCourses 
                        totalNumber_succesCompulsoryCourses 
                        totalNumber_failedCompulsoryCourses 
                        totalNumber_succesElectiveCourses 
                        totalNumber_failedElectiveCourses 
                        ECTS_compulsoryCourses 
                        ECTS_electiveCourses 
                        units_compulsoryCourses 
                        units_electiveCourses 
                        ECTS_total
                        units_total
                        grade_average
                    }
                }
            } 
        }
    }
`;