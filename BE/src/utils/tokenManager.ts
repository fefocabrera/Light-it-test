import jwt from "jsonwebtoken";
import { GeneralError, AuthorizationError } from '../exceptions/exceptions';
import { Uuid } from '../types/Basetypes';

interface DecodedToken {
    userUuid: string;
  }

const secretKey = process.env.JWT_SECRET_KEY;

export const getToken = (userUuid: Uuid): string => {
    if (secretKey) {
        const token = jwt.sign({userUuid}, secretKey);
        return token;
    } else {
        throw new GeneralError(`Missing JWT Private key.`);
    }
}

export const verifyToken = async (token: string): Promise<string> => {
    if (secretKey) {
        try{
            const decoded = await jwt.verify(token, secretKey) as DecodedToken
            return decoded.userUuid;
        } catch (err){
            throw new AuthorizationError(`Invalid token. ${err}`);
        }
    } else {
        throw new GeneralError(`Missing JWT Private key.`);
    }
}

