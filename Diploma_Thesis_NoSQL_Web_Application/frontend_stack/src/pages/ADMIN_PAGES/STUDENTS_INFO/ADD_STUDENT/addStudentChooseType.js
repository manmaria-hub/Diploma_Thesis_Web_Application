import React , {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import AdminNavbar from '../../AdminNavbar';
import StudentsCompNavbar from './studentsCompNavbar';

// Icons 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/addStudentChooseType.scss';

const AddStudentChooseType = () => {

     // Check the user connection
     let token = localStorage.getItem('token')  
     const navigate = useNavigate()
     useEffect(()=> {
         if (token === null) {  
             navigate("/login", {state : {alert:true}})
         }
     }) 

    return(
        <div className="student_add_page">
            <div className="container">
                <div className="left-wrapper">aa</div>
                <div className="right-wrapper">
                    <AdminNavbar/>
                    <StudentsCompNavbar activeSelection='ADD_STUDENT'/> 
                    <div className='choose_container'>
                        <div className='card'>
                            <div className='lines'></div>
                            <div className='imgBox'>
                                <PersonAddIcon className='icon'></PersonAddIcon>                                
                            </div>       
                            <div className='content'>
                                    <div className='details'>
                                        <h2>Εισαγωγή Ενός Φοιτητή</h2>
                                        <p>Συμπληρώστε κατάλληλα τις φόρμες με τα στοιχεία του νέου φοιτητή προκειμένου να προχωρήσετε στην καταχώρηση ενός νέου μέλους της πολυτεχνικής μας κοινότητας!</p>
                                        <a href='/uth-ece_admin/add_student/personal_info_form'>Προσθήκη</a>
                                    </div>                                    
                                </div>                      
                        </div>

                        <div className='card'>
                            <div className='lines'></div>
                            <div className='imgBox'>
                                <GroupAddIcon className='icon'></GroupAddIcon>                                
                            </div>       
                            <div className='content'>
                                    <div className='details'>
                                        <h2>Εισαγωγή Φοιτητών</h2>
                                        <p>Πραγματοποιήστε μαζική εισαγωγή φοιτητών, λαμβάνοντας τα απαραίτητα στοιχεία εγγραφής από αρχείο κατάλληλου μορφότυπου (αρχείο τύπου csv ή json)</p>
                                        <a href='/uth-ece_admin/add_student/upload_file'>Προσθήκη</a>
                                    </div>                                    
                                </div>                      
                        </div>
                    </div>
                </div>   
            </div>         
        </div>
    )
}

export default AddStudentChooseType;