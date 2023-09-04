const mongoose = require('mongoose');

const CoursesDeclarationsSchema = mongoose.Schema({
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
    student_academic_semester : {
        type : String,
        required : false,
        default : ""
    }, 
    academic_period : {
        type : String,
        required : [true, "Παρακαλώ συμπληρώστε το πεδίο 'Περίοδος Δήλωσης' !"],
        default : ""
    }, 
    academic_year : {
        type : String,
        required : [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαικό Έτος' !"],
        default : ""
    }, 
    declaration_type : {
        type: String,
        required : [true, "Παρακαλώ συμπληρώστε το πεδίο 'Είδος Δήλωσης' !"], 
        default : ""
    },
    declaration_category : {
        type: String,
        required : [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κατηγορία Δήλωσης' !"], 
        default : ""
    },
    declaration_activeFromDay : {
        type: String,
        required : false,
        default : ""
    },
    declaration_activeFromDate : {
        type: String,
        required : false,
        default : ""
    },
    declaration_activeToDay : {
        type: String,
        required : false,
        default : ""
    },
    declaration_activeToDate : {
        type: String,
        required : false,
        default : ""
    },
    courses_number: {
        type: Number,
        required : false,
        default : ""
    },
    hours_sum: {
        type: Number,
        required : false,
        default : ""
    },
    ECTS_sum: {
        type: Number,
        required : false,
        default : ""
    },
    studyUnits_sum: {
        type: Number,
        required : false,
        default : ""
    },
    declaration_state: {
        type: String,
        required : false,
        default : ""
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
                default: "-", 
                unique : false 
            }, 
            studyProgram_name : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Πρόγραμμα Σπουδών' !"], 
                default: "ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ" 
            },
            studyProgram_num : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Προγράμματος Σπουδών' !"], 
                default: "128" 
            },
            department_name : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τμήμα' !"], 
                default: "ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ" 
            },
            department_code : {
                type : String,
                required:  [true,"Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Τμήματος' !"], 
                default: "501" 
            },
            period : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Περίοδος (Χειμερινή ή Εαρινή)' !"], 
                default: "-" 
            },
            semester : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Εξαμήνου' !"], 
                default: "-" 
            }, 
            course_type : {
                type : String,
                required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τύπος Μαθήματος (Υποχρεωτικό ή Επιλογής)' !"], 
                default: "-" 
            },
            course_category : {
                type : String,
                required: false, 
                default: "-" 
            },
            study_part: {
                type: String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κατεύθυνση' !"],
                default: "-"
            },
            study_subpart: {
                type: String,
                required: false, 
                default:"-"
            },
            study_program: {
                type: String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Γνωστικό Αντικείμενο' !"],
                default:"-"
            },
            specialization_field: {
                type: String, 
                required: false,
                default:'-'
            },
            sub_study_program : {
                type: String,
                required: false,
                default:'-'
            },
            group: {
                type: String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Ομάδα Μαθήματος' !"],
                default: "-"        
            },
            study_units : {
                type: String,
                required: [true,  "Παρακαλώ συμπληρώστε το πεδίο 'ΔΜ' !"],
                default: '4'
            },
            ECTS : {
                type: String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'ECTS' !"],
                default:'6'
            },
            study_hours : {
                type : String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Σύνολο Εβδομαδιαίων Ωρών Διδασκαλίας' !"],
                default: '4'
            },
            course_label : {
                type : [String],
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Ετικέτα Μαθήματος (ΠΡΟΠΤΥΧΙΑΚΟ / ΜΕΤΑΠΤΥΧΙΑΚΟ / ΕRASMUS / ΠΘ)' !"],
                default : []
            },
            prerequisites : {
                type: [String],
                required: false,
                default: []
            }          
        }
    ]
},
{
    timestamps : true,
})

const CoursesDeclarations = mongoose.model('CoursesDeclarations', CoursesDeclarationsSchema);

module.exports = CoursesDeclarations;