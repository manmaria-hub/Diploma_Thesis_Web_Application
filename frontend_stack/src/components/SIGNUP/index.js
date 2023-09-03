// SIGN UP PAGE
import React, {useState, useEffect, useCallback} from 'react';
import { Link , useNavigate} from "react-router-dom";
import { useMutation } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';

// React Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'; 

// Icons 
import {FaUser, FaLock, FaKey} from 'react-icons/fa';  
import {MdMail} from 'react-icons/md'; 

// GraphQL  
import userResolvers from '../../graphql/resolvers/users';
 
// CSS Styles
import '../../../src/styles/components/SIGN_UP/signUp.scss';    
 
function MyVerticallyCenteredModal(props) {
  const [error, setError] = useState('');
  const [passwordValue, setPasswordValue] = useState(''); 

  const checkValidPassword = (password, e) => { 
    if (password.trim().length === 0) { 
        setError('Το πεδίο είναι υποχρεωτικό !'); 
        document.getElementById('inputPassword5').style.border = '2px solid red'
        document.getElementById('feed').style.display = 'flex';
    }
    else if (password !== 'eceuth'){ 
        setError('Μη έγκυρο συνθηματικό !');
        document.getElementById('inputPassword5').style.border = '2px solid red'
        document.getElementById('feed').style.display = 'flex';
    }
    else if (password === 'eceuth') {   
        props.onHide(e.target.type)
        setPasswordValue('')
    }
  } 
  return (     
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered  
      onShow={()=> setPasswordValue('')}          
    >
      <Modal.Header closeButton onClick={(e)=>{ props.onHide(e.target); setPasswordValue('')}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Επιβεβαίωση Μέλους
        </Modal.Title> 
      </Modal.Header>
      <Modal.Body>
        <h4>Γραμματεία ΗΜΜΥ</h4>
        <p>
          Παρακαλώ, συμπληρώστε το κατάλληλο συνθηματικό για να επιβεβαιώσετε την ταυτότητά σας :
        </p> 
        <InputGroup>
        <InputGroup.Text><FaKey/></InputGroup.Text>
            <Form.Control className='pas'
                type="password"
                id="inputPassword5" 
                aria-describedby="passwordHelpBlock" 
                value={passwordValue}
                onChange={(e) => {setPasswordValue(e.target.value);  
                                  document.getElementById('inputPassword5').style.border = '0px solid red';
                                  document.getElementById('feed').style.display = 'none';}}               
            /> 
            <Form.Control.Feedback type="invalid" id='feed'>
                {error}
            </Form.Control.Feedback>
        </InputGroup> 
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' onClick={(e)=>checkValidPassword(passwordValue, e)}>Close</Button>
      </Modal.Footer>
    </Modal> 
  );
}

const Signup = () => { 
    const navigate = useNavigate();   
    // State variable for modal window
    const [modalShow, setModalShow] = useState(false); 
    // Object that stores the input values
    let [signUpValues, setSignUpValues] = useState({first_name : '', last_name : '', username : '', email : '', role: '', password : '', confirm : ''});
    let [loading, setLoading] = useState(false);

    // Check  email
    const checkValidEmail = useCallback(() => {
        let isValid = true;
        if (signUpValues.email !== '') {
            if (!validator.isEmail(signUpValues.email)) {
                document.getElementById('email_error').style.display = 'flex';
                document.getElementById('email').style.border = '2px solid red';
                isValid = false;
            }
            else if (!signUpValues.email.endsWith('@uth.gr')) {
                if (!signUpValues.email.endsWith('@e-ce.uth.gr')) {
                    document.getElementById('email_error').style.display = 'flex';
                    document.getElementById('email').style.border = '1px solid red';
                    isValid = false;                
                }
            }
        }
        return (isValid);
    }, [signUpValues.email])

    useEffect(() => {
        checkValidEmail();
    }, [signUpValues.email, checkValidEmail])

    // Check confirm password
    const checkConfirmPassword = useCallback(() => {
        let isValid = true;
        if (signUpValues.password !== '' && signUpValues.confirm !== '') {
            if (signUpValues.password !== signUpValues.confirm) {
                document.getElementById('password_error').style.display = 'flex';
                document.getElementById('password').style.border = '2px solid red';
                document.getElementById('confirm_error').style.display = 'flex';
                document.getElementById('confirm').style.border = '2px solid red';
                isValid = false;                
            }
        }
        return (isValid);
    }, [signUpValues.confirm, signUpValues.password])

    useEffect(() => {
        checkConfirmPassword();
    }, [signUpValues.password, signUpValues.confirm, checkConfirmPassword])

    // MUtation for the registration of a new member 
    const registerUser = () => {
        userResolvers.register_user(Object(signUpValues))
            .then(result => {
                setLoading(false)
                console.log(result)
                navigate('/login');
            })
            .catch(err => {
                setLoading(false)
                console.log(err.graphQLErrors[0].extensions.errors) 
                document.getElementById('errorValue').style.display = 'flex';
            })
    }     

    // Function that checks the validity of the input values 
    const validateInputs = (e) => {

        let isEmpty = false;
        // Check first_name 
        if (signUpValues.last_name.trim().length === 0) {
            document.getElementById('last_name').style.border = '2px solid red';
            document.getElementById('name_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check last_name 
        if (signUpValues.first_name.trim().length === 0) {
            document.getElementById('first_name').style.border = '2px solid red';
            document.getElementById('name_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check username 
        if (signUpValues.username.trim().length === 0) {
            document.getElementById('username').style.border = '2px solid red';
            document.getElementById('username_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check email 
        if (signUpValues.email.trim().length === 0) {
            document.getElementById('email').style.border = '2px solid red';
            document.getElementById('email_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check password 
        if (signUpValues.password.trim().length === 0) {
            document.getElementById('password').style.border = '2px solid red';
            document.getElementById('password_errorValue').style.display = 'flex';
            isEmpty = true;
        }
        // Check password 
        if (signUpValues.confirm.trim().length === 0) {
            document.getElementById('confirm').style.border = '2px solid red';
            document.getElementById('confirm_errorValue').style.display = 'flex';
            isEmpty = true;
        }
         // Check role 
         if (signUpValues.role.trim().length === 0) { 
            document.getElementById('role_errorValue').style.display = 'flex';
            isEmpty = true;
        }

        setSignUpValues({...signUpValues,username : signUpValues.username.replace(/\s+/g, '')});

        // Check email validity
        const isValidEmail = checkValidEmail();
        // Check password validity
        const isValidPassword = checkConfirmPassword();
        console.log(signUpValues.role, 'role')

        if (isEmpty === true || isValidEmail === false || isValidPassword === false ) {
            return;            
        }
        else {
            // Make the mutation to register the new member
            registerUser({variables:{first_name : signUpValues.first_name, 
                                     last_name : signUpValues.last_name, 
                                     username:signUpValues.username,
                                     email: signUpValues.email,
                                     role: signUpValues.email,
                                     password: signUpValues.password,
                                     confirm: signUpValues.confirm }})
        } 
    }

    useEffect(()=> {
        console.log(signUpValues.username)
    }, [signUpValues.username])

    const closeModal = (type) => {
        if (type === 'admin') {
            setModalShow(false);
            setSignUpValues({...signUpValues, role:'admin'})
        }
        else {
            setModalShow(false);
            setSignUpValues({...signUpValues, role:''})
        }
    }
 

    return (
        <div className='signup-page'> 
            <div className='login-card'>
                <div className='column'>
                <img className="logo" src={process.env.PUBLIC_URL+'/Icons/LOGOS/image.png'} alt='logo'/>
                    <h1>Εγγραφή</h1>
                    <div className="auth-form">                                          
                        <form>
                            <div className='form_group'>
                                <div className='form-item' id='first_name'>
                                    <FaUser className='react-icon'/>
                                    <input style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className="form-input" type="first name" placeholder="Όνομα" value={signUpValues.first_name}
                                                                                                     onChange={(e) => {setSignUpValues({...signUpValues, first_name: e.target.value});
                                                                                                     document.getElementById('name_errorValue').style.display = 'none';
                                                                                                     document.getElementById('first_name').style.borderWidth = '0px';
                                                                                                     document.getElementById('errorValue').style.display = 'none';}}/>
                                </div>            
                                <div className='form-item'  id='last_name'>     
                                    <FaUser className='react-icon'/>       
                                    <input style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className="form-input" type="last name" placeholder="Επώνυμο" value={signUpValues.last_name}
                                                                                                         onChange={(e) => {setSignUpValues({...signUpValues, last_name: e.target.value});
                                                                                                         document.getElementById('name_errorValue').style.display = 'none';
                                                                                                         document.getElementById('last_name').style.borderWidth = '0px';
                                                                                                         document.getElementById('errorValue').style.display = 'none';}}/>
                                </div> 
                            </div>            
                            <div className='errorValue' id='name_errorValue'>*Τα πεδία είναι υποχρεωτικά !</div>           
                            <div className='form-item' id = 'username'>
                                <FaUser className='react-icon'/>
                                <input className="form-input" type="username" style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} placeholder="Username" value={signUpValues.username} 
                                                                                                     onChange={(e) => {setSignUpValues({...signUpValues, username:  e.target.value.replace(/\s+/g, '')});
                                                                                                     document.getElementById('username_errorValue').style.display = 'none';
                                                                                                     document.getElementById('username').style.borderWidth = '0px';
                                                                                                     document.getElementById('errorValue').style.display = 'none';}}/>
                            </div> 
                            <div className='errorValue' id='username_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>
                            <div className='form-item' id='email'>     
                                <MdMail className='react-icon' size={'1.2rem'} style={{marginRight:'-0.2rem'}}/>       
                                <input style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className="form-input" type="email" placeholder="Email" value={signUpValues.email} 
                                                                                               onChange={(e) => {setSignUpValues({...signUpValues, email: e.target.value});
                                                                                                                 document.getElementById('email_error').style.display = 'none';
                                                                                                                 document.getElementById('email').style.borderWidth = '0px';
                                                                                                                 document.getElementById('email_errorValue').style.display = 'none';
                                                                                                                 document.getElementById('errorValue').style.display = 'none';}}/>
                            </div>           
                            <div className='invalidValue' id='email_error'>*Μη έγκυρη μορφή ακαδημαικού email!</div>
                            <div className='errorValue' id='email_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>
                            <div className='form-item' id='password'>     
                                <FaLock className='react-icon'/>       
                                <input className="form-input" type="password" placeholder="Κωδικός Πρόσβασης" 
                                                                                                             value={signUpValues.password} autoComplete='off'
                                                                                                             onChange={(e) => {setSignUpValues({...signUpValues, password: e.target.value});
                                                                                                             document.getElementById('password_error').style.display = 'none';
                                                                                                             document.getElementById('password').style.borderWidth = '0px';
                                                                                                             document.getElementById('confirm_error').style.display = 'none';
                                                                                                             document.getElementById('confirm').style.borderWidth = '0px';
                                                                                                             document.getElementById('password_errorValue').style.display = 'none';
                                                                                                             document.getElementById('errorValue').style.display = 'none';}}
                                                                                                             />
                            </div>   
                            <div className='invalidValue' id='password_error'>*Ο κωδικός δεν επιβεβαιώνεται !</div>
                            <div className='errorValue' id='password_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>
                            <div className='form-item' id='confirm'>     
                                <FaKey className='react-icon'/>       
                                <input style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} className="form-input" type="password" placeholder="Επιβεβαίωση Κωδικού Πρόσβασης" value={signUpValues.confirm} 
                                                                                                                          onChange={(e) => {setSignUpValues({...signUpValues, confirm: e.target.value});
                                                                                                                          document.getElementById('password_error').style.display = 'none';
                                                                                                                          document.getElementById('password').style.borderWidth = '0px';
                                                                                                                          document.getElementById('confirm_error').style.display = 'none';
                                                                                                                          document.getElementById('confirm').style.borderWidth = '0px';
                                                                                                                          document.getElementById('confirm_errorValue').style.display = 'none';
                                                                                                                          document.getElementById('errorValue').style.display = 'none';
                                                                                                                          }}/>
                            </div> 
                            <div className='invalidValue' id='confirm_error'>*Ο κωδικός δεν επιβεβαιώνεται !</div> 
                            <div className='errorValue' id='confirm_errorValue'>*Το πεδίο είναι υποχρεωτικό !</div>            
                            <div style = {{ marginTop: '3.5rem'}}></div>  
                            <div className='role_choices'> 
                                <div className='role'>
                                    <input type="radio" name='role_selection' value='ΓΡΑΜΜΑΤΕΙΑ'  checked={signUpValues.role === 'admin'}  onChange={(e) =>{setModalShow(true); document.getElementById('role_errorValue').style.display = 'none';}}></input>
                                    <label>ΓΡΑΜΜΑΤΕΙΑ</label>
                                </div> 
                                <div className='role'>
                                    <input type="radio" name='role_selection' value='ΑΛΛΟ' onClick={()=> {setSignUpValues({...signUpValues, role:'user'}); document.getElementById('role_errorValue').style.display = 'none';}}></input>
                                    <label>ΑΛΛΟ</label>
                                </div>  
                            </div>
                            <div className='errorValue' id='role_errorValue' style={{marginTop:'-2.8rem', marginBottom:'1.5rem'}}>*Το πεδίο είναι υποχρεωτικό !</div>
                            <div className='errorValue' id='errorValue' style={{marginTop:'-2.8rem', marginBottom:'1.5rem', justifyContent:'center', fontSize:'14px'}}>*Ο χρήστης υπάρχει ήδη !</div>
                            <div className='flex'>
                                <div className="form-submit" style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}} onClick={(e) =>{ validateInputs(e);  setLoading(true)}} disabled={loading}>{loading ? 'Εγγραφή...' : 'Υποβολή'}</div>                
                            </div>                        
                        </form>
                    </div>
                </div>

                <div className='column'>
                    <h2 style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Καλωσήλθατε στο Τμήμα Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας</h2>
                    <p style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Εάν είστε ήδη εγγεγραμμένοι, μπορείτε να συνδεθείτε απευθείας στο λογαριασμό σας !</p>
                    <Link to="/login" className='href' style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>Σύνδεση</Link>
                </div>
            </div>  
            
            <MyVerticallyCenteredModal
                show={modalShow}  
                onHide={(e) => {e === 'submit' ? closeModal('admin') : e === 'close' ?  closeModal('') :   closeModal('') }} 
            /> 
    </div>   
    )
}

export default Signup;