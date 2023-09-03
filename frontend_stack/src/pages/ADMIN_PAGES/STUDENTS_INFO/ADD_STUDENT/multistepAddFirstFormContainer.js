import React from 'react'; 

// Components
import FirstMultistepAddForm from './firstMultistepAddForm'; 
import UploadFile from './uploadFile';

//Icons
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
 
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FlakyIcon from '@mui/icons-material/Flaky';

import DoneIcon from '@mui/icons-material/Done';
import CachedIcon from '@mui/icons-material/Cached';
import ClearIcon from '@mui/icons-material/Clear';

// CSS styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/multistepAddFirstFormContainer.scss';

const MultisteAddFirstFormContainer = (props) => {  
    //const [stepRegistration, setStepRegistration] = React.useState('personal_info_form');
    const stepRegistration = 'personal_info_form';
    
    const box1State = 'box1 active';
    const box2State = 'box2';
    const box3State = 'box3';
    
    return (
        //           ************    ADD ONE STUDENT    ************          //
        props.addChoice === 'ONE_STUDENT' ?
            <div className='add_form_component'>
                <div className='add_container'>  
                    <div className={box1State} id='box1'>
                        <PersonIcon className='icon'/>
                        <div className='content'>
                            <ClearIcon className='notComplete' style={{display:'none'}}/>
                            <DoneIcon className='doneComplete' style={{display:'none'}}/>
                            <CachedIcon  className='toProcess' style={{display:'inline'}}/>
                            <hr/>
                            <h3>ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ</h3>
                        </div>
                    </div>
                    <div className={box2State} id='box2'>
                        <SchoolIcon className='icon'/>
                        <div className='content'>
                            <ClearIcon className='notComplete' style={{display:'inline'}}/>
                            <DoneIcon className='doneComplete' style={{display:'none'}}/>
                            <CachedIcon  className='toProcess' style={{display:'none'}}/>
                            <hr/>
                            <h3>ΣΤΟΙΧΕΙΑ ΦΟΙΤΗΣΗΣ</h3>
                        </div>
                    </div>
                    <div className={box3State} id='box3'>
                        <GradingIcon className='icon'/> 
                        <div className='content'>
                            <ClearIcon className='notComplete' style={{display:'inline'}}/>
                            <DoneIcon className='doneComplete' style={{display:'none'}}/>
                            <CachedIcon  className='toProcess' style={{display:'none'}}/>
                            <hr/>
                            <h3>ΟΛΟΚΛΗΡΩΣΗ ΕΓΓΡΑΦΗΣ</h3>
                        </div>
                    </div>
                </div>   
                <div className='form1'>
                    <FirstMultistepAddForm completeForm = {stepRegistration} /* {stepRegistration => setStepRegistration(stepRegistration)}*//>
                </div>   
            </div> :

             //           ************    ADD MORE STUDENTS    ************          //
             <div className='add_form_component'>
             <div className='add_container'>  
                 <div className={box1State} id='box1'>
                     <DriveFolderUploadIcon className='icon' style={{padding:'0.6rem'}}/>
                     <div className='content'>
                         <ClearIcon className='notComplete' style={{display:'none'}}/>
                         <DoneIcon className='doneComplete' style={{display:'none'}}/>
                         <CachedIcon  className='toProcess' style={{display:'inline'}}/>
                         <hr/>
                         <h3>ΕΙΣΑΓΩΓΗ ΑΡΧΕΙΟΥ</h3>
                     </div>
                 </div>
                 <div className={box2State} id='box2'>
                     <FlakyIcon className='icon'/>
                     <div className='content'>
                         <ClearIcon className='notComplete' style={{display:'inline'}}/>
                         <DoneIcon className='doneComplete' style={{display:'none'}}/>
                         <CachedIcon  className='toProcess' style={{display:'none'}}/>
                         <hr/>
                         <h3>ΕΓΚΥΡΟΤΗΤΑ ΣΤΟΙΧΕΙΩΝ</h3>
                     </div>
                 </div>
                 <div className={box3State} id='box3'>
                     <GradingIcon className='icon'/> 
                     <div className='content'>
                         <ClearIcon className='notComplete' style={{display:'inline'}}/>
                         <DoneIcon className='doneComplete' style={{display:'none'}}/>
                         <CachedIcon  className='toProcess' style={{display:'none'}}/>
                         <hr/>
                         <h3>ΟΛΟΚΛΗΡΩΣΗ ΕΓΓΡΑΦΗΣ</h3>
                     </div>
                 </div>
             </div>   
             <div className='form1'> 
                <UploadFile/>
             </div>   
         </div> 
            
    )
}

export default MultisteAddFirstFormContainer;