import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import UTH_LOGO from '../../../Icons/uth-logo-background.png';
import PROFESSORS from '../../../Icons/PROFESSORS/faculty.png';
import male_prof from '../../../Icons/male_professor.png';
import female_prof from '../../../Icons/female_prof.png';
import {FaListUl, FaSearch, FaUser, FaFilePdf, FaGraduationCap} from 'react-icons/fa';  
import {HiLink} from 'react-icons/hi';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditIcon from '@mui/icons-material/Edit';
import {BiExport} from 'react-icons/bi';

// Components
import ListActions from '../ListActions';
import Login from '../../../../src/components/LOGIN'

// GraphQL Resolvers
import ProfessorResolvers from'../../../../src/graphql/resolvers/professors';

// CSS Styles
import '../../../../src/styles/pages/FOR_ALL_PAGES/PROFESSOR_INFO/professorListContainer.scss'; 



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

const ProfessorListContainer = () => {
    // State Variable that stores the professor data by groups
    let [professorsGroupBy, setProfessorsGroupBy] = useState(null);

    // State Variable that stores all database's professors for search filter
    let [allProfessors, setAllProfessors] = useState(null);    
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

    // Using the suitable query to get all professors group by professor type
    if (professorsGroupBy === null ) {
        ProfessorResolvers.get_all_professors_group_by_professor_type()
            .then(result => {
                //console.log(result);
                setProfessorsGroupBy(result?.data?.getAllProfessorsByGroup);
            })        
            .catch(error=> {
                console.log(error);
                throw error;
            })
    }

    useEffect(() => {
     // Using the suitable query to get all database's professors for filter search
     if (allProfessors === null ) {
        ProfessorResolvers.get_all_professors()
            .then(result => { 
                let prof_array = [];
                let prof_EXCEL_array = [];
                result?.data?.getAllProfessors.forEach((prof, index) => {
                    prof_array.push({
                        'ΕΠΩΝΥΜΟ' : prof.PERSONAL_INFO.last_name,
                        'ΟΝΟΜΑ' : prof.PERSONAL_INFO.first_name,
                        'username' : prof.ACADEMIC_INFO.username,
                        'ΤΥΠΟΣ' : prof.ACADEMIC_INFO.professor_type,
                        'ΚΑΤΗΓΟΡΙΑ' : prof.ACADEMIC_INFO.category,
                        'Email' : prof.ACADEMIC_INFO.academic_email,
                        'ΓΡΑΦΕΙΟ': prof.ACADEMIC_INFO.office,
                        'ΤΗΛΕΦΩΝΟ': prof.ACADEMIC_INFO.office_telephone,
                        'ΕΝΕΡΓΟΣ' : prof.PERSONAL_INFO.active
                    })

                    prof_EXCEL_array.push({
                        id : index + 1,  
                        'ΕΠΩΝΥΜΟ' : prof.PERSONAL_INFO.last_name,
                        'ΟΝΟΜΑ' : prof.PERSONAL_INFO.first_name,
                        'username' : prof.ACADEMIC_INFO.username,
                        'ΤΥΠΟΣ' : prof.ACADEMIC_INFO.professor_type,
                        'ΚΑΤΗΓΟΡΙΑ' : prof.ACADEMIC_INFO.category,
                        'Email' : prof.ACADEMIC_INFO.academic_email,
                        'ΓΡΑΦΕΙΟ': prof.ACADEMIC_INFO.office,
                        'ΤΗΛΕΦΩΝΟ': prof.ACADEMIC_INFO.office_telephone,
                        'ΕΝΕΡΓΟΣ' : prof.PERSONAL_INFO.active === true ? 'NAI' : 'OXI'                                               
                    })
                })                 
                setExcelData(prof_EXCEL_array)
                setAllProfessors(prof_array);
            })        
            .catch(error=> {
                console.log(error);
                throw error;
            })
    }
        }, [])

   
      const connectedUser = localStorage.getItem('identity');
    
      // Otherwise filter will be applied on fields such as the hidden column id
      const columns = useMemo(() => [
        {field : 'ΕΝΕΡΓΟΣ', headerName : 'ΕΝΕΡΓΟΣ ?', width: 120, type: 'boolean', editable:false},
        {field : 'ΕΠΩΝΥΜΟ', headerName:'ΕΠΩΝΥΜΟ',  width: 150},
        {field : 'ΟΝΟΜΑ', headerName:'ΟΝΟΜΑ',  width: 150},
        {field : 'username', headerName:'username',  width: 150},
        {field : 'ΤΥΠΟΣ', headerName:'ΤΥΠΟΣ',  width: 150},
        {field : 'ΚΑΤΗΓΟΡΙΑ', headerName:'ΚΑΤΗΓΟΡΙΑ',  width: 150},
        {field : 'Email', headerName:'ΚΑΤΗΓΟΡΙΑ',  width: 150},
        {field : 'ΓΡΑΦΕΙΟ', headerName:'ΓΡΑΦΕΙΟ',  width: 60},
        {field : 'ΤΗΛΕΦΩΝΟ', headerName:'ΤΗΛΕΦΩΝΟ',  width: 150}, 
        {field : 'ΕΝΕΡΓΕΙΕΣ', headerName:'ΕΝΕΡΓΕΙΕΣ',  width: 150, renderCell : (params) => <ListActions{...{params}}/>}
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
        XLSX.utils.book_append_sheet(wb, ws, 'Διδακτικό_Προσωπικό');
        XLSX.writeFile(wb, 'Διδακτικό_Προσωπικό.xlsx');
    }

    // Setting actions for speed dial
    const actions = [
        { icon: <BiExport onClick={() => exportDataToExcelFile()} style={{color:'green', fontSize:'20px'}} />, name: 'Εξαγωγή δεδομένων' } 
    ];

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=> {
        if (token === null) {  
            navigate("/login", {state : {alert:true}})
        }
    })

    return (
        <>
        {token !== 'null' ?
        <div className="submit_main">
            <div className="scroll">
                <div className="header">
                    <div className="text_header"><img src={PROFESSORS} alt='' /></div>
                    <div className="title"> Διδακτικό Προσωπικό 
                        <p>Καθηγητές - Μέλη ΕΔΙΠ - Συμβασιούχοι - Συνεργαζόμενοι Διδάσκοντες </p>
                    </div>
                    <div className="header_area"> 
                        <div className="logo"><img src={UTH_LOGO} alt='' /></div>
                    </div>
                </div>
                <div className="forms_container">
                    <div className="text">Το προσωπικό του Πανεπιστημίου διακρίνεται στις εξής κατηγορίες: Διδακτικό Ερευνητικό Προσωπικό (Δ.Ε.Π.), Εργαστηριακό Διδακτικό Προσωπικό (Ε.ΔΙ.Π.), Ειδικό Εκπαιδευτικό Προσωπικό (Ε.Ε.Π), Μη διδάκτορες Βοηθοί και Συνεργαζόμενοι Διδάσκοντες, Διδάσκοντες του Π.Δ. 407/80, Ειδικό Τεχνικό Εργαστηριακό Προσωπικό (Ε.Τ.Ε.Π.) και Διοικητικό Προσωπικό. Στη συνέχεια της παρούσας σελίδας μπορείτε να δείτε <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontWeight:'700', display:'inline-flex', marginLeft:'4px', marginRight:'4px'}}>μία λίστα του συνόλου του Διδακτικού Προσωπικού του τμήματος</strong> ανά κατηγορία. Επιπλέον, επιλέγοντας το κατάλληλο tab σας δίνεται <strong style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', color:'#17a2b8', fontWeight:'700', display:'inline-flex', marginLeft:'4px', marginRight:'4px'}}>η δυνατότητα αναζήτησης καθηγητή ή καθηγητών</strong> σύμφωνα με τα κριτήρια της επιλογής σας.</div>           
                </div> 
                <div className='root'>
				    <h1 className="main_title">Κατάλογος Διδασκόντων</h1>
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
                                <Tab style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textTransform:'none'}}  icon={<FaListUl style={{fontSize:'23px', marginBottom:'0.5rem'}}/>} label="Λίστα Διδασκόντων" {...a11yProps(0)} />
                                <Tab style={{fontSize:'20px', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', textTransform:'none'}} icon={<FaSearch style={{fontSize:'25px', marginBottom:'0.5rem'}}/>} label="Αναζήτηση Διδάσκοντα" {...a11yProps(1)} /> 
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel style={{backgroundColor:'#17a3b80c'}} value={value} index={0} dir={theme.direction}>       
                                {professorsGroupBy && professorsGroupBy.length > 0 && professorsGroupBy.map((item, index) => {

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
                                                {item.professors.map((prof, inIndex) => {
                                                    return (
                                                        <>                                                    
                                                        <TreeItem key ={inIndex} nodeId={prof.PERSONAL_INFO.first_name} label={ prof.PERSONAL_INFO.last_name + ' ' + prof.PERSONAL_INFO.first_name}>
                                                            <div style={{display:'flex', flexDirection:'row'}}>
                                                                {prof.PERSONAL_INFO.gender === 'Άρρεν' ?
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
                                                                        <th style={{fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize:'19px', fontWeight:'600', letterSpacing:"1.5px", color:'#fff', alignItems:'center', verticalAlign:'middle', paddingRight:'1rem',verticalAlign:'middle', alignItems:'center'}} colSpan={4}><BusinessCenterIcon style={{marginRight : '12px', verticalAlign:'middle', color:'#17a2b8', alignItems:'center'}}/>{prof.PERSONAL_INFO.last_name + ' ' + prof.PERSONAL_INFO.first_name}
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
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Κατηγορία</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.professor_type}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Γνωστικό Αντικείμενο</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.specialization}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Δίπλωμα</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.diploma}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Διδακτορικό</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.doctorat}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Γραφείο</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.office === '' ? '-' : prof.ACADEMIC_INFO.office}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Ώρες Γραφείου</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.office_hours === '' ? '-' : prof.ACADEMIC_INFO.office_hours}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Τηλέφωνο</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.office_telephone}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{backgroundColor:'#f1f1f1', border:'1px solid #dfe0e1', borderLeft:'3px solid #f1a817', 
                                                                                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#117587'}}>Email</td>
                                                                            <td style={{backgroundColor:'#fff', border:'1px solid #dfe0e1', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight:'500', fontSize:'14px', color:'#6a6a6a'}}>{prof.ACADEMIC_INFO.office_email}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={2}>
                                                                            <div className='more_info' style={{display:'flex', flexWrap :'wrap', gap:'20px'}}>                                                             
                                                                            {prof.ACADEMIC_INFO.website !== '' ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <HiLink style={{display:'inline-flex', color: '#17a2b8'}}/>
                                                                                    <div className='website_text' onClick={()=>window.open(prof.ACADEMIC_INFO.website)}>Ιστοσελίδα</div>
                                                                                </div>
                                                                            : null}
                                                                            {prof.ACADEMIC_INFO.CV !== '' && prof.ACADEMIC_INFO.CV.endsWith('.pdf') ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <FaFilePdf style={{display:'inline-flex', color: '#17a2b8'}}/>
                                                                                    <div className='website_text' onClick={()=>window.open(prof.ACADEMIC_INFO.CV)}>CV</div>
                                                                                </div>
                                                                            : null}
                                                                            {prof.ACADEMIC_INFO.scholar !== '' ?
                                                                                <div className='website_info' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'4px'}}>
                                                                                    <FaGraduationCap style={{display:'inline-flex', color: '#17a2b8', fontSize:'18px'}}/>
                                                                                    <div className='website_text' onClick={()=>window.open(prof.ACADEMIC_INFO.scholar)}>Google Scholar</div>
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
                                    rows={allProfessors}
                                    getRowId={(row) => row?.username}
                                    slots={{ toolbar: QuickSearchToolbar }} 
                                />
                                </Box>
                            </TabPanel> 
                        </SwipeableViews>
                    </Box>
                </div>
            </div>
        </div> : <Login></Login>}
        </>     
    )
}

export default ProfessorListContainer;