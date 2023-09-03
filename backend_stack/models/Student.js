const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    Personal_Info:{
        Student_Insurance:{
            AMKA_number: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'ΑΜΚΑ'!"],
                unique:true,
                default:"-"
            },
            AFM_number: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'ΑΦΜ'!"],
                unique:true,
                default:"-"
            },
            DOY_number: {
                type:String,
                required:false,
                default:"-"
            },
            AMKA_country: {
                type: String,
                required: false,
                default:"-"
            },
            AFM_country: {
                type: String,
                required: false,
                default:"-"
            }
        },
        Personal_Information:{
            last_name: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Επώνυμο'!"]
            },
            first_name: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα'!"]
            },
            dot_father_name: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'M. Όνομα'!"]
            },
            father_FirstName: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Πατρώνυμο'!"]
            },
            father_LastName: {
                type:String,
                required: false
            },
            maiden_name:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Πατρικό Όνομα'!"]
            },
            mother_FirstName: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Μητρός'!"]
            },
            mother_LastName: {
                type:String,
                required: false
            },  
            spouse_name:{
                type:String,
                required: false,
                default:"-"
            },
            profession:{
                type:String,
                required: false,
                default:"-"
            },
            mother_profession:{
                type:String,
                required: false,
                default:"-"
            },
            father_profession:{
                type:String,
                required: false,
                default:"-"
            },
            family:{
                type:String,
                required: false,
                default:"'Αγαμος/η"
            },
            username:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Χρήστη'!"]
            },
            personal_title:{
                type:String,
                required:false,
                default:"-"
            },
            website:{
                type:String,
                required:false,
                default:"-"
            },
            student_identity: {
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαϊκή Ταυτότητα'!"]
            },
            active:{
                type: Boolean,
                required:false,
                default:"yes"
            },
            fulfilled_military_obligations:{
                type:String,
                required:false,
                default:"no"
            },
            gender: {
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Φύλο'!"]
            },
            sex:{
                type:String,
                required: false
            },
            notations: {
                type: String,
                required:false,
                default:"-"
            }
        },
        Birth_Details:{
            birth_date:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Ημερομηνία Γέννησης'!"]
            },
            gender:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Φύλο'!"]
            },
            birth_prefecture:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Περιοχή Γέννησης'!"]
            },
            birth_country:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Χώρα Γέννησης'!"],
                default:"Ελλάδα"
            },
            birth_location:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τόπος Γέννησης'!"]                
            }        
        },
        Student_Identity:{
            identity_type:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τύπος ταυτότητας'!"],
                default:"Αστυνομική Ταυτότητα"
            },
            citizenship:{
                type:[String],
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Υπηκοότητα'!"],
                default:"ΕΛΛΗΝΙΚΗ"
            },
            citizen:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Δημοτολόγιο'!"],
            },
            identity_number:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Ταυτότητας'!"],
                unique:true
            },
            citizen_number:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Δηματολογίου'!"],
                unique:true
            },
            published_principle:{ 
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Εκδ. Αρχή'!"]                 
            },
            publish_date:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Ημ/νία Έκδοσης'!"]
            },
            nationality:{
                type:[String],
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Εθνικότητα'!"],
                default:"ΕΛΛΗΝΙΚΗ"
            },
            nationality_second:{
                type:[String],
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Ιθαγένεια'!"],
                default:"ΕΛΛΗΝΙΚΗ"
            },
            male_record_num:{
                type:String,
                required:false,
                default:"-"
            },
            male_record_perf:{
                type:String,
                required:false,
                default:"-"
            },
            male_record_gr:{
                type:String,
                required:false,
                default:"-"
            },
            male_record_loc:{
                type:String,
                required:false,
                default:"-"
            },
            male_record_country:{
                type:String,
                required:false,
                default:"-"
            }
        },
        Student_Address:{
            road:{
                type:String,
                required:false,
                default:"-"
            },
            rd_number:{
                type: String,
                required:false,
                default:"-"
            },
            city:{
                type:String,
                required:false,
                default:"-"
            },
            location:{
                type:String,
                required:false,
                default:"-"
            },
            country:{
                type:String,
                required:false,
                default:"ΕΛΛΑΔΑ"
            },
            acting_address:{
                type:String,
                required:false,
                default:"-"
            },
            postcode:{
                type:String,
                required:false,
                default:"-"
            },
            telephone:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τηλέφωνο Επικοινωνίας'!"],
                unique:true
            },
            mobile_phone:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Κινητό'!"],
                unique:true
            },
            uth_email:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Πανεπιστημιακό email'!"],
                trim: true,
                match: [
                    /^[A-Za-z0-9._%+-]+@uth\.gr/, "Παρακαλώ συμπληρώστε ένα έγκυρο πανεπιστημιακό email"
                ],
                unique:true
            },
            alternative_email:{
                type:String,
                required:false,
                trim: true,
                match: [
                    /^\s*[\w\-\+_]+(?:\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(?:\.[\w\-\+_]+)*\s*$/
                ],
                unique:true
            }
        },
        Third_Person_Contact_Details: {             
            contact_type:{
                type:String,
                required: false ,
                default:"-"
            },
            person_FirstName:{
                type:String,
                required:false,
                default:"-"
            },
            person_LastName:{
                type:String,
                required:false,
                default:"-"
            },
            person_address:{
                type:String,
                required:false,
                default:"-"
            },
            person_telephone:{
                type:String,
                required:false,
                default:"-"
            },
            person_mobilephone:{
                type:String,
                required:false,
                default:"-"
            },
            person_email:{
                type:String,
                trim:true,
                required:false,
                match: [
                    /^\s*[\w\-\+_]+(?:\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(?:\.[\w\-\+_]+)*\s*$/
                ], 
                default:"-"
            }
        }
    },
    Studentship_Info:{
        General_Information:{
            department:{
                type:String,
                required:true,
                default:"TMHMA ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ KAI ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ"
            },
            department_number:{
                type:String,
                required:true,
                default: "501"
            },
            course:{
                type:String,
                required:true,
                default:"ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ"
            },
            course_number:{
                type:String,
                required:true,
                default:"128"
            },
            academic_email:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαϊκό email'!"],
                trim: true,
                match: [
                    /^[A-Za-z0-9._%+-]+@uth\.gr/, "Παρακαλώ συμπληρώστε ένα έγκυρο Ακαδημαϊκό email"
                ],
                unique:true                
            },
            student_situation:{
                type: Boolean,
                required:true,
                default:"Ενεργός/ή"
            },
            current_academic_year:{
                type:Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχον Ακαδημαϊκό Έτος'!"],
                default:Date.now
            },
            current_academic_semester:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχον Ακαδημαϊκό Εξάμηνο'!"],
                default:1
            },
            current_attendance_period:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχουσα Περίοδος Φοίτησης'!"],
                default:"Χειμερινή"
            },
            academic_record_number:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Μητρώου'!"],
                unique:true
            },
            general_academic_record_number:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Γενικού Μητρώου'!"],
                unique:true
            },
            academic_identity:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαϊκή Ταυτότητα'!"],
                unique:true
            },
            course_program_part:{
                type:String,
                required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κατεύθυνση'!"],
                default:"ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ"
            },
            course_program_subpart:{
                type:String,
                required: false
            },
            education_number:{
                type:Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'E.A.E'!"],
                unique: true
            },
            second_course_program_part:{
                type:String,
                required: false,
                default:"-"
            },
            second_course_program_subpart:{
                type:String,
                required: false,
                default:"-"
            },
            comment_to_student:{
                type:String,
                required:false,
                default:"-"
            },
            total_fees:{
                type:String,
                required:false,
                default:"-"
            },
            sub_attendance:{
                type: Boolean,
                required:false,
                default:"no"
            }
        },
        Registration_Details:{
            registration_year:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Έτος Εισαγωγής'!"]
            },
            registration_semester:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Εξάμηνο Εισαγωγής'!"],
                default:"1"
            },
            registration_period:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Περίοδος Εισαγωγής'!"],
                default:"Χειμερινή"
            },
            registration_way:{
                type: String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρόπος Εισαγωγής'!"],
                default:"ΕΙΣΑΓΩΓΙΚΕΣ ΕΞΕΤΑΣΕΙΣ"
            }
        },
        Professor_Advisor_Details:{
            professorAdvisor_FirstName:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Καθηγητή'!"],
                default:"-"
            },
            professorAdvisor_LastName:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Επώνυμο Καθηγητή'!"],
                default:"-"
            },
            professorAdvisor_Email:{
                type:String,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                trim: true
            }
        },
        Grade_State : {
            totalNumber_successCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            totalNumber_failedCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            totalNumber_succesCompulsoryCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            totalNumber_failedCompulsoryCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            totalNumber_succesElectiveCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            totalNumber_failedElectiveCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            ECTS_compulsoryCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            ECTS_electiveCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            units_compulsoryCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            units_electiveCourses:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            ECTS_total:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            units_total:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
            grade_average:{
                type: Number,
                required:[true, "Παρακαλώ συμπληρώστε το πεδίο 'Email'!"],
                default: 0
            },
        }
    }
}, 
{
    timestamps:true,
})

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;
