import {gql} from '@apollo/client';

//REGISTER MUTATION
export const REGISTER_USER = gql`
    mutation register($userInput : UserInput!) {
        register(userInput : $userInput) {
            first_name
            last_name
            username
            email
            password
        }
    }
`

// LOGIN QUERY
export const LOGIN_USER = gql`
    query login($username: String!, $password : String!) {
        login(username: $username, password : $password) {
            first_name
            last_name
            username 
            email
            role
            createdAt 
            token
        }
    }
`;