import express from "express";
import path from "path";
const endpointDocsRouter = express.Router();

const htmlPath = path.join(__dirname, "../public");
// Get single department
endpointDocsRouter.get("/", (req, res) => {
  res.redirect("/");
});

endpointDocsRouter.get("/auth", (req, res) => {
  res.sendFile(`${htmlPath}/auth/`);
});

endpointDocsRouter.get("/public", (req, res) => {
  res.sendFile(`${htmlPath}/public.html`);
});

endpointDocsRouter.get("/protected", (req, res) => {
  res.sendFile(`${htmlPath}/protected.html`);
});

export default endpointDocsRouter;
