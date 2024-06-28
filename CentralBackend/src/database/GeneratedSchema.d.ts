import type { ColumnType } from "kysely";
import CourseType from "../helper/enum/CourseEnum";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface AcademicSession {
  academic_session: string;
  academic_session_id: string;
  program: string;
  semester: number;
}

export interface Acomplishment {
  acomplishment_field: string;
  acomplishment_organization: string;
  acomplishment_title: string;
  acomplishment_year: string;
  teacher_id: number;
}

export interface Address {
  address_id: Generated<number>;
  address_type: "Permanent" | "Present";
  country: Generated<string>;
  district: Generated<string>;
  division: Generated<string>;
  post_office: Generated<string>;
  postal_code: number | null;
  thana: Generated<string>;
  union_name: Generated<string>;
  upazila: Generated<string>;
  village: Generated<string>;
}

export interface AdministrativeExperinece {
  administrative_experinece_description: string;
  administrative_experinece_institution: string;
  administrative_experinece_title: string;
  administrative_experinece_year: string;
  teacher_id: number;
}

export interface AuthSession {
  created_at: Generated<Date>;
  session_id: Generated<string>;
  user_id: string;
}

export interface Award {
  award_country: string;
  award_institution: string;
  award_title: string;
  award_year: string;
  teacher_id: number;
}

export interface CertificateFormHistory {
  cf_form_id: number | null;
  cf_history_id: Generated<number>;
  degree: string | null;
  district: string | null;
  father_name_bn: string | null;
  father_name_eng: string | null;
  fifth_year_exam_actual_year: string | null;
  fifth_year_exam_cgpa: number | null;
  fifth_year_exam_name: string | null;
  fifth_year_exam_time: string | null;
  fir_year_exam_actual_year: string | null;
  fir_year_exam_cgpa: number | null;
  fir_year_exam_name: string | null;
  fir_year_exam_time: string | null;
  fourth_year_exam_actual_year: string | null;
  fourth_year_exam_cgpa: number | null;
  fourth_year_exam_name: string | null;
  fourth_year_exam_time: string | null;
  hall_name: string | null;
  mobile_phone: string | null;
  mother_name_bn: string | null;
  mother_name_eng: string | null;
  post_office: string | null;
  present_address: string | null;
  profile_image: Buffer | null;
  sec_year_exam_actual_year: string | null;
  sec_year_exam_cgpa: number | null;
  sec_year_exam_name: string | null;
  sec_year_exam_time: string | null;
  student_id: number | null;
  student_name_bn: string | null;
  student_name_eng: string | null;
  thana: string | null;
  third_year_exam_actual_year: string | null;
  third_year_exam_cgpa: number | null;
  third_year_exam_name: string | null;
  third_year_exam_time: string | null;
  village: string | null;
}

export interface CertificateFormVerification {
  authority_id: string | null;
  comment: string | null;
  form_id: number | null;
  status: string | null;
  verification_date: Date | null;
  verification_id: Generated<number>;
}

export interface CertificateWithdrawalAttachments {
  attachment: Buffer | null;
  attachment_id: Generated<number>;
  form_id: number | null;
}

export interface CertificateWithdrawalForm {
  degree: string | null;
  form_id: Generated<number>;
  form_submission_date: Date | null;
  form_type: string | null;
  money: number | null;
  payorder_id: string | null;
  student_id: number | null;
}

export interface Course {
  course_code: string;
  course_id: Generated<number>;
  course_title: string;
  course_type: CourseType | null ;
  credit: number;
  department_id: number;
  exam_minutes: number;
}

export interface CoursesInSemester {
  academic_session_id: number;
  course_id: number;
}

export interface CourseTeacher {
  academic_session_id: number;
  course_id: number;
  teacher_id: number;
}

export interface Department {
  department_abbrev: string;
  department_id: Generated<number>;
  department_name: string;
  faculty: string;
  grad_semester_no: number;
  undergrad_semester_no: number;
  university_id: number;
}

export interface Education {
  education_country: string;
  education_from_year: string;
  education_institution: string;
  education_title: string;
  education_to_year: string;
  user_id: number;
}

export interface Exam {
  academic_session_id: number;
  department_id: number;
  exam_centre: string;
  exam_end_date: string | null;
  exam_id: Generated<number>;
  exam_name: string;
  exam_session: string;
  exam_start_date: Date | null;
  is_result_submitted: Generated<number>;
  result_submit_date: Date | null;
}

export interface ExamCommittee {
  exam_id: number;
  formation_date: Generated<Date>;
  role: "Chairman" | "Member" | "Tabulator";
  teacher_id: number;
}

export interface Form {
  clearance_level: Generated<number | null>;
  current_address_id: number | null;
  description_of_other_programs: Generated<string | null>;
  form_id: Generated<number>;
  form_submission_time: Date | null;
  permanent_address_id: number | null;
  previous_charges: Generated<string | null>;
  student_id: number | null;
}

export interface FormCourses {
  course_id: number;
  form_id: number;
}

export interface FormEvaluation {
  end_time: Date | null;
  evaluation_id: Generated<number>;
  evaluator_id: string | null;
  form_id: number | null;
  start_time: Generated<Date>;
}

export interface Hall {
  hall_id: number;
  hall_name: string | null;
}

export interface Image {
  image_id: Generated<number>;
  image_path: Buffer | null;
  image_type: string | null;
}

export interface Journal {
  journal_title: string;
  journal_type: string;
  journal_year: string;
  teacher_id: number;
}

export interface OtherLeaveApplication {
  applicant_id: string;
  attachments: string | null;
  designation: string;
  duration: number;
  final_application: string | null;
  leave_ground: string | null;
  leave_id: Generated<number>;
  leave_start_date: Date;
  my_application_chairman: string | null;
  nature_of_leave: string;
  salary_acknowledgement: number | null;
  signature: string | null;
  station_leaving_permission: string | null;
}

export interface OtherLeaveEvaluation {
  applicant_id: string;
  evaluation_type: string;
  le_comment: string | null;
  le_evaluation_time: Date;
  le_status: string;
  leave_id: number;
}

export interface ProfessionalExperinece {
  professional_experience_country: string;
  professional_experience_description: string;
  professional_experience_institution: string;
  professional_experience_title: string;
  professional_experience_year: string;
  teacher_id: number;
}

export interface Publication {
  publication_description: string;
  publication_field: string;
  publication_title: string;
  publication_year: string;
  teacher_id: number;
}

export interface Roles {
  end_date: Date | null;
  factor: string | null;
  role: string;
  start_date: Date;
  user_id: string;
}

export interface ScholarshipAndFellowship {
  scholarship_country: string;
  scholarship_degree: string;
  scholarship_from_year: string;
  scholarship_institution: string;
  scholarship_title: string;
  scholarship_to_year: string;
  teacher_id: number;
}

export interface Student {
  academic_session: string | null;
  department_id: number;
  fathers_name: string | null;
  fathers_name_bn: string | null;
  guardian_address_id: number | null;
  guardian_name: string | null;
  guardian_name_bn: string | null;
  guardian_relation: string | null;
  hall_id: number;
  mothers_name: string | null;
  mothers_name_bn: string | null;
  program_id: number | null;
  student_id: Generated<number>;
  user_id: string;
}

export interface StudyLeaveApplication {
  applicant_id: string;
  applied_date: Date;
  attachments: string | null;
  department: string;
  designation: string;
  destination: string;
  destination_country: string;
  duration: number;
  final_application: string | null;
  financial_source: string;
  joining_date: Date;
  leave_id: Generated<number>;
  leave_start_date: Date;
  my_application_chairman: string | null;
  my_application_registrar: string | null;
  name_of_program: string;
  program_start_date: Date;
  signature: string | null;
}

export interface StudyLeaveEvaluation {
  applicant_id: string;
  evaluation_type: string;
  le_comment: string | null;
  le_evaluation_time: Date;
  le_status: string;
  leave_id: number;
}

export interface Teacher {
  area_of_interest: string | null;
  department_id: number | null;
  designation: string | null;
  teacher_id: number | null;
  title: string | null;
  user_id: string;
}

export interface TrainingAndCertification {
  teacher_id: number;
  training_duration: string;
  training_field: string;
  training_title: string;
  training_year: string;
}

export interface University {
  university_abbrev: string;
  university_id: Generated<number>;
  university_name: string;
}

export interface User {
  blood_group: string | null;
  dob: Date;
  email: string;
  ethnicity: string | null;
  first_name: string;
  first_name_bn: string | null;
  gender: string | null;
  last_name: string;
  last_name_bn: string | null;
  nationality: string | null;
  password: string;
  permanent_address_id: number;
  phone: string | null;
  profile_image_id: number | null;
  religion: string | null;
  sign_id: number | null;
  user_id: Generated<string>;
}

export interface DB {
  Academic_Session: AcademicSession;
  Acomplishment: Acomplishment;
  Address: Address;
  Administrative_experinece: AdministrativeExperinece;
  Auth_Session: AuthSession;
  Award: Award;
  Certificate_Form_History: CertificateFormHistory;
  Certificate_Form_Verification: CertificateFormVerification;
  Certificate_Withdrawal_Attachments: CertificateWithdrawalAttachments;
  Certificate_Withdrawal_Form: CertificateWithdrawalForm;
  Course: Course;
  Course_Teacher: CourseTeacher;
  Courses_in_Semester: CoursesInSemester;
  Department: Department;
  Education: Education;
  Exam: Exam;
  Exam_Committee: ExamCommittee;
  Form: Form;
  Form_Courses: FormCourses;
  Form_Evaluation: FormEvaluation;
  Hall: Hall;
  Image: Image;
  Journal: Journal;
  Other_Leave_Application: OtherLeaveApplication;
  Other_Leave_Evaluation: OtherLeaveEvaluation;
  Professional_experinece: ProfessionalExperinece;
  Publication: Publication;
  Roles: Roles;
  Scholarship_and_fellowship: ScholarshipAndFellowship;
  Student: Student;
  Study_Leave_Application: StudyLeaveApplication;
  Study_Leave_Evaluation: StudyLeaveEvaluation;
  Teacher: Teacher;
  Training_and_certification: TrainingAndCertification;
  University: University;
  User: User;
}
