const {gql} = require('apollo-server'); 

const Student = gql`
    type Student {
        Student_Insurance_AMKA_number: String
          Student_Insurance_AFM_number: String
          Student_Insurance_DOY_number: String
          Student_Insurance_AMKA_country:String
          Student_Insurance_AFM_country: String
          Personal_Information_last_name: String
          Personal_Information_first_name: String
          Personal_Information_dot_father_name: String
          Personal_Information_father_FirstName: String
          Personal_Information_father_LastName: String 
          Personal_Information_maiden_name: String
          Personal_Information_mother_FirstName: String
          Personal_Information_mother_LastName: String
          Personal_Information_spouse_name: String
          Personal_Information_profession: String
          Personal_Information_mother_profession: String
          Personal_Information_father_profession: String
          Personal_Information_family: String
          Personal_Information_username: String
          Personal_Information_personal_title: String
          Personal_Information_website: String
          Personal_Information_student_identity: String
          Personal_Information_active: Boolean
          Personal_Information_military_obligations: String
          Personal_Information_gender: String
          Personal_Information_sex: String
          Personal_Information_notations: String
          Birth_Details_birth_date: String
          Birth_Details_gender: String
          Birth_Details_birth_prefecture: String
          Birth_Details_birth_location: String
          Birth_Details_birth_country: String
          Student_Identity_identity_type: String
          Student_Identity_citizenship: [String]
          Student_Identity_citizen: String
          Student_Identity_identity_number: String
          Student_Identity_citizen_number:String
          Student_Identity_published_principle: String
          Student_Identity_publish_date: String
          Student_Identity_nationality: [String]
          Student_Identity_nationality_second: [String]
          Student_Identity_male_record_num: String
          Student_Identity_male_record_perf: String
          Student_Identity_male_record_gr: String
          Student_Identity_male_record_loc: String
          Student_Identity_male_record_country: String
          Student_Address_road: String
          Student_Address_rd_number: String
          Student_Address_city: String
          Student_Address_location: String
          Student_Address_country: String
          Student_Address_acting_address: String
          Student_Address_postcode: String
          Student_Address_telephone: String
          Student_Address_mobile_phone: String
          Student_Address_uth_email: String
          Student_Address_alternative_email: String
          Third_Person_Contact_Details_contact_type: String
          Third_Person_Contact_Details_person_FirstName: String
          Third_Person_Contact_Details_person_LastName: String
          Third_Person_Contact_Details_person_address: String
          Third_Person_Contact_Details_person_telephone: String
          Third_Person_Contact_Details_person_mobilephone: String
          Third_Person_Contact_Details_person_email: String
          General_Information_department: String
          General_Information_department_number: String
          General_Information_course: String
          General_Information_course_number: String
          General_Information_academic_email: String
          General_Information_student_situation: Boolean
          General_Information_current_academic_year: Int
          General_Information_current_academic_semester: String
          General_Information_current_attendance_period: String
          General_Information_academic_record_number: String
          General_Information_general_record_number: String
          General_Information_academic_identity: String
          General_Information_education_number: String
          General_Information_course_program_part: String
          General_Information_course_program_subpart: String
          General_Information_second_course_program_part: String
          General_Information_second_program_subpart: String
          General_Information_comment_to_student: String
          General_Information_total_fees: String
          General_Information_sub_attendance: Boolean
          Registration_Details_registration_year: String
          Registration_Details_registration_semester: String
          Registration_Details_registration_period: String
          Registration_Details_registration_way: String
          Studentship_Info_Advisor_professorAdvisor_FirstName: String
          Studentship_Info_Advisor_professorAdvisor_LastName: String
          Studentship_Info_Advisor_professorAdvisor_Email: String
    }

    input Student_Input {
        Student_Insurance_AMKA_number: String
          Student_Insurance_AFM_number: String
          Student_Insurance_DOY_number: String
          Student_Insurance_AMKA_country:String
          Student_Insurance_AFM_country: String
          Personal_Information_last_name: String
          Personal_Information_first_name: String
          Personal_Information_dot_father_name: String
          Personal_Information_father_FirstName: String
          Personal_Information_father_LastName: String 
          Personal_Information_maiden_name: String
          Personal_Information_mother_FirstName: String
          Personal_Information_mother_LastName: String
          Personal_Information_spouse_name: String
          Personal_Information_profession: String
          Personal_Information_mother_profession: String
          Personal_Information_father_profession: String
          Personal_Information_family: String
          Personal_Information_username: String
          Personal_Information_personal_title: String
          Personal_Information_website: String
          Personal_Information_student_identity: String
          Personal_Information_active: Boolean
          Personal_Information_military_obligations: String
          Personal_Information_gender: String
          Personal_Information_sex: String
          Personal_Information_notations: String
          Birth_Details_birth_date: String
          Birth_Details_gender: String
          Birth_Details_birth_prefecture: String
          Birth_Details_birth_location: String
          Birth_Details_birth_country: String
          Student_Identity_identity_type: String
          Student_Identity_citizenship: [String]
          Student_Identity_citizen: String
          Student_Identity_identity_number: String
          Student_Identity_citizen_number:String
          Student_Identity_published_principle: String
          Student_Identity_publish_date: String
          Student_Identity_nationality: [String]
          Student_Identity_nationality_second: [String]
          Student_Identity_male_record_num: String
          Student_Identity_male_record_perf: String
          Student_Identity_male_record_gr: String
          Student_Identity_male_record_loc: String
          Student_Identity_male_record_country: String
          Student_Address_road: String
          Student_Address_rd_number: String
          Student_Address_city: String
          Student_Address_location: String
          Student_Address_country: String
          Student_Address_acting_address: String
          Student_Address_postcode: String
          Student_Address_telephone: String
          Student_Address_mobile_phone: String
          Student_Address_uth_email: String
          Student_Address_alternative_email: String
          Third_Person_Contact_Details_contact_type: String
          Third_Person_Contact_Details_person_FirstName: String
          Third_Person_Contact_Details_person_LastName: String
          Third_Person_Contact_Details_person_address: String
          Third_Person_Contact_Details_person_telephone: String
          Third_Person_Contact_Details_person_mobilephone: String
          Third_Person_Contact_Details_person_email: String
          General_Information_department: String
          General_Information_department_number: String
          General_Information_course: String
          General_Information_course_number: String
          General_Information_academic_email: String
          General_Information_student_situation: Boolean
          General_Information_current_academic_year: Int
          General_Information_current_academic_semester: String
          General_Information_current_attendance_period: String
          General_Information_academic_record_number: String
          General_Information_general_record_number: String
          General_Information_academic_identity: String
          General_Information_education_number: String
          General_Information_course_program_part: String
          General_Information_course_program_subpart: String
          General_Information_second_course_program_part: String
          General_Information_second_program_subpart: String
          General_Information_comment_to_student: String
          General_Information_total_fees: String
          General_Information_sub_attendance: Boolean
          Registration_Details_registration_year: String
          Registration_Details_registration_semester: String
          Registration_Details_registration_period: String
          Registration_Details_registration_way: String
          Studentship_Info_Advisor_professorAdvisor_FirstName: String
          Studentship_Info_Advisor_professorAdvisor_LastName: String
          Studentship_Info_Advisor_professorAdvisor_Email: String
    }

    type Student_OK {
        student : Student
        code : String
        OKmessage : String
    }

    type Query {
        existStudentByAEM(AEM : String) : Boolean
        existStudentByUsername(username : String) : Boolean
        existStudentByStudentIdentity(student_identity : String) : Boolean
        existStudentByUthEmail(uth_email: String) : Boolean
        existStudentByAMKA(AMKA : String) : Boolean
        existStudentByAFM(AFM : String) : Boolean
        
        getConnectedStudent(username : String, email : String) : Student_OK 
    }
 
    type Mutation {
        updateStudentByUsername(username : String, editStudent : Student_Input) : Student
        updateSemesterForAll(allStudents : [Student_Input!]) : String
        addNewStudent(studentInput : Student_Input ): Student!
    }
`;

module.exports = Student;