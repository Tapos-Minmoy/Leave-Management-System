import express, { Response } from "express";
import db from "../database";
import {
  PermissionRequest,
  Role,
  checkPermissions,
} from "../middlewares/checkPermissions";
import { verifySession } from "../middlewares/verifySession";
const userRouter = express.Router();

// Get user information according to user's role
userRouter.get(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res: Response) => {
    const uid = req.session?.user_id ?? "";
    if (req.role === Role.Student) {
      const data = await db
        .selectFrom("Student")
        .where("Student.user_id", "=", uid)
        .innerJoin("User", "Student.user_id", "User.user_id")
        .innerJoin(
          "Department",
          "Department.department_id",
          "Student.department_id",
        )
        .leftJoin(
          "Academic_Session",
          "Academic_Session.academic_session_id",
          "Student.academic_session_id",
        )
        .leftJoin("Hall", "Hall.hall_id", "Student.hall_id")
        .selectAll()
        .executeTakeFirst();
      if (data) {
        data.password = "";
      }

      return res.status(200).json(data);
    }

    var query = db.selectFrom("User").where("User.user_id", "=", uid);
    if (req.role === Role.Teacher) {
      query = query.innerJoin("Teacher", "Teacher.user_id", "User.user_id");
    }

    const rolesQuery = db
      .selectFrom("Roles")
      .where("Roles.user_id", "=", uid)
      .selectAll();

    const data = await query.selectAll().executeTakeFirst();
    data!.password = "";
    const roles = await rolesQuery.execute();
    return res.status(200).json({ ...data, roles });
  },
);

userRouter.get(
  "/:user_id",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res: Response) => {
    const uid = req.params.user_id;
    console.log(req.role);

    const isStudent = await db
      .selectFrom("Student")
      .where("user_id", "=", uid)
      .select("Student.student_id")
      .executeTakeFirst();

    var query = db.selectFrom("User").where("User.user_id", "=", uid);
    if(isStudent){
      query=query.
      innerJoin("Student","User.user_id","Student.user_id")
      .innerJoin("Department","Student.department_id","Department.department_id");
    }

    // Check if the user is a teacher
    const isTeacher = await db
      .selectFrom("Teacher")
      .where("user_id", "=", uid)
      .select("Teacher.teacher_id")
      .executeTakeFirst();

     
    if (isTeacher) {
      query = query.innerJoin("Teacher", "Teacher.user_id", "User.user_id").
      innerJoin("Department","Teacher.department_id","Department.department_id");
    }
    
     

    const data = await query.selectAll().executeTakeFirst();

    if (data) {
      data.password = "";
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },
);

userRouter.get(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res: Response) => {
  
    const isStudent = await db
      .selectFrom("Student")
      .where("user_id", "=", req.session?.user_id!)
      .select("Student.student_id")
      .executeTakeFirst();

    var query = db.selectFrom("User").where("User.user_id", "=", req.session?.user_id!);
    if(isStudent){
      query=query.
      innerJoin("Student","User.user_id","Student.user_id")
      .innerJoin("Department","Student.department_id","Department.department_id");
    }

    // Check if the user is a teacher
    const isTeacher = await db
      .selectFrom("Teacher")
      .where("user_id", "=", req.session?.user_id!)
      .select("Teacher.teacher_id")
      .executeTakeFirst();

     
    if (isTeacher) {
      query = query.innerJoin("Teacher", "Teacher.user_id", "User.user_id").
      innerJoin("Department","Teacher.department_id","Department.department_id");
    }
    
     

    const data = await query.selectAll().executeTakeFirst();

    if (data) {
      data.password = "";
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },
);

export default userRouter;
