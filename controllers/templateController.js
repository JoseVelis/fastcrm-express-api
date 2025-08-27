import { Templates } from "../models/templateModel.js";

export async function getAllTemplates(req, res) {
    try {
        const templates = await Templates.find({});
        res.status(200).json(templates);
    } catch (e) {
        console.error(e);
    }
}

export async function createTemplate(req, res) {
    const { content, author } = req.body;
    const newTemplate = await Templates.create({
        content: content,
        author: author
    });
    newTemplate.create
    return res.status(201).json({template: newTemplate});
}