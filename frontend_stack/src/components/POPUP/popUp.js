import React from "react"; 
import { Dialog,  DialogTitle, DialogContent, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";

// Icons
import CloseIcon from '@mui/icons-material/Close'; 

// CSS Styles
import '../../styles/components/POPUP/popUp.scss'; 

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding : theme.spacing(2),
        position : 'absolute',
        top : theme.spacing(5),
        display:'flex', 
        width: '80%'
    } 
}))
function PopUp(props) {
    
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles(); 

    return (
        <Dialog className="pop-up" open={openPopup} maxWidth='xl' classes={{ paper : classes.dialogWrapper}}>
            <DialogTitle className="title">
                <div style={{display:"flex", fontWeight:"bold"}}>
                    <Typography variant="h6" component="div" style={{flexGrow:3}}>
                        {title}
                    </Typography>
                    <CloseIcon 
                        className="icon"
                        onClick = {() => setOpenPopup(false)}
                    />
                </div>
            </DialogTitle>
            <DialogContent dividers className="content">
                {children}             
            </DialogContent>
        </Dialog>
    )
}

export default PopUp;