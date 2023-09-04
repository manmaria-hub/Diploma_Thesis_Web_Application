// Resolvers for the Halls
const {AuthenticationError}=require('apollo-server')
// MODELS
const { Hall } = require('../../models'); 

// JSON FILES
const inputHalls = require('../../input/DiplomaThesis.halls.json')

const halls_resolvers = {    

    //                 ****************   QUERIES   ****************                  //
    Query : {   
        // ADD ALL THE KNOWN INPUT HALLS IN THE DATABASE  
        fillHallDatabase : async(_, args) => {
            try {
            // Determine the input data for the new hall that the user gives with the input json file
            // This is the document to be inserted
            inputHalls.forEach(hallInput => {
                console.log(hallInput)
                Hall.create(hallInput)            
                .then(result => {
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!"); 
                    console.log(result.dataValues)
                    hallsRes = result.dataValues;
                    })
                .catch(err => {                            
                    console.log("[ERROR] -> ADD NEW COURSE FAILED !!")                   
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
             
        }},
        // ADD A NEW HALL IN THE DATABASE
        addNewHall : async(_, args) => {
            try {
            // Determine the input data for the new hall that the user gives with the suitable form
            // This is the document to be inserted
            const hallInput = args.hallInput;
            console.log(hallInput);

            // Insert new hall to halls' collection using create() mongoDB method            
            let hallsRes = {} ;
            await Hall.create(hallInput)            
                .then(result => {
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!"); 
                    console.log(result.dataValues)
                    hallsRes = result.dataValues;
                    })
                .catch(err => {                            
                    console.log("[ERROR] -> ADD NEW COURSE FAILED !!")                   
                    console.log(err)
                    return {
                        err
                    }    
                })  
                return (hallsRes)
        }
        catch(err) {
            console.log(err)
             
        }},

        // GET ALL THE EMPTY OFFFICE OF PROFESSORS
        async getAllEmptyProfessorsOffices(root, args, context) {            
            const query = {"Hall_type" : 'Γραφείο Καθηγητή', "Hall_owner.owner_name":'', "Hall_owner.owner_email":''}
                      

            return await Halls.find({where : query})
                .then(result => {
                    console.log(result)
                    return(result);
                })
                .catch(err=> {
                    throw err;
                })
        },
        async getAllStudyAndLabHalls(root, args, context) {
            // Use the $in Operator to Match Values
            // Create the query that selects all the documents in the Halls collection where the value of the
            // Hall_category field is either 'Αίθουσες Διδασκαλίας' or 'Εργαστήρια'
            const query = {"Hall_category" : {$in : ['Αίθουσες Διδασκαλίας', 'Εργαστήρια']}}
            
            const options = { 
                // not include the _id field in the returned document
                "_id": false
            }

            return await Halls.find(query, options)
                .then(result => {
                    console.log(result)
                    return(result);
                })
                .catch(err=> {
                    throw err;
                })
        },
        async findHallByCode(root, args, context) {
            
            // // Determine the input code for the new hall that the user gives with the suitable form 
            const hallCode = args.hallCode; 

            // Query for all the hall that has the scpecifc code
            const query = {"Hall_code" : hallCode}

            return await Halls.find(query) 
                .then(result => {
                    console.log(result);
                    return (result[0])
                })
                .catch(err=> {
                    throw err;
                })

        },            
     
        // FIND THE NAMES OF ALL THE AMPHITHEATRES OF THE DEPARTMENT
        async getAllAmphitheatres(root, args, context) { 

            // Query for all the halls that are amphitheatres.
            const query = {"Hall_type" : "Αμφιθέατρο"}

            const options = { 
                // include only the hall label in the returned document
                "Hall_label": true, "_id": false
            }
            // Find all amphitheatres of the halls' collection using find() mongoDB method            
            return await Hall.findAll({where : query, options})
                        .then(result => {
                            console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");
                            console.log(result.map(e=>e.dataValues));
                            let array = [];
                            result.forEach(item=> { 
                                array.push(item.dataValues.Hall_label);
                            })
                            console.log(array)
                            return array;
                            })
                        .catch(err => {                            
                            console.log("[ERROR] -> ADD NEW COURSE FAILED !!")                   
                            console.log(err)
                            return {
                            err
                            }    
                        }) 
        },    

        // FIND THE CODES OF ALL THE HALLS OF THE DEPARTMENT
        async getAllHallCodes(root, args, context) { 

            const options = { 
                // include only the hall code in the returned document
                "Hall_code": true, "_id": false
            }
            // Find all the codes of the halls' collection using find() mongoDB method            
            return await Halls.find({},options)
                        .then(result => {
                            console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");
                            let array = [];
                            result.forEach(item=> {
                                array.push(item.Hall_code);
                            })
                            console.log(array)
                            return array;
                            })
                        .catch(err => {                            
                            console.log("[ERROR] -> ADD NEW COURSE FAILED !!")                   
                            console.log(err)
                            return {
                            err
                            }    
                        }) 
        },    
    },
    Mutation :{
        //                 ****************   MUTATIONS   ****************    */
        // After the storage of a new professor we must update the offfice that it be belong to this professor        
        async updateProfessorOfficeOwner(_, args) { 
            // take the arguments
            const hallCode = args.hallCode;
            const professor_name = args.professor_name;
            const professor_email = args.professor_email;

            // Query for all the halls that has the specific code
            const query = {"Hall_code" : hallCode}

            // Set the updated values
            const update = {"Hall_owner_owner_name":professor_name, "Hall_owner_owner_email":professor_email}
    
            // Make the query using findAnModify() method with the new parameter as true
            return await Halls.findOneAndUpdate(query, {$set:update})
                        .then(result => {
                            console.log("[SUCCESS] -> UPDATE PROFESSOR NAME AND EMAIL SUCCESSFUL !!");
                            console.log(result);    
                            return(result)                     
                            })
                        .catch(err => {                            
                            console.log("[ERROR] -> UPDATE PROFESSOR NAME AND EMAIL FAILED !!")                   
                            console.log(err)
                            return {
                            err
                            }    
                        }) 
        }, 
    }   
}        
    


module.exports = halls_resolvers;