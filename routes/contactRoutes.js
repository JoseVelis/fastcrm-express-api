import { Router } from "express";
import { getAllContacts } from "../controllers/contactController.js"

export const contactRoutes = Router();

templateRoutes.get("/templates", getAllContacts);  // GET: /api/contacts/