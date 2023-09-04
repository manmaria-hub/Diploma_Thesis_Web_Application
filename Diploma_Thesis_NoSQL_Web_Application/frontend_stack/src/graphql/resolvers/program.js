import {CREATE_PROGRAM, FIND_PROGRAM} from '../gqls/program';
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   MUTATIONS   ********************//    

const create_new_program = (newProgramInput) => {
    return apolloClient.mutate({
        mutation : CREATE_PROGRAM,
        variables : {programInput : newProgramInput },
        fetchPolicy : 'no-cache'
    })
}  

//********************   QUERIES   ********************//    
 
const find_program = (program_category_input, program_study_level_input, program_period_input, program_academic_year_input, program_state_input) => {
    return apolloClient.mutate({
        mutation : FIND_PROGRAM,
        variables : {program_category : program_category_input, program_study_level : program_study_level_input, program_period : program_period_input, program_academic_year : program_academic_year_input, program_state : program_state_input},
        fetchPolicy : 'no-cache'
    })
}  

const programResolvers = {
    create_new_program,
    find_program 
}

export default programResolvers;
