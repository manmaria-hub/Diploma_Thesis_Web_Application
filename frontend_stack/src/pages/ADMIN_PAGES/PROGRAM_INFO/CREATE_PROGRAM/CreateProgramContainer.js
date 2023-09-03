import React, { useEffect, useState } from "react";  
import {useDrag, useDrop } from "react-dnd";
import { ToastContainer, toast } from "react-toastify";

// Components
import Loader from '../../../../components/LOADERS/loader';

// GraphQL Resolvers
import Halls from '../../../../graphql/resolvers/halls';
import Courses from '../../../../graphql/resolvers/courses';

// Components
import TimetablePostGraduate from '../CREATE_PROGRAM/TimetablePostGraduate';

// Icons
import LOGO from '../../../../Icons/bacLogo.jpg';

import {IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from 'react-icons/io';
import {IoClose, IoCalendar, IoMan} from 'react-icons/io5';
import {GiWhiteBook} from 'react-icons/gi';
import {BsClockFill, BsFillBuildingFill} from 'react-icons/bs'; 
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin2Fill} from 'react-icons/ri';
import {MdCircle} from 'react-icons/md';
import {FcOk} from 'react-icons/fc';

// GraphQL resolvers
import programResolvers from "../../../../graphql/resolvers/program";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/PROGRAM_INFO/CREATE_PROGRAM/createProgramContainer.scss'
import "react-toastify/dist/ReactToastify.css"; 

const CreateProgramContainer = () => {  
    
    // State variable that determines the type of created program
    let [typeOfProgram, setTypeOfProgram] = useState('ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ')
    // State variable that determines the study level of the created program
    let [studyLevelProgram, setStudyLevelProgram] = useState('ΠΡΟΠΤΥΧΙΑΚΟ');
    // State variable that it is responsible for the modal window appearance or not
    let [modalOpen, setModalOpen] = useState({state:'modal', category:'', course: '',  day:'', fromHour:'', toHour:'', hall:'', type:'', instructor:''});

    // Useful variable arrays that hold the data from graphQl queries
    const [halls, setHalls] = useState([]);         //  Halls
    const [courses, setCourses] = useState([]);     // Courses

    // State variable that contains the data of the current course to process their program
    let currCourse = null;
    // State variable that contains the index in the program of the current course to update  
    let [currProgramItemIndex, setCurrProgramItemIndex] = useState('');
    // State variable array that will keep the courses whose the program details have setted for all the theory, study or lab hours
    let [completedProgramCourses, setCompletedProgramCourses] = useState([]);

    // Setting and initializing the variable that will keep the current course that is been prepared to update 
    let [courseToUpdate, setCourseToUpdate] = useState();

    // Determine the current Date
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)

    let currAcademicYear = '';    // initialiaze current academic year variabe
    let currAcademicSemester = '';    // initialiaze current academic semester variabe
    // Create an array for academic year selections
    let acadYears = [];

    // Set and initialize the arrays that will keep the courses for each category 
    // (such as the courses of the first academic year of study, of the second year,...)
    let [firstYearCourses, setFirstYearCourses] = useState([]);       // FIRST YEAR
    let [secondYearCourses, setSecondYearCourses] = useState([]);     // SECOND YEAR
    let [thirdYearCourses, setThirdYearCourses] = useState([]);       // THIRD YEAR
    let [fourthYearCourses, setFourthYearCourses] = useState([]);     // FOURTH YEAR
    let [fifthYearCourses, setFifthYearCourses] = useState([]);       // FIFTH YEAR

    // Set and initialize the array that will keep the courses of each postgraduate specialization field
    let [postgraduateFields, setPosgraduateFields] = useState([]);
  
    // Set and initialize tha array that will keep the lab hours of a course 
    let [labHours, setLabHours] = useState([]);

    // Set and initialize two variables that will keep the last values of day and hours in that we have the drag event
    let [lastDragEvent, setLastDragEvent] = useState({day : '', fromHour : ''});

    // Create an array that will keep the program info
    
    // First, we determine one only object of this array
    const [programItem, setProgramItem] = useState({course_code : "", course_name : "", day:"", date: "", fromHour:"", toHour:"", Hall:"", type:"", instructor:""});

    // After that we set the program array
    let [program, setProgram] = useState([{course_code : "", course_name : "", day:"", date: "-", fromHour:"", toHour:"", Hall:"", type:"", instructor:""}]);
    
    // Find the current academic year 
    if (currMonth > 9 && currMonth <= 12) {
        currAcademicYear = currYear + '-' + currYear+1;        
        acadYears = [ Number(currYear + 2) + '-' + Number(currYear + 3) ,Number(currYear + 1) + '-' + Number(currYear + 2), currAcademicYear,  Number(currYear -1) + '-' + currYear, Number(currYear -2) + '-' + Number(currYear -1), Number(currYear -3) + '-' +  Number(currYear -2)]
    }
    else {
        currAcademicYear = currYear-1 + '-' + currYear;
        acadYears = [ currYear + 1 + '-' + Number(currYear + 2) , currYear + '-' + Number(currYear + 1), currAcademicYear, Number(currYear -2) + '-' + Number(currYear-1), Number(currYear -3) + '-' + Number(currYear -2), Number(currYear -4) + '-' + Number(currYear -3)]
    }    
    // Find the current academic semester
    if (currMonth >= 9 && currMonth < 2) {
        currAcademicSemester = 'Χειμερινό Εξάμηνο';        
    }
    else {
        currAcademicSemester = 'Εαρινό Εξάμηνο';        
    } 

    // Fill the array of halls with the object of halls that can be offered for study (study halls, amphitheatres & labs)
    if (halls.length === 0) {
        Halls.get_study_and_lab_halls()
            .then(result => { 
                setHalls(result?.data?.getAllStudyAndLabHalls);
            })
            .catch(err=> {
                console.log(err)
            })
    }

    let [hallProgram, setHallProgram] = useState([]);

    useEffect(() => {
        if (halls.length !== 0 && hallProgram.length === 0) {
            halls.forEach((hall) => {
                let obj = {hall_code : hall.Hall_code, days_and_hours:[] }
                hallProgram.push(obj);
            })
        } 
    }, [halls])  
    
    
    // Clear the program and the hall arrays every time we select a different kind of program and graduate level
    useEffect (()=> {        
        setCourses([]);
        setProgram([{course_code : "", course_name : "", day:"", date: "-", fromHour:"", toHour:"", Hall:"", type:"", instructor:""}]);
        hallProgram.forEach((hall) => {
            hall.days_and_hours = [];
        })
        setModalOpen(modalOpen => ({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""}))  
        setProgramItem(programItem=> ({...programItem, course_code:'', course_name:"", day:"", date:"", fromHour:"", toHour:"", Hall:"", type:"", instructor:""}))                     
        setCourseToUpdate(courseToUpdate => ({ ...courseToUpdate, course_code: '', course_name : "", day: "", fromHour : "", toHour : "", hall: "", type : "", instructor : "" }))
    }, [typeOfProgram, studyLevelProgram])
   
    // Fill correctly the array of courses according to the selected type of created program
    useEffect (() => {
        // Before realize the graphQL query, we determine the period
        let period = '';
        if (currAcademicSemester === 'Χειμερινό Εξάμηνο') {
            period = 'Χειμερινή';
        }
        else if (currAcademicSemester === 'Εαρινό Εξάμηνο') {
            period = 'Εαρινή';
        }
        // *** ΠΡΟΠΤΥΧΙΑΚΑ ΜΑΘΗΜΑΤΑ
        if (studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' ) {
            // Before fill the arrays, initialize them with the empty  
            if (program.length !== 0 ) {setProgram([{course_code : "", course_name : "", day:"", date: "-", fromHour:"", toHour:"", Hall:"", type:"", instructor:""}]);}
            if (courses.length !== 0) {setCourses([])}
            if (completedProgramCourses !== 0) {setCompletedProgramCourses([])}            
            if (firstYearCourses.length !== 0 ) { setFirstYearCourses([]);}
            if (secondYearCourses.length !== 0 ) { setSecondYearCourses([]);}
            if (thirdYearCourses.length !== 0 ) { setThirdYearCourses([]);}
            if (fourthYearCourses.length !== 0 ) { setFourthYearCourses([]);}
            if (fifthYearCourses.length !== 0 ) { setFifthYearCourses([]);}

            Courses.get_active_courses_by_specific_period(period)
                .then(result => {
                    let retCourses = result?.data?.getAllActiveCoursesOfSpecificPeriod; 
                    let finalCourses = [];
                    retCourses.forEach((item) => { 
                        if (retCourses.length !== 0 && item?.StudyProgram?.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ')) {
                            finalCourses.push(item);
                            // Determine the array of lab hours
                            if (item.InfoFromInstructor.lab_hours !== '') {
                                let obj = {course_code : item.StudyProgram.course_code, lab_group_number : item.InfoFromInstructor.lab_hours !== '' ? Math.ceil(item.More.students_curr_attendance_num / 20) : '',
                                        total_lab_hours : item.InfoFromInstructor.labHours !== '' ? (Math.ceil(item.More.students_curr_attendance_num / 20))*Number(item.InfoFromInstructor.lab_hours) : ''}
                                labHours.push(obj);
                            }
                            // Determine the courses of the first year of studies
                            if (item.StudyProgram.semester === '1' || item.StudyProgram.semester === '2') { 
                                setFirstYearCourses(firstYearCourses => [...firstYearCourses, item]);  
                            }
                            // Determine the courses of the second year of studies
                            else if (item.StudyProgram.semester === '3' || item.StudyProgram.semester === '4') {
                                setSecondYearCourses(secondYearCourses => [...secondYearCourses, item])                                
                            }
                            // Determine the courses of the third year of studies
                            else if (item.StudyProgram.semester === '5' || item.StudyProgram.semester === '6') {
                                setThirdYearCourses(thirdYearCourses => [...thirdYearCourses, item])                                
                            }
                            // Determine the courses of the fourth year of studies
                            else if (item.StudyProgram.semester === '7' || item.StudyProgram.semester === '8') {
                                setFourthYearCourses(fourthYearCourses => [...fourthYearCourses, item])                                
                            }
                            // Determine the courses of the fifth year of studies
                            else if (item.StudyProgram.semester === '9' || item.StudyProgram.semester === '10') {
                                setFifthYearCourses(fifthYearCourses => [...fifthYearCourses, item])                                
                            }                            
                        } 
                    }) 
                    setCourses(finalCourses);
                }) 
        }
        else if (studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') {
            // Before fill the array of postgraduate courses, initialize them with the empty 
            if (program.length !== 0 ) {setProgram([{course_code : "", course_name : "", day:"", date: "-", fromHour:"", toHour:"", Hall:"", type:"", instructor:""}]);}
            if (completedProgramCourses !== 0) {setCompletedProgramCourses([])}   
            if (postgraduateFields.length !== 0 ) { setPosgraduateFields([]);}
            if (courses.length !== 0) {setCourses([])}
             
            // Use the suitable query to collect all the postgraduate courses data group by specialization field
            Courses.get_postgraduate_courses(period)
                .then(result => { 
                    setPosgraduateFields(result?.data?.getPostGraduateCourses);
                    let finalCourses = [];
                    result?.data?.getPostGraduateCourses.forEach(field=> {
                        field.courses.forEach(course => {
                            finalCourses.push(course);
                        })
                    })
                    setCourses(finalCourses);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })            
        }
    }, [studyLevelProgram, currAcademicSemester])
        
    // Function that is useful for the timegrid 
    const range = (start, end, step) => {
        let array = [start]
        while (start < end) {           
          start += step;
          array.push(start);
        } 
        return(array)
    }
      
    // Function that handles user's click at menu of courses
    const handleClick = (item) => {  
        if (document.getElementById(item).getElementsByClassName('li_icon2')[0].style.display === '' || document.getElementById(item).getElementsByClassName('li_icon2')[0].style.display === 'none') {            
            document.getElementById(item).getElementsByClassName('li_icon2')[0].style.display = 'flex';
            document.getElementById(item).getElementsByClassName('li_icon')[0].style.display = 'none';
        }
        else if (document.getElementById(item).getElementsByClassName('li_icon2')[0].style.display === 'flex') {
            document.getElementById(item).getElementsByClassName('li_icon2')[0].style.display = 'none';
            document.getElementById(item).getElementsByClassName('li_icon')[0].style.display = 'flex';
        }

        if (document.getElementById(item).getElementsByClassName('sub_menu')[0].style.display === 'none' || document.getElementById(item).getElementsByClassName('sub_menu')[0].style.display === '') {
            document.getElementById(item).getElementsByClassName('sub_menu')[0].style.display = 'block';
        }
        else {
            document.getElementById(item).getElementsByClassName('sub_menu')[0].style.display = 'none';           
        }
    }
    
    // Function that determines the type of created program by the user selection
    const selectTypeOfProgram = (programType, studyLevel) => {         
        setTypeOfProgram(programType);          // Type of Program
        setStudyLevelProgram(studyLevel);       // Study Level 
        // Remove all indexes from the array of courses
        setFirstYearCourses([]);
        setSecondYearCourses([]);
        setThirdYearCourses([]);
        setFourthYearCourses([]);
        setFifthYearCourses([]);
        setPosgraduateFields([]);
        setCourses([]);
    } 

    const movePlayer = (item) => { 
        setModalOpen({...modalOpen, state :'modal show', category:'create', course : item.item.StudyProgram?.course_code + " " + item.item.StudyProgram.course_name, day: lastDragEvent.day, fromHour : (lastDragEvent.fromHour).toString(), toHour : (lastDragEvent.fromHour + 1).toString()})
         
    } 
    // Component that determines an item of the courses' submenu (Draggable) 
    const SubMenuItem = ({ item, keyProp, divType, className, index, multiple, onDropPlayer}) => {
       
        const [{isDragging}, dragRef] = useDrag({
            type: divType,
            item : () => ({   
                item,           
                index
            }),            
           end: (item, monitor) => {
                const dropResult = monitor.getDropResult(); 
                if (item && dropResult) {
                    onDropPlayer(item);
                } 
            }, 
            collect : (monitor) => ({
                isDragging : monitor.isDragging()
            })
        }) 
        return (                                                                                                                           
            <div key={keyProp} className={className} ref={dragRef}>             
                <span>{item?.StudyProgram?.course_code + " " + item?.StudyProgram?.course_name}</span>
                {courses?.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code).length !== 0 ? 
                <div className="remaining_hours">( {courses?.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].InfoFromInstructor.theory_hours !== '' ? " " + courses.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].InfoFromInstructor.theory_hours + "h Διαλέξεων": null}
                {courses.filter(remain=> remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].InfoFromInstructor.lab_hours !== '' ? " + " + labHours.filter(lab => lab.course_code === item.StudyProgram.course_code)[0].total_lab_hours + 'h Εργαστηρίου' : null} 
                {courses.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].InfoFromInstructor.lab_hours === '' && courses.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].InfoFromInstructor.theory_hours === '' ? " " + courses.filter(remain => remain.StudyProgram.course_code === item.StudyProgram.course_code)[0].StudyProgram.study_hours + "h Διδασκαλίας" : null }  )</div>
                : null }
            </div>  
        )
    }

    // Component that determines a specific item of the program (Draggable)
    const ProgramDetail = ({keyIn, detail, index, type, onDropPlayer}) => {

        const [{isDragging}, dragProgramRef] = useDrag({
            type: type,
            item : () => ({   
                detail,           
                index
            }),            
            end: (detail, monitor) => {
                const dropResult = monitor.getDropResult(); 
                if (detail && dropResult) {
                    onDropPlayer(detail);
                }
            }, 
            collect : (monitor) => ({
                isDragging : monitor.isDragging()
            })
        }) 

        // Variable that determines the background color of the program item according to the category in that the course is belonging
        let backgroundColor ='';
        if (studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ') {
            if (firstYearCourses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 ) {
                backgroundColor = '#019ff8';
            }
            else if (secondYearCourses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 ) {
                backgroundColor = '#58baab';
            }
            else if (thirdYearCourses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 ) {
                backgroundColor = '#fec801';
            }
            else if (fourthYearCourses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 ) {
                backgroundColor = '#f2426d';
            }
            else if (fifthYearCourses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 ) {
                backgroundColor = '#733aeb';
            } 
        }
        else if (studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') {
            postgraduateFields.forEach((field, x) => {
                if (field.courses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 && (x+1) % 2 === 0) {
                    backgroundColor = '#58baab';  
                }
                else if (field.courses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 && (x+1) % 3 === 0) {
                    backgroundColor = '#fec801';
                }
                else if (field.courses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 && (x+1) % 4 === 0) {
                    backgroundColor = '#f2426d';
                }
                else if (field.courses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0 && (x+1) % 5 === 0) {
                    backgroundColor = '#733aeb';
                }
                else  if (field.courses.filter(item=> (item.StudyProgram.course_code === detail.course_code)).length !== 0){
                    backgroundColor = '#019ff8'; 
                }
                
            })
        }
        return (            
            <div className="program_detail" key = {keyIn} ref={dragProgramRef}><div className="program_item" 
                style={{backgroundColor:backgroundColor}}
                onMouseDown={()=> {setCurrProgramItemIndex(index); setModalOpen({...modalOpen, state : 'modal show', category:'update', course: detail.course_code + " " + detail.course_name, day : detail.day, fromHour : detail.fromHour, toHour : detail.toHour, hall : detail.Hall, type : detail.type, instructor: detail.instructor});
                // Setting also the object courseToUpdate with the same course exam's information, that will be useful for the delete button handling
                setCourseToUpdate({ ...courseToUpdate, course_code : detail.course_code , course_name : detail.course_name, day : detail.day, fromHour : detail.fromHour, toHour : detail.toHour, type : detail.type, hall : detail.Hall, instructor : detail.instructor });
                setProgramItem({...programItem, course_code: detail.course_code , course_name: detail.course_name, day : detail.day, fromHour : detail.fromHour, toHour : detail.toHour, Hall : detail.Hall, type : detail.type, instructor: detail.instructor})}}
            ><div className="first" ><MdCircle className="inIcon"/><div className="Intext">{detail.course_code} </div> </div>
            <div className="program_item2"> ({hallProgram.filter(item=> detail.Hall.includes(item.hall_code))[0].hall_code})</div> 
            </div>
            </div>
        )
    }

    const HandleDragEvent = (day_Input, fromHour_Input, setTimeAreaColor) => {        
        // Change the color of table cell to show the selection 
        setTimeAreaColor("#bed3fcb8");
        // Determine the last day and hour that accepted a drag event on it
        lastDragEvent.day = day_Input
        lastDragEvent.fromHour = fromHour_Input;
        //setLastDragEvent({...lastDragEvent, day :  day_Input, fromHour : fromHour_Input});
    }


    // Component that determines a cell of the program's cell (Drop Area)
    const TimeArea = ({ program, item, id, index, onDropPlayer}) => {
        // State variable for the situation of a program cell's color
        const [TimeAreaColor, setTimeAreaColor] = useState('#eff2f5') 
        const styles = {
            backgroundColor: !(typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') && (id === 'Σάββατο'  || id === 'Κυριακή') ? '#e2e5e9' : TimeAreaColor,
            userSelect : !(typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') && (id === 'Σάββατο'  || id === 'Κυριακή') ? 'none' : 'all',
            pointerEvents : !(typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') && (id === 'Σάββατο'  || id === 'Κυριακή') ? 'none' : 'all'
        }

        const [{isOver}, dropCourse] = useDrop(() => ({
            accept : ["submenu_item", "program_detail"],
            drop : (item) => addItemToSection(item.course_code),
            collect : (monitor) => ({
                isOver : !!monitor.isOver()
            })
        })) 
        
        return (      
            <td className="time_area" id={id}  
                onClick={(e)=> {setTimeAreaColor("#bed3fcb8"); setModalOpen({...modalOpen, state:'modal show',category:'create', course: "", day:id, fromHour:item.toString(), toHour:(item+1).toString(), hall:'', type:"", instructor:""});}}  
                style={styles}
                onDragEnter={(e) => HandleDragEvent(id, item, setTimeAreaColor)}
                onDragLeave={() => setTimeAreaColor("#eff2f5")}
                onDragEnd={() => setTimeAreaColor("#eff2f5")}
                onMouseEnter={() => setTimeAreaColor("#eff2f5")} 
                ref={dropCourse}>
                {program.map((detail, idx) => {                      
                    return(
                        detail.day === id && (Number(detail.fromHour) <= item && Number(detail.toHour) >= item+1) ? 
                            <ProgramDetail
                                key={detail.course_code} 
                                detail={detail}
                                index={idx}
                                type="program_detail"
                                onDropPlayer={onDropPlayer}
                                ></ProgramDetail>  : null 
                        )}      
                    )                
                }            
            </td>   
        )
    }

    const addItemToSection = (itemCode) => {
        console.log("droped", itemCode);
    } 

    // Function that it appears the notification window after the control of unvalid input data 
    const notifyError = (message) => {
    toast.error(message, {
        position:  toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true, 
        theme: "colored",
        });
    }

    // Function that it appears the notification window when a new program item is been created to informate the user for the remain hours 
    const notifyHours = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true, 
            theme: "dark",
            });
        }

    // Function that it appears when we have submit the program for all the hours of a specific course
    const notifyHoursSuccess = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true, 
            theme: "dark",
            });
        }

    // Function that handles the selection of the submit button of the modal window 
    // in an updation mood and prepare the wanted updations
    const handleSuccessButton_update = () => { 
        
        // We implement the course's exam program updation by deleting initially all the old info 
        // of the selected to update course from the program and after that by creating from the
        // start a new program item, that it could has or not any updates

        // A. Call the DELETE function to remove the program item to update (for better data validation)
        handleDeleteButton('update');

        // B. After the substraction of the old data, we can continue with the storage of the new update 
        //    program item using the create function
        const result = handleSuccessButton_create();  
        if (result === false) {
            modalOpen.category = 'update';
            modalOpen.course = courseToUpdate.course_code + " " + courseToUpdate.course_name;
            modalOpen.day = courseToUpdate.day;
            modalOpen.fromHour = courseToUpdate.fromHour;
            modalOpen.toHour  = courseToUpdate.toHour;
            modalOpen.hall = courseToUpdate.hall;
            modalOpen.type = courseToUpdate.type;
            modalOpen.instructor = courseToUpdate.instructor;
            handleSuccessButton_create()
        }

        // After the creation and the storage of the new course's program, initialize again the state variables and objects
        setModalOpen({...modalOpen, state :'modal', category:'', course:'', day:"", fromHour:"", toHour:"", hall: "" , type:"", instructor: ""})

    }
 
    // Function that handles the click of Success button of Modal window in the creation mood and continue with the 
    // storage of program item in the total program
    const handleSuccessButton_create = () => {
        let isValid = true;    

        // Before continue with the program's item submit, check if all the fields are filled
        Object.values(modalOpen).map((item, x)=> { 
            if (item.trim().length === 0) { 
                isValid = false; 
            }
            return(isValid)
        })

        // Continue with the submit, only if all the fields are filled
        if (isValid) { 
            // Store the new program item in the array of corressponding program  
            let appearCourse = program.filter(storedCourse => storedCourse.course_code === modalOpen.course.split(" ")[0]);
            let appearChange = false;  
            let HoursRemainMessage = '';

            let courseData = courses.filter((course, ind) => course.StudyProgram.course_code === currCourse.StudyProgram.course_code)[0];
            
            // Check if all the hours of this course have been declared, if YES the user can't add a new hour, but only update the existed
            if (modalOpen.type === 'Διάλεξη') {
                if (courseData.InfoFromInstructor.theory_hours !== '' && courseData.InfoFromInstructor.theory_hours === 0) {
                    HoursRemainMessage = 'Ολες οι προβλεπόμενες ώρες διδασκαλίας του μαθήματος' + modalOpen.course + 'έχουν καταχωρηθεί στο πρόγραμμα και δεν μπορείτε να προσθέσετε επιπλέον ώρα διάλεξης!';
                    notifyError(HoursRemainMessage);
                    return (false)
                }
                else if (courseData.InfoFromInstructor.theory_hours === '' && courseData.StudyProgram.study_hours !== '' && courseData.StudyProgram.study_hours === 0) {
                    HoursRemainMessage = 'Ολες οι προβλεπόμενες ώρες διδασκαλίας του μαθήματος' + modalOpen.course + 'έχουν καταχωρηθεί στο πρόγραμμα και δεν μπορείτε να προσθέσετε επιπλέον ώρα διάλεξης!';
                    notifyError(HoursRemainMessage);
                    return (false)
                }                    
            }
            else if (modalOpen.type === 'Εργαστήριο') {  
                if (courseData.InfoFromInstructor.lab_hours !== '' && labHours.filter(item=> item.course_code === courseData.StudyProgram.course_code)[0].total_lab_hours === 0) {
                    HoursRemainMessage = 'Ολες οι προβλεπόμενες ώρες διδασκαλίας του μαθήματος' + modalOpen.course + 'έχουν καταχωρηθεί στο πρόγραμμα και δεν μπορείτε να προσθέσετε επιπλέον ώρα εργαστηρίου!';
                    notifyError(HoursRemainMessage);
                    return (false)
                }
            }    
            if (modalOpen.type === 'Εργαστήριο' && currCourse.InfoFromInstructor.lab_hours === '') {
                
                HoursRemainMessage = 'Δεν προβλέπονται ώρες εργαστηρίου για το μάθημα ' + modalOpen.course + '!';
                notifyError(HoursRemainMessage);
                // Set the modal window data to the initial empty values for the next insertion
                //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})  
                setProgramItem({...programItem, course_code:'', course_name:"", day:"", date:"", fromHour:"", toHour:"", Hall:"", type:"", instructor:""})                     
                return (false);            
            }  
            let isExist = false;
            program.forEach(elem => {
                if (isExist === false && (elem.course_code === modalOpen.course.split(" ")[0]) && elem.day === modalOpen.day &&(((Number(modalOpen.fromHour) >= Number(programItem.fromHour)) && (Number(modalOpen.fromHour) < Number(programItem.toHour))) || ((Number(modalOpen.toHour) <= Number(programItem.toHour)) && (Number(modalOpen.toHour) > Number(programItem.fromHour))))) {
                    notifyError('Το μάθημα διδάσκεται ήδη σε κάποια αίθουσα αυτή την ημέρα και κάποιες από αυτές τις ώρες!') ;
                    // Set the modal window data to the initial empty values for the next insertion
                    //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})  
                    setProgramItem({...programItem, course_code:'', course_name:"", day:"", date:"", fromHour:"", toHour:"", Hall:"", type:"", instructor:""})                     
                    isExist = true;
                    return (false)    ;            
                }
                if (isExist === true) {
                    return (false) ;
                }
            })

            if (isExist) {
                return (false) ;
            }

            // Check for the availiability of the course's selected instructor for this day and hour
            let isAvailiable = true;
            program.forEach(programItem => { 
                if (programItem.day === modalOpen.day && (((Number(modalOpen.fromHour) >= Number(programItem.fromHour)) && (Number(modalOpen.fromHour) < Number(programItem.toHour))) || ((Number(modalOpen.toHour) <= Number(programItem.toHour)) && (Number(modalOpen.toHour) > Number(programItem.fromHour)))) && modalOpen.instructor === programItem.instructor) {
                    notifyError('Ο διδάσκων του μαθήματος διδάσκει κάποιο άλλο μάθημα στο συγκεκριμένο χρονικό διάστημα!') ;
                    isAvailiable = false;
                    setProgramItem({...programItem, course_code:'', course_name:"", day:"", date:"", fromHour:"", toHour:"", Hall:"", type:"", instructor:""})                     
                    isAvailiable = false;
                    return (false) ;            
                }
                if (isAvailiable === false) {
                    return (false) ;
                }
            })
            if (isAvailiable === false) {
                return (false) ;
            }
                
            let TheoryHoursRemain = currCourse.InfoFromInstructor.theory_hours !== "" ? currCourse.InfoFromInstructor.theory_hours : currCourse.StudyProgram.study_hours;
            let LabHoursRemain = currCourse.InfoFromInstructor.lab_hours !== "" ? labHours.filter(item=> item.course_code === courseData.StudyProgram.course_code)[0].total_lab_hours : "";
            let duration = modalOpen.toHour - modalOpen.fromHour;

            if (appearChange === false ) { 
                let array = [];
                hallProgram.forEach(hallItem => {
                    if (modalOpen.hall.includes(hallItem.hall_code)) { 
                        array = hallItem.days_and_hours;
                    }
                }) 
                let exist = false;
                array.forEach(it => { 
                    console.log(Number(modalOpen.fromHour), 'from mathhma')
                    console.log(Number(it.fromHour), 'from mathhma')
                    if (exist === false && it.day === modalOpen.day && (((Number(modalOpen.fromHour) >= Number(it.fromHour)) && (Number(modalOpen.fromHour) < Number(it.toHour))) || ((Number(modalOpen.toHour) <= Number(it.toHour)) && (Number(modalOpen.toHour) > Number(it.fromHour)))) /*(((Number(modalOpen.fromHour) >= Number(programItem.fromHour)) && (Number(modalOpen.fromHour) < Number(programItem.toHour))) || ((Number(modalOpen.toHour) <= Number(programItem.toHour)) && (Number(modalOpen.toHour) > Number(programItem.fromHour)))) */) {
                        HoursRemainMessage = 'Η Αίθουσα με ονομασία "'+ modalOpen.hall + '" είναι κατειλημμένη το συγκεκριμένο χρονικό διάστημα. Παρακαλώ επιλέξτε είτε άλλη αίθουσα είτε άλλο χρονικό διάστημα για τη διδασκαλία του εν λόγω μαθήματος';
                        notifyError(HoursRemainMessage); 
                        // Set the modal window data to the initial empty values for the next insertion
                        //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})
                        // The hall is not available this day and these hours so don't store the program item
                        exist = true;  
                        return (false);                                                                          
                    } 
                }) 

                // Handle the case the hall is not available this day and these hours
                if (exist === true) {
                    return (false);
                }
            }
            
            // THEORY HOURS
            if (currCourse.InfoFromInstructor.theory_hours !== "" && modalOpen.type === 'Διάλεξη') {       
                TheoryHoursRemain = Number(currCourse.InfoFromInstructor.theory_hours) - Number(duration);  // remaining theory hours
                if (TheoryHoursRemain < 0) {
                    notifyError('Οι ώρες διάλεξης που προσθέσατε ξεπερνούν τις προβλεπόμενες. Παρακαλώ συμπληρώστε εκ νέου το πεδίο');                        
                    // Set the modal window data to the initial empty values for the next insertion
                    //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})
                    return (false) ;
                }                    
                courseData.InfoFromInstructor.theory_hours = (TheoryHoursRemain).toString();
                courseData.StudyProgram.study_hours = (Number(courseData.StudyProgram.study_hours) - Number(duration)).toString();
                
            }
            // STUDY HOURS
            else if (currCourse.StudyProgram.study_hours !== "" && modalOpen.type === 'Διάλεξη') {  
                TheoryHoursRemain = Number(currCourse.StudyProgram.study_hours) - Number(duration);     // remaining study hours
                if (TheoryHoursRemain < 0) {
                    notifyError('Οι ώρες διάλεξης που προσθέσατε ξεπερνούν τις προβλεπόμενες. Παρακαλώ συμπληρώστε εκ νέου το πεδίο');                        
                    // Set the modal window data to the initial empty values for the next insertion
                    //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})
                    return (false);
                }
                courseData.StudyProgram.study_hours = TheoryHoursRemain;
            }
            // LAB HOURS
            if (currCourse.InfoFromInstructor.lab_hours !== "" && modalOpen.type === 'Εργαστήριο') {                    
                LabHoursRemain = Number(labHours.filter(item=> item.course_code === courseData.StudyProgram.course_code)[0].total_lab_hours) - Number(duration);    // remaining lab hours                    
                if (LabHoursRemain < 0) {
                    notifyError('Οι ώρες εργαστηρίου που προσθέσατε ξεπερνούν τις προβλεπόμενες. Παρακαλώ συμπληρώστε εκ νέου το πεδίο');                        
                    // Set the modal window data to the initial empty values for the next insertion
                    //setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})
                    return (false);
                }
                labHours.filter(item=> item.course_code === courseData.StudyProgram.course_code)[0].total_lab_hours = LabHoursRemain; 
                courseData.StudyProgram.study_hours = (Number(courseData.StudyProgram.study_hours) - Number(duration)).toString(); 
                
            }

            // Check for consecutive hours of program items (same day and hall) 
            if (appearCourse.length !== 0) { 
                appearCourse.forEach(appear => {
                    if (appear.day === modalOpen.day.split(' ')[0]) {
                        if (appear.fromHour === modalOpen.toHour && modalOpen.hall === appear.Hall) {
                            appear.fromHour = modalOpen.fromHour;
                            appearChange = true;
                        }
                        else if (appear.toHour === modalOpen.fromHour && modalOpen.hall === appear.Hall) {
                            appear.toHour = modalOpen.toHour;
                            appearChange = true;
                        }
                    }                    
                })
                hallProgram.forEach(hall=> {
                    if (modalOpen.hall.includes(hall.hall_code)) {                            
                        hall.days_and_hours.forEach(item => {
                            if (item.course_code === modalOpen.course.split(" ")[0] && item.day === modalOpen.day.split(" ")[0] && item.fromHour === modalOpen.toHour ) {
                                item.fromHour = modalOpen.fromHour;
                            }
                            else if  (item.course_code === modalOpen.course.split(" ")[0] && item.day === modalOpen.day.split(" ")[0] && item.toHour === modalOpen.fromHour ) {
                                item.toHour = modalOpen.toHour;
                            }
                        }) 
                    }
                }) 
            }
            if (appearChange === false) {                     
                // Before we checked for the availability of the selected hall for this day and these hours, if all are OK we can continue to update the program with the new item
                hallProgram.forEach(hall=> {
                    if (modalOpen.hall.includes(hall.hall_code)) {
                        let exist = false;
                        hall.days_and_hours.forEach(item => {
                            if (item.course_code === modalOpen.course.split(" ")[0] && item.day === modalOpen.day.split(" ")[0] && item.fromHour === modalOpen.fromHour && item.toHour === modalOpen.toHour) {
                                exist = true;
                            }
                        })
                        if (!exist) {
                            hall.days_and_hours.push({course_code : modalOpen.course.split(" ")[0] , day : modalOpen.day.split(" ")[0] , fromHour : modalOpen.fromHour, toHour : modalOpen.toHour})
                        }
                    }
                }) 
                // After all, we insert the new program item for a specific course in the program array
                setProgram([...program, {course_code: modalOpen.course.split(" ")[0], 
                    course_name: modalOpen.course.substring(modalOpen.course.indexOf(" ")+1, modalOpen.course.length),
                    day : modalOpen.day.split(" ")[0],
                    date : modalOpen.day.split(" ")[1],
                    fromHour : modalOpen.fromHour,
                    toHour : modalOpen.toHour,
                    Hall : modalOpen.hall,
                    type : modalOpen.type, 
                    instructor : modalOpen.instructor}])                   
            }                
            HoursRemainMessage = LabHoursRemain !== "" ? 'Παραμένουν ακόμη ' + TheoryHoursRemain + ' ωρες Διαλέξεων και ' + LabHoursRemain + ' εργαστηρίου να διευθετήσετε για το μάθημα ' + modalOpen.course :
                                        'Παραμένουν ακόμη ' + TheoryHoursRemain + ' ωρες Διαλέξεων να διευθετήσετε για το μάθημα ' + modalOpen.course ;

            // Set the modal window data to the initial empty values for the next insertion
            setModalOpen({...modalOpen, state: 'modal', category:'', course : '', day : '', fromHour : '', toHour : '', hall : '', type : '', instructor : ""})
        
            // If all the study, theory or lab hours for this course have been setted in the program, we print the suitable message and we set the course in the array of completed courses
            if ((Number(TheoryHoursRemain) === 0 & Number(LabHoursRemain) === 0) || (Number(TheoryHoursRemain) === 0 & LabHoursRemain === "")) {
                // Set the course to the array of completed courses
                setCompletedProgramCourses([...completedProgramCourses, courseData]);
                
                // Print the suitable Success Message 
                HoursRemainMessage = 'Όλες οι προβλεπόμενες ώρες διδασκαλίας του μαθήματος ' + modalOpen.course + ' έχουν ρυθμιστεί στο πρόγραμμα !'
                if (modalOpen.category === 'create') {
                    notifyHoursSuccess(HoursRemainMessage);
                }
                return (true);
            }
            else {
                if (modalOpen.category === 'create') {
                    notifyHours(HoursRemainMessage);
                }
                return(true);
            }                           
        }
        else if (!isValid) {
            notifyError('Τα στοιχεία εισαγωγής δεν είναι έγκυρα!');
            return (false);
        }        
    }     

    // Function that handles the selection of the delete button
    const handleDeleteButton = (typeOfExecute) => {        
        // Prepare the deletion of the specific program item 
        // (For the deletion, we will use the object named as 'courseToUpdate' because the modalOpen object must be have accepted changes)
        
        // *** REMOVE FROM THE HALL PROGRAM          
        let removedItem = {course_code : courseToUpdate.course_code, course_name : courseToUpdate.course_name, date: courseToUpdate.date, day : courseToUpdate.day,
                           fromHour : courseToUpdate.fromHour, toHour : courseToUpdate.toHour, hall : courseToUpdate.hall, type : courseToUpdate.type, instructor : courseToUpdate.instructor}
    
 
        let currHall = hallProgram.filter(hallInfo => courseToUpdate.hall.includes(hallInfo.hall_code))[0].days_and_hours;          
        let hallCodeProcess = hallProgram.filter(hallIn => courseToUpdate.hall.includes(hallIn.hall_code))[0].hall_code;
        let hallCodeIndex = hallProgram.findIndex(hallData => courseToUpdate.hall.includes(hallData.hall_code));
        let newHallDaysAndHours = []; let hallIndex = -1 ;    
        currHall.forEach((hallItem, idx) => { 
            if (hallItem.course_code === courseToUpdate.course_code && hallItem.day === courseToUpdate.day && Number(hallItem.fromHour) === Number(courseToUpdate.fromHour) && Number(hallItem.toHour) === Number(courseToUpdate.toHour)) {
                hallIndex = idx; 
            }
        }) 
        if (hallIndex > -1 && hallIndex === 0) {
            newHallDaysAndHours = [
                ...currHall.slice(hallIndex + 1)
            ] 
            currHall = newHallDaysAndHours;    
            if (hallCodeIndex === 0) {
                let newHallProgram = [
                    {hall_code : hallCodeProcess, days_and_hours : currHall},
                    ...hallProgram.slice(hallCodeIndex + 1)
                ]
                setHallProgram(newHallProgram); 
                hallProgram = newHallProgram;
            } 
            else if (hallCodeIndex > 0) {
                let newHallProgram = [
                    ...hallProgram.slice( 0 , hallCodeIndex),
                    {hall_code : hallCodeProcess, days_and_hours : currHall},
                    ...hallProgram.slice(hallCodeIndex + 1)
                ]
                setHallProgram(newHallProgram); 
                hallProgram = newHallProgram;
            }            
        }
        else if (hallIndex > 0) {
            newHallDaysAndHours = [
                ...currHall.slice(0, hallIndex),
                ...currHall.slice(hallIndex + 1)
            ]             
            currHall = newHallDaysAndHours;  
            if (hallCodeIndex === 0) {
                let newHallProgram = [
                    {hall_code : hallCodeProcess, days_and_hours : currHall},
                    ...hallProgram.slice(hallCodeIndex + 1)
                ]
                setHallProgram(newHallProgram); 
                hallProgram = newHallProgram;
            } 
            else if (hallCodeIndex > 0) {
                let newHallProgram = [
                    ...hallProgram.slice( 0 , hallCodeIndex),
                    {hall_code : hallCodeProcess, days_and_hours : currHall},
                    ...hallProgram.slice(hallCodeIndex + 1)
                ]
                setHallProgram(newHallProgram); 
                hallProgram = newHallProgram;
            }            
        } 

        // *** REMOVE FROM THE COMPLETED COURSES
        let completedIndex = -1;
        completedProgramCourses.forEach((completed, complIndex) => { 
            if (completed.StudyProgram.course_code === removedItem.course_code && completed.StudyProgram.course_name === removedItem.course_name ) {
                completedIndex = complIndex;        
            }
        })

        // Update the array of courses with complete program
        let newCompletedProgram = [];
        if (completedIndex !== -1) {
            newCompletedProgram = [
                ...completedProgramCourses.slice(0, completedIndex),             
                ...completedProgramCourses.slice(completedIndex + 1)
            ] 
        }      
        if (typeOfExecute === 'delete' && completedIndex !== -1) {
            setCompletedProgramCourses(newCompletedProgram)
        }
        else if (completedIndex !== -1) {
            setCompletedProgramCourses(newCompletedProgram) 
        }

        // *** UPDATE THE HOURS (LAB - THEORY - STUDYING) OF THE COURSE
        let timeDuration = removedItem.toHour  - removedItem.fromHour; 
    
        let courseInfo = courses.filter(courseItem => courseItem.StudyProgram.course_code === removedItem.course_code )[0];
 
        if (removedItem.type === 'Διάλεξη') {
            if (courseInfo.InfoFromInstructor.theory_hours !== "") {
                courseInfo.InfoFromInstructor.theory_hours = (Number(courseInfo.InfoFromInstructor.theory_hours) + Number(timeDuration)).toString();
                courseInfo.StudyProgram.study_hours = (Number(courseInfo.StudyProgram.study_hours) + Number(timeDuration)).toString();
            }
            else if (courseInfo.InfoFromInstructor.theory_hours === '') {
                courseInfo.StudyProgram.study_hours =( Number(courseInfo.StudyProgram.study_hours) + Number(timeDuration)).toString();
            }
        }
        else if (removedItem.type === 'Εργαστήριο') {
            if (courseInfo.InfoFromInstructor.lab_hours !== "") {
                const labItem_index = labHours.findIndex((item) => item.course_code === removedItem.course_code);
                if (courseInfo.InfoFromInstructor.lab_hours !== '') {
                    labHours[labItem_index].total_lab_hours = Number(labHours[labItem_index].total_lab_hours) + Number(timeDuration);
                    courseInfo.StudyProgram.study_hours = (Number(courseInfo.StudyProgram.study_hours) + Number(timeDuration)).toString();
                }
                else if (courseInfo.InfoFromInstructor.lab_hours === '') {
                    courseInfo.StudyProgram.study_hours = (Number(courseInfo.StudyProgram.study_hours) + Number(timeDuration)).toString();
                }
            }                
        } 

        // *** REMOVE FROM PROGRAM
        let programIndex = -1;
        program.forEach((programItem, proIndex) => { 
            if (programItem.course_code === removedItem.course_code && programItem.course_name === removedItem.course_name && programItem.day === removedItem.day && programItem.type === removedItem.type && programItem.Hall === removedItem.hall && Number(programItem.fromHour) === Number(removedItem.fromHour) && Number(programItem.toHour) === Number(removedItem.toHour) && programItem.instructor === removedItem.instructor) {
                programIndex = proIndex;            
            }
        })
        
        // Update the program
        let newProgram = [];
        if (programIndex !== -1) {
            newProgram = [
                ...program.slice(0, programIndex),             
                ...program.slice(programIndex + 1)
            ]
        }
        if (typeOfExecute === 'delete' && programIndex !== -1) {
            setProgram(newProgram);
        }
        else if ( programIndex !== -1){
            program = newProgram;   
        }        

        if (typeOfExecute === 'delete') {
            // After the program item's deletion, we are setting and initializing again the modalOpen variable and close the modal window
            setModalOpen({...modalOpen, state: 'modal', category: '', course: '', day: '', fromHour: '', toHour: '', hall: "", type: '', instructor: ""})
        }
    } 

    // Function that prepares the suitable object that will give it to the corressponding database's query to insert 
    // the initial or the final program in the database
    const prepareStore = (stateOfProgram) => {
        // Setting and initializing the program's object
        let programObject = {
            program_category : '',
            program_study_level : '',
            program_period : '', 
            program_academic_year : '', 
            program_state : '',
            main_program : null
        };

        // Determine the program period
        let period = '';
        if (currAcademicSemester === 'Χειμερινό Εξάμηνο') {
            period = 'Χειμερινή';
        }
        else if (currAcademicSemester === 'Εαρινό Εξάμηνο') {
            period = 'Εαρινή';
        }
       
        // Create correctly the fields from the program's container 
        let newProgram = [];
        program.forEach((programItem, index) => {   
            let object = undefined;         
            if (index > 0) {
                object = 
                {
                    course_code : programItem.course_code,
                    course_name : programItem.course_name, 
                    date : programItem.date,
                    day : programItem.day,
                    Hall : [{value : halls.filter(hallItem => programItem.Hall.includes(hallItem.Hall_code))[0].Hall_code, label: programItem.Hall}],
                    type : programItem.type,
                    fromHour : programItem.fromHour, 
                    toHour : programItem.toHour,
                    instructor : [{value : programItem.instructor, label : programItem.instructor}]
                }
            }
            if (object !== undefined) {
                newProgram.push(object);
            }            
        })
        // Fill the program's object with the suitable information from the user selections
        programObject = {
            program_category : 'ΩΡΟΛΟΓΙΟ',
            program_study_level : studyLevelProgram,
            program_period : period,
            program_academic_year : currAcademicYear, 
            program_state : stateOfProgram, 
            main_program : newProgram
        };

        //console.log(programObject).
        programResolvers.create_new_program(programObject)
            .then(res=> {
                console.log(res);                
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }
    
    // Print in the console the program every time that a change is been realised
    useEffect(() => {
        console.log(program, 'PROGRAM')
    }, [program])
    
    return(           
        <div className="program_container">          
            <div className="scroll"> 
                <div className="selection_text">Επιλέξτε το είδος του Προγράμματος που επιθυμείτε να δημιουργήσετε:
                    <div className="choices">
                        <div className="first_row"> 
                            <div className="choice"> 
                                <label>ΩΡΟΛΟΓΙΟ ΠΠΣ</label> 
                                <input type='radio' name='type_of_program' value='ΩΡΟΛΟΓΙΟ ΠΠΣ' checked = {typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ'}                                    
                                    onChange={(e)=> selectTypeOfProgram('ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ', 'ΠΡΟΠΤΥΧΙΑΚΟ')}
                                ></input>
                            </div>
                            <div className="choice"> 
                                <label>ΩΡΟΛΟΓΙΟ ΠΜΣ</label>
                                <input type="radio"  name='type_of_program' value='ΩΡΟΛΟΓΙΟ ΠΜΣ'
                                    onClick={()=> selectTypeOfProgram('ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ', 'ΜΕΤΑΠΤΥΧΙΑΚΟ')}
                                ></input>                           
                            </div> 
                            <div className="choice">
                                <label>ΕΞΕΤΑΣΤΙΚΗΣ ΠΠΣ</label>
                                <input type="radio" name='type_of_program' value='ΕΞΕΤΑΣΤΙΚΗΣ ΠΠΣ'
                                    onClick={()=> selectTypeOfProgram('ΠΡΟΓΡΑΜΜΑ ΕΞΕΤΑΣΤΙΚΗΣ', 'ΠΡΟΠΤΥΧΙΑΚΟ')}
                                ></input>                         
                            </div>
                        </div>
                        <div className="second_row">
                        <div className="choice">
                                <label>ΕΞΕΤΑΣΤΙΚΗΣ ΠΜΣ</label>
                                <input type="radio" name='type_of_program' value='ΕΞΕΤΑΣΤΙΚΗΣ ΠΜΣ'
                                    onClick={()=> selectTypeOfProgram('ΠΡΟΓΡΑΜΜΑ ΕΞΕΤΑΣΤΙΚΗΣ', 'ΜΕΤΑΠΤΥΧΙΑΚΟ')}
                                ></input>                         
                            </div>
                            <div className="choice">
                                <label>ΕΜΒΟΛΙΜΗΣ ΕΞΕΤΑΣΤΙΚΗΣ</label>
                                <input type="radio" name='type_of_program' value='ΕΜΒΟΛΙΜΗΣ ΕΞΕΤΑΣΤΙΚΗΣ'
                                    onClick={()=> selectTypeOfProgram('ΠΡΟΓΡΑΜΜΑ ΕΜΒΟΛΙΜΗΣ ΕΞΕΤΑΣΤΙΚΗΣ', 'ΕΜΒΟΛΙΜΗ')}
                                ></input>                         
                            </div>
                            <div className="choice">
                                <label>ΕΞΕΤΑΣΤΙΚΗΣ ΜΑΘΗΜΑΤΩΝ ΙΣΟΤΙΜΙΑΣ</label>
                                <input type="radio" name='type_of_program' value='ΕΞΕΤΑΣΤΙΚΗΣ ΜΑΘΗΜΑΤΩΝ ΙΣΟΤΙΜΙΑΣ'
                                    onClick={()=> selectTypeOfProgram('ΠΡΟΓΡΑΜΜΑ ΕΞΕΤΑΣΤΙΚΗΣ ΜΑΘΗΜΑΤΩΝ ΙΣΟΤΙΜΙΑΣ', 'ΠΡΟΠΤΥΧΙΑΚΟ')}
                                ></input>                         
                            </div> 
                        </div>
                    </div>
                </div>
               
                {(typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ') || (typeOfProgram === 'ΩΡΟΛΟΓΙΟ ΠΡΟΓΡΑΜΜΑ' && studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' ) || (typeOfProgram === 'ΠΡΟΓΡΑΜΜΑ ΕΞΕΤΑΣΤΙΚΗΣ ΜΑΘΗΜΑΤΩΝ ΙΣΟΤΙΜΙΑΣ' && studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ') ?
                (studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' ?  (courses.length === 0 || firstYearCourses.length === 0 ) : postgraduateFields.length === 0) ? 
                <Loader/> :
                <div className="program_creator">
                            <div className="weekly_program_area">
                                <div className="program_header">
                                    <img src={LOGO} alt="" className="uth_logo"></img>
                                    <div className="program_title">{typeOfProgram}</div>
                                    <div className="header_info">
                                        <div className="academic_year">Ακαδημαϊκό Έτος 
                                            <select value = {currAcademicYear} onChange={(e) => currAcademicYear = e.target.value}>
                                                {acadYears.map(item => {
                                                    return (
                                                        <option key={item} value={item}>{item}</option>
                                                    )
                                                })}                                    
                                            </select>
                                        <br></br>
                                        <select value={currAcademicSemester}  onChange={(e) => currAcademicSemester = e.target.value}>
                                            <option value='Χειμερινό Εξάμηνο'>Χειμερινό Εξάμηνο</option>
                                            <option value='Εαρινό Εξάμηνο'>Εαρινό Εξάμηνο</option>
                                        </select>
                                        </div>
                                        <div className="studies">{studyLevelProgram}</div>                             
                                    </div>                        
                                </div> 
                                <div className="agenda_container">
                                        <div className="agenda_week">
                                            <table className="program_agenda">
                                                <thead>
                                                    <tr className="head_row">                                            
                                                        <th className="empty_cell"></th>
                                                        <th className="day_header"><span>Δευτέρα</span></th>
                                                        <th className="day_header"><span>Τρίτη</span></th>
                                                        <th className="day_header"><span>Τετάρτη</span></th>
                                                        <th className="day_header"><span>Πέμπτη</span></th>
                                                        <th className="day_header"><span>Παρασκευή</span></th>                                                         
                                                        <th className="day_header"><span>Σάββατο</span></th>                                                         
                                                        <th className="day_header"><span>Κυριακή</span></th>                                                         
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="agenda_content">
                                                            <div className="unselectable">όλη μέρα</div>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                        <td className="agenda_content">
                                                            <div className="selectable"/>                                                 
                                                        </td>
                                                    </tr>     
                                                    <tr className="divider">
                                                        <td colSpan={8}></td>
                                                    </tr>    
                                                    {Array.from(range(8,21,1), (item,x)=> {
                                                            return(  
                                                            <tr className="time_grid" key={x}>  
                                                                <td className="time_area_hour"><div className="fromHour">{item + ':00' }</div><div className="text"> έως</div><div className="toHour">{item+1 + ':00'}</div></td>
                                                                {/* ΔΕΥΤΕΡΑ */}
                                                                {program.length !== 0 ?                                                              
                                                                    <TimeArea    
                                                                        key='Δευτέρα'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Δευτέρα'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>                                                                 
                                                                    : null
                                                                }
                                                                {/* ΤΡΙΤΗ */}
                                                                {program.length !== 0 ? 
                                                                <TimeArea  
                                                                        key='Τρίτη'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Τρίτη'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>  
                                                                    : null
                                                                }
                                                                {/* ΤΕΤΑΡΤΗ */}
                                                                {program.length !== 0 ? 
                                                                    <TimeArea  
                                                                        key='Τετάρτη'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Τετάρτη'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>  
                                                                    : null
                                                                }
                                                                {/* ΠΕΜΠΤΗ */}
                                                                {program.length !== 0 ? 
                                                                    <TimeArea  
                                                                        key='Πέμπτη'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Πέμπτη'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>   
                                                                    : null
                                                                } 
                                                                {/* ΠΑΡΑΣΚΕΥΗ */}
                                                                {program.length !== 0 ? 
                                                                    <TimeArea  
                                                                        key='Παρασκευή'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Παρασκευή'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>  
                                                                    : null
                                                                } 
                                                                {/* ΣΑΒΒΑΤΟ */}
                                                                {program.length !== 0 ? 
                                                                    <TimeArea 
                                                                        key='Σάββατο' 
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Σάββατο'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>  
                                                                    : null
                                                                }
                                                                {/* ΚΥΡΙΑΚΗ */}
                                                                {program.length !== 0 ? 
                                                                    <TimeArea  
                                                                        key='Κυριακή'
                                                                        program = {program}
                                                                        item={item}  
                                                                        id='Κυριακή'
                                                                        index= {x}                                                                               
                                                                        onDropPlayer = {movePlayer}
                                                                    ></TimeArea>  
                                                                    : null
                                                                }
                                                            </tr> 
                                                            )}
                                                    )}                  
                                                </tbody>                                    
                                            </table>
                                        </div>
                                    </div>
                                <table className="program_main"></table>
                            </div>
                            <div className="selection_area">
                                <div className="preparation">
                                    <div className="create_new">
                                        <button className="create_new_button" onClick={() => {setModalOpen({...modalOpen, state:'modal show',category:'create', course: "", day:'', fromHour:"", toHour:"", hall:'', type:"", instructor:""})}}>
                                            Δημιουργία Προγράμματος
                                        </button>
                                    </div>
                                    {studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' ?
                                        <div className="text">Μαθήματα <p>ΠΠΣ</p> ανά έτος</div> :
                                        <div className="text">Μαθήματα <p>ΠΜΣ</p> ανά έτος</div> }
                                    <div className="courses">
                                        {studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' ?
                                        <ul>
                                            <li id='List_1'>
                                                <div className="li_item" onClick={()=>{ handleClick('List_1')}}>
                                                    <div className="li_text">1ο Έτος</div>
                                                    <IoIosArrowDropdownCircle className="li_icon"/>
                                                    <IoIosArrowDropupCircle className="li_icon2"/>
                                                </div>                                          
                                                    <div className='sub_menu'>
                                                        {firstYearCourses.map((item,x) => {                                   
                                                            return (                                                        
                                                                <div key={x}> 
                                                                {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?
                                                                    <SubMenuItem 
                                                                        {...item}
                                                                        item={item}
                                                                        keyProp={x} 
                                                                        className="submenu_item" 
                                                                        divType = 'submenu_item'
                                                                        index= {x}
                                                                        multiple = {1}
                                                                        onDropPlayer = {movePlayer}
                                                                    ></SubMenuItem> 
                                                                    : 
                                                                    <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                            <SubMenuItem                                                                                                                                                                    
                                                                                {...item}
                                                                                item={item}
                                                                                keyProp={x} 
                                                                                className="submenu_item" 
                                                                                divType = 'submenu_item'
                                                                                index= {x}
                                                                                multiple = {1}
                                                                                onDropPlayer = {movePlayer}
                                                                            ></SubMenuItem> 
                                                                        </div>
                                                                    </div>
                                                                }
                                                                </div> 
                                                            )
                                                            })}
                                                    </div>                 
                                            </li>
                                            <li id='List_2'>
                                                <div className="li_item" onClick={()=>{ handleClick('List_2')}}>
                                                    <div className="li_text">2ο Έτος</div>
                                                    <IoIosArrowDropdownCircle className="li_icon"/>
                                                    <IoIosArrowDropupCircle className="li_icon2"/>
                                                </div>                                
                                                <div className='sub_menu'>
                                                    {secondYearCourses.map((item,x) => {                                        
                                                        return (
                                                            <div key={x}>           
                                                            {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?                                             
                                                                <SubMenuItem 
                                                                        item={item}
                                                                        keyProp={x} 
                                                                        className="submenu_item" 
                                                                        divType = 'submenu_item'
                                                                        index= {x}
                                                                        multiple = {2}
                                                                        onDropPlayer = {movePlayer}
                                                                    ></SubMenuItem>
                                                                    : 
                                                                    <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                        <SubMenuItem                                                                                                                                                                    
                                                                            {...item}
                                                                            item={item}
                                                                            keyProp={x} 
                                                                            className="submenu_item" 
                                                                            divType = 'submenu_item'
                                                                            index= {x}
                                                                            multiple = {2}
                                                                            onDropPlayer = {movePlayer}
                                                                        ></SubMenuItem> 
                                                                    </div>
                                                                </div>
                                                            }
                                                            </div> 
                                                        )
                                                    })} 
                                                </div>  
                                            </li>
                                            <li id='List_3' onClick={()=> handleClick('List_3')}>
                                                <div className="li_item">
                                                    <div className="li_text">3ο Έτος</div>
                                                    <IoIosArrowDropdownCircle className="li_icon"/>
                                                    <IoIosArrowDropupCircle className="li_icon2"/>
                                                </div>                                
                                                <div className="sub_menu">
                                                    {thirdYearCourses.map((item,x) => {                                        
                                                        return (                                                  
                                                            <div key={x}>                                                        
                                                                {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?                                             
                                                                <SubMenuItem 
                                                                        item={item}
                                                                        keyProp={x} 
                                                                        className="submenu_item" 
                                                                        divType = 'submenu_item'
                                                                        index= {x}
                                                                        multiple = {3}
                                                                        onDropPlayer = {movePlayer}
                                                                    ></SubMenuItem>
                                                                    : 
                                                                    <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                        <SubMenuItem                                                                                                                                                                    
                                                                            {...item}
                                                                            item={item}
                                                                            keyProp={x} 
                                                                            className="submenu_item" 
                                                                            divType = 'submenu_item'
                                                                            index= {x}
                                                                            multiple = {3}
                                                                            onDropPlayer = {movePlayer}
                                                                        ></SubMenuItem> 
                                                                    </div>
                                                                </div>
                                                            }
                                                            </div> 
                                                        )
                                                    })} 
                                                </div>  
                                            </li>
                                            <li id='List_4' onClick={()=> handleClick('List_4')}>
                                                <div className="li_item">
                                                    <div className="li_text">4ο Έτος</div>
                                                    <IoIosArrowDropdownCircle className="li_icon"/>
                                                    <IoIosArrowDropupCircle className="li_icon2"/>
                                                </div>                                
                                                <div className="sub_menu">
                                                    {fourthYearCourses.map((item,x) => {                                        
                                                        return (
                                                            <div key={x}>                                                        
                                                                {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?                                             
                                                                <SubMenuItem 
                                                                        item={item}
                                                                        keyProp={x} 
                                                                        className="submenu_item" 
                                                                        divType = 'submenu_item'
                                                                        index= {x}
                                                                        multiple = {4}
                                                                        onDropPlayer = {movePlayer}
                                                                    ></SubMenuItem>
                                                                    : 
                                                                    <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                        <SubMenuItem                                                                                                                                                                    
                                                                            {...item}
                                                                            item={item}
                                                                            keyProp={x} 
                                                                            className="submenu_item" 
                                                                            divType = 'submenu_item'
                                                                            index= {x}
                                                                            multiple = {4}
                                                                            onDropPlayer = {movePlayer}
                                                                        ></SubMenuItem> 
                                                                    </div>
                                                                </div>
                                                            }
                                                            </div> 
                                                        )
                                                    })} 
                                                </div> 
                                            </li>
                                            <li id='List_5' onClick={()=> handleClick('List_5')}>
                                                <div className="li_item">
                                                    <div className="li_text">5ο Έτος</div>
                                                    <IoIosArrowDropdownCircle className="li_icon"/>
                                                    <IoIosArrowDropupCircle className="li_icon2"/>
                                                </div>                                
                                                <div className="sub_menu">
                                                    {fifthYearCourses.map((item,x) => {                                        
                                                        return ( 
                                                            <div key={x}>                                                        
                                                                {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?                                             
                                                                <SubMenuItem 
                                                                        item={item}
                                                                        keyProp={x} 
                                                                        className="submenu_item" 
                                                                        divType = 'submenu_item'
                                                                        index= {x}
                                                                        multiple = {5}
                                                                        onDropPlayer = {movePlayer}
                                                                    ></SubMenuItem>
                                                                    : 
                                                                    <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                        <SubMenuItem                                                                                                                                                                    
                                                                            {...item}
                                                                            item={item}
                                                                            keyProp={x} 
                                                                            className="submenu_item" 
                                                                            divType = 'submenu_item'
                                                                            index= {x}
                                                                            multiple = {5}
                                                                            onDropPlayer = {movePlayer}
                                                                        ></SubMenuItem> 
                                                                    </div>
                                                                </div>
                                                            }
                                                            </div> 
                                                        )
                                                    })} 
                                                </div> 
                                            </li>
                                        </ul> : 
                                        <ul>
                                            {postgraduateFields.map((field, index) => {
                                                return (                                                
                                                    <li id={"List_" + index } key={index} onClick={()=> handleClick("List_" + index)}>
                                                        <div className="li_item">
                                                            <div className="li_text">{field._id}</div>
                                                            <IoIosArrowDropdownCircle className="li_icon"/>
                                                            <IoIosArrowDropupCircle className="li_icon2"/>
                                                        </div>
                                                        <div className="sub_menu">
                                                            {field.courses.map((item,x) => {                                                                                                 
                                                                return ( 
                                                                    <div key={x}>                                                        
                                                                        {completedProgramCourses.filter(completed => completed.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ?                                             
                                                                        <SubMenuItem 
                                                                                {...item}
                                                                                item={item}
                                                                                keyProp={x} 
                                                                                className="submenu_item" 
                                                                                divType = 'submenu_item'
                                                                                index= {x}
                                                                                onDropPlayer = {movePlayer}
                                                                            ></SubMenuItem>
                                                                            : 
                                                                            <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                            <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                            <div style={{opacity : '0.65', flex:'3'}}>
                                                                                <SubMenuItem                                                                                                                                                                    
                                                                                    {...item}
                                                                                    item={item}
                                                                                    keyProp={x} 
                                                                                    className="submenu_item" 
                                                                                    divType = 'submenu_item'
                                                                                    index= {x}
                                                                                    onDropPlayer = {movePlayer}
                                                                                ></SubMenuItem> 
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    </div> 
                                                                )
                                                            })} 
                                                        </div>                                                        
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        }
                                    </div>
                                </div>
                                <div className="StoreButtons">
                                    {program.length > 1 ?
                                    <>
                                    <div className="btn StoreForNowButton" onClick={() => prepareStore('ΠΡΟΣΩΡΙΝΟ')}>Προσωρινή Αποθήκευση</div>
                                    <div className="btn StoreForAlways" onClick={() => prepareStore('ΟΡΙΣΤΙΚΟ')}>Δημιουργία</div> </>: null}
                                    {program.length === courses.length ? 
                                    <div className="btn StoreForAlways" onClick={() => prepareStore('ΟΡΙΣΤΙΚΟ')}>Δημιουργία</div> : null }
                                </div>
                            </div>
                        

                    <div className={modalOpen.state} aria-hidden='true' >
                        <div className="modal_dialog">
                            <div className="modal_content">
                                <form className="program_form">
                                    <div className="modal_header">            
                                        <h5 className="modal_title">{modalOpen.category === 'update' ? 'Ανανέωση Προγράμματος' : 'Δημιουργία Προγράμματος'}</h5>
                                        <div className="close_button" onClick={() => setModalOpen({...modalOpen, state:'modal', category:''})}><IoClose className="icon"/></div>                                
                                    </div>
                                    <div className="modal_body">
                                        <div className="modal_row">
                                            <div className="column">
                                                <div className="form_label"><GiWhiteBook className="react_icon"/>Μάθημα</div>                                             
                                                <select className="form_control" required value={modalOpen.course} onChange={(e)=>{setProgramItem({...programItem, course_code:e.target.value.substring(0, e.target.value.indexOf(" ")), course_name: e.target.value.substring(e.target.value.indexOf(" ") + 1, e.target.value.length)}) ; setModalOpen({...modalOpen, course:e.target.value})}}>
                                                    <option style={{display : 'none'}}></option> 
                                                    {courses.map((item , x)=> {  
                                                        return (                                                        
                                                            <option key = {x} value = {item?.StudyProgram?.course_code + " " + item?.StudyProgram?.course_name}
                                                                    style={{display : completedProgramCourses.filter(compCourse => compCourse.StudyProgram.course_code === item.StudyProgram.course_code).length === 0 ? 'flex' : 'none'}}>{item?.StudyProgram?.course_code + "  " + item?.StudyProgram?.course_name}</option>
                                                        )                                                    
                                                    })} 
                                                </select>  
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε ένα έγκυρο Μάθημα</div>
                                            </div>

                                            <div className="column">
                                                <div className="form_label"><IoCalendar className="react_icon"/>Ημέρα</div>                                             
                                                <select className="form_control" required value={modalOpen.day} onChange={(e)=>{setProgramItem({...programItem, day:e.target.value}) ; setModalOpen({...modalOpen, day:e.target.value})}}>
                                                    <option style={{display:'none'}}></option>
                                                    <option>Δευτέρα</option>
                                                    <option>Τρίτη</option>
                                                    <option>Τετάρτη</option>
                                                    <option>Πέμπτη</option>
                                                    <option>Παρασκευή</option>
                                                    <option>Σάββατο</option>
                                                    <option>Κυριακή</option>
                                                </select>  
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Ημέρα</div>
                                            </div>             

                                            <div className="column">
                                                <div className="form_label"><BsClockFill className="react_icon"/>Ώρα</div>                                             
                                                <div className="inside_row">
                                                    Από <select className="form_control" required value={modalOpen.fromHour} onChange={(e)=>{setProgramItem({...programItem, fromHour:e.target.value}) ; setModalOpen({...modalOpen, fromHour:e.target.value})}}>
                                                        <option style={{display:'none'}}></option>
                                                        {Array.from(range(8,21,1), (item,x)=> {
                                                            return(
                                                            <option key={x} value={item}>{item + ':00'}</option>
                                                            )
                                                        })}
                                                        </select> έως 
                                                    <select className="form_control" required value={modalOpen.toHour} onChange={(e)=>{setProgramItem({...programItem, toHour:e.target.value}) ; setModalOpen({...modalOpen, toHour:e.target.value})}}>
                                                        <option style={{display:'none'}}></option>
                                                        {Array.from(range(8,22,1), (item,x)=> {
                                                            return(
                                                                modalOpen.fromHour !== ""  ?
                                                                item > modalOpen.fromHour ?
                                                                    <option key={x} value={item}>{item + ':00'}</option> : null :
                                                                    <option key={x} value={item}>{item + ':00'}</option>                                                                
                                                            )
                                                        })}
                                                    </select>  
                                                </div>
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Ώρα</div>
                                            </div>  

                                            <div className="column">
                                                <div className="form_label"><BsFillBuildingFill className="react_icon"/>Αίθουσα</div>                                             
                                                <select className="form_control" required value={modalOpen.hall} onChange={(e)=>{setProgramItem({...programItem, Hall:e.target.value}) ; setModalOpen({...modalOpen, hall:e.target.value})}}>
                                                    <option style={{display:'none'}}></option>
                                                    {halls.map((item, x)=> {
                                                        return (                       
                                                            modalOpen.type !== "" ?
                                                            modalOpen.type === 'Εργαστήριο' ?
                                                            item.Hall_category === 'Εργαστήρια' ?
                                                                <option key={x}>{item.Hall_type + " " + item.Hall_code}</option> : null
                                                                :
                                                            (item.Hall_category === 'Αίθουσες Διδασκαλίας' || item.Hall_category === 'Εργαστήρια') ?
                                                                item.Hall_type === 'Αμφιθέατρο' ? 
                                                                <option key={x}>{item.Hall_type + " " + item.Hall_code + "  ( " + item.Hall_label + " )"}</option>
                                                                : <option key={x}>{item.Hall_type + " " + item.Hall_code}</option> : null
                                                            :
                                                            item.Hall_type === 'Αμφιθέατρο' ? 
                                                            <option key={x}>{item.Hall_type + " " + item.Hall_code + "  ( " + item.Hall_label + " )"}</option>
                                                            : <option key={x}>{item.Hall_type + " " + item.Hall_code}</option>
                                                        )
                                                    })}
                                                </select>  
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Αίθουσα</div>
                                            </div>  

                                            <div className="column">
                                                <div className="form_label"><FaEdit className="react_icon"/>Τύπος</div>                                             
                                                <select className="form_control" required value={modalOpen.type} onChange={(e)=>{setProgramItem({...programItem, type:e.target.value}) ; setModalOpen({...modalOpen, type:e.target.value})}}>
                                                    <option style={{display:'none'}}></option>
                                                    <option>Διάλεξη</option>
                                                    <option>Εργαστήριο</option> 
                                                </select>  
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε έναν έγκυρο Τύπο</div>
                                            </div>  

                                            <div className="column">
                                                <div className="form_label"><IoMan className="react_icon"/>Διδάσκων</div>   
                                                {modalOpen.course !== "" ? 
                                                <select className="form_control" required value={modalOpen.instructor} onChange={(e)=>{setProgramItem({...programItem, instructor:e.target.value}) ; setModalOpen({...modalOpen, instructor:e.target.value})}}>
                                                    <option style={{display:'none'}}></option>
                                                    {courses.map((cour => { 
                                                        return(
                                                            modalOpen.course.includes(cour.StudyProgram.course_code) ?                                                      
                                                            cour.CourseManagement.COURSE_INSTRUCTORS.map(instr => {
                                                                currCourse = cour;
                                                                return(
                                                                <option key={instr.instructor_LastName} value={instr.instructor_LastName + " " + instr.instructor_FirstName}>{instr.instructor_LastName + " " + instr.instructor_FirstName}</option>     
                                                                )                                                       
                                                            }) 
                                                            :  <option key={cour.StudyProgram.course_code} style={{display:'none'}}></option>
                                                        )        
                                                    }))}
                                                </select>
                                                : <input className="form_control" required value={modalOpen.instructor} onChange={(e)=> {setProgramItem({...programItem, instructor:e.target.value}); setModalOpen({...modalOpen, instructor:e.target.value})}}></input>
                                                }   
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε έναν έγκυρο Διδάσκων</div>
                                            </div>             

                                        </div>
                                        <div className="modal_row">
                                        { modalOpen.category === 'update' ?
                                            <div className="DeleteButton" onClick={()=>handleDeleteButton('delete')}><RiDeleteBin2Fill style={{verticalAlign:'middle', alignItems:'center', color:'#d30a0a'}}/>Διαγραφή</div> : null }
                                            <div className="buttons">
                                                <div className="CancelButton" onClick={() => setModalOpen({...modalOpen, state:'modal', category:'', course:"", day:"", fromHour:"", toHour:"", hall:"", type:"", instructor:""})}>Άκυρο</div>
                                                <div className="SuccessButton"onClick={() => modalOpen.category === 'create' ? handleSuccessButton_create() : handleSuccessButton_update()}>{modalOpen.category === 'update' ? 'Ανανέωση' : 'Αποθήκευση'}</div> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={300}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    /> 
                </div> 
                : 
                <TimetablePostGraduate typeOfProgram={typeOfProgram} studyLevel = {studyLevelProgram}/>
                }
            </div>          
        </div>   
    );   
}


export default CreateProgramContainer;
 