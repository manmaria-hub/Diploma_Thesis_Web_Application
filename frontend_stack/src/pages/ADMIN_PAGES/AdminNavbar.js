import React from 'react';
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// CSS Styles
import '../../styles/pages/ADMIN_PAGES/adminNavbar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Icons 
import {MdMail} from 'react-icons/md';
import {IoIosNotifications} from 'react-icons/io';

// Auth
import { useAuthDispatch } from "../../context/auth";


const AdminNavbar = () => {
    // Declare the useful values
    const dispatch = useAuthDispatch(); 
    const navigate = useNavigate();

    return (
        <div className="admin_navbar">  
        <div className="admin_navbar_container">
            <div className="admin_navbar_header">
                <div className="left">
                    <div className="input_group">
                        <input type="text" placeholder="What you want to find"></input>
                        <button className="btn">Search</button>
                    </div>
                </div>
                <div className="right">
                    <ul className="nav_pills"> 
                        <li className="nav-item dropdown">
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true"
                                  style={{color: '#717477', 
                                          backgroundColor: 'white', 
                                          border: 'none', 
                                          fontSize: '15px',
                                          marginTop: '1rem', 
                                          marginBottom: '-1rem'}}>
                                Auth
                                </Dropdown.Toggle>
                                 
                                <Dropdown.Menu>                                    
                                <Dropdown.Item  onClick={()=> {dispatch({type:'LOGOUT'}); navigate("/login", {state : {alert:false}})}}>Αποσύνδεση</Dropdown.Item> 
                                </Dropdown.Menu>
                            </Dropdown> 
                        </li>
                    </ul>
                    <div className="notifications">
                        <div className="notification-dropdown">
                            <MdMail style={{color:"rgb(82, 82, 82)", fontSize:'18px'}}/>
                            <span className="notif-unread" style={{backgroundColor:"#28a745",marginLeft:'0.2px'}}></span>
                        </div>
                        <div className="notification-dropdown">
                            <IoIosNotifications style={{color:"rgb(82, 82, 82)", fontSize:'22px'}}/>
                            <span className="notif-unread" style={{backgroundColor:"#007bff"}}></span>
                        </div>
                        <div className="notification-dropdown-user">
                            <div className="login-user">
                                <span className="avatar"></span>{JSON.parse(localStorage.getItem("user"))?.username}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>  
    </div>
    )
}

export default AdminNavbar