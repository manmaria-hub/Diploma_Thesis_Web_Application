import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
 
// Icons
import {TiDelete} from 'react-icons/ti';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 

// GraphQL Resolvers
import SpecializationResolvers from '../../../../../src/graphql/resolvers/courses';

// Components (MODAL)
import CalendarModal from '../../../../components/MODALS/CalendarModal';

// CSS Styles  
import '../../../../../src/styles/pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/calendarPostgraduate.scss'

const CalendarContainer_Postgraduate = (props) => {
    // Determine the academic year of the current calendar that is given from the component's arguments
    const academicYear = props.academicYear; 
    const winterFeasts = props.winterFeasts;
    const springFeasts = props.springFeasts;
    let [winterEmpty, setWinterEmpty] = useState([])
    let [springEmpty, setSpringEmpty] = useState([])

    // Setting the state variable that we will use to open-close the modal window for the success of academic calendar creation
    const [showModal, setShowModal] = useState(false); 

    // Setting and initialize the objects that will store the input data of the academic  UNDERGRADUATE semesters
    
    // *** WINTER - AUTUMN SEMESTER
    let [winterSemester, setWinterSemester] = useState({
        courses_startDay: '', courses_startDate: moment().format('YYYY-MM-DD'),
        courses_endDay: '', courses_endDate: moment().format('YYYY-MM-DD'),
        courses_duration_weeks : 0,
        exams_startDay: '', exams_startDate: moment().format('YYYY-MM-DD'),
        exams_endDay: '', exams_endDate: moment().format('YYYY-MM-DD'),
        exams_duration_weeks : 0,
        oaths : [], feasts : undefined,
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
        oaths : [], feasts : undefined,
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
    
    let [validState, setValidState] = useState([]);

    // Setting and initializing the array of objects for each one of the postgraduate fields group of semesters and 
    // academic calendar
    let [postgraduateCalendar, setPostgraduateCalendar] = useState([]);
 
    // Setting the object that will store the input data for each one between two academic semesters (winter - spring) for each
    // specialization field of postgraduate study level
    let [semestersData, setSemestersData] = useState({winterSemester, springSemester})

    // Setting and initialize the error pointer
    let [isValid, setIsValid] = useState();

    // Use the GraphQL query to select the specialization fields of the postgraduate study level and 
    // format the array of fields academic calendars
    if (postgraduateCalendar.length === 0) {
        SpecializationResolvers.get_graduate_and_subject_levels()
            .then((result)=> {
                let array = [];
                result?.data?.getGraduateAndSubjectLevels?.data.forEach(item => {
                    if (item !== '-') {
                        let obj = {field : item, semestersInfo : semestersData}
                        array.push(obj);
                    }
                })
                setPostgraduateCalendar(array)
            })
            .catch(err=> {
                console.log(err);
                setPostgraduateCalendar([]);
                throw err;
            })
    } 
    
    if (winterEmpty.length === 0) {
        postgraduateCalendar.forEach((_, index)=> {
            winterEmpty.push({fieldEmpty : 'no'})
        })
    }
    if (springEmpty.length === 0) {
        postgraduateCalendar.forEach((_, index)=> {
            springEmpty.push({fieldEmpty : 'no'})
        })
    } 
 
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
 
    // Determine the by default feasts of winter semester according the academic year of studies
    postgraduateCalendar.forEach((_, index) => {   
        if (postgraduateCalendar[index].semestersInfo.winterSemester.feasts === undefined) {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {springSemester : postgraduateCalendar[index].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[index].semestersInfo.winterSemester, feasts : winterFeasts} }}
            setPostgraduateCalendar(newCalendar)
        }
    })
    // Update the winter feasts every time the academic year changes
    useEffect(()=> {
        postgraduateCalendar.forEach((_, index) => {  
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {springSemester : postgraduateCalendar[index].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[index].semestersInfo.winterSemester, feasts : winterFeasts}}}
            setPostgraduateCalendar(newCalendar)            
            postgraduateCalendar[index].semestersInfo.winterSemester.feasts = winterFeasts
            winterEmpty[index] = {fieldEmpty : 'no'}
            springEmpty[index] = {fieldEmpty : 'no'}
        }) 
    }, [winterFeasts])

    // Determine the by default feasts of spring semester according the academic year of studies
    postgraduateCalendar.forEach((_, index) => {   
        if (postgraduateCalendar[index].semestersInfo.springSemester.feasts === undefined) {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {winterSemester : postgraduateCalendar[index].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[index].semestersInfo.springSemester, feasts : springFeasts} }}
            setPostgraduateCalendar(newCalendar)
        }
    })
    // Update the spring feasts every time the academic year changes
    useEffect(()=> {
        postgraduateCalendar.forEach((_, index) => {  
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {winterSemester : postgraduateCalendar[index].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[index].semestersInfo.springSemester, feasts : springFeasts}}}
            setPostgraduateCalendar(newCalendar)            
            postgraduateCalendar[index].semestersInfo.springSemester.feasts = springFeasts
            winterEmpty[index] = {fieldEmpty : 'no'}
            springEmpty[index] = {fieldEmpty : 'no'}
        }) 
    }, [springFeasts])
    
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

    // *** WINTER - AUTUMN SEMESTER
 
    // Function that add new oath peiriods in the suitable field of the academic semester object
    const addTags = (semester, value, index, event) => {     
        if (semester === 'winterSemester') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {springSemester : postgraduateCalendar[index].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[index].semestersInfo.winterSemester, feasts : [...postgraduateCalendar[index].semestersInfo.winterSemester.feasts, value]} }}
            setPostgraduateCalendar(newCalendar)
            event.target.value = "";
            const newEmpty = [...winterEmpty];
            newEmpty[newIndex] = {...winterEmpty[newIndex], fieldEmpty : 'no'}
            setWinterEmpty(newEmpty)
        } 
        else if (semester === 'springSemester') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === index)
            const newCalendar = [...postgraduateCalendar]
            newCalendar[newIndex] = {...postgraduateCalendar[index], field : postgraduateCalendar[index].field, semestersInfo : {winterSemester : postgraduateCalendar[index].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[index].semestersInfo.springSemester, feasts : [...postgraduateCalendar[index].semestersInfo.springSemester.feasts, value]} }}
            setPostgraduateCalendar(newCalendar)
            event.target.value = "";
            const newEmpty = [...springEmpty];
            newEmpty[newIndex] = {...springEmpty[newIndex], fieldEmpty : 'no'}
            setSpringEmpty(newEmpty)
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
 
    // Function that help us to remove tags from oaths field
    const removeTags = (semester, category , indexToRemove, indexField) => {
        // *** WINTER SEMESTER          
        if (semester === 'winterSemester' && category === 'feasts') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            if (postgraduateCalendar[newIndex].semestersInfo.winterSemester.feasts.filter((_,index) => index !== indexToRemove).length === 0) {
                
                const newEmpty = [...winterEmpty];
                newEmpty[newIndex] = {...winterEmpty[newIndex], fieldEmpty : 'yes'}
                setWinterEmpty(newEmpty)
                newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, feasts : []}}}
                postgraduateCalendar[newIndex].semestersInfo.winterSemester.feasts = [];
            }
            else {
                const newEmpty = [...winterEmpty];
                newEmpty[newIndex] = {...winterEmpty[newIndex], fieldEmpty: 'no'}
                setWinterEmpty(newEmpty)
                newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, feasts : postgraduateCalendar[newIndex].semestersInfo.winterSemester.feasts.filter((_,index) => index !== indexToRemove)} }}
                setPostgraduateCalendar(newCalendar)
            }
             
        } 
        else if (semester === 'springSemester' && category === 'feasts') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar] 
            if (postgraduateCalendar[newIndex].semestersInfo.springSemester.feasts.filter((_,index) => index !== indexToRemove).length === 0) {                
                const newEmpty = [...springEmpty];
                newEmpty[newIndex] = {...springEmpty[newIndex], fieldEmpty : 'yes'}
                setSpringEmpty(newEmpty)
                newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, feasts : []}}}
                postgraduateCalendar[newIndex].semestersInfo.springSemester.feasts = [];
            }
            else {
                const newEmpty = [...springEmpty];
                newEmpty[newIndex] = {...springEmpty[newIndex], fieldEmpty: 'no'}
                setSpringEmpty(newEmpty)
                newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, feasts : postgraduateCalendar[newIndex].semestersInfo.springSemester.feasts.filter((_,index) => index !== indexToRemove)} }}
                setPostgraduateCalendar(newCalendar)
            }
        }    
    }

    // Function that updates the value of data on onChange events
    const updateValue = (indexField, semester, fieldtoUpdate, newValue, elementId) => { 
        let day = '';
        let validity = false;
        // Validate the courses' start date 
        const selectedYear = new Date(newValue).getFullYear();
        const selectedMonth = new Date(newValue).getMonth() + 1;
        if (semester === 'winter' && fieldtoUpdate === 'courses_startDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, courses_startDay : day, courses_startDate : newValue }}}
            setPostgraduateCalendar(newCalendar)
         
            if (selectedYear !== Number(academicYear.split("-")[0])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 9 || selectedMonth > 11) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'winter' && fieldtoUpdate === 'courses_endDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, courses_endDay : day, courses_endDate : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth !== 12 && selectedMonth !== 1 && selectedMonth !== 2) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'winter' && fieldtoUpdate === 'exams_startDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, exams_startDay : day, exams_startDate : newValue }}}
            setPostgraduateCalendar(newCalendar) 
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth !== 12 && selectedMonth !== 1 && selectedMonth !== 2 && selectedMonth !== 3) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) {
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            }  
        }
        else if (semester === 'winter' && fieldtoUpdate === 'exams_endDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, exams_endDay : day, exams_endDate : newValue }}}
            setPostgraduateCalendar(newCalendar)
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth !== 2 && selectedMonth !== 3 && selectedMonth !== 1) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            }   
        }
        else if (semester === 'winter' && fieldtoUpdate === 'fromHoliday_date') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, fromHoliday_day : day, fromHoliday_date : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[0])) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth !== 12) ) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'winter' && fieldtoUpdate === 'toHoliday_date') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {springSemester : postgraduateCalendar[indexField].semestersInfo.springSemester, winterSemester :{...postgraduateCalendar[indexField].semestersInfo.winterSemester, toHoliday_day : day, toHoliday_date : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])) {  
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth !== 1)) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else {                 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        // SPRING SEMESTER
        if (semester === 'spring' && fieldtoUpdate === 'courses_startDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, courses_startDay : day, courses_startDate : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 2 || selectedMonth > 4) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'spring' && fieldtoUpdate === 'courses_endDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, courses_endDay : day, courses_endDate : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 5 || selectedMonth > 7) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'spring' && fieldtoUpdate === 'exams_startDate') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, exams_startDay : day, exams_startDate : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 5 || selectedMonth > 7) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'spring' && fieldtoUpdate === 'exams_endDate') { 
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, exams_endDay : day, exams_endDate : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])  && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 6 || selectedMonth > 7) && !elementId.includes('winter_hol') && !elementId.includes('spring_hol')) {
                validity =(false) 
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if (!elementId.includes('winter_hol') && !elementId.includes('spring_hol')) { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'spring' && fieldtoUpdate === 'fromHoliday_date') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, fromHoliday_day : day, fromHoliday_date : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 3 || selectedMonth > 6)) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }
        else if (semester === 'spring' && fieldtoUpdate === 'toHoliday_date') {
            const newIndex = postgraduateCalendar.findIndex((_, insIndex) => insIndex === indexField)
            const newCalendar = [...postgraduateCalendar]
            day = findCorresspondingDay(newValue);  
            newCalendar[newIndex] = {...postgraduateCalendar[indexField], field : postgraduateCalendar[indexField].field, semestersInfo : {winterSemester : postgraduateCalendar[indexField].semestersInfo.winterSemester, springSemester :{...postgraduateCalendar[indexField].semestersInfo.springSemester, toHoliday_day : day, toHoliday_date : newValue }}}
            setPostgraduateCalendar(newCalendar)  
            if (selectedYear !== Number(academicYear.split("-")[1])) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else if ((selectedMonth < 3 || selectedMonth > 6)) { 
                validity =(false)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'flex';
            }
            else { 
                validity =(true)
                document.getElementById(elementId).getElementsByClassName('errorPost_feedback')[0].style.display = 'none';
            } 
        }

        return(validity)
    }
 
    // Function that handles the click of an input form field and sets its style
    const handleClickInputDate = (fieldName, value) => {  
        // for the case in that the input value is not empty
        if (String(value).trim().length !== 0 && String(value) !== '0') {
            if (document.getElementById(fieldName)) {
                if (!fieldName.includes('winter_hol') && !fieldName.includes('spring_hol')) {
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
                if (!fieldName.includes('winter_hol') && !fieldName.includes('spring_hol')) {
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

    let [calendarToInsert, setCalendarToInsert] = useState([]);

    // Function that realises the suitable checks before the insertion of the new academic calendar in the database 
    // If all are OK, it continues with the academic calendar's insertion
    const prepareInsertion = () => {
        let invalid = undefined; 
        let fields = 0; 
        let invalidFields = 0; 

        validState.forEach((item, index) => {  
            if (item !== true) {
                invalid = true;  
                invalidFields = invalidFields + 1;              
            }             
            fields = fields+1;
        }) 
         
        // if all the input data are valid, we continue preparing the new object of academic calendar for each one of the 
        // specialization fields of the postgraduate level to be inserted
        if (invalidFields === 0 && fields === validState.length) {
            let calendarPrepare = [];
            postgraduateCalendar.forEach((specField, index) => {
                let newObject = {study_level : 'ΜΕΤΑΠΤΥΧΙΑΚΟ', specialization_field : specField.field, academic_year : academicYear,
                                 winterSemester : Object(postgraduateCalendar[index].semestersInfo.winterSemester), 
                                 springSemester : Object(postgraduateCalendar[index].semestersInfo.springSemester), 
                                 septemberSemester : Object(septemberSemester)}
                calendarPrepare.push(newObject);
            }) 
            setCalendarToInsert(calendarPrepare); 
            setShowModal(true); 
            
        } 
        else { 
            notify()
            return;
        }
    }

    return (
        
        <div className='semesters_forms'> 
            {postgraduateCalendar.map((specField, index) => {
                return(
                <div className='calendar_form' key={index} id = {'calendar_form'+index}>
                    <div className='card'>
                        <div className='card_header'>
                            <div className='header_title'>{specField.field}</div>
                            <div className="card_options"> 
                            <ExpandLessIcon className="card_options_collapse" onClick = {()=> collapseCard('calendar_form'+index)}></ExpandLessIcon>
                            <ExpandMoreIcon className="card_options_collapse_more" onClick= {()=> unCollapsedCard('calendar_form'+index)} />
                        </div>
                    </div>
                        <div className="card_body">
                            <div className='currentInfo' style={{display:'flex'}}>
                                <div className='row_clearfix' style={{flex:'2'}}>
                                    <div className="form_container">
                                        <div className="info_container" style={{marginTop:'15px', width:'100%'}}>              
                                                    {/* ΧΕΙΜΕΡΙΝΟ ΕΞΑΜΗΝΟ */}                                   
                                            <div className="form_title">Χειμερινό Εξάμηνο</div>                                        
                                            {/* START OF WINTER SEMESTER COURSES*/}
                                            <div className="col" id={'field'+index+'_winter_courses_start'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'left'}}>Έναρξη Μαθημάτων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.winterSemester?.courses_startDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.courses_startDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_winter_courses_start', e.target.value); 
                                                                let validIn = updateValue(index, 'winter', 'courses_startDate', e.target.value, 'field'+index+'_winter_courses_start')     
                                                                if (validIn !== false) {validState[(14*index) + 0] = true}  else {validState[(14*index) + 0] = false}  
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* END OF WINTER SEMESTER COURSES*/}
                                            <div className="col" id={'field'+index+'_winter_courses_end'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'left'}}>Λήξη Μαθημάτων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.winterSemester?.courses_endDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.courses_endDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_winter_courses_end', e.target.value); 
                                                                let validIn = updateValue(index, 'winter', 'courses_endDate', e.target.value, 'field'+index+'_winter_courses_end')  
                                                                if (validIn !== false) {validState[(14*index) + 1] = true}  else {validState[(14*index) + 1] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* START OF WINTER EXAMS*/}
                                            <div className="col" id={'field'+index+'_winter_exams_start'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'right'}}>Έναρξη Εξετάσεων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.winterSemester?.exams_startDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.exams_startDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_winter_exams_start', e.target.value); 
                                                                let validIn = updateValue(index, 'winter', 'exams_startDate', e.target.value, 'field'+index+'_winter_exams_start')  
                                                                if (validIn !== false) {validState[(14*index) + 2] = true}  else {validState[(14*index) + 2] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* END OF WINTER EXAMS*/}
                                            <div className="col" id={'field'+index+'_winter_exams_end'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'right'}}>Λήξη Εξετάσεων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.winterSemester?.exams_endDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.exams_endDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_winter_exams_end', e.target.value); 
                                                                let validIn = updateValue(index, 'winter', 'exams_endDate', e.target.value, 'field'+index+'_winter_exams_end')  
                                                                if (validIn !== false) {validState[(14*index) + 3] = true}  else {validState[(14*index) + 3] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            <div className="col" id={"winter_feasts_field_"+index} style={{width: '100%'}}>
                                                <div className="form_group">
                                                    <div className="label">Εορτές ή Αργίες</div>
                                                    <div className="form_control_date" style={{display:'block'}}>
                                                        <ul>
                                                            {validState[(14*index) + 4] = true} 
                                                            {specField?.semestersInfo?.winterSemester?.feasts !== undefined && winterEmpty[index].fieldEmpty === 'no'  ?
                                                            specField?.semestersInfo?.winterSemester?.feasts.map((tag, indexIn) => {
                                                                return (
                                                                    <li key={indexIn}>
                                                                        <span>{tag}</span>
                                                                        <TiDelete className="icon" onClick={() => removeTags('winterSemester', 'feasts', indexIn, index)}/>
                                                                    </li>
                                                                )
                                                            }) : null  }                                                         
                                                        </ul>
                                                    <input type='text'  style={{marginTop: specField?.semestersInfo?.winterSemester?.feasts?.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε νέες Εορτές ή Αργίες' 
                                                                        onKeyUp={(event)=> event.key === "Enter" ? addTags( 'winterSemester', event.target.value, index, event) : null}
                                                                        onClick={handleTagAreaClick(specField?.semestersInfo?.winterSemester, "winter_feasts_field_"+ index)}></input>                                               
                                                    </div>
                                                </div>                         
                                            </div> 
                                                {/* CHRISTMASS HOLIDAYS */}
                                            <div className="col" id={"winter_holidays_"+index}>
                                                <div className="form_group">
                                                    <div className="label" style={{marginTop:'1.5rem', textAlign:'center'}}>Διακοπές  Χριστουγέννων</div>
                                                    <div className="form_control_inRow">
                                                        Από <div className="form_control_date">
                                                            <div className="day">{specField?.semestersInfo?.winterSemester?.fromHoliday_day}</div>
                                                            <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.fromHoliday_date}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate("winter_holidays_"+index, e.target.value); 
                                                                    let validIn = updateValue(index, 'winter', 'fromHoliday_date', e.target.value, "winter_holidays_"+index) 
                                                                    if (validIn !== false) {validState[(14*index) + 5] = true}  else {validState[(14*index) + 5] = false} 
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                    <div className="form_control_inRow" style={{marginTop:'10px'}}  id={"winter_hol_"+index}>
                                                        Έως <div className="form_control_date">
                                                            <div className="day">{specField?.semestersInfo?.winterSemester?.toHoliday_day}</div>
                                                            <input type="date" className="form_control" value={specField?.semestersInfo?.winterSemester?.toHoliday_date}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate("winter_hol_"+index, e.target.value); 
                                                                    let validIn = updateValue(index, 'winter', 'toHoliday_date', e.target.value, "winter_holidays_"+index) 
                                                                    if (validIn !== false) {validState[(14*index) + 6] = true}  else {validState[(14*index) + 6] = false} 
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε έγκυρες Ημερομηνίες!</div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                {/*                                ΕΑΡΙΝΟ ΕΞΑΜΗΝΟ                                    */}
                                <div className='row_clearfix' style={{backgroundColor:'#17a3b80f', justifyContent:'top', alignItems:'top', flex:'2'}}>
                                    <div className="form_container">
                                        <div className="info_container" style={{marginTop:'15px', width:'100%'}}>              
                                                    {/* ΕΑΡΙΝΟ ΕΞΑΜΗΝΟ */}                                   
                                            <div className="form_title">Εαρινό Εξάμηνο</div>                                        
                                            {/* START OF SPRING SEMESTER COURSES*/}
                                            <div className="col" id={'field'+index+'_spring_courses_start'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'left'}}>Έναρξη Μαθημάτων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.springSemester?.courses_startDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.courses_startDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_spring_courses_start', e.target.value); 
                                                                let validIn = updateValue(index, 'spring', 'courses_startDate', e.target.value, 'field'+index+'_spring_courses_start')   
                                                                if (validIn !== false) {validState[(14*index) + 7] = true}  else {validState[(14*index) + 7] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* END OF SPRING SEMESTER COURSES*/}
                                            <div className="col" id={'field'+index+'_spring_courses_end'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'left'}}>Λήξη Μαθημάτων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.springSemester?.courses_endDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.courses_endDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_spring_courses_end', e.target.value); 
                                                                let validIn = updateValue(index, 'spring', 'courses_endDate', e.target.value, 'field'+index+'_spring_courses_end') 
                                                                if (validIn !== false) {validState[(14*index) + 8] = true}  else {validState[(14*index) + 8] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* START OF SPRING EXAMS*/}
                                            <div className="col" id={'field'+index+'_spring_exams_start'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'right'}}>Έναρξη Εξετάσεων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.springSemester?.exams_startDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.exams_startDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_spring_exams_start', e.target.value); 
                                                                let validIn = updateValue(index, 'spring', 'exams_startDate', e.target.value, 'field'+index+'_spring_exams_start')   
                                                                if (validIn !== false) {validState[(14*index) + 9] = true}  else {validState[(14*index) + 9] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Έναρξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            {/* END OF SPRING EXAMS*/}
                                            <div className="col" id={'field'+index+'_spring_exams_end'}>
                                                <div className="form_group">
                                                    <div className="label" style={{textAlign:'right'}}>Λήξη Εξετάσεων</div>
                                                    <div className="form_control_date">
                                                        <div className="day">{specField?.semestersInfo?.springSemester?.exams_endDay}</div>
                                                        <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.exams_endDate}  
                                                            onChange={(e) => { 
                                                                handleClickInputDate('field'+index+'_spring_exams_end', e.target.value); 
                                                                let validIn = updateValue(index, 'spring', 'exams_endDate', e.target.value, 'field'+index+'_spring_exams_end')  
                                                                if (validIn !== false) {validState[(14*index) + 10] = true}  else {validState[(14*index) + 10] = false} 
                                                            }}></input>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε μία έγκυρη Ημερομηνία Λήξης !</div>
                                                    <div className="invalid_feedback">* Η χρονική σειρά έναρξης και λήξης δεν είναι σωστή !</div>
                                                </div>
                                            </div>
                                            <div className="col" id={"spring_feasts_field_"+index} style={{width: '100%'}}>
                                                <div className="form_group">
                                                    <div className="label">Εορτές ή Αργίες</div>
                                                    <div className="form_control_date" style={{display:'block'}}>
                                                        <ul>
                                                            {validState[(14*index) + 11] = true} 
                                                            {specField?.semestersInfo?.springSemester?.feasts !== undefined && springEmpty[index].fieldEmpty === 'no'  ?
                                                            specField?.semestersInfo?.springSemester?.feasts.map((tag, indexIn) => {
                                                                return (
                                                                    <li key={indexIn}>
                                                                        <span>{tag}</span>
                                                                        <TiDelete className="icon" onClick={() => removeTags('springSemester', 'feasts', indexIn, index)}/>
                                                                    </li>
                                                                )
                                                            }): null}  
                                                        </ul>
                                                    <input type='text'  style={{marginTop: specField?.semestersInfo?.springSemester?.feasts?.length > 0 ? '0.7rem' : '0rem'}} className="form_control" placeholder='Πατήστε το Enter για να προσθέσετε νέες Εορτές ή Αργίες' 
                                                                        onKeyUp={(event)=> event.key === "Enter" ? addTags( 'springSemester', event.target.value, index, event) : null}
                                                                        onClick={handleTagAreaClick(specField?.semestersInfo?.springSemester, "spring_feasts_field_"+ index)}></input>                                               
                                                    </div>
                                                </div>                         
                                            </div> 
                                                {/* EASTER HOLIDAYS */}
                                            <div className="col" id={"spring_holidays_"+index}>
                                                <div className="form_group">
                                                    <div className="label" style={{marginTop:'1.5rem', textAlign:'center'}}>Διακοπές  Πάσχα</div>
                                                    <div className="form_control_inRow">
                                                        Από <div className="form_control_date">
                                                            <div className="day">{specField?.semestersInfo?.springSemester?.fromHoliday_day}</div>
                                                            <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.fromHoliday_date}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate("spring_holidays_"+index, e.target.value); 
                                                                    let validIn = updateValue(index, 'spring', 'fromHoliday_date', e.target.value, "spring_holidays_"+index)  
                                                                    if (validIn !== false) {validState[(14*index) + 12] = true}  else {validState[(14*index) + 12] = false} 
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                    <div className="form_control_inRow" style={{marginTop:'10px'}}  id={"spring_hol_"+index}>
                                                        Έως <div className="form_control_date">
                                                            <div className="day">{specField?.semestersInfo?.springSemester?.toHoliday_day}</div>
                                                            <input type="date" className="form_control" value={specField?.semestersInfo?.springSemester?.toHoliday_date}  
                                                                onChange={(e) => { 
                                                                    handleClickInputDate("spring_hol_"+index, e.target.value); 
                                                                    let validIn = updateValue(index, 'spring', 'toHoliday_date', e.target.value, "spring_holidays_"+index)  
                                                                    if (validIn !== false) {validState[(14*index) + 13] = true}  else {validState[(14*index) + 13] = false} 
                                                                }}></input>
                                                        </div>
                                                    </div>
                                                    <div className="errorPost_feedback">* Παρακαλώ ορίστε έγκυρες Ημερομηνίες!</div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>                                
                            </div>                            
                        </div>                        
                    </div>
                </div>
                )
            })}
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

export default CalendarContainer_Postgraduate