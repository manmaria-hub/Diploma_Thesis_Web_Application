import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../../pages/ADMIN_PAGES/AdminSidebar";
import AdminNavbar from "../../../pages/ADMIN_PAGES/AdminNavbar";
import Login from "../../../components/LOGIN";
import ProfessorListNavbar from "./ProfessorListNavbar";
import ProfessorListContainer from "./ProfessorListContainer";

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/PROFESSOR_INFO/professorList.scss';;


const ProfessorList = () => { 
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
        <div className="professor_list_page">  
            <div className="professor_list_scroll_page">
                <div className="professor_list_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='professors_list'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <ProfessorListNavbar  action = 'professor_list' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <ProfessorListContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default ProfessorList;