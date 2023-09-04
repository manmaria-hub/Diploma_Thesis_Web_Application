const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    
    PERSONAL_INFO: {
        first_name :{
            type: String,
            default: ''
        },     
        last_name : {
            type: String,
            default: ''
        },
        father_FirstName : {
            type : String,
            default : ''
        },
        father_LastName: {
            type: String,
            default: ''
        },
        mother_FirstName: {
            type: String,
            default : ''
        },
        mother_LastName: {
            type: String
        },
        maiden_name: {
            type: String, 
        },
        family : {
            type: String, 
            default : ''
        },
        gender : {
            type: String, 
            default : '' 
        },
        active : {
            type: Boolean, 
            default : '' 
        }
    },
    ACADEMIC_INFO : {
        departmentName: {
            type : String,
            default : 'ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ'
        },
        category :  {
            type : String,
            default : ''
        },
        professor_type:{
            type : String,
            default : ''
        },
        position:{
            type : String,
            default : ''
        },
        office :{
            type : String,
            default : ''
        }, 
        office_hours : {
            type : String,
            default : ''
        },
        office_email : {
            type : String,
            default : ''
        }, 
        office_telephone : {
            type : String,
            default : ''
        },
        specialization : {
            type : String,
            default : ''
        }, 
        diploma: {
            type : String,
            default : ''
        }, 
        doctorat:{
            type : String,
            default : ''
        }, 
        website : {
            type : String,
            default : ''
        }, 
        CV : {
            type : String,
            default : ''
        },
        scholar : {
            type : String,
            default : ''
        }, 
        academic_email : {
            type : String,
            default : ''
        }, 
        username : {
            type : String,
            default : ''
        }
    },    
    INSURANCE_INFO : {
        AMKA:{
            type : String,
            default : ''
        }, 
        AMKA_country:{
            type : String,
            default : ''
        }, 
        AFM:{
            type : String,
            default : ''
        }, 
        AFM_country:{
            type : String,
            default : ''
        }, 
        DOY:{
            type : String,
            default : ''
        }, 
        nationality:{
            type : String,
            default : ''
        }, 
        identity_number : {
            type : String,
            default : ''
        }, 
        identity_type : {
            type : String,
            default : ''
        }
    },
    COMMUNICATION_DETAILS : {
        telephone:{
            type : String,
            default : ''
        }, 
        mobile:{
            type : String,
            default : ''
        }, 
        alternative_email:{
            type : String,
            default : ''
        }, 
        city:{
            type : String,
            default : ''
        }, 
        road:{
            type : String,
            default : ''
        }, 
        number:{
            type : String,
            default : ''
        }, 
        region : {
            type : String,
            default : ''
        }, 
        postcode : {
            type : String,
            default : ''
        }
    }    
 },
 {
    timestamps: true,
 }
)

const Professors = mongoose.model('Professors', ProfessorSchema);

module.exports = Professors;