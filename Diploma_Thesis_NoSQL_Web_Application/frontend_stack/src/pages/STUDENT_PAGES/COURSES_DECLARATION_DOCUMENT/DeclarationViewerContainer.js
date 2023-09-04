import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box , Avatar, Paper, Divider, Button} from '@mui/material';
import {Form, Row, Table, Modal} from 'react-bootstrap'; 
import ListGroup from 'react-bootstrap/ListGroup'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Icons 
import STUDENTS from '../../../../src/Icons/STUDENTS/students.jpeg';
import UTH_LOGO from '../../../../src/Icons/uth-logo-background.png';
import UTH_LOGO_FORM from '../../../../src/Icons/transparentLogo.jpg';
import newFemaleStudent from '../../../../src/Icons/female-student.png';
import newMaleStudent from '../../../../src/Icons/male-student.png';
import {FaGraduationCap} from 'react-icons/fa'; 
import {HiClipboardDocumentList} from 'react-icons/hi2';
import { FcOk } from 'react-icons/fc';
import { BsFileEarmarkPdf } from 'react-icons/bs';

// GraphQL Resolvers
import DeclarationResolvers from '../../../graphql/resolvers/declarations';

// Components
import Login from '../../../../src/components/LOGIN';

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/COURSES_DECLARATION_DOCUMENT/declarationViewerContainer.scss'; 

// Modal PDF 
function MyVerticallyCenteredModal(props) {
    const ref = React.createRef();  

    const showPDF = () => {
        let pdfTable = document.getElementById('mydoc')
        if (pdfTable !== null) {
            html2canvas(pdfTable,  {useCORS: true}).then(function(canvas) {         
                let imgData = canvas.toDataURL(
                    'image/png');  
                var doc = new jsPDF("p", "mm", "a4");
                var width = doc.internal.pageSize.getWidth()-5;
                var height = doc.internal.pageSize.getHeight()-5;
                doc.addImage(imgData, 'PNG', 2.8, 2.8, width, height); 
                doc.save('ΔΗΛΩΣΗ_ΜΑΘΗΜΑΤΩΝ.pdf');     
            })
        }
    }  
    let [coursesGroupBySemester, setCoursesGroupBySemester] = useState([]);  

    // Determine the different semesters of declarated data  /* 
    useEffect(() => { 
        const cats = props?.declaration_basic?.declarated_courses.reduce((catsSoFar, {semester, course_name, ECTS, course_type, study_hours }) => {
            if (!catsSoFar[semester]) catsSoFar[semester] = [];
            catsSoFar[semester].push({course_name, ECTS, course_type, study_hours});
            return catsSoFar;
        }, {}) 
        setCoursesGroupBySemester(Object.entries(cats))
        
    }, [props?.declaration_basic])    
    
    return (     
        <Modal
            {...props}
            aria-labelledby="contained--title-vcenter"
            centered
            size="lg"
            style={{ height: 'fit-content' }}
        >
            <Modal.Header closeButton onClick={() => props.onHide()}>
                <Modal.Title id="contained--title-vcenter">
                    {props.formKind}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignContent: 'center', overflow: 'scroll', height: "500px" }}>
                <div className="main_form2">
                    <div className='insider_form' ref={ref} id="mydoc">
                        <div className="main_form_header">
                            <div className="department_greek">
                                <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                                <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                                <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                            </div>
                            <img className="form_logo" src={UTH_LOGO_FORM} alt="" />
                            <div className="department_eng">
                                <div className="university">UNIVERSITY OF THESSALY</div>
                                <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                                <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>
                            </div>
                        </div>
                        <div className='declaration_title'
                            style={{
                                fontWeight: 700, letterSpacing: '1px', textAlign: 'center', width: '100%', paddingBottom: '5px',
                                color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                fontSize: '17px', marginTop: '3rem', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 'auto', marginRight: 'auto'
                            }}
                        >{props.title}</div>
                        <Divider style={{border:'0.5px solid black', marginBottom: '2rem'}}></Divider>
                        <div className='basicInfo'>
                            <div className='name' style={{
                                fontWeight: 600, letterSpacing: '1px', textAlign: 'left', width: '100%', paddingBottom: '1px',
                                color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                fontSize: '14px', display: 'flex', marginLeft: '0px', marginRight: 'auto'
                            }}
                            >{props?.courses_declaration_info?.student_LastName + ' ' + props?.courses_declaration_info?.student_FirstName + ' (' + props?.courses_declaration_info?.student_AEM + ') '}</div>
                            <div className='semester' style={{
                                fontWeight: 600, letterSpacing: '1px', textAlign: 'left', width: '100%', paddingBottom: '1px',
                                color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                fontSize: '14px', display: 'flex', marginLeft: '0px', marginRight: 'auto'
                            }}
                            >{'Τυπικό Εξάμηνο : ' + props?.courses_declaration_info?.student_academic_semester}</div>
                            <div className='semester' style={{
                                fontWeight: 600, letterSpacing: '1px', textAlign: 'left', width: '100%', paddingBottom: '1px',
                                color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                fontSize: '14px', display: 'flex', marginLeft: '0px', marginRight: 'auto'
                            }}
                            >{'Ημερομηνία Ανανέωσης Εγγραφής : ' + props?.declaration_basic?.declDay + '/' + props?.declaration_basic?.declMonth + '/' + props?.declaration_basic?.declYear}</div>
                        </div>
                        <div className='semester' style={{
                            fontWeight: 600, letterSpacing: '1px', textAlign: 'left', width: '100%', paddingBottom: '1px',
                            color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '14px', display: 'flex', marginLeft: '0px', marginRight: 'auto', marginBottom:'2rem'
                        }}
                        >{'Τελευταία Τροποποίηση : ' + props?.declaration_basic?.declDay + '/' + props?.declaration_basic?.declMonth + '/' + props?.declaration_basic?.declYear + ' , ' + props?.declaration_basic?.declHour + ':' + props?.declaration_basic?.declMinutes + ':' + props?.declaration_basic?.declSeconds}</div>
                        <Divider style={{border:'0.5px solid black'}}></Divider>
                        {coursesGroupBySemester.map((semester, index) => {
                            return (
                                <div key={index}>
                                    <span style={{
                                         fontWeight: 600, letterSpacing: '1px', textAlign: 'left', width: '100%', paddingTop:'8px',paddingBottom:'8px', paddingLeft:'8px', backgroundColor:'#17a3b820',
                                         color: 'black', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                         fontSize: '14px', display: 'flex', marginLeft: '0px', marginRight: 'auto', 
                                    }}>{'Εξάμηνο ' + semester[0] }</span>                                    
                                        <Table style={{width:'100%', backgroundColor:'transparent', boxShadow:'0px 0px 0px 0px white', display:'inline-table'}}>
                                        <thead>
                                            <tr> 
                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',width:'45%', padding: '2px 8px'}} key='Μάθημα'>Μάθημα</th> 
                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center'}} key='Τύπος'>Τύπος</th>
                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center'}} key='ECTS'>ECTS</th> 
                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center'}} key='Ωρες'>'Ωρες</th>
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            {semester[1]?.map((declaratedCourse, courseIndex) => {
                                                return(
                                                courseIndex === semester[1].length - 1 && index === coursesGroupBySemester.length - 1 ?    
                                                <>                                                    
                                                        <tr key={courseIndex + 'a'}> 
                                                        <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', width:'45%', fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.course_name}</td> 
                                                        <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center',  fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.course_type}</td>
                                                        <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center', fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.ECTS}</td>
                                                        <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center',  fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.study_hours}</td>      
                                                        </tr>  
                                                            <tr key={courseIndex + 'b'}> 
                                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',width:'45%',  padding: '2px 8px', marginBottom:'-8px', backgroundColor:'rgba(231, 231, 231, 0.273)', fontWeight:'600'}} key='total'>Σύνολο</th> 
                                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center',  marginBottom:'-8px', backgroundColor:'rgba(231, 231, 231, 0.273)', zIndex:'222'}} key='type_total'><p style={{zIndex:'-1', fontWeight:'400', opacity:'0', paddingBottom:'0px', marginBottom:'0px'}}>Typos</p></th>
                                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center', marginBottom:'-8px', backgroundColor:'rgba(231, 231, 231, 0.273)', fontWeight:'600'}} key='ECTS_total'>{props?.courses_declaration_info?.ECTS_sum}</th> 
                                                            <th style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'0px 8px', textAlign:'center',  marginBottom:'-8px', backgroundColor:'rgba(231, 231, 231, 0.273)', fontWeight:'600'}} key='hours_total'>{props?.courses_declaration_info?.hours_sum}</th>
                                                            </tr> 
                                                </>
                                                :  
                                                <tr key={courseIndex}> 
                                                <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', width:'45%', fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.course_name}</td> 
                                                <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center',  fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.course_type}</td>
                                                <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center', fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.ECTS}</td>
                                                <td style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',padding:'5px 8px', textAlign:'center',  fontSize:'14px', letterSpacing:'1px'}}>{declaratedCourse?.study_hours}</td>      
                                                </tr> 
                                                )                                      
                                                })
                                            } 
                                        </tbody>                                        
                                    </Table> 
                                </div>
                            )
                        })}                                          
                    </div>                                      
                </div>                   
        </Modal.Body>
        <Modal.Footer>
                <Button className="button" onClick={showPDF}>
                    Save
                </Button>
            </Modal.Footer>
      </Modal> 
    );
}

const DeclarationViewerContainer = (props) => {
    // Get the connected user fromthe arguments    
    const connectedUser = props?.connectedUser?.data; 
    const connectedUserIdentity = props?.connectedUser?.identity; 

    const navigate = useNavigate();

    // Get the token from the local storage
    const token = localStorage.getItem('token');
    console.log(connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');
    // Setting the state variable that will store the current academic exam period
    let [academicExamPeriod, setAcademicExamPeriod] = useState(''); 

    // Setting the state variable that will store all the student declarations
    let [studentDeclarations, setStudentDeclarations] = useState(null);
    // Setting the state variable that will store the information of the selected declaration
    let [selectedDeclaration, setSelectedDeclaration] = useState(null);
    // State Variable that will store the basic Information from the new registered course declaration
    let [courseDeclarationBasicInfo, setCourseDeclarationBasicInfo] = useState({declDay : 0, declMonth : 0, declYear : 0, declHour : 0, declMinutes : 0, declSeconds : 0, declarated_courses : []});
    // State Variable that determines the state of  window for courses declaration pdf
    const [modalShowPDF, setModalShowPDF] = useState(false);

    // Determine the current Academic Year and the current academic semester
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();         // Get current year (to determine the current academic year)

    let currAcademicYear = '';    // initialiaze current academic year variabe

    // Find the current ACADEMIC YEAR
    if (currMonth > 9 && currMonth <= 12) {
        currAcademicYear = currYear + '-' + currYear+1;        
        //acadYears = [ Number(currYear + 1) + '-' + Number(currYear + 2), currAcademicYear]
        if (academicYear === '') {
            setAcademicYear(currAcademicYear);
        }        
    }
    else {
        currAcademicYear = currYear-1 + '-' + currYear;
        //acadYears = [currYear + '-' + Number(currYear + 1), currAcademicYear]
        if (academicYear === '') {
            setAcademicYear(currAcademicYear);
        } 
    }  

    // Find the current ACADEMIC SEMESTER
    if (currMonth >=9 && currMonth <= 2) {  
        if (academicSemester === '') {
            setAcademicSemester('Χειμερινό');
        }                
    } 
    else {
        if (academicSemester === '') {
            setAcademicSemester('Εαρινό');
        } 
    } 

    // Find the current ACADEMIC EXAM PERIOD
    if (currMonth>=9 && currMonth <= 10) {  
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Σεπτεμβρίου');
        }                
    } 
    else if (currMonth >=11 && currMonth <= 2){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιανουαρίου');
        } 
    } 
    else if (currMonth >=3 && currMonth <= 8){
        if (academicExamPeriod === '') {
            setAcademicExamPeriod('Ιουνίου');
        } 
    } 

    // Get the information data for all the student's declarations
    if (studentDeclarations === null && token !== null && connectedUserIdentity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') {
        DeclarationResolvers.find_all_declarations_by_student_AEM(connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
            .then(result => {
                setStudentDeclarations(result?.data?.findAllDeclarationsByAEM);
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    } 

     // Get the information data for all the student's declarations
     if (studentDeclarations === null && token !== null && connectedUserIdentity === 'ΓΡΑΜΜΑΤΕΙΑ') {
        DeclarationResolvers.get_all_declarations()
            .then(result => {
                setStudentDeclarations(result?.data?.getAllDeclarations);
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    } 

    // Handling the selected student declaration
    const handleSelectDeclaration = (indexIn) => {
        let state = '';
        if (academicSemester === 'Εαρινό') {
            state =  'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear;
        } 
        else {
            state = 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear
        } 

        if (state!== '' && indexIn === state) {
            navigate('/e_secretariat/submit_my_course_declaration');
        }
        else if (state !== '') {
            //console.log(indexIn)
            studentDeclarations.forEach((item, index) => {
                console.log(index);
                console.log(indexIn, 'in')           
                if (index === Number(indexIn)) { 
                    setSelectedDeclaration(item);
                }
            })
        }
    }  

    // If the course declaration is ready and it has been inserted to the corresponding database, we will take the basic info for this
    const AEM = connectedUser?.Studentship_Info?.General_Information?.academic_record_number;
    useEffect(() => {
        if (selectedDeclaration !== null && connectedUserIdentity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') {

            // Determine the input data to resolver              
            if (selectedDeclaration.academic_period !== undefined) { 
                DeclarationResolvers.get_course_declaration_basic_info(AEM, selectedDeclaration.academic_period, selectedDeclaration.academic_year)
                    .then(result => { 
                        let localHour = result?.data?.getBasicForDeclaration?.dateParts?.hour + 3;
                        if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 22) {
                            localHour = 1;
                        }
                        else if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 23) {
                            localHour = 2;
                        }
                        else if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 24) {
                            localHour = 3;
                        }
                        setCourseDeclarationBasicInfo(courseDeclarationBasicInfo=> ({...courseDeclarationBasicInfo, declYear:result?.data?.getBasicForDeclaration?.dateParts?.year, declMonth:result?.data?.getBasicForDeclaration?.dateParts?.month, declDay:result?.data?.getBasicForDeclaration?.dateParts?.day, declHour: localHour , declMinutes : result?.data?.getBasicForDeclaration?.dateParts?.minute, declSeconds : result?.data?.getBasicForDeclaration?.dateParts?.second, declarated_courses : result?.data?.getBasicForDeclaration?.declarated_courses}))
                    })
                    .catch(err=> {
                        console.log(err);
                        throw err;
                    }) 
                }
        }
        else if (selectedDeclaration !== null && connectedUserIdentity === 'ΓΡΑΜΜΑΤΕΙΑ') {
            
            // Determine the input data to resolver              
            if (selectedDeclaration.academic_period !== undefined) { 
                DeclarationResolvers.get_course_declaration_basic_info(selectedDeclaration.student_AEM, selectedDeclaration.academic_period, selectedDeclaration.academic_year)
                    .then(result => { 
                        let localHour = result?.data?.getBasicForDeclaration?.dateParts?.hour + 3;
                        if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 22) {
                            localHour = 1;
                        }
                        else if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 23) {
                            localHour = 2;
                        }
                        else if (result?.data?.getBasicForDeclaration?.dateParts?.hour === 24) {
                            localHour = 3;
                        }
                        setCourseDeclarationBasicInfo(courseDeclarationBasicInfo=> ({...courseDeclarationBasicInfo, declYear:result?.data?.getBasicForDeclaration?.dateParts?.year, declMonth:result?.data?.getBasicForDeclaration?.dateParts?.month, declDay:result?.data?.getBasicForDeclaration?.dateParts?.day, declHour: localHour , declMinutes : result?.data?.getBasicForDeclaration?.dateParts?.minute, declSeconds : result?.data?.getBasicForDeclaration?.dateParts?.second, declarated_courses : result?.data?.getBasicForDeclaration?.declarated_courses}))
                    })
                    .catch(err=> {
                        console.log(err);
                        throw err;
                    }) 
                }
        }
    }, [selectedDeclaration, AEM, connectedUserIdentity])       

 
    return( 
        <>
        {token !== null ? 
        connectedUserIdentity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ?
        <div className="declarationViewer_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={STUDENTS} alt='' /></div>
                    <div className="title"> my - Δηλώσεις 
                        <p>Οι Δηλώσεις μου ανά Περίοδο Δήλωσης</p>
                    </div>
                    <div className="header_area_declarationViewer"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Στη σελίδα που ακολουθεί μπορείτε να δείτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>όλες τις Δηλώσεις Μαθημάτων</strong> που έχετε πραγματοποιήσει ανά περιόδους δηλώσεων. Επιλέξτε την περίοδο δήλωσης που επιθυμείτε και δείτε τα μαθήματα που συμπεριλάβατε στη δήλωση που της αντιστοιχεί. Σε περιόδους ανοιχτών δηλώσεων μαθημάτων σας δίνεται η δυνατότητα να μεταφερθείτε στην κατάλληλη σελίδα προκειμένου να πραγματοποιήσετε ή να ανανεώσετε τη δήλωσή σας.{/*<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τη βαθμολογία των εγγεγραμμένων στο μάθημά σας φοιτητών</strong> και εφόσον είστε έτοιμοι επιλέξτε το κατάλληλο button για <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>ολοκλήρωση της διαδικασίας</strong> και <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τελική υποβολή της βαθμολογίας του εκάστοτε φοιτητή στην Ηλεκτρονική Γραμματεία του Τμήματος</strong>. Στο τέλος του εξαμήνου διαγράψτε όλους τους φοιτητές που έχουν επιτύχει και έχουν ολοκληρώσει με το μάθημά σας και περιμένετε μέχρι την εγγραφή των νέων φοιτητών*/}</div>           
                </div>
                <div className='course_grading_container'>
                    <div className='declaration_object'>
                        <div className='page_title'>
                            <Box className='course_grading_box'>
                                <Box className='first_box'>
                                    <Avatar className='avatar_title'>
                                        <FaGraduationCap className='courses_icon'/>  
                                    </Avatar>
                                    <Box className='box_container'>
                                        <div className='typography_title'>Οι Δηλώσεις μου</div>
                                        <div className='typography_content'><strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', verticalAlign:'middle', justifyContent:'center', alignItems:'center', marginLeft:'5px', marginRight:'5px'}}>{connectedUser?.Personal_Info?.Personal_Information?.last_name + ' ' + connectedUser?.Personal_Info?.Personal_Information?.first_name + ' (' + connectedUser?.Studentship_Info?.General_Information?.academic_record_number+ ')  - Εξάμηνο Σπουδών : ' + connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + 'o  - ' + connectedUser?.Studentship_Info?.General_Information?.current_attendance_period + ' Περίοδος'}</strong></div>
                                        {/*<div className='typography_content'><MdEditDocument style={{verticalAlign :'middle',  display:'inline-flex', color:'#17a3b895',  marginTop:'3px', fontSize:'18px', marginRight:'5px'}}/><strong style={{marginRight:'5px', verticalAlign:'middle', marginTop:'3px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξεταστική Περίοδος</strong> <strong style={{marginRight:'5px',marginLeft:'2px', verticalAlign:'middle', marginTop:'3px', color:'#17a2b8', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> {academicExamPeriod}</strong></div>*/}
                                    </Box>                                   
                                </Box>                                 
                            </Box>
                        </div>                        
                        <div className='overflow_text'>
                            <p className='moving_text'>Ενεργή Περίοδος Δηλώσεων Μαθημάτων {academicSemester === 'Εαρινό' ? 'Εαρινού' : 'Χειμερινού'} Εξαμήνου {academicYear}</p> 
                        </div>  
                        <div className='main_content'>
                            <Paper className='main_paper' style={{marginBottom: '5rem'}} >
                                <Box className='main_box' style={{marginBottom: '3rem'}}>
                                    <Box className='box_container' style={{marginBottom: '5rem'}}>
                                        <HiClipboardDocumentList style={{ fontSize:'3rem', marginLeft:'5px', color:'gray', opacity:'0.7'}}/>
                                        <div className='text_input'>
                                            <h4>Επιλέξτε Περίοδο Δήλωσης ...</h4>
                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className='typography_content'>Μέχρι τώρα έχετε υποβάλλει επιτυχώς <strong style={{verticalAlign:'middle', marginTop:'3px', marginLeft:'3px', color:'#ffae18', marginRight:'3px'}}>{studentDeclarations!==null ? studentDeclarations.length : 0}</strong> Δηλώσεις Μαθημάτων</div>
                                        </div>                                       
                                    </Box>
                                    <Box className='select_box'>
                                        <Form.Select aria-label="Default select example" onChange={(e) => handleSelectDeclaration(e.target.value)}>
                                            <option style={{display:'none'}}>Επιλέξτε Περίοδο Δήλωσης</option>
                                            <option 
                                                style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                            value={academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear }>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ '+ academicYear }</option>
                                            {studentDeclarations!== null && studentDeclarations.map((item, index) => {
                                                return (
                                                    <option key = {index} 
                                                        style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                    value={index}>{item.declaration_type}</option>
                                                )
                                            })} 
                                        </Form.Select>
                                    </Box>
                                    {selectedDeclaration !== null ?
                                    <div className='form_declaration'>
                                       <Form>
                                        <Row className="mb-3">
                                            <ListGroup>
                                                <ListGroup.Item style={{display:'flex', alignItems:'center', border:'0px solid transparent'}}>
                                                    <Avatar src={connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? newFemaleStudent : newMaleStudent} style={{width:'60px', height:'60px', border:'1px solid #767c7d35'}}/>
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h4 className='label' style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', letterSpacing:'1px', color:'#158b9d'}}>{connectedUser?.Personal_Info?.Personal_Information?.last_name + '  ' + connectedUser?.Personal_Info?.Personal_Information?.first_name}</h4>
                                                        <p className='study_level_student' style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'0px', fontWeight:'600', fontSize:'14px', color:'#606060'}}>
                                                            {(connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)') && connectedUser?.Personal_Info?.Personal_Information?.sex === 'Κα') ? 'ΠΡΟΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 
                                                             (connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)') && connectedUser?.Personal_Info?.Personal_Information?.sex === 'Κος') ? 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ':
                                                             (connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)') && connectedUser?.Personal_Info?.Personal_Information?.sex === 'Κα') ? 'ΜΕΤΑΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ': 
                                                             'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ'}
                                                        </p>
                                                    </div>
                                                </ListGroup.Item> 
                                            </ListGroup>
                                        </Row>  
                                        <Row className='mb-3'>
                                            <ListGroup>
                                                <ListGroup.Item  style={{width:'100%'}}> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Φοιτητή</span>                                                        
                                                    </div>
                                                    <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53', width:'100%'}} />
                                                </ListGroup.Item>
                                            </ListGroup>     
                                        </Row> 
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αριθμός Μητρώου</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{connectedUser?.Studentship_Info?.General_Information?.academic_record_number}</p>
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκή Ταυτότητα</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{connectedUser?.Personal_Info?.Personal_Information?.student_identity}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Εξάμηνο Σπουδών</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{connectedUser?.Studentship_Info?.General_Information?.current_attendance_period === 'Εαρινή' ? 'Εξάμηνο ' + connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Εαρινό' : 'Εξάμηνο ' + props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Χειμερινό' }</p>
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκό Έτος</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicYear}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className='mb-3'>
                                            <ListGroup>
                                                <ListGroup.Item style={{width:'100%'}}> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'0rem', alignItems:'center', justifyContent:'center'}}>
                                                        <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Δήλωσης</span>                                                        
                                                    </div>
                                                    <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                                </ListGroup.Item>
                                            </ListGroup>     
                                        </Row> 
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Είδος Δήλωσης</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear}</p>
                                                    </div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατηγορία Δήλωσης</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Κύρια</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή από :</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.declaration_activeFromDay + ' ' + selectedDeclaration.declaration_activeFromDate}</p></div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή εως :</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.declaration_activeToDay + ' ' + selectedDeclaration.declaration_activeToDate}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Μαθημάτων</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.courses_number}</p></div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Ωρών</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.hours_sum}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα ECTS</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.ECTS_sum}</p></div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Διδακτικών Μονάδων</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.studyUnits_sum}</p>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className="mb-3">                           
                                            <ListGroup>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατάσταση Δήλωσης</h5>
                                                        <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Υποβληθείσα Δήλωση</p></div>
                                                </ListGroup.Item>
                                                <ListGroup.Item> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                        <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}></h5>
                                                        <div style={{display:'flex', gap:'10px', flexWrap:'nowrap'}}><FcOk style={{display:'inline', marginTop:'0.15rem', fontWeight:'600', verticalAlign:'middle'}}></FcOk><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'rgb(17, 167, 17)'}}>Έγκυρη</p></div>                                                       
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>                  
                                        </Row>
                                        <Row className='mb-3'>
                                            <ListGroup>
                                                <ListGroup.Item style={{width:'100%'}}> 
                                                    <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'0rem', alignItems:'center', justifyContent:'center'}}>
                                                        <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'500', fontSize:'19px', color:'#f09f09'}}>Δηλωμένα Μαθήματα</span>                                                        
                                                    </div>
                                                    <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                                </ListGroup.Item>
                                            </ListGroup>     
                                        </Row> 
                                        <div style={{overflow:'hidden', display:'grid', boxShadow: '1px 1px 10px 1px rgba(128, 128, 128, 0.378)' }}>
                                            <Table responsive style={{width:'100%', display:'inline-table'}}>
                                            <thead>
                                                <tr> 
                                                <th key='Μάθημα'>Μάθημα</th>
                                                <th key='Εξάμηνο'>Εξάμηνο</th>
                                                <th key='ECTS'>ECTS</th>
                                                <th key='Δ.Μ'>Δ.Μ</th>
                                                <th key='Κατεύθυνση'>Κατεύθυνση</th>
                                                <th key='Τύπος'>Τύπος</th>
                                                <th key='Κατηγορία'>Κατηγορία</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                {selectedDeclaration.declarated_courses?.map((declaratedCourse, courseIndex) => {
                                                    return(    
                                                        <tr key={courseIndex}> 
                                                        <td>{declaratedCourse?.course_name}</td>
                                                        <td>{declaratedCourse?.semester}</td>
                                                        <td>{declaratedCourse?.ECTS}</td>
                                                        <td>{declaratedCourse?.study_units}</td>
                                                        <td>{declaratedCourse?.group}</td>                                                                    
                                                        <td>{declaratedCourse?.course_type}</td>
                                                        <td>{declaratedCourse?.course_category}</td>
                                                        </tr>                                                    
                                                    )                                 
                                                    })
                                                } 
                                            </tbody>
                                        </Table>
                                    </div>   
                                    <div style={{fontSize:'19px',display:'flex', marginTop:"2rem", alignItems:"left", justifyContent:'left', marginLeft:'0rem', marginBottom:'1.5rem', marginRight:"auto", fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αρχείο Δήλωσης</div>                                                     
                                        <Table responsive style={{width:'100%', display:'inline-table'}}>
                                            <thead>
                                                <tr> 
                                                    <th key='Μάθημα'>Ημερομηνία Δήλωσης</th>
                                                    <th key='Εξάμηνο'>Εξαγωγή Δήλωσης</th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr> 
                                                    <td style={{letterSpacing:'1px'}}>{courseDeclarationBasicInfo?.declDay + '/' + courseDeclarationBasicInfo?.declMonth + '/' + courseDeclarationBasicInfo?.declYear + ' , ' + 
                                                        courseDeclarationBasicInfo?.declHour + ':' + courseDeclarationBasicInfo?.declMinutes + ':' + courseDeclarationBasicInfo?.declSeconds}</td>
                                                    <td><BsFileEarmarkPdf className='pdf' style={{color:'#f09f09', display:'inline', fontSize:'24px',cursor:'pointer', pointerEvents:'auto'}} onMouseEnter={()=>document.getElementsByClassName('pdf')[0].style.color ='red'} onMouseLeave={()=>document.getElementsByClassName('pdf')[0].style.color = '#f09f09'}
                                                        onClick={() => setModalShowPDF(true)}></BsFileEarmarkPdf></td>                                                                 
                                                </tr> 
                                            </tbody>
                                        </Table> 
                                        <MyVerticallyCenteredModal
                                                show={modalShowPDF} 
                                                courses_declaration_info = {selectedDeclaration}
                                                declaration_basic = {courseDeclarationBasicInfo}
                                                title = {academicSemester === 'Εαρινό' ? 'Δήλωση Μαθημάτων Εαρινού Εξαμήνου ' + academicYear : 'Δήλωση Μαθημάτων Χειμερινού Εξαμήνου ' + academicYear } 
                                                onHide={ () => {setModalShowPDF(false)}}
                                            />    
                                    </Form>    
                                    </div>
                                    : null} 
                                </Box>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div> :  
          <div className="declarationViewer_main">
          <div className="scroll">
              <div className="header">
                  <div className="text_header"><img src={STUDENTS} alt='' /></div>
                  <div className="title"> my - Δηλώσεις 
                      <p>Δηλώσεις ανά Περίοδο Δήλωσης</p>
                  </div>
                  <div className="header_area_declarationViewer"> 
                      <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                  </div>
              </div>
              <div className="forms_container">
                  <div className="text">Στη σελίδα που ακολουθεί μπορείτε να δείτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>όλες τις Δηλώσεις Μαθημάτων</strong> που έχουν πραγματοποιηθεί ανά περιόδους δηλώσεων. Επιλέξτε την περίοδο δήλωσης που επιθυμείτε και δείτε τα μαθήματα που συμπεριλάβατε στη δήλωση που της αντιστοιχεί. Σε περιόδους ανοιχτών δηλώσεων μαθημάτων σας δίνεται η δυνατότητα να μεταφερθείτε στην κατάλληλη σελίδα προκειμένου να πραγματοποιήσετε ή να ανανεώσετε τη δήλωσή σας.{/*<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τη βαθμολογία των εγγεγραμμένων στο μάθημά σας φοιτητών</strong> και εφόσον είστε έτοιμοι επιλέξτε το κατάλληλο button για <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>ολοκλήρωση της διαδικασίας</strong> και <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>τελική υποβολή της βαθμολογίας του εκάστοτε φοιτητή στην Ηλεκτρονική Γραμματεία του Τμήματος</strong>. Στο τέλος του εξαμήνου διαγράψτε όλους τους φοιτητές που έχουν επιτύχει και έχουν ολοκληρώσει με το μάθημά σας και περιμένετε μέχρι την εγγραφή των νέων φοιτητών*/}</div>           
              </div>
              <div className='course_grading_container'>
                  <div className='declaration_object'>
                      <div className='page_title'>
                          <Box className='course_grading_box'>
                              <Box className='first_box'>
                                  <Avatar className='avatar_title'>
                                      <FaGraduationCap className='courses_icon'/>  
                                  </Avatar>
                                  <Box className='box_container'>
                                      <div className='typography_title'>Δηλώσεις Μαθημάτων</div>
                                      <div className='typography_content'><strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', verticalAlign:'middle', justifyContent:'center', alignItems:'center', marginLeft:'5px', marginRight:'5px'}}>{'Γραμματειακή Υποστήριξη ΤΗΜΜΥ - Δηλώσεις'}</strong></div>
                                      {/*<div className='typography_content'><MdEditDocument style={{verticalAlign :'middle',  display:'inline-flex', color:'#17a3b895',  marginTop:'3px', fontSize:'18px', marginRight:'5px'}}/><strong style={{marginRight:'5px', verticalAlign:'middle', marginTop:'3px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εξεταστική Περίοδος</strong> <strong style={{marginRight:'5px',marginLeft:'2px', verticalAlign:'middle', marginTop:'3px', color:'#17a2b8', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> {academicExamPeriod}</strong></div>*/}
                                  </Box>                                   
                              </Box>                                 
                          </Box>
                      </div>                        
                      <div className='overflow_text'>
                          <p className='moving_text'>Ενεργή Περίοδος Δηλώσεων Μαθημάτων {academicSemester === 'Εαρινό' ? 'Εαρινού' : 'Χειμερινού'} Εξαμήνου {academicYear}</p> 
                      </div>  
                      <div className='main_content'>
                          <Paper className='main_paper' style={{marginBottom: '5rem'}} >
                              <Box className='main_box' style={{marginBottom: '3rem'}}>
                                  <Box className='box_container' style={{marginBottom: '5rem'}}>
                                      <HiClipboardDocumentList style={{ fontSize:'3rem', marginLeft:'5px', color:'gray', opacity:'0.7'}}/>
                                      <div className='text_input'>
                                          <h4>Επιλέξτε Φοιτητή και Περίοδο Δήλωσης ...</h4>
                                          <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className='typography_content'>Μέχρι τώρα εχουν υποβληθεί επιτυχώς <strong style={{verticalAlign:'middle', marginTop:'3px', marginLeft:'3px', color:'#ffae18', marginRight:'3px'}}>{studentDeclarations!==null ? studentDeclarations.length : 0}</strong> Δηλώσεις Μαθημάτων</div>

                                      </div>                                       
                                  </Box>
                                  <Box className='select_box'>
                                      <Form.Select aria-label="Default select example" onChange={(e) => handleSelectDeclaration(e.target.value)}>
                                          <option style={{display:'none'}}>Επιλέξτε Περίοδο Δήλωσης</option>
                                          {studentDeclarations!== null && studentDeclarations.map((item, index) => {
                                              return (
                                                  <option key = {index} 
                                                      style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value={index}>{item.declaration_type + ' ( ' + item.student_AEM + ' )'}</option>
                                              )
                                          })} 
                                      </Form.Select>
                                  </Box>
                                  {selectedDeclaration !== null ?
                                  <div className='form_declaration'>
                                     <Form>
                                      <Row className="mb-3">
                                          <ListGroup>
                                              <ListGroup.Item style={{display:'flex', alignItems:'center', border:'0px solid transparent'}}>
                                                  <Avatar src={newMaleStudent} style={{width:'60px', height:'60px', border:'1px solid #767c7d35'}}/>
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h4 className='label' style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', letterSpacing:'1px', color:'#158b9d'}}>{selectedDeclaration?.student_LastName + '  ' + selectedDeclaration?.student_FirstName}</h4>
                                                      <p className='study_level_student' style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'0px', fontWeight:'600', fontSize:'14px', color:'#606060'}}>
                                                          {'ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ'}
                                                      </p>
                                                  </div>
                                              </ListGroup.Item> 
                                          </ListGroup>
                                      </Row>  
                                      <Row className='mb-3'>
                                          <ListGroup>
                                              <ListGroup.Item  style={{width:'100%'}}> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Φοιτητή</span>                                                        
                                                  </div>
                                                  <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53', width:'100%'}} />
                                              </ListGroup.Item>
                                          </ListGroup>     
                                      </Row> 
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αριθμός Μητρώου</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration?.student_AEM}</p>
                                                  </div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκή Ταυτότητα</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration?.student_identity}</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Εξάμηνο Σπουδών</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration?.academic_period === 'Εαρινό' ? 'Εξάμηνο ' + selectedDeclaration?.student_academic_semester + ', Εαρινό' : 'Εξάμηνο ' + selectedDeclaration?.student_academic_semester + ', Χειμερινό' }</p>
                                                  </div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκό Έτος</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicYear}</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className='mb-3'>
                                          <ListGroup>
                                              <ListGroup.Item style={{width:'100%'}}> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'0rem', alignItems:'center', justifyContent:'center'}}>
                                                      <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Δήλωσης</span>                                                        
                                                  </div>
                                                  <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                              </ListGroup.Item>
                                          </ListGroup>     
                                      </Row> 
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Είδος Δήλωσης</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear}</p>
                                                  </div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατηγορία Δήλωσης</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Κύρια</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή από :</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.declaration_activeFromDay + ' ' + selectedDeclaration.declaration_activeFromDate}</p></div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή εως :</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.declaration_activeToDay + ' ' + selectedDeclaration.declaration_activeToDate}</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Μαθημάτων</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.courses_number}</p></div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Ωρών</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.hours_sum}</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα ECTS</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.ECTS_sum}</p></div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Διδακτικών Μονάδων</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{selectedDeclaration.studyUnits_sum}</p>
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className="mb-3">                           
                                          <ListGroup>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'-1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατάσταση Δήλωσης</h5>
                                                      <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Υποβληθείσα Δήλωση</p></div>
                                              </ListGroup.Item>
                                              <ListGroup.Item> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                      <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}></h5>
                                                      <div style={{display:'flex', gap:'10px', flexWrap:'nowrap'}}><FcOk style={{display:'inline', marginTop:'0.15rem', fontWeight:'600', verticalAlign:'middle'}}></FcOk><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'rgb(17, 167, 17)'}}>Έγκυρη</p></div>                                                       
                                                  </div>
                                              </ListGroup.Item>
                                          </ListGroup>                  
                                      </Row>
                                      <Row className='mb-3'>
                                          <ListGroup>
                                              <ListGroup.Item style={{width:'100%'}}> 
                                                  <div style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'0rem', alignItems:'center', justifyContent:'center'}}>
                                                      <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'500', fontSize:'19px', color:'#f09f09'}}>Δηλωμένα Μαθήματα</span>                                                        
                                                  </div>
                                                  <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                              </ListGroup.Item>
                                          </ListGroup>     
                                      </Row> 
                                      <div style={{overflow:'hidden', display:'grid', boxShadow: '1px 1px 10px 1px rgba(128, 128, 128, 0.378)' }}>
                                          <Table responsive style={{width:'100%', display:'inline-table'}}>
                                          <thead>
                                              <tr> 
                                              <th key='Μάθημα'>Μάθημα</th>
                                              <th key='Εξάμηνο'>Εξάμηνο</th>
                                              <th key='ECTS'>ECTS</th>
                                              <th key='Δ.Μ'>Δ.Μ</th>
                                              <th key='Κατεύθυνση'>Κατεύθυνση</th>
                                              <th key='Τύπος'>Τύπος</th>
                                              <th key='Κατηγορία'>Κατηγορία</th>
                                              </tr>
                                          </thead>
                                          <tbody> 
                                              {selectedDeclaration.declarated_courses?.map((declaratedCourse, courseIndex) => {
                                                  return(    
                                                      <tr key={courseIndex}> 
                                                      <td>{declaratedCourse?.course_name}</td>
                                                      <td>{declaratedCourse?.semester}</td>
                                                      <td>{declaratedCourse?.ECTS}</td>
                                                      <td>{declaratedCourse?.study_units}</td>
                                                      <td>{declaratedCourse?.group}</td>                                                                    
                                                      <td>{declaratedCourse?.course_type}</td>
                                                      <td>{declaratedCourse?.course_category}</td>
                                                      </tr>                                                    
                                                  )                                 
                                                  })
                                              } 
                                          </tbody>
                                      </Table>
                                  </div>   
                                  <div style={{fontSize:'19px',display:'flex', marginTop:"2rem", alignItems:"left", justifyContent:'left', marginLeft:'0rem', marginBottom:'1.5rem', marginRight:"auto", fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αρχείο Δήλωσης</div>                                                     
                                      <Table responsive style={{width:'100%', display:'inline-table'}}>
                                          <thead>
                                              <tr> 
                                                  <th key='Μάθημα'>Ημερομηνία Δήλωσης</th>
                                                  <th key='Εξάμηνο'>Εξαγωγή Δήλωσης</th> 
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr> 
                                                  <td style={{letterSpacing:'1px'}}>{courseDeclarationBasicInfo?.declDay + '/' + courseDeclarationBasicInfo?.declMonth + '/' + courseDeclarationBasicInfo?.declYear + ' , ' + 
                                                      courseDeclarationBasicInfo?.declHour + ':' + courseDeclarationBasicInfo?.declMinutes + ':' + courseDeclarationBasicInfo?.declSeconds}</td>
                                                  <td><BsFileEarmarkPdf className='pdf' style={{color:'#f09f09', display:'inline', fontSize:'24px',cursor:'pointer', pointerEvents:'auto'}} onMouseEnter={()=>document.getElementsByClassName('pdf')[0].style.color ='red'} onMouseLeave={()=>document.getElementsByClassName('pdf')[0].style.color = '#f09f09'}
                                                      onClick={() => setModalShowPDF(true)}></BsFileEarmarkPdf></td>                                                                 
                                              </tr> 
                                          </tbody>
                                      </Table> 
                                      <MyVerticallyCenteredModal
                                              show={modalShowPDF} 
                                              courses_declaration_info = {selectedDeclaration}
                                              declaration_basic = {courseDeclarationBasicInfo}
                                              title = {academicSemester === 'Εαρινό' ? 'Δήλωση Μαθημάτων Εαρινού Εξαμήνου ' + academicYear : 'Δήλωση Μαθημάτων Χειμερινού Εξαμήνου ' + academicYear } 
                                              onHide={ () => {setModalShowPDF(false)}}
                                          />    
                                  </Form>    
                                  </div>
                                  : null} 
                              </Box>
                          </Paper>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        : 
        <Login/> }
        </>
    )

}

export default DeclarationViewerContainer;