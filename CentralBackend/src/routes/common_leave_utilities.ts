import express from "express";
import { z } from "zod";
import db from "../database";

const commonLeaveUtilitiesRouter = express.Router();

commonLeaveUtilitiesRouter.get("/appliedLeaveForIndividuals", async (req, res) => {
  try {
    var query1 = db.with("latestEvaluations", (db) => db
      .selectFrom("Study_Leave_Evaluation as e")
      .select(({ fn }) => ["e.applicant_id", "e.leave_id", fn.max("e.le_evaluation_time").as("latest_evaluation_time")])
      .groupBy(["e.applicant_id", "e.leave_id"]))
      .selectFrom("Study_Leave_Application as s")
      .innerJoin("latestEvaluations as latest",
        (join) => join
          .onRef("s.applicant_id", "=", "latest.applicant_id")
          .onRef("s.leave_id", "=", "latest.leave_id"))
      .innerJoin("Study_Leave_Evaluation as e",
        (join) => join
          .onRef("latest.applicant_id", "=", "e.applicant_id")
          .onRef("s.leave_id", "=", "latest.leave_id")
          .onRef("latest.latest_evaluation_time", "=", "e.le_evaluation_time"))
      .select(["s.applicant_id", "s.name_of_program as Leave_Type_Details", "e.evaluation_type", "e.le_status", "s.leave_id as Leave_Id"]);

    var query2 = db.with("latestEvaluations", (db) => db
      .selectFrom("Other_Leave_Evaluation as e")
      .select(({ fn }) => ["e.applicant_id", "e.leave_id", fn.max("e.le_evaluation_time").as("latest_evaluation_time")])
      .groupBy(["e.applicant_id", "e.leave_id"]))
      .selectFrom("Other_Leave_Application as o")
      .innerJoin("latestEvaluations as latest",
        (join) => join
          .onRef("o.applicant_id", "=", "latest.applicant_id")
          .onRef("o.leave_id", "=", "latest.leave_id"))
      .innerJoin("Other_Leave_Evaluation as e",
        (join) => join
          .onRef("latest.applicant_id", "=", "e.applicant_id")
          .onRef("o.leave_id", "=", "latest.leave_id")
          .onRef("latest.latest_evaluation_time", "=", "e.le_evaluation_time"))
      .select(["o.applicant_id","o.nature_of_leave as Leave_Type_Details", "e.evaluation_type", "e.le_status", "o.leave_id as Leave_Id"]);

    if (req.query.applicantId && z.coerce.string().safeParse(req.query.applicantId).success) {
      const applicantId = z.coerce.string().parse(req.query.applicantId);
      query1 = query1.where("s.applicant_id", "=", applicantId);
      query2 = query2.where("o.applicant_id", "=", applicantId);
    }

    const [results1, results2] = await Promise.all([query1.execute(), query2.execute()]);
    const unifiedResults = [...results1, ...results2];

    res.status(200).json({ evaluations: unifiedResults });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
commonLeaveUtilitiesRouter.get("/StudyLeaveLetterToChairmanInfo", async (req, res) => {
  try {
    const leaveIdSchema = z.object({
      leave_id: z.preprocess((val) => Number(val), z.number().int()),  // Convert to number
    });

    const { leave_id } = leaveIdSchema.parse(req.query);
    const results = await db
      .selectFrom("Study_Leave_Application as s")
      .innerJoin("User as u", "u.user_id", "s.applicant_id")
      .leftJoin("Teacher as t", "t.user_id", "u.user_id")
      .innerJoin("Department as d","d.department_id","t.department_id")
      .select([
        "s.joining_date","s.name_of_program","s.destination_country","s.leave_start_date","s.financial_source","s.duration",
        "d.department_name", "u.first_name", "u.last_name", "t.title","u.user_id","t.designation"
      ])
      .where("s.leave_id", "=", leave_id )
      .execute();


    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

commonLeaveUtilitiesRouter.get("/StudyLeaveFinalLetter", async (req, res) => {
  try {
    const leaveIdSchema = z.object({
      leave_id: z.preprocess((val) => Number(val), z.number().int()),  // Convert to number
    });


    const { leave_id } = leaveIdSchema.parse(req.query);
    console.log(leave_id)
    const results = await db
      .selectFrom("Study_Leave_Application as s")
      .innerJoin("User as u", "u.user_id", "s.applicant_id")
      .leftJoin("Teacher as t", "t.user_id", "u.user_id")
      .innerJoin("Department as d","d.department_id","t.department_id")
      .innerJoin("Study_Leave_Evaluation as e","s.leave_id","e.leave_id")
      .select([
        "s.joining_date","s.name_of_program","s.destination_country","s.leave_start_date","s.financial_source","s.duration",
        "d.department_name", "u.first_name", "u.last_name", "t.title","u.user_id","t.designation",
        "s.applied_date","s.leave_start_date","e.le_evaluation_time","s.destination"
      ])
      .where("s.leave_id", "=", leave_id )
      .where("e.leave_id", "=", leave_id )
      .where("e.evaluation_type", "=", "Higher Study Branch Final Approval")
      .execute();
      console.log(results);


    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
export default commonLeaveUtilitiesRouter;
