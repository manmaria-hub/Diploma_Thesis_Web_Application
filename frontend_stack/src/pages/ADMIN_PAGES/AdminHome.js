import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

// Admin Page Components
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Login from '../../../src/components/LOGIN/index';

// CSS Styles
import '../../styles/pages/ADMIN_PAGES/adminHome.scss'

const AdminHome = () => {
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

    return (
        <>
        {token !== 'null' ?
        <div className="admin_page"> 
            <div className="admin_page_container">
                <div className={leftSide}> 
                    <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)}/>         
                </div> 
                <div className={rightSide}>
                    <AdminNavbar/>
                </div> 
            </div>            
        </div> : <Login></Login>}
        </>       
    )

}

export default AdminHome;