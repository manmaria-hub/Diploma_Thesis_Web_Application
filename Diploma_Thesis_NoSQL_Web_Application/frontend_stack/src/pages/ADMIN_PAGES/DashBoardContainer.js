import React, { useState } from 'react';   
import { useNavigate } from 'react-router-dom';

import {FaUserTie, FaUserGraduate} from 'react-icons/fa';
import {GiBookshelf} from 'react-icons/gi';
import {SiGoogleclassroom} from 'react-icons/si';
import Classroom from '../../Icons/DEPARTMENT/classroom.jpg';
import ComputerLab from '../../Icons/DEPARTMENT/ComputeLab.jpg'; 

// GraphQL Resolvers
import studentResolvers from '../../graphql/resolvers/student';
import professorsResolvers from '../../graphql/resolvers/professors';
import coursesResolvers from '../../graphql/resolvers/courses';
import hallResolvers from '../../graphql/resolvers/halls';

// CSS Styles
import '../../../src/styles/pages/ADMIN_PAGES/dashBoardContainer.scss';


const DashBoardContainer = () => {

    const navigate = useNavigate();
    let [allCourses, setAllCourses] = useState([]);
    let [allStudents, setAllStudents] = useState([]);
    let [allProfessors, setAllProfessors] = useState([]);
    let [allHalls, setAllHalls] = useState([]);


    if (allCourses.length === 0 ) {
        coursesResolvers.get_courses_by_criteria(['ΠΡΟΠΤΥΧΙΑΚΟ', 'ΜΕΤΑΠΤΥΧΙΑΚΟ'], [], [], [])
            .then(result => {
                setAllCourses(result?.data?.getCoursesByCriteria)
            })
            .catch(err=> {
                console.log(err)
            })
    }

    if (allProfessors.length === 0 ) {
        professorsResolvers.get_all_professors()
            .then(result => {
                setAllProfessors(result?.data?.getAllProfessors)
            })
            .catch(err=> {
                console.log(err)
            })
    }

    if (allStudents.length === 0 ) {
        studentResolvers.get_all_students()
            .then(result => {
                setAllStudents(result?.data?.getAllStudents)
            })
            .catch(err=> {
                console.log(err)
            })
    }

    if (allHalls.length === 0 ) {
        hallResolvers.get_all_halls()
            .then(result => {
                setAllHalls(result?.data?.getAllHalls)
            })
            .catch(err=> {
                console.log(err)
            })
    }

    return ( 
        <div className='submit_main'>
            <div className='cardBox'>
                <div className='card' onClick={()=>navigate("/uth-ece/professor_list")}>
                    <div>
                        <div className='numbers'>{allProfessors.length}</div>
                        <div className='cardName'>Καθηγητές</div>
                    </div>
                    <div className='iconBx'>
                        <FaUserTie/>
                    </div>
                </div>
                <div className='card'>
                    <div>
                        <div className='numbers'>{allStudents.length}</div>
                        <div className='cardName'>Φοιτητές</div>                        
                    </div>
                    <div className='iconBx'>
                    <FaUserGraduate/>
                    </div>
                </div>
                <div className='card' onClick={() => navigate('/uth-ece/search_courses')}>
                    <div>
                        <div className='numbers'>{allCourses.length}</div>
                        <div className='cardName'>Μαθήματα</div>
                    </div>
                    <div className='iconBx'>
                        <GiBookshelf/>
                    </div>
                </div>
                <div className='card'>
                    <div>
                        <div className='numbers'>{allHalls.length}</div>
                        <div className='cardName'>Αίθουσες</div>
                    </div>
                    <div className='iconBx'>
                        <SiGoogleclassroom/>
                    </div>
                </div> 
            </div>
            <div className='details'>
                <div className='recentOrders' style={{overflowX:'scroll'}}> 
                    <div className='cardHeader'>
                        <h2>Καθηγητές</h2>
                        <a onClick={()=>navigate("/uth-ece/professor_list")} className='btn'>View all</a>
                    </div>

                    <table className='dash_table'>
                        <thead>
                            <td>Ονοματεπώνυμο</td>
                            <td>Κατηγορία Καθηγητή</td>
                            <td>username</td>
                            <td>email</td>
                            <td>Γραφείο</td>                            
                        </thead>
                        {allProfessors.map((prof, index) => {
                            return(
                                <tr className='dash_tr' key={index}>
                                    <td className='dash_td' style={{fontFamily:'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof.PERSONAL_INFO.last_name + ' ' + prof.PERSONAL_INFO.first_name}</td>
                                    <td className='dash_td' style={{fontFamily:'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof.ACADEMIC_INFO.professor_type}</td>
                                    <td className='dash_td' style={{fontFamily:'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof.ACADEMIC_INFO.username}</td>  
                                    <td className='dash_td' style={{fontFamily:'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof.ACADEMIC_INFO.academic_email}</td>
                                    <td className='dash_td' style={{fontFamily:'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>{prof.ACADEMIC_INFO.office}</td>                                                              

                                </tr>
                            )
                        })}                        
                    </table> 
                </div>
                <div className='recentCustomers' style={{overflowX:'scroll'}}>
                <div className='cardHeader'>
                    <h2>Αίθουσες</h2>                    
                </div>
                <table className='hallTable' style={{width:'100%'}}>
                    {allHalls.map((hall, indexHall) => {
                         
                        return (
                            hall.Hall_category !== 'Γραφεία'?                         
                            <tr className='trHall'>
                                <td width='60px'>
                                    {hall.Hall_type === 'Αμφιθέατρο' || hall.Hall_type === 'Αίθουσα Διδασκαλίας'  ?
                                    <div className='imgBox'><img src={Classroom}></img></div>
                                    : hall.Hall_type === 'Εργαστήριο Ηλεκτρονικής' || hall.Hall_type === 'Εργαστήριο Η/Υ' || hall.Hall_type === 'Εργαστήριο Ενέργειας' ?
                                    <div className='imgBox'><img src={ComputerLab}></img></div>
                                    : <div className='imgBox'><img src={Classroom}></img></div>}
                                </td>
                                <td style={{display:'flex', justifyContent:'space-between'}}>
                                    <h4>{hall.Hall_type}<br></br> <span>{hall.Hall_code}</span></h4>
                                    <div className='right'>{'Όροφος : ' + hall.Hall_floor}</div>
                                </td>
                            </tr>  : null
                        )
                    })}                   
                </table>
            </div>
            </div>


          
        </div>        
    )
}

export default DashBoardContainer;