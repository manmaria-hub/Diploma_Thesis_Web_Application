import React, {forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import {Box, Tooltip, IconButton} from '@mui/material';
import {Slide} from "@mui/material"; 
import Dialog from '@mui/material/Dialog'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import professorsResolvers from "../../graphql/resolvers/professors";
import hallsResolvers from "../../graphql/resolvers/halls";

// Icons
import {Delete, Edit, Preview} from '@mui/icons-material';
import ProfessorProfileContainer from "./PROFESSOR_PROFILE/ProfessorProfileContainer";  

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref}/>
})
 
const ListActions = ({params}) => {
    const [openPreview, setOpenPreview] = React.useState(false);

    const handleClickOpenPreview = () => {
        setOpenPreview(true);
    };

    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    const navigate = useNavigate(); 

    // Function to delete professor
    const deleteProfessor = () => { 
		// Delete Last Professor By its Id
		professorsResolvers.delete_professor_by_username(params.id)
		.then(result => {
			console.log(result); 
            window.location.reload();  
		})
		.catch(err=> {
			console.log(err)
		})
		// MAKE OFFICE EMPTY
        if (params.row.ΓΡΑΦΕΙΟ !== "") {
            hallsResolvers.update_professor_owner_office(params.row.ΓΡΑΦΕΙΟ,  '', '')
			.then(result => {
				return(result)
			})
			.catch(err=> {
				console.log(err)
			})
        } 		
	}
    return (
        JSON.parse(localStorage.getItem("userIdentity")).identity === 'ΓΡΑΜΜΑΤΕΙΑ' ?
        <Box>            
            <Tooltip title='Σελίδα Προφίλ'>
                <IconButton onClick={handleClickOpenPreview}>
                    <Preview style={{ fontSize:'20px', color:'#17a2b8'}}/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Επεξεργασία Στοιχείων'>
                <IconButton onClick={() => navigate('/uth-ece_admin/edit_professor', {state : {editUsername: params?.row.username, editAcademicEmail : params?.row.Email}}) }>
                    <Edit  style={{ fontSize:'20px'}}/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Οριστική Διαγραφή'>
                <IconButton onClick={()=> deleteProfessor()}>
                    <Delete  style={{ fontSize:'20px', color:'red'}}/>
                </IconButton>                
            </Tooltip>
            <Dialog
                fullScreen
                open={openPreview}
                onClose={handleClosePreview}
                TransitionComponent={Transition}
            >           
                <AppBar sx={{ position: 'relative', backgroundColor:'#17a2b8'}}>
                    <Toolbar>
                        <IconButton 
                        edge="start"
                        color="inherit"
                        onClick={handleClosePreview}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1}} variant="h6" component="div">
                         {params.row.ΕΠΩΝΥΜΟ + ' ' + params.row.ΟΝΟΜΑ}
                        </Typography>                     
                    </Toolbar>
                </AppBar> 
                <ProfessorProfileContainer profileInfo = {params.row} /> 
            </Dialog>                      
         </Box>
         : 
         <Box>            
            <Tooltip title='Σελίδα Προφίλ'>
                <IconButton onClick={handleClickOpenPreview}>
                    <Preview style={{ fontSize:'20px', color:'#17a2b8'}}/>
                </IconButton>
            </Tooltip>             
            <Dialog
                fullScreen
                open={openPreview}
                onClose={handleClosePreview}
                TransitionComponent={Transition}
            >           
                <AppBar sx={{ position: 'relative', backgroundColor:'#17a2b8'}}>
                    <Toolbar>
                        <IconButton 
                        edge="start"
                        color="inherit"
                        onClick={handleClosePreview}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1}} variant="h6" component="div">
                         {params.row.ΕΠΩΝΥΜΟ + ' ' + params.row.ΟΝΟΜΑ}
                        </Typography>                     
                    </Toolbar>
                </AppBar> 
                <ProfessorProfileContainer profileInfo = {params.row} /> 
            </Dialog> 
         </Box>
    )
}

export default ListActions;