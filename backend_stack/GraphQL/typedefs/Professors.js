// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Professor = gql`  

    type PERSONAL_INFO_type {
        first_name : String
        last_name : String
        father_FirstName : String
        father_LastName: String
        mother_FirstName: String
        mother_LastName: String
        maiden_name: String
        family :String
        gender : String
        active :  Boolean 
    }

    type ACADEMIC_INFO_type {
        departmentName : String
        category : String
        professor_type : String
        position: String
        office: String
        office_hours: String
        office_email: String
        office_telephone :String
        specialization : String
        diploma :  String 
        doctorat :String
        website : String
        CV :  String 
        scholar : String
        academic_email :  String 
        username :String 
    }

    type INSURANCE_INFO_type {
        AMKA : String
        AMKA_country : String
        AFM : String
        AFM_country : String
        DOY: String
        nationality : String
        identity_number: String
        identity_type: String
    }

    type  COMMUNICATION_DETAILS_type {
        telephone : String
        mobile : String
        alternative_email : String
        city : String
        road: String
        number: String
        region: String
        postcode : String
    }

    type Professor {
        PERSONAL_INFO : PERSONAL_INFO_type
        ACADEMIC_INFO : ACADEMIC_INFO_type
        INSURANCE_INFO : INSURANCE_INFO_type
        COMMUNICATION_DETAILS : COMMUNICATION_DETAILS_type
        _id : ID
    }

    input PERSONAL_INFO_Input {
        first_name : String
        last_name : String
        father_FirstName : String
        father_LastName: String
        mother_FirstName: String
        mother_LastName: String
        maiden_name: String
        family :String
        gender : String
        active :  Boolean 
    }

    input ACADEMIC_INFO_Input {
        departmentName : String
        category : String
        professor_type : String
        position: String
        office: String
        office_hours: String
        office_email: String
        office_telephone :String
        specialization : String
        diploma :  String 
        doctorat :String
        website : String
        CV :  String 
        scholar : String
        academic_email :  String 
        username :String 
    }

    input INSURANCE_INFO_Input {
        AMKA : String
        AMKA_country : String
        AFM : String
        AFM_country : String
        DOY: String
        nationality : String
        identity_number: String
        identity_type: String
    } 

    input  COMMUNICATION_DETAILS_Input {
        telephone : String
        mobile : String
        alternative_email : String
        city : String
        road: String
        number: String
        region: String
        postcode : String
    }

    input Professor_Input {
        PERSONAL_INFO : PERSONAL_INFO_Input
        ACADEMIC_INFO : ACADEMIC_INFO_Input 
        INSURANCE_INFO : INSURANCE_INFO_Input 
        COMMUNICATION_DETAILS : COMMUNICATION_DETAILS_Input 
    }

    type Professor_result {
        professor : Professor
        message : String
    }

    type Professor_groupBy {
        _id : String
        professors : [Professor]
    }

    type Query {
        addNewProfessor(professorToSubmit : Professor_Input) :  Professor   
        deleteProfessorById(professorID : String) : String 
        deleteProfessorByUsername(professorUsername : String) : String 
        updateProfessorByUsername(username : String, editProfessor : Professor_Input) : Professor
        getConnectedProfessor(professor_username: String!, professor_email : String!) : Professor_result
        getAllProfessors : [Professor] 
        existBy_ProfessorUsername(username : String) : Boolean
        existBy_ProfessorUthEmail(uth_email : String) : Boolean 
        existBy_ProfessorAMKA(AMKA : String) : Boolean
        existBy_ProfessorAFM(AFM : String) : Boolean
        getAllProfessorsByGroup : [Professor_groupBy] 
    } 

`
module.exports = Professor;