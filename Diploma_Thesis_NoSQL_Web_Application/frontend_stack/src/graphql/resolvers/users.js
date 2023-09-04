import {REGISTER_USER, LOGIN_USER} from '../gqls/user';
import { apolloClient } from '../../ApolloClient/apolloClient';

// Calling the corresponding resolvers from the backend stack

//********************   QUERIES   ********************//    

const login_user = (usernameInput, passwordInput) => {
    return apolloClient.query({
        query : LOGIN_USER,
        variables : {username : usernameInput, password : passwordInput },
        fetchPolicy : 'no-cache'
    })
}


//********************   MUTATIONS   ********************//    

const register_user = (user) => {
    return apolloClient.mutate({
        mutation : REGISTER_USER,
        variables : {userInput : user },
        fetchPolicy : 'no-cache'
    })
}


const userResolvers = {
    login_user,
    register_user
}

export default userResolvers;
