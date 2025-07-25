import { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";

const registerSchema = new Schema({
    easeId: {
        type: String,
        unique: true,
        trim: true,
        minlength: 36,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Por favor, forneça um email válido"
        ],
    },
}, {
    timestamps: true
});

// Gera easeId automaticamente antes de salvar, se não estiver definido
registerSchema.pre("save", function (next) {
    if (!this.easeId) {
        this.easeId = randomUUID();
    }
    next();
});

export const Register = model("register", registerSchema);
