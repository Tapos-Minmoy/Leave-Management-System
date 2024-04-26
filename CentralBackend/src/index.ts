import "./loadEnvironment";
import express, { Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;
const htmlPath = path.join(__dirname, "../public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

// Doc routes

app.get("/", (req: Request, res: Response) => {
  res.sendFile(`${htmlPath}/`);
});

app.get("/docs/auth", (req, res) => {
  res.sendFile(`${htmlPath}/auth.html`);
});

app.get("/docs/auth/login", (req, res) => {
  res.sendFile(`${htmlPath}/login.html`);
});

app.get("/docs/auth/logout", (req, res) => {
  res.sendFile(`${htmlPath}/logout.html`);
});

app.get("/docs/auth/signup", (req, res) => {
  res.sendFile(`${htmlPath}/signup.html`);
});

app.get("/docs/public", (req, res) => {
  res.sendFile(`${htmlPath}/public.html`);
});

app.get("/docs/protected", (req, res) => {
  res.sendFile(`${htmlPath}/protected.html`);
});

import formRouter from "./routes/form";
app.use("/forms", formRouter);

// Auth routes
import loginRouter from "./routes/auth/login";
import logoutRouter from "./routes/auth/logout";
// import signupRouter from "./routes/auth/signup";

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
// app.use("/api/signup", signupRouter);

// Public routes
import addressRouter from "./routes/address";
import departmentRouter from "./routes/department";
import hallRouter from "./routes/hall";
import universityRouter from "./routes/university";
import teacherRouter from "./routes/teacher";

app.use("/api/department", departmentRouter);
app.use("/api/address", addressRouter);
app.use("/api/hall", hallRouter);
app.use("/api/university", universityRouter);
app.use("/api/teacher", teacherRouter);

// Routes that require authentication/authorization
import studentRouter from "./routes/student";
import examCommitteeRouter from "./routes/exam-committee";
import examRouter from "./routes/exam";

app.use("/api/student", studentRouter);
app.use("/api/exam-committee", examCommitteeRouter);
app.use("/api/exam", examRouter);

//Course-Semester Router
import courseSemesterRouter from "./routes/courses-semester";
app.use("/api/course-semester", courseSemesterRouter);
app.use("/api/form", formRouter);

//Leave Application Router
import studyLeaveApplicationRouter from "./routes/study_leave_application";
import otherLeaveApplicationRouter from "./routes/other_leave_application";
import studyLeaveEvaluationRouter from "./routes/study_leave_evaluation";
import otherLeaveEvaluationRouter from "./routes/other_leave_evaluation";
app.use("/api/leave/study",studyLeaveApplicationRouter);
app.use("/api/leave/other",otherLeaveApplicationRouter);
app.use("/api/leave/evaluates/study",studyLeaveEvaluationRouter);
app.use("/api/leave/evaluates/other",otherLeaveEvaluationRouter);

app.listen(port, () => {
  console.log(
    `ERP API is listening to port ${port}\nURL: http://localhost:${port}`,
  );
});
