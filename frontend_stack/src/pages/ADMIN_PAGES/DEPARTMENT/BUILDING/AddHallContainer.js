import React, { useEffect, useState } from "react";   
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";

// GraphQL resolvers
import hallsResolvers from "../../../../graphql/resolvers/halls"; 

// Components 
import Button from '../../../../components/BUTTON/SubmitButton';
import HallModal from "../../../../components/MODALS/HallModal";
import HallExistCode from '../../../../components/MODALS/HallExistCode';

// Icons 
import UTH_LOGO from '../../../../Icons/uth-logo-background.png';
import DEPARTMENT from '../../../../Icons/ACADEMIC_CALENDAR/Ακαδημαικό Ημερολόγιο.png';
import Classroom from '../../../../Icons/DEPARTMENT/classroom.jpg';
import ComputerLab from '../../../../Icons/DEPARTMENT/ComputeLab.jpg';
import Office from '../../../../Icons/DEPARTMENT/office.jpg'; 
import Other from '../../../../Icons/DEPARTMENT/other_hall.jpg';
import {SiGoogleclassroom} from 'react-icons/si';
import {GiOfficeChair} from 'react-icons/gi';
import {RiComputerFill} from 'react-icons/ri';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// CSS Styles
import '../../../../styles/pages/DEPARTMENT/BUILDING/addHallContainer.scss';
import "react-toastify/dist/ReactToastify.css"
import './../../../../styles/pages/ADMIN_PAGES/COURSES/ADD_COURSE/addCourseContainer.scss'; 

const AddHallContainer = () => {
    // Determine the state variable that handles the user's selection about the type of hall
    let [hallActive, setHallActive] = useState('none');
    // Determine the state variables that control the style of cards
    let [card1, setCard1] = useState('card_1 card');        // CARD 1
    let [card2, setCard2] = useState('card_2 card');        // CARD 2
    let [card3, setCard3] = useState('card_3 card');        // CARD 3
    let [card4, setCard4] = useState('card_4 card');        // CARD 4

    // Determine the state variable that opens the input form when the user selects the new hall's category
    let [isActive, setIsActive] = useState('content_form');
          
    // Setting the state variable that we will use to open-close the modal window for the success of hall registration
    const [showModal, setShowModal] = useState(false);
    // Setting the state variable that we will use to open-close the modal window for the success of hall code existence
    const [showModalCode, setShowModalCode] = useState(false);

    // Setting and initialization of the object that will store the input data of the new hall from the corressponding form 
    // The object format is been determined by the related graphql model for the halls
    let [newHall, setNewHall] = useState({Hall_category:"", Hall_type:"", Hall_floor:"", Hall_code:'' , Hall_label:"", Hall_capacity:"", Hall_owner: {owner_name:"",owner_email:""}, Hall_courses:[]})
 
    // Declare the state array that stores all the amphithetres names
    const [amphithetres, setAmphitheatres] = useState([]);

    // Declare the state array that stores all the existing halls' codes in the database
    const [existingHallCodes, setExistingHallCodes] = useState([]);

    // This is a variable that we will use in the case of the already existence of the hall code in the database
    // and when the hall's category is OFFICES, to check if the office belongs to the same or other person
    let [hallOwnerEmail, setHallOwnerEmail] = useState('');

    // Find the hall codes that already exist in the database to avoid duplicate registrations
    // (Repeat the query only if the initial array is empty)
    if (existingHallCodes.length === 0) {
        hallsResolvers.get_all_hall_codes()
            .then(result => {
                setExistingHallCodes(result?.data?.getAllHallCodes);
            })
            .catch(err=> {
                throw err;
            })
    }

    // Function that handle the card's click about the type of hall that the user wants to add
    const handleCardClick = (category) => {
        if (category === 'classroom') { 
            if (card1 === 'card_1 card') {
                setCard1('card_1_active card');
                setIsActive('content_form active');   
                setNewHall({...newHall, Hall_category:'Αίθουσες Διδασκαλίας'})
                handleInputStyle('Αίθουσες Διδασκαλίας', 'Hall_category')
            }
            else {
                setCard1('card_1 card');    
                setIsActive('content_form');       
                setNewHall({...newHall, Hall_category:''})
                handleInputStyle('', 'Hall_category')
            }            
            setCard2('card_2 card');
            setCard3('card_3 card');
            setCard4('card_4 card');
            setHallActive('classroom');                  
        }
        if (category === 'lab') {
            setCard1('card_1 card'); 
            if (card2 === 'card_2 card') {
                setCard2('card_2_active card');
                setIsActive('content_form active') 
                setNewHall({...newHall, Hall_category:'Εργαστήρια'})
                handleInputStyle('Εργαστήρια', 'Hall_category')
            }
            else {
                setCard2('card_2 card');
                setIsActive('content_form') 
                setNewHall({...newHall, Hall_category:''})
                handleInputStyle('', 'Hall_category')
            }
            setCard3('card_3 card');
            setCard4('card_4 card');
            setHallActive('lab');                       
        }
        if (category === 'office') { 
            setCard1('card_1 card');
            setCard2('card_2 card'); 
            if (card3 === 'card_3 card') {
                setCard3('card_3_active card');
                setIsActive('content_form active')
                setNewHall({...newHall, Hall_category:'Γραφεία'})
                handleInputStyle('Γραφεία', 'Hall_category')
            }
            else {
                setCard3('card_3 card');
                setIsActive('content_form')
                setNewHall({...newHall, Hall_category:''})
                handleInputStyle('', 'Hall_category')
            }
            setCard4('card_4 card');
            setHallActive('office');            
        }
        if (category === 'other') { 
            setCard1('card_1 card');
            setCard2('card_2 card'); 
            setCard3('card_3 card');
            if (card4 === 'card_4 card') {
                setCard4('card_4_active card');
                setIsActive('content_form active')
                setNewHall({...newHall, Hall_category:'Αίθουσα Τμήματος'})
                handleInputStyle('Αίθουσα Τμήματος', 'Hall_category')
            }
            else {
                setCard4('card_4 card');
                setIsActive('content_form')
                setNewHall({...newHall, Hall_category:''})
                handleInputStyle('', 'Hall_category')
            }            
            setHallActive('other'); 
        }
    }

    // Function that handles the input data for the fields of the form and detrmine the style 
    // of the input box according the input value (empty or not empty)
    const handleInputStyle = (value, field) => {
        // NOT EMPTY INPUT FIELD
        if (value.trim() !== "") { 
            //document.getElementById(field).getElementsByClassName('form_control')[0].style.color = '#6b6b6b';
            document.getElementById(field).getElementsByClassName('form_control')[0].style.outline = '2px solid hsla(184, 56%, 68%, 0.369)';
            document.getElementById(field).getElementsByClassName('form_control')[0].style.border = '0.1px solid #5ac0d9';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.color = '#17a2b8';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.backgroundColor = '#fff';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.transform = 'translateY(-0.8rem)';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.padding = '0 0.45rem';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.fontSize = '14.5px';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.zIndex = '2222';
            if (document.getElementById(field).getElementsByClassName('text_danger')[0]) {
                document.getElementById(field).getElementsByClassName('text_danger')[0].style.display = 'none';
            }
        }   
        // EMPTY INPUT FIELD
        else {
            document.getElementById(field).getElementsByClassName('form_control')[0].style.outline = '0px solid hsla(184, 56%, 68%, 0.369)';
            document.getElementById(field).getElementsByClassName('form_control')[0].style.border = '0px solid #ced4da';
            document.getElementById(field).getElementsByClassName('form_control')[0].style.borderBottom = '2px solid #ced4da';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.color = '#908f8f';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.backgroundColor = '#fff';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.transform = 'translateY(0.7rem)';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.padding = '0 0rem';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.fontSize = '16px';
            document.getElementById(field).getElementsByClassName('form_label')[0].style.zIndex = '100';
            if (document.getElementById(field).getElementsByClassName('text_danger')[0]) {
                document.getElementById(field).getElementsByClassName('text_danger')[0].style.display = 'inline';
            }
        }
    }

    // Clear the content of the object when the user change the hall's type
    useEffect(() => {

        // Clear all the errors
        document.getElementById('Hall_Type').getElementsByClassName('error')[0].style.display = 'none';
        document.getElementById('Hall_floor').getElementsByClassName('error')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('error')[0].style.display = 'none'; 
        document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('errorExist')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('errorDigits')[0].style.display = 'none';  
        
        if(document.getElementById('Hall_label')) {
            document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'none';
            document.getElementById('Hall_label').getElementsByClassName('errorExist')[0].style.display = 'none'
        }

        if (document.getElementById('HallOwnerEmail')) {
            document.getElementById('HallOwnerEmail').getElementsByClassName('error')[0].style.display = 'none';
            document.getElementById('HallOwnerEmail').getElementsByClassName('errorValid')[0].style.display = 'none'
        }
        // Clear the values , setting them empty
        setNewHall(newHall=> ({...newHall, Hall_floor:"", Hall_code:"", Hall_label:"", Hall_capacity:"", Hall_owner:{owner_name:"", owner_email:""}, Hall_courses:[]}));
        // Change the style of input boxes 
        handleInputStyle("", "Hall_floor");
        handleInputStyle("", "Hall_code");
        if (document.getElementById('Hall_label')) {
            handleInputStyle("", 'Hall_label')
        } 
        if (document.getElementById('Hall_capacity')) {
            handleInputStyle("", 'Hall_capacity')
        } 
        if (document.getElementById('Hall_owner')) {
            handleInputStyle("", 'Hall_owner')
        }   
        if (newHall.Hall_type === "") {
            handleInputStyle("", 'Hall_Type')
        }     
           
}, [newHall.Hall_type])

    // Clear the content of the object when the user change the hall's type
    useEffect(() => {
        // Clear all the errors
        document.getElementById('Hall_Type').getElementsByClassName('error')[0].style.display = 'none';
        document.getElementById('Hall_floor').getElementsByClassName('error')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('error')[0].style.display = 'none'; 
        document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('errorExist')[0].style.display = 'none';
        document.getElementById('Hall_code').getElementsByClassName('errorDigits')[0].style.display = 'none';  
        
        if( document.getElementById('Hall_label')) { 
            document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'none';
            document.getElementById('Hall_label').getElementsByClassName('errorExist')[0].style.display = 'none'
        }

        if (document.getElementById('HallOwnerEmail')) {
            document.getElementById('HallOwnerEmail').getElementsByClassName('error')[0].style.display = 'none';
            document.getElementById('HallOwnerEmail').getElementsByClassName('errorValid')[0].style.display = 'none'
        }
        // Clear the values , setting them empty
        setNewHall(newHall => ({...newHall, Hall_type:""}));
        // Change the style of input boxes 
        handleInputStyle("", "Hall_Type");  
    }, [newHall.Hall_category])

    // Handle Hall's code changes
    useEffect(() => {
        if (newHall.Hall_code !== '') {
            validateHallCode(newHall.Hall_code);
        } 
    })

    // Handle Hall's floor changes
    useEffect(() => {
        if (newHall.Hall_code !== '') {
            validateHallCode(newHall.Hall_code);
        } 
    })

    // Handle Hall's labels changes
    useEffect(() => {
        if (newHall.Hall_label !== '') {
            validateHallLabel(newHall.Hall_label);
        } 
    })

    // Handle Hall's types changes
    useEffect(()=> {
        // Call the suitable query to take all the amphitheatres names if we want to add a new amphitheatre
        if (newHall.Hall_type === 'Αμφιθέατρο' && amphithetres.length === 0) {
            hallsResolvers.get_amphitheatres_names()
                .then((result) => {
                    setAmphitheatres(result?.data?.getAllAmphitheatres) 
                })
                .catch(err=> {
                    throw err;
                })
        }
    }, [newHall.Hall_type, amphithetres.length])

    // Handle Hall's owner email changes
    useEffect (() => {
        if (newHall.Hall_owner.owner_email !== "") {            
            validateHallOwnerEmail(newHall.Hall_owner.owner_email);
        }
    }, [newHall.Hall_owner.owner_email])


    // Function that check the validation of the input email
    const validateHallOwnerEmail = (hallOwnerEmail) => { 
        if (!validator.isEmail(hallOwnerEmail)) {
            document.getElementById('HallOwnerEmail').getElementsByClassName('errorValid')[0].style.display = 'flex';
            return(false);
        }

        if(!hallOwnerEmail.endsWith('@uth.gr')) { 
            if (!hallOwnerEmail.endsWith('@e-ce.uth.gr')) {
                if (!hallOwnerEmail.endsWith('@sch.gr')) {
                    document.getElementById('HallOwnerEmail').getElementsByClassName('errorValid')[0].style.display = 'flex';                        
                    return(false);
                }
            }
        }
        return (true)          
    }

    // Function that check the validation of the hall's label
    const validateHallLabel = (hallLabel) => {
        // A. Check if the input is in correct format 
        if (!hallLabel.startsWith('Αμφιθέατρο ') && document.getElementById('Hall_label')) {
            document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'flex';
            return(false)
        }
        else if (document.getElementById('Hall_label') && hallLabel.startsWith('Αμφιθέατρο ')) {
            let c =  hallLabel.split(" ") ;
            if (c.length !== 2) { 
                document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'flex';
                return(false)
            }
            else if (!Number(c[1])) { 
                document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'flex';
                return(false)
            }
            else { 
                if(amphithetres.includes(hallLabel)) {
                    document.getElementById('Hall_label').getElementsByClassName('errorExist')[0].style.display = 'flex';
                    return(false);
                }
            }
        }

        return (true)
        
    }


    // Function that checks the validation of the hall's code (must be related with the floor)
    const validateHallCode = (hallCode) => {
        // A. Check if the Code contains only digits
        let onlyDigits = Number(hallCode);
        if (!onlyDigits && hallCode !== "") {
            document.getElementById('Hall_code').getElementsByClassName('errorDigits')[0].style.display = 'flex';
            return ({checkCode:false, validCode:true});
        }
        else { 
            // B. Check if the code starts with the correct number according the hall's floor
            //    (e.g First Floor => must starts with 2) 
            if (newHall.Hall_floor === "0" && hallCode.substring(0,1) !== "1") {
                document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'flex';
                return ({checkCode:false, validCode:true});
            }
            else if (newHall.Hall_floor === '1' && hallCode.substring(0,1) !== '2') {
                document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'flex';
                return ({checkCode:false, validCode:true});
            }
            else if (newHall.Hall_floor === '2' && hallCode.substring(0,1) !== '3') {
                document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'flex';
                return ({checkCode:false, validCode:true});
            }
            else if (newHall.Hall_floor === '3' && hallCode.substring(0,1) !== '4') {
                document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'flex';
                return ({checkCode:false, validCode:true});
            }
            // After all the checks that concern the code format, we can continue to check if the input code already
            // exist in the database and more specifically in the hall's collection/table
            else if (existingHallCodes.includes(hallCode)) {
                document.getElementById('Hall_code').getElementsByClassName('errorExist')[0].style.display = 'flex';
                return  ({checkCode:false, validCode:false});
            } 
        }
        return ({checkCode:true, validCode:true})
    }

    // Function that we call every time we click 'CANCEL' button to clear the existing data 
    // from the corressponding hall object
    const clickCancel = () => { 
        setNewHall({...newHall, Hall_category:"", 
                                Hall_type:"",
                                Hall_floor : "", 
                                Hall_code : "",
                                Hall_capacity : "", 
                                Hall_courses : [], 
                                Hall_label : "", 
                                Hall_owner : {owner_name: "", owner_email : ""}});
        setHallActive('none');
        setCard1('card_1 card');
        setCard2('card_2 card');
        setCard3('card_3 card');
        setCard4('card_4 card');
        setIsActive('content_form');
    }

    // Function that we call before we continue with the new hall registration, to validate the input data
    const validateInputData = () => {
        let isValid = true;  
        let isValidCode = true;

        // a . First of all check if the required fields are not empty
        // *** HALL CATEGORY
        if (newHall.Hall_category === "") {
            document.getElementById('Hall_Category').getElementsByClassName('error')[0].style.display = 'flex'
            isValid = false;
            console.log(isValid,'2')
        }
        // *** HALL TYPE
        if (newHall.Hall_type === "") {
            document.getElementById('Hall_Type').getElementsByClassName('error')[0].style.display = 'flex'
            isValid = false;
            console.log(isValid,'3')
        }
        // *** HALL FLOOR
        if (newHall.Hall_floor === "") {
            document.getElementById('Hall_floor').getElementsByClassName('error')[0].style.display = 'flex'
            isValid = false;
            console.log(isValid,'4')
        }
        // *** HALL CODE
        if (newHall.Hall_code === "") {
            document.getElementById('Hall_code').getElementsByClassName('error')[0].style.display = 'flex'
            isValid = false;
            console.log(isValid,'5')
        } 
        // *** HALL OWNER EMAIL for the occasion that we have owner
        if (((newHall.Hall_category === 'Γραφεία' && newHall.Hall_type !== 'Αίθουσα Συνεδριάσεων' && newHall.Hall_type !== 'Γραφείο Καθηγητή' && newHall.Hall_type !== '') || (newHall.Hall_category === 'Αίθουσα Τμήματος')) && newHall.Hall_owner.owner_email === "") {
            document.getElementById('HallOwnerEmail').getElementsByClassName('error')[0].style.display = 'flex'
            isValid = false;
            console.log(isValid,'6')
        }

        // b. After we can continue with more accurate checks about the input data forms
        const {checkCode, validCode} = validateHallCode(newHall.Hall_code);   // Hall's code  
        let checkLabel = true;
        if (newHall.Hall_type === 'Αμφιθέατρο') {
            checkLabel = validateHallLabel(newHall.Hall_label); // Hall's label 
        }
        let checkEmail = true;
        if ((newHall.Hall_category === 'Γραφεία' && newHall.Hall_type !== 'Αίθουσα Συνεδριάσεων' && newHall.Hall_type !== 'Γραφείο Καθηγητή' && newHall.Hall_type !== '') || (newHall.Hall_category === 'Αίθουσα Τμήματος')) {
            if (newHall.Hall_owner.owner_email !== "") {
                checkEmail = validateHallOwnerEmail(newHall.Hall_owner.owner_email) // Hall's owner email 
            }
        }

        if (!checkCode || !checkEmail || !checkLabel) { 
            isValid = false;
        } 
        if (!validCode) {
            isValidCode = false;
        }
         
        return ({isValid, isValidCode});
    }

    // Function that it appears the notification window afte the control of unvalid input data 
    const notify = () => {
        toast.error('Τα στοιχεία εισαγωγής δεν είναι έγκυρα!', {
            position: "top-right",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "colored",
            });
    }

    // Function that we call every time we click 'SUBMIT' button ! This function takes the input data,
    // realizes again the necessary checks and finally if all are valid insert the new hall to the department's database
    // For each case, print the suitable messages
    const clickSubmit = () => {
        // Before we continue with the new hall registration, it is necessary to check if all the input data are valid
        let {isValid, isValidCode} = validateInputData(); 
        console.log(isValid, 'kokok')
        console.log(isValidCode, '2222')
        if (isValid === false) {                  
            // Special occassion if the hall code exists and it is an office, it can be used by more than one 
            if (isValidCode === false) {                
                if (newHall.Hall_category === 'Γραφεία' && existingHallCodes.includes(newHall.Hall_code) )  {    
                    hallsResolvers.find_hall_by_code(newHall.Hall_code)
                        .then(res => {
                            if (res?.data?.findHallByCode?.Hall_owner?.owner_email !== newHall.Hall_owner.owner_email) {
                                setShowModalCode(true);                       
                            }  
                            else {
                                notify();
                            }           
                        })             
                }
                else {
                    notify();
                }
            }
            else { 
                notify();
            }
        }
        else {              
            setShowModal(true); 
        }        
    }
 
    return (
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={DEPARTMENT} alt='' /></div>
                    <div className="title"> Αίθουσες 
                        <p>Νέο κτίριο Τμήματος ΤΗΜΜΥ - Βασικές Δραστηριότητες ανά κατηγορία</p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Το νέο κτίριο του Τμήματος βρίσκεται σε οικόπεδο στην συμβολή των οδών Σέκερη, Αθηνών και Χεϋδεν το οποίο παλαιότερα φιλοξενούσε το φυτώριο του Δήμου Βόλου. Η κατανομή των βασικών δραστηριοτήτων ανά κατηγορία έχει ως εξής: <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Αίθουσες Διδασκαλίες</strong> (Αμφιθέατρα και Αίθουσες), <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Γραφεία</strong> (Διδακτικού και Γραμματειακού Προσωπικού) και <strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Εργαστήρια</strong> (Η/Υ, Ηλεκτρονικής και Ενέργειας). Στη σελίδα που ακολουθεί επιλέξτε την κατηγορία αίθουσας που επιθυμείτε να προσθέσετε.</div>           
                </div> 
                <div className='root'>
				    <h1 className="main_title">Εισαγωγή Νέας Αίθουσας</h1>
                </div>
                <div className="add_hall_container">
                    <div className="inside_controller">
                        <div className="question">Παρακαλώ επιλέξτε την κατηγορία της <span>νέας αίθουσας</span> που επιθυμείτε να προσθέσετε και η οποία στο εξής θα προσφέρεται από το Τμήμα μας για την ανάλογη δραστηριότητα :</div>
                        <div className="card_container">
                            <div className={card1} onClick={()=>handleCardClick('classroom')}>
                                <img src={Classroom} alt="classroom" className="icon"/>
                                <div className="card_content_1">
                                    <h3>Αιθουσα Διδασκαλιας</h3>
                                    <p>Νέο Αμφιθέατρο ή Νέα Αίθουσα Διδασκαλίας</p>
                                </div>
                            </div>

                            <div className={card2} onClick={()=>handleCardClick('lab')}>
                                <img src={ComputerLab} alt="computeLab" className="icon"/>
                                <div className="card_content_2">
                                    <h3>Εργαστηριο</h3>
                                    <p>Νέο Εργαστήριο Η/Υ, νέο Εργαστήριο Ηλεκτρονικής ή νέο Εργαστήριο Ενέργειας</p>
                                </div>
                            </div>

                            <div className={card3} onClick={()=>handleCardClick('office')}>
                                <img src={Office} alt="Office" className="icon"/>
                                <div className="card_content_3">
                                    <h3>Γραφειο</h3>
                                    <p>Γραφεία Καθηγητών, Γραφεία Γραμματείας, Γραφεία Τεχνικής Υποστήριξης ή Αίθουσες Συνεδριάσεων</p>
                                </div>
                            </div>

                            <div className={card4} onClick={()=>handleCardClick('other')}>
                                <img src={Other} alt="Other Hall" className="icon"/>
                                <div className="card_content_4">
                                    <h3>ΑΛΛΟ</h3>
                                    <p>Αίθουσες που δεν μπορούν να ενσωματωθούν σε κάποια από τις προηγούμενες κατηγορίες</p>
                                </div>
                            </div>
                        </div> 
                        
                        <div className={isActive}>
                            <div className="row">
                                <div className="col">
                                    <div className="box">
                                        <div className="box_header">
                                            <h4 className="box_title">Νέο κτίριο</h4>
                                        </div>
                                        <form className="class_form">
                                            <div className="form_body">
                                            {hallActive === 'classroom' ?
                                                <div className="form_title">                                           
                                                    <SiGoogleclassroom className="form_icon"/> 
                                                    <div className="form_subTitle">Νέα Αίθουσα Διδασκαλίας</div>
                                                </div> : hallActive === 'lab' ?
                                                <div className="form_title">                                           
                                                    <RiComputerFill className="form_icon"/> 
                                                    <div className="form_subTitle">Νέο Εργαστήριο</div>
                                                </div> : hallActive === 'office' ?
                                                <div className="form_title">                                           
                                                    <GiOfficeChair className="form_icon"/> 
                                                    <div className="form_subTitle">Νέο Γραφείο</div>
                                                </div> :
                                                hallActive === 'other' ?
                                                <div className="form_title">                                           
                                                    <MeetingRoomIcon className="form_icon"/> 
                                                    <div className="form_subTitle">Νέα Αίθουσα</div>
                                                </div> : null }
                                                <hr className="horizontal_border"></hr>
                                                <div className="in_row">
                                                    <div className="in_column">
                                                        <div className="form_group" id="Hall_category">                                                    
                                                            <input type="text" label='Hall_Category' className="form_control" 
                                                                value = {newHall.Hall_category}
                                                                readOnly = {true}
                                                                onChange={(e)=> { handleInputStyle(e.target.value, 'Hall_category');
                                                                document.getElementById('Hall_Category').getElementsByClassName('error')[0].style.display = 'none'}} ></input>
                                                            <div className="form_label">Κατηγορία Αίθουσας<span className="text_danger">*</span></div>
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό !</div>
                                                        </div>
                                                    </div>
                                                    <div className="in_column">
                                                        <div className="form_group" id="Hall_Type">     
                                                            {hallActive !== 'other' ?                                               
                                                            <select type="text" className="form_control" label='Hall_Type' value={newHall.Hall_type} 
                                                                required data-validation-required-message='Το πεδίο είναι υποχρεωτικό !' 
                                                                onChange={(e)=> {handleInputStyle(e.target.value, "Hall_Type");
                                                                                document.getElementById('Hall_Type').getElementsByClassName('error')[0].style.display = 'none';
                                                                                setNewHall({...newHall, Hall_type:e.target.value})}}>                                                                                                     
                                                            {hallActive === 'classroom' ? 
                                                                <>                                                    
                                                                    <option value='' style={{display:'none'}}></option>
                                                                    <option value='Αμφιθέατρο'>Αμφιθέατρο</option>
                                                                    <option value='Αίθουσα Διδασκαλίας'>Αίθουσα Διδασκαλίας</option>
                                                                </>
                                                                : hallActive === 'lab' ?
                                                                <>
                                                                    <option value='' style={{display:'none'}}></option>
                                                                    <option value='Εργαστήριο Η/Υ'>Εργαστήριο Η/Υ</option>
                                                                    <option value='Εργαστήριο Ηλεκτρονικής'>Εργαστήριο Ηλεκτρονικής</option>
                                                                    <option value='Εργαστήριο Ενέργειας'>Εργαστήριο Ενέργειας</option>
                                                                </>
                                                                : hallActive === 'office' ?
                                                                <>
                                                                    <option value='' style={{display:'none'}}></option>                                                        
                                                                    <option value='Γραφείο Καθηγητή'>Γραφείο Καθηγητή</option>
                                                                    <option value='Γραφείο Προσωπικού Γραμματείας'>Γραφείο Προσωπικού Γραμματείας</option>
                                                                    <option value='Γραφείο Τεχνικής Υποστήριξης'>Γραφείο Τεχνικής Υποστήριξης</option>
                                                                    <option value='Αίθουσα Συνεδριάσεων'>Αίθουσα Συνεδριάσεων</option>
                                                                </>
                                                                : null}    
                                                            </select>
                                                            : 
                                                            <input className="form_control"  label='Hall_Type' required
                                                                value = {newHall.Hall_type}
                                                                onChange={(e)=> {handleInputStyle(e.target.value, "Hall_Type");
                                                                setNewHall({...newHall, Hall_type:e.target.value});
                                                                document.getElementById('Hall_Type').getElementsByClassName('error')[0].style.display = 'none'}} ></input> }
                                                            <div className="form_label">Τύπος Αίθουσας<span className="text_danger">*</span></div>
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό !</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="in_row">
                                                    <div className="in_column">
                                                        <div className="form_group" id="Hall_floor">                                                    
                                                            <select type="text" label='Hall_floor' className="form_control" value={newHall.Hall_floor}
                                                                    required
                                                                    onChange={(e) => {handleInputStyle(e.target.value, 'Hall_floor'); 
                                                                                    setNewHall({...newHall, Hall_floor:e.target.value});
                                                                                    document.getElementById('Hall_floor').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('errorDigits')[0].style.display = 'none'}} >
                                                                <option value='' style={{display:'none'}}></option>
                                                                <option value='0'>Ισόγειο</option>
                                                                <option value='1'>1ος Όροφος</option>
                                                                <option value='2'>2ος Όροφος</option>
                                                                <option value='3'>3ος Όροφος</option>
                                                            </select>
                                                            <div className="form_label">Όροφος<span className="text_danger">*</span></div>
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό !</div>
                                                        </div>
                                                    </div>
                                                    <div className="in_column">
                                                        <div className="form_group" id="Hall_code">                                                    
                                                            <input type="text" label='Hall_Code' className="form_control"  value={newHall.Hall_code} pattern = "[0-9]*" maxLength={3}                                
                                                                data-validation-pattern-message="Θα πρέπει να ξεκινά με 1" 
                                                                required 
                                                                onChange={(e)=> {handleInputStyle(e.target.value, 'Hall_code'); 
                                                                                    setNewHall({...newHall, Hall_code:e.target.value});
                                                                                    document.getElementById('Hall_code').getElementsByClassName('error')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('errorStart')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('errorExist')[0].style.display = 'none';
                                                                                    document.getElementById('Hall_code').getElementsByClassName('errorDigits')[0].style.display = 'none'}}></input>
                                                            <div className="form_label">Κωδικός Αίθουσας<span className="text_danger">*</span></div>
                                                            <div className="error">*Το πεδίο είναι υποχρεωτικό !</div>
                                                            <div className="errorExist">*Ύπάρχει ήδη αίθουσα με τον συγκεκριμένο κωδικό !</div>
                                                            <div className="errorDigits">*Το πεδίο θα πρέπει να αποτελείται αποκλειστικά από ψηφία !</div>
                                                            <div className="errorStart">{'*Ο κωδικός θα πρέπει να ξεκινά με ' + (Number(newHall.Hall_floor)+1)+' !'}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(hallActive === 'classroom' && newHall.Hall_type === 'Αμφιθέατρο')  || (newHall.Hall_type !== 'Γραφείο Καθηγητή' && newHall.Hall_type !== 'Γραφείο Προσωπικού Γραμματείας' && newHall.Hall_type !== 'Γραφείο Τεχνικής Υποστήριξης') ?
                                                <div className="in_row">
                                                {hallActive === 'classroom' && newHall.Hall_type === 'Αμφιθέατρο' ?
                                                    <div className="in_column" style={{display:'block'}}>
                                                        <div className="form_group" id="Hall_label">                                                    
                                                            <input type="text" label='Hall_label' className="form_control"  value={newHall.Hall_label}
                                                            onChange={(e)=> {handleInputStyle(e.target.value, 'Hall_label');
                                                                            setNewHall({...newHall, Hall_label:e.target.value});
                                                                            document.getElementById('Hall_label').getElementsByClassName('error')[0].style.display = 'none';
                                                                            document.getElementById('Hall_label').getElementsByClassName('errorExist')[0].style.display = 'none'}}></input> 
                                                            <div className="form_label">Ονομασία Αίθουσας</div>    
                                                            <div className="error">*Το πεδίο θα πρέπει να είναι της μορφής 'Αμφιθέατρο #' !</div>                                                 
                                                            <div className="errorExist">*Η συγκεκριμένη ονομασία υπάρχει!</div>                                                 
                                                        </div>
                                                    </div> : <div className="in_column" style={{display:'none'}}></div>} 
                                                    {newHall.Hall_type !== 'Γραφείο Καθηγητή' && newHall.Hall_type !== 'Γραφείο Προσωπικού Γραμματείας' && newHall.Hall_type !== 'Γραφείο Τεχνικής Υποστήριξης' ?
                                                    <div className="in_column" style={{display:'block'}}>
                                                        <div className="form_group" id="Hall_capacity">                                                    
                                                            <input type="number" label='Hall_capacity' className="form_control"  value={newHall.Hall_capacity} min={0}         
                                                                required 
                                                                onChange={(e)=> {handleInputStyle(e.target.value, 'Hall_capacity'); 
                                                                                    setNewHall({...newHall, Hall_capacity:e.target.value})}}></input>
                                                            <div className="form_label">Χωρητικότητα Αίθουσας</div>                                                     
                                                        </div>
                                                    </div> : <div className="in_column" style={{display:'none'}}></div> }                                            
                                                </div> : null }
                                                {(newHall.Hall_category === 'Γραφεία' && newHall.Hall_type !== 'Αίθουσα Συνεδριάσεων' && newHall.Hall_type !== 'Γραφείο Καθηγητή' && newHall.Hall_type !== "") || (newHall.Hall_category === 'Αίθουσα Τμήματος') ?
                                                <div className="in_row">                                        
                                                <div className="in_column">
                                                    <div className="form_group" id="Hall_ownerName">                                                    
                                                        <input type="text" label='Hall_ownerName' className="form_control"  value={newHall.Hall_owner.owner_name}                                                            
                                                                onChange={(e)=> {handleInputStyle(e.target.value, 'Hall_ownerName'); 
                                                                                setNewHall({...newHall, Hall_owner:{owner_name:e.target.value, owner_email:newHall.Hall_owner.owner_email}})}}></input>
                                                        <div className="form_label">Ονοματεπώνυμο κατόχου</div>                                                     
                                                    </div>
                                                </div>  
                                                <div className="in_column">
                                                    <div className="form_group" id="HallOwnerEmail">                                                    
                                                        <input type="text" label='HallOwnerEmail' className="form_control"  value={newHall.Hall_owner.owner_email}                                                            
                                                                onChange={(e)=> {handleInputStyle(e.target.value, 'HallOwnerEmail'); 
                                                                                setNewHall({...newHall, Hall_owner:{owner_name:newHall.Hall_owner.owner_name, owner_email:e.target.value}});
                                                                                document.getElementById('HallOwnerEmail').getElementsByClassName('error')[0].style.display = 'none';
                                                                                document.getElementById('HallOwnerEmail').getElementsByClassName('errorValid')[0].style.display = 'none';
                                                                                }}></input>
                                                        <div className="form_label">Email κατόχου<span className="text_danger">*</span></div> 
                                                        <div className="error">*Το πεδίο είναι υποχρεωτικό !</div>
                                                        <div className="errorValid">*Μη έγκυρη μορφή email !</div>                                                                                                     
                                                    </div>
                                                </div> 
                                                </div> : null }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> 
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
                                    theme="colored"
                            />
                            <div className="buttons">                      
                                <div onClick={()=>clickCancel()} >
                                    <Button button='simpleCancelButton'/>
                                </div>  
                                <div onClick={() => clickSubmit()}>
                                    <Button button='simpleSubmitButton' />  
                                </div>                
                                {showModal && <HallModal showModal={showModal} setShowModal={setShowModal} newHall={newHall}/>}         
                                {showModalCode && <HallExistCode setShowModalCode={setShowModalCode} setShowModal={setShowModal} newHall={newHall}/>}         
                            
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHallContainer;