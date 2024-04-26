import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function asignToEvaluate(evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment) {
    const [result] = await pool.query(
        `INSERT INTO study_leave_evaluation
        (evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment]
    );

    return result;
}

export async function updateEvaluationStatus(evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment) {
    const [result] = await pool.query(
        `UPDATE study_leave_evaluation
        SET le_status = '?', 
            le_evaluation_time = CURRENT_TIME(), 
            le_comment = ?
        WHERE le_evaluation_type = '?' 
            AND leave_id = ? 
            AND applicant_id = ?`,
        [le_status, le_comment,evaluation_type,leave_id,applicant_id]
    );

    return result;
}


