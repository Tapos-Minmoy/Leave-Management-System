import express from "express";
import { z } from "zod";
import db, { Database, TableName } from "../database";
import { addFiltration } from "../helper/addFiltration";
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

const studyLeaveEvaluationRouter = express.Router();

studyLeaveEvaluationRouter.get("/", async (req, res) => {
    try {
        var query = db
        .selectFrom("Study_Leave_Evaluation")
        .selectAll();
        
        query = addFiltration("Study_Leave_Evaluation", query as SelectQueryBuilder<Database, TableName, {}>,req) as any;

        paginatedResults(query, req, res);
      }
       catch (error) {
        res.status(500).json({ message: "Internal server error", error });
      }
  });

const studyLeaveEvaluatesReqBody = z.object({
  applicant_id: z.string(),
  evaluation_type: z.string(),
  le_comment: z.string().nullable(),
  le_evaluation_time: z.string().transform((val) => new Date(val)),
  le_status: z.string(),
  leave_id: z.number(),
});

studyLeaveEvaluationRouter.post("/add", async (req, res) => {
  try {
    const {
      applicant_id,
      evaluation_type,
      le_comment,
      le_evaluation_time,
      le_status,
      leave_id,
    } = studyLeaveEvaluatesReqBody.parse(req.body);

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

studyLeaveEvaluationRouter.put("/update", async (req, res) => {
  const {
    applicant_id,
    evaluation_type,
    le_comment,
    le_evaluation_time,
    le_status,
    leave_id,
  } = studyLeaveEvaluatesReqBody.parse(req.body);
  try {
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

// New route for joining tables
studyLeaveEvaluationRouter.get("/join", async (req, res) => {
  try {
    const { evaluation_type, le_status } = req.query;

    // Validate query parameters
    const paramsSchema = z.object({
      evaluation_type: z.string(),
      le_status: z.string(),
    });
    const { evaluation_type: evalType, le_status: leStatus } = paramsSchema.parse({
      evaluation_type,
      le_status,
    });

    // Query to join tables
    const result = await db
      .selectFrom("Study_Leave_Evaluation as e")
      .innerJoin("Study_Leave_Application as s", "e.leave_id", "s.leave_id")
      .select(["e.le_status", "s.leave_id", "s.name_of_program"])
      .where("e.evaluation_type", "=", evalType)
      .where("e.le_status", "=", leStatus)
      .execute();

    res.status(200).json(result);
  } catch (error) {
    var typeError: z.ZodError | undefined;
    if (error instanceof z.ZodError) {
      typeError = error as z.ZodError;
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(typeError.message),
      });
    }
    res.status(500).json({ message: "Internal server error", error });
  }
});


studyLeaveEvaluationRouter.get("/latest", async (req, res) => {
  try {
    // Validate and convert query parameters
    const leaveIdSchema = z.object({
      leave_id: z.preprocess((val) => Number(val), z.number().int()),  // Convert to number
    });
    const { leave_id } = leaveIdSchema.parse(req.query);

    // Query the database
    const result = await db
      .selectFrom("Study_Leave_Evaluation")
      .selectAll()
      .where("leave_id", "=", leave_id)
      .orderBy("le_evaluation_time", "desc")
      .executeTakeFirst();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No evaluation found for the given leave_id." });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        name: "Invalid data type.",
        message: error.errors,
      });
    }
    console.error("Database connection error:", error);  // Log detailed error information
    res.status(500).json({ message: "Internal server error", error });
  }
});
export default studyLeaveEvaluationRouter;
