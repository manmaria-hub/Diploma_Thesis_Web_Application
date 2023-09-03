// Import return success and error codes and messages
const Messages = require('../../config/validation.json');

// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the courses

const Course = require("../../models/Course");

const course_resolvers = {

    CourseState: {
        __resolveType : (obj) => { 
            if (obj.simpleOK_message) {
                return 'Course_SimpleOK';
            }  
            if (obj.OK_message) {
                return 'Course_OK';
            } 
            if (obj.error_message) {
                return 'Course_Error'
            }
            return null;
        },
    },

    //                 ****************   QUERIES   ****************                  //
    Query : {
        // FIND THE COURSE THAT HAS A SPECIFIC CODE GIVEN AS ARGUMENT 
        async findCoursebyCourseCode(root, args, context) {
            // Determine the input by the user course code
            const courseCode = args.courseCode;

            // Query for the course that has the specific code
            const query = {"StudyProgram.course_code" : courseCode};
            
            return await Course.find(query)
                .then(result=>{
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");                    
                    
                    console.log('SUCCESS')
                    return {
                        course : result[0], 
                        code: Messages.validation.Course_QueryOK.code, 
                        OK_message : Messages.validation.Course_QueryOK.message 
                    } 
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET COURSES CODES BY SEMESTER FAILED !!")
                    return {
                        code: Messages.validation.Course_QueryError.code,
                        error_message : Messages.validation.Course_QueryError.message
                    } 
                }) 
        },

        // FIND THE COURSE THAT HAS A SPECIFIC CODE GIVEN AS ARGUMENT 
        async findCoursebyCourseName(root, args, context) {
            // Determine the submitted by the user course name
            const courseName = args.courseName;

            // Query for the course that has the specific code
            const query = {"StudyProgram.course_name" : courseName};
            
            return await Course.find(query)
                .then(result=>{
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");                    
                    
                    console.log('SUCCESS')
                    return {
                        course : result[0], 
                        code: Messages.validation.Course_QueryOK.code, 
                        OK_message : Messages.validation.Course_QueryOK.message 
                    } 
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET COURSES CODES BY SEMESTER FAILED !!")
                    return {
                        code: Messages.validation.Course_QueryError.code,
                        error_message : Messages.validation.Course_QueryError.message
                    } 
                }) 
        },
        // FIND ALL THE COURSES OF PREVIOUS SEMESTERS BY THE CURRENT
        async findPreviousSemestersCourses(root, args, context) {
            // Determine the current semester
            const currSemester = args.semester;

            // Query for all the courses of previous semesters from the current
            const query = {$expr: { $lt: [ { $toDouble: "$StudyProgram.semester" }, Number(currSemester) ] }, "StudyProgram.course_label": {$in : ["ΠΡΟΠΤΥΧΙΑΚΟ"]}}

            const options = {
                // sort matched documents in descending order by course's semester
                sort : {"StudyProgram.semester": -1},
                // include only the course name and the course code in the returned document
                "StudyProgram.course_name": true, "StudyProgram.course_code": true, "_id":true
            }

            return await Course.find(query, options)
                .then(result=> {
                    console.log("[SUCCESS] -> GET COURSES NAMES AND CODES OF PREVIOUS SEMESTERS SUCCESSFUL !!");          
                    const retArray = [];
                    result.forEach(item => {
                        retArray.push({name:item.StudyProgram.course_name, code: item.StudyProgram.course_code});
                    })
                    console.log(retArray); 
                    return(retArray);
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET COURSES NAMES AND CODES OF PREVIOUS SEMESTERS FAILED !!")
                    return([]);
                }) 

        },
        
        // FIND ALL THE COURSES CODES BY THE SPECIFIC SEMESTER
        async findbySemesterAllCoursesCodes(root, args, context) {
            // Determine the selected by the user semester
            const currSemester = args.semester;

            // Query for all the courses that belong to the specific semester
            const query = {"StudyProgram.semester" : currSemester};

            const options = {
                // sort matched documents in descending order by course's code
                sort: {"StudyProgram.course_code" : -1},
                // Include only the course's code field in the returned document
                "StudyProgram.course_code": true, "_id": false            
            };

            return await Course.find(query, options)
                .then(result=>{
                    console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");
                    const retArray = [];
                    result.forEach(item => {
                        retArray.push(item.StudyProgram.course_code);
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
        // GET THE COURSES OF POSTGRADUATE LEVEL
        async getPostGraduateCourses(root, args, context) {
            // Determine the selected by the user semester
            const period = args.period;

            // Make the GET Query
            // Using the MongoDB 'aggregate' command to display all the courses of thepostgraduate level of studies 

            // To perform the corresponding aggregation, it is important to pass a list of our specific aggregation stages to the 'aggregate()' method
            // AGGREGATION PIPELINE (it uses the aggregation stages $match and $projection)
            const pipeline = [
                {
                    '$match': {
                    'StudyProgram.period': period, 
                    'StudyProgram.specialization_field': {
                        '$nin': [
                        '-'
                        ]
                    }
                    }
                }, {
                    '$group': {
                    '_id': '$StudyProgram.specialization_field', 
                    'courses': {
                        '$push': {
                        '_id': '$_id', 
                        'StudyProgram': '$StudyProgram', 
                        'CourseManagement': '$CourseManagement', 
                        'InfoFromInstructor': '$InfoFromInstructor', 
                        'More': '$More'
                        }
                    }
                    }
                }
                ];
            return await Course.aggregate(pipeline)
                .then(result=>{
                    console.log("[SUCCESS] -> GET POSTGRADUATE COURSES SUCCESSFUL !!");
                    console.log(result);
                    return(result);
                })
                .catch(error=> {
                    console.log("[ERROR] -> GET POSTGRADUATE COURSES FAILED !!")
                    return([]);
                })

        },
        // GET THE DATA OF ALL THE ACTIVE COURSES OF A SPECIFIC PERIOD (WINTER OR SPRING)
    async getAllActiveCoursesOfSpecificPeriod(root, args, context) {
        // Determine the given by the user period (Winter or Spring)
        const period = args.period; 

        // Query for all the active courses that belong to the specific period
        const pipeline = [
            {
              '$match': {
                'More.course_active': true, 
                'StudyProgram.period': {
                  '$in':  period
                }
              }
            }
          ];

        // Realize the MongoDB query
        return await Course.aggregate(pipeline)
        .then(result=>{
            console.log("[SUCCESS] -> GET ACTIVE COURSES BY SPECIFIC PERIOD SUCCESSFUL !!");
            /*const retArray = [];
            result.forEach(item => {
                retArray.push(item.StudyProgram.course_code);
            })
            console.log(retArray);*/
            console.log(result)
            return((result));
        })
        .catch(error=> {
            console.log(error)
            console.log("[ERROR] -> GET ACTIVE COURSES BY SPECIFIC PERIOD FAILED !!")
            return({});
        }) 
    },

    async getCoursesOfSpecificSemester(root, args, context){
        // Determine the specific semester input
        const semesterInput = args.semester;

        // Make the GET Query
        // Using the MongoDB 'aggregate' command to display all the courses of thepostgraduate level of studies 

        // To perform the corresponding aggregation, it is important to pass a list of our specific aggregation stages to the 'aggregate()' method
        // AGGREGATION PIPELINE (it uses the aggregation stages $match and $projection)
        const pipeline = [
            {
              '$match': {
                'StudyProgram.semester': {
                  '$in':  semesterInput
                }
              }
            }, {
              '$group': {
                '_id': {
                  'semester': '$StudyProgram.semester', 
                  'category': '$StudyProgram.course_category'
                },
                'courses': {
                  '$push': {
                    'StudyProgram': '$StudyProgram'
                  }
                }
              }
            }
          ]

        // Realize the MongoDB query
        return await Course.aggregate(pipeline)
        .then(result=>{
            console.log("[SUCCESS] -> GET COURSES BY SPECIFIC SEMESTER GROUP BY CATEGORY SUCCESSFUL !!");
            /*const retArray = [];
            result.forEach(item => {
                retArray.push(item.StudyProgram.course_code);
            })
            console.log(retArray);*/ 
            let returned_Object = [];
            result.map((item => {
                returned_Object.push({
                    _id:item._id,
                    courses : item.courses
                })
                console.log(item.courses)
            }))
            console.log(returned_Object)
            return returned_Object;
        })
        .catch(error=> {
            console.log(error)
            console.log("[ERROR] -> GET COURSES BY SPECIFIC SEMESTER GROUP BY CATEGORY FAILED !!")
            return({});
        }) 
    },
        // FIND THE COURSE THAT HAS AS INSTRUCTOR THE PROFESSOR WITH THE SPECIFIC EMAIL
        async getCoursesByInstructorEmail(root, args, context) {
            // Determine the input professor email
            const professorEmail = args.instructor_email;

            // Query for the course that has the specific instructor professor
            const query = {"CourseManagement.COURSE_INSTRUCTORS.instructor_Email" : professorEmail};
            
            return await Course.find(query)
                .then(result=>{
                    console.log(result)
                    console.log("[SUCCESS] -> GET PROFESSOR'S COURSES SUCCESSFUL !!"); 
                    return result
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET PROFESSOR'S COURSES FAILED !!")
                    return []
                }) 
        },
        // GET ALL THE UNDERGRADUATE COURSES GROUP BY STUDY PROGRAM
        async groupCoursesByStudyProgram(root, args, context) { 

            const pipeline =[
                {
                  '$match': {
                    'StudyProgram.specialization_field': '-'
                  }
                }, {
                  '$group': {
                    '_id': '$StudyProgram.study_program', 
                    'course': {
                      '$push': {
                        '_id': '$_id', 
                        'StudyProgram': '$StudyProgram', 
                        'CourseManagement': '$CourseManagement', 
                        'InfoFromInstructor': '$InfoFromInstructor', 
                        'More': '$More'
                      }
                    }
                  }
                }, {
                  '$sort': {
                    'StudyProgram.course_code': 1
                  }
                }
              ];
            
            return await Course.aggregate(pipeline)
                .then(result=>{
                    
                    console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY STUDY PROGRAM SUCCESSFUL !!");  
                    let array = [];
                    result.forEach((item, index) => {
                        let object = {"_id" : item._id, "course" : item.course};
                        array.push(object); 
                    }) 
                    console.log(array)
                    return array
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY STUDY PROGRAM FAILED !!")
                    return []
                }) 
        },
        // GET ALL THE POSTGRADUATE COURSES GROUP BY STUDY PROGRAM
        async groupPostCoursesByStudyProgram(root, args, context) { 

          const pipeline =[
              {
                '$match': {
                  'StudyProgram.specialization_field': {
                    $nin : ['-']
                  }
                }
              }, {
                '$group': {
                  '_id': '$StudyProgram.study_program', 
                  'course': {
                    '$push': {
                      '_id': '$_id', 
                      'StudyProgram': '$StudyProgram', 
                      'CourseManagement': '$CourseManagement', 
                      'InfoFromInstructor': '$InfoFromInstructor', 
                      'More': '$More'
                    }
                  }
                }
              }, {
                '$sort': {
                  'StudyProgram.course_code': 1
                }
              }
            ];
          
          return await Course.aggregate(pipeline)
              .then(result=>{
                  
                  console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY STUDY PROGRAM SUCCESSFUL !!");  
                  let array = [];
                  result.forEach((item, index) => {
                      let object = {"_id" : item._id, "course" : item.course};
                      array.push(object); 
                  }) 
                  console.log(array)
                  return array
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY STUDY PROGRAM FAILED !!")
                  return []
              }) 
      },
        // GET ALL THE UNDERGRADUATE COURSES GROUP BY SEMESTER
        async groupCoursesBySemester(root, args, context) { 

            const pipeline = [
                {
                  '$match': {
                    'StudyProgram.specialization_field': '-'
                  }
                }, {
                  '$group': {
                    '_id': '$StudyProgram.semester', 
                    'courses_by_semester': {
                      '$push': {
                        '_id': '$_id', 
                        'StudyProgram': '$StudyProgram', 
                        'CourseManagement': '$CourseManagement', 
                        'InfoFromInstructor': '$InfoFromInstructor', 
                        'More': '$More'
                      }
                    }
                  }
                }, {
                  '$sort': {
                    '_id': 1, 
                    'courses_by_semester.StudyProgram.course_code': 1
                  }
                }
              ];
            
            return await Course.aggregate(pipeline)
                .then(result=>{
                    
                    console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY SEMESTER SUCCESSFUL !!");  
                    let array = [];
                    result.forEach((item, index) => {
                        let object = {"_id" : item._id, "courses_by_semester" : item.courses_by_semester};
                        array.push(object); 
                    }) 
                    console.log(array)
                    return array
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY SEMESTER FAILED !!")
                    return []
                }) 
        },
        // GET ALL THE POSTGRADUATE COURSES GROUP BY SEMESTER
        async groupPostCoursesBySemester(root, args, context) { 

          const pipeline = [
              {
                '$match': {
                  'StudyProgram.specialization_field': {
                    $nin : ['-']
                  }
                }
              }, {
                '$group': {
                  '_id': '$StudyProgram.semester', 
                  'courses_by_semester': {
                    '$push': {
                      '_id': '$_id', 
                      'StudyProgram': '$StudyProgram', 
                      'CourseManagement': '$CourseManagement', 
                      'InfoFromInstructor': '$InfoFromInstructor', 
                      'More': '$More'
                    }
                  }
                }
              }, {
                '$sort': {
                  '_id': 1, 
                  'courses_by_semester.StudyProgram.course_code': 1
                }
              }
            ];
          
          return await Course.aggregate(pipeline)
              .then(result=>{
                  
                  console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY SEMESTER SUCCESSFUL !!");  
                  let array = [];
                  result.forEach((item, index) => {
                      let object = {"_id" : item._id, "courses_by_semester" : item.courses_by_semester};
                      array.push(object); 
                  }) 
                  console.log(array)
                  return array
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY SEMESTER FAILED !!")
                  return []
              }) 
      },
        // GET ALL THE UNDERGRADUATE COURSES GROUP BY COURSE TYPE
        async groupCourseByCourseType(root, args, context) { 

            const pipeline = [
                {
                  '$match': {
                    'StudyProgram.specialization_field': '-'
                  }
                }, {
                  '$group': {
                    '_id': '$StudyProgram.course_type', 
                    'course': {
                      '$push': {
                        '_id': '$_id', 
                        'StudyProgram': '$StudyProgram', 
                        'CourseManagement': '$CourseManagement', 
                        'InfoFromInstructor': '$InfoFromInstructor', 
                        'More': '$More'
                      }
                    }
                  }
                }, {
                  '$sort': {
                    'course.StudyProgram.semester': 1, 
                    'course.StudyProgram.course_code': 1
                  }
                }
              ];
            
            return await Course.aggregate(pipeline)
                .then(result=>{                    
                    console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE SUCCESSFUL !!");  
                    let array = [];
                    result.forEach((item, index) => {
                        let object = {"_id" : item._id, "course" : item.course};
                        array.push(object); 
                    }) 
                    console.log(array)
                    return array
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                    return []
                }) 
        } ,
         // GET ALL THE POSTRGRADUATE COURSES GROUP BY COURSE TYPE
         async groupPostCourseByCourseType(root, args, context) { 

          const pipeline = [
              {
                '$match': {
                  'StudyProgram.specialization_field': {
                    $nin : ["-"]
                  }
                }
              }, {
                '$group': {
                  '_id': '$StudyProgram.course_type', 
                  'course': {
                    '$push': {
                      '_id': '$_id', 
                      'StudyProgram': '$StudyProgram', 
                      'CourseManagement': '$CourseManagement', 
                      'InfoFromInstructor': '$InfoFromInstructor', 
                      'More': '$More'
                    }
                  }
                }
              }, {
                '$sort': {
                  'course.StudyProgram.semester': 1, 
                  'course.StudyProgram.course_code': 1
                }
              }
            ];
          
          return await Course.aggregate(pipeline)
              .then(result=>{                    
                  console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE SUCCESSFUL !!");  
                  let array = [];
                  result.forEach((item, index) => {
                      let object = {"_id" : item._id, "course" : item.course};
                      array.push(object); 
                  }) 
                  console.log(array)
                  return array
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                  return []
              }) 
      } ,
      // GET ALL THE POSTRGRADUATE COURSES GROUP BY SPECIALIZATION FIELD
      async groupPostCourseBySpecializationField(root, args, context) { 

        const pipeline = [
            {
              '$match': {
                'StudyProgram.specialization_field': {
                  $nin : ["-"]
                }
              }
            }, {
              '$group': {
                '_id': '$StudyProgram.specialization_field', 
                'course': {
                  '$push': {
                    '_id': '$_id', 
                    'StudyProgram': '$StudyProgram', 
                    'CourseManagement': '$CourseManagement', 
                    'InfoFromInstructor': '$InfoFromInstructor', 
                    'More': '$More'
                  }
                }
              }
            }, {
              '$sort': {
                'course.StudyProgram.semester': 1, 
                'course.StudyProgram.course_code': 1
              }
            }
          ];
        
        return await Course.aggregate(pipeline)
            .then(result=>{                    
                console.log("[SUCCESS] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE SUCCESSFUL !!");  
                let array = [];
                result.forEach((item, index) => {
                    let object = {"_id" : item._id, "course" : item.course};
                    array.push(object); 
                }) 
                console.log(array)
                return array
            })
            .catch(error=> {
                console.log(error)
                console.log("[ERROR] -> GET UNDERGRADUATE COURSES GROUP BY COURSE TYPE FAILED !!")
                return []
            }) 
    } ,
        // GET ALL THE COURSES THAT THEIR CODE STARTS WITH THE CHARACTERS ...        
        async getCoursesContainingCodeChars(root, args, context) { 
          const courseCodeChars = args.courseCode; 
          const query =  {"StudyProgram.course_code" : {$regex: ".*" + courseCodeChars + ".*"}};
          console.log(query, "CODE") 
          return await Course.find(query)
            .then(result=>{                    
                if (args.courseCode !== "0") {
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
         // GET ALL THE COURSES THAT SATISFIES THE CRITERIAS
         async getCoursesByCriteria(root, args, context) {
          // Determine the input criteria  /// /1/i
          const courseLabel_criteria = args.course_label_criteria;
          const semester_criteria = args.semester_criteria;
          const specField_criteria = args.spec_field_criteria;
          const courseType_criteria = args.course_type_criteria;
 
          console.log(semester_criteria, 'SEMESTER')
          console.log(courseLabel_criteria, 'courseLabel_criteria')
          console.log(specField_criteria, 'specField_criteria')
          console.log(courseType_criteria, 'courseType_criteria')

          let array = [...semester_criteria];
          
          if (semester_criteria && semester_criteria.length > 0) {
            let new_item = '';
            semester_criteria.forEach(item => { 
              if (item === "2" || item === "4" || item === "6" ||  item === "8" || item === "10") {
                new_item = "Εξάμηνο " + item + ' - Εαρινό';
                array.push(new_item);
              }
              else if (item === "1" || item === "3" || item === "5" ||  item === "7" || item === "9") {
                new_item = "Εξάμηνο " + item + ' - Χειμερινό';
                array.push(new_item);
              }                
            })
          } 
          console.log(semester_criteria)
          console.log(array)
 
          // Query for all the courses of previous semesters from the current
          let query = {};
          if (courseLabel_criteria.length !== 0 && semester_criteria.length !== 0 && courseType_criteria.length !== 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.semester" : {$in : array}, "StudyProgram.study_program" : {$in : specField_criteria}, "StudyProgram.course_type" : {$in : courseType_criteria} }
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length !== 0 && courseType_criteria.length !== 0 && specField_criteria.length !== 0 ) {
            query = { "StudyProgram.semester" : {$in : array}, "StudyProgram.study_program" : {$in : specField_criteria}, "StudyProgram.course_type" : {$in : courseType_criteria} }
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length === 0 && courseType_criteria.length !== 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.study_program" : {$in : specField_criteria}, "StudyProgram.course_type" : {$in : courseType_criteria} }
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length !== 0 && courseType_criteria.length === 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.semester" : {$in : array}, "StudyProgram.study_program" : {$in : specField_criteria}}
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length !== 0 && courseType_criteria.length !== 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.semester" : {$in : array}, "StudyProgram.course_type" : {$in : courseType_criteria} }
          } 
          else if (courseLabel_criteria.length === 0 && semester_criteria.length === 0 && courseType_criteria.length !== 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.course_type" : {$in : courseType_criteria}, "StudyProgram.study_program" : {$in : specField_criteria}} 
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length === 0 && courseType_criteria.length === 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.study_program" : {$in : specField_criteria}} 
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length !== 0 && courseType_criteria.length === 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.semester" : {$in : array}} 
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length !== 0 && courseType_criteria.length !== 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.semester" : {$in : array}, "StudyProgram.course_type" : {$in : courseType_criteria}} 
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length !== 0 && courseType_criteria.length === 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.semester" : {$in : array}, "StudyProgram.study_program" : {$in : specField_criteria}} 
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length === 0 && courseType_criteria.length !== 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}, "StudyProgram.course_type" : {$in : courseType_criteria}} 
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length !== 0 && courseType_criteria.length === 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_type" : {$in : courseType_criteria}, "StudyProgram.study_program" : {$in : specField_criteria}} 
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length === 0 && courseType_criteria.length === 0 && specField_criteria.length !== 0 ) {
            query = {"StudyProgram.study_program" : {$in : specField_criteria}}
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length === 0 && courseType_criteria.length !== 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_type" : {$in : courseType_criteria}} 
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length !== 0 && courseType_criteria.length === 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.semester" : {$in : array}} 
          }
          else if (courseLabel_criteria.length !== 0 && semester_criteria.length === 0 && courseType_criteria.length === 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_label" : {$in : courseLabel_criteria}} 
          }
          else if (courseLabel_criteria.length === 0 && semester_criteria.length === 0 && courseType_criteria.length === 0 && specField_criteria.length === 0 ) {
            query = {"StudyProgram.course_label" : {$in : ["aaaaaaaaaaaaaaaaa"]}} ;
          }          
          
          return await Course.find(query).sort("StudyProgram.course_code")
              .then(result=> {
                  console.log("[SUCCESS] -> GET COURSES BY CRITERIA SUCCESSFUL !!");  
                  //console.log(result)   
                  return result;
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> GET COURSES BY CRITERIA FAILED !!")
                  return([]);
              }) 

      }                   
    },   
        
    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        // ADD A NEW COURSE IN THE DATABASE
        async addCourse(root, args, context) {

            // Determine the input data for the new course that the user gives with the suitable form
            // This is the document to be inserted
            const courseInput = args.courseInput;
            console.log(courseInput);

            // Insert new course to courses' collection using create() mongoDB method            
            return await Course.create(courseInput)
                        .then(result => {
                            console.log("[SUCCESS] -> GET COURSES CODES BY SEMESTER SUCCESSFUL !!");
                            console.log(result);
                            return {
                                course : {_id: result._id,
                                            ...result._doc},
                                code: Messages.validation.Course_MutationOK.code, 
                                OK_message : Messages.validation.Course_MutationOK.message 
                            }
                        })
                        .catch(err => {                            
                            console.log("[ERROR] -> ADD NEW COURSE FAILED !!")                   
                            console.log(err)
                            return {
                                code: Messages.validation.Course_QueryError.code,
                                error_message : Messages.validation.Course_QueryError.message
                            }    
                        }) 
        }                      
             
    }
}

module.exports = course_resolvers;