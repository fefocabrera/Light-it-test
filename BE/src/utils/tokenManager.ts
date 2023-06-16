import jwt from "jsonwebtoken";
import { GeneralError } from '../exceptions/exceptions';

const secretKey = process.env.JWT_SECRET_KEY;

export const getToken = (userUuid: string): string => {
    if (secretKey) {
        const token = jwt.sign({userUuid}, secretKey);
        return token;
    } else {
        throw new GeneralError(`Missing JWT Private key.`);
    }
}