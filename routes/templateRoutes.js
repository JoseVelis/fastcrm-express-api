import { Router } from "express";
import { createTemplate, getAllTemplates } from "../controllers/templateController.js"

export const templateRoutes = Router();

templateRoutes.get("/templates", getAllTemplates); 
templateRoutes.post("/templates", createTemplate);
templateRoutes.put("/:id", updateTemplate) ; //actualiza template