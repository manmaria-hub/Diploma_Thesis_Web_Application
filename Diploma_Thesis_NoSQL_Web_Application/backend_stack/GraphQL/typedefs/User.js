// Every GraphQL server, including ApolloServer, uses a schema to define the structure of data that clients can query.

// A schema is a collection of type definitions (hence "User") that together define 
// the "shape" of queries that are executed against data.

const {gql} = require('apollo-server-express');

const User = gql`
    type User {
        _id: ID!
        first_name: String
        last_name: String
        username: String!
        email: String
        password: String!
        role: String 
        token : String
        createdAt : String!
    }
 
    input UserInput{
        first_name: String
        last_name: String
        username: String!
        email: String
        password: String!
        role: String!
        confirm: String!
    }        
    type Query {   
        login(username: String!, password: String!): User!  
    }
    type Mutation {  
        register(userInput: UserInput!) : User
    } 
`;

module.exports = User;