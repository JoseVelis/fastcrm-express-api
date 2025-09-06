import { Router } from "express";
import { createTemplate, getAllTemplates } from "../controllers/templateController.js"

export const templateRoutes = Router();

templateRoutes.get("/templates", getAllTemplates);  // GET: /api/templates/
templateRoutes.post("/templates", createTemplate); // POST: /api/templates/
templateRoutes.put("/:id", updateTemplate) ; // PUT: /api/templates/:id