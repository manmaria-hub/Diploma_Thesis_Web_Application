import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDrag, useDrop } from "react-dnd"; 
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import makeAnimated from "react-select/animated"; 
import moment from 'moment';

// Components
import Loader from '../../../../components/LOADERS/loader';

// GraphQL Resolvers
import Courses from '../../../../graphql/resolvers/courses';
import Halls from '../../../../graphql/resolvers/halls';

// Icons
import LOGO from '../../../../Icons/bacLogo.jpg';
import {FcCalendar} from 'react-icons/fc';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';
import { IoClose, IoCalendar, IoMan } from 'react-icons/io5';
import { GiWhiteBook } from 'react-icons/gi';
import { BsClockFill, BsFillBuildingFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa'; 
import {RiDeleteBin2Fill} from 'react-icons/ri';
import { FcOk } from 'react-icons/fc';


// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/PROGRAM_INFO/CREATE_PROGRAM/timetablePostGraduate.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";  

const TimetablePostGraduate = (props) => {
    const localizer = momentLocalizer(moment);
    const DndCalendar = withDragAndDrop(Calendar)
    // Determining the study level of the courses whose the program we want to create
    const studyLevelProgram = props.studyLevel;
    // Determining the type of program to create
    const typeOfProgram = props.typeOfProgram;

    // Determine the current Date
    const currDate = new Date();
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)

    let currAcademicYear = '';    // initialiaze current academic year variabe
    let currAcademicSemester = '';    // initialiaze current academic semester variabe
    
    // Declare the state variables for the start and the end date of the exams
    let [startDateExam, setStartDateExam] = useState('');
    let [endDateExam, setEndDateExam] = useState('');

    // Create an array for academic year selections
    let acadYears = [];

    // Determine the state variable that will be responsible for the situation of popup window
    const [modalOpen, setModalOpen] = useState({ state: 'modal', category: '', course_code: '', course_name: '', day: '', date: moment().format('YYYY-MM-DD'), fromHour: '', toHour: '', hall: [], type: '', instructor: [] })
    // Setting and initialization of the state variable array that will store the exams' program
    let [program, setProgram] = useState([]);
    // Setting and initialization of the state variable array that will store the halls with the time of the exams' program for every hall
    let [hallProgram, setHallProgram] = useState([]);
    // Setting and initializing of the state variable array that will store the instructors of the current course whose program we try to create
    let [courseInstructors, setCourseInstructors] = useState([]);
     
    // Set the state variable that will determine the situation of the program creator, if the user do not submit start and end exams' date 
    // the program creato area remains locked
    const [locked, setLocked] = useState('locked');

    // Set and initialize tha array that will keep the lab hours of a course 
    let [labHours, setLabHours] = useState([]);

    // Setting and initializing the variable that will keep the current course that is been prepared to update 
    let [courseToUpdate, setCourseToUpdate] = useState();
    
    // Useful variable arrays that hold the data from graphQl queries
    const [halls, setHalls] = useState([]);
    // Setting and initializing the state variable array that will contain all the courses of the corressponding study category
    let [courses, setCourses] = useState([]);
    // State variable array that will keep the courses whose the program details have setted for all the theory, study or lab hours
    let [completedProgramCourses, setCompletedProgramCourses] = useState([]);
    // Set and initialize the array that will keep the courses of each postgraduate specialization field
    let [postgraduateFields, setPostgraduateFields] = useState([]);

    // Set and initialize the arrays that will keep the courses for each category 
    // (such as the courses of the first academic year of study, of the second year,...)
    let [firstYearCourses, setFirstYearCourses] = useState([]);       // FIRST YEAR
    let [secondYearCourses, setSecondYearCourses] = useState([]);     // SECOND YEAR
    let [thirdYearCourses, setThirdYearCourses] = useState([]);       // THIRD YEAR
    let [fourthYearCourses, setFourthYearCourses] = useState([]);     // FOURTH YEAR
    let [fifthYearCourses, setFifthYearCourses] = useState([]);       // FIFTH YEAR

    // Find the current academic year 
    if (currMonth > 9 && currMonth <= 12) {
        currAcademicYear = currYear + '-' + currYear + 1;
        acadYears = [Number(currYear + 2) + '-' + Number(currYear + 3), Number(currYear + 1) + '-' + Number(currYear + 2), currAcademicYear, Number(currYear - 1) + '-' + currYear, Number(currYear - 2) + '-' + Number(currYear - 1), Number(currYear - 3) + '-' + Number(currYear - 2)]
    }
    else {
        currAcademicYear = currYear - 1 + '-' + currYear;
        acadYears = [currYear + 1 + '-' + Number(currYear + 2), currYear + '-' + Number(currYear + 1), currAcademicYear, Number(currYear - 2) + '-' + Number(currYear - 1), Number(currYear - 3) + '-' + Number(currYear - 2), Number(currYear - 4) + '-' + Number(currYear - 3)]
    }
    // Find the current academic semester
    if (currMonth >= 7 && currMonth <= 10) {
        currAcademicSemester = 'Σεπτεμβρίου';
    }
    else if (currMonth >= 11 && currMonth < 2) {
        currAcademicSemester = 'Χειμερινό Εξάμηνο';
    }
    else {
        currAcademicSemester = 'Εαρινό Εξάμηνο';
    }

    // Function that is useful for the timegrid 
    const range = (start, end, step) => {
        let array = [start]
        while (start < end) {
            start += step;
            array.push(start);
        }
        return (array)
    }

    // Select the area in that we want to refer our calendar

    let [events, setEvents] = useState([]);

    const moveEvent = ({ event, start, end }) => { 
        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        setEvents(nextEvents);
    }
    /*
    const resizeEvent = ({ event, start, end }) => {

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });

        setEvents(nextEvents)
    };*/


    // Handling the selection of a program's cell (CREATING A NEW PROGRAM ITEM)
    const handleSelectSlot = (slot) => { 
        // Determine the selected date and setting in the data object
        const selectedDate = moment(slot.start).format('YYYY-MM-DD');         
        setModalOpen({ ...modalOpen, state: 'modal show', category: 'create', date:selectedDate, hall:[]})
    }
    console.log(completedProgramCourses)
    // Handling the selection of a program's course (UPDATING AN EXISTING PROGRAM ITEM)
    const handleSelectEvent = (event) => {  
        // Determining the course's event info from the selected event
        const courseCode = event.title;
        const courseName = event.name;
        const courseDate = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].date;
        const courseDay = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].day;
        const courseFromHour = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].fromHour;
        const courseToHour = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].toHour;
        const courseType = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].type;
        const courseHall = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].hall;
        const courseInstructor = completedProgramCourses.filter(completed => completed.course_name === event.name)[0].instructor;
        console.log(courseHall, 'hall')
        setModalOpen({ ...modalOpen, state: 'modal show', category: 'update', course_code : courseCode, course_name : courseName, date: courseDate, day : courseDay, fromHour : courseFromHour, toHour : courseToHour, type : courseType, hall : courseHall, instructor : courseInstructor })
        // Setting also the object courseToUpdate with the same course exam's information, that will be useful for the delete button handling
        setCourseToUpdate({ ...courseToUpdate, course_code : courseCode, course_name : courseName, date: courseDate, day : courseDay, fromHour : courseFromHour, toHour : courseToHour, type : courseType, hall : courseHall, instructor : courseInstructor });
    }

    // Fill correctly the array of courses according to the selected type of created program
    useEffect(() => {
        // Before realize the graphQL query, we determine the period
        let period = '';
        if (currAcademicSemester === 'Χειμερινό Εξάμηνο') {
            period = ['Χειμερινή'];
        }
        else if (currAcademicSemester === 'Εαρινό Εξάμηνο') {
            period = ['Εαρινή'];
        }
        else if (currAcademicSemester === 'Σεπτεμβρίου') {
            period = ['Χειμερινή', 'Εαρινή'];
        }
        // *** ΠΡΟΠΤΥΧΙΑΚΑ ΜΑΘΗΜΑΤΑ
        if (studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' || studyLevelProgram === 'ΕΜΒΟΛΙΜΗ') {
            // Before fill the arrays, initialize them with the empty
            if (program.length !== 0) {setProgram([]);} 
            if (hallProgram.length !== 0) { setHallProgram([])} 
            if (events.length !== 0) {setEvents([]);}
            if (completedProgramCourses.length !== 0) {setCompletedProgramCourses([]);}
            if (halls.length !== 0) {setHalls([])}
            if (firstYearCourses.length !== 0) { setFirstYearCourses([]); }
            if (secondYearCourses.length !== 0) { setSecondYearCourses([]); }
            if (thirdYearCourses.length !== 0) { setThirdYearCourses([]); }
            if (fourthYearCourses.length !== 0) { setFourthYearCourses([]); }
            if (fifthYearCourses.length !== 0) { setFifthYearCourses([]); }

            // If the user wants to create the exams program for the 'ΕΜΒΟΛΙΜΗ' exam, the courses will concern the previous semester
            // This means that if the current semester is the spring/summer, the previous will be the winter/autumn and the opposite
            if (studyLevelProgram === 'ΕΜΒΟΛΙΜΗ' && period.includes('Εαρινή') && period.length === 1) {
                period = ['Χειμερινή'];
            }
            else if (studyLevelProgram === 'ΕΜΒΟΛΙΜΗ' &&  period.includes('Χειμερινή') && period.length === 1) {
                period = ['Εαρινή'];
            } 

            Courses.get_active_courses_by_specific_period(period)
                .then(result => {
                    let retCourses = result?.data?.getAllActiveCoursesOfSpecificPeriod;
                    let finalCourses = [];  
                    retCourses.forEach((item) => {
                        if (retCourses.length !== 0 && item?.StudyProgram?.course_label.includes('ΠΡΟΠΤΥΧΙΑΚΟ')) {                                                 
                            if (item?.InfoFromInstructor?.typeOfExam.length === 0) {
                                finalCourses.push({course : item, type : ""}); 
                            } 
                            else {
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΘΕΩΡΙΑ')) { 
                                    if(item?.InfoFromInstructor?.typeOfExam.length >= 2) {   
                                        finalCourses.push({course : item, type : "ΘΕΩΡΙΑ"});                                            
                                    }
                                    else {
                                        finalCourses.push({course : item, type : ""}); 
                                    }
                                }
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΤΗΡΙΟ')) {
                                    finalCourses.push({course : item, type : "ΕΡΓΑΣΤΗΡΙΟ"});  
                                }
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΙΕΣ')) { 
                                    finalCourses.push({course : item, type : "ΕΡΓΑΣΙΕΣ"});   
                                }
                            } 
                            // Determine the array of lab hours
                            if (item.InfoFromInstructor.lab_hours !== '') {
                                let obj = {
                                    course_code: item.StudyProgram.course_code, lab_group_number: item.InfoFromInstructor.lab_hours !== '' ? Math.ceil(item.More.students_curr_attendance_num / 20) : '',
                                    total_lab_hours: item.InfoFromInstructor.labHours !== '' ? (Math.ceil(item.More.students_curr_attendance_num / 20)) * Number(item.InfoFromInstructor.lab_hours) : ''
                                }
                                labHours.push(obj);
                            }                            
                        }
                    })   
                    finalCourses.forEach(newItem => { 
                        // Determine the courses of the first year of studies
                        if (newItem.course.StudyProgram?.semester === '1' || newItem.course.StudyProgram?.semester === '2') {
                            setFirstYearCourses(firstYearCourses => [...firstYearCourses, newItem]);
                        }
                         // Determine the courses of the second year of studies
                        else if (newItem.course.StudyProgram?.semester === '3' || newItem.course.StudyProgram?.semester === '4') {
                            setSecondYearCourses(secondYearCourses => [...secondYearCourses, newItem])
                        }
                        // Determine the courses of the third year of studies
                        else if (newItem.course.StudyProgram?.semester === '5' || newItem.course.StudyProgram?.semester === '6') {
                            setThirdYearCourses(thirdYearCourses => [...thirdYearCourses, newItem])
                        }
                        // Determine the courses of the fourth year of studies
                        else if (newItem.course.StudyProgram?.semester === '7' || newItem.course.StudyProgram?.semester === '8') {
                            setFourthYearCourses(fourthYearCourses => [...fourthYearCourses, newItem])
                        }
                        // Determine the courses of the fifth year of studies
                        else if (newItem.course.StudyProgram?.semester === '9' || newItem.courseStudyProgram?.semester === '10') {
                            setFifthYearCourses(fifthYearCourses => [...fifthYearCourses, newItem])
                        }
                    })                      
                    setCourses(finalCourses);                    
                })
        }
        else if (studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') {
            // Before fill the array of postgraduate courses, initialize them with the empty
            if (program.length !== 0) {setProgram([]);} 
            if (hallProgram.length !== 0) { setHallProgram([])} 
            if (events.length !== 0) {setEvents([]);}
            if (halls.length !== 0) {setHalls([])}
            if (completedProgramCourses.length !== 0) {setCompletedProgramCourses([]);}
            if (postgraduateFields.length !== 0) { setPostgraduateFields([]); }

            // Use the suitable query to collect all the postgraduate courses data group by specialization field
            Courses.get_postgraduate_courses(period[0])
                .then(result => {                     
                    setPostgraduateFields(result?.data?.getPostGraduateCourses);                    
                    let finalCourses = [];
                    result?.data?.getPostGraduateCourses.forEach(field => {
                        field.courses.forEach(course => {
                            if (course?.InfoFromInstructor?.typeOfExam.length === 0) {
                                finalCourses.push({course : course, type : ""}); 
                            } 
                            else {
                                if (course?.InfoFromInstructor?.typeOfExam.includes('ΘΕΩΡΙΑ')) { 
                                    if(course?.InfoFromInstructor?.typeOfExam.length >= 2) {   
                                        finalCourses.push({course : course, type : "ΘΕΩΡΙΑ"});                                            
                                    }
                                    else {
                                        finalCourses.push({course : course, type : ""}); 
                                    }
                                }
                                if (course?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΤΗΡΙΟ')) {
                                    finalCourses.push({course : course, type : "ΕΡΓΑΣΤΗΡΙΟ"});  
                                }
                                if (course?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΙΕΣ')) { 
                                    finalCourses.push({course : course, type : "ΕΡΓΑΣΙΕΣ"});   
                                }
                            }                
                        })
                    })
                    setCourses(finalCourses);                     
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })
        } 
        else if (studyLevelProgram === 'ΙΣΟΤΙΜΙΑΣ') {
            // Before fill the arrays, initialize them with the empty
            if (program.length !== 0) {setProgram([]);} 
            if (hallProgram.length !== 0) { setHallProgram([])} 
            if (events.length !== 0) {setEvents([]);} 
            if (completedProgramCourses.length !== 0) {setCompletedProgramCourses([]);}
            if (courses.length !== 0) { setCourses([]); } 

            Courses.get_active_courses_by_specific_period(period)
                .then(result => {
                    let retCourses = result?.data?.getAllActiveCoursesOfSpecificPeriod;
                    let finalCourses = [];  
                    retCourses.forEach((item) => {
                        if (retCourses.length !== 0 && item?.StudyProgram?.course_label.includes('ΙΣΟΤΙΜΙΑΣ')) {                                                 
                            if (item?.InfoFromInstructor?.typeOfExam.length === 0) {
                                finalCourses.push({course : item, type : ""}); 
                            } 
                            else {
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΘΕΩΡΙΑ')) { 
                                    if(item?.InfoFromInstructor?.typeOfExam.length >= 2) {   
                                        finalCourses.push({course : item, type : "ΘΕΩΡΙΑ"});                                            
                                    }
                                    else {
                                        finalCourses.push({course : item, type : ""}); 
                                    }
                                }
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΤΗΡΙΟ')) {
                                    finalCourses.push({course : item, type : "ΕΡΓΑΣΤΗΡΙΟ"});  
                                }
                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΙΕΣ')) { 
                                    finalCourses.push({course : item, type : "ΕΡΓΑΣΙΕΣ"});   
                                }
                            }  
                        }
                    })   
                    finalCourses.forEach(newItem => { 
                        // Determine the courses of the first year of studies
                        if (newItem.course.StudyProgram.semester === '1' || newItem.course.StudyProgram.semester === '2') {
                            setFirstYearCourses(firstYearCourses => [...firstYearCourses, newItem]);
                        }
                         // Determine the courses of the second year of studies
                        else if (newItem.course.StudyProgram.semester === '3' || newItem.course.StudyProgram.semester === '4') {
                            setSecondYearCourses(secondYearCourses => [...secondYearCourses, newItem])
                        }
                        // Determine the courses of the third year of studies
                        else if (newItem.course.StudyProgram.semester === '5' || newItem.course.StudyProgram.semester === '6') {
                            setThirdYearCourses(thirdYearCourses => [...thirdYearCourses, newItem])
                        }
                        // Determine the courses of the fourth year of studies
                        else if (newItem.course.StudyProgram.semester === '7' || newItem.course.StudyProgram.semester === '8') {
                            setFourthYearCourses(fourthYearCourses => [...fourthYearCourses, newItem])
                        }
                        // Determine the courses of the fifth year of studies
                        else if (newItem.course.StudyProgram.semester === '9' || newItem.courseStudyProgram.semester === '10') {
                            setFifthYearCourses(fifthYearCourses => [...fifthYearCourses, newItem])
                        }
                    })                      
                    setCourses(finalCourses);                    
                })
        }
        
    }, [studyLevelProgram, currAcademicSemester])
 
    // Fill the array of halls with the object of halls that can be offered for study (study halls, amphitheatres & labs)
    if (halls.length === 0 && hallProgram.length === 0) {
        Halls.get_study_and_lab_halls()
            .then(result => { 
                let currArray = [];
                let currHallArray = [];
                result?.data?.getAllStudyAndLabHalls.forEach((hallData) => {                    
                    currArray.push({value : hallData.Hall_code, label: hallData.Hall_type === 'Αμφιθέατρο' ? hallData.Hall_type + " " + hallData.Hall_code + " ( " + hallData.Hall_label + " )" : hallData.Hall_type + " " + hallData.Hall_code})
                    currHallArray.push({hall_code : hallData.Hall_code, info:[]})
                })
                setHalls(currArray); 
                setHallProgram(currHallArray);               
            }) 
            .catch(err=> {
                console.log(err)
            })
    }
    // Fill the array of halls with the object of halls that can be offered for study (study halls, amphitheatres & labs)
    if  (hallProgram.length === 0) {
        Halls.get_study_and_lab_halls()
            .then(result => { 
                let currArray = [];
                let currHallArray = [];
                result?.data?.getAllStudyAndLabHalls.forEach((hallData) => {                    
                    currArray.push({value : hallData.Hall_code, label: hallData.Hall_type === 'Αμφιθέατρο' ? hallData.Hall_type + " " + hallData.Hall_code + " ( " + hallData.Hall_label + " )" : hallData.Hall_type + " " + hallData.Hall_code})
                    currHallArray.push({hall_code : hallData.Hall_code, info:[]})
                })
                setHalls(currArray); 
                setHallProgram(currHallArray);               
            }) 
            .catch(err=> {
                console.log(err)
            })
    }
 
    // Handling the course code, state and category of modal window changes to perform the array of course's instructors
    useEffect(() => { 
                 
        let performingArray = [];
        let currentCourseData = courses.filter(course => course.course.StudyProgram.course_code === modalOpen.course_code);
        if (currentCourseData.length > 0) {
            currentCourseData[0].course.CourseManagement.COURSE_INSTRUCTORS.forEach((instr) => { 
                performingArray.push({value: instr.instructor_LastName + ' ' + instr.instructor_FirstName, label : instr.instructor_LastName + ' ' + instr.instructor_FirstName});
            })
        }
        setCourseInstructors(performingArray); 
    
    }, [modalOpen.course_code,modalOpen.state, modalOpen.category])
  
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
    
    // Function that handles the drops from courses' menu
    const dropFromOutsideMenu = (slot) => {

        // Determine the selected date and setting in the data object
        const selectedDate = moment(slot.start).format('YYYY-MM-DD');
        modalOpen.date = selectedDate; 
        // The other information about this drag element from outside menu are been determined in the moveItem() function         
    }

    const movePlayer = (item) => {   
       console.log(item)  
       // Determine the type of the exam (THEORY OR LAB)
       let typeOfExam = ''
       if (item?.item?.course?.StudyProgram?.course_name.includes('ΘΕΩΡΙΑ')) {
           typeOfExam = 'Θεωρία';
       }
       else if (item?.item?.course?.StudyProgram?.course_name.includes('ΕΡΓΑΣΤΗΡΙΟ')) {
           typeOfExam = 'Εργαστήριο';
       }
       else if (item?.item?.course?.StudyProgram?.course_name.includes('ΕΡΓΑΣΙΕΣ')) {
           typeOfExam = 'Εργασία';
       }
       else {
           typeOfExam = 'Θεωρία';
       }

       setModalOpen({ ...modalOpen, state: 'modal show', category: 'create', course_code: item?.item?.course?.StudyProgram?.course_code, course_name: item?.item?.course?.StudyProgram?.course_name, type : typeOfExam})
    }

    // Component that determines an item of the courses' submenu (Draggable) 
    const SubMenuItem = ({ item, keyProp, divType, className, index }) => {

        const [{ isDragging }, dragRef] = useDrag({
            type: divType,
            item: () => ({
                item,
                index
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult(); 
                if (item && dropResult) {
                    movePlayer(item);
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
             
        })
        return (
            <div key={keyProp} className={className} ref={dragRef}>              
                {item.type === 'ΘΕΩΡΙΑ' ?
                <span>{item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name + " (" + item?.type + ")"}</span> :
                item.type === 'ΕΡΓΑΣΤΗΡΙΟ' ?
                <span>{item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name + " (" + item?.type + ")"}</span> :
                item.type === 'ΕΡΓΑΣΙΕΣ' ?
                <span>{item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name + " (" + item?.type + ")"}</span> : 
                <span>{item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name}</span> }             
            </div>
        )
    }
    let [draggedEvent, setDraggedEvent] = useState({})

    const { views, ...otherProps } = useMemo(() => ({
        views: {
            month: true,
            week: true,
            agenda: true
        }
    }), [])

    // Function that is useful to change the color of specific timetables slots according to the events
    const calendarStyle = (date) => {
        let startExam = `${new Date(startDateExam).getDate()} ${new Date(startDateExam).getMonth()+1} ${new Date(startDateExam).getFullYear()}`
        let endExam = `${new Date(endDateExam).getDate()} ${new Date(endDateExam).getMonth()+1} ${new Date(endDateExam).getFullYear()}`
        let allDate = `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`
         
        // Customize the color of start exam day's slot
        if ( allDate === startExam)
        return {
          style: {
            backgroundColor: '#f2426e46',  
            margin: 0,
            padding: 0
          }
        }
        // Customize the color of end exam day's slot
        if ( allDate === endExam)
        return {
          style: {
            backgroundColor: '#f2426e46',  
            margin: 0,
            padding: 0
          }
        }
    }
     
    // Check the validation of start and end date of exams every time the user change these values
    useEffect(() => {         
        const startDate = new Date(startDateExam);  
        const endDate = new Date(endDateExam);        
        // A valid duration of exams must have right dates (start date before the end date) otherwise send an error message 
        if (startDateExam !== '' && endDateExam !== '' && startDateExam !== undefined && endDateExam !== undefined && startDate.getTime() >= endDate.getTime()) {
            if (document.getElementById('StartEndInfo')) {
                document.getElementById('StartEndInfo').getElementsByClassName('invalid_feedback')[0].style.display = 'flex';
            }
        }
        else {
            if (document.getElementById('StartEndInfo')) {
                document.getElementById('StartEndInfo').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }
        } 
        
    }, [startDateExam, endDateExam])
      
    // Function that determines the drop area of the calendar
    const [{isOver}, dropCourse] = useDrop(() => ({
        accept : ["submenu_item", "program_detail"],
        drop : (item) => console.log('DROP'),
        collect : (monitor) => ({
            isOver : !!monitor.isOver()
        })
    })) 

    // Handling a drag event from outside of the calendar
    const dragFromOutsideItem = useCallback((e) => {console.log(draggedEvent, 'draf')}, [draggedEvent])    
    // Make the multi-select animated
    const animatedComponents = makeAnimated();

    // Function that check te date and day validation 
    const checkDateValidation = useCallback((selectedDate) => {
        let isInvalid = false;  
         
        if ( moment(modalOpen.date) < moment(startDateExam) || moment(modalOpen.date) > moment(endDateExam)) {      
            if (document.getElementById('Date_Day') && document.getElementById('Date_Day').getElementsByClassName('invalid_feedback')[0].style.display !== 'flex') {
                document.getElementById('Date_Day').getElementsByClassName('invalid_feedback')[0].style.display = 'flex';               
            }
            isInvalid = true;
        } 
        else if (document.getElementById('Date_Day') && (selectedDate === 0 || selectedDate === 6)) { 
            if ( document.getElementById('Date_Day') && document.getElementById('Date_Day').getElementsByClassName('invalid_feedback')[0].style.display !== 'flex') {
                document.getElementById('Date_Day').getElementsByClassName('invalid_feedback')[0].style.display = 'flex';
            }
            isInvalid = true;          
        }
        else {
            if (document.getElementById('Date_Day'))  {
                document.getElementById('Date_Day').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isInvalid = false;
            }
        }
 
        return (isInvalid);

    }, [endDateExam, modalOpen.date, startDateExam])
    // Handling dates changes
    useEffect(() => { 
        const selectedDate = new Date(modalOpen.date).getDay();
        // According the number that the 'getDay()' function returns, set the day
        if (selectedDate === 0) {
            setModalOpen(modalOpen => ({...modalOpen, day:'Κυριακή'}));
        }
        else if (selectedDate === 1) {
            setModalOpen(modalOpen=>({...modalOpen, day:'Δευτέρα'}));
        }
        else if (selectedDate === 2) {
            setModalOpen(modalOpen => ({...modalOpen, day:'Τρίτη'}));
        }
        else if (selectedDate === 3) {
            setModalOpen(modalOpen=> ({...modalOpen, day:'Τετάρτη'}));
        }
        else if (selectedDate === 4) {
            setModalOpen(modalOpen=>({...modalOpen, day:'Πέμπτη'}));
        }
        else if (selectedDate === 5) {
            setModalOpen(modalOpen => ({...modalOpen, day:'Παρασκευή'}));
        }
        else if (selectedDate === 6) {
            setModalOpen(modalOpen=> ({...modalOpen, day:'Σάββατο'}));
        } 

        checkDateValidation(selectedDate);

    },[modalOpen.date, checkDateValidation])

    // Function that check the duratiob of the exams (must be qual to three hours)
    const checkTimeValidation = useCallback(() => {
        let isInvalid  = false;
        // Calculate the given exam's duration 
        let duration = modalOpen.toHour - modalOpen.fromHour; 
        // the duration of the exams must be equal to three hours
        if (modalOpen.type === 'Θεωρία' && duration !== 3) {  
            if (document.getElementById('Hour').getElementsByClassName('invalid_feedback')) {
                document.getElementById('Hour').getElementsByClassName('invalid_feedback')[0].style.display = 'flex';
                isInvalid = true;
            }
        }
        else if (modalOpen.type === 'Εργαστήριο' && duration < 2) {  
            if (document.getElementById('Hour') && document.getElementById('Hour').getElementsByClassName('invalid_feedback')) {
                document.getElementById('Hour').getElementsByClassName('invalid_feedback')[0].style.display = 'flex';
                isInvalid = true;
            }
        }        
        else {
            if (document.getElementById('Hour')) {
                document.getElementById('Hour').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                isInvalid = false;
            }
        }

        return(isInvalid)
    }, [modalOpen.fromHour, modalOpen.toHour])/*
    console.log(modalOpen)
    console.log(events)
    console.log(hallProgram)
    console.log(completedProgramCourses)*/

    // Handling the time changes 
    useEffect(() => {
        checkTimeValidation();
    }, [modalOpen.fromHour, modalOpen.toHour, checkTimeValidation])

    // Control to unlock the program creator area when the user submit both start and exams' date
    useEffect (() => {

        if (startDateExam !== '' && endDateExam !== '') {
            setLocked('unlocked');
        }        
                
    }, [startDateExam, endDateExam])
  
     // Function that it appears the notification window after the try to proccess an unlocked program creator
     const notifyWarning = (message) => {
        toast.warning(message, {
            position:  toast.POSITION.TOP_CENTER,
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true, 
            theme: "dark",
            });
    }
    
    // Function that it appears the notification window after the control of unvalid input data 
    const notifyError = (message) => {
        toast.error(message, {
            position:  toast.POSITION.TOP_CENTER,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true, 
            theme: "colored",
            });
        }

    // Function that it appears the notification window after the control of unvalid input course exam info 
    const notifyValidateError = (message) => {
        toast.error(message, {
            position:  toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true, 
            theme: "dark",
        });
    }  

    // Function that checks if the program creator is ready to use (UNLOCKED)
    const checkLocked = () => {
        if (locked === 'locked') {
            notifyWarning('Παρακαλώ εισάγετε πρώτα έγκυρη ημερομηνία Έναρξης και Λήξης της εξεταστικής περιόδου πριν προχωρήσετε με τη δημιουργία προγράμματος. Μέχρι τότε η φόρμα θα παραμένει κλειδωμένη !') 
        } 
    }

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "#171e32", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}),
        option: (styles) => {
          return {
            ...styles,
            backgroundColor: "#171e32",
            color: "#ffffff",
            cursor: "pointer",
            scrollbarWidth: 'none',
            border: 'none',
            fontSize: '0.85rem',
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'    
          };
        }
      };

    // Function that handles the course's changes
    const handleCourseChanges = (courseValue) => { 
        let typeOfExam = '';
        if (courseValue.includes('ΘΕΩΡΙΑ')) { 
            typeOfExam = 'Θεωρία';
        }
        else if (courseValue.includes('ΕΡΓΑΣΤΗΡΙΟ')) { 
            typeOfExam = 'Εργαστήριο';
        }
        else { 
            typeOfExam = 'Θεωρία';
        }
        // Store the input data for the course in the corressponding object
        setModalOpen({...modalOpen, course_code : courseValue.split(" ")[0], course_name : courseValue.substring(courseValue.indexOf(" ")+1, courseValue.length), type : typeOfExam, instructor : []})

        document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'none';
    }
  
    // Function that checks for the corressponding between course's selection and type of exam
    const checkTypeValidation = useCallback(() => { 

        let isInvalid = false;
        if (modalOpen.course_name !== '' && modalOpen.type !== '') { 
            if (modalOpen.course_name.includes('ΘΕΩΡΙΑ') && modalOpen.type !== 'Θεωρία') {                
                document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'flex'     
                isInvalid = true; 
                return(isInvalid)       
            } 
            else if (modalOpen.course_name.includes('ΕΡΓΑΣΤΗΡΙΟ') && modalOpen.type !== 'Εργαστήριο') { 
                document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'flex'     
                isInvalid = true; 
                return(isInvalid)         
            }  
            else {
                document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'none' 
                isInvalid = false;
                return(isInvalid)
            }
        }        
        return(isInvalid);
    }, [modalOpen.course_name, modalOpen.type])

    // Handling the type of exams changes
    useEffect(() => {
        checkTypeValidation();
    }, [modalOpen.type, checkTypeValidation])

    // Function that checks the validation of the input data
    const validateData = () => {
        let invalid = false;
        // A. Check for empty values
        Object.values(modalOpen).forEach((input, x) => {           
            if (input === '' || input.length === 0 || modalOpen.date === moment().format('YYYY-MM-DD')) { 
                invalid = true;
                return(invalid);
            }
        })       
           
        // B. Check for a valid date between the duration of the exams
        let isInvalidDate = checkDateValidation(modalOpen.date); 
        if (isInvalidDate === true) { 
            invalid = true;
            return (invalid)
        } 
      
        // C. Check for a valid exam time duration
        let isInvalidTime = checkTimeValidation();
        if (isInvalidTime === true) { 
            invalid = true;
            return (invalid)
        } 
        
        // D. Check for valid type of exam according the course's selection
        let isInvalidType = checkTypeValidation();
        if (isInvalidType === true) {
            invalid = true;
            return(invalid);
        }
      
        return (invalid)
    } 
    // Function that checks the validation of the exam's date, hall and instructor
    const validateCourseExamInfo = (examProgramItem) => {
        let isInvalid = false;
        let errorMessage = '';
        // A. CHECK FOR DUPLICATES
        if (examProgramItem.category === 'create' && program.filter(item => item.course_code === examProgramItem.course_code && item.type === examProgramItem.type).length > 0) {
            isInvalid = true;            
            errorMessage = 'Έχει ήδη καταχωρηθεί ημερομηνία εξέτασης για το μάθημα ' + examProgramItem.course_code + ' ' + examProgramItem.course_name + '! Αν επιθυμείτε να τροποποιήσετε κάτι σε αυτό, παρακαλώ πατήστε πάνω στο event του συγκεκριμένου μαθήματος στο ημερολόγιο εγγραφών, διαφορετικά δοκιμάστε τη δημιουργία προγράμματος για ένα άλλο μάθημα!.';
            notifyValidateError(errorMessage)
            return(isInvalid);
        }

        // B. CHECK FOR THE AVAILIABILITY OF THE HALL
        let index = 0; let nonEmptyHalls = []; 
        modalOpen.hall.forEach(examHall => { 
            let specHall = hallProgram.filter(inHall => inHall.hall_code === examHall.value)[0]; 
            specHall?.info.forEach(item=> {  
                if ((modalOpen.date === item.date) && ((Number(modalOpen.fromHour) >= Number(item.fromHour) && Number(modalOpen.fromHour) < Number(item.toHour)) || (Number(modalOpen.toHour) > Number(item.fromHour) && Number(modalOpen.toHour) <= Number(item.toHour)))) {
                   
                    if (!nonEmptyHalls.includes(specHall.hall_code)) {
                        nonEmptyHalls[index] = specHall.hall_code;
                        index = index + 1;   
                    }        
                }
            })            
        }) 
        if (nonEmptyHalls.length > 0) {
            if (nonEmptyHalls.length > 1) {
                errorMessage = 'Κάποιες από τις επιλεγμένες αίθουσες (' + nonEmptyHalls.map(e=>e) + ") είναι κατειλημμένες το συγκεκριμένο χρονικό διάστημα ! Παρακαλώ αναζητήστε διαθέσιμες αίθουσες, διαφορετικά τροποποιήστε την ώρα έναρξης της εξέτασης." 
            }
            else if (nonEmptyHalls.length === 1) {
                errorMessage = 'Η επιλεγμένη αίθουσα (' + nonEmptyHalls[0] + ") είναι κατειλημμένη το συγκεκριμένο χρονικό διάστημα ! Παρακαλώ αναζητήστε διαθέσιμες αίθουσες, διαφορετικά τροποποιήστε την ώρα έναρξης της εξέτασης." 
            }
            isInvalid = true;
            notifyValidateError(errorMessage);
            return(isInvalid)
        }
        
        // C. CHECK FOR THE AVAILIABILITY OF THE COURSE'S INSTRUCTOR
        let isTheSame = false;
        if (modalOpen.instructor.length === 1) {
            program.forEach(programItem => { 
                if (programItem.course_name !== modalOpen.course_name && programItem.date === modalOpen.date && ((Number(modalOpen.fromHour) >= Number(programItem.fromHour) && Number(modalOpen.fromHour) < Number(programItem.toHour)) || (Number(modalOpen.toHour) > Number(programItem.fromHour) && Number(modalOpen.toHour) <= Number(programItem.toHour))) && programItem.instructor.filter(insider => insider.value === modalOpen.instructor[0].value).length > 0) {
                     
                    isTheSame = true; 
                }
            })
            if (isTheSame === true) {
                isInvalid = true;
                errorMessage = 'Ο εξεταστής του μαθήματος το συγκεκριμένο χρονικό διάστημα είναι εξεταστής σε άλλο μάθημα. Παρακαλώ ελέγξτε και πάλι το πρόγραμμα πριν προχωρήσετε στην επόμενη εγγραφή!'
                notifyValidateError(errorMessage)
                return(isInvalid)
            } 
        } 

        return(isInvalid);
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
        handleSuccessButton_create();

    }

    // Function that handles the selection of the submit button of the modal window 
    // in a cretion mood prepare the new program item 
    const handleSuccessButton_create = () => {
         
        // A. VALIDATION OF THE INPUT DATA
        const isValidData = validateData(); 
        if (isValidData === true) {
            let ErrorMessage = 'Τα στοιχεία εισαγωγής δεν είναι έγκυρα !'
            notifyError(ErrorMessage);
            return;
        }

        // B. VALIDATION OF THE COURSE EXAM'S PROGRAM
        const isValidExamCourseProgram  = validateCourseExamInfo(modalOpen);
        if (isValidExamCourseProgram === true) {
            // Initialize the object of program item and return from the function
            //setModalOpen({...modalOpen, state :'modal show', category: modalOpen.category, course_code:'', course_name:"", day:"", date:moment().format('YYYY-MM-DD'), fromHour:"", toHour:"", hall: [{value:"", label:""}] , type:"", instructor: []})
            return;
        }

        // Determining the year, month and day
        const year = new Date(modalOpen.date).getFullYear();  
        const month = new Date(modalOpen.date).getMonth();
        const day = new Date(modalOpen.date).getDate();   
        // Put the new program item in the program's array and create the new course exam as event
        // Also, store the hall that this course uses for its exam
        // *** EVENT
        setEvents([...events, {title : modalOpen.course_code,
                              name : modalOpen.course_name, 
                              allday : true, 
                              start : new Date(year, month, day, modalOpen.fromHour, 0, 0),
                              end : new Date(year, month, day, modalOpen.toHour, 0, 0)}])

        // *** PROGRAM
        let newProgramItem = {course_code : modalOpen.course_code, course_name : modalOpen.course_name, date : modalOpen.date, day : modalOpen.day,
                              fromHour : modalOpen.fromHour, toHour:modalOpen.toHour, hall:modalOpen.hall, type: modalOpen.type, instructor: modalOpen.instructor}
        setProgram([...program, newProgramItem]);

        // *** HALLS
        modalOpen.hall.forEach(selectedHall => {
            let specificHall = hallProgram.filter(hall=> hall.hall_code === selectedHall.value);
            if (specificHall.length > 0) { 
                specificHall[0].info.push({course_code : modalOpen.course_code, course_name : modalOpen.course_name, date : modalOpen.date, fromHour : modalOpen.fromHour, toHour : modalOpen.toHour})
            }
        })

        // *** COMPLETED COURSE
        let isAlreadyExist = completedProgramCourses.filter(completedCourse => completedCourse.course_name === modalOpen.course_name);
        if (isAlreadyExist.length === 0) {
            setCompletedProgramCourses([...completedProgramCourses, newProgramItem]);
        }        
        // After the creation and the storage of the new event, initialize again the state variables and objects
        setModalOpen({...modalOpen, state :'modal', category:'', course_code:'', course_name:"", day:"", date:moment().format('YYYY-MM-DD'), fromHour:"", toHour:"", hall: [{value:"", label:""}] , type:"", instructor: []})
        
    }

    // Function that handles the selection of the delete button
    const handleDeleteButton = (typeOfExecute) => {        
        // Prepare the deletion of the specific program item 
        // (For the deletion, we will use the object named as 'courseToUpdate' because the modalOpen object must be have accepted changes)
        
        // *** REMOVE FROM THE HALL PROGRAM          
        let removedItem = {course_code : courseToUpdate.course_code, course_name : courseToUpdate.course_name, date: courseToUpdate.date, day : courseToUpdate.day,
                           fromHour : courseToUpdate.fromHour, toHour : courseToUpdate.toHour, hall : courseToUpdate.hall, type : courseToUpdate.type, instructor : courseToUpdate.instructor}
                           
        courseToUpdate.hall.forEach((hallCode, index) => { 
            let currHall = hallProgram.filter(hallInfo => hallCode.label.includes(hallInfo.hall_code));          
            if (currHall.length > 0) {            
                currHall[0].info = currHall[0].info.filter(programItem => programItem.courseCode !== courseToUpdate.course_code && programItem.course_name !== courseToUpdate.course_name && programItem.date !== courseToUpdate.date && programItem.fromHour !== courseToUpdate.fromHour && programItem.toHour !== courseToUpdate.toHour);                
 
            }
        })
       
        // *** REMOVE FROM THE COMPLETED COURSES
        let completedIndex = completedProgramCourses.findIndex(item => item.course_code === removedItem.course_code && item.course_name === removedItem.course_name);
        
         // Update the array of courses with complete program
         const newCompletedProgram = [
            ...completedProgramCourses.slice(0, completedIndex),             
            ...completedProgramCourses.slice(completedIndex + 1)
        ] 
        if (typeOfExecute === 'delete') {
            setCompletedProgramCourses(newCompletedProgram)
        }
        else {
            completedProgramCourses = newCompletedProgram; 
        }

        // *** REMOVE FROM EVENTS           
    
        let eventIndex = events.findIndex(event => event.title === courseToUpdate.course_code && event.name === courseToUpdate.course_name)
    
        // Update the events
        const newEvents = [
            ...events.slice(0, eventIndex),             
            ...events.slice(eventIndex + 1)
        ]
        if (typeOfExecute === 'delete') {
            setEvents(newEvents);
        }
        else {
            events = newEvents;
        }

        // *** REMOVE FROM PROGRAM
        let programIndex = program.findIndex((item) => item.course_code === removedItem.course_code && item.course_name === removedItem.course_name)
         
        // Update the program
        const newProgram = [
            ...program.slice(0, programIndex),             
            ...program.slice(programIndex + 1)
        ]
        if (typeOfExecute === 'delete') {
            setProgram(newProgram);
        }
        else {
            program = newProgram;   
        }        

        if (typeOfExecute === 'delete') {
            // After the program item's deletion, we are setting and initializing again the modalOpen variable and close the modal window
            setModalOpen({...modalOpen, state: 'modal', category: '', course_code: '', course_name: '', day: '', date: moment().format('YYYY-MM-DD'), fromHour: '', toHour: '', hall: [], type: '', instructor: []})
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
        else if (currAcademicSemester === 'Σεπτεμβρίου') {
            period = 'Σεπτεμβρίου';
        }
                      
        // Fill the program's object with the suitable information from the user selections
        programObject = {
            program_category : 'ΕΞΕΤΑΣΤΙΚΗΣ',
            program_study_level : studyLevelProgram,
            program_period : period,
            program_academic_year : currAcademicYear, 
            program_state : stateOfProgram, 
            main_program : program
        };

        console.log(programObject)
    }

    return (         
        <div className="program">
            {(studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' || studyLevelProgram === 'ΕΜΒΟΛΙΜΗ'?  (courses.length === 0 || firstYearCourses.length === 0) : postgraduateFields.length === 0) ? 
                <Loader/> : 
            <div className="scroll">
                <div className="StartEnd">
                    <span>Παρακαλώ ορίστε την έναρξη και τη λήξη της εξεταστικής περιόδου πριν προχωρήσετε στη δημιουργία του προγράμματος :</span>
                    <div className="info" id='StartEndInfo'>
                        <div className="header">
                            <FcCalendar className="icon"/>
                            <div className="text">                     
                                <p>{currAcademicSemester === 'Εαρινό Εξάμηνο' ? 'Εξεταστική Εαρινού Εξαμήνου Ακαδημαϊκού Έτους  ' + currAcademicYear : 'Εξεταστική Χειμερινού Εξαμήνου Ακαδημαϊκού Έτους  '  + currAcademicYear} </p>
                            </div>
                        </div>
                        <div className="dates">
                            <div className="input_label">
                                <div className="label">Ημερομηνία Έναρξης</div>
                                <input className="input" type="date" value={startDateExam} onChange={(e) => {setStartDateExam(e.target.value); document.getElementById('StartEndInfo').getElementsByClassName('invalid_feedback')[0].style.display = 'none'}}></input>
                            </div>
                            <div className="input_label">
                                <div className="label">Ημερομηνία Λήξης</div>
                                <input className="input" type="date" value={endDateExam} onChange={(e) => {setEndDateExam(e.target.value); document.getElementById('StartEndInfo').getElementsByClassName('invalid_feedback')[0].style.display = 'none'}}></input>
                            </div>
                        </div>
                        <div className="invalid_feedback">* Παρακαλώ καταχωρήστε έγκυρες ημερομηνίες ! Η ημερομηνία έναρξης έπεται της ημερομηνίας λήξης !</div> 
                    </div>
                </div>
                <div className="program_creator" onClick={()=> {checkLocked()}}>            
                    <div className="timetable_postgraduate">
                        <div className="program_header">
                            <img src={LOGO} alt="" className="uth_logo"></img>
                            <div className="program_title">{typeOfProgram}</div>
                            <div className="header_info">
                                <div className="academic_year">Ακαδημαϊκό Έτος
                                    <select value={currAcademicYear} onChange={(e) => currAcademicYear = e.target.value}>
                                        {acadYears.map(item => {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                    <br></br>
                                    <select value={currAcademicSemester} onChange={(e) => currAcademicSemester = e.target.value}>
                                        <option value='Χειμερινό Εξάμηνο'>Χειμερινό Εξάμηνο</option>
                                        <option value='Εαρινό Εξάμηνο'>Εαρινό Εξάμηνο</option>
                                    </select>
                                </div>
                                <div className="studies">{studyLevelProgram}</div>
                            </div>
                        </div>
                        <div ref={dropCourse} style={{pointerEvents : locked === 'locked' ? 'none' : 'all'}}>
                        <DndCalendar 
                            views={views}
                            selectable   
                            dragFromOutsideItem={dragFromOutsideItem}
                            onDropFromOutside={(e)=> dropFromOutsideMenu(e)}                            
                            onSelectSlot={(e) => handleSelectSlot(e)}
                            onSelectEvent={(e) => handleSelectEvent(e)}
                            onEventDrop={(e) => moveEvent(e)} 
                            //resizable 
                            //onEventResize={(e) => resizeEvent(e)}
                            localizer={localizer}
                            events={events}
                            startAccessor={"start"}
                            endAccessor={"end"} 
                            showAllEvents                                
                            dayPropGetter={calendarStyle} 
                            style={{ height: 'fit-content' }} />
                        </div>  
                    </div>
                    <div className="selection_area">
                        <div className="preparation">
                            <div className="create_new">
                                <button className="create_new_button" onClick={() => { setModalOpen({ ...modalOpen, state: 'modal show', category: 'create', course_code: "", course_name:'', day: '', date: moment().format('YYYY-MM-DD'), fromHour: "", toHour: "", hall: [], type: "", instructor: [] }) }}>
                                    Δημιουργία Προγράμματος
                                </button>
                            </div>
                            {studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' ?
                                <div className="text">Μαθήματα <p>ΠΠΣ</p> ανά έτος</div> :
                                studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' ?
                                <div className="text">Μαθήματα <p>ΠΜΣ</p> ανά Γνωστικό Αντικείμενο</div> :
                                studyLevelProgram === 'ΕΜΒΟΛΙΜΗ' ?
                                <div className="text">Μαθήματα <p>ΠΠΣ</p> (Εμβόλιμη Εξεταστική)</div> :
                                <div className="text">Μαθήματα <p>ΙΣΟΤΙΜΙΑΣ</p> ανά έτος</div>
                            }
                            <div className="courses">
                                {studyLevelProgram === 'ΠΡΟΠΤΥΧΙΑΚΟ' || studyLevelProgram === 'ΕΜΒΟΛΙΜΗ' ?
                                    <ul>
                                        <li id='List_1'>
                                            <div className="li_item" onClick={() => { handleClick('List_1') }}>
                                                <div className="li_text">1ο Έτος</div>
                                                <IoIosArrowDropdownCircle className="li_icon" />
                                                <IoIosArrowDropupCircle className="li_icon2" />
                                            </div>
                                            <div className='sub_menu'>
                                                {firstYearCourses.map((item, x) => {
                                                    return (
                                                        <div key={x} onDragEnd={() => setDraggedEvent(item)}>
                                                            { completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                <SubMenuItem
                                                                    {...item}
                                                                    item={item}
                                                                    keyProp={x}
                                                                    className="submenu_item"
                                                                    divType='submenu_item'
                                                                    index={x} 
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
                                                                            divType='submenu_item'
                                                                            index={x} 
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
                                            <div className="li_item" onClick={() => { handleClick('List_2') }}>
                                                <div className="li_text">2ο Έτος</div>
                                                <IoIosArrowDropdownCircle className="li_icon" />
                                                <IoIosArrowDropupCircle className="li_icon2" />
                                            </div>
                                            <div className='sub_menu'>
                                                {secondYearCourses.map((item, x) => {
                                                    return (
                                                        <div key={x}>
                                                            { completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                <SubMenuItem
                                                                    {...item}
                                                                    item={item}
                                                                    keyProp={x}
                                                                    className="submenu_item"
                                                                    divType='submenu_item'
                                                                    index={x} 
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
                                                                            divType='submenu_item'
                                                                            index={x} 
                                                                        ></SubMenuItem>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </li>
                                        <li id='List_3' onClick={() => handleClick('List_3')}>
                                            <div className="li_item">
                                                <div className="li_text">3ο Έτος</div>
                                                <IoIosArrowDropdownCircle className="li_icon" />
                                                <IoIosArrowDropupCircle className="li_icon2" />
                                            </div>
                                            <div className="sub_menu">
                                                {thirdYearCourses.map((item, x) => {
                                                    return (
                                                        <div key={x}>
                                                            { completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                <SubMenuItem
                                                                    {...item}
                                                                    item={item}
                                                                    keyProp={x}
                                                                    className="submenu_item"
                                                                    divType='submenu_item'
                                                                    index={x} 
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
                                                                            divType='submenu_item'
                                                                            index={x} 
                                                                        ></SubMenuItem>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </li>
                                        <li id='List_4' onClick={() => handleClick('List_4')}>
                                            <div className="li_item">
                                                <div className="li_text">4ο Έτος</div>
                                                <IoIosArrowDropdownCircle className="li_icon" />
                                                <IoIosArrowDropupCircle className="li_icon2" />
                                            </div>
                                            <div className="sub_menu">
                                                {fourthYearCourses.map((item, x) => {
                                                    return (
                                                        <div key={x}>
                                                            { completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                <SubMenuItem
                                                                    {...item}
                                                                    item={item}
                                                                    keyProp={x}
                                                                    className="submenu_item"
                                                                    divType='submenu_item'
                                                                    index={x} 
                                                                ></SubMenuItem>
                                                                :
                                                                <div className  ='non_selectable' unselectable="on" style={{display:'flex', alignItems:'center', justifyContent :'justify', userSelect:'none', pointerEvents: 'none'}}> 
                                                                    <FcOk style={{opacity : '1', fontSize:'1.5rem', width : '40%', flex:'2', justifySelf : 'left'}}/>
                                                                    <div style={{opacity : '0.65', flex:'3'}}>
                                                                        <SubMenuItem
                                                                            {...item.course}
                                                                            item={item.course}
                                                                            keyProp={x}
                                                                            className="submenu_item"
                                                                            divType='submenu_item'
                                                                            index={x} 
                                                                        ></SubMenuItem>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </li>
                                        <li id='List_5' onClick={() => handleClick('List_5')}>
                                            <div className="li_item">
                                                <div className="li_text">5ο Έτος</div>
                                                <IoIosArrowDropdownCircle className="li_icon" />
                                                <IoIosArrowDropupCircle className="li_icon2" />
                                            </div>
                                            <div className="sub_menu">
                                                {fifthYearCourses.map((item, x) => {
                                                    return (
                                                        <div key={x}>
                                                            { completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                <SubMenuItem
                                                                    {...item}
                                                                    item={item}
                                                                    keyProp={x}
                                                                    className="submenu_item"
                                                                    divType='submenu_item'
                                                                    index={x} 
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
                                                                            divType='submenu_item'
                                                                            index={x} 
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
                                    studyLevelProgram === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' ?
                                    <ul>
                                        {postgraduateFields.map((field, index) => { 
                                            return (
                                                <li id={"List_" + index} key={index} onClick={() => handleClick("List_" + index)}>
                                                    <div className="li_item">
                                                        <div className="li_text">{field._id}</div>
                                                        <IoIosArrowDropdownCircle className="li_icon" />
                                                        <IoIosArrowDropupCircle className="li_icon2" />
                                                    </div>
                                                    <div className="sub_menu">
                                                        {field.courses.map((item, x) => {
                                                            if (item?.InfoFromInstructor?.typeOfExam.length === 0) {
                                                                item = ({course : item, type : ""}); 
                                                            } 
                                                            else {
                                                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΘΕΩΡΙΑ')) { 
                                                                    if(item?.InfoFromInstructor?.typeOfExam.length >= 2) {   
                                                                        item = ({course : item, type : "ΘΕΩΡΙΑ"});                                            
                                                                    }
                                                                    else {
                                                                        item = ({course : item, type : ""}); 
                                                                    }
                                                                }
                                                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΤΗΡΙΟ')) {
                                                                    item = ({course : item, type : "ΕΡΓΑΣΤΗΡΙΟ"});  
                                                                }
                                                                if (item?.InfoFromInstructor?.typeOfExam.includes('ΕΡΓΑΣΙΕΣ')) { 
                                                                    item = ({course : item, type : "ΕΡΓΑΣΙΕΣ"});   
                                                                }
                                                            } 
                                                            return (
                                                                <div key={x}>
                                                                    {completedProgramCourses.filter(completed => completed.course_code === item.course.StudyProgram.course_code && completed.course_name.includes(item.type)).length === 0 ?
                                                                        <SubMenuItem
                                                                            {...item}
                                                                            item={item}
                                                                            keyProp={x}
                                                                            className="submenu_item"
                                                                            divType='submenu_item'
                                                                            index={x}  
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
                                                                                    divType='submenu_item'
                                                                                    index={x}   
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
                                    </ul> : 
                                null
                                }
                            </div>                            
                        </div>
                        <div className="StoreButtons">
                            {program.length > 1 ?
                            <>
                            <div className="btn StoreForNowButton" onClick={() => prepareStore('ΠΡΟΣΩΡΙΝΟ')}>Προσωρινή Αποθήκευση</div>
                            <div className="btn StoreForAlways" onClick={() => prepareStore('ΟΡΙΣΤΙΚΟ')}>Δημιουργία</div></> : null}
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
                                        <div className="close_button" onClick={() =>{ document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'none'; setModalOpen({ ...modalOpen, state: 'modal', category: '', course_code : '', course_name : '', day:'', date : moment().format('YYYY-MM-DD'), fromHour : "", toHour: "", hall: [], type : "", instructor : []})}}><IoClose className="icon" /></div>
                                    </div>
                                    <div className="modal_body">
                                        <div className="modal_row">
                                            <div className="column">
                                                <div className="form_label"><GiWhiteBook className="react_icon" />Μάθημα</div>
                                                <select className="form_control" required value={modalOpen.course_code + ' ' + modalOpen.course_name}
                                                    onChange={(e) => handleCourseChanges(e.target.value)}>
                                                    <option style={{ display: 'none' }}></option> 
                                                    {courses.map((item, x) => { 
                                                        return(            
                                                            item.type === '' ?
                                                                completedProgramCourses.filter(completed => completed.course_name === item?.course?.StudyProgram?.course_name).length === 0 ? 
                                                                <option key={x} value={item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name}>
                                                                        {item?.course?.StudyProgram?.course_code + "  " + item?.course?.StudyProgram?.course_name}</option> :
                                                                <option key={x} value={item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name} style={{display:'none'}}>
                                                                {item?.course?.StudyProgram?.course_code + "  " + item?.course?.StudyProgram?.course_name}</option>                                                                        
                                                            :  completedProgramCourses.filter(completed => completed.course_name === item?.course?.StudyProgram?.course_name + " (" + item?.type + ")").length === 0 ? 
                                                            <option key={x} value={item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name + " (" + item?.type + ")"}>
                                                                        {item?.course?.StudyProgram?.course_code + "  " + item?.course?.StudyProgram?.course_name  + " (" + item?.type + ")"}</option> : 
                                                            <option key={x} value={item?.course?.StudyProgram?.course_code + " " + item?.course?.StudyProgram?.course_name + " (" + item?.type + ")"} style={{display : 'none'}}>
                                                            {item?.course?.StudyProgram?.course_code + "  " + item?.course?.StudyProgram?.course_name  + " (" + item?.type + ")"}</option>                                                 
                                                        )
                                                    })}
                                                </select>
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε ένα έγκυρο Μάθημα</div>
                                            </div>

                                            <div className="column" id='Date_Day'>
                                                <div className="form_label"><IoCalendar className="react_icon" />Ημερομηνία και Ημέρα</div>
                                                <div className="inside_row"> 
                                                    <input className="form_control" type="date" required value={modalOpen.date} onChange={(e) => setModalOpen({...modalOpen, date:e.target.value})}></input>                                                
                                                    Ημέρα: 
                                                    <select className="form_control" required value={modalOpen.day} disabled onChange={(e) => setModalOpen({...modalOpen, day:e.target.value})}>
                                                        <option style={{display:'none'}}></option>
                                                        <option value='Δευτέρα'>Δευτέρα</option>
                                                        <option value='Τρίτη'>Τρίτη</option>
                                                        <option value='Τετάρτη'>Τετάρτη</option>
                                                        <option value='Πέμπτη'>Πέμπτη</option>
                                                        <option value='Παρασκευή'>Παρασκευή</option>
                                                        <option value='Σάββατο'>Σάββατο</option>
                                                        <option value='Κυριακή'>Κυριακή</option>
                                                    </select>                                                                                                                                                                                            
                                                </div>                                                                                                    
                                                <div style={{display:modalOpen.day!=='' ? 'none' : 'flex'}} className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Ημέρα</div>
                                            </div> 

                                            <div className="column" id = 'Hour'>
                                                <div className="form_label"><BsClockFill className="react_icon" />Ώρα</div>
                                                <div className="inside_row">
                                                    Από <select className="form_control" required value={modalOpen.fromHour}  onChange={(e)=>{setModalOpen({...modalOpen, fromHour:e.target.value})}}>
                                                        <option style={{ display: 'none' }}></option>
                                                        {Array.from(range(8, 21, 1), (item, x) => {
                                                            return (
                                                                <option key={x} value={item}>{item + ':00'}</option>
                                                            )
                                                        })}
                                                    </select> έως
                                                    <select className="form_control" required value={modalOpen.toHour}  onChange={(e)=>{setModalOpen({...modalOpen, toHour:e.target.value})}}>
                                                        <option style={{ display: 'none' }}></option>
                                                        {Array.from(range(8, 22, 1), (item, x) => {
                                                            return (
                                                                modalOpen.fromHour !== "" ?
                                                                    item > modalOpen.fromHour ?
                                                                        <option key={x} value={item}>{item + ':00'}</option> : null :
                                                                    <option key={x} value={item}>{item + ':00'}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                { modalOpen.type === 'Θεωρία'?
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Διάρκεια Εξέτασης (3 ώρες)</div> : <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Διάρκεια Εξέτασης (όχι μικρότερη από 2 ώρες)</div>}
                                            </div>

                                            <div className="column">
                                                <div className="form_label"><BsFillBuildingFill className="react_icon" />Αίθουσα</div>
                                                <Select                                                     
                                                    closeMenuOnSelect = {false} 
                                                    escapeClearsValue
                                                    className="form_select" classNamePrefix="react-select" 
                                                    isMulti 
                                                    required 
                                                    placeholder = 'Επιλέξτε Αίθουσα Εξέτασης'
                                                    options={halls.length > 0 ? halls : null} 
                                                    styles={colourStyles}                                             
                                                    components={animatedComponents}
                                                    value={modalOpen.hall}
                                                    onChange={(e)=>{e?.length !== 0 ? setModalOpen({...modalOpen, hall:e}) : setModalOpen({...modalOpen, hall:[]})}}>                                                     
                                                </Select>
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε μία έγκυρη Αίθουσα</div>
                                            </div>

                                            <div className="column" id = 'Type'>
                                                <div className="form_label"><FaEdit className="react_icon" />Τύπος Εξέτασης</div>   
                                                    <select className="form_control" required value={modalOpen.type} onChange={(e) => {setModalOpen({...modalOpen, type:e.target.value})}}>
                                                        <option style={{display:'none'}}></option>
                                                        <option value='Θεωρία'>Θεωρία</option>
                                                        <option value='Εργαστήριο'>Εργαστήριο</option> 
                                                    </select>  
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε έναν έγκυρο τύπο εξέτασης</div>
                                                <div className="invalid_type">* Ο τύπος εξέτασης ({modalOpen.type}) δε συμβαδίζει με το είδος του μαθήματος {modalOpen.type === 'Θεωρία' ? '(Εργαστήριο)' : '(Θεωρία)'}</div>                                                                                                                                                                                                                                                                                                                                                                                    
                                            </div>   
                                            <div className="column">
                                                <div className="form_label"><IoMan className="react_icon" />Εξεταστής</div>
                                                {modalOpen.course_code !== "" ?  
                                                    <Select                                                     
                                                        closeMenuOnSelect = {true} 
                                                        escapeClearsValue
                                                        className="form_select" classNamePrefix="react-select" 
                                                        isMulti 
                                                        required 
                                                        placeholder = 'Επιλέξτε Εξεταστή'
                                                        options={courseInstructors.length > 0 ? courseInstructors : null} 
                                                        styles={colourStyles}                                             
                                                        components={animatedComponents}
                                                        value={modalOpen.instructor}
                                                        onChange={(e)=>{ e.length !== 0 ? setModalOpen({...modalOpen, instructor:e}) : setModalOpen({...modalOpen, instructor:[]})}}>                                                     
                                                    </Select>  
                                                : <input className="form_control" required /*value={modalOpen.instructor}*/ onChange={(e)=> {e.length !== 0 ? setModalOpen({...modalOpen, instructor:[{value:e.target.value, label:e.target.value}]}) : setModalOpen({...modalOpen, instructor:[]})}}></input>
                                                }   
                                                <div className="invalid_feedback">* Παρακαλώ καταχωρήστε έναν έγκυρο Εξεταστή</div>
                                            </div>

                                        </div>
                                        <div className="modal_row">
                                            { modalOpen.category === 'update' ?
                                            <div className="DeleteButton" onClick={()=>handleDeleteButton('delete')}><RiDeleteBin2Fill style={{verticalAlign:'middle', alignItems:'center', color:'#d30a0a'}}/>Διαγραφή</div> : null }
                                            <div className="buttons">
                                                <div className="CancelButton" onClick={() =>{document.getElementById('Type').getElementsByClassName('invalid_type')[0].style.display = 'none'; setModalOpen({ ...modalOpen, state: 'modal', category: '', course_code: "", course_name:"", date:"", day: "", fromHour: "", toHour: "", hall: [{value:"", label:""}], type: "", instructor: []})}}>Άκυρο</div>
                                                <div className="SuccessButton" onClick={() => modalOpen.category === 'create' ? handleSuccessButton_create() : handleSuccessButton_update()} >{modalOpen.category === 'update' ? 'Ανανέωση' : 'Αποθήκευση'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                    <ToastContainer style={{fontFamily :'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}}
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
            </div>}
        </div>
    )
}

export default TimetablePostGraduate;