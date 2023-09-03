import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/formNavbar.scss'; 

const FormNavbar = (props) => {
    // Taking arguments that will determine the current list item and the current user
    const actionActive = props.action; 
    let currentUser = props.connectedUser;  
    const location = useLocation(); 
    if (location.state !== null) {
        currentUser = location.state.currentUser        
    }
    const navigate = useNavigate();
    let [actionSubmitFormActive, setActionSubmitFormActive] = useState(actionActive === 'submit_form' ? 'action active': 'action');
    let [actionMyFormsActive, setActionMyFormsActive] = useState(actionActive === 'my_documents' ? 'action active': 'action');

   
    const handleClick= (clicked) => { 
        if (clicked === "SubmitForm") { 
            setActionSubmitFormActive("action active"); 
            setActionMyFormsActive("action");          
            navigate('/submit_form', {state:{currentUser:currentUser}})
        }
        if (clicked === 'MyForms') {
            console.log(currentUser.identity)
             if (JSON.parse(localStorage.getItem('userIdentity')).identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') {
                console.log('ndsjcjs')
                navigate('/form/Προπτυχιακών/my_forms', {state:{currentUser:currentUser}} )
            }
            else if (JSON.parse(localStorage.getItem('userIdentity')).identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ') {
                navigate('/form/Μεταπτυχιακών/my_forms', {state:{currentUser:currentUser}})
            }
            else if (JSON.parse(localStorage.getItem('userIdentity')).identity === 'ΓΡΑΜΜΑΤΕΙΑ') {
                navigate('/form/Γραμματεία/my_forms', {state:{currentUser:currentUser}}) 
            }  
            setActionMyFormsActive("action active");
            setActionSubmitFormActive("action");
                     
        }
    }

    return(
        <div className="form_navbar" >
            <div className="left">
                <div className="Title">Έντυπα</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΓΡΑΜΜΑΤΕΙΑ / ΕΝΤΥΠΑ</div></div>
                
            </div>
            <div className="right">
                <div className="form_actions"> 
                    <div className={actionSubmitFormActive} onClick={()=>handleClick("SubmitForm")}>Γραμματειακή Υποστήριξη</div>
                    <div className={actionMyFormsActive} onClick={()=>handleClick("MyForms")}>Τα Έντυπά μου</div>
                </div>
            </div>
        </div>
    )
}

export default FormNavbar;