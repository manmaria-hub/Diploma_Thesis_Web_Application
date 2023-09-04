// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Halls = gql`  
    type OWNER_type {
        owner_name : String
        owner_email : String        
    }

    type Hall_type {
        _id : ID!
        Hall_category : String
        Hall_type : String
        Hall_floor : String
        Hall_code : String
        Hall_label : String
        Hall_capacity : String
        Hall_owner : OWNER_type
        Hall_courses : [String]
    }

    input owner_Input {
        owner_name : String
        owner_email : String        
    }

    input Hall_Input {
        Hall_category : String
        Hall_type : String
        Hall_floor : String
        Hall_code : String
        Hall_label : String
        Hall_capacity : String
        Hall_owner : owner_Input
        Hall_courses : [String]
    }     

    type Query {
        addNewHall(hallInput : Hall_Input) : Hall_type
        getAllAmphitheatres: [String]
        getAllHallCodes : [String]
        findHallByCode(hallCode : String) : Hall_type
        getAllStudyAndLabHalls : [Hall_type]
        getAllEmptyProfessorsOffices : [Hall_type]     
        getAllHalls : [Hall_type]   
    }
    type Mutation {
        updateProfessorOfficeOwner(hallCode : String, professor_name : String, professor_email:String) : Hall_type
    }
`
module.exports = Halls;