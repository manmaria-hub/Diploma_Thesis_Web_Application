// Import return success and error codes and messages
const Messages = require('../../config/validation.json');

// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the program

const AcademicCalendar = require("../../models/AcademicCalendar");

const calendar_resolvers = {

    AcademicCalendarState: {
        __resolveType : (obj) => { 
            if (obj.simpleOK_message) {
                return 'AcademicCalendar_SimpleOK';
            }  
            if (obj.OK_message) {
                return 'AcademicCalendar_OK';
            } 
            if (obj.error_message) {
                return 'AcademicCalendar_Error'
            }
            return null;
        },
    },

    //                 ****************   QUERIES   ****************                  //
    Query : { 
        async findCoursesDeclarationDate(root, args, context) {
            // Determine the input data for 
            const academicYear_input = args.academicYear;
            const academicSemester_input = args.academicSemester;
            const studyLevel_input = args.study_level;

            if (academicSemester_input === 'Εαρινό') {
                // Query for the specific academic Year and the specific academic Semester
                const query = {"academic_year" : academicYear_input, "study_level" : studyLevel_input};
                return await AcademicCalendar.find(query)
                    .then(result=>{
                        console.log("[SUCCESS] -> GET ACADEMIC CALENDAR SUCCESSFUL !!");                    
                        console.log(result) 
                        if (result.length !== 0)  {
                            return {
                                courseDeclaration_startDay : result[0].springSemester.courseReport_startDay,
                                courseDeclaration_startDate : result[0].springSemester.courseReport_startDate,
                                courseDeclaration_endDay : result[0].springSemester.courseReport_endDay,
                                courseDeclaration_endDate : result[0].springSemester.courseReport_endDate
                            }   
                        }
                        else {
                            return {
                                courseDeclaration_startDay : '',
                                courseDeclaration_startDate : '',
                                courseDeclaration_endDay : '',
                                courseDeclaration_endDate : ''
                            }  
                        }                   
                    })
                    .catch(error=> {
                        console.log(error)
                        console.log("[ERROR] -> GET ACADEMIC CALENDAR FAILED !!")   
                        return {
                            courseDeclaration_startDay : '',
                            courseDeclaration_startDate : '',
                            courseDeclaration_endDay : '',
                            courseDeclaration_endDate : ''
                        }                      
                    })  
            }
            else if (academicSemester_input === 'Χειμερινό') {
                // Query for the specific academic Year and the specific academic Semester
                const query = {"academic_year" : academicYear_input, "study_level" : studyLevel_input};
                return await AcademicCalendar.find(query)
                    .then(result=>{
                        console.log("[SUCCESS] -> GET ACADEMIC CALENDAR SUCCESSFUL !!");                    
                        console.log(result) 
                        if (result.length > 0)  {
                            return {
                                courseDeclaration_startDay : result[0].winterSemester.courseReport_startDay,
                                courseDeclaration_startDate : result[0].winterSemester.courseReport_startDate,
                                courseDeclaration_endDay : result[0].winterSemester.courseReport_endDay,
                                courseDeclaration_endDate : result[0].winterSemester.courseReport_endDate
                            }   
                        }
                        else {
                            return {
                                courseDeclaration_startDay : '',
                                courseDeclaration_startDate : '',
                                courseDeclaration_endDay : '',
                                courseDeclaration_endDate : ''
                            }  
                        }                   
                    })
                    .catch(error=> {
                        console.log(error)
                        console.log("[ERROR] -> GET ACADEMIC CALENDAR FAILED !!")   
                        return {
                            courseDeclaration_startDay : '',
                            courseDeclaration_startDate : '',
                            courseDeclaration_endDay : '',
                            courseDeclaration_endDate : ''
                        }                      
                    })  
            }
            
        }
                
    },   
        
    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        // ADD A NEW ACADEMIC CALENDAR IN THE DATABASE
        async createAcademicCalendar(root, args, context) {

            // Determine the input data for the new academic calendar that the user gives with the suitable components and pages
            // This is the calendar's document to be inserted
            const calendar = args.calendarInput;
            console.log(calendar);

            // Insert the new calendar to programs' collection using findOneAndUpdate() mongoDB method. The findOneAndUpdate() method is used to update the
            // first matched record with the filter and upsert:true creates a new document if the document doesn't exists that match the filter
            // In our case, we will use this method to update the temporary stored programs of a specific academic semester and when the final program is ready, 
            // we will update the temporary with the final
            
            // The below query will find a document in the programs collection with the values in the firse 'filter' argument and update them with the 
            // given fields in the second argument
            return await AcademicCalendar.findOneAndUpdate(
                { "study_level" : calendar.study_level,
                  "specialization_field" : calendar.specialization_field,
                  "academic_year" : calendar.academic_year}, 
                 { $set : {"winterSemester" : calendar.winterSemester, "springSemester" : calendar.springSemester, septemberSemester : calendar.septemberSemester }},
                 { upsert : true, returnOriginal : true }) // when no document is identified using the given filter, the 
                                                          // upsert option will insert a new document and the returnOriginal : false 
                                                          // method will return the modified document of the initial
                    .then(result => {
                        console.log("[SUCCESS] -> ADD NEW ACADEMIC CALENDAR SUCCESSFUL !!");
                        console.log(result);
                        return {
                            code: Messages.validation.Program_MutationOK.code, 
                            OK_message : Messages.validation.Program_MutationOK.message
                        }
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!")                   
                        console.log(err)
                        return {
                            code: Messages.validation.Program_MutationError.code,
                            error_message : Messages.validation.Program_MutationError.message
                        }    
                    }) 
        }                      
             
    }
}

module.exports = calendar_resolvers;