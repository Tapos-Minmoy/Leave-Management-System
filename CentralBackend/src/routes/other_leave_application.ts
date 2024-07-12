import express from "express";
import { z } from "zod";
import db, { Database, TableName } from "../database";
import { addFiltration } from "../helper/addFiltration";
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

const otherLeaveApplicationRouter = express.Router();

otherLeaveApplicationRouter.get("/", async (req, res) => {
  try {
    var query = db.selectFrom("Other_Leave_Application").selectAll();
    query = addFiltration("Other_Leave_Application", query as SelectQueryBuilder<Database, TableName, {}>, req) as any;
    paginatedResults(query, req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

const otherLeaveReqBody = z.object({
  applicant_id: z.string(),
  attachments: z.string().nullable(),
  designation: z.string(),
  duration: z.string(),
  final_application: z.string().nullable(),
  leave_ground: z.string().nullable(),
  leave_start_date: z.string().transform((val) => new Date(val)),
  my_application_chairman: z.string().nullable(),
  nature_of_leave: z.string(),
  salary_acknowledgement: z.number().nullable(),
  signature: z.string().nullable(),
  station_leaving_permission: z.string().nullable(),
  applied_date: z.string().transform((val) => new Date(val)),
});

otherLeaveApplicationRouter.post("/add", async (req, res) => {
  try {
    const {
      applicant_id,
      attachments,
      designation,
      duration,
      final_application,
      leave_ground,
      leave_start_date,
      my_application_chairman,
      nature_of_leave,
      salary_acknowledgement,
      signature,
      station_leaving_permission,
      applied_date,
    } = otherLeaveReqBody.parse(req.body);

    const result = await db
      .insertInto("Other_Leave_Application")
      .values({
        applicant_id: applicant_id,
        attachments: attachments,
        designation: designation,
        duration: duration,
        final_application: final_application,
        leave_ground: leave_ground,
        leave_start_date: leave_start_date,
        my_application_chairman: my_application_chairman,
        nature_of_leave: nature_of_leave,
        salary_acknowledgement: salary_acknowledgement,
        signature: signature,
        station_leaving_permission: station_leaving_permission,
        applied_date: applied_date,
      })
      .executeTakeFirst();

    const leave_id = Number(result.insertId); // Assuming result.insertId contains the generated leave_id

    // Add request to Other_Leave_Evaluation table
    await db
      .insertInto("Other_Leave_Evaluation")
      .values({
        applicant_id: applicant_id,
        evaluation_type: "Chairman Approval",
        le_comment: "",
        le_evaluation_time: new Date(),
        le_status: "pending",
        leave_id: leave_id,
      })
      .executeTakeFirst();

    res.status(200).send({
      message: "Data Inserted Successfully in Other_Leave_Application and Other_Leave_Evaluation Tables.",
    });
  } catch (error) {
    var typeError: z.ZodError | undefined;
    if (error instanceof z.ZodError) {
      typeError = error as z.ZodError;
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(typeError.message),
      });
    }
    return res.status(400).json({ message: "Invalid request body", error });
  }
});

otherLeaveApplicationRouter.get("/otherLeaveDetails", async (req, res) => {
  try {
    const leaveIdSchema = z.object({
      leave_id: z.preprocess((val) => Number(val), z.number().int()),  // Convert to number
    });
    const { leave_id } = leaveIdSchema.parse(req.query);
    const results = await db
      .selectFrom("Other_Leave_Application as o")
      .innerJoin("User as u", "u.user_id", "o.applicant_id")
      .leftJoin("Teacher as t", "t.user_id", "u.user_id")
      .select([
        "o.applicant_id", "o.applied_date", "o.attachments", "o.designation", "o.duration", "o.final_application", "o.station_leaving_permission",
        "o.leave_ground", "o.leave_id", "o.leave_start_date", "o.my_application_chairman", "o.nature_of_leave", "o.signature",
        "o.salary_acknowledgement", "u.first_name", "u.last_name", "t.title"
      ])
      .where("o.leave_id", "=", leave_id )
      .execute();


    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default otherLeaveApplicationRouter;
