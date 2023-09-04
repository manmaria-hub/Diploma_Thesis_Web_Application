const mongoose = require('mongoose');

const SpecializationFieldsSchema = mongoose.Schema({
    fieldName: {
        type:String,
        required: true,
        unique:false 
    },
    fieldCode : {
        type: String,
        required : true,
        unique : false
    },
    graduate_level : {
        type : String,
        required : true,
        unique: false 
    },       
    postgraduate_studySubject : {
        type : String,
        required : false,
        unique : false,
        default : '-'
    },
    semesterList : {
        type : [String],
        required: true
    },
    coursesList : {
        type: [String],
        required: false        
    }
},
{
    timestamps : false,
})

const SpecializationFields = mongoose.model('SpecializationFields', SpecializationFieldsSchema);

module.exports = SpecializationFields;