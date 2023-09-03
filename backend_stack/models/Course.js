const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    StudyProgram : {
        course_name : {
            type: String,
            required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα  Μαθήματος' !"],  
            default:"-"
        },
        course_code : {
            type : String,
            required:  [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κωδικός  Μαθήματος' !"], 
            default: "-",
            unique : true
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
    },
    CourseManagement : {
        COURSE_DIRECTOR : {
            director_FirstName : {
                type: String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Υπεύθυνου Μαθήματος' !"],
                default : '-'
            },
            director_LastName : {
                type: String,
                required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Επώνυμο Υπεύθυνου Μαθήματος' !"],
                default : '-'
            },
            director_Email : {
                type: String, 
                required: [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Email Υπεύθυνου Μαθήματος' !"],
                default : '-', 
                unique : false
            },
            director_ProfessorType : {
                type : String,
                required : false, 
                default : "-"
            }
        },
        COURSE_INSTRUCTORS : [{
            instructor_FirstName : {
                type: String,
                required : false,
                default : '-'
            },
            instructor_LastName : {
                type: String,
                required : false,
                default : '-'
            },
            instructor_Email : {
                type: String, 
                required: false,
                default : '-', 
                unique : false
            },
            instructor_director_ProfessorType : {
                type : String,
                required : false, 
                default : "-"
            }
        }]
    },
    InfoFromInstructor : {
        INITIAL_INFO : {
            skills : {
                type : [String],
                required: false,
                default:""
            },
            student_responsibilities : {
                type: [String],
                required : false, 
                default :""
            }
        }, 
        MAIN_DESCRIPTION : {
            targets : {
                type : String,
                required: false,
                default:""
            },
            learning_outcomes : {
                type : String,
                required : false,
                default : ""
            },
            student_evaluation : {
                type : String,
                required : false,
                default : ""
            },
            class_material : {
                type : String, 
                required : false, 
                default : ""
            }
        },
        RECOMMENDED_COURSES : {
            type : [String], 
            required : false,
            default : "-"
        },
        SUGGESTED_WRITINGS : [{
            writing_name : {
                type : String, 
                required : false, 
                default : ''
            },
            writing_eudoxus : {
                type : String, 
                required : false, 
                default : ""
            },
            writing_link : {
                type : String, 
                required : false, 
                default : ""
            }
        }],
        course_site : {
            type : String,
            required : false, 
            default : ""
        },
        theory_hours : {
            type : String,
            required : false,
            default : ""
        },
        lab_hours : {
            type : String,
            required : false,
            default : ""
        },
        tutoring_hours : {
            type : String,
            required : false,
            default : ""
        },
        bibliography : {
            type : [String],
            required : false,
            default : []
        },
        typeOfExam : {
            type : [String],
            required : false,
            default : []
        }
    },
    More : {
        students_curr_attendance_num : {
            type : String,
            required : false, 
            default : '-'
        },
        course_active : {
            type : Boolean,
            required: false,
            default : "-"
        }
    }
},{
    timestamps : false
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;