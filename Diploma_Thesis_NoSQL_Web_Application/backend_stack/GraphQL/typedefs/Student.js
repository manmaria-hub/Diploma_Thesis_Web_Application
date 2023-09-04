// *** Student object type
// 
// The student object type represents the object of a department's student, 
// it consists of fields that define the properties of the corresponding 
// object and defines the structure of the data of the student that can
// be returned in the GraphQL API

const {gql} = require('apollo-server-express'); 

const Student = gql`

    type Student_Insurance_type {
        AMKA_number : String
        AFM_number : String
        DOY_number : String
        AMKA_country : String
        AFM_country : String
    }

    type Personal_Information_type {
        last_name : String
        first_name : String
        dot_father_name : String
        father_FirstName : String
        father_LastName : String
        maiden_name : String
        mother_FirstName : String
        mother_LastName : String
        spouse_name : String
        profession : String
        mother_profession : String
        father_profession : String
        family : String
        username : String
        personal_title : String
        website : String
        student_identity : String
        active : Boolean
        fulfilled_military_obligations : String
        gender : String
        sex : String
        notations : String
    }

    type Birth_Details_type {
        birth_date: String
        gender: String
        birth_prefecture: String
        birth_country: String
        birth_location: String
    }

    type Student_Identity_type {
        identity_type: String
        citizenship: [String]
        citizen: String
        identity_number: String
        citizen_number: String
        published_principle: String
        publish_date: String 
        nationality: [String]
        nationality_second: [String]
        male_record_num: String
        male_record_perf: String
        male_record_gr: String
        male_record_loc: String
        male_record_country: String
    } 

    type Student_Address_type {
        road: String
        rd_number: String
        city: String
        location: String
        country: String
        acting_address: String
        postcode: String
        telephone: String
        mobile_phone: String
        uth_email: String
        alternative_email: String
    }

    type Third_Person_Contact_Details_type {
        contact_type: String
        person_FirstName: String
        person_LastName: String
        person_address: String
        person_telephone: String
        person_mobilephone: String
        person_email: String
    }

    type Personal_Info_type {
        Student_Insurance : Student_Insurance_type
        Personal_Information : Personal_Information_type
        Birth_Details : Birth_Details_type
        Student_Identity : Student_Identity_type
        Student_Address : Student_Address_type
        Third_Person_Contact_Details : Third_Person_Contact_Details_type
    }

    type General_Information_type {
        department: String
        department_number: String
        course: String
        course_number: String
        academic_email: String
        student_situation: Boolean
        current_academic_year: Int
        current_academic_semester: String
        current_attendance_period: String
        academic_record_number: String
        general_academic_record_number: String
        academic_identity: String
        course_program_part: String
        course_program_subpart: String
        education_number: String
        second_course_program_part: String
        second_course_program_subpart: String
        comment_to_student: String
        total_fees: String
        sub_attendance: Boolean
    }

    type Registration_Details_type {
        registration_year: String
        registration_semester: String
        registration_period: String
        registration_way: String
    }

    type Professor_Advisor_Details_type {
        professorAdvisor_FirstName: String
        professorAdvisor_LastName: String
        professorAdvisor_Email: String
    }

    type Grade_State_type {
        totalNumber_successCourses: Int
        totalNumber_failedCourses: Int
        totalNumber_succesCompulsoryCourses: Int
        totalNumber_failedCompulsoryCourses: Int
        totalNumber_succesElectiveCourses: Int
        totalNumber_failedElectiveCourses: Int
        ECTS_compulsoryCourses: Int
        ECTS_electiveCourses: Int
        units_compulsoryCourses: Int
        units_electiveCourses: Int
        ECTS_total: Int
        units_total: Int
        grade_average: Float
    }

    type Studentship_Info_type {
        General_Information : General_Information_type
        Registration_Details : Registration_Details_type
        Professor_Advisor_Details : Professor_Advisor_Details_type
        Grade_State : Grade_State_type
    }
    
    type Student {
        _id: ID!
        Personal_Info : Personal_Info_type
        Studentship_Info : Studentship_Info_type
    } 

    input Student_Insurance_type_Input {
        AMKA_number : String
        AFM_number : String
        DOY_number : String
        AMKA_country : String
        AFM_country : String
    }

    input Personal_Information_type_Input {
        last_name : String
        first_name : String
        dot_father_name : String
        father_FirstName : String
        father_LastName : String
        maiden_name : String
        mother_FirstName : String
        mother_LastName : String
        spouse_name : String
        profession : String
        mother_profession : String
        father_profession : String
        family : String
        username : String
        personal_title : String
        website : String
        student_identity : String
        active : Boolean
        fulfilled_military_obligations : String
        gender : String
        sex : String
        notations : String
    }

    input Birth_Details_type_Input {
        birth_date: String
        gender: String
        birth_prefecture: String
        birth_country: String
        birth_location: String
    }

    input Student_Identity_type_Input {
        identity_type: String
        citizenship: [String]
        citizen: String
        identity_number: String
        citizen_number: String
        published_principle: String
        publish_date: String 
        nationality: [String]
        nationality_second: [String]
        male_record_num: String
        male_record_perf: String
        male_record_gr: String
        male_record_loc: String
        male_record_country : String
    } 

    input Student_Address_type_Input {
        road: String
        rd_number: String
        city: String
        location: String
        country: String
        acting_address: String
        postcode: String
        telephone: String
        mobile_phone: String
        uth_email: String
        alternative_email: String
    }

    input Third_Person_Contact_Details_type_Input {
        contact_type: String
        person_FirstName: String
        person_LastName: String
        person_address: String
        person_telephone: String
        person_mobilephone: String
        person_email: String
    }

    input Personal_Info_type_Input {
        Student_Insurance : Student_Insurance_type_Input
        Personal_Information : Personal_Information_type_Input
        Birth_Details : Birth_Details_type_Input
        Student_Identity : Student_Identity_type_Input
        Student_Address : Student_Address_type_Input
        Third_Person_Contact_Details : Third_Person_Contact_Details_type_Input
    }

    input General_Information_type_Input {
        department: String
        department_number: String
        course: String
        course_number: String
        academic_email: String
        student_situation: Boolean
        current_academic_year: Int
        current_academic_semester: String
        current_attendance_period: String
        academic_record_number: String
        general_academic_record_number: String
        academic_identity: String
        course_program_part: String
        course_program_subpart: String
        education_number: String
        second_course_program_part: String
        second_course_program_subpart: String
        comment_to_student: String
        total_fees: String
        sub_attendance: Boolean
    }

    input Registration_Details_type_Input {
        registration_year: String
        registration_semester: String
        registration_period: String
        registration_way: String
    }

    input Professor_Advisor_Details_type_Input {
        professorAdvisor_FirstName: String
        professorAdvisor_LastName: String
        professorAdvisor_Email: String
    }

    input Grade_State_type_Input {
        totalNumber_successCourses: Int
        totalNumber_failedCourses: Int
        totalNumber_succesCompulsoryCourses: Int
        totalNumber_failedCompulsoryCourses: Int
        totalNumber_succesElectiveCourses: Int
        totalNumber_failedElectiveCourses: Int
        ECTS_compulsoryCourses: Int
        ECTS_electiveCourses: Int
        units_compulsoryCourses: Int
        units_electiveCourses: Int
        ECTS_total: Int
        units_total: Int
        grade_average: Float
    }

    input Studentship_Info_type_Input {
        General_Information : General_Information_type_Input
        Registration_Details : Registration_Details_type_Input
        Professor_Advisor_Details : Professor_Advisor_Details_type_Input
        Grade_State : Grade_State_type_Input
    }

    input StudentInput { 
        Personal_Info : Personal_Info_type_Input
        Studentship_Info : Studentship_Info_type_Input
    } 
         
    type Student_OK {
        student : Student
        code : String
        OKmessage : String
    }

    type MultipleStudents_OK { 
        code: String
        OK_MultipleMessage : String
    }

    type Student_Error { 
        code : String
        errormessage : String
    }

    type Student_groupBy {
        _id : String
        students : [Student]        
    }

    union StudentState = Student_OK | Student_Error | MultipleStudents_OK

    type Query {
        existStudentByAEM(AEM : String) : Boolean
        existStudentByUsername(username : String) : Boolean
        existStudentByUthEmail(uth_email : String) : Boolean
        existStudentBystudentIdentity(student_identity : String) : Boolean
        existStudentByAMKA(AMKA : String) : Boolean
        existStudentByAFM(AFM : String) : Boolean
        findStudent(username: String) : Student
        getConnectedStudent(username : String, email : String) : Student_OK 
        getAllStudents : [Student]
        getAllStudentsByGroup : [Student_groupBy] 
    }
    
    type Mutation {
        addStudent(studentInput : StudentInput) : StudentState
        updateStudentByUsername(username : String, editStudent : StudentInput) : Student
        updateSemesterForAll(allStudents : [StudentInput!]) : String 
        deleteStudentByUsername(studentUsername : String) : String
        addMultipleStudents(input : [StudentInput]) : StudentState
    }
`;

module.exports = Student;
