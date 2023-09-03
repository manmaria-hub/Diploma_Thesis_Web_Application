import {gql} from '@apollo/client';

export const ADD_NEW_PROFESSOR = gql`
    query  ($professorToSubmit : Professor_Input) {
        addNewProfessor (professorToSubmit : $professorToSubmit) {
            _id
            PERSONAL_INFO {
                first_name 
                last_name
                father_FirstName 
                father_LastName
                mother_FirstName
                mother_LastName
                maiden_name
                family  
                gender 
                active  
            }
            ACADEMIC_INFO {
                office
            }
        }            
    }
`;

export const DELETE_PROFESSOR_BY_ID = gql`
    query  ($professorID : String) {
        deleteProfessorById (professorID : $professorID)  
    }
`;

export const DELETE_PROFESSOR_BY_USERNAME = gql`
    query  ($professorUsername : String) {
        deleteProfessorByUsername (professorUsername : $professorUsername)  
    }
`;

export const GET_ALL_PROFESSORS = gql`
    query {
        getAllProfessors {
            PERSONAL_INFO {
                first_name 
                last_name
                father_FirstName   
                active  
            }
            ACADEMIC_INFO {
                category
                professor_type
                office
                username
                academic_email
                office_telephone
            }
        } 
    }
`;

export const GET_CONNECTED_PROFESSOR = gql`
    query ($professor_username : String!, $professor_email : String!) {
        getConnectedProfessor (professor_username : $professor_username, professor_email : $professor_email)  { 
            professor {
                PERSONAL_INFO {
                    first_name 
                    last_name
                    father_FirstName 
                    father_LastName
                    mother_FirstName
                    mother_LastName
                    maiden_name
                    family  
                    gender 
                    active  
                }
                ACADEMIC_INFO {
                    departmentName 
                    category 
                    professor_type 
                    position
                    office
                    office_hours
                    office_email
                    office_telephone 
                    specialization 
                    doctorat 
                    website 
                    CV  
                    scholar 
                    academic_email  
                    username  
                }
                INSURANCE_INFO {
                    AMKA 
                    AMKA_country 
                    AFM 
                    AFM_country 
                    DOY
                    nationality 
                    identity_number
                    identity_type
                }
                COMMUNICATION_DETAILS {
                    telephone 
                    mobile
                    alternative_email
                    city
                    road
                    number
                    region
                    postcode 
                }
            }
        } 
    }
`; 

export const EXIST_PROFESSOR_BY_UTH_EMAIL = gql`
    query($uth_email: String!) {
        existBy_ProfessorUthEmail(uth_email: $uth_email)  
    }
`;

export const EXIST_PROFESSOR_BY_USERNAME = gql`
    query($username: String!) {
        existBy_ProfessorUsername(username: $username)  
    }
`;

export const EXIST_PROFESSOR_BY_AMKA = gql`
    query($AMKA: String!) {
        existBy_ProfessorAMKA(AMKA: $AMKA)  
    }
`;

export const EXIST_PROFESSOR_BY_AFM = gql`
    query($AFM: String!) {
        existBy_ProfessorAFM(AFM: $AFM)  
    }
`;

export const UPDATE_PROFESSOR = gql` 
    query ($username : String!, $editProfessor : Professor_Input){
        updateProfessorByUsername(username : $username, editProfessor : $editProfessor) {
                _id
                PERSONAL_INFO {
                    first_name
                    last_name
                    father_FirstName 
                    father_LastName
                    mother_FirstName
                    mother_LastName 
                    maiden_name 
                    family  
                    gender 
                    active   
                }
                ACADEMIC_INFO {
                    departmentName 
                    category
                    professor_type
                    position
                    office
                    office_hours 
                    office_email 
                    office_telephone  
                    specialization  
                    diploma  
                    doctorat  
                    website  
                    CV  
                    scholar  
                    academic_email 
                }
                INSURANCE_INFO {
                    AMKA 
                    AMKA_country  
                    AFM 
                    AFM_country 
                    DOY
                    nationality 
                    identity_number
                    identity_type
                }
                COMMUNICATION_DETAILS {
                    telephone 
                    mobile  
                    alternative_email  
                    city  
                    road 
                    number 
                    region 
                    postcode 
                }
            
        }
    }
`;

export const GET_ALL_PROFESSORS_BY_PROFESSOR_TYPE = gql`
    query {
        getAllProfessorsByGroup {
            _id
            professors {
                _id
                PERSONAL_INFO {
                    first_name
                    last_name
                    father_FirstName 
                    father_LastName
                    mother_FirstName
                    mother_LastName 
                    maiden_name 
                    family  
                    gender 
                    active   
                }
                ACADEMIC_INFO {
                    departmentName 
                    category
                    professor_type
                    position
                    office
                    office_hours 
                    office_email 
                    office_telephone  
                    specialization  
                    diploma  
                    doctorat  
                    website  
                    CV  
                    scholar  
                    academic_email 
                }
                INSURANCE_INFO {
                    AMKA 
                    AMKA_country  
                    AFM 
                    AFM_country 
                    DOY
                    nationality 
                    identity_number
                    identity_type
                }
                COMMUNICATION_DETAILS {
                    telephone 
                    mobile  
                    alternative_email  
                    city  
                    road 
                    number 
                    region 
                    postcode 
                }
            } 
        }
    }
`;