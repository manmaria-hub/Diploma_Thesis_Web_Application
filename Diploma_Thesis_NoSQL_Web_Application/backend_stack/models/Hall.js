const mongoose = require('mongoose');

const HallsSchema = mongoose.Schema({
    Hall_category : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Κατηγορία Αίθουσας' !"],
        default : ""
    },
    Hall_type : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Τύπος Αίθουσας' !"],
        default : ""
    },
    Hall_floor : {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Όροφος Αίθουσας' !"],
        default : ""
    },
    Hall_code: {
        type : String,
        required : [true,  "Παρακαλώ συμπληρώστε το πεδίο 'Κωδικός Αίθουσας' !"],
        default : ""
    },    
    Hall_label : {
        type : String,
        required : false,
        default : ""
    },
    Hall_capacity : {
        type : String,
        required : false,
        default : ""
    }, 
    Hall_owner : {
        owner_name:{
            type: String,
            required: false,
            default:''
        },
        owner_email:{
            type: String,
            required: false,
            default:''
        } 
    },
    Hall_courses:{
        type:[String],
        required:false,
        default:''
    }
},
{
    timestamps : false,
})

const Halls = mongoose.model('Halls', HallsSchema);

module.exports = Halls;