import React, { useState } from "react";

// Icons
import {FaRegCheckCircle} from 'react-icons/fa';

// Loader
import Loader from '../../components/LOADERS/loader';

// Hall GraphQL Resolvers
import AcademicCalendarResolvers from "../../graphql/resolvers/calendar";

// CSS Styles
import '../../styles/components/MODAL/hallModal.scss';

const HallModal = ({setShowModal, calendarToInsert , academicYear}) => {   

    // Setting the state variable that determines the loading of the insertion query
    let [loading, setLoading] = useState(false); 
    
    // Call the suitable query to insert the new hall's data into the related collection/table
    if (loading === false) {
        calendarToInsert.forEach((_, index) => {
            AcademicCalendarResolvers.create_academic_calendar(calendarToInsert[index])
            .then(result => {
                console.log(result);
                setLoading(true)
            })
            .catch(err=> {
                throw err;
            })
        })
    } 
    let studyLevel = 'Π.Π.Σ';
    if (calendarToInsert[0].study_level === 'ΜΕΤΑΠΤΥΧΙΑΚΟ') {
        studyLevel = 'Π.Μ.Σ';
    }
    else {
        studyLevel = 'Π.Π.Σ';
    }
    return ( 
        <div className="background">
            {!loading ? 
                <Loader/> :    
                studyLevel === 'Π.Μ.Σ' ?         
                <div className="ModalWrapper">                
                    <FaRegCheckCircle className="modalCheck"/>                  
                    <div className="text">Το Ακαδημαϊκό Ημερολόγιο <span>{studyLevel}</span> του ακαδημαϊκού έτους <span>{academicYear}</span> για τα {calendarToInsert.length} προγράμματα Μεταπτυχιακών Σπουδών καταχωρήθηκε με επιτυχία στην Ηλεκτρονική Γραμματεία του Τμήματος!</div>
                  
                    <button className="OK_button" onClick={()=>{setShowModal(false); window.location.reload(false)}}>Εντάξει</button> 
                </div> : 
                <div className="ModalWrapper">                
                    <FaRegCheckCircle className="modalCheck"/>                  
                    <div className="text">Το Ακαδημαϊκό Ημερολόγιο <span>{studyLevel}</span> του ακαδημαϊκού έτους <span>{academicYear}</span> καταχωρήθηκε με επιτυχία στην Ηλεκτρονική Γραμματεία του Τμήματος!</div>
                    <div className="sub_text">Στο εξής μπορείτε να επεξεργαστείτε το συγκεκριμένο Ακαδημαϊκό Ημερολόγιο !</div> 
                    <button className="OK_button" onClick={()=>{setShowModal(false); window.location.reload(false)}}>Εντάξει</button> 
            </div>                
                }
        </div>  
    ) 
    
}

export default HallModal;