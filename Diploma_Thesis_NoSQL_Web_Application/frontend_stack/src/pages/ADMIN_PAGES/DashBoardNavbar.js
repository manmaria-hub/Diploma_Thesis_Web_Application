import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; 
import Login from '../../../src/components/LOGIN';

// CSS Styles
import '../../../src/styles/pages/ADMIN_PAGES/dashboardNavbar.scss';

const DashBoardNavbar = (props) => {
    // Taking arguments that will determine the current list item
    const actionActive = props.action; 

    const navigate = useNavigate();
    
    let [actionIdentity, setActionIdentity] = useState(actionActive === 'identity' ? 'action active': 'action');

   
    const handleClick= (clicked) => { 
        if (clicked === "DashBoard") { 
            setActionIdentity("action active");
            navigate('/uth-ece_admin/dashboard')
        }
    }
    let token = localStorage.getItem('token');


    return(
        <>
        {token !== null ?
        <div className="dashboard_navbar">
            <div className="left">
                <div className="Title">Καλώς Ορίσατε στο Τμήμα Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών !</div> 
                <div className="path"><a href="#ECEUTH">ECEUTH</a><div className="curr_path">/ ΤΗΜΜΥ</div></div>
                
            </div>
            <div className="right">
                <div className="dashboard_actions"> 
                    <div className={actionIdentity} onClick={()=>handleClick("DashBoard")}>{JSON.parse(localStorage.getItem('userIdentity')).identity}</div>
                </div>
            </div>
        </div> : <Login></Login>}
        </>
    )
}

export default DashBoardNavbar;