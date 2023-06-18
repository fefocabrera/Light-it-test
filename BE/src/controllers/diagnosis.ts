import { Request, Response } from 'express';
import { DiagnosisService } from '../services';
import { GeneralError, AuthorizationError, ValidationError } from '../exceptions/exceptions'
import { Uuid } from '../types/Basetypes';

export class DiagnosisController {
  private readonly diagnosisService: DiagnosisService;

  constructor() {
    this.diagnosisService = new DiagnosisService();
  }

  async getDiagnosisHistoric(req: Request, res: Response) {
	try {
		const userUuid = req.headers.userUuid;

        const evaluation = await this.diagnosisService.getDiagnosisHistoric(userUuid as Uuid);
		res.json(evaluation)
	}
	catch (err) {
		if (err instanceof AuthorizationError){
			res.status(401).send(err.message)
		} else if(err instanceof GeneralError) {
			res.status(500).send(err.message)
		}
	}
  }

}