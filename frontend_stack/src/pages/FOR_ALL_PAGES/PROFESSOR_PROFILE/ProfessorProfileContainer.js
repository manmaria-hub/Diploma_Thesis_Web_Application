import React from 'react';
import { Grid, Box } from '@mui/material'; 

// Icons
import {BiSolidUserPin} from 'react-icons/bi';
  
// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/PROFESSOR_PROFILE/professorProfileContainer.scss';

const ProfessorProfileContainer = (props) => {
    const professor = props.profileInfo;
    console.log(professor)
    return (
        <div className="profile_container_main">
            <div className="profile_container_scroll">                 
                    <Box className="big_box" style={{marginTop: '40px'}}>
                        <Grid className='main_grid' container spacing={2}>
                            <Grid className='personal_info' style={{paddingLeft: '36px', display: 'block'}} xs={8}>     
                                <BiSolidUserPin style={{display : 'inline-flex'}}/>                           
                                <Box className='profileInfo'>
                                    <h3 className='professorTitle'>{professor.ΕΠΩΝΥΜΟ + ' ' + professor.ΟΝΟΜΑ}</h3>
                                    <div className='title_info'>{professor.ΤΥΠΟΣ +' Τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας'}</div>
                                </Box>
                            </Grid>
                            <Grid className='ACADEMIC_INFO' xs={4}></Grid>
                            <Grid className='COURSES' xs={6}></Grid>
                            <Grid className='OTHER' xs={6}></Grid>
                            <Grid className='MORE' xs={12}></Grid>                            
                        </Grid>
                    </Box>
                </div>
            </div> 
    )
}

export default ProfessorProfileContainer;