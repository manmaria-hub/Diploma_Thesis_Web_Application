// Import MongoDB Client
const {MongoClient} = require('mongodb');

// Resolvers for the program

const CoursesGrading = require("../../models/CoursesGrading");

const coursesGrading_resolvers = {       
        
    //                 ****************   QUERIES   ****************                  //
    Query : { 
       // GET ALL THE DECLARATED COURSES OF THE CURRENT STUDENT
       async getAllDeclaratedCourses(root, args, context) {
        // Determine the current student's AEM 
        const studentAEM = args.AEM_input;

        // Query for all the declarated courses of the current user
        const query = {"student_AEM" : studentAEM}

        const options = {  
            // include only the declarated courses array 
            "_id": 0, "declarated_courses": 1
        }

        return await CoursesGrading.find(query, options)
            .then(result=> {
                console.log("[SUCCESS] -> GET ALL DECLARATED COURSES SUCCESSFUL !!");          
                console.log(result)
                const retArray = [];
                if (result.length === 0) {
                  return [];
                }
                else {
                  result[0].declarated_courses.forEach(item => {
                      retArray.push(item);
                  }) 
                  return(retArray);
                }
            })
            .catch(error=> {
                console.log(error)
                console.log("[ERROR] -> GET ALL DECLARATED COURSES FAILED !!")
                return([]);
            })
        },
        async getStudentoFSpecificCourse(root, args, context) {
          // Determine the input data for student course code  
          const courseCode_input = args.courseCode;  
          const currentAcademicYear_input = args.currentAcademicYear;
          const currentAcademicPeriod_input = args.currentAcademicPeriod;
          const currentExamPeriod_input = args.currentExamPeriod;

          const pipeline = [
                {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.course_code': courseCode_input,
                    'declarated_courses.declarated_period': currentAcademicPeriod_input, 
                    'declarated_courses.declarated_academicYear': currentAcademicYear_input, 
                    'declarated_courses.exam_period': currentExamPeriod_input,
                    'declarated_courses.active': true
                  }
                }, 
                {
                    '$sort': {
                      'student_AEM': 1
                    }
                }
              ];
              return await CoursesGrading.aggregate(pipeline)
                  .then(result=>{
                      console.log("[SUCCESS] -> GET ALL REGISTERED STUDENTS SUCCESSFUL !!");                    
                      console.log(result)    
                      return result               
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET ALL REGISTERED STUDENTS FAILED !!")   
                      return []                
                  })  
        },
        async getAllCoursesOfStudentForSpecificExamPeriod(root, args, context) {
            // Determine the input data for student AEM  
            const studentAEM_input = args.AEM_input; 
            const semesterInput = args.semester_Input;
            const yearInput = args.year_Input;
            const examPeriodInput = args.examPeriod_Input;

            const pipeline = [
                {
                  '$match': {
                    'student_AEM': studentAEM_input
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.declarated_period': semesterInput, 
                    'declarated_courses.declarated_academicYear': yearInput, 
                    'declarated_courses.exam_period': examPeriodInput
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'declarated_courses': {
                      'course_code': 1
                    }
                  }
                }
              ]; 
                return await CoursesGrading.aggregate(pipeline)
                    .then(result=>{
                        console.log("[SUCCESS] -> GET ALL DECLARATED COURSES OF STUDENT SUCCESSFUL !!");                    
                        console.log(result)   
                        let result_array = [];
                        result?.forEach(item=> {
                            result_array.push(item.declarated_courses.course_code);
                        })
                        return result_array                
                    })
                    .catch(error=> {
                        console.log(error)
                        console.log("[ERROR] -> GET ALL DECLARATED COURSES OF STUDENT FAILED !!")   
                        return []                
                    })  
        },
        // GET ALL THE STUDENT'S SUCCESSFUL COURSES OF PREVIOUS SEMESTERS
        async getSuccessfulCoursesCodes(root, args, context) { 
            // Get the current user AEM from input
            let AEMInput = args.AEM_input; 
            // Query for successful declarated courses with the following pipeline
            const pipeline = [
                {
                  '$match': {
                    'student_AEM': AEMInput
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.result': 'Επιτυχία'
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'declarated_courses': {
                      'course_code': 1
                    }
                  }
                }
              ] 
            return await CoursesGrading.aggregate(pipeline)
                .then(result=>{
                    console.log("[SUCCESS] -> GET ACADEMIC CALENDAR SUCCESSFUL !!");                    
                    console.log(result) 
                    let result_array = [];
                    if (result.length > 0) {
                      result?.forEach(item=> {
                          result_array.push(item.declarated_courses.course_code);
                      })
                    }
                    return result_array                    
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> GET ACADEMIC CALENDAR FAILED !!")   
                    return []               
                })  
            }, 
             // GET ALL THE GRADINGS
            async getAllGradingsByPeriod(root, args, context) {    
              const pipeline = [
                {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$group': {
                    '_id': [
                      '$declarated_courses.declarated_period', '$declarated_courses.declarated_academicYear'
                    ], 
                    'courses': {
                      '$push': {
                        'student_AEM': '$student_AEM', 
                        'student_username': '$student_username', 
                        'current_student_semester': '$current_student_semester', 
                        'declarated_courses': '$declarated_courses', 
                        'gender': '$gender', 
                        'grade_average': '$grade_average', 
                        'student_FirstName': '$student_FirstName', 
                        'student_LastName': '$student_LastName', 
                        'student_identity': '$student_identity', 
                        'student_title': '$student_title', 
                        'student_uthEmail': '$student_uthEmail', 
                        'total_ECTS': '$total_ECTS', 
                        'total_units': '$total_units'
                      }
                    }
                  }
                }
              ]  

              return await CoursesGrading.aggregate(pipeline) 
                  .then(result => {
                      console.log(result);
                      return (result)
                  })
                  .catch(err=> {
                      throw err;
                  })

            },
            async getSuccessfulCoursesNumber(root, args, context) { 
              // Get the current user AEM from input
              let AEMInput = args.AEM_input;
              let prevSemesters_input = args.prevSemesters; 
              // Query for successful declarated courses of previous semesters with the following pipeline
              const pipeline = [
                {
                  '$match': {
                    'student_AEM': AEMInput
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.result': 'Επιτυχία', 
                  }
                }, {
                  '$count': 'success'
                }
              ] 
              return await CoursesGrading.aggregate(pipeline)
                  .then(result=>{
                      console.log("[SUCCESS] -> GET NUMBER OF SUCCESSFUL COURSES SUCCESSFUL !!");                    
                      console.log(result)  
                      if (result.length > 0) {
                        return result[0].success         
                      }
                      else {
                        return 0;
                      }           
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET NUMBER OF SUCCESSFUL COURSES FAILED !!")   
                      return -1             
                  })  
            },
            // GET THE NUMBER OF SUCCESSFUL MANDATORY COURSES
            async getSuccessful_MandatoryCoursesNumber(root, args, context) { 
              // Get the current user AEM from input
              let AEMInput = args.AEM_input;
              let prevSemesters_input = args.prevSemesters; 
              // Query for successful declarated courses of previous semesters with the following pipeline
              const pipeline = [
                {
                  '$match': {
                    'student_AEM': AEMInput
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.result': 'Επιτυχία',
                    'declarated_courses.course_type': 'Υποχρεωτικό', 
                    'declarated_courses.declarated_semester': {
                      '$in': prevSemesters_input
                    }
                  }
                }, {
                  '$count': 'success'
                }
              ] 
              return await CoursesGrading.aggregate(pipeline)
                  .then(result=>{
                      console.log("[SUCCESS] -> GET NUMBER OF SUCCESSFUL MANDATORY COURSES SUCCESSFUL !!");                    
                      console.log(result)  
                      if (result.length > 0) {
                        return result[0].success         
                      }
                      else {
                        return 0;
                      }           
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET NUMBER OF SUCCESSFUL MANDATORY COURSES FAILED !!")   
                      return -1             
                  })  
            },
            // GET THE NUMBER OF DECLARATED POSTGRADUATE COURSES FOR THE CURRENT STUDENT
            async getPostGraduate_CoursesNumber(root, args, context) { 
              // Get the current user AEM from input
              let AEMInput = args.AEM_input; 
              // Query for successful declarated postgraduate courses with the following pipeline
              const pipeline = [
                {
                  '$match': {
                    'student_AEM': AEMInput
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.result': 'Επιτυχία',
                    'declarated_courses.course_category': 'ΕΠΙΛΟΓΗΣ ΜΔΕ'
                  }
                }, {
                  '$count': 'success'
                }
              ] 
              return await CoursesGrading.aggregate(pipeline)
                  .then(result=>{
                      console.log("[SUCCESS] -> GET NUMBER OF SUCCESSFUL POSTGRADUATE COURSES SUCCESSFUL !!");                    
                      console.log(result)  
                      if (result.length > 0) {
                        return result[0].success         
                      }
                      else {
                        return 0;
                      }           
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET NUMBER OF SUCCESSFUL POSTGRADUATE COURSES FAILED !!")   
                      return -1             
                  })  
            },
            // GET THE STUDENT'S TOTAL ECTS 
            async getStudent_TotalECTS(root, args, context) {
              // Determine the current student's total ECTS  
              const studentAEM = args.AEM_input;

              // Query for the total ECTS of the current user
              const query = {"student_AEM" : studentAEM}

              const options = {  
                  // include only the total ECTS in the result
                  "_id": 0, "total_ECTS": 1
              }

              return await CoursesGrading.find(query, options)
                  .then(result=> {
                      console.log("[SUCCESS] -> GET TOTAL ECTS OF STUDENT SUCCESSFUL !!");          
                      console.log(result)
                      const retArray = [];
                      if (result.length === 0) {
                        return 0;
                      }
                      else { 
                        return(result[0].total_ECTS);
                      }
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET TOTAL ECTS OF STUDENT FAILED !!")
                      return(-1);
                  })
              },
              // GET THE DECLARATED COURSES OD THE STUDENT FOR THE CURRENT SEMESTER
            async getStudentsSemesterCourses(root, args, context) {
              // Get the current user AEM from input
              let AEMInput = args.AEM_input; 
              let AcademicPeriod_input = args.currAcademicPeriod;
              let AcademicYear_input = args.currAcademicYear; 
              // Query for successful declarated postgraduate courses with the following pipeline
              const pipeline = [
                {
                  '$match': {
                    'student_AEM': AEMInput
                  }
                }, {
                  '$unwind': {
                    'path': '$declarated_courses'
                  }
                }, {
                  '$match': {
                    'declarated_courses.declarated_academicYear': AcademicPeriod_input, 
                    'declarated_courses.declarated_period': AcademicYear_input
                  }
                }, {
                  '$group': {
                    '_id': '$student_AEM', 
                    'myCourses': {
                      '$push': '$declarated_courses'
                    }
                  }
                }, {
                  '$project': {
                    'myCourses': 1, 
                    '_id': 0
                  }
                }
              ] 
              return await CoursesGrading.aggregate(pipeline)
                  .then(result=>{
                      console.log("[SUCCESS] -> GET STUDENT SEMESTER COURSES SUCCESSFUL !!");                    
                      console.log(result)  
                      if (result.length > 0) {
                        return result[0].myCourses         
                      }
                      else {
                        return [];
                      }           
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> GET STUDENT SEMESTER COURSES COURSES FAILED !!")   
                    return []            
                  })  
            }
                
    },

    //                 ****************   MUTATIONS   ****************                  //
    Mutation : {
        // ADD A NEW GRADING INFORMATION TO THE COURSE'S DECLARATION DATABASE
        async addGradeInformation(root, args, context) {

            // Determine the input data for the new course declaration that the user gives with the suitable components and pages
            // This is the new courses' declaration document to be inserted
            const coursesGradingInput = args.coursesGradingInput;
            console.log(coursesGradingInput);   
            // Insert the new grade information to the corresponding collection using findOneAndUpdate() mongoDB method. The findOneAndUpdate() method is used to update the
            // first matched record with the filter and upsert:true creates a new document if the document doesn't exists that match the filter
            // In our case, we will use this method to update the temporary stored programs of a specific academic semester and when the final program is ready, 
            // we will update the temporary with the final
            
            // The below query will find a document in the programs collection with the values in the firse 'filter' argument and update them with the 
            // given fields in the second argument 
            return await CoursesGrading.findOneAndUpdate(
                { "student_AEM" : coursesGradingInput.student_AEM,
                  "student_username" : coursesGradingInput.student_username, 
                },
                { $set : {"student_FirstName" : coursesGradingInput.student_FirstName,
                          "student_LastName" : coursesGradingInput.student_LastName,
                          "student_AEM" : coursesGradingInput.student_AEM,
                          "student_identity": coursesGradingInput.student_identity,
                          "student_username" : coursesGradingInput.student_username,
                          "student_uthEmail" : coursesGradingInput.student_uthEmail,
                          "current_student_semester" : coursesGradingInput.current_student_semester,
                          "student_title" : coursesGradingInput.student_title,
                          "gender" : coursesGradingInput.gender,
                          "grade_average" : coursesGradingInput.grade_average,
                          "total_ECTS" : coursesGradingInput.total_ECTS,
                          "total_units" : coursesGradingInput.total_units,
                          "declarated_courses" : coursesGradingInput.declarated_courses 
                }},
                { upsert : true, returnOriginal : true }) // when no document is identified using the given filter, the 
                                                          // upsert option will insert a new document and the returnOriginal : false 
                                                          // method will return the modified document of the initial
                    .then(result => {                       
                        console.log(result);
                        
                        console.log("[SUCCESS] -> ADD NEW GRADE INFORMATION SUCCESSFUL !!");
                        return (
                            "[SUCCESS] -> ADD NEW GRADE INFORMATION SUCCESSFUL !!"
                        )   
                    })
                    .catch(err => {                            
                        console.log("[ERROR] -> ADD NEW  GRADE INFORMATION FAILED !!")                   
                        console.log(err)
                        return  (
                            "[ERROR] -> ADD NEW  GRADE INFORMATION FAILED !!"
                        )
                    }) 
        },  
        // UPDATE THE SPECIFIC STUDENT'S (BY HIS AEM) PROGRESS GRADE
        async updateDeclaratedCoursesProgressGrade(root, args, context) { 
          // Get the current user AEM from input
          let AEMInput = args.student_AEM;
          let courseCode = args.course_code;
          let academicYear = args.declarated_academic_year;
          let academicPeriod = args.declarated_academic_period;
          let examPeriod = args.declarated_exam_period;
          let progressGrade = args.progress_grade;
          // Query to find the student's specific course
          const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
          // Query to set the new exam grade
          const update_query = {$set: {"declarated_courses.$.progress_grade": progressGrade}}
          // Execute the UPDATE query
          return await CoursesGrading.updateOne(find_query, update_query)
              .then(result=>{
                  console.log("[SUCCESS] -> UPDATE PROGRESS GRADE SUCCESSFUL !!");                    
                  console.log(result) 
                   
                  return "[SUCCESS] -> UPDATE PROGRESS GRADE SUCCESSFUL !!"                    
              })
              .catch(error=> {
                  console.log(error)
                  console.log("[ERROR] -> UPDATE PROGRESS GRADE FAILED !!")   
                  return "[ERROR] -> UPDATE PROGRESS GRADE FAILED !!"               
              })  
          },
          // UPDATE THE SPECIFIC STUDENT'S (BY HIS AEM) EXAM GRADE
          async updateDeclaratedCoursesExamGrade(root, args, context) { 
            // Get the current user AEM from input
            let AEMInput = args.student_AEM;
            let courseCode = args.course_code;
            let academicYear = args.declarated_academic_year;
            let academicPeriod = args.declarated_academic_period;
            let examPeriod = args.declarated_exam_period;
            let examGrade = args.exam_grade;
            // Query to find the student's specific course
            const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
            // Query to set the new exam grade
            const update_query = {$set: {"declarated_courses.$.exam_grade": examGrade}}
            // Execute the UPDATE query
            return await CoursesGrading.updateOne(find_query, update_query)
                .then(result=>{
                    console.log("[SUCCESS] -> UPDATE EXAM GRADE SUCCESSFUL !!");                    
                    console.log(result) 
                    
                    return "[SUCCESS] -> UPDATE EXAM GRADE SUCCESSFUL !!"                    
                })
                .catch(error=> {
                    console.log(error)
                    console.log("[ERROR] -> UPDATE EXAM GRADE FAILED !!")   
                    return "[ERROR] -> UPDATE EXAM GRADE FAILED !!"               
                })  
            },
            // UPDATE THE SPECIFIC STUDENT'S (BY HIS AEM) LABS GRADE
            async updateDeclaratedCoursesLabsGrade(root, args, context) { 
              // Get the current user AEM from input
              let AEMInput = args.student_AEM;
              let courseCode = args.course_code;
              let academicYear = args.declarated_academic_year;
              let academicPeriod = args.declarated_academic_period;
              let examPeriod = args.declarated_exam_period;
              let labsGrade = args.labs_grade;
              // Query to find the student's specific course
              const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
              // Query to set the new exam grade
              const update_query = {$set: {"declarated_courses.$.lab_grade": labsGrade}}
              // Execute the UPDATE query
              return await CoursesGrading.updateOne(find_query, update_query)
                  .then(result=>{
                      console.log("[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!");                    
                      console.log(result) 
                      
                      return "[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!"                    
                  })
                  .catch(error=> {
                      console.log(error)
                      console.log("[ERROR] -> UPDATE LABS GRADE FAILED !!")   
                      return "[ERROR] -> UPDATE LABS GRADE FAILED !!"               
                  })  
              },
              // UPDATE THE SPECIFIC STUDENT'S (BY HIS AEM) TASKS GRADE
              async updateDeclaratedCoursesTasksGrade(root, args, context) { 
                // Get the current user AEM from input
                let AEMInput = args.student_AEM;
                let courseCode = args.course_code;
                let academicYear = args.declarated_academic_year;
                let academicPeriod = args.declarated_academic_period;
                let examPeriod = args.declarated_exam_period;
                let tasksGrade = args.tasks_grade;
                // Query to find the student's specific course
                const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
                // Query to set the new exam grade
                const update_query = {$set: {"declarated_courses.$.tasks_grade": tasksGrade}}
                // Execute the UPDATE query
                return await CoursesGrading.updateOne(find_query, update_query)
                    .then(result=>{
                        console.log("[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!");                    
                        console.log(result) 
                        
                        return "[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!"                    
                    })
                    .catch(error=> {
                        console.log(error)
                        console.log("[ERROR] -> UPDATE LABS GRADE FAILED !!")   
                        return "[ERROR] -> UPDATE LABS GRADE FAILED !!"               
                    })  
                },
                // UPDATE THE SPECIFIC STUDENT'S (BY HIS AEM) SEMESTER GRADE
                async submitDeclaratedCoursesSemesterGrade(root, args, context) { 
                  // Get the current user AEM from input
                  let AEMInput = args.student_AEM;
                  let courseCode = args.course_code;
                  let academicYear = args.declarated_academic_year;
                  let academicPeriod = args.declarated_academic_period;
                  let examPeriod = args.declarated_exam_period;
                  let semesterGrade = args.semester_grade;
                  // Query to find the student's specific course
                  const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
                  // Query to set the new exam grade
                  let update_query = null;
                  if (Number(semesterGrade) >= 5) {
                    update_query = {$set: {"declarated_courses.$.semester_grade": semesterGrade, "declarated_courses.$.result": 'Επιτυχία'}}
                  }
                  if (Number(semesterGrade) < 5) {
                    update_query = {$set: {"declarated_courses.$.semester_grade": semesterGrade, "declarated_courses.$.result": 'Αποτυχία'}}
                  }
                  // Execute the UPDATE query
                  return await CoursesGrading.updateOne(find_query, update_query)
                      .then(result=>{
                          console.log("[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!");                    
                          console.log(result) 
                          
                          return "[SUCCESS] -> UPDATE LABS GRADE SUCCESSFUL !!"                    
                      })
                      .catch(error=> {
                          console.log(error)
                          console.log("[ERROR] -> UPDATE LABS GRADE FAILED !!")   
                          return "[ERROR] -> UPDATE LABS GRADE FAILED !!"               
                      })  
                  },
                  // SET A STUDENT INACTIVE FOR A SPECIFIC COURSE
                  async setInactiveForSpecificCourse(root, args, context) { 
                    // Get the current user input data
                    let AEMInput = args.student_AEM;
                    let courseCode = args.course_code;
                    let academicYear = args.declarated_academic_year;
                    let academicPeriod = args.declarated_academic_period;
                    let examPeriod = args.declarated_exam_period; 

                    // Query to find the student's specific course
                    const find_query = {"student_AEM" : AEMInput ,"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
                    // Query to set the student inactive
                    update_query = {$set: {"declarated_courses.$.active": false}}
                   
                    // Execute the UPDATE query
                    return await CoursesGrading.updateOne(find_query, update_query)
                        .then(result=>{
                            console.log("[SUCCESS] -> SET INACTIVE STUDENT SUCCESSFUL !!");                    
                            console.log(result) 
                            
                            return "[SUCCESS] -> SET INACTIVE STUDENT SUCCESSFUL !!"                    
                        })
                        .catch(error=> {
                            console.log(error)
                            console.log("[ERROR] -> SET INACTIVE STUDENT FAILED !!")   
                            return "[ERROR] -> SET INACTIVE STUDENT FAILED !!"               
                        })  
                    }, 
                    // SET A STUDENT INACTIVE FOR A SPECIFIC COURSE
                    async setAllInactiveForSpecificCourse(root, args, context) { 
                      // Get the current user input data 
                      let courseCode = args.course_code;
                      let academicYear = args.declarated_academic_year;
                      let academicPeriod = args.declarated_academic_period;
                      let examPeriod = args.declarated_exam_period; 

                      // Query to find the student's specific course
                      const find_query = {"declarated_courses.course_code": courseCode, "declarated_courses.declarated_academicYear" : academicYear, "declarated_courses.declarated_period" : academicPeriod, "declarated_courses.exam_period" : examPeriod}
                      // Query to set the student inactive
                      update_query = {$set: {"declarated_courses.$.active": false}}
                    
                      // Execute the UPDATE query
                      return await CoursesGrading.updateMany(find_query, update_query)
                          .then(result=>{
                              console.log("[SUCCESS] -> SET INACTIVE ALL STUDENTS SUCCESSFUL !!");                    
                              console.log(result) 
                              
                              return "[SUCCESS] -> SET INACTIVE ALL STUDENTS SUCCESSFUL !!"                    
                          })
                          .catch(error=> {
                              console.log(error)
                              console.log("[ERROR] -> SET INACTIVE ALL STUDENTS FAILED !!")   
                              return "[ERROR] -> SET INACTIVE ALL STUDENTS FAILED !!"               
                          })  
                      } 
             
    }
}

module.exports = coursesGrading_resolvers;