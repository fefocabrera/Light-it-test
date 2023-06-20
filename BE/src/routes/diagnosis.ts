import { DiagnosisController } from '../controllers';
import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';

export class DiagnosisRoutes {
  private readonly router: Router;
  private readonly diagnosisController: DiagnosisController;

  constructor() {
    this.router = express.Router();
    this.diagnosisController = new DiagnosisController();

    this.router.get('/history', isAuthenticated, async (req, res) => this.diagnosisController.getDiagnosisHistory(req, res));
    this.router.put('/confirm/:uuid', isAuthenticated, async (req, res) => this.diagnosisController.confirmDiagnosis(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}