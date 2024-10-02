import express from "express";
import { z } from "zod";
import db from "../../database";
import { paginatedResults } from "../../helper/paginatedResults";
import { SessionRequest, verifySession } from "../../middlewares/verifySession";
import { checkPermissions, PermissionRequest, Role } from "../../middlewares/checkPermissions";

const assignCourseRouter = express.Router();



// Get all course assignments
assignCourseRouter.get("/", async (req, res) => {
  try {
    const query = db
      .selectFrom("Assign_course")
      .select(["Department_name", "Teacher_name", "Course_code"]);

    paginatedResults(query, req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get course assignments for the logged-in teacher
// assignCourseRouter.get("/mycourses", verifySession, async (req: SessionRequest, res) => {
//   try {
//     const user_id = req.session?.user_id; // Assuming `username` stores teacher's name
//     const query = db
//       .selectFrom("Assign_course")
//       .where("user_id", "=", user_id!)
//       .select(["Department_name", "Teacher_name", "Course_code"]);

//     paginatedResults(query, req, res);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// });

// Schema for adding a new course assignment
const addCourseSchema = z.object({
    Department_name: z.string(),
    Teacher_name: z.string(),
    Course_code: z.string(),
  });
// Add a new course assignment

assignCourseRouter.post(
  "/add",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    if (req.role !== Role.Staff && req.role !== Role.Teacher) {
      return res.status(403).json({
        message: "You don't have enough permissions to access this document.",
      });
    }

    try {
      const reqBody = addCourseSchema.parse(req.body);
      await db.insertInto("Assign_course").values(reqBody).execute();

      res.status(200).json({
        success: true,
        message: "Course assigned successfully.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          name: "Invalid data type.",
          message: error.errors,
        });
      }
      res.status(500).json({ success: false, message: "Internal server error", error });
    }
  }
);

// Update a course assignment
assignCourseRouter.put(
  "/update/:courseCode",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    if (req.role !== Role.Staff && req.role !== Role.Teacher) {
      return res.status(403).json({
        message: "You don't have enough permissions to access this document.",
      });
    }

    try {
      const courseCode = z.coerce.string().parse(req.params.courseCode);
      const updateBody = addCourseSchema.partial().parse(req.body);

      if (!Object.keys(updateBody).length) {
        return res.status(400).json({ success: false, message: "No fields to update" });
      }

      await db
        .updateTable("Assign_course")
        .where("Course_code", "=", courseCode)
        .set(updateBody)
        .execute();

      res.status(200).json({
        success: true,
        message: `Course assignment with course Code ${courseCode} updated successfully.`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          name: "Invalid data type.",
          message: error.errors,
        });
      }
      res.status(500).json({ success: false, message: "Internal server error", error });
    }
  }
);

// Delete a course assignment
assignCourseRouter.delete(
  "/delete/:courseCode",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    if (req.role !== Role.Staff && req.role !== Role.Teacher) {
      return res.status(403).json({
        message: "You don't have enough permissions to access this document.",
      });
    }

    try {
      const courseCode = z.coerce.string().parse(req.params.id);
      await db.deleteFrom("Assign_course").where("Course_code", "=", courseCode).execute();

      res.status(200).json({
        success: true,
        message: `Course assignment with course-code ${courseCode} deleted successfully.`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          name: "Invalid data type.",
          message: error.errors,
        });
      }
      res.status(500).json({ message: "Internal server error", error });
    }
  }
);

export default assignCourseRouter;
