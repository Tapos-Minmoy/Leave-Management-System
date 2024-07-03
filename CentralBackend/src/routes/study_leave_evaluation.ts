import express from "express";
import { z } from "zod";
import db, { Database, TableName } from "../database";
import { addFiltration } from "../helper/addFiltration";
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

const leaveEvaluationRouter = express.Router();

leaveEvaluationRouter.get("/", async (req, res) => {
  try {
    let query = db
      .selectFrom("Study_Leave_Evaluation")
      .selectAll();

    query = addFiltration("Study_Leave_Evaluation", query as SelectQueryBuilder<Database, TableName, {}>, req) as any;

    paginatedResults(query, req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

const leaveEvaluatesReqBody = z.object({
  applicant_id: z.string(),
  evaluation_type: z.string(),
  le_comment: z.string().nullable(),
  le_evaluation_time: z.string().transform((val) => new Date(val)),
  le_status: z.string(),
  leave_id: z.number(),
});

leaveEvaluationRouter.post("/add", async (req, res) => {
  try {
    const {
      applicant_id,
      evaluation_type,
      le_comment,
      le_evaluation_time,
      le_status,
      leave_id,
    } = leaveEvaluatesReqBody.parse(req.body);

    await db
      .insertInto("Study_Leave_Evaluation")
      .values({
        applicant_id: applicant_id,
        evaluation_type: evaluation_type,
        le_comment: le_comment,
        le_evaluation_time: le_evaluation_time,
        le_status: le_status,
        leave_id: leave_id,
      })
      .executeTakeFirst();

    res.status(200).send({
      message: "Data Inserted Successfully in Study_Leave_Evaluation Table.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(error.message),
      });
    }
    return res.status(400).json({ message: "Invalid request body", error });
  }
});

leaveEvaluationRouter.put("/update", async (req, res) => {
  try {
    const {
      applicant_id,
      evaluation_type,
      le_comment,
      le_evaluation_time,
      le_status,
      leave_id,
    } = leaveEvaluatesReqBody.parse(req.body);

    await db
      .updateTable("Study_Leave_Evaluation")
      .set({
        le_status: le_status,
        le_comment: le_comment,
        le_evaluation_time: le_evaluation_time,
      })
      .where("Study_Leave_Evaluation.evaluation_type", "=", evaluation_type)
      .where("Study_Leave_Evaluation.leave_id", "=", leave_id)
      .where("Study_Leave_Evaluation.applicant_id", "=", applicant_id)
      .executeTakeFirst();

    res.status(200).send({
      message: "Data Updated Successfully in Study_Leave_Evaluation Table.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(error.message),
      });
    }
    return res.status(400).json({ message: "Invalid request body", error });
  }
});

// New route for joining tables and unioning
leaveEvaluationRouter.get("/ApplicationToChaiman", async (req, res) => {
  try {
    const { evaluation_type, le_status, factor } = req.query;

    // Validate query parameters
    const paramsSchema = z.object({
      evaluation_type: z.string(),
      le_status: z.string(),
      factor: z.string(),
    });
    const { evaluation_type: evalType, le_status: leStatus, factor: roleFactor } = paramsSchema.parse({
      evaluation_type,
      le_status,
      factor,
    });

    // Query to join tables for Study Leave
    const studyLeaveQuery = db
      .selectFrom("Study_Leave_Evaluation as e")
      .innerJoin("Study_Leave_Application as s", "e.leave_id", "s.leave_id")
      .innerJoin("Roles as r", "e.applicant_id", "r.user_id")
      .select(["e.le_status", "s.leave_id", "s.name_of_program as Leave_Type_Details"])
      .where("e.evaluation_type", "=", evalType)
      .where("e.le_status", "=", leStatus)
      .where("r.factor", "=", roleFactor);

    // Query to join tables for Other Leave
    const otherLeaveQuery = db
      .selectFrom("Other_Leave_Evaluation as e")
      .innerJoin("Other_Leave_Application as s", "e.leave_id", "s.leave_id")
      .innerJoin("Roles as r", "e.applicant_id", "r.user_id")
      .select(({ fn }) => ["e.le_status", "s.leave_id","nature_of_leave as Leave_Type_Details"])
      .where("e.evaluation_type", "=", evalType)
      .where("e.le_status", "=", leStatus)
      .where("r.factor", "=", roleFactor);

    // Combine the two queries using union
    const result = await studyLeaveQuery.unionAll(otherLeaveQuery).execute();

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(error.message),
      });
    }
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default leaveEvaluationRouter;
