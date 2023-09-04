import React , {useState, useEffect} from 'react';

// Components
import SecondMultistepAddForm from './secondMultistepAddForm';
import ValidateInputFromFile from './validateInputFromFile';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import CachedIcon from '@mui/icons-material/Cached';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FlakyIcon from '@mui/icons-material/Flaky';

// CSS styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/multistepAddSecondFormContainer.scss' 
import { useLocation } from 'react-router-dom';

function MultisteAddSecondFormContainer (props) {
    const location = useLocation();  

    const [stepRegistration, setStepRegistration] = React.useState('student_info_form');
 
    const [box1State, setBox1State] = useState('box1 active');
    const [box2State, setBox2State] = useState('box2');
    const [box3State, setBox3State] = useState('box3');
    
    useEffect(() => {         
        const changeFormState = () =>  {

            if (stepRegistration === 'student_info_form') {
                setBox1State('box1'); 
                setBox2State('box2 active');

                // Change State Icon
                document.getElementById('box1').getElementsByClassName('doneComplete')[0].style.display = 'inline';
                document.getElementById('box1').getElementsByClassName('doneComplete')[0].style.color= 'hsl(128, 85%, 56%)';                  
                document.getElementById('box1').getElementsByClassName('toProcess')[0].style.display = 'none';

                document.getElementById('box2').getElementsByClassName('notComplete')[0].style.display = 'none';
                document.getElementById('box2').getElementsByClassName('toProcess')[0].style.display = 'inline';

                // Change Form 
                //document.getElementsByClassName('form1')[0].style.display = 'none';       
            }
            if (stepRegistration === 'complete_registration_form') {
                setBox1State('box1');
                setBox2State('box2');
                setBox3State('box3 active'); 
            }
        }
        changeFormState();
        console.log(stepRegistration)
    }, [stepRegistration])

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
                <div className='form2'>
                    <SecondMultistepAddForm  completeForm = {stepRegistration => setStepRegistration(stepRegistration)}/>
                </div>   
            </div> :
            //           ************    ADD MANY STUDENTS    ************          //
            <div className='add_form_component'>
                <div className='add_container'>  
                    <div className={box1State} id='box1'>
                        <DriveFolderUploadIcon className='icon'/>
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
                <div className='form2'>
                     <ValidateInputFromFile file={location.state}/>
                </div>   
            </div>
    )

}

export default MultisteAddSecondFormContainer;