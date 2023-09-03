// Import return success and error codes and messages
const Messages = require('../../config/validation.json');

// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the program

const Program = require("../../models/Program");

const program_resolvers = {

    ProgramState: {
        __resolveType : (obj) => { 
            if (obj.SimpleOK_message) {
                return 'Program_SimpleOK';
            }  
            if (obj.OK_message) {
                return 'Program_OK';
            } 
            if (obj.error_message) {
                return 'Program_Error'
            }
            return null;
        },
    },

    //                 ****************   QUERIES   ****************                  //
    Query : { 
        // CHECK ΦΟΡ ΤΗΕ ΠΡΟΓΡΑΜ
        async findProgram(root, args, context) {
            // Input Values for the AFM
            const program_category_input = args.program_category;
            const program_study_level_input = args.program_study_level;
            const program_period_input = args.program_period;
            const program_academic_year_input = args.program_academic_year;
            const program_state_input = args.program_state;

            // Query for the professor that has the specific AFM number (the student's AFM numbers must be uniques)
            const query = {"program_category" : program_category_input, "program_study_level" : program_study_level_input, "program_period" : program_period_input, "program_academic_year" : program_academic_year_input, "program_state" : program_state_input};

            return await Program.find(query)
                .then(result=>{       
                    console.log(result)                
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET PROGRAM !!");  
                        return [];
                    }    
                    else {
                        console.log("[SUCCESS] -> GET PROGRAM !!");  
                        return result[0];
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROGRAM !!")
                    return [];
                }) 
        },                
    },   
        
    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        // ADD A NEW PROGRAM IN THE DATABASE
        async createNewProgram(root, args, context) {

            // Determine the input data for the new program that the user gives with the suitable components and pages
            // This is the program's document to be inserted
            const program_Input = args.programInput;
            console.log(program_Input);

            // Insert the new program to programs' collection using findOneAndUpdate() mongoDB method. The findOneAndUpdate() method is used to update the
            // first matched record with the filter and upsert:true creates a new document if the document doesn't exists that match the filter
            // In our case, we will use this method to update the temporary stored programs of a specific academic semester and when the final program is ready, 
            // we will update the temporary with the final
            
            // The below query will find a document in the programs collection with the values in the firse 'filter' argument and update them with the 
            // given fields in the second argument
            return await Program.findOneAndUpdate(
                { "program_category" : program_Input.program_category,
                  "program_study_level" : program_Input.program_study_level,
                  "program_period" : program_Input.program_period,
                  "program_academic_year" : program_Input.program_academic_year },
                 { $set : {"program_state" : program_Input.program_state, "main_program" : program_Input.main_program }},
                 { upsert : true, returnOriginal : true }) // when no document is identified using the given filter, the 
                                                          // upsert option will insert a new document and the returnOriginal : false 
                                                          // method will return the modified document of the initial
                    .then(result => {
                        console.log("[SUCCESS] -> ADD NEW PROGRAM CATEGORY SUCCESSFUL !!");
                        console.log(result);
                        return {
                            code: Messages.validation.Program_MutationOK.code, 
                            OK_message : Messages.validation.Program_MutationOK.message
                        }
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> ADD NEW PROGRAM CATEGORY FAILED !!")                   
                        console.log(err)
                        return {
                            code: Messages.validation.Program_MutationError.code,
                            error_message : Messages.validation.Program_MutationError.message
                        }    
                    }) 
        }                      
             
    }
}

module.exports = program_resolvers;