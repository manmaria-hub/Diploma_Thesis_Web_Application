const {gql} = require('apollo-server'); 

const User = gql`
    type User {
        first_name : String!
        last_name : String!
        email : String!
        username : String!
        role : String! 
        token : String!
        createdAt : String!
    }

    type Query {
        getUsers: [User]!
        login(username: String!, password: String!): User!
    }
    type Mutation {
        register(
            first_name : String!
            last_name : String!
            email : String!
            username : String!
            role : String!
            password : String!
            confirm : String!
        ): User!
    }
`;

module.exports = User;