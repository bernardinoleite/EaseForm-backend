import { Register } from "../model/register-model";

class RegisterRepository {

    async create(email: string) {
        try {
            const newRegister = new Register({ email });
            return await newRegister.save();
        } catch (error) {
            throw new Error(`Erro ao criar registro: ${error.message}`);
        }
    }

    async findByEmail(email: string) {
        return await Register.findOne({ email });
    }

    async findByeaseId(easeId: string) {
        return await Register.findOne({ easeId });
    }

    async listAll() {
        return await Register.find({});
    }

    async deleteByEmail(email: string) {
        return await Register.findOneAndDelete({ email });
    }
}


export const registerRepository = new RegisterRepository();