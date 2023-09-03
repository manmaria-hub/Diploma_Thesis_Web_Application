const User = require("./User");
const Student = require("./Student");
const SpecializationFields = require("./SpecializationFields");
const Courses = require("./Courses");
const Hall = require("./Hall");
const Program = require("./Program");
const AcademicCalendar = require("./AcademicCalendar");
const Form = require('./Form');
const Professor = require('./Professors');
const CourseDeclaration = require('./CourseDeclaration');
const CoursesGrading = require('./CoursesGrading');

module.exports = [
    User,
    Student,
    SpecializationFields,
    Courses,
    Hall,
    Program,
    AcademicCalendar,
    Form,
    Professor,
    CourseDeclaration,
    CoursesGrading
];