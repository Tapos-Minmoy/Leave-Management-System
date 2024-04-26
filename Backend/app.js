import express from 'express'
import { getRoles, getUser } from './database.js'
import { createStudyLeaveApplication, getAllStudyLeaveApplication,getStudyLeaveApplication } from './studyLeaveAPI.js'
import {asignToEvaluate,updateEvaluationStatus}  from './studyLeaveProgressAPI.js'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import multer from 'multer'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'


const app= express()



dotenv.config()
const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());


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
      req.body.Attachments, 
      req.body.my_application_chairman,
      req.body.final_application,
    ];
  
    const result= await pool.query(sql, values);
    res.status(201).send("Data Inserted Successfully.")

});  

//file and image upload
const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'public/images')
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

const upload=multer({
    storage: storage
})

app.post('/noc/upload/image', upload.single('image') , async(req,res) =>{
    console.log(req.file);
})

app.get("/roles", async (req, res)=>{
    const roles= await getRoles()
    res.send(roles)
})


app.post('/study_leave_application', upload.fields([{ name: 'attachedFile', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), async (req, res) => {
    console.log(req)
    try {
      const {
        applicant_id,
        name_of_program,
        destination,
        department,
        duration,
        destination_country,
        financial_source,
        designation,
        joining_date,
        leave_start_date,
        program_start_date,
        applied_date,
      } = req.body;
      console.log(req)

       const attachmentPath = req.files['attachedFile'] ? req.files['attachedFile'][0].path : null; // Get the attachment file path
    const signaturePath = req.files['signature'] ? req.files['signature'][0].path : null; // Get the signature file path

      const result= createStudyLeaveApplication(applicant_id,name_of_program,destination,department,duration,destination_country,financial_source,designation,joining_date,leave_start_date,program_start_date,applied_date, attachmentPath,signaturePath)
    
      res.status(201).send("Data Inserted Successfully.")
    
  

    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.get('/all_study_leave_applications',async (req, res)=>{
  const applicant_id= req.query.applicant_id
  
  const result=await getAllStudyLeaveApplication(applicant_id)
  console.log(result)
  res.status(201).send(result)
});


app.get('/study_leave_application/:leave_id',async (req, res)=>{
  const leave_id= req.params.leave_id
  console.log(leave_id)
  const result=await getStudyLeaveApplication(leave_id)
  console.log(result)
  res.status(201).send(result)
});


//assign to different role for evaluation
app.post('/noc/assignToEvaluate', async (req, res) => {
    try {
        const { evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment } = req.body;
        
        const result = await asignToEvaluate(evaluation_type, leave_id, applicant_id, le_status, le_evaluation_time, le_comment);

        res.status(200).json({ success: true, message: 'Evaluation assigned successfully.', result });
    } catch (error) {
        console.error('Error assigning evaluation:', error);
        res.status(500).json({ success: false, message: 'Failed to assign evaluation.', error: error.message });
    }
});

//update evaulation status for a particular role
app.post('/noc/updateEvaluationStatus', async (req, res) => {
  try {
      const { evaluation_type, leave_id, applicant_id, le_status, le_comment } = req.body;
      
      const result = await updateEvaluationStatus(evaluation_type, leave_id, applicant_id, le_status, null, le_comment);

      res.status(200).json({ success: true, message: 'Evaluation status updated successfully.', result });
  } catch (error) {
      console.error('Error updating evaluation status:', error);
      res.status(500).json({ success: false, message: 'Failed to update evaluation status.', error: error.message });
  }
});



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
  })


app.listen(8080, ()=>{
    console.log('server is running on port 8080')
})


