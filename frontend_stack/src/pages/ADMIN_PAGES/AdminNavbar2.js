import React, {useEffect, useState} from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// CSS Styles
import '../../styles/pages/ADMIN_PAGES/adminNavbar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Resolvers
import studentResolvers from '../../graphql/resolvers/student';
import professorsResolvers from '../../graphql/resolvers/professors';

// Auth
import { useAuthDispatch } from "../../context/auth";

// React Icons                                                                                                                                                                                                                                                                                                                                                                                                       
import {TiArrowSortedDown} from 'react-icons/ti';
import {MdMail} from 'react-icons/md';
import {IoIosNotifications} from 'react-icons/io';
import UTH_LOGO from '../../../src/Icons/transparentLogo.jpg'
import ADMIN from '../../../src/Icons/admin (2).png';
import PROFESSOR_MALE from '../../../src/Icons/male_professor.png';
import PROFESSOR_FEMALE from '../../../src/Icons/female_prof.png';
import STUDENT_FEMALE from '../../../src/Icons/female-student.png';
import STUDENT_MALE from '../../../src/Icons/male-student.png';

// MUI Icons 
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box'; 
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';  
import ChatIcon from '@mui/icons-material/Chat';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'; 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "../../components/LOGIN"; 



const AdminNavbar = (props) => {
    
   
  const token = localStorage.getItem('token');
  const navigate = useNavigate()    

  let [userIdentity, setUserIdentity] = useState({identity:'', data:null})

   const checkUserRole = (userInfo) => { 
    console.log(userInfo.role, 'hi')
    //let userIdentity = {identity:'', data:null}
    let professor = null; let student = null;
    studentResolvers.get_connected_student(userInfo.email, userInfo.username)
        .then(res=> {
            student = res?.data?.getConnectedStudent?.student;
            console.log(res)
            if (student !== null) {
                if (student !== null && student.Studentship_Info.General_Information.course_program_part === 'ΔΕΥΤΕΡΟΣ ΚΥΚΛΟΣ - ΕΞΕΙΔΙΚΕΥΣΗ' || student.Studentship_Info.General_Information.course_program_part === 'ΠΡΩΤΟΣ ΚΥΚΛΟΣ - ΚΟΡΜΟΣ') {
                    setUserIdentity({...userIdentity, identity : 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ', data : student});
                    console.log(userIdentity)  
                } 
            }
        })
    professorsResolvers.get_connected_professor(userInfo.username, userInfo.email)
        .then(res=> {
            professor = res?.data?.getConnectedProfessor?.professor;
            if (professor !== null && student=== null) {                    
              setUserIdentity({...userIdentity, identity : 'ΚΑΘΗΓΗΤΗΣ', data : professor});
                //console.log(userIdentity.identity) 
            } 
            
    })
             
} 
    
    useEffect(()=> { 
        if (token === null) { 
            navigate("/login", {state : {alert:true}})
        }
    })
    

    const userRole = localStorage.getItem('user');
    if (JSON.parse(userRole).role === 'user' && userIdentity.data === null) {
      
      checkUserRole(JSON.parse(userRole))
    } 
    console.log(JSON.parse(userRole).role)
    const dispatch = useAuthDispatch(); 
 
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 280;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
 
  const BootstrapTooltip  = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white      
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: 'rgb(93, 93, 93)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 700,
      fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
      border: '1px solid #fff'   ,
      letterSpacing:'1px'
    }, 
  }));

  // Handling Click 'STUDENTS'
  const studentClick = (typeOfSelection) => {
    if (typeOfSelection === 0) {
      navigate('/uth-ece_admin/add_student');
    }
  } 

  // Handling Click 'PROFESSORS'
  const professorClick = (typeOfSelection) => {
    if (typeOfSelection === 0) {
      navigate('/uth-ece_admin/add_professor');
    }
  }

  const currentUser = (token, identity, role) => { 
    if (token!== null && role === 'admin') {
      return(
        <div style={{display:'block'}}> 
          <Avatar alt="ADMIN" variant="rounded"style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}}  src={ADMIN} sx={{ width: 70, height: 70 }} />
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >Γραμματεία ΤΗΜΜΥ</p>
        </div> 
      )
    }
    else if (token !== null && identity === 'ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' && userIdentity.data.Personal_Info.Birth_Details.gender === 'ΘΗΛΥ') {           
      return (
        <div style={{display:'block'}}> 
          <Avatar alt="STUDENT" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={STUDENT_FEMALE} sx={{ width: 80, height: 80 }} /> 
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΠΡΟΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ</p>
        </div> 
      )
    }
    else if (token !== null && identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' && userIdentity.data.Personal_Info.Birth_Details.gender === 'ΘΗΛΥ') {           
      return (
        <div style={{display:'block'}}> 
          <Avatar alt="STUDENT" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={STUDENT_FEMALE} sx={{ width: 80, height: 80 }} /> 
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΜΕΤΑΠΤΥΧΙΑΚΗ ΦΟΙΤΗΤΡΙΑ</p>
        </div> 
      )
    }
    else if (token !== null && identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' && userIdentity.data.Personal_Info.Birth_Details.gender === 'ΘΗΛΥ') {           
      return (
        <div style={{display:'block'}}> 
          <Avatar alt="STUDENT" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={STUDENT_MALE} sx={{ width: 80, height: 80 }} /> 
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΠΡΟΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ</p>
        </div> 
      )
    }
    else if (token !== null && identity === 'ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ' && userIdentity.data.Personal_Info.Birth_Details.gender === 'ΑΡΡΕΝ') {           
      return (
        <div style={{display:'block'}}> 
          <Avatar alt="STUDENT" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={STUDENT_MALE} sx={{ width: 80, height: 80 }} /> 
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΜΕΤΑΠΤΥΧΙΑΚΟΣ ΦΟΙΤΗΤΗΣ</p>
        </div> 
      )
    } 
    else if (token !== null && identity === 'ΚΑΘΗΓΗΤΗΣ' &&  userIdentity.data.PERSONAL_INFO.gender === "Άρρεν") {           
      return (
        <div style={{display:'block'}}> 
          <Avatar alt="PROFESSOR" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={PROFESSOR_MALE} sx={{ width: 80, height: 80 }} /> 
          <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΚΑΘΗΓΗΤΗΣ</p>
        </div>  
      )
    } 
    else if ( token !== null && identity === 'ΚΑΘΗΓΗΤΗΣ' && userIdentity.data.PERSONAL_INFO.gender === "Θήλυ" ) {
      return(
      <div style={{display:'block'}}> 
        <Avatar alt="PROFESSOR" variant="rounded" style={{border:'0.1px solid #1e90a1', alignItems:'center', justifyContent:'center', position:'relative', marginLeft:'auto', marginRight:"auto", marginTop:"1rem", backgroundColor:'rgba(255,255,255,0.5)'}} src={PROFESSOR_FEMALE} sx={{ width: 80, height: 80 }} />
        <h4 style={{fontSize:'19px',marginTop:'1rem', wordSpacing:'4px', letterSpacing:'1.5px', fontWeight:'700', fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', color:'white'}}>{JSON.parse(localStorage.getItem('user')).last_name + " " + JSON.parse(localStorage.getItem('user')).first_name}</h4>
        <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize:'15px',marginTop:'0.1rem', wordSpacing:'4px', letterSpacing:'1px', fontWeight:'500', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji' }} >ΚΑΘΗΓΗΤΡΙΑ</p>
    </div>
      )
    }
  }


    
  const drawer =  ( 
    token === null  ? <Login></Login> :
    <div style={{ backgroundColor:'gray', height:'100%', overflowX:'hidden'}}>
        <div className="sidebar_css" style={{width:'280px', color:'rgba(255,255,255,0.7)', position:'relative', zIndex:'7',height:'100%', paddingBottom:'61px', background:'#1e90a1'}}>
          <div aria-label="Side" style={{position:'relative', overflow:'hidden', width:'100%', height:'100%'}}>
            <div style={{position:'absolute', inset:'0',scrollbarColor:'transparent', scrollbarWidth:'none',  msOverflowStyle:'none', overflow:'scroll', marginRight:'-17px', marginBottom:'-17px'}}>
              {/*  FIRST PART */}
              <div className="root" style={{marginTop:'27px', marginBottom:'15px'}}>
                <div className="ebdsus" style={{marginLeft:'10px', marginRight:'15px', width:'95%'}}>
                <Stack direction="row" spacing={1} style={{display:'flex', justifyContent:'center', alignItems:'center', }}>
                  <Avatar  
                    style={{backgroundColor:'white', padding:'7px', verticalAlign:'middle'}}
                    alt="UTH LOGO"
                    src={UTH_LOGO}
                    sx={{ width: 65, height: 65 }}
                  />
                  <span style={{fontSize:"11.1px", color:'white', fontWeight:'700', verticalAlign:'middle', letterSpacing:'1.5px', marginRight:'2px'}}>ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ & ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</span>
                </Stack>
                </div>
              </div>
              <Divider variant="middle" style={{ backgroundColor:'white'}}/>
              {/*  SECOND PART */}
              <div className="profil" style={{textAlign:'center', marginLeft:'18px', marginRight:'18px', paddingTop:'9px',position:'relative'}}>
              {currentUser(token, userIdentity.identity, JSON.parse(userRole).role)}
              <Divider style={{ backgroundColor:'white', width:'100%'}}/>
              </div>

              <div className="menu" style={{marginTop:'1rem',marginLeft:'18px', marginRight:'18px'}}>
              <p style={{ fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', fontSize:'17px', fontWeight:'600', letterSpacing : '1px', color:'white' }}>ΠΑΝΕΠΙΣΤΗΜΙΟ</p>
              <Accordion style={{backgroundColor:'transparent'}}>
              <AccordionSummary  style={{display:'flex', justifyContent:'space-between', marginRight:'2px'}}
                expandIcon={<ExpandMoreIcon  style={{color:'white'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header" 
              >
                <Typography style={{marginLeft:'0.8rem',fontWeight:'600',fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize:'15px', display:'flex', gap:'20px', alignItems:'center', color:'rgba(255,255,255,0.8)', backgroundColor:'transparent',}}><GroupsIcon style={{color:'rgba(255,255,255,0.7'}} />ΦΟΙΤΗΤΕΣ</Typography>
              </AccordionSummary>
              <AccordionDetails> 
              <List>
                {['Εισαγωγή Φοιτητών', 'Λίστα Φοιτητών'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton > {/*
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>*/}
                      <ListItemText onClick={()=> studentClick(index)} style={{color:'rgba(255,255,255,0.9)'}} primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              </AccordionDetails>
              </Accordion> 
              <Divider />
              <Accordion style={{backgroundColor:'transparent'}}>
              <AccordionSummary style={{display:'flex', justifyContent:'space-between', marginRight:'2px'}}
                expandIcon={<ExpandMoreIcon  style={{color:'white',position:'relative', display:'flex',gap:'2rem'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header" 
              >
                <Typography style={{marginLeft:'0.8rem',fontWeight:'600', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji', fontSize:'15px', display:'flex', gap:'20px', alignItems:'center',  color:'rgba(255,255,255,0.8)', backgroundColor:'transparent',}}><GroupsIcon style={{color:'rgba(255,255,255,0.7'}} />ΚΑΘΗΓΗΤΕΣ</Typography>
              </AccordionSummary>
              <AccordionDetails> 
              <List>
                {['Εισαγωγή Καθηγητή', 'Λίστα Καθηγητών'].map((text, index2) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton > {/*
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>*/}
                      <ListItemText onClick={()=> professorClick(index2)} style={{color:'rgba(255,255,255,0.9)'}} primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              </AccordionDetails>
              </Accordion> 
              </div>
            </div>
            <div style={{position:'relative', height:'6px', transition:'opacity 200ms ease 0s', opacity:'0', right:'2px', bottom:'2px', left:'2px', borderRadius:'3px'}}>
              <div style={{position:'relative', display:'block', height:'100%', cursor:'pointer', borderRadius:'inherit', backgroundColor:'rgba(0,0,0,0.2)', width:'0px'}}></div>
            </div>
            <div style={{position:'absolute', width:'6px', transition:'opacity 200ms ease 0s', opacity:'0', right:'2px', bottom:'2px', top:'2px', borderRadius:'3px'}}>
              <div className="deud" style={{width:'5px', background: 'rgba(34, 51, 84, 0.1)', borderRadius:'12px', transition:'background 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', height:'423px', transform:'translateY(0px)'}}></div>
            </div>
          </div>
          <div className="sidebar_bottom" style={{display:'flex', alignItems:'center', justifyContent:'center', height:'60px', gap:'8px'}}>
            <BootstrapTooltip title="Ημερολόγιο Γεγονότων" placement="top" arrow  >
              <a className="calendarButton"><EventIcon style={{color:'rgba(255,255,255,0.9)', borderRadius:'5px', padding:'6px',fontSize:'2.3rem', backgroundColor:'rgba(255,255,255,0.25)'}}></EventIcon></a>
            </BootstrapTooltip >
             <BootstrapTooltip title="Συνομιλία" placement="top" arrow  >
                <div><a className="calendarButton"><ChatIcon style={{color:'rgba(255,255,255,0.9)', borderRadius:'5px', padding:'6px',fontSize:'2.3rem', backgroundColor:'rgba(255,255,255,0.25)'}}></ChatIcon></a><span 
                style={{display: 'flex', flexFlow:'row wrap' , placeContent:'center', alignItems:'center', position: 'absolute', boxSizing:'border-box' , fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji', fontWeight: '500', fontSize:'0.75rem', minWidth:'8px', lineHeight:'1', padding: '0', height: '8px', borderRadius: '4px', zIndex:'1',
                transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 1ms', backgroundColor:'rgb(87, 202, 34)', color: 'rgb(255, 255, 255)',bottom: '42px', right: '45%',transform: 'scale(1.2) translate(50%, -50%)', transformOrigin: '100% 0%',
                }}></span></div>
              </BootstrapTooltip>

             <BootstrapTooltip title="Αποσύνδεση" placement="top" arrow  onClick={()=> {dispatch({type:'LOGOUT'}); navigate("/login", {state : {alert:false}})}} >
              <a className="calendarButton"><PowerSettingsNewIcon style={{color:'rgba(255,255,255,0.9)', borderRadius:'5px', padding:'6px',fontSize:'2.3rem', backgroundColor:'rgba(255,255,255,0.25)'}}></PowerSettingsNewIcon></a>
            </BootstrapTooltip>
          </div>
        </div>
    </div>

  );

  const newDrawerWidth = 900;

  //const container = window !== undefined ? () => window().document.body : undefined;
  
 
    return (
      token === null ?
        <Login></Login> :
        <Box sx={{ display: 'flex' }}>
        <AppBar
        position="fixed"  
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${newDrawerWidth}px` },
          boxShadow:'none',
          backgroundColor:'white'          
        }}  
      >
         <Toolbar style={{backgroundColor:'white'}}>
         <IconButton
            color="blue"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        <div style={{ width:'100%', height:'fit-content', border:'none',position:'relative',play:'block', marginRight:'0', marginLeft:'auto'}}>



        </div>  
        </Toolbar>
        </AppBar> 
      <Box
        component="nav"
        sx={{ width: { sm: 800 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      > 
        <Drawer
         // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box> 
        </Box> 
    )   

}

AdminNavbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    
  };

export default AdminNavbar;