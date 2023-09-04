const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    
    application_form: {
        type: String,
        default: ''
    },
    form_name : {
        type: String,
        default: ''
    },
    sending_date : {
        type : String,
        default : ''
    },
    arrangement_date: {
        type: String,
        default: ''
    },
    student_name: {
        type: String,
        default : ''
    },
    AEM: {
        type: String
    },
    username: {
        type: String, 
    },
    semester : {
        type: String, 
        default : ''
    },
    form_pdf_data : {
        type: String, 
        default : '' 
    },
    supervisor : {
        type: String, 
        default : '' 
    },
    supervisor_type : {
        type: String, 
        default : '' 
    },
    secondMember : {
        type: String, 
        default : '' 
    },
    secondMember_type : {
        type: String, 
        default : '' 
    },
    thirdMember : {
        type: String, 
        default : '' 
    },
    thirdMember_type : {
        type: String, 
        default : '' 
    },
    greekTitle : {
        type: String, 
        default : '' 
    },
    englishTitle : {
        type: String, 
        default : '' 
    },
    father_FirstName : {
        type: String, 
        default : '' 
    },
    mother_FirstName : {
        type: String, 
        default : '' 
    },
    email : {
        type: String, 
        default : '' 
    },
    telephone : {
        type: String, 
        default : '' 
    },
    mobile : {
        type: String, 
        default : '' 
    },
    city : {
        type: String, 
        default : '' 
    },
    road : {
        type: String, 
        default : '' 
    },
    postcode : {
        type: String, 
        default : '' 
    },
    formInput : {
        type: String, 
        default : '' 
    },
    signature : {
        type: String, 
        default : '' 
    },
    selectedSemester : [{
        type: String, 
        default : '' 
    }],
    attendance_period : {
        type: String, 
        default : '' 
    },
    birthLocation : {
        type: String, 
        default : '' 
    },
    birthDate : {
        type: String, 
        default : '' 
    },
    citizen : {
        type: String, 
        default : '' 
    },
    citizenNumber: {
        type: String, 
        default : '' 
    },
    registration_year : {
        type: String, 
        default : '' 
    },
    registration_semester : {
        type: String, 
        default : '' 
    },
    registration_date : {
        type: String, 
        default : '' 
    },
    generalAEM : {
        type: String, 
        default : '' 
    },
    grading : [{
        type: String, 
        default : '' 
    }],
 },
 {
    timestamps: true,
 }
)

const Forms = mongoose.model('Forms', FormSchema);

module.exports = Forms;