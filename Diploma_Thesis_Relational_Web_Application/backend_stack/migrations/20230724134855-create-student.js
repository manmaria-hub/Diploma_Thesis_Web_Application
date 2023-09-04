'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Student_Insurance_AMKA_number: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require : [true, "Παρακαλώ συμπληρώστε το πεδίο 'ΑΜΚΑ'!"]
      },
      Student_Insurance_AFM_number: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require : [true, "Παρακαλώ συμπληρώστε το πεδίο 'ΑΦΜ'!"]
      },
      Student_Insurance_DOY_number: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require : false
      },
      Student_Insurance_AMKA_country: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require : false
      },
      Student_Insurance_AFM_country: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require : false
      },
      Personal_Information_last_name: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Επώνυμο'!"]
      },
      Personal_Information_first_name: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα'!"]
      },
      Personal_Information_dot_father_name: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'M. Όνομα'!"]
      },
      Personal_Information_father_FirstName: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Πατρώνυμο'!"]
      },
      Personal_Information_father_LastName: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_maiden_name: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Πατρικό Όνομα'!"]
      }, 
      Personal_Information_mother_FirstName: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Μητρός'!"]
      },
      Personal_Information_mother_LastName: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_spouse_name: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_profession: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_mother_profession: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_father_profession: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_family: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_username: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Χρήστη'!"]
      },
      Personal_Information_personal_title: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_website: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_student_identity: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαϊκή Ταυτότητα'!"]
      },
      Personal_Information_active: {
        type: Sequelize.BOOLEAN,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_military_obligations: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_gender: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Φύλο'!"]
      },
      Personal_Information_sex: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Personal_Information_notations: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Birth_Details_birth_date: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ημερομηνία Γέννησης'!"]
      },
      Birth_Details_gender: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Φύλο'!"]
      },
      Birth_Details_birth_prefecture: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Περιοχή Γέννησης'!"]
      },
      Birth_Details_birth_location: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τόπος Γέννησης'!"]
      },
      Birth_Details_birth_country: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Χώρα Γέννησης'!"]
      },
      Student_Identity_identity_type: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τύπος ταυτότητας'!"]
      },
      Student_Identity_citizenship: {
        type: Sequelize.JSON,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Υπηκοότητα'!"]
      },
      Student_Identity_citizen: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Δημοτολόγιο'!"]
      },
      Student_Identity_identity_number: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Ταυτότητας'!"]
      },
      Student_Identity_citizen_number: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Δηματολογίου'!"]
      },
      Student_Identity_published_principle: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Εκδ. Αρχή'!"]
      },
      Student_Identity_publish_date: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ημ/νία Έκδοσης'!"]
      },
      Student_Identity_nationality: {
        type: Sequelize.JSON,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Εθνικότητα'!"]
      },
      Student_Identity_nationality_second: {
        type: Sequelize.JSON,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ιθαγένεια'!"]
      },
      Student_Identity_male_record_num: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Identity_male_record_perf: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Identity_male_record_gr: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Identity_male_record_loc: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Identity_male_record_country: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_road: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_rd_number: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_city: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_location: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_country: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_acting_address: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_postcode: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Student_Address_telephone: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τηλέφωνο Επικοινωνίας'!"]
      },
      Student_Address_mobile_phone: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κινητό'!"]
      },
      Student_Address_uth_email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,        
        required: [true, "Παρακαλώ συμπληρώστε το πεδίο 'πανεπιστημιακό email'!"]
      },
      Student_Address_alternative_email: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false, 
      },
      Third_Person_Contact_Details_contact_type: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Third_Person_Contact_Details_person_FirstName: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Third_Person_Contact_Details_person_LastName: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Third_Person_Contact_Details_person_address: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false 
      },
      Third_Person_Contact_Details_person_telephone: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Third_Person_Contact_Details_person_mobilephone: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      Third_Person_Contact_Details_person_email: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        required: false
      },
      General_Information_department: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_department_number: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_course: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_course_number: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_academic_email: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_student_situation: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        unique : false,
        required: true
      },
      General_Information_current_academic_year: {
        type: Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχον Ακαδημαϊκό Έτος'!"],
      },
      General_Information_current_academic_semester: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχον Ακαδημαϊκό Εξάμηνο'!"],
      },
      General_Information_current_attendance_period: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρέχουσα Περίοδος Φοίτησης'!"],
      },
      General_Information_academic_record_number: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Μητρώου'!"],
      },
      General_Information_general_record_number: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Αριθμός Γενικού Μητρώου'!"],
      },
      General_Information_academic_identity: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Ακαδημαϊκή Ταυτότητα'!"],
      },
      General_Information_education_number: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'E.A.E'!"],
      },
      General_Information_course_program_part: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Κατεύθυνση'!"],
      },
      General_Information_course_program_subpart: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require: false
      },
      General_Information_second_course_program_part: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require: false
      },
      General_Information_second_program_subpart: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require: false
      },
      General_Information_comment_to_student: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require: false
      },
      General_Information_total_fees: {
        type: Sequelize.TEXT,
        allowNull : true,
        unique : false,
        require: false
      },
      General_Information_sub_attendance: {
        type: Sequelize.BOOLEAN,
        allowNull : true,
        unique : false,
        require: false
      },
      Registration_Details_registration_year: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Έτος Εισαγωγής'!"]
      },
      Registration_Details_registration_semester: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Εξάμηνο Εισαγωγής'!"]
      },
      Registration_Details_registration_period: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Περίοδος Εισαγωγής'!"]
      },
      Registration_Details_registration_way: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Τρόπος Εισαγωγής'!"]
      },
      Studentship_Info_Advisor_professorAdvisor_FirstName: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Όνομα Καθηγητή'!"]
      },
      Studentship_Info_Advisor_professorAdvisor_LastName: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Επώνυμο Καθηγητή'!"]
      },
      Studentship_Info_Advisor_professorAdvisor_Email: {
        type: Sequelize.TEXT,
        allowNull : false,
        unique : false,        
        require: [true, "Παρακαλώ συμπληρώστε το πεδίο 'Email Καθηγητή'!"]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};