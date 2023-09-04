// JSON FILES
const inputProfessors = require('../../input/DiplomaThesis.professors.json')

// MODELS
const { Professor } = require('../../models'); 
 
const professor_resolvers = {
    //                 ****************   QUERIES   ****************                  //
    Query : {
        getAllProfessors : async (_, __, {professor}) => {  
            try {  
                // Get all the professors  
                const professors = await Professor.findAll(); 
                let profArray = [];
                professors.forEach(prof=> {
                    profArray.push(prof.dataValues);
                })
                console.log(profArray)
                return (profArray) ;   
            } 
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // ADD ALL THE KNOWN INPUT PROFESSORS IN THE DATABASE (IF THE PROFESSORS' DATABASE IS EMPTY)
        fillProfessorsDatabase : async(_, args) => {
            try {
            // Determine the input data for the new professors that the user gives with the input json file
            // This is the document to be inserted
            inputProfessors.forEach(professorInput => { 
                Professor.create(professorInput)            
                .then(result => {
                    console.log("[SUCCESS] -> FILL PROFESSORS' DATABASE SUCCESSFUL !!"); 
                    console.log(result.dataValues)
                    professorsRes = result.dataValues;
                    })
                .catch(err => {                            
                    console.log("[ERROR] -> FILL PROFESSORS' DATABASE FAILED !!")                   
                    console.log(err)
                    return {
                        err
                    }    
                }) 
                 
            }) 
            return ('All OK')
        }
        catch(err) {
            console.log(err)
            return ('ERROR')             
        }},
        // GET THE DATA OF THE CONNECTED PROFESSOR
        getConnectedProfessor : async(_, args) => {
            // Input values for Professor Information
            const username = args.professor_username;
            const email = args.professor_email; 

            try {
                // Check if the student exist by AMKA number
                const connectedProfessor = await Professor.findOne({where : {ACADEMIC_INFO_academic_email : email, ACADEMIC_INFO_username : username}})
                if (connectedProfessor) { 
                    return {
                        professor : connectedProfessor.dataValues,
                        message : 'Successfull!'
                    }
                }
                else if (!connectedProfessor) {
                    return {
                        professor : null,
                        message : 'Unsuccessfull!'
                    }
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },      
    },
    Mutation : {
        
    }
}

module.exports = professor_resolvers;