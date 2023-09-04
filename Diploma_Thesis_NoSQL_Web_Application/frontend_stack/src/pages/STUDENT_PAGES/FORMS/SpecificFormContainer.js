import React , {useRef, useState, useEffect} from "react";  
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'; 
import { Modal, Button } from "react-bootstrap";
import SignaturePad from "react-signature-canvas"; 
import { useParams, useLocation } from "react-router-dom";  
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf'; 
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from "react-select/animated";  

// GraphQL resolvers
import professorsResolvers from "../../../graphql/resolvers/professors";
import formsResolvers from "../../../graphql/resolvers/forms";

// Icons 
import FORMS from '../../../Icons/FORMS/submit_form.jpg'
import UTH_LOGO from '../../../Icons/uth-logo-background.png';
import UTH_LOGO_FORM from '../../../../src/Icons/transparentLogo.jpg';
import TaskAltIcon from '@mui/icons-material/TaskAlt'; 

// Components
import Login from '../../../components/LOGIN';

// CSS styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/specificFormContainer.scss';   


function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate(); 
    //console.log(props)
    let formType;
    let formCategory;

    console.log(props)
    // Determine the current Date
    const  currDate = new Date(); 
    const currDay = currDate.getDate()   
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear(); 

    // Determine the type of form 
    if (props.formkind === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών' ) {
        formType = 'ΑΙΤΗΣΗ'; formCategory = 'ΑΙΤΗΣΗ';
    }
    else if (props.formkind === 'Αίτηση Διαγραφής') {
        formType = 'ΑΙΤΗΣΗ ΔΙΑΓΡΑΦΗΣ'; formCategory = 'ΑΙΤΗΣΗ';
    }
    else if (props.formkind === 'Βεβαίωση Σπουδών') {
        formType = 'ΒΕΒΑΙΩΣΗ ΣΠΟΥΔΩΝ'; formCategory = 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ';
    }
    
    else if (props.formkind === 'Αίτηση Αναστολής Φοίτησης') {
        formType = 'ΑΙΤΗΣΗ ΑΝΑΣΤΟΛΗΣ ΦΟΙΤΗΣΗΣ ΑΠΟ ΤΟ ΤΜΗΜΑ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    else if (props.formkind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας') {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΔΙΠΛΩΜΑΤΙΚΗΣ ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    else if (props.formkind === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών') {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΕΙΔΙΚΟΥ ΘΕΜΑΤΟΣ-ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    // Setting the state variable that will contain the new form's data 
    let [formData, setFormData] = useState({
        application_form : "" , form_name : "" , sending_date : "", arrangement_date : "", student_name : "", AEM : "",
        username : "", semester : "", form_pdf_data : "", supervisor:"", supervisor_type:"", secondMember:"", secondMember_type:'', thirdMember:'', thirdMember_type:'', greekTitle:'' , englishTitle:'',
        father_FirstName : "", mother_FirstName : "",  email:'', telephone : '', mobile : "", city : "", road : "", postcode : "", formInput : "", signature : "",  selectedSemester : [],
         attendance_period : "", birthLocation : "", birthDate : "", citizen : "", citizenNumber : "", registration_year :  "", registration_semester : "", registration_date : "", generalAEM : "", grading : []
    }) 
    let [completed, setCompleted] = useState(false); 
    
    const closeButton = () => {    
        let imgFile;
        let pdfTable = document.getElementById('mydoc') ; 
        console.log(pdfTable,'sddsd')
        if (pdfTable !== null) {
            console.log('in')
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
                //setFormData({...formData, form_pdf_data : (doc.output('bloburl'))})    
                //window.open(doc.output('bloburl'))
              //  formData.form_pdf_data = btoa(doc.output('bloburl'))   
                 // Determine the form input data and collect them into the corressponding object
                 console.log(props)
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
                 formData.father_FirstName = props.data.father_FirstName;  
                 formData.mother_FirstName = props.data.mother_FirstName;  
                 formData.email = props.data.email;
                 formData.telephone = props.data.telephone;
                formData.mobile = props.data.mobile_phone;
                formData.city = props.data.city; 
                formData.road = props.data.road;
                formData.postcode = props.data.postcode;
                formData.formInput = props.data.formInput;
                formData.signature = props.signature;
                formData.selectedSemester  = props.data.selectedSemester;

                formData.attendance_period  = props.data.attendance_period; 
                formData.birthLocation = props.data.birthLocation;
                formData.birthDate = props.data.birthDate; 
                formData.citizen = props.data.citizen;
                formData.citizenNumber  = props.data.citizenNumber;
                formData.registration_year = props.data.registration_year;
                formData.registration_semester  = props.data.registration_semester;
                formData.registration_date = props.data.registration_date;
                formData.generalAEM = props.data.generalAEM;    
                formData.grading = props.data.grading; 

                console.log(formData, 'formData') 
                 formsResolvers.add_new_student_form(formData)
                 .then(result => {
                     console.log(result)
                     if (result) {
                       window.location.reload(navigate('/form/'+ props.graduate +'/my_forms'));  
                     }                   
                 })
                 .catch(err => {
                     console.log(err);
                 })           
            })

                console.log(formData.form_pdf_data, 'in')
            }
        
    }
     
        
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
                doc.save('sample-file.pdf');     
            })
        }
        closeButton();
    }

    
    return (     
      <Modal 
        {...props} 
        aria-labelledby="contained-modal-title-vcenter"
        centered    
            size="lg"
            style={{height:'fit-content'}}             
      >
        <Modal.Header closeButton onClick={()=>props.onHide()}>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.formKind}
          </Modal.Title> 
        </Modal.Header>
        <Modal.Body style={{alignContent: 'center', overflow : 'scroll', height:"500px"}} >
        {props.formkind === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών'|| props.formkind === 'Αίτηση Διαγραφής' ?
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
            <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ <p>{props.academicyear}</p></div>
            <div className="form_container" style={{boxShadow:'none'}}>
                <div className="StudentInfo"> 
                    <div className="main_form_title">{formType}</div>
                    <div className='form'>
                        <div className='group'>
                            <label>ONOMA : </label>
                            <div className='data'>{props.data.first_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΕΠΩΝΥΜΟ : </label>
                            <div className='data'>{props.data.last_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΟΝ. ΠΑΤΡΟΣ: </label>
                            <div className='data'>{props.data.father_FirstName}</div>
                        </div>
                        <div className='group'>
                            <label>AEM:</label>
                            <div className='data'>{props.data.AEM}</div>
                        </div>
                        <div className='group' style={{marginBottom:'0.4rem', marginTop:'0.3rem'}}>
                            <label style={{flex:3}}>Δ/ΝΣΗ ΚΑΤΟΙΚΙΑΣ</label>
                            <label style={{marginLeft:'-2rem', flex:'3', fontSize:'14px'}}> (κατά προτίμηση   Βόλου)</label>
                        </div>                        
                        <div className='group'>
                            <label>ΟΔΟΣ:</label>
                            <div className='data'>{props.data.road}</div>
                        </div>
                        <div className='group'>
                            <label>ΠΟΛΗ:</label>
                            <div className='data'>{props.data.city}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΚ:</label>
                            <div className='data'>{props.data.postcode}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΗΛ:</label>
                            <div className='data'>{props.data.telephone}</div>
                        </div>
                        <div className='group'>
                            <label>ΚΙΝΗΤΟ ΤΗΛ (προαιρετικό) :</label>
                            <div className='data'>{props.data.mobile_phone}</div>
                        </div>
                        <div className='group'>
                            <label>email :</label>
                            <div className='data'>{props.data.email}</div>
                        </div>
                    </div>
                    <div className='date'>
                        {'Βόλος ,  ' + ' ' + currDay + ' / ' + currMonth + ' / ' + currYear }                            
                    </div>
                </div>
                <div className="FormInfo"> 
                    <div className="to_title">Προς :</div>
                    <div className="depart">Την Γραμματεία του Τμήματος <span>  Ηλεκτρολόγων <br></br>  Μηχανικών και Μηχανικών Υπολογιστών   </span> <br></br> του  Πανεπιστημίου  Θεσσαλίας  </div>
                    <div className='formInput2'>
                        {props.formkind === 'Αίτηση Διαγραφής' ?
                        <div className='title2'> Δηλώνω ότι επιθυμώ την διαγραφή μου από το Τμήμα λόγω :</div>
                        :
                        <div className='title2'> Αιτούμαι :</div>}                        
                        <div className='form_content'>{props.data.formInput}</div>
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div>
            </div>                
        </div> 
        </div> :
        props.formkind === 'Αίτηση Αναστολής Φοίτησης'?
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
            <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ <p>{props.academicyear}</p></div>
            <div className="form_container" style={{boxShadow:'none'}}>
                <div className="StudentInfo"> 
                    <div className="main_form_title">{formType}</div>
                    <div className='form'>
                        <div className='group'>
                            <label>ONOMA : </label>
                            <div className='data'>{props.data.first_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΕΠΩΝΥΜΟ : </label>
                            <div className='data'>{props.data.last_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΟΝ. ΠΑΤΡΟΣ: </label>
                            <div className='data'>{props.data.father_FirstName}</div>
                        </div>
                        <div className='group'>
                            <label>AEM:</label>
                            <div className='data'>{props.data.AEM}</div>
                        </div>
                        <div className='group' style={{marginBottom:'0.4rem', marginTop:'0.3rem'}}>
                            <label style={{flex:3}}>Δ/ΝΣΗ ΚΑΤΟΙΚΙΑΣ</label>
                            <label style={{marginLeft:'-2rem', flex:'3', fontSize:'14px'}}> (κατά προτίμηση   Βόλου)</label>
                        </div>                        
                        <div className='group'>
                            <label>ΟΔΟΣ:</label>
                            <div className='data'>{props.data.road}</div>
                        </div>
                        <div className='group'>
                            <label>ΠΟΛΗ:</label>
                            <div className='data'>{props.data.city}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΚ:</label>
                            <div className='data'>{props.data.postcode}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΗΛ:</label>
                            <div className='data'>{props.data.telephone}</div>
                        </div>
                        <div className='group'>
                            <label>ΚΙΝΗΤΟ ΤΗΛ (προαιρετικό) :</label>
                            <div className='data'>{props.data.mobile_phone}</div>
                        </div>
                        <div className='group'>
                            <label>email :</label>
                            <div className='data'>{props.data.email}</div>
                        </div>
                    </div>
                    <div className='date'>
                        {'Βόλος ,  ' + ' ' + currDay + ' / ' + currMonth + ' / ' + currYear }                            
                    </div>
                </div>
                <div className="FormInfo"> 
                    <div className="to_title">Προς :</div>
                    <div className="depart">Την Γραμματεία του Τμήματος <span>  Ηλεκτρολόγων <br></br>  Μηχανικών και Μηχανικών Υπολογιστών   </span> <br></br> του  Πανεπιστημίου  Θεσσαλίας  </div>
                    <div className='formInput2'> 
                        <div className='title2'> Δηλώνω ότι επιθυμώ την αναστολή φοίτησής μου από το Τμήμα λόγω :</div>                   
                        <div className='form_content' style={{height:'90px', padding: '7px 7px'}}>{props.data.formInput}</div>
                        <div className='title2'> για τα ακόλουθα εξάμηνα:</div>                     
                        <div className='form_content' style={{height:'90px', padding: '7px 7px'}}>{props.data.selectedSemester.map((e,index)=> index === props.data.selectedSemester.length-1 ? e : e + '  ,  ')}</div>
                        <div className='title2' style={{fontSize:'14px'}}>Κατά την διάρκεια αυτών των εξαμήνων, δεν θα διατηρώ την φοιτητική μου ιδιότητα, η οποία επανέρχεται στο τέλος αυτής της περιόδου. Ο συνολικός χρόνος αναστολής των σπουδών μου δεν γίνεται να ξεπερνά τα 10 (δέκα) εξάμηνα.</div> 
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div>
            </div>                
        </div> 
        </div> :
        props.formkind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας'?
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

            <div className="form_container" style={{display:'flex', gap:'10px', boxShadow:'none'}}> 
                <div className="StudentInfo" style={{flex:'0.7'}}> 
                    <div className="main_form_title" style={{fontSize:'16px'}}>{formType}</div>
                    <div className='form'>
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
                    <div className="to_title" style={{marginTop:'-1rem', fontSize:'17px'}}>Προς :</div>
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
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
        </div>:
        props.formkind === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών'?
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

           <div className="form_container" style={{display:'flex', gap:'10px', boxShadow:'none'}}> 
               <div className="StudentInfo" style={{flex:'0.7'}}> 
                   <div className="main_form_title" style={{fontSize:'16px'}}>{formType}</div>
                   <div className='form'>
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
                   <div className="to_title" style={{marginTop:'3rem', fontSize:'17px'}}>Προς :</div>
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
                           <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                           <img src={props.signature} alt='' className='main_sign'></img>                                
                       </div>
                   </div>
               </div> 
           </div>
       </div> 
       </div> :
         props.formkind === 'Βεβαίωση Σπουδών'?
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

            <div className="new_form_container" style={{width:'100%', marginTop:'-2rem'}}>                   
                <div className="StudentInfo" style={{width:'100%', marginTop:'-0.3rem', padding:'20px', width:'100%'}}> 
                <div className="main_title" style={{ marginBottom:'2rem',textAlign:'center', fontWeight:'600', letterSpacing:'1px', fontSize:'20px'}}>{formType}</div>
                <div style={{marginBottom:'1.5rem', width:'120%', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', letterSpacing:'1px', color:'#6a6a6a'}}
                >ΠΙΣΤΟΠΟΙΕΙΤΑΙ Η ΑΚΡΙΒΕΙΑ ΤΩΝ ΕΞΗΣ ΣΤΟΙΧΕΙΩΝ : </div>
                    <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Ταυτότητας</div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΠΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.last_name}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΟΝΟΜΑ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.first_name}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΠΑΤΡΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.father_FirstName}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΜΗΤΡΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.mother_FirstName}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.birthLocation}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡ. ΓΕΝΝΗΣΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.birthDate}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΔΗΜΟΤΟΛ. :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.citizen}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ. ΔΗΜΟΤΟΛΟΓΙΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.citizenNumber}</div>
                    </div>
                    <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Εγγραφής</div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΤΟΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.registration_year}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡΟΜΗΝΙΑ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.registration_date}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΞΑΜΗΝΟ ΕΓΓΡΑΦΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.registration_semester+'o'}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontStyle:'italic', flex:'2'}}>{props.data.AEM}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ.ΓΕΝ. ΜΗΤΡΩΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data.generalAEM}</div>
                    </div> 
                    <div style={{textAlign:'justify', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginTop:'1rem'}}>Βρίσκεται χρονολογικά στο {props.data.semester+'o'} εξάμηνο ({props.data.attendance_period} περίοδος σπουδών) του ακαδημαϊκού έτους {props.academicyear}.<br></br>
                    Η εγγραφή ισχύει αναδρομικά από 1/9/{props.data.registration_year}.<br></br>
                    Το ακαδημαϊκό έτος αρχίζει 1 Σεπτεμβρίου και λήγει 31 Αυγούστου του επόμενου έτους.<br></br>
                    Η ελάχιστη διάρκεια φοίτησης είναι 10 εξάμηνα.<br></br>
                    Το πιστοποιητικό αυτό χορηγείται για κάθε χρήση</div>
                    <div><img style={{display:'block', marginLeft:'auto', marginTop:'1rem', marginBottom:'5rem', padding:'', padding:'5px', marginRight:'0rem',width:'130px', height:'100px', borderRadius:'50%', outline:'4px solid #17a2b8'}} src={UTH_LOGO_FORM} alt = ""/></div>
                </div>                        
            </div>
        </div>
         </div>
        : null }     
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'onClick={()=>{props.onHide(); closeButton() /*navigate('/form/'+props.graduate+'/my_forms')*/}} >Close</Button>
          <Button type='submit' onClick={()=>{showPDF();  navigate('/form/'+props.graduate+'/my_forms')}}>Save</Button>
        </Modal.Footer>
      </Modal> 
    );
}


const SpecificFormContainer = (props) => { 
    const ref = React.createRef()

    // Get the token from the local Storage
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
   
    // Useful variables for the signature canvas
    const sigCanvas = useRef({});
    const [imageURL, setImageURL] = useState(null); 

    // State Variable for the department's professors
    const [professors, setProfessors] = useState([]);

    const location = useLocation(); 
    // Taking the parameters about study level and kind of form from the Route Path of the page
    const {gradLevel, form_kind} = useParams(); 
    const newFormKind = form_kind.replaceAll('_', ' ');
    // Determine the current user profile data
    let connectedUser; 
    if (location.state !== null ){
     connectedUser = JSON.parse(location?.state?.connectedUser);
    }
    else {
        navigate("/login", {state : {alert:true}})
    }
    // Determine the current Date
    const currDate = new Date();    
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();

    let currAcademicYear = '';    // initialiaze current academic year variabe

    // Find the current academic year 
    if (currMonth > 9 && currMonth <= 12) {
        currAcademicYear = currYear + '-' + currYear+1;                   
    }
    else {
        currAcademicYear = currYear-1 + '-' + currYear;     
    }   
    // Function that uses the canvas ref to clear the canvas via a method 
    // given by react-signature-canvas
    const clear = () => {
        setImageURL(null);
        sigCanvas.current.clear();        
        
    }

    // Function that uses the canvas ref to trim the canvas from white spaces via a method 
    // given by react-signature-canvas
    const save = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        setGeneralForm({...generalForm, signature : sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")});
        setModalShow(false)
    }

    // State variables for the modal show and the signature
    let [modalShow, setModalShow] = useState(false);
    let [modalPdf, setModalPdf] = useState(false);

    // Function that check the validity of the digits' number of the telephones
    const checkTelephoneNumber = (telephoneInput, field) => {
        let isInvalid = false; 

        if (telephoneInput.trim().length !== 0 && telephoneInput.length !== 10 ) {
            document.getElementById(field).getElementsByClassName('invalidValue')[0].style.display = 'flex';
            isInvalid = true;
        }
        return isInvalid;
    } 

    // Collect all the database's professors' data
    if (professors.length === 0 || professors === []) {
        professorsResolvers.get_all_professors()
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
    

    console.log( professors, 'ckldc')
 
    // Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών ή Αίτηση Διαγραφής (State variables)
    let [generalForm, setGeneralForm] = useState({
        _id : connectedUser?.data._id,
        semester : connectedUser?.data.Studentship_Info.General_Information.current_academic_semester,
        username : connectedUser?.data.Personal_Info.Personal_Information.username,
        first_name : connectedUser?.data.Personal_Info.Personal_Information.first_name, 
        last_name : connectedUser?.data.Personal_Info.Personal_Information.last_name, 
        father_FirstName : connectedUser?.data.Personal_Info.Personal_Information.father_FirstName, 
        AEM : connectedUser?.data.Studentship_Info.General_Information.academic_record_number,
        email : connectedUser?.data.Studentship_Info.General_Information.academic_email,
        telephone : connectedUser?.data.Personal_Info.Student_Address.telephone,
        mobile_phone : connectedUser?.data.Personal_Info.Student_Address.mobile_phone,
        city : connectedUser?.data.Personal_Info.Student_Address.city,
        road : connectedUser?.data.Personal_Info.Student_Address.road + ' ' + connectedUser?.data.Personal_Info.Student_Address.rd_number,
        postcode : connectedUser?.data.Personal_Info.Student_Address.postcode,
        formInput : '', 
        signature : imageURL,  
    })  

    // Αίτηση Αναστολής Φοίτησης από το τμήμα (State variables)
    let [suspendForm, setSuspendForm] = useState({
        _id : connectedUser?.data._id,
        semester : connectedUser?.data.Studentship_Info.General_Information.current_academic_semester,
        username : connectedUser?.data.Personal_Info.Personal_Information.username,
        first_name : connectedUser?.data.Personal_Info.Personal_Information.first_name, 
        last_name : connectedUser?.data.Personal_Info.Personal_Information.last_name, 
        father_FirstName : connectedUser?.data.Personal_Info.Personal_Information.father_FirstName, 
        AEM : connectedUser?.data.Studentship_Info.General_Information.academic_record_number,
        email : connectedUser?.data.Studentship_Info.General_Information.academic_email,
        telephone : connectedUser?.data.Personal_Info.Student_Address.telephone,
        mobile_phone : connectedUser?.data.Personal_Info.Student_Address.mobile_phone,
        city : connectedUser?.data.Personal_Info.Student_Address.city,
        road : connectedUser?.data.Personal_Info.Student_Address.road + ' ' + connectedUser?.data.Personal_Info.Student_Address.rd_number,
        postcode : connectedUser?.data.Personal_Info.Student_Address.postcode,
        formInput : '', 
        selectedSemester : [],
        signature : imageURL
    })  

    // Αίτηση Εκπόνησης Διπλωματικής Εργασίας (State variables)
    let [diplomaForm, setDiplomaForm] = useState({
        _id : connectedUser?.data._id,
        semester : connectedUser?.data.Studentship_Info.General_Information.current_academic_semester,
        username : connectedUser?.data.Personal_Info.Personal_Information.username,
        first_name : connectedUser?.data.Personal_Info.Personal_Information.first_name, 
        last_name : connectedUser?.data.Personal_Info.Personal_Information.last_name, 
        father_FirstName : connectedUser?.data.Personal_Info.Personal_Information.father_FirstName, 
        AEM : connectedUser?.data.Studentship_Info.General_Information.academic_record_number,
        email : connectedUser?.data.Studentship_Info.General_Information.academic_email,
        telephone : connectedUser?.data.Personal_Info.Student_Address.telephone,
        mobile_phone : connectedUser?.data.Personal_Info.Student_Address.mobile_phone, 
        supervisor : '', 
        supervisor_type: 'ΤΗΜΜΥ',
        secondMember: '',
        secondMember_type: 'ΤΗΜΜΥ',
        thirdMember : '',
        thirdMember_type: 'ΤΗΜΜΥ',
        greekTitle : '',
        englishTitle : ''
    })  

    // Βεβαίωση Σπουδών (State variables)
    let [studiesForm, setStudiesForm] = useState({
        _id : connectedUser?.data._id,
        semester : connectedUser?.data.Studentship_Info.General_Information.current_academic_semester,
        attendance_period : connectedUser?.data.Studentship_Info.General_Information.current_attendance_period,
        username : connectedUser?.data.Personal_Info.Personal_Information.username,
        first_name : connectedUser?.data.Personal_Info.Personal_Information.first_name, 
        last_name : connectedUser?.data.Personal_Info.Personal_Information.last_name, 
        father_FirstName : connectedUser?.data.Personal_Info.Personal_Information.father_FirstName, 
        mother_FirstName : connectedUser?.data.Personal_Info.Personal_Information.mother_FirstName,
        birthLocation : connectedUser?.data.Personal_Info.Birth_Details.birth_location,
        birthDate : connectedUser?.data.Personal_Info.Birth_Details.birth_date,
        citizen : connectedUser?.data.Personal_Info.Student_Identity.citizen,
        citizenNumber : connectedUser?.data.Personal_Info.Student_Identity.citizen_number,
        AEM : connectedUser?.data.Studentship_Info.General_Information.academic_record_number,
        registration_year : connectedUser?.data.Studentship_Info.Registration_Details.registration_year,
        registration_semester : connectedUser?.data.Studentship_Info.Registration_Details.registration_semester,
        registration_date : '1/10/' + connectedUser?.data.Studentship_Info.Registration_Details.registration_year,
        generalAEM : connectedUser?.data.Studentship_Info.General_Information.general_academic_record_number        
    })  



    // Make the multi-select animated
    const animatedComponents = makeAnimated();
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "#fff", fontSize:'1rem', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}),
        option: (styles) => {
          return {
            ...styles,
            backgroundColor: "#fff",
            color: "gray",
            cursor: "pointer",            
            scrollbarWidth: 'none',
            border: 'none',
            fontSize: '1rem',
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'    
          };
        }
      };

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


    // Handling telephone changes
    useEffect(() => {
        checkTelephoneNumber(generalForm.telephone, 'telephone');
    }, [generalForm.telephone])

    // Handling telephone changes
    useEffect(() => {
        checkTelephoneNumber(suspendForm.telephone, 'telephone');
    }, [suspendForm.telephone])

    // Handling mobile phone changes
    useEffect(() => {
        checkTelephoneNumber(generalForm.mobile_phone, 'mobile_phone');
    }, [generalForm.mobile_phone])

    // Handling mobile phone changes
    useEffect(() => {
        checkTelephoneNumber(suspendForm.mobile_phone, 'mobile_phone');
    }, [suspendForm.mobile_phone])

    // Function that checks the general form data and realizes the storage of the form in the corressponding database
    const prepareGeneralFormData = () => {
        let isEmpty = false;
        let isTelephoneValid = true;
        let isMobileValid = true;
        // Check for empty fields

        if (newFormKind === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών' || newFormKind === 'Αίτηση Διαγραφής') {
            // * CITY
            if (generalForm.city.trim().length === 0 ) {
                document.getElementById('city').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * ROAD
            if (generalForm.road.trim().length === 0 ) {
                document.getElementById('road').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * POSTCODE
            if (generalForm.postcode.trim().length === 0 ) {
                document.getElementById('postcode').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * TELEPHONE
            if (generalForm.telephone.trim().length === 0 ) {
                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * MOBILE PHONE
            if (generalForm.mobile_phone.trim().length === 0 ) {
                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * FORM TEXT
            if (generalForm.formInput.trim().length === 0 ) {
                document.getElementById('formInput').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SIGNATURE
            if (imageURL === null || imageURL === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                document.getElementById('signature').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }

            // Check for valid telephone and mobile phone number of digits
            isTelephoneValid = checkTelephoneNumber(generalForm.telephone, 'telephone');
            isMobileValid = checkTelephoneNumber(generalForm.mobile_phone, 'mobile_phone');
        }


        if (newFormKind === 'Αίτηση Αναστολής Φοίτησης') {
            // * CITY
            if (suspendForm.city.trim().length === 0 ) {
                document.getElementById('city').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * ROAD
            if (suspendForm.road.trim().length === 0 ) {
                document.getElementById('road').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * POSTCODE
            if (suspendForm.postcode.trim().length === 0 ) {
                document.getElementById('postcode').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * TELEPHONE
            if (suspendForm.telephone.trim().length === 0 ) {
                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * MOBILE PHONE
            if (suspendForm.mobile_phone.trim().length === 0 ) {
                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * FORM TEXT
            if (suspendForm.formInput.trim().length === 0 ) {
                document.getElementById('formInput').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SIGNATURE
            if (imageURL === null || imageURL === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                document.getElementById('signature').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            } 
            // SEMESTERS
            if (suspendForm.selectedSemester.length === 0 ) {
                document.getElementById('semesters').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
              // Check for valid telephone and mobile phone number of digits
              isTelephoneValid = checkTelephoneNumber(suspendForm.telephone, 'telephone');
              isMobileValid = checkTelephoneNumber(suspendForm.mobile_phone, 'mobile_phone');
        }
        
        if (newFormKind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας') {         
            // * TELEPHONE
            if (diplomaForm.telephone.trim().length === 0 ) {
                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * MOBILE PHONE
            if (diplomaForm.mobile_phone.trim().length === 0 ) {
                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SUPERVISOR
            if (diplomaForm.supervisor.trim().length === 0 ) {
                document.getElementById('supervisor').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
             // * SECOND MEMBER
             if (diplomaForm.secondMember.trim().length === 0 ) {
                document.getElementById('secondMember').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * THIRD MEMBER
            if (diplomaForm.thirdMember.trim().length === 0 ) {
                document.getElementById('thirdMember').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * GREEK TITLE
            if (diplomaForm.greekTitle.trim().length === 0 ) {
                document.getElementById('formInput_greek').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * ENGLISH TITLE
            if (diplomaForm.englishTitle.trim().length === 0 ) {
                document.getElementById('formInput_english').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SIGNATURE
            if (imageURL === null || imageURL === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                document.getElementById('signature').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }  
              // Check for valid telephone and mobile phone number of digits
              isTelephoneValid = checkTelephoneNumber(suspendForm.telephone, 'telephone');
              isMobileValid = checkTelephoneNumber(suspendForm.mobile_phone, 'mobile_phone');
        }
        
        if (newFormKind === 'Βεβαίωση Σπουδών') {

            isEmpty = false;
            isTelephoneValid = false;
            isMobileValid = false;

        }

        if (newFormKind === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών') {         
            // * TELEPHONE
            if (diplomaForm.telephone.trim().length === 0 ) {
                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * MOBILE PHONE
            if (diplomaForm.mobile_phone.trim().length === 0 ) {
                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SUPERVISOR
            if (diplomaForm.supervisor.trim().length === 0 ) {
                document.getElementById('supervisor').getElementsByClassName('errorValue')[0].style.display = 'flex';
                isEmpty = true;
            } 
            // * GREEK TITLE
            if (diplomaForm.greekTitle.trim().length === 0 ) {
                document.getElementById('formInput_greek').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * ENGLISH TITLE
            if (diplomaForm.englishTitle.trim().length === 0 ) {
                document.getElementById('formInput_english').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }
            // * SIGNATURE
            if (imageURL === null || imageURL === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC') {
                document.getElementById('signature').getElementsByClassName('new_errorValue')[0].style.display = 'flex';
                isEmpty = true;
            }  
              // Check for valid telephone and mobile phone number of digits
              isTelephoneValid = checkTelephoneNumber(suspendForm.telephone, 'telephone');
              isMobileValid = checkTelephoneNumber(suspendForm.mobile_phone, 'mobile_phone');
        }

        if (isEmpty === false && isTelephoneValid === false && isMobileValid === false) { 
            console.log(suspendForm); 
            setModalPdf(true)
        }
        else {
            return ;
        }
    } 

    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })    

    return (
        <>
        {token !== null ?    
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={FORMS} alt='' /></div>
                    <div className="title"> Έντυπα {gradLevel} 
                        <p>{newFormKind}</p>
                    </div>
                    <div className="header_area">{
                        <div className="study_levels"></div>}
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Παρακαλώ συμπληρώστε κατάλληλα τα στοιχεία σας στη φόρμα που ακολουθεί. Με την υποβολή των στοιχείων σας, η Ηλεκτρονική Γραμματεία θα προετοιμάσει το έντυπό σας '{newFormKind}', το οποίο μπορείτε να κατεβάσετε τοπικά στον υπολογιστή σας σε αρχείο τύπου pdf για χρήση και αποθήκευση στο αρχείο σας.</div>           
                </div>   
                {newFormKind === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών' || newFormKind === 'Αίτηση Γενική Φοιτητών Μεταπτυχιακού Προγράμματος Σπουδών' || newFormKind === 'Αίτηση Διαγραφής' ?
                <div className="main_form" id="myform">
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
                    <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {currAcademicYear}</div>
                    <div className="main_form_title">{newFormKind} - Στοιχεία</div>
                    <div className="form_container"> 
                        <div className="StudentInfo"> 
                            <Form>                        
                                <Form.Group as={Col} id="first_name">
                                <Form.Label>ΟΝΟΜΑ</Form.Label>
                                <Form.Control type="text" value={generalForm.first_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="last_name">
                                <Form.Label>ΕΠΩΝΥΜΟ</Form.Label>
                                <Form.Control type="text" value={generalForm.last_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="father_FirstName">
                                    <Form.Label>ΟΝΟΜΑ ΠΑΤΡΟΣ</Form.Label>
                                    <Form.Control value={generalForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group> 

                                <Form.Group as={Col} id="AEM">
                                    <Form.Label>AEΜ</Form.Label>
                                    <Form.Control type="text" value={generalForm.AEM} readOnly style={{borderBottom:'2px solid #17a2b8'}} />
                                </Form.Group>

                                <Form.Group as={Col} id="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={generalForm.email} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="city">
                                    <Form.Label>ΠΟΛΗ</Form.Label>
                                    <Form.Control type="text"value={generalForm.city} onChange={(e) => {setGeneralForm({...generalForm, city:e.target.value})
                                                                                                        document.getElementById('city').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>                                

                                <Form.Group as={Col} id="road">
                                    <Form.Label>ΔΙΕΥΘΥΝΣΗ ΚΑΤΟΙΚΙΑΣ - ΟΔΟΣ <br></br>(κατά προτίμηση Βόλου)</Form.Label>
                                    <Form.Control type="text"value={generalForm.road} onChange={(e) => {setGeneralForm({...generalForm, road:e.target.value});
                                                                                                        document.getElementById('road').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>                           
                                

                                <Form.Group as={Col} id="postdcode">
                                    <Form.Label>ΤΑΧΥΔΡΟΜΙΚΟΣ ΚΩΔΙΚΑΣ</Form.Label>
                                    <Form.Control type="text"value={generalForm.postcode}  onChange={(e) => {setGeneralForm({...generalForm, postcode:e.target.value});
                                                                                                             document.getElementById('postcode').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>   

                                <Form.Group as={Col} id="telephone">
                                    <Form.Label>ΤΗΛΕΦΩΝΟ</Form.Label>
                                    <Form.Control type="text"value={generalForm.telephone} onChange={(e) => {setGeneralForm({...generalForm, telephone:e.target.value});
                                                                                                            document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                            document.getElementById('telephone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                    <div className="invalidValue">*Ο αριθμός τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                </Form.Group>

                                <Form.Group as={Col} id="mobile_phone">
                                <Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ (ΠΡΟΑΙΡΕΤΙΚ0)</Form.Label>
                                <Form.Control type="text"value={generalForm.mobile_phone} onChange={(e) => {setGeneralForm({...generalForm, mobile_phone:e.target.value});
                                                                                                            document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                            document.getElementById('mobile_phone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                <div className="invalidValue">*Ο αριθμός κινητού τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="FormInfo">
                            {newFormKind === 'Αίτηση Διαγραφής' ?
                            <Form className="formIn" id='formInput'>
                                <div className="infoText">Δηλώνω ότι επιθυμώ την διαγραφή μου από το Τμήμα λόγω : </div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                    <Form.Control as="textarea" rows={15} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                value = {generalForm.formInput} onChange={(e) => {setGeneralForm({...generalForm, formInput:e.target.value});
                                                document.getElementById('formInput').getElementsByClassName('errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form>
                            :
                            <Form className="formIn" id='formInput'>
                                <div className="infoText">Αιτούμαι : </div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                    <Form.Control as="textarea" rows={15} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value = {generalForm.formInput} onChange={(e) => {setGeneralForm({...generalForm, formInput:e.target.value});
                                                  document.getElementById('formInput').getElementsByClassName('errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form> }
                            <div className="signature" id='signature'>
                                {connectedUser?.data.Personal_Info.Personal_Information.sex === 'Κα' ?
                                    <div className="signature_text">Η Αιτούσα</div> :
                                    <div className="signature_text">Ο Αιτών</div> }
                                    {imageURL ? (
                                        <img 
                                            src={imageURL}
                                            alt="my signature"
                                            style = {{
                                                display : "block",
                                                margin : "0 auto", 
                                                border : "0px solid black",
                                                width : "25%",
                                                height : "35%",
                                                //alignItems : "center",
                                                //justifyContent : "center"
                                            }}
                                        />
                                    ) : null}
                                <Button className="signatureButton" style={{marginTop:'1.5rem'}} onClick={()=> {setModalShow(true); document.getElementById('signature').getElementsByClassName('errorValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                            </div>   
                            <Modal                                
                                show = {modalShow}
                                size="m"
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
                                    ref={sigCanvas}
                                    canvasProps = {{
                                        className: "signatureCanvas"
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button onClick={save}>Αποθήκευση</Button>
                                    <Button onClick={clear}>Άκυρο</Button>
                                    <Button onClick={()=>setModalShow(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                        </div>
                    </div>
                </div> : 
                newFormKind === 'Αίτηση Αναστολής Φοίτησης' ?
                <div className="main_form" id="myform">
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
                    <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {currAcademicYear}</div>
                    <div className="main_form_title">{newFormKind} - Στοιχεία</div>
                    <div className="form_container"> 
                        <div className="StudentInfo"> 
                            <Form>                        
                                <Form.Group as={Col} id="first_name">
                                <Form.Label>ΟΝΟΜΑ</Form.Label>
                                <Form.Control type="text" value={suspendForm.first_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="last_name">
                                <Form.Label>ΕΠΩΝΥΜΟ</Form.Label>
                                <Form.Control type="text" value={suspendForm.last_name} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="father_FirstName">
                                    <Form.Label>ΟΝΟΜΑ ΠΑΤΡΟΣ</Form.Label>
                                    <Form.Control value={suspendForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group> 

                                <Form.Group as={Col} id="AEM">
                                    <Form.Label>AEΜ</Form.Label>
                                    <Form.Control type="text" value={suspendForm.AEM} readOnly style={{borderBottom:'2px solid #17a2b8'}} />
                                </Form.Group>

                                <Form.Group as={Col} id="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={suspendForm.email} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
                                </Form.Group>

                                <Form.Group as={Col} id="city">
                                    <Form.Label>ΠΟΛΗ</Form.Label>
                                    <Form.Control type="text"value={suspendForm.city} onChange={(e) => {setSuspendForm({...suspendForm, city:e.target.value})
                                                                                                        document.getElementById('city').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>                                

                                <Form.Group as={Col} id="road">
                                    <Form.Label>ΔΙΕΥΘΥΝΣΗ ΚΑΤΟΙΚΙΑΣ - ΟΔΟΣ <br></br>(κατά προτίμηση Βόλου)</Form.Label>
                                    <Form.Control type="text"value={suspendForm.road} onChange={(e) => {setSuspendForm({...suspendForm, road:e.target.value});
                                                                                                        document.getElementById('road').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>                           
                                

                                <Form.Group as={Col} id="postdcode">
                                    <Form.Label>ΤΑΧΥΔΡΟΜΙΚΟΣ ΚΩΔΙΚΑΣ</Form.Label>
                                    <Form.Control type="text"value={suspendForm.postcode}  onChange={(e) => {setSuspendForm({...suspendForm, postcode:e.target.value});
                                                                                                             document.getElementById('postcode').getElementsByClassName('errorValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                </Form.Group>   

                                <Form.Group as={Col} id="telephone">
                                    <Form.Label>ΤΗΛΕΦΩΝΟ</Form.Label>
                                    <Form.Control type="text"value={suspendForm.telephone} onChange={(e) => {setSuspendForm({...suspendForm, telephone:e.target.value});
                                                                                                            document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                            document.getElementById('telephone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                    <div className="invalidValue">*Ο αριθμός τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                </Form.Group>

                                <Form.Group as={Col} id="mobile_phone">
                                <Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ (ΠΡΟΑΙΡΕΤΙΚ0)</Form.Label>
                                <Form.Control type="text"value={suspendForm.mobile_phone} onChange={(e) => {setSuspendForm({...suspendForm, mobile_phone:e.target.value});
                                                                                                            document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                            document.getElementById('mobile_phone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                <div className="invalidValue">*Ο αριθμός κινητού τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="FormInfo">
                            
                            <Form className="formIn" id='formInput'>
                                <div className="infoText">Δηλώνω ότι επιθυμώ την αναστολή φοίτησής μου από το Τμήμα λόγω </div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                    <Form.Control as="textarea" rows={3} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                value = {suspendForm.formInput} onChange={(e) => {setSuspendForm({...suspendForm, formInput:e.target.value});
                                                document.getElementById('formInput').getElementsByClassName('errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="errorValue" style={{marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form>                            
                            <Form className="formIn" id='semesters' style={{marginTop:'-1px'}}>
                                <div className="infoText">για τα ακόλουθα εξάμηνα: : </div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                <Select                                                     
                                    closeMenuOnSelect = {false} 
                                    escapeClearsValue
                                    className="form_select" classNamePrefix="react-select" 
                                    isMulti 
                                    required 
                                    placeholder = 'Επιλέξτε εξάμηνα'
                                    options={gradLevel === 'Προπτυχιακών' ? underg_semesters : post_semesters } 
                                    styles={colourStyles}                                             
                                    components={animatedComponents} 
                                    onChange={(e)=>{ document.getElementById('semesters').getElementsByClassName('errorValue')[0].style.display = 'none'; setSuspendForm({...suspendForm, selectedSemester:(e.map(a => a.value))})}}>                                                     
                                </Select>
                                <div className="errorValue" style={{ marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>   
                                </Form.Group>                                       
                                <div className="infoText" style={{fontSize:'15px'}}>Κατά την διάρκεια αυτών των εξαμήνων, δεν θα διατηρώ την φοιτητική μου ιδιότητα, η οποία 
                                επανέρχεται στο τέλος αυτής της περιόδου. Ο συνολικός χρόνος αναστολής των σπουδών μου δεν γίνεται να ξεπερνά τα 10 (δέκα) εξάμηνα.</div>                      
                            </Form>                           
                            <div className="signature" id='signature'>
                                {connectedUser?.data.Personal_Info.Personal_Information.sex === 'Κα' ?
                                    <div className="signature_text">Η Αιτούσα</div> :
                                    <div className="signature_text">Ο Αιτών</div> }
                                    {imageURL ? (
                                        <img 
                                            src={imageURL}
                                            alt="my signature"
                                            style = {{
                                                display : "block",
                                                margin : "0 auto", 
                                                border : "0px solid black",
                                                width : "25%",
                                                height : "35%",
                                                //alignItems : "center",
                                                //justifyContent : "center"
                                            }}
                                        />
                                    ) : null }
                                <Button className="signatureButton" style={{marginTop:'1.5rem'}} onClick={()=> {setModalShow(true); document.getElementById('signature').getElementsByClassName('errorValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                            </div>   
                            <Modal                                
                                show = {modalShow}
                                size="m"
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
                                    ref={sigCanvas}
                                    canvasProps = {{
                                        className: "signatureCanvas"
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button onClick={save}>Αποθήκευση</Button>
                                    <Button onClick={clear}>Άκυρο</Button>
                                    <Button onClick={()=>setModalShow(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                        </div>
                    </div>
                </div> 
                : 
                newFormKind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας' ? 
                <div className="main_form" id="myform">
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
                    <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {currAcademicYear}</div>
                    <div className="main_form_title">{newFormKind} - Στοιχεία</div>
                    <div className="form_container"  style={{display:'block'}}> 
                    <div  className="parts" style={{display:'block'}}>
                        <div className="first_part" style={{display:'flex' , gap:'35px', alignItems:'center', justifyContent:'center'}}>
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
                                        <Form.Control value={diplomaForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
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
                                        <Form.Label>ΤΗΛΕΦΩΝΟ</Form.Label>
                                        <Form.Control type="text"value={diplomaForm.telephone} onChange={(e) => {setDiplomaForm({...diplomaForm, telephone:e.target.value});
                                                                                                                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                                document.getElementById('telephone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                        <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                        <div className="invalidValue">*Ο αριθμός τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                    </Form.Group>

                                    <Form.Group as={Col} id="mobile_phone">
                                    <Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ</Form.Label>
                                    <Form.Control type="text"value={diplomaForm.mobile_phone} onChange={(e) => {setDiplomaForm({...diplomaForm, mobile_phone:e.target.value});
                                                                                                                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                                document.getElementById('mobile_phone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                    <div className="invalidValue">*Ο αριθμός κινητού τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                    </Form.Group>
                                </Form>
                                </div>
                                <div className="FormInfo">                            
                                    <Form className="formIn" id='formInput'>
                                        <div className="infoText" style={{color:'#17a2b8'}}>Υπεύθυνος Καθηγητής</div>
                                
                                        <Form.Group className="mb-3" id="supervisor">                                     
                                        <Form.Select required placeholder = 'Επιλέξτε Υπεύθυνο Καθηγητή'     
                                                                style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                
                                                                onChange={(e)=>{document.getElementById('supervisor').getElementsByClassName('errorValue')[0].style.display = 'none'; setDiplomaForm({...diplomaForm, supervisor:e.target.value})}}> 
                                            <option style={{display:'none'}}>Επιλέξτε Υπεύθυνο Καθηγητή</option>             
                                            {professors.map((prof, index)=>{
                                                return(
                                                <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                )
                                            })}
                                        </Form.Select>
                                        <div className="errorValue" style={{ marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>   
                                        </Form.Group>                              
                                    </Form>                            
                                    <Form className="formIn" id='formInput' style={{marginTop:'1rem'}}>
                                        <div className="infoText" style={{fontSize:'16px'}}>Δεύτερο Μέλος Επιτροπής</div> 
                                        <Form.Group as={Col} id="firstMember">
                                        <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label> 
                                            <div className="mb-3">									
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
                                                                onChange={(e)=>{document.getElementById('secondMember').getElementsByClassName('errorValue')[0].style.display = 'none'; setDiplomaForm({...diplomaForm, secondMember:e.target.value})}}> 
                                            <option style={{display:'none'}}>Επιλέξτε 2o Μέλος Επιτροπής</option>             
                                            {professors.map((prof, index)=>{
                                                return(
                                                <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                )
                                            })}
                                        </Form.Select> : 
                                        <Form.Control type="text"value={diplomaForm.secondMember} onChange={(e) => {setDiplomaForm({...diplomaForm, secondMember:e.target.value});
                                                                    document.getElementById('secondMember').getElementsByClassName('errorValue')[0].style.display = 'none';}}/>
                                        }
                                        <div className="errorValue" style={{ marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>   
                                        </Form.Group>                               
                                    </Form> 
                                    <Form className="formIn" id='thirdMember' style={{marginTop:'1rem'}}>
                                        <div className="infoText" style={{fontSize:'16px'}}>Τρίτο Μέλος Επιτροπής</div> 
                                        <Form.Group as={Col} id="thirdMember">
                                        <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label> 
                                            <div className="mb-3">									
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
                                                                onChange={(e)=>{document.getElementById('thirdMember').getElementsByClassName('errorValue')[0].style.display = 'none'; setDiplomaForm({...diplomaForm, thirdMember:e.target.value})}}> 
                                            <option style={{display:'none'}}>Επιλέξτε 3o Μέλος Επιτροπής</option>             
                                            {professors.map((prof, index)=>{
                                                return(
                                                <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                )
                                            })}
                                        </Form.Select> : 
                                        <Form.Control type="text"value={diplomaForm.thirdMember} onChange={(e) => {setDiplomaForm({...diplomaForm, thirdMember:e.target.value});
                                                                    document.getElementById('thirdMember').getElementsByClassName('errorValue')[0].style.display = 'none';}}/>
                                        }
                                        <div className="errorValue" style={{ marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>   
                                        </Form.Group>                              
                                    </Form>
                                </div>
                            </div>
                        </div>
                            <div className="diploma_title" style={{display:'block', alignItems:'left'}}>
                            <Form className="formIn" id='formInput_greek'>
                                <div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΔΙΠΛΩΜΑΤΙΚΗΣ (στα ελληνικά)</div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                    <Form.Control as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value = {diplomaForm.greekTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, greekTitle:e.target.value});
                                                  document.getElementById('formInput_greek').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="new_errorValue" style={{display:'none'}}>*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form> 
                            <Form className="formIn" id='formInput_english'>
                                <div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΔΙΠΛΩΜΑΤΙΚΗΣ (στα αγγλικά)</div> 
                                <Form.Group className="mb-3">                                     
                                    <Form.Control as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value = {diplomaForm.englishTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, englishTitle:e.target.value});
                                                  document.getElementById('formInput_english').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="new_errorValue">*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form> 
                            </div> 
                           
                            <div className="signature" id='signature' style={{ alignItems: 'center', height: '23%',  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '2rem', marginTop : '2rem'}}>
                                {connectedUser?.data.Personal_Info.Personal_Information.sex === 'Κα' ?
                                    <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                            }}>Η Αιτούσα</div> :
                                            <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                                }}>Ο Αιτών</div> }
                                    {imageURL ? (
                                        <img 
                                            src={imageURL}
                                            alt="my signature"
                                            style = {{
                                                display : "block",
                                                margin : "0 auto", 
                                                border : "0px solid black",
                                                width : "15%",
                                                height : "15%",
                                                //alignItems : "center",
                                                //justifyContent : "center"
                                            }}
                                        />
                                    ) : null}
                                <Button className="signatureButton" style={{marginTop:'1.5rem'}} onClick={()=> {setModalShow(true); document.getElementById('signature').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                <div className="new_errorValue" style={{alignSelf:'center'}}>*Το πεδίο είναι υποχρεωτικό !</div>
                            </div>   
                         
                            <Modal                                
                                show = {modalShow}
                                size="m"
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
                                    ref={sigCanvas}
                                    canvasProps = {{
                                        className: "signatureCanvas"
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button onClick={save}>Αποθήκευση</Button>
                                    <Button onClick={clear}>Άκυρο</Button>
                                    <Button onClick={()=>setModalShow(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                        </div>
                        
                    </div> 
                :
                newFormKind === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών' ? 
                <div className="main_form" id="myform">
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
                    <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {currAcademicYear}</div>
                    <div className="main_form_title">{newFormKind} - Στοιχεία</div>
                    <div className="form_container"  style={{display:'block'}}> 
                    <div  className="parts" style={{display:'block'}}>
                        <div className="first_part" style={{display:'flex' , gap:'35px', alignItems:'center', justifyContent:'center'}}>
                            <div className="StudentInfo" style={{marginTop:'2rem'}}> 
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
                                        <Form.Control value={diplomaForm.father_FirstName} readOnly style={{borderBottom:'2px solid #17a2b8'}}/>
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
                                        <Form.Label>ΤΗΛΕΦΩΝΟ</Form.Label>
                                        <Form.Control type="text"value={diplomaForm.telephone} onChange={(e) => {setDiplomaForm({...diplomaForm, telephone:e.target.value});
                                                                                                                document.getElementById('telephone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                                document.getElementById('telephone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                        <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                        <div className="invalidValue">*Ο αριθμός τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                    </Form.Group>

                                    <Form.Group as={Col} id="mobile_phone">
                                    <Form.Label>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ</Form.Label>
                                    <Form.Control type="text"value={diplomaForm.mobile_phone} onChange={(e) => {setDiplomaForm({...diplomaForm, mobile_phone:e.target.value});
                                                                                                                document.getElementById('mobile_phone').getElementsByClassName('errorValue')[0].style.display = 'none';
                                                                                                                document.getElementById('mobile_phone').getElementsByClassName('invalidValue')[0].style.display = 'none'}}/>
                                    <div className="errorValue">*Το πεδίο είναι υποχρεωτικό !</div>
                                    <div className="invalidValue">*Ο αριθμός κινητού τηλεφώνου πρέπει να είναι 10ψήφιος !</div>
                                    </Form.Group>
                                </Form>
                                </div>
                                <div className="FormInfo">                            
                                    <Form className="formIn" id='formInput'>
                                        <div className="infoText" style={{color:'#17a2b8'}}>Υπεύθυνος Καθηγητής</div>
                                        <div style={{color:'#818181', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>Παρακαλώ ορίστε τον υπεύθυνο καθηγητή της Εργασίας σας, ο οποίος θα σας συμβουλεύει κατά την εκπόνηση του Ειδικού Θέματος και θα είναι αυτός που θα καταχωρήσει τη βαθμολογία σας στο συγκεκριμένο μάθημα το τέλος του εξαμήνου στην Ηλεκτρονική Γραμματεία. Ο υπεύθυνος καθηγητής θα πρέπει να είναι μέλος ΕΔΙΠ!</div>          
                                        <Form.Group className="mb-3" id="supervisor">                                     
                                        <Form.Select required placeholder = 'Επιλέξτε Υπεύθυνο Καθηγητή'     
                                                                style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                                
                                                                onChange={(e)=>{document.getElementById('supervisor').getElementsByClassName('errorValue')[0].style.display = 'none'; setDiplomaForm({...diplomaForm, supervisor:e.target.value})}}> 
                                            <option style={{display:'none'}}>Επιλέξτε Υπεύθυνο Καθηγητή</option>                                            
                                            {professors.map((prof, index)=>{
                                                return(
                                                <option key={index} value={prof} style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof}</option>
                                                )
                                            })}
                                        </Form.Select>
                                        <div className="errorValue" style={{ marginBottom:'1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>   
                                        </Form.Group>                              
                                    </Form>  
                                </div>
                            </div>
                        </div>
                            <div className="diploma_title" style={{display:'block', alignItems:'left'}}>
                            <Form className="formIn" id='formInput_greek'>
                                <div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΕΡΓΑΣΙΑΣ (στα ελληνικά)</div> 
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">                                     
                                    <Form.Control as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value = {diplomaForm.greekTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, greekTitle:e.target.value});
                                                  document.getElementById('formInput_greek').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="new_errorValue" style={{display:'none'}}>*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form> 
                            <Form className="formIn" id='formInput_english'>
                                <div className="infoText" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',color:'#17a2b8', fontSize: '15px', fontWeight: '600', letterSpacing: '1.2px', marginBottom: '15px', marginTop:'1rem'}}>ΤΙΤΛΟΣ ΕΡΓΑΣΙΑΣ (στα αγγλικά)</div> 
                                <Form.Group className="mb-3">                                     
                                    <Form.Control as="textarea" rows={8} style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}
                                                  value = {diplomaForm.englishTitle} onChange={(e) => {setDiplomaForm({...diplomaForm, englishTitle:e.target.value});
                                                  document.getElementById('formInput_english').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}/>
                                </Form.Group>  
                                <div className="new_errorValue">*Το πεδίο είναι υποχρεωτικό !</div>                             
                            </Form> 
                            </div> 
                           
                            <div className="signature" id='signature' style={{ alignItems: 'center', height: '23%',  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '2rem', marginTop : '2rem'}}>
                                {connectedUser?.data.Personal_Info.Personal_Information.sex === 'Κα' ?
                                    <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                            }}>Η Αιτούσα</div> :
                                            <div className="signature_text" style={{  textAlign: 'center', wordSpacing: '4px', color: '#606060', fontSize: '18px', letterSpacing: '1px',
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
                                                }}>Ο Αιτών</div> }
                                    {imageURL ? (
                                        <img 
                                            src={imageURL}
                                            alt="my signature"
                                            style = {{
                                                display : "block",
                                                margin : "0 auto", 
                                                border : "0px solid black",
                                                width : "15%",
                                                height : "15%",
                                                //alignItems : "center",
                                                //justifyContent : "center"
                                            }}
                                        />
                                    ) : null}
                                <Button className="signatureButton" style={{marginTop:'1.5rem', marginBottom:'2rem'}} onClick={()=> {setModalShow(true); document.getElementById('signature').getElementsByClassName('new_errorValue')[0].style.display = 'none';}}>Υπογραφή</Button>
                                <div className="new_errorValue" style={{alignSelf:'center', marginTop:'-1rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>
                            </div>   
                         
                            <Modal                                
                                show = {modalShow}
                                size="m"
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
                                    ref={sigCanvas}
                                    canvasProps = {{
                                        className: "signatureCanvas"
                                    }}
                                    />                                       
                                </Modal.Body>
                                {/* Button to trigger save canvas image */}
                                <Modal.Footer>
                                    <Button onClick={save}>Αποθήκευση</Button>
                                    <Button onClick={clear}>Άκυρο</Button>
                                    <Button onClick={()=>setModalShow(false)}>Κλείσιμο</Button>
                                </Modal.Footer>                                    
                            </Modal>
                        </div>
                        
                    </div>
                    :
                newFormKind === 'Βεβαίωση Σπουδών'?
                <div className="main_form" id="myform">
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
                    <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ {currAcademicYear}</div>
                    <div className="main_form_title">{newFormKind} - Στοιχεία</div>
                    <div className="form_container">                   
                        <div className="StudentInfo" style={{width:'100%'}}> 
                        <div style={{marginTop:'1.5rem', marginBottom:'1.5rem', width:'120%', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', letterSpacing:'1px', color:'#6a6a6a'}}
                        >ΠΙΣΤΟΠΟΙΕΙΤΑΙ Η ΑΚΡΙΒΕΙΑ ΤΩΝ ΕΞΗΣ ΣΤΟΙΧΕΙΩΝ : </div>
                            <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Ταυτότητας</div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΠΩΝΥΜΟ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.last_name}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΟΝΟΜΑ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.first_name}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΠΑΤΡΩΝΥΜΟ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.father_FirstName}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΜΗΤΡΩΝΥΜΟ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.mother_FirstName}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.birthLocation}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡ. ΓΕΝΝΗΣΗΣ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.birthDate}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΔΗΜΟΤΟΛ. :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.citizen}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ. ΔΗΜΟΤΟΛΟΓΙΟΥ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.citizenNumber}</div>
                            </div>
                            <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Εγγραφής</div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΤΟΣ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.registration_year}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡΟΜΗΝΙΑ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.registration_date}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΞΑΜΗΝΟ ΕΓΓΡΑΦΗΣ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.registration_semester+'o'}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontStyle:'italic', flex:'2'}}>{studiesForm.AEM}</div>
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ.ΓΕΝ. ΜΗΤΡΩΟΥ :</div>
                                <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{studiesForm.generalAEM}</div>
                            </div> 
                            <div style={{textAlign:'justify', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginTop:'1rem'}}>Βρίσκεται χρονολογικά στο {studiesForm.semester+'o'} εξάμηνο ({studiesForm.attendance_period} περίοδος σπουδών) του ακαδημαϊκού έτους {currAcademicYear}.<br></br>
                            Η εγγραφή ισχύει αναδρομικά από 1/9/{studiesForm.registration_year}.<br></br>
                            Το ακαδημαϊκό έτος αρχίζει 1 Σεπτεμβρίου και λήγει 31 Αυγούστου του επόμενου έτους.<br></br>
                            Η ελάχιστη διάρκεια φοίτησης είναι 10 εξάμηνα.<br></br>
                            Το πιστοποιητικό αυτό χορηγείται για κάθε χρήση</div>
                            <div><img style={{display:'block', marginLeft:'auto', marginTop:'5rem', marginBottom:'5rem', padding:'', padding:'5px', marginRight:'0rem',width:'130px', height:'100px', borderRadius:'50%', outline:'4px solid #17a2b8'}} src={UTH_LOGO_FORM} alt = ""/></div>
                        </div>                        
                    </div>
                </div>
                : null }    
                {/*pdfFile === true ? <div className="pdfForm"><FormToPDF formKind  = {newFormKind} academicYear={currAcademicYear} data = {generalForm} sex={connectedUser?.data.Personal_Info.Personal_Information.sex} signature={imageURL}/></div> : null}*/}
                <button className="learn_more" onClick= {() =>  prepareGeneralFormData(ref)}>                  
                    <span className="circle" aria-hidden='true'>
                        <div className="bor_icon">                 
                            <TaskAltIcon className="check"/>   
                        </div>                     
                        <span className="button_text">ΥΠΟΒΟΛΗ</span>
                    </span>
                </button>       
                <MyVerticallyCenteredModal
                    show={modalPdf}  
                    formkind = {newFormKind}
                    data = {newFormKind === 'Αίτηση Αναστολής Φοίτησης'? suspendForm : newFormKind === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας' ? diplomaForm : newFormKind === 'Βεβαίωση Σπουδών' ? studiesForm : newFormKind === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών' ? diplomaForm : generalForm }
                    academicyear = {currAcademicYear}
                    sex={connectedUser?.data.Personal_Info.Personal_Information.sex}
                    signature = {imageURL}
                    graduate= {gradLevel}
                    onHide={ () => {setModalPdf(false)}}
                /> 
            </div>   
        </div> 
        : <Login></Login>}
        </>
    )
}

export default SpecificFormContainer;