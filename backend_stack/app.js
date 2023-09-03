// In this file we set up our Apollo Server

// Import by requiring the packages that we just installed
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {success} = require('consola');
const _ = require('lodash');
const mongoose = require('mongoose');  
const cors = require('cors');
const bodyParser = require('body-parser');
const isAuth = require('./middleWare/isAuth');
const errorHandler = require('./middleWare/errorMiddleware')
const userRouter = require('./routes/userRouter');
const {GraphQLError} = require('graphql')

// Import the schema ( type definitions ) and resolvers
const {typeDefs,resolvers} = require("./GraphQL");  

// Initialize our Express app
const app = express();
const SpecializationFieldsResolvers = require('./GraphQL/resolvers/specializationFields_resolvers')
  
// Creating an instance of ApolloServer and starting the Apollo-Express-Server
// The ApolloServer constructor requires two parameters :
//      1. Schema Definition
//      2. Set of resolvers for our schema fields
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,  
    plugins: [
        {
            requestDidStart() {
                return {
                    didEncounterErrors({ response, errors }) {                        
                    if (errors.find(err => err.extensions.code === 'SOMETHING_BAD_HAPPENED')) {
                        console.log('ERROR!')
                        response.http.status = 401;
                    }
                    }
                }
            }
        }

    ]    
});

// The address of our MongoDB database cluster or a server / Connection string
// The presence of environment variables for the username, password and database of MongoDB Cluster or Server
// allows us to dynamically change these parameters if the development environment of our application will change
MONGODB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@diplomathesis.8rhs176.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

async function startServer() {     
    // Start the Apollo Server before listen to any port (the schema has been loaded and now the server will start hooks)
    await apolloServer.start();

    // Inject Apollo Server middleware on Express Application
    apolloServer.applyMiddleware({ app: app, path:'/graphql' });
    
    // Setting up the Middlewares
    app.use(
        cors(),
        bodyParser.json()
    )
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200); // SIGNAL THAT THE CLIENT IS OK
        }
        next();  // The request can continue its journey
    })
    app.use(isAuth);
    // Routes Middleware
    app.use("/api/users", userRouter);

    app.post("/fileUpload", async (req, res) => {

        const file = req.body.file;     
        res.status(200).send("registeration successful"); 
        console.log(req);
    });

    // Apart from '/graphql' endpoint that is handled by the Apollo Server, 
    // any other route should be handled by our express application
    app.get("/", (req,res)=> {
        res.send("Hello from Express Apollo Server");
    }); 

    // Error Middleware
    app.use(errorHandler);

    // Use the mongoose package to establish a successful connection with our MongoDB cluster or server
    mongoose.connect( MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        // Determine the success of the connection with the MongoDB database
        success({
            badge:true,
            message:"MongoDB Connection Successful!"
        })
        // Determine the specific port to which our app listens and prepare our app to handle incoming requests
        const SERVER_PORT = process.env.PORT || 4000; 
        app.listen(SERVER_PORT,() => success({
            badge:true,
            message:`Server is running on port ${SERVER_PORT}`,
        }));
    })
    .catch(err => {
        console.log(err);
    });  
    
    // After that and before continue with anything else it is important to fill the Specialization Field 
    // collection with the default current fields. According the current study program, there are 6 default 
    // Specialization Fields of the Undegraduate Study Program and also 4 Specialization Areas for each from 
    // the three different Postgraduate Study Programs.
    //SpecializationFieldsResolvers.Query.insertSpecializationFields();
}

// Call the suitable function to start the GraphQL Apollo Server 
startServer();

