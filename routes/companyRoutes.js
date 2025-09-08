import { Router } from "express";
import { 
    getAllCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} from "../controllers/companyController.js";

export const companyRoutes = Router();

// GET: /api/companies - Obtener todas las empresas
companyRoutes.get("/", getAllCompanies);

// GET: /api/companies/:id - Obtener empresa por ID
companyRoutes.get("/:id", getCompanyById);

// POST: /api/companies - Crear nueva empresa
companyRoutes.post("/", createCompany);

// PUT: /api/companies/:id - Actualizar empresa
companyRoutes.put("/:id", updateCompany);

// DELETE: /api/companies/:id - Eliminar empresa
companyRoutes.delete("/:id", deleteCompany);
