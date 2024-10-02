import express from "express";
import { sql } from "kysely";
import { z } from "zod";
import db from "../../database";
import { get } from "http";

const marksheetRouter = express.Router();

marksheetRouter.get("/:exam_id/:course_id", async (req, res) => {
  try {
    const exam_id = z.coerce.number().parse(req.params.exam_id);
    const course_id = z.coerce.number().parse(req.params.course_id);

    const data = await db
      .selectFrom("Marksheet")
      .innerJoin("Form", (join) =>
        join
          .onRef("Form.exam_id", "=", "Marksheet.exam_id")
          .onRef("Form.student_id", "=", "Marksheet.student_id"),
      )
      .where("Marksheet.exam_id", "=", exam_id)
      .where("Marksheet.course_id", "=", course_id)
      .selectAll("Marksheet")
      .select("student_status")
      .execute();

    const processedData = data.map((data) => {
      return {
        student_id: data.student_id,
        fem: data.fem,
        catm: data.catm,
        gpa: data.gpa,
        student_status: data.student_status,
      };
    });

    res.status(200).json(processedData);
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

const getMarksheet = async (exam_id: number) => {
  const data = await db
    .selectFrom("Marksheet")
    .innerJoin("Form", (join) =>
      join
        .onRef("Form.exam_id", "=", "Marksheet.exam_id")
        .onRef("Form.student_id", "=", "Marksheet.student_id"),
    )
    .innerJoin("Student", "Student.student_id", "Form.student_id")
    .innerJoin("Hall", "Hall.hall_id", "Student.hall_id")
    .innerJoin("Exam", "Form.exam_id", "Exam.exam_id")
    .innerJoin(
      "Academic_Session",
      "Academic_Session.academic_session_id",
      "Exam.academic_session_id",
    )
    .innerJoin("User", "User.user_id", "Student.user_id")
    .innerJoin("Course", "Course.course_id", "Marksheet.course_id")
    .where("Marksheet.exam_id", "=", exam_id)
    .select([
      "student_status",
      "Marksheet.course_id",
      "fem",
      "catm",
      "Marksheet.student_id",
      "course_id",
      "Hall.hall_name",
      "session",
      "Course.credit",
      sql`CONCAT(User.first_name, ' ', User.last_name)`.as("student_name"),
    ])
    .execute();

  return data;
};

const getImprovementMarksheet = async (session: number, student_id: number) => {
  const data = await db
    .selectFrom("Marksheet")
    .innerJoin("Form", (join) =>
      join
        .onRef("Form.exam_id", "=", "Marksheet.exam_id")
        .onRef("Form.student_id", "=", "Marksheet.student_id"),
    )
    .innerJoin("Student", "Student.student_id", "Form.student_id")
    .innerJoin("Hall", "Hall.hall_id", "Student.hall_id")
    .innerJoin("Exam", "Form.exam_id", "Exam.exam_id")
    .innerJoin(
      "Academic_Session",
      "Academic_Session.academic_session_id",
      "Exam.academic_session_id",
    )
    .innerJoin("Course", "Course.course_id", "Marksheet.course_id")
    .innerJoin("User", "User.user_id", "Student.user_id")
    .where("Academic_Session.academic_session_id", "=", session)
    .where("Marksheet.student_id", "=", student_id)
    .select([
      "student_status",
      "Marksheet.course_id",
      "fem",
      "catm",
      "Marksheet.student_id",
      "course_id",
      "Hall.hall_name",
      "session",
      "Course.credit",
      sql`CONCAT(User.first_name, ' ', User.last_name)`.as("student_name"),
    ])
    .execute();

  return data;
};

marksheetRouter.get("/:exam_id", async (req, res) => {
  try {
    const exam_id = z.coerce.number().parse(req.params.exam_id);
    var data = await getMarksheet(exam_id);

    if (data.length === 0) return res.status(200).json(data);

    const session = await db
      .selectFrom("Exam")
      .where("exam_id", "=", exam_id)
      .select("Exam.academic_session_id")
      .executeTakeFirst()
      .then((res) => res?.academic_session_id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    data.map(async (student) => {
      const index = processedData.findIndex(
        (x) => x.student_id === student.student_id,
      );

      if (index !== -1) {
        //IF STUDENT ALREADY EXISTS
        if (student.student_status === "Improvement") {
          //IF STUDENT IS IMPROVING
          processedData[index].improves?.push({
            fem: student.fem,
            catm: student.catm,
            course_id: student.course_id,
            credit: student.credit,
          });
        } else {
          processedData[index].courses.push({
            //IF STUDENT IS REGULAR
            fem: student.fem,
            catm: student.catm,
            course_id: student.course_id,
            credit: student.credit,
          });
        }
      } else {
        //IF STUDENT DOESN'T EXIST
        if (student.student_status === "Improvement") {
          const improvedData = await getImprovementMarksheet(
            session - 10000,
            student.student_id,
          );

          data = [...data, ...improvedData]; //ADDING IMPROVEMENT MARKSHEET TO DATA

          processedData.push({
            student_id: student.student_id,
            improves: [
              {
                course_id: student.course_id,
                fem: student.fem,
                catm: student.catm,
                credit: student.credit,
              },
            ],
            courses: [],
            hall_name: student.hall_name,
            session: student.session,
            student_name: student.student_name,
            student_status: student.student_status,
          });
        } else {
          //IF STUDENT IS REGULAR
          processedData.push({
            student_id: student.student_id,
            courses: [
              {
                course_id: student.course_id,
                fem: student.fem,
                catm: student.catm,
                credit: student.credit,
              },
            ],
            hall_name: student.hall_name,
            session: student.session,
            student_name: student.student_name,
            student_status: student.student_status,
          });
        }
      }
    });

    res.status(200).json(processedData);
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

const processedData: {
  courses: { course_id: number; catm: number; fem: number; credit: number }[];
  improves?: {
    course_id: number;
    catm: number;
    fem: number;
    credit: number;
  }[];
  student_status: "Improvement" | "Irregular" | "Regular";
  student_id: number;
  hall_name: string | null;
  session: string;
  student_name: unknown;
}[] = [];

export default marksheetRouter;
