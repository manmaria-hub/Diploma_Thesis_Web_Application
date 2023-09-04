// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the program

const CoursesDeclarations = require("../../models/CoursesDeclarations");

const courseDeclaration_resolvers = {       
        
    //                 ****************   QUERIES   ****************                  //
    Query : {
        // GET BASIC INFO FOR A SPECIFIC COURSE DECLARATION
        async getBasicForDeclaration(root, args, context) {
            //  Determine the input data
            const studentAEM_Input = args.studentAEM;
            const period_Input = args.period;
            const academicYear_Input = args.academicYear;

            let pipeline = [
                {
                  '$match': {
                    'academic_period': period_Input, 
                    'student_AEM': studentAEM_Input, 
                    'academic_year': academicYear_Input
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'dateParts': {
                      '$dateToParts': {
                        'date': '$updatedAt'
                      }
                    },
                    'declarated_courses': '$declarated_courses'
                  }
                }
            ];

            return await CoursesDeclarations.aggregate(pipeline)
            .then(result=>{
                console.log("[SUCCESS] -> GET DECLARATION BASIC COURSES SUCCESSFUL !!");
                console.log(result);
                return(result[0]);
            })
            .catch(error=> {
                console.log("[ERROR] -> GET DECLARATION BASIC COURSES FAILED !!")
                return([]);
            })
        }, 
        // FIND ALL THE DECLARATIONS OF A STUDENT BY HIS AEM
        async findAllDeclarationsByAEM(root, args, context) {
            //  Determine the input data
            const studentAEM_Input = args.student_AEM; 
            
            // Creating the suitable query
            const query = {"student_AEM" : studentAEM_Input}

            return await CoursesDeclarations.find(query)
            .then(result=>{
                console.log("[SUCCESS] -> FIND ALL DECLARATIONS OF A STUDENT BY HIS AEM SUCCESSFUL !!");
                console.log(result);
                return(result);
            })
            .catch(error=> {
                console.log("[ERROR] -> FIND ALL DECLARATIONS OF A STUDENT BY HIS AEM FAILED !!")
                return([]);
            })
        },
        // GET ALL THE DATABASE'S DECLARATIONS
        async getAllDeclarations(root, args, context) {      

            return await CoursesDeclarations.find() 
                .then(result => {
                    console.log(result);
                    return (result)
                })
                .catch(err=> {
                    throw err;
                })

        },
    },

    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        // ADD A NEW COURSE DECLARATION IN THE DATABASE
        async addNewCourseDeclaration(root, args, context) {

            // Determine the input data for the new course declaration that the user gives with the suitable components and pages
            // This is the new courses' declaration document to be inserted
            const courseDeclarationInput = args.declarationInput;
            console.log(courseDeclarationInput);

            // Insert the new declaration to the corresponding collection using findOneAndUpdate() mongoDB method. The findOneAndUpdate() method is used to update the
            // first matched record with the filter and upsert:true creates a new document if the document doesn't exists that match the filter
            // In our case, we will use this method to update the temporary stored programs of a specific academic semester and when the final program is ready, 
            // we will update the temporary with the final
            
            // The below query will find a document in the programs collection with the values in the firse 'filter' argument and update them with the 
            // given fields in the second argument 
            return await CoursesDeclarations.findOneAndUpdate(
                { "student_AEM" : courseDeclarationInput.student_AEM,
                  "student_username" : courseDeclarationInput.student_username,
                  "academic_period" : courseDeclarationInput.academic_period,
                  "academic_year" : courseDeclarationInput.academic_year,
                  "declaration_type" : courseDeclarationInput.declaration_type}, 
                 { $set : {"student_FirstName" : courseDeclarationInput.student_FirstName,
                            "student_LastName" : courseDeclarationInput.student_LastName,
                            "student_AEM" : courseDeclarationInput.student_AEM,
                            "student_identity": courseDeclarationInput.student_identity,
                            "student_username" : courseDeclarationInput.student_username,
                            "student_uthEmail" : courseDeclarationInput.student_uthEmail,
                            "student_academic_semester" : courseDeclarationInput.student_academic_semester,
                            "academic_period" : courseDeclarationInput.academic_period,
                            "academic_year" : courseDeclarationInput.academic_year,
                            "declaration_type" : courseDeclarationInput.declaration_type,
                            "declaration_category" : courseDeclarationInput.declaration_type,
                            "declaration_activeFromDay" : courseDeclarationInput.declaration_activeFromDay,
                            "declaration_activeFromDate" : courseDeclarationInput.declaration_activeFromDate,
                            "declaration_activeToDay" : courseDeclarationInput.declaration_activeToDay,
                            "declaration_activeToDate" : courseDeclarationInput.declaration_activeToDate,
                            "declaration_state" : courseDeclarationInput.declaration_state,
                            "courses_number" : courseDeclarationInput.courses_number, 
                            "hours_sum" : courseDeclarationInput.hours_sum, 
                            "ECTS_sum" : courseDeclarationInput.ECTS_sum,
                            "studyUnits_sum" : courseDeclarationInput.studyUnits_sum,  
                            "declarated_courses" : courseDeclarationInput.declarated_courses}},
                 { upsert : true, returnOriginal : true }) // when no document is identified using the given filter, the 
                                                          // upsert option will insert a new document and the returnOriginal : false 
                                                          // method will return the modified document of the initial
                    .then(result => {                       
                        console.log(result);
                        
                        console.log("[SUCCESS] -> ADD NEW COURSE DECLARATION SUCCESSFUL !!");
                        return (
                            "[SUCCESS] -> ADD NEW COURSE DECLARATION SUCCESSFUL !!"
                        )  /*
                        else if (result === null) {
                            console.log("[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!");
                            return  (
                                "[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!"
                            )
                        } */                     
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!")                   
                        console.log(err)
                        return  (
                            "[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!"
                        )
                    }) 
        }                      
             
    }
}

module.exports = courseDeclaration_resolvers;