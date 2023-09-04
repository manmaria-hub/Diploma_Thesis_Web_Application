import React, { useMemo, useState } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction} from '@mui/material'; 
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'; 
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'; 
import IconButton from '@mui/material/IconButton';
import Table from 'react-bootstrap/Table'; 
import * as XLSX from 'xlsx';
  
import {
  DataGrid, 
  GridToolbarQuickFilter, 
} from '@mui/x-data-grid'; 

// Icons 
import UTH_LOGO from '../../../../Icons/uth-logo-background.png';
import STUDENTS from '../../../../Icons/STUDENTS/students.jpeg';
import male_prof from '../../../../Icons/male-student.png';
import female_prof from '../../../../Icons/female-student.png';
import {FaListUl, FaSearch, FaUser, FaFilePdf, FaGraduationCap, FaMobileAlt} from 'react-icons/fa';  
import {MdEmail} from 'react-icons/md';
import {BsFillTelephoneFill} from 'react-icons/bs'; 
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditIcon from '@mui/icons-material/Edit';
import {BiExport} from 'react-icons/bi';

// Components
import StudentsListActions from './StudentsListActions';

// GraphQL Resolvers
import StudentsResolvers from'../../../../../src/graphql/resolvers/student';

// CSS Styles
import '../../../../../src/styles/pages/ADMIN_PAGES/STUDENTS/STUDENTS_LIST/studentsListContainer.scss'; 


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }} style={{display:'block'}}>            
            <div>{children}</div>
            </Box>
        )}
        </div>
    );
    }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`, 
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
          marginLeft:'0.5rem',
          marginRight:'0.5rem',
          display:'inline-grid', 
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }
  const VISIBLE_FIELDS = ['ΕΠΩΝΥΜΟ', 'ΟΝΟΜΑ', 'username', 'ΤΥΠΟΣ', 'ΚΑΤΗΓΟΡΙΑ', 'Email', 'ΓΡΑΦΕΙΟ', 'ΤΗΛΕΦΩΝΟ'];

const StudentsListContainer = () => {
    // State Variable that stores the students data by groups
    let [studentsGroupBy, setStudentsGroupBy] = useState(null);

    // State Variable that stores all database's professors for search filter
    let [allStudents, setAllStudents] = useState(null);    
    // Setting the state variable that will store the student information for excel file
    let [excelData, setExcelData] = useState([]);

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    // Using the suitable query to get all students group by graduation level
    if (studentsGroupBy === null ) {
        StudentsResolvers.get_all_students_group_by()
            .then(result => {
                //console.log(result);
                setStudentsGroupBy(result?.data?.getAllStudentsByGroup);
            })        
            .catch(error=> {
                console.log(error);
                throw error;
            })
    }

     // Using the suitable query to get all database's students for filter search
     if (allStudents === null ) {
        StudentsResolvers.get_all_students()
            .then(result => { 
                let student_array = [];
                let student_EXCEL_array = [];
                result?.data?.getAllStudents.forEach((student, index) => {
                    student_array.push({
                        'ΑΕΜ': student.Studentship_Info.General_Information.academic_record_number,
                        'ΕΠΩΝΥΜΟ' : student.Personal_Info.Personal_Information.last_name,
                        'ΟΝΟΜΑ' : student.Personal_Info.Personal_Information.first_name,
                        'ΟΝΟΜΑ ΠΑΤΡΟΣ' : student.Personal_Info.Personal_Information.father_FirstName,
                        'ΟΝΟΜΑ ΜΗΤΡΟΣ' : student.Personal_Info.Personal_Information.mother_FirstName,
                        'ΑΚΑΔΗΜΑΪΚΗ ΤΑΥΤΟΤΗΤΑ' : student.Personal_Info.Personal_Information.student_identity,
                        'ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ': student.Studentship_Info.General_Information.general_academic_record_number,
                        'username' : student.Personal_Info.Personal_Information.username,                     
                        'Email' : student.Studentship_Info.General_Information.academic_email, 
                        'ΕΞΑΜΗΝΟ ΦΟΙΤΗΣΗΣ': student.Studentship_Info.General_Information.current_academic_semester,
                        'ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ' : student.Studentship_Info.General_Information.current_attendance_period,
                        'ΕΤΟΣ ΦΟΙΤΗΣΗΣ': student.Studentship_Info.General_Information.current_academic_year,
                        'ΚΑΤΕΥΘΥΝΣΗ' :  student.Studentship_Info.General_Information.course_program_part,
                        'ΤΗΛΕΦΩΝΟ': student.Personal_Info.Student_Address.telephone,
                        'ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ': student.Personal_Info.Student_Address.mobile_phone,
                        'ΕΝΕΡΓΟΣ' : student.Personal_Info.Personal_Information.active
                    })

                    student_EXCEL_array.push({
                        id : index + 1,  
                        'ΑΕΜ': student.Studentship_Info.General_Information.academic_record_number,
                        'ΕΠΩΝΥΜΟ' : student.Personal_Info.Personal_Information.last_name,
                        'ΟΝΟΜΑ' : student.Personal_Info.Personal_Information.first_name,
                        'ΟΝΟΜΑ ΠΑΤΡΟΣ' : student.Personal_Info.Personal_Information.father_FirstName,
                        'ΟΝΟΜΑ ΜΗΤΡΟΣ' : student.Personal_Info.Personal_Information.mother_FirstName,
                        'ΑΚΑΔΗΜΑΪΚΗ ΤΑΥΤΟΤΗΤΑ' : student.Personal_Info.Personal_Information.student_identity,
                        'ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ': student.Studentship_Info.General_Information.general_academic_record_number,
                        'username' : student.Personal_Info.Personal_Information.username,                     
                        'Email' : student.Studentship_Info.General_Information.academic_email, 
                        'ΕΞΑΜΗΝΟ ΦΟΙΤΗΣΗΣ': student.Studentship_Info.General_Information.current_academic_semester,
                        'ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ' : student.Studentship_Info.General_Information.current_attendance_period,
                        'ΕΤΟΣ ΦΟΙΤΗΣΗΣ': student.Studentship_Info.General_Information.current_academic_year,
                        'ΚΑΤΕΥΘΥΝΣΗ' :  student.Studentship_Info.General_Information.course_program_part,
                        'ΤΗΛΕΦΩΝΟ': student.Personal_Info.Student_Address.telephone,
                        'ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ': student.Personal_Info.Student_Address.mobile_phone,
                        'ΕΝΕΡΓΟΣ' : student.Personal_Info.Personal_Information.active === true ? 'ΝΑΙ' : 'ΟΧΙ'
                    })
                })                 
                setExcelData(student_EXCEL_array)
                setAllStudents(student_array);
            })        
            .catch(error=> {
                console.log(error);
                throw error;
            })
    }

   
      const connectedUser = localStorage.getItem('identity');
    
      // Otherwise filter will be applied on fields such as the hidden column id
      const columns = useMemo(() => [
        {field : 'ΕΝΕΡΓΟΣ', headerName : 'ΕΝΕΡΓΟΣ ?', width: 120, type: 'boolean', editable:false},
        {field : 'ΑΕΜ', headerName : 'ΑΕΜ', width: 120},
        {field : 'ΕΠΩΝΥΜΟ', headerName:'ΕΠΩΝΥΜΟ',  width: 150},
        {field : 'ΟΝΟΜΑ', headerName:'ΟΝΟΜΑ',  width: 150},
        {field : 'ΟΝΟΜΑ ΠΑΤΡΟΣ', headerName : 'ΟΝΟΜΑ ΠΑΤΡΟΣ', width: 120},
        {field : 'ΟΝΟΜΑ ΜΗΤΡΟΣ', headerName : 'ΟΝΟΜΑ ΜΗΤΡΟΣ', width: 120},
        {field : 'ΑΚΑΔΗΜΑΪΚΗ ΤΑΥΤΟΤΗΤΑ', headerName:'ΦΟΙΤΗΤΙΚΗ ΤΑΥΤΟΤΗΤΑ',  width: 150},
        {field : 'ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ', headerName:'ΑΡΙΘΜΟΣ ΓΕΝΙΚΟΥ ΜΗΤΡΩΟΥ',  width: 150},
        {field : 'username', headerName:'username',  width: 150}, 
        {field : 'Email', headerName:'ΚΑΤΗΓΟΡΙΑ',  width: 150},
        {field : 'ΕΞΑΜΗΝΟ ΦΟΙΤΗΣΗΣ', headerName : 'ΕΞΑΜΗΝΟ ΦΟΙΤΗΣΗΣ', width: 120},
        {field : 'ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ', headerName : 'ΠΕΡΙΟΔΟΣ ΦΟΙΤΗΣΗΣ', width: 120},
        {field : 'ΕΤΟΣ ΦΟΙΤΗΣΗΣ', headerName : 'ΕΤΟΣ ΦΟΙΤΗΣΗΣ', width: 120},
        {field : 'ΚΑΤΕΥΘΥΝΣΗ', headerName : 'ΚΑΤΕΥΘΥΝΣΗ', width: 120}, 
        {field : 'ΤΗΛΕΦΩΝΟ', headerName:'ΤΗΛΕΦΩΝΟ',  width: 150}, 
        {field : 'ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ', headerName:'ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ',  width: 150}, 
        {field : 'ΕΝΕΡΓΕΙΕΣ', headerName:'ΕΝΕΡΓΕΙΕΣ',  width: 150, renderCell : (params) => <StudentsListActions{...{params}}/>}
      ], [])

    // Speed Dial
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Function to export data to Excel file
    const exportDataToExcelFile = () => {
        console.log('data')
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, 'Φοιτητές');
        XLSX.writeFile(wb, 'Φοιτητές.xlsx');
    }

    // Setting actions for speed dial
    const actions = [
        { icon: <BiExport onClick={() => exportDataToExcelFile()} style={{color:'green', fontSize:'20px'}} />, name: 'Εξαγωγή δεδομένων' } 
    ];
       
    return (
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={STUDENTS} alt='' /></div>
                    <div className="title"> Φοιτητές
                        <p>Προπτυχιακοί Φοιτητές - Μεταπτυχιακοί Φοιτητές - Φοιτητές Ισοτιμίας </p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Το σύνολο των φοιτητών του Τμήματος διακρίνεται στις εξής κατηγορίες: Φοιτητές Προπτυχιακού Προγράμματος Σπουδών (ΠΠΣ), Φοιτητές Μεταπτυχιακού Προγράμματος Σπουδών (ΠΜΣ) και Φοιτητές Ισοτιμίας. Στη συνέχεια της παρούσας σελίδας μπορείτε να δείτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontWeight:'700', display:'inline-flex', marginLeft:'4px', marginRight:'4px'}}>μία λίστα του συνόλου των φοιτητών του τμήματος</strong> ανά κατηγορία. Επιπλέον, επιλέγοντας το κατάλληλο tab σας δίνεται <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontWeight:'700', display:'inline-flex', marginLeft:'4px', marginRight:'4px'}}>η δυνατότητα αναζήτησης φοιτητή ή φοιτητών</strong> σύμφωνα με τα κριτήρια της επιλογής σας.</div>           
                </div> 
                <div className='root'>
				    <h1 className="main_title">Κατάλογος Φοιτητών</h1>
                </div>
                <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1, marginTop:'-5rem' , marginBottom:'4rem' }}>
                    <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        direction='left'
                        open={open}
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                        style={{backgroundColor:'red'}}  
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                        />
                        ))}
                    </SpeedDial>
                </Box>
                <div className='professors_catalog'>
                    <Box sx={{ bgcolor: 'background.paper', width: '100%', marginBottom:'3rem'}}>
                        <AppBar position="static" style={{marginTop:'-2rem'}}>
                            <Tabs                            
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                >
                                <Tab style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textTransform:'none'}}  icon={<FaListUl style={{fontSize:'23px', marginBottom:'0.5rem'}}/>} label="Λίστα Φοιτητών" {...a11yProps(0)} />
                                <Tab style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textTransform:'none'}} icon={<FaSearch style={{fontSize:'25px', marginBottom:'0.5rem'}}/>} label="Αναζήτηση Φοιτητή" {...a11yProps(1)} /> 
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel style={{backgroundColor:'#17a3b80c'}} value={value} index={0} dir={theme.direction}>       
                                {studentsGroupBy && studentsGroupBy.length > 0 && studentsGroupBy.map((item, index) => {
                                    return(
                                        <div key={index}>
                                         <div className='typeProfessors'><span>{item._id}</span></div>  
                                            <TreeView
                                                aria-label="multi-select"
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                multiSelect
                                                sx={{ height: 'fit-content', maxWidth:'100%', flexGrow: 1, overflowY: 'auto', paddingBottom : '2rem' }}
                                                >
                                                {item.students.map((student, inIndex) => {
                                                    return (
                                                        <>                                                    
                                                        <TreeItem key ={inIndex} nodeId={student.Personal_Info.Personal_Information.first_name} label={ student.Personal_Info.Personal_Information.last_name + ' ' + student.Personal_Info.Personal_Information.first_name + ' ( '+ student.Studentship_Info.General_Information.academic_record_number + ' )'}>
                                                            <div style={{display:'flex', flexDirection:'row'}}>
                                                                {student.Personal_Info.Personal_Information.gender === 'Άρρεν' ?
                                                                <div className='avatar' style={{padding: '30px 20px'}}> 
                                                                    <img src={male_prof} style={{width:'65px', height:'65px', backgroundColor:'hsl(184deg 59.63% 57.48% / 21%)', border:'2px solid hsl(184deg 59.63% 57.48% / 21%)', borderRadius:'50%'}}></img>
                                                                </div>
                                                                :
                                                                <div className='avatar' style={{padding: '30px 20px'}}> 
                                                                    <img src={female_prof} style={{width:'65px', height:'65px', backgroundColor:'hsl(184deg 59.63% 57.48% / 21%)', border:'2px solid hsl(184deg 59.63% 57.48% / 21%)', borderRadius:'50%'}}></img>
                                                                </div>
                                                                }
                                                                <Table style={{marginTop:'1rem'}} striped bordered variant="light">
                                                                    <thead>
                                                                        <tr>
                                                                        <th style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize:'19px', fontWeight:'600', letterSpacing:"1.5px", color:'#fff', alignItems:'center', verticalAlign:'middle', paddingRight:'1rem',verticalAlign:'middle', alignItems:'center'}} colSpan={4}><FaGraduationCap style={{marginRight : '12px', fontSize:'30px', verticalAlign:'middle', color:'#17a2b8', alignItems:'center'}}/>{student.Personal_Info.Personal_Information.last_name + ' ' + student.Personal_Info.Personal_Information.first_name}
                                                                        <OverlayTrigger
                                                                                key='right'
                                                                                placement='top'									
                                                                                overlay={
                                                                                    <Tooltip style={{marginLeft:'0px'}} id={`tooltip-right`}>
                                                                                        <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}><strong style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'}}>Σελίδα Προφίλ</strong></div>
                                                                                    </Tooltip>
                                                                                }
                                                                        ><IconButton style={{display:'flex',justifyContent:'right', marginLeft:'auto', marginTop:'-1.8rem', marginRight:'0rem'}} aria-label="find" color="primary"><FaUser style={{fontSize:'18px', color:'#fff'}} /></IconButton></OverlayTrigger>		
                                                                        </th> 
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>AEM</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student?.Studentship_Info?.General_Information?.academic_record_number}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Όνομα Πατρός</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Personal_Info.Personal_Information.father_FirstName}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Όνομα Μητρός</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Personal_Info.Personal_Information.mother_FirstName}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Ακαδημαϊκή Ταυτότητα</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Personal_Info.Personal_Information.student_identity}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Αριθμός Γενικού Μητρώου</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.general_academic_record_number}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>username</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Personal_Info.Personal_Information.username}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Ακαδημαϊκό Email</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.academic_email}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Εξάμηνο Φοίτησης</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.current_academic_semester}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Περίοδος Φοίτησης</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.current_attendance_period}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Έτος Φοίτησης</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.current_academic_year}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Κατεύθυνση</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{student.Studentship_Info.General_Information.course_program_part}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={2}>
                                                                            <div className='more_info' style={{display:'flex', flexWrap :'wrap', gap:'20px'}}>                                                             
                                                                            {student.Studentship_Info.General_Information.academic_email !== '' ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <MdEmail style={{display:'inline-flex', color: '#17a2b8', fontSize:'18px'}}/>
                                                                                    <div className='website_text' onClick={()=>window.open('https://webmail.uth.gr/login.php')}>{student.Studentship_Info.General_Information.academic_email}</div>
                                                                                </div> 
                                                                            : null}
                                                                            {student.Personal_Info.Student_Address.telephone ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <BsFillTelephoneFill style={{display:'inline-flex', color: '#17a2b8', fontSize:'18px'}}/>
                                                                                    <div className='website_text'>{student.Personal_Info.Student_Address.telephone}</div>
                                                                                </div> 
                                                                            : null}
                                                                            {student.Personal_Info.Student_Address.mobile_phone !== '' ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <FaMobileAlt style={{display:'inline-flex', color: '#17a2b8', fontSize:'18px'}}/>
                                                                                    <div className='website_text'>{student.Personal_Info.Student_Address.telephone}</div>
                                                                                </div>
                                                                            : null}
                                                                            </div> 
                                                                            </th>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table> 
                                                            </div>                                                                                                                       
                                                        </TreeItem> 
                                                        </>                                          
                                                    )
                                                })}                                              
                                            </TreeView>                                                   
                                        </div>

                                    )

                                })}
                               
                            </TabPanel>
                            <TabPanel style={{backgroundColor:'#17a3b80c'}} value={value} index={1} dir={theme.direction}>
                            <Box sx={{ height: 'fit-content', width: 1 }}>
                                <DataGrid                    
                                    columns={columns}
                                    rows={allStudents}
                                    getRowId={(row) => row.username}
                                    slots={{ toolbar: QuickSearchToolbar }} 
                                />
                                </Box>
                            </TabPanel> 
                        </SwipeableViews>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default StudentsListContainer;