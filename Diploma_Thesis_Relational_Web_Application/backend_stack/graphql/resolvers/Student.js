
// MODELS
const { Student } = require('../../models'); 
 
const student_resolvers = {
    Query : { 
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY AEM
        existStudentByAEM : async(_, args) => {
            let AEM_input = args.AEM; 

            try {
                // Check if the student exist by AEM
                const student = await Student.findOne({where : {General_Information_academic_record_number : AEM_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY USERNAME
        existStudentByUsername : async(_, args) => {
            let Username_input = args.username; 

            try {
                // Check if the student exist by username
                const student = await Student.findOne({where : {Personal_Information_username : Username_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY STUDENT IDENTITY
        existStudentByStudentIdentity : async(_, args) => {
            let StudentIdentity_input = args.student_identity; 

            try {
                // Check if the student exist by student identity
                const student = await Student.findOne({where : {Personal_Information_student_identity : StudentIdentity_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY UNIVERSITY EMAIL
        existStudentByUthEmail : async(_, args) => {
            let UthEmail_input = args.uth_email; 

            try {
                // Check if the student exist by student identity
                const student = await Student.findOne({where : {Student_Address_uth_email : UthEmail_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY AMKA
        existStudentByAMKA : async(_, args) => {
            let AMKA_input = args.AMKA; 

            try {
                // Check if the student exist by AMKA number
                const student = await Student.findOne({where : {Student_Insurance_AMKA_number : AMKA_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        // CHECK IF THE STUDENT ALREADY EXIST IN DATABASE BY AFM
        existStudentByAFM : async(_, args) => {
            let AFM_input = args.AFM; 

            try {
                // Check if the student exist by AFM number
                const student = await Student.findOne({where : {Student_Insurance_AFM_number : AFM_input}})
                if (student) {
                    return true;
                }
                else if (!student) {
                    return false;
                }

            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },/*
        // GET ALL THE STUDENTS  
        getAllStudents : async(_, args) => {   
            try {
                // Get all the students
                const student = await Student.findAll()
                if (student) {
                    console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE SUCCESSFUL !!");  
                    let studentArray = [];
                    student.forEach(stud=> {
                        studentArray.push(stud.dataValues)
                    }) 
                    return studentArray
                }
                else if (!student) {
                    console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                    return [];
                }

            }
            catch (err) {
                console.log(err);
                console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                return [];
            }
          },*/
           // GET THE DATA OF THE CONNECTED Student
        getConnectedStudent : async(_, args) => {
            // Input values for student Information
            const username = args.username;
            const email = args.email; 

            try {
                // Check if the student exist by AMKA number
                const connectedStudent = await Student.findOne({where : {General_Information_academic_email : email, Personal_Information_username : username}})
                if (connectedStudent) { 
                    return {
                        student : connectedStudent.dataValues,
                        code : 'allOk',
                        OKmessage : 'Successfull!'
                    }
                }
                else if (!connectedStudent) {
                    return {
                        student : null,
                        code : 'allWrong', 
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
        // MUTATION TO ADD A NEW STUDENT IN THE DATABASE
        addNewStudent : async(_, args) => {
            let studentInput = args.studentInput; 
            let errors = {}

            try {  
                if (Object.keys(errors).length > 0 ){
                    throw errors;
                } 

                // Create new student
                const student = await Student.create(studentInput)
                // Return new student
                return student

            } catch(err) {
                console.log(err)
                throw err;                 
            }
        },/*
         // UPDATE THE SELECTED BY USERNAME STUDENT
         updateStudentByUsername : async(_, args)=> {

            // Determine the input data  
            const usernameInput = args.username;  
            const editStudentData = args.editStudent;
            
            try { 
                // Update student
                const student = await Student.update({editStudentData}, {where:{"Personal_Information_username" : usernameInput}})
                // Return new student
                console.log("[SUCCESS] -> EDIT STUDENT SUCCESSFUL !!"); 
                return student

            } catch(err) {
                console.log("[ERROR] -> EDIT STUDENT FAILED !!") 
                console.log(err)
                throw err;                 
            }
        }, */
    }
}

module.exports = student_resolvers;