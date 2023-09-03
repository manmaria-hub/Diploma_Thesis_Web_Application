import React, {forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import {Box, Tooltip, IconButton, Button} from '@mui/material';
import {Slide} from "@mui/material";
 
// Icons
import {Delete, Edit, Preview} from '@mui/icons-material'; 

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref}/>
})
 
const StudentsListActions = ({params}) => {
    const [openPreview, setOpenPreview] = React.useState(false);

    const handleClickOpenPreview = () => {
        setOpenPreview(true);
    };

    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    const navigate = useNavigate();
     console.log(params)
    return (
        <Box>
            <Tooltip title='Σελίδα Προφίλ'>
                <IconButton onClick={handleClickOpenPreview}>
                    <Preview style={{ fontSize:'20px', color:'#17a2b8'}}/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Επεξεργασία Στοιχείων'>
                <IconButton onClick={() => navigate('/uth-ece_admin/edit_student', {state : {editUsername: params.row.username}}) }>
                    <Edit  style={{ fontSize:'20px'}}/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Οριστική Διαγραφή'>
                <IconButton onClick={()=> {}}>
                    <Delete  style={{ fontSize:'20px', color:'red'}}/>
                </IconButton>
            </Tooltip> 
         </Box>
    )
}

export default StudentsListActions;