import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { mailTransport } from "./config/nodemailer";
import { fieldsHTML, registerHtml, returnHtml } from "./util/utils";
import { registerRepository } from "./module/register/repositories/RegisterRepository";
import cors from "cors";
import path from "node:path";
import "./database";
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve("src", "public")));
dotenv.config();

// Node.js Express
app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.post("/register", async (request, response) => {
    const { email } = request.body;
    console.log(email);

    // Validação básica
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        response.status(400).json({ error: "Email inválido ou ausente." });
    }

    try {
        // Verifica se o email já está registrado
        const existing = await registerRepository.findByEmail(email);
        if (existing) {
            response.status(409).json({ error: "Email já está registrado." });
        }

        // Cria novo registro com UUID
        const saved = await registerRepository.create(email);
        await mailTransport.sendMail({
            from: `EaseForm <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Bem Vindo ao EaseForm",
            html: registerHtml({ easeId: saved.easeId, email: saved.email, endPoint: "https://easeform.onrender.com/" + saved.email }),
        });
        response.json({ message: "E-mail registado com sucesso, verifique o seu e-mail.", });

    } catch (error) {
        console.error("Erro ao registrar email:", error);
        response.status(500).json({ error: "Erro interno no servidor." });
    }
});

app.post("/:identifier", async (request, response) => {
    const { identifier } = request.params;
    const { _next, _subject, ...body } = request.body;


    const AlreadyExistIdentifier = await registerRepository.findByIdentifier(identifier)

    if (!AlreadyExistIdentifier) {
        return response.sendFile(path.resolve("src", "public", "emailRegister.html"));
    }

    let redirect = request.get("referer");

    const origin = request.get("referer") || request.get("origin") || "https://easeform.netlify.app";

    if (_next) {
        redirect = _next;
    }


    const html = returnHtml({ origin, fieldsHTML: fieldsHTML(body) });


    try {
        await mailTransport.sendMail({
            from: `EaseForm <${process.env.GMAIL_USER}>`,
            to: AlreadyExistIdentifier.email,
            subject: _subject || "📨 Novo envio de formulário",
            html,
        });

        console.log("✅ Email enviado para:", AlreadyExistIdentifier.email);

        response.redirect(`${redirect}?success=true`);

    } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        response.redirect(`${redirect}?error=true`);
    }
});



app.listen(2908, () => {
    console.log("Servidor rodando em http://localhost:2908");
});



