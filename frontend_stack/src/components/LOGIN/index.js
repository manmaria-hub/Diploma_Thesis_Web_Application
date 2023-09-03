// LOGIN PAGE

import React, { useEffect, useState } from 'react';  
import { useNavigate , Link} from 'react-router-dom';  

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 

// Auth
import { useAuthDispatch  } from '../../context/auth'; 

// Styles (CSS)
import '../../styles/components/LOGIN/login.scss';
import { useLocation } from 'react-router-dom'; 
// GraphQL Query
import userResolvers from '../../graphql/resolvers/users';
import studentResolvers from '../../graphql/resolvers/student';
import professorsResolvers from '../../graphql/resolvers/professors';

// Icons 
import {FaUser, FaLock} from 'react-icons/fa';    
 
function MyVerticallyCenteredModal(props) {  
    return (    
        <Modal 
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered  
      >
        <Modal.Header closeButton onClick={()=>{ props.onHide()}}>
          <Modal.Title id="contained-modal-title-vcenter" style ={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}}>
            Λήξη Σύνδεσης
          </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <h4 style ={{fontWeight: '500',color: '#17a2b8', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}}>Συνδεθείτε ξανά...</h4>
          <p style ={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji'}}>
            Η σύνδεσή σας ξεπέρασε τη μέγιστη επιτρεπόμενη χρονική διάρκεια παραμονής! Παρακαλώ δοκιμάστε να ξανασυνδεθείτε!
          </p> 
        </Modal.Body>
        <Modal.Footer style={{border:'none', marginTop:'-2rem'}}>
          <Button style={{backgroundColor:"#17a2b8", borderColor:"#17a2b8"}} type='submit' onClick={()=>props.onHide()}>Εντάξει</Button>
        </Modal.Footer>
      </Modal> 
 
    );
  }

function Login (props) {
    // Declare our state variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    // State variable for modal window
    const [modalShow, setModalShow] = useState(false);  
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false); 
    // Check if the submit username and password are valid, so if there is 
    // registered user in the database of the department with them. 
    // If there is user with these personal data, navigate to the corresponding
    // page (depends on the user role - admin, user or professor - ) else print
    // the suitable error and ask the user for a new login effort
    useEffect(() => {
        if ( location.state !== null && location.state.alert === true ) { 
            setModalShow(true)
        }
    }, [location.state]) 
    const dispatch = useAuthDispatch(); 
    let userIdentity = {identity:'', data:null} 
    
    const checkUserRole = (userInfo) => { 
        //let userIdentity = {identity:'', data:null}
        let professor = null; let student = null;
        studentResolvers.get_connected_student(userInfo.email, userInfo.username)
            .then(res=> {
                student = res?.data?.getConnectedStudent?.student;
                console.log(student)
                if (student !== null) { 
                    if (student !== null && student.Studentship_Info.General_Information.course_program_part.endsWith('(ΠΡΟΠΤΥΧΙΑΚΕΣ ΣΠΟΥΔΕΣ)')) {
                        
                        userIdentity = {identity : 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ', data : student};                                              
                        localStorage.setItem('userIdentity', JSON.stringify(userIdentity))
                        navigate("/uth-ece_admin/dashboard"); 
                    } 
                }
                else {
                    userIdentity = {identity : 'ΓΡΑΜΜΑΤΕΙΑ', data : null};                                              
                    localStorage.setItem('userIdentity', JSON.stringify(userIdentity))
                    navigate("/uth-ece_admin/dashboard");
                }
            })
        professorsResolvers.get_connected_professor(userInfo.username, userInfo.email)
            .then(res=> {
                professor = res?.data?.getConnectedProfessor?.professor;
                if (professor !== null) {                    
                    userIdentity = {identity : 'ΚΑΘΗΓΗΤΗΣ', data : professor};                    
                    localStorage.setItem('userIdentity', JSON.stringify(userIdentity))
                    navigate("/uth-ece_admin/dashboard");   
                } 
                else if (student === null ){
                    userIdentity = {identity : 'ΓΡΑΜΜΑΤΕΙΑ', data : null};                                              
                    localStorage.setItem('userIdentity', JSON.stringify(userIdentity))  
                    navigate("/uth-ece_admin/dashboard");
                }                
        })
                 
    } 


    // Login Query
    const loginUser = () => {
        userResolvers.login_user(username, password)
        .then(result => {          
            console.log(result?.data?.login)    
            localStorage.setItem('user', JSON.stringify(result?.data?.login)) 
            checkUserRole(result?.data?.login); 
            dispatch({type : 'LOGIN', payload: result?.data?.login})   
            setLoading(false)              
        })
        .catch(err => {
            console.log(err)     
            setLoading(false)       
            if (err && err.graphQLErrors[0].extensions.errors.username) {
                setError(err.graphQLErrors[0].extensions.errors.username)
                document.getElementById('errorValue').style.display = 'flex';
            }
            else if (err && err.graphQLErrors[0].extensions.errors.password) {
                setError(err.graphQLErrors[0].extensions.errors.password)
                document.getElementById('errorValue').style.display = 'flex';
            }
        })         
    }

    // Function that checks for the validity of the input values and continue with the login
    const handleLoginButton = () => {
        let isEmpty = false;

        // Check username 
        if (username.trim().length === 0) { 
            document.getElementById('username').style.border = '2px solid red';
            document.getElementById('username_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check password 
        if (password.trim().length === 0) { 
            document.getElementById('password').style.border = '2px solid red';
            document.getElementById('password_errorValue').style.display = 'flex';
            isEmpty = true;
        }

        if (isEmpty !== true) {
            loginUser({variables:{username : username, password: password}})            
        }
    }

    const token = localStorage.getItem('token') 
    
            
    return (
        <div className='login-page'>   
            <div className='login-card'>
                <div className='column'>
                <img className="logo" src={process.env.PUBLIC_URL+'/Icons/LOGOS/image.png'} alt='logo'/>
                    <h1>Σύνδεση</h1>
                    <div className="auth-form">                    
                        <form>
                            <div className='form-item' id='username'>
                                <FaUser className='react-icon'/>
                                <input className="form-input" type="username" placeholder="Username" onChange={(e) => {setUsername(e.target.value);
                                                                                                                                   document.getElementById('username').style.borderWidth = '0px';
                                                                                                                                   document.getElementById('username_errorValue').style.display = 'none';
                                                                                                                                   document.getElementById('errorValue').style.display = 'none'}}/>
                            </div>     
                            <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}} className='errorValue' id='username_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>            
                            <div className='form-item' id='password'>     
                                <FaLock className='react-icon'/>       
                                <input className="form-input" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);
                                                                                                                       document.getElementById('password').style.borderWidth = '0px';
                                                                                                                       document.getElementById('password_errorValue').style.display = 'none';
                                                                                                                       document.getElementById('errorValue').style.display = 'none'}}/>
                            </div>  
                            <div  className='errorValue' id='password_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>                      
                            <div className='errorValue' id='errorValue' style={{marginTop:'1.5rem', marginBottom:'-1rem', justifyContent:'center', fontSize:'14px'}}>{error}</div>
                            <div style = {{ marginTop: '4.5rem'}}></div>     
                            <div className='flex'>
                                <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}} className="form-submit" type="submit" onClick={() => {handleLoginButton(); setLoading(true)}} disabled={loading}>{loading ? 'Σύνδεση...' : 'Σύνδεση'}</div>                    
                            </div>                        
                        </form>
                    </div>
                </div>

                <div className='column'>
                    <h2>Καλωσήλθατε στο Τμήμα Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας</h2>
                    <p style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Εάν είστε μέλος της πανεπιστημιακής μας κοινότητας και δεν έχετε ήδη λογαριασμό, μπορείτε να δημιουργήσετε τώρα!</p>
                    <Link to="/signup" className='href' >Sign Up</Link>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}  
                onHide={(e) => setModalShow(false) } 
            /> 
        </div>
    )
}

export default Login;