import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) =>{
    if (isUserloggedIn(req)) {
      next();
    } else {
      res.status(500).send('User is not authenticated.')
    }
}

const isUserloggedIn = (req: Request) => {
    //The logic to validate that the user is logged in should be here
    return true;
}