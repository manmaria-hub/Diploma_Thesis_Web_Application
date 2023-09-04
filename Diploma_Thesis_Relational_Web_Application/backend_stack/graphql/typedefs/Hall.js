// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Halls = gql`  
    type Hall { 
        Hall_category : String
        Hall_type : String
        Hall_floor : String
        Hall_code : String
        Hall_label : String
        Hall_capacity : String
        Hall_owner_owner_name : String
        Hall_owner_owner_email : String 
    }
 
    input Hall_Input {
        Hall_category : String
        Hall_type : String
        Hall_floor : String
        Hall_code : String
        Hall_label : String
        Hall_capacity : String
        Hall_owner_owner_name : String
        Hall_owner_owner_email : String 
    }     

    type Query {
        addNewHall(hallInput : Hall_Input!) : Hall
        getAllAmphitheatres: [String]
        getAllHallCodes : [String]
        findHallByCode(hallCode : String) : Hall
        getAllStudyAndLabHalls : [Hall]
        getAllEmptyProfessorsOffices : [Hall] 
        fillHallDatabase : String  
    }
    type Mutation {
        updateProfessorOfficeOwner(hallCode : String, professor_name : String, professor_email:String) : Hall
    }
`
module.exports = Halls;