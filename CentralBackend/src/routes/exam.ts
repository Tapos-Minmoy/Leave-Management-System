import express, { Request, Response } from "express";
const examRouter = express.Router();
import db, { Database, TableName } from "../database";
import { z } from "zod";
import {
    PermissionRequest,
    Role,
    checkPermissions,
  } from "../middlewares/checkPermissions";
  import { verifySession } from "../middlewares/verifySession";
  import { addFiltration } from "../helper/addFiltration";
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

examRouter.get("/",  
 async(req, res)=>{
    try{
        var query = db
            .selectFrom("Exam")
            .innerJoin("Department", "Exam.department_id", "Department.department_id")
            .innerJoin("Academic_Session", "Exam.academic_session_id", "Academic_Session.academic_session_id")
            .selectAll();
            query = addFiltration("Exam", query as SelectQueryBuilder<Database, TableName, {}>,req) as any;
            paginatedResults(query, req, res)
            // res.send({data: query})
    
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
})
export default examRouter