import React, { useState , useEffect} from "react";
import { useLocation , useNavigate} from "react-router-dom";

// Components
import AdminNavbar from '../../AdminNavbar';
import AdminSidebar from "../../AdminSidebar";
import CoursesNavbar from "./coursesCompNavbar"; 
import PageLoader from "../../../../components/LOADERS/loader";
import CourseCard from "../../../../components/CARDS/CourseCard";

// Icons 
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

// GraphQL 
import coursesResolvers from "../../../../graphql/resolvers/courses";

// CSS Styles  
import '../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCourseCompleted.scss'
import { Link } from "react-router-dom";
import Login from "../../../../components/LOGIN";
const AddCourseCompleted = () => {
    window.scrollTo(0, 0);

    // Using useLocation() to take the parameters for the new course from the previous page
    const location = useLocation();

    // Determine the object that contains the new course's data using the location state
    const newCourse = location.state.newCourse; 

    // Determine the state variable that sets the page's state while the insertion course query runs
    let [pageState, setPageState] = useState('loading');
    
    // Variable that determines the graduate level of the current course
    let gradLevel = '';

    // Use the suitable INERT query to add the new course to the ece department's database
    if (pageState === 'loading') {
        coursesResolvers.add_course(Object(newCourse))
                                .then(result => { 
                                    setPageState('Page of Success');
                                    console.log(result)                               
                                })
                                .catch(err=> {
                                    console.log(err);
                                });
    }
    
    // According the format of the course's code we set the graduate level of the course
    if (newCourse.StudyProgram.course_code.startsWith('ECE') && newCourse.StudyProgram.course_code.length === 6) {
        gradLevel = 'ΠΡΟΠΤΥΧΙΑΚΟ'
    }
    else {
        gradLevel = 'ΜΕΤΑΠΤΥΧΙΑΚΟ'
    }

    const [rightSideBar, setRightSideBar] = useState(true);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    // Check the user connection
    let token = localStorage.getItem('token') 

    // Control the left sidebar state
    useEffect(()=> {
        if (rightSideBar === true) {
            setLeftSide('left-wrapper');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper');        // left side open
        }
        else if (rightSideBar === false) {
            setLeftSide('left-wrapper close');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper open');   // left side close
        }
    }, [rightSideBar])

    const navigate = useNavigate()
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    return (
        <>
        {token !== 'null' ?
        <div className="add_course_page">  
            <div className="add_course_scroll_page">
                <div className="add_course_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesNavbar  action = 'add_course' connectedUser={localStorage.getItem('userIdentity')}/>  
                <div className="main">
                    <div className ='first_component'>
                        {pageState === 'loading' ?
                            <PageLoader/> : 
                            <div className="success">
                                <div className="successful_message">
                                    <CheckCircleTwoToneIcon className="icon"/>
                                    <div className="text">
                                        Το <p>{gradLevel}</p> μάθημα <p>{newCourse.StudyProgram.course_name}</p> με κωδικό μαθήματος <p>{newCourse.StudyProgram.course_code}</p> καταχωρήθηκε με επιτυχία
                                        στην Ηλεκτρονική Γραμματεία του Τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας ! <br></br><br></br>
                                        Ακολουθεί η καρτέλα με τα στοιχεία του νέου μαθήματος :
                                    </div>
                                </div>
                                <div className="courseCard">
                                    <CourseCard newCourseInfo={newCourse}/>
                                </div>  
                                <div className="more_text">
                                        Για περισσότερες πληροφορίες σχετικά με το εν λόγω μάθημα μεταβείτε στην αντίστοιχη <div className="link" /*onClick={gradLevel === 'ΠΡΟΠΤΥΧΙΑΚΟ' ? navigate('/uth-ece/studies/undergratuate/courses/' + newCourse.StudyProgram.course_code) : navigate('/uth-ece/studies/postgratuate/courses/' + newCourse.StudyProgram.course_code)}*/> σελίδα του μαθήματος</div>
                                </div>                              
                            </div>
                        }                  
                    </div>
                </div>                             
            </div>
        </div>
    </div>
    </div>
    : <Login/> }
    </>
    )
} 
export default AddCourseCompleted;