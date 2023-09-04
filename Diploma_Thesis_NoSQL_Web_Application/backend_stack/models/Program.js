const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
    program_category : {
        type : String,
        required : false
    },
    program_study_level : {
        type : String,
        required : false
    },
    program_period : {
        type : String, 
        required : false
    },
    program_academic_year : {
        type : String,
        required : false
    },
    program_state : {
        type : String,
        required : false
    },
    main_program : [{
        course_code : {
            type: String,
            required : false 
        },
        course_name : {
            type : String,
            required :  false
        }, 
        day : {
            type : String,
            required :  false
        },
        date : {
            type : String,
            required :  false 
        },
        fromHour : {
            type : String,
            required:  false
        },
        toHour : {
            type : String,
            required:  false
        },
        type : {
            type : String,
            required:  false
        },
        Hall : [{
            value : {
                type : String,
                required : false
            },
            label : {
                type : String,
                required : false
            }
        }],
        instructor : [{
            value : {
                type : String,
                required : false
            },
            label : {
                type : String,
                required : false
            },
        }]
    }]
},{
    timestamps : false
})

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;