import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenManager'
import { GeneralError, AuthorizationError } from '../exceptions/exceptions'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) =>{

    const loggedIn = true
    const authHeader = req.headers.authorization;

    try{
      if(authHeader){
        const token = authHeader.split(" ")[1];
        const userUuid = await verifyToken(token);
        req.headers.userUuid = userUuid;
        next();
      } 
    } catch(err){
      if (err instanceof AuthorizationError) {
        res.status(401).send(err.message)
      } else if(err instanceof GeneralError) {
        res.status(500).send(err.message)
      }
    }
}
