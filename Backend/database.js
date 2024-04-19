import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function getRoles(){
    const [result] = await pool.query("select * from image")
    return result
}
//const roles= await getRoles() 
//console.log(roles)

export async function getUser(email){
    const [result] = await pool.query("select * from user where email= ? ",[email])
    return result[0]
}


//const user= await getUser("atekaoishi78@gmail.com") 
//console.log(user)
