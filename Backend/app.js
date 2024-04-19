import express from 'express'
import { getRoles, getUser } from './database.js'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import multer from 'multer'
import bodyParser from 'body-parser'


const app= express()



dotenv.config()
const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()



const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(bodyParser.json());


app.post('/other_leave_application', async (req, res) => {
    const sql = `INSERT INTO other_leave_application 
                (Leave_ID, applicant_id, Nature_of_Leave, Duration, Designation, Leave_Start_Date, 
                Leave_Ground, Salary_Acknowledgement, Station_Leaving_Permission, Attachments, 
                my_application_chairman, final_application) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
      req.body.Leave_ID,
      req.body.applicant_id,
      req.body.Nature_of_Leave,
      req.body.Duration,
      req.body.Designation,
      req.body.Leave_Start_Date,
      req.body.Leave_Ground,
      req.body.Salary_Acknowledgement,
      req.body.Station_Leaving_Permission,

      //Files not working
      req.body.Attachments, 
      req.body.my_application_chairman,
      req.body.final_application,
    ];
  
    const result= await pool.query(sql, values);
    res.status(201).send("Data Inserted Successfully.")

});  


app.get("/roles", async (req, res)=>{
    const roles= await getRoles()
    res.send(roles)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
  })


app.listen(8080, ()=>{
    console.log('server is running on port 8080')
})