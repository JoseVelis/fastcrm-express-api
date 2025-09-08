import { Router } from "express";
import { getAllContacts, createContact, getContactById, updateContact, deleteContact } from "../controllers/contactController.js"

export const contactRoutes = Router();

// GET: /api/contacts - Obtener todos los contactos
contactRoutes.get("/", getAllContacts);

// GET: /api/contacts/:id - Obtener contacto por ID
contactRoutes.get("/:id", getContactById);

// POST: /api/contacts - Crear nuevo contacto
contactRoutes.post("/", createContact);

// PUT: /api/contacts/:id - Actualizar contacto
contactRoutes.put("/:id", updateContact);

// DELETE: /api/contacts/:id - Eliminar contacto
contactRoutes.delete("/:id", deleteContact);