// SPECIALIZATION FIELDS TYPEDEFS

const {gql} = require('apollo-server-express');

const SpecializationFields = gql`
    type SpecializationFields {
        _id : ID!
        fieldName : String
        fieldCode : String
        graduate_level : String
        postgraduate_studySubject : String
        semesterList : [String]
        coursesList : [String]
    }

    input SpecializationFields_Input {
        fieldName : String
        fieldCode : String 
        graduate_level : String
        postgraduate_studySubject : String
        semesterList : [String]
        coursesList : [String]
    }

    type SpecializationFields_OK {
        code : String
        OK_message : String
    }
    
    type SpecializationFields_QueryOK {
        data : [String]
        code : String
        QueryOK_message : String
    }

    type SpecializationFields_NameAndCodes {
        fieldName: String
        fieldCode: String
    }
    
    type SpecializationFields_error {        
        code : String
        error_message : String
    }

    type SpecializationFields_QueryError {        
        code : String
        QueryError_message : String
    }
 
    union SpecializationFieldsState = SpecializationFields_OK | SpecializationFields_error | SpecializationFields_QueryOK | SpecializationFields_QueryError
 
    type Query {
        insertSpecializationFields : SpecializationFieldsState
        getGraduateAndSubjectLevels : SpecializationFieldsState
        findSemesterOptionsByGraduateSpecializationField(gradLevel : String, studyField : String) : [String]
        getSpecializationFieldsOfStudyCategory(studyCategory:String, postgraduateStudySubject:String) : [SpecializationFields_NameAndCodes]
        getSpecializationFieldCode(specFieldName: String) : String
    }
`; 

module.exports = SpecializationFields;