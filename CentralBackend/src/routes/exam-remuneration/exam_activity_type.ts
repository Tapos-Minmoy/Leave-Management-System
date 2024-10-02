import express from "express";
import { SelectQueryBuilder } from "kysely";
import { z } from "zod";
import db, { Database, TableName } from "../../database";
import { addFiltration } from "../../helper/addFiltration";
import { paginatedResults } from "../../helper/paginatedResults";
import { verifySession } from "../../middlewares/verifySession";
import {
  PermissionRequest,
  Role,
  checkPermissions,
} from "../../middlewares/checkPermissions";

const examActivityTypeRouter = express.Router();

// get request
examActivityTypeRouter.get(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const session_id = req.session?.session_id as string;
      console.log(session_id);

      const chairman = await db
        .selectFrom("Auth_Session")
        .innerJoin("Roles", "Auth_Session.user_id", "Roles.user_id")
        .where("Auth_Session.session_id", "=", session_id)
        .where("Roles.role", "=", "chairman")
        .select(["Auth_Session.user_id", "Roles.start_date", "Roles.end_date"])
        .executeTakeFirst();
      console.log(chairman);
      if (!chairman) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }
      // get exam activity type data
      try {
        const query = await db.selectFrom("Exam_Activity_Type").selectAll().execute();
  
        res.status(200).send({
          data: query,
        });
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error });
    }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// post request
examActivityTypeRouter.post(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const session_id = req.session?.session_id as string;
      console.log(session_id);
      const chairman = await db
        .selectFrom("Auth_Session")
        .innerJoin("Roles", "Auth_Session.user_id", "Roles.user_id")
        .where("Auth_Session.session_id", "=", session_id)
        .where("Roles.role", "=", "chairman")
        .select(["Auth_Session.user_id", "Roles.start_date", "Roles.end_date"])
        .executeTakeFirst();
      console.log(chairman);
      if (!chairman) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }
      // create new exam activity type
      const examActivityTypeInfo = z.object({
        exam_activity_name: z.string(),
        exam_category: z.string(),
      });

      const {exam_activity_name, exam_category } =
        examActivityTypeInfo.parse(req.body);

      const query = await db
        .insertInto("Exam_Activity_Type")
        .values({
          exam_activity_name,
          exam_category,
        })
        .execute();

      const convertedQuery = JSON.parse(
        JSON.stringify(query, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value
        )
      );

      res.status(200).send({
        message: "Exam activity type created successfully",
        data: convertedQuery,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// put request
examActivityTypeRouter.put(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const session_id = req.session?.session_id as string;
      console.log(session_id);
      const chairman = await db
        .selectFrom("Auth_Session")
        .innerJoin("Roles", "Auth_Session.user_id", "Roles.user_id")
        .where("Auth_Session.session_id", "=", session_id)
        .where("Roles.role", "=", "chairman")
        .select(["Auth_Session.user_id", "Roles.start_date", "Roles.end_date"])
        .executeTakeFirst();

      if (!chairman) {
        return res.status(403).json({
          message: "You don't have enough permissions to edit this document.",
        });
      }
      // update exam activity type
      const examActivityTypeInfo = z.object({
        exam_activity_type_id: z.number(),
        exam_activity_name: z.string(),
        exam_category: z.string(),
      });

      const { exam_activity_type_id, exam_activity_name, exam_category } =
        examActivityTypeInfo.parse(req.body);

      await db
        .updateTable("Exam_Activity_Type")
        .set({
          exam_activity_name,
          exam_category,
        })
        .where("exam_activity_type_id", "=", exam_activity_type_id)
        .execute();

      res.status(200).send({
        message: "Exam activity type updated successfully",
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// delete request
examActivityTypeRouter.delete(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const session_id = req.session?.session_id as string;
      console.log(session_id);
      const chairman = await db
        .selectFrom("Auth_Session")
        .innerJoin("Roles", "Auth_Session.user_id", "Roles.user_id")
        .where("Auth_Session.session_id", "=", session_id)
        .where("Roles.role", "=", "chairman")
        .select(["Auth_Session.user_id", "Roles.start_date", "Roles.end_date"])
        .executeTakeFirst();
      console.log(chairman);
      if (!chairman) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }
      // delete exam activity type
      const examActivityTypeInfo = z.object({
        exam_activity_type_id: z.number(),
      });

      const { exam_activity_type_id } = examActivityTypeInfo.parse(req.body);

      try {
        await db
          .deleteFrom("Exam_Activity_Type")
          .where("exam_activity_type_id", "=", exam_activity_type_id)
          .execute();
  
        res.status(200).send({
          message: "Exam activity type deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

export default examActivityTypeRouter;
