import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Components
import AdminSidebar from "../../AdminSidebar";
import AdminNavbar from "../../AdminNavbar";
import Login from "../../../../../src/components/LOGIN";
import DepartmentNavbar from "../BUILDING/DepartmentNavbar";
import AddHallContainer from "./AddHallContainer";

// CSS Styles
import '../../../../../src/styles/pages/DEPARTMENT/BUILDING/addHall.scss';


const AddHall = () => {
    window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

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
        <div className="add_hall_page">  
            <div className="add_hall_scroll_page">
                <div className="add_hall_container"> 
                    <div className={leftSide}> 
                        <AdminSidebar onShow={()=>setRightSideBar(true)} onNotShow={()=>setRightSideBar(false)} document ='add_hall'/>         
                    </div> 
                    <div className={rightSide}>
                        <AdminNavbar/>
                        <DepartmentNavbar  action = 'add_hall' connectedUser={localStorage.getItem('userIdentity')}/>       
                        <AddHallContainer connectedUser={localStorage.getItem('userIdentity')} />               
                    </div> 
                </div> 
            </div>
        </div> : <Login></Login>}
        </>          
    )
}

export default AddHall;