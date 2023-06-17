import { Request, Response } from 'express';
import { SymptomService } from '../services';
import { GeneralError, AuthorizationError, ValidationError } from '../exceptions/exceptions'
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
		if (err instanceof AuthorizationError) {
			res.status(401).send(err.message)
		} else if(err instanceof GeneralError) {
			res.status(500).send(err.message)
		}
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
		if (err instanceof ValidationError) {
			res.status(400).send(err.message)
		} else if (err instanceof AuthorizationError){
			res.status(401).send(err.message)
		} else if(err instanceof GeneralError) {
			res.status(500).send(err.message)
		}
	}
  }

}