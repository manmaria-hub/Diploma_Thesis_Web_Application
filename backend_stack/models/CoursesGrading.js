const mongoose = require('mongoose');

const CoursesGradingSchema = mongoose.Schema({
    student_FirstName : {
        type : String,
        required : false,
        default : ""
    },
    student_LastName : {
        type : String,
        required : false, 
        default : ""
    },
    student_AEM : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'AEM' !"],
        default : "" 
    },
    student_identity: {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαική Ταυτότητα' !"],
        default : ""
    },    
    student_username : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Χρήστη' !"],
        default : ""
    },
    student_uthEmail : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Email Φοιτητή' !"],
        default : ""
    }, 
    current_student_semester : {
        type : String, 
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Τυπικό Εξάμηνο Φοιτητή' !"],
        default : ""
    },
    student_title : {
        type : String,
        required : false,
        default : ''
    },
    gender : {
        type : String,
        required : false, 
        default : ''        
    },
    grade_average : {
        type : Number,
        required : false,
        default : 0
    }, 
    total_ECTS : {
        type : Number,
        required : false,
        default : 0
    }, 
    total_units : {
        type : Number,
        required : false,
        default : 0
    },  
    declarated_courses : [
        {
            course_name : {
                type: String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα  Μαθήματος' !"],  
                default:"-"
            },
            course_code : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κωδικός  Μαθήματος' !"], 
                default: "-" ,
                unique : false
            },
            course_type : {
                type : String,
                required:  false, 
                default: "-"
            },
            course_category : {
                type : String,
                required:  false, 
                default: "-"
            },
            course_studyProgram : {
                type : String,
                required:  false, 
                default: "-"
            },                    
            study_units : {
                type: Number,
                required: [true,  "Παρακαλώ συμπληρώστε το πεδίο 'ΔΜ' !"],
                default: '4'
            },
            ECTS : {
                type: Number,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'ECTS' !"],
                default: 0
            },
            declarated_semester : {
                type : String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Εξάμηνο Δήλωσης Μαθήματος' !"],
                default : ''
            },
            declarated_academicYear : {
                type : String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Δηλωμένο Ακαδημαικό Έτος' !"],
                default : ''
            },
            declarated_period : {
                type : String,
                required : false,
                default : ''
            },
            semester_grade : {
                type: Number,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Βαθμός Εξαμήνου' !"],
                default: 0
            },
            progress_grade : {
                type: Number,
                required : false,
                default: 0
            },
            exam_grade : {
                type: Number,
                required : false,
                default: 0
            },
            lab_grade : {
                type: Number,
                required : false,
                default: 0
            },
            tasks_grade : {
                type: Number,
                required : false,
                default: 0
            },
            result : {
                type: String,
                required : false,
                default:''
            },
            exam_period : {
                type: String,
                required : false,
                default:''
            },
            active : {
                type: Boolean,
                required : true,
                default: true
            }

        }
    ]    
},
{
    timestamps : false,
})

const CoursesGrading = mongoose.model('CoursesGrading', CoursesGradingSchema);

module.exports = CoursesGrading;