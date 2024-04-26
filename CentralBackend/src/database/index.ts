import * as Schema from "./Schema";
import * as CoreTables from "../types/CoreTables";
import * as LeaveTables from "../types/LeaveTables";
import { createPool } from "mysql2"; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from "kysely";
import { AdminCreds } from "./Credentials";

export interface Database {
  //core tables
  Address: CoreTables.AddressTable;
  Department: CoreTables.DepartmentTable;
  Roles: CoreTables.RolesTable;
  Student: CoreTables.StudentTable;
  Teacher: CoreTables.TeacherTable;
  User: CoreTables.UserTable;
  Auth_Session: CoreTables.AuthSessionTable;
  Hall: CoreTables.HallTable;
  University: CoreTables.UniversityTable;
  Course: CoreTables.CourseTable;
  Courses_in_Semester: CoreTables.CoursesInSemesterTable;
  Exam: CoreTables.ExamTable;
  Academic_Session: CoreTables.AcademicSession;

  //others
  Exam_Committee: Schema.ExamCommitteeTable;
  Image: Schema.ImageTable;
  Form: Schema.FormTable;
  Form_Courses: CoreTables.FormCoursesTable;
  Form_Evaluation: Schema.FormEvaluationTable;

  //Leave Tables
  Study_Leave_Application:LeaveTables.StudyLeaveApplicationTable;
  Other_Leave_Application:LeaveTables.OtherLeaveApplicationTable;
  Study_Leave_Evaluation:LeaveTables.StudyLeaveEvaluationTable;
  Other_Leave_Evaluation:LeaveTables.OtherLeaveEvaluationTable;
}

export type TableName =
  | "Address"
  | "Department"
  | "Image"
  | "Roles"
  | "Student"
  | "Teacher"
  | "User"
  | "Exam"
  | "Course"
  | "Exam_Committee"
  | "Courses_in_Semester"
  | "Auth_Session"
  | "Hall"
  | "University"
  | "Exam_Committee"
  | "Form"
  | "Form_Evaluation"
  | "Form_Courses"
  | "Academic_Session"
  |"Study_Leave_Application"
  |"Study_Leave_Evaluation"
  |"Other_Leave_Application"
  |"Other_Leave_Evaluation";

const dialect = new MysqlDialect({
  pool: createPool(AdminCreds),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
