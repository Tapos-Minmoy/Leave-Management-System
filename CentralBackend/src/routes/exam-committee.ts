import express, { Request, Response } from "express";
const examCommitteeRouter = express.Router();
import db from "../database";
import { paginatedResults } from "../helper/paginatedResults";
import { z } from "zod";
import { verifySession } from "../middlewares/verifySession";
import {
  PermissionRequest,
  Role,
  checkPermissions,
} from "../middlewares/checkPermissions";
import { addFiltration } from "../helper/addFiltration";

examCommitteeRouter.get(
  "/",
  //   verifySession,
  //   checkPermissions,
  async (req, res) => {
    try {
      var query = db
        .selectFrom("Exam_Committee")
        .innerJoin("Teacher", "Exam_Committee.teacher_id", "Teacher.teacher_id")
        .innerJoin("User", "User.user_id", "Teacher.user_id")
        .innerJoin(
          "Department",
          "Department.department_id",
          "Teacher.department_id",
        )
        .innerJoin(
          "University",
          "University.university_id",
          "Department.university_id",
        )
        .selectAll();
      query = addFiltration("Exam_Committee", query, req);
      query = addFiltration("User", query, req);

      paginatedResults(query, req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
);

// If the requesting user is a teacher, return his exam committee info
examCommitteeRouter.get(
  "/:id",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res: Response) => {
    if (req.role != Role.Teacher) {
      return res.status(403).json({
        message:
          "You don't have enough permissions to access this information.",
      });
    }

    try {
      const teacher_id = z.coerce.number().parse(req.params.id);

      const data = await db
        .selectFrom("Exam_Committee")
        .where("Exam_Committee.teacher_id", "=", teacher_id)
        .innerJoin("User", "Exam_Committee.teacher_id", "User.user_id")
        .executeTakeFirst();

      if (!data) {
        return res.status(404).json({
          message: "Exam committee member with id " + teacher_id + " not found",
        });
      }

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          name: "Invalid data type.",
          message: JSON.parse(error.message),
        });
      }

      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

export default examCommitteeRouter;
