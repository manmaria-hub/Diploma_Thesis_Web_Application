// Import resolvers
const user_resolvers = require("./user_resolvers");
const student_resolvers = require("./student_resolvers");
const specializationFields_resolvers = require("./specializationFields_resolvers");
const course_resolvers = require('./courses_resolvers');
const halls_resolvers = require('./hall_resolvers');
const program_resolvers = require('./program_resolvers');
const calendar_resolvers = require('./calendar_resolvers');
const forms_resolvers = require('./form_resolvers');
const professors_resolvers = require('./professor_resovers');
const courseDeclaration_resolvers = require('./courseDeclaration_resolvers');
const coursesGrading_resolvers = require('./coursesGrading_resolvers');

module.exports = [
    user_resolvers,
    student_resolvers,
    specializationFields_resolvers,
    course_resolvers, 
    halls_resolvers,
    program_resolvers, 
    calendar_resolvers,
    forms_resolvers,
    professors_resolvers,
    courseDeclaration_resolvers,
    coursesGrading_resolvers
];