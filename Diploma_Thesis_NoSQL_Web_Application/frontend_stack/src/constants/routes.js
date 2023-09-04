export const HOMEPAGE = '/homepage';
export const LOGIN = '/login';
export const SIGN_UP = '/signup';

// Loaders
export const LOADER ='/loader'; 

// Admin
export const ADMINPAGE='/uth-ece_admin';
export const ADMIN_DASHBOARD = '/uth-ece_admin/dashboard'; 

//                  ****** STUDENTS AREA ******  
export const ADMINPAGE_ADDSTUDENT_SELECTION = '/uth-ece_admin/add_student5';
export const ADMIN_ADDSTUDENT_UPLOADFILE = '/uth-ece_admin/add_student/upload_file';
export const ADMIN_ADDSTUDENT_VALIDATEINFOFILE = '/uth-ece_admin/add_student/validate_file';
export const ADMIN_ADDSTUDENT_COMPLETEUPLOADING = '/uth-ece_admin/add_student/complete_uploading';
export const ADMIN_ADDSTUDENT_FIRSTFORM = '/uth-ece_admin/add_student/personal_info_form';
export const ADMIN_ADDSTUDENT_SECONDFORM = '/uth-ece_admin/add_student/student_info_form';
export const ADMIN_ADDSTUDENT_COMPLETE = '/uth-ece_admin/add_student/complete_add';
export const ADMIN_ADDSTUDENT_COMPLETE_FINAL = '/uth-ece_admin/add_student/complete_add_final'; 

export const ADMIN_ADDSTUDENT = '/uth-ece_admin/add_student';
export const ADMIN_EDITSTUDENT = '/uth-ece_admin/edit_student'; 
export const STUDENTS_LIST = '/uth-ece/students_list';


//                  ****** PROFESSORS AREA ******
export const ADMIN_ADDPROFESSOR = '/uth-ece_admin/add_professor';
export const ADMIN_EDITPROFESSOR = '/uth-ece_admin/edit_professor';
export const PROFESSOR_LIST = '/uth-ece/professor_list';

//                  ****** COURSES AREA ******
export const ADMIN_ADDCOURSE = '/uth-ece_admin/add_course';
export const ADMIN_ADDCOURSEPREVIEW = '/uth-ece_admin/add_course_preview';
export const ADMIN_ADDCOURSECOMPLETED = '/uth-ece_admin/add_course_completed';
export const FORALL_COURSE_PROFILE = '/uth-ece/studies/:studies_level/courses/:course_code';
export const PROFESSOR_COURSES = '/uth-ece/studies/my_prof_courses/:prof_username';
export const COURSE_GRADING = '/uth-ece/:prof_username/:course_code/grading';
export const COURSE_LIST = '/uth-ece/undergraduate_courses_list';
export const POST_COURSE_LIST = '/uth-ece/postgraduate_courses_list';
export const SEARCH_COURSES = '/uth-ece/search_courses';
export const STUDENT_COURSES = '/uth-ece/studies/my_student_courses/:student_username';

//                  ****** DEPARTMENT AREA ******
export const ADMIN_ADDHALL = 'uth-ece_admin/add_hall';

//                  ****** PROGRAM AREA ******
export const ADMIN_CREATEPROGRAM =  '/uth-ece_admin/create_program';

//                  ****** CALENDAR AREA ******
export const ADMIN_CREATECALENDAR = '/uth-ece_admin/create_calendar';

//                  ****** FORMS AREA ******
export const STUDENT_SUBMIT_FORM = '/submit_form'
export const STUDENT_SPECIFIC_FORM = '/form/:gradLevel/:form_kind'
export const STUDENT_FORMS = '/form/:gradLevel/my_forms'
export const STUDENT_FORM_TO_PDF = '/form/html2pdf'

//            ****** COURSES DECLARATION AREA ******
export const STUDENT_SUBMIT_COURSES_DECLARATION = '/e_secretariat/submit_my_course_declaration'
export const COURSES_DECLARATION_VIEWER = '/e_secretariat/view_my_declarations';




