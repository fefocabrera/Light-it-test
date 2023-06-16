import bcrypt from "bcrypt";
import { AuthorizationError } from '../exceptions/exceptions'

export const validatePassword = async (plainTextPassword: string, hashedPassword: string) => {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    if(!match){
        throw new AuthorizationError(`Invalid password.`);
    }
}