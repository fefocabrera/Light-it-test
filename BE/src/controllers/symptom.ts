import { Request, Response } from 'express';
import { SymptomService } from '../services';
import { GeneralError, AuthorizationError } from '../exceptions/exceptions'
import { validateRegisterInputs, validateLoginInputs } from '../utils/validators/userValidator'

export class SymptomController {
  private readonly symptomService: SymptomService;

  constructor() {
    this.symptomService = new SymptomService();
  }

  async getAll(req: Request, res: Response) {
	try {
		const userUuid = req.headers.userUuid;

		const symptoms = await this.symptomService.getAll(userUuid as string);
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

}