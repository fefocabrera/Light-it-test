import { UserController } from '../controllers';
import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

const router = Router()

export class UserRoutes {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
  }

  getRouter(): Router {
    return this.router;
  }
}