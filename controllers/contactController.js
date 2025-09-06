import prisma from "../lib/db.js";


export async function getAllContacts(req, res) {
    try {
        const contacts = await prisma.contact.findMany();
        return res.json ({contacts: contact});
    } catch (error) {

    return res.status(500);
    }
} 