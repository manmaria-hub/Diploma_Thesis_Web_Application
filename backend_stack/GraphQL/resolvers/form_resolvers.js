// Resolvers for the Halls

// Import the suitable schema
const Forms = require('../../models/Form'); 

const forms_resolvers = {    

    //                 ****************   QUERIES   ****************                  //
    Query : {  
        // GET ALL THE DATABASE'S FORMS
        async getForms(root, args, context) {      

            return await Forms.find() 
                .then(result => {
                    console.log(result);
                    return (result)
                })
                .catch(err=> {
                    throw err;
                })

        }, 
        // GET ALL THE DATABASE'S FORMS BY STUDENT AEM
        async getFormsByAEM(root, args, context) {   
            // Get the input values
            const student_AEM  = args.AEM_input;   

            // Query for the diploma form of this student
            const query = {"AEM" : student_AEM}
            return await Forms.find(query) 
                .then(result => {
                    console.log(result);
                    return (result)
                })
                .catch(err=> {
                    throw err;
                })

        }, 
        // FIND A FORM BY AEM
        async findFormByAEM(root, args, context) { 
            // Get the input values
            const student_AEM  = args.AEM_input;
            const Form_Kind = args.formKind_input;

        // Query for the diploma form of this student
        const query = {"AEM" : student_AEM, "form_name" : Form_Kind}
 
        // Find if the diploma form of student is exist            
        return await Forms.find(query)
                    .then(result => {
                        console.log("[SUCCESS] -> FIND SUITABLE FORM BY STUDENT AEM SUCCESSFUL !!");
                        console.log(result); 
                        if (result.length === 1) {
                            return true;
                        }      
                        else {
                            return false;
                        }                  
                        })
                    .catch(err => {                            
                        console.log("[ERROR] -> FIND SUITABLE FORM BY STUDENT AEM FAILED !!")                   
                        console.log(err)
                        return false
                    }) 
        },
         
        // FIND THE SPECIAL TOPIC FORM BY AEM FOR THE GIVEN SEMESTER
        async findSpecialTopicForm(root, args, context) { 
            // Get the input values
            const student_AEM  = args.AEM_input;
            const Form_Kind = args.formKind_input;
            const semester_input = args.semester;

        // Query for the diploma form of this student
        const query = {"AEM" : student_AEM, "form_name" : Form_Kind, "semester" : semester_input}
 
        // Find if the suitable special topic form of student is exist            
        return await Forms.find(query)
                    .then(result => {
                        console.log("[SUCCESS] -> FIND SPECIAL TOPIC FORM BY STUDENT AEM FOR THIS SEMESTER SUCCESSFUL !!");
                        console.log(result); 
                        if (result.length === 1) {
                            return true;
                        }      
                        else {
                            return false;
                        }                  
                        })
                    .catch(err => {                            
                        console.log("[ERROR] -> FIND SPECIAL TOPIC FORM BY STUDENT AEM FOR THIS SEMESTER FAILED !!")                   
                        console.log(err)
                        return false
                    }) 
        },
        // GET THE CONNECTED WITH THE SPECIFIC PROFESSOR FORMS
        async get_ProfessorForms(root, args, context) { 
            // Get the input values
            const professorName  = args.professorName; 

        // Query for the connected with the professor forms 
        const query = {$or : [{supervisor : professorName},{secondMember : professorName},{thirdMember : professorName}]}
 
        // Find if the suitable forms           
        return await Forms.find(query)
                .then(result => {
                    console.log("[SUCCESS] -> FIND FORMS OF THIS PROFESSOR SUCCESSFUL !!");
                    console.log(result);
                    return (result)
                })
                .catch(err=> {
                    throw err;
                })
        }        
    },
    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        async addNewStudentForm(_, args) {
            let {application_form, form_name, sending_date, arrangement_date, student_name, AEM, username, semester , form_pdf_data, supervisor, supervisor_type, secondMember ,secondMember_type , thirdMember , thirdMember_type ,  greekTitle,  englishTitle,
                father_FirstName, mother_FirstName, email, telephone, mobile, city, road, postcode, formInput, signature, selectedSemester, attendance_period, birthLocation, birthDate, citizen, citizenNumber, registration_year, registration_semester, 
                registration_date, generalAEM, grading } = args.formData;
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
                // Create user 
                return await Forms.create({
                    application_form, form_name, sending_date, arrangement_date, student_name, AEM, username, semester, form_pdf_data , supervisor, supervisor_type, secondMember ,secondMember_type , thirdMember , thirdMember_type ,  greekTitle,  englishTitle, 
                    father_FirstName, mother_FirstName, email, telephone, mobile, city, road, postcode, formInput, signature, selectedSemester, attendance_period, birthLocation, birthDate, citizen, citizenNumber, registration_year, registration_semester, 
                    registration_date, generalAEM, grading              
                })
                .then(res=> {
                    console.log(res)
                    return res;
                })
                .catch(err=> {
                    console.log(err)
                })
                

            } catch(err) { 
                console.log(err)
                //throw new UserInputError('Bad input', {errors})
            }        
        } 
    }
              
}        
    


module.exports = forms_resolvers;