const mongoose = require('mongoose');

const AcademicCalendarSchema = mongoose.Schema({          
    study_level:{
        type: String,
        required: true,
        default:''
    },
    specialization_field:{
        type: String,
        required: true,
        default:''
    },
    academic_year: {
        type: String,
        required: true,
        default:''
    },
    winterSemester: {
        courses_startDay : {
            type: String,
            required: false,
            default:''
        },
        courses_startDate : {
            type: String,
            required: false,
            default:''
        },         
        courses_endDay : {
            type: String,
            required: false,
            default:''
        },
        courses_endDate : {
            type: String,
            required: false,
            default:''
        },   
        courses_duration_weeks : {
            type: Number,
            required: false,
            default:''
        },
        exams_startDay : {
            type: String,
            required: false,
            default:''
        },
        exams_startDate : {
            type: String,
            required: false,
            default:''
        },   
        exams_endDay : {
            type: String,
            required: false,
            default:''
        },
        exams_endDate : {
            type: String,
            required: false,
            default:''
        },
        exams_duration_weeks : {
            type: Number,
            required: false,
            default:''
        },   
        oaths : {
            type: [String],
            required: false,
            default:''
        },
        feasts : {
            type: [String],
            required: false,
            default:''
        },            
        fromHoliday_day : {
            type: String,
            required: false,
            default:''
        }, 
        fromHoliday_date : {
            type: String,
            required: false,
            default:''
        }, 
        toHoliday_day : {
            type: String,
            required: false,
            default:''
        },
        toHoliday_date : {
            type: String,
            required: false,
            default:''
        },
        courseReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        courseReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        courseReport_endDay : {
            type: String,
            required: false,
            default:''
        },
        courseReport_endDate : {
            type: String,
            required: false,
            default:''
        },
        booksReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        booksReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        booksReport_endDay : {
            type: String,
            required: false,
            default:''
        },
        booksReport_endDate : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_endDay : {
            type: String,
            required: false,
            default:''
        },  
        DiplomaThesisReport_endDate : {
            type: String,
            required: false,
            default:''
        },       
    },
    springSemester: {
        courses_startDay : {
            type: String,
            required: false,
            default:''
        },
        courses_startDate : {
            type: String,
            required: false,
            default:''
        },         
        courses_endDay : {
            type: String,
            required: false,
            default:''
        },
        courses_endDate : {
            type: String,
            required: false,
            default:''
        },   
        courses_duration_weeks : {
            type: Number,
            required: false,
            default:''
        },
        exams_startDay : {
            type: String,
            required: false,
            default:''
        },
        exams_startDate : {
            type: String,
            required: false,
            default:''
        },   
        exams_endDay : {
            type: String,
            required: false,
            default:''
        },
        exams_endDate : {
            type: String,
            required: false,
            default:''
        },
        exams_duration_weeks : {
            type: Number,
            required: false,
            default:''
        },   
        oaths : {
            type: [String],
            required: false,
            default:''
        },
        feasts : {
            type: [String],
            required: false,
            default:''
        },            
        fromHoliday_day : {
            type: String,
            required: false,
            default:''
        }, 
        fromHoliday_date : {
            type: String,
            required: false,
            default:''
        }, 
        toHoliday_day : {
            type: String,
            required: false,
            default:''
        },
        toHoliday_date : {
            type: String,
            required: false,
            default:''
        },
        courseReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        courseReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        courseReport_endDay : {
            type: String,
            required: false,
            default:''
        },
        courseReport_endDate : {
            type: String,
            required: false,
            default:''
        },
        booksReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        booksReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        booksReport_endDay : {
            type: String,
            required: false,
            default:''
        },
        booksReport_endDate : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_startDay : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_startDate : {
            type: String,
            required: false,
            default:''
        },
        DiplomaThesisReport_endDay : {
            type: String,
            required: false,
            default:''
        },  
        DiplomaThesisReport_endDate : {
            type: String,
            required: false,
            default:''
        },       
    },
    septemberSemester : {
        repeatExam_startDay : {
            type: String,
            required: false,
            default:''
        },
        repeatExam_startDate : {
            type: String,
            required: false,
            default:''
        },
        repeatExam_endDay : {
            type: String,
            required: false,
            default:''
        },
        repeatExam_endDate : {
            type: String,
            required: false,
            default:''
        },
        repeatExam_duration_weeks : {
            type: Number,
            required: false,
            default:''
        }
    }
},
{
    timestamps : false,
})

const AcademicCalendar = mongoose.model('AcademicCalendar', AcademicCalendarSchema);

module.exports = AcademicCalendar;