import mongoose from "mongoose";

async function connectionDb() {
    try {
        await mongoose.connect(process.env.URI_MONGODB, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error.message);
        throw error
    }
}
connectionDb()