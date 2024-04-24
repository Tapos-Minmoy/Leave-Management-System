import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()



export async function createStudyLeaveApplication(applicant_id, name_of_program, destination, department, duration, destination_country, financial_source, designation, joining_date, leave_start_date, program_start_date, applied_date, attachments, signature){

    const [result] = await pool.query(
        `INSERT INTO study_leave_application 
        (applicant_id, name_of_program, destination, department, duration, destination_country, financial_source, designation, joining_date, leave_start_date, program_start_date, applied_date, attachments, signature) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [applicant_id, name_of_program, destination, department, duration, destination_country, financial_source, designation, joining_date, leave_start_date, program_start_date, applied_date, attachments, signature]
      );

      return result

}

export async function getAllStudyLeaveApplication(applicant_id){
    const [result]= await pool.query(`select * from webdb_v1.study_leave_application where applicant_id= ?`,applicant_id);
    return result
}

export async function getStudyLeaveApplication(leave_id){
    const [result]= await pool.query(`select * from webdb_v1.study_leave_application where leave_id= ?`,leave_id);
    return result[0]
}
