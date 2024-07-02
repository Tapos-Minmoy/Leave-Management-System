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
app.use(express.static("public"));

// Auth routes [x]
import loginRouter from "./routes/auth/login";
import logoutRouter from "./routes/auth/logout";
// import signupRouter from "./routes/auth/signup";

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
// app.use("/api/signup", signupRouter);

// Public routes [x]
import addressRouter from "./routes/address";
import departmentRouter from "./routes/department";
import hallRouter from "./routes/hall";
import universityRouter from "./routes/university";
import teacherRouter from "./routes/teacher";
import courseRouter from "./routes/course";
import certificateWithdrawal from "./routes/certificate-withdrawal"

app.use("/api/department", departmentRouter);
app.use("/api/address", addressRouter);
app.use("/api/hall", hallRouter);
app.use("/api/university", universityRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/course", courseRouter);

// Routes that require authentication/authorization [x]
import studentRouter from "./routes/student";
import examCommitteeRouter from "./routes/exam-committee";
import examRouter from "./routes/exam";
import uploadRouter from "./routes/upload";

app.use("/api/student", studentRouter);
app.use("/api/exam-committee", examCommitteeRouter);
app.use("/api/exam", examRouter);
app.use("/api/upload", uploadRouter);

// Course-Semester Router [x]
import courseSemesterRouter from "./routes/courses-semester";
import formRouter from "./routes/form";
app.use("/api/course-semester", courseSemesterRouter);
app.use("/api/form", formRouter);

//Leave Application Router [x]
import studyLeaveApplicationRouter from "./routes/study_leave_application";
import otherLeaveApplicationRouter from "./routes/other_leave_application";
import studyLeaveEvaluationRouter from "./routes/study_leave_evaluation";
import otherLeaveEvaluationRouter from "./routes/other_leave_evaluation";
import commonLeaveUtilitiesRouter from "./routes/common_leave_utilities";
app.use("/api/leave/study", studyLeaveApplicationRouter);
app.use("/api/leave/other", otherLeaveApplicationRouter);
app.use("/api/leave/evaluates/study", studyLeaveEvaluationRouter);
app.use("/api/leave/evaluates/other", otherLeaveEvaluationRouter);
app.use("/api/leave/common", commonLeaveUtilitiesRouter);

//certificate
app.use("/api/certificate-withdrawal", certificateWithdrawal)
// Start the server


// File access routes
import fileGetRouter from "./routes/file-get";
app.use("/files", fileGetRouter);
app.listen(port, () => {
  console.log(
    `ERP API is listening to port ${port}\nURL: http://localhost:${port}`,
  );
});
