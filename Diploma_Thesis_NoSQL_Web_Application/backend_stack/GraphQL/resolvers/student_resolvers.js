// Import return success and error codes and messages
const Messages = require('../../config/validation.json');

// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the student

const Student = require("../../models/Student");

const student_resolvers = {

    StudentState: {
        __resolveType :(obj) => {
            if (obj.OKmessage) {
                return 'Student_OK';
            }  
            if (obj.errormessage) {
                return 'Student_Error';
            } 
            if (obj.OK_MultipleMessage) {
                return 'MultipleStudents_OK'
            }
            return null;
        },
    },
    Query : {
        // GET THE DATA OF THE CONNECTED STUDENT
        async getConnectedStudent(root, args, context) {
            // Input values for Student Information
            const username = args.username;
            const email = args.email;

            // Query for the course that has the specific code
            const query = {"Personal_Info.Personal_Information.username" : username, "Studentship_Info.General_Information.academic_email" : email};

            return await Student.find(query)
                .then(result=>{
                    console.log("[SUCCESS] -> GET STUDENT SUCCESSFUL !!");                    
                    console.log(result)
                    return {
                        student : result[0],
                        code: Messages.validation.StudentOK.code, 
                        OKmessage : Messages.validation.StudentOK.message 
                    } 
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT FAILED !!")
                    return {
                        code: Messages.validation.StudentError.code,
                        error_message : Messages.validation.StudentError.message
                    } 
                }) 
        },
        // FIND STUDENT BY USERNAME AND RETURN ALL THE INFORMATION 
        async findStudent(root, args, context) {
            // Input Values for the AEM
            const studentUsername = args.username;

            // Query for the student that has the specific AEM  
            const query = {"Personal_Info.Personal_Information.username" : studentUsername};

            return await Student.find(query)
                .then(result=> {                       
                    if (result.length === 0) {
                        console.log(result)
                        console.log("[SUCCESS] -> FIND STUDENT BY AEM FAILED !!");  
                        return [];
                    }    
                    else {
                        console.log(result)
                        console.log("[SUCCESS] -> FIND STUDENT BY AEM SUCCESSFUL !!");  
                        return result[0];
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY AEM FAILED !!")
                    return null;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY AEM
        async existStudentByAEM(root, args, context) {
            // Input Values for the AEM
            const input_AEM = args.AEM;

            // Query for the student that has the specific AEM (the student's AEMs must be uniques)
            const query = {"Studentship_Info.General_Information.academic_record_number" : input_AEM};

            return await Student.find(query)
                .then(result=> {                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY AEM FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY AEM SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY AEM FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY username
        async existStudentByUsername(root, args, context) {
            // Input Values for the username
            const input_username = args.username;

            // Query for the student that has the specific username (the student's usernames must be uniques)
            const query = {"Personal_Info.Personal_Information.username" : input_username};

            return await Student.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY USERNAME FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY USERNAME SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY USERNAME FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY university email
        async existStudentByUthEmail(root, args, context) {
            // Input Values for the university email
            const input_uthEmail = args.uth_email;

            // Query for the student that has the specific university email (the student's university emails must be uniques)
            const query = {"Personal_Info.Student_Address.uth_email" : input_uthEmail};

            return await Student.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY UNIVERSITY EMAIL FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY UNIVERSITY EMAIL SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY UNIVERSITY EMAIL FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY student identity
        async existStudentBystudentIdentity(root, args, context) {
            // Input Values for the student identity
            const input_studentIdentity = args.student_identity;

            // Query for the student that has the specific student identity (the student's identities must be uniques)
            const query = {"Personal_Info.Personal_Information.student_identity" : input_studentIdentity};

            return await Student.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY ACADEMIC IDENTITY FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY ACADEMIC IDENTITY SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY ACADEMIC IDENTITY FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY AMKA
        async existStudentByAMKA(root, args, context) {
            // Input Values for the AMKA
            const input_AMKA = args.AMKA;

            // Query for the student that has the specific AMKA number (the student's AMKA numbers must be uniques)
            const query = {"Personal_Info.Student_Insurance.AMKA_number" : input_AMKA};

            return await Student.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY AMKA FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY AMKA SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY AMKA FAILED !!")
                    return false;
                }) 
        },
        // CHECK IF THE STUDENT EXIST BY AFM
        async existStudentByAFM(root, args, context) {
            // Input Values for the AFM
            const input_AFM = args.AFM;

            // Query for the student that has the specific AFM number (the student's AFM numbers must be uniques)
            const query = {"Personal_Info.Student_Insurance.AFM_number" : input_AFM};

            return await Student.find(query)
                .then(result=>{                       
                    if (result.length === 0) {
                        console.log("[SUCCESS] -> GET STUDENT BY AFM FAILED !!");  
                        return false;
                    }    
                    else {
                        console.log("[SUCCESS] -> GET STUDENT BY AFM SUCCESSFUL !!");  
                        return true;
                    }
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET STUDENT BY AFM FAILED !!")
                    return false;
                }) 
        },
        // GET ALL THE STUDENTS  
        async getAllStudents(root, args, context) {   
            return await Student.find( )
              .then(result=>{                    
                  if (result.length > 0) {
                    console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE SUCCESSFUL !!");  
                    return result
                  }
                  else {
                    return []
                  }
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                  return []
              })  
          },
          // GET ALL PROFESSORS GROUP BY PROFESSOR'S TYPE
        async getAllStudentsByGroup(root, args, context) { 
            const pipeline = [
                {
                  '$group': {
                    '_id': '$Studentship_Info.General_Information.course_program_part', 
                    'students': {
                      '$push': {
                        '_id': '$_id', 
                        'Personal_Info': '$Personal_Info', 
                        'Studentship_Info': '$Studentship_Info'
                      }
                    }
                  }
                }, {
                  '$sort': {
                    '_id': 1, 
                    'students.Studentship_Info.General_Innformation.academic_record_number': 1, 
                    'students.Personal_Info.Personal_Information.last_name': 1
                  }
                }
              ];            

            return await Student.aggregate(pipeline)
                .then(result=>{                       
                    if (result.length === 0) {                        
                        console.log("[SUCCESS] -> GET ALL STUDENTS GROUP BY FAILED (LENGTH === 0)!!");  
                        return [];
                    }    
                    else {
                        console.log("[SUCCESS] -> GET ALL STUDENTS GROUP BY SUCCESSFUL !!");  
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

    Mutation : {
        // INSERTION OF ONE STUDENT 
        async addStudent(root, args, context) {
            // Input values for Student Insurance Information
            const {AMKA , AFM , DOY , AMKA_country,  AFM_country} = args.studentInput.Personal_Info.Student_Insurance;

            // Input values for Personal Information
            const {last_name, first_name, dot_father_name, father_FirstName, father_LastName, 
                   maiden_name, mother_FirstName, mother_LastName, spouse_name, profession,
                   mother_profession, father_profession, family, username, personal_title, 
                   website, student_identity, active, fulfilled_military_obligations, sex, notations} = args.studentInput.Personal_Info.Personal_Information;

            // Input values for Birth Details Information
            const {birth_date, gender, birth_prefecture, birth_country, birth_location} = args.studentInput.Personal_Info.Birth_Details;

            // Input values for Student Identity Information
            const {identity_type, citizenship, citizen, identity_number, citizen_number, published_principle, 
                publish_date, nationality, nationality_second, male_record_num, male_record_perf, male_record_gr, 
                male_record_loc} = args.studentInput.Personal_Info.Student_Identity;

            // Input values for Student Address Information
            const {road, rd_number, city, location, country, acting_address, postcode, telephone, mobile_phone, 
                   uth_email, alternative_email} = args.studentInput.Personal_Info.Student_Address;

            // Input values for Third Person Contact Details Information
            const {contact_type, person_FirstName, person_LastName, person_address, person_telephone, 
                   person_mobilephone, person_email} = args.studentInput.Personal_Info.Third_Person_Contact_Details;

            // Input values for General Information 
            const {department, department_number, course, course_number, academic_email, student_situation, 
                   current_academic_year, current_academic_semester, current_attendance_period, academic_record_number, 
                   general_academic_record_number, academic_identity, course_program_part, course_program_subpart, 
                   education_number, second_course_program_part, second_course_program_subpart, comment_to_student, 
                   total_fees, sub_attendance} = args.studentInput.Studentship_Info.General_Information;

            // Input values for Registration Details
            const {registration_year, registration_semester, registration_period, registration_way} = args.studentInput.Studentship_Info.Registration_Details;

            // Input values for Professor Advisor Details 
            const {professorAdvisor_FirstName, professorAdvisor_LastName, professorAdvisor_Email} = args.studentInput.Studentship_Info.Professor_Advisor_Details;

            // Creating the new registration of student 

            // First phase
            const Student_Insurance = {AMKA , AFM , DOY , AMKA_country,  AFM_country}; 
            const Personal_Information = {last_name, first_name, dot_father_name, father_FirstName, father_LastName, 
                                                maiden_name, mother_FirstName, mother_LastName, spouse_name, profession,
                                                mother_profession, father_profession, family, username, personal_title, 
                                                website, student_identity, active, fulfilled_military_obligations, sex, notations};
            const Birth_Details = {birth_date, gender, birth_prefecture, birth_country, birth_location};
            const Student_Identity = {identity_type, citizenship, citizen, identity_number, citizen_number, published_principle, 
                                            publish_date, nationality, nationality_second, male_record_num, male_record_perf, male_record_gr, 
                                            male_record_loc};
            const Student_Address = {road, rd_number, city, location, country, acting_address, postcode, telephone, mobile_phone, 
                                           uth_email, alternative_email};
            const Third_Person_Contact_Details = {contact_type, person_FirstName, person_LastName, person_address, person_telephone, 
                                                    person_mobilephone, person_email};

            const General_Information = {department, department_number, course, course_number, academic_email, student_situation, 
                                               current_academic_year, current_academic_semester, current_attendance_period, academic_record_number, 
                                               general_academic_record_number, academic_identity, course_program_part, course_program_subpart, 
                                               education_number, second_course_program_part, second_course_program_subpart, comment_to_student, 
                                               total_fees, sub_attendance};

            const Registration_Details = {registration_year, registration_semester, registration_period, registration_way};

            const Professor_Advisor_Details = {professorAdvisor_FirstName, professorAdvisor_LastName, professorAdvisor_Email};

            // Second Phase
            const Personal_Info = {Student_Insurance, Personal_Information, Birth_Details, 
                                        Student_Identity, Student_Address, Third_Person_Contact_Details};    
                                         
            const Studentship_Info = {General_Information, Registration_Details, Professor_Advisor_Details};

            // Third Phase - the new student to registrate
            const inputStudent = args.studentInput;
            
            console.log()
            const createdStudent = new Student( inputStudent , (err) => {if (err) throw err});    
            console.log(createdStudent)
            return student = await createdStudent.save()
                .then(result => { 
                    console.log('[SUCCESS] -> STUDENT BE ADDED !')
                    console.log(result); 
                    return {
                        student : {_id: result._id,
                                    ...result._doc},
                        code: Messages.validation.StudentOK.code, 
                        OKmessage : Messages.validation.StudentOK.message
                    };
                })
                .catch(err => {
                    console.log('[ERROR] -> STUDENT DO NOT BE ADDED')
                    console.log(err);
                    return {
                        code : Messages.validation.StudentError.code,
                        errormessage : Messages.validation.StudentError.message
                    }                    
                });     
        },


        // INSERTION OF MULTIPLE STUDENTS
        async addMultipleStudents(root, args, context) {
            
            // Input array of Students
            const docs = args.input;
          
            //  The uri string for our MongoDB deployment's connection
            const MONGODB_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@diplomathesis.8rhs176.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
            
            // Our MongoDB client
            const client = new MongoClient(MONGODB_uri);

            // Determine the corressponding database and collection of students
            const studentsDatabase = client.db(process.env.MONGO_DATABASE);
            const students = studentsDatabase.collection("students");

            // Option that prevents additional documents from being inserted if one fails
            const options = { ordered: true};

            console.log(args.input, 'ARRAY OF STUDENTS TO INSERT');

            // Make the INSERT MANY query 
            
            return await Student.insertMany(docs, options)
                .then(result=> {
                    console.log("[SUCCESS] -> STUDENT BE ADDED!")
                    console.log(result)
                    return {
                        code : Messages.validation.StudentOK.code,
                        OKmessage : Messages.validation.StudentOK.message
                    }
                })
                .catch(err => {
                    console.log('[ERROR] -> STUDENT DO NOT BE ADDED')
                    console.log(err);
                    return {
                        code : Messages.validation.StudentError.code,
                        errormessage : Messages.validation.StudentError.message
                    }                    
                });   

        },
        // UPDATE THE SELECTED BY USERNAME STUDENT
        async updateStudentByUsername(root, args, context) {

            // Determine the input data  
            const usernameInput = args.username;  
            const editStudentData = args.editStudent; 
            return await Student.updateOne(
                { "Personal_Info.Personal_Information.username" : usernameInput }, 
                 { $set : {"Personal_Info" : editStudentData?.Personal_Info,
                           "Studentship_Info" : editStudentData?.Studentship_Info }}   )              
                    .then(result => {                                    
                        console.log("[SUCCESS] -> EDIT STUDENT SUCCESSFUL !!");
                        return (
                            result[0]
                        )                      
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> EDIT STUDENT FAILED !!")                   
                        console.log(err)
                        return  (
                            "[ERROR] -> EDIT STUDENT FAILED !!"
                        )
                    }) 
        }, 
        // UPDATE THE SEMESTER FOR ALL THE STUDENTS 
        async updateSemesterForAll(root, args, context) {
            const allStudents = args.allStudents; 
        console.log(allStudents)
        return await allStudents.forEach(student => {
            Student.findOneAndUpdate(
                    { "Personal_Info.Personal_Information.username" : student.Personal_Info.Personal_Information.username}, 
                    { $set : {"Studentship_Info.General_Information.current_academic_semester" : student.Studentship_Info.General_Information.current_academic_semester,
                              "Studentship_Info.General_Information.current_attendance_period" : student.Studentship_Info.General_Information.current_attendance_period, 
                              "Studentship_Info.General_Information.current_academic_year" : student.Studentship_Info.General_Information.current_academic_year}},
                    )
                    .then(result => {
                        console.log("[SUCCESS] -> UPDATE STUDENT SEMESTER SUCCESSFUL !!");
                        console.log(result);
                        return "OK !"
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> UPDATE STUDENT SEMESTER FAILED !!")                   
                        console.log(err)
                        return "ERROR !"
                    }) 
                            
            }); 
        }, 
        // DELETE A STUDENT BY USERNAME 
        async deleteStudentByUsername(root, args, context) {
            let studentUsername = args.studentUsername; 

            try {                  
                // Delete student 
                return await Student.deleteOne({"Personal_Info.Personal_Information.username" : studentUsername})
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
    }
}

module.exports = student_resolvers;