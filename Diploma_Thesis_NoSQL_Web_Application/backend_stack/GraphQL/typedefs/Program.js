// COURSES TYPEDEFS

const {gql} = require('apollo-server-express');

const Program = gql`
    type instructor_Object {  
        value : String
        label : String
    }

    type hall_Object {  
        value : String
        label : String
    }

    type main_program_Type {
        course_code : String
        course_name : String
        day : String
        date : String
        fromHour : String
        toHour : String
        type : String
        Hall : [hall_Object]
        instructor : [instructor_Object]
    }

    type program {
        _id : ID
        program_category : String
        program_study_level : String
        program_period : String
        program_academic_year : String
        program_state : String
        main_program : [main_program_Type]
    }
    
    input instructor_Object_Input { 
         value : String
         label : String
    } 
    
    input hall_Object_Input {  
        value : String
        label : String
    }

    input main_program_Input {
        course_code : String
        course_name : String
        day : String
        date : String
        fromHour : String
        toHour : String
        type : String
        Hall : [hall_Object_Input]
        instructor : [instructor_Object_Input]
    }

    input program_Input { 
        program_category : String
        program_study_level : String
        program_period : String
        program_academic_year : String
        program_state : String
        main_program : [main_program_Input]
    }

    type Program_SimpleOK {
        code : String
        SimpleOK_message : String
    }

    type Program_OK {
        program : program
        code : String
        OK_message : String
    }

    type Program_Error {
        code : String
        error_message : String
    }

    union ProgramState = Program_SimpleOK | Program_OK | Program_Error

    type Query {
        findProgram(program_category : String, program_study_level : String, program_period : String, program_academic_year : String, program_state : String) : program
    }

    type Mutation {
        createNewProgram(programInput : program_Input) : ProgramState
    } 

`
module.exports = Program;