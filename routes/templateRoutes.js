import { Router } from "express";
import { createTemplate, getAllTemplates } from "../controllers/templateController.js"

export const templateRoutes = Router();

templateRoutes.get("/templates", getAllTemplates);
templateRoutes.post("/templates", createTemplate);