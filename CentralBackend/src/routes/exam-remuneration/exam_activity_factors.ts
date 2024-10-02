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

const examActivityFactorsRouter = express.Router();

const checkCec = async (req: PermissionRequest, res: express.Response) => {
  const session_id = req.session?.session_id as string;
  const isCec = await db
    .selectFrom("Auth_Session")
    .innerJoin("Teacher", "Auth_Session.user_id", "Teacher.user_id")
    .innerJoin(
      "Exam_Committee",
      "Teacher.teacher_id",
      "Exam_Committee.teacher_id",
    )
    .where("Auth_Session.session_id", "=", session_id)
    .where("Exam_Committee.role", "=", "Chairman")
    .select("Exam_Committee.teacher_id")
    .executeTakeFirst();
  return isCec;
};

//get request
examActivityFactorsRouter.get(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      const cecId = await checkCec(req, res);
      if (!cecId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }
      try {
        var query = await db.selectFrom("Exam_Activity_Factors").selectAll().execute();
        
        res.status(200).send({
          data: query,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", err });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

//post request
examActivityFactorsRouter.post(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      const cecId = await checkCec(req, res);
      if (!cecId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      const examActivityFactorsBody = z
        .object({
          activity_id: z.number(),
          factor: z.string(),
          quantity: z.number(),
        })
        .parse(req.body);

      const query = await db
        .insertInto("Exam_Activity_Factors")
        .values({
          activity_id: examActivityFactorsBody.activity_id,
          factor: examActivityFactorsBody.factor,
          quantity: examActivityFactorsBody.quantity,
        })
        .execute();
      
      const convertedQuery = JSON.parse(
        JSON.stringify(query, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value
        )
      );

      res.status(200).json({
        message: "Exam Activity factors added successfully.",
        data: convertedQuery,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

//put request
examActivityFactorsRouter.put(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      const cecId = await checkCec(req, res);
      if (!cecId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      const examActivityFactorsBody = z
        .object({
          id: z.number(),
          activity_id: z.number(),
          factor: z.string(),
          quantity: z.number(),
        })
        .parse(req.body);
      
      const {id, activity_id, factor, quantity} = examActivityFactorsBody;

      const query = await db
        .updateTable("Exam_Activity_Factors")
        .set({
          activity_id: activity_id,
          factor: factor,
          quantity: quantity,
        })
        .where( "id", "=", id)
        .execute();
        
        res.status(200).json({
          message: "Exam Activity factors updated successfully.",
        });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  }
);

//delete request
examActivityFactorsRouter.delete(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      const cecId = await checkCec(req, res);
      if (!cecId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      const examActivityFactorsBody = z
        .object({
          id: z.number(),
        })
        .parse(req.body);
      
      const {id} = examActivityFactorsBody;

      const query = await db
        .deleteFrom("Exam_Activity_Factors")
        .where( "id", "=", id)
        .execute();
        
        res.status(200).json({
          message: "Exam Activity factor data deleted successfully.",
        });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  }
);

export default examActivityFactorsRouter;
