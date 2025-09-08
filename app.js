import express, { json } from "express"
import morgan from "morgan";
import prisma from "./lib/db.js";

import { templateRoutes } from "./routes/templateRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { companyRoutes } from "./routes/companyRoutes.js";

const app = express();

app.use(json());
app.use(morgan('dev')); 

const PORT = 5100;

(async () => {
    await process.loadEnvFile('.env');
})();

// Conectar a Prisma/Neon
try {
    await prisma.$connect();
    console.log('🟢 Prisma conectado a Neon PostgreSQL');
} catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    process.exit(1);
}

app.get("/", (req, res) => {
    return res.json({ message: "FastCRM Express API" })
})

app.use("/api/templates", templateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/companies", companyRoutes);

app.listen(PORT, () => console.log("🟢 Vivo en el puerto: " + PORT))
