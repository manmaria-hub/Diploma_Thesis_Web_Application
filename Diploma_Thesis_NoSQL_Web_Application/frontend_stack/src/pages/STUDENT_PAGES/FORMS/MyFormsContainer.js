import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import {Accordion} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'; 
import { Modal, Button } from "react-bootstrap";
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';

// GraphQL Reasolvers
import formsResolvers from '../../../graphql/resolvers/forms';

// Icons 
import FORMS from '../../../Icons/FORMS/submit_form.jpg';
import UTH_LOGO from '../../../Icons/uth-logo-background.png';
import UTH_LOGO_FORM from '../../../Icons/transparentLogo.jpg';
import {FaFileSignature, FaFilePdf} from 'react-icons/fa';
import {HiDocumentCheck} from 'react-icons/hi2';
import {GiFiles} from 'react-icons/gi';

// Components
import Login from '../../../../src/components/LOGIN';

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/myFormsContainer.scss'
import { useEffect } from 'react';

function MyVerticallyCenteredModal(props) { 
    const navigate = useNavigate();  
    let formType;
    let formCategory; 

    console.log(props)
 
    // Determine the current Date
    const  currDate = new Date(); 
    const currDay = currDate.getDate()   
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear(); 
    
    // Determine the type of form 
    if (props && props?.data?.form_name === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών' ) {
        formType = 'ΑΙΤΗΣΗ'; formCategory = 'ΑΙΤΗΣΗ';
    }
    else if (props && props?.data?.form_name === 'Αίτηση Διαγραφής') {
        formType = 'ΑΙΤΗΣΗ ΔΙΑΓΡΑΦΗΣ'; formCategory = 'ΑΙΤΗΣΗ';
    }
    else if (props && props?.data?.form_name === 'Βεβαίωση Σπουδών') {
        formType = 'ΒΕΒΑΙΩΣΗ ΣΠΟΥΔΩΝ'; formCategory = 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ';
    }
    
    else if (props && props?.data?.form_name === 'Αίτηση Αναστολής Φοίτησης') {
        formType = 'ΑΙΤΗΣΗ ΑΝΑΣΤΟΛΗΣ ΦΟΙΤΗΣΗΣ ΑΠΟ ΤΟ ΤΜΗΜΑ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    else if ( props && props?.data?.form_name === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας') {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΔΙΠΛΩΜΑΤΙΚΗΣ ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    else if (props && props?.data?.form_name === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών') {
        formType = 'ΑΙΤΗΣΗ ΕΚΠΟΝΗΣΗΣ ΕΙΔΙΚΟΥ ΘΕΜΑΤΟΣ-ΕΡΓΑΣΙΑΣ' ; formCategory = 'ΑΙΤΗΣΗ';    
    }

    // Setting the state variable that will contain the new form's data 
    let [formData, setFormData] = useState({
        application_form : "" , form_name : "" , sending_date : "", arrangement_date : "", student_name : "", AEM : "",
        username : "", semester : "", form_pdf_data : "", supervisor:"", supervisor_type:"", secondMember:"", secondMember_type:'', thirdMember:'', thirdMember_type:'', greekTitle:'' , englishTitle:'',
        father_FirstName : "", mother_FirstName : "",  email:'', telephone : '', mobile : "", city : "", road : "", postcode : "", formInput : "", signature : "",  selectedSemester : [],
         attendance_period : "", birthLocation : "", birthDate : "", citizen : "", citizenNumber : "", registration_year :  "", registration_semester : "", registration_date : "", generalAEM : "", grading : []
    })  
        
    const closeButton = () => {    
        props.onHide();
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
                doc.save(props.data.application_form + '_'+ props.data.username + '.pdf');     
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
        {props?.data.form_name === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών'|| props.data.form_name === 'Αίτηση Διαγραφής' ?
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
                            <div className='data'>{props.data?.student_name.split(" ")[0]}</div>
                        </div>
                        <div className='group'>
                            <label>ΕΠΩΝΥΜΟ : </label>
                            <div className='data'>{props.data?.student_name.split(" ")[1]}</div>
                        </div>
                        <div className='group'>
                            <label>ΟΝ. ΠΑΤΡΟΣ: </label>
                            <div className='data'>{props.data?.father_FirstName}</div>
                        </div>
                        <div className='group'>
                            <label>AEM:</label>
                            <div className='data'>{props.data?.AEM}</div>
                        </div>
                        <div className='group' style={{marginBottom:'0.4rem', marginTop:'0.3rem'}}>
                            <label style={{flex:3}}>Δ/ΝΣΗ ΚΑΤΟΙΚΙΑΣ</label>
                            <label style={{marginLeft:'-2rem', flex:'3', fontSize:'14px'}}> (κατά προτίμηση   Βόλου)</label>
                        </div>                        
                        <div className='group'>
                            <label>ΟΔΟΣ:</label>
                            <div className='data'>{props.data?.road}</div>
                        </div>
                        <div className='group'>
                            <label>ΠΟΛΗ:</label>
                            <div className='data'>{props.data?.city}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΚ:</label>
                            <div className='data'>{props.data?.postcode}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΗΛ:</label>
                            <div className='data'>{props.data?.telephone}</div>
                        </div>
                        <div className='group'>
                            <label>ΚΙΝΗΤΟ ΤΗΛ (προαιρετικό) :</label>
                            <div className='data'>{props.data?.mobile}</div>
                        </div>
                        <div className='group'>
                            <label>email :</label>
                            <div className='data'>{props.data?.email}</div>
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
                        <div className='form_content'>{props.data?.formInput}</div>
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.data.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div>
            </div>                
        </div> 
        </div> :
        props.data.form_name === 'Αίτηση Αναστολής Φοίτησης'?
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
                            <div className='data'>{props.data?.student_name.split(" ")[0]}</div>
                        </div>
                        <div className='group'>
                            <label>ΕΠΩΝΥΜΟ : </label>
                            <div className='data'>{props.data?.student_name.split(" ")[1]}</div>
                        </div>
                        <div className='group'>
                            <label>ΟΝ. ΠΑΤΡΟΣ: </label>
                            <div className='data'>{props.data?.father_FirstName}</div>
                        </div>
                        <div className='group'>
                            <label>AEM:</label>
                            <div className='data'>{props.data?.AEM}</div>
                        </div>
                        <div className='group' style={{marginBottom:'0.4rem', marginTop:'0.3rem'}}>
                            <label style={{flex:3}}>Δ/ΝΣΗ ΚΑΤΟΙΚΙΑΣ</label>
                            <label style={{marginLeft:'-2rem', flex:'3', fontSize:'14px'}}> (κατά προτίμηση   Βόλου)</label>
                        </div>                        
                        <div className='group'>
                            <label>ΟΔΟΣ:</label>
                            <div className='data'>{props.data?.road}</div>
                        </div>
                        <div className='group'>
                            <label>ΠΟΛΗ:</label>
                            <div className='data'>{props.data?.city}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΚ:</label>
                            <div className='data'>{props.data?.postcode}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΗΛ:</label>
                            <div className='data'>{props.data?.telephone}</div>
                        </div>
                        <div className='group'>
                            <label>ΚΙΝΗΤΟ ΤΗΛ (προαιρετικό) :</label>
                            <div className='data'>{props.data?.mobile}</div>
                        </div>
                        <div className='group'>
                            <label>email :</label>
                            <div className='data'>{props.data?.email}</div>
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
                        <div className='form_content' style={{height:'90px', padding: '7px 7px'}}>{props.data?.formInput}</div>
                        <div className='title2'> για τα ακόλουθα εξάμηνα:</div>                     
                        <div className='form_content' style={{height:'90px', padding: '7px 7px'}}>{props.data?.selectedSemester.map((e,index)=> index === props.data?.selectedSemester.length-1 ? e : e + '  ,  ')}</div>
                        <div className='title2' style={{fontSize:'14px'}}>Κατά την διάρκεια αυτών των εξαμήνων, δεν θα διατηρώ την φοιτητική μου ιδιότητα, η οποία επανέρχεται στο τέλος αυτής της περιόδου. Ο συνολικός χρόνος αναστολής των σπουδών μου δεν γίνεται να ξεπερνά τα 10 (δέκα) εξάμηνα.</div> 
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.data.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div>
            </div>                
        </div> 
        </div> :
        props.data.form_name === 'Αίτηση Εκπόνησης Διπλωματικής Εργασίας'?
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
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.student_name.split(" ")[0]}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΕΠΩΝΥΜΟ: </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.student_name.split(" ")[1]}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΟΝΟΜΑ ΠΑΤΡΟΣ : </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.father_FirstName}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>AEM:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.AEM}</div>
                        </div>  
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.telephone}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.mobile}</div>
                        </div>
                        <div className='group' style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>email:</label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.email}</div>
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
                            <div className='data' style={{fontSize:'17px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700', marginBottom:'1rem'}}>{props.data?.supervisor}</div>
                        </div>
                        <div className="members" style={{display:'grid',columnGap:'15px', gridTemplateColumns:'1fr 1fr', marginBottom:'-0.7rem'}}>
                        <div className='group'style={{display:'block', marginBottom:'0.5rem'}}>                            
                            <label style={{fontSize:'15px',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',marginBottom:'-2rem'}}>ΔΕΥΤΕΡΟ ΜΕΛΟΣ ΕΠΙΤΡΟΠΗΣ</label>
                            { props.data?.secondMember_type === '' ?
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data?.secondMember}</div> :
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data?.secondMember + ' (' + props.data?.secondMember_type + ') '}</div>}
                        </div>
                        <div className='group'style={{display:'block', marginBottom:'0.5rem'}}>                            
                            <label style={{fontSize:'15px',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', marginBottom:'-2rem'}}>ΤΡΙΤΟ ΜΕΛΟΣ ΕΠΙΤΡΟΠΗΣ</label>
                            { props.data?.thirdMember_type === '' ?
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data?.thirdMember}</div> :
                            <div className='data' style={{fontSize:'15px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontWeight: '700'}}>{props.data?.thirdMember + ' (' + props.data?.thirdMember_type + ') '}</div>}
                        </div>
                        </div>
                    </div>
                    <div className='formInput2'> 
                        <div className='title2'> Τίτλος Διπλωματικής (στα ελληνικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px', marginTop:'-0.2rem'}}>{props.data?.greekTitle}</div> 
                        <div className='title2' style={{marginTop:'2rem'}}> Τίτλος Διπλωματικής (στα αγγλικά) :</div>                   
                        <div className='form_content' style={{height:'fit-content', padding: '7px 7px', fontSize:'14px',marginTop:'-0.2rem'}}>{props.data?.englishTitle}</div> 
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.data.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
        </div>:
         props.data.form_name === 'Αίτηση Εκπόνησης Ειδικών Θεμάτων-Εργασιών'?
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
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.student_name.split(" ")[0]}</div>
                        </div>
                        <div className='group'  style={{display:'block'}}>
                            <label style={{fontSize:'14px'}}>ΕΠΩΝΥΜΟ: </label>
                            <div className='data' style={{fontSize:'14px'}}>{props.data?.student_name.split(" ")[1]}</div>
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
                            <div className='data' style={{fontSize:'14px'}}>{props.data.mobile}</div>
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
                            <img src={props.data.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
        </div> :
         props === 'Βεβαίωση Σπουδών'?
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
                <div className="StudentInfo" style={{marginTop:'-0.3rem', padding:'20px', width:'100%'}}> 
                <div className="main_title" style={{ marginBottom:'2rem',textAlign:'center', fontWeight:'600', letterSpacing:'1px', fontSize:'20px'}}>{formType}</div>
                <div style={{marginBottom:'1.5rem', width:'120%', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', letterSpacing:'1px', color:'#6a6a6a'}}
                >ΠΙΣΤΟΠΟΙΕΙΤΑΙ Η ΑΚΡΙΒΕΙΑ ΤΩΝ ΕΞΗΣ ΣΤΟΙΧΕΙΩΝ : </div>
                    <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Ταυτότητας</div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΠΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.last_name}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΟΝΟΜΑ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.first_name}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΠΑΤΡΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.father_FirstName}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΜΗΤΡΩΝΥΜΟ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.mother_FirstName}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.birthLocation}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡ. ΓΕΝΝΗΣΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.birthDate}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΤΟΠΟΣ ΔΗΜΟΤΟΛ. :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.citizen}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ. ΔΗΜΟΤΟΛΟΓΙΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.citizenNumber}</div>
                    </div>
                    <div style={{fontStyle:'italic', textDecoration:'underline', }}>Στοιχεία Εγγραφής</div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΤΟΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.registration_year}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΗΜΕΡΟΜΗΝΙΑ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.registration_date}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΕΞΑΜΗΝΟ ΕΓΓΡΑΦΗΣ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.registration_semester+'o'}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡΙΘΜΟΣ ΜΗΤΡΩΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', fontStyle:'italic', flex:'2'}}>{props.data?.AEM}</div>
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'500', flex:'1'}}>ΑΡ.ΓΕΝ. ΜΗΤΡΩΟΥ :</div>
                        <div style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight:'400', flex:'2'}}>{props.data?.generalAEM}</div>
                    </div> 
                    <div style={{textAlign:'justify', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', marginTop:'1rem'}}>Βρίσκεται χρονολογικά στο {props.data?.semester+'o'} εξάμηνο ({props.data?.attendance_period} περίοδος σπουδών) του ακαδημαϊκού έτους {props.academicyear}.<br></br>
                    Η εγγραφή ισχύει αναδρομικά από 1/9/{props.data?.registration_year}.<br></br>
                    Το ακαδημαϊκό έτος αρχίζει 1 Σεπτεμβρίου και λήγει 31 Αυγούστου του επόμενου έτους.<br></br>
                    Η ελάχιστη διάρκεια φοίτησης είναι 10 εξάμηνα.<br></br>
                    Το πιστοποιητικό αυτό χορηγείται για κάθε χρήση</div>
                    <div><img style={{display:'block', marginLeft:'auto', marginTop:'1rem', marginBottom:'5rem',  padding:'5px', marginRight:'0rem',width:'130px', height:'100px', borderRadius:'50%', outline:'4px solid #17a2b8'}} src={UTH_LOGO_FORM} alt = ""/></div>
                </div>                        
            </div>
        </div>
         </div>
        : null }     
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'onClick={()=>{props.onHide(); closeButton() }} >Close</Button>
          <Button type='submit' onClick={()=>{showPDF();  navigate('/form/'+props.graduate+'/my_forms')}}>Save</Button>
        </Modal.Footer>
      </Modal> 
    );
}

const MyFormsContainer = (props) => {  
    
    // Get token from local storage
    const token = localStorage.getItem('token');
    // Determine the graduation level from the page's parameters
    const { gradLevel } = useParams();

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

    let [dataModal, setdataModal] = useState(null);
    let [modalPdf, setModalPdf] = useState(false);

    // State variable that contains the title of the page
    let [pageTitle, setPageTitle] = useState('');
    // State Variable that stores all the database's forms
    let [returnedData, setReturnedData] = useState(null);
    let inIndex = 0;    let inIndexEducation = 0;   let inIndexDocument= 0;  
    let [numApplicationForms, setNumApplicationForms] = useState(0); let [numEducationForms, setNumEducationForms] = useState(0); let [numDocumentForms, setNumDocumentForms] = useState(0);

    if (pageTitle === '') {
        if (props?.connectedUser?.identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' || props?.connectedUser?.identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') {
            setPageTitle('my - Έντυπα')
            // Call the suitable query to take back all the submitted forms 
            if (returnedData === null ) { 
                formsResolvers.get_forms_by_student_AEM(props.connectedUser.data.Studentship_Info.General_Information.academic_record_number)
                    .then(res=> {   
                        setReturnedData(res?.data?.getFormsByAEM)       
                    })
                    .catch(err=> {
                        console.log(err);
                    }) 
            } 
        }
        else if (props?.connectedUser?.identity === 'ΓΡΑΜΜΑΤΕΙΑ')  {
            setPageTitle('Έντυπα ECE-UTH')
            // Call the suitable query to take back all the submitted forms 
            if (returnedData === null ) { 
                formsResolvers.get_forms()
                    .then(res=> {    
                        setReturnedData(res?.data?.getForms)       
                    })
                    .catch(err=> {
                        console.log(err)
                    })
            } 
        }
        else if (props?.connectedUser?.identity === 'ΚΑΘΗΓΗΤΗΣ')  {
            setPageTitle('Έντυπα ECE-UTH')
            // Call the suitable query to take back all the submitted forms 
            if (returnedData === null ) { 
                let professorName = props?.connectedUser?.data.PERSONAL_INFO.last_name + ' ' + props?.connectedUser?.data.PERSONAL_INFO.first_name; 
                formsResolvers.get_Professor_forms(professorName)
                    .then(res=> {    
                        setReturnedData(res?.data?.get_ProfessorForms)       
                    })
                    .catch(err=> {
                        console.log(err)
                    })
            } 
        }
    }

    console.log(returnedData)

    useEffect(() => {
        let applicationsFormNumber = 0;   let educationNumber = 0;   let documentFormNumber = 0;
        
        returnedData?.forEach(element => {
            if (element.application_form === 'ΑΙΤΗΣΗ') {
                applicationsFormNumber = applicationsFormNumber+1;
            }  
            if (element.application_form === 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ') {
                educationNumber = educationNumber+1;
            }
            if (element.application_form === 'ΕΝΤΥΠΟ') {
                documentFormNumber = documentFormNumber+1;
            }                        
        });

        setNumApplicationForms(applicationsFormNumber);
        setNumEducationForms(educationNumber);
        setNumDocumentForms(documentFormNumber);
        
    }, [returnedData])
 
    const navigate = useNavigate()
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    console.log(props.connectedUser)
 
    return ( 
        <>
        {token !== null ?
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={FORMS} alt='' /></div>
                    <div className="title"> {pageTitle} 
                        <p>Αιτήσεις - Πιστοποιητικά - Βεβαιώσεις - Γενικά Έντυπα</p>
                    </div>
                    <div className="header_area">{
                        <div className="study_levels"></div>}
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Στη σελίδα αυτή παρατίθενται το σύνολο των εντύπων (αιτήσεων, πιστοποιητικών και βεβαιώσεων, γενικών εντύπων) που έχουν ήδη καταχωρηθεί στην Ηλεκτρονική Γραμματεία του Τμήματος. Για κάθε έντυπο είναι διαθέσιμες οι βασικές πληροφορίες καταχώρησής του στην Ηλεκτρονική Γραμματεία, ενώ δίνεται και η δυνατότητα προβολής, εκτύπωσης ή και αποθήκευσης τοπικά  στον υπολογιστή σας</div>           
                </div> 
                {props.connectedUser.identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' || props.connectedUser.identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' ? 
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><FaFileSignature className='icon_accordion'/><div className='text_header'>my-Αιτήσεις </div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        {numApplicationForms > 0 ? 
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th> 
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>                  
                                    {returnedData?.filter(item => (item.application_form === 'ΑΙΤΗΣΗ')).map((form, index) => {  
                                            inIndex = inIndex + 1;                                         
                                            return (
                                                <tr key={index}>
                                                    <td>{inIndex}</td>                                                     
                                                    <td>{form.form_name}</td>
                                                    <td>{form.sending_date}</td>
                                                    <td>{form.arrangement_date}</td>
                                                    <td>{form.semester + 'ο Εξάμηνο'}</td>
                                                    <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                    
                                                </tr>
                                            )
                                        })
                                    }   
                                </tbody>
                            </Table>
                            : 
                            <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                            , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Αιτήσεις</strong> για το συγκεκριμένο φοιτητή</div>}    
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><HiDocumentCheck className='icon_accordion'/><div className='text_header'>my-Πιστοποιήσεις / my-Βεβαιώσεις</div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        {numEducationForms > 0 ?
                        <Table responsive >
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th> 
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {returnedData?.filter(item =>  (item.application_form === 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ')).map((form, index) => {                                       
                                        inIndexEducation = inIndexEducation + 1;                                         
                                        return (
                                            <tr key={index}>
                                                <td>{inIndexEducation}</td>                                                     
                                                <td>{form.form_name}</td>
                                                <td>{form.sending_date}</td>
                                                <td>{form.arrangement_date}</td>
                                                <td>{form.semester + 'ο Εξάμηνο'}</td>
                                                <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                    
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        : 
                        <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                        , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Πιστοποιητικά</strong> για το συγκεκριμένο φοιτητή</div>}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><GiFiles className='icon_accordion'/><div className='text_header'>my-Γενικά Έντυπα</div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        { numDocumentForms > 0 ?
                        <Table responsive >
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th> 
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {returnedData?.filter(item => (item.application_form === 'ΕΝΤΥΠΟ')).map((form, index) => {                                      
                                  
                                        inIndexDocument = inIndexDocument + 1;                                         
                                        return (
                                            <tr key={index}>
                                                <td>{inIndexDocument}</td>                                                     
                                                <td>{form.form_name}</td>
                                                <td>{form.sending_date}</td>
                                                <td>{form.arrangement_date}</td>
                                                <td>{form.semester + 'ο Εξάμηνο'}</td>
                                                <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                                                                      
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table> 
                            : 
                            <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                            , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Έντυπα</strong> για το συγκεκριμένο φοιτητή</div>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>  
                :
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><FaFileSignature className='icon_accordion'/><div className='text_header'>my-Αιτήσεις</div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        {numApplicationForms > 0 ? 
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>ΑΕΜ Φοιτητή</th>
                                    <th>Ονοματεπώνυμο Φοιτητή</th>
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th>
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>                  
                                    {returnedData?.filter(item => (item.application_form === 'ΑΙΤΗΣΗ')).map((form, index) => {                                                                               
                                        inIndex = inIndex + 1;                                         
                                            return (
                                                <tr key={index}>
                                                    <td>{inIndex}</td>       
                                                    <td>{form.AEM}</td>    
                                                    <td>{form.student_name}</td>  
                                                    <td>{form.semester + 'ο Εξάμηνο'}</td>                                            
                                                    <td>{form.form_name}</td>
                                                    <td>{form.sending_date}</td>
                                                    <td>{form.arrangement_date}</td>                                                   
                                                    <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            : 
                            <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                            , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Αιτήσεις</strong> καταχωρημένα στην Ηλεκτρονική Γραμματεία !</div>}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><HiDocumentCheck className='icon_accordion'/><div className='text_header'>my-Πιστοποιήσεις / my-Βεβαιώσεις</div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        {numEducationForms > 0 ?
                        <Table responsive >
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th> 
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {returnedData?.filter(item =>  (item.application_form === 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ')).map((form, index) => {                                       
                                    inIndexEducation = inIndexEducation + 1;                                         
                                        return (
                                            <tr key={index}>
                                                <td>{inIndexEducation}</td>    
                                                <td>{form.AEM}</td>    
                                                <td>{form.student_name}</td>  
                                                <td>{form.semester + 'ο Εξάμηνο'}</td>                                                                                             
                                                <td>{form.form_name}</td>
                                                <td>{form.sending_date}</td>
                                                <td>{form.arrangement_date}</td> 
                                                <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                    
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        : 
                        <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                        , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Πιστοποιητικά</strong> καταχωρημένα στην Ηλεκτρονική Γραμματεία !</div>}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><GiFiles className='icon_accordion'/><div className='text_header'>my-Γενικά Έντυπα</div></Accordion.Header>
                        <Accordion.Body style={{display:'flex', justifyContent:'center'}}> 
                        { numDocumentForms > 0 ?
                        <Table responsive >
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Είδος Αίτησης</th> 
                                    <th>Ημ/νία Αποστολής</th> 
                                    <th>Ημ/νία Διευθέτησης</th> 
                                    <th>Εξάμηνο Φοιτητή</th> 
                                    <th>Αρχείο</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {returnedData?.filter(item => (item.application_form === 'ΕΝΤΥΠΟ')).map((form, index) => {                                       
                                    inIndexDocument = inIndexDocument + 1;                                         
                                        return (
                                            <tr key={index}>
                                                <td>{inIndexDocument}</td>   
                                                <td>{form.AEM}</td>    
                                                <td>{form.student_name}</td>  
                                                <td>{form.semester + 'ο Εξάμηνο'}</td>                                                                                              
                                                <td>{form.form_name}</td>
                                                <td>{form.sending_date}</td>
                                                <td>{form.arrangement_date}</td> 
                                                <td onClick={() => {setdataModal(form); setModalPdf(true)}} style={{display:'table-cell', marginLeft:'auto', marginRight:'auto', verticalAlign:'middle', textAlign:'center' }}><FaFilePdf style={{alignSelf:'center', justifyContent:'center', marginRight:'10px', fontSize:'20px', color:'#f09f09'}}/></td>                                                    
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table> 
                            : 
                            <div style={{textAlign:'center', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize:'15px', fontWeight:'500'
                        , letterSpacing:'1px' }}>Δεν υπάρχουν <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8'}}>Έντυπα</strong> καταχωρημένα στην Ηλεκτρονική Γραμματεία !</div>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>   }
                {dataModal !== null ?
                <MyVerticallyCenteredModal
                    show={modalPdf}   
                    data = {dataModal}
                    academicyear = {currAcademicYear} 
                    graduate= {gradLevel}
                    onHide={ () => {setModalPdf(false)}}
                /> : null}
            </div>            
        </div>       
        : <Login/>}        
       </>
    )
}

export default MyFormsContainer;
