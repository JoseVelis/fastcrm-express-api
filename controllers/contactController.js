import prisma from "../lib/db.js";


export async function getAllContacts(req, res) {
    try {
        const contacts = await prisma.contacts.findMany();
        return res.json ({contacts: contacts});
    } catch (error) {

    return res.status(500);
    }
} 