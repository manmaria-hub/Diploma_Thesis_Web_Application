import {gql} from '@apollo/client';

export const CREATE_PROGRAM = gql`
    mutation createNewProgram($programInput : program_Input!) {
        createNewProgram(programInput : $programInput) { 
            ... on Program_OK {                 
                code
                OK_message
            }
            ... on Program_Error {
                code
                error_message
            }
        }
    }
`; 


export const FIND_PROGRAM = gql`
    query findProgram($program_category : String!, $program_study_level : String!, $program_period : String!, $program_academic_year : String!, $program_state : String!) {
        findProgram(program_category : $program_category, program_study_level : $program_study_level, program_period : $program_period, program_academic_year : $program_academic_year, program_state : $program_state) { 
            program_category 
            program_study_level 
            program_period 
            program_academic_year 
            program_state 
            main_program {
                course_code 
                course_name 
                day
                date 
                fromHour 
                toHour 
                type 
                Hall {
                    value
                    label
                }
                instructor {
                    value
                    label
                }
            }
        }
    }
`; 