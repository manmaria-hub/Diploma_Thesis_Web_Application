import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import AdminNavbar from '../../AdminNavbar';
import AdminSidebar from '../../AdminSidebar';
import FacultyNavbar from '../ADD_PROFESSOR/FacultyNavbar';
import EditProfessorContainer from './EditProfessorContainer'; 
import Login from '../../../../components/LOGIN';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/FACULTY_INFO/EDIT_PROFESSOR/editProfessor.scss'


const EditProfessor = () =>  {
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
        <div className="edit_professor_page">  
            <div className="edit_professor_scroll_page">
                <div className="edit_professor_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='professor_edit'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <FacultyNavbar action = 'edit_professor' connectedUser={localStorage.getItem('userIdentity')}/> 
                        <EditProfessorContainer connectedUser={localStorage.getItem('userIdentity')} />           
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )

}

export default EditProfessor;