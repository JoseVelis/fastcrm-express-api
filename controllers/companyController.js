import prisma from "../lib/db.js";

export async function getAllCompanies(req, res) {
    try {
        const companies = await prisma.company.findMany({
            include: {
                contacts: {
                    select: {
                        id: true,
                        name: true,
                        whatsapp: true,
                        createdAt: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Formatear respuesta para mostrar información útil al gerente
        const companiesWithStats = companies.map(company => ({
            id: company.id,
            name: company.name,
            ruc: company.ruc,
            createdAt: company.createdAt,
            totalContacts: company.contacts.length,
            contacts: company.contacts
        }));

        return res.json({ 
            success: true,
            totalCompanies: companies.length,
            companies: companiesWithStats 
        });
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        return res.status(500).json({ error: "Error al obtener empresas" });
    }
}

export async function getCompanyById(req, res) {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: { id: parseInt(id) },
            include: {
                contacts: true
            }
        });

        if (!company) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        return res.json({ company });
    } catch (error) {
        console.error("Error al obtener empresa:", error);
        return res.status(500).json({ error: "Error al obtener empresa" });
    }
}

export async function createCompany(req, res) {
    try {
        const { name, ruc } = req.body;

        if (!name || !ruc) {
            return res.status(400).json({ error: "Nombre y RUC son requeridos" });
        }

        const company = await prisma.company.create({
            data: {
                name,
                ruc
            }
        });

        return res.status(201).json({ company });
    } catch (error) {
        console.error("Error al crear empresa:", error);
        return res.status(500).json({ error: "Error al crear empresa" });
    }
}

export async function updateCompany(req, res) {
    try {
        const { id } = req.params;
        const { name, ruc } = req.body;

        const company = await prisma.company.update({
            where: { id: parseInt(id) },
            data: {
                name,
                ruc
            }
        });

        return res.json({ company });
    } catch (error) {
        console.error("Error al actualizar empresa:", error);
        return res.status(500).json({ error: "Error al actualizar empresa" });
    }
}

export async function deleteCompany(req, res) {
    try {
        const { id } = req.params;

        await prisma.company.delete({
            where: { id: parseInt(id) }
        });

        return res.json({ message: "Empresa eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar empresa:", error);
        return res.status(500).json({ error: "Error al eliminar empresa" });
    }
}
