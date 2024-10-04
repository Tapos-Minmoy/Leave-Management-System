import express, { Request, Response } from "express";
import path from "path";
import multer from "multer";
import fs from "fs"

const router = express.Router();

// Path to the directory where images will be stored
const imagePath = path.join(__dirname, "../../files/images");
const pdfPath = path.join(__dirname, "../../files/pdf");

// Create the directory if it doesn't exist
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

if (!fs.existsSync(pdfPath)) {
  fs.mkdirSync(pdfPath, { recursive: true });
}

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine the destination directory based on file type
    const destinationPath = file.mimetype.startsWith("image") ? imagePath : pdfPath;
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueName = `${file.fieldname}_${Date.now()}.${file.originalname.split(".").pop()}`;
    cb(null, uniqueName);
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Endpoint to handle image upload
router.post("/image", upload.single("file"), (req: Request, res: Response) => {
  // Get the uploaded file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  // Send back the file URL
  const fileName = file.filename;
  res.send({ fileName });
});

// Endpoint to handle PDF upload
router.post("/pdf", upload.single("file"), (req: Request, res: Response) => {
  // Get the uploaded file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  // Send back the file URL
  const fileName = file.filename;
  res.send({ fileName });
});

router.get("/images/:imageName", (req: Request, res: Response) => {
    console.log("okk");
    const { imageName } = req.params;
    console.log(imageName);
    const imagePath = path.join(__dirname, `../../files/images/${imageName}`);
  
    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).send("File not found");
    }
  
    res.sendFile(imagePath);
});

router.get("/pdf/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;
    const pdfPath = path.join(__dirname, `../../files/pdf/${filename}`);
  
    // Check if the file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).send("File not found");
    }
  
    res.sendFile(pdfPath);
  });


export default router;
