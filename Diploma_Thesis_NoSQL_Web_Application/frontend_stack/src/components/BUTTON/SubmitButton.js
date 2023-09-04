import React, { useState } from 'react';

// Icons 
import PublishIcon from '@mui/icons-material/Publish';

// CSS Styles
import '../../styles/components/BUTTONS/SubmitButton.scss';

const SubmitButton = (props) => {
    const [addCourseButton, setAddCourseButton] = useState('addCourseButton')
    return( 
        <div>
            {props.button === 'submitButton' ?
            <div className='SubmitButtons'>
                <button className={addCourseButton} onClick={()=> setAddCourseButton('addCourseButton active')}>
                    <span className='iconButton'><PublishIcon/></span>
                    <span className='textButton'>Εισαγωγή</span>
                </button>
            </div> : 
            props.button === 'simpleCancelButton' ?
                <button className="cancel_btn">Άκυρο</button> :
            props.button === 'simpleSubmitButton' ?
                <button className="submit_btn">Εισαγωγή</button>  : null              
            }
        </div>
    )
}

export default SubmitButton;