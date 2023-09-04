import React, { useCallback, useState, useEffect} from "react";

import {TiDelete} from 'react-icons/ti';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  
import { ToastContainer, toast } from "react-toastify";

//Icons
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 

// Components (MODAL)
import CalendarModal from '../../../../components/MODALS/CalendarModal';


// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/calendarContainer.scss';
import moment from "moment/moment";  

const CalendarContainer_Undergraduate = (props) => {
    //Determine the academic year of the calendar given by the user or the next/new by default
    const academicYear = props.academicYear; 
    
    // Setting and initialize the error pointer array
    let [isValid, setIsValid] = useState(new Array(61).fill().map((item, idx) => idx === undefined));

    // Setting and initialize the objects that will store the input data of the academic  UNDERGRADUATE semesters
    
    // *** WINTER - AUTUMN SEMESTER
    let [winterSemester, setWinterSemester] = useState({
        courses_startDay: '', courses_startDate: moment().format('YYYY-MM-DD'),
        courses_endDay: '', courses_endDate: moment().format('YYYY-MM-DD'),
        courses_duration_weeks : 0,
        exams_startDay: '', exams_startDate: moment().format('YYYY-MM-DD'),
        exams_endDay: '', exams_endDate: moment().format('YYYY-MM-DD'),
        exams_duration_weeks : 0,
        oaths : [], feasts : [],
        fromHoliday_day : '', fromHoliday_date: moment().format('YYYY-MM-DD'), 
        toHoliday_day :'', toHoliday_date: moment().format('YYYY-MM-DD'),
        courseReport_startDay : '', courseReport_startDate : moment().format('YYYY-MM-DD'),
        courseReport_endDay : '', courseReport_endDate : moment().format('YYYY-MM-DD'),
        booksReport_startDay : '', booksReport_startDate : moment().format('YYYY-MM-DD'),
        booksReport_endDay : '', booksReport_endDate : moment().format('YYYY-MM-DD'),
        DiplomaThesisReport_startDay : '', DiplomaThesisReport_startDate : moment().format('YYYY-MM-DD'),
        DiplomaThesisReport_endDay : '', DiplomaThesisReport_endDate : moment().format('YYYY-MM-DD')
    })
    // *** SPRING - SUMMER SEMESTER
    let [springSemester, setSpringSemester] = useState({
        courses_startDay: '', courses_startDate: moment().format('YYYY-MM-DD'),
        courses_endDay: '', courses_endDate: moment().format('YYYY-MM-DD'),
        courses_duration_weeks : 0,
        exams_startDay: '', exams_startDate: moment().format('YYYY-MM-DD'),
        exams_endDay: '', exams_endDate: moment().format('YYYY-MM-DD'),
        exams_duration_weeks : 0,
        oaths : [], feasts : [],
        fromHoliday_day : '', fromHoliday_date: moment().format('YYYY-MM-DD'), 
        toHoliday_day :'', toHoliday_date: moment().format('YYYY-MM-DD'),
        courseReport_startDay : '', courseReport_startDate : moment().format('YYYY-MM-DD'),
        courseReport_endDay : '', courseReport_endDate : moment().format('YYYY-MM-DD'),
        booksReport_startDay : '', booksReport_startDate : moment().format('YYYY-MM-DD'),
        booksReport_endDay : '', booksReport_endDate : moment().format('YYYY-MM-DD'),
        DiplomaThesisReport_startDay : '', DiplomaThesisReport_startDate : moment().format('YYYY-MM-DD'),
        DiplomaThesisReport_endDay : '', DiplomaThesisReport_endDate : moment().format('YYYY-MM-DD')
    })

    // *** SEPTEMBER
    let [septemberSemester, setSeptemberSemester] = useState({
        repeatExam_startDay : '', repeatExam_startDate : moment().format('YYYY-MM-DD'),
        repeatExam_endDay : '', repeatExam_endDate : moment().format('YYYY-MM-DD'),
        repeatExam_duration_weeks : 0,
    }) 

     // Setting the state variable that we will use to open-close the modal window for the success of academic calendar creation
     const [showModal, setShowModal] = useState(false); 
   
   // Function that help us to determine the suitable day that corressponds to the giving by the user date
    const findCorresspondingDay = useCallback((date) => {
        // Format the giving date
        const currDate = new Date(date);
        // By the correct format of the date, determine the corressponding day
        const currDayNumber = currDate.getDay();
        
        // Determine the day by its number
        let currDay = '';
        if (currDayNumber === 0) { currDay = 'Κυριακή' }
        else if (currDayNumber === 1) { currDay = 'Δευτέρα' }
        else if (currDayNumber === 2) { currDay = 'Τρίτη' }
        else if (currDayNumber === 3) { currDay = 'Τετάρτη' }
        else if (currDayNumber === 4) { currDay = 'Πέμπτη' }
        else if (currDayNumber === 5) { currDay = 'Παρασκευή' }
        else if (currDayNumber === 6) { currDay = 'Σάββατο' }
         
        return (currDay)
    },[])

    useEffect(()=>{
     // Determine the known feasts of the winter-autumn semester  
        let feastArray = []; 
        // Εθνική Επέτειος
        let date = Number(academicYear.split("-")[0]) + '-10-28';
        let day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        let feast = day + ' ' + moment(date).format('DD/MM/YYYY') + ' (Εθνική Επέτειος)';
        feastArray.push(feast);
        // Επέτειος Πολυτεχνείου
        date = academicYear.split("-")[0] + '-11-17'; 
        day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        feast = day + ' ' + moment(date).format('DD/MM/YYYY') +' (Επέτειος Πολυτεχνείου)';    
        feastArray.push(feast);
        // Εορτή Αγ. Νικολάου – Πολιούχος
        date = academicYear.split("-")[0] + '-12-06';
        day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        feast = day + ' ' + moment(date).format('DD/MM/YYYY') +' (Εορτή Αγ. Νικολάου – Πολιούχος)';    
        feastArray.push(feast);        
        // Εορτή των Θεοφανίων
        date = academicYear.split("-")[1] + '-01-06';
        day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        feast = day + ' ' + moment(date).format('DD/MM/YYYY') +' (Εορτή των Θεοφανίων)';    
        feastArray.push(feast);
        // Εορτή Τριών Ιεραρχών
        date = academicYear.split("-")[1] + '-01-30';
        day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        feast = day + ' ' + moment(date).format('DD/MM/YYYY') +' (Εορτή Τριών Ιεραρχών)';    
        feastArray.push(feast);
        // Store them to the suitable array
        setWinterSemester(winterSemester=> ({...winterSemester, feasts:feastArray}))
    //}
    }, [academicYear, findCorresspondingDay])

    useEffect(() => {       
    // Determine the known feasts of the spring-summer semester  
        let feastArray = []; 
        // Εθνική Επέτειος
        let date = Number(academicYear.split("-")[1]) + '-03-25';
        let day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        let feast = day + ' ' + moment(date).format('DD/MM/YYYY') + ' (Εθνική Επέτειος)';
        feastArray.push(feast);
        // Πρωτομαγιά
        date = Number(academicYear.split("-")[1]) + '-05-01'; 
        day = findCorresspondingDay(moment(date).format('YYYY-MM-DD'))
        feast = day + ' ' + moment(date).format('DD/MM/YYYY') +' (Πρωτομαγιά)';    
        feastArray.push(feast);  
        // Store them to the suitable array
        setSpringSemester(springSemester=> ({...springSemester, feasts:feastArray}))
    }, [academicYear, findCorresspondingDay])
    
    // *** WINTER - AUTUMN SEMESTER

    // Handle courses date input changes
    useEffect(() => {  // START COURSES' DATE
        const day = findCorresspondingDay(winterSemester.courses_startDate);
        setWinterSemester(winterSemester => ({...winterSemester, courses_startDay : day}))
        // Validate the courses' start date 
        const selectedYear = new Date(winterSemester.courses_startDate).getFullYear();
        const selectedMonth = new Date(winterSemester.courses_startDate).getMonth() + 1;
         
        if (selectedYear !== Number(academicYear.split("-")[0])) {
            isValid[0] = false; 
            isValid[1] = false;
            document.getElementById('winter_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 9 || selectedMonth > 10) {
            isValid[0] = false;
            isValid[1] = false
            document.getElementById('winter_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[0] = true;
            isValid[1] = true
            document.getElementById('winter_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.courses_startDate, academicYear, findCorresspondingDay]);
    
    useEffect(() => {  // END COURSES' DATE
        const day = findCorresspondingDay(winterSemester.courses_endDate);
        setWinterSemester(winterSemester => ({...winterSemester, courses_endDay : day}))
        // Validate the courses' start date 
        const selectedYear = new Date(winterSemester.courses_endDate).getFullYear();
        const selectedMonth = new Date(winterSemester.courses_endDate).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[2] = false;
            isValid[3] = false;
            document.getElementById('winter_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 1 || selectedMonth > 2) {
            isValid[2] = false;
            isValid[3] = false;
            document.getElementById('winter_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[2] = true;
            isValid[3] = true;
            document.getElementById('winter_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.courses_endDate, academicYear, findCorresspondingDay]); 
        
    
    // Handle exams date input changes
    useEffect(() => {  // START EXAMS' DATE
        const day = findCorresspondingDay(winterSemester.exams_startDate);
        setWinterSemester(winterSemester => ({...winterSemester, exams_startDay : day}))
        // Validate the exams' start date 
        const selectedYear = new Date(winterSemester.exams_startDate).getFullYear();
        const selectedMonth = new Date(winterSemester.exams_startDate).getMonth() + 1;
         
        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[5] = false
            isValid[6] = false
            document.getElementById('winter_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 1 || selectedMonth > 1) {
            isValid[5] = false
            isValid[6] = false
            document.getElementById('winter_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[5] = true
            isValid[6] = true
            document.getElementById('winter_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.exams_startDate, academicYear, findCorresspondingDay]);
    
    useEffect(() => {  // END EXAMS' DATE
        const day = findCorresspondingDay(winterSemester.exams_endDate);
        setWinterSemester(winterSemester => ({...winterSemester, exams_endDay : day}))
        // Validate the exams' end date 
        const selectedYear = new Date(winterSemester.exams_endDate).getFullYear();
        const selectedMonth = new Date(winterSemester.exams_endDate).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[7] = false
            isValid[8] = false
            document.getElementById('winter_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 1 || selectedMonth > 2) {
            isValid[7] = false
            isValid[8] = false
            document.getElementById('winter_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[7] = true;
            isValid[8] = true;
            document.getElementById('winter_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.exams_endDate, academicYear, findCorresspondingDay]); 
      
    // Handle holidays input changes
    useEffect(() => {
        const day = findCorresspondingDay(winterSemester.fromHoliday_date);
        setWinterSemester(winterSemester => ({...winterSemester, fromHoliday_day:day}))
        // Validate the holidays' from date 
        const selectedYear = new Date(winterSemester.fromHoliday_date).getFullYear();
        const selectedMonth = new Date(winterSemester.fromHoliday_date).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[0])) {
            isValid[12] = false;
            isValid[13] = false;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth !== 12) {
            isValid[12] = false;
            isValid[13] = false;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[12] = true;
            isValid[13] = true;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.fromHoliday_date, academicYear, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(winterSemester.toHoliday_date);
        setWinterSemester(winterSemester => ({...winterSemester, toHoliday_day: day}))
        // Validate the holidays' end date 
        const selectedYear = new Date(winterSemester.toHoliday_date).getFullYear();
        const selectedMonth = new Date(winterSemester.toHoliday_date).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[14] = false;
            isValid[15] = false;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth !== 1) {
            isValid[14] = false;
            isValid[15] = false;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[14] = true;
            isValid[15] = true;
            document.getElementById('winter_holidays').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [winterSemester.toHoliday_date, findCorresspondingDay, academicYear])

     // Handle courses' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(winterSemester.courseReport_startDate);
        setWinterSemester(winterSemester => ({...winterSemester, courseReport_startDay:day})) 
        isValid[16] = true;
        isValid[17] = true;
       
    }, [winterSemester.courseReport_startDate, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(winterSemester.courseReport_endDate);
        setWinterSemester(winterSemester => ({...winterSemester, courseReport_endDay: day})) 
        isValid[18] = true;
        isValid[19] = true;
    }, [winterSemester.courseReport_endDate, findCorresspondingDay])

     // Handle books' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(winterSemester.booksReport_startDate);
        setWinterSemester(winterSemester => ({...winterSemester, booksReport_startDay:day})) 
        isValid[20] = true;
        isValid[21] = true;

    }, [winterSemester.booksReport_startDate, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(winterSemester.booksReport_endDate);
        setWinterSemester(winterSemester => ({...winterSemester, booksReport_endDay: day})) 
        isValid[22] = true;
        isValid[23] = true;
    }, [winterSemester.booksReport_endDate, findCorresspondingDay])

     // Handle Diploma Thesis' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(winterSemester.DiplomaThesisReport_startDate);
        setWinterSemester(winterSemester => ({...winterSemester, DiplomaThesisReport_startDay:day}))   
        isValid[24] = true;
        isValid[25] = true;      
       
    }, [winterSemester.DiplomaThesisReport_startDate, findCorresspondingDay])

    useEffect(() => {

        let fromDate = new Date(winterSemester.booksReport_startDate).getTime();
        let toDate = new Date(winterSemester.booksReport_endDate).getTime();

        if ((winterSemester.booksReport_startDate !== undefined || winterSemester.booksReport_endDate !== undefined) && (!isNaN(toDate) || !isNaN(toDate)) && (toDate < fromDate)) {
            if (document.getElementById('winter_booksReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('winter_booksReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex' ) {
                document.getElementById('winter_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_booksReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('winter_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_booksReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                isValid[18] = false
                isValid[19] = false            
            }
            else {
                document.getElementById('winter_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('winter_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isValid[18] = true
                isValid[19] = true  
            }            
        }

    }, [winterSemester.booksReport_startDate, winterSemester.booksReport_startDay])

    useEffect(() => {

        let fromDate = new Date(winterSemester.courseReport_startDate).getTime();
        let toDate = new Date(winterSemester.courseReport_endDate).getTime();

        if ((winterSemester.courseReport_startDate !== undefined || winterSemester.courseReport_endDate !== undefined) && ( !isNaN(toDate) || !isNaN(fromDate) ) && (toDate < fromDate)) {
            if (document.getElementById('winter_coursesReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('winter_coursesReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex' ) {
                document.getElementById('winter_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_coursesReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('winter_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_coursesReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                isValid[16] = false
                isValid[17] = false
            }
            else {
                document.getElementById('winter_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('winter_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isValid[16] = true
                isValid[17] = true
            }            
        }

    }, [winterSemester.courseReport_startDate, winterSemester.courseReport_endDate])


    useEffect(() => {

        let fromDate = new Date(winterSemester.DiplomaThesisReport_startDate).getTime();
        let toDate = new Date(winterSemester.DiplomaThesisReport_endDate).getTime();

        if ((winterSemester.DiplomaThesisReport_startDate !== undefined || winterSemester.DiplomaThesisReport_endDate !== undefined) && ( !isNaN(toDate) || !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'

            }
            else {
                document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }

    }, [winterSemester.DiplomaThesisReport_startDate, winterSemester.DiplomaThesisReport_endDate])

    useEffect(() => {
        const day = findCorresspondingDay(winterSemester.DiplomaThesisReport_endDate);
        setWinterSemester(winterSemester => ({...winterSemester, DiplomaThesisReport_endDay: day})) 
        isValid[26] = true;
        isValid[27] = true;
    }, [winterSemester.DiplomaThesisReport_endDate, findCorresspondingDay])

    // Calculate the duration of the dates for the Diploma Thesis Reports 
       useEffect (() => {   
        if (winterSemester.exams_startDate !== undefined && winterSemester.exams_endDate !== undefined) { 
            const date = moment(winterSemester.exams_endDate).add(1, 'week').format('YYYY-MM-DD');
            setWinterSemester(winterSemester=> ({...winterSemester, DiplomaThesisReport_startDate:winterSemester.exams_startDate, DiplomaThesisReport_endDate : date}))
            handleClickInputDate('winter_DiplomaThesisReport_start',  date); 
            handleClickInputDate('winter_DiplomaThesisReport_end',  date); 
        }     

    }, [winterSemester.exams_startDate, winterSemester.exams_endDate])

    // Calculate the duration of the courses every time the values of start date and enddate change
    // Also check for the time validation of the given dates 
    useEffect (() => {  
        let coursesDuration = 0;
        if (winterSemester.courses_startDate !== undefined && winterSemester.courses_endDate !== undefined) {
            coursesDuration = moment(winterSemester.courses_endDate).diff(winterSemester.courses_startDate, 'weeks');
        } 
        if ( coursesDuration === 0|| coursesDuration - 1 < 0 || isNaN(coursesDuration) ||  isNaN(coursesDuration - 1) ) {            
            setWinterSemester(winterSemester => ({...winterSemester, courses_duration_weeks : 0}))      
        }
        else { 
            setWinterSemester(winterSemester => ({...winterSemester, courses_duration_weeks : coursesDuration - 1}))  
                            
        }
        handleClickInputDate('winter_courses_duration', coursesDuration);   

        let fromDate = new Date(winterSemester.courses_startDate).getTime();
        let toDate = new Date(winterSemester.courses_endDate).getTime();

        if ((winterSemester.courses_startDate !== undefined || winterSemester.courses_endDate !== undefined) && (!isNaN(toDate) || !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('winter_courses_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('winter_courses_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('winter_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('winter_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
            }
            else {
                document.getElementById('winter_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('winter_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }
        isValid[4] = true; 
 
    }, [winterSemester.courses_startDate, winterSemester.courses_endDate])

    // Calculate the duration of the exams every time the values of start date and end date change
    useEffect (() => {  
        let examsDuration = 0;
        if (winterSemester.exams_startDate !== undefined && winterSemester.exams_endDate !== undefined) {
            examsDuration = moment(winterSemester.exams_endDate).diff(winterSemester.exams_startDate, 'weeks');
        }       
        if ( examsDuration === 0|| examsDuration +1 < 0 || isNaN(examsDuration) ||  isNaN(examsDuration + 1) ) {            
            setWinterSemester(winterSemester => ({...winterSemester, exams_duration_weeks : 0}))      
        }
        else { 
            setWinterSemester(winterSemester => ({...winterSemester, exams_duration_weeks : examsDuration + 1}))      
        }
        handleClickInputDate('winter_exams_duration', examsDuration);   

        let fromDate = new Date(winterSemester.exams_startDate).getTime();
        let toDate = new Date(winterSemester.exams_endDate).getTime();

        if ((winterSemester.exams_startDate !== undefined || winterSemester.exams_endDate !== undefined) && ( !isNaN(toDate) ||  !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('winter_exams_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('winter_exams_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('winter_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('winter_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('winter_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
            }
            else {
                document.getElementById('winter_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('winter_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }
        isValid[9] = true; 
    }, [winterSemester.exams_startDate, winterSemester.exams_endDate])

    console.log(isValid)

    // Function that add new oath peiriods in the suitable field of the academic semester object
    const addTags = (semester, category, event) => {     
        // *** WINTER SEMESTER  
        if (semester === winterSemester && category === 'oaths') {
            let inTags = winterSemester.oaths;
            if (event.key === "Enter" && event.target.value !== "") {
                inTags.push(event.target.value);
                setWinterSemester({...winterSemester, oaths : inTags})
                event.target.value = "";
            }
        }
        else if (semester === winterSemester && category === 'feasts') {
            let inTags = winterSemester.feasts;
            if (event.key === "Enter" && event.target.value !== "") {
                inTags.push(event.target.value);
                setWinterSemester({...winterSemester, feasts : inTags})
                event.target.value = "";
            }
        }
        // *** SPRING SEMESTER  
        if (semester === springSemester && category === 'oaths') {
            let inTags = springSemester.oaths;
            if (event.key === "Enter" && event.target.value !== "") {
                inTags.push(event.target.value);
                setSpringSemester({...springSemester, oaths : inTags})
                event.target.value = "";
            }
        }
        else if (semester === springSemester && category === 'feasts') {
            let inTags = springSemester.feasts;
            if (event.key === "Enter" && event.target.value !== "") {
                inTags.push(event.target.value);
                setSpringSemester({...springSemester, feasts : inTags})
                event.target.value = "";
            }
        }
    }

    // Function that help us to remove tags from oaths field
    const removeTags = (semester, category , indexToRemove) => {
        // *** WINTER SEMESTER
        if (semester === winterSemester && category === 'oaths') {
            let updatedOaths = winterSemester.oaths.filter((_,index) => index !== indexToRemove);
            setWinterSemester({...winterSemester, oaths : updatedOaths})
        } 
        if (semester === winterSemester && category === 'feasts') {
            let updatedFeasts = winterSemester.feasts.filter((_,index) => index !== indexToRemove);
            setWinterSemester({...winterSemester, feasts : updatedFeasts})
        }
        // *** SPRING SEMESTER
        if (semester === springSemester && category === 'oaths') {
            let updatedOaths = springSemester.oaths.filter((_,index) => index !== indexToRemove);
            setSpringSemester({...springSemester, oaths : updatedOaths})
        } 
        if (semester === springSemester && category === 'feasts') {
            let updatedFeasts = springSemester.feasts.filter((_,index) => index !== indexToRemove);
            setSpringSemester({...springSemester, feasts : updatedFeasts})
        }
    }

    // Function that handles the click of an input form field and sets its style
    const handleClickInputDate = (fieldName, value) => {  
        // for the case in that the input value is not empty
        if (String(value).trim().length !== 0 && String(value) !== '0') {
            if (document.getElementById(fieldName)) {
                if (fieldName !== 'winter_hol' && fieldName !== 'spring_hol') {
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#56b3ca';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '550';
                }
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.color = '#5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = ' 1px solid #5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '3.2px solid hsla(184, 56%, 68%, 0.369)';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid white';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid white';
                document.getElementById(fieldName).getElementsByClassName('day')[0].style.color = '#5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#5ac0d9';
            }
        }
        else {
            if (document.getElementById(fieldName)) {
                if (fieldName !== 'winter_hol' && fieldName !== 'spring_hol') {
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#95949411';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '400';
                }
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid transparent';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '0px solid transparent'
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = '1px solid #959494';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#959494';
                document.getElementById(fieldName).getElementsByClassName('day')[0].style.color = '#959494';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid hsla(184, 56%, 68%, 0.369)';
            }
        }
    }

    // Function that determines the style of the click in a tag input area
    const handleTagAreaClick = (semester, fieldName) => {
        if (semester === winterSemester) {
            if (winterSemester.oaths.length > 0) {
                document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#56b3ca'; 
                document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '550';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.color = '#5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = ' 1px solid #5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '3.2px solid hsla(184, 56%, 68%, 0.369)';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid white';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid white'; 
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#5ac0d9';
            }
            else {
                if (document.getElementById(fieldName)) {
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#95949411';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.textShadow = '0.2px 0.2px 0.2px #17a2b8';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '400';
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid transparent';
                    document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '0px solid transparent'
                    document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = '1px solid #959494';
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#959494'; 
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid hsla(184, 56%, 68%, 0.369)';
                }                
            }
        }
        else if (semester === springSemester) {
            if (springSemester.oaths.length > 0) {
                document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#56b3ca'; 
                document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '550';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.color = '#5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = ' 1px solid #5ac0d9';
                document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '3.2px solid hsla(184, 56%, 68%, 0.369)';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid white';
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid white'; 
                document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#5ac0d9';
            }
            else {
                if (document.getElementById(fieldName)) {
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.color = '#95949411';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.textShadow = '0.2px 0.2px 0.2px #17a2b8';
                    document.getElementById(fieldName).getElementsByClassName('label')[0].style.fontWeight = '400';
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.border = '0px solid transparent';
                    document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.outline = '0px solid transparent'
                    document.getElementById(fieldName).getElementsByClassName('form_control_date')[0].style.border = '1px solid #959494';
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.color = '#959494'; 
                    document.getElementById(fieldName).getElementsByClassName('form_control')[0].style.outline = '0px solid hsla(184, 56%, 68%, 0.369)';
                }                
            }
        }
    }

    // ***  SPRING - SUMMER SEMESTER  

    // Handle courses date input changes
    useEffect(() => {  // START COURSES' DATE
        const day = findCorresspondingDay(springSemester.courses_startDate);
        setSpringSemester(springSemester => ({...springSemester, courses_startDay : day}))
        // Validate the courses' start date 
        const selectedYear = new Date(springSemester.courses_startDate).getFullYear();
        const selectedMonth = new Date(springSemester.courses_startDate).getMonth() + 1; 
        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[28] = false;
            isValid[29] = false;
            setSpringSemester(springSemester=> ({...springSemester, courses_duration_weeks: 0}))
            document.getElementById('spring_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 2 || selectedMonth > 3) {
            isValid[28] = false;
            isValid[29] = false;
            setSpringSemester(springSemester=>({...springSemester, courses_duration_weeks: 0}))
            document.getElementById('spring_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[28] = true;
            isValid[29] = true;
            document.getElementById('spring_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.courses_startDate, academicYear, findCorresspondingDay]);
    
    useEffect(() => {  // END COURSES' DATE
        const day = findCorresspondingDay(springSemester.courses_endDate);
        setSpringSemester(springSemester => ({...springSemester, courses_endDay : day}))
        // Validate the courses' start date 
        const selectedYear = new Date(springSemester.courses_endDate).getFullYear();
        const selectedMonth = new Date(springSemester.courses_endDate).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[30] = false;
            isValid[31] = false;
            document.getElementById('spring_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 5 || selectedMonth > 6) {
            isValid[30] = false;
            isValid[31] = false;
            document.getElementById('spring_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[30] = true;
            isValid[31] = true;
            document.getElementById('spring_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.courses_endDate, academicYear, findCorresspondingDay]); 
        
    
    // Handle exams date input changes
    useEffect(() => {  // START EXAMS' DATE
        const day = findCorresspondingDay(springSemester.exams_startDate);
        setSpringSemester(springSemester => ({...springSemester, exams_startDay : day}))
        // Validate the exams' start date 
        const selectedYear = new Date(springSemester.exams_startDate).getFullYear();
        const selectedMonth = new Date(springSemester.exams_startDate).getMonth() + 1;
         
        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[33] = false;
            isValid[34] = false;
            setSpringSemester(springSemester=>({...springSemester, exams_duration_weeks: 0}))
            document.getElementById('spring_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 5 || selectedMonth > 6) {
            isValid[33] = false;
            isValid[34] = false;
            setSpringSemester(springSemester=>({...springSemester, exams_duration_weeks: 0}))
            document.getElementById('spring_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[33] = true;
            isValid[34] = true;
            document.getElementById('spring_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.exams_startDate, academicYear, findCorresspondingDay]);
    
    useEffect(() => {  // END COURSES' DATE
        const day = findCorresspondingDay(springSemester.exams_endDate);
        setSpringSemester(springSemester => ({...springSemester, exams_endDay : day}))
        // Validate the exams' end date 
        const selectedYear = new Date(springSemester.exams_endDate).getFullYear();
        const selectedMonth = new Date(springSemester.exams_endDate).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[35] = false;
            isValid[36] = false;
            setSpringSemester(springSemester=>({...springSemester, exams_duration_weeks: 0}))
            document.getElementById('spring_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 6 || selectedMonth > 7) {
            isValid[35] = false;
            isValid[36] = false;
            setSpringSemester(springSemester=>({...springSemester, exams_duration_weeks: 0}))
            document.getElementById('spring_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[35] = true;
            isValid[36] = true;
            document.getElementById('spring_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.exams_endDate, academicYear, findCorresspondingDay]); 
      
    // Handle holidays input changes
    useEffect(() => {
        const day = findCorresspondingDay(springSemester.fromHoliday_date);
        setSpringSemester(springSemester => ({...springSemester, fromHoliday_day:day}))
        // Validate the holidays' from date 
        const selectedYear = new Date(springSemester.fromHoliday_date).getFullYear();
        const selectedMonth = new Date(springSemester.fromHoliday_date).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[40] = false;
            isValid[41] = false;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 2) {
            isValid[40] = false;
            isValid[41] = false;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[40] = true;
            isValid[41] = true;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.fromHoliday_date, academicYear, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(springSemester.toHoliday_date);
        setSpringSemester(springSemester => ({...springSemester, toHoliday_day: day}))
        // Validate the holidays' end date 
        const selectedYear = new Date(springSemester.toHoliday_date).getFullYear();
        const selectedMonth = new Date(springSemester.toHoliday_date).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[42] = false;
            isValid[43] = false;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth > 6 ) {
            isValid[42] = false;
            isValid[43] = false;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[42] = true;
            isValid[43] = true;
            document.getElementById('spring_holidays').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [springSemester.toHoliday_date, findCorresspondingDay, academicYear])

     // Handle courses' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(springSemester.courseReport_startDate);
        setSpringSemester(springSemester => ({...springSemester, courseReport_startDay:day})) 
        isValid[44] = true;
        isValid[45] = true;
    }, [springSemester.courseReport_startDate, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(springSemester.courseReport_endDate);
        setSpringSemester(springSemester => ({...springSemester, courseReport_endDay: day})) 
        isValid[46] = true;
        isValid[47] = true;
    }, [springSemester.courseReport_endDate, findCorresspondingDay])

     // Handle books' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(springSemester.booksReport_startDate);
        setSpringSemester(springSemester => ({...springSemester, booksReport_startDay:day})) 
        isValid[48] = true;
        isValid[49] = true;
    }, [springSemester.booksReport_startDate, findCorresspondingDay])

    useEffect(() => {
        const day = findCorresspondingDay(springSemester.booksReport_endDate);
        setSpringSemester(springSemester => ({...springSemester, booksReport_endDay: day})) 
        isValid[50] = true;
        isValid[51] = true;
    }, [springSemester.booksReport_endDate, findCorresspondingDay])

     // Handle Diploma Thesis' Report input changes
     useEffect(() => {
        const day = findCorresspondingDay(springSemester.DiplomaThesisReport_startDate);
        setSpringSemester(springSemester => ({...springSemester, DiplomaThesisReport_startDay:day}))    
        isValid[52] = true;
        isValid[53] = true;     
       
    }, [springSemester.DiplomaThesisReport_startDate, findCorresspondingDay])

    useEffect(() => {

        let fromDate = new Date(springSemester.booksReport_startDate).getTime();
        let toDate = new Date(springSemester.booksReport_endDate).getTime();

        if ((springSemester.booksReport_startDate !== undefined || springSemester.booksReport_endDate !== undefined) && (!isNaN(toDate) || !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('spring_booksReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('spring_booksReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex' ) {
                document.getElementById('spring_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_booksReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('spring_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_booksReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                isValid[48] = false;   isValid[49] = false;   isValid[50] = false;   isValid[51] = false;
            }
            else {
                document.getElementById('spring_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('spring_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isValid[48] = true;   isValid[49] = true;   isValid[50] = true;   isValid[51] = true;
            }            
        }

    }, [springSemester.courseReport_startDate, springSemester.courseReport_endDate])

    useEffect(() => {

        let fromDate = new Date(springSemester.courseReport_startDate).getTime();
        let toDate = new Date(springSemester.courseReport_endDate).getTime();

        if ((springSemester.courseReport_startDate !== undefined || springSemester.courseReport_endDate !== undefined) && ( !isNaN(toDate) ||!isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('spring_coursesReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('spring_coursesReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex' ) {
                document.getElementById('spring_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_coursesReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('spring_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_coursesReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                isValid[44] = false;   isValid[45] = false;   isValid[46] = false;   isValid[47] = false;
            }
            else {
                document.getElementById('spring_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('spring_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isValid[44] = true;   isValid[45] = true;   isValid[46] = true;   isValid[47] = true;
            }            
        }

    }, [springSemester.courseReport_startDate, springSemester.courseReport_endDate])


    useEffect(() => {

        let fromDate = new Date(springSemester.DiplomaThesisReport_startDate).getTime();
        let toDate = new Date(springSemester.DiplomaThesisReport_endDate).getTime();

        if ((springSemester.DiplomaThesisReport_startDate !== undefined || springSemester.DiplomaThesisReport_endDate !== undefined) && (isNaN(toDate) || isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                isValid[52] = false;   isValid[53] = false;   isValid[54] = false;   isValid[55] = false;
            }
            else {
                document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                isValid[52] = true;   isValid[53] = true;   isValid[54] = true;   isValid[55] = true;
            }            
        }

    }, [springSemester.DiplomaThesisReport_startDate, springSemester.DiplomaThesisReport_endDate])

    useEffect(() => {
        const day = findCorresspondingDay(springSemester.DiplomaThesisReport_endDate);
        setSpringSemester(springSemester => ({...springSemester, DiplomaThesisReport_endDay: day})) 
        isValid[54] = true;
        isValid[55] = true
    }, [springSemester.DiplomaThesisReport_endDate, findCorresspondingDay])

    // Calculate the duration of the dates for the Diploma Thesis Reports 
       useEffect (() => {   
        if (springSemester.exams_startDate !== undefined && springSemester.exams_endDate !== undefined) { 
            const date = moment(springSemester.exams_endDate).add(1, 'week').format('YYYY-MM-DD');
            setSpringSemester(springSemester=> ({...springSemester, DiplomaThesisReport_startDate: springSemester.exams_startDate, DiplomaThesisReport_endDate : date}))
            handleClickInputDate('spring_DiplomaThesisReport_start',  date); 
            handleClickInputDate('spring_DiplomaThesisReport_end',  date); 
        }     

    }, [springSemester.exams_startDate, springSemester.exams_endDate])

    // Calculate the duration of the courses every time the values of start date and enddate change
    // Also check for the time validation of the given dates 
    useEffect (() => {  
        let coursesDuration = 0;
        if (springSemester.courses_startDate !== undefined && springSemester.courses_endDate !== undefined) {
            coursesDuration = moment(springSemester.courses_endDate).diff(springSemester.courses_startDate, 'weeks');
        }  
        if ( coursesDuration === 0|| coursesDuration -1 < 0 || isNaN(coursesDuration) ||  isNaN(coursesDuration - 1)) {            
            setSpringSemester(springSemester => ({...springSemester, courses_duration_weeks : 0}))      
        }
        else { 
            setSpringSemester(springSemester => ({...springSemester, courses_duration_weeks : coursesDuration - 1}))      
        }
        handleClickInputDate('spring_courses_duration', coursesDuration);   

        let fromDate = new Date(springSemester.courses_startDate).getTime();
        let toDate = new Date(springSemester.courses_endDate).getTime();

        if ((springSemester.courses_startDate !== undefined || springSemester.courses_endDate !== undefined) && (!isNaN(toDate) || !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('spring_courses_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('spring_courses_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('spring_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('spring_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
            }
            else {
                document.getElementById('spring_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('spring_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }
 
        isValid[32] = true
    }, [springSemester.courses_startDate, springSemester.courses_endDate])

    // Calculate the duration of the exams every time the values of start date and end date change
    useEffect (() => {  
        let examsDuration = 0;
        if (springSemester.courses_startDate !== undefined && springSemester.courses_endDate !== undefined) {
            examsDuration = moment(springSemester.exams_endDate).diff(springSemester.exams_startDate, 'weeks');
        }              
       
        if ( examsDuration === 0|| examsDuration + 1 < 0 || isNaN(examsDuration) || isNaN(examsDuration + 1)) { 
            setSpringSemester(springSemester => ({...springSemester, exams_duration_weeks : 0}))      
        }
        else {
            console.log('ini')
            setSpringSemester(springSemester => ({...springSemester, exams_duration_weeks : examsDuration + 1}))      
        }
        handleClickInputDate('spring_exams_duration', examsDuration);   

        let fromDate = new Date(springSemester.exams_startDate).getTime();
        let toDate = new Date(springSemester.exams_endDate).getTime();

        if ((springSemester.exams_startDate !== undefined || springSemester.exams_endDate !== undefined) && (!isNaN(toDate) || !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('spring_exams_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('spring_exams_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('spring_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_exams_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('spring_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('spring_exams_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
            }
            else {
                document.getElementById('spring_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('spring_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }
        isValid[37] = true; 
    }, [springSemester.exams_startDate, springSemester.exams_endDate])  

    
     // *** REPEAT EXAMS (SEPTEMBER) 

    // Handle repeat exams date input changes
    useEffect(() => {  // START REPEAT EXAMS' DATE
        const day = findCorresspondingDay(septemberSemester.repeatExam_startDate);
        setSeptemberSemester(septemberSemester => ({...septemberSemester, repeatExam_startDay : day}))
        // Validate the exams' start date 
        const selectedYear = new Date(septemberSemester.repeatExam_startDate).getFullYear();
        const selectedMonth = new Date(septemberSemester.repeatExam_startDate).getMonth() + 1; 
        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[56] = false;
            isValid[57] = false;
            document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth < 8 || selectedMonth > 9) {
            isValid[56] = false;
            isValid[57] = false;
            document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else {
            isValid[56] = true;
            isValid[57] = true;
            document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [septemberSemester.repeatExam_startDate, academicYear, findCorresspondingDay]);
    
    useEffect(() => {  // END REPEAT EXAMS' DATE
        const day = findCorresspondingDay(septemberSemester.repeatExam_endDate);
        setSeptemberSemester(septemberSemester => ({...septemberSemester, repeatExam_endDay : day}))
        // Validate the courses' start date 
        const selectedYear = new Date(septemberSemester.repeatExam_endDate).getFullYear();
        const selectedMonth = new Date(septemberSemester.repeatExam_endDate).getMonth() + 1; 

        if (selectedYear !== Number(academicYear.split("-")[1])) {
            isValid[58] = false;
            isValid[59] = false;
            document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else if (selectedMonth !== 9) {
            isValid[58] = false;
            isValid[59] = false;
            document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'flex';
        }
        else { 
            isValid[58] = true;
            isValid[59] = true;
            document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none';
        }
    }, [septemberSemester.repeatExam_endDate, academicYear, findCorresspondingDay]); 

    // Calculate the duration of the repeat exams every time the values of start date and end date change
    useEffect (() => {  
        let examsDuration = 0;
        if (septemberSemester.repeatExam_startDate !== undefined && septemberSemester.repeatExam_endDate !== undefined) {
            examsDuration = moment(septemberSemester.repeatExam_endDate).diff(septemberSemester.repeatExam_startDate, 'weeks');
        }       
        if (examsDuration < 0) {examsDuration = 0}
        setSeptemberSemester(septemberSemester => ({...septemberSemester, repeatExam_duration_weeks : examsDuration + 1}))      
        handleClickInputDate('september_courses_duration', examsDuration);   

        let fromDate = new Date(septemberSemester.repeatExam_startDate).getTime();
        let toDate = new Date(septemberSemester.repeatExam_endDate).getTime();

        if ((septemberSemester.repeatExam_startDate !== undefined || septemberSemester.repeatExam_endDate !== undefined) && (!isNaN(toDate)|| !isNaN(fromDate)) && (toDate < fromDate)) {
            if (document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display === 'flex' || document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display === 'flex') {
                document.getElementById('september_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                document.getElementById('september_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'flex'
                document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
            }
            else {
                document.getElementById('september_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
                document.getElementById('september_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none';
            }            
        }
        isValid[60] = true; 
    }, [septemberSemester.repeatExam_startDate, septemberSemester.repeatExam_endDate])  
       
    
     // Function that manages the opening or closing of the input forms cards
     const collapseCard = (cardName) => {
        if (document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display === 'block') {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display ='none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'flex';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display ='none';
        }
        else {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display = 'block';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display = 'flex';
        }
    }

    const unCollapsedCard = (cardName) => { 
        if (document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display === 'none') {
            document.getElementById(cardName).getElementsByClassName('card_body')[0].style.display = 'block';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse_more')[0].style.display = 'none';
            document.getElementById(cardName).getElementsByClassName('card_options_collapse')[0].style.display = 'flex';
        }
    }   

    // Function that it appears the notification window afte the control of unvalid input data 
    const notify = () => {
    toast.error('Τα στοιχεία εισαγωγής δεν είναι έγκυρα!', {
        position:  toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true, 
        theme: "dark",
        });
    }

    let [calendarToInsert, setCalendarToInsert] = useState([]);

    // Function that realises the suitable checks before the insertion of the new academic calendar in the database 
    // If all are OK, it continues with the academic calendar's insertion
    const prepareInsertion = () => {
        
        let fields = 0; 
        let invalidFields = 0; 

        isValid.forEach((item, index) => {  
            if (item !== true) { 
                invalidFields = invalidFields + 1;              
            }             
            fields = fields+1;
        }) 
        console.log(fields)
        console.log(invalidFields);
        // if all the input data are valid, we continue preparing the new object of academic calendar for each one of the 
        // specialization fields of the postgraduate level to be inserted
        if (invalidFields === 0 && fields === isValid.length) {
            let calendarPrepare = [];  
            let newObject = {study_level : 'ΠΡΟΠΤΥΧΙΑΚΟ', specialization_field : '-', academic_year : academicYear,
                            winterSemester : Object(winterSemester), 
                            springSemester : Object(springSemester), 
                            septemberSemester : Object(septemberSemester)}
            calendarPrepare.push(newObject);
            console.log(calendarPrepare)
            setCalendarToInsert(calendarPrepare); 
            setShowModal(true); 
            
        } 
        else { 
            notify()
            return;
        }
    }

    return (
        <div className="semesters_forms">
            <div className="calendar_form" id = 'winter_autumn_form'>
                <div className="card">
                    <div className="card_header">
                    { /*                              ΧΕΙΜΕΡΙΝΟ   ΕΞΑΜΗΝΟ                       */}
                        <div className="header_title">Χειμερινό Εξάμηνο</div>
                        <div className="card_options"> 
                            <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('winter_autumn_form')}></ExpandLessIcon>
                            <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('winter_autumn_form')} />
                        </div>
                    </div>
                    <div className="card_body">
                        <div className="currentInfo">
                            <div className="row_clearfix" >  
                                <div className="form_container">
                                    <div className="info_container" style={{marginTop:'15px', width:'100%'}}>                                       
                                {/* START OF COURSES */}
                                <div className="col" id="winter_courses_start">
                                    <div className="form_group">
                                        <div className="label">Έναρξη Μαθημάτων</div>
                                        <div className="form_control_date">
                                            <div className="day">{winterSemester.courses_startDay}</div>
                                            <input type="date" className="form_control" value={winterSemester.courses_startDate}  
                                                onChange={(e) => { 
                                                    handleClickInputDate('winter_courses_start', e.target.value); 
                                                    setWinterSemester({ ...winterSemester, courses_startDate: e.target.value })
                                                    document.getElementById('winter_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                    document.getElementById('winter_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                }}></input>
                                        </div>
                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                    </div>
                                </div>
                                {/* END OF COURSES */}
                                <div className="col" id="winter_courses_end">
                                    <div className="form_group">
                                        <div className="label">Λήξη Μαθημάτων</div>
                                        <div className="form_control_date">
                                            <div className="day">{winterSemester.courses_endDay}</div>
                                            <input type="date" className="form_control" value={winterSemester.courses_endDate}  
                                                onChange={(e) => { 
                                                    handleClickInputDate('winter_courses_end', e.target.value); 
                                                    setWinterSemester({ ...winterSemester, courses_endDate: e.target.value })
                                                    document.getElementById('winter_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                    document.getElementById('winter_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                }}></input>
                                        </div>
                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                    </div>
                                </div>
                                {/* DURATION OF COURSES */}
                                <div className="col" id="winter_courses_duration">
                                    <div className="form_group">
                                        <div className="label">Διάρκεια Διδασκαλίας</div>
                                        <div className="form_control_date" style={{display:'flex'}}>
                                            <input type="text" className="form_control" value={winterSemester.courses_duration_weeks}  style={{width:'10%'}}
                                                onChange={() => { 
                                                    handleClickInputDate('winter_courses_duration', winterSemester.courses_duration_weeks);  
                                                }}></input>
                                                
                                            <div className="day">εβδομάδες</div>
                                        </div>
                                    </div>
                                </div>                                   
                                {/* START OF EXAMS */}
                                <div className="col" id="winter_exams_start">
                                    <div className="form_group">
                                        <div className="label" style={{textAlign:'right', marginTop:'2rem'}}>Έναρξη Εξεταστικής</div>
                                        <div className="form_control_date">
                                            <div className="day">{winterSemester.exams_startDay}</div>
                                            <input type="date" className="form_control" value={winterSemester.exams_startDate}  
                                                onChange={(e) => { 
                                                    handleClickInputDate('winter_exams_start', e.target.value); 
                                                    setWinterSemester({ ...winterSemester, exams_startDate: e.target.value })
                                                    document.getElementById('winter_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                    document.getElementById('winter_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                }}></input>
                                        </div>
                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                    </div>
                                </div>
                                {/* END OF COURSES */}
                                <div className="col" id="winter_exams_end">
                                    <div className="form_group">
                                        <div className="label" style={{textAlign:'right'}}>Λήξη Εξεταστικής</div>
                                        <div className="form_control_date">
                                            <div className="day">{winterSemester.exams_endDay}</div>
                                            <input type="date" className="form_control" value={winterSemester.exams_endDate}  
                                                onChange={(e) => { 
                                                    handleClickInputDate('winter_exams_end', e.target.value); 
                                                    setWinterSemester({ ...winterSemester, exams_endDate: e.target.value })
                                                    document.getElementById('winter_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                    document.getElementById('winter_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                }}></input>
                                        </div>
                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                    </div>
                                </div>
                                {/* DURATION OF COURSES */}
                                <div className="col" id="winter_exams_duration">
                                    <div className="form_group">
                                        <div className="label" style={{textAlign:'right'}}>Διάρκεια Εξεταστικής</div>
                                        <div className="form_control_date" style={{display:'flex'}}>
                                            <input type="text" className="form_control" value={winterSemester.exams_duration_weeks}  style={{width:'10%'}}
                                                onChange={() => { 
                                                    handleClickInputDate('winter_exams_duration', winterSemester.exams_duration_weeks);  
                                                }}></input>
                                                
                                            <div className="day">εβδομάδες</div>
                                        </div> 
                                    </div>
                                </div>
                                {/* GRADUATION OATH*/}
                                <div className="col" id="winter_oaths" style={{marginTop:'2rem'}}>
                                    <div className="form_group"> 
                                        <div className="label">Ορκομωσίες</div>
                                        <div className="form_control_date" style={{display:'block'}}>
                                            <ul>
                                                {isValid[10]=true}
                                                {winterSemester.oaths.map((tag, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <span>{tag}</span>
                                                            <TiDelete className="icon" onClick={() => removeTags(winterSemester, 'oaths', index)}/>
                                                        </li>
                                                    )
                                                })} 
                                            </ul>
                                        <input type='text'  style={{marginTop: winterSemester.oaths.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε περιόδους ορκομωσίας' 
                                                            onKeyUp={(event)=> event.key === "Enter" ? addTags(winterSemester, 'oaths', event) : null}
                                                            onClick={handleTagAreaClick(winterSemester, 'winter_oaths')}></input>                                               
                                        </div>
                                    </div>
                                </div>
                                <div className="col" id="winter_feasts" style={{width: '100%'}}>
                                    <div className="form_group">
                                        <div className="label">Εορτές ή Αργίες</div>
                                        <div className="form_control_date" style={{display:'block'}}>
                                            <ul>
                                            {isValid[11]=true}
                                                {winterSemester.feasts.map((tag, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <span>{tag}</span>
                                                            <TiDelete className="icon" onClick={() => removeTags(winterSemester, 'feasts', index)}/>
                                                        </li>
                                                    )
                                                })} 
                                            </ul>
                                        <input type='text'  style={{marginTop: winterSemester.feasts.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε περιόδους ορκομωσίας' 
                                                            onKeyUp={(event)=> event.key === "Enter" ? addTags(winterSemester, 'feasts', event) : null}
                                                            onClick={handleTagAreaClick(winterSemester, 'winter_feasts')}></input>                                               
                                        </div>
                                    </div>                         
                                </div>  
                                {/* CHRISTMASS HOLIDAYS */}
                                <div className="col" id="winter_holidays">
                                    <div className="form_group">
                                        <div className="label" style={{marginTop:'1.5rem', textAlign:'center'}}>Διακοπές Χριστουγέννων</div>
                                        <div className="form_control_inRow">
                                            Από <div className="form_control_date">
                                                <div className="day">{winterSemester.fromHoliday_day}</div>
                                                <input type="date" className="form_control" value={winterSemester.fromHoliday_date}  
                                                    onChange={(e) => { 
                                                        handleClickInputDate('winter_holidays', e.target.value); 
                                                        setWinterSemester({ ...winterSemester, fromHoliday_date:e.target.value})
                                                    }}></input>
                                            </div>
                                        </div>
                                        <div className="form_control_inRow" style={{marginTop:'10px'}}  id="winter_hol">
                                            Έως <div className="form_control_date">
                                                <div className="day">{winterSemester.toHoliday_day}</div>
                                                <input type="date" className="form_control" value={winterSemester.toHoliday_date}  
                                                    onChange={(e) => { 
                                                        handleClickInputDate('winter_hol', e.target.value); 
                                                        setWinterSemester({ ...winterSemester, toHoliday_date:e.target.value})
                                                    }}></input>
                                            </div>
                                        </div>
                                        <div className="error_feedback">* Παρακαλώ ορίστε έγκυρες Ημερομηνίες!</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div> 
                            <div className="row_clearfix" style={{backgroundColor:'#17a3b80f'}}>
                                <div className="form_container">
                                    <div className="info_container">              
                                                                                        {/* COURSES REPORT */}                                   
                                        <div className="form_title">ΔΗΛΩΣΕΙΣ ΜΑΘΗΜΑΤΩΝ</div>
                                        <div className="text">Παρακαλώ ορίστε τις ημερομηνίες έναρξης και λήξης που θα ισχύσουν για τις δηλώσεις μαθημάτων του προς επεξεργασία εξαμήνου :</div>
                                        {/* START OF COURSES REPORT*/}
                                        <div className="col" id="winter_coursesReport_start">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Έναρξη Δηλώσεων Μαθημάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.courseReport_startDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.courseReport_startDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_coursesReport_start', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, courseReport_startDate: e.target.value })
                                                            document.getElementById('winter_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* END OF COURSES REPORT*/}
                                        <div className="col" id="winter_coursesReport_end">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Λήξη Δηλώσεων Μαθημάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.courseReport_endDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.courseReport_endDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_coursesReport_end', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, courseReport_endDate: e.target.value })
                                                            document.getElementById('winter_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                                                                {/* BOOKS REPORT */}    
                                        <div className="form_title"  style={{marginTop:'1.5rem'}}>ΔΗΛΩΣΕΙΣ ΣΥΓΓΡΑΜΜΑΤΩΝ</div>
                                        <div className="text">Παρακαλώ ορίστε τις ημερομηνίες έναρξης και λήξης που θα ισχύσουν για τις δηλώσεις συγγραμμάτων του προς επεξεργασία εξαμήνου :</div>
                                        {/* START OF COURSES REPORT*/}
                                        <div className="col" id="winter_booksReport_start">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Έναρξη Δηλώσεων Συγγραμμάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.booksReport_startDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.booksReport_startDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_booksReport_start', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, booksReport_startDate: e.target.value })
                                                            document.getElementById('winter_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* END OF COURSES REPORT*/}
                                        <div className="col" id="winter_booksReport_end">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Λήξη Δηλώσεων Συγγραμμάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.booksReport_endDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.booksReport_endDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_booksReport_end', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, booksReport_endDate: e.target.value })
                                                            document.getElementById('winter_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div> 

                                                                                {/* DIPLOMA THESIS REPORT */}    
                                        <div className="form_title" style={{marginTop:'1.5rem'}}>ΔΙΠΛΩΜΑΤΙΚΕΣ ΕΡΓΑΣΙΕΣ<br></br><p>Αιτήσεις Παρουσιάσεων</p></div>
                                        <div className="text">Παρακαλώ ορίστε την προθεσμία που θα ισχύσει για την αποστολή αιτήσεων παρουσιάσεων διπλωματικών εργασιών στο προς επεξεργασία εξάμηνο:</div>
                                        {/* START OF COURSES REPORT*/}
                                        <div className="col" id="winter_DiplomaThesisReport_start">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Έναρξη Αιτήσεων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.DiplomaThesisReport_startDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.DiplomaThesisReport_startDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_DiplomaThesisReport_start', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, DiplomaThesisReport_startDate: e.target.value })
                                                            document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* END OF COURSES REPORT*/}
                                        <div className="col" id="winter_DiplomaThesisReport_end">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Λήξη Αιτήσεων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{winterSemester.DiplomaThesisReport_endDay}</div>
                                                    <input type="date" className="form_control" value={winterSemester.DiplomaThesisReport_endDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('winter_DiplomaThesisReport_end', e.target.value); 
                                                            setWinterSemester({ ...winterSemester, DiplomaThesisReport_endDate: e.target.value })
                                                            document.getElementById('winter_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('winter_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div> 
                        </div>                                        
                    
                    </div> 
                </div>
            </div>
            
                    {/*             ΕΑΡΙΝΟ   ΕΞΑΜΗΝΟ                         */}
                    <div className="calendar_form" id='spring_summer_form'>
                        <div className="card">
                            <div className="card_header">
                                <div className="header_title">Εαρινό Εξάμηνο</div>
                                <div className="card_options"> 
                                    <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('spring_summer_form')}></ExpandLessIcon>
                                    <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('spring_summer_form')} />
                                    
                                </div>
                            </div>
                            <div className="card_body">
                                <div className="currentInfo">
                                    <div className="row_clearfix" >
                                    <div className="form_container">
                                    <div className="info_container" style={{marginTop:'15px', width:'100%'}}>                                       
                                        {/* START OF COURSES */}
                                        <div className="col" id="spring_courses_start">
                                            <div className="form_group">
                                                <div className="label">Έναρξη Μαθημάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{springSemester.courses_startDay}</div>
                                                    <input type="date" className="form_control" value={springSemester.courses_startDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('spring_courses_start', e.target.value); 
                                                            setSpringSemester({ ...springSemester, courses_startDate: e.target.value })
                                                            document.getElementById('spring_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('spring_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* END OF COURSES */}
                                        <div className="col" id="spring_courses_end">
                                            <div className="form_group">
                                                <div className="label">Λήξη Μαθημάτων</div>
                                                <div className="form_control_date">
                                                    <div className="day">{springSemester.courses_endDay}</div>
                                                    <input type="date" className="form_control" value={springSemester.courses_endDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('spring_courses_end', e.target.value); 
                                                            setSpringSemester({ ...springSemester, courses_endDate: e.target.value })
                                                            document.getElementById('spring_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('spring_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* DURATION OF COURSES */}
                                        <div className="col" id="spring_courses_duration">
                                            <div className="form_group">
                                                <div className="label">Διάρκεια Διδασκαλίας</div>
                                                <div className="form_control_date" style={{display:'flex'}}>
                                                    <input type="text" className="form_control" value={springSemester.courses_duration_weeks} style={{width:'10%'}}
                                                        onChange={() => { 
                                                            handleClickInputDate('spring_courses_duration', springSemester.courses_duration_weeks);  
                                                        }}></input>
                                                        
                                                    <div className="day">εβδομάδες</div>
                                                </div> 
                                            </div>
                                        </div>                                    
                                        {/* START OF EXAMS */}
                                        <div className="col" id="spring_exams_start">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right', marginTop:'2rem'}}>Έναρξη Εξεταστικής</div>
                                                <div className="form_control_date">
                                                    <div className="day">{springSemester.exams_startDay}</div>
                                                    <input type="date" className="form_control" value={springSemester.exams_startDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('spring_exams_start', e.target.value); 
                                                            setSpringSemester({ ...springSemester, exams_startDate: e.target.value })
                                                            document.getElementById('spring_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('spring_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* END OF COURSES */}
                                        <div className="col" id="spring_exams_end">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Λήξη Εξεταστικής</div>
                                                <div className="form_control_date">
                                                    <div className="day">{springSemester.exams_endDay}</div>
                                                    <input type="date" className="form_control" value={springSemester.exams_endDate}  
                                                        onChange={(e) => { 
                                                            handleClickInputDate('spring_exams_end', e.target.value); 
                                                            setSpringSemester({ ...springSemester, exams_endDate: e.target.value })
                                                            document.getElementById('spring_exams_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            document.getElementById('spring_exams_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                        }}></input>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                            </div>
                                        </div>
                                        {/* DURATION OF COURSES */}
                                        <div className="col" id="spring_exams_duration">
                                            <div className="form_group">
                                                <div className="label" style={{textAlign:'right'}}>Διάρκεια Εξεταστικής</div>
                                                <div className="form_control_date" style={{display:'flex'}}>
                                                    <input type="text" className="form_control" value={springSemester.exams_duration_weeks}  style={{width:'10%'}}
                                                        onChange={() => { 
                                                            handleClickInputDate('spring_exams_duration', springSemester.exams_duration_weeks);  
                                                        }}></input>
                                                        
                                                    <div className="day">εβδομάδες</div>
                                                </div> 
                                            </div>
                                        </div>
                                        {/* GRADUATION OATH*/}
                                        <div className="col" id="spring_oaths" style={{marginTop:'2rem'}}>
                                            <div className="form_group"> 
                                                <div className="label">Ορκομωσίες</div>
                                                <div className="form_control_date" style={{display:'block'}}>
                                                    <ul>
                                                        {isValid[38] = true}
                                                        {springSemester.oaths.map((tag, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <span>{tag}</span>
                                                                    <TiDelete className="icon" onClick={() => removeTags(springSemester, 'oaths', index)}/>
                                                                </li>
                                                            )
                                                        })} 
                                                    </ul>
                                                <input type='text'  style={{marginTop: springSemester.oaths.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε περιόδους ορκομωσίας' 
                                                                    onKeyUp={(event)=> event.key === "Enter" ? addTags(springSemester, 'oaths', event) : null}
                                                                    onClick={handleTagAreaClick(springSemester, 'spring_oaths')}></input>                                               
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col" id="spring_feasts" style={{width: '100%'}}>
                                            <div className="form_group">
                                                <div className="label">Εορτές ή Αργίες</div>
                                                <div className="form_control_date" style={{display:'block'}}>
                                                    <ul>
                                                    {isValid[39] = true}
                                                        {springSemester.feasts.map((tag, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <span>{tag}</span>
                                                                    <TiDelete className="icon" onClick={() => removeTags(springSemester, 'feasts', index)}/>
                                                                </li>
                                                            )
                                                        })} 
                                                    </ul>
                                                <input type='text'  style={{marginTop: springSemester.feasts.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε περιόδους ορκομωσίας' 
                                                                    onKeyUp={(event)=> event.key === "Enter" ? addTags(springSemester, 'feasts', event) : null}
                                                                    onClick={handleTagAreaClick(springSemester, 'spring_feasts')}></input>                                               
                                                </div>
                                            </div>                         
                                        </div>  
                                        {/* EASTER HOLIDAYS */}
                                        <div className="col" id="spring_holidays">
                                            <div className="form_group">
                                                <div className="label" style={{marginTop:'1.5rem', textAlign:'center'}}>Διακοπές Πάσχα</div>
                                                <div className="form_control_inRow">
                                                    Από <div className="form_control_date">
                                                        <div className="day">{springSemester.fromHoliday_day}</div>
                                                        <input type="date" className="form_control" value={springSemester.fromHoliday_date}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('spring_holidays', e.target.value); 
                                                                setSpringSemester({ ...springSemester, fromHoliday_date:e.target.value})
                                                            }}></input>
                                                    </div>
                                                </div>
                                                <div className="form_control_inRow" style={{marginTop:'10px'}}  id="spring_hol">
                                                    Έως <div className="form_control_date">
                                                        <div className="day">{springSemester.toHoliday_day}</div>
                                                        <input type="date" className="form_control" value={springSemester.toHoliday_date}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('spring_hol', e.target.value); 
                                                                setSpringSemester({ ...springSemester, toHoliday_date:e.target.value})
                                                            }}></input>
                                                    </div>
                                                </div>
                                                <div className="error_feedback">* Παρακαλώ ορίστε έγκυρες Ημερομηνίες!</div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div> 
                                    <div className="row_clearfix" style={{backgroundColor:'#17a3b80f'}}>
                                        <div className="form_container">
                                            <div className="info_container">              
                                                                                                {/* COURSES REPORT */}                                   
                                                <div className="form_title">ΔΗΛΩΣΕΙΣ ΜΑΘΗΜΑΤΩΝ</div>
                                                <div className="text">Παρακαλώ ορίστε τις ημερομηνίες έναρξης και λήξης που θα ισχύσουν για τις δηλώσεις μαθημάτων του προς επεξεργασία εξαμήνου :</div>
                                                {/* START OF COURSES REPORT*/}
                                                <div className="col" id="spring_coursesReport_start">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Έναρξη Δηλώσεων Μαθημάτων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.courseReport_startDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.courseReport_startDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_coursesReport_start', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, courseReport_startDate: e.target.value })
                                                                    document.getElementById('spring_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div>
                                                {/* END OF COURSES REPORT*/}
                                                <div className="col" id="spring_coursesReport_end">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Λήξη Δηλώσεων Μαθημάτων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.courseReport_endDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.courseReport_endDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_coursesReport_end', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, courseReport_endDate: e.target.value })
                                                                    document.getElementById('spring_coursesReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_coursesReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div>
                                                                                        {/* BOOKS REPORT */}    
                                                <div className="form_title"  style={{marginTop:'1.5rem'}}>ΔΗΛΩΣΕΙΣ ΣΥΓΓΡΑΜΜΑΤΩΝ</div>
                                                <div className="text">Παρακαλώ ορίστε τις ημερομηνίες έναρξης και λήξης που θα ισχύσουν για τις δηλώσεις συγγραμμάτων του προς επεξεργασία εξαμήνου :</div>
                                                {/* START OF COURSES REPORT*/}
                                                <div className="col" id="spring_booksReport_start">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Έναρξη Δηλώσεων Συγγραμμάτων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.booksReport_startDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.booksReport_startDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_booksReport_start', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, booksReport_startDate: e.target.value })
                                                                    document.getElementById('spring_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div>
                                                {/* END OF COURSES REPORT*/}
                                                <div className="col" id="spring_booksReport_end">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Λήξη Δηλώσεων Συγγραμμάτων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.booksReport_endDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.booksReport_endDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_booksReport_end', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, booksReport_endDate: e.target.value })
                                                                    document.getElementById('spring_booksReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_booksReport_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_booksReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div> 

                                                                                        {/* DIPLOMA THESIS REPORT */}    
                                                <div className="form_title" style={{marginTop:'1.5rem'}}>ΔΙΠΛΩΜΑΤΙΚΕΣ ΕΡΓΑΣΙΕΣ<br></br><p>Αιτήσεις Παρουσιάσεων</p></div>
                                                <div className="text">Παρακαλώ ορίστε την προθεσμία που θα ισχύσει για την αποστολή αιτήσεων παρουσιάσεων διπλωματικών εργασιών στο προς επεξεργασία εξάμηνο:</div>
                                                {/* START OF COURSES REPORT*/}
                                                <div className="col" id="spring_DiplomaThesisReport_start">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Έναρξη Αιτήσεων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.DiplomaThesisReport_startDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.DiplomaThesisReport_startDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_DiplomaThesisReport_start', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, DiplomaThesisReport_startDate: e.target.value })
                                                                    document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div>
                                                {/* END OF COURSES REPORT*/}
                                                <div className="col" id="spring_DiplomaThesisReport_end">
                                                    <div className="form_group">
                                                        <div className="label" style={{textAlign:'right'}}>Λήξη Αιτήσεων</div>
                                                        <div className="form_control_date">
                                                            <div className="day">{springSemester.DiplomaThesisReport_endDay}</div>
                                                            <input type="date" className="form_control" value={springSemester.DiplomaThesisReport_endDate}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate('spring_DiplomaThesisReport_end', e.target.value); 
                                                                    setSpringSemester({ ...springSemester, DiplomaThesisReport_endDate: e.target.value })
                                                                    document.getElementById('spring_DiplomaThesisReport_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                    document.getElementById('spring_DiplomaThesisReport_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                }}></input>
                                                        </div>
                                                        <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                        <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div> 
                                </div>                                        
                            </div>
                        </div>
                    </div>

                    {/*                           ΕΠΑΝΑΛΗΠΤΙΚΗ ΕΞΕΤΑΣΤΙΚΗ                   */}
                    <div className="repeat_semester" id='repeat_semester'>
                        <div className="card">
                        <div className="card_header">
                                <div className="header_title">Επαναληπτική Εξεταστική</div>
                                <div className="card_options"> 
                                    <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('repeat_semester')}></ExpandLessIcon>
                                    <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('repeat_semester')} />
                                    
                                </div>
                            </div>
                            <div className="card_body">
                                <div className="currentInfo">
                                <div className="row_clearfix" style={{flex:'2'}}>
                                        {/* START OF REPEAT EXAMS */}
                                        <div className="col" id="september_courses_start">
                                                <div className="form_group">
                                                    <div className="label">Έναρξη</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{septemberSemester.repeatExam_startDay}</div>
                                                        <input type="date" className="form_control" value={septemberSemester.repeatExam_startDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('september_courses_start', e.target.value); 
                                                                setSeptemberSemester({ ...septemberSemester, repeatExam_startDate: e.target.value })
                                                                document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            }}></input>
                                                    </div>
                                                    <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                        {/* END OF REPEAT EXAMS */}
                                        <div className="col" id="september_courses_end">
                                                <div className="form_group">
                                                    <div className="label">Έναρξη</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{septemberSemester.repeatExam_endDay}</div>
                                                        <input type="date" className="form_control" value={septemberSemester.repeatExam_endDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('september_courses_end', e.target.value); 
                                                                setSeptemberSemester({ ...septemberSemester, repeatExam_endDate: e.target.value })
                                                                document.getElementById('september_courses_start').getElementsByClassName('error_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_end').getElementsByClassName('error_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_start').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                                document.getElementById('september_courses_end').getElementsByClassName('invalid_feedback')[0].style.display = 'none'
                                                            }}></input>
                                                    </div>
                                                    <div className="error_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                        {/* DURATION OF EXAMS */}
                                        <div className="col" id="september_courses_duration">
                                            <div className="form_group">
                                                <div className="label">Διάρκεια</div>
                                                <div className="form_control_date" style={{display:'flex'}}>
                                                    <input type="text" className="form_control" value={septemberSemester.repeatExam_duration_weeks}  style={{width:'10%'}}
                                                        onChange={() => { 
                                                            handleClickInputDate('september_courses_duration', septemberSemester.repeatExam_duration_weeks);  
                                                        }}></input>
                                                        
                                                    <div className="day">εβδομάδες</div>
                                                </div> 
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button className="learn_more" onClick={() => prepareInsertion()}>             
                <span className="circle" aria-hidden='true'>
                    <div className="border" style={{border:'none'}}>                 
                        <TaskAltIcon className="check"/>   
                    </div>                     
                    <span className="button_text">ΔΗΜΙΟΥΡΓΙΑ</span>
                </span>
            </button>   
            {showModal && <CalendarModal showModal={showModal} setShowModal={setShowModal} calendarToInsert={calendarToInsert} academicYear={academicYear}/>}             
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
                theme="dark"
            />                   
                </div>        
    )

}

export default CalendarContainer_Undergraduate;