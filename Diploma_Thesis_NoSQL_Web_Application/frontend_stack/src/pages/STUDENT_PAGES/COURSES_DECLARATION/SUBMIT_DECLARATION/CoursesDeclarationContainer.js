import React, {useRef, useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Stepper, Step, Button, StepLabel, StepContent } from '@mui/material'; 
import {Form , Col, Row} from 'react-bootstrap';
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar'; 
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';  
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';  
import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types'; 
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';  
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'; 
import SignaturePad from "react-signature-canvas";
import validator from 'validator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 

// Icons 
import BACK_ICON from '../../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import UTH_LOGO from '../../../../../src/Icons/uth-logo-background.png'; 
import UTH_LOGO_FORM from '../../../../../src/Icons/transparentLogo.jpg';
import newFemaleStudent from '../../../../Icons/female-student.png';
import newMaleStudent from '../../../../Icons/male-student.png';
import {TbPlayerTrackNextFilled} from 'react-icons/tb'
import {RxUpdate} from 'react-icons/rx';
import {BsFillPinAngleFill} from 'react-icons/bs';
import {FaExclamation} from 'react-icons/fa';
import {GiClick} from 'react-icons/gi';
import {FcOk, FcHighPriority, FcCancel} from 'react-icons/fc';
import {AiOutlineSelect} from 'react-icons/ai';
import {BsFileEarmarkPdf} from 'react-icons/bs';  
import {TiWarning} from 'react-icons/ti'; 


// GraphQL resolvers
import CalendarResolvers from '../../../../../src/graphql/resolvers/calendar';
import CoursesResolvers from '../../../../../src/graphql/resolvers/courses';
import CoursesDeclarationResolvers from '../../../../../src/graphql/resolvers/declarations';
import GradingResolvers from '../../../../../src/graphql/resolvers/grading';
import ProfessorsResolvers from '../../../../graphql/resolvers/professors';
import formsResolvers from '../../../../graphql/resolvers/forms';

// CSS Styles
import '../../../../../src/styles/pages/STUDENT_PAGES/COURSES_DECLARATION/SUBMIT_DECLARATION/coursesDeclarationContainer.scss'  
import '../../../../../src/styles/pages/STUDENT_PAGES/FORMS/formToPdf.scss'; 

////////////////////////////////////////////////////////////////////////////////////////////

function MyDeclarationModal(props) {
    const navigate = useNavigate();  
    let formType;
    let formCategory;

    // Determine the current Date
    const  currDate = new Date(); 
    const currDay = currDate.getDate()   
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear(); 

    // Determine the type of form 
    if (props.formkind === 'Αίτηση Εκπόνησης Ειδικού Θέματος Εργασίας' ) {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΕΙΔΙΚΟΥ ΘΕΜΑΤΟΣ / ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';   
    }
    else if (props.formkind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας') {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΔΙΠΛΩΜΑΤΙΚΗΣ ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    // Setting the state variable that will contain the new form's data 
    let [formData, setFormData] = useState({
        application_form : "" , form_name : "" , sending_date : "", arrangement_date : "", student_name : "", AEM : "",
        username : "", semester : "", form_pdf_data : "", supervisor:"", supervisor_type:"", secondMember:"", secondMember_type:'', thirdMember:'', thirdMember_type:'', greekTitle:'' , englishTitle:''
    })      
    const closeButton = () => {     
        let imgFile;
        let pdfTable = document.getElementById('mydoc') ;  
        if (pdfTable !== null) { 
            // Determine the base 64 url of the form pdf 
            html2canvas(pdfTable, props,  {useCORS: true}).then(function(canvas) {   
                imgFile = canvas.toDataURL(
                'image/png');
                var doc = new jsPDF("p", "mm", "a4");
                doc.internal.scaleFactor = 1.33;
                var width = doc.internal.pageSize.getWidth()-5;
                var height = doc.internal.pageSize.getHeight()-5;
                doc.addImage(imgFile, 'PNG', 2.8, 2.8, width, height);
                formData.form_pdf_data = doc.output('bloburl');   

                formData.application_form = formCategory;
                formData.form_name = props.formkind;
                formData.sending_date = currDay + ' / ' + currMonth + ' / ' + currYear;
                formData.arrangement_date = currDay + ' / ' + currMonth + ' / ' + currYear;
                formData.student_name = props.data.first_name + " " + props.data.last_name;
                formData.AEM = props.data.AEM; 
                formData.username = props.data.username;  
                formData.semester = props.data.semester;
                formData.supervisor = props.data.supervisor;
                formData.supervisor_type = props.data.supervisor_type; 
                formData.secondMember = props.data.secondMember;
                formData.secondMember_type = props.data.secondMember_type; 
                formData.thirdMember = props.data.thirdMember;
                formData.thirdMember_type = props.data.thirdMember_type;
                formData.greekTitle = props.data.greekTitle;
                formData.englishTitle= props.data.englishTitle;   
                  
                formsResolvers.add_new_student_form(formData)
                    .then(result => {
                        console.log(result)                 
                    })
                    .catch(err => {
                        console.log(err);
                    })           
            })        
        }        
    }     
        
    const showPDF_form = () => {
        let pdfTable = document.getElementById('mydoc')
        if (pdfTable !== null) {
            html2canvas(pdfTable,  {useCORS: true}).then(function(canvas) {         
                let imgData = canvas.toDataURL(
                    'image/png');  
                var doc = new jsPDF("p", "mm", "a4");
                var width = doc.internal.pageSize.getWidth()-5;
                var height = doc.internal.pageSize.getHeight()-5;
                doc.addImage(imgData, 'PNG', 2.8, 2.8, width, height); 
                if (props.formkind === 'Αίτηση Εκπόνησης Ειδικού Θέματος Εργασίας') {
                    doc.save('Αίτηση_Εκπόνησης_Ειδικού_Θέματος_Εργασίας.pdf');     
                }
                else if (props.formkind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας') {
                    doc.save('ΑΙΤΗΣΗ_ΕΚΠΟΝΗΣΗΣ_ΔΙΠΛΩΜΑΤΙΚΗΣ_ΕΡΓΑΣΙΑΣ.pdf');     
                }
            })
        }
        closeButton();
        props.onHide();
    }

    
    return (     
      <Modal 
        {...props} 
        aria-labelledby="contained-modal-title-vcenter"
        centered    
            size="lg"
            style={{height:'fit-content'}}             
        >
        <Modal.Header closeButton onClick={()=>{closeButton(); props.onHide()}}>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.formKind}
          </Modal.Title> 
        </Modal.Header>
        <Modal.Body style={{alignContent: 'center', overflow : 'scroll', height:"500px"}} >  
        {props.formkind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας'?
         <div className="main_form2">
        <div className='insider_form'  id="mydoc">
            <div className="main_form_header">
                <div className="department_greek">
                    <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                    <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                    <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                </div> 
                <img className="form_logo" src={UTH_LOGO_FORM} alt = ""/>
                <div className="department_eng">
                    <div className="university">UNIVERSITY OF THESSALY</div>
                    <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                    <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>                            
                </div>
            </div>
            <div className="academic_year"  >ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ <p>{props.academicyear}</p></div>

            <div className="form_container" style={{display:'flex', gap:'10px', boxShadow:'0px 0px 0px 0px white'}}> 
                <div className="StudentInfo" style={{flex:'0.7'}}> 
                    <div className="main_form_title" style={{fontSize:'16px'}}>{formType}</div>
                    <div className='form' style={{marginTop:'-1.5rem'}}>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ONOMA : </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.first_name}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΕΠΩΝΥΜΟ: </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.last_name}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΟΝΟΜΑ ΠΑΤΡΟΣ : </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.father_FirstName}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>AEM:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.AEM}</div>
                        </div>  
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.telephone}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.mobile_phone}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>email:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.email}</div>
                        </div>
                    </div>
                    <div className='date'>
                        {'Βόλος ,  ' + ' ' + currDay + ' / ' + currMonth + ' / ' + currYear }                            
                    </div>
                </div> 
                <div className="FormInfo" style={{flex:'1.5'}}> 
                    <div className="to_title" style={{marginTop:'1.5rem', fontSize:'17px'}}>Προς :</div>
                    <div className="depart" style={{marginTop:'-1.2rem', textAlign:'justify'}}>Την Γραμματεία του Τμήματος <span>  Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών   </span>  του  Πανεπιστημίου  Θεσσαλίας  </div>
                    <div className='form' style={{marginTop:'1rem'}}>
                        <div className='group'style={{display:'block'}}>                            
                            <label style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', marginBottom:'0.2rem', fontSize:'17px'}}>ΕΠΙΒΛΕΠΩΝ ΚΑΘΗΓΗΤΗΣ</label>
                            <div className='data' style={{fontSize:'17px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700', marginBottom:'1rem'}}>{props.data.supervisor}</div>
                        </div>
                        <div className="members" style={{display:'grid',columnGap:'15px', gridTemplateColumns:'1fr 1fr', marginBottom:'-0.7rem'}}>
                        <div className='group'style={{display:'block', marginBottom:'0.5rem'}}>                            
                            <label style={{fontSize:'15px',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',marginBottom:'-2rem'}}>ΔΕΥΤΕΡΟ ΜΕΛΟΣ ΕΠΙΤΡΟΠΗΣ</label>
                            { props.data.secondMember_type === '' ?
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data.secondMember}</div> :
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data.secondMember + ' (' + props.data.secondMember_type + ') '}</div>}
                        </div>
                        <div className='group'style={{display:'block', marginBottom:'0.5rem'}}>                            
                            <label style={{fontSize:'15px',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', marginBottom:'-2rem'}}>ΤΡΙΤΟ ΜΕΛΟΣ ΕΠΙΤΡΟΠΗΣ</label>
                            { props.data.thirdMember_type === '' ?
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data.thirdMember}</div> :
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data.thirdMember + ' (' + props.data.thirdMember_type + ') '}</div>}
                        </div>
                        </div>
                    </div>
                    <div className='formInput2'> 
                        <div className='title2'> Τίτλος Διπλωματικής (στα ελληνικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px', marginTop:'-0.2rem'}}>{props.data.greekTitle}</div> 
                        <div className='title2' style={{marginTop:'2rem'}}> Τίτλος Διπλωματικής (στα αγγλικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px',marginTop:'-0.2rem'}}>{props.data.englishTitle}</div> 
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Θήλυ' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
        </div>: 
        props.formkind === 'Αίτηση Εκπόνησης Ειδικού Θέματος Εργασίας' ? 
        <div className="main_form2">
        <div className='insider_form'  id="mydoc">
            <div className="main_form_header">
                <div className="department_greek">
                    <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                    <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                    <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                </div> 
                <img className="form_logo" src={UTH_LOGO_FORM} alt = ""/>
                <div className="department_eng">
                    <div className="university">UNIVERSITY OF THESSALY</div>
                    <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                    <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>                            
                </div>
            </div>
            <div className="academic_year"  >ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ <p>{props.academicyear}</p></div>

            <div className="form_container" style={{display:'flex', gap:'10px', boxShadow:'0px 0px 0px 0px white'}}> 
                <div className="StudentInfo" style={{flex:'0.7'}}> 
                    <div className="main_form_title" style={{fontSize:'16px'}}>{formType}</div>
                    <div className='form' style={{marginTop:'-1.5rem'}}>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ONOMA : </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.first_name}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΕΠΩΝΥΜΟ: </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.last_name}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΟΝΟΜΑ ΠΑΤΡΟΣ : </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.father_FirstName}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>AEM:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.AEM}</div>
                        </div>  
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.telephone}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.mobile_phone}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>email:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data.email}</div>
                        </div>
                    </div>
                    <div className='date'>
                        {'Βόλος ,  ' + ' ' + currDay + ' / ' + currMonth + ' / ' + currYear }                            
                    </div>
                </div> 
                <div className="FormInfo" style={{flex:'1.5'}}> 
                    <div className="to_title" style={{marginTop:'4rem', fontSize:'17px'}}>Προς :</div>
                    <div className="depart" style={{marginTop:'-1.2rem', textAlign:'justify'}}>Την Γραμματεία του Τμήματος <span>  Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών   </span>  του  Πανεπιστημίου  Θεσσαλίας  </div>
                    <div className='form' style={{marginTop:'1rem'}}>
                        <div className='group'style={{display:'block'}}>                            
                            <label style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', marginBottom:'0.2rem', fontSize:'17px'}}>ΕΠΙΒΛΕΠΩΝ ΚΑΘΗΓΗΤΗΣ</label>
                            <div className='data' style={{fontSize:'17px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700', marginBottom:'1rem'}}>{props.data.supervisor}</div>
                        </div> 
                    </div>
                    <div className='formInput2'> 
                        <div className='title2'> Τίτλος Εργασίας (στα ελληνικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px', marginTop:'-0.2rem'}}>{props.data.greekTitle}</div> 
                        <div className='title2' style={{marginTop:'2rem'}}> Τίτλος Εργασίας (στα αγγλικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px',marginTop:'-0.2rem'}}>{props.data.englishTitle}</div> 
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Θήλυ' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
        </div>    
        : null }     
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'onClick={()=>{props.onHide(); closeButton() /*navigate('/form/'+props.graduate+'/my_forms')*/}} >Close</Button>
          <Button type='submit' onClick={()=>{showPDF_form();}}>Save</Button>
        </Modal.Footer>
      </Modal> 
    );
}


/////////////////////////////////////////////////////////////////////////////////////////////



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

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

const CoursesDeclarationContainer = (props) => {    
      
    // State Variable that determines the state of  window for courses declaration pdf
    const [modalShowPDF, setModalShowPDF] = useState(false);
    // State Variable that determines the state of  window for courses special Topic pdf
    const [modalShowPDF_specialTopic, setModalShowPDF_specialTopic] = useState(false);
    // Determine by the props the gender of the user
    const userGender = props?.connectedUser?.Personal_Info?.Personal_Information?.gender;
    // Setting the state variable that will store the current academic year 
    let [academicYear, setAcademicYear] = useState('');
    // Setting the state variable that will store the current academic semester
    let [academicSemester, setAcademicSemester] = useState('');
    // Setting the state variable that will store the current academic exam period
    let [academicExamPeriod, setAcademicExamPeriod] = useState('');
    // Setting the state variable that will store the start and end date and day for the current semester's course declaration
    let [coursesDeclarationDates, setCoursesDeclarationDates] = useState({courseDeclaration_startDay:'undefined', courseDeclaration_startDate:'undefined', courseDeclaration_endDay:'undefined', courseDeclaration_endDate:'undefined'});
    // Setting the state variable that will store the study level of the connected user (student user)
    let [study_level, setStudyLevel] = useState('');
    // Setting the state variable that will store the courses by student's semester 
    let [coursesBySemesters, setCoursesBySemesters] = useState(null);
    // Setting the state variable that will store the courses codes for successful declarated courses
    let [successfulCoursesCodes, setSuccessfulCoursesCodes] = useState({array : [], state : false});
    // Setting the state variable that will store the declarated courses codes for the current exam period
    let [alreadyDeclarated, setAlreadyDeclarated] = useState({decl : [], decl_state : false});
    let [previousDeclarated, setPreviousDeclarated] = useState([]);

    // Setting the state variables that will store the selected courses' declaration 
    let [coursesDeclaration, setCoursesDeclaration] = useState([]);
    // Setting the state variables that will store the selected courses' declaration for the grading database
    let [coursesGrading, setCoursesGrading] = useState([]);     
    // Setting the state variable that will stores the declaration's errors (if they are)
    let [coursesDeclarationErrors, setCoursesDeclarationErrors] = useState([]);
    // State variable that determines if the course declaration is completed
    let [isCompletedCourseDeclaration, setIsCompletedCourseDeclaration] = useState(false);
    // State Variable that will store the basic Information from the new registered course declaration
    let [courseDeclarationBasicInfo, setCourseDeclarationBasicInfo] = useState({declDay : 0, declMonth : 0, declYear : 0, declHour : 0, declMinutes : 0, declSeconds : 0, declarated_courses : []});

    // State Variable for the daclaration's courses total hours
    let [coursesTotalHours, setCoursesTotalHours] = useState(0);
    // State Variable for the daclaration's courses total ECTS units
    let [coursesTotalECTS, setCoursesTotalECTS] = useState(0);
    // State Variable for the daclaration's courses total study units
    let [coursesTotalStudyUnits, setCoursesTotalStudyUnits] = useState(0);
    // State Variable that contains the final data of the new courses' declaration before the registration in the database
    let [newCourseDeclaration, setNewCourseDeclaration] = useState({
        student_FirstName : '', student_LastName : '', student_AEM : '', student_identity : '', student_username : '', student_uthEmail : '', 
        student_academic_semester : '' , academic_period : '', academic_year : '', declaration_type : '', declaration_category : '', 
        declaration_activeFromDay : '', declaration_activeFromDate : '', declaration_activeToDay : '', declaration_activeToDate : '', 
        courses_number : 0, hours_sum : 0, ECTS_sum : 0, studyUnits_sum : 0, declaration_state : '', 
        declarated_courses : []
    }) 
    // State Variable that contains the final data for the courses grading database
    let [newCourseGrading, setNewCourseGrading] = useState({
        student_FirstName : '', student_LastName : '', student_AEM : '', student_identity : '', student_username : '', student_uthEmail : '', current_student_semester : '', student_title : '', gender : '',
        grade_average : 0, total_ECTS : 0, total_units : 0, declarated_courses : []
    })
 
    // State Variable for the department's professors
    const [professors, setProfessors] = useState([]);

    // State variables for the modal show and the signature
    let [modalShow, setModalShow] = useState(false); 
    let [modalShow_specialTopic, setModalShow_specialTopic] = useState(false);
   
    // Useful variables for the signature canvas
    const sigCanvas = useRef({});
    const [imageURL, setImageURL] = useState(null); 

    // Αίτηση Εκπόνησης Διπλωματικής Εργασίας (State variables)

    // Modal for Diploma Form
    let [modalPdf, setModalPdf] = useState(false);
    let [isExistDiplomaForm, setIsExistDiplomaForm] = useState('undefined');

    let [diplomaForm, setDiplomaForm] = useState({
        _id : props?.connectedUser?._id,
        semester : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester,
        username : props?.connectedUser?.Personal_Info?.Personal_Information?.username,
        first_name : props?.connectedUser?.Personal_Info?.Personal_Information?.first_name, 
        last_name : props?.connectedUser?.Personal_Info?.Personal_Information?.last_name, 
        father_FirstName : props?.connectedUser?.Personal_Info?.Personal_Information?.father_FirstName, 
        AEM : props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number,
        email : props?.connectedUser?.Studentship_Info?.General_Information?.academic_email,
        telephone : props?.connectedUser?.Personal_Info?.Student_Address?.telephone,
        mobile_phone : props?.connectedUser?.Personal_Info?.Student_Address?.mobile_phone, 
        supervisor : '', 
        supervisor_type: 'ΤΗΜΜΥ',
        secondMember: '',
        secondMember_type: 'ΤΗΜΜΥ',
        thirdMember : '',
        thirdMember_type: 'ΤΗΜΜΥ',
        greekTitle : '',
        englishTitle : '',
        signature : imageURL
    })  

    // Αίτηση Εκπόνησης Ειδικού Θέματος - Εργασίας (State variables)
     // Useful variables for the signature canvas
     const sigCanvas_specialTopic = useRef({});
     const [imageURL_specialTopic, setImageURL_specialTopic] = useState(null); 

    // Modal for Special Topic Form
    let [modalSpecialTopic, setModalSpecialTopic] = useState(false);
    let [isExistSpecialTopicForm, setIsExistSpecialTopicForm] = useState('undefined');

    let [specialTopicForm, setSpecialTopicForm] = useState({
        _id : props?.connectedUser?._id,
        semester : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester,
        username : props?.connectedUser?.Personal_Info?.Personal_Information?.username,
        first_name : props?.connectedUser?.Personal_Info?.Personal_Information?.first_name, 
        last_name : props?.connectedUser?.Personal_Info?.Personal_Information?.last_name, 
        father_FirstName : props?.connectedUser?.Personal_Info?.Personal_Information?.father_FirstName, 
        AEM : props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number,
        email : props?.connectedUser?.Studentship_Info?.General_Information?.academic_email,
        telephone : props?.connectedUser?.Personal_Info?.Student_Address?.telephone,
        mobile_phone : props?.connectedUser?.Personal_Info?.Student_Address?.mobile_phone, 
        supervisor : '', 
        supervisor_type: 'ΤΗΜΜΥ',
        secondMember: '',
        secondMember_type: 'ΤΗΜΜΥ',
        thirdMember : '',
        thirdMember_type: 'ΤΗΜΜΥ',
        greekTitle : '',
        englishTitle : '',
        signature : imageURL_specialTopic
    })  

    // Setting the state variable for the number of successful courses
    let [successfulCoursesNumber, setSuccessfulCoursesNumber] = useState(-2);
    // Setting the state variable for the number of successful mandatory courses
    let [successful_Mandatory_CoursesNumber, setSuccessful_Mandatory_CoursesNumber] = useState(-2);
    // Setting the state variable for total ECTS of the current user
    let [studentTotalECTS, setStudentTotalECTS] = useState(-2);
    // Setting the state variable for the number of successful postagraduate declarated courses
    let [postGraduate_CoursesNumber, setPostGraduate_CoursesNumber] = useState(-2);

    // Setting the state variable for the diploma thesis form
    let [diplomaThesis, setDiplomaThesis] = useState({state : false, information : null});
    // Setting the state variable for the diploma thesis form
    let [specialTopic, setSpecialTopic] = useState({state : false, information : null});

    // Select Declarated Semester Values
    const [openDeclaratedSemester, setOpenDeclaratedSemester] = React.useState(false);
    let [relatedModalCourse, setRelatedModalCourse] = useState(null);
    let [activeSemester, setActiveSemester] = useState(''); 
    
    // Check the validation of the declarated courses
    const checkDeclarationErrors = () => {
        let errors_array = [];
        if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '1') { 
            if (coursesDeclaration.length !== 6) { 
                errors_array.push('Στο 1ο Εξάμηνο απαιτείται η δήλωση όλων των μαθημάτων (6 μαθήματα)!')
            }            
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '2') {
            if (coursesDeclaration.length !== 6) {  
                errors_array.push('Στο 2ο Εξάμηνο απαιτείται η δήλωση όλων των μαθημάτων (6 μαθήματα)!')
            } 
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '3') {
            if (successfulCoursesNumber < 3 && coursesDeclaration.filter(item=>item.semester === '3').length > 0) {
                errors_array.push('Δεν μπορείτε να δηλώσετε μαθήματα του 3ου εξαμήνου, εάν δεν έχετε ολοκληρώσει επιτυχώς τουλάχιστον 3 μαθήματα των προηγούμενων εξαμήνων 1 και 2 (σε αυτά δεν συμπεριλαμβάνονται τα μαθήματα "Αγγλική Γλώσσα και Τεχνική Ορολογία" και "Μεθοδολογία Σύνταξης Τεχνικών Κειμένων και Παρουσιάσεων στην Αγγλική Γλώσσα")  !');
            } 
            else if (successfulCoursesNumber >= 3 && successful_Mandatory_CoursesNumber < 5)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>item.declarated_semester === '1' && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>item.declarated_semester === '1' && item.result === 'Επιτυχία').length;
                const first_semester = this_semester + prev_semester;   
                if (first_semester !== 6) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 1ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 3ου εξαμήνου !') ;
                }
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '4') {
            if (successful_Mandatory_CoursesNumber < 5)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>item.declarated_semester === '2' && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>item.declarated_semester === '2' && item.result === 'Επιτυχία').length;
                const second_semester = this_semester + prev_semester;  
                if (second_semester !== 6) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 2ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 4ου εξαμήνου !') ;
                }
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '5') { 
            if (successfulCoursesNumber < 9 && coursesDeclaration.filter(item=>item.semester === '5').length > 0) {
                errors_array.push('Δεν μπορείτε να δηλώσετε μαθήματα του 5ου εξαμήνου, εάν δεν έχετε ολοκληρώσει επιτυχώς τουλάχιστον 9 μαθήματα των προηγούμενων εξαμήνων 1, 2, 3 και 4 (σε αυτά δεν συμπεριλαμβάνονται τα μαθήματα "Αγγλική Γλώσσα και Τεχνική Ορολογία" και "Μεθοδολογία Σύνταξης Τεχνικών Κειμένων και Παρουσιάσεων στην Αγγλική Γλώσσα")  !');
            } 
            else if (successfulCoursesNumber >= 9 && successful_Mandatory_CoursesNumber < 11 && coursesDeclaration.filter(item=>item.semester === '5').length > 0)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3') && item.result === 'Επιτυχία').length;
                const second_semester = this_semester + prev_semester;  
                if (second_semester !== 11) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 1ο και 3ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 5ου εξαμήνου !') ;
                }
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 2) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 2 μαθήματα Επιλογής στο 5ο εξάμηνο!') ;
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '6') {
            if (successful_Mandatory_CoursesNumber < 11)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>((item.declarated_semester === '2' || item.declarated_semester === '4') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod)).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>((item.declarated_semester === '2' || item.declarated_semester === '4') && item.result === 'Επιτυχία')).length;
                const second_semester = this_semester + prev_semester; 
                console.log(prev_semester) 
                console.log(second_semester) 
                
                if (second_semester !== 11) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 2ο και 4ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 6ου εξαμήνου !') ;
                }
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 2) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 2 μαθήματα Επιλογής στο 6ο εξάμηνο!') ;
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '7') {
            if (successfulCoursesNumber < 17 && coursesDeclaration.filter(item=>item.semester === '7').length > 0) {
                errors_array.push('Δεν μπορείτε να δηλώσετε μαθήματα του 7ου εξαμήνου, εάν δεν έχετε ολοκληρώσει επιτυχώς τουλάχιστον 17 μαθήματα των προηγούμενων εξαμήνων 1, 2, 3, 4, 5 και 6 (σε αυτά δεν συμπεριλαμβάνονται τα μαθήματα "Αγγλική Γλώσσα και Τεχνική Ορολογία" και "Μεθοδολογία Σύνταξης Τεχνικών Κειμένων και Παρουσιάσεων στην Αγγλική Γλώσσα")  !');
            } 
            else if (successfulCoursesNumber >= 17 && successful_Mandatory_CoursesNumber < 14 && coursesDeclaration.filter(item=>item.semester === '7').length > 0)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3' || item.declarated_semester === '5') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3'|| item.declarated_semester === '5') && item.result === 'Επιτυχία').length;
                const seventh_semester = this_semester + prev_semester;  
                if (seventh_semester !== 14) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 1ο, 3ο και 5ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 7ου εξαμήνου !') ;
                }
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 5) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 5 μαθήματα Επιλογής στο 7ο εξάμηνο!') ;
            }

            // DIPLOMA THESIS
            if (coursesDeclaration.filter(item=>item.course_code === 'ECE588').length > 0 && studentTotalECTS < 180) {
                errors_array.push('Για να δηλώσετε το μάθημα ΔΙΠΛΩΜΑΤΙΚΗ ΕΡΓΑΣΙΑ απαιτείται να έχετε περισσότερες από 180 ECTS μονάδες !') ;
            }

            // POSTGRADUATE COURSES
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS < 210) {
                errors_array.push('Για να δηλώσετε το μάθημα ΜΔΕ (Μεταπτυχιακών Σπουδών) απαιτείται να έχετε περισσότερες από 210 ECTS μονάδες !') ;
            }
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS > 210 && postGraduate_CoursesNumber > 2) {
                errors_array.push('Έχετε ήδη δηλώσει 2 μαθήματα ΜΔΕ σε προηγούμενα εξάμηνα και κατά τη διάρκεια των σπουδών σας δε μπορείτε να δηλώσετε περισσότερα από 2 ΜΔΕ μαθήματα.!') ;
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '8') {
            if (successful_Mandatory_CoursesNumber < 14)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '2' || item.declarated_semester === '4' || item.declarated_semester === '6') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '2' || item.declarated_semester === '4'|| item.declarated_semester === '6') && item.result === 'Επιτυχία').length;
                const eigth_semester = this_semester + prev_semester;  
                if (eigth_semester !== 14) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 2ο, 4ο και 6ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 8ου εξαμήνου !') ;
                }                
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 5) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 5 μαθήματα Επιλογής στο 8ο εξάμηνο!') ;
            }

            // DIPLOMA THESIS
            if (coursesDeclaration.filter(item=>item.course_code === 'ECE588').length > 0 && studentTotalECTS < 180) {
                errors_array.push('Για να δηλώσετε το μάθημα ΔΙΠΛΩΜΑΤΙΚΗ ΕΡΓΑΣΙΑ απαιτείται να έχετε περισσότερες από 180 ECTS μονάδες !') ;
            }

            // POSTGRADUATE COURSES
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS < 210) {
                errors_array.push('Για να δηλώσετε το μάθημα ΜΔΕ (Μεταπτυχιακών Σπουδών) απαιτείται να έχετε περισσότερες από 210 ECTS μονάδες !') ;
            }
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS > 210 && postGraduate_CoursesNumber > 2) {
                errors_array.push('Έχετε ήδη δηλώσει 2 μαθήματα ΜΔΕ σε προηγούμενα εξάμηνα και κατά τη διάρκεια των σπουδών σας δε μπορείτε να δηλώσετε περισσότερα από 2 ΜΔΕ μαθήματα.!') ;
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '9') {
            if (successful_Mandatory_CoursesNumber < 14)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3' || item.declarated_semester === '5') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '1' || item.declarated_semester === '3'|| item.declarated_semester === '5') && item.result === 'Επιτυχία').length;
                const ninth_semester = this_semester + prev_semester;  
                if (ninth_semester) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 1ο, 3ο και 5ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 9ου εξαμήνου !') ;
                }                
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 5) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 5 μαθήματα Επιλογής στο 9ο εξάμηνο!') ;
            }

            // DIPLOMA THESIS
            if (coursesDeclaration.filter(item=>item.course_code === 'ECE588').length > 0 && studentTotalECTS < 180) {
                errors_array.push('Για να δηλώσετε το μάθημα ΔΙΠΛΩΜΑΤΙΚΗ ΕΡΓΑΣΙΑ απαιτείται να έχετε περισσότερες από 180 ECTS μονάδες !') ;
            }

            // POSTGRADUATE COURSES
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS < 210) {
                errors_array.push('Για να δηλώσετε το μάθημα ΜΔΕ (Μεταπτυχιακών Σπουδών) απαιτείται να έχετε περισσότερες από 210 ECTS μονάδες !') ;
            }
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS > 210 && postGraduate_CoursesNumber > 2) {
                errors_array.push('Έχετε ήδη δηλώσει 2 μαθήματα ΜΔΕ σε προηγούμενα εξάμηνα και κατά τη διάρκεια των σπουδών σας δε μπορείτε να δηλώσετε περισσότερα από 2 ΜΔΕ μαθήματα.!') ;
            }
        }
        else if (props?.connectedUser?.Studentship_Info.General_Information?.current_academic_semester === '10') {
            if (successful_Mandatory_CoursesNumber < 14)  {
                const this_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '2' || item.declarated_semester === '4' || item.declarated_semester === '6') && item.declarated_academicYear === academicYear && item.declarated_period === academicSemester && item.exam_period === academicExamPeriod).length;
                const prev_semester = newCourseGrading.declarated_courses.filter(item=>(item.declarated_semester === '2' || item.declarated_semester === '4'|| item.declarated_semester === '6') && item.result === 'Επιτυχία').length;
                const tenth_semester = this_semester + prev_semester;  
                if (tenth_semester !== 14) {
                    errors_array.push('Δηλώστε πρώτα όλα τα υποχρεωτικά μαθήματα που χρωστάτε από το 2ο, 4ο και 6ο Εξάμηνο και ύστερα προχωρήστε και με τη δήλωση μαθημάτων 10ου εξαμήνου !') ;
                }                
            }
            if (coursesDeclaration.filter(item=>item.course_type === 'Επιλογής').length > 5) {
                errors_array.push('Δεν μπορείτε να δηλώσετε περισσότερα από 5 μαθήματα Επιλογής στο 10ο εξάμηνο!') ;
            }

            // DIPLOMA THESIS
            if (coursesDeclaration.filter(item=>item.course_code === 'ECE588').length > 0 && studentTotalECTS < 180) {
                errors_array.push('Για να δηλώσετε το μάθημα ΔΙΠΛΩΜΑΤΙΚΗ ΕΡΓΑΣΙΑ απαιτείται να έχετε περισσότερες από 180 ECTS μονάδες !') ;
            }

            // POSTGRADUATE COURSES
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS < 210) {
                errors_array.push('Για να δηλώσετε το μάθημα ΜΔΕ (Μεταπτυχιακών Σπουδών) απαιτείται να έχετε περισσότερες από 210 ECTS μονάδες !') ;
            }
            if (coursesDeclaration.filter(item=>item.course_category === 'ΕΠΙΛΟΓΗΣ ΜΔΕ').length > 0 && studentTotalECTS > 210 && postGraduate_CoursesNumber > 2) {
                errors_array.push('Έχετε ήδη δηλώσει 2 μαθήματα ΜΔΕ σε προηγούμενα εξάμηνα και κατά τη διάρκεια των σπουδών σας δε μπορείτε να δηλώσετε περισσότερα από 2 ΜΔΕ μαθήματα.!') ;
            }
        }
        setCoursesDeclarationErrors(errors_array);
    } 

    // Search for already existing forms
    // DIPLOMA FORM 
    if (isExistDiplomaForm === 'undefined') { 
        formsResolvers.find_form_by_student_AEM(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number, 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας')
            .then(result => {
                if (result?.data?.findFormByAEM === true) {
                    setIsExistDiplomaForm('yes');
                }
                else {
                    setIsExistDiplomaForm('no');
                }
            })
            .catch(err => {
                setIsExistDiplomaForm('no_error');
                throw err;
            })
    }

    // SPECIAL TOPIC FORM 
    if (isExistSpecialTopicForm === 'undefined') { 
        console.log(props)
        formsResolvers.find_special_topic_form_by_student_AEM(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number, 'Αίτηση Εκπόνησης Ειδικού Θέματος Εργασίας', props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester)
            .then(result => {
                if (result?.data?.findSpecialTopicForm === true) {
                    setIsExistSpecialTopicForm('yes');
                }
                else {
                    setIsExistSpecialTopicForm('no');
                }
            })
            .catch(err => {
                setIsExistSpecialTopicForm('no_error');
                throw err;
            })
    }
    
    // Function that uses the canvas ref to trim the canvas from white spaces via a method 
    // given by react-signature-canvas
    // DIPLOMA THESIS
    const save = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        setDiplomaForm({...diplomaForm, signature : sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")});
        setModalShow(false)
    }
    // SPECIAL TOPIC
    const save_specialTopic = () => {
        setImageURL_specialTopic(sigCanvas_specialTopic.current.getTrimmedCanvas().toDataURL("image/png"));
        setSpecialTopicForm({...specialTopicForm, signature : sigCanvas_specialTopic.current.getTrimmedCanvas().toDataURL("image/png")});
        setModalShow_specialTopic(false)
    }

    // Function that uses the canvas ref to clear the canvas via a method 
    // given by react-signature-canvas
    // DIPLOMA THESIS
    const clear = () => {
        setImageURL(null);
        sigCanvas.current.clear();   
    }

    // SPECIAL TOPIC
    const clear_specialTopic = () => {
        setImageURL_specialTopic(null);
        sigCanvas_specialTopic.current.clear();
    }

    // Collect all the database's professors' data
    if (professors.length === 0 || professors === []) {
        ProfessorsResolvers.get_all_professors()
            .then(result => {
                let profArray = [];
                result?.data?.getAllProfessors.forEach(prof => {
                    profArray.push( prof.PERSONAL_INFO.last_name + ' ' + prof.PERSONAL_INFO.first_name)
                })
                setProfessors(profArray)
            })
            .catch(err=> {
                throw err;
            })
    }

    // Get the total ECTS number
    if (studentTotalECTS === -2 ) {
        GradingResolvers.get_student_total_ECTS(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
            .then(result => { 
                setStudentTotalECTS(result?.data?.getStudent_TotalECTS)
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    // Get the total number of postgraduate declarated courses of the current student 
    if (postGraduate_CoursesNumber === -2 ) {
        GradingResolvers.get_successful_postgraduate_courses_number(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
            .then(result => { 
                setPostGraduate_CoursesNumber(result?.data?.getPostGraduate_CoursesNumber)
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    } 

    const underg_semesters = [];
    if (underg_semesters.length === 0) {
        Array.from({ length: 10 }).map((_, index) => (
            underg_semesters.push({value:'Εξάμηνο ' + (index+1), label:'Εξάμηνο ' + (index+1)})
        ))
    }

    const post_semesters = [];
    if (post_semesters.length === 0) {
        Array.from({ length: 6 }).map((_, index) => (
            index+1 % 2 === 0 ?
            post_semesters.push({value:'Εξάμηνο ' + (index+1) + ' , Εαρινό', label: 'Εξάμηνο ' + (index+1) + ' , Εαρινό'}) :
            post_semesters.push({value:'Εξάμηνο ' + (index+1) + ' , Χειμερινό', label:'Εξάμηνο ' + (index+1) + ' , Χειμερινό'})
        ))
    }

    const handleClickOpenDeclaratedSemester = (selectedCourse) => { 
        setRelatedModalCourse(selectedCourse);
        setOpenDeclaratedSemester(true);
    };
    const handleCloseDeclaratedSemester = () => {
        setOpenDeclaratedSemester(false);
    };

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

    // Change dates manually
    //academicSemester = 'Χειμερινό';
    //academicYear = '2023-2024';    
    //academicExamPeriod = 'Ιανουαρίου';

    // Determine the study_level of the connected user
    if (study_level === '') {
        if (props?.connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)')) {
            setStudyLevel('ΠΡΟΠΤΥΧΙΑΚΟ');
        }
        else if (props.connectedUser.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)')) {
            setStudyLevel('ΜΕΤΑΠΤΥΧΙΑΚΟ');
        }
    }   

    if (coursesDeclarationDates.courseDeclaration_startDay === 'undefined' /*|| coursesDeclarationDates.courseDeclaration_startDay === undefined*/) {
        if (academicSemester !== '' && academicYear !== '' && study_level !== '') { 
            CalendarResolvers.find_courses_declaration_date(academicYear, academicSemester, study_level)
                .then(result => {
                    setCoursesDeclarationDates(coursesDeclarationDates=>({...coursesDeclarationDates, courseDeclaration_startDay:result?.data?.findCoursesDeclarationDate?.courseDeclaration_startDay, courseDeclaration_startDate:result?.data?.findCoursesDeclarationDate?.courseDeclaration_startDate, courseDeclaration_endDay:result?.data?.findCoursesDeclarationDate?.courseDeclaration_endDay, courseDeclaration_endDate:result?.data?.findCoursesDeclarationDate?.courseDeclaration_endDate}))
                })
                .catch(err=> {
                    console.log(err);
                    setCoursesDeclarationDates(coursesDeclarationDates=>({...coursesDeclarationDates, courseDeclaration_startDay:'', courseDeclaration_startDate:'', courseDeclaration_endDay: '', courseDeclaration_endDate:'' }))
                })
        } 
    }

    // Determine the courses of the declaration depends on the student semester
    let studentAcademicSemester = props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester;
    let semesterArray = [];
    let semesterArray_forValidation = [];
    if (studentAcademicSemester === "1") {
        semesterArray.push("1");
        semesterArray_forValidation.push("1");
    }
    else if (studentAcademicSemester === "2") {
        semesterArray.push("2");
        semesterArray_forValidation.push("2");
    }
    else if (studentAcademicSemester === "3") {
        semesterArray.push("1");
        semesterArray.push("3");
        semesterArray_forValidation.push("1");
    }
    else if (studentAcademicSemester === "4") {
        semesterArray.push("2");
        semesterArray.push("4");
        semesterArray_forValidation.push("2");
    }
    else if (studentAcademicSemester === "5") {
        semesterArray.push("1");
        semesterArray.push("3");
        semesterArray.push("5");
        semesterArray_forValidation.push("1"); semesterArray_forValidation.push("3");
    }
    else if (studentAcademicSemester === "6") {
        semesterArray.push("2");
        semesterArray.push("4");
        semesterArray.push("6");
        semesterArray_forValidation.push("2"); semesterArray_forValidation.push("4");
    }
    else if (studentAcademicSemester === "7") {
        semesterArray.push("1");
        semesterArray.push("3");
        semesterArray.push("5");
        semesterArray.push("7");
        semesterArray.push("9");
        semesterArray_forValidation.push("1"); semesterArray_forValidation.push("3"); semesterArray_forValidation.push("5");
    }
    else if (studentAcademicSemester === "8") {
        semesterArray.push("2");
        semesterArray.push("4");
        semesterArray.push("6");
        semesterArray.push("8"); 
        semesterArray_forValidation.push("2"); semesterArray_forValidation.push("4"); semesterArray_forValidation.push("6");
    }
    else if (studentAcademicSemester === "9") {
        semesterArray.push("1");
        semesterArray.push("3");
        semesterArray.push("5");
        semesterArray.push("7");
        semesterArray.push("9");
        semesterArray_forValidation.push("1"); semesterArray_forValidation.push("3"); semesterArray_forValidation.push("5");
    }
    else if (studentAcademicSemester === "10") {
        semesterArray.push("2");
        semesterArray.push("4");
        semesterArray.push("6");
        semesterArray.push("8");
        semesterArray.push("10");
        semesterArray_forValidation.push("2"); semesterArray_forValidation.push("4"); semesterArray_forValidation.push("6");
    } 
    if (coursesBySemesters === null) {
        CoursesResolvers.get_courses_by_specific_semester(semesterArray)
            .then(result => {                
                setCoursesBySemesters(result?.data?.getCoursesOfSpecificSemester);
            })
            .catch(err=> {
                console.log(err);
                throw err;
            })
    }

    // Using the suitable query to get the number of successful mandatory courses
    if (successful_Mandatory_CoursesNumber === -2 && semesterArray_forValidation.length > 0) { 
        GradingResolvers.get_successful_mandatory_courses_number(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number, semesterArray_forValidation)
            .then(result => { 
                setSuccessful_Mandatory_CoursesNumber(result?.data?.getSuccessful_MandatoryCoursesNumber);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    } 

    // Using the suitable query to get the number of successful courses
    if (successfulCoursesNumber === -2 && semesterArray.length > 0) { 
        GradingResolvers.get_successful_courses_number(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number, semesterArray)
            .then(result => { 
                setSuccessfulCoursesNumber(result?.data?.getSuccessfulCoursesNumber);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    } 
    
    // Getting the courses codes from the student database about already declarated courses that he has 
    if ( successfulCoursesCodes.state === false) {
        GradingResolvers.get_successful_courses_codes(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
            .then(result => { 
                if (result.length !== 0) {
                    setSuccessfulCoursesCodes({...successfulCoursesCodes, array : result?.data?.getSuccessfulCoursesCodes, state : true});
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    } 
 
    // Function that searches if a course code exists in the array of successful declarated courses
    const isCourseSuccessful = (courseCode) => {
        if (successfulCoursesCodes.array.indexOf(courseCode) > -1) { 
            return true;
        }
        else {
            return false;
        }
    }
    
    const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: '90.7%',
		},
		button : {
			marginTop: '5rem',
			marginRight: '5rem',
		},
		actionsContainer: {
			marginBottom: '3rem',
		},
		resetContainer: {
			padding: '2rem',
		},

	}),
);
    const classes = useStyles();

    // Courses Declaration Form's Steps
	function getSteps() {		 
		return [<b style={activeStepForm === 0 ? {display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Πληροφορίες Δήλωσης</b>,
			<b style={activeStepForm === 1 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Δήλωση Μαθημάτων</b>,
            <b style={activeStepForm === 2 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Έλεγχος Εγκυρότητας Δήλωσης</b>,
			<b style={activeStepForm === 3 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Προεπισκόπηση Δήλωσης</b>,
			<b style={activeStepForm === 4 ? { display:'flex', color: '#17a2c8', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } : { display:'flex', color: '#6a6a6a92', marginLeft:'1rem',  fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize : '1.7rem', letterSpacing:'1px', fontWeight:'500' } }>
			Τελική Υποβολή</b>];
	} 

    // Course Declaration Form  
	const [activeStepForm, setActiveForm] = React.useState(0);	
	const steps = getSteps(); 

    // Setting the state variable for the form's next buttons
    const [formButtons, setFormButtons] = useState({button1:false, button2:false, button3: false, button4: false})
    // Setting the state variable for the check of the form's validity
    const [isValidForm, setIsValidForm] = useState({form1:'yes', form2: 'yes', form3: 'unvalid', form4: 'yes'});

    // Setting the state variable for the check of the diploma form's validity
    const [isValidDiplomaForm, setIsValidDiplomaForm] = useState(false);
    // Setting the state variable for the check of the special topic form's validity
    const [isValidSpecialTopicForm, setIsValidSpecialTopicForm] = useState(false);


    // Handling the errors of courses declaration
    useEffect(() => {
        if (coursesDeclarationErrors.length === 0) {
            setIsValidForm({...isValidForm, form3:'yes'});
        }
        else if (coursesDeclarationErrors.length > 0) {
            setIsValidForm({...isValidForm, form3: 'no'});
        }
    }, [coursesDeclarationErrors])
 
	// Handling NEXT button for the course declaration form
	const handleNext = () => {
		let isOK=true;
		if (activeStepForm === 0 ) {
			setFormButtons({...formButtons, button1:true});			 
			isValidForm.form1 === 'unvalid' || isValidForm.form1 === 'no' ? isOK = false : isOK = true;		
		}	  
        else if (activeStepForm === 1) {
            setFormButtons({...formButtons, button2:true});	
            checkDeclarationErrors();		
            isValidForm.form2 === 'unvalid' || isValidForm.form2 === 'no' ? isOK = false : isOK = true;		
        }
        else if (activeStepForm === 2) {
            setFormButtons({...formButtons, button3:true});			
            isValidForm.form3 === 'unvalid' || isValidForm.form3 === 'no' ? isOK = false : isOK = true;		
        }
		
		if (isOK === true) {  
			setActiveForm((prevActiveStep) => prevActiveStep + 1);
		}
	};

	// Handling BACK button for the first form
	const handleBack = () => {
		setActiveForm((prevActiveStep) => prevActiveStep - 1);
	};
	// Handling BACK button for the second form
	const handleBackSecond = () => {
		setActiveForm((prevActiveSecondStep) => prevActiveSecondStep - 1);
	};

    // Function that prepares the courses' declaration depends on the selection of the student
    const prepareCoursesDeclaration = (currCourse) => { 
        let duplicate = false;
        // Add the new selected course information in the final array (if it does not exist yet) 
        const previous_array = [...coursesDeclaration]; 
        if (currCourse !== null) {
            previous_array.forEach((item, index)=> { 
                if (item === currCourse) {                
                    let startArray = previous_array.slice(0, index);
                    let endArray = previous_array.slice(index + 1, previous_array.length);               
                    let new_array = [];
                    if (startArray.length > 0 && endArray.length > 0) {
                        // Courses from the first part 
                        startArray.forEach(course=> {
                            new_array.push(course)
                        })
                        // Courses from the last part 
                        endArray.forEach(course=> {
                            new_array.push(course)
                        })
                    }
                    else if (startArray.length > 0 && endArray.length === 0) {
                        startArray.forEach(course=> {
                            new_array.push(course)
                        })
                    }
                    else if (startArray.length === 0 && endArray.length > 0) { 
                        endArray.forEach(course=> {
                            new_array.push(course)
                        })
                    } 
                    setCoursesDeclaration(new_array); 
                    duplicate = true; 
                    if (currCourse.course_code === 'ECE588') {setDiplomaThesis({...diplomaThesis, state : false})}
                    if (currCourse.course_code === 'ECE439') {setSpecialTopic({...specialTopic, state : false})}
                }            
            })

            if (duplicate === false) { 
                if (currCourse.course_code === 'ECE588' && isExistDiplomaForm === 'no') {setDiplomaThesis({...diplomaThesis, state : true})}
                if (currCourse.course_code === 'ECE439' && isExistSpecialTopicForm === 'no') {setSpecialTopic({...specialTopic, state : true})}
                previous_array.push(currCourse);
                setCoursesDeclaration(previous_array)
            }  
        } 
        else {
            console.log('null')
        }            
    }  
    // Function that controls if the given course StudyProgram is content of the courses' declaration list
    const isCoursesDeclarationContent = (currentCourse) => {
        let isContent = false;

        coursesDeclaration.forEach(course=> {
            if (course.course_code === currentCourse.course_code) {
                isContent = true;                 
            }
        }) 
        return (isContent);
    }

    console.log(newCourseGrading)

    // Get All the declarated courses for the current exam period
    if (alreadyDeclarated.decl_state === false) {
        if (academicSemester !== '' && academicYear !== '' && academicExamPeriod !== '') {
            GradingResolvers.get_all_declarated_courses(props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number)
                .then(result => {
                    if (result.length !== []) {
                        setAlreadyDeclarated({...alreadyDeclarated, decl:result?.data?.getAllDeclaratedCourses, decl_state:true})
                    }
                })
                .catch(err=> {
                    console.log(err);
                    throw err;
                }) 
        }               
    }

  
    useEffect(() => {
        let form_array = []; 
        let exist_array = [];
        let check = false;
        if (check === false) {
            alreadyDeclarated.decl.forEach((courseInfo) => {
            if (courseInfo.declarated_academicYear === academicYear && courseInfo.declarated_period === academicSemester && courseInfo.exam_period === academicExamPeriod) {
                exist_array.push(courseInfo);
                }
            })
            check = true;
        } 
        if (check === true) { 
            if (exist_array.length > 0) { 
                alreadyDeclarated.decl.forEach((courseInfo) => { 
                    if (exist_array.filter(item=> item.course_code === courseInfo.course_code).length === 0) {
                        form_array.push(courseInfo)
                    }
                })
            }
            else if (exist_array.length === 0) { 
                form_array = alreadyDeclarated.decl;
            }
        }
        if (previousDeclarated.length === 0 && check=== true) {
            setPreviousDeclarated(form_array);
        }         
    }, [alreadyDeclarated])
  
    // Update the course array for the grading database every time that the declarated courses array changes
    useEffect(() => {
        let new_array = [];
        coursesDeclaration.forEach((declarated_course) => { 
                new_array.push({course_name : declarated_course.course_name, course_code : declarated_course.course_code, 
                                course_type : declarated_course.course_type, course_category : declarated_course.course_category,
                                course_studyProgram : declarated_course.group, study_units : Number(declarated_course.study_units),
                                ECTS : Number(declarated_course.ECTS), declarated_semester : declarated_course.semester, declarated_academicYear : academicYear,
                                declarated_period : academicSemester, semester_grade : 0, progress_grade : 0, exam_grade : 0, lab_grade : 0,
                                tasks_grade : 0, result : '', exam_period : academicExamPeriod, active : true})
            
        })   
        setCoursesGrading(new_array)   
    }, [coursesDeclaration])

    // Set the new Course Grading Information updated 
    useEffect(() => {
        newCourseGrading.declarated_courses.map((item) => {
            if (item.course_name === 'Αγγλική Γλώσσα και Τεχνική Ορολογία' || item.course_name === "Μεθοδολογία Σύνταξης Τεχνικών Κειμένων και Παρουσιάσεων στην Αγγλική Γλώσσα") {
                item.result = 'Επιτυχία';
            }
        })
    }, [newCourseGrading])
 
    // Function that prepares the input to courses' declaration document and realizes the registration
    const addNewCourseDeclaration = () => {        
        // COURSES DECLARATION INFORMATION
        CoursesDeclarationResolvers.add_new_course_declaration(newCourseDeclaration)
            .then(result => {               
                if (result?.data?.addNewCourseDeclaration === "[SUCCESS] -> ADD NEW COURSE DECLARATION SUCCESSFUL !!") { 
                    setIsCompletedCourseDeclaration(true);
                } 
                else if (result?.data?.addNewCourseDeclaration === "[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!") {
                    setIsCompletedCourseDeclaration(false);
                } 
            })    
            .catch(err=> {
                console.log(err);
                throw err;
            })
        
        // COURSES GRADING INFORMATION        
        GradingResolvers.add_new_grade_information(newCourseGrading)
            .then(result => {
                if (result?.data?.addGradeInformation === "[SUCCESS] -> ADD NEW COURSE DECLARATION SUCCESSFUL !!") { 
                    setIsCompletedCourseDeclaration(true);
                } 
                else if (result?.data?.addGradeInformation === "[ERROR] -> ADD NEW ACADEMIC CALENDAR FAILED !!") {
                    setIsCompletedCourseDeclaration(false);
                } 
            })    
            .catch(err=> {
                console.log(err);
                throw err;
            })

         
    }
 
    // If the course declaration is ready and it has been inserted to the corresponding database, we will take the basic info for this
    if (isCompletedCourseDeclaration === true && courseDeclarationBasicInfo.declDay === 0) {
        // Determine the input data to resolver 
        const AEM = props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number; 
        if (academicSemester !== undefined) { 
            CoursesDeclarationResolvers.get_course_declaration_basic_info(AEM, academicSemester, academicYear)
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
                    setCourseDeclarationBasicInfo({...courseDeclarationBasicInfo, declYear:result?.data?.getBasicForDeclaration?.dateParts?.year, declMonth:result?.data?.getBasicForDeclaration?.dateParts?.month, declDay:result?.data?.getBasicForDeclaration?.dateParts?.day, declHour: localHour , declMinutes : result?.data?.getBasicForDeclaration?.dateParts?.minute, declSeconds : result?.data?.getBasicForDeclaration?.dateParts?.second, declarated_courses : result?.data?.getBasicForDeclaration?.declarated_courses})
                })
                .catch(err=> {
                    console.log(err);
                    throw err;
                }) 
            }
    }    

    useEffect(() => { 
        // Setting the new course declaration document
        setNewCourseDeclaration(newCourseDeclaration => ({
            ...newCourseDeclaration,
            student_FirstName : props?.connectedUser?.Personal_Info?.Personal_Information?.first_name,
            student_LastName : props?.connectedUser?.Personal_Info?.Personal_Information?.last_name,
            student_AEM : props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number,
            student_identity : props?.connectedUser?.Studentship_Info?.General_Information?.academic_identity,
            student_username : props?.connectedUser?.Personal_Info?.Personal_Information?.username,
            student_uthEmail : props?.connectedUser?.Studentship_Info?.General_Information?.academic_email,
            student_academic_semester : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester, 
            academic_period : academicSemester, 
            academic_year : academicYear,
            declaration_type : academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear,
            declaration_category : 'Κύρια',
            declaration_activeFromDay : coursesDeclarationDates.courseDeclaration_startDay,
            declaration_activeFromDate : coursesDeclarationDates.courseDeclaration_startDate,
            declaration_activeToDay : coursesDeclarationDates.courseDeclaration_endDay,
            declaration_activeToDate : coursesDeclarationDates.courseDeclaration_endDate,
            courses_number : coursesDeclaration.length,
            hours_sum : coursesTotalHours, 
            ECTS_sum : coursesTotalECTS, 
            studyUnits_sum : coursesTotalStudyUnits,
            declaration_state : 'Υποβληθείσα Δήλωση',
            declarated_courses : coursesDeclaration  
        }))  
             
        let array = [];
        if (previousDeclarated.length === 0) { 
            array = coursesGrading;
        }
        else if (coursesGrading.length === 0) { 
            array = previousDeclarated;
        }
        else { 
            let newarray = [];
            previousDeclarated.forEach(item => {
                newarray.push(item);
            })
            if (newarray.length !== 0) {
                coursesGrading.forEach(item=> {
                    newarray.push(item);
                })
            }
            array = newarray;
        }  
        // Setting the new course declaration grading information document
        setNewCourseGrading( newCourseGrading  => ({
            ...newCourseGrading, 
            student_FirstName : props?.connectedUser?.Personal_Info?.Personal_Information?.first_name,
            student_LastName : props?.connectedUser?.Personal_Info?.Personal_Information?.last_name,
            student_AEM : props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number,
            student_identity : props?.connectedUser?.Studentship_Info?.General_Information?.academic_identity,
            student_username : props?.connectedUser?.Personal_Info?.Personal_Information?.username,
            student_uthEmail : props?.connectedUser?.Studentship_Info?.General_Information?.academic_email,
            current_student_semester : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester,
            student_title : study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΠΡΟΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' :  study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Άρρεν' ? 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ': study_level === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΜΕΤΑΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ',
            gender : props?.connectedUser?.Personal_Info?.Personal_Information?.gender,
            grade_average : 0,
            total_ECTS : 0,
            total_units : 0 , 
            declarated_courses : array

        }))
    }, [coursesDeclaration, coursesTotalHours, coursesTotalECTS, coursesTotalStudyUnits])

    useEffect(() => { 
        let sum_hours = 0;
        let sum_ECTS = 0;
        let sum_units = 0;
        coursesDeclaration.forEach(inCourse => {
            sum_hours = sum_hours + Number(inCourse.study_hours);
            sum_ECTS = sum_ECTS + Number(inCourse.ECTS);
            sum_units = sum_units + Number(inCourse.study_units);
        })
        setCoursesTotalHours(sum_hours);
        setCoursesTotalECTS(sum_ECTS);
        setCoursesTotalStudyUnits(sum_units); 
    }, [coursesDeclaration])

    // Function that saves the new declarated semester for the given name
    const saveNewDeclaratedCourseSemester = (newSemester_value) => { 
        // Update Courses Declaration Array 
        setCoursesDeclaration( 
            coursesDeclaration.map((course) =>
                course.course_code === relatedModalCourse?.StudyProgram?.course_code
                    ? {
                        ...course,
                        semester: newSemester_value.split('')[0]
                    }
                    : { ...course }
            )
        );
        // Update Courses Grading Array 
        setCoursesGrading( 
            coursesGrading.map((course) =>
                course.course_code === relatedModalCourse?.StudyProgram?.course_code
                    ? {
                        ...course,
                        declarated_semester: newSemester_value.split('')[0]
                    }
                    : { ...course }
            )
        );

        handleCloseDeclaratedSemester();
    }  
  
    // Function that controls the diploma form's input values before the upload of the diploma form inputs
    const prepareDiplomaForm = (diplomaForm) => { 
        if ((diplomaForm.supervisor_type === 'ΤΗΜΜΥ' && diplomaForm.supervisor === '') || (diplomaForm.supervisor_type === 'ΤΗΜΜΥ' && diplomaForm.supervisor === undefined)) {
            document.getElementById('supervisor').getElementsByClassName('form-select')[0].style.border= '1px solid red';
            document.getElementById('supervisor').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        }
        if ((diplomaForm.secondMember_type === 'ΤΗΜΜΥ' && diplomaForm.secondMember === '') || (diplomaForm.secondMember_type === 'ΤΗΜΜΥ' && diplomaForm.secondMember === undefined)) {
            document.getElementById('secondMember').getElementsByClassName('form-select')[0].style.border= '1px solid red';
            document.getElementById('secondMember').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        }
        if ((diplomaForm.thirdMember_type === 'ΤΗΜΜΥ' && diplomaForm.thirdMember === '') || (diplomaForm.thirdMember_type === 'ΤΗΜΜΥ' && diplomaForm.thirdMember === undefined)) {
            document.getElementById('thirdMember').getElementsByClassName('form-select')[0].style.border= '1px solid red';
            document.getElementById('thirdMember').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        } 
        if (diplomaForm.signature === null || diplomaForm.signature === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC' ) {
            document.getElementById('signature').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        }
        
        if (diplomaForm.telephone === '' || diplomaForm.telephone.length !== 10 || /*!validator.isNumeric(diplomaForm.telephone) || */
            diplomaForm.mobile_phone === '' || diplomaForm.mobile_phone.length !== 10 || /*!validator.isNumeric(diplomaForm.mobile_phone) || */
            diplomaForm.supervisor === '' ||  diplomaForm.secondMember === '' ||
            diplomaForm.thirdMember === '' || diplomaForm.greekTitle === '' ||  
            diplomaForm.englishTitle === '' || diplomaForm.signature === null ||
            diplomaForm.signature === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                setIsValidDiplomaForm(false); 
        }            
        else if ( diplomaForm.telephone !== '' && diplomaForm.telephone !== undefined && diplomaForm.telephone.length === 10 && validator.isNumeric(diplomaForm.telephone) &&   
                    diplomaForm.mobile_phone !== '' && diplomaForm.mobile_phone !== undefined && diplomaForm.telephone.length === 10 && validator.isNumeric(diplomaForm.telephone) &&
                    diplomaForm.supervisor !== '' && diplomaForm.supervisor !== undefined && diplomaForm.secondMember !== '' && diplomaForm.secondMember !== undefined && 
                    diplomaForm.thirdMember !== '' && diplomaForm.thirdMember !== undefined && diplomaForm.greekTitle !== '' && diplomaForm.greekTitle !== undefined &&
                    diplomaForm.englishTitle !== '' && diplomaForm.englishTitle !== undefined && diplomaForm.signature !== null && 
                    diplomaForm.signature !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC' ) {
                //setIsValidDiplomaForm(true);
                setModalPdf(true); 
        }
    }

    // Function that controls the special topic form's input values before the upload of the special topuc form inputs
    const prepareSpecialTopicForm = (specialTopicForm) => {  
        if ((specialTopicForm.supervisor_type === 'ΤΗΜΜΥ' && specialTopicForm.supervisor === '') || (specialTopicForm.supervisor_type === 'ΤΗΜΜΥ' && specialTopicForm.supervisor === undefined)) {
            document.getElementById('supervisor_specialTopic').getElementsByClassName('form-select')[0].style.border= '1px solid red';
            document.getElementById('supervisor_specialTopic').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        } 
        if (specialTopicForm.signature === null || specialTopicForm.signature === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC' ) {
            document.getElementById('signature_specialTopic').getElementsByClassName('invalidValue')[0].style.display = 'flex';
        }
        
        if (specialTopicForm.telephone === '' || specialTopicForm.telephone.length !== 10 ||/* !validator.isNumeric(specialTopicForm.telephone) || */
            specialTopicForm.mobile_phone === '' || specialTopicForm.mobile_phone.length !== 10 || /*!validator.isNumeric(specialTopicForm.mobile_phone) || */
            specialTopicForm.supervisor === '' ||  specialTopicForm.greekTitle === '' ||  
            specialTopicForm.englishTitle === '' || specialTopicForm.signature === null ||
            specialTopicForm.signature === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                setIsValidSpecialTopicForm(false);  
        }            
        else if ( specialTopicForm.telephone !== '' && specialTopicForm.telephone !== undefined && specialTopicForm.telephone.length === 10 && validator.isNumeric(specialTopicForm.telephone) &&   
        specialTopicForm.mobile_phone !== '' && specialTopicForm.mobile_phone !== undefined && specialTopicForm.telephone.length === 10 && validator.isNumeric(specialTopicForm.telephone) &&
        specialTopicForm.supervisor !== '' && specialTopicForm.supervisor !== undefined && specialTopicForm.greekTitle !== '' && specialTopicForm.greekTitle !== undefined &&
        specialTopicForm.englishTitle !== '' && specialTopicForm.englishTitle !== undefined && specialTopicForm.signature !== null && 
        specialTopicForm.signature !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC' ) {
                //setIsValidDiplomaForm(true);
                setModalShowPDF_specialTopic(true); 
        }
    }

    // Courses' Declaration Form Stepper Content
    const getStepContent = (step) => {	 
		switch (step) {
			case 0:
				return (
					<Form style= {{marginTop:'2rem', margin:'20px 20px'}}>
                         <Box style={{boxShadow:'1px 1px 10px 0.5px #767c7d53', background:'linear-gradient(145deg, #5b666811, #5b666811, #5b666823)', padding:'0px 15px'}}>
                            <Row className="mb-3">                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}>
                                            <Avatar src={userGender === 'Θήλυ' ? newFemaleStudent : newMaleStudent} style={{width:'60px', height:'60px', border:'1px solid #767c7d35'}}/>
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h4 className='label' style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', letterSpacing:'1px', color:'#158b9d'}}>{props?.connectedUser?.Personal_Info?.Personal_Information?.last_name + '  ' + props?.connectedUser?.Personal_Info?.Personal_Information?.first_name}</h4>
                                                <p className='study_level_student' style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'0px', fontWeight:'600', fontSize:'14px', color:'#606060'}}>
                                                    {study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΠΡΟΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 
                                                     study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Άρρεν' ? 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ':
                                                     study_level === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΜΕΤΑΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ'}
                                                </p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Φοιτητή</span>
                                                <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-1.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αριθμός Μητρώου</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκή Ταυτότητα</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Personal_Info?.Personal_Information?.student_identity}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Εξάμηνο Σπουδών</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.General_Information?.current_attendance_period === 'Εαρινή' ? 'Εξάμηνο ' + props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Εαρινό' : 'Εξάμηνο ' + props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Χειμερινό' }</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκό Έτος</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicYear}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                             <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>ECTS Μονάδες Φοιτητή</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.Grade_State?.ECTS_total + ' ECTS'}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Δ.Μ Φοιτητή</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.Grade_State?.units_total + ' Δ.Μ'}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>  
                            <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Δήλωσης</span>
                                                <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-1.5rem'}}>                           
                                    <List className='list' style={{padding:'0px', display:'flex', flexDirection:'row',  gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Είδος Δήλωσης</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear}</p>
                                            </ListItemText> 
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατηγορία Δήλωσης</h5>
                                                <FormGroup style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                                    <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox style={{color:'#17a2b8'}} checked/>} label="Κύρια" />
                                                    <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox checked={false}/>} label="Εμβόλιμη" />
                                                </FormGroup> 
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή από :</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_startDay + ' ' + coursesDeclarationDates.courseDeclaration_startDate}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'flex', flexWrap: 'wrap', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή εως :</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_endDay + ' ' + coursesDeclarationDates.courseDeclaration_endDate}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                             <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατάσταση Δήλωσης</h5>
                                                <div style={{display:'flex', gap:'10px', flexWrap:'nowrap'}}><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Επεξεργαζόμενη Δήλωση</p><RxUpdate style={{display:'inline', color:'#606060', marginTop:'0.15rem', fontWeight:'600', verticalAlign:'middle'}}/></div>
                                            </ListItemText>
                                        </ListItem>  
                                    </List>                  
                            </Row>  
                        </Box>                          
                </Form>
                );
                case 1:
				return (
					<Form style= {{marginTop:'2rem', margin:'20px 20px'}}>
                        {props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '1' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΠΡΩΤΟ ΕΤΟΣ - 1ο Εξάμηνο Σπουδών )</strong><br></br>Δηλώνετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>όλα τα μαθήματα του πρώτου εξαμήνου</strong> και το μάθημα «Αγγλική Γλώσσα 
                        και Τεχνική Ορολογία» ακόμα και εάν έχετε καταθέσει αντίγραφο πτυχίου.</div></div> : 
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '2' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΠΡΩΤΟ ΕΤΟΣ - 2ο Εξάμηνο Σπουδών )</strong><br></br>Δηλώνετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>όλα τα μαθήματα του δεύτερου εξαμήνου</strong> και το μάθημα «Μεθοδολογία Σύνταξης Τεχνικών Κειμένων και Παρουσιάσεων στην Αγγλική Γλώσσα» ακόμα και 
                        εάν έχετε καταθέσει αντίγραφο πτυχίου.</div></div> :
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '3' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΔΕΥΤΕΡΟ ΕΤΟΣ - 3ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 1ο εξάμηνο</strong>  και μετά να δηλώσετε τα μαθήματα<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 3ου εξαμήνου</strong>.<br></br>Για να δηλώσετε μαθήματα του 3ου εξαμήνου θα πρέπει να έχετε περάσει επιτυχώς τουλάχιστον 3 μαθήματα του 1ου , 2ου εξαμήνου (σε αυτά δεν προσμετρώνται το μάθημα «Αγγλική Γλώσσα και Τεχνική Ορολογία» και το μάθημα «Μεθοδολογία Σύνταξης Κειμένων και Ορολογία στην Αγγλική Γλώσσα»)</div></div>
                        : 
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '4' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΔΕΥΤΕΡΟ ΕΤΟΣ - 4ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 2ο εξάμηνο</strong>  και μετά να δηλώσετε τα μαθήματα<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 4ου εξαμήνου</strong>.</div></div>
                        : 
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '5' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΤΡΙΤΟ ΕΤΟΣ - 5ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 1ο και το 3ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 5ου εξαμήνου</strong>. Για να δηλώσετε μαθήματα του 5ου εξαμήνου θα πρέπει να έχετε περάσει επιτυχώς τουλάχιστον 9 μαθήματα του 1ου, 2ου , 3ου και 4ου εξαμήνου (σε αυτά δεν προσμετρώνται το μάθημα «Αγγλική Γλώσσα και Τεχνική Ορολογία» και το μάθημα «Μεθοδολογία Σύνταξης Κειμένων και Ορολογία στην Αγγλική Γλώσσα). Στο 5ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 2 επιλογής μαθήματα. Τα επιλογής μαθήματα μπορεί να είναι μόνο του 5ου εξαμήνου και όχι του 7ου εξαμήνου.</strong></div></div>
                        :
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '6' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΤΡΙΤΟ ΕΤΟΣ - 6ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 2ο και το 4ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 6ου εξαμήνου</strong>. Στο 6ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 2 επιλογής μαθήματα. Τα επιλογής μαθήματα μπορεί να είναι μόνο του 6ου εξαμήνου και όχι του 8ου εξαμήνου.</strong></div></div>
                        : 
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '7' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΤΕΤΑΡΤΟ ΕΤΟΣ - 7ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 1ο , το 3ο και το 5ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 7ου εξαμήνου</strong>. Για να δηλώσετε μαθήματα του 7ου εξαμήνου θα πρέπει να έχετε περάσει επιτυχώς τουλάχιστον 17 μαθήματα του 1ου, 2ου, 3ου ,4ου 5ου και 6ου εξαμήνου (σε αυτά δεν προσμετρώνται το μάθημα «Αγγλική Γλώσσα και Τεχνική Ορολογία» και το μάθημα «Μεθοδολογία Σύνταξης Κειμένων και Ορολογία στην Αγγλική Γλώσσα») Στο 7ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 5 επιλογής μαθήματα. Τα επιλογής μαθήματα μπορεί να είναι και από το 5ο, 7ο, και 9ο εξάμηνο και να τα χρεώσετε στο 5ο (εάν χρωστάτε κάποιο μάθημα επιλογής) και στο 7ο εξάμηνο. Δεν μπορείτε να δηλώσετε μαθήματα του 9ου εξαμήνου και να τα χρεώσετε στο 9ο εξάμηνο.</strong><br></br>Για να <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>δηλώσετε μαθήματα ΜΔΕ θα πρέπει να έχετε 210 ECTS μονάδες.</strong> Δεν μπορείτε να ξεπερνάτε τα δύο ΜΔΕ μαθήματα μέχρι την ολοκλήρωση των σπουδών σας <br></br>Εάν θέλετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>να δηλώσετε διπλωματική εργασία θα πρέπει να έχετε 180 ECTS μονάδες.</strong> Την δηλώνετε ως μάθημα και φυσικά αποστέλλετε ηλεκτρονικά και στην Γραμματεία την αίτηση εκπόνησης διπλωματικής εργασίας</div></div>
                        :
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '8' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '10' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΤΕΤΑΡΤΟ ΕΤΟΣ - 8ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 2ο , το 4ο και το 6ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 8ου εξαμήνου</strong>. Στο 8ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 5 επιλογής μαθήματα. Τα επιλογής μαθήματα μπορεί να είναι και από το 6ο και 8ο εξάμηνο και να τα χρεώσετε είτε στο 6ο (εάν χρωστάτε κάποιο μάθημα επιλογής) είτε στο 8ο εξάμηνο.</strong><br></br>Για να <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>δηλώσετε μαθήματα ΜΔΕ θα πρέπει να έχετε 210 ECTS μονάδες.</strong> Δεν μπορείτε να ξεπερνάτε τα δύο ΜΔΕ μαθήματα μέχρι την ολοκλήρωση των σπουδών σας <br></br>Εάν θέλετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>να δηλώσετε διπλωματική εργασία θα πρέπει να έχετε 180 ECTS μονάδες.</strong> Την δηλώνετε ως μάθημα και φυσικά αποστέλλετε ηλεκτρονικά και στην Γραμματεία την αίτηση εκπόνησης διπλωματικής εργασίας</div></div>
                        :
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '9' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΤΕΤΑΡΤΟ ΕΤΟΣ - 8ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 1o, το 3ο και το 5ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 9ου εξαμήνου</strong>. Στο 9ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 5 επιλογής μαθήματα.Τα επιλογής μαθήματα μπορεί να είναι και από το 5ο, το 7ο και το 9ο εξάμηνο και να τα χρεώσετε είτε στο 5ο (εάν χρωστάτε κάποιο μάθημα επιλογής), στο 7ο εξάμηνο (εάν χρωστάτε κάποιο μάθημα επιλογής) είτε στο 9ο εξάμηνο.</strong><br></br>Για να <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>δηλώσετε μαθήματα ΜΔΕ θα πρέπει να έχετε 210 ECTS μονάδες.</strong> Δεν μπορείτε να ξεπερνάτε τα δύο ΜΔΕ μαθήματα μέχρι την ολοκλήρωση των σπουδών σας <br></br>Εάν θέλετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>να δηλώσετε διπλωματική εργασία θα πρέπει να έχετε 180 ECTS μονάδες.</strong> Την δηλώνετε ως μάθημα και φυσικά αποστέλλετε ηλεκτρονικά και στην Γραμματεία την αίτηση εκπόνησης διπλωματικής εργασίας</div></div>
                        : 
                        props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '10' ?
                        <div style={{display:'grid', gridTemplateColumns:'0fr 2fr', columnGap:'1px',  width:'99%'}}><BsFillPinAngleFill style={{rotate:'270deg', fontSize:'2rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', color:'#f09f09'}}>ΚΑΝΟΝΕΣ ΔΗΛΩΣΗΣ ( ΠΕΜΠΤΟ ΕΤΟΣ - 10ο Εξάμηνο Σπουδών )</strong><br></br>Θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> υποχρεωτικά όλα τα μαθήματα που χρωστάτε 
                        από το 2ο , το 4ο και το 6ο εξάμηνο</strong> και μετά να δηλώσετε τα μαθήματα <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> του 8ου εξαμήνου</strong>. Στο 8ο εξάμηνο θα πρέπει να δηλώσετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>μέχρι και 5 επιλογής μαθήματα. Τα επιλογής μαθήματα μπορεί να είναι και από το 6ο και 8ο εξάμηνο και να τα χρεώσετε είτε στο 6ο (εάν χρωστάτε κάποιο μάθημα επιλογής) είτε στο 8ο εξάμηνο.</strong><br></br>Για να <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>δηλώσετε μαθήματα ΜΔΕ θα πρέπει να έχετε 210 ECTS μονάδες.</strong> Δεν μπορείτε να ξεπερνάτε τα δύο ΜΔΕ μαθήματα μέχρι την ολοκλήρωση των σπουδών σας <br></br>Εάν θέλετε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>να δηλώσετε διπλωματική εργασία θα πρέπει να έχετε 180 ECTS μονάδες.</strong> Την δηλώνετε ως μάθημα και φυσικά αποστέλλετε ηλεκτρονικά και στην Γραμματεία την αίτηση εκπόνησης διπλωματικής εργασίας</div></div>
                        : null
                        }     
                        
                        {semesterArray.map((semester, index) => {
                            return(                               
                            <Accordion key={index}  className='courses_declaration_accordion' style={{marginTop:index === 0 ? '2rem' : null}}>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>{'Εξάμηνο ' +  semester}</Accordion.Header>
                                    <Accordion.Body style={{padding:"10px 10px"}}>
                                    {/*<Box style={{boxShadow:'1px 1px 10px 0.5px #767c7d53', width:'99%', background:'linear-gradient(145deg, #5b666811, #5b666811, #5b666823)', padding:'10px 10px', marginTop:'2rem', display:'grid'}}>*/}
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                <th>#</th>
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
                                                {coursesBySemesters?.map((semesterCoursesInfo) => {
                                                    return(                                                                                                           
                                                        semesterCoursesInfo?._id?.semester === semester && semesterCoursesInfo?._id?.category === 'ΥΠΟΧΡΕΩΤΙΚΟ'?
                                                            semesterCoursesInfo?.courses.map((currCourse, courseIndex) => {
                                                                return (
                                                                  (props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '7' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '8' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '9' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '10') &&
                                                                   (currCourse?.StudyProgram?.semester === '5' || currCourse?.StudyProgram?.semester === '6' || currCourse?.StudyProgram?.semester === '7' || currCourse?.StudyProgram?.semester === '8' || currCourse?.StudyProgram?.semester === '9' || currCourse?.StudyProgram?.semester === '10') ?                                                                              
                                                                    <tr key={courseIndex}>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <Form.Check checked={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} aria-checked={isCourseSuccessful(currCourse?.StudyProgram?.course_code)}  readOnly={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} style={{padding:'9px 9px'}}  type='checkbox' onChange={(e)=> (isCourseSuccessful(currCourse?.StudyProgram?.course_code)) ? prepareCoursesDeclaration(null) : prepareCoursesDeclaration(currCourse?.StudyProgram)} value={currCourse?.StudyProgram?.course_name}/></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_name}</td>                                                                       
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent', verticalAlign:'middle', flexDirection:'row', alignItems:'center', justifyContent:'center', columnGap:'10px', color : coursesDeclaration.filter(item=>(item.course_code === currCourse?.StudyProgram?.course_code && item.semester !== currCourse?.StudyProgram?.semester)).length > 0 ? '#f09f09' : '#6a6a6a'}}>
                                                                            {coursesDeclaration.filter(item=>item.course_code === currCourse?.StudyProgram?.course_code).length > 0 ? coursesDeclaration.filter(item=>item.course_code === currCourse?.StudyProgram?.course_code)[0].semester : currCourse?.StudyProgram?.semester}<AiOutlineSelect className='select_image' onClick={()=> handleClickOpenDeclaratedSemester(currCourse)} style={{display: isCoursesDeclarationContent(currCourse?.StudyProgram) ? 'inline-table' : 'none', marginLeft:'5px', marginTop:'-3px', fontSize:'18px', color : 'rgb(13, 115, 136)'}}/>                                                                              
                                                                        </td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.ECTS}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.study_units}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.group}</td>                                                                    
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <div className='inTable'>{currCourse?.StudyProgram?.course_type}<FaExclamation style={{color:'red', display:'inline-table', verticalAlign:'middle'}}/></div></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_category}</td>
                                                                    </tr>
                                                                    : 
                                                                    <tr key={courseIndex}>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <Form.Check checked={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} aria-checked={isCourseSuccessful(currCourse?.StudyProgram?.course_code)} readOnly={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} style={{padding:'9px 9px'}}  type='checkbox' onChange={(e)=> (isCourseSuccessful(currCourse?.StudyProgram?.course_code)) ? prepareCoursesDeclaration(null) : prepareCoursesDeclaration(currCourse?.StudyProgram)} value={currCourse?.StudyProgram?.course_name}/></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_name}</td>                                                                       
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent', verticalAlign:'middle', flexDirection:'row', alignItems:'center', justifyContent:'center', columnGap:'10px'}}>
                                                                            {currCourse?.StudyProgram?.semester}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.ECTS}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.study_units}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.group}</td>                                                                    
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <div className='inTable'>{currCourse?.StudyProgram?.course_type}<FaExclamation style={{color:'red', display:'inline-table', verticalAlign:'middle'}}/></div></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_category}</td>
                                                                    </tr>                                                                     
                                                                )
                                                            })
                                                        : null                                          
                                                    )
                                                })}  
                                                {coursesBySemesters?.map((semesterCoursesInfo) => {
                                                    return(
                                                        semesterCoursesInfo?._id?.semester === semester && semesterCoursesInfo?._id?.category !== 'ΥΠΟΧΡΕΩΤΙΚΟ'?
                                                            semesterCoursesInfo?.courses.map((currCourse, courseIndex) => {
                                                                return (
                                                                    (props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '7' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '8' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '9' || props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '10') &&
                                                                   (currCourse?.StudyProgram?.semester === '5' || currCourse?.StudyProgram?.semester === '6' || currCourse?.StudyProgram?.semester === '7' || currCourse?.StudyProgram?.semester === '8' || currCourse?.StudyProgram?.semester === '9' || currCourse?.StudyProgram?.semester === '10') ?                                                                              
                                                                    <tr key={courseIndex}>
                                                                        <td id={currCourse?.StudyProgram?.course_code} style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <Form.Check checked={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)}  aria-checked={isCourseSuccessful(currCourse?.StudyProgram?.course_code)} readOnly={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} style={{padding:'9px 9px'}} type='checkbox' onChange={(e)=> (isCourseSuccessful(currCourse?.StudyProgram?.course_code)) ? prepareCoursesDeclaration(null) : prepareCoursesDeclaration(currCourse?.StudyProgram)} value={currCourse?.StudyProgram?.course_name}/></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_name}</td>
                                                                            <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.5' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent', verticalAlign:'middle', flexDirection:'row', alignItems:'center', justifyContent:'center', columnGap:'10px', color : coursesDeclaration.filter(item=>(item.course_code === currCourse?.StudyProgram?.course_code && item.semester !== currCourse?.StudyProgram?.semester)).length > 0 ? '#f09f09' : '#6a6a6a'}}>
                                                                            {coursesDeclaration.filter(item=>item.course_code === currCourse?.StudyProgram?.course_code).length > 0 ? coursesDeclaration.filter(item=>item.course_code === currCourse?.StudyProgram?.course_code)[0].semester : currCourse?.StudyProgram?.semester}<AiOutlineSelect className='select_image' onClick={()=> handleClickOpenDeclaratedSemester(currCourse)} style={{display: isCoursesDeclarationContent(currCourse?.StudyProgram) ? 'inline-table' : 'none', marginLeft:'5px', marginTop:'-3px', fontSize:'18px', color : 'rgb(13, 115, 136)'}}/>                                                                              
                                                                        </td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.ECTS}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.study_units}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.group}</td>                                                                    
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <div className='inTable'>{currCourse?.StudyProgram?.course_type}<GiClick style={{color:'#17a3b88d', display:'inline-table', verticalAlign:'middle'}}/></div></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_category}</td>
                                                                    </tr>
                                                                    : 
                                                                    <tr key={courseIndex}>
                                                                        <td id={currCourse?.StudyProgram?.course_code} style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <Form.Check checked={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)}  aria-checked={isCourseSuccessful(currCourse?.StudyProgram?.course_code)} readOnly={isCoursesDeclarationContent(currCourse?.StudyProgram) || isCourseSuccessful(currCourse?.StudyProgram?.course_code)} style={{padding:'9px 9px'}} type='checkbox' onChange={(e)=> (isCourseSuccessful(currCourse?.StudyProgram?.course_code)) ? prepareCoursesDeclaration(null) : prepareCoursesDeclaration(currCourse?.StudyProgram)} value={currCourse?.StudyProgram?.course_name}/></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_name}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.semester}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.ECTS}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.study_units}</td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.group}</td>                                                                    
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            <div className='inTable'>{currCourse?.StudyProgram?.course_type}<GiClick style={{color:'#17a3b88d', display:'inline-table', verticalAlign:'middle'}}/></div></td>
                                                                        <td style={{opacity : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? '0.6' : '1', backgroundColor : isCourseSuccessful(currCourse?.StudyProgram?.course_code) === true ? 'rgba(0, 128, 0, 0.1)' : 'transparent'}}>
                                                                            {currCourse?.StudyProgram?.course_category}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        : null                                          
                                                    )
                                                })}   
                                            </tbody>
                                            <BootstrapDialog
                                                    onClose={handleCloseDeclaratedSemester}
                                                    aria-labelledby="customized-dialog-title"
                                                    open={openDeclaratedSemester}
                                                    curr_course={relatedModalCourse}
                                                >
                                                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDeclaratedSemester}
                                                    style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600'}}>
                                                    Επιλέξτε Εξάμηνο
                                                    </BootstrapDialogTitle> 
                                                    <DialogContent dividers>
                                                        <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji"', textAlign:'justify', marginBottom: '1.5rem'}}>Επιλέξτε το εξάμηνο στο οποίο επιθυμείτε να χρεώσετε το μάθημα 
                                                        <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji"', color : '#17a2b8', display:'inline-flex'}}>{' ' + relatedModalCourse?.StudyProgram?.course_name + ' (' + relatedModalCourse?.StudyProgram?.course_code+ ') '}</strong></div>
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} id='course_program_part'>			 					
                                                            {props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '10' && (relatedModalCourse?.StudyProgram?.semester === '6'  || relatedModalCourse?.StudyProgram?.semester === '8') ?
                                                                <Form.Select aria-label="select example" onChange={(e) => setActiveSemester(e.target.value)}>
                                                                    <option style={{display:'none'}}>Επιλέξτε Κατεύθυνση...</option>                                                                
                                                                    <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="6ο Εξάμηνο">6ο Εξάμηνο</option>
                                                                    <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="8ο Εξάμηνο">8ο Εξάμηνο</option>                                                                     
                                                                </Form.Select>  
                                                            : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '8' && (relatedModalCourse?.StudyProgram?.semester === '6'  || relatedModalCourse?.StudyProgram?.semester === '8') ?
                                                            <Form.Select aria-label="Default select example" onChange={(e) => setActiveSemester(e.target.value)}>
                                                                <option style={{display:'none'}}>Επιλέξτε Κατεύθυνση...</option>                                                                    
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="6ο Εξάμηνο">6ο Εξάμηνο</option>
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="8ο Εξάμηνο">8ο Εξάμηνο</option>                                                                     
                                                            </Form.Select>  
                                                            : props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '9' && (relatedModalCourse?.StudyProgram?.semester === '5'  || relatedModalCourse?.StudyProgram?.semester === '7' || relatedModalCourse?.StudyProgram?.semester === '9') ?
                                                            <Form.Select aria-label="Default select example" onChange={(e) => setActiveSemester(e.target.value)}>
                                                                <option style={{display:'none'}}>Επιλέξτε Κατεύθυνση...</option>                                                                    
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="5ο Εξάμηνο">5ο Εξάμηνο</option>
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="7ο Εξάμηνο">7ο Εξάμηνο</option>     
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="9ο Εξάμηνο">9ο Εξάμηνο</option>                                                                
                                                            </Form.Select>
                                                            :  props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester === '7' && (relatedModalCourse?.StudyProgram?.semester === '5'  || relatedModalCourse?.StudyProgram?.semester === '7' || relatedModalCourse?.StudyProgram?.semester === '9') ?
                                                            <Form.Select aria-label="Default select example" onChange={(e) => setActiveSemester(e.target.value)}>
                                                                <option style={{display:'none'}}>Επιλέξτε Κατεύθυνση...</option>                                                                    
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="5ο Εξάμηνο">5ο Εξάμηνο</option>
                                                                <option style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} value="7ο Εξάμηνο">7ο Εξάμηνο</option>                                                                
                                                            </Form.Select> : null}
                                                            </Form.Group>
                                                        </Row>
                                                    </DialogContent>
                                                    <DialogActions>
                                                    <Button onClick={() => saveNewDeclaratedCourseSemester(activeSemester)} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:"rgba(110, 109, 109, 0.95)"}} autoFocus>
                                                        ΑΠΟΘΗΚΕΥΣΗ ΕΠΙΛΟΓΗΣ
                                                    </Button>
                                                    </DialogActions>
                                                </BootstrapDialog>
                                            </Table>                                      
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>
                            )
                        })}   
                    </Form>
                );
                case 2:
                    return (
                        <Form style= {{marginTop:'2rem', margin:'20px 20px'}}>
                            {coursesDeclarationErrors.length === 0 && diplomaThesis.state === false && specialTopic.state === false && isValidDiplomaForm === false ?
                            <div style={{display:'block', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><FcOk style={{ fontSize:'6rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', marginTop:'4rem', color:'#818181'}}>ΚΑΤΑΣΤΑΣΗ ΔΗΛΩΣΗΣ : <div style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'18px', display:'inline-flex', color:'rgb(17, 167, 17)'}}>'Εγκυρη</div> </strong><br></br>Πραγματοποιήσατε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem'}}>με επιτυχία</strong> τη Δήλωση Μαθημάτων σας σύμφωνα με τους κανόνες Δήλωσης που σας υποδεικνύονται ! 
                            <br></br>Μπορείτε να συνεχίσετε με την <strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'16px', marginTop:'2rem', color:'#818181'}}>Προεπισκόπιση και την Τελική Υποβολή </strong>της Δήλωσή σας ! </div></div> 
                            // DIPLOMA THESIS FORM
                            : coursesDeclarationErrors.length === 0 && diplomaThesis.state === true && isValidDiplomaForm === false ?
                            <>  <Box className='second_form'>
                                    <div style={{display:'grid', textAlign:'justify', gridTemplateColumns:'0fr 2fr', columnGap:'5px', width:'99%', marginTop:'1rem', verticalAlign:'start'}}><TiWarning style={{color : '#f09f09', verticalAlign:'start', justifyContent:'start', marginTop:'0rem', marginBottom:'auto', fontSize : '50px', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'33px', color:'#f09f09', textAlign:'justify', alignItems:'start', justifyContent:'start'}}>ΠΡΟΣΟΧΗ !</strong><br></br>Στην δήλωσή σας συμπεριλάβατε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> το υποχρεωτικό μάθημα 
                                    <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#17a2b8', fontSize:'15px', fontWeight:'700', letterSpacing:'1px', marginLeft:'5px', marginRight:'4px'}}>ΔΙΠΛΩΜΑΤΙΚΗ ΕΡΓΑΣΙΑ (ECE330)</div>.</strong> Αυτό σημαίνει ότι προκειμένου η Δήλωση Μαθημάτων σας να είναι έγκυρη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontSize:'15px', fontWeight:'700', color:'#818181'}}> απαιτείται, πέραν της Δηλώσεως, να αποστείλετε στην Ηλεκτρονική Γραμματεία και την <div style={{ display:'inline-flex', letterSpacing:'1px', color:'#818181', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:"4px", marginRight:'4px', color:'#17a2b8'}}>Αίτηση Εκπόνησης Διπλωματικής Εργασίας.</div></strong></div>
                                    <br></br><div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#818181', fontSize:'15px', fontWeight:'700'}}>Εάν δεν υπάρχει αίτηση εκπόνησης μέχρι και την λήξη των δηλώσεων τότε θα διαγραφεί και ως μάθημα από την δήλωσή σας.</div> <br></br><div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#818181', fontSize:'15px', fontWeight:'700'}}>ΠΡΟΣΟΧΗ: Εάν έχετε αποστείλει σε προγενέστερο χρόνο αίτηση εκπόνησης διπλωματικής εργασίας θα πρέπει υποχρεωτικά να την δηλώσετε ως μάθημα μόνο.</div>
                                    
                                    <br></br>

                                    <div style={{marginTop:'1rem',paddingLeft:'8px', height:'fit-content',  borderLeft:'3px solid #f09f09'}}><div style={{ fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginTop:'2rem', color:'#818181', textAlign:'justify'}}>Ακολουθεί η <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:"4px", letterSpacing:'1px', marginRight:'4px', color:'#17a2b8'}}>Αίτηση Εκπόνησης Διπλωματικής Εργασίας.</strong><br></br>Παρακαλώ συμπληρώστε την Αίτηση με τα κατάλληλα στοιχεία και πατήστε το κουμπί <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#818181', fontSize:'15px'}}>ΥΠΟΒΟΛΗ</strong> προκειμένου η αίτηση να αποσταλεί τόσο στην Ηλεκτρονική Γραμματεία, όσο και στον Επιβλέποντα Καθηγητή της εργασίας. Μόνο έτσι θα μπορέσετε να ολοκληρώσετε και τη Δήλωση Μαθημάτων σας με επιτυχία!</div></div>
                                    </div> 


                                <div className="diploma_form" id="myform">
                                <div className="main_form_header">
                                    <div className="department_greek">
                                        <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                                        <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                                        <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                                    </div>
                                    <img className="form_logo" src={UTH_LOGO_FORM} alt = ""/>
                                    <div className="department_eng">
                                        <div className="university">UNIVERSITY OF THESSALY</div>
                                        <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                                        <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>                            
                                    </div>
                                </div>
                                <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {academicYear}</div>
                                <div className="main_form_title">Αίτηση Εκπόνησης Διπλωματικής Εργασίας - Στοιχεία</div>
                                <div className="form_container"  style={{display:'block', boxShadow:'0px 0px 0px 0px white'}}> 
                                <div  className="parts" style={{display:'block'}}>
                                    <div className="first_part" style={{display:'block' , gap:'35px', alignItems:'center', justifyContent:'center'}}>
                                        <div className="StudentInfo"> 
                                            <Form>                        
                                                <Form.Group as={Col} id="first_name">
                                                <Form.Label>ΟΝΟΜΑ</Form.Label>
                                                <Form.Control type="text" value={diplomaForm.first_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>

                                                <Form.Group as={Col} id="last_name">
                                                <Form.Label>ΕΠΩΝΥΜΟ</Form.Label>
                                                <Form.Control type="text" value={diplomaForm.last_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>

                                                <Form.Group as={Col} id="father_FirstName">
                                                    <Form.Label>ΟΝΟΜΑ ΠΑΤΡΟΣ</Form.Label>
                                                    <Form.Control 
                                                        value={diplomaForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group> 

                                                <Form.Group as={Col} id="AEM">
                                                    <Form.Label>AEΜ</Form.Label>
                                                    <Form.Control type="text" value={diplomaForm.AEM} readOnly style={{borderBottom:'2px solid #17a2b8'}} />
                                                </Form.Group>

                                                <Form.Group as={Col} id="Email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" value={diplomaForm.email} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>
                    
                                                <Form.Group as={Col} id="telephone">  
                                                <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                <OverlayTrigger 
                                                    key='diplomaForm_telephone'
                                                    placement='right'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό</strong> (10 ψηφία) !</div>
                                                        </Tooltip>
                                                    }
                                                    ><Form.Label>ΤΗΛΕΦΩΝΟ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>                              </div>     
            
                                                    <Form.Control required isInvalid={activeStepForm === 0 && (diplomaForm?.telephone === '' || diplomaForm.telephone === undefined || !validator.isNumeric(diplomaForm.telephone) || diplomaForm.telephone.length !== 10) ? true : false}
                                                    type="text"value={diplomaForm.telephone} onChange={(e) => {setDiplomaForm({...diplomaForm, telephone:e.target.value})}}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
                                                    </Form.Control.Feedback>
                                                    
                                                </Form.Group>

                                                <Form.Group as={Col} id="mobile_phone">
                                                <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                <OverlayTrigger 
                                                    key='diplomaForm_telephone'
                                                    placement='right'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό</strong> (10 ψηφία) !</div>
                                                        </Tooltip>
                                                    }
                                                    ><Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger></div>     
                                                <Form.Control required isInvalid={activeStepForm === 0 && (diplomaForm?.mobile_phone === '' || diplomaForm.mobile_phone === undefined || !validator.isNumeric(diplomaForm.mobile_phone) || diplomaForm.mobile_phone.length !== 10) ? true : false}
                                                    type="text"value={diplomaForm.mobile_phone} onChange={(e) => {setDiplomaForm({...diplomaForm, mobile_phone:e.target.value})}}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form>
                                        </div>             
                                        <div className="FormInfo">                            
                                            <Form className="formIn" id='formInput'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                <OverlayTrigger 
                                                    key='diplomaForm_telephone'
                                                    placement='top'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                        </Tooltip>
                                                    }
                                                    ><div className="infoText" style={{color:'#f09f09',  marginTop:'2rem', textAlign:'center', fontSize:'18px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'1rem', fontWeight:'600'}}>Υπεύθυνος Καθηγητής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                        
                                                <Form.Group className="mb-3" id="supervisor">                                     
                                                <Form.Select required placeholder = 'Επιλέξτε Υπεύθυνο Καθηγητή'     
                                                                        style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                        
                                                                        onChange={(e)=>{document.getElementById('supervisor').getElementsByClassName('invalidValue')[0].style.display = 'none'; 
                                                                                        document.getElementById('supervisor').getElementsByClassName('form-select')[0].style.border = '1px solid #1211111c';  
                                                                                        setDiplomaForm({...diplomaForm, supervisor:e.target.value})}}> 
                                                    <option style={{display:'none'}}>Επιλέξτε Υπεύθυνο Καθηγητή</option>             
                                                    {professors.map((prof, index)=>{
                                                        return(
                                                        <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                                <div className='invalidValue'>*Το πεδίο είναι υποχρεωτικό!</div> 
                                                </Form.Group>                              
                                            </Form>                            
                                                <Form className="formIn" id='firstMember' style={{marginTop:'1rem'}}>
                                                    <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                    <OverlayTrigger 
                                                        key='diplomaForm_telephone'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'100px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{fontSize:'16px',textAlign:'left'}}>Δεύτερο Μέλος Επιτροπής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                                    <Form.Group className='mb-3' style={{display:'flex', flexDirection:'row', marginLeft : '0rem', marginRight:'auto', gap:'20px'}} as={Col} id="firstMember">
                                                    <Form.Label style={{textAlign:'left', marginBottom:'-0.3rem'}}>ΚΑΤΗΓΟΡΙΑ : </Form.Label> 
                                                        <div className="check" style={{display:'flex', marginLeft:'0rem', marginRight:'auto', marginBottom:'0.5rem', alignItems:'center', verticalAlign:'middle'}}>									
                                                            <Form.Check  
                                                                inline
                                                                label="ΤΗΜΜΥ"
                                                                name="group"
                                                                type='radio' 
                                                                id='ΤΗΜΜΥ'
                                                                onClick={()=>{setDiplomaForm({...diplomaForm, secondMember_type:"ΤΗΜΜΥ"})}}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="ΕΚΤΟΣ ΤΗΜΜΥ"
                                                                name="group"
                                                                type='radio'
                                                                id='ΕΚΤΟΣ ΤΗΜΜΥ'
                                                                onClick={()=>{setDiplomaForm({...diplomaForm, secondMember_type:"ΕΚΤΟΣ ΤΗΜΜΥ"})}}
                                                            />   										       
                                                        </div>  
                                                    </Form.Group>    
                                                    <Form.Group className="mb-3" id="secondMember">    
                                                    {diplomaForm.secondMember_type === 'ΤΗΜΜΥ'   ?                           
                                                    <Form.Select required placeholder = 'Επιλέξτε 1o Μέλος Επιτροπής'     
                                                                            style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                            onChange={(e)=>{document.getElementById('secondMember').getElementsByClassName('invalidValue')[0].style.display = 'none'; 
                                                                                            document.getElementById('secondMember').getElementsByClassName('form-select')[0].style.border = '1px solid #1211111c';
                                                                                            setDiplomaForm({...diplomaForm, secondMember:e.target.value})}}> 
                                                        <option style={{display:'none'}}>Επιλέξτε 2o Μέλος Επιτροπής</option>             
                                                        {professors.map((prof, index)=>{
                                                            return(
                                                            <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                            )
                                                        })}
                                                    </Form.Select> : 
                                                    <Form.Control required isInvalid={activeStepForm === 0 && (diplomaForm?.secondMember === '' || diplomaForm.secondMember === undefined) ? true : false}
                                                        type="text"value={diplomaForm.secondMember} onChange={(e) => {setDiplomaForm({...diplomaForm, secondMember:e.target.value})}}/>
                                                    }
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό!
                                                    </Form.Control.Feedback>    
                                                    <div className='invalidValue'>*Το πεδίο είναι υποχρεωτικό!</div>
                                                    </Form.Group>                               
                                                </Form> 
                                                <Form className="formIn" id='thirdMember' style={{marginTop:'1rem'}}>
                                                    <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                    <OverlayTrigger 
                                                        key='diplomaForm_telephone'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'88px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{fontSize:'16px', textAlign:'left'}}>Τρίτο Μέλος Επιτροπής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                                    <Form.Group className='mb-3' style={{display:'flex', flexDirection:'row', marginLeft : '0rem', marginRight:'auto', gap:'20px'}} as={Col} id="secondMember">
                                                    <Form.Label style={{textAlign:'left', marginBottom:'-0.3rem'}}>ΚΑΤΗΓΟΡΙΑ : </Form.Label> 
                                                    <div className="check" style={{display:'flex', marginLeft:'0rem', marginRight:'auto', marginBottom:'0.5rem', alignItems:'center', verticalAlign:'middle'}}>									 					
                                                            <Form.Check
                                                                inline
                                                                label="ΤΗΜΜΥ"
                                                                name="group2"
                                                                type='radio' 
                                                                id='ΤΗΜΜΥ'
                                                                onClick={()=>{setDiplomaForm({...diplomaForm, thirdMember_type:"ΤΗΜΜΥ"})}}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="ΕΚΤΟΣ ΤΗΜΜΥ"
                                                                name="group2"
                                                                type='radio'
                                                                id='ΕΚΤΟΣ ΤΗΜΜΥ'
                                                                onClick={()=>{setDiplomaForm({...diplomaForm, thirdMember_type:"ΕΚΤΟΣ ΤΗΜΜΥ"})}}
                                                            />   	
                                                        </div>	 
                                                    </Form.Group>    
                                                    <Form.Group className="mb-3" id="thirdMember">    
                                                    {diplomaForm.thirdMember_type === 'ΤΗΜΜΥ'   ?                           
                                                    <Form.Select required placeholder = 'Επιλέξτε 3ο Μέλος Επιτροπής'     
                                                                            style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                            onChange={(e)=>{document.getElementById('thirdMember').getElementsByClassName('invalidValue')[0].style.display = 'none'; 
                                                                                            document.getElementById('thirdMember').getElementsByClassName('form-select')[0].style.border = '1px solid #1211111c';
                                                                                            setDiplomaForm({...diplomaForm, thirdMember:e.target.value})}}> 
                                                        <option style={{display:'none'}}>Επιλέξτε 3o Μέλος Επιτροπής</option>             
                                                        {professors.map((prof, index)=>{
                                                            return(
                                                            <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                            )
                                                        })}
                                                    </Form.Select> : 
                                                    <Form.Control required isInvalid={activeStepForm === 0 && (diplomaForm?.thirdMember === '' || diplomaForm.thirdMember === undefined) ? true : false}
                                                        type="text"value={diplomaForm.thirdMember} onChange={(e) => {setDiplomaForm({...diplomaForm, thirdMember:e.target.value})}}/>
                                                    }
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό!
                                                    </Form.Control.Feedback>  
                                                    <div className='invalidValue'>*Το πεδίο είναι υποχρεωτικό!</div>
                                                    </Form.Group>                              
                                                </Form>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="diploma_title" style={{display:'block', alignItems:'left'}}>
                                        <Form className="formIn" id='formInput_greek'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                    <OverlayTrigger 
                                                        key='formInput_greek'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'2px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΔΙΠΛΩΜΑΤΙΚΗΣ (στα ελληνικά)<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                                <Form.Control required isInvalid={activeStepForm === 2 && (diplomaForm?.greekTitle === '' || diplomaForm.greekTitle === undefined) ? true : false}
                                                    as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                    value = {diplomaForm.greekTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, greekTitle:e.target.value})}}/>
                                                <Form.Control.Feedback type="invalid">
                                                    *Το πεδίο είναι υποχρεωτικό!
                                                </Form.Control.Feedback>  
                                            </Form.Group>                     
                                        </Form> 
                                        <Form className="formIn" id='formInput_english'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                    <OverlayTrigger 
                                                        key='formInput_greek'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'2px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΔΙΠΛΩΜΑΤΙΚΗΣ (στα αγγλικά)<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                            <Form.Group className="mb-3">                                     
                                                <Form.Control  required isInvalid={activeStepForm === 2 && (diplomaForm?.englishTitle === '' || diplomaForm.englishTitle === undefined) ? true : false}
                                                    as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                    value = {diplomaForm.englishTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, englishTitle:e.target.value})}}/>
                                                <Form.Control.Feedback type="invalid">
                                                    *Το πεδίο είναι υποχρεωτικό!
                                                </Form.Control.Feedback>  
                                            </Form.Group>                                                            
                                        </Form> 
                                    </div>   

                                    <div className="signature" id='signature'>
                                        {props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ?
                                            <div className="signature_text">Η Αιτούσα</div> :
                                                    <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                                        }}>Ο Αιτών</div> }
                                            {imageURL ? (
                                                <img 
                                                    src={imageURL}
                                                    alt="my signature"
                                                    style = {{
                                                        display : "block", 
                                                        marginLeft:'auto',
                                                        marginRight:'3rem',
                                                        border : "0px solid black",
                                                        width : "20%",
                                                        height : "20%"
                                                    }}
                                                />
                                            ) : null}
                                            <Button className="signatureButton" style={{marginTop:'1.5rem'}} onClick={()=> {setModalShow(true); document.getElementById('signature').getElementsByClassName('invalidValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                            <div className="invalidValue" style={{alignSelf:'right', fontWeight:'600', justifyContent:'right', textAlign:'right', marginTop:'10px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                                                                marginRight:'35px'}}>*Το πεδίο είναι υποχρεωτικό !</div>
                                    </div>  
                            <Modal                                
                                show = {modalShow}
                                size="375px"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered 
                            >
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Υπογράψτε το έντυπό σας ...
                                    </Modal.Title>
                                </Modal.Header>                                     
                                <Modal.Body>
                                    <SignaturePad
                                    style={{width:'700'}}
                                    ref={sigCanvas}
                                    canvasProps = {{
                                        className: "signatureCanvas" 
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button style={{textTransform:'none', fontWeight:'600'}} onClick={save}>Αποθήκευση</Button>
                                    <Button style={{textTransform:'none', color: 'gray', fontWeight:'600'}} onClick={clear}>Άκυρο</Button>
                                    <Button style={{textTransform:'none', color: 'gray', fontWeight:'600'}} onClick={()=>setModalShow(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                            </div> 
                            <Button onClick={() => prepareDiplomaForm(diplomaForm)}
                                    style={{display:'block',margin:'auto', background:'linear-gradient(to bottom, #17a2b8, #27adc2b4)', color:'white', fontSize:'16px', fontWeight:'700', wordSpacing:'1px',
                                            fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ</Button> 
                                </div> 
                                <MyDeclarationModal
                                    show={modalPdf}  
                                    formkind = 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας'
                                    data = {diplomaForm}
                                    academicyear = {academicYear}
                                    sex={props?.connectedUser?.Personal_Info?.Personal_Information?.gender}
                                    signature = {imageURL}
                                    graduate= {props?.connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)') ? 'Προπτυχιακών' : 'Μεταπτυχιακών'}
                                    onHide={ () => {{setIsValidDiplomaForm(true); setModalPdf(false);}}}                
                            />  
                            </Box>                                                              
                            </>
                            // SPECIAL TOPIC FORM
                            : coursesDeclarationErrors.length === 0 && specialTopic.state === true && isValidSpecialTopicForm === false ?
                            <> 
                                <Box className='second_form'>
                                    <div style={{display:'grid', textAlign:'justify', gridTemplateColumns:'0fr 2fr', columnGap:'5px', width:'99%', marginTop:'1rem', verticalAlign:'start'}}><TiWarning style={{color : '#f09f09', verticalAlign:'start', justifyContent:'start', marginTop:'0rem', marginBottom:'auto', fontSize : '50px', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'33px', color:'#f09f09', textAlign:'justify', alignItems:'start', justifyContent:'start'}}>ΠΡΟΣΟΧΗ !</strong><br></br>Στην δήλωσή σας συμπεριλάβατε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> το μάθημα επιλογής
                                    <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#17a2b8', fontSize:'15px', fontWeight:'700', letterSpacing:'1px', marginLeft:'5px', marginRight:'4px'}}>ΕΙΔΙΚΑ ΘΕΜΑΤΑ - ΕΡΓΑΣΙΕΣ (ECE330)</div>.</strong> Αυτό σημαίνει ότι προκειμένου η Δήλωση Μαθημάτων σας να είναι έγκυρη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontSize:'15px', fontWeight:'700', color:'#818181'}}> απαιτείται, πέραν της Δηλώσεως, να αποστείλετε στην Ηλεκτρονική Γραμματεία και την <div style={{ display:'inline-flex', letterSpacing:'1px', color:'#818181', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:"4px", marginRight:'4px', color:'#17a2b8'}}>Αίτηση Εκπόνησης Ειδικού Θέματος - Εργασίας.</div></strong></div>
                                    <br></br><div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#818181', fontSize:'15px', fontWeight:'700'}}>Εάν δεν υπάρχει αίτηση εκπόνησης μέχρι και την λήξη των δηλώσεων τότε θα διαγραφεί και ως μάθημα από την δήλωσή σας.</div>
                                    
                                    <br></br>

                                    <div style={{marginTop:'1rem',paddingLeft:'8px', height:'fit-content',  borderLeft:'3px solid #f09f09'}}><div style={{ fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginTop:'2rem', color:'#818181', textAlign:'justify'}}>Ακολουθεί η <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:"4px", letterSpacing:'1px', marginRight:'4px', color:'#17a2b8'}}>Αίτηση Εκπόνησης Ειδικού Θέματος - Εργασίας.</strong><br></br>Παρακαλώ συμπληρώστε την Αίτηση με τα κατάλληλα στοιχεία και πατήστε το κουμπί <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'#818181', fontSize:'15px'}}>ΥΠΟΒΟΛΗ</strong> προκειμένου η αίτηση να αποσταλεί τόσο στην Ηλεκτρονική Γραμματεία, όσο και στον Επιβλέποντα Καθηγητή της εργασίας. Μόνο έτσι θα μπορέσετε να ολοκληρώσετε και τη Δήλωση Μαθημάτων σας με επιτυχία!</div></div>
                                    </div> 


                                <div className="diploma_form" id="myform">
                                <div className="main_form_header">
                                    <div className="department_greek">
                                        <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                                        <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                                        <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                                    </div>
                                    <img className="form_logo" src={UTH_LOGO_FORM} alt = ""/>
                                    <div className="department_eng">
                                        <div className="university">UNIVERSITY OF THESSALY</div>
                                        <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                                        <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>                            
                                    </div>
                                </div>
                                <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {academicYear}</div>
                                <div className="main_form_title">Αίτηση Εκπόνησης Ειδικού Θέματος / Εργασίας - Στοιχεία</div>
                                <div className="form_container"  style={{display:'block', boxShadow:'0px 0px 0px 0px white'}}> 
                                <div  className="parts" style={{display:'block'}}>
                                    <div className="first_part" style={{display:'block' , gap:'35px', alignItems:'center', justifyContent:'center'}}>
                                        <div className="StudentInfo"> 
                                            <Form>                        
                                                <Form.Group as={Col} id="first_name">
                                                <Form.Label>ΟΝΟΜΑ</Form.Label>
                                                <Form.Control type="text" value={specialTopicForm.first_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>

                                                <Form.Group as={Col} id="last_name">
                                                <Form.Label>ΕΠΩΝΥΜΟ</Form.Label>
                                                <Form.Control type="text" value={specialTopicForm.last_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>

                                                <Form.Group as={Col} id="father_FirstName">
                                                    <Form.Label>ΟΝΟΜΑ ΠΑΤΡΟΣ</Form.Label>
                                                    <Form.Control 
                                                        value={specialTopicForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group> 

                                                <Form.Group as={Col} id="AEM">
                                                    <Form.Label>AEΜ</Form.Label>
                                                    <Form.Control type="text" value={specialTopicForm.AEM} readOnly style={{borderBottom:'2px solid #17a2b8'}} />
                                                </Form.Group>

                                                <Form.Group as={Col} id="Email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" value={specialTopicForm.email} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                                </Form.Group>
                    
                                                <Form.Group as={Col} id="telephone">  
                                                <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                <OverlayTrigger 
                                                    key='specialTopic_telephone'
                                                    placement='right'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό</strong> (10 ψηφία) !</div>
                                                        </Tooltip>
                                                    }
                                                    ><Form.Label>ΤΗΛΕΦΩΝΟ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger>                              </div>     
            
                                                    <Form.Control required isInvalid={activeStepForm === 3 && (specialTopicForm?.telephone === '' || specialTopicForm.telephone === undefined || !validator.isNumeric(specialTopicForm.telephone) || specialTopicForm.telephone.length !== 10) ? true : false}
                                                    type="text"value={specialTopicForm.telephone} onChange={(e) => {setSpecialTopicForm({...specialTopicForm, telephone:e.target.value})}}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
                                                    </Form.Control.Feedback>
                                                    
                                                </Form.Group>

                                                <Form.Group as={Col} id="mobile_phone">
                                                <div style={{display:'flex', justifyContent:'left', textAlign:'left'}}>
                                                <OverlayTrigger 
                                                    key='specialTopic_telephone'
                                                    placement='right'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginLeft:'8px'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό</strong> (10 ψηφία) !</div>
                                                        </Tooltip>
                                                    }
                                                    ><Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></Form.Label></OverlayTrigger></div>     
                                                <Form.Control required isInvalid={activeStepForm === 3 && (specialTopicForm?.mobile_phone === '' || specialTopicForm.mobile_phone === undefined || !validator.isNumeric(specialTopicForm.mobile_phone) || specialTopicForm.mobile_phone.length !== 10) ? true : false}
                                                    type="text"value={specialTopicForm.mobile_phone} onChange={(e) => {setSpecialTopicForm({...specialTopicForm, mobile_phone:e.target.value})}}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        *Το πεδίο είναι υποχρεωτικό και πρέπει να αποτελείται από 10 ψηφία!
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form>
                                        </div>             
                                        <div className="FormInfo">                            
                                            <Form className="formIn" id='formInput'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                <OverlayTrigger 
                                                    key='specialTopic_telephone'
                                                    placement='top'									
                                                    overlay={
                                                        <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} id={`tooltip-right`}>
                                                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                        </Tooltip>
                                                    }
                                                    ><div className="infoText" style={{color:'#f09f09',  marginTop:'2rem', textAlign:'center', fontSize:'18px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'1rem', fontWeight:'600'}}>Υπεύθυνος Καθηγητής<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                        
                                                <Form.Group className="mb-3" id="supervisor_specialTopic">                                     
                                                <Form.Select required placeholder = 'Επιλέξτε Υπεύθυνο Καθηγητή'     
                                                                        style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                        
                                                                        onChange={(e)=>{document.getElementById('supervisor_specialTopic').getElementsByClassName('invalidValue')[0].style.display = 'none'; 
                                                                                        document.getElementById('supervisor_specialTopic').getElementsByClassName('form-select')[0].style.border = '1px solid #1211111c';  
                                                                                        setSpecialTopicForm({...specialTopicForm, supervisor:e.target.value})}}> 
                                                    <option style={{display:'none'}}>Επιλέξτε Υπεύθυνο Καθηγητή</option>             
                                                    {professors.map((prof, index)=>{
                                                        return(
                                                        <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                        )
                                                    })}
                                                </Form.Select>
                                                <div className='invalidValue'>*Το πεδίο είναι υποχρεωτικό!</div> 
                                                </Form.Group>                              
                                            </Form>  
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="diploma_title" style={{display:'block', alignItems:'left'}}>
                                        <Form className="formIn" id='formInput_greek_specialTopic'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                    <OverlayTrigger 
                                                        key='formInput_greek'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'2px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΕΡΓΑΣΙΑΣ (στα ελληνικά)<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                                <Form.Control required isInvalid={activeStepForm === 2 && (specialTopicForm?.greekTitle === '' || specialTopicForm.greekTitle === undefined) ? true : false}
                                                    as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                    value = {specialTopicForm.greekTitle} onChange={(e) => {setSpecialTopicForm({...specialTopicForm, greekTitle:e.target.value})}}/>
                                                <Form.Control.Feedback type="invalid">
                                                    *Το πεδίο είναι υποχρεωτικό!
                                                </Form.Control.Feedback>  
                                            </Form.Group>                     
                                        </Form> 
                                        <Form className="formIn" id='formInput_english_specialTopic'>
                                            <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                                                    <OverlayTrigger 
                                                        key='formInput_greek'
                                                        placement='top'									
                                                        overlay={
                                                            <Tooltip style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginBottom:'2px'}} id={`tooltip-right`}>
                                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'14px'}}>Το πεδίο είναι <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', display:'inline-flex', color:'red'}}>υποχρεωτικό!</strong></div>
                                                            </Tooltip>
                                                        }
                                                    ><div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΕΡΓΑΣΙΑΣ (στα αγγλικά)<div style={{marginLeft:'3px', display:'inline-flex', color:'red'}}>*</div></div></OverlayTrigger></div>     
                                            <Form.Group className="mb-3">                                     
                                                <Form.Control  required isInvalid={activeStepForm === 2 && (specialTopicForm?.englishTitle === '' || specialTopicForm.englishTitle === undefined) ? true : false}
                                                    as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                    value = {specialTopicForm.englishTitle} onChange={(e) => {setSpecialTopicForm({...specialTopicForm, englishTitle:e.target.value})}}/>
                                                <Form.Control.Feedback type="invalid">
                                                    *Το πεδίο είναι υποχρεωτικό!
                                                </Form.Control.Feedback>  
                                            </Form.Group>                                                            
                                        </Form> 
                                    </div>   

                                    <div className="signature" id='signature_specialTopic'>
                                        {props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ?
                                            <div className="signature_text">Η Αιτούσα</div> :
                                                    <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                                        }}>Ο Αιτών</div> }
                                            {imageURL_specialTopic ? (
                                                <img 
                                                    src={imageURL_specialTopic}
                                                    alt="my signature"
                                                    style = {{
                                                        display : "block", 
                                                        marginLeft:'auto',
                                                        marginRight:'3rem',
                                                        border : "0px solid black",
                                                        width : "20%",
                                                        height : "20%"
                                                    }}
                                                />
                                            ) : null}
                                            <Button className="signatureButton" style={{marginTop:'1.5rem'}} onClick={()=> {setModalShow_specialTopic(true); document.getElementById('signature_specialTopic').getElementsByClassName('invalidValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                            <div className="invalidValue" style={{alignSelf:'right', fontWeight:'600', justifyContent:'right', textAlign:'right', marginTop:'10px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                                                                marginRight:'35px'}}>*Το πεδίο είναι υποχρεωτικό !</div>
                                    </div>  
                            <Modal                                
                                show = {modalShow_specialTopic}
                                size="375px"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered 
                            >
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Υπογράψτε το έντυπό σας ...
                                    </Modal.Title>
                                </Modal.Header>                                     
                                <Modal.Body>
                                    <SignaturePad
                                    style={{width:'700'}}
                                    ref={sigCanvas_specialTopic}
                                    canvasProps = {{
                                        className: "signatureCanvas" 
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button style={{textTransform:'none', fontWeight:'600'}} onClick={save_specialTopic}>Αποθήκευση</Button>
                                    <Button style={{textTransform:'none', color: 'gray', fontWeight:'600'}} onClick={clear_specialTopic}>Άκυρο</Button>
                                    <Button style={{textTransform:'none', color: 'gray', fontWeight:'600'}} onClick={()=>setModalShow_specialTopic(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                            </div> 
                            <Button onClick={() => prepareSpecialTopicForm(specialTopicForm)}
                                    style={{display:'block',margin:'auto', background:'linear-gradient(to bottom, #17a2b8, #27adc2b4)', color:'white', fontSize:'16px', fontWeight:'700', wordSpacing:'1px',
                                            fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ</Button> 
                                </div> 
                                <MyDeclarationModal
                                    show={modalShowPDF_specialTopic}  
                                    formkind = 'Αίτηση Εκπόνησης Ειδικού Θέματος Εργασίας'
                                    data = {specialTopicForm}
                                    academicyear = {academicYear}
                                    sex={props?.connectedUser?.Personal_Info?.Personal_Information?.gender}
                                    signature = {imageURL_specialTopic}
                                    graduate= {props?.connectedUser?.Studentship_Info?.General_Information?.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)') ? 'Προπτυχιακών' : 'Μεταπτυχιακών'}
                                    onHide={ () => {{setIsValidSpecialTopicForm(true); setModalShowPDF_specialTopic(false);}}}                
                            />  
                            </Box>                                                              
                            </>
                            : coursesDeclarationErrors.length === 0 && diplomaThesis.state === true && isValidDiplomaForm === true && isValidSpecialTopicForm === false ?
                            <div style={{display:'block', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><FcOk style={{ fontSize:'6rem', marginRight:'10px', color:'rgb(13, 115, 136)', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', marginTop:'4rem', color:'#818181'}}>ΚΑΤΑΣΤΑΣΗ ΔΗΛΩΣΗΣ : <div style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'18px', display:'inline-flex', color:'rgb(17, 167, 17)'}}>'Εγκυρη</div> </strong><br></br>Πραγματοποιήσατε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem'}}>με επιτυχία</strong> τη <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem'}}>Δήλωση Μαθημάτων σας</strong> σύμφωνα με τους κανόνες Δήλωσης που σας υποδεικνύονται ! 
                            <br></br>Πραγματοποιήσατε επίσης<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem', marginLeft:'4px', marginRight:'4px'}}>με επιτυχία</strong>την <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem'}}>Αίτηση Εκπόνησης Διπλωματικής Εργασίας</strong> που διασφαλίζει την εγκυρότητα της Δήλωσης! 
                            <br></br>Μπορείτε να συνεχίσετε με την <strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'16px', marginTop:'2rem', color:'#818181'}}>Προεπισκόπιση και την Τελική Υποβολή </strong>της Δήλωσή σας ! </div></div> 
                            : coursesDeclarationErrors.length !== 0  ?
                            <div style={{display:'block', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><FcHighPriority style={{ fontSize:'6rem', marginRight:'10px', color:'red', display:'inline-flex'}}/><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}>
                                <strong style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', marginTop:'4rem', marginBottom:'1rem', color:'#818181'}}>ΚΑΤΑΣΤΑΣΗ ΔΗΛΩΣΗΣ : <div style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'18px', display:'inline-flex', color:'red'}}>Μη 'Εγκυρη</div> </strong>
                                <br></br>
                            Η Δήλωση Μαθημάτων σας <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'red', marginTop:'1rem'}}>δεν έχει συμπληρωθεί με επιτυχία</strong> και σύμφωνα με τους κανόνες Δήλωσης που σας υποδεικνύονται ! </div>
                            <br></br>
                            {coursesDeclarationErrors.map((error, index) => {
                                    return (
                                        coursesDeclarationErrors.length === 1 ?
                                        <div key = {index} style={{marginTop:'-1.5rem'}}>
                                            <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'red', marginTop:'1rem', textAlign:'justify'}}>{error}</div> 
                                        </div>
                                        :  
                                        <div key={index} style={{display : 'flex', flexDirection:'row', textAlign:'left'}}>
                                            <FcCancel style={{display : 'inline-flex'}}/><div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'red', marginTop:'1rem', textAlign:'justify'}}>{error}</div><br></br>
                                        </div>
                                    )            
                            })} 
                            </div> 
                            : null}
                        </Form>
                    );
                case 3:
                    return (
                        <Form style= {{marginTop:'2rem', margin:'20px 20px'}} >
                         <Box style={{boxShadow:'1px 1px 10px 0.5px #767c7d53', background:'linear-gradient(145deg, #5b666811, #5b666811, #5b666823)', padding:'0px 15px', paddingBottom:'10px'}}>
                            <Row className="mb-3">                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}>
                                            <Avatar src={userGender === 'Θήλυ' ? newFemaleStudent : newMaleStudent} style={{width:'60px', height:'60px', border:'1px solid #767c7d35'}}/>
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h4 className='label' style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', letterSpacing:'1px', color:'#158b9d'}}>{props?.connectedUser?.Personal_Info?.Personal_Information?.last_name + '  ' + props?.connectedUser?.Personal_Info?.Personal_Information?.first_name}</h4>
                                                <p className='study_level_student' style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'0px', fontWeight:'600', fontSize:'14px', color:'#606060'}}>
                                                    {study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΠΡΟΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 
                                                     study_level === 'ΠΡΟΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Άρρεν' ? 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ':
                                                     study_level === 'ΜΕΤΑΠΤΥΧΙΑΚΟ' && props?.connectedUser?.Personal_Info?.Personal_Information?.gender === 'Θήλυ' ? 'ΜΕΤΑΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ' : 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ'}
                                                </p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Φοιτητή</span>
                                                <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-1.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Αριθμός Μητρώου</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκή Ταυτότητα</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Personal_Info?.Personal_Information?.student_identity}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Εξάμηνο Σπουδών</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{props?.connectedUser?.Studentship_Info?.General_Information?.current_attendance_period === 'Εαρινή' ? 'Εξάμηνο ' + props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Εαρινό' : 'Εξάμηνο ' + props?.connectedUser?.Studentship_Info?.General_Information?.current_academic_semester + ', Χειμερινό' }</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ακαδημαϊκό Έτος</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicYear}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>                              
                            <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'300', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Δήλωσης</span>
                                                <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-1.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Είδος Δήλωσης</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear}</p>
                                            </ListItemText> 
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατηγορία Δήλωσης</h5>
                                                <FormGroup style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                                    <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox style={{color:'#17a2b8'}} checked/>} label="Κύρια" />
                                                    <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox checked={false}/>} label="Εμβόλιμη" />
                                                </FormGroup> 
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή από :</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_startDay + ' ' + coursesDeclarationDates.courseDeclaration_startDate}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή εως :</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_endDay + ' ' + coursesDeclarationDates.courseDeclaration_endDate}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Μαθημάτων</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclaration.length + ' Μαθήματα'}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Ωρών</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalHours + ' Ώρες'}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα ECTS</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalECTS + ' ECTS'}</p>
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Διδακτικών Μονάδων</h5>
                                                <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalStudyUnits + ' Διδακτικές Μονάδες'}</p>
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row>
                             <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                    <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατάσταση Δήλωσης</h5>
                                                {coursesDeclarationErrors.length === 0 ?
                                                <div style={{display:'flex', gap:'10px', flexWrap:'nowrap'}}><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Έτοιμη Δήλωση προς Υποβολή</p></div>
                                                : null }
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}></h5>
                                                {coursesDeclarationErrors.length === 0 ?
                                                <div style={{display:'flex', gap:'10px', flexWrap:'nowrap', marginTop:'1rem'}}><FcOk style={{display:'inline', marginTop:'0.15rem', fontWeight:'600', verticalAlign:'middle'}}></FcOk><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'rgb(17, 167, 17)'}}>Έγκυρη</p></div>
                                                : null }
                                            </ListItemText>
                                        </ListItem>  
                                    </List>                  
                            </Row>
                            <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                    <List style={{padding:'0px'}}>
                                        <ListItem style={{padding:'10px'}}> 
                                            <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'500', fontSize:'19px', color:'#f09f09'}}>Δηλωμένα Μαθήματα</span>
                                                <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                            </ListItemText>
                                        </ListItem>
                                    </List>                  
                            </Row> 
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
                                    {coursesDeclaration?.map((declaratedCourse, courseIndex) => {
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
                        </Box>         
                    </Form>
                    );
            case 4 : 
                return(
                    <Form style= {{marginTop:'2rem', margin:'20px 20px'}}> 
                        <div style={{display:'block', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><strong style={{fontWeight:'600', marginBottom:'4rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', marginTop:'4rem', color:'#818181'}}>ΚΑΤΑΣΤΑΣΗ ΔΗΛΩΣΗΣ : <div style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'19px', fontWeight:'700', display:'inline-flex', color:'rgb(13, 115, 136)'}}>Έτοιμη Προς Υποβολή</div> </strong><br></br>Όλα είναι έτοιμα για να προχωρήσετε<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(13, 115, 136)', marginTop:'1rem'}}> με την Τελική Υποβολή της Δήλωσής σας και την καταχώρισή της στην Ηλεκτρονική Γραμματεία του Τμήματος.</strong> Με την ολοκλήρωση της διαδικασίας θα δημιουργηθεί και το αντίστοιχο έγγραφο pdf που θα αποδεικνύει την επιτυχή πραγματοποίηση της Δήλωσης και το οποίο αποτελεί επίσημο έγγραφο και μπορείτε να κατεβάσετε για αποθήκευση στο αρχείο σας ! 
                        </div></div>                             
                    </Form>
                );
            default:
                return 'Unknown step';

        }
    }
 
    return (
        <div className="declarations_submit_main">
            <div className="scroll">
                <div className="header"> 
                    <div className="text_header"><img src={BACK_ICON} alt='' /></div>
                    <div className="title"> Δηλώσεις Μαθημάτων
                        <p style={{padding:'0px 15px'}}>Ενεργή Περίοδος Δηλώσεων Μαθημάτων {academicSemester === 'Χειμερινό' ? 'Χειμερινού' : 'Εαρινού'} Εξαμήνου 2022-2023</p> 
                    </div>
                    <div className="header_area_declarations"> 
                        <div className='overflow_text'>
                            <p className='moving_text'>Ενεργή Περίοδος Δηλώσεων Μαθημάτων {academicSemester === 'Χειμερινό' ? 'Χειμερινού' : 'Εαρινού'} Εξαμήνου {academicYear}</p> 
                        </div>                 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">H περίοδος Δηλώσεων Μαθημάτων για το {academicSemester} Εξάμηνο του Ακαδημαϊκού Έτους {currAcademicYear} είναι ανοιχτή και θα παραμείνει ανοιχτή από <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>{coursesDeclarationDates?.courseDeclaration_startDay + ' ' + coursesDeclarationDates?.courseDeclaration_startDate}</strong> έως <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>{coursesDeclarationDates?.courseDeclaration_endDay + ' ' + coursesDeclarationDates?.courseDeclaration_endDate}</strong>. Παρακαλώ πραγματοπιήστε κατάλληλα τη Δήλωση των Μαθημάτων σας σύμφωνα με τις οδηγίες που σας εμφανίζονται ανάλογα με το εξάμηνο φοίτησής σας! Η δήλωση Μαθημάτων είναι απαραίτητη για όσους επιθυμούν να πάρουν μέρος στις επικείμενες εξετάσεις του {academicSemester === 'Εαρινό' ? 'Εαρινού' : 'Χειμερινού' } Εξαμήνου και να προμηθευτούν τα αντίστοιχα συγγράμματα.</div>           
                </div>
                <div className='declaration_container'>
                    <div className='declaration_object'>
                        <Box className='declaration_box'>
                            <Grid container spacing={2} className='grid'>
                                <Grid className='left_grid' xs={2}></Grid>
                                <Grid xs={10} className='right_grid'>
                                    <Stack className='right_box'>
                                        <div className='declaration_root'>
                                            <h1 className="main_title">Νέα Δήλωση</h1>   
                                            {isCompletedCourseDeclaration === true ?
                                             <Stepper style={{marginLeft:'-4rem', width:'100%'}} orientation="vertical"> 
                                                <Form style= {{margin:'20px 20px'}}> 
                                                    <div style={{display:'block', gridTemplateColumns:'0fr 2fr', columnGap:'1px', width:'99%'}}><FcOk style={{display:'inline', marginTop:'-2rem', marginBottom:'2rem', fontWeight:'600', fontSize:'7rem', verticalAlign:'middle'}}></FcOk><div className='info_text' style={{display:'block', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textAlign:'justify', color:'#818181', fontSize:'15px', fontWeight:'400'}}><div style={{marginBottom:'0.3rem'}}><strong style={{fontWeight:'600', marginBottom:'4rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'17px', marginTop:'4rem', color:'#818181'}}>ΚΑΤΑΣΤΑΣΗ ΔΗΛΩΣΗΣ : <div style={{fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'19px', fontWeight:'700', display:'inline-flex', color:'rgb(17, 167, 17)'}}>Υποβληθείσα Δήλωση</div> </strong></div><br></br>Ολοκληρώσατε<strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'rgb(17, 167, 17)', marginTop:'1rem'}}> με επιτυχία τη Δήλωση Μαθημάτων {academicSemester === 'Εαρινό' ? 'Εαρινού' : 'Χειμερινού'} Εξαμήνου του Ακαδημαϊκού Έτους {academicYear}.</strong> Η δήλωσή σας καταχωρήθηκε στην Ηλεκτρονική Γραμματεία του τμήματος ! Πιο κάτω μπορείτε να δείτε τα στοιχεία της δήλωσής σας καθώς και το αντίστοιχο pdf αρχείο αυτής, το οποίο αποτελεί επίσημο έγγραφο και μπορείτε να κατεβάσετε για αποθήκευση στο αρχείο σας ! 
                                                    </div></div>  
                                                    <Box style={{boxShadow:'1px 1px 10px 0.5px #767c7d53', marginTop:'2rem', padding:'50px 15px', paddingBottom:'5px'}}>  
                                                        <Row className="mb-3" style={{marginTop:'-3rem'}}>                           
                                                                <List style={{padding:'0px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <span style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', letterSpacing:'1px', fontWeight:'500', fontSize:'19px', color:'#f09f09'}}>Στοιχεία Δήλωσης <div className='input_span' style={{display:'inline', fontWeight:'300', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'18px'}}>{"( " + props?.connectedUser?.Personal_Info?.Personal_Information?.last_name + ' ' + props?.connectedUser?.Personal_Info?.Personal_Information?.first_name + ' - ' + props?.connectedUser?.Studentship_Info?.General_Information?.academic_record_number + " )"}</div></span>
                                                                            <Divider style={{marginTop:'0.3rem', border:'0.01px solid #767c7d53'}} />
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                </List>                  
                                                        </Row>
                                                        <Row className="mb-3" style={{marginTop:'-1.5rem'}}>                           
                                                                <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Είδος Δήλωσης</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{academicSemester === 'Εαρινό' ? 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΕΑΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear : 'ΔΗΛΩΣΗ ΜΑΘΗΜΑΤΩΝ ΧΕΙΜΕΡΙΝΟΥ ΕΞΑΜΗΝΟΥ ' + academicYear}</p>
                                                                        </ListItemText> 
                                                                    </ListItem>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατηγορία Δήλωσης</h5>
                                                                            <FormGroup style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                                                                                <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'600', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox style={{color:'#17a2b8'}} checked/>} label="Κύρια" />
                                                                                <FormControlLabel style={{color:'#606060', marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px'}} control={<Checkbox checked={false}/>} label="Εμβόλιμη" />
                                                                            </FormGroup> 
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                </List>                  
                                                        </Row>
                                                        <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                                                <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή από :</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_startDay + ' ' + coursesDeclarationDates.courseDeclaration_startDate}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Ενεργή εως :</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclarationDates.courseDeclaration_endDay + ' ' + coursesDeclarationDates.courseDeclaration_endDate}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                </List>                  
                                                        </Row>
                                                        <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                                                <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Μαθημάτων</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesDeclaration.length + ' Μαθήματα'}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Ωρών</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalHours + ' Ώρες'}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                </List>                  
                                                        </Row>
                                                        <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                                                <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα ECTS</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalECTS + ' ECTS'}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Άθροισμα Διδακτικών Μονάδων</h5>
                                                                            <p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>{coursesTotalStudyUnits + ' Διδακτικές Μονάδες'}</p>
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                </List>                  
                                                        </Row>
                                                        <Row className="mb-3" style={{marginTop:'-3.5rem'}}>                           
                                                                <List style={{padding:'0px', display:'flex', flexDirection:'row', gap:'4px'}}>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', borderLeft:'3px solid #f09f09', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}>Κατάσταση Δήλωσης</h5>
                                                                            {coursesDeclarationErrors.length === 0 ?
                                                                            <div style={{display:'flex', gap:'10px', flexWrap:'nowrap'}}><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'700', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'#606060'}}>Υποβληθείσα Δήλωση</p></div>
                                                                            : null }
                                                                        </ListItemText>
                                                                    </ListItem>
                                                                    <ListItem style={{padding:'10px'}}> 
                                                                        <ListItemText style={{display:'block', marginLeft:'1rem', verticalAlign:'middle', marginBottom:'auto', marginTop:'1rem', alignItems:'center', justifyContent:'center'}}>
                                                                            <h5 className='list_label_title' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', paddingLeft:'5px', letterSpacing:'0.5px', color:'#158b9d'}}></h5>
                                                                            {coursesDeclarationErrors.length === 0 ?
                                                                            <div style={{display:'flex', gap:'10px', flexWrap:'nowrap', marginTop:'1rem'}}><FcOk style={{display:'inline', marginTop:'0.15rem', fontWeight:'600', verticalAlign:'middle'}}></FcOk><p className='study_level_student' style={{marginTop:'-0.2rem', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontSize:'16px', paddingLeft:'10px', letterSpacing:'1px', color:'rgb(17, 167, 17)'}}>Έγκυρη</p></div>
                                                                            : null }
                                                                        </ListItemText>
                                                                    </ListItem>  
                                                                </List>                  
                                                        </Row>                             
                                                    </Box>  
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
                                                </Form>
                                                <MyVerticallyCenteredModal
                                                    show={modalShowPDF} 
                                                    courses_declaration_info = {newCourseDeclaration}
                                                    declaration_basic = {courseDeclarationBasicInfo}
                                                    title = {academicSemester === 'Εαρινό' ? 'Δήλωση Μαθημάτων Εαρινού Εξαμήνου ' + academicYear : 'Δήλωση Μαθημάτων Χειμερινού Εξαμήνου ' + academicYear } 
                                                    onHide={ () => {setModalShowPDF(false)}}
                                                /> 
                                            </Stepper>                                            
                                            :
                                            <Stepper activeStep={activeStepForm} orientation="vertical"> 
                                                {steps.map((label, index) => (
                                                    <Step key={index} style={{display:index === 6 ? 'none' : 'block'}}>
                                                        <StepLabel>{label}</StepLabel> 
                                                        <StepContent>
                                                            {getStepContent(index)} 
                                                            <div className={classes.actionsContainer}>
                                                                <div style={{marginTop:'-2.5rem', marginBottom:'-2rem', alignItems:'baseline', display:'flex'}}>
                                                                    <Button
                                                                        disabled={activeStepForm === 0}
                                                                        style={{color: activeStepForm === 0 === true ? '#767c7d8a' : '#818181', marginRight:'1rem',boxShadow:' box-shadow: 1px 2px 15px rgba(128, 128, 128, 0.685)', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                        onClick={handleBack}
                                                                        className={classes.button} 					
                                                                    >
                                                                        ΠΙΣΩ
                                                                    </Button>
                                                                    <Button															 
                                                                        variant="contained"
                                                                        style={{background:'linear-gradient(145deg, #f09f09, #d5931a, #f09f09bc)', boxShadow:' box-shadow: 1px 2px 15px rgba(128, 128, 128, 0.685)', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                        color="primary"
                                                                        onClick={() => {activeStepForm === steps.length - 1 ? addNewCourseDeclaration() : handleNext()}}
                                                                        className={classes.button}	
                                                                    >
                                                                        {activeStepForm === steps.length - 1 ?
                                                                        'ΥΠΟΒΟΛΗ ΔΗΛΩΣΗΣ': 'ΣΥΝΕΧΕΙΑ'}
                                                                        <TbPlayerTrackNextFilled style={{display:'inline-flex', marginLeft:'0.5rem', color:'#fff', fontSize:'1.2rem', verticalAlign:'middle'}}/>														
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </StepContent>
                                                    </Step>
                                                ))}
                                            </Stepper>  
                                            } 
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursesDeclarationContainer;

