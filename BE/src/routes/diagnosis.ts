import { DiagnosisController } from '../controllers';
import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

export class DiagnosisRoutes {
  private readonly router: Router;
  private readonly diagnosisController: DiagnosisController;

  constructor() {
    this.router = express.Router();
    this.diagnosisController = new DiagnosisController();

    this.router.get('/historic', isAuthenticated, async (req, res) => this.diagnosisController.getDiagnosisHistoric(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}