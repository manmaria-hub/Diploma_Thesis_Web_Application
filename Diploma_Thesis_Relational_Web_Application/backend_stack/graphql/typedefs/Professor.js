const {gql} = require('apollo-server'); 

const Professor = gql`
    type Professor {
        PERSONAL_INFO_first_name : String!
        PERSONAL_INFO_last_name : String!
        PERSONAL_INFO_father_FirstName : String!
        PERSONAL_INFO_father_LastName : String!
        PERSONAL_INFO_mother_FirstName : String!
        PERSONAL_INFO_mother_LastName : String!
        PERSONAL_INFO_maiden_name : String!
        PERSONAL_INFO_family : String!
        PERSONAL_INFO_gender : String!
        PERSONAL_INFO_active : String!
        ACADEMIC_INFO_departmentName: String!
        ACADEMIC_INFO_category : String!
        ACADEMIC_INFO_professor_type : String!
        ACADEMIC_INFO_position : String!
        ACADEMIC_INFO_office : String!
        ACADEMIC_INFO_office_hours : String!
        ACADEMIC_INFO_office_email : String!
        ACADEMIC_INFO_office_telephone : String!
        ACADEMIC_INFO_specialization : String!
        ACADEMIC_INFO_diploma : String!
        ACADEMIC_INFO_doctorat : String!
        ACADEMIC_INFO_website: String!
        ACADEMIC_INFO_CV : String!
        ACADEMIC_INFO_scholar : String!
        ACADEMIC_INFO_academic_email: String!
        ACADEMIC_INFO_username : String!    
        INSURANCE_INFO_AMKA: String!
        INSURANCE_INFO_AMKA_country : String!
        INSURANCE_INFO_AFM : String!
        INSURANCE_INFO_AFM_country : String!
        INSURANCE_INFO_DOY : String!
        INSURANCE_INFO_nationality : String!
        INSURANCE_INFO_identity_number : String!
        INSURANCE_INFO_identity_type : String! 
        COMMUNICATION_DETAILS_telephone : String!
        COMMUNICATION_DETAILS_mobile : String!
        COMMUNICATION_DETAILS_alternative_email : String!
        COMMUNICATION_DETAILS_city: String!
        COMMUNICATION_DETAILS_road : String!
        COMMUNICATION_DETAILS_number : String!
        COMMUNICATION_DETAILS_region: String!
        COMMUNICATION_DETAILS_postcode : String!
    }

    type Professor_result {
        professor : Professor
        message : String
    }

    type Query {
        getAllProfessors: [Professor]!
        getConnectedProfessor(professor_username: String!, professor_email : String!) : Professor_result
        fillProfessorsDatabase : String 
    }  
`;

module.exports = Professor;