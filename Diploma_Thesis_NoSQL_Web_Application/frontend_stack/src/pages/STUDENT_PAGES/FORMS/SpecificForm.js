import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../components/LOGIN";
import FormNavbar from "../../../../src/pages/STUDENT_PAGES/FORMS/FormNavbar";
import SpecificFormContainer from "./SpecificFormContainer";

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/specificForm.scss';


const SpecificForm = () => { 
    const [rightSideBar, setRightSideBar] = useState(true);
    const [rightSide, setRightSide] = useState('right-wrapper')
    const [leftSide, setLeftSide] = useState('left-wrapper')

    // Check the user connection
    let token = localStorage.getItem('token') 

    // Control the left sidebar state
    useEffect(()=> {
        if (rightSideBar === true) {
            setLeftSide('left-wrapper');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper');        // left side open
        }
        else if (rightSideBar === false) {
            setLeftSide('left-wrapper close');
            console.log(rightSideBar, 'STATE')
            setRightSide('right-wrapper open');   // left side close
        }
    }, [rightSideBar])

    const navigate = useNavigate()
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

   
    return(
        <>
        {token !== 'null' ?
        <div className="specific_form_page">  
            <div className="specific_form_scroll_page">
                <div className="specific_form_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='new_document'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <FormNavbar  action = 'submit_form' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <SpecificFormContainer connectedUser={JSON.parse(localStorage.getItem('userIdentity'))} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default SpecificForm;
