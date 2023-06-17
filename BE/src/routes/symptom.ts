import { SymptomController } from '../controllers';
import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

const router = Router()

export class SymptomRoutes {
  private readonly router: Router;
  private readonly symptomController: SymptomController;

  constructor() {
    this.router = express.Router();
    this.symptomController = new SymptomController();

    this.router.get('/', isAuthenticated, async (req, res) => this.symptomController.getAll(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}