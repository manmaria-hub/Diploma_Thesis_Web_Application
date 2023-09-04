import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import DashBoardNavbar from '../ADMIN_PAGES/DashBoardNavbar';
import DashBoardContainer from './DashBoardContainer'; 
import Login from '../../../src/components/LOGIN';

// CSS Styles
import '../../../src/styles/pages/ADMIN_PAGES/dashboard.scss';


const DashBoard = () =>  {
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
        <div className="dashBoard_page">  
            <div className="dashBoard_scroll_page">
                <div className="dashBoard_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document='dashboard'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <DashBoardNavbar action = 'identity' connectedUser={localStorage.getItem('userIdentity')}/> 
                        <DashBoardContainer connectedUser={localStorage.getItem('userIdentity')} />           
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )

}

export default DashBoard;