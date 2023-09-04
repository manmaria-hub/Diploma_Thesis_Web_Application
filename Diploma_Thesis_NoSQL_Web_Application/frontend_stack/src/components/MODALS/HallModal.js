import React, { useState } from "react";

// Icons
import {FaRegCheckCircle} from 'react-icons/fa';

// Loader
import Loader from '../../components/LOADERS/loader';

// Hall GraphQL Resolvers
import hallsResolvers from "../../graphql/resolvers/halls";

// CSS Styles
import '../../styles/components/MODAL/hallModal.scss';

const HallModal = ({setShowModal, newHall}) => {   

    // Setting the state variable that determines the loading of the insertion query
    let [loading, setLoading] = useState(false); 
    
    // Call the suitable query to insert the new hall's data into the related collection/table
    if (loading === false) {
        hallsResolvers.add_new_hall(newHall)
            .then(result => {              
                setLoading(true);
            })
            .catch(err=> {
                throw err;
            })
    } 
    return ( 
        <div className="background">
            {!loading ? 
                <Loader/> :
                <div className="ModalWrapper">
                    <FaRegCheckCircle className="modalCheck"/>
                    <div className="text">Μια νέα αίθουσα με κωδικό <span>{newHall.Hall_code}</span> καταχωρήθηκε με επιτυχία στην Ηλεκτρονική Γραμματεία του Τμήματος!</div>
                    <div className="sub_text">Στο εξής η συγκεκριμένη αίθουσα μπορεί να χρησιμοποιηθεί για ανάλογες του τύπου της δραστηριότητες !</div>
                    <button className="OK_button" onClick={()=>{setShowModal(false); window.location.reload(false)}}>Εντάξει</button>
                </div> }
        </div>  
    ) 
    
}

export default HallModal;