import express from "express";
import { z } from "zod";
import db, { Database, TableName } from "../database";
import { addFiltration } from "../helper/addFiltration";
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

const courseSemesterRouter = express.Router();

courseSemesterRouter.get("/", async (req, res) => {
    try {
        var query = db
        .selectFrom("Courses_in_Semester")
        .innerJoin("Course", "Courses_in_Semester.course_id", "Course.course_id")
        .innerJoin("Academic_Session","Academic_Session.academic_session_id", "Courses_in_Semester.academic_session_id")
        .selectAll();
        
        query = addFiltration("Courses_in_Semester", query as SelectQueryBuilder<Database, TableName, {}>,req) as any;

        paginatedResults(query, req, res);
      }
       catch (error) {
        res.status(500).json({ message: "Internal server error", error });
      }
  });

  export default courseSemesterRouter;