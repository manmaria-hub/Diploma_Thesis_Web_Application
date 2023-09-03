// Resolvers for the Specialization Fields

// Import return success and error codes and messages
const Messages = require('../../config/validation.json');

// Import the suitable schema
const SpecializationFields = require('../../models/SpecializationFields');

const specializationFields_resolvers = {

    SpecializationFieldsState: {
        __resolveType(obj, contextValue, info) {
            if (obj.OK_message) {
                return 'SpecializationFields_OK';
            }  
            if (obj.error_message) {
                return 'SpecializationFields_error';
            } 
            if (obj.QueryOK_message) {
                return 'SpecializationFields_QueryOK';
            }
            if (obj.QueryError_message) {
                return 'SpecializationFields_QueryError';
            }
            return null;
        },
    },

    //                 ****************   QUERIES   ****************                  //
    Query : {     
        // INSERT THE DEFAULT SIX SPECIALIZATION FIELDS
        async insertSpecializationFields() {
            // Creating the array that contains the six default specialization fields of the ECE department
            // Let the field of courseList empty to fill them later
            const ece_specializationFields = [
                {fieldName:"ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΕΘ", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ", fieldCode:"ΛΠ", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΥΑ", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ", fieldCode:"ΣΤ", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΕΝΕΡΓΕΙΑΣ", fieldCode:"Ε", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ", fieldCode:"ΑΤ", graduate_level:"ΠΠΣ", semesterList:['Εξάμηνο 1', 'Εξάμηνο 2', 'Εξάμηνο 3', 'Εξάμηνο 4', 'Εξάμηνο 5', 'Εξάμηνο 6', 'Εξάμηνο 7', 'Εξάμηνο 8', 'Εξάμηνο 9', 'Εξάμηνο 10']},
                {fieldName:"ΟΜΑΔΑ ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΕΘ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΠΙΣΤΗΜΗ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑ ΗΜΜΥ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ", fieldCode:"ΛΠ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΠΙΣΤΗΜΗ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑ ΗΜΜΥ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΥΑ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] ,  postgraduate_studySubject:"ΕΠΙΣΤΗΜΗ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑ ΗΜΜΥ"},
                {fieldName:"ΟΜΑΔΑ ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ", fieldCode:"ΣΤ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] ,  postgraduate_studySubject:"ΕΠΙΣΤΗΜΗ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑ ΗΜΜΥ"},
                {fieldName:"ΟΜΑΔΑ ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΕΘ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΥΦΥΗ ΔΙΚΤΥΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ", fieldCode:"ΛΠ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΥΦΥΗ ΔΙΚΤΥΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΥΑ", graduate_level:"ΠΜΣ",semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΥΦΥΗ ΔΙΚΤΥΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ"},
                {fieldName:"ΟΜΑΔΑ ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ", fieldCode:"ΣΤ", graduate_level:"ΠΜΣ",semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό' ] , postgraduate_studySubject:"ΕΥΦΥΗ ΔΙΚΤΥΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ"},
                {fieldName:"ΟΜΑΔΑ ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΕΘ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό', 'Εξάμηνο 3 - Χειμερινό', 'Εξάμηνο 4 - Εαρινό' ] , postgraduate_studySubject:"ΕΦΑΡΜΟΣΜΕΝΗ ΠΛΗΡΟΦΟΡΙΚΗ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ", fieldCode:"ΛΠ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό', 'Εξάμηνο 3 - Χειμερινό', 'Εξάμηνο 4 - Εαρινό' ] , postgraduate_studySubject:"ΕΦΑΡΜΟΣΜΕΝΗ ΠΛΗΡΟΦΟΡΙΚΗ"},
                {fieldName:"ΟΜΑΔΑ ΤΕΧΝΟΛΟΓΙΩΝ ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ", fieldCode:"ΥΑ", graduate_level:"ΠΜΣ",semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό', 'Εξάμηνο 3 - Χειμερινό', 'Εξάμηνο 4 - Εαρινό' ] , postgraduate_studySubject:"ΕΦΑΡΜΟΣΜΕΝΗ ΠΛΗΡΟΦΟΡΙΚΗ"},
                {fieldName:"ΟΜΑΔΑ ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ", fieldCode:"ΣΤ", graduate_level:"ΠΜΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό', 'Εξάμηνο 3 - Χειμερινό', 'Εξάμηνο 4 - Εαρινό' ] , postgraduate_studySubject:"ΕΦΑΡΜΟΣΜΕΝΗ ΠΛΗΡΟΦΟΡΙΚΗ"},
                {fieldName:"ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ", fieldCode:"ΑΤ", graduate_level:"ΠMΣ", semesterList:['Εξάμηνο 1 - Χειμερινό', 'Εξάμηνο 2 - Εαρινό'], postgraduate_studySubject:"ΕΥΦΥΗ ΔΙΚΤΥΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ"}
           
            ]

            // Option that prevents additional documents from being inserted if one fails
            const options = { ordered: true};

            // Make the INSERT MANY query 
            
            return await SpecializationFields.insertMany(ece_specializationFields, options)
            .then(result=> {
                console.log("[SUCCESS] -> SPECIALIZATION FIELD BE ADDED!")
                //console.log(result)
                return {
                    code: Messages.validation.SpecializationFields_OK.code,
                    OK_message: Messages.validation.SpecializationFields_OK.message
                }
            })
            .catch(err => {
                console.log('[ERROR] -> SPECIALIZATION FIELD DO NOT BE ADDED')
                //console.log(err);
                return {
                    code: Messages.validation.SpecializationFields_error.code,
                    error_message: Messages.validation.SpecializationFields_error.message
                }                                  
            });
        }, 
        
        // FIND THE TWO GRADUATE LEVELS OF CURRENT STUDY PROGRAM AND DETERMINE THE DIFFERENT STUDY SUBJECTS OF THESE LEVELS
        async getGraduateAndSubjectLevels() {

            // Make the GET QUERY
            // Using the MongoDB 'distinct' command, which returns an array of distinct values for a field
            // The field of our interest is the 'postgraduate_studySubject' field.
            // If the value of this field is '-' means that we are in a undergraduate level and if this field has 
            // a distinct value means that we are in the postgraduate level of studies with subject that this value
            // determines.
            return await SpecializationFields.distinct('postgraduate_studySubject')
                .then(result=> {
                    console.log("[SUCCESS] -> GET POSTGRADUATE STUDY SUBJECTS SUCCESSFUL !!")
                    //console.log(result);
                    return { 
                        __typename: 'SpecializationFields_QueryOK',
                        data: result,
                        code: Messages.validation.SpecializationFields_QueryOK.code,
                        QueryOK_message : Messages.validation.SpecializationFields_QueryOK.message
                    }
                })
                .catch(err=> {
                    console.log('[ERROR] -> GET POSTGRADUATE STUDY SUBJECTS FAILED !')
                    return { 
                        code: Messages.validation.SpecializationFields_QueryError.code,
                        QueryError_message: Messages.validation.SpecializationFields_QueryError.message
                    }
                });   
        },    
        // GET THE SPECIALIZATION FIELDS OF THE SPECIFIC STUDY CATEGORY
        async getSpecializationFieldsOfStudyCategory(root, args, context) {
            const studyCategory = args.studyCategory;
            const postgraduateStudySubject = args.postgraduateStudySubject;

            // Make the GET Query
            // Using the MongoDB 'aggregate' command to display all the documents of the Specialization Fields' collection
            // with the specific values for the fields 'graduate_level' and 'postgraduate_studySubject' and setting 
            // TRUE the fields 'fieldName' and 'fieldCode' that we want to be included in the output

            // To perform the corresponding aggregation, it is important to pass a list of our specific aggregation stages to the 'aggregate()' method
            // AGGREGATION PIPELINE (it uses the aggregation stages $match and $projection)
            const pipeline = [
                {
                '$match': {
                    'graduate_level': studyCategory, 
                    'postgraduate_studySubject': postgraduateStudySubject
                }
                }, {
                '$project': {
                    fieldName: "$fieldName", 
                    fieldCode: "$fieldCode", 
                    _id: false
                }
                }
            ];
            return await SpecializationFields.aggregate(pipeline)
                .then(result=>{
                    console.log("[SUCCESS] -> GET SPECIALIZATION FIELDNAMES AND FIELDCODES SUCCESSFUL !!");
                    console.log(result);
                    return(result);
                })
                .catch(error=> {
                    console.log("[ERROR] -> GET SPECIALIZATION FIELDNAMES AND FIELDCODES FAILED !!")
                    return([]);
                })
        },
        // FIND ALL THE COURSES CODES BY THE SPECIFIC SEMESTER
        async findSemesterOptionsByGraduateSpecializationField(root, args, context) {
            // Determine the selected by the user graduation level
            const graduateLevel = args.gradLevel;
            // Determine the selected by the user specialization field
            const studyField = args.studyField;

            // Query for all the courses that belong to the specific semester
            const query = {"graduate_level" : graduateLevel, "postgraduate_studySubject": studyField};

            const options = {                 
                // Include only the course's code field in the returned document
                "semesterList": true, "_id": false            
            };

            return await SpecializationFields.find(query, options).distinct("semesterList")
                .then(result=>{
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");
                    const retArray = [];
                    result.forEach(item => {
                        retArray.push(item);
                    })
                    console.log(retArray);
                    console.log('SUCCESS')
                    return(retArray);
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET COURSES CODES BY SEMESTER FAILED !!")
                    return([]);
                }) 
        },
        // FIND THE CODE OF THE GIVEN AS PARAMETER SPECIALIZATION FIELD
        async getSpecializationFieldCode(root, args, context) {
            // Determine the given by the user specialization field
            const specFieldName = args.specFieldName;
            
            // Query for only one of the documents with the given field's name
            const query = {"fieldName" : specFieldName};

            const options = {                 
                // Include only the field's code in the returned document
                "fieldCode": true, "_id": false            
            };

            return await SpecializationFields.findOne(query, options)
                .then(result=>{
                    console.log("[SUCCESS] -> GET FIELD CODE BY FIELD NAME SUCCESSFUL !!");  
                    console.log(result);
                    console.log('SUCCESS')
                    return(result?.fieldCode);
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET FIELD CODE BY FIELD NAME R FAILED !!")
                    return("");
                }) 
        }
    }
}

module.exports = specializationFields_resolvers;