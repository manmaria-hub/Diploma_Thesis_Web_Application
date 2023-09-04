// Resolvers for the Halls

// Import the suitable schema
const { ObjectId } = require('mongodb');
const Professors = require('../../models/Professor'); 

const professors_resolvers = {    

    //                 ****************   QUERIES   ****************                  //
     
    //                 ****************   MUTATIONS   ****************                  //
    Query : {
        async addNewProfessor(root, args, context) {
            let profInput = args.professorToSubmit;
            let errors = {}
            console.log(args);
            try {  
                // Check if form already exist
             // const formExist = await Forms.findOne({application_form : {application_form},form_name : {form_name},  ID_student  : {ID_student}, semester : semester});
                // DUPLICATE USERNAMES
               // if (formExist) errors.form = 'Έχει καταχωρηθεί ήδη τέτοιου είδους αίτηση από το συγκεκριμένο φοιτητή!'
              
                if (Object.keys(errors).length > 0 ){
                    console.log(errors.form)
                    throw errors;
                }                
                // Create professor 
                return await Professors.create(profInput)
                .then(res=> {
                    console.log(res)
                    return {_id:  new ObjectId(res._id),
                        ...res._doc}            
                })
                .catch(err=> {
                    console.log(err)
                })
                

            } catch(err) { 
                console.log(err)
                //throw new UserInputError('Bad input', {errors})
            }        
        },
        // UPDATE THE SELECTED BY USERNAME PROFESSOR
        async updateProfessorByUsername(root, args, context) {

            // Determine the input data  
            const usernameInput = args.username;  
            const editProfessorData = args.editProfessor;
console.log(editProfessorData?.PERSONAL_INFO?.active)
            return await Professors.updateOne(
                { "ACADEMIC_INFO.username" : usernameInput }, 
                 { $set : {"PERSONAL_INFO.first_name" : editProfessorData?.PERSONAL_INFO?.first_name,
                           "PERSONAL_INFO.last_name" : editProfessorData?.PERSONAL_INFO?.last_name,
                           "PERSONAL_INFO.father_FirstName" : editProfessorData?.PERSONAL_INFO?.father_FirstName,
                           "PERSONAL_INFO.father_LastName" : editProfessorData?.PERSONAL_INFO?.father_LastName,
                           "PERSONAL_INFO.mother_FirstName" : editProfessorData?.PERSONAL_INFO?.mother_FirstName,
                           "PERSONAL_INFO.mother_LastName" : editProfessorData?.PERSONAL_INFO?.mother_LastName,
                           "PERSONAL_INFO.maiden_name" : editProfessorData?.PERSONAL_INFO?.maiden_name,
                           "PERSONAL_INFO.family" : editProfessorData?.PERSONAL_INFO?.family,
                           "PERSONAL_INFO.gender" : editProfessorData?.PERSONAL_INFO?.gender, 
                           "PERSONAL_INFO.active" : editProfessorData?.PERSONAL_INFO?.active, 
                           "ACADEMIC_INFO.departmentName" : editProfessorData?.ACADEMIC_INFO?.departmentName,
                           "ACADEMIC_INFO.category"  : editProfessorData?.ACADEMIC_INFO?.category,
                           "ACADEMIC_INFO.professor_type"  : editProfessorData?.ACADEMIC_INFO?.professor_type,
                           "ACADEMIC_INFO.position"  : editProfessorData?.ACADEMIC_INFO?.position,
                           "ACADEMIC_INFO.office"  : editProfessorData?.ACADEMIC_INFO?.office,
                           "ACADEMIC_INFO.office_hours"  : editProfessorData?.ACADEMIC_INFO?.office_hours,
                           "ACADEMIC_INFO.office_email"  : editProfessorData?.ACADEMIC_INFO?.office_email,
                           "ACADEMIC_INFO.office_telephone"  : editProfessorData?.ACADEMIC_INFO?.office_telephone,
                           "ACADEMIC_INFO.specialization"  : editProfessorData?.ACADEMIC_INFO?.specialization,
                           "ACADEMIC_INFO.diploma"  : editProfessorData?.ACADEMIC_INFO?.diploma,
                           "ACADEMIC_INFO.doctorat"  : editProfessorData?.ACADEMIC_INFO?.doctorat,
                            "ACADEMIC_INFO.website"  : editProfessorData?.ACADEMIC_INFO?.website,
                            "ACADEMIC_INFO.CV"  : editProfessorData?.ACADEMIC_INFO?.CV,
                            "ACADEMIC_INFO.scholar"  : editProfessorData?.ACADEMIC_INFO?.scholar,
                            "ACADEMIC_INFO.academic_email"  : editProfessorData?.ACADEMIC_INFO?.academic_email,
                            "ACADEMIC_INFO.username"  : editProfessorData?.ACADEMIC_INFO?.username,
                            "INSURANCE_INFO.AMKA" : editProfessorData?.INSURANCE_INFO?.AMKA,
                            "INSURANCE_INFO.AMKA_country" : editProfessorData?.INSURANCE_INFO?.AMKA_country,
                            "INSURANCE_INFO.AFM" : editProfessorData?.INSURANCE_INFO?.AFM,
                            "INSURANCE_INFO.DOY" : editProfessorData?.INSURANCE_INFO?.DOY,
                            "INSURANCE_INFO.AFM_country" : editProfessorData?.INSURANCE_INFO?.AFM_country,
                            "INSURANCE_INFO.nationality" : editProfessorData?.INSURANCE_INFO?.nationality,
                            "INSURANCE_INFO.identity_number" : editProfessorData?.INSURANCE_INFO?.identity_number,
                            "INSURANCE_INFO.identity_type" : editProfessorData?.INSURANCE_INFO?.identity_type,    
                            "COMMUNICATION_DETAILS.telephone" : editProfessorData?.COMMUNICATION_DETAILS?.telephone,
                            "COMMUNICATION_DETAILS.mobile" : editProfessorData?.COMMUNICATION_DETAILS?.mobile,
                            "COMMUNICATION_DETAILS.alternative_email" : editProfessorData?.COMMUNICATION_DETAILS?.alternative_email,
                            "COMMUNICATION_DETAILS.city" : editProfessorData?.COMMUNICATION_DETAILS?.city,
                            "COMMUNICATION_DETAILS.road" : editProfessorData?.COMMUNICATION_DETAILS?.road,
                            "COMMUNICATION_DETAILS.number" : editProfessorData?.COMMUNICATION_DETAILS?.number,
                            "COMMUNICATION_DETAILS.region" : editProfessorData?.COMMUNICATION_DETAILS?.region,			
                            "COMMUNICATION_DETAILS.postcode" : editProfessorData?.COMMUNICATION_DETAILS?.postcode}}   )              
                    .then(result => {                       
                        //console.log(result);
                        
                        console.log("[SUCCESS] -> ADD NEW COURSE DECLARATION SUCCESSFUL !!");
                        return (
                            result[0]
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
        },
        // DELETE A PROFESSOR BY ID 
        async deleteProfessorById(root, args, context) {
            let professorID = args.professorID;
            let errors = {}
            console.log(args);
            try {                 
                if (Object.keys(errors).length > 0 ){
                    console.log(errors.form)
                    throw errors;
                }                
                // Delete professor 
                return await Professors.deleteOne({"_id" : professorID})
                .then(res=> {
                    console.log(res)
                    return ('Success deletion !')
                })
                .catch(err=> {
                    console.log(err)
                    return('Unsuccess deletion !')
                })
                

            } catch(err) { 
                console.log(err)
                //throw new UserInputError('Bad input', {errors})
            }        
        } ,
         // DELETE A PROFESSOR BY USERNAME 
         async deleteProfessorByUsername(root, args, context) {
            let professorUsername = args.professorUsername;
            let errors = {}
            console.log(args);
            try {                 
                if (Object.keys(errors).length > 0 ){
                    console.log(errors.form)
                    throw errors;
                }                
                // Delete professor 
                return await Professors.deleteOne({"ACADEMIC_INFO.username" : professorUsername})
                .then(res=> {
                    console.log(res)
                    return ('Success deletion !')
                })
                .catch(err=> {
                    console.log(err)
                    return('Unsuccess deletion !')
                })
                

            } catch(err) { 
                console.log(err)
                //throw new UserInputError('Bad input', {errors})
            }        
        } ,
    
    // GET THE DATA OF THE CONNECTED STUDENT
    async getConnectedProfessor(root, args, context) {
        // Input values for Student Information
        const username = args.professor_username;
        const email = args.professor_email;

        // Query for the course that has the specific code
        const query = {"ACADEMIC_INFO.academic_email" : email, "ACADEMIC_INFO.username" : username};

        return await Professors.find(query)
            .then(result=>{
                console.log("[SUCCESS] -> GET PROFESSOR SUCCESSFUL !!");                    
                console.log(result)
                return {
                    professor : result[0],
                    message : 'Successfull!'
                }
            })
            .catch(error=> {
                console.log(error)
                console.log("[ERROR] -> GET PROFESSOR FAILED !!")
                return {
                    professor : null,
                    message : 'Unsuccessfull!'
                }
            })
        },
        // GET THE DATA OF ALL DATABASE'S PROFESSORS
        async getAllProfessors(root, args, context) { 

            // Query for all the database's professors
            return await Professors.find()
                .then(result=>{
                    console.log("[SUCCESS] -> GET ALL THE PROFESSORS SUCCESSFUL !!");                    
                    let array = [];
                    result.map(item=> {
                        array.push(item)
                    })
                    console.log(array)
                    return (array)
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET ALL THE PROFESSORS FAILED !!")
                    return []
                })
            },            
        // CHECK IF THE PROFESSOR EXIST BY username
        async existBy_ProfessorUsername(root, args, context) {
            // Input Values for the username
            const input_username = args.username;

            // Query for the professor that has the specific username (the student's usernames must be uniques)
            const query = {"ACADEMIC_INFO.username" : input_username};

            return await Professors.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET PROFESSOR BY USERNAME FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET PROFESSOR BY USERNAME SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROFESSOR BY USERNAME FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE PROFESSOR EXIST BY university email
        async existBy_ProfessorUthEmail(root, args, context) {
            // Input Values for the university email
            const input_uthEmail = args.uth_email;

            // Query for the student that has the specific university email (the student's university emails must be uniques)
            const query = {"ACADEMIC_INFO.academic_email" : input_uthEmail};

            return await Professors.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET PROFESSOR BY UNIVERSITY EMAIL FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET PROFESSOR BY UNIVERSITY EMAIL SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROFESSOR BY UNIVERSITY EMAIL FAILED !!")
                    return false;
                }) 
        },        
        // CHECK IF THE PROFESSOR EXIST BY AMKA
        async existBy_ProfessorAMKA(root, args, context) {
            // Input Values for the AMKA
            const input_AMKA = args.AMKA;

            // Query for the student that has the specific AMKA number (the student's AMKA numbers must be uniques)
            const query = {"INSURANCE_INFO.AMKA" : input_AMKA};

            return await Professors.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET PROFESSOR BY AMKA FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET PROFESSOR BY AMKA SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROFESSOR BY AMKA FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE PROFESSOR EXIST BY AFM
        async existBy_ProfessorAFM(root, args, context) {
            // Input Values for the AFM
            const input_AFM = args.AFM;

            // Query for the professor that has the specific AFM number (the student's AFM numbers must be uniques)
            const query = {"INSURANCE_INFO.AFM" : input_AFM};

            return await Professors.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET PROFESSOR BY AFM FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET PROFESSOR BY AFM SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROFESSOR BY AFM FAILED !!")
                    return false;
                }) 
        },
        // GET ALL PROFESSORS GROUP BY PROFESSOR'S TYPE
        async getAllProfessorsByGroup(root, args, context) { 
            const pipeline = [
                {
                  '$group': {
                    '_id': '$ACADEMIC_INFO.professor_type', 
                    'professors': {
                      '$push': {
                        '_id': '$_id', 
                        'PERSONAL_INFO': '$PERSONAL_INFO', 
                        'ACADEMIC_INFO': '$ACADEMIC_INFO', 
                        'INSURANCE_INFO': '$INSURANCE_INFO', 
                        'COMMUNICATION_DETAILS': '$COMMUNICATION_DETAILS'
                      }
                    }
                  }
                },
                {
                    '$sort': { 
                      '_id' : 1, 
                      'professors.ACADEMIC_INFO.professor_type': 1,
                      'professors.PERSONAL_INFO.last_name': 1
                    }
                  }
              ];            

            return await Professors.aggregate(pipeline)
                .then(result=>{                       
                    if (result.length === 0) {                        
                        console.log("[SUCCESS] -> GET ALL PROFESSORS GROUP BY PROFESSOR TYPE FAILED (LENGTH === 0)!!");  
                        return [];
                    }    
                    else {
                        console.log("[SUCCESS] -> GET ALL PROFESSORS GROUP BY PROFESSOR TYPE SUCCESSFUL !!");  
                        return result;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET ALL PROFESSORS GROUP BY PROFESSOR TYPE FAILED !!")
                    return [];
                }) 
        }, 
    },
}         
    


module.exports = professors_resolvers;