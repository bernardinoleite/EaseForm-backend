import nodemailer from "nodemailer";



export const mailTransport = nodemailer.createTransport({
    service: String(process.env.GMAIL_SERVICE),
    auth: {
        user: String(process.env.GMAIL_USER),
        pass: String(process.env.GMAIL_PASSWORD)
    }
})

