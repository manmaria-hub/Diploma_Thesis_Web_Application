import React from 'react';

// Icons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/finalCompleteUploading.scss';

const FinalCompleteUploading = (props) => {
    const newRegistrations_num = props.newRegistrations;
    return (
        <div className='complete_container'>
            <div className='card_success'> 
                 <CheckCircleOutlineIcon className='successIcon'/>
                 {newRegistrations_num === 1  ?
                 <div className='text'>Η κοινότητα του τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας υποδέχτηκε {newRegistrations_num} νέο μέλος !</div> :
                 <div className='text'>Η κοινότητα του τμήματος Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Πανεπιστημίου Θεσσαλίας υποδέχτηκε {newRegistrations_num} νέα μέλη !</div> }
            </div>
            {newRegistrations_num === 1  ?
            <div className='input_data'>Τα στοιχεία εγγραφής του {newRegistrations_num} φοιτητή καταχωρήθηκαν με επιτυχία στη Βάση Δεδομένων της Ηλεκτρονικής Γραμματείας του Τμήματος - μετά από την εισαγωγή κατάλληλου csv αρχείου - και πλέον είναι διαθέσιμα προς επεξεργασία.</div> :
            <div className='input_data'>Τα στοιχεία εγγραφής των {newRegistrations_num} φοιτητών καταχωρήθηκαν με επιτυχία στη Βάση Δεδομένων της Ηλεκτρονικής Γραμματείας του Τμήματος - μετά από την εισαγωγή κατάλληλου csv αρχείου - και πλέον είναι διαθέσιμα προς επεξεργασία.</div>}
        </div>
    )
}

export default FinalCompleteUploading;