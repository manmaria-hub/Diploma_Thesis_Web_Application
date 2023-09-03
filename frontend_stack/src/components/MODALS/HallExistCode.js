import React, { useState } from "react";

// Icons
import {IoIosWarning} from 'react-icons/io';

// CSS Styles
import '../../styles/components/MODAL/hallModal.scss';

const HallModal = ({setShowModalCode, setShowModal, newHall}) => {   
 
    return ( 
        <div className="background">
            <div className="ModalWrapper">
                <IoIosWarning className="modalWarning"/>
                <div className="text">To γραφείο με κωδικό <span>{newHall.Hall_code}</span> χρησιμοποείται ήδη από κάποιο μέλος του τμήματος. </div>
                <div className="sub_text"> Αν συνεχίσετε με την καταχώρηση σημαίνει ότι θα συναινείτε στην από κοινού χρήση του γραφείου.</div>
                <div className="buttons">
                    <button className="Cancel_button" onClick={()=>{setShowModalCode(false)}}>Άκυρο</button>
                    <button className="OK_button" onClick={()=>{setShowModalCode(false); setShowModal(true)}}>Συνέχεια</button>
                </div>
            </div> 
        </div>  
    ) 
    
}

export default HallModal;