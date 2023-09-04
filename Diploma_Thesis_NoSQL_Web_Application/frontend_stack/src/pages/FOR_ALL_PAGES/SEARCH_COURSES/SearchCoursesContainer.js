import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import ListGroup from 'react-bootstrap/ListGroup'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TreeView from '@mui/lab/TreeView'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Form from 'react-bootstrap/Form';  
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'; 
import IconButton from '@mui/material/IconButton';

// Icons 
import COLLEGE from '../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import UTH_LOGO from '../../../Icons/uth-logo-background.png';
import COURSES from '../../../Icons/COURSES/courses.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoList} from 'react-icons/io5';
import {FcSearch} from 'react-icons/fc'; 
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';   
import {RiQrCodeLine} from 'react-icons/ri';
import {MdAccountBalanceWallet, MdCategory} from 'react-icons/md';
import {VscUngroupByRefType} from 'react-icons/vsc';   
import { FaUser } from "react-icons/fa"; 
import {GiTeacher} from 'react-icons/gi';
import {AiOutlineSelect} from 'react-icons/ai';

// GraphQL Resolvers
import CoursesResolvers from "../../../graphql/resolvers/courses";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/SEARCH_COURSES/searchCoursesContainer.scss'; 

const SearchCoursesContainer = () => {
    const navigate = useNavigate();

    // Setting Variables for the searching criteria
    let [searchingCriteria, setSearchingCriteria] = useState({ study_level: [], semester: [], spec_field: [], course_type: [] });
    // Setting the state variables for the returned courses data
    let [returnedCoursesData, setReturnedCoursesData] = useState([]); 
    // Setting the state variables for the returned courses data
    let [returnedCoursesDataByCode, setReturnedCoursesDataByCode] = useState([]); 
    // State Variable that determines the expnded state of accordions
    let [isExpanded, setIsExpanded] = useState({accordion1:true, accordion2:true, accordion3:true, accordion4:true})  

    // Function that forms the state variable of search criteria
    const addIfNotExist = (newValue, category) => {
        // STUDY LEVEL 
        if (category === 'study_level') {
            // If it exists in array, remove from it
            if (searchingCriteria.study_level.indexOf(newValue) >= 0) {
                let array = []; 
                searchingCriteria.study_level.forEach(item => {
                    if (item !== newValue) {
                        array.push(item);
                    }
                })
                setSearchingCriteria({...searchingCriteria, study_level:array, semester : searchingCriteria.semester, spec_field : searchingCriteria.spec_field, course_type : searchingCriteria.course_type});
            }
            // If it does not exists in array, add to it
            if (searchingCriteria.study_level.indexOf(newValue) === -1) { 
                let array = [...searchingCriteria.study_level];
                array.push(newValue);
                setSearchingCriteria({...searchingCriteria, study_level:array, semester : searchingCriteria.semester, spec_field : searchingCriteria.spec_field, course_type : searchingCriteria.course_type});
            }
        }
        else if (category === 'spec_field') { 
            // If it exists in array, remove from it
            if (searchingCriteria.spec_field.indexOf(newValue) >= 0) {
                let array = []; 
                searchingCriteria.spec_field.forEach(item => {
                    if (item !== newValue) {
                        array.push(item);
                    }
                })
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : searchingCriteria.semester, spec_field : array, course_type : searchingCriteria.course_type});
            }
            // If it does not exists in array, add to it
            if (searchingCriteria.spec_field.indexOf(newValue) === -1) { 
                let array = [...searchingCriteria.spec_field];
                array.push(newValue);
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : searchingCriteria.semester, spec_field : array, course_type : searchingCriteria.course_type});
            } 
        }
        else if (category === 'semester') { 
            // If it exists in array, remove from it
            if (searchingCriteria.semester.indexOf(newValue) >= 0) {
                let array = [];  
                searchingCriteria.semester.forEach(item => {
                    if (item !== newValue) {
                        array.push(item);
                    }
                })
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : array, spec_field : searchingCriteria.spec_field, course_type : searchingCriteria.course_type});
            }
            // If it does not exists in array, add to it
            if (searchingCriteria.semester.indexOf(newValue) === -1) { 
                let array = [...searchingCriteria.semester];
                array.push(newValue);
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : array, spec_field : searchingCriteria.spec_field, course_type : searchingCriteria.course_type});
            } 
        } 
        else if (category === 'course_type') { 
            // If it exists in array, remove from it
            if (searchingCriteria.course_type.indexOf(newValue) >= 0) {
                let array = [];  
                searchingCriteria.course_type.forEach(item => {
                    if (item !== newValue) {
                        array.push(item);
                    }
                })
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : searchingCriteria.semester, spec_field : searchingCriteria.spec_field, course_type : array});
            }
            // If it does not exists in array, add to it
            if (searchingCriteria.course_type.indexOf(newValue) === -1) { 
                let array = [...searchingCriteria.course_type];
                array.push(newValue);
                setSearchingCriteria({...searchingCriteria, study_level: searchingCriteria.study_level, semester : searchingCriteria.semester, spec_field : searchingCriteria.spec_field, course_type : array});
            } 
        }        
    } 
    
    const handlingInput = (courseCode) => {
        console.log(courseCode)
      //  if (courseCode !== "0") {  
            setSearchingCriteria({...searchingCriteria, study_level:[], semester:[], spec_field:[], course_type:[]}); 
            CoursesResolvers.get_courses_containing_course_codes(courseCode)
                .then(result => { 
                    setReturnedCoursesDataByCode(result?.data?.getCoursesContainingCodeChars);                    
                })
                .catch(error=> {
                    console.log(error);
                    throw error;
                })  
      //  }        
    }
        
    // Take the specialization field code of the course according to the name of the field
    const getSpecFieldCode = (courseStudyProgram) => {
        let code = '';
        if (courseStudyProgram === 'ΕΝΕΡΓΕΙΑΣ') {
            code = 'Ε';
        }
        else if (courseStudyProgram === 'ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΥΠΟΛΟΓΙΣΤΩΝ') {
            code = 'ΥΑ';
        }
        else if (courseStudyProgram === 'ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ') {
            code = 'ΕΘ';
        }
        else if (courseStudyProgram === 'ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ') {
            code = 'ΛΠ';
        }
        else if (courseStudyProgram === 'ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ') {
            code = 'ΣΤ';
        }
        else if (courseStudyProgram === 'ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ') {
            code = 'ΑΤ';
        }
        else {
            code = '-';
        }
        return (code)
    }
    console.log(returnedCoursesDataByCode)

    // Handling input criteria changes
    useEffect(() => {
        CoursesResolvers.get_courses_by_criteria(searchingCriteria.study_level, searchingCriteria.spec_field, searchingCriteria.semester, searchingCriteria.course_type)
            .then(result => {
                console.log(result);
                setReturnedCoursesData(result?.data?.getCoursesByCriteria) 
            })        
            .catch(err=> {
                console.log(err);
                setReturnedCoursesData([])
                throw err;
            })
    }, [searchingCriteria])
 
    return (
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={COLLEGE} alt='' /></div>
                    <div className="title"> Μαθήματα
                        <p>Προπτυχιακά Μαθήματα - Μεταπτυχιακά Μαθήματα - Μαθήματα Ισοτιμίας - Μαθήματα ERASMUS </p>
                    </div>
                    <div className="header_area" style={{ marginBottom: '4rem' }}>
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div> 
                    <Grid className="grid_content" container spacing={4} style={{ marginBottom: '5rem' }}>
                        <Grid className="grid_first" item xs={12}>
                            <div className="first_item">
                                <h3>Αναζήτηση Μαθημάτων</h3>
                                <span>Το Πρόγραμμα Σπουδών των Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών διαθέτει μια ποικιλία μαθημάτων <strong style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: '700', color: 'rgb(39, 122, 143)' }}>- ΠΡΟΠΤΥΧΙΑΚΑ - ΜΕΤΑΠΤΥΧΙΑΚΑ - ΙΣΟΤΙΜΙΑΣ - ERASMUS - </strong>Θέστε τα κριτήρια της επιλογής σας για να αναζητήσετε τα μαθήματα που επιθυμείτε.</span>
                            </div>
                            <div className="second_item">
                                <Button className="icon_button" variant="contained" startIcon={<IoList style={{ fontSize: '25px', marginRight: '8px' }} />}
                                    onClick={()=>navigate('/uth-ece/undergraduate_courses_list')}
                                >
                                    ΚΑΤΑΛΟΓΟΣ ΜΑΘΗΜΑΤΩΝ
                                </Button>
                            </div>
                        </Grid>
                        <Grid className="grid_second" item xs={3.5}>
                            <Box className='grid2_box' style={{ borderTop: '5px solid rgba(44, 192, 203, 0.395)', boxShadow: '1px 2px 15px #bebdbd', borderRadius: '10px' }}>
                                <Accordion expanded={isExpanded.accordion1}>
                                    <AccordionSummary 
                                        expandIcon={<ExpandMoreIcon onClick={()=>setIsExpanded({...isExpanded, accordion1:!isExpanded.accordion1})} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#1c878f' }}>Κατηγορία Σπουδών</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Form>
                                            <Form.Check // prettier-ignore   
                                                checked = {searchingCriteria.study_level.indexOf('ΠΡΟΠΤΥΧΙΑΚΟ') >= 0}
                                                onChange={(e) => addIfNotExist(e.target.value, 'study_level')}
                                                type='checkbox'
                                                id='undergraduate_courses'
                                                label='ΠΡΟΠΤΥΧΙΑΚΟ'
                                                value='ΠΡΟΠΤΥΧΙΑΚΟ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.study_level.indexOf('ΜΕΤΑΠΤΥΧΙΑΚΟ') >= 0}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'study_level')}}
                                                type='checkbox'
                                                id='postgraduate_courses'
                                                label='ΜΕΤΑΠΤΥΧΙΑΚΟ'
                                                value='ΜΕΤΑΠΤΥΧΙΑΚΟ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.study_level.indexOf('ERASMUS') >= 0}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'study_level')}}
                                                type='checkbox'
                                                id='erasmus_courses'
                                                label='ERASMUS'
                                                value='ERASMUS'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.study_level.indexOf('ΙΣΟΤΙΜΙΑΣ') >= 0}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'study_level')}}        
                                                type='checkbox'
                                                id='isotimias_courses'
                                                label='ΙΣΟΤΙΜΙΑΣ'
                                                value='ΙΣΟΤΙΜΙΑΣ'
                                            />
                                        </Form>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={isExpanded.accordion2}>
                                    <AccordionSummary
                                        style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#1c878f' }}
                                        expandIcon={<ExpandMoreIcon onClick={()=>setIsExpanded({...isExpanded, accordion2:!isExpanded.accordion2})} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#f09f09' }}>Γνωστικός Τομέας</Typography></AccordionSummary>
                                    <AccordionDetails>
                                        <Form>
                                            <Form.Check 
                                                checked = {searchingCriteria.spec_field.indexOf('ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΥΠΟΛΟΓΙΣΤΩΝ') >= 0}
                                                style={{marginBottom:'1rem'}}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='YA_courses'
                                                label='Υλικού και Αρχιτεκτονικής Υπολογιστών (ΥΑ)'
                                                value='ΥΛΙΚΟΥ ΚΑΙ ΑΡΧΙΤΕΚΤΟΝΙΚΗΣ ΥΠΟΛΟΓΙΣΤΩΝ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.spec_field.indexOf('ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ') >= 0}
                                                style={{marginBottom:'1rem'}}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='ETH_courses'
                                                label='Εφαρμογών και Θεμελειώσεων της Επιστήμης των Υπολογιστών (ΕΘ)'
                                                value='ΕΦΑΡΜΟΓΩΝ ΚΑΙ ΘΕΜΕΛΙΩΣΕΩΝ ΤΗΣ ΕΠΙΣΤΗΜΗΣ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.spec_field.indexOf('ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ') >= 0}
                                                style={{marginBottom:'1rem'}}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='LP_courses'
                                                label='Τεχνολογιών Λογισμικού και Πληροφοριακών Συστημάτων (ΛΠ)'
                                                value='ΤΕΧΝΟΛΟΓΙΩΝ ΛΟΓΙΣΜΙΚΟΥ ΚΑΙ ΠΛΗΡΟΦΟΡΙΑΚΩΝ ΣΥΣΤΗΜΑΤΩΝ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.spec_field.indexOf('ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ') >= 0}
                                                style={{marginBottom:'1rem'}}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='ST_courses'
                                                label='Σημάτων, Τηλεπικοινωνιών και Δικτύων (ΣΤ)'
                                                value='ΣΗΜΑΤΩΝ, ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ ΚΑΙ ΔΙΚΤΥΩΝ'
                                            />
                                            <Form.Check
                                                checked = {searchingCriteria.spec_field.indexOf('ΕΝΕΡΓΕΙΑΣ') >= 0}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='Ε_courses'
                                                label='Ενέργειας (Ε)'
                                                value='ΕΝΕΡΓΕΙΑΣ'
                                            />
                                             <Form.Check
                                                checked = {searchingCriteria.spec_field.indexOf('ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ') >= 0}
                                                onChange={(e) => {addIfNotExist(e.target.value, 'spec_field')}}
                                                type='checkbox'
                                                id='AT_courses'
                                                label='Ανεξάρτητα Γνωστικού Τομέα, Τμήματος ή Πανεπιστημίου Θεσσαλίας (ΑΤ)'
                                                value='ΑΝΕΞΑΡΤΗΤΑ ΓΝΩΣΤΙΚΟΥ ΤΟΜΕΑ, ΤΜΗΜΑΤΟΣ Ή ΠΑΝΕΠΙΣΤΗΜΙΟΥ ΘΕΣΣΑΛΙΑΣ'
                                            />
                                        </Form>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={isExpanded.accordion3}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon onClick={()=>setIsExpanded({...isExpanded, accordion3:!isExpanded.accordion3})} />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#1c878f' }}>Εξάμηνο Σπουδών</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Form>
                                        <Form.Check // prettier-ignore   
                                            checked = {searchingCriteria.semester.indexOf('1') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_1'
                                            label='Εξάμηνο 1ο'
                                            value='1'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('2') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_2'
                                            label='Εξάμηνο 2ο'
                                            value='2'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('3') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_3'
                                            label='Εξάμηνο 3ο'
                                            value='3'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('4') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_4'
                                            label='Εξάμηνο 4ο'
                                            value='4'
                                        />
                                            <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('5') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_5'
                                            label='Εξάμηνο 5ο'
                                            value='5'
                                        />
                                        <Form.Check // prettier-ignore   
                                            checked = {searchingCriteria.semester.indexOf('6') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_6'
                                            label='Εξάμηνο 6ο'
                                            value='6'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('7') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_7'
                                            label='Εξάμηνο 7ο'
                                            value='7'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('8') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_8'
                                            label='Εξάμηνο 8ο'
                                            value='8'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('9') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_9'
                                            label='Εξάμηνο 9ο'
                                            value='9'
                                        />
                                            <Form.Check
                                            checked = {searchingCriteria.semester.indexOf('10') >= 0}
                                            onChange={(e) => {addIfNotExist(e.target.value, 'semester')}}
                                            type='checkbox'
                                            id='semester_10'
                                            label='Εξάμηνο 10ο'
                                            value='10'
                                        />
                                        </Form>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={isExpanded.accordion4}>
                                    <AccordionSummary
                                        style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#1c878f' }}
                                        expandIcon={<ExpandMoreIcon onClick={()=>setIsExpanded({...isExpanded, accordion4:!isExpanded.accordion4})} />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                    >
                                        <Typography style={{ alignItems: 'center', verticalAlign: 'middle', fontWeight: '600', fontSize: '16px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color: '#f09f09' }}>Τύπος Μαθήματος</Typography></AccordionSummary>
                                    <AccordionDetails>
                                    <Form>
                                        <Form.Check // prettier-ignore  
                                            checked = {searchingCriteria.course_type.indexOf('Υποχρεωτικό') >= 0} 
                                            onChange={(e) => {addIfNotExist(e.target.value, 'course_type')}}
                                            type='checkbox'
                                            id='mandatory'
                                            label='Υποχρεωτικό'
                                            value='Υποχρεωτικό'
                                        />
                                        <Form.Check
                                            checked = {searchingCriteria.course_type.indexOf('Επιλογής') >= 0} 
                                            onChange={(e) => {addIfNotExist(e.target.value, 'course_type')}}
                                            type='checkbox'
                                            id='choice'
                                            label='Επιλογής'
                                            value='Επιλογής'
                                        />
                                    </Form>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Grid>
                        <Grid className="grid_third" item xs={8.4}>
                            <Paper style={{margin:'1px 0px', padding:'20px 0px',  minHeight:'1118px', boxShadow:'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px'}} className="paper_grid3">
                            <div className='form-item_search_courses' id='password'>     
                                <FcSearch className='react-icon'/>       
                                <input className="form-input_search_courses" type="text" placeholder="Κωδικός Μαθήματος" 
                                    onChange={(e)=> {e.target.value === '' ? handlingInput("0") : handlingInput(e.target.value)}}
                                />
                            </div>
                            <div style={{padding:'5px 20px', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', fontSize:'10px', color:'rgb(165, 165, 165)', letterSpacing:'0.4px'}} className="info">Πληκτρολογήστε τον κωδικό του μαθήματος που επιθυμείτε να αναζητήσετε</div>
                            <div className="showing_data" style={{display:'flex', paddingLeft: '22px', paddingTop:'27px', flexDirection:'row', gap:'4px', marginBottom:'3rem'}}>
                                <div className="showing_msg" style={{margin:'0px', fontSize:'14px', color:'rgba(34,51,84,0.7)', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', lineHeight:'1.75'}}>Αποτέλεσμα : </div>
                                {searchingCriteria.course_type.length === 0 && searchingCriteria.semester.length === 0 && searchingCriteria.spec_field.length === 0 && searchingCriteria.study_level.length === 0 ?
                                <div className="bold_showing" style={{margin:'0px', fontSize:'14px', color:'rgba(34,51,84,0.7)', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'700', lineHeight:'1.75'}}>{returnedCoursesDataByCode?.length === 1? returnedCoursesDataByCode?.length + ' Μάθημα' : returnedCoursesDataByCode?.length + ' Μαθήματα' }</div>
                                : 
                                <div className="bold_showing" style={{margin:'0px', fontSize:'14px', color:'rgba(34,51,84,0.7)', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'700', lineHeight:'1.75'}}>{returnedCoursesData?.length === 1? returnedCoursesData?.length + ' Μάθημα' : returnedCoursesData?.length + ' Μαθήματα' }</div> }
                            </div>
                            {returnedCoursesData.length === 0 && returnedCoursesDataByCode.length === 0 ?
                            <div className="no_returned_data">
                                <div className="no_returned_data_text">
                                    Δε βρέθηκε κάποιο μάθημα που να αντιστοιχεί στα κριτήρια αναζήτησης που θέσατε !
                                </div>
                                <img src={COURSES} style={{width:'50%', height:'40%', opacity:'0.8'}} alt=''></img>
                            </div> :  
                             searchingCriteria.course_type.length === 0 && searchingCriteria.semester.length === 0 && searchingCriteria.spec_field.length === 0 && searchingCriteria.study_level.length === 0?
                             <TreeView  
                             aria-label="file system navigator"
                             defaultCollapseIcon={<ExpandMoreIcon />}
                             defaultExpandIcon={<ChevronRightIcon />}
                             sx={{ height: '100%', margin:'0px 9px', width:'96%', flexGrow: 1, maxWidth: '96%', overflowY: 'auto' }}
                           >
                            {returnedCoursesDataByCode.map((course, index) => {
                                return(
                                    <TreeItem className="treeItem" key={index} nodeId={course.StudyProgram.course_name} label={course.StudyProgram.course_name + ' (' + course.StudyProgram.course_code + ") "}>
                                        <div className="table_responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><RiQrCodeLine className="icon"/></td>
                                                        <td className="middleText">Όνομα και Κωδικός Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_name + ' (' + course.StudyProgram.course_code + ') '} 
                                                        <OverlayTrigger
                                                            key='right'
                                                            placement='top'									
                                                            overlay={
                                                                <Tooltip style={{marginLeft:'0px'}} id={`tooltip-right`}>
                                                                    <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Μαθήματος</strong></div>
                                                                </Tooltip>
                                                            }
                                                        ><IconButton onClick={() => course.StudyProgram.specialization_field === '-' ? navigate('/uth-ece/studies/undergraduate/courses/'+course.StudyProgram.course_code) : navigate('/uth-ece/studies/postgraduate/courses/'+course.StudyProgram.course_code)} aria-label="find" color="primary"><AiOutlineSelect style={{fontSize:'18px', color:'#df990f'}} /></IconButton></OverlayTrigger>		
                                                        </td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.studyProgram_name}>
                                                        <td><SchoolIcon className="icon"/></td>
                                                        <td className="middleText">Πρόγραμμα Σπουδών</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.studyProgram_name} ({course.StudyProgram.studyProgram_num})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.study_program}>
                                                        <td><AutoAwesomeMosaicIcon className="icon"/></td>
                                                        <td className="middleText">Γνωστικό Αντικείμενο</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_program} ({getSpecFieldCode(course.StudyProgram.study_program)})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.semester}>
                                                        <td><CalendarMonthIcon className="icon"/></td>
                                                        <td className="middleText">Εξάμηνο</td>
                                                        {course.StudyProgram.period === 'Χειμερινή' ?
                                                            <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.semester.split(' ')[0] !== 'Εξάμηνο ' ? 'Εξάμηνο' + course.StudyProgram.semester + ' - Χειμερινό' : course.StudyProgram.semester}</td> :
                                                            <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.semester.split(' ')[0] !== 'Εξάμηνο ' ? 'Εξάμηνο' + course.StudyProgram.semester + ' - Εαρινό' : course.StudyProgram.semester}</td>}
                                                    </tr>
                                                    <tr key= {course.StudyProgram.course_type}>
                                                        <td><ClassIcon className="icon"/></td>
                                                        <td className="middleText">Τύπος Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_type}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.course_category}>
                                                        <td><MdCategory className="icon"/></td>
                                                        <td className="middleText">Κατηγορία</td>
                                                        <td className="rightText" style={{fontWeight : '500'}}>{course?.StudyProgram?.course_category}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.ECTS}>
                                                        <td><ConfirmationNumberIcon className="icon"/></td>
                                                        <td className="middleText">Μονάδες ECTS</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.ECTS}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.study_units}>
                                                        <td><MdAccountBalanceWallet className="icon"/></td>
                                                        <td className="middleText">ΔΜ</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_units}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.category}>
                                                        <td><VscUngroupByRefType className="icon"/></td>
                                                        <td className="middleText">Κατεύθυνση</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_part}</td>
                                                    </tr> 
                                                    <tr key={course?.More?.course_active}>
                                                        <td><FaUser className="icon"/></td>
                                                        <td className="middleText">Υπεύθυνος Καθηγητής</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>
                                                        {course.CourseManagement.COURSE_DIRECTOR.director_LastName + ' ' + course.CourseManagement.COURSE_DIRECTOR.director_FirstName + ' , ' + course.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}
                                                        </td>
                                                    </tr>  
                                                    <tr key={course?.More?.course_active}>
                                                        <td><GiTeacher className="icon"/></td>
                                                        <td className="middleText">Διδάσκοντες Καθηγητές</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>
                                                        <ListGroup style={{marginTop:'1rem'}}>
                                                        {course.CourseManagement.COURSE_INSTRUCTORS.map((instructor, instrIndex) => {
                                                            return(
                                                                <ListGroup.Item key={{instrIndex}} style={{border:'0px solid white', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color:'rgb(87, 87, 87)', backgroundColor:'transparent', fontWeight:'500'}}> 
                                                                    {instructor.instructor_LastName + ' ' + instructor.instructor_FirstName + ' - ' + instructor.instructor_director_ProfessorType}
                                                                </ListGroup.Item>                                                                
                                                            )                                                            
                                                        })}
                                                        </ListGroup>
                                                        </td>
                                                    </tr>                                             
                                                </tbody>
                                            </table>
                                        </div> 
                                    </TreeItem>
                                )                                
                            })}      
                             </TreeView>  : 
                             <TreeView  
                             aria-label="file system navigator"
                             defaultCollapseIcon={<ExpandMoreIcon />}
                             defaultExpandIcon={<ChevronRightIcon />}
                             sx={{ height: '100%', margin:'0px 9px', width:'96%', flexGrow: 1, maxWidth: '96%', overflowY: 'auto' }}
                           >
                            {returnedCoursesData.map((course, index) => {
                                console.log(course.StudyProgram.semester.split(' ')[0] !== 'Εξάμηνο')
                                return(
                                    <TreeItem className="treeItem" key={index} nodeId={course.StudyProgram.course_name} label={course.StudyProgram.course_name + ' (' + course.StudyProgram.course_code + ") "}>
                                        <div className="table_responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td><RiQrCodeLine className="icon"/></td>
                                                        <td className="middleText">Όνομα και Κωδικός Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_name + ' (' + course.StudyProgram.course_code + ') '} 
                                                        <OverlayTrigger
                                                            key='right'
                                                            placement='top'									
                                                            overlay={
                                                                <Tooltip style={{marginLeft:'0px'}} id={`tooltip-right`}>
                                                                    <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ Μαθήματος</strong></div>
                                                                </Tooltip>
                                                            }
                                                        ><IconButton onClick={() => course.StudyProgram.specialization_field === '-' ? navigate('/uth-ece/studies/undergraduate/courses/'+course.StudyProgram.course_code) : navigate('/uth-ece/studies/postgraduate/courses/'+course.StudyProgram.course_code)} aria-label="find" color="primary"><AiOutlineSelect style={{fontSize:'18px', color:'#df990f'}} /></IconButton></OverlayTrigger>		
                                                        </td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.studyProgram_name}>
                                                        <td><SchoolIcon className="icon"/></td>
                                                        <td className="middleText">Πρόγραμμα Σπουδών</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.studyProgram_name} ({course.StudyProgram.studyProgram_num})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.study_program}>
                                                        <td><AutoAwesomeMosaicIcon className="icon"/></td>
                                                        <td className="middleText">Γνωστικό Αντικείμενο</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_program} ({getSpecFieldCode(course.StudyProgram.study_program)})</td>
                                                    </tr>
                                                    <tr key={course.StudyProgram.semester}>
                                                        <td><CalendarMonthIcon className="icon"/></td>
                                                        <td className="middleText">Εξάμηνο</td>
                                                        {course.StudyProgram.period === 'Χειμερινή' ?
                                                            <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.semester.split(' ')[0] !== 'Εξάμηνο' ? 'Εξάμηνο ' + course.StudyProgram.semester + ' - Χειμερινό' : course.StudyProgram.semester}</td> :
                                                            <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.semester.split(' ')[0] !== 'Εξάμηνο' ? 'Εξάμηνο ' + course.StudyProgram.semester + ' - Εαρινό' : course.StudyProgram.semester}</td>}
                                                    </tr>
                                                    <tr key= {course.StudyProgram.course_type}>
                                                        <td><ClassIcon className="icon"/></td>
                                                        <td className="middleText">Τύπος Μαθήματος</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.course_type}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.course_category}>
                                                        <td><MdCategory className="icon"/></td>
                                                        <td className="middleText">Κατηγορία</td>
                                                        <td className="rightText" style={{fontWeight : '500'}}>{course?.StudyProgram?.course_category}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.ECTS}>
                                                        <td><ConfirmationNumberIcon className="icon"/></td>
                                                        <td className="middleText">Μονάδες ECTS</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.ECTS}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.study_units}>
                                                        <td><MdAccountBalanceWallet className="icon"/></td>
                                                        <td className="middleText">ΔΜ</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_units}</td>
                                                    </tr>
                                                    <tr key={course?.StudyProgram?.category}>
                                                        <td><VscUngroupByRefType className="icon"/></td>
                                                        <td className="middleText">Κατεύθυνση</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>{course.StudyProgram.study_part}</td>
                                                    </tr> 
                                                    <tr key={course?.More?.course_active}>
                                                        <td><FaUser className="icon"/></td>
                                                        <td className="middleText">Υπεύθυνος Καθηγητής</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>
                                                        {course.CourseManagement.COURSE_DIRECTOR.director_LastName + ' ' + course.CourseManagement.COURSE_DIRECTOR.director_FirstName + ' , ' + course.CourseManagement.COURSE_DIRECTOR.director_ProfessorType}
                                                        </td>
                                                    </tr>  
                                                    <tr key={course?.More?.course_active}>
                                                        <td><GiTeacher className="icon"/></td>
                                                        <td className="middleText">Διδάσκοντες Καθηγητές</td>
                                                        <td className="rightText" style={{fontWeight:'500'}}>
                                                        <ListGroup style={{marginTop:'1rem'}}>
                                                        {course.CourseManagement.COURSE_INSTRUCTORS.map((instructor, instrIndex) => {
                                                            return(
                                                                <ListGroup.Item key={{instrIndex}} style={{border:'0px solid white', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color:'rgb(87, 87, 87)', backgroundColor:'transparent', fontWeight:'500'}}> 
                                                                    {instructor.instructor_LastName + ' ' + instructor.instructor_FirstName + ' - ' + instructor.instructor_director_ProfessorType}
                                                                </ListGroup.Item>                                                                
                                                            )                                                            
                                                        })}
                                                        </ListGroup>
                                                        </td>
                                                    </tr>                                             
                                                </tbody>
                                            </table>
                                        </div> 
                                    </TreeItem>
                                )                                
                            })}      
                             </TreeView>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div> 
    )
}

export default SearchCoursesContainer;

