import React, {useEffect, useState, useCallback} from 'react';
import moment from 'moment';

// Components 
import CalendarContainer_Undergraduate from './CalendarContainer_Undergraduate';
import CalendarContainer_Postgraduate from './CalendarContainer_Postgraduate';

// GraphQL resolvers
import SpecializationResolvers from '../../../../graphql/resolvers/courses';

// Icons
import UTH_LOGO from '../../../../Icons/uth-logo-background.png';
import CALENDAR from '../../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';


// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/ACADEMIC_CALENDAR/CREATE_CALENDAR/calendarContainer.scss'

const CalendarContainer = () => {
    // Setting and initializing the state variables that stores the state of the udergraduate and postgraduate levels
    let [undergraduateLevel, setUndergraduateLevel] = useState('undergraduate active');
    let [postgraduateLevel, setPostgraduateLevel] = useState('postgraduate');
    let [graduateLevel, setGraduationLevel] = useState('Π.Π.Σ.');
    let [winterFeasts, setWinterFeasts] = useState([]);
    let [springFeasts, setSpringFeasts] = useState([]);

    // Setting the state variable that will store the academic year whose the academic calendar we want to create
    let [academicYear, setAcademicYear] = useState('');

    // Setting and initialize a dynamic array of objects that will store the input data of the academic semesters
    // for each specialization field of postgraduate studies
    let [postgraduateCalendar, setPostgraduateCalendar] = useState([]);

    // Setting the object that will store the input data for each one between two academic semesters (winter - spring) for each
    // specialization field of postgraduate study level
    let [semestersData, setSemestersData] = useState({})

        // Determine the current Date
        const currDate = new Date();    
        const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
        const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)
    
        let currAcademicYear = '';    // initialiaze current academic year variabe
        // Create an array with the current academic and the next academic year's selections
        let acadYears = [];
    
        // Find the current academic year 
        if (currMonth > 9 && currMonth <= 12) {
            currAcademicYear = currYear + '-' + currYear+1;        
            acadYears = [ Number(currYear + 1) + '-' + Number(currYear + 2), currAcademicYear]
            if (academicYear === '') {
                setAcademicYear(acadYears[0]);
            }        
        }
        else {
            currAcademicYear = currYear-1 + '-' + currYear;
            acadYears = [currYear + '-' + Number(currYear + 1), currAcademicYear]
            if (academicYear === '') {
                setAcademicYear(acadYears[0]);
            } 
        }  
    
        // Handling the undergraduate level selection
        const clickUnderGraduate = () => {
            setUndergraduateLevel('undergraduate active');
            setPostgraduateLevel('postgraduate');
            setGraduationLevel('Π.Π.Σ.');
        }
    
        // Handling the undergraduate level selection
        const clickPostGraduate = () => {
            setUndergraduateLevel('undergraduate');
            setPostgraduateLevel('postgraduate active');
            setGraduationLevel('Π.M.Σ.');
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

        useEffect(() => {  
            let feastArray = []; 
            winterFeasts = [];
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
            setWinterFeasts(feastArray);
                    
        }, [academicYear, findCorresspondingDay])

         // Determine the known feasts of the spring-summer semester 
        useEffect(() => { 
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
            setSpringFeasts(feastArray)
        }, [academicYear, findCorresspondingDay])
       
        
        if (postgraduateLevel === 'postgraduate active' && postgraduateCalendar.length === 0) {
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
 
    return (
        <div className="calendar_container">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={CALENDAR} alt='' /></div>
                    <div className="title">Ακαδημαϊκό Ημερολόγιο {graduateLevel} 
                        <p>Ακαδημαϊκού Έτους 
                            <select onChange={(e) => setAcademicYear(e.target.value)}>
                                <option value={acadYears[0]}>{acadYears[0]}</option>
                                <option value={acadYears[1]}>{acadYears[1]}</option>
                            </select>
                        </p>
                    </div>
                    <div className="header_area">
                        <div className="study_levels">
                            <div className={undergraduateLevel} onClick={() => clickUnderGraduate()}>ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ</div>
                            <div className={postgraduateLevel} onClick={() => clickPostGraduate()}>ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ</div>
                        </div>
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Παρακαλώ ορίστε τις ακριβείς ημερομηνίες για τα εξάμηνα σπουδών του τρέχοντος ακαδημαικού έτους, όπως αυτές έχουν οριστεί από τη Σύγκλητο του Πανεπιστημίου Θεσσαλίας. Παράλληλα, καθορίστε τις ημερομηνίες έναρξης και λήξης  των Δηλώσεων μαθημάτων και συγγραμμάτων για το εκάστοτε εξάμηνο σπουδών :</div>
                    {undergraduateLevel === 'undergraduate active' && postgraduateLevel === 'postgraduate' ? <CalendarContainer_Undergraduate academicYear = {academicYear} /> : null}
                    {undergraduateLevel === 'undergraduate' && postgraduateLevel === 'postgraduate active' ? <CalendarContainer_Postgraduate academicYear = {academicYear} winterFeasts = {winterFeasts} springFeasts={springFeasts} /> : null}
                </div>
            </div>
        </div>
    )
}

export default CalendarContainer;