import { Request, Response } from 'express';
import { SymptomService } from '../services';
import { manageExceptions } from '../exceptions/exceptions'
import { validateEvaluationInputs } from '../utils/validators/symptomsValidator'
import { Uuid } from '../types/Basetypes';

export class SymptomController {
  private readonly symptomService: SymptomService;

  constructor() {
    this.symptomService = new SymptomService();
  }

  async getAll(req: Request, res: Response) {
	try {
		const symptoms = await this.symptomService.getAll();
		res.json(symptoms)
	}
	catch (err) {
		manageExceptions(err, res);
	}
  }

  async evaluateSymptoms(req: Request, res: Response) {
	try {
		const userUuid = req.headers.userUuid;
		const symptoms = req.body?.symptoms;

		validateEvaluationInputs(symptoms);

        const evaluation = await this.symptomService.evaluateSymptoms(userUuid as Uuid, symptoms);
		res.json(evaluation)
	}
	catch (err) {
		manageExceptions(err, res);
	}
  }

}