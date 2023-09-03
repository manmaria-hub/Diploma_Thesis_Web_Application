import React, {useEffect, useState } from "react";  
// GraphQL Resolvers
import studentResolvers from "../../../../graphql/resolvers/student";
import PageLoader from "../../../../components/LOADERS/loader";
import FinalCompleteUploading from "./finalCompleteUploading";

// CSS Styles
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/completeUploading.scss';  

const CompleteUploading = (props) => { 

    // Handling the input data of the new student getting from the uploading valid csv file in the previous step
    const newStudents = props.students;
    
    // Determine the state array for the new students information
    const [student, setStudent] = useState([]);   

    // Determine the state variable for the current situation of input data uploading to database
    //  * Print Loader Page during the implementation of the INSERT query
    //  * Print the Success Page when the INSERT query has been completed an the data of the new students
    //    have been inserted to the database
    const [currentPage, setCurrentPage] = useState('loader');

     // Student Personal Information
     let Personal_Information = {last_name:"-", first_name:"-", dot_father_name:"-", father_FirstName:"-", father_LastName:"-", 
                                maiden_name :"-", mother_FirstName:"-", mother_LastName:"-", spouse_name:"-", profession:"-",
                                mother_profession:"-", father_profession:"-", family:"-", username:"-", personal_title:"-", 
                                website:"-", student_identity:"-", active:"-", fulfilled_military_obligations:"-", sex:"-", notations:"-"};

    // Student Insurance Information 
    let Student_Insurance = {AMKA:"-" , AFM:"-" , DOY:"-" , AMKA_country:"-" ,  AFM_country:"-"}; 

    // Student Birth Information
    let Birth_Details = {birth_date:"-", gender:"-", birth_prefecture:"-", birth_country:"-", birth_location:"-"};

    // Student Identity Information
    let Student_Identity = {identity_type:"-", citizenship:[], citizen:"-", identity_number:"-", citizen_number:"-", published_principle:"-",
                            publish_date:"-", nationality: [], nationality_second:[], male_record_num:"-", male_record_perf:"-", male_record_gr:"-",
                            male_record_loc:"-"};

    // Student Address Information 
    let Student_Address = {road:"-", rd_number:"-", city:"-", location:"-", country:"-", acting_address:"-", postcode:"-", telephone:"-", mobile_phone:"-", 
                           uth_email:"-", alternative_email:"-"};

    // Student Third Person Contact Information
    let Third_Person_Contact_Details = {contact_type:"-", person_FirstName:"-", person_LastName:"-", person_address:"-", person_telephone:"-", 
                                        person_mobilephone:"-", person_email:"-"};

    // Studenship General Information
    let General_Information = {department:"-", department_number:"-", course:"-", course_number:"-", academic_email:"-", student_situation:"-", 
                                 current_academic_year:0, current_academic_semester:0, current_attendance_period:"-", academic_record_number:"-", 
                                 general_academic_record_number:"-", academic_identity:"-", course_program_part:"-", course_program_subpart:"-", 
                                 education_number:0, second_course_program_part:"-", second_course_program_subpart:"-", comment_to_student:"-", 
                                 total_fees:"-", sub_attendance:"-"};

    // Student Registration Information
    let Registration_Details = {registration_year:0, registration_semester:0, registration_period:"-", registration_way:"-"};

    // Professor Advisor Information
    let Professor_Advisor_Details = {professorAdvisor_FirstName:"-", professorAdvisor_LastName:"-", professorAdvisor_Email:"-"};
                                        
    // Determine the sub-groups of the first group 'Personal_Information'
    let Personal_Info =  {Student_Insurance, Personal_Information, Birth_Details, Student_Identity, Student_Address, Third_Person_Contact_Details}; 

    // Determine the sub-groups of the second group 'Studenship_Information'
    let Studentship_Info = {General_Information, Registration_Details, Professor_Advisor_Details};

    // For each new student determine the two groups of input data
    let newStudent = {Personal_Info, Studentship_Info};

    // Before processing the array of Registrations data, remove the last invalid registration from this
    newStudents.splice(-1);
    
    // After the updating of the array that stores the new Students data, we parse it to create the 
    // suitable objects of each student input. We store the new valid - for the implementation of INSERT 
    // query - students' information in the above state variable array 
    let doco = [];
    newStudents.forEach((newRegistration) => {
      
        // Because the data of a csv file are strings, we convert many of the fields to the suitable types (Number or Arrays)
        let currItem = ''; 
        // Citizenship Field -> to Array
        currItem = newRegistration['Personal_Info.Student_Identity.citizenship']  // Store the interested item 
        const citizenshipArray = currItem.split(",")    // Creation of the array that contains the list of student's citizenships
        console.log(citizenshipArray);

        // Nationality Field -> to Array
        currItem = newRegistration['Personal_Info.Student_Identity.nationality']  // Store the interested item 
        const nationalityArray = currItem.split(",")    // Creation of the array that contains the list of student's nationalities
        console.log(nationalityArray);

        // Nationality Second Field -> to Array
        currItem = newRegistration['Personal_Info.Student_Identity.nationality_second']  // Store the interested item
        const nationalitSecondyArray = currItem.split(",")    // Creation of the array that contains the list of student's second nationalities 
        console.log(nationalitSecondyArray);

        
        // Student Personal Information 
        Personal_Information = {
            last_name: newRegistration['Personal_Info.Personal_Information.last_name'], 
            first_name: newRegistration['Personal_Info.Personal_Information.first_name'], 
            dot_father_name:newRegistration['Personal_Info.Personal_Information.dot_father_name'], 
            father_FirstName: newRegistration['Personal_Info.Personal_Information.father_FirstName'], 
            father_LastName:newRegistration['Personal_Info.Personal_Information.father_LastName'], 
            maiden_name : newRegistration['Personal_Info.Personal_Information.maiden_name'], 
            mother_FirstName: newRegistration['Personal_Info.Personal_Information.mother_FirstName'], 
            mother_LastName: newRegistration['Personal_Info.Personal_Information.mother_LastName'], 
            spouse_name: newRegistration['Personal_Info.Personal_Information.spouse_name'], 
            profession: newRegistration['Personal_Info.Personal_Information.profession'],
            mother_profession: newRegistration['Personal_Info.Personal_Information.mother_profession'], 
            father_profession: newRegistration['Personal_Info.Personal_Information.father_profession'], 
            family: newRegistration['Personal_Info.Personal_Information.family'], 
            username: newRegistration['Personal_Info.Personal_Information.family'], 
            personal_title: newRegistration['Personal_Info.Personal_Information.personal_title'], 
            website: newRegistration['Personal_Info.Personal_Information.website'], 
            student_identity: newRegistration['Personal_Info.Personal_Information.student_identity'], 
            active: newRegistration['Personal_Info.Personal_Information.active'], 
            fulfilled_military_obligations: newRegistration['Personal_Info.Personal_Information.last_name'], 
            sex: newRegistration['Personal_Info.Personal_Information.last_name'], 
            notations: newRegistration['Personal_Info.Personal_Information.notations']};

        // Student Insurance Information 
        Student_Insurance = {
            AMKA: newRegistration['Personal_Info.Student_Insurance.AMKA'],
            AFM: newRegistration['Personal_Info.Student_Insurance.AFM'], 
            DOY: newRegistration['Personal_Info.Student_Insurance.DOY'], 
            AMKA_country: newRegistration['Personal_Info.Student_Insurance.AMKA_country'],  
            AFM_country: newRegistration['Personal_Info.Student_Insurance.AFM_country']}; 

        // Student Birth Information
        Birth_Details = {
            birth_date: newRegistration['Personal_Info.Birth_Details.birth_date'], 
            gender: newRegistration['Personal_Info.Birth_Details.gender'], 
            birth_prefecture: newRegistration['Personal_Info.Birth_Details.birth_prefecture'], 
            birth_country: newRegistration['Personal_Info.Birth_Details.birth_country'], 
            birth_location: newRegistration['Personal_Info.Birth_Details.birth_location']};

        // Student Identity Information
        Student_Identity = {
            identity_type: newRegistration['Personal_Info.Student_Identity.identity_type'],
            citizenship: citizenshipArray, 
            citizen: newRegistration['Personal_Info.Student_Identity.citizen'], 
            identity_number: newRegistration['Personal_Info.Student_Identity.identity_number'], 
            citizen_number: newRegistration['Personal_Info.Student_Identity.citizen_number'], 
            published_principle: newRegistration['Personal_Info.Student_Identity.published_principle'],
            publish_date: newRegistration['Personal_Info.Student_Identity.publish_date'], 
            nationality: nationalityArray, 
            nationality_second: nationalitSecondyArray, 
            male_record_num: newRegistration['Personal_Info.Student_Identity.male_record_num'], 
            male_record_perf: newRegistration['Personal_Info.Student_Identity.male_record_perf'], 
            male_record_gr: newRegistration['Personal_Info.Student_Identity.male_record_gr'],
            male_record_loc: newRegistration['Personal_Info.Student_Identity.male_record_loc']};
    
        // Student Address Information 
        Student_Address = {
            road: newRegistration['Personal_Info.Student_Address.road'],
            rd_number: newRegistration['Personal_Info.Student_Address.rd_number'], 
            city: newRegistration['Personal_Info.Student_Address.city'], 
            location: newRegistration['Personal_Info.Student_Address.location'], 
            country: newRegistration['Personal_Info.Student_Address.country'], 
            acting_address: newRegistration['Personal_Info.Student_Address.acting_address'], 
            postcode: newRegistration['Personal_Info.Student_Address.postcode'], 
            telephone: newRegistration['Personal_Info.Student_Address.telephone'], 
            mobile_phone: newRegistration['Personal_Info.Student_Address.mobile_phone'], 
            uth_email: newRegistration['Personal_Info.Student_Address.uth_email'], 
            alternative_email: newRegistration['Personal_Info.Student_Address.alternative_email']};

        // Student Third Person Contact Information
        Third_Person_Contact_Details = {
            contact_type: newRegistration['Personal_Info.Third_Person_Contact_Details.contact_type'],
            person_FirstName: newRegistration['Personal_Info.Third_Person_Contact_Details.person_FirstName'], 
            person_LastName: newRegistration['Personal_Info.Third_Person_Contact_Details.person_LastName'], 
            person_address: newRegistration['Personal_Info.Third_Person_Contact_Details.person_address'], 
            person_telephone: newRegistration['Personal_Info.Third_Person_Contact_Details.person_telephone'], 
            person_mobilephone: newRegistration['Personal_Info.Third_Person_Contact_Details.person_mobilephone'], 
            person_email: newRegistration['Personal_Info.Third_Person_Contact_Details.person_email']};

        // Studenship General Information
        General_Information = {
            department: newRegistration['Studentship_Info.General_Information.department'],              
            department_number: newRegistration['Studentship_Info.General_Information.department_number'],
            course: newRegistration['Studentship_Info.General_Information.course'],
            course_number: newRegistration['Studentship_Info.General_Information.course_number'],
            academic_email: newRegistration['Studentship_Info.General_Information.academic_email'],
            student_situation: newRegistration['Studentship_Info.General_Information.student_situation'],
            current_academic_year: Number(newRegistration['Studentship_Info.General_Information.current_academic_year']),
            current_academic_semester: (newRegistration['Studentship_Info.General_Information.current_academic_semester']),
            current_attendance_period: newRegistration['Studentship_Info.General_Information.current_attendance_period'],
            academic_record_number: newRegistration['Studentship_Info.General_Information.academic_record_number'],
            general_academic_record_number: newRegistration['Studentship_Info.General_Information.general_academic_record_number'],
            academic_identity: newRegistration['Studentship_Info.General_Information.academic_identity'],
            course_program_part: newRegistration['Studentship_Info.General_Information.course_program_part'],
            course_program_subpart: newRegistration['Studentship_Info.General_Information.course_program_subpart'],
            education_number: (newRegistration['Studentship_Info.General_Information.education_number']),
            second_course_program_part: newRegistration['Studentship_Info.General_Information.second_course_program_part'],
            second_course_program_subpart: newRegistration['Studentship_Info.General_Information.second_course_program_subpart'],
            comment_to_student: newRegistration['Studentship_Info.General_Information.comment_to_student'],
            total_fees: newRegistration['Studentship_Info.General_Information.total_fees'],
            sub_attendance: newRegistration['Studentship_Info.General_Information.sub_attendance']};

        // Student Registration Information
        Registration_Details = {
            registration_year: (newRegistration['Studentship_Info.Registration_Details.registration_year']), 
            registration_semester: (newRegistration['Studentship_Info.Registration_Details.registration_semester']), 
            registration_period: newRegistration['Studentship_Info.Registration_Details.registration_period'], 
            registration_way: newRegistration['Studentship_Info.Registration_Details.registration_way']};

        // Professor Advisor Information
        Professor_Advisor_Details = {
            professorAdvisor_FirstName: newRegistration['Studentship_Info.Professor_Advisor_Details.professorAdvisor_FirstName'], 
            professorAdvisor_LastName: newRegistration['Studentship_Info.Professor_Advisor_Details.professorAdvisor_LastName'], 
            professorAdvisor_Email: newRegistration['Studentship_Info.Professor_Advisor_Details.professorAdvisor_Email']};
            
        // Format the first group with 'Personal_Information' of the new student
        Personal_Info =  {Student_Insurance, Personal_Information, Birth_Details, Student_Identity, Student_Address, Third_Person_Contact_Details}; 
        //Personal_Info = Object(Personal_Info)
        // Format the second group with 'Studenship_Information' of the new student
        Studentship_Info = {General_Information, Registration_Details, Professor_Advisor_Details};
        //Studentship_Info = Object(Studentship_Info)
        // Finally, create the object student that contains all the informations for the current registration
        newStudent = {Personal_Info, Studentship_Info}

        // Put the new object-item with the input data of the current student to the array of the students
        // This is the array that we will use for the insertion query
        setStudent([...student, Object(newStudent)]);    
    }); 
    
    console.log(student, 'CHECKING');
         
    useEffect(() => {
        if (student.length !== 0) {
            console.log(student, 'INSIDE')
            // Call the suitable mutation to add new students           
            studentResolvers.add_multiple_students(student)
            .then((data) => {
                setCurrentPage('final_complete_uploading') 
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })          
        }
    }, [student])

    // Determine the situation of the icons when the INSERT query has been completed
    if (currentPage === 'final_complete_uploading') {
        document.getElementById('box3').getElementsByClassName('toProcess')[0].style.display = 'none';
        document.getElementById('box3').getElementsByClassName('doneComplete')[0].style.display = 'inline';
        document.getElementById('box3').getElementsByClassName('doneComplete')[0].style.color = 'hsl(128, 85%, 56%)';
    }
    return(
        <div className="complete_container">
            {currentPage === 'loader' ?
                <PageLoader/> :                 
            <FinalCompleteUploading newRegistrations = {student.length} />
            }
        </div>
    )
}

export default CompleteUploading;