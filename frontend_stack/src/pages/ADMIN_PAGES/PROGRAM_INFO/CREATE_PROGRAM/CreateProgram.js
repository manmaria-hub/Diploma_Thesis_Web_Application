import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../components/LOGIN";
import ProgramNavbar from "./ProgramNavbar";
import CreateProgramContainer from "./CreateProgramContainer";

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/PROGRAM_INFO/CREATE_PROGRAM/createProgram.scss';


const CreateProgram = () => {
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
        <div className="create_program_page">  
            <div className="create_program_scroll_page">
                <div className="create_program_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='create_program'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <ProgramNavbar  action = 'create_program' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <CreateProgramContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default CreateProgram;