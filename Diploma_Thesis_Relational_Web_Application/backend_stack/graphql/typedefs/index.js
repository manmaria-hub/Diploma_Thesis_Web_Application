const gql = require('apollo-server');

// All the GraphQL schema files
const User = require('./User');
const Hall = require('./Hall');
const Professor = require('./Professor');
const Student = require('./Student');

const typedefs = [
    User,
    Hall,
    Professor,
    Student
]

module.exports = typedefs;