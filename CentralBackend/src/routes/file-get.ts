import path from "path";
import express from "express";
import { z } from "zod";

const storagePath = path.join(__dirname, "../../public/upload");
const fileGetRouter = express.Router();

fileGetRouter.get("/:filename", (req, res) => {
  const filename = z.string().parse(req.params.filename);

  return res.sendFile(`${storagePath}/${filename}`);
});

fileGetRouter.get("/image/:filename", (req, res) => {
  const filename = z.string().parse(req.params.filename);

  return res.sendFile(`${storagePath}/image/${filename}`);
});

export default fileGetRouter;
