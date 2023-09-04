// All the map functions that return data from the GraphQL Schema
const user_resolvers = require('../resolvers/User');
const hall_resolvers = require('../resolvers/Halls');
const professor_resolvers = require('../resolvers/Professor');
const student_resolvers = require('../resolvers/Student');

const resolvers = [
    user_resolvers,
    hall_resolvers,
    professor_resolvers,
    student_resolvers
]

module.exports = resolvers;