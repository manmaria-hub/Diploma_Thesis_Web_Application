import React, { useState }  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

// Icons 
import FORMS from '../../../Icons/FORMS/submit_form.jpg'
import UTH_LOGO from '../../../Icons/uth-logo-background.png';

import {FaFileSignature} from 'react-icons/fa';
import {HiDocumentCheck} from 'react-icons/hi2';
import {GiFiles} from 'react-icons/gi';

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/submitFormContainer.scss'; 

const SubmitFormContainer = (props) => {
    // State variable that stores the graduation level of the student
    let [gradLevel, setGradLevel] = useState('');

    // Determine the data of the connected user
    const connectedUser = props.connectedUser;  
    // Handling the graduation level of the connected student
    if (gradLevel === '') {
        if (connectedUser?.data?.Studentship_Info.General_Information.course_program_part === "ΜΕΤΑΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ") {
            setGradLevel('Μεταπτυχιακών');
        }
        else {
            setGradLevel('Προπτυχιακών'); 
        }
    }

    const navigate = useNavigate()
        
    return (
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={FORMS} alt='' /></div>
                    <div className="title"> Έντυπα {gradLevel} 
                        <p>Υποβάλλονται προς ή παραλαμβάνονται από την Ηλεκτρονική Γραμματεία</p>
                    </div>
                    <div className="header_area">{
                        <div className="study_levels"></div>}
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Στη σελίδα αυτή παρατίθενται το σύνολο των εντύπων (αιτήσεων, πιστοποιητικών και βεβαιώσεων) που μπορείτε να πραγματοποιήσετε προς την Ηλεκτρονική Γραμματεία του Τμήματος. Επιλέξτε το είδος του εντύπου που επιθυμείτε να αποστείλετε ή να παραλάβετε από τη Γραμματεία και συμπληρώστε την αντίστοιχη φόρμα που εμφανίζεται. Με την υποβολή των στοιχείων σας, η Ηλεκτρονική Γραμματεία θα προετοιμάσει το έντυπό σας, το οποίο μπορείτε να κατεβάσετε τοπικά στον υπολογιστή σας σε αρχείο τύπου pdf για χρήση και αποθήκευση στο αρχείο σας.</div>           
                </div>      
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><FaFileSignature className='icon_accordion'/><div className='text_header'>Αιτήσεις {gradLevel}</div></Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Γενική_Φοιτητών_Προπτυχιακού_Προγράμματος_Σπουδών`, {state:{connectedUser:props.connectedUser}})}>
                                    <div className='insider'></div>Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών (για κάθε άλλη περίπτωση)
                                </li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Διαγραφής`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Διαγραφής</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Παρουσίασης_Διπλωματικής_Εργασίας`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Παρουσίασης Διπλωματικής Εργασίας</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Εκπόνησης_Διπλωματικής_Εργασίας`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Εκπόνησης Διπλωματικής Εργασίας</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Αλλαγών_(Θέμα–Επιβλέποντα–Μέλους)`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Αλλαγών (Θέμα – Επιβλέποντα – Μέλους)</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Ορκωμοσίας`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Ορκωμοσίας</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Εκπόνησης_Ειδικών_Θεμάτων-Εργασιών`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Εκπόνησης Ειδικών Θεμάτων/Εργασιών</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Αναγνώρισης_Μαθημάτων_λόγω_Μεταγραφής`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Αναγνώρισης Μαθημάτων λόγω Μεταγραφής</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Αναστολής_Φοίτησης`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Αναστολής Φοίτησης</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><HiDocumentCheck className='icon_accordion'/><div className='text_header'>Πιστοποιήσεις / Βεβαιώσεις</div></Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Βεβαίωση_Σπουδών`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Βεβαίωση Σπουδών</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αναλυτική_Βαθμολογία`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αναλυτική Βαθμολογία</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Βεβαίωση_ΙΚΥ`,{state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Βεβαίωση ΙΚΥ</li>                                
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><GiFiles className='icon_accordion'/><div className='text_header'>Γενικά Έντυπα</div></Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Υπεύθυνη_Δήλωση`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Υπεύθυνη Δήλωση</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Αίτηση_Συμμετοχής_στις_Εξετάσεις_Ισοτιμίας_Διπλωμάτων_ΗΜΜΥ_και_ΜΗΥΤΔ`,{state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Αίτηση Συμμετοχής στις Εξετάσεις Ισοτιμίας Διπλωμάτων ΗΜΜΥ και ΜΗΥΤΔ</li>
                                <li onClick={()=> navigate(`/form/${gradLevel}/Δήλωση_Μαθημάτων_Ισοτιμίας_Διπλωμάτων_ΗΜΜΥ_και_ΜΗΥΤΔ`, {state:{connectedUser:props.connectedUser}})}><div className='insider'></div>Δήλωση Μαθημάτων Ισοτιμίας Διπλωμάτων ΗΜΜΥ και ΜΗΥΤΔ</li>                                
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>                       
            </div>
        </div>
    )  
}

export default SubmitFormContainer;