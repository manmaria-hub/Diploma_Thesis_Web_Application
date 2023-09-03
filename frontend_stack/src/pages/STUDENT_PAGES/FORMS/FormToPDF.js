import React from 'react';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake'

// Icons
import UTH_LOGO_FORM from '../../../../src/Icons/transparentLogo.jpg';

// CSS Styles
import '../../../../src/styles/pages/STUDENT_PAGES/FORMS/formToPdf.scss'


const FormToPDF = (props) => {
    // Variable that stores the created pdf file
    let pdfFile = null; 
    console.log(props)    
    let formType = '';
    // Determine the type of form 
    if (props.formKind === 'Αίτηση Γενική Φοιτητών Προπτυχιακού Προγράμματος Σπουδών') {
        formType = 'ΑΙΤΗΣΗ'
    }

    // Determine the current Date
    const currDate = new Date(); 
    const currDay = currDate.getDate()   
    const currMonth = currDate.getMonth() + 1;       // Get current month (to determine the current academic semester and year)
    const currYear = currDate.getFullYear();    
    
    const u = () => {
    const pdfTable = document.getElementById('mydoc')
    html2canvas(pdfTable).then(function (canvas) {
        const imgObj = {
        image: canvas.toDataURL(),        
        style: {
            size : '0.1',
            alignment: "center"
        }
        };
        const documentDefinition = {
        content: [imgObj], 
        pageSize: "A0",  
        };
        let pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        console.log(pdfDocGenerator, 'ooo')
        pdfFile =  pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download();
    })
    }
    return(
    <div className="main_form2">
        <div className='insider_form'  id="mydoc">
            <div className="main_form_header">
                <div className="department_greek">
                    <div className="university">ΠΑΝΕΠΙΣΤΗΜΙΟ ΘΕΣΣΑΛΙΑΣ</div>
                    <div className="deprtment_first">ΤΜΗΜΑ ΗΛΕΚΤΡΟΛΟΓΩΝ ΜΗΧΑΝΙΚΩΝ</div>
                    <div className="deprtment_first">ΚΑΙ ΜΗΧΑΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ</div>
                </div> 
                <img className="form_logo" src={UTH_LOGO_FORM} alt = ""/>
                <div className="department_eng">
                    <div className="university">UNIVERSITY OF THESSALY</div>
                    <div className="deprtment_first">DEPARTMENT OF COMPUTER</div>
                    <div className="deprtment_first">AND ELECTRICAL ENGINEERING</div>                            
                </div>
            </div>
            <div className="academic_year">ΑΚΑΔΗΜΑΪΚΟ ΕΤΟΣ <p>{props.academicYear}</p></div>
            <div className="form_container">
                <div className="StudentInfo"> 
                    <div className="main_form_title">{formType}</div>
                    <div className='form'>
                        <div className='group'>
                            <label>ONOMA : </label>
                            <div className='data'>{props.data.first_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΕΠΩΝΥΜΟ : </label>
                            <div className='data'>{props.data.last_name}</div>
                        </div>
                        <div className='group'>
                            <label>ΟΝ. ΠΑΤΡΟΣ: </label>
                            <div className='data'>{props.data.father_FirstName}</div>
                        </div>
                        <div className='group'>
                            <label>AEM:</label>
                            <div className='data'>{props.data.AEM}</div>
                        </div> 
                        <label style={{fontSize:'16px', marginBottom: '0.2rem'}}>Δ/ΝΣΗ ΚΑΤΟΙΚΙΑΣ (κατά προτίμηση Βόλου) :</label>
                        <div className='group'>
                            <label>ΟΔΟΣ:</label>
                            <div className='data'>{props.data.road}</div>
                        </div>
                        <div className='group'>
                            <label>ΠΟΛΗ:</label>
                            <div className='data'>{props.data.city}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΚ:</label>
                            <div className='data'>{props.data.postcode}</div>
                        </div>
                        <div className='group'>
                            <label>ΤΗΛ:</label>
                            <div className='data'>{props.data.telephone}</div>
                        </div>
                        <div className='group'>
                            <label>ΚΙΝΗΤΟ ΤΗΛ (προαιρετικό) :</label>
                            <div className='data'>{props.data.mobile_phone}</div>
                        </div>
                        <div className='group'>
                            <label>email :</label>
                            <div className='data'>{props.data.email}</div>
                        </div>
                    </div>
                    <div className='date'>
                        {'Βόλος ,  ' + ' ' + currDay + ' / ' + currMonth + ' / ' + currYear }                            
                    </div>
                </div>
                <div className="FormInfo"> 
                    <div className="to_title">Προς :</div>
                    <div className="depart">Την Γραμματεία του Τμήματος <span>  Ηλεκτρολόγων <br></br>  Μηχανικών και Μηχανικών Υπολογιστών   </span> <br></br> του  Πανεπιστημίου  Θεσσαλίας  </div>
                    <div className='formInput2'>
                        <div className='title2'> Αιτούμαι :</div>
                        <div className='form_content'>{props.data.formInput}</div>
                        <div className="signature">
                            <div className='sign_name'>{props.sex === 'Κα' ? 'Η Αιτούσα' : 'Ο Αιτών'}</div>
                            <img src={props.signature} alt='' className='main_sign'></img>                                
                        </div>
                    </div>
                </div>
            </div>                
        </div>
       <button onClick={u}>save</button>
       {u()}
    </div>)
 
}

export default FormToPDF;