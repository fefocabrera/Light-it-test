import jwt from "jsonwebtoken";

export const getToken = (userUuid: string): string => {
    const token = jwt.sign({userUuid}, "keyTesttttt");

    return token;
}