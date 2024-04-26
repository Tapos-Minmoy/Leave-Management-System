import express from "express";
import { z } from "zod";
import db from "../database";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";

const teacherRouter = express.Router();

teacherRouter.get("/", async (req, res) => {
  var query = db
    .selectFrom("Teacher")
    .innerJoin("User", "User.user_id", "Teacher.user_id")
    .selectAll();

  query = addFiltration("Teacher", query, req);
  query = addFiltration("User", query, req);

  paginatedResults(query, req, res);
});

teacherRouter.get("/:id", async (req, res) => {
  try {
    const teacher_id = z.coerce.number().parse(req.params.id);

    // console.log(teacher_id);

    const data = await db
      .selectFrom("Teacher")
      .where("Teacher.teacher_id", "=", teacher_id)
      .selectAll()
      .executeTakeFirst();

    if (!data) {
      return res.status(404).json({
        message: "Teacher with id " + teacher_id + " not found",
      });
    }

    res.status(200).json(data);
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

export default teacherRouter;
