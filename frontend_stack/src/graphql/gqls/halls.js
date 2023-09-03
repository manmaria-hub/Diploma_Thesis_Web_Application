import {gql} from '@apollo/client';


export const ADD_NEW_HALL =gql`
    query($hallInput : Hall_Input) {
        addNewHall(hallInput : $hallInput) {
            Hall_category
            Hall_type
            Hall_floor
            Hall_code
            Hall_label 
            Hall_capacity 
            Hall_owner {
                owner_name
                owner_email
            }
            Hall_courses 
        }
    }
`;

export const FIND_HALL_BY_CODE = gql`
    query($hallCode : String) {
        findHallByCode (hallCode : $hallCode) {
            Hall_category
            Hall_type
            Hall_floor
            Hall_code
            Hall_label 
            Hall_capacity 
            Hall_owner {
                owner_name
                owner_email
            }
            Hall_courses 
        }
    }
`;

export const GET_ALL_EMPTY_PROFESSOR_OFFICES = gql`
    query {
        getAllEmptyProfessorsOffices {
            Hall_category
            Hall_type
            Hall_floor
            Hall_code
            Hall_label 
            Hall_capacity 
            Hall_owner {
                owner_name
                owner_email
            }
            Hall_courses 
        }
    }
`;

export const GET_ALL_HALLS = gql`
    query {
        getAllHalls {
            Hall_category
            Hall_type
            Hall_floor
            Hall_code
            Hall_label 
            Hall_capacity 
            Hall_owner {
                owner_name
                owner_email
            }
            Hall_courses 
        }
    }
`;

export const UPDATE_PROFESSOR_OFFICE_OWNER = gql`
mutation updateProfessorOfficeOwner($hallCode : String, $professor_name : String, $professor_email : String) {
    updateProfessorOfficeOwner(hallCode: $hallCode, professor_name: $professor_name, professor_email: $professor_email) {
        Hall_category
        Hall_type
        Hall_floor
        Hall_code
        Hall_label 
        Hall_capacity 
        Hall_owner {
            owner_name
            owner_email
        }
        Hall_courses         
    }
}
`;

export const GET_AMPHITHEATRES_NAMES = gql`
    query {
        getAllAmphitheatres
    }
`;

export const GET_HALL_CODES = gql`
    query {
        getAllHallCodes
    }
`;

export const GET_STUDY_AND_LAB_HALLS = gql`
    query {
        getAllStudyAndLabHalls {
            Hall_category
            Hall_type
            Hall_code
            Hall_floor
            Hall_capacity
            Hall_label
            Hall_courses
        }
    }
`;