// ACADEMIC CALENDAR TYPEDEFS

const { gql } = require('apollo-server-express');

const AcademicCalendar = gql` 
    type winterSemester_type {
        courses_startDay : String
        courses_startDate : String
        courses_endDay :  String
        courses_endDate : String
        courses_duration_weeks : Float
        exams_startDay : String,
        exams_startDate : String
        exams_endDay : String
        exams_endDate : String
        exams_duration_weeks : Float
        oaths : [String]
        feasts : [String]        
        fromHoliday_day : String
        fromHoliday_date : String
        toHoliday_day : String
        toHoliday_date : String
        courseReport_startDay : String
        courseReport_startDate : String
        courseReport_endDay : String
        courseReport_endDate : String
        booksReport_startDay : String
        booksReport_startDate : String
        booksReport_endDay : String
        booksReport_endDate : String
        DiplomaThesisReport_startDay : String
        DiplomaThesisReport_startDate : String
        DiplomaThesisReport_endDay : String
        DiplomaThesisReport_endDate : String
    }

    type springSemester_type {
        courses_startDay : String
        courses_startDate : String
        courses_endDay :  String
        courses_endDate : String
        courses_duration_weeks : Float
        exams_startDay : String,
        exams_startDate : String
        exams_endDay : String
        exams_endDate : String
        exams_duration_weeks : Float
        oaths : [String]
        feasts : [String]        
        fromHoliday_day : String
        fromHoliday_date : String
        toHoliday_day : String
        toHoliday_date : String
        courseReport_startDay : String
        courseReport_startDate : String
        courseReport_endDay : String
        courseReport_endDate : String
        booksReport_startDay : String
        booksReport_startDate : String
        booksReport_endDay : String
        booksReport_endDate : String
        DiplomaThesisReport_startDay : String
        DiplomaThesisReport_startDate : String
        DiplomaThesisReport_endDay : String
        DiplomaThesisReport_endDate : String
    }

    type septemberSemester_type {
        repeatExam_startDay : String
        repeatExam_startDate : String
        repeatExam_endDay : String
        repeatExam_endDate : String
        repeatExam_duration_weeks : Float
    }

    type AcademicCalendar {
        _id : ID,
        study_level : String
        specialization_field : String
        academic_year : String
        winterSemester : winterSemester_type
        springSemester : springSemester_type
        septemberSemester : septemberSemester_type
    }

    input winterSemester_Input {
        courses_startDay : String
        courses_startDate : String
        courses_endDay :  String
        courses_endDate : String
        courses_duration_weeks : Float
        exams_startDay : String,
        exams_startDate : String
        exams_endDay : String
        exams_endDate : String
        exams_duration_weeks : Float
        oaths : [String]
        feasts : [String]        
        fromHoliday_day : String
        fromHoliday_date : String
        toHoliday_day : String
        toHoliday_date : String
        courseReport_startDay : String
        courseReport_startDate : String
        courseReport_endDay : String
        courseReport_endDate : String
        booksReport_startDay : String
        booksReport_startDate : String
        booksReport_endDay : String
        booksReport_endDate : String
        DiplomaThesisReport_startDay : String
        DiplomaThesisReport_startDate : String
        DiplomaThesisReport_endDay : String
        DiplomaThesisReport_endDate : String
    }

    input springSemester_Input {
        courses_startDay : String
        courses_startDate : String
        courses_endDay :  String
        courses_endDate : String
        courses_duration_weeks : Float
        exams_startDay : String,
        exams_startDate : String
        exams_endDay : String
        exams_endDate : String
        exams_duration_weeks : Float
        oaths : [String]
        feasts : [String]        
        fromHoliday_day : String
        fromHoliday_date : String
        toHoliday_day : String
        toHoliday_date : String
        courseReport_startDay : String
        courseReport_startDate : String
        courseReport_endDay : String
        courseReport_endDate : String
        booksReport_startDay : String
        booksReport_startDate : String
        booksReport_endDay : String
        booksReport_endDate : String
        DiplomaThesisReport_startDay : String
        DiplomaThesisReport_startDate : String
        DiplomaThesisReport_endDay : String
        DiplomaThesisReport_endDate : String
    }

    input septemberSemester_Input {
        repeatExam_startDay : String
        repeatExam_startDate : String
        repeatExam_endDay : String
        repeatExam_endDate : String
        repeatExam_duration_weeks : Float
    }

    input AcademicCalendar_Input { 
        study_level : String
        specialization_field : String
        academic_year : String
        winterSemester : winterSemester_Input
        springSemester : springSemester_Input
        septemberSemester : septemberSemester_Input
    } 

    type AcademicCalendar_OK {
        calendar : AcademicCalendar
        code : String
        OK_message : String
    }

    type AcademicCalendar_SimpleOK { 
        code : String
        simpleOK_message : String
    }

    type AcademicCalendar_Error { 
        code : String
        error_message : String
    }

    type CourseDeclarationDates {
        courseDeclaration_startDay : String
        courseDeclaration_startDate : String
        courseDeclaration_endDay : String
        courseDeclaration_endDate : String        
    }

    union AcademicCalendarState = AcademicCalendar_SimpleOK | AcademicCalendar_OK | AcademicCalendar_Error

    type Query {
        findCoursesDeclarationDate(academicYear: String, academicSemester : String, study_level: String) : CourseDeclarationDates
    }

    type Mutation {
        createAcademicCalendar(calendarInput : AcademicCalendar_Input) :  AcademicCalendarState
    }
`
module.exports = AcademicCalendar;