import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useEffect, useState} from "react";  

// Auth
import { AuthProvider } from "./context/auth";

// Components
import NotFound from './components/HOMEPAGES/NotFound' 
import Signup from "./components/SIGNUP";
import Login from "./components/LOGIN";  
 

// Loaders
import PageLoader from "./components/LOADERS/loader"; 
// Admin
import AdminHome from "./pages/ADMIN_PAGES/AdminHome";
import DashBoard from './pages/ADMIN_PAGES/DashBoard'; 
import AddStudentChooseType from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/addStudentChooseType";
import AdminStudentsAddFirstFormComponent from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/studentsFirstFormAdd";
import AdminStudentsAddSecondFormComponent from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/studentsSecondFormAdd";
import AdminStudentsCompleteAddComponent from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/studentsCompleteAdd";
import AdminStudentsFinalCompleteAddComponent from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/studentsFinalCompleteAdd";
import AddStudentsUploadFile from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/addStudentsUploadFile"; 
import AddStudentsValidateInfoFile from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/addStudentsValidateInfoFile";
import AddStudentsCompleteUploading from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT/addStudentsCompleteUploading";  
import AddCourse from "./pages/ADMIN_PAGES/COURSES_INFO/ADD_COURSES/addCourses";
import AddCoursePreview from "./pages/ADMIN_PAGES/COURSES_INFO/ADD_COURSES/addCoursePreview";
import AddCourseCompleted from "./pages/ADMIN_PAGES/COURSES_INFO/ADD_COURSES/addCourseCompleted";
import AddHall from "./pages/ADMIN_PAGES/DEPARTMENT/BUILDING/AddHall";
import CreateProgram from './pages/ADMIN_PAGES/PROGRAM_INFO/CREATE_PROGRAM/CreateProgram';
import CreateCalendar from './pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/CreateCalendar';
import FormPage from "./pages/STUDENT_PAGES/FORMS/FormPage";
import SpecificForm from "./pages/STUDENT_PAGES/FORMS/SpecificForm";
import MyForms from "./pages/STUDENT_PAGES/FORMS/MyForms";
import AddProfessor from "./pages/ADMIN_PAGES/FACULTY_INFO/ADD_PROFESSOR/AddProfessor"; 
import AddStudent from "./pages/ADMIN_PAGES/STUDENTS_INFO/ADD_STUDENT_FINAL/AddStudent";
import CoursesDeclaration from "./pages/STUDENT_PAGES/COURSES_DECLARATION/SUBMIT_DECLARATION/CoursesDeclaration"; 
import ProfessorCourses from "./pages/ADMIN_PAGES/FACULTY_INFO/COURSES_PROFESSOR/ProfessorCourses";
import CourseGrading from "./pages/ADMIN_PAGES/FACULTY_INFO/COURSE_GRADING/CourseGrading";
import DeclarationViewer from "./pages/STUDENT_PAGES/COURSES_DECLARATION_DOCUMENT/DeclarationViewer";
import EditProfessor from "./pages/ADMIN_PAGES/FACULTY_INFO/EDIT_PROFESSOR/EditProfessor";
import EditStudent from "./pages/ADMIN_PAGES/STUDENTS_INFO/EDIT_STUDENT/EditStudent";
import StudentsList from "./pages/ADMIN_PAGES/STUDENTS_INFO/STUDENTS_LIST/StudentsList";
import StudentCourses from "./pages/STUDENT_PAGES/STUDENTS_COURSES/MyCourses";
import PostGraduateCourses from "./pages/FOR_ALL_PAGES/POSTGRADUATE_COURSES_LIST/PostCoursesList";

// For All Pages
import CourseProfile from "./pages/FOR_ALL_PAGES/COURSES_INFO/COURSE_PROFILE/CourseProfile";
import CoursesList from "./pages/FOR_ALL_PAGES/COURSES_INFO/COURSES_LIST/CoursesList";
import SearchCourses from "./pages/FOR_ALL_PAGES/SEARCH_COURSES/SearchCourses";
import ProfessorList from "./pages/FOR_ALL_PAGES/PROFESSOR_INFO/ProfessorList";

import * as routes from './constants/routes';  

function App() {   
  
   
  /*
  const mapState = useCallback((state) => ({
    loading: state.sessionState.loading
  }), [])


  
const {loading} = useMappedState(mapState);
console.log(loading)*/ 
  // Set loading state to true initially  
  const [loading, setLoading] = useState(true);
      
  useEffect(() => {
    // Loading function to load data or 
    // fake it using setTimeout;
    const loadData = async () => {

      // Wait for two second
      await new Promise((r) => setTimeout(r, 300));

      // Toggle loading state
      setLoading((loading) => !loading);
    };
      
    loadData();
  }, [])

  if (loading) return <PageLoader/>
 
  return ( 

    <AuthProvider>     
      <Router basename={process.env.PUBLIC_URL}>  
        <div className="UTH-ECE_App">  
          <Routes> 
            <Route exact path="/" element={<Login/>}></Route>               
            <Route exact path={routes.LOADER} element={<PageLoader/>}/>        
            <Route exact path={routes.SIGN_UP} element={<Signup/>}/>
            <Route exact path={routes.LOGIN} element={<Login/>}/>
            <Route exact path={routes.HOMEPAGE} element={<AdminHome/> }/>
            <Route exact path={routes.ADMINPAGE} element={<AdminHome/> }/> 
            <Route exact path={routes.ADMINPAGE_ADDSTUDENT_SELECTION} element={<AddStudentChooseType/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_FIRSTFORM} element={<AdminStudentsAddFirstFormComponent/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_SECONDFORM} element={<AdminStudentsAddSecondFormComponent/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_COMPLETE} element={<AdminStudentsCompleteAddComponent/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_COMPLETE_FINAL} element={<AdminStudentsFinalCompleteAddComponent/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_UPLOADFILE} element={<AddStudentsUploadFile/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_VALIDATEINFOFILE} element={<AddStudentsValidateInfoFile/>}/>
            <Route exact path={routes.ADMIN_ADDSTUDENT_COMPLETEUPLOADING} element={<AddStudentsCompleteUploading/>}/> 
            <Route exact path={routes.ADMIN_ADDCOURSE} element={<AddCourse/>}/>
            <Route exact path={routes.ADMIN_ADDCOURSEPREVIEW} element={<AddCoursePreview/>}/>
            <Route exact path={routes.ADMIN_ADDCOURSECOMPLETED} element={<AddCourseCompleted/>}/>
            <Route exact path={routes.FORALL_COURSE_PROFILE} element={<CourseProfile/>}/>  
            <Route exact path={routes.ADMIN_ADDHALL} element={<AddHall/>}/>   
            <Route exact path={routes.ADMIN_CREATEPROGRAM} element={<CreateProgram/>}/>
            <Route exact path={routes.ADMIN_CREATECALENDAR} element={<CreateCalendar/>}/>
            <Route exact path={routes.STUDENT_SUBMIT_FORM} element={<FormPage/>}/>
            <Route exact path={routes.STUDENT_SPECIFIC_FORM} element={<SpecificForm/>}/> 
            <Route exact path={routes.STUDENT_FORMS} element={<MyForms/>}/> 
            <Route exact path={routes.ADMIN_ADDPROFESSOR} element={<AddProfessor/>}/> 
            <Route exact path={routes.ADMIN_ADDSTUDENT} element={<AddStudent/>}/>
            <Route exact path={routes.STUDENT_SUBMIT_COURSES_DECLARATION} element={<CoursesDeclaration/>}/> 
            <Route exact path={routes.PROFESSOR_COURSES} element={<ProfessorCourses/>}/>
            <Route exact path={routes.COURSE_GRADING} element={<CourseGrading/>}/>
            <Route exact path={routes.COURSES_DECLARATION_VIEWER} element={<DeclarationViewer/>}/>
            <Route exact path={routes.COURSE_LIST} element={<CoursesList/>}/>
            <Route exact path={routes.SEARCH_COURSES} element={<SearchCourses/>}/>
            <Route exact path={routes.PROFESSOR_LIST} element={<ProfessorList/>}/>
            <Route exact path={routes.STUDENTS_LIST} element={<StudentsList/>}/>
            <Route exact path={routes.ADMIN_EDITPROFESSOR} element={<EditProfessor/>}/> 
            <Route exact path={routes.ADMIN_EDITSTUDENT} element={<EditStudent/>}/>
            <Route exact path={routes.ADMIN_DASHBOARD} element={<DashBoard/>}/>
            <Route exact path={routes.STUDENT_COURSES} element={<StudentCourses/>}/>
            <Route exact path={routes.POST_COURSE_LIST} element={<PostGraduateCourses/>}/>
            <Route exact path="*" element={<NotFound/>}/>        
          </Routes> 
        </div>
      </Router> 
  </AuthProvider> 
  ) 
}

export default App;
