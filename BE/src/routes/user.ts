import { UserController } from '../controllers';
import express, { Router } from 'express';

export class UserRoutes {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();

    this.router.post('/register', async (req, res) => this.userController.register(req, res));
    this.router.post('/login', async (req, res) => this.userController.login(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}