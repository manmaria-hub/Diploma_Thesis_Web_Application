const {ApolloServer,gql} = require('apollo-server');

const {sequelize} = require('./models');
const contextMiddleware =  require('./util/contextMiddleware')
// GraphQL Schema & Resolvers
const typedefs = require('./graphql/typedefs/index');       // Schema
const resolvers = require('./graphql/resolvers/index');     // Functions

// GraphQL Resolvers for database filling
const hallResolvers = require('./graphql/resolvers/Halls');
const professorResolvers = require('./graphql/resolvers/Professor');

const apolloServer = new ApolloServer({
    typeDefs: typedefs ,
    resolvers : resolvers,
    context : contextMiddleware
})

apolloServer.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
    // Database Connection (using sequelize)
    sequelize.authenticate()
        .then(()=> console.log('Database Connected!!'))
        .catch((err) => console.log(err))
});

//hallResolvers.Query.fillHallDatabase();
//professorResolvers.Query.fillProfessorsDatabase();
