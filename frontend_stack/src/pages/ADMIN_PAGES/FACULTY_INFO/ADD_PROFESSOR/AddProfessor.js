import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import AdminNavbar from '../../AdminNavbar';
import AdminSidebar from '../../AdminSidebar';
import FacultyNavbar from './FacultyNavbar';
import AddProfessorContainer from './AddProfessorContainer'; 
import Login from '../../../../components/LOGIN';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/FACULTY_INFO/ADD_PROFESSOR/addProfessor.scss'


const AddProfessor = () =>  {
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
        <div className="add_professor_page">  
            <div className="scroll_page">
                <div className="add_professor_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='professor_add'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <FacultyNavbar action = 'add_professor' connectedUser={localStorage.getItem('userIdentity')}/> 
                        <AddProfessorContainer connectedUser={localStorage.getItem('userIdentity')} />           
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )

}

export default AddProfessor;