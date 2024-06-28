import path from "path";
import express from "express";
import { z } from "zod";
import db from "../database";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";
import multer from "multer";

const maxSize = 8388608; // Max 8MB
const maxFiles = 8;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { files: maxFiles, fileSize: maxSize },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { files: 1, fileSize: maxSize },
});

const uploadRouter = express.Router();

uploadRouter.post("/", upload.array("items", 8), (req, res) => {
  return res
    .status(201)
    .json({ message: "Successfully uploaded files", files: req.files });
});

uploadRouter.post("/image", imageUpload.single("image"), (req, res) => {
  return res
    .status(201)
    .json({ message: "Image uploaded successfully", image: req.file });
});

export default uploadRouter;
