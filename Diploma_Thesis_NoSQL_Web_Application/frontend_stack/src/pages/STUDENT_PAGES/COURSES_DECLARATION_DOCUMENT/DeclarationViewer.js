import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../ADMIN_PAGES/AdminNavbar";
import Login from "../../../../src/components/LOGIN";
import CoursesDeclarationNavbar from '../COURSES_DECLARATION/SUBMIT_DECLARATION/CoursesDeclarationNavbar';
import DeclarationViewerContainer from "./DeclarationViewerContainer";

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/COURSES_DECLARATION_DOCUMENT/declarationViewer.scss';


const DeclarationViewer = () => {
    let connectedUser = {identity : '', data : null}; 
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
        <div className="declaration_viewer_page">  
            <div className="declaration_viewer_scroll_page">
                <div className="declaration_viewer_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='my_declarations'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <CoursesDeclarationNavbar action = 'view_allDeclarations' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <DeclarationViewerContainer connectedUser={JSON.parse(localStorage.getItem('userIdentity'))} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default DeclarationViewer;