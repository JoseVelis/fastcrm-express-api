import prisma from "../lib/db.js";

export async function getAllContacts(req, res) {
    try {
        const contacts = await prisma.contact.findMany({
            include: {
                company: true
            }
        });
        return res.json({ contacts });
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        return res.status(500).json({ error: "Error al obtener contactos" });
    }
}

export async function getContactById(req, res) {
    try {
        const { id } = req.params;
        const contact = await prisma.contact.findUnique({
            where: { id: parseInt(id) },
            include: {
                company: true
            }
        });

        if (!contact) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }

        return res.json({ contact });
    } catch (error) {
        console.error("Error al obtener contacto:", error);
        return res.status(500).json({ error: "Error al obtener contacto" });
    }
}

export async function createContact(req, res) {
    try {
        const { name, whatsapp, companyId } = req.body;

        // Validar campos requeridos
        if (!name || !whatsapp) {
            return res.status(400).json({ error: "Nombre y WhatsApp son requeridos" });
        }

        // Si se proporciona companyId, validar que la empresa existe
        if (companyId) {
            const company = await prisma.company.findUnique({
                where: { id: parseInt(companyId) }
            });

            if (!company) {
                return res.status(400).json({ error: "La empresa especificada no existe" });
            }
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                whatsapp,
                companyId: companyId ? parseInt(companyId) : null
            },
            include: {
                company: true
            }
        });

        return res.status(201).json({ contact });
    } catch (error) {
        console.error("Error al crear contacto:", error);
        return res.status(500).json({ error: "Error al crear contacto" });
    }
}

export async function updateContact(req, res) {
    try {
        const { id } = req.params;
        const { name, whatsapp, companyId } = req.body;

        // Si se proporciona companyId, validar que la empresa existe
        if (companyId) {
            const company = await prisma.company.findUnique({
                where: { id: parseInt(companyId) }
            });

            if (!company) {
                return res.status(400).json({ error: "La empresa especificada no existe" });
            }
        }

        const contact = await prisma.contact.update({
            where: { id: parseInt(id) },
            data: {
                name,
                whatsapp,
                companyId: companyId ? parseInt(companyId) : null
            },
            include: {
                company: true
            }
        });

        return res.json({ contact });
    } catch (error) {
        console.error("Error al actualizar contacto:", error);
        return res.status(500).json({ error: "Error al actualizar contacto" });
    }
}

export async function deleteContact(req, res) {
    try {
        const { id } = req.params;

        await prisma.contact.delete({
            where: { id: parseInt(id) }
        });

        return res.json({ message: "Contacto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar contacto:", error);
        return res.status(500).json({ error: "Error al eliminar contacto" });
    }
}